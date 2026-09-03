import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  BOOKING_LABEL,
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/site-contact";
import { cn } from "@/lib/utils";

export function BookingCta({
  children = BOOKING_LABEL,
  className,
  onClick,
}: {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants(),
        "inline-flex h-auto min-h-11 whitespace-normal px-5 py-2.5 text-center font-semibold",
        className
      )}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export function BookingLink({
  children = BOOKING_LABEL,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export function BookingSoonerNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm leading-relaxed text-muted-foreground", className)}>
      Need sooner than 48 hours? Email{" "}
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="text-forest underline-offset-4 hover:underline"
      >
        {CONTACT_EMAIL}
      </a>{" "}
      or call{" "}
      <a
        href={`tel:${CONTACT_PHONE_TEL}`}
        className="text-forest underline-offset-4 hover:underline"
      >
        {CONTACT_PHONE_DISPLAY}
      </a>
      .
    </p>
  );
}
