import type { Metadata } from "next";
import Link from "next/link";
import { BookingLink } from "@/components/booking-cta";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBand } from "@/components/cta-band";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Assessment, complimentary results review, and paid diagnostic work—without turning Scalemaker HR into a permanent outsourced HR department.",
};

const steps = [
  {
    title: "1. Assessment",
    body: "The complimentary People & Growth Readiness Assessment identifies strengths, gaps, and the level of HR support that may be useful next. It frames the problem. It does not investigate every detail or design the solution.",
  },
  {
    title: "2. Complimentary results review",
    body: "A 30-minute conversation to review important results, explore sticking points, define desired outcomes, and recommend a next step. There is no obligation to purchase services.",
  },
  {
    title: "3. Paid diagnostic, when it is the right next step",
    body: "The People Systems Diagnostic and Growth Roadmap investigates the problem and designs the solution: interviews, document and workflow review, risk prioritization, a written 90-day roadmap, and an executive findings presentation.",
  },
];

const laterWork = [
  "A defined people-systems foundation project",
  "Manager or internal-HR development",
  "Periodic HR advisory support",
  "Fractional HR leadership",
  "Internal HR hiring and transition support",
];

export default function ApproachPage() {
  return (
    <>
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-sage">How we work</p>
      <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold text-forest sm:text-4xl">
        Identify the problem. Then decide what support, if any, is appropriate.
      </h1>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
        The complimentary results review identifies and frames the problem. The
        paid diagnostic investigates the problem and designs the solution. We
        do not recommend Scalemaker HR in every situation, and we do not begin
        with an exhaustive list of HR tasks.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.title}>
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
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
        </div>
        <Card>
          <CardHeader>
            <CardTitle>The results review agenda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>0–5 minutes: Why you completed the assessment</p>
            <p>5–12 minutes: Review important results</p>
            <p>12–20 minutes: Explore sticking points and consequences</p>
            <p>20–25 minutes: Define desired outcomes</p>
            <p>25–30 minutes: Recommend the next step</p>
            <p className="pt-2">
              Already completed the assessment?{" "}
              <BookingLink className="text-forest underline-offset-4 hover:underline">
                Book a complimentary results review
              </BookingLink>
              .
            </p>
          </CardContent>
        </Card>
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
        body="Complete the assessment, then decide whether a 30-minute results review would be useful."
      />
    </>
  );
}
