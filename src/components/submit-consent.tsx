import Link from "next/link";

export function SubmitConsent() {
  return (
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
      By submitting, you agree to our{" "}
      <Link href="/privacy" className="text-forest underline underline-offset-4">
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link href="/terms" className="text-forest underline underline-offset-4">
        Terms
      </Link>
      . Please don&apos;t include employee personal information.
    </p>
  );
}
