export const DONT_KNOW = "I don't know";
export const OTHER_TOOL = "Other (type it)";
export const NONE_PAPER = "None / paper";
export const SPREADSHEET_CHIP = "Spreadsheet";

export const SYSTEMS_CATEGORY_IDS = [
  "payroll",
  "time",
  "benefits",
  "records",
  "documents",
  "hiring",
  "spreadsheets",
] as const;

export type SystemsCategoryId = (typeof SYSTEMS_CATEGORY_IDS)[number];

export type ToolChip = {
  label: string;
  paid?: boolean;
  documentGap?: boolean;
};

export type SystemsCategory = {
  id: SystemsCategoryId;
  label: string;
  chips: ToolChip[];
};

export const ROW_END_CHIPS = [OTHER_TOOL, NONE_PAPER, SPREADSHEET_CHIP, DONT_KNOW] as const;

export const SYSTEMS_CATEGORIES: SystemsCategory[] = [
  {
    id: "payroll",
    label: "Payroll",
    chips: [
      { label: "ADP" },
      { label: "Paychex" },
      { label: "Gusto" },
      { label: "QuickBooks Payroll" },
      { label: "Paycom" },
      { label: "Paylocity" },
      { label: "Paycor" },
      { label: "Rippling" },
      { label: "PEO (any)" },
      { label: "Bookkeeper/CPA runs it" },
    ],
  },
  {
    id: "time",
    label: "Time and attendance",
    chips: [
      { label: "Homebase", paid: true },
      { label: "When I Work", paid: true },
      { label: "Deputy", paid: true },
      { label: "TSheets/QuickBooks Time", paid: true },
      { label: "Payroll's own timeclock", paid: true },
      { label: "Paper timesheets" },
    ],
  },
  {
    id: "benefits",
    label: "Benefits",
    chips: [
      { label: "Broker portal", paid: true },
      { label: "Carrier websites", paid: true },
      { label: "PEO", paid: true },
      { label: "Payroll's benefits module", paid: true },
      { label: "Employee Navigator", paid: true },
    ],
  },
  {
    id: "records",
    label: "Employee records",
    chips: [
      { label: "BambooHR", paid: true },
      { label: "Rippling", paid: true },
      { label: "Gusto", paid: true },
      { label: "Paylocity/Paycom HR", paid: true },
      { label: "Zenefits/TriNet", paid: true },
      { label: "Shared drive folders" },
      { label: "Filing cabinet" },
    ],
  },
  {
    id: "documents",
    label: "Documents and e-signatures",
    chips: [
      { label: "DocuSign", paid: true },
      { label: "Adobe Sign", paid: true },
      { label: "Dropbox Sign", paid: true },
      { label: "Google Drive" },
      { label: "Microsoft 365/SharePoint" },
      { label: "Email attachments", documentGap: true },
    ],
  },
  {
    id: "hiring",
    label: "Hiring",
    chips: [
      { label: "Indeed", paid: true },
      { label: "LinkedIn", paid: true },
      { label: "ZipRecruiter", paid: true },
      { label: "Workable", paid: true },
      { label: "JazzHR", paid: true },
      { label: "BambooHR Hiring", paid: true },
      { label: "Email/inbox" },
    ],
  },
  {
    id: "spreadsheets",
    label: "Spreadsheets",
    chips: [
      { label: "Excel" },
      { label: "Google Sheets" },
      { label: "Smartsheet" },
      { label: "Airtable" },
    ],
  },
];

export const SHEET_TRACKS = [
  "PTO",
  "Licenses",
  "Onboarding",
  "Org chart",
  "Headcount",
  DONT_KNOW,
] as const;

export const SPEND_OPTIONS = [
  "Under $250",
  "$250–$999",
  "$1,000–$2,499",
  "$2,500–$4,999",
  "$5,000+",
  DONT_KNOW,
] as const;

export const ADMIN_OPTIONS = [
  "Owner",
  "Office or operations manager",
  "One HR person",
  "Several people share it",
  "Payroll provider or PEO",
  "Outside consultant or bookkeeper",
  DONT_KNOW,
] as const;

export const BACKUP_OPTIONS = ["Yes", "Partly", "No", DONT_KNOW] as const;

export const FRUSTRATION_OPTIONS = [
  "Typing the same info twice",
  "Tools don't talk to each other",
  "Hard to find documents",
  "Too expensive",
  "Hard to use",
  "Errors in pay or time",
  "Tracking licenses or training",
  "Rules that differ by state",
  "Reports are hard to get",
  "Only one person knows how",
  "Other",
  DONT_KNOW,
] as const;

export const HIRE_PLACE_OPTIONS = ["1", "2", "3", "4 or more", DONT_KNOW] as const;

export const SHARING_OPTIONS = [
  "Yes, mostly",
  "Some do",
  "No, we re-enter it or export and import",
  DONT_KNOW,
] as const;

export const I9_OPTIONS = [
  "In an HR or payroll system",
  "Scanned files or a shared drive",
  "Paper in a file cabinet",
  "We only track them in a spreadsheet",
  DONT_KNOW,
] as const;

export const RENEWAL_ROW_IDS = ["payroll", "hris", "benefits"] as const;
export type RenewalRowId = (typeof RENEWAL_ROW_IDS)[number];

export const RENEWAL_ROWS: { id: RenewalRowId; label: string }[] = [
  { id: "payroll", label: "Payroll" },
  { id: "hris", label: "HR system" },
  { id: "benefits", label: "Benefits broker or PEO" },
];

export const RENEWAL_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const RENEWAL_EXTRA = ["No contract", DONT_KNOW] as const;

export const ESIGN_TOOLS = ["DocuSign", "Adobe Sign", "Dropbox Sign"];

export const systemsIntro = {
  heading: "Map your HR tools (optional)",
  aboutTools:
    "These questions are optional and about your company's tools, not your people.",
  intro:
    "Most HR problems in growing companies don't come from one bad tool. They come from the gaps between tools. Tell us what you use, and we'll show you where things are likely to slip.",
  optional:
    "This step is optional and takes about 3 minutes. Your score above is already saved. Skip it anytime.",
  privacy:
    "Company-level answers only. Please don't enter passwords, logins, or employee names or details.",
  helper: "Not sure? Pick \"I don't know.\" We'll cover it on your review call.",
  skip: "Skip for now",
  continue: "See my Systems Score",
  reopen: "Map your HR tools",
};

export const systemsQuestions = {
  tools: {
    prompt: "Which tools do you use for each of these?",
    helper: "Pick all that apply in each row. Vendor names are examples, not endorsements.",
  },
  sheets: {
    prompt: "What do you track there?",
  },
  spend: {
    prompt: "Roughly what do you spend each month on these tools in total?",
    helper: "A rough guess is fine. Leave out payroll taxes and benefit premiums.",
  },
  admin: {
    prompt: "Who keeps these tools running day to day?",
  },
  backup: {
    prompt:
      "If that person were out for two weeks, could someone else run payroll and onboarding?",
  },
  frustrations: {
    prompt: "What frustrates you most about these tools?",
    helper: "Pick up to 3.",
  },
  hirePlaces: {
    prompt: "When you hire someone, how many places does their information get typed in?",
  },
  sharing: {
    prompt: "Do your tools share information automatically?",
  },
  i9: {
    prompt: "Where are your I-9 forms kept?",
    helper: "Just tell us where. Please don't upload or describe any forms.",
  },
  renewals: {
    prompt: "When do your main contracts renew? (optional)",
    helper: "This helps us time any change so you're not stuck paying twice.",
  },
};

export type SystemsAnswers = {
  tools: Record<SystemsCategoryId, string[]>;
  toolsOther: Partial<Record<SystemsCategoryId, string>>;
  sheetTracks: string[];
  monthlySpend: string;
  adminWho: string;
  backup: string;
  frustrations: string[];
  hirePlaces: string;
  sharing: string;
  i9: string;
  renewals: Record<RenewalRowId, string>;
};

export function emptySystemsAnswers(): SystemsAnswers {
  return {
    tools: {
      payroll: [],
      time: [],
      benefits: [],
      records: [],
      documents: [],
      hiring: [],
      spreadsheets: [],
    },
    toolsOther: {},
    sheetTracks: [],
    monthlySpend: "",
    adminWho: "",
    backup: "",
    frustrations: [],
    hirePlaces: "",
    sharing: "",
    i9: "",
    renewals: { payroll: "", hris: "", benefits: "" },
  };
}

function cleanFreeText(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.replace(/\s+/g, " ").trim().slice(0, 80);
  if (/password|passwd|social security|\bssn\b|\blogins?\b/i.test(trimmed)) return "";
  return trimmed;
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function pickAllowed(value: unknown, allowed: readonly string[]): string {
  if (typeof value !== "string") return "";
  return allowed.includes(value) ? value : "";
}

function pickMany(value: unknown, allowed: readonly string[], max?: number): string[] {
  const unique = asStringList(value).filter((item) => allowed.includes(item));
  const deduped = [...new Set(unique)];
  if (deduped.includes(DONT_KNOW)) return [DONT_KNOW];
  return typeof max === "number" ? deduped.slice(0, max) : deduped;
}

function chipsFor(category: SystemsCategory): string[] {
  return [...category.chips.map((chip) => chip.label), ...ROW_END_CHIPS];
}

export function categoryById(id: SystemsCategoryId): SystemsCategory {
  const category = SYSTEMS_CATEGORIES.find((item) => item.id === id);
  if (!category) throw new Error(`Unknown systems category: ${id}`);
  return category;
}

export function readSystemsAnswers(value: unknown): SystemsAnswers | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const answers = emptySystemsAnswers();
  const toolsRaw =
    raw.tools && typeof raw.tools === "object"
      ? (raw.tools as Record<string, unknown>)
      : {};
  const otherRaw =
    raw.toolsOther && typeof raw.toolsOther === "object"
      ? (raw.toolsOther as Record<string, unknown>)
      : {};

  for (const category of SYSTEMS_CATEGORIES) {
    answers.tools[category.id] = pickMany(toolsRaw[category.id], chipsFor(category));
    if (answers.tools[category.id].includes(OTHER_TOOL)) {
      const typed = cleanFreeText(otherRaw[category.id]);
      if (typed) answers.toolsOther[category.id] = typed;
    }
  }

  answers.sheetTracks = pickMany(raw.sheetTracks, SHEET_TRACKS);
  answers.monthlySpend = pickAllowed(raw.monthlySpend, SPEND_OPTIONS);
  answers.adminWho = pickAllowed(raw.adminWho, ADMIN_OPTIONS);
  answers.backup = pickAllowed(raw.backup, BACKUP_OPTIONS);
  answers.frustrations = pickMany(raw.frustrations, FRUSTRATION_OPTIONS, 3);
  answers.hirePlaces = pickAllowed(raw.hirePlaces, HIRE_PLACE_OPTIONS);
  answers.sharing = pickAllowed(raw.sharing, SHARING_OPTIONS);
  answers.i9 = pickAllowed(raw.i9, I9_OPTIONS);

  const renewalsRaw =
    raw.renewals && typeof raw.renewals === "object"
      ? (raw.renewals as Record<string, unknown>)
      : {};
  const renewalAllowed = [...RENEWAL_MONTHS, ...RENEWAL_EXTRA];
  for (const row of RENEWAL_ROWS) {
    answers.renewals[row.id] = pickAllowed(renewalsRaw[row.id], renewalAllowed);
  }

  return answers;
}

export function usesSpreadsheets(answers: SystemsAnswers): boolean {
  if (
    answers.tools.spreadsheets.some((chip) => chip !== DONT_KNOW && chip !== NONE_PAPER)
  ) {
    return true;
  }
  return SYSTEMS_CATEGORY_IDS.some((id) => answers.tools[id].includes(SPREADSHEET_CHIP));
}

export function toolChip(categoryId: SystemsCategoryId, label: string): ToolChip | null {
  return categoryById(categoryId).chips.find((chip) => chip.label === label) ?? null;
}
