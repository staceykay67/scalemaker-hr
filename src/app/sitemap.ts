import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/site-sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries().map((entry) => ({
    url: entry.url,
    changeFrequency: "monthly",
    priority: entry.url.endsWith(".com/") || entry.url.endsWith(".com") ? 1 : 0.7,
  }));
}
