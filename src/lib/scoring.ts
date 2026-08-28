import {
  CATEGORIES,
  CATEGORY_POSSIBLE,
  LIKERT_OPTIONS,
  RESULT_COPY,
  RISK_OPTIONS,
  SCORED_QUESTIONS,
  TOTAL_POSSIBLE,
  type CategoryId,
  type LikertValue,
  type ResultTier,
} from "@/lib/assessment-data";

const POINTS = Object.fromEntries(
  LIKERT_OPTIONS.map((option) => [option.value, option.points])
) as Record<LikertValue, number>;

export type CategoryScore = {
  id: CategoryId;
  name: string;
  points: number;
  percent: number;
};

export type AssessmentScores = {
  points: number;
  percent: number;
  tier: ResultTier;
  categories: CategoryScore[];
  lowestCategories: CategoryScore[];
  criticalAttention: boolean;
  businessImpact: boolean;
};

export function likertPoints(value: LikertValue | undefined): number {
  if (!value) return 0;
  return POINTS[value] ?? 0;
}

export function tierForPercent(percent: number): ResultTier {
  if (percent >= 80) return "scale-ready";
  if (percent >= 65) return "developing";
  if (percent >= 45) return "growth-constrained";
  return "foundation-at-risk";
}

export function scoreAssessment(
  likert: Record<string, LikertValue | undefined>,
  risks: string[]
): AssessmentScores {
  const categories: CategoryScore[] = CATEGORIES.map((category) => {
    const points = category.questionIds.reduce(
      (sum, id) => sum + likertPoints(likert[id]),
      0
    );
    return {
      id: category.id,
      name: category.name,
      points,
      percent: Math.round((points / CATEGORY_POSSIBLE) * 100),
    };
  });

  const points = SCORED_QUESTIONS.reduce(
    (sum, question) => sum + likertPoints(likert[question.id]),
    0
  );
  const percent = Math.round((points / TOTAL_POSSIBLE) * 100);
  const sorted = [...categories].sort((a, b) => a.percent - b.percent);

  const selected = new Set(risks);
  const criticalAttention = RISK_OPTIONS.some(
    (option) => option.flag === "critical" && selected.has(option.id)
  );
  const businessImpact = RISK_OPTIONS.some(
    (option) => option.flag === "business" && selected.has(option.id)
  );

  return {
    points,
    percent,
    tier: tierForPercent(percent),
    categories,
    lowestCategories: sorted.slice(0, 2),
    criticalAttention,
    businessImpact,
  };
}

export function resultCopy(tier: ResultTier) {
  return RESULT_COPY[tier];
}
