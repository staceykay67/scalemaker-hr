import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site-contact";
import { emptyRecord } from "@/lib/storage";
import {
  alreadySentWhatMatters,
  buildAssessmentLeadBody,
  shouldSendWhatMattersOnSchedule,
  validateWhatMatters,
  WHAT_MATTERS_ERRORS,
} from "@/lib/what-matters";

const filled = {
  outcomes: ["Reduce turnover", "Other"],
  outcomeOther: "Need a handbook rewrite",
  timeline: "Within the next 30 days",
  prioritiesSubmittedAt: null as string | null,
};

describe("validateWhatMatters", () => {
  it("requires at least one outcome", () => {
    assert.equal(
      validateWhatMatters({
        outcomes: [],
        outcomeOther: "",
        timeline: "Immediately",
      }),
      WHAT_MATTERS_ERRORS.outcomes
    );
  });

  it("requires Other text when Other is selected", () => {
    assert.equal(
      validateWhatMatters({
        outcomes: ["Other"],
        outcomeOther: "   ",
        timeline: "Immediately",
      }),
      WHAT_MATTERS_ERRORS.other
    );
  });

  it("requires a timeline", () => {
    assert.equal(
      validateWhatMatters({
        outcomes: ["Reduce turnover"],
        outcomeOther: "",
        timeline: "",
      }),
      WHAT_MATTERS_ERRORS.timeline
    );
  });

  it("accepts a complete selection", () => {
    assert.equal(validateWhatMatters(filled), null);
  });
});

describe("shouldSendWhatMattersOnSchedule", () => {
  it("sends current outcomes, Other text, and timing when not yet submitted", () => {
    assert.equal(shouldSendWhatMattersOnSchedule(filled), true);
  });

  it("sends a partial selection without requiring explicit Submit validation", () => {
    assert.equal(
      shouldSendWhatMattersOnSchedule({
        outcomes: ["Improve recruiting"],
        outcomeOther: "",
        timeline: "",
      }),
      true
    );
  });

  it("is idempotent after a successful submit", () => {
    assert.equal(
      shouldSendWhatMattersOnSchedule({
        ...filled,
        prioritiesSubmittedAt: "2026-09-03T00:00:00.000Z",
      }),
      false
    );
    assert.equal(shouldSendWhatMattersOnSchedule(filled, "sent"), false);
  });

  it("does not start a second request while a send is in flight", () => {
    assert.equal(shouldSendWhatMattersOnSchedule(filled, "sending"), false);
  });

  it("does not POST when there is nothing to save", () => {
    assert.equal(
      shouldSendWhatMattersOnSchedule({
        outcomes: [],
        outcomeOther: "",
        timeline: "",
      }),
      false
    );
  });
});

describe("alreadySentWhatMatters", () => {
  it("treats a stored timestamp as already submitted", () => {
    assert.equal(
      alreadySentWhatMatters({
        ...filled,
        prioritiesSubmittedAt: "2026-09-03T00:00:00.000Z",
      }),
      true
    );
  });
});

describe("buildAssessmentLeadBody", () => {
  it("includes what-matters fields for the assessment lead", () => {
    const record = {
      ...emptyRecord(),
      outcomes: filled.outcomes,
      outcomeOther: filled.outcomeOther,
      timeline: filled.timeline,
      completedAt: "2026-09-03T00:00:00.000Z",
    };
    const body = buildAssessmentLeadBody(record);
    assert.deepEqual(body.outcomes, filled.outcomes);
    assert.equal(body.outcomeOther, filled.outcomeOther);
    assert.equal(body.timeline, filled.timeline);
    assert.equal(body.completedAt, record.completedAt);
  });
});

describe("results review booking CTA", () => {
  it("uses the exact 30-minute label and Google Appointment URL", () => {
    assert.equal(BOOKING_LABEL, "Schedule a 30-minute results review");
    assert.equal(BOOKING_URL, "https://calendar.app.google/ZFCQCVsqrkq9RUTp6");
  });
});
