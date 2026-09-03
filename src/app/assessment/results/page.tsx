import type { Metadata } from "next";
import { ResultsView } from "@/components/results-view";

export const metadata: Metadata = {
  title: "Your assessment results",
  description:
    "Your People & Growth Readiness Score, category results, and recommended next steps from Scalemaker HR.",
};

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ limited?: string }>;
}) {
  const params = await searchParams;
  return <ResultsView rateLimited={params.limited === "1"} />;
}
