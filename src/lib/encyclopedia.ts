import encyclopediaData from "@/data/encyclopedia.json";

export type EvidenceGrade = "A" | "B" | "C" | "D";

export type DosageInfo = {
  typical_range?: string | null;
  timing?: string | null;
  with_food?: string | null;
  duration_notes?: string | null;
  special_populations?: string | null;
  [k: string]: unknown;
};

export type FormInfo = {
  form: string;
  score?: number | null;
  notes?: string | null;
};

export type SafetyInfo = {
  common_side_effects?: string[];
  serious_risks?: string[];
  contraindications?: string[];
  [k: string]: unknown;
};

export type InteractionRef = {
  with?: string;
  severity?: string;
  note?: string;
  [k: string]: unknown;
};

// The source ndjson has schema drift across records (some have interactions as
// a list, some as an object with medications/supplements arrays; some add
// key_reviews; etc.). Keep the type loose for optional/variable fields — the
// renderer defensively accesses via Array.isArray checks.
export type Ingredient = {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  category: string;
  summary: string;
  primary_uses: string[];
  mechanism_of_action: string[];
  evidence_grade: EvidenceGrade | null;
  evidence_notes: string;
  tags: string[];
  forms: FormInfo[];
  dosage: DosageInfo | null;
  safety?: SafetyInfo | null;
};

type RawEntry = Record<string, unknown> & { id: string; name: string; slug: string };

export const ingredients: Ingredient[] = (encyclopediaData as RawEntry[]).map((r) => ({
  id: r.id,
  slug: r.slug,
  name: r.name as string,
  aliases: Array.isArray(r.aliases) ? (r.aliases as string[]) : [],
  category: (r.category as string) ?? "Other",
  summary: (r.summary as string) ?? "",
  primary_uses: Array.isArray(r.primary_uses) ? (r.primary_uses as string[]) : [],
  mechanism_of_action: Array.isArray(r.mechanism_of_action)
    ? (r.mechanism_of_action as string[])
    : [],
  evidence_grade: (r.evidence_grade as EvidenceGrade | null) ?? null,
  evidence_notes: (r.evidence_notes as string) ?? "",
  tags: Array.isArray(r.tags) ? (r.tags as string[]) : [],
  forms: Array.isArray(r.forms) ? (r.forms as FormInfo[]) : [],
  dosage: (r.dosage as DosageInfo | null) ?? null,
  safety: (r.safety as SafetyInfo | null | undefined) ?? null,
}));

const bySlug = new Map(ingredients.map((i) => [i.slug, i]));
const byNameLower = new Map<string, Ingredient>();
for (const i of ingredients) {
  byNameLower.set(i.name.toLowerCase(), i);
  for (const a of i.aliases) byNameLower.set(a.toLowerCase(), i);
}

export function ingredientBySlug(slug: string): Ingredient | undefined {
  return bySlug.get(slug);
}

export function findIngredientByName(name: string): Ingredient | undefined {
  return byNameLower.get(name.trim().toLowerCase());
}

/** Ingredients grouped by category, each group sorted by evidence grade then name. */
export function ingredientsByCategory(): { category: string; items: Ingredient[] }[] {
  const gradeRank = (g: EvidenceGrade | null): number =>
    g === "A" ? 0 : g === "B" ? 1 : g === "C" ? 2 : g === "D" ? 3 : 4;

  const map = new Map<string, Ingredient[]>();
  for (const i of ingredients) {
    const key = i.category || "Other";
    const bucket = map.get(key) ?? [];
    bucket.push(i);
    map.set(key, bucket);
  }
  const groups: { category: string; items: Ingredient[] }[] = [];
  for (const [category, items] of map) {
    items.sort(
      (a, b) =>
        gradeRank(a.evidence_grade) - gradeRank(b.evidence_grade) ||
        a.name.localeCompare(b.name),
    );
    groups.push({ category, items });
  }
  groups.sort((a, b) => b.items.length - a.items.length);
  return groups;
}

export function relatedIngredients(ingredient: Ingredient, limit = 6): Ingredient[] {
  return ingredients
    .filter((i) => i.slug !== ingredient.slug && i.category === ingredient.category)
    .sort((a, b) => {
      const shared = (x: Ingredient) =>
        x.tags.filter((t) => ingredient.tags.includes(t)).length;
      return shared(b) - shared(a);
    })
    .slice(0, limit);
}

export const EVIDENCE_GRADE_META: Record<
  EvidenceGrade,
  { label: string; color: string; description: string }
> = {
  A: {
    label: "Strong evidence",
    color: "#10B981",
    description: "Multiple well-designed human trials support the main claims.",
  },
  B: {
    label: "Moderate evidence",
    color: "#3B82F6",
    description: "Some human trials support key claims; further confirmation needed.",
  },
  C: {
    label: "Limited evidence",
    color: "#F59E0B",
    description: "Mostly observational or small trials; mechanism is plausible but unproven at scale.",
  },
  D: {
    label: "Very limited evidence",
    color: "#EF4444",
    description: "Primarily pre-clinical or anecdotal; human efficacy not established.",
  },
};
