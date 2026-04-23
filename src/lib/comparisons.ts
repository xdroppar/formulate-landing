/**
 * Curated supplement comparison pages. Each entry produces a page at
 * `/compare/<a>-vs-<b>` where a/b are sorted alphabetically for a single
 * canonical URL per pair.
 *
 * The comparison page pulls the bulk of its data from the encyclopedia
 * (summary, mechanism, dosage, forms, safety, evidence grade) and
 * layers these short editorial blocks on top — the "which do I pick"
 * question Google actually gets asked.
 */

export type Comparison = {
  /** Encyclopedia slugs for the two substances, any order. Renderer sorts. */
  a: string;
  b: string;
  /** Short topic tag — used in metadata + breadcrumbs. */
  topic: string;
  /** One-sentence bottom-line answer, used as meta description prefix. */
  bottom_line: string;
  /** Why this comparison matters — intro paragraph. ~80 words. */
  why_compare: string;
  /** When you'd pick substance A. ~60 words. */
  when_a: string;
  /** When you'd pick substance B. ~60 words. */
  when_b: string;
  /** Whether they can/should be combined + context. ~60 words. */
  combine: string;
  /** Optional third option (another category-adjacent ingredient). */
  also_consider?: { slug: string; note: string };
  /** Tags for filtering on the compare index page. */
  tags: string[];
};

export const comparisons: Comparison[] = [
  {
    a: "nac",
    b: "glutathione",
    topic: "Antioxidant / Liver Support",
    bottom_line:
      "NAC is the precursor Glutathione is made from — NAC is typically the better-absorbed choice.",
    why_compare:
      "Both target the body's master antioxidant system. Glutathione is the actual active molecule; NAC (N-acetyl cysteine) is the amino acid your liver uses to build more of it. The practical question is whether supplementing Glutathione directly beats supplementing the precursor — and the pharmacokinetics favor NAC for most use cases.",
    when_a:
      "Pick NAC for liver support, acetaminophen toxicity risk, mucus-thinning, and most general antioxidant use. NAC has decades of clinical trial data, crosses into cells efficiently, and is measurably cheaper per effective dose.",
    when_b:
      "Pick Glutathione only when you have a documented Glutathione deficiency your clinician wants to replenish directly, or when using a liposomal formulation specifically studied for your condition. Oral Glutathione is mostly broken down in the gut.",
    combine:
      "Safe to combine — they operate in the same pathway. Most stacking protocols use NAC as the primary with intermittent Glutathione for short-term boost. No reported interaction issues.",
    tags: ["Antioxidants", "Liver", "Detox"],
  },
  {
    a: "ashwagandha",
    b: "rhodiola",
    topic: "Adaptogens for Stress",
    bottom_line:
      "Ashwagandha calms at night; Rhodiola energizes by day — the two strongest adaptogens don't compete, they pair.",
    why_compare:
      "Both adaptogens reduce the body's cortisol response to chronic stress. But they achieve it differently: Ashwagandha down-regulates sympathetic output (so it calms), while Rhodiola improves mitochondrial resilience under stress (so it energizes without stimulation). Picking one depends on whether stress shows up as wired-but-tired anxiety or as exhaustion.",
    when_a:
      "Pick Ashwagandha if stress manifests as racing thoughts, poor sleep, elevated resting heart rate, or you want an evening anxiolytic. Dose: 300–600 mg/day of a standardized root extract (KSM-66 or Sensoril).",
    when_b:
      "Pick Rhodiola if stress manifests as mental fatigue, afternoon crash, or burnout. Rhodiola is typically morning-dosed and doesn't cause drowsiness. Dose: 200–600 mg/day of a 3% rosavins extract.",
    combine:
      "Commonly stacked — Ashwagandha PM + Rhodiola AM is a classic combo. No adverse interaction reported. Watch for thyroid effects with Ashwagandha if you take levothyroxine.",
    tags: ["Adaptogens", "Stress", "Anxiety", "Energy"],
  },
  {
    a: "l-theanine",
    b: "gaba-supplement",
    topic: "Calming / Anxiety",
    bottom_line:
      "L-Theanine crosses the blood-brain barrier reliably; oral GABA mostly does not.",
    why_compare:
      "Both are pitched as relaxants without sedation. The difference is pharmacokinetic: L-Theanine is absorbed, crosses into the brain, and raises alpha-wave activity within 30 minutes. Supplemental GABA is hydrophilic and has poor blood-brain barrier penetration — most of the calm people feel from oral GABA is from enteric nervous system effects or placebo.",
    when_a:
      "Pick L-Theanine for acute calm-without-drowsy (before a stressful event, stacked with caffeine for focus). Strong evidence base in both EEG studies and RCTs. Dose: 100–200 mg, effective within 30–45 minutes.",
    when_b:
      "Pick GABA only if you've had a personal positive response — the pharmacology is unfavorable, but a subset of users consistently report benefit. Dose: 500–750 mg. Avoid relying on it for clinical anxiety; see a clinician.",
    combine:
      "Safe to combine. L-Theanine is often stacked with GABA in 'calm' formulas — likely the L-Theanine doing most of the work. No documented interactions with medications at supplemental doses.",
    tags: ["Calm", "Anxiety", "Sleep", "Nootropics"],
  },
  {
    a: "whey-protein",
    b: "casein-protein",
    topic: "Protein Source Timing",
    bottom_line:
      "Whey spikes amino acids fast; Casein releases them slowly — they're complements, not alternatives.",
    why_compare:
      "Both are dairy-derived protein concentrates with near-identical amino acid profiles. The difference is speed: Whey digests in 1–2 hours and produces a large, brief amino acid spike ideal for post-workout. Casein forms a gel in the stomach and digests over 6–8 hours — ideal overnight when you're fasting.",
    when_a:
      "Pick Whey post-workout (within 30–60 minutes) and for daytime snacks where fast muscle protein synthesis matters. Whey isolate is lower-lactose and typically better-tolerated. Dose: 20–40 g per serving.",
    when_b:
      "Pick Casein before sleep or during long gaps between meals — sustained amino acid delivery reduces overnight muscle breakdown. Mixes thicker, pudding-like texture. Dose: 30–40 g one hour before bed.",
    combine:
      "Commonly combined (Whey after training + Casein before bed). Many commercial blends mix them in one product. No interaction concerns beyond standard dairy allergies.",
    tags: ["Protein", "Muscle", "Recovery", "Sports Nutrition"],
  },
  {
    a: "creatine",
    b: "hmb",
    topic: "Muscle Growth & Retention",
    bottom_line:
      "Creatine grows muscle; HMB prevents muscle loss — picked for opposite goals.",
    why_compare:
      "Both are leucine-pathway players but they solve different problems. Creatine (as monohydrate) increases phosphocreatine stores for performance and hypertrophy in trained and untrained populations. HMB is a leucine metabolite best studied in catabolic contexts — aging, immobilization, calorie deficits, or extreme training volumes.",
    when_a:
      "Pick Creatine for muscle growth, strength, sprint performance, and cognitive benefits. Strongest evidence base of any sports supplement. Dose: 3–5 g/day, no loading needed for most people. Effective in all training states.",
    when_b:
      "Pick HMB if you're in a catabolic state: aging (>65), bed rest, large calorie deficit, or returning to training after a layoff. Dose: 3 g/day split. Weaker in healthy trained lifters — Creatine beats it in that population.",
    combine:
      "Safe to combine. Most HMB-focused protocols also use Creatine. Evidence for additive hypertrophy effects is mixed but the combination is physiologically rational.",
    tags: ["Muscle", "Strength", "Sarcopenia", "Sports Performance"],
  },
  {
    a: "beta-alanine",
    b: "creatine",
    topic: "Performance Supplements",
    bottom_line:
      "Creatine wins for efforts under 30 seconds; Beta-Alanine wins for 1–4 minute efforts.",
    why_compare:
      "Both improve exercise performance but at different durations. Creatine regenerates ATP for explosive work (10-second sprints, 1RM lifts, jumps). Beta-Alanine buffers intramuscular acidosis during sustained high-intensity work (400m runs, 2-km rows, bodyweight-failure sets of 15+ reps). The right pick depends on what you're training.",
    when_a:
      "Pick Creatine for strength, power, and short-duration high-output efforts. Loads muscle phosphocreatine. Also beneficial for brain function. Dose: 3–5 g/day.",
    when_b:
      "Pick Beta-Alanine for middle-distance endurance, high-rep weight training, or combat sports. Loads muscle carnosine over 4–8 weeks. Dose: 3–5 g/day split into smaller doses to avoid paresthesia (tingling skin).",
    combine:
      "Commonly stacked — the two top sports performance supplements. Their mechanisms don't overlap, so combined benefit is essentially additive. No interaction concerns.",
    tags: ["Sports Performance", "Endurance", "Strength", "Muscle"],
  },
  {
    a: "curcumin",
    b: "fish-oil-epa-dha",
    topic: "Anti-Inflammatory Support",
    bottom_line:
      "Fish Oil is the broader anti-inflammatory; Curcumin is stronger for specific joint pain.",
    why_compare:
      "Both reduce systemic inflammation through different mechanisms. Fish Oil (EPA/DHA) down-regulates inflammatory cytokine production via eicosanoid pathways and has cardiovascular + cognitive benefits beyond inflammation. Curcumin inhibits NF-κB and COX-2 more directly, with the strongest evidence base in osteoarthritis pain.",
    when_a:
      "Pick Curcumin for joint pain, IBD flares, or targeted anti-inflammatory action. Absorption is poor — always pick a bioavailable form (Meriva, Longvida, BCM-95, or with piperine). Dose: 500–1,000 mg bioavailable extract.",
    when_b:
      "Pick Fish Oil as a foundational supplement regardless of specific goal — cardiovascular, cognitive, and inflammatory benefits overlap. Dose: 2–3 g/day combined EPA+DHA, with food.",
    combine:
      "Excellent combination — commonly recommended together for osteoarthritis protocols. Both have mild anticoagulant effects at high doses; if you take blood thinners, discuss with your clinician.",
    tags: ["Anti-Inflammatory", "Joints", "Heart Health", "Arthritis"],
  },
  {
    a: "magnesium",
    b: "melatonin",
    topic: "Sleep Support",
    bottom_line:
      "Melatonin fixes timing; Magnesium fixes quality — they solve different sleep problems.",
    why_compare:
      "Both show up on sleep-supplement lists but they do unrelated things. Melatonin is a hormone that shifts the circadian phase — it tells your brain it's night. Magnesium is a cofactor for parasympathetic nervous system function — it calms muscle tension and nervous-system arousal. Picking one requires knowing whether the problem is falling asleep or staying asleep.",
    when_a:
      "Pick Magnesium (glycinate or threonate form) for anxious-mind sleep, muscle tension, restless legs, or maintenance of deep sleep. Dose: 200–400 mg elemental, 30–60 minutes before bed.",
    when_b:
      "Pick Melatonin for jet lag, shift work, or difficulty initiating sleep (but not maintaining it). Use the lowest effective dose — 0.3–1 mg is usually plenty; higher doses can paradoxically disrupt sleep architecture.",
    combine:
      "Commonly combined. Magnesium + low-dose Melatonin is the most evidence-based sleep stack. No interaction issues at recommended doses.",
    tags: ["Sleep", "Anxiety", "Circadian"],
  },
];

function slugPair(a: string, b: string): string {
  const [first, second] = [a, b].sort();
  return `${first}-vs-${second}`;
}

/** Return canonical URL slug for a comparison (sorted pair). */
export function comparisonSlug(c: Comparison): string {
  return slugPair(c.a, c.b);
}

const bySlug = new Map(comparisons.map((c) => [comparisonSlug(c), c]));

export function comparisonBySlug(slug: string): Comparison | undefined {
  return bySlug.get(slug);
}
