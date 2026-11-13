import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ABOUT_HRIS_PARAGRAPH,
  ABOUT_LOCATION,
  APPROACH_HRIS_STEP,
  AUDIENCE_PHRASE,
  GRADUATE_LINE,
  ONE_TEAM_BAND,
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
    assert.equal(hrisHero.primaryCta, "See it for yourself");
    assert.equal(hrisHero.earlyAccess, "Now in early access.");
    assert.equal(hrisHero.secondaryCta, "Begin the assessment");
    assert.equal(hrisWalkthrough.earlyAccess, "Now in early access.");
    assert.match(hrisWalkthrough.note, /complimentary assessment/);

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
    assert.match(text, /Benefits elections/);
    assert.match(text, /E-signature/);
    assert.equal(hrisFeatures.length, 15);
    assert.equal(
      hrisFeatures.every((feature) => feature.body.length > 0),
      true
    );
  });
});

describe("HRis results block", () => {
  it("uses one neutral line and the learn-more link", () => {
    assert.equal(
      hrisResultsBlock.line,
      "Scalemaker HRis is our HR platform for small businesses. Use it on its own or alongside our consulting. If your current tools work, we'll help you keep them."
    );
    assert.equal(hrisResultsBlock.linkLabel, "Learn about Scalemaker HRis");
    assert.equal(hrisResultsBlock.linkHref, "/hris");
    assert.equal(/early-access pilot/i.test(hrisResultsBlock.line), false);
    assert.equal(/\n/.test(hrisResultsBlock.line), false);
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
    assert.equal(
      STEADY_PARTNER,
      "We work with established small businesses that want a steady HR partner for years, and with growing ones we help scale and then hand off when their needs outgrow our focus. Either way, the goal is the same: people systems that work without depending on us."
    );
    assert.equal(/outsourced HR department/i.test(STEADY_PARTNER), false);
  });

  it("uses the national audience phrase and the one-team band", () => {
    assert.equal(AUDIENCE_PHRASE, "small businesses nationwide, up to about 200 employees");
    assert.equal(
      ABOUT_LOCATION,
      "Scalemaker HR LLC is an Arizona company. Our team is based in Arizona and Utah and serves small businesses nationwide with up to approximately 200 employees, providing experienced HR leadership and practical people systems through a remote-first model."
    );
    assert.equal(
      ONE_TEAM_BAND.body,
      "Choose the support that fits. Each one works on its own, and they work well together."
    );
    assert.equal(ONE_TEAM_BAND.heading, "Consulting, Scalemaker HRis, or both.");
    assert.equal(ONE_TEAM_BAND.linkHref, "/services");
    assert.equal(
      ABOUT_HRIS_PARAGRAPH,
      "We also built Scalemaker HRis (HRIS), an HR platform designed specifically for growing businesses. Clients can choose our consulting, the platform, or both. Either way, we bring your people processes and technology together around how your business actually operates."
    );
    assert.equal(APPROACH_HRIS_STEP, "Scalemaker HRis set up and run with you (early access).");
    assert.equal(/\$\d|\bpricing\b/i.test(hrisCopyText()), false);
  });
});

describe("sitemap", () => {
  it("includes the public HRis page", () => {
    const paths = sitemapEntries().map((entry) => new URL(entry.url).pathname);
    assert.equal(paths.includes("/hris"), true);
    assert.equal(paths.includes("/about"), true);
    assert.equal(paths.includes("/privacy"), true);
    assert.equal(paths.includes("/terms"), true);
  });
});

describe("pilot contact link", () => {
  it("opens the contact form with the HRis walk-through topic", () => {
    assert.equal(HRIS_PILOT_CONTACT_PATH, "/contact?topic=hris-pilot");
    assert.equal(HRIS_PILOT_TOPIC_LABEL, "HRis walk through");
  });
});
