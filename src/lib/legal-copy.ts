import { CONTACT_EMAIL } from "@/lib/site-contact";

export const SUBMIT_CONSENT =
  "By submitting, you agree to our Privacy Policy and Terms. Please don't include employee personal information.";

export const SYSTEMS_ABOUT_TOOLS =
  "These questions are optional and about your company's tools, not your people.";

export const LEGAL_BANNER_TITLE = "Interim, to be updated after counsel review.";
export const LEGAL_BANNER_BODY =
  "We'll swap in an updated version after our attorney reviews it.";

export const TERMS_LIABILITY_CAP =
  "Our total responsibility for any issue with our site is capped at the greater of the fees you paid us in the prior 12 months or $100.";

export type LegalListItem = {
  lead?: string;
  text: string;
};

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: LegalListItem[];
  after?: string[];
};

export type LegalPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  effective: string;
  who: string;
  intro: string[];
  sections: LegalSection[];
  closingHeading: string;
  email: string;
  companyLine: string;
};

const WHO =
  "Scalemaker HR LLC, an Arizona company. We run www.scalemakerhr.com.";

export const PRIVACY_POLICY: LegalPageCopy = {
  eyebrow: "Privacy",
  title: "Your privacy at Scalemaker HR",
  description:
    "How Scalemaker HR collects, uses, and protects information on this website.",
  effective: "November 13, 2026",
  who: WHO,
  intro: [
    "We help small businesses build people systems they can trust. That starts with how we treat your information. Here's what we collect, why, and what you can do about it, in plain words.",
  ],
  sections: [
    {
      heading: "What we collect",
      list: [
        {
          lead: "Your contact details.",
          text: "Your name, business name, work email, and phone number if you choose to share it.",
        },
        {
          lead: "Your assessment answers.",
          text: "Things like your company size, where you operate, how HR runs today, and what's on your mind.",
        },
        {
          lead: "Your interest in our services.",
          text: "For example, if you tick the box saying you'd like to hear about Scalemaker HRis, or tell us what you need on our contact form.",
        },
        {
          lead: "Optional HR tools questions.",
          text: "Which HR tools your company uses, roughly what they cost, and when they renew. These questions are about your company, not your people. Skip any you like.",
        },
        {
          lead: "Anything you type",
          text: "in a message or notes box.",
        },
        {
          lead: "Basic tech info",
          text: "your browser sends, like your IP address. We use it to keep our site running and to stop spam and repeat submissions.",
        },
      ],
      after: [
        "Please leave your employees' personal information out. That means no names, health details, pay records, Social Security numbers or complaint details. We don't need it, and our site isn't built to hold it.",
      ],
    },
    {
      heading: "Why we collect it",
      list: [
        { text: "To reply to you." },
        { text: "To score your assessment and show your results." },
        { text: "To prepare for your results call and, if you ask for one, a proposal." },
        { text: "To keep our site running and safe." },
      ],
    },
    {
      heading: "Cookies and tracking",
      paragraphs: [
        "Right now, this site doesn't use tracking cookies, ads or analytics.",
        "The assessment saves your progress and results in your own browser, so you don't lose your place. You can clear it anytime.",
        "If we ever add analytics, we'll update this page first.",
      ],
    },
    {
      heading: "We don't sell your information",
      paragraphs: [
        "We don't sell your information. We don't share it for targeted ads. We don't trade email lists. Ever.",
      ],
    },
    {
      heading: "Who else sees it",
      paragraphs: [
        "A small team at Scalemaker HR, plus the tools that help us run things:",
      ],
      list: [
        {
          lead: "Formspree",
          text: "receives your form answers, emails them to us, and keeps a copy in its dashboard.",
        },
        {
          lead: "Vercel",
          text: "hosts our site. Like most hosts, its logs record basic tech info such as IP addresses.",
        },
        {
          lead: "Google Workspace",
          text: "runs our email, calendar and files. Your answers land in our email, and we may copy notes into our files to prepare for your call.",
        },
        {
          lead: "Upstash",
          text: "provides rate-limiting storage that keeps your IP address for up to 24 hours to count repeat submissions.",
        },
        {
          lead: "AI tools.",
          text: "We use AI tools from our service providers to help our team read, sort and organize inquiries and call notes. They work inside our own accounts, and we don't let them sell or share your information.",
        },
      ],
      after: [
        "If you book a call, Google's booking page handles those details.",
        "We'd also share information if the law requires it, or if our business changes hands.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep it only as long as we need it to help you. Then we delete it from our email, our files and Formspree, no later than 24 months after we last talk.",
        "The spam counter keeps your IP address for up to 24 hours. Host and form-tool logs follow those companies' own schedules.",
        "If you become a client, your client agreement takes over from there.",
      ],
    },
    {
      heading: "How we protect it",
      paragraphs: [
        "We keep it simple and careful. Our site uses HTTPS. We limit access to our team and the tools listed above. And we use trusted, well-known services.",
        "No system is perfect, so please keep sensitive information off our site.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "Want to see, fix or delete what you sent us? Want us to stop reaching out? Just email us. We'll help, no matter where you live.",
        "Some states, like California, give their residents extra privacy rights. We're checking with our attorney on whether those laws cover a business our size. If they apply, we'll honor them. And we'll never treat you differently for asking.",
      ],
    },
    {
      heading: "Kids",
      paragraphs: [
        "This site is for people running businesses. It isn't meant for anyone under 16, and we don't knowingly collect their information. If a child sent us something, let us know and we'll delete it.",
      ],
    },
    {
      heading: "Scalemaker HRis",
      paragraphs: [
        "This page covers our website only. Scalemaker HRis, our HR software, and our client work will have their own privacy policy and data agreement.",
      ],
    },
    {
      heading: "When this page changes",
      paragraphs: [
        "We'll post any updates here with a new date. This interim version will be replaced after our attorney's review.",
      ],
    },
  ],
  closingHeading: "Questions? We're glad to help.",
  email: CONTACT_EMAIL,
  companyLine: "Scalemaker HR LLC. Mailing address available on request.",
};

export const TERMS_OF_USE: LegalPageCopy = {
  eyebrow: "Terms",
  title: "Using the Scalemaker HR website",
  description: "The ground rules for using the Scalemaker HR website.",
  effective: "November 13, 2026",
  who: WHO,
  intro: [
    "These are the ground rules for using our site. We've kept them short and plain. By using this site, you agree to them.",
  ],
  sections: [
    {
      heading: "Helpful information, not advice",
      paragraphs: [
        "Our site and assessment share general HR information. They aren't legal, tax or HR advice for your specific situation.",
        "We're HR consultants, not a law firm. Using this site doesn't make us your lawyer or your consultant. For legal questions, please talk with an attorney.",
        "When we do consulting work together, it happens under a separate signed agreement.",
      ],
    },
    {
      heading: "Your results are a starting point",
      paragraphs: [
        "Your scores and results are estimates based on your answers. They aren't an audit or a guarantee. Use them to start a conversation, not to end one.",
      ],
    },
    {
      heading: "Please play fair",
      paragraphs: ["We ask that you don't:"],
      list: [
        { text: "give false information or pretend to be someone else" },
        { text: "share other people's personal information, including your employees'" },
        { text: "use bots or scrapers, or try to get around our limits" },
        { text: "interfere with our site's security" },
        { text: "copy or resell our assessment or content, or use our site for anything illegal" },
      ],
    },
    {
      heading: "What's ours",
      paragraphs: [
        "This site, the assessment, our scoring, and the Scalemaker HR name and logo belong to us. Please ask before using them.",
      ],
    },
    {
      heading: "What's yours",
      paragraphs: [
        "What you send us stays yours. You're letting us use it to show your results, reply to you, and prepare for any call or proposal you ask for, as our Privacy Policy explains.",
        "Please only send what you have the right to share. If you send us feedback, we may use it.",
      ],
    },
    {
      heading: "Other websites",
      paragraphs: [
        "We link to a few outside services, like Google's booking page. Their own rules apply there.",
      ],
    },
    {
      heading: "What we can and can't promise",
      paragraphs: [
        'We work hard to keep our site accurate and running. Still, we provide it "as is." We can\'t promise it will always be error-free, up to date or available.',
      ],
    },
    {
      heading: "Limits on our responsibility",
      paragraphs: [
        "In plain words: if something goes wrong with our site, here's how far our responsibility goes.",
      ],
      list: [
        {
          text: "As far as the law allows, we aren't responsible for indirect losses from using our site, like lost profits or lost data.",
        },
        { text: TERMS_LIABILITY_CAP },
        {
          text: "Some states don't allow limits like these, so some of them may not apply to you.",
        },
        { text: "Client work has its own agreement." },
      ],
    },
    {
      heading: "Arizona law applies",
      paragraphs: [
        "These terms follow Arizona law. If there's ever a dispute, it goes to the state or federal courts in Maricopa County, Arizona.",
      ],
    },
    {
      heading: "When these terms change",
      paragraphs: [
        "We may update our site or these terms. When we do, we'll post the new date here. This interim version will be replaced after our attorney's review.",
      ],
    },
  ],
  closingHeading: "Questions? Just ask.",
  email: CONTACT_EMAIL,
  companyLine: "Scalemaker HR LLC. Mailing address available on request.",
};

export function legalPlainText(page: LegalPageCopy): string {
  const parts = [
    page.title,
    page.intro.join(" "),
    ...page.sections.flatMap((section) => [
      section.heading,
      ...(section.paragraphs ?? []),
      ...(section.list ?? []).map((item) => `${item.lead ?? ""} ${item.text}`),
      ...(section.after ?? []),
    ]),
  ];
  return parts.join("\n");
}
