import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  body,
  href = "/assessment",
  label = "Begin the assessment",
}: {
  title: string;
  body: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:px-10">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
          {body}
        </p>
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "mt-6 inline-flex h-12 px-6 font-semibold"
          )}
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
