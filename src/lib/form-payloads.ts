import {
  IMPACT_QUESTIONS,
  LIKERT_OPTIONS,
  PROFILE_QUESTIONS,
  RISK_OPTIONS,
  SCHEDULE_OPTIONS,
  SCORED_QUESTIONS,
  type LikertValue,
} from "@/lib/assessment-data";
import { resultCopy, scoreAssessment } from "@/lib/scoring";

export type ContactPayloadInput = {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  message: string;
};

export type AssessmentLeadInput = {
  contact: {
    firstName: string;
    lastName: string;
    businessName: string;
    email: string;
    phone: string;
    issue: string;
    schedule: string;
  };
  profile?: Record<string, string>;
  likert?: Record<string, string>;
  risks?: string[];
  impact?: Record<string, string>;
  completedAt?: string | null;
};

function compact(value: string | undefined): string {
  return (value ?? "").trim();
}

function likertLabel(value: string | undefined): string {
  return LIKERT_OPTIONS.find((option) => option.value === value)?.label ?? compact(value);
}

function scheduleLabel(value: string | undefined): string {
  return (
    SCHEDULE_OPTIONS.find((option) => option.value === value)?.label ?? compact(value)
  );
}

function riskLabel(id: string): string {
  return RISK_OPTIONS.find((option) => option.id === id)?.label ?? id;
}

export function buildContactFormspreePayload(
  input: ContactPayloadInput
): Record<string, string> {
  const name = compact(input.name);
  const email = compact(input.email);
  const phone = compact(input.phone);
  const business = compact(input.business);
  const message = compact(input.message);

  const payload: Record<string, string> = {
    formType: "contact",
    _subject: "Scalemaker HR website contact",
    name,
    email,
    message,
  };

  if (phone) payload.phone = phone;
  if (business) payload.business = business;

  return payload;
}

export function buildAssessmentFormspreePayload(
  input: AssessmentLeadInput
): Record<string, string> {
  const contact = input.contact;
  const name = `${compact(contact.firstName)} ${compact(contact.lastName)}`.trim();
  const email = compact(contact.email);
  const phone = compact(contact.phone);
  const businessName = compact(contact.businessName);
  const issue = compact(contact.issue);
  const schedule = scheduleLabel(contact.schedule);
  const likert = (input.likert ?? {}) as Record<string, LikertValue>;
  const risks = input.risks ?? [];
  const scores = scoreAssessment(likert, risks);
  const band = resultCopy(scores.tier);
  const categoryScores = scores.categories
    .map((category) => `${category.name}: ${category.percent}%`)
    .join("; ");

  const profileLines = PROFILE_QUESTIONS.map((question) => {
    const answer = compact(input.profile?.[question.id]);
    return answer ? `- ${question.label}: ${answer}` : null;
  }).filter((line): line is string => Boolean(line));

  const riskLines = risks.map((id) => `- ${riskLabel(id)}`);

  const impactLines = IMPACT_QUESTIONS.map((question) => {
    const answer = compact(input.impact?.[question.id]);
    return answer ? `- ${question.label}: ${answer}` : null;
  }).filter((line): line is string => Boolean(line));

  const answerLines = SCORED_QUESTIONS.map((question) => {
    const value = likert[question.id];
    if (!value) return null;
    return `- ${question.text}: ${likertLabel(value)}`;
  }).filter((line): line is string => Boolean(line));

  const message = [
    "People & Growth Readiness Assessment lead",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    businessName ? `Business: ${businessName}` : null,
    schedule ? `Wants to discuss results: ${schedule}` : null,
    issue ? `Current HR issue: ${issue}` : null,
    input.completedAt ? `Completed at: ${input.completedAt}` : null,
    "",
    `Score: ${scores.percent}% — ${band.name}`,
    `Points: ${scores.points} / 90`,
    `Category scores: ${categoryScores || "not yet scored"}`,
    `Critical attention flag: ${scores.criticalAttention ? "Yes" : "No"}`,
    `Business impact flag: ${scores.businessImpact ? "Yes" : "No"}`,
    profileLines.length ? "" : null,
    profileLines.length ? "Business profile:" : null,
    ...profileLines,
    riskLines.length ? "" : null,
    riskLines.length ? "Risks experienced:" : null,
    ...riskLines,
    impactLines.length ? "" : null,
    impactLines.length ? "Business-impact answers:" : null,
    ...impactLines,
    answerLines.length ? "" : null,
    answerLines.length ? "Key scored answers:" : null,
    ...answerLines,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const payload: Record<string, string> = {
    formType: "assessment",
    _subject: `People & Growth Assessment — ${band.name} (${scores.percent}%)`,
    name,
    firstName: compact(contact.firstName),
    lastName: compact(contact.lastName),
    email,
    businessName,
    issue,
    schedule,
    scorePercent: String(scores.percent),
    scoreBand: band.name,
    categoryScores: categoryScores || "not yet scored",
    criticalAttention: scores.criticalAttention ? "Yes" : "No",
    businessImpact: scores.businessImpact ? "Yes" : "No",
    message,
  };

  if (phone) payload.phone = phone;

  return payload;
}
