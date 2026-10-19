import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBand } from "@/components/cta-band";
import { AUDIENCE_PHRASE, GRADUATE_LINE, ONE_TEAM_BAND, STEADY_PARTNER } from "@/lib/hris-copy";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div>
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-medium tracking-wide text-sage">
            A people-systems and organizational-effectiveness partner
          </p>
          <h1 className="mt-3 max-w-4xl font-heading text-3xl font-bold leading-tight sm:text-5xl">
            Has your organization reached the point where its current approach
            to people and HR is no longer sufficient?
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-snug text-white sm:text-xl">
            {GRADUATE_LINE}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Scalemaker HR helps growing businesses build ethical people systems
            and internal leadership capability so the business, its leaders, and
            its employees can succeed together. Start with a complimentary 5–7
            minute assessment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/assessment"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "inline-flex h-12 px-6 text-base font-semibold"
              )}
            >
              Begin the assessment
            </Link>
            <Link
              href="/approach"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "inline-flex h-12 border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
              )}
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
          The problems we help you see clearly
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          As a business grows, informal people practices start to strain.
          Owners absorb employee issues. Managers inherit HR work they were
          never prepared to do. Policies, records, hiring, and performance
          conversations become inconsistent. We do not begin with a catalog of
          HR tasks. We begin with whether your current approach is still
          enough—and what would actually help next.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Owner overload",
              body: "Too much people work still sits with the owner or one key employee, leaving less time to run and grow the business.",
            },
            {
              title: "Inconsistent practices",
              body: "Hiring, onboarding, performance, and documentation vary by manager or location, which creates frustration and avoidable risk.",
            },
            {
              title: "Growth outpacing systems",
              body: "What worked at a smaller size does not reliably repeat as you add employees, locations, or complexity.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
            Who Scalemaker HR helps
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              We work with {AUDIENCE_PHRASE}. HR often sits with the owner, an
              office manager, or several people at once, and still runs on
              spreadsheets, paper, and memory.
            </p>
            <Card>
              <CardHeader>
                <CardTitle>This is a good fit when</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  <li>HR currently sits with the owner, an office manager, or several people at once.</li>
                  <li>You&apos;re adding employees, locations, or services, and the informal approach is starting to break.</li>
                </ul>
                <p>{STEADY_PARTNER}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="max-w-3xl font-heading text-2xl font-bold text-forest sm:text-3xl">
            {ONE_TEAM_BAND.heading}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {ONE_TEAM_BAND.body}
          </p>
          <Link
            href={ONE_TEAM_BAND.linkHref}
            className="mt-6 inline-flex text-sm font-semibold text-forest underline-offset-4 hover:underline"
          >
            {ONE_TEAM_BAND.linkLabel}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
          Start with the assessment
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          The People &amp; Growth Readiness Assessment is complimentary and takes just 5–7 minutes to complete. Once finished, you&apos;ll receive an overall score, results across six key areas, and recommended next steps. You can also schedule a complimentary 30-minute results review to discuss your findings and explore opportunities for improvement.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Overall Readiness Score",
              body: "Your People & Growth Readiness Score is calculated from your responses to 18 statements across six key areas of your business.",
            },
            {
              title: "Six Key Areas",
              body: "See how your business measures up in six essential areas: foundation and compliance, leadership, hiring and retention, employee relations, HR systems, and growth readiness.",
            },
            {
              title: "Clear Next Steps",
              body: "Receive practical recommendations based on your results, along with an invitation to a complimentary 30-minute review to discuss your findings and opportunities for improvement. No obligation or sales pressure.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </CardContent>
            </Card>
          ))}
        </div>
        <Link
          href="/assessment"
          className={cn(
            buttonVariants(),
            "mt-8 inline-flex h-12 px-6 font-semibold"
          )}
        >
          Begin the assessment
        </Link>
      </section>

      <CtaBand
        title="Building better organizations for what comes next."
        body="Stacey Kay, MHR, SPHR, SHRM-SCP, works with growing businesses to strengthen people systems and leadership capability so the organization can operate and grow with less strain on the owner."
      />
    </div>
  );
}
