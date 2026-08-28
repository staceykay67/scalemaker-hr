import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-forest text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <Image
            src="/logo-horizontal-dark.png"
            alt="Scalemaker HR"
            width={280}
            height={56}
            className="h-10 w-auto"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            Building better organizations for what comes next.
          </p>
        </div>
        <div className="space-y-2 text-sm text-white/85">
          <p>
            <Link href="/assessment" className="underline-offset-4 hover:underline">
              People &amp; Growth Readiness Assessment
            </Link>
          </p>
          <p>
            <a
              href="mailto:staceykay@scalemakerhr.com"
              className="underline-offset-4 hover:underline"
            >
              staceykay@scalemakerhr.com
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-6 text-xs leading-relaxed text-white/70 sm:px-6">
          <p>
            Your information and assessment results will be kept confidential
            and will not be sold or shared for unrelated marketing purposes.
          </p>
          <p>
            This assessment provides general educational information. It is not
            legal advice, a compliance certification or a substitute for review
            by qualified legal counsel. Results are based solely on the
            information provided and are intended to identify areas that may
            warrant additional evaluation.
          </p>
        </div>
      </div>
    </footer>
  );
}
