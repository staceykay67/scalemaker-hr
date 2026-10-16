import Link from "next/link";
import { hrisResultsBlock } from "@/lib/hris-copy";

export function HrisResultsBlock() {
  return (
    <section className="mt-8 rounded-xl border bg-white p-5" aria-labelledby="hris-results">
      <h2 id="hris-results" className="font-heading text-xl font-semibold text-forest">
        {hrisResultsBlock.heading}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {hrisResultsBlock.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-4 text-sm">
        <Link
          href={hrisResultsBlock.linkHref}
          className="font-medium text-forest underline-offset-4 hover:underline"
        >
          {hrisResultsBlock.linkLabel}
        </Link>
      </p>
    </section>
  );
}
