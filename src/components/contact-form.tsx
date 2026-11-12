"use client";

import { useState } from "react";
import { SubmitConsent } from "@/components/submit-consent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_HELP_MAX,
  CONTACT_HELP_PLACEHOLDER,
} from "@/lib/hris-interest";

export function ContactForm({ initialTopic = "" }: { initialTopic?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [help, setHelp] = useState("");
  const initialInterest = initialTopic === "hris-pilot" || initialTopic === "hris" ? "hris" : "";
  const [interest, setInterest] = useState(initialInterest);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Could not send");
      }
      setStatus("sent");
      form.reset();
      setHelp("");
    } catch {
      setStatus("error");
      setError(
        "The message could not be sent. Please email staceykay@scalemakerhr.com directly and we will follow up."
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm leading-relaxed">
        <p className="font-medium text-forest">Thank you. We received your message.</p>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll reply by email. In the meantime, you&apos;re welcome to take the complimentary assessment.
        </p>
        <a
          href="/assessment"
          className="mt-3 inline-flex text-sm font-semibold text-forest underline-offset-4 hover:underline"
        >
          Begin the assessment
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="topic" value={initialTopic} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Company" name="business" />
      <div className="space-y-2">
        <Label htmlFor="interest">
          What are you interested in? <span className="sr-only">(required)</span>
        </Label>
        <RadioGroup
          id="interest"
          name="interest"
          value={interest}
          onValueChange={setInterest}
          required
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="consulting" id="interest-consulting" />
            <Label htmlFor="interest-consulting" className="font-normal cursor-pointer">
              Consulting
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hris" id="interest-hris" />
            <Label htmlFor="interest-hris" className="font-normal cursor-pointer">
              Scalemaker HRis
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="interest-both" />
            <Label htmlFor="interest-both" className="font-normal cursor-pointer">
              Both
            </Label>
          </div>
        </RadioGroup>
        <p className="text-xs text-muted-foreground">
          Not sure yet? Pick the closest. We&apos;ll talk it through.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">What can we help you with?</Label>
        <Textarea
          id="message"
          name="message"
          value={help}
          maxLength={CONTACT_HELP_MAX}
          onChange={(event) => setHelp(event.target.value.slice(0, CONTACT_HELP_MAX))}
          placeholder={CONTACT_HELP_PLACEHOLDER}
          aria-describedby="help-count"
          className="min-h-32"
        />
        <p id="help-count" className="text-xs text-muted-foreground">
          {help.length}/{CONTACT_HELP_MAX}
        </p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="h-11 px-5 font-semibold" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Message"}
      </Button>
      <SubmitConsent />
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required ? <span className="sr-only"> (required)</span> : null}
      </Label>
      <Input id={name} name={name} type={type} required={required} className="h-11" />
    </div>
  );
}
