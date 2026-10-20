import {
  CATEGORIES,
  RESULT_COPY,
  RISK_OPTIONS,
  SCORED_QUESTIONS,
  type CategoryId,
  type LikertValue,
  type ResultTier,
} from "@/lib/assessment-data";

export const SCORING_VERSION = "v2" as const;
export const DONT_KNOW_VALUE = "unsure" as const;
export const DONT_KNOW_LABEL = "Don't know / not enough information";
export const OVERALL_MINIMUM_SCORED = 14;
export const AREA_MINIMUM_SCORED = 2;
export const STATEMENTS_PER_AREA = 3;
export const TOTAL_STATEMENTS = SCORED_QUESTIONS.length;
export const LIMITED_INFORMATION_AT = 3;
export const POINT_SCALE = 5;

export const RESULTS_CAVEAT =
  "Your score reflects your responses to this assessment. It is a starting point for identifying potential strengths and areas to explore, not a compliance rating or a prediction of business performance.";

export const INSUFFICIENT_OVERALL_MESSAGE =
  "There isn't enough information for an overall score. An overall score needs at least 14 of 18 statements scored, and at least 2 scored statements in every area.";

const SCORED_POINTS: Record<string, number> = {
  strongly_disagree: 1,
  disagree: 2,
  neither: 3,
  agree: 4,
  strongly_agree: 5,
};

export function isDontKnowAnswer(value: string | undefined | null): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase().replace(/\s+/g, " ");
  return (
    normalized === DONT_KNOW_VALUE ||
    normalized === "don't know" ||
    normalized === "dont know" ||
    normalized === "don't know / not enough information" ||
    normalized === "dont know / not enough information"
  );
}

export function isScoredAnswer(value: string | undefined | null): boolean {
  if (!value || isDontKnowAnswer(value)) return false;
  return SCORED_POINTS[value] !== undefined;
}

export function likertPoints(value: LikertValue | string | undefined): number {
  if (!value || isDontKnowAnswer(value)) return 0;
  return SCORED_POINTS[value] ?? 0;
}

export function tierForPercent(percent: number): ResultTier {
  if (percent >= 80) return "scale-ready";
  if (percent >= 65) return "developing";
  if (percent >= 45) return "growth-constrained";
  return "foundation-at-risk";
}

export function displayPercent(percent: number): number {
  return Math.round(percent);
}

export function resultCopy(tier: ResultTier) {
  return RESULT_COPY[tier];
}

export type CategoryScore = {
  id: CategoryId;
  name: string;
  points: number;
  scoredCount: number;
  percent: number | null;
  displayPercent: number | null;
  enough: boolean;
  note: string | null;
};

export type DontKnowStatement = {
  id: string;
  text: string;
};

export type AssessmentScores = {
  scoringVersion: typeof SCORING_VERSION;
  points: number;
  scoredCount: number;
  dontKnowCount: number;
  dontKnowStatements: DontKnowStatement[];
  excludedCount: number;
  percent: number | null;
  displayPercent: number | null;
  tier: ResultTier | null;
  overallAvailable: boolean;
  limitedInformation: boolean;
  coverageMet: boolean;
  areasMet: boolean;
  categories: CategoryScore[];
  areasWorthExploring: CategoryScore[];
  criticalAttention: boolean;
  businessImpact: boolean;
};

function categoryOrder(id: CategoryId): number {
  const index = CATEGORIES.findIndex((category) => category.id === id);
  return index === -1 ? CATEGORIES.length : index;
}

export function compareAreasForExploration(a: CategoryScore, b: CategoryScore): number {
  const aPercent = a.percent ?? Number.POSITIVE_INFINITY;
  const bPercent = b.percent ?? Number.POSITIVE_INFINITY;
  if (aPercent !== bPercent) return aPercent - bPercent;
  if (a.scoredCount !== b.scoredCount) return a.scoredCount - b.scoredCount;
  return categoryOrder(a.id) - categoryOrder(b.id);
}

export function areaNote(scoredCount: number): string | null {
  if (scoredCount < AREA_MINIMUM_SCORED) return "Not enough information";
  if (scoredCount === AREA_MINIMUM_SCORED) {
    return `based on ${scoredCount} of ${STATEMENTS_PER_AREA} statements`;
  }
  return null;
}

export function limitedInformationNote(dontKnowCount: number, scoredCount: number): string {
  const responseLabel = dontKnowCount === 1 ? "response was" : "responses were";
  const statementLabel = scoredCount === 1 ? "statement" : "statements";
  return `Limited information: ${dontKnowCount} ${responseLabel} excluded as ${DONT_KNOW_LABEL}. This result uses ${scoredCount} scored ${statementLabel}.`;
}

export function coverageSummary(scores: AssessmentScores): string {
  const gaps = scores.categories
    .filter((category) => !category.enough)
    .map(
      (category) =>
        `${category.name}: ${category.scoredCount} of ${STATEMENTS_PER_AREA} scored`
    );
  const areaClause = scores.areasMet
    ? "every area has at least 2 scored statements"
    : gaps.join("; ");
  return `${scores.scoredCount}/${TOTAL_STATEMENTS} scored; ${areaClause}`;
}

export function scoreAssessment(
  likert: Record<string, LikertValue | string | undefined>,
  risks: string[]
): AssessmentScores {
  const dontKnowStatements: DontKnowStatement[] = [];
  let scoredCount = 0;
  let points = 0;

  const categories: CategoryScore[] = CATEGORIES.map((category) => {
    let areaPoints = 0;
    let areaScored = 0;
    for (const id of category.questionIds) {
      const value = likert[id];
      if (isDontKnowAnswer(value)) {
        const question = SCORED_QUESTIONS.find((item) => item.id === id);
        dontKnowStatements.push({ id, text: question?.text ?? id });
        continue;
      }
      if (!isScoredAnswer(value)) continue;
      areaPoints += SCORED_POINTS[value as string];
      areaScored += 1;
    }
    scoredCount += areaScored;
    points += areaPoints;
    const enough = areaScored >= AREA_MINIMUM_SCORED;
    const percent = enough ? (areaPoints / (areaScored * POINT_SCALE)) * 100 : null;
    return {
      id: category.id,
      name: category.name,
      points: areaPoints,
      scoredCount: areaScored,
      percent,
      displayPercent: percent === null ? null : displayPercent(percent),
      enough,
      note: areaNote(areaScored),
    };
  });

  const areasMet = categories.every((category) => category.enough);
  const coverageMet = scoredCount >= OVERALL_MINIMUM_SCORED;
  const overallAvailable = coverageMet && areasMet;
  const percent = overallAvailable ? (points / (scoredCount * POINT_SCALE)) * 100 : null;
  const areasWorthExploring = overallAvailable
    ? [...categories].filter((category) => category.enough).sort(compareAreasForExploration).slice(0, 2)
    : [];

  const selected = new Set(risks);
  const criticalAttention = RISK_OPTIONS.some(
    (option) => option.flag === "critical" && selected.has(option.id)
  );
  const businessImpact = RISK_OPTIONS.some(
    (option) => option.flag === "business" && selected.has(option.id)
  );

  return {
    scoringVersion: SCORING_VERSION,
    points,
    scoredCount,
    dontKnowCount: dontKnowStatements.length,
    dontKnowStatements,
    excludedCount: dontKnowStatements.length,
    percent,
    displayPercent: percent === null ? null : displayPercent(percent),
    tier: percent === null ? null : tierForPercent(percent),
    overallAvailable,
    limitedInformation: dontKnowStatements.length >= LIMITED_INFORMATION_AT,
    coverageMet,
    areasMet,
    categories,
    areasWorthExploring,
    criticalAttention,
    businessImpact,
  };
}
