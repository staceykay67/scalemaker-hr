import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact-details";
import { ContactForm } from "@/components/contact-form";
import { CtaBand } from "@/components/cta-band";
import { contactTopicValue } from "@/lib/hris-interest";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Scalemaker HR to discuss assessment results or whether a conversation would be useful.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const params = await searchParams;
  const initialTopic = contactTopicValue(params.topic);

  return (
    <>
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-sage">Contact</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-forest sm:text-4xl">
        Start a conversation
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Have a question about your HR challenges, our services, or Scalemaker HRis? Tell us a little about your business and what you need. We&apos;re happy to start with a conversation.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm key={initialTopic || "blank"} initialTopic={initialTopic} />
        <ContactDetails
          className="space-y-3 text-sm leading-relaxed text-muted-foreground"
          headingClassName="font-medium text-foreground"
          linkClassName="text-forest underline-offset-4 hover:underline"
          showBookingLink={false}
        />
      </div>
    </div>
      <CtaBand
        title="Prefer to begin with data?"
        body="Take the complimentary assessment, then schedule a complimentary 30-minute results review if you want to talk through the scores."
      />
    </>
  );
}
