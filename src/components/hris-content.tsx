import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HRIS_PILOT_CONTACT_PATH } from "@/lib/hris-interest";
import {
  hrisAudience,
  hrisAvailableHeading,
  hrisComingFeatures,
  hrisComingHeading,
  hrisFaqs,
  hrisHero,
  hrisHonesty,
  hrisModes,
  hrisPilotFeatures,
  hrisRelationship,
  hrisWhy,
  type HrisFeature,
} from "@/lib/hris-copy";
import { cn } from "@/lib/utils";

function FeatureList({ features }: { features: HrisFeature[] }) {
  return (
    <ul className="mt-4 space-y-4">
      {features.map((feature) => (
        <li key={feature.title} className="text-base leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{feature.title}</span>
          {feature.body ? ` ${feature.body}` : null}
        </li>
      ))}
    </ul>
  );
}

function PilotLink({ className }: { className?: string }) {
  return (
    <Link
      href={HRIS_PILOT_CONTACT_PATH}
      className={cn(buttonVariants(), "inline-flex h-11 px-5 font-semibold", className)}
    >
      {hrisHero.primaryCta}
    </Link>
  );
}

export function HrisContent() {
  const [noteBefore, noteAfter] = hrisHonesty.note.split("free assessment");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-sage">{hrisHero.eyebrow}</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-forest sm:text-4xl">
          {hrisHero.headline}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{hrisHero.subhead}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <PilotLink />
          <Link
            href="/assessment"
            className={cn(buttonVariants({ variant: "outline" }), "inline-flex h-11 px-5 font-semibold")}
          >
            {hrisHero.secondaryCta}
          </Link>
        </div>
      </div>

      <section className="mt-14 max-w-3xl" aria-labelledby="why-hris">
        <h2 id="why-hris" className="font-heading text-2xl font-bold text-forest">
          Why we built it
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
          {hrisWhy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-relationship">
        <h2 id="hris-relationship" className="font-heading text-2xl font-bold text-forest">
          Part of the relationship, not a replacement
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {hrisRelationship.intro}
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-muted-foreground">
          {hrisRelationship.points.map((point) => (
            <li key={point.title}>
              <span className="font-medium text-foreground">{point.title}</span> {point.body}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-modes">
        <h2 id="hris-modes" className="font-heading text-2xl font-bold text-forest">
          Two ways to run it
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
          {hrisModes.map((mode) => (
            <p key={mode.title}>
              <span className="font-medium text-foreground">{mode.title}</span> {mode.body}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-capabilities">
        <h2 id="hris-capabilities" className="font-heading text-2xl font-bold text-forest">
          What it does
        </h2>
        <h3 className="mt-6 font-heading text-lg font-semibold text-forest">{hrisAvailableHeading}</h3>
        <FeatureList features={hrisPilotFeatures} />
        <h3 className="mt-8 font-heading text-lg font-semibold text-forest">{hrisComingHeading}</h3>
        <FeatureList features={hrisComingFeatures} />
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-audience">
        <h2 id="hris-audience" className="font-heading text-2xl font-bold text-forest">
          Who it&apos;s for
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
          {hrisAudience.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-honesty">
        <h2 id="hris-honesty" className="font-heading text-2xl font-bold text-forest">
          Early access, honestly
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{hrisHonesty.intro}</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
          {hrisHonesty.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="mt-6">
          <PilotLink />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {noteBefore}
          <Link href="/assessment" className="font-medium text-forest underline-offset-4 hover:underline">
            free assessment
          </Link>
          {noteAfter}
        </p>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-faq">
        <h2 id="hris-faq" className="font-heading text-2xl font-bold text-forest">
          FAQ
        </h2>
        <div className="mt-4 space-y-6">
          {hrisFaqs.map((item) => (
            <div key={item.question}>
              <h3 className="font-heading text-lg font-semibold text-forest">{item.question}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
