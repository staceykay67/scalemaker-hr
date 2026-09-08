import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { CREDENTIALS_LINE } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "Growing businesses deserve great HR long before they are large enough to build a full HR department. Scalemaker HR helps you build the people, processes, technology, and leadership practices you need to scale successfully.",
};

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-medium text-sage">About Scalemaker HR</p>
        <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold text-forest sm:text-4xl">
          {CREDENTIALS_LINE}
        </h1>
        <p className="mt-3 font-heading text-lg font-medium text-forest/80 sm:text-xl">
          Founder, Scalemaker HR
        </p>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            Stacey founded Scalemaker HR around a simple idea: growing
            businesses deserve great HR long before they are large enough to
            build a full HR department.
          </p>
          <p>
            For many growing businesses, HR develops a piece at a time. Payroll
            is in one system, recruiting in another, employee records somewhere
            else, and responsibilities are spread across owners, managers, and
            administrative staff. It works—until growth makes it difficult to
            manage.
          </p>
          <p>
            That’s where we come in. We start with the biggest issues first—so
            help shows up right away, and we only build what you need next.
          </p>
          <p>
            At Scalemaker HR, we help growing businesses build the people,
            processes, technology, and leadership practices they need to scale
            successfully. Our goal isn’t to create dependence on outside
            consultants. We want to leave your organization stronger, your
            managers more capable, your systems more connected, and your
            business prepared for what comes next.
          </p>
        </div>

        <section
          className="mt-12 max-w-3xl"
          aria-labelledby="experience-heading"
        >
          <h2
            id="experience-heading"
            className="font-heading text-2xl font-bold text-forest"
          >
            Experience Behind the Approach
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Stacey brings more than 20 years of senior HR leadership
              experience in growing, multi-site organizations. He has built HR
              functions from the ground up, led People Operations for
              organizations with hundreds of employees, developed HR teams and
              leaders, implemented HR technology, and managed the people
              challenges that come with rapid growth and organizational change.
            </p>
            <p>
              His experience spans the core people practices growing
              organizations actually run—from recruiting and employee relations
              to compliance, leadership development, and HR systems—under
              multi-site and multi-state conditions. He holds a Master of Human
              Resources and the SPHR and SHRM-SCP certifications.
            </p>
            <p className="font-heading text-lg font-semibold text-forest">
              That experience shapes how we work today.
            </p>
            <p>
              Growing businesses rarely need more HR noise. They need practical
              processes, capable managers, and systems that make work easier as
              the company scales.
            </p>
            <p>
              We want your employees to know what’s expected of them, your
              managers equipped to lead them, and your HR systems and processes
              built to support the business as it grows.
            </p>
          </div>
        </section>

        <p className="mt-12 max-w-3xl font-heading text-2xl font-bold text-forest sm:text-3xl">
          Building better organizations for what comes next.
        </p>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Scalemaker HR LLC is an Arizona-based company serving growing
          businesses.
        </p>
      </div>
      <CtaBand
        title="See where you stand."
        body="Start with the complimentary People & Growth Readiness Assessment."
      />
    </>
  );
}
