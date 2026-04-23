import type { MetadataRoute } from "next";
import { visibleGuides, getAllTags } from "@/lib/guides";
import { interactions, substances } from "@/lib/interactions";
import { products, brands } from "@/lib/products";
import { ingredients } from "@/lib/encyclopedia";
import { comparisons, comparisonSlug } from "@/lib/comparisons";
import { stacks } from "@/lib/stacks";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://formulate-health.app";
  const now = new Date();

  const guideEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...visibleGuides.map((g) => ({
      url: `${baseUrl}/guides/${g.slug}`,
      lastModified: new Date(g.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getAllTags().map(({ slug }) => ({
      url: `${baseUrl}/guides/tag/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  const pairEntries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();
  for (const i of interactions) {
    const sa = substances.find(
      (s) => s.canonical.toLowerCase() === i.substance_a.toLowerCase(),
    );
    const sb = substances.find(
      (s) => s.canonical.toLowerCase() === i.substance_b.toLowerCase(),
    );
    if (!sa || !sb) continue;
    const [first, second] = [sa.slug, sb.slug].sort();
    const key = `${first}-and-${second}`;
    if (seen.has(key)) continue;
    seen.add(key);
    pairEntries.push({
      url: `${baseUrl}/interactions/${key}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  const productEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/supplements`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...products.map((p) => ({
      url: `${baseUrl}/supplements/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const brandEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/brands`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...brands.map((b) => ({
      url: `${baseUrl}/brands/${b.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const ingredientEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/ingredients`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...ingredients.map((i) => ({
      url: `${baseUrl}/ingredients/${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: i.evidence_grade === "A" || i.evidence_grade === "B" ? 0.7 : 0.5,
    })),
  ];

  const compareEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/compare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...comparisons.map((c) => ({
      url: `${baseUrl}/compare/${comparisonSlug(c)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  const stackEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/stacks`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...stacks.map((s) => ({
      url: `${baseUrl}/stacks/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/download`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/interactions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...productEntries,
    ...brandEntries,
    ...ingredientEntries,
    ...compareEntries,
    ...stackEntries,
    ...pairEntries,
    ...guideEntries,
    { url: `${baseUrl}/disclosure`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
