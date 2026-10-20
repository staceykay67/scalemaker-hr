import type { Metadata } from "next";
import { ResultsView } from "@/components/results-view";
import { systemsMapEnabled } from "@/lib/systems-flag";

export const metadata: Metadata = {
  title: "Your assessment results",
  description:
    "Your People & Growth Readiness Score, results in six key areas, and recommended next steps from Scalemaker HR.",
};

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ limited?: string }>;
}) {
  const params = await searchParams;
  return (
    <ResultsView
      rateLimited={params.limited === "1"}
      systemsMapEnabled={systemsMapEnabled()}
    />
  );
}
