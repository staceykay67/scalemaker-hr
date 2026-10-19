export const STEADY_PARTNER =
  "We work with established small businesses that want a steady HR partner for years, and with growing ones we help scale and then hand off when their needs outgrow our focus. Either way, the goal is the same: people systems that work without depending on us.";

export const GRADUATE_LINE = "Stay as long as we fit. Graduate when you outgrow us.";

export const HRIS_EARLY_ACCESS = "Now in early access.";

export const hrisHero = {
  eyebrow: "Scalemaker HRis",
  headline: "One place to run HR, set up by people who know HR.",
  subhead:
    "Scalemaker HRis (HRIS) is our people platform for small businesses with up to about 200 employees. Records, time, hiring, onboarding, payroll hand-off, benefits and more, all in one place, set up with you by a senior HR partner from Scalemaker HR.",
  primaryCta: "Request a walkthrough",
  earlyAccess: HRIS_EARLY_ACCESS,
  secondaryCta: "Take the free assessment",
};

export const hrisTwiceAYear = {
  heading: "Built for the person who uses it twice a year",
  paragraphs: [
    "Most HR software is built for the administrator who uses it twice a day. Scalemaker HRis is built for the employee who uses it twice a year.",
    "That means plain words, clear next steps, and no hunting through menus. When someone needs to request time off, update an address or sign a form, it's right in front of them. When it's easy for your employees, it's easier for everyone.",
  ],
};

export const hrisOneTeam = {
  heading: "One team: your HR system and your senior HR partner",
  paragraphs: [
    "Most growing companies don't have a technology problem. They have a scattered problem. Payroll is in one place, hiring is in another, records are in a binder, and the details live in the owner's head.",
    "Software alone doesn't fix that. Someone still has to decide how your company should run, set it up that way, and make sure the steps actually happen. That's what we do at Scalemaker HR.",
  ],
  points: [
    {
      title: "We set it up with you.",
      body: "Your structure, locations, roles and records, configured the way your company actually works.",
    },
    {
      title: "It runs the way we designed it.",
      body: "The steps we build together repeat the same way as you add people and locations.",
    },
    {
      title: "You stay in control.",
      body: `${GRADUATE_LINE} Your data is yours to export anytime.`,
    },
  ],
};

export type HrisFeature = {
  title: string;
  body: string;
};

export const hrisFeaturesHeading = "Everything in one place";

export const hrisFeatures: HrisFeature[] = [
  {
    title: "People records and self-service",
    body: "One home for every employee: job, pay and manager history, departments and documents. Employees update their own details, so records stay current without chasing anyone.",
  },
  {
    title: "Org chart",
    body: "See who reports to whom, and update it as your company grows or reorganizes.",
  },
  {
    title: "Roles and permissions",
    body: "Everyone sees only what their role allows. Multi-factor sign-in is required for every user.",
  },
  {
    title: "Time and attendance",
    body: "A timeclock for hourly teams, with timecard review and approval for managers.",
  },
  {
    title: "Time off and leave",
    body: "Employees request time off, managers approve it, and holidays and leave are tracked in one calendar.",
  },
  {
    title: "Hiring",
    body: "Post a job, review candidates, schedule interviews with calendar and video links, collect feedback and send offers. When a candidate accepts, they move straight into onboarding.",
  },
  {
    title: "Onboarding",
    body: "From offer to first day. New hires complete their paperwork, including I-9 and W-4, and get a checklist for their first weeks. Managers get theirs too.",
  },
  {
    title: "Payroll hand-off",
    body: "Hours, pay changes, new hires and bank or direct deposit details flow to your payroll provider in a pay-run file. Nobody types the same information twice. You keep the payroll provider you already use.",
  },
  {
    title: "Benefits enrollment",
    body: "Employees choose their plans and add dependents in one guided flow. Elections go to your carriers automatically or by a change file.",
  },
  {
    title: "E-signature",
    body: "Offers, policies, acknowledgements and forms are signed right in the app.",
  },
  {
    title: "Documents and handbook",
    body: "Publish your handbook, keep every version, and share the resources your team needs.",
  },
  {
    title: "Messages and announcements",
    body: "Reach one person, a team or the whole company, right where they already work.",
  },
  {
    title: "Reports",
    body: "Standard reports, including EEO-1, plus custom reports you can save and export.",
  },
  {
    title: "Exits",
    body: "A guided checklist so every departure is handled the same way, with nothing missed.",
  },
  {
    title: "HR advisor",
    body: "An AI assistant that answers HR questions in plain language, guides you to the right place, and prepares changes for you to review and confirm. Nothing changes until you say so.",
  },
];

export const hrisModes = {
  heading: "Two ways to run it: Soft file and Full file",
  modes: [
    {
      title: "Soft file.",
      body: "Your roster and day-to-day people records, without sensitive personal data like Social Security numbers, birth dates or bank details. It's a good fit for companies that want structure and visibility without holding sensitive files.",
    },
    {
      title: "Full file.",
      body: "Everything in Soft, plus the sensitive details that complete an employee's file: I-9 and W-4 forms and direct deposit information. That's what lets onboarding, payroll and benefits connect without anyone re-keying data.",
    },
  ],
  closing:
    "You choose the one that fits. You can start with Soft and move to Full when you're ready.",
};

export const hrisAudience = {
  heading: "Who it's for",
  paragraphs: [
    "U.S. small businesses with up to about 200 employees that are running HR on spreadsheets, paper and memory, and are ready for one place to run it right.",
    "If you're well past that size or operate in several countries, a larger platform is probably a better fit, and we'll tell you so.",
  ],
};

export const hrisWalkthrough = {
  heading: "See it for yourself",
  body: "We'll walk you through Scalemaker HRis using a sample company, and talk through whether it fits how you work. No pressure, and an honest answer either way.",
  earlyAccess: HRIS_EARLY_ACCESS,
  note: "Not sure you need a platform yet? Start with the free assessment. We'll tell you if Scalemaker HRis fits, and if it doesn't.",
};

export const hrisFaqs = [
  {
    question: "Do I need an HR person to use it?",
    answer:
      "No. We set it up with you and stay involved. It's designed for owners and office managers who wear the HR hat.",
  },
  {
    question: "Does it replace my payroll provider?",
    answer:
      "No. Scalemaker HRis sends what payroll needs to the provider you already use, so you keep the payroll you trust.",
  },
  {
    question: "Is it a replacement for consulting?",
    answer: "No. It's how the systems we build together keep running after the project is done.",
  },
  {
    question: "Can I leave?",
    answer:
      "Yes. Stay as long as we fit, and graduate when you outgrow us. You can export your data whenever you need to.",
  },
];

export const hrisResultsBlock = {
  heading: "Your systems may be part of the strain.",
  paragraphs: [
    "Some of your answers point to how your people information and processes are handled: records, onboarding, or doing things the same way across managers and locations. Fixing the process comes first. Once it's right, it should be easy to keep right.",
    "That's why we built Scalemaker HRis (HRIS), our people platform, set up with you as part of the consulting relationship. We'll tell you honestly whether it fits your company, or whether you don't need it.",
  ],
  linkLabel: "Learn about Scalemaker HRis",
  linkHref: "/hris",
};

export function hrisCopyText(): string {
  return JSON.stringify({
    hrisHero,
    hrisTwiceAYear,
    hrisOneTeam,
    hrisFeaturesHeading,
    hrisFeatures,
    hrisModes,
    hrisAudience,
    hrisWalkthrough,
    hrisFaqs,
    hrisResultsBlock,
    STEADY_PARTNER,
    GRADUATE_LINE,
  });
}
