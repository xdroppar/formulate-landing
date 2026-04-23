/**
 * Research / studies infrastructure.
 *
 * Takes the existing `studies` registry from guide-evidence.ts (indexed by
 * study ID) and builds:
 *   - slug-based lookup for /research/[slug] pages
 *   - reverse index (study → guides that cite it) via build-time scan of
 *     guide content files for `studiesId=` / `studiesIds=` references
 *
 * Each cited study becomes an indexable page — this expands the site's
 * primary-source authority (EEAT) without the research-brief overhead of
 * per-interaction-pair enrichment.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { studies, type Study } from "@/lib/guide-evidence";
import { visibleGuides, type Guide } from "@/lib/guides";

/** Extract a kebab-case slug from a study key. Registry keys already are
 *  kebab-case (e.g. "ashwagandha-cortisol-2012"), just normalize. */
function toSlug(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
}

export type StudyWithSlug = Study & {
  id: string;
  slug: string;
};

export const researchEntries: StudyWithSlug[] = Object.entries(studies).map(
  ([id, study]) => ({
    ...study,
    id,
    slug: toSlug(id),
  }),
);

// Sort by year descending so index leads with recent.
researchEntries.sort((a, b) => b.year - a.year);

const bySlug = new Map(researchEntries.map((r) => [r.slug, r]));

export function researchBySlug(slug: string): StudyWithSlug | undefined {
  return bySlug.get(slug);
}

/** Scan guide content .tsx files once and build study → guides reverse map.
 *  Runs at module load (server-only). Cached in module scope. */
const STUDIES_ID_RE = /studiesId=["']([^"']+)["']/g;
const STUDIES_IDS_RE = /studiesIds=\{\s*\[([^\]]+)\]\s*\}/g;

let _reverseCache: Map<string, Guide[]> | null = null;

export function guidesCitingStudy(studyId: string): Guide[] {
  if (_reverseCache === null) {
    _reverseCache = new Map();
    try {
      const contentDir = join(
        process.cwd(),
        "src",
        "app",
        "guides",
        "[slug]",
        "content",
      );
      const files = readdirSync(contentDir).filter((f) => f.endsWith(".tsx"));
      const guidesBySlug = new Map(visibleGuides.map((g) => [g.slug, g]));
      for (const file of files) {
        const slug = file.replace(/\.tsx$/, "");
        const guide = guidesBySlug.get(slug);
        if (!guide) continue;
        const content = readFileSync(join(contentDir, file), "utf-8");
        const ids = new Set<string>();
        let m: RegExpExecArray | null;
        // Reset regex lastIndex to be safe across calls
        STUDIES_ID_RE.lastIndex = 0;
        while ((m = STUDIES_ID_RE.exec(content)) !== null) {
          ids.add(m[1]);
        }
        STUDIES_IDS_RE.lastIndex = 0;
        while ((m = STUDIES_IDS_RE.exec(content)) !== null) {
          // m[1] is a comma-separated list of quoted ids
          const parts = m[1].matchAll(/["']([^"']+)["']/g);
          for (const p of parts) ids.add(p[1]);
        }
        for (const id of ids) {
          const arr = _reverseCache.get(id) ?? [];
          arr.push(guide);
          _reverseCache.set(id, arr);
        }
      }
    } catch {
      // fs unavailable (client bundle) — fall through to empty cache
    }
  }
  return _reverseCache.get(studyId) ?? [];
}

/** Group studies by rough topic cluster using keyword matching on title.
 *  Used for the index page grouping. */
export function studiesByTopic(): { topic: string; items: StudyWithSlug[] }[] {
  const buckets: Record<string, StudyWithSlug[]> = {};
  const rules: [string, RegExp][] = [
    ["Ashwagandha & Adaptogens", /ashwagandha|rhodiola|schisandra|tulsi|eleuthero|ginseng/i],
    ["Creatine", /creatine/i],
    ["Omega-3 & Fish Oil", /omega|fish oil|\bepa\b|\bdha\b|n-3|fatty acid/i],
    ["Vitamin D & K", /vitamin d|cholecalciferol|vitamin k|menaquinone/i],
    ["Vitamin B-complex & Folate", /vitamin b|\bfolate\b|folic acid|methylfolate|methylation/i],
    ["Magnesium", /magnesium/i],
    ["Zinc & Minerals", /zinc|copper|iron|selenium/i],
    ["Curcumin / Turmeric", /curcumin|turmeric/i],
    ["Berberine & Metabolic", /berberine|metformin|ampk|insulin/i],
    ["Probiotics & Gut", /probiotic|lactobacillus|bifidobacter|gut|ibs/i],
    ["Nootropics", /lion's mane|hericium|bacopa|theanine|piracet|citicoline|alpha-gpc|nmn|resveratrol/i],
    ["Collagen & Connective Tissue", /collagen|hydrolyzed|tendon/i],
    ["Melatonin & Sleep", /melatonin|sleep|insomnia/i],
    ["Joint & Inflammation", /boswellia|glucosamine|chondroitin|osteoarthritis|arthritis/i],
    ["Interactions & Safety", /interaction|warfarin|st\.? john'?s wort|maoi|ssri|hypericum/i],
  ];
  const OTHER = "Other";
  for (const s of researchEntries) {
    const haystack = `${s.title} ${s.journal}`;
    let placed = false;
    for (const [topic, re] of rules) {
      if (re.test(haystack)) {
        (buckets[topic] ??= []).push(s);
        placed = true;
        break;
      }
    }
    if (!placed) (buckets[OTHER] ??= []).push(s);
  }
  return Object.entries(buckets)
    .map(([topic, items]) => ({
      topic,
      items: items.sort((a, b) => b.year - a.year),
    }))
    .sort((a, b) => b.items.length - a.items.length);
}

/** Simple kebab-case slug for a topic label (used nowhere yet but kept
 *  available for future filtering). */
export function topicSlug(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Find studies that mention a given ingredient by name or alias. Matches
 *  against study title + journal + summary via word-boundary regex, so
 *  "zinc" matches "Zinc Picolinate" but not "ashwagandha" (previous sloppy
 *  matcher would hit "dha" inside "ashwagandha" — we had that bug on the
 *  ingredient-products match earlier this session and solved it the same
 *  way; applying the pattern here.) */
export function studiesForIngredient(
  name: string,
  aliases: string[] = [],
  limit = 8,
): StudyWithSlug[] {
  const needles = Array.from(
    new Set(
      [name, ...aliases]
        .map((n) => n.trim().toLowerCase())
        .filter((n) => n.length >= 3),
    ),
  );
  if (needles.length === 0) return [];

  const regexes = needles.map((n) => {
    const escaped = n.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i");
  });

  const matches: StudyWithSlug[] = [];
  for (const s of researchEntries) {
    const haystack = `${s.title} ${s.journal} ${s.authors} ${s.summary ?? ""}`;
    if (regexes.some((re) => re.test(haystack))) {
      matches.push(s);
    }
  }
  // Year descending — recent first.
  matches.sort((a, b) => b.year - a.year);
  return matches.slice(0, limit);
}
