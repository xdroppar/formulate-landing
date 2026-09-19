/**
 * Platform pillars — the domains Formulate scores. Single source of truth for
 * the methodology hub AND the nav dropdown, so launching a new pillar is a
 * one-line flip (`status: "soon"` → `"live"`) plus `method`, the page that
 * explains how it is scored. `method` is required: three pillars went live
 * pointing at /methodology/<slug> pages that were never built, and the
 * methodology hub linked all three to 404s.
 *
 * NOTE: these are the platform DOMAINS (what gets scored), distinct from a
 * single domain's internal scoring factors (e.g. the supplement page's six
 * "pillars": evidence, dose, bioavailability, …).
 */
export type PillarStatus = "live" | "soon";

export type Pillar = {
  slug: string;
  title: string;
  /** Short line for nav + cards. */
  tagline: string;
  icon: string;
  status: PillarStatus;
  /** Where "How we score it" goes. On-site where the site explains it. */
  method: string;
};

export const PILLARS: Pillar[] = [
  {
    slug: "supplements",
    title: "Supplements",
    tagline: "Dose, form, evidence & third-party testing",
    icon: "🔬",
    status: "live",
    method: "/methodology/supplements",
  },
  {
    slug: "foods",
    title: "Foods",
    tagline: "Nutritional quality — not just calories",
    icon: "🥗",
    status: "live",
    method: "/methodology/foods",
  },
  {
    slug: "nutrients",
    title: "Nutrients",
    tagline: "Daily coverage against your targets",
    icon: "🎯",
    status: "live",
    method: "/methodology/nutrients",
  },
  {
    slug: "sleep",
    title: "Sleep",
    tagline: "Quality, consistency & recovery",
    icon: "😴",
    status: "live",
    method: "/sleep",
  },
  {
    slug: "fitness",
    title: "Fitness",
    tagline: "Volume, progression & longevity",
    icon: "💪",
    status: "live",
    method: "https://app.formulate-health.app/fitness/methodology",
  },
  {
    slug: "personal-care",
    title: "Personal Care",
    tagline: "Ingredient safety & efficacy",
    icon: "🧴",
    status: "live",
    method: "/skincare",
  },
];

export const LIVE_PILLARS = PILLARS.filter((p) => p.status === "live");

export function pillarBySlug(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
