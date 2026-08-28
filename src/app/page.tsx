import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div>
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-medium tracking-wide text-sage">
            Scalemaker HR
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-3xl font-bold leading-tight sm:text-5xl">
            Are your people and HR systems ready for what comes next?
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            As a business grows, hiring, onboarding, compliance, leadership,
            performance and retention can begin consuming time that owners and
            managers need for running the business. This complimentary 5–7
            minute assessment shows where your people practices are strong,
            where gaps may be limiting growth, and what kind of HR support may
            be useful next.
          </p>
          <Link
            href="/assessment"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "mt-8 inline-flex h-12 px-6 text-base font-semibold"
            )}
          >
            Begin the assessment
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
          After you finish, you will receive
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "An overall readiness score",
              body: "A People & Growth Readiness Score based on 18 statements across six areas of people practice.",
            },
            {
              title: "Results in six key areas",
              body: "Scores for foundation and compliance, leadership, hiring and retention, employee relations, HR systems, and growth readiness.",
            },
            {
              title: "Recommended next steps",
              body: "Plain-language guidance and a suggested level of support, plus the option to schedule a complimentary 30-minute results review.",
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
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
              For growing businesses that have outgrown informal HR
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Scalemaker HR helps growing businesses build practical, ethical
              people systems, capable leaders, and healthy workplaces. The
              assessment is the first step: it frames the problem. A
              complimentary results review discusses what the scores mean. Paid
              diagnostic work, when it is the right next step, investigates the
              problem and designs the solution.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Who this is for</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Owners, executives, and operations leaders in growing
                organizations—typically around 10 to 150 employees—who need a
                clearer picture of their people systems.
              </p>
              <p>
                It is also useful when HR work currently sits with the owner, an
                office manager, or a divided set of responsibilities and the
                business is about to add people, locations, or complexity.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:px-10">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Building better organizations for what comes next.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Stacey Kay, MHR, SPHR, SHRM-SCP, works with growing businesses to
            strengthen people systems and leadership capability so the
            organization can operate and grow with less strain on the owner.
          </p>
          <Link
            href="/assessment"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "mt-6 inline-flex h-12 px-6 font-semibold"
            )}
          >
            Begin the assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
