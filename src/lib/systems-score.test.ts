import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { emptySystemsAnswers, readSystemsAnswers, type SystemsAnswers } from "@/lib/systems-data";
import { systemsMapEnabled } from "@/lib/systems-flag";
import {
  SYSTEMS_CLOSING,
  SYSTEMS_RECOMMENDATION_CUTOFFS,
  SYSTEMS_SUPPRESSED,
  SYSTEMS_WEIGHTS,
  countOperatingStates,
  formatSystemsLead,
  recommendationForScore,
  renewalWithinSixMonths,
  scoreSystems,
  systemsBandForScore,
  systemsCardModel,
} from "@/lib/systems-score";

function answers(partial: Partial<SystemsAnswers> = {}): SystemsAnswers {
  return {
    ...emptySystemsAnswers(),
    ...partial,
    tools: { ...emptySystemsAnswers().tools, ...partial.tools },
    toolsOther: { ...partial.toolsOther },
    renewals: { ...emptySystemsAnswers().renewals, ...partial.renewals },
  };
}

describe("systems score weights and cutoffs", () => {
  it("uses 25/25/25/10/15 and the locked recommendation cutoffs", () => {
    assert.equal(SYSTEMS_WEIGHTS.fragmentation, 0.25);
    assert.equal(SYSTEMS_WEIGHTS.rekeying, 0.25);
    assert.equal(SYSTEMS_WEIGHTS.compliance, 0.25);
    assert.equal(SYSTEMS_WEIGHTS.cost, 0.1);
    assert.equal(SYSTEMS_WEIGHTS.dependency, 0.15);
    assert.equal(
      SYSTEMS_WEIGHTS.fragmentation +
        SYSTEMS_WEIGHTS.rekeying +
        SYSTEMS_WEIGHTS.compliance +
        SYSTEMS_WEIGHTS.cost +
        SYSTEMS_WEIGHTS.dependency,
      1
    );
    assert.equal(SYSTEMS_RECOMMENDATION_CUTOFFS.fullBelow, 45);
    assert.equal(SYSTEMS_RECOMMENDATION_CUTOFFS.partialMax, 74);
    assert.equal(SYSTEMS_RECOMMENDATION_CUTOFFS.stayAt, 75);
    assert.equal(recommendationForScore(44), "Full move to HRis");
    assert.equal(recommendationForScore(45), "Partial move to HRis");
    assert.equal(recommendationForScore(74), "Partial move to HRis");
    assert.equal(recommendationForScore(75), "Stay with consultant support");
    assert.equal(systemsBandForScore(80), "connected");
    assert.equal(systemsBandForScore(60), "stretched");
    assert.equal(systemsBandForScore(40), "fragmented");
    assert.equal(systemsBandForScore(39), "breaking");
  });
});

describe("scoreSystems", () => {
  it("scores a connected tool map and keeps the recommendation off the card", () => {
    const result = scoreSystems(
      answers({
        tools: {
          payroll: ["ADP"],
          records: ["BambooHR"],
        },
        monthlySpend: "Under $250",
        adminWho: "Office or operations manager",
        backup: "Yes",
        frustrations: ["Hard to use"],
        hirePlaces: "1",
        sharing: "Yes, mostly",
        i9: "In an HR or payroll system",
      }),
      { states: "Arizona", q8: "strongly_agree", q21: "strongly_agree", risks: ["none"] }
    );

    assert.equal(result.suppressed, false);
    assert.equal(result.score, 100);
    assert.equal(result.band, "connected");
    assert.equal(result.recommendation, "Stay with consultant support");
    assert.equal(result.weakSpots.length, 2);

    const card = systemsCardModel(result);
    assert.equal(card.score, 100);
    assert.equal(card.bandName, "Connected");
    assert.equal(card.weakSpots.length, 2);
    assert.equal(card.closing, SYSTEMS_CLOSING);
    const visible = JSON.stringify(card);
    assert.equal(/Full move|Partial move|Stay with consultant/.test(visible), false);
    assert.equal(/pricing|savings|\$\d/i.test(visible), false);
  });

  it("scores a breaking map under 45 as a full-move hypothesis", () => {
    const result = scoreSystems(
      answers({
        tools: {
          payroll: ["ADP", "Paychex", "Gusto", "QuickBooks Payroll", "Paycom"],
          time: ["Homebase", "When I Work", "Deputy", "TSheets/QuickBooks Time", "Payroll's own timeclock"],
          benefits: ["Broker portal", "Carrier websites", "PEO", "Payroll's benefits module", "Employee Navigator"],
          records: ["BambooHR", "Rippling", "Gusto", "Paylocity/Paycom HR", "Zenefits/TriNet"],
          documents: ["Email attachments", "None / paper"],
          hiring: ["Indeed", "LinkedIn", "ZipRecruiter", "Workable", "JazzHR", "BambooHR Hiring"],
        },
        monthlySpend: "$5,000+",
        adminWho: "Owner",
        backup: "No",
        frustrations: ["Typing the same info twice", "Only one person knows how", "Hard to use"],
        hirePlaces: "4 or more",
        sharing: "No, we re-enter it or export and import",
        i9: "Paper in a file cabinet",
      }),
      {
        states: "Arizona and Utah",
        q8: "disagree",
        q21: "strongly_disagree",
        risks: ["wage", "policies", "licenses"],
      }
    );

    assert.equal(result.subs.find((sub) => sub.id === "fragmentation")?.score, 0);
    assert.equal(result.subs.find((sub) => sub.id === "rekeying")?.score, 0);
    assert.equal(result.subs.find((sub) => sub.id === "compliance")?.score, 0);
    assert.equal(result.subs.find((sub) => sub.id === "cost")?.score, 0);
    assert.equal(result.subs.find((sub) => sub.id === "dependency")?.score, 0);
    assert.equal(result.score, 0);
    assert.equal(result.band, "breaking");
    assert.equal(result.recommendation, "Full move to HRis");
    assert.deepEqual(
      result.weakSpots.map((spot) => spot.id),
      ["fragmentation", "rekeying"]
    );
  });

  it("hides the number when 40% or more of the inputs are unknown", () => {
    const mostlyKnown = scoreSystems(
      answers({
        tools: { payroll: ["Gusto"] },
        adminWho: "Owner",
        backup: "Partly",
        hirePlaces: "2",
        sharing: "Some do",
      })
    );
    assert.equal(mostlyKnown.suppressed, false);
    assert.equal(mostlyKnown.dontKnowRatio, 3 / 8);

    const tooThin = scoreSystems(
      answers({
        tools: { payroll: ["Gusto"] },
        adminWho: "Owner",
        backup: "Partly",
        hirePlaces: "2",
      })
    );
    assert.equal(tooThin.suppressed, true);
    assert.equal(tooThin.score, null);
    assert.equal(tooThin.recommendation, null);
    assert.equal(systemsCardModel(tooThin).message, SYSTEMS_SUPPRESSED);
    assert.deepEqual(systemsCardModel(tooThin).weakSpots, []);
  });

  it("treats renewal months as optional", () => {
    const base = answers({
      tools: { payroll: ["ADP"] },
      monthlySpend: "Under $250",
      adminWho: "One HR person",
      backup: "Yes",
      frustrations: ["Hard to use"],
      hirePlaces: "1",
      sharing: "Some do",
      i9: "In an HR or payroll system",
    });
    const without = scoreSystems(base, { now: new Date("2026-10-19T12:00:00Z") });
    const withMonth = scoreSystems(
      { ...base, renewals: { ...base.renewals, payroll: "Jan" } },
      { now: new Date("2026-10-19T12:00:00Z") }
    );
    assert.equal(without.score, withMonth.score);
    assert.equal(without.renewalWithinSixMonths, "Unknown");
    assert.equal(withMonth.renewalWithinSixMonths, "Yes");
    assert.equal(
      renewalWithinSixMonths(
        { payroll: "Aug", hris: "", benefits: "" },
        new Date("2026-10-19T12:00:00Z")
      ),
      "No"
    );
    assert.equal(
      renewalWithinSixMonths(
        { payroll: "No contract", hris: "", benefits: "" },
        new Date("2026-10-19T12:00:00Z")
      ),
      "No"
    );
  });

  it("parses state lists without treating ordinary words as states", () => {
    assert.equal(countOperatingStates("Arizona"), 1);
    assert.equal(countOperatingStates("Arizona and Utah"), 2);
    assert.equal(countOperatingStates("AZ, UT"), 2);
    assert.equal(countOperatingStates("West Virginia"), 1);
    assert.equal(countOperatingStates("several states"), 2);
    assert.equal(countOperatingStates(""), null);
  });

  it("adds a systems block to the lead fields without a savings figure", () => {
    const fields = formatSystemsLead(
      answers({
        tools: { payroll: ["ADP"], records: ["BambooHR"] },
        monthlySpend: "$250–$999",
        adminWho: "Owner",
        backup: "Partly",
        frustrations: ["Typing the same info twice"],
        hirePlaces: "2",
        sharing: "Some do",
        i9: "Scanned files or a shared drive",
        renewals: { payroll: "Mar", hris: "No contract", benefits: "I don't know" },
      }),
      { states: "Utah", q8: "agree", q21: "neither", now: new Date("2026-10-19T12:00:00Z") }
    );
    assert.match(fields.systemsSummary, /Systems Score: \d+ — /);
    assert.match(fields.systemsSummary, /Recommendation hypothesis: /);
    assert.match(fields.systemsSummary, /Renewal months: Payroll Mar; HR system No contract/);
    assert.equal(/savings|our pric|per employee/i.test(fields.systemsSummary), false);
    assert.equal(fields.systemsScore !== undefined, true);
  });

  it("drops passwords typed into an other-tool field", () => {
    const parsed = readSystemsAnswers({
      tools: { payroll: ["Other (type it)"] },
      toolsOther: { payroll: "password hunter2" },
    });
    assert.equal(parsed?.toolsOther.payroll, undefined);
    assert.deepEqual(parsed?.tools.payroll, ["Other (type it)"]);
  });
});

describe("systems map flag", () => {
  it("stays off unless SYSTEMS_MAP_ENABLED is true", () => {
    const key = "SYSTEMS_MAP_ENABLED";
    const previous = process.env[key];
    delete process.env[key];
    assert.equal(systemsMapEnabled(), false);
    process.env[key] = "false";
    assert.equal(systemsMapEnabled(), false);
    process.env[key] = "true";
    assert.equal(systemsMapEnabled(), true);
    if (previous === undefined) delete process.env[key];
    else process.env[key] = previous;
  });
});
