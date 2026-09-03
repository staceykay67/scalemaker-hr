import { OTHER_OUTCOME } from "@/lib/assessment-data";
import type { AssessmentRecord } from "@/lib/storage";

export type WhatMattersInput = {
  outcomes: string[];
  outcomeOther: string;
  timeline: string;
  prioritiesSubmittedAt?: string | null;
};

export type PrioritySendStatus = "idle" | "sending" | "sent" | "error";

export const WHAT_MATTERS_ERRORS = {
  outcomes: "Please select at least one outcome that matters most.",
  other: "Please describe the other outcome that matters most.",
  timeline: "Please tell us when you would ideally begin.",
} as const;

export function validateWhatMatters(input: WhatMattersInput): string | null {
  if (input.outcomes.length === 0) {
    return WHAT_MATTERS_ERRORS.outcomes;
  }
  if (input.outcomes.includes(OTHER_OUTCOME) && !input.outcomeOther.trim()) {
    return WHAT_MATTERS_ERRORS.other;
  }
  if (!input.timeline.trim()) {
    return WHAT_MATTERS_ERRORS.timeline;
  }
  return null;
}

export function hasWhatMattersContent(input: WhatMattersInput): boolean {
  return (
    input.outcomes.length > 0 ||
    Boolean(input.outcomeOther.trim()) ||
    Boolean(input.timeline.trim())
  );
}

export function alreadySentWhatMatters(
  input: WhatMattersInput,
  status?: PrioritySendStatus
): boolean {
  return Boolean(input.prioritiesSubmittedAt) || status === "sent" || status === "sending";
}

/** Schedule click sends current values without a second Submit. Skip if already sent or empty. */
export function shouldSendWhatMattersOnSchedule(
  input: WhatMattersInput,
  status?: PrioritySendStatus
): boolean {
  if (alreadySentWhatMatters(input, status)) return false;
  return hasWhatMattersContent(input);
}

export function buildAssessmentLeadBody(record: AssessmentRecord) {
  return {
    contact: record.contact,
    profile: record.profile,
    likert: record.likert,
    risks: record.risks,
    impact: record.impact,
    outcomes: record.outcomes,
    outcomeOther: record.outcomeOther,
    timeline: record.timeline,
    completedAt: record.completedAt,
  };
}
