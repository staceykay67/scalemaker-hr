export const EARLY_ACCESS_LABEL = "available in early access";

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
      body: "Our goal is a company that can run its own people processes, not one that depends on us. When you outgrow HRis, you can export your data and take it with you.",
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
  body: string;
  earlyAccess?: boolean;
};

export const hrisPilotFeatures: HrisFeature[] = [
  {
    title: "One employee roster.",
    body: "Names, employee IDs, jobs, departments, managers, locations, and status, all in one place.",
  },
  {
    title: "License and certification tracking.",
    body: "Track the credential type, number, and expiration date so renewals don't slip.",
  },
  {
    title: "Guided onboarding.",
    earlyAccess: true,
    body: "From offer to first day. A person always makes the hire decision. Then the new hire gets an invite and a guided first-day wizard, with checklist tasks for the employee and the manager.",
  },
  {
    title: "Time off.",
    earlyAccess: true,
    body: "Employees request time off, managers approve or deny it, and coverage is planned while someone is out.",
  },
];

export const hrisComingFeatures: HrisFeature[] = [
  {
    title: "Guided setup.",
    body: "A step-by-step setup we walk through with you, so nothing is skipped.",
  },
  {
    title: "State-aware rules.",
    body: "Employment rules follow the state where each person works.",
  },
  {
    title: "Exits.",
    body: "A termination checklist with benefits and continuation steps.",
  },
  {
    title: "Benefits and payroll export.",
    body: "These come with Full file.",
  },
  {
    title: "HR advisor.",
    body: "An AI assistant that answers HR questions in plain language. It advises only and never sees sensitive data.",
  },
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
    "Some features are still being built and are labeled “coming” above.",
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
    answer: "Yes. You can export your data into another system. We built it so you can outgrow it.",
  },
];

export function hrisCopyText(): string {
  return JSON.stringify({
    hrisHero,
    hrisWhy,
    hrisRelationship,
    hrisModes,
    hrisPilotFeatures,
    hrisComingFeatures,
    hrisAudience,
    hrisHonesty,
    hrisFaqs,
  });
}
