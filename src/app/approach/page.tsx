import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBand } from "@/components/cta-band";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Start with a complimentary assessment and 30-minute results review, then choose consulting, Scalemaker HRis, or both.",
};

const diagnosticIncludes = [
  "Interviews with key people",
  "Review of HR documents, systems, and workflows",
  "Identification and prioritization of risks and opportunities",
  "A written 90-day action roadmap",
  "An executive presentation of findings and recommendations",
];

const consultingWork = [
  "A defined people-systems foundation project",
  "Manager or internal-HR development",
  "Periodic HR advisory support",
  "Internal HR hiring and transition support",
  "Fractional HR leadership, our top tier of consulting",
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

      <section className="mt-12 max-w-3xl" aria-labelledby="step-1">
        <h2 id="step-1" className="font-heading text-2xl font-bold text-forest">
          1. Start with a complimentary assessment
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            Our People &amp; Growth Readiness Assessment takes just 5–7 minutes and evaluates 18 statements across six key areas of your business.
          </p>
          <p>
            You&apos;ll receive an overall readiness score, a breakdown of your results, and recommended next steps, on screen and by email.
          </p>
          <p>
            It&apos;s a starting point, not a comprehensive HR audit. The goal is to help you recognize strengths, spot potential gaps, and decide where to focus your attention.
          </p>
        </div>
      </section>

      <section className="mt-12 max-w-3xl" aria-labelledby="step-2">
        <h2 id="step-2" className="font-heading text-2xl font-bold text-forest">
          2. Let&apos;s talk about your results
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            Schedule a complimentary 30-minute results review to discuss what your assessment revealed.
          </p>
          <p>
            We&apos;ll explore your biggest challenges, what they&apos;re costing your business in time or effort, and what you&apos;d like to improve.
          </p>
          <p>
            You&apos;ll leave with a clearer understanding of your options and our recommendation for what makes sense next.
          </p>
          <p>
            No obligation. No sales pressure. Just a useful conversation.
          </p>
        </div>
      </section>

      <section className="mt-12 max-w-3xl" aria-labelledby="step-3">
        <h2 id="step-3" className="font-heading text-2xl font-bold text-forest">
          3. Choose what fits
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Pick the support that matches your needs. Each option works on its own, and you can add the other later.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Consulting.</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Experienced HR guidance, from a focused project or periodic advice up to fractional HR leadership.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Scalemaker HRis.</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Scalemaker HRis (HRIS), our HR platform for small businesses, set up with you and available on its own.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Both.</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Consulting and the platform together, built to match.
            </CardContent>
          </Card>
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          We put the scope in writing before any work begins.
        </p>
        <Link
          href="/services"
          className="mt-4 inline-flex text-sm font-semibold text-forest underline-offset-4 hover:underline"
        >
          Compare the options
        </Link>
      </section>

      <section className="mt-12 max-w-3xl" aria-labelledby="diagnostic">
        <h2 id="diagnostic" className="font-heading text-2xl font-bold text-forest">
          A deeper look, when you want one
        </h2>
        <p className="mt-2 font-medium text-muted-foreground">
          People Systems Diagnostic and Growth Roadmap
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Some businesses want to go beyond the results review and understand the causes behind their challenges before deciding what to do. Our paid diagnostic is available when you ask for it, and it&apos;s part of how every fractional HR engagement begins. It&apos;s never required for Scalemaker HRis.
        </p>
        <p className="mt-4 font-medium text-muted-foreground">
          What the diagnostic includes
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Depending on your organization&apos;s needs, the diagnostic includes:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {diagnosticIncludes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          You&apos;ll know what needs attention, why it matters, and what to do next.
        </p>
      </section>

      <section className="mt-12 max-w-3xl" aria-labelledby="consulting">
        <h2 id="consulting" className="font-heading text-2xl font-bold text-forest">
          Consulting work, scoped to you
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Consulting is scoped to your organization. It may include:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {consultingWork.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl" aria-labelledby="for-every-client">
        <h2 id="for-every-client" className="font-heading text-2xl font-bold text-forest">
          For every client
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">Law-change awareness notes.</strong> We watch for enacted employment-law changes and send awareness notes for you to review with your own counsel. We review monthly, and our local coverage is targeted to where our clients operate, not every city and county.
          </p>
          <p>
            <strong className="text-foreground">Policy library.</strong> A library of generic federal-baseline policies, used as a starting point and updated when we identify relevant federal changes. These are not a substitute for legal advice; your counsel should review them for your state and situation.
          </p>
          <p>
            Both are for every client, including those who use Scalemaker HRis on its own. They&apos;re starting resources, not legal advice, and we are not your legal counsel.
          </p>
        </div>
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
        body="Begin the assessment → see your results → schedule a results review if you want to talk it through."
      />
    </>
  );
}
