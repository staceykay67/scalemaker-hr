import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  EARLY_ACCESS_LABEL,
  hrisCopyText,
  hrisFaqs,
  hrisPilotFeatures,
} from "@/lib/hris-copy";
import { HRIS_INTEREST_HELP, HRIS_INTEREST_LABEL } from "@/lib/hris-interest";
import { sitemapEntries } from "@/lib/site-sitemap";

describe("HRis page copy", () => {
  it("marks onboarding and time off as available in early access", () => {
    const early = hrisPilotFeatures.filter((feature) => feature.earlyAccess);
    assert.deepEqual(
      early.map((feature) => feature.title),
      ["Guided onboarding.", "Time off."]
    );
    assert.equal(EARLY_ACCESS_LABEL, "available in early access");
  });

  it("leaves pricing out of the page", () => {
    const text = hrisCopyText();
    assert.equal(/\b(price|prices|pricing|cost)\b|\$\d/i.test(text), false);
    assert.equal(
      hrisFaqs.some((item) => /cost|pric/i.test(item.question + item.answer)),
      false
    );
    assert.equal(/what does it cost/i.test(text), false);
    assert.equal(/\bSOC\s*2\b|\bpen test\b|\bLite\b/i.test(text), false);
  });
});

describe("HRis interest checkbox", () => {
  it("uses the approved label and a short helper", () => {
    assert.equal(HRIS_INTEREST_LABEL, "I'm interested in the Scalemaker HRis platform");
    assert.match(HRIS_INTEREST_HELP, /early-access pilot/i);
    assert.match(HRIS_INTEREST_HELP, /sample data/i);
    assert.equal(HRIS_INTEREST_HELP.length < 280, true);
  });
});

describe("sitemap", () => {
  it("does not include the gated HRis page", () => {
    const paths = sitemapEntries().map((entry) => new URL(entry.url).pathname);
    assert.equal(paths.includes("/hris"), false);
    assert.equal(paths.some((path) => path.startsWith("/hris")), false);
    assert.equal(paths.includes("/about"), true);
  });
});
