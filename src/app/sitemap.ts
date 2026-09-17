import { indexableLocales, DEFAULT_LOCALE } from "@/lib/i18n/locales";
import type { MetadataRoute } from "next";
import { visibleGuides, getAllTags, getGuidesByTagSlug } from "@/lib/guides";
import { interactions, substances } from "@/lib/interactions";
import { products, brands, bestCategories, canonicalSlugFor } from "@/lib/products";
import { ingredients } from "@/lib/encyclopedia";
import { comparisons, comparisonSlug } from "@/lib/comparisons";
import { stacks } from "@/lib/stacks";
import { conditions } from "@/lib/conditions";
import { brandComparisons, brandComparisonSlug } from "@/lib/brand-comparisons";
import { synergies, synergySlug } from "@/lib/synergies";
import { researchEntries } from "@/lib/research";
import { CORE_NUTRIENTS } from "@/lib/nutrients";
import { foods, bestFoodGroups } from "@/lib/foods";
import { recipeDietTags, recipeCategories } from "@/lib/recipes";
import { skinTypes, skinBrands } from "@/lib/skincare";
import { goalPages, goalEvidenceSource } from "@/lib/goals";
import { isIndexableTag, isThinIngredient, isThinSupplement } from "@/lib/indexability";
import catalogData from "@/data/catalog.json";
import foodsCatalog from "@/data/whole-foods-catalog.json";

/**
 * lastModified is a claim, so it is only made where it is true.
 *
 * Every entry used to carry `now`, which told Google that all 3,114 pages
 * changed on every deploy. Google uses lastmod only when it is "consistently
 * and verifiably accurate", so a sitemap that always says "today" gets its dates
 * ignored for the whole site. Pages built from a dated export carry that
 * export's date; guides carry their own; everything else carries no date rather
 * than a false one.
 */
const CATALOG_DATE = new Date((catalogData as { exported_at: string }).exported_at);
const FOODS_DATE = new Date((foodsCatalog as { version: string }).version);
const GOAL_EVIDENCE_DATE = new Date(goalEvidenceSource.generated_at);

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
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
}

function latestGuideDate(list: { updatedAt: string }[]): Date | undefined {
  const times = list.map((g) => new Date(g.updatedAt).getTime()).filter((t) => !Number.isNaN(t));
  return times.length ? new Date(Math.max(...times)) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://formulate-health.app";
  const now = new Date();

  const guideEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/guides`, lastModified: latestGuideDate(visibleGuides), changeFrequency: "weekly", priority: 0.9 },
    ...visibleGuides.map((g) => ({
      url: `${baseUrl}/guides/${g.slug}`,
      lastModified: new Date(g.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Only tags with enough guides to be more than a copy of them. Counted with
    // the same lookup the tag page renders from, so the sitemap and the page's
    // robots meta cannot disagree (two spellings of a tag share one page).
    ...Array.from(new Set(getAllTags().map(({ slug }) => slug)))
      .map((slug) => ({ slug, guides: getGuidesByTagSlug(slug)?.guides ?? [] }))
      .filter(({ guides }) => isIndexableTag(guides.length))
      .map(({ slug, guides }) => ({
      url: `${baseUrl}/guides/tag/${slug}`,
      lastModified: latestGuideDate(guides),
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
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  const productEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/supplements`,
      lastModified: CATALOG_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // A page that declares another page canonical must not also be advertised
    // here: the sitemap would keep asking for indexing of a URL the page itself
    // disclaims. Ten products are in the catalog twice (see canonicalSlugFor);
    // only the real record is listed.
    ...products
      .filter((p) => canonicalSlugFor(p.slug) === p.slug && !isThinSupplement(p))
      .map((p) => ({
      url: `${baseUrl}/supplements/${p.slug}`,
      lastModified: CATALOG_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const bestCategoryEntries: MetadataRoute.Sitemap = bestCategories().map((c) => ({
    url: `${baseUrl}/supplements/best/${c.slug}`,
    lastModified: CATALOG_DATE,
    changeFrequency: "weekly" as const,
    // High commercial intent ("best magnesium supplement") + genuine ranked
    // content. Same priority tier as the supplement detail pages.
    priority: 0.8,
  }));

  const brandEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/brands`,
      lastModified: CATALOG_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...brands.map((b) => ({
      url: `${baseUrl}/brands/${b.slug}`,
      lastModified: CATALOG_DATE,
      changeFrequency: "monthly" as const,
      // Brand hub pages carry the 5-component score breakdown + standout
      // badge + product grid. High-intent commercial content.
      priority: 0.8,
    })),
  ];

  const ingredientEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/ingredients`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...ingredients.filter((i) => !isThinIngredient(i)).map((i) => ({
      url: `${baseUrl}/ingredients/${i.slug}`,
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
      lastModified: FOODS_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...foods.map((f) => ({
      url: `${baseUrl}/foods/${f.base_id}`,
      lastModified: FOODS_DATE,
      changeFrequency: "monthly" as const,
      // Whole-food detail pages carry nutrition + mechanism-level benefits +
      // score breakdown — high-volume informational search ("X nutrition/benefits").
      priority: 0.75,
    })),
    // "Healthiest <group>" ranked collections — high commercial/info intent.
    ...bestFoodGroups().map((g) => ({
      url: `${baseUrl}/foods/best/${g.slug}`,
      lastModified: FOODS_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const recipeEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/recipes`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Recipe DETAIL pages are deliberately absent.
    //
    // They were submitted for months and earned nothing: 739 recipe URLs, 14
    // page views in 30 days (0.2% of all views) and ZERO entry sessions in 90.
    // Measured against the rest of the site they are also the thinnest and the
    // most repetitive -- ~430 words each at 67% pairwise text similarity, where
    // ingredient pages run 574-809 words at 43%.
    //
    // That is the exact profile behind Search Console's "Discovered - currently
    // not indexed", which stands at 1,611 URLs and is rising while the indexed
    // count falls (1,541 -> 1,519). Crawl budget is allocated per SITE, so 719
    // near-duplicates do not merely fail to rank: they teach Google the domain
    // is not worth crawling deeply, and suppress the ingredient and food pages
    // that carry 22.9% and 5.5% of real views.
    //
    // The collections below stay -- they aggregate rather than repeat, and
    // "high-protein recipes" is a real query. The detail pages remain reachable
    // and indexable through them; they are simply no longer submitted.
    //
    // Reversible on purpose: restore this map if the pages are ever given
    // enough distinct content to earn a place.
    // Diet collections ("high-protein recipes", "vegan recipes", …) — top-tier
    // search volume + genuine ranked content.
    ...recipeDietTags().map((d) => ({
      url: `${baseUrl}/recipes/diet/${d.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    // Category collections. These are the pages that make the recipe long tail
    // reachable: /recipes caps each category at 24 cards, so without these 575
    // of 719 recipes were in this sitemap and linked from nowhere on the site.
    ...recipeCategories().map((c) => ({
      url: `${baseUrl}/recipes/category/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  // Skincare: ranked types and brands, each built only when 5+ scored products
  // back it (lib/skincare.ts). No lastModified: the skin export's own date
  // predates its last rescore, so it would be a false claim.
  const skincareEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/skincare`, changeFrequency: "weekly", priority: 0.85 },
    ...skinTypes.map((t) => ({
      url: `${baseUrl}/skincare/best/${t.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...skinBrands.map((b) => ({
      url: `${baseUrl}/skincare/brands/${b.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
  // Goal pages exist only where 5+ ingredients have a reviewed benefit
  // (lib/goals.ts). Dated by the evidence export they are built from.
  const goalEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/supplements/for`, changeFrequency: "monthly", priority: 0.85 },
    ...goalPages.map((g) => ({
      url: `${baseUrl}/supplements/for/${g.slug}`,
      lastModified: GOAL_EVIDENCE_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
  const compareEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/compare`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...comparisons.map((c) => ({
      url: `${baseUrl}/compare/${comparisonSlug(c)}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  const stackEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/stacks`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...stacks.map((s) => ({
      url: `${baseUrl}/stacks/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const conditionEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/conditions`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...conditions.map((c) => ({
      url: `${baseUrl}/conditions/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const brandCompareEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/brand-compare`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...brandComparisons.map((c) => ({
      url: `${baseUrl}/brand-compare/${brandComparisonSlug(c)}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  const synergyEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/synergies`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...synergies.map((s) => ({
      url: `${baseUrl}/synergies/${synergySlug(s)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const nutrientEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/nutrients`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...CORE_NUTRIENTS.map((n) => ({
      url: `${baseUrl}/nutrients/${n.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const researchEntriesSitemap: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/research`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...researchEntries.map((r) => ({
      url: `${baseUrl}/research/${r.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1.0 },
    ...localeEntries(baseUrl, now),
    { url: `${baseUrl}/methodology`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/methodology/supplements`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/methodology/foods`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/methodology/nutrients`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    // /app is the mobile download page, /download is the desktop waitlist —
    // two different products, both indexed. /app carries the higher priority
    // because it is the one with a shipping store listing behind it.
    { url: `${baseUrl}/app`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/download`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/interactions`, changeFrequency: "weekly", priority: 0.9 },
    ...productEntries,
    ...bestCategoryEntries,
    ...foodEntries,
    ...skincareEntries,
    ...goalEntries,
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
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/tools/stack-builder`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    ...pairEntries,
    ...guideEntries,
    { url: `${baseUrl}/disclosure`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
