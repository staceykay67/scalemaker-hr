import Link from "next/link";
import { ASSESSMENT_RATE_LIMIT_MESSAGE, CONTACT_PATH } from "@/lib/assessment-rate-limit";

export function AssessmentRateLimitNotice({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      role="status"
      className={
        className ??
        "rounded-lg border border-sage/40 bg-white px-4 py-3 text-sm leading-relaxed text-foreground"
      }
    >
      <p>{ASSESSMENT_RATE_LIMIT_MESSAGE}</p>
      <p className="mt-2">
        <Link
          href={CONTACT_PATH}
          className="font-medium text-forest underline-offset-4 hover:underline"
        >
          Contact Stacey
        </Link>{" "}
        instead of sending another assessment.
      </p>
    </div>
  );
}
