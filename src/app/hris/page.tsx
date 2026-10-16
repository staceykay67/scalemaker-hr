import type { Metadata } from "next";
import { HrisContent } from "@/components/hris-content";
import { hrisHero } from "@/lib/hris-copy";

export const metadata: Metadata = {
  title: "Scalemaker HRis",
  description: hrisHero.subhead,
};

export default function HrisPage() {
  return <HrisContent />;
}
