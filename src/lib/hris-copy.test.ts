import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  GRADUATE_LINE,
  STEADY_PARTNER,
  hrisCopyText,
  hrisFaqs,
  hrisFeatures,
  hrisHero,
  hrisModes,
  hrisOneTeam,
  hrisResultsBlock,
  hrisWalkthrough,
} from "@/lib/hris-copy";
import {
  HRIS_INTEREST_HELP,
  HRIS_INTEREST_LABEL,
  HRIS_PILOT_CONTACT_PATH,
  HRIS_PILOT_TOPIC_LABEL,
} from "@/lib/hris-interest";
import { sitemapEntries } from "@/lib/site-sitemap";

describe("HRis page copy", () => {
  it("uses the approved hero and keeps pricing out", () => {
    assert.equal(hrisHero.eyebrow, "Scalemaker HRis");
    assert.equal(hrisHero.headline, "One place to run HR, set up by people who know HR.");
    assert.equal(hrisHero.primaryCta, "Request a walkthrough");
    assert.equal(hrisHero.earlyAccess, "Now in early access.");
    assert.equal(hrisHero.secondaryCta, "Take the free assessment");
    assert.equal(hrisWalkthrough.earlyAccess, "Now in early access.");
    assert.match(hrisWalkthrough.note, /free assessment/);

    const text = hrisCopyText();
    assert.equal(/\b(price|prices|pricing|cost)\b|\$\d/i.test(text), false);
    assert.equal(/Available in early access|Coming/.test(text), false);
    assert.equal(
      hrisFaqs.some((item) => /cost|pric/i.test(item.question + item.answer)),
      false
    );
    assert.equal(
      hrisFaqs.some((item) => item.question === "Does it replace my payroll provider?"),
      true
    );
    assert.equal(hrisFaqs.some((item) => item.question === "Can I leave?"), true);
    assert.equal(
      hrisOneTeam.points[2].body,
      "Stay as long as we fit. Graduate when you outgrow us. Your data is yours to export anytime."
    );
    assert.equal(hrisModes.modes[1].title, "Full file.");
    assert.match(text, /People records and self-service/);
    assert.match(text, /Benefits enrollment/);
    assert.match(text, /E-signature/);
    assert.equal(hrisFeatures.length, 15);
    assert.equal(
      hrisFeatures.every((feature) => feature.body.length > 0),
      true
    );
  });
});

describe("HRis results block", () => {
  it("uses the standard block and skips tailored lines", () => {
    assert.equal(hrisResultsBlock.heading, "Your systems may be part of the strain.");
    assert.equal(hrisResultsBlock.linkLabel, "Learn about Scalemaker HRis");
    assert.equal(hrisResultsBlock.linkHref, "/hris");
    assert.equal(
      hrisResultsBlock.paragraphs[1],
      "That's why we built Scalemaker HRis (HRIS), our people platform, set up with you as part of the consulting relationship. We'll tell you honestly whether it fits your company, or whether you don't need it."
    );
    const text = hrisResultsBlock.paragraphs.join(" ");
    assert.equal(/early-access pilot/i.test(text), false);
    assert.equal(/records and licenses in one place/i.test(text), false);
    assert.equal(/guided onboarding path/i.test(text), false);
  });
});

describe("HRis interest checkbox", () => {
  it("uses the approved label and helper", () => {
    assert.equal(
      HRIS_INTEREST_LABEL,
      "I'm also interested in seeing Scalemaker HRis, your HR platform."
    );
    assert.equal(
      HRIS_INTEREST_HELP,
      "It's now in early access. If you check this, we'll include a short walkthrough on a sample company in your results review. Unchecked is fine. It doesn't change your results."
    );
  });
});

describe("positioning lines", () => {
  it("keeps the graduate line and replaces the retired outsourced-department line", () => {
    assert.equal(GRADUATE_LINE, "Stay as long as we fit. Graduate when you outgrow us.");
    assert.match(STEADY_PARTNER, /steady HR partner for years/);
    assert.equal(/outsourced HR department/i.test(STEADY_PARTNER), false);
  });
});

describe("sitemap", () => {
  it("includes the public HRis page", () => {
    const paths = sitemapEntries().map((entry) => new URL(entry.url).pathname);
    assert.equal(paths.includes("/hris"), true);
    assert.equal(paths.includes("/about"), true);
  });
});

describe("pilot contact link", () => {
  it("opens the contact form with the HRis pilot topic", () => {
    assert.equal(HRIS_PILOT_CONTACT_PATH, "/contact?topic=hris-pilot");
    assert.equal(HRIS_PILOT_TOPIC_LABEL, "HRis pilot");
  });
});
