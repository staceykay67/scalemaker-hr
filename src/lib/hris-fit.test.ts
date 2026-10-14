import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { emptyRecord } from "@/lib/storage";
import {
  hrisFitScore,
  shouldRenderHrisTailoredBlock,
  tailoredLinesForFit,
  type HrisFitScore,
} from "@/lib/hris-fit";

describe("HRis tailored results block", () => {
  it("does not render until a fit score exists", () => {
    const completed = { ...emptyRecord(), completedAt: "2026-10-14T00:00:00.000Z" };
    assert.equal(hrisFitScore(null), null);
    assert.equal(hrisFitScore(emptyRecord()), null);
    assert.equal(hrisFitScore(completed), null);
    assert.equal(shouldRenderHrisTailoredBlock(hrisFitScore(completed)), false);
    assert.deepEqual(tailoredLinesForFit(null), []);
  });

  it("lists the matching lines once a fit score exists", () => {
    const fit: HrisFitScore = {
      signals: { recordsLow: true, onboardingLow: true, multiState: true },
    };
    assert.equal(shouldRenderHrisTailoredBlock(fit), true);
    assert.deepEqual(tailoredLinesForFit(fit), [
      "Records and licenses in one place, with renewal dates you can see coming.",
      "A guided onboarding path so every new hire gets the same start.",
      "Rules that follow the state where each person works. (coming)",
    ]);
  });
});
