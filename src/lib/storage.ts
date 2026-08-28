import type { LikertValue } from "@/lib/assessment-data";

export const PROGRESS_KEY = "smhr-assessment-progress-v1";
export const RESULTS_KEY = "smhr-assessment-results-v1";

export type AssessmentRecord = {
  step: number;
  profile: Record<string, string>;
  likert: Record<string, LikertValue>;
  risks: string[];
  impact: Record<string, string>;
  contact: {
    firstName: string;
    lastName: string;
    businessName: string;
    email: string;
    phone: string;
    issue: string;
    schedule: string;
  };
  outcomes: string[];
  timeline: string;
  completedAt: string | null;
};

export const emptyRecord = (): AssessmentRecord => ({
  step: 0,
  profile: {},
  likert: {},
  risks: [],
  impact: {},
  contact: {
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
    issue: "",
    schedule: "",
  },
  outcomes: [],
  timeline: "",
  completedAt: null,
});

function read(key: string): AssessmentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return { ...emptyRecord(), ...JSON.parse(raw) } as AssessmentRecord;
  } catch {
    return null;
  }
}

export function loadProgress(): AssessmentRecord {
  return read(PROGRESS_KEY) ?? emptyRecord();
}

export function saveProgress(record: AssessmentRecord) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(record));
}

export function clearProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PROGRESS_KEY);
}

export function loadResults(): AssessmentRecord | null {
  return read(RESULTS_KEY);
}

export function saveResults(record: AssessmentRecord) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RESULTS_KEY, JSON.stringify(record));
}

export function clearResults() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(RESULTS_KEY);
}
