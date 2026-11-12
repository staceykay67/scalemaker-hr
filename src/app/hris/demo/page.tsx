import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "See it for yourself",
  description: "See it for yourself. Scalemaker HRis, using a sample company.",
};

// Video URL or file path - update this constant when the recording is ready
const DEMO_VIDEO_URL = "";

export default function HrisDemoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-sage">Scalemaker HRis</p>
      <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold text-forest sm:text-4xl">
        See it for yourself
      </h1>

      {/* Video player region - ready for video, empty for now */}
      <div className="mt-10 max-w-4xl">
        {DEMO_VIDEO_URL ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-secondary/40">
            <video
              src={DEMO_VIDEO_URL}
              controls
              className="h-full w-full"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-secondary/40" />
        )}
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
        <Link
          href="/assessment"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 px-5 font-semibold"
          )}
        >
          Begin the assessment
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center text-sm font-semibold text-forest underline-offset-4 hover:underline"
        >
          Prefer to talk? Contact us
        </Link>
      </div>
    </div>
  );
}
