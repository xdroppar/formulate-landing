import interactionsData from "@/data/interactions.json";
import substancesData from "@/data/substance-aliases.json";

export type Severity = "danger" | "warning" | "caution" | "info" | "synergy";

export type InteractionType =
  | "absorption"
  | "competition"
  | "synergy"
  | "potentiation"
  | "antagonism"
  | "metabolism"
  | "timing"
  | "medication";

export type EvidenceQuality = "high" | "moderate" | "low" | "very-low";

export type Interaction = {
  substance_a: string;
  substance_b: string;
  severity: Severity;
  interaction_type: InteractionType;
  summary: string;
  details: string;
  recommendation: string;
  timing_advice: string | null;
  sources: string[];
  pair_key: string;
  // Optional structured fields (populated by the research workflow pipeline).
  // Renderer falls back to the unstructured `details` block when absent.
  mechanism?: string | null;
  evidence_quality?: EvidenceQuality | null;
  populations?: string[] | null;
  what_we_dont_know?: string | null;
  severity_rationale?: string | null;
  monitoring?: string[] | null;
  last_reviewed?: string | null;
};

// Fallback when a pair has no per-record last_reviewed. Bump when a bulk review ships.
export const INTERACTIONS_LAST_REVIEWED = "2026-04-21";

export type Substance = {
  slug: string;
  canonical: string;
  display: string;
  aliases: string[];
};

export const interactions = interactionsData as Interaction[];
export const substances = substancesData as Substance[];

const bySlug = new Map(substances.map((s) => [s.slug, s]));
const byCanonical = new Map(substances.map((s) => [s.canonical.toLowerCase(), s]));
const byAlias = new Map<string, Substance>();
for (const s of substances) {
  byAlias.set(s.canonical.toLowerCase(), s);
  for (const a of s.aliases) byAlias.set(a.toLowerCase(), s);
}

export function findSubstance(input: string): Substance | undefined {
  const key = input.trim().toLowerCase();
  return byAlias.get(key) ?? byCanonical.get(key) ?? bySlug.get(key);
}

export function substanceFromSlug(slug: string): Substance | undefined {
  return bySlug.get(slug);
}

function normalizeForPair(name: string): string {
  const sub = findSubstance(name);
  return (sub?.canonical ?? name).toLowerCase();
}

export function checkPair(a: string, b: string): Interaction | null {
  const na = normalizeForPair(a);
  const nb = normalizeForPair(b);
  for (const i of interactions) {
    const ia = i.substance_a.toLowerCase();
    const ib = i.substance_b.toLowerCase();
    if ((ia === na && ib === nb) || (ia === nb && ib === na)) {
      return i;
    }
  }
  return null;
}

export function checkStack(inputs: string[]): Interaction[] {
  const results: Interaction[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < inputs.length; i++) {
    for (let j = i + 1; j < inputs.length; j++) {
      const pair = checkPair(inputs[i], inputs[j]);
      if (pair && !seen.has(pair.pair_key)) {
        seen.add(pair.pair_key);
        results.push(pair);
      }
    }
  }
  const order: Severity[] = ["danger", "warning", "caution", "synergy", "info"];
  results.sort((x, y) => order.indexOf(x.severity) - order.indexOf(y.severity));
  return results;
}

export function interactionsFor(substance: string): Interaction[] {
  const n = normalizeForPair(substance);
  return interactions.filter(
    (i) => i.substance_a.toLowerCase() === n || i.substance_b.toLowerCase() === n,
  );
}

export const SEVERITY_META: Record<
  Severity,
  { label: string; color: string; border: string; bg: string; icon: string }
> = {
  danger: {
    label: "Danger",
    color: "text-red-400",
    border: "border-red-500/60",
    bg: "bg-red-500/10",
    icon: "\u{1F6AB}",
  },
  warning: {
    label: "Warning",
    color: "text-orange-400",
    border: "border-orange-500/60",
    bg: "bg-orange-500/10",
    icon: "\u{26A0}\u{FE0F}",
  },
  caution: {
    label: "Caution",
    color: "text-amber-400",
    border: "border-amber-500/60",
    bg: "bg-amber-500/10",
    icon: "\u{23F0}",
  },
  info: {
    label: "Info",
    color: "text-blue-400",
    border: "border-blue-500/60",
    bg: "bg-blue-500/10",
    icon: "\u{1F4A1}",
  },
  synergy: {
    label: "Synergy",
    color: "text-green-400",
    border: "border-green-500/60",
    bg: "bg-green-500/10",
    icon: "\u{2728}",
  },
};
