import {
  COMPANY_LOCATION,
  COMPANY_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE_TEL,
} from "@/lib/site-contact";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_NAME,
  telephone: CONTACT_PHONE_TEL,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressRegion: COMPANY_LOCATION,
    addressCountry: "US",
  },
};

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationJsonLd),
      }}
    />
  );
}
