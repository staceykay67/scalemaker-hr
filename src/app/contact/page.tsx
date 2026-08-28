import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Scalemaker HR to discuss assessment results or whether a conversation would be useful.",
};

export default function ContactPage() {
  return (
    <>
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-sage">Contact</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-forest sm:text-4xl">
        Start a conversation
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        The fastest way to get a useful conversation is to complete the
        assessment first. If you already know what you want to discuss, send a
        message below.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p className="font-medium text-foreground">Scalemaker HR LLC</p>
          <p>Arizona</p>
          <p>
            <a
              className="text-forest underline-offset-4 hover:underline"
              href="mailto:staceykay@scalemakerhr.com"
            >
              staceykay@scalemakerhr.com
            </a>
          </p>
          <p>Stacey Kay, MHR, SPHR, SHRM-SCP</p>
        </div>
      </div>
    </div>
      <CtaBand
        title="Prefer to begin with data?"
        body="Take the complimentary assessment, then schedule a 30-minute results review if you want to talk through the scores."
      />
    </>
  );
}
