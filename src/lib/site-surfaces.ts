/**
 * Every browsable surface on this site, in one list, with its own size.
 *
 * WHY THIS EXISTS. The console homepage replaced a page that carried a
 * mega-nav and a nineteen-link footer. Losing them was the point — the old
 * page was 8,007px of argument — but it took the site's internal linking with
 * it: the homepage went to eleven unique hrefs while the sitemap still listed
 * 3,114 URLs. Nothing broke and nothing 404s; the largest surfaces simply stop
 * being linked from the page that has the most authority to link them.
 *
 * So the links come back, but as a list that is READ rather than typed. A
 * hand-written footer is a second place for a number to be wrong, and this
 * repo has already paid for that twice: the homepage once claimed two catalog
 * sizes at once (hero "290+", stat bar 260), and the six-factor scoring claim
 * turned out to live in seven places and was "fixed" three times before anyone
 * knew that.
 *
 * COUNTS COME FROM THE SAME MODULES THE PAGES DO. `products` and `foods` are
 * the exact imports /api/score-index serves the hero's search from, so the
 * footer and the pillar chips physically cannot disagree — they are the same
 * array. Everything else counts its own catalog the same way. There is no
 * number in this file.
 *
 * The one deliberate omission is a "supplements scored" CLAIM. That string
 * lives in lib/catalog-size.ts and is rounded down on purpose; this module
 * reports the live length instead, which is what a browse link should say,
 * and the two must not be conflated. See the note in that file.
 */
import { products } from "@/lib/products";
import { foods } from "@/lib/foods";
import { recipes } from "@/lib/recipes";
import { ingredients } from "@/lib/encyclopedia";
import { visibleGuides } from "@/lib/guides";
import { researchEntries } from "@/lib/research";
import { interactions } from "@/lib/interactions";
import { synergies } from "@/lib/synergies";
import { conditions } from "@/lib/conditions";
import { comparisons } from "@/lib/comparisons";
import { stacks } from "@/lib/stacks";
import { CORE_NUTRIENTS } from "@/lib/nutrients";

export type Surface = {
  href: string;
  label: string;
  /** How many things are behind the link. Omitted where a count would mislead
   *  rather than inform — /methodology is one page about a method, not four
   *  browsable items, and a "4" beside it invites a click it cannot repay. */
  count?: number;
};

export type SurfaceGroup = {
  title: string;
  items: Surface[];
};

/** Only products that carry a score are browsable, which is the same filter
 *  /api/score-index applies. Two of the 979 rows in the catalog are retired
 *  shadow rows with a null score and must not be counted as catalog. */
const scoredProducts = products.filter((p) => p.score != null);

export const SURFACE_GROUPS: SurfaceGroup[] = [
  {
    title: "Catalog",
    items: [
      { href: "/supplements", label: "Supplements", count: scoredProducts.length },
      { href: "/foods", label: "Whole foods", count: foods.length },
      { href: "/recipes", label: "Recipes", count: recipes.length },
      { href: "/ingredients", label: "Ingredients", count: ingredients.length },
      { href: "/brands", label: "Brands" },
    ],
  },
  {
    title: "Research",
    items: [
      { href: "/guides", label: "Guides", count: visibleGuides.length },
      { href: "/research", label: "Studies", count: researchEntries.length },
      { href: "/nutrients", label: "Nutrients", count: CORE_NUTRIENTS.length },
      { href: "/interactions", label: "Interactions", count: interactions.length },
      { href: "/synergies", label: "Synergies", count: synergies.length },
    ],
  },
  {
    title: "Decide",
    items: [
      { href: "/compare", label: "Comparisons", count: comparisons.length },
      { href: "/stacks", label: "Starter stacks", count: stacks.length },
      { href: "/conditions", label: "By goal", count: conditions.length },
      { href: "/tools/stack-builder", label: "Stack builder" },
      { href: "/methodology/supplements", label: "How we score" },
    ],
  },
  {
    title: "Formulate",
    items: [
      { href: "/about", label: "About" },
      { href: "/download", label: "iPhone app" },
      { href: "/disclosure", label: "Disclosure" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

/**
 * The four catalogs that go in front of a reader rather than in the footer.
 *
 * These are the ones section 01 is already about — it says "browse the
 * catalog" and then offered a single link to /supplements, so three of the
 * four largest surfaces on the site sat behind a door that named only one of
 * them. Ordered by size, because the point of showing the number is that it
 * is large.
 */
export const CATALOG_DOORS: Surface[] = (
  SURFACE_GROUPS.find((g) => g.title === "Catalog")?.items ?? []
).filter((s) => typeof s.count === "number");
