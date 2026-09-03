import { BookingLink } from "@/components/booking-cta";
import {
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
  showBookingLink = true,
}: {
  className?: string;
  headingClassName?: string;
  linkClassName?: string;
  showBookingLink?: boolean;
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
      {showBookingLink ? (
        <p>
          <BookingLink className={linkClassName} />
        </p>
      ) : null}
      <p>{CREDENTIALS_LINE}</p>
    </div>
  );
}
