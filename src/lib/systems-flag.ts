/**
 * "Map your HR tools" is on for preview and local runs, and off in production.
 *
 * The Vercel CLI in this environment is logged out, so the preview value is
 * the code default: VERCEL_ENV=production is always off, even if
 * SYSTEMS_MAP_ENABLED=true. Preview, development, and unset local runs are on
 * unless SYSTEMS_MAP_ENABLED=false.
 */
export function systemsMapEnabled(): boolean {
  const envKey = "VERCEL_ENV";
  const flagKey = "SYSTEMS_MAP_ENABLED";
  if (process.env[envKey] === "production") return false;
  if (process.env[flagKey] === "false") return false;
  return true;
}
