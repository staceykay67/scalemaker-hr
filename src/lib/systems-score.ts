import type { LikertValue } from "@/lib/assessment-data";
import { likertPoints } from "@/lib/scoring";
import {
  DONT_KNOW,
  ESIGN_TOOLS,
  NONE_PAPER,
  OTHER_TOOL,
  RENEWAL_MONTHS,
  RENEWAL_ROWS,
  SYSTEMS_CATEGORIES,
  type RenewalRowId,
  type SystemsAnswers,
  type SystemsCategoryId,
  toolChip,
} from "@/lib/systems-data";

/** Visitor-facing bands from the systems copy draft. */
export const SYSTEMS_DISPLAY_BANDS = {
  connectedAt: 80,
  stretchedAt: 60,
  fragmentedAt: 40,
} as const;

/**
 * Internal call recommendation only. Not shown on the results page.
 * Locked defaults: Full below 45, Partial 45–74, Stay at 75 and above.
 */
export const SYSTEMS_RECOMMENDATION_CUTOFFS = {
  fullBelow: 45,
  partialMax: 74,
  stayAt: 75,
} as const;

export const SYSTEMS_WEIGHTS = {
  fragmentation: 0.25,
  rekeying: 0.25,
  compliance: 0.25,
  cost: 0.1,
  dependency: 0.15,
} as const;

export const IDK_SUPPRESS_AT = 0.4;

export type SystemsSubId = keyof typeof SYSTEMS_WEIGHTS;

export type SystemsBandId = "connected" | "stretched" | "fragmented" | "breaking";

export type SystemsRecommendation =
  | "Full move to HRis"
  | "Partial move to HRis"
  | "Stay with consultant support";

export const SYSTEMS_SUB_COPY: Record<
  SystemsSubId,
  { name: string; phrase: string }
> = {
  fragmentation: {
    name: "Fragmentation",
    phrase: "Your HR lives in many separate places.",
  },
  rekeying: {
    name: "Re-keying",
    phrase: "The same information gets typed in more than once.",
  },
  compliance: {
    name: "Compliance trail",
    phrase: "Some required records may be hard to find or prove.",
  },
  cost: {
    name: "Cost overlap",
    phrase: "You may be paying for tools that do the same job.",
  },
  dependency: {
    name: "One-person dependency",
    phrase: "Key HR steps depend on one person.",
  },
};

export const SYSTEMS_BAND_COPY: Record<
  SystemsBandId,
  { name: string; summary: string; call: string }
> = {
  connected: {
    name: "Connected",
    summary:
      "Your HR tools mostly work together. That's a strong place to be. The main thing now is making sure the know-how and access aren't held by one person, so nothing stalls when someone is out.",
    call: "On your review call: we'll confirm what's working and look for small gaps worth closing.",
  },
  stretched: {
    name: "Stretched",
    summary:
      "Your tools get the job done, but some information is typed in more than once and lives in more than one place. That's manageable today. It usually gets harder with each new hire or location.",
    call: "On your review call: we'll find where the double work happens and what would remove it.",
  },
  fragmented: {
    name: "Fragmented",
    summary:
      "Your HR runs across several tools that don't connect. That's usually where errors and missed steps start: a record updated in one place but not another, or a step that depends on someone remembering it.",
    call: "On your review call: we'll map how information moves today and decide what to fix first.",
  },
  breaking: {
    name: "Breaking",
    summary:
      "Key records and steps depend on paper, spreadsheets or one person. That's common in growing companies, and it's worth fixing before you add more people or locations.",
    call: "On your review call: we'll start with the records and steps that carry the most risk.",
  },
};

export const SYSTEMS_SCORE_HEADING = "Your Systems Score";
export const SYSTEMS_SCORE_CAPTION =
  "How well your HR tools work together, from 0 to 100. Higher is healthier.";
export const SYSTEMS_WEAK_LEAD = "Where things are most likely to slip:";
export const SYSTEMS_CLOSING =
  "Some companies keep the tools they have and we work inside them. Others move some or all of it into one place. Either answer can be right, and we'll tell you which fits.";
export const SYSTEMS_SUPPRESSED =
  "We need a few more answers to map your systems, so we'll cover this together on your review call.";

const SUB_ORDER: SystemsSubId[] = [
  "fragmentation",
  "rekeying",
  "compliance",
  "cost",
  "dependency",
];

const MONTH_INDEX = Object.fromEntries(
  RENEWAL_MONTHS.map((month, index) => [month, index])
) as Record<string, number>;

const STATE_NAMES: { name: string; abbr: string }[] = [
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["Arizona", "AZ"],
  ["Arkansas", "AR"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["District of Columbia", "DC"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"],
].map(([name, abbr]) => ({ name, abbr }));

const MULTI_WORD_STATES = STATE_NAMES.filter((state) => state.name.includes(" ")).sort(
  (a, b) => b.name.length - a.name.length
);
const SINGLE_WORD_STATES = STATE_NAMES.filter((state) => !state.name.includes(" "));

export type SystemsContext = {
  states?: string;
  q8?: LikertValue;
  q21?: LikertValue;
  risks?: string[];
  now?: Date;
};

export type SystemsSubScore = {
  id: SystemsSubId;
  name: string;
  score: number;
  phrase: string;
};

export type SystemsScoreResult = {
  suppressed: boolean;
  score: number | null;
  band: SystemsBandId | null;
  subs: SystemsSubScore[];
  weakSpots: SystemsSubScore[];
  dontKnowRatio: number;
  discoveryItems: string[];
  recommendation: SystemsRecommendation | null;
  renewalWithinSixMonths: "Yes" | "No" | "Unknown";
};

export type SystemsCardModel = {
  heading: string;
  caption: string;
  suppressed: boolean;
  message: string | null;
  score: number | null;
  bandName: string | null;
  summary: string | null;
  call: string | null;
  weakLead: string;
  weakSpots: string[];
  closing: string;
};

function isIdk(value: string | undefined): boolean {
  return !value || value === DONT_KNOW;
}

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function rowUnknown(selected: string[]): boolean {
  return selected.length === 0 || (selected.length === 1 && selected[0] === DONT_KNOW);
}

export function countOperatingStates(text: string | undefined): number | null {
  const raw = (text ?? "").trim();
  if (!raw) return null;
  if (/^(unsure|not sure|unknown|n\/a|na|i don't know)$/i.test(raw)) return null;

  const found = new Set<string>();
  let remaining = ` ${raw.toLowerCase()} `;
  for (const state of MULTI_WORD_STATES) {
    const needle = state.name.toLowerCase();
    if (remaining.includes(needle)) {
      found.add(state.name);
      remaining = remaining.split(needle).join(" ");
    }
  }
  for (const state of SINGLE_WORD_STATES) {
    const pattern = new RegExp(`\\b${state.name.toLowerCase()}\\b`);
    if (pattern.test(remaining)) found.add(state.name);
  }

  const abbr = Object.fromEntries(STATE_NAMES.map((state) => [state.abbr, state.name]));
  for (const token of raw.split(/[,;/|&]+|\band\b|\bor\b/i)) {
    const code = token.trim();
    if (/^[A-Za-z]{2}$/.test(code) && abbr[code.toUpperCase()]) {
      found.add(abbr[code.toUpperCase()]);
    }
  }

  if (found.size === 0 && /multi-?state|several states|multiple states/i.test(raw)) {
    return 2;
  }
  if (found.size === 0) return null;
  return found.size;
}

function distinctTools(answers: SystemsAnswers): { count: number; unknown: boolean } {
  const labels = new Set<string>();
  let knownRows = 0;
  for (const category of SYSTEMS_CATEGORIES) {
    const selected = answers.tools[category.id];
    if (rowUnknown(selected)) continue;
    knownRows += 1;
    for (const label of selected) {
      if (label === DONT_KNOW) continue;
      if (label === OTHER_TOOL) {
        const typed = answers.toolsOther[category.id]?.trim().toLowerCase();
        labels.add(typed ? `other:${category.id}:${typed}` : `other:${category.id}`);
        continue;
      }
      labels.add(label.toLowerCase());
    }
  }
  if (knownRows === 0) return { count: 0, unknown: true };
  return { count: labels.size, unknown: false };
}

function fragmentationScore(answers: SystemsAnswers): number {
  const tools = distinctTools(answers);
  let score = tools.unknown ? 50 : fragmentationFromCount(tools.count);
  if (answers.sharing === "Yes, mostly") score += 15;
  return clamp(score);
}

function fragmentationFromCount(count: number): number {
  if (count <= 2) return 100;
  if (count === 3) return 80;
  if (count === 4) return 60;
  if (count === 5) return 40;
  if (count === 6) return 20;
  return 0;
}

function rekeyingScore(answers: SystemsAnswers): number {
  const base =
    answers.hirePlaces === "1"
      ? 100
      : answers.hirePlaces === "2"
        ? 70
        : answers.hirePlaces === "3"
          ? 40
          : answers.hirePlaces === "4 or more"
            ? 10
            : 50;
  let score = base;
  if (answers.sharing === "No, we re-enter it or export and import") score -= 15;
  if (answers.sharing === "Some do") score -= 5;
  if (answers.frustrations.includes("Typing the same info twice")) score -= 10;
  return clamp(score);
}

function documentsLackTrail(answers: SystemsAnswers): boolean {
  const selected = answers.tools.documents;
  if (rowUnknown(selected)) return false;
  const hasEsign = selected.some((label) => ESIGN_TOOLS.includes(label));
  const gap =
    selected.includes(NONE_PAPER) ||
    selected.some((label) => toolChip("documents", label)?.documentGap);
  return gap && !hasEsign;
}

function complianceScore(answers: SystemsAnswers, context: SystemsContext): number {
  let score = 100;
  if (
    answers.i9 === "Paper in a file cabinet" ||
    answers.i9 === "We only track them in a spreadsheet"
  ) {
    score -= 25;
  }
  if (documentsLackTrail(answers)) score -= 20;
  const states = countOperatingStates(context.states);
  if (states !== null && states >= 2) score -= 15;
  if (context.q8 && likertPoints(context.q8) <= 2) score -= 15;
  const risks = new Set(context.risks ?? []);
  for (const id of ["licenses", "wage", "policies"]) {
    if (risks.has(id)) score -= 10;
  }
  return clamp(score);
}

function paidToolCount(answers: SystemsAnswers): { count: number; unknown: boolean } {
  const tools = distinctTools(answers);
  if (tools.unknown) return { count: 0, unknown: true };
  let count = 0;
  for (const category of SYSTEMS_CATEGORIES) {
    if (category.id === "payroll" || category.id === "spreadsheets") continue;
    for (const label of answers.tools[category.id]) {
      if (toolChip(category.id, label)?.paid) count += 1;
      if (label === OTHER_TOOL && answers.toolsOther[category.id]?.trim()) count += 1;
    }
  }
  return { count, unknown: false };
}

function costScore(answers: SystemsAnswers): number {
  const paid = paidToolCount(answers);
  if (paid.unknown) return 50;
  const overlap = Math.max(0, paid.count - 1);
  return clamp(100 - overlap * 10);
}

function q21Score(value: LikertValue | undefined): number {
  if (!value) return 50;
  return clamp(((likertPoints(value) - 1) / 4) * 100);
}

function dependencyScore(answers: SystemsAnswers, context: SystemsContext): number {
  let person =
    answers.backup === "Yes"
      ? 100
      : answers.backup === "Partly"
        ? 60
        : answers.backup === "No"
          ? 20
          : 50;
  if (answers.adminWho === "Owner") person -= 20;
  if (answers.frustrations.includes("Only one person knows how")) person -= 10;
  person = Math.max(0, person);
  return clamp(person * 0.5 + q21Score(context.q21) * 0.5);
}

function discoveryItems(answers: SystemsAnswers): { items: string[]; ratio: number } {
  const items: string[] = [];
  const checks: { unknown: boolean; label: string }[] = [
    {
      unknown: SYSTEMS_CATEGORIES.every((category) => rowUnknown(answers.tools[category.id])),
      label: "Which tools you use",
    },
    { unknown: isIdk(answers.monthlySpend), label: "Monthly spend on these HR tools" },
    { unknown: isIdk(answers.adminWho), label: "Who keeps the tools running" },
    {
      unknown: isIdk(answers.backup),
      label: "Whether someone else could cover payroll and onboarding",
    },
    {
      unknown: answers.frustrations.length === 0 || answers.frustrations.includes(DONT_KNOW),
      label: "What frustrates you about these tools",
    },
    { unknown: isIdk(answers.hirePlaces), label: "How many places a new hire is typed in" },
    { unknown: isIdk(answers.sharing), label: "Whether your tools share information" },
    { unknown: isIdk(answers.i9), label: "Where I-9 forms are kept" },
  ];

  for (const category of SYSTEMS_CATEGORIES) {
    if (rowUnknown(answers.tools[category.id]) && !checks[0].unknown) {
      items.push(`Tools for ${category.label.toLowerCase()}`);
    }
  }

  const renewalValues = RENEWAL_ROWS.map((row) => answers.renewals[row.id]).filter(Boolean);
  if (renewalValues.length > 0) {
    checks.push({
      unknown: renewalValues.every((value) => value === DONT_KNOW),
      label: "When the main contracts renew",
    });
  }

  let unknownCount = 0;
  for (const check of checks) {
    if (!check.unknown) continue;
    unknownCount += 1;
    items.push(check.label);
  }

  return {
    items,
    ratio: checks.length === 0 ? 0 : unknownCount / checks.length,
  };
}

export function systemsBandForScore(score: number): SystemsBandId {
  if (score >= SYSTEMS_DISPLAY_BANDS.connectedAt) return "connected";
  if (score >= SYSTEMS_DISPLAY_BANDS.stretchedAt) return "stretched";
  if (score >= SYSTEMS_DISPLAY_BANDS.fragmentedAt) return "fragmented";
  return "breaking";
}

export function recommendationForScore(score: number): SystemsRecommendation {
  if (score < SYSTEMS_RECOMMENDATION_CUTOFFS.fullBelow) return "Full move to HRis";
  if (score <= SYSTEMS_RECOMMENDATION_CUTOFFS.partialMax) return "Partial move to HRis";
  return "Stay with consultant support";
}

export function renewalWithinSixMonths(
  renewals: Record<RenewalRowId, string>,
  now = new Date()
): "Yes" | "No" | "Unknown" {
  const values = RENEWAL_ROWS.map((row) => renewals[row.id]).filter(Boolean);
  if (values.length === 0 || values.every((value) => value === DONT_KNOW)) return "Unknown";
  const current = now.getMonth();
  let sawMonth = false;
  for (const value of values) {
    if (value === "No contract" || value === DONT_KNOW) continue;
    const index = MONTH_INDEX[value];
    if (index === undefined) continue;
    sawMonth = true;
    const delta = (index - current + 12) % 12;
    if (delta <= 6) return "Yes";
  }
  if (sawMonth || values.includes("No contract")) return "No";
  return "Unknown";
}

export function scoreSystems(
  answers: SystemsAnswers,
  context: SystemsContext = {}
): SystemsScoreResult {
  const discovery = discoveryItems(answers);
  const subs: SystemsSubScore[] = SUB_ORDER.map((id) => {
    const score =
      id === "fragmentation"
        ? fragmentationScore(answers)
        : id === "rekeying"
          ? rekeyingScore(answers)
          : id === "compliance"
            ? complianceScore(answers, context)
            : id === "cost"
              ? costScore(answers)
              : dependencyScore(answers, context);
    return { id, score, ...SYSTEMS_SUB_COPY[id] };
  });
  const renewal = renewalWithinSixMonths(answers.renewals, context.now ?? new Date());

  if (discovery.ratio >= IDK_SUPPRESS_AT) {
    return {
      suppressed: true,
      score: null,
      band: null,
      subs,
      weakSpots: [],
      dontKnowRatio: discovery.ratio,
      discoveryItems: discovery.items,
      recommendation: null,
      renewalWithinSixMonths: renewal,
    };
  }

  const score = clamp(
    subs.reduce((sum, sub) => sum + sub.score * SYSTEMS_WEIGHTS[sub.id], 0)
  );
  const weakSpots = [...subs]
    .sort((a, b) => a.score - b.score || SUB_ORDER.indexOf(a.id) - SUB_ORDER.indexOf(b.id))
    .slice(0, 2);

  return {
    suppressed: false,
    score,
    band: systemsBandForScore(score),
    subs,
    weakSpots,
    dontKnowRatio: discovery.ratio,
    discoveryItems: discovery.items,
    recommendation: recommendationForScore(score),
    renewalWithinSixMonths: renewal,
  };
}

export function systemsCardModel(result: SystemsScoreResult): SystemsCardModel {
  if (result.suppressed || result.score === null || result.band === null) {
    return {
      heading: SYSTEMS_SCORE_HEADING,
      caption: SYSTEMS_SCORE_CAPTION,
      suppressed: true,
      message: SYSTEMS_SUPPRESSED,
      score: null,
      bandName: null,
      summary: null,
      call: null,
      weakLead: SYSTEMS_WEAK_LEAD,
      weakSpots: [],
      closing: SYSTEMS_CLOSING,
    };
  }
  const band = SYSTEMS_BAND_COPY[result.band];
  return {
    heading: SYSTEMS_SCORE_HEADING,
    caption: SYSTEMS_SCORE_CAPTION,
    suppressed: false,
    message: null,
    score: result.score,
    bandName: band.name,
    summary: band.summary,
    call: band.call,
    weakLead: SYSTEMS_WEAK_LEAD,
    weakSpots: result.weakSpots.map((spot) => spot.phrase),
    closing: SYSTEMS_CLOSING,
  };
}

function toolLine(categoryId: SystemsCategoryId, answers: SystemsAnswers): string {
  const category = SYSTEMS_CATEGORIES.find((item) => item.id === categoryId);
  const selected = answers.tools[categoryId];
  if (!category || selected.length === 0) return `${category?.label ?? categoryId}: not answered`;
  const labels = selected.map((label) => {
    if (label === OTHER_TOOL && answers.toolsOther[categoryId]) {
      return `Other: ${answers.toolsOther[categoryId]}`;
    }
    return label;
  });
  return `${category.label}: ${labels.join(", ")}`;
}

export function formatSystemsLead(
  answers: SystemsAnswers,
  context: SystemsContext = {}
): Record<string, string> {
  const result = scoreSystems(answers, context);
  const lines = [
    "Systems map",
    ...SYSTEMS_CATEGORIES.map((category) => toolLine(category.id, answers)),
    answers.sheetTracks.length
      ? `Spreadsheets track: ${answers.sheetTracks.join(", ")}`
      : null,
    answers.monthlySpend
      ? `Their monthly spend on these tools: ${answers.monthlySpend}`
      : "Their monthly spend on these tools: not answered",
    answers.adminWho ? `Who keeps tools running: ${answers.adminWho}` : null,
    answers.backup ? `Backup coverage for two weeks: ${answers.backup}` : null,
    answers.frustrations.length
      ? `Frustrations: ${answers.frustrations.join(", ")}`
      : null,
    answers.hirePlaces ? `Places a new hire is typed in: ${answers.hirePlaces}` : null,
    answers.sharing ? `Tools share information: ${answers.sharing}` : null,
    answers.i9 ? `I-9 storage: ${answers.i9}` : null,
    `Renewal months: ${RENEWAL_ROWS.map((row) => `${row.label} ${answers.renewals[row.id] || "not provided"}`).join("; ")}`,
    `Renewal within 6 months: ${result.renewalWithinSixMonths}`,
    result.suppressed || result.score === null || result.band === null
      ? `Systems Score: not shown (${SYSTEMS_SUPPRESSED})`
      : `Systems Score: ${result.score} — ${SYSTEMS_BAND_COPY[result.band].name}`,
    `Sub-scores: ${result.subs.map((sub) => `${sub.name} ${sub.score}`).join("; ")}`,
    result.weakSpots.length
      ? `Weak spots: ${result.weakSpots.map((spot) => spot.phrase).join(" ")}`
      : null,
    result.discoveryItems.length
      ? `Discovery items: ${result.discoveryItems.join("; ")}`
      : "Discovery items: none",
    `Recommendation hypothesis: ${result.recommendation ?? "Not scored"}`,
  ].filter((line): line is string => Boolean(line));

  const fields: Record<string, string> = {
    systemsSummary: lines.join("\n"),
    systemsRenewal: result.renewalWithinSixMonths,
    systemsRecommendation: result.recommendation ?? "Not scored",
    systemsDiscovery: result.discoveryItems.join("; "),
  };
  if (!result.suppressed && result.score !== null && result.band) {
    fields.systemsScore = String(result.score);
    fields.systemsBand = SYSTEMS_BAND_COPY[result.band].name;
  }
  return fields;
}

export function systemsContextFromLead(input: {
  profile?: Record<string, string>;
  likert?: Record<string, string>;
  risks?: string[];
}): SystemsContext {
  const q8 = input.likert?.q8;
  const q21 = input.likert?.q21;
  return {
    states: input.profile?.states,
    q8: q8 as LikertValue | undefined,
    q21: q21 as LikertValue | undefined,
    risks: input.risks,
  };
}
