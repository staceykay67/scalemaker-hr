import type { AssessmentRecord } from "@/lib/storage";

export type PriorityFields = Pick<
  AssessmentRecord,
  "outcomes" | "outcomeOther" | "timeline"
>;

export function prioritiesFingerprint(record: PriorityFields): string {
  return JSON.stringify({
    outcomes: [...record.outcomes]
      .map((item) => item.trim())
      .filter(Boolean)
      .sort(),
    outcomeOther: record.outcomeOther.trim(),
    timeline: record.timeline.trim(),
  });
}

export function hasPriorities(record: PriorityFields): boolean {
  return (
    record.outcomes.some((item) => item.trim()) ||
    record.outcomeOther.trim().length > 0 ||
    record.timeline.trim().length > 0
  );
}

export function assessmentLeadBody(record: AssessmentRecord) {
  return {
    contact: record.contact,
    profile: record.profile,
    likert: record.likert,
    risks: record.risks,
    impact: record.impact,
    outcomes: record.outcomes,
    outcomeOther: record.outcomeOther,
    timeline: record.timeline,
    completedAt: record.completedAt,
  };
}

export function alreadySentPriorities(record: AssessmentRecord): boolean {
  if (!hasPriorities(record) || !record.prioritiesSubmittedAt) return false;
  return record.prioritiesFingerprint === prioritiesFingerprint(record);
}

export async function postAssessmentLead(
  record: AssessmentRecord
): Promise<{ ok: boolean; status: number; error?: string }> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assessmentLeadBody(record)),
  });
  const data = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;
  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error:
        response.status === 503
          ? "We could not send your priorities just now. Please email staceykay@scalemakerhr.com or use the scheduling link."
          : data?.error ||
            "Your priorities could not be sent. Please try again or email staceykay@scalemakerhr.com.",
    };
  }
  return { ok: true, status: response.status };
}
