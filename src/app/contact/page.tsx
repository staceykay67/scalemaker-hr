import type { Metadata } from "next";
import { BookingCta, BookingSoonerNote } from "@/components/booking-cta";
import { ContactDetails } from "@/components/contact-details";
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
        Schedule a 30-minute results review, or send a message if you already
        know what you want to discuss. The fastest way to make that
        conversation useful is to complete the assessment first.
      </p>
      <BookingCta className="mt-6" />
      <BookingSoonerNote className="mt-3 max-w-2xl" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <ContactDetails
          className="space-y-3 text-sm leading-relaxed text-muted-foreground"
          headingClassName="font-medium text-foreground"
          linkClassName="text-forest underline-offset-4 hover:underline"
        />
      </div>
    </div>
      <CtaBand
        title="Prefer to begin with data?"
        body="Take the complimentary assessment, then schedule a 30-minute results review if you want to talk through the scores."
      />
    </>
  );
}
