/**
 * Guide author + reviewer metadata. Drives the visible byline and the Person
 * entries in Article JSON-LD, which Google uses as an E-E-A-T signal.
 *
 * Keep real human data here — not generic "Formulate Team" blurbs — once you
 * have actual named contributors with credentials. Google discounts Article
 * schema with generic Organization authors.
 */

export interface Author {
  /** Stable key used in Guide.author / Guide.reviewer */
  id: string;
  /** Display name, e.g. "Dr. Jane Smith, PhD" */
  name: string;
  /** One-line credential / role, shown under the name in the byline */
  title: string;
  /** Longer bio for the author page (2–4 sentences) */
  bio: string;
  /** Author page slug under /about/ — omit if no page exists yet */
  slug?: string;
  /** Canonical external URL (LinkedIn, ORCID, etc.) for sameAs schema */
  sameAs?: string[];
}

/**
 * Default author applied to any guide that doesn't set `author` explicitly.
 * Google gives stronger E-E-A-T credit to named individuals; swap this for a
 * real named contributor if/when available.
 */
export const DEFAULT_AUTHOR_ID = "formulate-team";

export const authors: Record<string, Author> = {
  "formulate-team": {
    id: "formulate-team",
    name: "Formulate Team",
    title: "Independent supplement research",
    bio: "The Formulate team scores every supplement in our catalog against published clinical evidence. No sponsorships, no affiliate bias — every recommendation is anchored in peer-reviewed research.",
  },
};

export function getAuthor(id: string | undefined): Author {
  return authors[id ?? DEFAULT_AUTHOR_ID] ?? authors[DEFAULT_AUTHOR_ID];
}

export function getReviewer(id: string | undefined): Author | undefined {
  if (!id) return undefined;
  return authors[id];
}
