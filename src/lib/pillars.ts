/**
 * Platform pillars — the domains Formulate scores. Single source of truth for
 * the methodology hub AND the nav dropdown, so launching a new pillar is a
 * one-line flip (`status: "soon"` → `"live"`) plus its methodology page.
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
};

export const PILLARS: Pillar[] = [
  {
    slug: "supplements",
    title: "Supplements",
    tagline: "Dose, form, evidence & third-party testing",
    icon: "🔬",
    status: "live",
  },
  {
    slug: "foods",
    title: "Foods",
    tagline: "Nutritional quality — not just calories",
    icon: "🥗",
    status: "live",
  },
  {
    slug: "nutrients",
    title: "Nutrients",
    tagline: "Daily coverage against your targets",
    icon: "🎯",
    status: "live",
  },
  {
    slug: "sleep",
    title: "Sleep",
    tagline: "Quality, consistency & recovery",
    icon: "😴",
    status: "soon",
  },
  {
    slug: "fitness",
    title: "Fitness",
    tagline: "Volume, progression & longevity",
    icon: "💪",
    status: "soon",
  },
  {
    slug: "personal-care",
    title: "Personal Care",
    tagline: "Ingredient safety & efficacy",
    icon: "🧴",
    status: "soon",
  },
];

export const LIVE_PILLARS = PILLARS.filter((p) => p.status === "live");

export function pillarBySlug(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
