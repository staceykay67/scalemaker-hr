import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CERT_FOOTNOTE } from "@/lib/hris-copy";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "HR consulting up to fractional HR, the Scalemaker HRis platform, or both. Each works on its own. Start with a complimentary assessment.",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-medium tracking-wide text-sage">
            Services
          </p>
          <h1 className="mt-3 max-w-4xl font-heading text-3xl font-bold leading-tight sm:text-5xl">
            Consulting, Scalemaker HRis, or both.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Choose experienced HR consulting, Scalemaker HRis (HRIS), our HR platform, or the two together. Each one works on its own, and you can add the other later.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/assessment"
              className={cn(
                buttonVariants(),
                "h-12 px-6 font-semibold"
              )}
            >
              Begin the assessment
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "h-12 px-6 font-semibold"
              )}
            >
              Talk with us
            </Link>
          </div>
        </div>
      </section>

      <section id="consulting" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
          Consulting
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Practical HR help from an experienced professional, scoped to what your business needs now. We start with the biggest issues first, so help shows up right away, and we only build what you need next.
        </p>
        <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>Consulting can include:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Periodic HR advisory support.</strong> A steady, experienced voice for the people questions that come up as you run the business.</li>
            <li><strong>A people-systems foundation project.</strong> A defined project to put the core in place, such as policies, records, onboarding, and manager practices.</li>
            <li><strong>Manager and internal-HR development.</strong> Help your managers and the person who wears the HR hat build the skills and confidence to handle more on their own.</li>
            <li><strong>Internal HR hiring and transition support.</strong> When you&apos;re ready for your own HR person, we help you define the role, hire well, and hand off cleanly.</li>
            <li><strong>Fractional HR leadership.</strong> Our most complete level of consulting, described below.</li>
          </ul>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          When you add Scalemaker HR consulting, your HR professional is certified by HRCI or SHRM.*
        </p>

        <div className="mt-10">
          <h3 className="font-heading text-xl font-bold text-forest">
            Fractional HR leadership
          </h3>
          <p className="mt-2 font-medium text-muted-foreground">
            Our top tier of consulting.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Experienced HR leadership on a regular, part-time basis, for businesses that need more than a project but aren&apos;t ready for a full-time HR leader. Your fractional HR leader works alongside you and your managers on priorities, practices, and the people issues that come up along the way. When the time comes, we help you build or hire your own internal HR.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="font-heading text-xl font-bold text-forest">
            A deeper look, when you want one
          </h3>
          <p className="mt-2 font-medium text-muted-foreground">
            People Systems Diagnostic and Growth Roadmap
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A paid, in-depth review of your people systems, available when you ask for one and included as part of starting fractional HR. It&apos;s never required for Scalemaker HRis.
          </p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>Depending on your organization&apos;s needs, it includes:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Interviews with key people</li>
              <li>Review of HR documents, systems, and workflows</li>
              <li>Identification and prioritization of risks and opportunities</li>
              <li>A written 90-day action roadmap</li>
              <li>An executive presentation of findings and recommendations</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="hris" className="border-y bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
            Scalemaker HRis
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Scalemaker HRis (HRIS) is our HR platform for small businesses with up to about 200 employees. It brings records, time, hiring, onboarding, documents and more into one place, set up with you so it fits how your company actually works.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            It&apos;s available on its own. You don&apos;t need our consulting to use it, and no diagnostic is required.
          </p>
          <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <ul className="list-disc space-y-2 pl-5">
              <li><strong>Two file levels.</strong> Lite keeps your roster and day-to-day records without sensitive personal data. Full adds the sensitive details that complete an employee&apos;s file.</li>
              <li><strong>Built for everyone who uses it.</strong> Built for the employee who uses it twice a year, not the administrator who uses it twice a day.</li>
              <li><strong>Works with your payroll.</strong> HRis doesn&apos;t run payroll. CSV payroll exports now, API connections to payroll vendors coming.</li>
              <li><strong>Your data is yours.</strong> Export it anytime.</li>
            </ul>
          </div>
          <Link
            href="/hris"
            className="mt-6 inline-flex text-sm font-semibold text-forest underline-offset-4 hover:underline"
          >
            Learn about Scalemaker HRis
          </Link>
        </div>
      </section>

      <section id="both" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
          Both
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Consulting and Scalemaker HRis together. We help you decide how your company should handle its people work, then set it up in HRis so the same steps repeat as you add people and locations. One relationship, with the practice and the platform built to match.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          You can start with either one and add the other later.
        </p>
      </section>

      <section className="border-y bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
            For every client
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Whichever option you choose (consulting, Scalemaker HRis, or both), you also receive these two starting resources.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Law-change awareness notes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                We watch for enacted employment-law changes and send awareness notes for you to review with your own counsel. We review changes monthly, so these notes aren&apos;t real-time, and our local coverage is targeted to where our clients operate rather than every city and county. Each note is a starting point that helps you notice a change and take it to your counsel. It&apos;s never a substitute for counsel, and we are not your legal counsel.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Policy library</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                A library of generic federal-baseline policies, used as a starting point and updated when we identify relevant federal changes. These are not a substitute for legal advice; your counsel should review them for your state and situation.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
          How to get started
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p><strong>1. Take the complimentary assessment.</strong> About 5–7 minutes. You&apos;ll see your results on screen and receive a copy by email.</p>
          <p><strong>2. Schedule a complimentary 30-minute results review.</strong> We&apos;ll talk through your results and whether consulting, Scalemaker HRis, or both makes sense. No obligation.</p>
          <p><strong>3. Choose what fits.</strong> We put the scope in writing before any work begins.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/assessment"
            className={cn(
              buttonVariants(),
              "h-12 px-6 font-semibold"
            )}
          >
            Begin the assessment
          </Link>
          <Link
            href="/contact"
            className="inline-flex text-sm font-semibold text-forest underline-offset-4 hover:underline items-center"
          >
            Prefer to just talk? Contact us
          </Link>
        </div>
      </section>

      <section className="border-t bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-forest sm:text-3xl">
            FAQ
          </h2>
          <div className="mt-8 space-y-6">
            <div>
              <p className="font-semibold text-forest">Can I use Scalemaker HRis without consulting?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Yes. Scalemaker HRis is available on its own, and consulting is available without the platform. You can start with one and add the other later.
              </p>
            </div>
            <div>
              <p className="font-semibold text-forest">Do I need the diagnostic?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                No. The People Systems Diagnostic is available whenever you ask for it, and it&apos;s part of how fractional HR begins. It&apos;s never required for Scalemaker HRis.
              </p>
            </div>
            <div>
              <p className="font-semibold text-forest">Are you our lawyers?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                No. We&apos;re HR consultants, not a law firm, and we are not your legal counsel. Our law-change notes and policy library are starting points to review with your own counsel.
              </p>
            </div>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            *{CERT_FOOTNOTE}
          </p>
        </div>
      </section>
    </div>
  );
}
