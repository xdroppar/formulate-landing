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
import rawSupplementStudies from "@/data/supplement-studies.json";

/** Formulate's methodology review — an 8-dimension rubric applied selectively
 *  to landmark studies on the webapp (mirrored here so /research pages can
 *  surface the analysis). Not every study has one. */
export type MethodologyGrade = "A" | "B" | "C" | "D" | "F";
export interface MethodologyReview {
  overall: number;
  grade: MethodologyGrade;
  flags: string[];
  critique: string;
  ideal_design: string;
  reviewed_at: string;
}

/** Webapp study entry shape — the authoritative source of methodology
 *  reviews. Mirrored from formulate-web/src/lib/supplement-studies.ts. */
interface WebappStudy {
  title: string;
  authors?: string;
  year?: number | null;
  journal?: string;
  pmid?: string | null;
  doi?: string | null;
  study_type?: string;
  finding_summary?: string;
  methodology?: MethodologyReview;
}

/** Extract a kebab-case slug from a study key. Registry keys already are
 *  kebab-case (e.g. "ashwagandha-cortisol-2012"), just normalize. */
function toSlug(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
}

function pmidOf(url: string | undefined): string | null {
  if (!url) return null;
  const m = url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/);
  return m ? m[1] : null;
}

export type StudyWithSlug = Study & {
  id: string;
  slug: string;
  /** Optional methodology review pulled from webapp's supplement-studies.json. */
  methodology?: MethodologyReview;
  /** Optional finding_summary from webapp — richer than guide-evidence's
   *  summary; preferred when present. */
  study_type?: string;
  /** Source supplement id when entry came from the webapp studies file.
   *  Used to link back to /ingredients/<slug> pages. */
  supplementId?: string;
};

// --- Build merged registry ---------------------------------------------------
//
// The landing has two study sources:
//   1. `guide-evidence.ts` — 78 entries backing EvidenceBadge popovers on
//      guides. Simple shape: authors, year, journal, title, url, summary.
//   2. `supplement-studies.json` — 61 entries from the webapp, indexed by
//      supplement id. Same shape plus optional methodology reviews.
//
// We union by PMID (preferred) then DOI, preferring the webapp entry when
// methodology is present (it's editorially richer). Keys stay kebab-case so
// URLs on /research/<slug> are stable.

const guideEntries: StudyWithSlug[] = Object.entries(studies).map(
  ([id, study]) => ({ ...study, id, slug: toSlug(id) }),
);

const webappRaw = rawSupplementStudies as Record<string, unknown>;
const webappEntries: StudyWithSlug[] = [];
for (const [supplementId, value] of Object.entries(webappRaw)) {
  if (supplementId.startsWith("_") || !Array.isArray(value)) continue;
  for (const s of value as WebappStudy[]) {
    if (!s.year) continue;
    // Build stable id preferring pmid, then doi, then slugified title
    let id: string;
    if (s.pmid) {
      id = `pmid-${s.pmid}`;
    } else if (s.doi) {
      id = `doi-${s.doi.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
    } else {
      const t = s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
      id = `t-${supplementId}-${t}`;
    }
    const url = s.pmid
      ? `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`
      : s.doi
        ? `https://doi.org/${s.doi}`
        : "";
    webappEntries.push({
      id,
      slug: toSlug(id),
      authors: s.authors || "Author not specified",
      year: s.year,
      journal: s.journal || "Journal not specified",
      title: s.title,
      url,
      summary: s.finding_summary,
      methodology: s.methodology,
      study_type: s.study_type,
      supplementId,
    });
  }
}

// Dedup: key by PMID (preferred), else DOI, else id. Webapp entries win ties
// because they carry methodology reviews.
const merged = new Map<string, StudyWithSlug>();
const insert = (e: StudyWithSlug, preferNew: boolean) => {
  const pmid = pmidOf(e.url);
  const key = pmid
    ? `pmid:${pmid}`
    : e.url
      ? `url:${e.url.toLowerCase()}`
      : `id:${e.id}`;
  const existing = merged.get(key);
  if (!existing) {
    merged.set(key, e);
    return;
  }
  if (preferNew) {
    // Keep webapp fields but retain guide-evidence's id if it's simpler
    // (e.g. "ashwagandha-cortisol-2012" beats "pmid-23439798" for readability).
    merged.set(key, { ...e, id: existing.id, slug: existing.slug });
  }
};
// Insert guide entries first, then webapp (preferNew=true) so webapp methodology wins
for (const e of guideEntries) insert(e, false);
for (const e of webappEntries) insert(e, true);

export const researchEntries: StudyWithSlug[] = [...merged.values()];

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

export type InteractionStudyMatch = StudyWithSlug & {
  /** 'both' = study text mentions both substances (highest-signal for a
   *  real interaction page); 'a' / 'b' = only one side matched. */
  side: "both" | "a" | "b";
};

/** Find studies relevant to an interaction pair. Returns studies that mention
 *  EITHER substance, tagged by which side(s) matched. Results come out with
 *  both-sides matches first (those are the most on-topic for a pair page),
 *  then single-side matches, each block sorted by year descending.
 *
 *  Same word-boundary regex discipline as studiesForIngredient — avoids
 *  "dha" inside "ashwagandha" type substring hits. */
export function studiesForInteraction(
  aName: string,
  aAliases: string[] = [],
  bName: string,
  bAliases: string[] = [],
  limit = 8,
): InteractionStudyMatch[] {
  const buildRegexes = (name: string, aliases: string[]): RegExp[] => {
    const needles = Array.from(
      new Set(
        [name, ...aliases]
          .map((n) => n.trim().toLowerCase())
          .filter((n) => n.length >= 3 && !n.includes("(")),
      ),
    );
    return needles.map((n) => {
      const escaped = n.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      return new RegExp(`\\b${escaped}\\b`, "i");
    });
  };
  const aRegex = buildRegexes(aName, aAliases);
  const bRegex = buildRegexes(bName, bAliases);
  if (aRegex.length === 0 || bRegex.length === 0) return [];

  const matches: InteractionStudyMatch[] = [];
  for (const s of researchEntries) {
    const haystack = `${s.title} ${s.journal} ${s.authors} ${s.summary ?? ""}`;
    const hitA = aRegex.some((re) => re.test(haystack));
    const hitB = bRegex.some((re) => re.test(haystack));
    if (!hitA && !hitB) continue;
    const side: "both" | "a" | "b" = hitA && hitB ? "both" : hitA ? "a" : "b";
    matches.push({ ...s, side });
  }
  // Both-sides first, then year descending within each block.
  const rank = (m: InteractionStudyMatch) => (m.side === "both" ? 0 : 1);
  matches.sort((x, y) => {
    const r = rank(x) - rank(y);
    if (r !== 0) return r;
    return y.year - x.year;
  });
  return matches.slice(0, limit);
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
