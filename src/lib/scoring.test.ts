import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CATEGORIES,
  LIKERT_OPTIONS,
  RESULT_COPY,
  SCORED_QUESTIONS,
  TOTAL_POSSIBLE,
  type CategoryId,
  type ResultTier,
} from "@/lib/assessment-data";
import {
  DONT_KNOW_LABEL,
  displayPercent,
  limitedInformationNote,
  scoreAssessment,
  tierForPercent,
  type AssessmentScores,
} from "@/lib/scoring";

const V1_POINTS: Record<string, number> = {
  strongly_disagree: 1,
  disagree: 2,
  neither: 3,
  agree: 4,
  strongly_agree: 5,
  unsure: 3,
};

function fill(value: string, overrides: Record<string, string> = {}): Record<string, string> {
  const likert: Record<string, string> = {};
  for (const question of SCORED_QUESTIONS) {
    likert[question.id] = overrides[question.id] ?? value;
  }
  return likert;
}

function ids(categoryId: CategoryId): string[] {
  return CATEGORIES.find((category) => category.id === categoryId)?.questionIds ?? [];
}

function scoreV1(likert: Record<string, string | undefined>): {
  points: number;
  percent: number;
  tier: ResultTier;
  band: string;
} {
  let points = 0;
  for (const question of SCORED_QUESTIONS) {
    const value = likert[question.id];
    points += value ? (V1_POINTS[value] ?? 0) : 0;
  }
  const percent = Math.round((points / TOTAL_POSSIBLE) * 100);
  const tier = tierForPercent(percent);
  return { points, percent, tier, band: RESULT_COPY[tier].name };
}

function v2Label(scores: AssessmentScores): string {
  if (!scores.overallAvailable || scores.displayPercent === null || !scores.tier) {
    return "withheld";
  }
  return `${scores.displayPercent}% ${RESULT_COPY[scores.tier].name}`;
}

const comparison: { name: string; likert: Record<string, string> }[] = [];

function compare(name: string, likert: Record<string, string>): AssessmentScores {
  comparison.push({ name, likert });
  return scoreAssessment(likert, []);
}

describe("scoring v2", () => {
  it("has no Not applicable option and renames Unsure without changing the stored key", () => {
    const labels = LIKERT_OPTIONS.map((option) => option.label.toLowerCase());
    assert.equal(labels.some((label) => label.includes("not applicable")), false);
    const values = LIKERT_OPTIONS.map((option) => option.value as string);
    assert.equal(values.includes("n/a"), false);
    const dontKnow = LIKERT_OPTIONS.find((option) => option.value === "unsure");
    assert.equal(dontKnow?.label, DONT_KNOW_LABEL);
    assert.equal(dontKnow?.points, 0);
  });

  it("withholds the overall score when fewer than 14 statements are scored", () => {
    const overrides: Record<string, string> = {};
    for (const category of CATEGORIES) {
      overrides[category.questionIds[2]] = "unsure";
    }
    const scores = compare("12 scored, one don't-know in each area", fill("agree", overrides));
    assert.equal(scores.scoredCount, 12);
    assert.equal(scores.coverageMet, false);
    assert.equal(scores.overallAvailable, false);
    assert.equal(scores.tier, null);
    assert.equal(scores.areasWorthExploring.length, 0);
    assert.equal(scores.categories.every((area) => area.note === "based on 2 of 3 statements"), true);
  });

  it("withholds the overall band when any area has fewer than 2 scored statements", () => {
    const [first, second, third] = ids("foundation");
    const scores = compare(
      "one area with 1 scored statement",
      fill("strongly_agree", { [second]: "unsure", [third]: "unsure" })
    );
    assert.equal(scores.scoredCount, 16);
    assert.equal(scores.categories[0].id, "foundation");
    assert.equal(scores.categories[0].scoredCount, 1);
    assert.equal(scores.categories[0].note, "Not enough information");
    assert.equal(scores.categories[0].percent, null);
    assert.equal(scores.overallAvailable, false);
    assert.equal(scores.tier, null);
    assert.equal(scores.areasWorthExploring.length, 0);
    assert.equal(first.length > 0, true);
  });

  it("shows an area score with a 2-of-3 note when exactly two statements are scored", () => {
    const [, , third] = ids("foundation");
    const scores = compare(
      "one area based on 2 of 3",
      fill("agree", { [third]: "unsure" })
    );
    const foundation = scores.categories[0];
    assert.equal(foundation.scoredCount, 2);
    assert.equal(foundation.note, "based on 2 of 3 statements");
    assert.equal(foundation.displayPercent, 80);
    assert.equal(scores.overallAvailable, true);
    assert.equal(scores.scoredCount, 17);
  });

  it("breaks area ties by lower percent, then fewer scored statements, then category order", () => {
    const foundation = ids("foundation");
    const leadership = ids("leadership");
    const hiring = ids("hiring");
    const tied = compare(
      "tie on percent, fewer scored wins",
      fill("strongly_agree", {
        [foundation[0]]: "disagree",
        [foundation[1]]: "disagree",
        [foundation[2]]: "unsure",
        [leadership[0]]: "disagree",
        [leadership[1]]: "disagree",
        [leadership[2]]: "disagree",
        [hiring[0]]: "disagree",
        [hiring[1]]: "disagree",
        [hiring[2]]: "unsure",
      })
    );
    assert.equal(tied.overallAvailable, true);
    assert.deepEqual(
      tied.areasWorthExploring.map((area) => area.id),
      ["foundation", "hiring"]
    );

    const ordered = compare(
      "tie on percent and count uses category order",
      fill("strongly_agree", {
        [foundation[0]]: "disagree",
        [foundation[1]]: "disagree",
        [foundation[2]]: "unsure",
        [leadership[0]]: "disagree",
        [leadership[1]]: "disagree",
        [leadership[2]]: "unsure",
      })
    );
    assert.deepEqual(
      ordered.areasWorthExploring.map((area) => area.id),
      ["foundation", "leadership"]
    );
  });

  it("assigns bands from the unrounded percent and rounds only for display", () => {
    assert.equal(tierForPercent(44.9), "foundation-at-risk");
    assert.equal(displayPercent(44.9), 45);
    assert.equal(tierForPercent(45), "growth-constrained");
    assert.equal(displayPercent(45), 45);
    assert.equal(tierForPercent(64.9), "growth-constrained");
    assert.equal(displayPercent(64.9), 65);
    assert.equal(tierForPercent(65), "developing");
    assert.equal(displayPercent(65), 65);
    assert.equal(tierForPercent(79.6), "developing");
    assert.equal(displayPercent(79.6), 80);
    assert.equal(tierForPercent(80), "scale-ready");
    assert.equal(displayPercent(80), 80);

    const at45Likert = fill("disagree", {
      q19: "neither",
      q20: "neither",
      q21: "",
      q22: "neither",
      q23: "neither",
      q24: "",
    });
    const grid45 = compare("grid at 45", at45Likert);
    assert.equal(grid45.scoredCount, 16);
    assert.equal(grid45.percent, 45);
    assert.equal(grid45.tier, "growth-constrained");
    assert.equal(grid45.displayPercent, 45);

    const at65Likert = {
      ...fill("agree", {
        q19: "strongly_disagree",
        q20: "strongly_disagree",
        q22: "strongly_disagree",
        q23: "strongly_disagree",
      }),
      q21: "",
      q24: "",
    };
    const grid65 = compare("grid at 65", at65Likert);
    assert.equal(grid65.percent, 65);
    assert.equal(grid65.tier, "developing");

    const grid80 = compare("all agree", fill("agree"));
    assert.equal(grid80.percent, 80);
    assert.equal(grid80.tier, "scale-ready");
    assert.equal(grid80.displayPercent, 80);
  });

  it("shows a limited-information note when 3 or more answers are don't-know", () => {
    const scores = compare(
      "three don't-know answers with a band",
      fill("agree", { q9: "unsure", q12: "unsure", q15: "unsure" })
    );
    assert.equal(scores.dontKnowCount, 3);
    assert.equal(scores.excludedCount, 3);
    assert.equal(scores.limitedInformation, true);
    assert.equal(scores.overallAvailable, true);
    assert.equal(scores.tier, "scale-ready");
    assert.equal(scores.scoredCount, 15);
    assert.match(limitedInformationNote(3, 15), /3 responses were excluded/);
    assert.match(limitedInformationNote(3, 15), /15 scored statements/);
    assert.deepEqual(
      scores.dontKnowStatements.map((item) => item.id),
      ["q9", "q12", "q15"]
    );
  });

  it("keeps the 20% floor when every scored answer is strongly disagree", () => {
    const scores = compare("all strongly disagree", fill("strongly_disagree"));
    assert.equal(scores.percent, 20);
    assert.equal(scores.displayPercent, 20);
    assert.equal(scores.tier, "foundation-at-risk");
  });

  it("maps an old unsure payload to don't-know instead of 3 points", () => {
    const scores = compare("all old unsure values", fill("unsure"));
    assert.equal(scores.scoredCount, 0);
    assert.equal(scores.dontKnowCount, 18);
    assert.equal(scores.points, 0);
    assert.equal(scores.overallAvailable, false);
    const mixed = compare(
      "old unsure mixed with agree",
      fill("agree", { q9: "unsure", q12: "unsure", q15: "unsure" })
    );
    assert.equal(mixed.points, 60);
    assert.equal(mixed.percent, 80);
  });

  it("scores the overall from every scored statement, not the average of area percents", () => {
    const [first, second, third] = ids("foundation");
    const scores = compare(
      "overall is not the average of areas",
      fill("strongly_agree", {
        [first]: "strongly_disagree",
        [second]: "strongly_disagree",
        [third]: "unsure",
      })
    );
    assert.equal(scores.overallAvailable, true);
    const areaAverage =
      scores.categories.reduce((sum, area) => sum + (area.percent ?? 0), 0) /
      scores.categories.length;
    assert.notEqual(scores.percent, areaAverage);
    assert.equal(scores.percent, (77 / 85) * 100);
  });

  it("reports v1 against v2 for synthetic leads shaped like stored answers", () => {
    assert.equal(comparison.length > 0, true);
    const lines = [
      "case | v1 score/band | v2 score/band",
      "--- | --- | ---",
    ];
    for (const item of comparison) {
      const previous = scoreV1(item.likert);
      const next = scoreAssessment(item.likert, []);
      lines.push(
        `${item.name} | ${previous.percent}% ${previous.band} | ${v2Label(next)}`
      );
    }
    console.log(lines.join("\n"));
    const previous = scoreV1(fill("unsure"));
    assert.equal(previous.band, "Growth Constrained");
    assert.equal(v2Label(scoreAssessment(fill("unsure"), [])), "withheld");
  });
});
