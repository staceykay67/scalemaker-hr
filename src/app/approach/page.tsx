import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBand } from "@/components/cta-band";
import { APPROACH_HRIS_STEP } from "@/lib/hris-copy";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Assessment, complimentary results review, and a paid diagnostic when that is the right next step.",
};

type ApproachStep = {
  title: string;
  paragraphs: string[];
};

const diagnosticIncludes = [
  "Interviews with key people",
  "Review of HR documents, systems, and workflows",
  "Identification and prioritization of risks and opportunities",
  "A written 90-day action roadmap",
  "An executive presentation of findings and recommendations",
];

const steps: ApproachStep[] = [
  {
    title: "1. Start with a complimentary assessment",
    paragraphs: [
      "Our People & Growth Readiness Assessment takes just 5–7 minutes and evaluates 18 statements across six key areas of your business.",
      "You'll receive an overall readiness score, a breakdown of your results, and recommended next steps.",
      "It's a starting point, not a comprehensive HR audit. The goal is to help you recognize strengths, spot potential gaps, and decide where to focus your attention.",
    ],
  },
  {
    title: "2. Let's talk about your results",
    paragraphs: [
      "Schedule a complimentary 30-minute results review to discuss what your assessment revealed.",
      "We'll explore your biggest challenges, what they're costing your business in time or effort, and what you'd like to improve.",
      "You'll leave with a clearer understanding of your options and our recommendation for what makes sense next.",
      "No obligation. No sales pressure. Just a useful conversation.",
    ],
  },
  {
    title: "3. Take a deeper look, when needed",
    paragraphs: [
      "When the challenges warrant a more thorough investigation, we may recommend our paid People Systems Diagnostic and Growth Roadmap.",
      "This is where we move beyond identifying potential issues to understanding their causes and designing practical solutions.",
    ],
  },
];

const laterWork = [
  "A defined people-systems foundation project",
  "Manager or internal-HR development",
  "Periodic HR advisory support",
  "Fractional HR leadership",
  "Internal HR hiring and transition support",
  APPROACH_HRIS_STEP,
];

export default function ApproachPage() {
  return (
    <>
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-sage">How We Work</p>
      <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold text-forest sm:text-4xl">
        Understand the challenges. Build the right solutions.
      </h1>
      <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
        <p>
          Every business is different. We start by understanding what&apos;s working, where challenges are emerging, and what matters most to your organization.
        </p>
        <p>
          We don&apos;t believe every problem requires a consultant, a new system, or an expensive project. Sometimes a little guidance is enough. Other times, a closer look reveals opportunities to strengthen the business for years to come.
        </p>
        <p>
          Our approach is straightforward: identify the priorities, recommend the right level of support, and tackle the biggest issues first.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.title} className="h-full">
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {step.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-12 max-w-3xl" aria-labelledby="diagnostic-includes">
        <h2 id="diagnostic-includes" className="font-heading text-2xl font-bold text-forest">
          What the diagnostic includes
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Depending on your organization&apos;s needs, the diagnostic includes:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {diagnosticIncludes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          You&apos;ll know what needs attention, why it matters, and what to do next.
        </p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading text-2xl font-bold text-forest">
          After the diagnostic
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Follow-on work is scoped to the organization. It may include:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {laterWork.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Link
        href="/assessment"
        className={cn(buttonVariants(), "mt-10 inline-flex h-12 px-6 font-semibold")}
      >
        Begin the assessment
      </Link>
    </div>
      <CtaBand
        title="The first step is complimentary."
        body="Complete the assessment, then decide whether a complimentary 30-minute results review would be useful."
      />
    </>
  );
}
