import Link from "next/link";
import { hrisResultsBlock } from "@/lib/hris-copy";

export function HrisResultsBlock() {
  return (
    <section className="mt-8 rounded-xl border bg-white p-5" aria-label="Scalemaker HRis">
      <p className="text-sm leading-relaxed text-muted-foreground">{hrisResultsBlock.line}</p>
      <p className="mt-3 text-sm">
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
