import type { Metadata } from "next";
import { AssessmentWizard } from "@/components/assessment-wizard";

export const metadata: Metadata = {
  title: "People & Growth Readiness Assessment",
  description:
    "Complete the complimentary Scalemaker HR assessment and receive your readiness score, category results, and recommended next steps.",
};

export default function AssessmentPage() {
  return <AssessmentWizard />;
}
