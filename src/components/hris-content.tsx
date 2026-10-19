import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HRIS_PILOT_CONTACT_PATH } from "@/lib/hris-interest";
import {
  hrisAudience,
  hrisFaqs,
  hrisFeatures,
  hrisFeaturesHeading,
  hrisHero,
  hrisModes,
  hrisOneTeam,
  hrisTwiceAYear,
  hrisWalkthrough,
  type HrisFeature,
} from "@/lib/hris-copy";
import { cn } from "@/lib/utils";

function FeatureList({ features }: { features: HrisFeature[] }) {
  return (
    <ul className="mt-4 space-y-4">
      {features.map((feature) => (
        <li key={feature.title} className="text-base leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{feature.title}</span>
          {` ${feature.body}`}
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

function AssessmentNote({ note }: { note: string }) {
  const [noteBefore, noteAfter] = note.split("free assessment");

  return (
    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
      {noteBefore}
      <Link href="/assessment" className="font-medium text-forest underline-offset-4 hover:underline">
        free assessment
      </Link>
      {noteAfter}
    </p>
  );
}

export function HrisContent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-sage">{hrisHero.eyebrow}</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-forest sm:text-4xl">
          {hrisHero.headline}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{hrisHero.subhead}</p>
        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
          <div>
            <PilotLink />
            <p className="mt-2 text-sm text-muted-foreground">{hrisHero.earlyAccess}</p>
          </div>
          <Link
            href="/assessment"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "inline-flex h-11 px-5 font-semibold"
            )}
          >
            {hrisHero.secondaryCta}
          </Link>
        </div>
      </div>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-twice-a-year">
        <h2 id="hris-twice-a-year" className="font-heading text-2xl font-bold text-forest">
          {hrisTwiceAYear.heading}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
          {hrisTwiceAYear.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-one-team">
        <h2 id="hris-one-team" className="font-heading text-2xl font-bold text-forest">
          {hrisOneTeam.heading}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
          {hrisOneTeam.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-muted-foreground">
          {hrisOneTeam.points.map((point) => (
            <li key={point.title}>
              <span className="font-medium text-foreground">{point.title}</span> {point.body}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-features">
        <h2 id="hris-features" className="font-heading text-2xl font-bold text-forest">
          {hrisFeaturesHeading}
        </h2>
        <FeatureList features={hrisFeatures} />
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-modes">
        <h2 id="hris-modes" className="font-heading text-2xl font-bold text-forest">
          {hrisModes.heading}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
          {hrisModes.modes.map((mode) => (
            <p key={mode.title}>
              <span className="font-medium text-foreground">{mode.title}</span> {mode.body}
            </p>
          ))}
          <p>{hrisModes.closing}</p>
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-audience">
        <h2 id="hris-audience" className="font-heading text-2xl font-bold text-forest">
          {hrisAudience.heading}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
          {hrisAudience.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="hris-walkthrough">
        <h2 id="hris-walkthrough" className="font-heading text-2xl font-bold text-forest">
          {hrisWalkthrough.heading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{hrisWalkthrough.body}</p>
        <div className="mt-6">
          <PilotLink />
          <p className="mt-2 text-sm text-muted-foreground">{hrisWalkthrough.earlyAccess}</p>
        </div>
        <AssessmentNote note={hrisWalkthrough.note} />
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
