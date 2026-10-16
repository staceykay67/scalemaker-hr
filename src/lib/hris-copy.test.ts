import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  GRADUATE_LINE,
  STEADY_PARTNER,
  hrisAvailableHeading,
  hrisComingFeatures,
  hrisComingHeading,
  hrisCopyText,
  hrisFaqs,
  hrisHero,
  hrisPilotFeatures,
  hrisRelationship,
  hrisResultsBlock,
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
    assert.equal(hrisHero.eyebrow, "Early access pilot");
    assert.equal(hrisHero.headline, "HR technology that fits how we work.");
    assert.equal(hrisHero.primaryCta, "Join the early-access pilot");
    assert.equal(hrisHero.secondaryCta, "Take the assessment");
    assert.equal(hrisAvailableHeading, "Available in early access");
    assert.equal(hrisComingHeading, "Coming");

    const text = hrisCopyText();
    assert.equal(/\b(price|prices|pricing|cost)\b|\$\d/i.test(text), false);
    assert.equal(
      hrisFaqs.some((item) => /cost|pric/i.test(item.question + item.answer)),
      false
    );
    assert.equal(hrisFaqs.some((item) => item.question === "Can I leave?"), true);
    assert.match(hrisRelationship.points[2].body, /export your data and take it with you/);
    assert.match(text, /People records and roster/);
    assert.match(text, /E-signature/);
    assert.deepEqual(
      hrisComingFeatures.filter((feature) => !feature.body).map((feature) => feature.title),
      ["Benefits.", "E-Verify.", "Job board posting.", "Background checks.", "E-signature."]
    );
    assert.equal(hrisPilotFeatures.length, 13);
  });
});

describe("HRis results block", () => {
  it("uses the standard block and skips tailored lines", () => {
    assert.equal(hrisResultsBlock.heading, "Your systems may be part of the strain.");
    assert.equal(hrisResultsBlock.linkLabel, "Learn about HRis");
    assert.equal(hrisResultsBlock.linkHref, "/hris");
    assert.match(hrisResultsBlock.paragraphs[1], /early-access pilot/);
    const text = hrisResultsBlock.paragraphs.join(" ");
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
      "HRis is in an early-access pilot. If you check this, we'll include a short walkthrough on sample data in your results review. Unchecked is fine. It doesn't change your results."
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
