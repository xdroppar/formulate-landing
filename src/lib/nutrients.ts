/**
 * Core nutrient registry for the public /nutrients/* SEO pages.
 *
 * Ported from formulate-web's `src/lib/core-nutrients.ts` (the dev Nutrients
 * page registry) and stripped of the GOAL_PRESETS / SYMPTOM_TAGS exports
 * that only the in-app webapp uses. This file is the source of truth for
 * landing's nutrient pages — keep the two registries in sync when nutrient
 * targets, ULs, or synonyms change.
 *
 * FDA daily values are 2016 updated reference intakes.
 */

import { products, type Product } from "@/lib/products";

export type NutrientCategory =
  | "fat_soluble"
  | "water_soluble"
  | "major_mineral"
  | "trace_mineral"
  | "amino_acid"
  | "conditional";

/** DV = FDA Daily Value, AI = Adequate Intake, TR = our suggested Target Range. */
export type ReferenceType = "DV" | "AI" | "TR";

export interface CoreNutrient {
  key: string;
  /** URL slug — derived from `key` with underscores swapped for hyphens. */
  slug: string;
  name: string;
  category: NutrientCategory;
  role: string;
  description: string;
  daily_value: number;
  reference_type: ReferenceType;
  unit: "mg" | "mcg" | "g";
  upper_limit: number | null;
  /** Lowercase substrings flagging low-bioavailability ingredient forms. */
  low_bioavail_forms: string[];
  /** Lowercase synonyms for ingredient name matching. */
  synonyms: string[];
}

export const CATEGORY_META: Record<
  NutrientCategory,
  { label: string; color: string; order: number }
> = {
  fat_soluble: { label: "Fat-soluble vitamins", color: "#F59E0B", order: 0 },
  water_soluble: { label: "Water-soluble vitamins", color: "#3B82F6", order: 1 },
  major_mineral: { label: "Major minerals", color: "#10B981", order: 2 },
  trace_mineral: { label: "Trace minerals", color: "#14B8A6", order: 3 },
  amino_acid: { label: "Amino acids", color: "#EC4899", order: 4 },
  conditional: { label: "Other tracked", color: "#A78BFA", order: 5 },
};

const RAW_NUTRIENTS: Omit<CoreNutrient, "slug">[] = [
  // ── Fat-soluble vitamins ──
  {
    key: "vitamin_a",
    name: "Vitamin A",
    category: "fat_soluble",
    role: "Vision · immunity",
    description: "Retinal function, immune response, skin and mucous membrane health.",
    daily_value: 900,
    reference_type: "DV",
    unit: "mcg",
    upper_limit: 3000,
    low_bioavail_forms: [],
    synonyms: ["vitamin a", "retinol", "retinyl palmitate", "retinyl acetate", "beta-carotene", "beta carotene"],
  },
  {
    key: "vitamin_d",
    name: "Vitamin D",
    category: "fat_soluble",
    role: "Bone · immune",
    description: "Calcium absorption, bone mineralization, immune modulation.",
    daily_value: 20,
    reference_type: "DV",
    unit: "mcg",
    upper_limit: 100,
    low_bioavail_forms: ["d2", "ergocalciferol"],
    synonyms: ["vitamin d", "vitamin d3", "vitamin d2", "cholecalciferol", "ergocalciferol"],
  },
  {
    key: "vitamin_e",
    name: "Vitamin E",
    category: "fat_soluble",
    role: "Antioxidant",
    description: "Lipid-soluble antioxidant; protects membranes from oxidative damage.",
    daily_value: 15,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 1000,
    low_bioavail_forms: ["dl-alpha-tocopherol", "synthetic"],
    synonyms: ["vitamin e", "alpha-tocopherol", "alpha tocopherol", "d-alpha-tocopherol", "mixed tocopherols", "tocotrienols"],
  },
  {
    key: "vitamin_k",
    name: "Vitamin K",
    category: "fat_soluble",
    role: "Coagulation · bone",
    description: "Blood clotting and bone matrix protein activation.",
    daily_value: 120,
    reference_type: "DV",
    unit: "mcg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["vitamin k", "vitamin k1", "vitamin k2", "phylloquinone", "menaquinone", "mk-4", "mk-7"],
  },

  // ── B vitamins ──
  {
    key: "vitamin_b1",
    name: "Vitamin B1 (Thiamin)",
    category: "water_soluble",
    role: "Energy metabolism",
    description: "Carbohydrate metabolism and nerve signaling.",
    daily_value: 1.2,
    reference_type: "DV",
    unit: "mg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["thiamin", "thiamine", "vitamin b1", "vitamin b-1", "thiamin hcl", "thiamine hydrochloride", "benfotiamine"],
  },
  {
    key: "vitamin_b2",
    name: "Vitamin B2 (Riboflavin)",
    category: "water_soluble",
    role: "Energy metabolism",
    description: "Cofactor for FAD/FMN; cellular energy production.",
    daily_value: 1.3,
    reference_type: "DV",
    unit: "mg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["riboflavin", "vitamin b2", "vitamin b-2", "riboflavin 5'-phosphate", "r5p"],
  },
  {
    key: "vitamin_b3",
    name: "Vitamin B3 (Niacin)",
    category: "water_soluble",
    role: "NAD+ precursor",
    description: "NAD/NADP cofactors; energy metabolism, DNA repair.",
    daily_value: 16,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 35,
    low_bioavail_forms: [],
    synonyms: ["niacin", "vitamin b3", "vitamin b-3", "nicotinic acid", "nicotinamide", "niacinamide", "inositol hexanicotinate"],
  },
  {
    key: "vitamin_b5",
    name: "Vitamin B5 (Pantothenic Acid)",
    category: "water_soluble",
    role: "Coenzyme A",
    description: "Coenzyme A synthesis; fatty acid and energy metabolism.",
    daily_value: 5,
    reference_type: "DV",
    unit: "mg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["pantothenic acid", "vitamin b5", "vitamin b-5", "pantothenate", "calcium pantothenate", "d-pantothenic acid"],
  },
  {
    key: "vitamin_b6",
    name: "Vitamin B6",
    category: "water_soluble",
    role: "Amino acid metabolism",
    description: "Pyridoxal-5-phosphate; neurotransmitter and amino acid metabolism.",
    daily_value: 1.7,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 100,
    low_bioavail_forms: [],
    synonyms: ["vitamin b6", "vitamin b-6", "pyridoxine", "pyridoxine hcl", "pyridoxal", "pyridoxal-5-phosphate", "p-5-p", "p5p"],
  },
  {
    key: "vitamin_b7",
    name: "Vitamin B7 (Biotin)",
    category: "water_soluble",
    role: "Hair · skin · nails",
    description: "Carboxylase cofactor; fatty acid synthesis and gluconeogenesis.",
    daily_value: 30,
    reference_type: "DV",
    unit: "mcg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["biotin", "vitamin b7", "vitamin b-7", "vitamin h", "d-biotin"],
  },
  {
    key: "vitamin_b9",
    name: "Vitamin B9 (Folate)",
    category: "water_soluble",
    role: "DNA synthesis",
    description: "One-carbon metabolism; DNA synthesis, methylation, red blood cell formation.",
    daily_value: 400,
    reference_type: "DV",
    unit: "mcg",
    upper_limit: 1000,
    low_bioavail_forms: ["folic acid"],
    synonyms: ["folate", "folic acid", "vitamin b9", "vitamin b-9", "methylfolate", "5-mthf", "l-methylfolate", "folinic acid"],
  },
  {
    key: "vitamin_b12",
    name: "Vitamin B12",
    category: "water_soluble",
    role: "Nerves · red blood cells",
    description: "Myelin synthesis, red blood cell production, methylation cycle.",
    daily_value: 2.4,
    reference_type: "DV",
    unit: "mcg",
    upper_limit: null,
    low_bioavail_forms: ["cyanocobalamin"],
    synonyms: ["vitamin b12", "vitamin b-12", "cobalamin", "cyanocobalamin", "methylcobalamin", "hydroxocobalamin", "adenosylcobalamin"],
  },

  // ── Vitamin C ──
  {
    key: "vitamin_c",
    name: "Vitamin C",
    category: "water_soluble",
    role: "Antioxidant · collagen",
    description: "Collagen synthesis, antioxidant, immune function.",
    daily_value: 90,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 2000,
    low_bioavail_forms: [],
    synonyms: ["vitamin c", "ascorbic acid", "l-ascorbic acid", "sodium ascorbate", "calcium ascorbate", "magnesium ascorbate", "ascorbyl palmitate"],
  },

  // ── Major minerals ──
  {
    key: "calcium",
    name: "Calcium",
    category: "major_mineral",
    role: "Bone · muscle",
    description: "Bone mineralization, muscle contraction, neuronal signaling.",
    daily_value: 1300,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 2500,
    low_bioavail_forms: ["carbonate"],
    synonyms: ["calcium", "calcium carbonate", "calcium citrate", "calcium malate", "calcium hydroxyapatite"],
  },
  {
    key: "magnesium",
    name: "Magnesium",
    category: "major_mineral",
    role: "300+ enzymes",
    description: "Cofactor for 300+ enzymes; sleep, muscle relaxation, ATP.",
    daily_value: 420,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 350,
    low_bioavail_forms: ["oxide", "sulfate"],
    synonyms: ["magnesium", "magnesium glycinate", "magnesium citrate", "magnesium malate", "magnesium oxide", "magnesium threonate", "magnesium l-threonate", "magnesium taurate", "magnesium bisglycinate"],
  },
  {
    key: "phosphorus",
    name: "Phosphorus",
    category: "major_mineral",
    role: "Bone · ATP",
    description: "Bone matrix, ATP, phospholipids, DNA backbone.",
    daily_value: 1250,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 4000,
    low_bioavail_forms: [],
    synonyms: ["phosphorus", "phosphate", "dipotassium phosphate", "tricalcium phosphate"],
  },
  {
    key: "potassium",
    name: "Potassium",
    category: "major_mineral",
    role: "Electrolyte · BP",
    description: "Cellular fluid balance, blood pressure regulation, muscle function.",
    daily_value: 4700,
    reference_type: "DV",
    unit: "mg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["potassium", "potassium chloride", "potassium citrate", "potassium gluconate"],
  },
  {
    key: "sodium",
    name: "Sodium",
    category: "major_mineral",
    role: "Electrolyte",
    description: "Extracellular fluid balance, nerve impulse conduction.",
    daily_value: 2300,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 2300,
    low_bioavail_forms: [],
    synonyms: ["sodium", "sodium chloride", "salt"],
  },

  // ── Trace minerals ──
  {
    key: "iron",
    name: "Iron",
    category: "trace_mineral",
    role: "Oxygen transport",
    description: "Hemoglobin, myoglobin, oxidative phosphorylation.",
    daily_value: 18,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 45,
    low_bioavail_forms: ["ferric oxide", "elemental iron"],
    synonyms: ["iron", "ferrous", "ferrous sulfate", "ferrous fumarate", "ferrous bisglycinate", "ferric"],
  },
  {
    key: "zinc",
    name: "Zinc",
    category: "trace_mineral",
    role: "Immune · enzymes",
    description: "100+ enzymes; immune function, wound healing, DNA synthesis.",
    daily_value: 11,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 40,
    low_bioavail_forms: ["oxide"],
    synonyms: ["zinc", "zinc citrate", "zinc gluconate", "zinc picolinate", "zinc bisglycinate", "zinc oxide", "zinc monomethionine"],
  },
  {
    key: "copper",
    name: "Copper",
    category: "trace_mineral",
    role: "Iron metabolism",
    description: "Cytochrome c oxidase, ceruloplasmin, iron transport.",
    daily_value: 0.9,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 10,
    low_bioavail_forms: [],
    synonyms: ["copper", "copper bisglycinate", "copper sulfate", "copper gluconate"],
  },
  {
    key: "manganese",
    name: "Manganese",
    category: "trace_mineral",
    role: "Bone · antioxidant",
    description: "Bone formation, MnSOD antioxidant, amino acid metabolism.",
    daily_value: 2.3,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 11,
    low_bioavail_forms: [],
    synonyms: ["manganese", "manganese sulfate", "manganese bisglycinate"],
  },
  {
    key: "selenium",
    name: "Selenium",
    category: "trace_mineral",
    role: "Thyroid · antioxidant",
    description: "Glutathione peroxidase, thyroid hormone metabolism.",
    daily_value: 55,
    reference_type: "DV",
    unit: "mcg",
    upper_limit: 400,
    low_bioavail_forms: [],
    synonyms: ["selenium", "selenomethionine", "l-selenomethionine", "sodium selenate"],
  },
  {
    key: "iodine",
    name: "Iodine",
    category: "trace_mineral",
    role: "Thyroid hormones",
    description: "Thyroid hormone (T3/T4) synthesis.",
    daily_value: 150,
    reference_type: "DV",
    unit: "mcg",
    upper_limit: 1100,
    low_bioavail_forms: [],
    synonyms: ["iodine", "potassium iodide", "kelp"],
  },
  {
    key: "chromium",
    name: "Chromium",
    category: "trace_mineral",
    role: "Glucose metabolism",
    description: "Insulin signaling support; glucose uptake.",
    daily_value: 35,
    reference_type: "DV",
    unit: "mcg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["chromium", "chromium picolinate", "chromium polynicotinate", "chromium chloride"],
  },
  {
    key: "molybdenum",
    name: "Molybdenum",
    category: "trace_mineral",
    role: "Sulfite oxidase",
    description: "Cofactor for sulfite oxidase, xanthine oxidase, aldehyde oxidase.",
    daily_value: 45,
    reference_type: "DV",
    unit: "mcg",
    upper_limit: 2000,
    low_bioavail_forms: [],
    synonyms: ["molybdenum", "sodium molybdate", "molybdenum glycinate"],
  },

  // ── Amino acids ──
  {
    key: "glycine",
    name: "Glycine",
    category: "amino_acid",
    role: "Sleep · collagen",
    description:
      "Inhibitory neurotransmitter; collagen synthesis, sleep depth, glutathione precursor. Common dose 3 g before bed.",
    daily_value: 3,
    reference_type: "TR",
    unit: "g",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["glycine", "l-glycine"],
  },
  {
    key: "taurine",
    name: "Taurine",
    category: "amino_acid",
    role: "Cardio · electrolyte",
    description:
      "Conditionally essential; cardiovascular, mitochondrial, osmoregulation. Common dose 1–3 g/day.",
    daily_value: 1500,
    reference_type: "TR",
    unit: "mg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["taurine", "l-taurine"],
  },
  {
    key: "l_theanine",
    name: "L-Theanine",
    category: "amino_acid",
    role: "Calm · focus",
    description:
      "Tea-derived amino acid; alpha-wave EEG activity, calm focus, attenuates caffeine jitters. Common dose 100–400 mg.",
    daily_value: 200,
    reference_type: "TR",
    unit: "mg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["l-theanine", "theanine", "suntheanine"],
  },
  {
    key: "nac",
    name: "NAC",
    category: "amino_acid",
    role: "Glutathione · liver",
    description:
      "N-acetyl-cysteine; glutathione precursor, antioxidant, mucolytic. Common dose 600–1200 mg.",
    daily_value: 600,
    reference_type: "TR",
    unit: "mg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["nac", "n-acetyl-cysteine", "n-acetyl cysteine", "n-acetylcysteine", "acetylcysteine"],
  },
  {
    key: "l_arginine",
    name: "L-Arginine",
    category: "amino_acid",
    role: "Nitric oxide",
    description:
      "Nitric oxide precursor; vasodilation, blood flow. Common dose 3–6 g/day.",
    daily_value: 3,
    reference_type: "TR",
    unit: "g",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["l-arginine", "arginine"],
  },
  {
    key: "l_citrulline",
    name: "L-Citrulline",
    category: "amino_acid",
    role: "Endurance · pump",
    description:
      "Converted to arginine; sustained NO support, exercise performance. Common dose 3–8 g.",
    daily_value: 6,
    reference_type: "TR",
    unit: "g",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["l-citrulline", "citrulline", "citrulline malate"],
  },
  {
    key: "l_carnitine",
    name: "L-Carnitine",
    category: "amino_acid",
    role: "Fat oxidation",
    description:
      "Fatty-acid transport into mitochondria; energy metabolism. Common dose 500–2000 mg.",
    daily_value: 1000,
    reference_type: "TR",
    unit: "mg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["l-carnitine", "carnitine", "acetyl-l-carnitine", "alcar", "acetyl l-carnitine"],
  },
  {
    key: "l_glutamine",
    name: "L-Glutamine",
    category: "amino_acid",
    role: "Gut · recovery",
    description:
      "Most abundant amino acid; gut barrier, immune cell fuel, recovery. Common dose 5 g/day.",
    daily_value: 5,
    reference_type: "TR",
    unit: "g",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["l-glutamine", "glutamine"],
  },
  {
    key: "l_tyrosine",
    name: "L-Tyrosine",
    category: "amino_acid",
    role: "Dopamine precursor",
    description:
      "Catecholamine precursor; cognitive resilience under stress. Common dose 500–2000 mg.",
    daily_value: 1000,
    reference_type: "TR",
    unit: "mg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["l-tyrosine", "tyrosine", "n-acetyl-l-tyrosine", "nalt"],
  },
  {
    key: "l_lysine",
    name: "L-Lysine",
    category: "amino_acid",
    role: "Collagen · immunity",
    description:
      "Essential amino acid; collagen, antiviral support. Common dose 1–3 g.",
    daily_value: 1000,
    reference_type: "TR",
    unit: "mg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["l-lysine", "lysine"],
  },

  // ── Conditional / popular ──
  {
    key: "choline",
    name: "Choline",
    category: "conditional",
    role: "Acetylcholine · liver",
    description: "Acetylcholine precursor, phosphatidylcholine, methyl donor.",
    daily_value: 550,
    reference_type: "DV",
    unit: "mg",
    upper_limit: 3500,
    low_bioavail_forms: [],
    synonyms: ["choline", "choline bitartrate", "alpha-gpc", "alpha gpc", "cdp-choline", "citicoline", "phosphatidylcholine"],
  },
  {
    key: "omega_3",
    name: "Omega-3 (EPA+DHA)",
    category: "conditional",
    role: "Cardio · brain",
    description:
      "EPA+DHA — anti-inflammatory, cardiovascular, brain membrane. Target reflects common AHA/NIH guidance (no FDA DV).",
    daily_value: 500,
    reference_type: "TR",
    unit: "mg",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["omega-3", "omega 3", "epa", "dha", "epa+dha", "fish oil", "eicosapentaenoic acid", "docosahexaenoic acid"],
  },
  {
    key: "fiber",
    name: "Fiber",
    category: "conditional",
    role: "Gut · satiety",
    description: "Soluble + insoluble; gut microbiome, glycemic control.",
    daily_value: 28,
    reference_type: "DV",
    unit: "g",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["fiber", "dietary fiber", "soluble fiber", "psyllium", "inulin"],
  },
  {
    key: "protein",
    name: "Protein",
    category: "conditional",
    role: "Muscle · satiety",
    description: "Amino acids for muscle protein synthesis, enzymes, hormones.",
    daily_value: 50,
    reference_type: "DV",
    unit: "g",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["protein", "whey protein", "casein", "pea protein"],
  },
  {
    key: "creatine",
    name: "Creatine",
    category: "conditional",
    role: "ATP · strength",
    description:
      "Phosphocreatine pool; high-intensity output, cognition. Target reflects common 3–5 g maintenance (no FDA DV).",
    daily_value: 3,
    reference_type: "TR",
    unit: "g",
    upper_limit: null,
    low_bioavail_forms: [],
    synonyms: ["creatine", "creatine monohydrate", "creatine hcl"],
  },
];

export const CORE_NUTRIENTS: CoreNutrient[] = RAW_NUTRIENTS.map((n) => ({
  ...n,
  slug: n.key.replace(/_/g, "-"),
}));

const BY_SLUG: Map<string, CoreNutrient> = new Map(
  CORE_NUTRIENTS.map((n) => [n.slug, n]),
);

export function nutrientBySlug(slug: string): CoreNutrient | undefined {
  return BY_SLUG.get(slug);
}

export function nutrientsByCategory(): {
  category: NutrientCategory;
  items: CoreNutrient[];
}[] {
  const groups = new Map<NutrientCategory, CoreNutrient[]>();
  for (const n of CORE_NUTRIENTS) {
    const list = groups.get(n.category) ?? [];
    list.push(n);
    groups.set(n.category, list);
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => CATEGORY_META[a].order - CATEGORY_META[b].order)
    .map(([category, items]) => ({
      category,
      items: items.sort((a, b) => a.name.localeCompare(b.name)),
    }));
}

export function relatedNutrients(n: CoreNutrient, limit = 6): CoreNutrient[] {
  return CORE_NUTRIENTS.filter(
    (other) => other.category === n.category && other.key !== n.key,
  ).slice(0, limit);
}

export function referenceTypeLabel(rt: ReferenceType): string {
  if (rt === "DV") return "FDA Daily Value";
  if (rt === "AI") return "Adequate Intake";
  return "Target Range";
}

export function formatTarget(n: CoreNutrient): string {
  return `${n.daily_value} ${n.unit}`;
}

/**
 * Find catalog products that list this nutrient on their ingredients label.
 * Matching is conservative: lowercase substring match on the registry's
 * synonym list with a 3-char minimum to avoid bleeding short tokens. Sorted
 * by product score desc; per-product flagged when its source form appears in
 * `low_bioavail_forms` so the page can surface a "low absorption" badge.
 */
export interface NutrientProductHit {
  product: Product;
  /** True when the matched ingredient on this product is a low-bioavail form. */
  low_absorb: boolean;
}

export function productsContainingNutrient(
  n: CoreNutrient,
  limit = 6,
): NutrientProductHit[] {
  const synonyms = n.synonyms
    .map((s) => s.toLowerCase().trim())
    .filter((s) => s.length >= 3);
  if (synonyms.length === 0) return [];

  const hits: NutrientProductHit[] = [];
  for (const p of products) {
    let matched: string | null = null;
    for (const ing of p.ingredients) {
      const norm = (ing.name ?? "").toLowerCase();
      if (synonyms.some((s) => norm.includes(s))) {
        matched = norm;
        break;
      }
    }
    if (matched == null) continue;
    const low_absorb =
      n.low_bioavail_forms.length > 0 &&
      n.low_bioavail_forms.some((f) => matched!.includes(f));
    hits.push({ product: p, low_absorb });
  }
  return hits
    .sort((a, b) => (b.product.score ?? 0) - (a.product.score ?? 0))
    .slice(0, limit);
}
