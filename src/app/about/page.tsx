import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "Scalemaker HR helps growing businesses build practical, ethical people systems, capable leaders, and healthy workplaces.",
};

const values = [
  "Integrity",
  "Shared success",
  "Fairness and respect",
  "Practical solutions",
  "Whole-system thinking",
  "Accountability",
  "Collaboration",
];

export default function AboutPage() {
  return (
    <>
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-sage">About Scalemaker HR</p>
      <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold text-forest sm:text-4xl">
        Practical people systems. Capable leaders. Organizations prepared to
        grow.
      </h1>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
        Scalemaker HR helps growing businesses build ethical people systems and
        internal leadership capability so the business, its leaders, and its
        employees can succeed together. We address the whole system, give
        leaders practical tools, and prepare the organization to manage those
        systems confidently without depending on us indefinitely.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            To help growing businesses build practical, ethical people systems,
            capable leaders, and healthy workplaces that improve organizational
            performance and prepare them to grow.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vision</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            A future in which growing businesses have the people systems and
            leadership capability to succeed, while employees share in that
            success through stable, safe, and rewarding workplaces.
          </CardContent>
        </Card>
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-forest">Values</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {values.map((value) => (
            <li
              key={value}
              className="rounded-xl border bg-white px-4 py-3 text-sm font-medium"
            >
              {value}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <h2 className="font-heading text-2xl font-bold text-forest">
            Stacey Kay, MHR, SPHR, SHRM-SCP
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Stacey founded Scalemaker HR to work with growing organizations
              that have reached the point where informal people practices are
              no longer enough. The work is practical, ethical, and focused on
              leaving the client stronger—not creating permanent dependence.
            </p>
            <p>
              Credentials include a Master of Human Resources and the SPHR and
              SHRM-SCP certifications. Scalemaker HR LLC is an Arizona company.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>How we measure success</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            Scalemaker HR succeeds when it builds effective people systems,
            develops the client’s leaders and internal resources, and leaves
            the organization better prepared to operate and grow.
          </CardContent>
        </Card>
      </section>
    </div>
      <CtaBand
        title="See where you stand."
        body="The complimentary People & Growth Readiness Assessment is the first step. It takes about 5–7 minutes."
      />
    </>
  );
}
