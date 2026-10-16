export const STEADY_PARTNER =
  "We work with established small businesses that want a steady HR partner for years, and with growing ones we help scale and then hand off when their needs outgrow our focus. Either way, the goal is the same: people systems that work without depending on us.";

export const GRADUATE_LINE = "Stay as long as we fit. Graduate when you outgrow us.";

export const hrisHero = {
  eyebrow: "Early access pilot",
  headline: "HR technology that fits how we work.",
  subhead:
    "Scalemaker HRis (HRIS) is our people platform for small businesses. We set it up with you, so it runs right from day one. You don't need an HRIS degree to get the right outcomes, and nothing gets missed.",
  primaryCta: "Join the early-access pilot",
  secondaryCta: "Take the assessment",
};

export const hrisWhy = [
  "Most growing companies don't have a technology problem. They have a scattered problem. Payroll is in one place, hiring is in another, records are in a binder, and the details live in the owner's head.",
  "Software alone doesn't fix that. Someone still has to decide how your company should run, set it up that way, and make sure the steps actually happen. That's the work we already do as consultants. HRis is where that work lives once it's built.",
];

export const hrisRelationship = {
  intro:
    "HRis is an extension of Scalemaker HR consulting. It isn't a do-it-yourself tool you're left to figure out alone.",
  points: [
    {
      title: "We set it up with you.",
      body: "Your structure, locations, roles, and records are configured the way your company actually works.",
    },
    {
      title: "It runs the way we designed it.",
      body: "The steps we put in place during consulting are built into the system, so they repeat the same way as you add people and locations.",
    },
    {
      title: "You stay in control.",
      body: `${STEADY_PARTNER} If you ever move on, you can export your data and take it with you.`,
    },
  ],
};

export const hrisModes = [
  {
    title: "Soft file.",
    body: "Your employee roster and day-to-day people records, with no sensitive personal data such as Social Security numbers, birth dates, or bank details. It's built for companies that want structure and visibility without storing sensitive files. Many companies never need more.",
  },
  {
    title: "Full file (coming).",
    body: "Everything in Soft, plus the ability to hold sensitive employee data once our independent security testing is complete. It's in development now and isn't available for real employee data yet.",
  },
];

export type HrisFeature = {
  title: string;
  body?: string;
};

export const hrisAvailableHeading = "Available in early access";

export const hrisPilotFeatures: HrisFeature[] = [
  {
    title: "People records and roster.",
    body: "Every employee in one place, with job, pay, and manager history, departments, a company directory, and an org chart you can update as your structure changes.",
  },
  {
    title: "Roles and permissions.",
    body: "Each person sees only what their role allows. Multi-factor sign-in is required for every user.",
  },
  {
    title: "License and certification tracking.",
    body: "Track credentials and expiration dates, with notices before anything lapses.",
  },
  {
    title: "Guided onboarding.",
    body: "From offer to first day, with checklists for the new hire and the manager.",
  },
  {
    title: "Time off and leave.",
    body: "Employees request time off, managers approve it, and company holidays are built in.",
  },
  {
    title: "Timeclock.",
    body: "Employees clock in and out in the same place they handle everything else.",
  },
  {
    title: "In-app messages.",
    body: "Reach employees and managers inside HRis.",
  },
  {
    title: "Handbook and resources.",
    body: "Publish your handbook, keep track of versions, and share key documents.",
  },
  {
    title: "Hiring.",
    body: "A job pipeline, AI-assisted resume entry, interview scheduling through Google Calendar with Meet links, interview panels, and offers. When a candidate accepts, they move straight into onboarding.",
  },
  {
    title: "Exits and offboarding.",
    body: "A guided checklist so departures are handled the same way every time.",
  },
  {
    title: "Reports.",
    body: "Standard reports, including EEO-1 counts, plus custom reports you can save and export to CSV.",
  },
  {
    title: "Payroll export.",
    body: "Send a clean employee file to your payroll provider. HRis doesn't run payroll, so you keep the payroll you already use.",
  },
  {
    title: "HR advisor.",
    body: "An AI assistant that answers HR questions in plain language and shows you where to find things in HRis. It gives guidance only and doesn't make changes.",
  },
];

export const hrisComingHeading = "Coming";

export const hrisComingFeatures: HrisFeature[] = [
  {
    title: "Guided company setup.",
    body: "A step-by-step setup we walk through with you, so nothing is skipped.",
  },
  {
    title: "A smarter HR advisor.",
    body: "It will prepare changes for you to review and confirm.",
  },
  {
    title: "Full file.",
    body: "Secure storage for sensitive employee data.",
  },
  {
    title: "State-specific rules.",
    body: "Employment rules that follow the state where each person works.",
  },
  { title: "Benefits." },
  { title: "E-Verify." },
  { title: "Job board posting." },
  { title: "Background checks." },
  { title: "E-signature." },
];

export const hrisAudience = [
  "U.S. small businesses with about 15 to 200 employees that are running HR on spreadsheets, paper, and memory, and are ready for one place to run it right.",
  "If you're well past that size or operate in several countries, a larger platform is probably a better fit, and we'll tell you so.",
];

export const hrisHonesty = {
  intro: "HRis is in an early-access pilot. Here's what that means:",
  points: [
    "We're onboarding a small first group, set up and supported directly by us.",
    "Walkthroughs use sample companies with made-up data, never real employee records.",
    "Some features are still being built and are labeled \"coming\" above.",
    "We'll tell you plainly what's ready and what isn't before you commit to anything.",
  ],
  note: "Not sure if you need a platform yet? Start with the free assessment. We'll tell you if HRis fits, and if it doesn't.",
};

export const hrisFaqs = [
  {
    question: "Do I need an HR person to use it?",
    answer:
      "No. We set it up with you and stay involved. It's designed for owners and office managers who wear the HR hat.",
  },
  {
    question: "Is it a replacement for consulting?",
    answer: "No. It's how the systems we build together keep running after the project is done.",
  },
  {
    question: "Can I leave?",
    answer:
      "Yes. Stay as long as we fit, and graduate when you outgrow us. You can export your data into another system whenever you need to.",
  },
];

export const hrisResultsBlock = {
  heading: "Your systems may be part of the strain.",
  paragraphs: [
    "Some of your answers point to how your people information and processes are handled: records, onboarding, or doing things the same way across managers and locations. Fixing the process comes first. Once it's right, it should be easy to keep right.",
    "That's why we built Scalemaker HRis (HRIS), our people platform, set up for you as part of the consulting relationship. No HRIS degree needed. It's in an early-access pilot, and we'll tell you honestly whether it fits your company or whether you don't need it.",
  ],
  linkLabel: "Learn about HRis",
  linkHref: "/hris",
};

export function hrisCopyText(): string {
  return JSON.stringify({
    hrisHero,
    hrisWhy,
    hrisRelationship,
    hrisModes,
    hrisAvailableHeading,
    hrisPilotFeatures,
    hrisComingHeading,
    hrisComingFeatures,
    hrisAudience,
    hrisHonesty,
    hrisFaqs,
    hrisResultsBlock,
    STEADY_PARTNER,
    GRADUATE_LINE,
  });
}
