import Link from "next/link";
import {
  shouldRenderHrisTailoredBlock,
  tailoredLinesForFit,
  type HrisFitScore,
} from "@/lib/hris-fit";

export function HrisTailoredResults({ fit }: { fit: HrisFitScore | null }) {
  if (!shouldRenderHrisTailoredBlock(fit)) return null;
  const lines = tailoredLinesForFit(fit);

  return (
    <section className="mt-8 rounded-xl border bg-white p-5" aria-labelledby="hris-fit">
      <h2 id="hris-fit" className="font-heading text-xl font-semibold text-forest">
        Your systems may be part of the strain.
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          Some of your answers point to how your people information and processes are handled:
          records, onboarding, or doing things the same way across managers and locations. Fixing
          the process comes first. Once it’s right, it should be easy to keep right.
        </p>
        <p>
          That’s why we built Scalemaker HRis (HRIS), our people platform, set up for you as part
          of the consulting relationship. No HRIS degree needed. It’s in an early-access pilot, and
          we’ll tell you honestly whether it fits your company or whether you don’t need it.
        </p>
      </div>
      {lines.length > 0 && (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-sm">
        <Link href="/hris" className="font-medium text-forest underline-offset-4 hover:underline">
          Learn about HRis
        </Link>
      </p>
    </section>
  );
}
