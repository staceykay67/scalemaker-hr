"use client";

import dynamic from "next/dynamic";
import { hrisFitScore, shouldRenderHrisTailoredBlock } from "@/lib/hris-fit";
import type { AssessmentRecord } from "@/lib/storage";

const HrisTailoredResults = dynamic(() =>
  import("@/components/hris-tailored-results").then((mod) => mod.HrisTailoredResults)
);

export function HrisTailoredSlot({ record }: { record: AssessmentRecord }) {
  const fit = hrisFitScore(record);
  if (!shouldRenderHrisTailoredBlock(fit)) return null;
  return <HrisTailoredResults fit={fit} />;
}
