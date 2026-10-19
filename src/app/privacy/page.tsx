import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { PRIVACY_POLICY } from "@/lib/legal-copy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: PRIVACY_POLICY.description,
};

export default function PrivacyPage() {
  return <LegalDocument page={PRIVACY_POLICY} />;
}
