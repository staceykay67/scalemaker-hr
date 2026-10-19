import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { TERMS_OF_USE } from "@/lib/legal-copy";

export const metadata: Metadata = {
  title: "Terms",
  description: TERMS_OF_USE.description,
};

export default function TermsPage() {
  return <LegalDocument page={TERMS_OF_USE} />;
}
