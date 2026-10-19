export const HRIS_PILOT_TOPIC = "hris-pilot";
export const HRIS_PILOT_TOPIC_LABEL = "HRis pilot";
export const HRIS_PILOT_CONTACT_PATH = `/contact?topic=${HRIS_PILOT_TOPIC}`;

export const HRIS_INTEREST_LABEL =
  "I'm also interested in seeing Scalemaker HRis, your HR platform.";

export const HRIS_INTEREST_HELP =
  "It's now in early access. If you check this, we'll include a short walkthrough on a sample company in your results review. Unchecked is fine. It doesn't change your results.";

export function contactTopicValue(param: string | undefined): string {
  return param === HRIS_PILOT_TOPIC ? HRIS_PILOT_TOPIC : "";
}

export function contactTopicLabel(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (normalized === HRIS_PILOT_TOPIC || normalized === HRIS_PILOT_TOPIC_LABEL) {
    return HRIS_PILOT_TOPIC_LABEL;
  }
  return null;
}

export function readHrisInterest(value: unknown): boolean {
  if (value === true) return true;
  if (typeof value === "number") return value === 1;
  if (typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "yes" || normalized === "1";
}

export function hrisInterestLabel(value: unknown): "Yes" | "No" {
  return readHrisInterest(value) ? "Yes" : "No";
}
