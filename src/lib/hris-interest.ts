export const HRIS_PILOT_INTEREST = "hris-pilot";
export const HRIS_PILOT_CONTACT_PATH = `/contact?interest=${HRIS_PILOT_INTEREST}`;
export const HRIS_PILOT_CONTACT_MESSAGE =
  "I'm interested in the Scalemaker HRis early-access pilot.";

export const HRIS_INTEREST_LABEL = "I'm interested in the Scalemaker HRis platform";

export const HRIS_INTEREST_HELP =
  "HRis is in an early-access pilot. If you check this, we'll include a short walkthrough on sample data in your results review. Unchecked is fine. It doesn't change your results.";

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
