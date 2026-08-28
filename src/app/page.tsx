import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBand } from "@/components/cta-band";
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
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
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
              We work with growing businesses—typically around 10 to 150
              employees—whose owners, executives, and operations leaders need a
              clearer picture of their people systems. We also work with
              organizations approaching 200 employees when they need strategic
              HR leadership, organizational-effectiveness support, a defined
              project, or help developing an internal HR resource.
            </p>
            <Card>
              <CardHeader>
                <CardTitle>This is a good fit when</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>HR currently sits with the owner, an office manager, or several people at once.</p>
                <p>You are adding employees, locations, or services and the informal approach is starting to break.</p>
                <p>You want practical systems and capable leaders—not a permanent outsourced HR department.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
          Start with the assessment
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          The People &amp; Growth Readiness Assessment is complimentary. After
          5–7 minutes you receive an overall score, results in six key areas,
          and recommended next steps. You can then schedule a 30-minute results
          review if a conversation would be useful.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Overall readiness score",
              body: "A People & Growth Readiness Score based on 18 statements across six areas of people practice.",
            },
            {
              title: "Six category results",
              body: "Foundation and compliance, leadership, hiring and retention, employee relations, HR systems, and growth readiness.",
            },
            {
              title: "A clear next conversation",
              body: "Recommended next steps and an invitation to a complimentary 30-minute results review. There is no obligation to purchase services.",
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
