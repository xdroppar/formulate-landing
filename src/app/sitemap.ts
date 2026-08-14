import { indexableLocales, DEFAULT_LOCALE } from "@/lib/i18n/locales";
import type { MetadataRoute } from "next";
import { visibleGuides, getAllTags } from "@/lib/guides";
import { interactions, substances } from "@/lib/interactions";
import { products, brands, bestCategories } from "@/lib/products";
import { ingredients } from "@/lib/encyclopedia";
import { comparisons, comparisonSlug } from "@/lib/comparisons";
import { stacks } from "@/lib/stacks";
import { conditions } from "@/lib/conditions";
import { brandComparisons, brandComparisonSlug } from "@/lib/brand-comparisons";
import { synergies, synergySlug } from "@/lib/synergies";
import { researchEntries } from "@/lib/research";
import { CORE_NUTRIENTS } from "@/lib/nutrients";
import { foods, bestFoodGroups } from "@/lib/foods";
import { recipes, recipeDietTags, recipeCategories } from "@/lib/recipes";

/**
 * Localised homepages, included ONLY once a locale's copy is actually
 * translated (`indexable: true` in lib/i18n/locales.ts).
 *
 * Today this contributes nothing: every non-English locale is still
 * `indexable: false`, so the array is empty and the sitemap is byte-identical
 * to before. It exists so that flipping a locale live cannot silently forget
 * the sitemap -- submitting a page you have marked noindex, or omitting one
 * you have marked indexable, are both ways to teach the crawler the wrong
 * thing about the site.
 */
function localeEntries(baseUrl: string, now: Date): MetadataRoute.Sitemap {
  return indexableLocales()
    .filter((l) => l.code !== DEFAULT_LOCALE)
    .map((l) => ({
      url: `${baseUrl}/${l.code}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
}

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
      // Tag pages change only when a new tagged guide ships — monthly is
      // honest. Previously "weekly" was misleading.
      changeFrequency: "monthly" as const,
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

  const bestCategoryEntries: MetadataRoute.Sitemap = bestCategories().map((c) => ({
    url: `${baseUrl}/supplements/best/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    // High commercial intent ("best magnesium supplement") + genuine ranked
    // content. Same priority tier as the supplement detail pages.
    priority: 0.8,
  }));

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
      // Brand hub pages carry the 5-component score breakdown + standout
      // badge + product grid. High-intent commercial content.
      priority: 0.8,
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
      // A/B grade pages are anchor content with full mechanism + dose +
      // products-containing-X. C/D grade pages are still indexable but
      // are less authoritative anchors and get deprioritized.
      priority:
        i.evidence_grade === "A"
          ? 0.8
          : i.evidence_grade === "B"
            ? 0.75
            : i.evidence_grade === "C"
              ? 0.6
              : 0.5,
    })),
  ];

  const foodEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/foods`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...foods.map((f) => ({
      url: `${baseUrl}/foods/${f.base_id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      // Whole-food detail pages carry nutrition + mechanism-level benefits +
      // score breakdown — high-volume informational search ("X nutrition/benefits").
      priority: 0.75,
    })),
    // "Healthiest <group>" ranked collections — high commercial/info intent.
    ...bestFoodGroups().map((g) => ({
      url: `${baseUrl}/foods/best/${g.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const recipeEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/recipes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...recipes.map((r) => ({
      url: `${baseUrl}/recipes/${r.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      // Recipe detail pages carry full ingredients + method + nutrition + a
      // schema.org/Recipe block (eligible for recipe rich results).
      priority: 0.75,
    })),
    // Diet collections ("high-protein recipes", "vegan recipes", …) — top-tier
    // search volume + genuine ranked content.
    ...recipeDietTags().map((d) => ({
      url: `${baseUrl}/recipes/diet/${d.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    // Category collections. These are the pages that make the recipe long tail
    // reachable: /recipes caps each category at 24 cards, so without these 575
    // of 719 recipes were in this sitemap and linked from nowhere on the site.
    ...recipeCategories().map((c) => ({
      url: `${baseUrl}/recipes/category/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
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

  const conditionEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/conditions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...conditions.map((c) => ({
      url: `${baseUrl}/conditions/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const brandCompareEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/brand-compare`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...brandComparisons.map((c) => ({
      url: `${baseUrl}/brand-compare/${brandComparisonSlug(c)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  const synergyEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/synergies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...synergies.map((s) => ({
      url: `${baseUrl}/synergies/${synergySlug(s)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const nutrientEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/nutrients`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...CORE_NUTRIENTS.map((n) => ({
      url: `${baseUrl}/nutrients/${n.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const researchEntriesSitemap: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/research`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...researchEntries.map((r) => ({
      url: `${baseUrl}/research/${r.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    ...localeEntries(baseUrl, now),
    { url: `${baseUrl}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/methodology/supplements`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/methodology/foods`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/methodology/nutrients`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // /app is the mobile download page, /download is the desktop waitlist —
    // two different products, both indexed. /app carries the higher priority
    // because it is the one with a shipping store listing behind it.
    { url: `${baseUrl}/app`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/download`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/interactions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...productEntries,
    ...bestCategoryEntries,
    ...foodEntries,
    ...recipeEntries,
    ...brandEntries,
    ...ingredientEntries,
    ...compareEntries,
    ...stackEntries,
    ...conditionEntries,
    ...brandCompareEntries,
    ...synergyEntries,
    ...nutrientEntries,
    ...researchEntriesSitemap,
    {
      url: `${baseUrl}/tools/dose-calculator`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/tools/stack-builder`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    ...pairEntries,
    ...guideEntries,
    { url: `${baseUrl}/disclosure`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
