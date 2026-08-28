import type { Metadata } from "next";
import { ResultsView } from "@/components/results-view";

export const metadata: Metadata = {
  title: "Your assessment results",
  description:
    "Your People & Growth Readiness Score, category results, and recommended next steps from Scalemaker HR.",
};

export default function ResultsPage() {
  return <ResultsView />;
}
