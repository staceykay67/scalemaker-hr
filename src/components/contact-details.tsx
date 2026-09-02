import { BookingLink } from "@/components/booking-cta";
import {
  BOOKING_LABEL,
  COMPANY_LOCATION,
  COMPANY_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CREDENTIALS_LINE,
} from "@/lib/site-contact";

export function ContactDetails({
  className,
  headingClassName,
  linkClassName,
}: {
  className?: string;
  headingClassName?: string;
  linkClassName?: string;
}) {
  return (
    <div className={className}>
      <p className={headingClassName}>{COMPANY_NAME}</p>
      <p>{COMPANY_LOCATION}</p>
      <p>
        <a href={`tel:${CONTACT_PHONE_TEL}`} className={linkClassName}>
          {CONTACT_PHONE_DISPLAY}
        </a>
      </p>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`} className={linkClassName}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <p>
        <BookingLink className={linkClassName}>{BOOKING_LABEL}</BookingLink>
      </p>
      <p>{CREDENTIALS_LINE}</p>
    </div>
  );
}
