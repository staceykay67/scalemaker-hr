export const SITE_ORIGIN = "https://www.scalemakerhr.com";

export const PUBLIC_SITEMAP_PATHS = [
  "/",
  "/about",
  "/approach",
  "/hris",
  "/contact",
  "/assessment",
  "/privacy",
  "/terms",
] as const;

export function sitemapEntries(): Array<{ url: string }> {
  return PUBLIC_SITEMAP_PATHS.map((path) => ({
    url: path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`,
  }));
}
