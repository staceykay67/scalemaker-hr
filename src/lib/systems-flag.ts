/**
 * "Map your HR tools" stays off until /privacy and /terms are published.
 * Lex is still finalizing those pages. Do not turn this on in production before they are live.
 *
 * To switch it on: set SYSTEMS_MAP_ENABLED=true in the hosting environment and redeploy.
 * Any other value, or leaving it unset, keeps the step hidden and drops systems fields
 * from the lead email.
 */
export function systemsMapEnabled(): boolean {
  const key = "SYSTEMS_MAP_ENABLED";
  return process.env[key] === "true";
}
