import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { systemsIntro } from "@/lib/systems-data";
import {
  PRIVACY_POLICY,
  SUBMIT_CONSENT,
  SYSTEMS_ABOUT_TOOLS,
  TERMS_LIABILITY_CAP,
  TERMS_OF_USE,
  legalPlainText,
} from "@/lib/legal-copy";

describe("legal pages", () => {
  it("keeps the interim counsel banner and the liability wording", () => {
    assert.equal(PRIVACY_POLICY.effective, "November 13, 2026");
    assert.equal(TERMS_OF_USE.effective, "November 13, 2026");
    assert.match(TERMS_LIABILITY_CAP, /for any issue with our site/);
    assert.equal(TERMS_LIABILITY_CAP.includes("for any site issue"), false);
    assert.equal(legalPlainText(TERMS_OF_USE).includes("for any site issue"), false);
    assert.match(legalPlainText(PRIVACY_POLICY), /Formspree/);
    assert.equal(/Certified Consultant/i.test(legalPlainText(PRIVACY_POLICY)), false);
    assert.equal(/Certified Consultant/i.test(legalPlainText(TERMS_OF_USE)), false);
  });

  it("uses the submit consent and the systems-step sentence", () => {
    assert.equal(
      SUBMIT_CONSENT,
      "By submitting, you agree to our Privacy Policy and Terms. Please don't include employee personal information."
    );
    assert.equal(SYSTEMS_ABOUT_TOOLS, systemsIntro.aboutTools);
    assert.match(systemsIntro.aboutTools, /your company's tools, not your people/);
  });
});
