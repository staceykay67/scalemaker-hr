import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  alreadySentPriorities,
  hasPriorities,
  prioritiesFingerprint,
} from "@/lib/assessment-lead";
import { emptyRecord } from "@/lib/storage";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site-contact";
import { buildAssessmentFormspreePayload, buildContactFormspreePayload } from "@/lib/form-payloads";
import { readSystemsAnswers } from "@/lib/systems-data";

const contact = {
  firstName: "Stacey",
  lastName: "Kay",
  businessName: "Scalemaker HR",
  email: "staceykay@scalemakerhr.com",
  phone: "",
  issue: "",
  schedule: "yes",
};

describe("contact form payload", () => {
  it("labels the stored HRis topic as HRis walk through in the notification", () => {
    const payload = buildContactFormspreePayload({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "We would like a walk-through.",
      topic: "hris-pilot",
    });

    assert.equal(payload.topic, "HRis walk through");
    assert.equal(payload._subject, "Scalemaker HR website contact — HRis walk through");
  });

  it("leaves the topic off a general message", () => {
    const payload = buildContactFormspreePayload({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "",
      business: "Northwind",
      topic: "",
    });

    assert.equal(payload.topic, undefined);
    assert.equal(payload.message, "");
    assert.equal(payload.business, "Northwind");
    assert.equal(payload._subject, "Scalemaker HR website contact");
  });
});

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
    assert.equal(payload.hrisInterest, "No");
    assert.match(payload.message, /HRis interest: No/);
    assert.equal(payload.scoringVersion, "v2");
    assert.match(payload.message, /Scoring version: v2/);
    assert.match(payload.message, /Don't know count:/);
    assert.match(payload.message, /Limited information:/);
    assert.match(payload.message, /Coverage:/);
  });

  it("includes HRis interest in the lead payload", () => {
    const interested = buildAssessmentFormspreePayload({
      contact,
      hrisInterest: true,
      completedAt: "2026-10-14T12:00:00.000Z",
    });
    assert.equal(interested.hrisInterest, "Yes");
    assert.match(interested.message, /HRis interest: Yes/);

    const declined = buildAssessmentFormspreePayload({
      contact,
      hrisInterest: false,
    });
    assert.equal(declined.hrisInterest, "No");
    assert.match(declined.message, /HRis interest: No/);
  });

  it("leaves HRis interest unchecked unless the visitor opts in", () => {
    assert.equal(emptyRecord().hrisInterest, false);
  });

  it("adds a systems block to the same lead email", () => {
    const payload = buildAssessmentFormspreePayload({
      contact,
      hrisInterest: false,
      profile: { states: "Arizona" },
      likert: { q8: "agree", q21: "agree" },
      systems: readSystemsAnswers({
        tools: { payroll: ["ADP"], records: ["BambooHR"] },
        monthlySpend: "$250–$999",
        adminWho: "Office or operations manager",
        backup: "Yes",
        frustrations: ["Hard to use"],
        hirePlaces: "1",
        sharing: "Some do",
        i9: "In an HR or payroll system",
      }),
    });

    assert.match(payload._subject, /systems map/);
    assert.match(payload.message, /Systems Score:/);
    assert.match(payload.message, /Recommendation hypothesis:/);
    assert.match(payload.message, /HRis interest: No/);
    assert.equal(/savings/i.test(payload.message), false);
    assert.equal(payload.hrisInterest, "No");
  });
});

describe("booking URL", () => {
  it("uses the Google Appointment scheduling link and exact CTA label", () => {
    assert.equal(
      BOOKING_URL,
      "https://calendar.app.google/ZFCQCVsqrkq9RUTp6"
    );
    assert.equal(BOOKING_LABEL, "Schedule a complimentary 30-minute results review");
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
