import { CONTACT_EMAIL } from "./site-contact";

export const LIKERT_OPTIONS = [
  { value: "strongly_disagree", label: "Strongly disagree", points: 1 },
  { value: "disagree", label: "Disagree", points: 2 },
  { value: "neither", label: "Neither agree nor disagree", points: 3 },
  { value: "agree", label: "Agree", points: 4 },
  { value: "strongly_agree", label: "Strongly agree", points: 5 },
  { value: "unsure", label: "Unsure", points: 3 },
] as const;

export type LikertValue = (typeof LIKERT_OPTIONS)[number]["value"];

export const PROFILE_QUESTIONS = [
  {
    id: "role",
    label: "What is your role?",
    type: "select" as const,
    options: [
      "Owner/Founder",
      "CEO or Executive",
      "Office Manager",
      "Operations Manager",
      "Regional or Operations Leader",
      "HR Professional",
      "Other",
    ],
  },
  {
    id: "employees",
    label: "Approximately how many employees work in your organization?",
    type: "select" as const,
    options: ["1–9", "10–24", "25–49", "50–99", "100–149", "150–199", "200 or more"],
  },
  {
    id: "locations",
    label: "How many locations do you operate?",
    type: "select" as const,
    options: ["One", "Two", "Three to five", "Six to ten", "More than ten"],
  },
  {
    id: "states",
    label: "In which state or states does your business operate?",
    type: "text" as const,
  },
  {
    id: "growth",
    label: "How would you describe your expected growth during the next 24 months?",
    type: "select" as const,
    options: [
      "Maintain approximately our current size",
      "Add employees within an existing location",
      "Expand services or offerings",
      "Open another location",
      "Acquire or combine with another business",
      "Expand into multiple locations or states",
      "Unsure",
    ],
  },
  {
    id: "hrOwner",
    label: "Who currently handles most HR responsibilities?",
    type: "select" as const,
    options: [
      "Owner or founder",
      "Office manager or operations manager",
      "Internal HR employee",
      "Operations leader",
      "Payroll provider or PEO",
      "Outside HR consultant",
      "Responsibilities are divided among several people",
      "No one has clear responsibility",
    ],
  },
] as const;

export type CategoryId =
  | "foundation"
  | "leadership"
  | "hiring"
  | "performance"
  | "systems"
  | "growth";

export const CATEGORIES: {
  id: CategoryId;
  name: string;
  questionIds: string[];
}[] = [
  {
    id: "foundation",
    name: "HR Foundation and Compliance",
    questionIds: ["q7", "q8", "q9"],
  },
  {
    id: "leadership",
    name: "Leadership and Accountability",
    questionIds: ["q10", "q11", "q12"],
  },
  {
    id: "hiring",
    name: "Hiring, Onboarding and Retention",
    questionIds: ["q13", "q14", "q15"],
  },
  {
    id: "performance",
    name: "Performance and Employee Relations",
    questionIds: ["q16", "q17", "q18"],
  },
  {
    id: "systems",
    name: "HR Systems and Internal Support",
    questionIds: ["q19", "q20", "q21"],
  },
  {
    id: "growth",
    name: "Growth and Workforce Readiness",
    questionIds: ["q22", "q23", "q24"],
  },
];

export const SCORED_QUESTIONS: {
  id: string;
  categoryId: CategoryId;
  text: string;
}[] = [
  {
    id: "q7",
    categoryId: "foundation",
    text: "Our employee handbook and employment policies are current, legally reviewed when appropriate and consistently followed.",
  },
  {
    id: "q8",
    categoryId: "foundation",
    text: "Employee records, required forms, licenses/certifications and employment documentation are complete, secure and easy to retrieve.",
  },
  {
    id: "q9",
    categoryId: "foundation",
    text: "We are confident that employees are properly classified, paid and managed in accordance with applicable employment requirements.",
  },
  {
    id: "q10",
    categoryId: "leadership",
    text: "Managers understand their responsibilities and have the skills and authority necessary to lead employees effectively.",
  },
  {
    id: "q11",
    categoryId: "leadership",
    text: "Expectations, responsibilities and decision-making authority are clear throughout the business.",
  },
  {
    id: "q12",
    categoryId: "leadership",
    text: "Managers address attendance, conduct and performance concerns promptly and consistently.",
  },
  {
    id: "q13",
    categoryId: "hiring",
    text: "We can consistently attract qualified candidates when positions become available.",
  },
  {
    id: "q14",
    categoryId: "hiring",
    text: "New employees receive a structured onboarding experience that prepares them to succeed.",
  },
  {
    id: "q15",
    categoryId: "hiring",
    text: "We understand the primary causes of employee turnover and take effective steps to retain strong performers.",
  },
  {
    id: "q16",
    categoryId: "performance",
    text: "Employees receive clear expectations, useful feedback and meaningful performance conversations.",
  },
  {
    id: "q17",
    categoryId: "performance",
    text: "Employee complaints, conflicts and workplace concerns are handled promptly, objectively and appropriately documented.",
  },
  {
    id: "q18",
    categoryId: "performance",
    text: "Compensation, recognition and corrective-action decisions are made fairly and consistently.",
  },
  {
    id: "q19",
    categoryId: "systems",
    text: "The person responsible for day-to-day HR matters has the necessary time, training, tools and professional support.",
  },
  {
    id: "q20",
    categoryId: "systems",
    text: "Our payroll, benefits, scheduling and employee-information systems support the needs of the business.",
  },
  {
    id: "q21",
    categoryId: "systems",
    text: "HR responsibilities do not depend excessively on the owner or one key employee.",
  },
  {
    id: "q22",
    categoryId: "growth",
    text: "We have a workforce plan connecting future staffing needs with the business's growth plans.",
  },
  {
    id: "q23",
    categoryId: "growth",
    text: "Our people processes can be consistently repeated as we add employees or locations.",
  },
  {
    id: "q24",
    categoryId: "growth",
    text: "Our leadership structure, management capability and HR systems are strong enough to support our next stage of growth.",
  },
];

export const RISK_OPTIONS: {
  id: string;
  label: string;
  flag: "critical" | "business" | null;
  exclusive?: boolean;
}[] = [
  {
    id: "recruiting",
    label: "Persistent difficulty filling critical positions",
    flag: "business",
  },
  {
    id: "turnover",
    label: "Repeated turnover in the same position or location",
    flag: "business",
  },
  {
    id: "complaint",
    label:
      "An employee complaint involving harassment, discrimination or retaliation",
    flag: "critical",
  },
  {
    id: "wage",
    label: "A wage, overtime, employee-classification or payroll concern",
    flag: "critical",
  },
  {
    id: "conflict",
    label:
      "A serious employee conflict or performance issue that leadership was unsure how to handle",
    flag: "critical",
  },
  {
    id: "inconsistent",
    label: "Inconsistent employment practices between managers or locations",
    flag: null,
  },
  {
    id: "policies",
    label: "Missing or outdated employee policies or documentation",
    flag: "critical",
  },
  {
    id: "licenses",
    label:
      "Difficulty tracking licenses, certifications, training or required records",
    flag: null,
  },
  {
    id: "overwhelmed",
    label: "An owner or manager overwhelmed by employee matters",
    flag: "business",
  },
  {
    id: "growth",
    label: "Growth delayed or disrupted by staffing or leadership problems",
    flag: "business",
  },
  {
    id: "teamwork",
    label:
      "Employee issues negatively affecting teamwork or customer experience",
    flag: "business",
  },
  { id: "none", label: "None of the above", flag: null, exclusive: true },
];

export const IMPACT_QUESTIONS = [
  {
    id: "time",
    label:
      "Approximately how much of the owner's or senior leader's time is spent addressing employee or HR issues during a typical month?",
    options: [
      "Less than two hours",
      "Two to five hours",
      "Six to ten hours",
      "Eleven to twenty hours",
      "More than twenty hours",
      "Unsure",
    ],
  },
  {
    id: "interference",
    label:
      "To what extent are people-related problems interfering with business performance or growth?",
    options: [
      "Not at all",
      "Slightly",
      "Moderately",
      "Significantly",
      "Severely",
      "Unsure",
    ],
  },
  {
    id: "concern",
    label:
      "If nothing changes during the next 12 months, which outcome concerns you most?",
    options: [
      "Continued recruiting difficulty",
      "Loss of strong employees",
      "Management inconsistency",
      "Increased compliance or legal risk",
      "Owner or manager burnout",
      "Problems expanding the business",
      "Declining teamwork, culture or customer experience",
      "We are not currently concerned",
      "Other",
    ],
  },
] as const;

export const SCHEDULE_OPTIONS = [
  {
    value: "yes",
    label: "Yes, I would like to schedule a complimentary results review",
  },
  { value: "possibly", label: "Possibly—please send me more information" },
  { value: "no", label: "Not at this time" },
] as const;

export const OUTCOME_OPTIONS = [
  "Reduce compliance risk",
  "Update policies and employee documentation",
  "Improve recruiting",
  "Build a consistent onboarding process",
  "Reduce turnover",
  "Develop an internal HR resource",
  "Strengthen manager capability and accountability",
  "Improve performance management",
  "Resolve employee-relations concerns",
  "Improve compensation or benefits",
  "Prepare for another location or acquisition",
  "Build scalable HR systems",
  "Determine whether we need fractional or internal HR support",
  "Other",
];

export const TIMELINE_OPTIONS = [
  "Immediately",
  "Within the next 30 days",
  "Within the next three months",
  "Within the next six months",
  "Later this year",
  "We are gathering information",
];

export type ResultTier =
  | "scale-ready"
  | "developing"
  | "growth-constrained"
  | "foundation-at-risk";

export const RESULT_COPY: Record<
  ResultTier,
  {
    name: string;
    summary: string;
    nextSteps: string[];
    support: string;
    cta: string;
    ctaLabel: string;
  }
> = {
  "scale-ready": {
    name: "Scale Ready",
    summary:
      "Your business appears to have a strong people and HR foundation. Responsibilities are generally clear, core processes are in place and the organization is reasonably prepared to support continued growth.\n\nBeing scale ready does not mean there is nothing left to improve. Your greatest opportunity is likely to strengthen selected systems, develop leadership capability and ensure that your current practices remain effective as the organization becomes larger or more complex.",
    nextSteps: [
      "Review your lowest-scoring category for targeted improvement.",
      "Confirm that your workforce and leadership plans align with anticipated growth.",
      "Consider periodic strategic HR guidance or a defined improvement project.",
    ],
    support:
      "Your business may benefit from a targeted HR project, periodic advisory support or strategic workforce planning rather than extensive ongoing support.",
    cta: "Schedule a Complimentary Results Review",
    ctaLabel: "Schedule a complimentary results review",
  },
  developing: {
    name: "Developing",
    summary:
      "Your business has several important people practices in place, but they may not be sufficiently consistent, documented or scalable. Informal processes may still work today, but they are likely to become less reliable as you add employees or locations.\n\nAddressing the weaker areas now can reduce management frustration, improve consistency and prevent manageable gaps from becoming larger problems.",
    nextSteps: [
      "Identify the two lowest-scoring categories.",
      "Establish a written 90-day improvement plan.",
      "Clarify who owns HR responsibilities within the business.",
      "Give the internal HR contact appropriate tools, training and professional support.",
    ],
    support:
      "Your business may benefit from internal HR development, a focused HR project or limited fractional HR support.",
    cta: "Schedule a Complimentary Results Review",
    ctaLabel: "Schedule a complimentary results review",
  },
  "growth-constrained": {
    name: "Growth Constrained",
    summary:
      "Your results suggest that people, leadership or HR-system gaps may be interfering with the business's performance and ability to grow. Employee concerns may be handled reactively, and too much responsibility may rest with the owner or another key employee.\n\nWithout a more intentional HR structure, growth may increase inconsistency, turnover, management workload and employment risk.",
    nextSteps: [
      "Complete a deeper review of HR practices and current risks.",
      "Prioritize the two or three gaps creating the greatest business impact.",
      "Establish consistent policies, responsibilities and management practices.",
      "Develop a 90-day stabilization and improvement roadmap.",
    ],
    support:
      "Your business may benefit from an ongoing fractional HR partnership that provides both strategic guidance and practical implementation support.",
    cta: "Schedule a Complimentary Results Review",
    ctaLabel: "Schedule a complimentary results review",
  },
  "foundation-at-risk": {
    name: "Foundation at Risk",
    summary:
      "Your results indicate that important people and HR foundations may be missing, inconsistent or overly dependent on individual judgment. These gaps may expose the business to unnecessary employment risk while also contributing to turnover, conflict, management burden and difficulty growing.\n\nThis does not necessarily mean the business has violated an employment requirement. It means that prompt evaluation and structured action would be advisable.",
    nextSteps: [
      "Conduct a comprehensive review of employment practices, documentation and current employee concerns.",
      "Address immediate risks before beginning longer-term improvement projects.",
      "Clarify responsibility for HR decisions and employee support.",
      "Create and implement a prioritized 90-day stabilization plan.",
    ],
    support:
      "Your business may benefit from immediate fractional HR leadership or a comprehensive HR diagnostic followed by hands-on implementation support.",
    cta: "Schedule a Confidential Results Review",
    ctaLabel: "Schedule a confidential results review",
  },
};

export const SCHEDULE_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "People & Growth Results Review"
)}&body=${encodeURIComponent(
  "I completed the People & Growth Readiness Assessment and would like to schedule a complimentary 30-minute results review."
)}`;

export const TOTAL_POSSIBLE = 90;
export const CATEGORY_POSSIBLE = 15;
