import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-forest text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
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
          <p className="font-semibold text-white">Explore</p>
          <p>
            <Link href="/about" className="underline-offset-4 hover:underline">
              About
            </Link>
          </p>
          <p>
            <Link href="/approach" className="underline-offset-4 hover:underline">
              Approach
            </Link>
          </p>
          <p>
            <Link href="/assessment" className="underline-offset-4 hover:underline">
              People &amp; Growth Readiness Assessment
            </Link>
          </p>
          <p>
            <Link href="/contact" className="underline-offset-4 hover:underline">
              Contact
            </Link>
          </p>
        </div>
        <div className="space-y-2 text-sm text-white/85">
          <p className="font-semibold text-white">Scalemaker HR LLC</p>
          <p>Arizona</p>
          <p>
            <a
              href="mailto:staceykay@scalemakerhr.com"
              className="underline-offset-4 hover:underline"
            >
              staceykay@scalemakerhr.com
            </a>
          </p>
          <p>Stacey Kay, MHR, SPHR, SHRM-SCP</p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-6 text-xs leading-relaxed text-white/70 sm:px-6">
          <p>
            Your information and assessment results will be kept confidential
            and will not be sold or shared for unrelated marketing purposes.
          </p>
          <p>
            This website and assessment provide general educational information.
            They are not legal advice, a compliance certification, or a
            substitute for review by qualified legal counsel.
          </p>
        </div>
      </div>
    </footer>
  );
}
