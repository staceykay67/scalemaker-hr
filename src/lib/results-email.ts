import {
  DONT_KNOW_LABEL,
  INSUFFICIENT_OVERALL_MESSAGE,
  RESULTS_CAVEAT,
  limitedInformationNote,
  resultCopy,
  scoreAssessment,
  type AssessmentScores,
} from "@/lib/scoring";
import { BOOKING_LABEL, BOOKING_URL, CONTACT_EMAIL, CREDENTIALS_LINE } from "@/lib/site-contact";

export const RESULTS_FROM = "Scalemaker HR <results@scalemakerhr.com>";
export const RESULTS_REPLY_TO = CONTACT_EMAIL;
export const RESULTS_SITE = "https://scalemakerhr.com";

export type ProspectEmail = {
  subject: string;
  text: string;
  html: string;
  kind: "results" | "insufficient";
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function areaLine(area: AssessmentScores["categories"][number]): string {
  if (!area.enough || area.displayPercent === null) {
    return `${area.name}: Not enough information`;
  }
  const note = area.note ? ` (${area.note})` : "";
  return `${area.name}: ${area.displayPercent}%${note}`;
}

export function renderProspectResultsEmail(input: {
  firstName?: string;
  scores: AssessmentScores;
}): ProspectEmail {
  const scores = input.scores;
  const greetingName = input.firstName?.trim() || "there";
  const thanks = `Thank you for completing the People & Growth Readiness Assessment.`;
  const areas = scores.categories.map(areaLine);
  const gaps = scores.categories
    .filter((area) => !area.enough)
    .map((area) => `${area.name} (${area.scoredCount} of 3 statements scored)`);
  const exploring = scores.areasWorthExploring.map(areaLine);
  const limited = scores.limitedInformation
    ? limitedInformationNote(scores.dontKnowCount, scores.scoredCount)
    : null;
  const clarify =
    scores.dontKnowCount > 0
      ? [
          scores.dontKnowCount === 1
            ? `You marked 1 statement as ${DONT_KNOW_LABEL}. That is a useful topic to clarify:`
            : `You marked ${scores.dontKnowCount} statements as ${DONT_KNOW_LABEL}. Those are useful topics to clarify:`,
          ...scores.dontKnowStatements.map((item) => `- ${item.text}`),
        ]
      : [];

  const signature = [
    CREDENTIALS_LINE,
    "Founder, Scalemaker HR",
    CONTACT_EMAIL,
    RESULTS_SITE,
  ];

  if (!scores.overallAvailable || scores.displayPercent === null || !scores.tier) {
    const subject = "Your People & Growth assessment";
    const explanation = [
      INSUFFICIENT_OVERALL_MESSAGE,
      `Scored statements: ${scores.scoredCount} of 18.`,
      gaps.length ? "Areas that need more information:" : "Coverage is still short of 14 scored statements.",
      ...gaps.map((gap) => `- ${gap}`),
    ];
    const text = [
      `Hello ${greetingName},`,
      "",
      thanks,
      "",
      ...explanation,
      "",
      "Results in six key areas:",
      ...areas.map((line) => `- ${line}`),
      "",
      limited,
      limited ? "" : null,
      ...clarify,
      clarify.length ? "" : null,
      `${BOOKING_LABEL}: ${BOOKING_URL}`,
      "",
      "There's no obligation to purchase services.",
      "",
      ...signature,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    return {
      kind: "insufficient",
      subject,
      text,
      html: layoutHtml({
        greetingName,
        thanks,
        blocks: [
          ...explanation.map((line) => `<p>${escapeHtml(line)}</p>`),
          listHtml("Results in six key areas", areas),
          limited ? `<p>${escapeHtml(limited)}</p>` : "",
          clarify.length ? listHtml(clarify[0], clarify.slice(1).map((line) => line.replace(/^- /, ""))) : "",
        ],
      }),
    };
  }

  const band = resultCopy(scores.tier);
  const scoreLine = `Your People & Growth Readiness Score is ${scores.displayPercent}% — ${band.name}`;
  const subject = scoreLine;
  const text = [
    `Hello ${greetingName},`,
    "",
    thanks,
    "",
    scoreLine,
    "",
    "Areas worth exploring:",
    ...exploring.map((line) => `- ${line}`),
    "",
    "Results in six key areas:",
    ...areas.map((line) => `- ${line}`),
    "",
    RESULTS_CAVEAT,
    "",
    limited,
    limited ? "" : null,
    ...clarify,
    clarify.length ? "" : null,
    `${BOOKING_LABEL}: ${BOOKING_URL}`,
    "",
    "There's no obligation to purchase services.",
    "",
    ...signature,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return {
    kind: "results",
    subject,
    text,
    html: layoutHtml({
      greetingName,
      thanks,
      blocks: [
        `<p style="font-size:20px;font-weight:700;color:#0b422c;">${escapeHtml(scoreLine)}</p>`,
        listHtml("Areas worth exploring", exploring),
        listHtml("Results in six key areas", areas),
        `<p>${escapeHtml(RESULTS_CAVEAT)}</p>`,
        limited ? `<p>${escapeHtml(limited)}</p>` : "",
        clarify.length
          ? listHtml(
              clarify[0],
              clarify.slice(1).map((line) => line.replace(/^- /, ""))
            )
          : "",
      ],
    }),
  };
}

function listHtml(title: string, items: string[]): string {
  if (!items.length) return "";
  const rows = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `<p style="font-weight:700;color:#0b422c;">${escapeHtml(title)}</p><ul>${rows}</ul>`;
}

function layoutHtml(input: { greetingName: string; thanks: string; blocks: string[] }): string {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;background:#f6f4ef;color:#1c1c1c;font-family:Georgia,serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f4ef;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e4e0d8;border-radius:12px;">
        <tr><td style="background:#0b422c;color:#ffffff;padding:20px 24px;font-family:Arial,sans-serif;font-size:14px;letter-spacing:0.04em;">SCALEMAKER HR</td></tr>
        <tr><td style="padding:24px;font-size:16px;line-height:1.5;">
          <p>Hello ${escapeHtml(input.greetingName)},</p>
          <p>${escapeHtml(input.thanks)}</p>
          ${input.blocks.join("\n")}
          <p><a href="${BOOKING_URL}" style="color:#0b422c;">${escapeHtml(BOOKING_LABEL)}</a></p>
          <p>There's no obligation to purchase services.</p>
          <p style="margin-top:24px;">
            ${escapeHtml(CREDENTIALS_LINE)}<br />
            Founder, Scalemaker HR<br />
            <a href="mailto:${CONTACT_EMAIL}" style="color:#0b422c;">${CONTACT_EMAIL}</a><br />
            <a href="${RESULTS_SITE}" style="color:#0b422c;">${RESULTS_SITE}</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function prospectEmailForLead(input: {
  firstName?: string;
  likert: Record<string, string | undefined>;
  risks: string[];
}): ProspectEmail {
  return renderProspectResultsEmail({
    firstName: input.firstName,
    scores: scoreAssessment(input.likert, input.risks),
  });
}

export async function deliverProspectEmail(
  email: ProspectEmail,
  to: string,
  fetchImpl: typeof fetch = fetch
): Promise<{ ok: boolean; status: number; error?: string; skipped?: "missing-key" }> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    console.info("Prospect results email skipped: RESEND_API_KEY is not set.");
    return {
      ok: false,
      status: 0,
      skipped: "missing-key",
      error: "We couldn't email your results just now. Please try again in a moment.",
    };
  }

  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESULTS_FROM,
      to: [to],
      reply_to: RESULTS_REPLY_TO,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });

  if (response.ok) return { ok: true, status: response.status };

  let error = "We couldn't email your results just now. Please try again.";
  try {
    const body = (await response.json()) as { message?: string };
    if (body?.message) error = body.message;
  } catch {
    // Keep the generic message when Resend does not return JSON.
  }
  console.info(`Prospect results email failed with status ${response.status}.`);
  return { ok: false, status: response.status, error };
}
