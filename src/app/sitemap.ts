import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://formulate-health.app";
  const now = new Date();

  const guideEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...guides.map((g) => ({
      url: `${baseUrl}/guides/${g.slug}`,
      lastModified: new Date(g.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/download`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...guideEntries,
    { url: `${baseUrl}/disclosure`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
