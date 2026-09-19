/**
 * The reference library for the app's newer shelves, published for search.
 *
 * The web app's Learning section authors it (formulate-web
 * src/data/shelf-library.json and care-actives.json); this repo MIRRORS those
 * two files byte-for-byte, the same way it mirrors catalog.json. Edit them in
 * the web app and copy them here — never here first.
 *
 *   /learn/<slug>             one product TYPE: sauna, red light, mattress,
 *                             blood-pressure monitor, sunscreen, toothpaste…
 *   /care-ingredients/<slug>  one personal-care ACTIVE: zinc oxide,
 *                             niacinamide, retinol, fluoride…
 *
 * What these pages answer is what people search before buying: does it work,
 * how sure is anyone, what should I look for, is it safe for me. No product
 * counts are printed — this repo does not carry the gear catalogues, so a
 * count here would be a number typed once and wrong by the next ingest. The
 * link to the app's shelf carries the live answer.
 */

import shelvesRaw from "@/data/shelf-library.json";
import activesRaw from "@/data/care-actives.json";

export type LibraryPillar = "sleep" | "therapies" | "body" | "fitness" | "personal-care";
export type EvidenceLevel = "strong" | "moderate" | "limited" | "weak" | "none";
export type Verdict = "supported" | "mixed" | "unproven" | "false";

export interface LibraryStudy {
  title: string;
  authors: string;
  year: number;
  journal: string;
  pmid: string;
  doi?: string;
  study_type: string;
  finding_summary: string;
}

export interface ShelfEntry {
  id: string;
  pillar: LibraryPillar;
  name: string;
  summary: string;
  what: string;
  evidence: { level: EvidenceLevel; summary: string };
  claims: { claim: string; verdict: Verdict; note: string }[];
  look_for: string[];
  skip: string[];
  safety?: string[];
  how_to_use?: string[];
  studies: LibraryStudy[];
  related: string[];
  match: { catalog: string; categories?: string[]; subcategories?: string[] }[];
}

export interface ActiveEntry {
  id: string;
  name: string;
  aliases?: string[];
  class: string;
  summary: string;
  what: string;
  evidence: { level: EvidenceLevel; summary: string };
  uses: { use: string; verdict: Verdict; note: string }[];
  typical?: string;
  works_with?: string[];
  avoid_with?: string[];
  safety?: string[];
  studies: LibraryStudy[];
  related: string[];
}

export const shelfEntries = shelvesRaw as unknown as ShelfEntry[];
export const activeEntries = activesRaw as unknown as ActiveEntry[];

/** URL slugs use hyphens; catalogue ids use underscores. */
export const slugOf = (id: string) => id.replace(/_/g, "-");

export function shelfBySlug(slug: string): ShelfEntry | undefined {
  return shelfEntries.find((e) => slugOf(e.id) === slug);
}
export function activeBySlug(slug: string): ActiveEntry | undefined {
  return activeEntries.find((e) => slugOf(e.id) === slug);
}

export const PILLAR_META: Record<LibraryPillar, { label: string; appPath: string }> = {
  sleep: { label: "Sleep", appPath: "/sleep" },
  fitness: { label: "Fitness", appPath: "/fitness" },
  body: { label: "Body", appPath: "/body" },
  therapies: { label: "Therapies", appPath: "/therapies" },
  "personal-care": { label: "Personal care", appPath: "/skin" },
};
export const PILLAR_ORDER: LibraryPillar[] = ["sleep", "fitness", "body", "therapies", "personal-care"];

export const LEVEL_TEXT: Record<EvidenceLevel, string> = {
  strong: "Strong evidence",
  moderate: "Moderate evidence",
  limited: "Limited evidence",
  weak: "Weak evidence",
  none: "No real evidence",
};
export const VERDICT_TEXT: Record<Verdict, string> = {
  supported: "Holds up",
  mixed: "Mixed",
  unproven: "Unproven",
  false: "False",
};

export const ACTIVE_CLASS_LABEL: Record<string, string> = {
  "uv-filter": "Sunscreen filters",
  retinoid: "Retinoids",
  vitamin: "Vitamins",
  exfoliant: "Exfoliating acids",
  antioxidant: "Antioxidants",
  humectant: "Hydrators",
  soothing: "Soothing agents",
  botanical: "Plant extracts",
  protein: "Proteins & peptides",
  fluoride: "Fluorides",
  abrasive: "Cleaning abrasives",
  whitening: "Whitening agents",
  desensitizer: "Sensitivity relief",
  antimicrobial: "Antimicrobials",
  other: "Other actives",
};

/**
 * A page with nothing cited and nothing to say beyond "no evidence either
 * way" (gym bags, duvet covers) is reachable but not submitted — the same
 * rule lib/indexability.ts applies to thin ingredient pages.
 */
export function isThinLibraryEntry(e: { studies: LibraryStudy[]; evidence: { level: EvidenceLevel } }): boolean {
  return e.studies.length === 0 && e.evidence.level === "none";
}

/** The date these pages were last reviewed — bump it when the data is refreshed. */
export const LIBRARY_REVIEWED = "2026-09-18";
