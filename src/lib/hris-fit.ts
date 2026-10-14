import type { AssessmentRecord } from "@/lib/storage";

export type HrisFitSignals = {
  recordsLow?: boolean;
  onboardingLow?: boolean;
  repeatabilityLow?: boolean;
  ownerDependenceHigh?: boolean;
  multiState?: boolean;
};

export type HrisFitScore = {
  signals: HrisFitSignals;
};

const TAILORED_LINES: Array<{ key: keyof HrisFitSignals; line: string }> = [
  {
    key: "recordsLow",
    line: "Records and licenses in one place, with renewal dates you can see coming.",
  },
  {
    key: "onboardingLow",
    line: "A guided onboarding path so every new hire gets the same start.",
  },
  {
    key: "repeatabilityLow",
    line: "Processes built in once and repeated the same way at every location.",
  },
  {
    key: "ownerDependenceHigh",
    line: "Set up so HR doesn't live in one person's head.",
  },
  {
    key: "multiState",
    line: "Rules that follow the state where each person works. (coming)",
  },
];

/**
 * Fit scoring is not built yet. A null score means the tailored results
 * block must not render.
 */
export function hrisFitScore(record: AssessmentRecord | null): HrisFitScore | null {
  if (!record?.completedAt) return null;
  return null;
}

export function shouldRenderHrisTailoredBlock(
  fit: HrisFitScore | null
): fit is HrisFitScore {
  return fit != null;
}

export function tailoredLinesForFit(fit: HrisFitScore | null): string[] {
  if (!shouldRenderHrisTailoredBlock(fit)) return [];
  return TAILORED_LINES.filter((item) => fit.signals[item.key]).map((item) => item.line);
}
