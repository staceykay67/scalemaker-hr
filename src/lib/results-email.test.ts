import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SCORED_QUESTIONS } from "@/lib/assessment-data";
import {
  claimResultsEmail,
  finishResultsEmail,
  resetResultsEmailGuard,
} from "@/lib/results-email-guard";
import { deliverProspectEmail, renderProspectResultsEmail } from "@/lib/results-email";
import { RESULTS_CAVEAT, scoreAssessment } from "@/lib/scoring";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site-contact";

function fill(value: string, overrides: Record<string, string> = {}) {
  const likert: Record<string, string> = {};
  for (const question of SCORED_QUESTIONS) likert[question.id] = overrides[question.id] ?? value;
  return likert;
}

describe("prospect results email", () => {
  it("renders the scored email from the same score the page shows", () => {
    const scores = scoreAssessment(fill("agree", { q9: "unsure" }), []);
    const email = renderProspectResultsEmail({ firstName: "Jordan", scores });
    assert.equal(email.kind, "results");
    assert.match(email.text, /Your People & Growth Readiness Score is 80% — Scale Ready/);
    assert.match(email.text, /Areas worth exploring:/);
    assert.match(email.text, /based on 2 of 3 statements/);
    assert.match(email.text, new RegExp(RESULTS_CAVEAT.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(email.text, /Don't know \/ not enough information/);
    assert.match(email.html, /80% — Scale Ready/);
    assert.match(email.text, new RegExp(BOOKING_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(email.text, /There's no obligation to purchase services\./);
    assert.match(email.text, new RegExp(CONTACT_EMAIL));
    assert.match(email.text, /https:\/\/scalemakerhr\.com/);
    assert.equal(email.text.includes("Scoring version"), false);
  });

  it("renders the insufficient email with gaps and without a band or ranked areas", () => {
    const scores = scoreAssessment(
      fill("agree", { q7: "unsure", q8: "unsure", q9: "agree" }),
      []
    );
    assert.equal(scores.overallAvailable, false);
    const email = renderProspectResultsEmail({ firstName: "Jordan", scores });
    assert.equal(email.kind, "insufficient");
    assert.match(email.text, /isn't enough information for an overall score/);
    assert.match(email.text, /HR Foundation and Compliance \(1 of 3 statements scored\)/);
    assert.equal(email.text.includes("Areas worth exploring"), false);
    assert.equal(email.text.includes("Scale Ready"), false);
    assert.equal(email.text.includes("% —"), false);
    assert.match(email.text, new RegExp(BOOKING_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(email.html, /Not enough information/);
  });

  it("skips delivery and logs when RESEND_API_KEY is missing", async () => {
    const previous = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;
    const notes: string[] = [];
    const original = console.info;
    console.info = (message?: unknown) => {
      notes.push(String(message));
    };
    const email = renderProspectResultsEmail({
      scores: scoreAssessment(fill("agree"), []),
    });
    const result = await deliverProspectEmail(email, "jordan@example.com", async () => {
      throw new Error("fetch should not run");
    });
    console.info = original;
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
    assert.equal(result.ok, false);
    assert.equal(result.skipped, "missing-key");
    assert.match(notes.join("\n"), /RESEND_API_KEY is not set/);
  });
});

describe("results email idempotency", () => {
  it("sends once per submission and allows one failed retry", async () => {
    resetResultsEmailGuard();
    const first = await claimResultsEmail("sub-retry");
    assert.equal(first.action, "send");
    const busy = await claimResultsEmail("sub-retry");
    assert.equal(busy.action, "in-flight");
    const failed = await finishResultsEmail("sub-retry", "failed");
    assert.equal(failed.attempts, 1);

    const retry = await claimResultsEmail("sub-retry");
    assert.equal(retry.action, "send");
    const secondFail = await finishResultsEmail("sub-retry", "failed");
    assert.equal(secondFail.attempts, 2);
    const blocked = await claimResultsEmail("sub-retry");
    assert.equal(blocked.action, "exhausted");

    resetResultsEmailGuard();
    const send = await claimResultsEmail("sub-once");
    assert.equal(send.action, "send");
    await finishResultsEmail("sub-once", "sent");
    const replay = await claimResultsEmail("sub-once");
    assert.equal(replay.action, "already-sent");
  });
});
