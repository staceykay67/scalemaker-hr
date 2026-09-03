import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  alreadySentPriorities,
  hasPriorities,
  prioritiesFingerprint,
} from "@/lib/assessment-lead";
import { emptyRecord } from "@/lib/storage";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site-contact";
import { buildAssessmentFormspreePayload } from "@/lib/form-payloads";

const contact = {
  firstName: "Stacey",
  lastName: "Kay",
  businessName: "Scalemaker HR",
  email: "staceykay@scalemakerhr.com",
  phone: "",
  issue: "",
  schedule: "yes",
};

describe("assessment lead payload", () => {
  it("includes what-matters outcomes and timeline in a follow-up lead", () => {
    const payload = buildAssessmentFormspreePayload({
      contact,
      likert: { q7: "agree", q8: "agree" },
      risks: ["none"],
      outcomes: ["Reduce turnover", "Improve recruiting"],
      timeline: "Within the next 30 days",
      completedAt: "2026-09-02T12:00:00.000Z",
    });

    assert.equal(payload.outcomes, "Reduce turnover; Improve recruiting");
    assert.equal(payload.timeline, "Within the next 30 days");
    assert.match(payload._subject, /priorities/);
    assert.match(payload.message, /What matters most: Reduce turnover; Improve recruiting/);
    assert.match(payload.message, /Ideal start timeline: Within the next 30 days/);
  });

  it("includes Other free-text with the selected outcomes", () => {
    const payload = buildAssessmentFormspreePayload({
      contact,
      outcomes: ["Reduce turnover", "Other"],
      outcomeOther: "Need a handbook rewrite before we open a second site",
      timeline: "Immediately",
    });

    assert.equal(
      payload.outcomes,
      "Reduce turnover; Other: Need a handbook rewrite before we open a second site"
    );
    assert.equal(
      payload.outcomeOther,
      "Need a handbook rewrite before we open a second site"
    );
    assert.match(
      payload.message,
      /What matters most: Reduce turnover; Other: Need a handbook rewrite before we open a second site/
    );
    assert.match(
      payload.message,
      /Other outcome detail: Need a handbook rewrite before we open a second site/
    );
  });

  it("keeps the original subject when priorities have not been collected yet", () => {
    const payload = buildAssessmentFormspreePayload({
      contact,
      completedAt: "2026-09-02T12:00:00.000Z",
    });

    assert.equal(payload.outcomes, "");
    assert.equal(payload.timeline, "");
    assert.equal(
      payload._subject.startsWith("People & Growth Assessment — "),
      true
    );
    assert.equal(payload.message.includes("What matters most:"), false);
  });
});

describe("booking URL", () => {
  it("uses the Google Appointment scheduling link and exact CTA label", () => {
    assert.equal(
      BOOKING_URL,
      "https://calendar.app.google/ZFCQCVsqrkq9RUTp6"
    );
    assert.equal(BOOKING_LABEL, "Schedule a 30-minute results review");
  });
});

describe("priority send idempotency", () => {
  it("treats the same outcomes, Other text, and timing as already sent", () => {
    const record = {
      ...emptyRecord(),
      outcomes: ["Other", "Reduce turnover"],
      outcomeOther: "Need a handbook rewrite",
      timeline: "Within the next 30 days",
      prioritiesSubmittedAt: "2026-09-03T00:00:00.000Z",
      prioritiesFingerprint: prioritiesFingerprint({
        outcomes: ["Reduce turnover", "Other"],
        outcomeOther: "Need a handbook rewrite",
        timeline: "Within the next 30 days",
      }),
    };

    assert.equal(hasPriorities(record), true);
    assert.equal(alreadySentPriorities(record), true);

    const changed = { ...record, timeline: "Immediately" };
    assert.equal(alreadySentPriorities(changed), false);
  });
});
