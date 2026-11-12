export const STEADY_PARTNER =
  "We work with established small businesses that want a steady HR partner for years, and with growing ones we help scale and then hand off when their needs outgrow our focus. Either way, the goal is the same: people systems that work without depending on us.";

export const GRADUATE_LINE = "Stay as long as we fit. Graduate when you outgrow us.";

export const HRIS_EARLY_ACCESS = "Now in early access.";

export const AUDIENCE_PHRASE = "small businesses nationwide, up to about 200 employees";

export const TEAM_LOCATION = "Our team is based in Arizona and Utah.";

export const ONE_TEAM_BAND = {
  heading: "Consulting, Scalemaker HRis, or both.",
  body: "Choose the support that fits. Each one works on its own, and they work well together.",
  linkLabel: "Compare the options",
  linkHref: "/services",
};

export const ABOUT_HRIS_PARAGRAPH =
  "We also built Scalemaker HRis (HRIS), an HR platform designed specifically for growing businesses. Clients can choose our consulting, the platform, or both. Either way, we bring your people processes and technology together around how your business actually operates.";

export const ABOUT_LOCATION =
  "Scalemaker HR LLC is an Arizona company. Our team is based in Arizona and Utah and serves small businesses nationwide with up to approximately 200 employees, providing experienced HR leadership and practical people systems through a remote-first model.";

export const APPROACH_HRIS_STEP = "Scalemaker HRis set up and run with you (early access).";

export const HRIS_RESULTS_LINE =
  "Scalemaker HRis is our HR platform for small businesses. Use it on its own or alongside our consulting. If your current tools work, we'll help you keep them.";

export const hrisHero = {
  eyebrow: "Scalemaker HRis",
  headline: "One place to run HR, set up by people who know HR.",
  subhead:
    "Scalemaker HRis (HRIS) is our people platform for small businesses with up to about 200 employees. Records, time, hiring, onboarding, payroll exports, benefits elections and more, all in one place, set up with you by the Scalemaker HR team.",
  primaryCta: "See it for yourself",
  earlyAccess: HRIS_EARLY_ACCESS,
  secondaryCta: "Begin the assessment",
};

export const hrisTwiceAYear = {
  heading: "Built for the person who uses it twice a year",
  paragraphs: [
    "Most HR software is built for the administrator who uses it twice a day. Scalemaker HRis is built for the employee who uses it twice a year.",
    "That means plain words, clear next steps, and no hunting through menus. When someone needs to request time off, update an address or sign a form, it's right in front of them. When it's easy for your employees, it's easier for everyone.",
  ],
};

export const hrisOneTeam = {
  heading: "Use it on its own, or with our consulting",
  paragraphs: [
    "Most growing companies don't have a technology problem. They have a scattered problem. Payroll is in one place, hiring is in another, records are in a binder, and the details live in the owner's head.",
    "Scalemaker HRis brings it together. Use it on its own, or add Scalemaker HR consulting when you want help deciding how your company should run. Consulting is available without the platform, too.",
  ],
  points: [
    {
      title: "We set it up with you.",
      body: "Your structure, locations, roles and records, configured the way your company actually works.",
    },
    {
      title: "It runs the same way every time.",
      body: "The steps you set up repeat the same way as you add people and locations.",
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
    body: "One home for every employee: job, pay and manager history, departments and documents. Employees update their own contact details, so records stay accurate without chasing anyone.",
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
    body: "From offer to first day. New hires get a checklist for their first weeks, and managers get theirs too. On the Full file, new hires also complete their I-9 and W-4 in the app.",
  },
  {
    title: "Payroll exports",
    body: "Hours, pay changes and new hires go into a payroll file laid out for your provider, plus direct deposit details on the Full file. CSV payroll exports now, API connections to payroll vendors coming. HRis doesn't run payroll, so you keep the payroll provider you already use.",
  },
  {
    title: "Benefits elections",
    body: "Employees record their plan elections and dependents in one place, and change files are ready to send to your carriers.",
  },
  {
    title: "E-signature",
    body: "On the Full file, offers, policies, acknowledgements and forms are signed right in the app. On Lite, employees acknowledge with their typed name.",
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
    title: "Your own AI as a guide",
    body: "A downloadable, role-specific guide your people can use with the AI app they already have. There's no AI chat inside HRis. The guide reminds people not to share passwords or personal details.",
  },
];

export const hrisModes = {
  heading: "Two ways to run it: Lite file and Full file",
  modes: [
    {
      title: "Lite file.",
      body: "Your roster and day-to-day people records, without sensitive personal data like Social Security numbers, birth dates or bank details. It's a good fit for companies that want structure and visibility without holding sensitive files.",
    },
    {
      title: "Full file.",
      body: "Everything in Lite, plus the sensitive details that complete an employee's file: I-9 and W-4 forms and direct deposit information. That lets new-hire details carry into your payroll and benefits files without anyone re-keying them.",
    },
  ],
  closing:
    "You choose the one that fits. You can start with Lite and move to Full when you're ready.",
};

export const hrisLawChangeNotes = {
  heading: "Law-change notes, for HRis clients too",
  body: "Every Scalemaker HRis client receives our law-change awareness notes, including clients who don't use our consulting. We watch for enacted employment-law changes and send awareness notes for you to review with your own counsel. You also get our library of generic federal-baseline policies, used as a starting point and updated when we identify relevant federal changes. These are not a substitute for legal advice; your counsel should review them for your state and situation.",
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
  body: "Watch a short recorded walkthrough of Scalemaker HRis, using a sample company.",
  earlyAccess: HRIS_EARLY_ACCESS,
  note: "Not sure you need a platform yet? Start with the complimentary assessment. We'll tell you if Scalemaker HRis fits, and if it doesn't.",
};

export const CERT_FOOTNOTE = "PHR® and SPHR® are marks of HR Certification Institute (HRCI). SHRM-CP® and SHRM-SCP® are marks of SHRM. Scalemaker HR is not affiliated with or endorsed by HRCI or SHRM.";

export const hrisFaqs = [
  {
    question: "Can I use Scalemaker HRis without consulting?",
    answer:
      "Yes. Scalemaker HRis is available on its own, and our consulting is available without the platform. You can also use both, and add either one later.",
  },
  {
    question: "Do I need an HR person to use it?",
    answer:
      "No. We set it up with you. It's designed for owners and office managers who wear the HR hat.",
  },
  {
    question: "Does it replace my payroll provider?",
    answer:
      "No. HRis doesn't run payroll. CSV payroll exports now, API connections to payroll vendors coming. You keep the payroll provider you already use.",
  },
  {
    question: "What if I want HR guidance, too?",
    answer:
      "Add Scalemaker HR consulting. When you add Scalemaker HR consulting, your HR professional is certified by HRCI or SHRM.*",
  },
  {
    question: "Do HRis-only clients get law-change notes?",
    answer:
      "Yes. Every client receives our monthly law-change awareness notes to review with their own counsel. They're a starting point, not legal advice.",
  },
  {
    question: "Can I leave?",
    answer:
      "Yes. Stay as long as we fit, and graduate when you outgrow us. You can export your data whenever you need to.",
  },
];

export const hrisResultsBlock = {
  line: HRIS_RESULTS_LINE,
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
    AUDIENCE_PHRASE,
    ONE_TEAM_BAND,
    ABOUT_HRIS_PARAGRAPH,
    ABOUT_LOCATION,
    APPROACH_HRIS_STEP,
    HRIS_RESULTS_LINE,
  });
}
