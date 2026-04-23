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
  {
    a: "nmn",
    b: "nad-nicotinamide-adenine-dinucleotide",
    topic: "Longevity & NAD+ Support",
    bottom_line:
      "NMN is a precursor; NAD+ itself is the coenzyme — you can only usefully supplement the precursor.",
    why_compare:
      "NAD+ declines with age and is involved in every sirtuin-mediated longevity pathway. The popular move is to raise NAD+ levels. The catch: NAD+ itself is poorly absorbed orally — the molecule is too large and unstable. NMN (nicotinamide mononucleotide) is one of two effective precursors (the other is NR, nicotinamide riboside) that actually raise intracellular NAD+.",
    when_a:
      "Pick NMN for NAD+ elevation — it's the supplementable form. Human trials show NMN at 250–500 mg/day raises NAD+ meaningfully. Sublingual forms may bypass some first-pass metabolism. Best-studied precursor alongside NR.",
    when_b:
      "Don't pick NAD+ directly — oral NAD+ is largely degraded before absorption. Intravenous NAD+ is sometimes used clinically but is expensive and unnecessary for healthy adults if the goal is preventive longevity support.",
    combine:
      "You wouldn't combine oral NAD+ with NMN — just take the precursor. NMN stacks rationally with resveratrol, pterostilbene, or other sirtuin activators. No documented drug interactions at supplemental doses.",
    tags: ["Longevity", "NAD+", "Anti-aging", "Sirtuins"],
  },
  {
    a: "lions-mane-mushroom-extract",
    b: "cordyceps",
    topic: "Functional Mushrooms",
    bottom_line:
      "Lion's Mane targets cognition and nerve growth; Cordyceps targets energy and endurance.",
    why_compare:
      "The two most popular non-psychoactive medicinal mushrooms, both widely marketed as 'nootropics' — but they hit different physiological systems. Lion's Mane contains hericenones and erinacines that cross the blood-brain barrier and stimulate NGF (nerve growth factor). Cordyceps contains cordycepin and adenosine analogs that improve oxygen utilization and mitochondrial output.",
    when_a:
      "Pick Lion's Mane for cognitive support, nerve regeneration, mild mood elevation, or post-concussion recovery. Dose: 500–1,000 mg/day of a dual-extracted powder (fruiting body, not pure mycelium). Effects take 4–8 weeks to emerge.",
    when_b:
      "Pick Cordyceps for exercise performance, endurance, oxygen uptake, and fatigue resistance. Trials show VO2 max improvements at 1–3 g/day of Cordyceps militaris extract over 4+ weeks. Morning dose works best.",
    combine:
      "Very commonly stacked — 'focus + energy' combos typically pair them. No documented interaction. Stack with caffeine/L-theanine for an acute cognitive boost layered on the chronic adaptation.",
    tags: ["Nootropics", "Mushrooms", "Cognition", "Endurance"],
  },
  {
    a: "zinc-bisglycinate",
    b: "zinc-picolinate",
    topic: "Zinc Forms & Bioavailability",
    bottom_line:
      "Both are well-absorbed; Bisglycinate is gentler on the stomach, Picolinate has slight absorption edge.",
    why_compare:
      "These are the two forms most supplement experts recommend over generic zinc oxide or zinc sulfate (which are poorly absorbed and GI-irritating). Both are chelated forms — zinc is bound to an organic ligand that escorts it across the gut lining. Bisglycinate uses two glycine molecules; Picolinate uses picolinic acid.",
    when_a:
      "Pick Bisglycinate if you've had stomach upset with zinc before, or if you're taking it on an empty stomach. The glycine chelate is non-irritating and well-tolerated even at higher doses. Common in sleep/immune formulas.",
    when_b:
      "Pick Picolinate for a slight absorption edge — some studies show marginally higher serum zinc rise with picolinate. Commonly found in immune and mood stacks. Can be taken with or without food.",
    combine:
      "No reason to combine — they're both zinc. Pick one form and stay consistent. Long-term zinc >40 mg/day (from any form) requires copper supplementation; see /interactions/copper-and-zinc.",
    tags: ["Minerals", "Zinc", "Immune", "Bioavailability"],
  },
  {
    a: "pterostilbene",
    b: "resveratrol",
    topic: "Polyphenols & Longevity",
    bottom_line:
      "Pterostilbene has 4× the bioavailability and a longer half-life — it's the better-absorbed cousin.",
    why_compare:
      "Both are stilbene polyphenols with overlapping benefits: sirtuin activation, antioxidant activity, anti-inflammatory effects. Resveratrol has more research volume but suffers from rapid glucuronidation — most of an oral dose is cleared before it acts. Pterostilbene has two methyl groups that slow clearance, yielding ~80% oral bioavailability vs resveratrol's ~20%.",
    when_a:
      "Pick Pterostilbene for practical NAD+ / sirtuin support at a lower dose. 50–150 mg/day matches what 250–500 mg resveratrol tries to do on paper. Less well-studied but pharmacokinetically superior.",
    when_b:
      "Pick Resveratrol if you want the larger clinical trial record and don't mind taking more of it. Effective dose is 150–500 mg with a fat source. Micronized or liposomal formulations narrow the bioavailability gap.",
    combine:
      "Often stacked in longevity formulas (alongside NMN). The two polyphenols overlap mechanistically but aren't redundant — they hit SIRT1 and SIRT3 with slightly different kinetics. No drug interactions at supplement doses.",
    tags: ["Longevity", "Polyphenols", "Sirtuins", "Antioxidants"],
  },
  {
    a: "acetyl-l-carnitine",
    b: "l-carnitine",
    topic: "Carnitine Forms",
    bottom_line:
      "L-Carnitine fuels muscles; Acetyl-L-Carnitine (ALCAR) fuels the brain — the acetyl group is what crosses the blood-brain barrier.",
    why_compare:
      "Both move fatty acids into mitochondria for beta-oxidation. The difference is where they end up: plain L-Carnitine acts mostly in skeletal and cardiac muscle. ALCAR (the acetylated form) crosses the blood-brain barrier and has distinct cognitive effects — improved mood in depression, reduced diabetic neuropathy, and some evidence for early Alzheimer's.",
    when_a:
      "Pick ALCAR for cognitive support, age-related mental fatigue, diabetic neuropathy, or mood elevation. Dose: 500–2,000 mg/day. Can stack with alpha-lipoic acid for mitochondrial support.",
    when_b:
      "Pick L-Carnitine (or L-Carnitine L-Tartrate) for exercise recovery, fat metabolism in muscle, or heart health. Dose: 1–3 g/day. Tartrate form has the most sports-nutrition evidence for recovery.",
    combine:
      "Not commonly combined — usually one or the other by goal. Stacking would add cost without clear benefit. No drug interaction issues at supplement doses.",
    tags: ["Nootropics", "Mitochondrial", "Fatty Acid Oxidation", "Cognition"],
  },
  {
    a: "chlorella",
    b: "spirulina",
    topic: "Green Superfoods",
    bottom_line:
      "Chlorella has a cell wall that binds heavy metals; Spirulina is more protein-dense — same family, different uses.",
    why_compare:
      "Both are popular 'greens' supplements: single-celled organisms (Chlorella is green algae, Spirulina is cyanobacteria) marketed for detox, protein, and micronutrients. They overlap on chlorophyll, vitamins, minerals, and protein — but their cell wall structures make them functionally different.",
    when_a:
      "Pick Chlorella for heavy metal binding (its cell wall chelates lead, mercury, cadmium) and fiber. Broken cell wall ('cracked') or micronized forms improve absorption. Dose: 2–5 g/day. Cleanest source matters — contamination is a real risk.",
    when_b:
      "Pick Spirulina for protein density (60% protein by dry weight), phycocyanin's anti-inflammatory effect, and mild blood pressure lowering. Dose: 1–5 g/day. Verify source — blue-green algae can harbor microcystin toxins if grown in open ponds.",
    combine:
      "Safe to combine — some users take both for broader micronutrient coverage. Third-party testing is crucial for both categories; contaminated products are documented. No drug interactions at supplement doses.",
    tags: ["Superfoods", "Detox", "Protein", "Immune"],
  },
  {
    a: "inulin",
    b: "psyllium-husk",
    topic: "Fiber Types",
    bottom_line:
      "Psyllium bulks stool; Inulin feeds gut bacteria — they solve different gut-health problems.",
    why_compare:
      "Both are called 'fiber' but they work differently. Psyllium Husk is a soluble-but-gel-forming fiber that binds water, bulks stool, and moderately lowers cholesterol. Inulin is a fermentable fructooligosaccharide that feeds beneficial gut bacteria (prebiotic) but doesn't bulk stool and can cause gas.",
    when_a:
      "Pick Inulin as a prebiotic to grow Bifidobacteria and Lactobacillus populations. Start low (2–3 g/day) and ramp — it commonly causes gas, bloating, or diarrhea at higher doses in sensitive guts. Good in smoothies; dissolves clear.",
    when_b:
      "Pick Psyllium for regularity, stool bulk, IBS-C, or cholesterol reduction. Dose: 5–10 g/day split with meals, with plenty of water. Works within days. Has the best clinical evidence of any fiber supplement for multiple endpoints.",
    combine:
      "Commonly combined — Psyllium for mechanical action, Inulin for microbiome benefit. Start with Psyllium alone if you have IBS to establish tolerance; add Inulin slowly afterward. No drug interactions except absorption-level (take medications 2 hours apart from either fiber).",
    tags: ["Fiber", "Gut Health", "Prebiotic", "Digestion"],
  },
  {
    a: "tongkat-ali",
    b: "tribulus",
    topic: "Testosterone & Male Vitality",
    bottom_line:
      "Tongkat Ali has real human evidence for modest testosterone rise; Tribulus does not.",
    why_compare:
      "Both are classic 'testosterone boosters' sold to men looking for strength, libido, or vitality support. The evidence base is not equivalent. Tongkat Ali (Eurycoma longifolia) has multiple placebo-controlled trials showing modest free testosterone increases in men with low baseline levels. Tribulus Terrestris, despite decades of marketing, consistently fails to raise testosterone in controlled trials — its libido effect appears to work independently of hormones.",
    when_a:
      "Pick Tongkat Ali if the goal is testosterone support, especially in older men or those with stress-related low T. Use a standardized extract (typically 200–400 mg/day of a 100:1 or physta extract). Effects emerge over 4–8 weeks.",
    when_b:
      "Consider Tribulus only for subjective libido effects — not for actual T levels. If libido is the goal and the testosterone-raising question isn't important, it's affordable and low-risk. Dose: 500–1,500 mg/day of a standardized 40–60% saponin extract.",
    combine:
      "Occasionally stacked in 'male vitality' formulas. Since their mechanisms differ (Tongkat Ali on HPG-axis, Tribulus via androgen-receptor sensitivity), combination is defensible. No documented drug interactions at supplement doses.",
    tags: ["Testosterone", "Male Health", "Libido", "Adaptogens"],
  },
  {
    a: "alpha-lipoic-acid",
    b: "coq10",
    topic: "Mitochondrial Support",
    bottom_line:
      "CoQ10 is the electron-transport fuel; Alpha-Lipoic Acid is the antioxidant that regenerates other antioxidants.",
    why_compare:
      "Both are pitched for mitochondrial function and both work there, but at different steps. CoQ10 (ubiquinone/ubiquinol) physically shuttles electrons in the electron transport chain — it's a direct fuel. Alpha-Lipoic Acid (ALA) acts as a broad-spectrum antioxidant that regenerates glutathione, vitamin C, and vitamin E, and separately improves glucose uptake in muscle.",
    when_a:
      "Pick ALA for diabetic neuropathy (strongest RCT evidence), general antioxidant support, or liver protection. Dose: 300–600 mg/day, split. Take on empty stomach for best absorption. R-ALA is the biologically active isomer if you want the upgraded form.",
    when_b:
      "Pick CoQ10 for statin-induced muscle fatigue, heart failure adjunct support, or age-related mitochondrial decline. Ubiquinol (the reduced form) is preferred over 50 years old. Dose: 100–200 mg/day with a fat source for absorption.",
    combine:
      "Commonly stacked — both live in the mitochondrion and hit complementary points. Often paired with Acetyl-L-Carnitine for a full 'mitochondrial protocol.' No drug interactions at supplement doses (watch CoQ10 with warfarin — may reduce INR).",
    tags: ["Mitochondrial", "Antioxidants", "Diabetes", "Heart Health"],
  },
  {
    a: "astragalus",
    b: "reishi",
    topic: "Immune Adaptogens",
    bottom_line:
      "Astragalus is the daily immune tonic; Reishi is the nervous-system-calming immune modulator.",
    why_compare:
      "Both have centuries of traditional Chinese medicine use for immune support and long life, but they do different things. Astragalus increases T-cell and NK-cell activity — it's more of an immune-revving tonic. Reishi (Ganoderma lucidum) is adaptogenic: it balances overactive immunity (useful in autoimmunity) while calming the parasympathetic system and supporting sleep.",
    when_a:
      "Pick Astragalus for daily immune support, frequent colds, or as a longevity tonic. Best evidence is in cancer patients on chemotherapy (adjunct, not replacement). Dose: 2–6 g/day of root, or 500–1,000 mg/day of a 15:1 extract.",
    when_b:
      "Pick Reishi if you want the immune benefit bundled with stress reduction, better sleep, or blood pressure lowering. Good choice for autoimmune conditions where Astragalus could over-stimulate. Dose: 1.5–3 g/day of dual-extracted powder.",
    combine:
      "Often stacked in TCM-inspired longevity formulas. Mechanisms overlap but aren't redundant. Watch Reishi with blood thinners — modest anticoagulant effect. Astragalus may stack with immunosuppressants in problematic ways; check with a clinician if on them.",
    tags: ["Immune", "Adaptogens", "Mushrooms", "Longevity"],
  },
  {
    a: "quercetin",
    b: "vitamin-c",
    topic: "Immune & Antiviral",
    bottom_line:
      "Vitamin C is the foundational antioxidant; Quercetin amplifies it — they work best as a pair.",
    why_compare:
      "Both show up in 'immune' protocols, especially for upper respiratory infections. Vitamin C is a broad water-soluble antioxidant with specific immune cell roles. Quercetin is a flavonoid with zinc-ionophore activity (it helps zinc enter cells) plus its own antioxidant and mast-cell-stabilizing effects. Human trials consistently show Quercetin + Vitamin C + Zinc as a trio is more effective than any single one for respiratory symptom duration.",
    when_a:
      "Pick Quercetin for allergy symptoms (mast-cell stabilizing), acute viral illness adjunct, or as a zinc-delivery helper. Dose: 500–1,000 mg/day. Absorption is poor — look for phytosome (Quercetin LipoMicel, QcLp) or with bromelain.",
    when_b:
      "Pick Vitamin C as a year-round foundational supplement. Modest effect on cold duration (~8% in average people, larger in athletes under physical stress). Dose: 500–1,000 mg/day, split — larger single doses aren't better absorbed.",
    combine:
      "The canonical stack. Quercetin + Vitamin C + Zinc is the evidence-based acute-respiratory-illness protocol. No drug interactions at supplement doses. High-dose Vitamin C (>2 g/day) can acidify urine and affect some kidney-cleared drugs.",
    tags: ["Immune", "Antioxidants", "Antiviral", "Allergy"],
  },
  {
    a: "ashwagandha",
    b: "l-theanine",
    topic: "Stress & Calm",
    bottom_line:
      "L-Theanine calms acutely (30 minutes); Ashwagandha calms chronically (4–8 weeks) — they solve different stress timelines.",
    why_compare:
      "Both are go-to supplements for anxiety and stress, but on different timescales. L-Theanine is an acute calming agent — it raises alpha brainwaves and reduces sympathetic arousal within 30 minutes. Ashwagandha is an adaptogen — its benefits (lower cortisol, better sleep, lower baseline anxiety) emerge over weeks of daily use.",
    when_a:
      "Pick Ashwagandha for chronic stress, elevated baseline cortisol, poor sleep, or high resting heart rate. Dose: 300–600 mg/day of a standardized root extract (KSM-66 or Sensoril). Watch for thyroid interactions.",
    when_b:
      "Pick L-Theanine for acute calm — before a meeting, during a stressful afternoon, or stacked with caffeine for focus-without-jitters. Dose: 100–200 mg. Kicks in fast, no drowsiness, safe to use daily or as-needed.",
    combine:
      "Very common stack — Ashwagandha daily for baseline + L-Theanine as-needed for acute events. No documented interaction. Be aware of ashwagandha's thyroid effects if you take levothyroxine.",
    tags: ["Stress", "Anxiety", "Calm", "Adaptogens"],
  },
  {
    a: "melatonin",
    b: "valerian",
    topic: "Sleep Support",
    bottom_line:
      "Melatonin targets circadian timing; Valerian targets GABA-mediated sedation — different mechanisms, different use cases.",
    why_compare:
      "Both are sold as 'natural sleep aids' but they're in separate categories. Melatonin is a hormone that signals darkness to the brain — it's most useful for jet lag, shift work, or delayed sleep phase. Valerian acts like a mild GABAergic sedative (similar mechanism to benzodiazepines, much weaker) — it induces physical relaxation and drowsiness.",
    when_a:
      "Pick Melatonin for timing-based sleep problems: jet lag, shift work, or can't-fall-asleep despite not being tired. Lowest effective dose is usually 0.3–1 mg; higher doses paradoxically disrupt sleep architecture.",
    when_b:
      "Pick Valerian for racing-mind anxiety-driven insomnia, or when you want a non-hormonal option. Effects are modest compared to prescription sleep aids. Dose: 400–900 mg root extract, 30–60 minutes before bed. Smells unpleasant.",
    combine:
      "Can be combined but rarely needed — both approaches. Valerian can potentiate benzodiazepines and alcohol; don't stack with prescription sleep meds. Melatonin is safer to combine with most things.",
    tags: ["Sleep", "Insomnia", "Circadian", "GABA"],
  },
  {
    a: "chondroitin-sulfate",
    b: "glucosamine-sulfate",
    topic: "Joint Support",
    bottom_line:
      "Glucosamine and Chondroitin are the classic joint stack — the evidence says they work better together than either alone.",
    why_compare:
      "Both are components of cartilage matrix and both are common in joint formulas. Glucosamine is a precursor to glycosaminoglycans (the shock-absorbing matrix in cartilage). Chondroitin is a glycosaminoglycan itself. The clinical trial picture is mixed — effects are modest and emerge over weeks — but the GAIT trial and subsequent meta-analyses suggest combined use outperforms either alone in moderate-to-severe knee osteoarthritis.",
    when_a:
      "Pick Chondroitin as a complement to Glucosamine, or on its own for users who can't tolerate Glucosamine (seafood allergy concerns with shellfish-derived Glucosamine). Dose: 800–1,200 mg/day.",
    when_b:
      "Pick Glucosamine Sulfate (not HCl — the sulfate form has better evidence) for daily cartilage support, particularly in osteoarthritis. Effects take 8–12 weeks. Dose: 1,500 mg/day. Some diabetics see small fasting glucose rises — monitor if you're on the edge.",
    combine:
      "Commonly combined — the typical 'joint supplement' is this duo. Often stacked with MSM, Curcumin, or Boswellia for broader anti-inflammatory coverage. Mild anticoagulant effect at high doses — watch with warfarin.",
    tags: ["Joints", "Arthritis", "Cartilage", "Anti-Inflammatory"],
  },
  {
    a: "5-htp",
    b: "l-tryptophan",
    topic: "Serotonin Precursors",
    bottom_line:
      "L-Tryptophan is one step further upstream; 5-HTP converts directly to serotonin — 5-HTP is faster, Tryptophan is safer.",
    why_compare:
      "Both supplement the body's serotonin production. L-Tryptophan is the amino acid you get from protein; the body converts it to 5-HTP (via tryptophan hydroxylase), then to serotonin. 5-HTP skips the rate-limiting step, so a 5-HTP dose raises serotonin faster and with less competition from other amino acids for transport into the brain.",
    when_a:
      "Pick 5-HTP for depression or mood adjuncts, appetite control, or acute sleep initiation. Dose: 100–300 mg/day. Effects emerge within hours to days. Don't combine with SSRIs, MAOIs, or other serotonergic drugs — serotonin syndrome risk.",
    when_b:
      "Pick L-Tryptophan when you want a gentler, more 'background' serotonin support. Dose: 500–2,000 mg/day. Safer at high doses than 5-HTP. Also serves as a niacin precursor at high intake.",
    combine:
      "Generally not combined — redundant. Never stack either with antidepressants or triptans without clinician oversight. See /interactions/5-htp-and-ssri for the serotonin syndrome risk profile.",
    tags: ["Mood", "Depression", "Serotonin", "Sleep"],
  },
  {
    a: "boswellia",
    b: "curcumin",
    topic: "Joint & Anti-Inflammatory",
    bottom_line:
      "Curcumin blocks NF-κB and COX-2; Boswellia blocks 5-LOX — they hit different inflammation pathways, so they combine well.",
    why_compare:
      "Both are plant-based anti-inflammatories with strong joint-pain evidence, particularly for osteoarthritis. Curcumin (from turmeric) primarily inhibits NF-κB and COX-2 enzymes. Boswellia (frankincense, specifically the AKBA compound) inhibits 5-lipoxygenase (5-LOX), a separate inflammatory pathway that Curcumin doesn't touch. That's why they're often paired — the mechanisms don't overlap.",
    when_a:
      "Pick Boswellia for osteoarthritis, ulcerative colitis, or asthma (5-LOX is involved in all three). Standardized extracts like AKBA-rich Boswellia serrata (5-Loxin) have the best RCT evidence. Dose: 250–500 mg/day.",
    when_b:
      "Pick Curcumin for general inflammation, joint pain, or mood support. Always use a bioavailable form (Meriva, Longvida, BCM-95, or with piperine) — plain Curcumin barely absorbs. Dose: 500–1,000 mg/day of a bioavailable extract.",
    combine:
      "The gold standard joint-supplement stack. Mechanisms don't overlap. Both have mild anticoagulant effects at high doses — check with clinician if on blood thinners.",
    tags: ["Joints", "Arthritis", "Anti-Inflammatory", "Gut Health"],
  },
  {
    a: "glycine",
    b: "taurine",
    topic: "Calming Amino Acids",
    bottom_line:
      "Glycine is the sleep-deepener; Taurine is the parasympathetic-toner — both are inhibitory aminos with different anchors.",
    why_compare:
      "Both are non-essential amino acids that act as inhibitory neurotransmitters and both show up in sleep/calm formulas. Glycine acts directly at glycine receptors in the brainstem and has strong RCT evidence for improved subjective sleep quality. Taurine modulates GABA-A receptors and is concentrated in heart and retinal tissue — it reduces sympathetic drive and has cardiovascular and metabolic effects Glycine doesn't.",
    when_a:
      "Pick Glycine for improved sleep quality, reduced next-day fatigue, or cooling-down (it triggers vasodilation). Dose: 3 g/day, 30–60 minutes before bed, as a powder in water. Effects are subtle but consistent in trials.",
    when_b:
      "Pick Taurine for cardiovascular support (blood pressure, heart failure adjunct), blood-sugar regulation, or exercise recovery. Dose: 1–3 g/day, any time. Also present in high doses in energy drinks — it offsets caffeine's sympathetic effects rather than stimulating on its own.",
    combine:
      "Safe to combine — commonly stacked in sleep or calm formulas. Both have independent cardiovascular benefits. No documented drug interactions at supplement doses.",
    tags: ["Sleep", "Calm", "Amino Acids", "Cardiovascular"],
  },
  {
    a: "bacopa-monnieri",
    b: "lions-mane-mushroom-extract",
    topic: "Nootropics",
    bottom_line:
      "Bacopa shines for memory and learning; Lion's Mane shines for nerve regeneration and mood — both take weeks to kick in.",
    why_compare:
      "Two of the most clinically-validated nootropic supplements, both with effects that emerge over 8–12 weeks of daily use. Bacopa monnieri (bacosides) modulates acetylcholine and GABA pathways, with the strongest evidence for verbal memory and learning speed. Lion's Mane stimulates NGF (nerve growth factor) production with evidence for mild cognitive impairment, mood, and post-injury nerve recovery.",
    when_a:
      "Pick Bacopa for studying, language learning, or age-related memory decline. Best evidence base in healthy adults of any nootropic. Dose: 300 mg/day of a 50% bacosides extract (Bacognize or KeenMind). Take with fat for absorption.",
    when_b:
      "Pick Lion's Mane for mild mood symptoms, nerve recovery (post-concussion, peripheral neuropathy), or age-related cognitive complaints. Dose: 500–1,000 mg/day of a dual-extracted powder (fruiting body). Stack with omega-3 for synergy.",
    combine:
      "Frequently stacked — distinct mechanisms, additive benefit. No interactions. Bacopa can cause GI upset in some users; start at half dose.",
    tags: ["Nootropics", "Memory", "Cognition", "Mood"],
  },
  {
    a: "bacopa-monnieri",
    b: "ginkgo-biloba",
    topic: "Cognition & Memory",
    bottom_line:
      "Bacopa improves memory encoding; Ginkgo improves cerebral blood flow — studying vs. aging cognition.",
    why_compare:
      "Both are traditional memory/cognition herbs, both with real human evidence, but serving different goals. Bacopa's effect is on learning and recall, most pronounced in healthy adults learning new material. Ginkgo biloba improves microcirculation and platelet aggregation — its benefits are concentrated in older adults with age-related cognitive decline, particularly if circulation is part of the problem.",
    when_a:
      "Pick Bacopa if you're a student, learner, or anyone with a demanding information-heavy role. Effects on verbal learning and working memory. Dose: 300 mg/day of a standardized bacosides extract.",
    when_b:
      "Pick Ginkgo for age-related memory issues, tinnitus, or Raynaud's-like symptoms. EGb 761 is the most-studied standardized extract (24% flavonoids, 6% terpene lactones). Dose: 120–240 mg/day.",
    combine:
      "Can stack, though the overlap is partial. Ginkgo has meaningful antiplatelet activity — avoid with aspirin, warfarin, or other blood thinners; see /interactions/blood-thinners-and-ginkgo-biloba.",
    tags: ["Cognition", "Memory", "Circulation", "Aging"],
  },
  {
    a: "ashwagandha",
    b: "holy-basil",
    topic: "Adaptogens for Stress",
    bottom_line:
      "Ashwagandha is the sedating adaptogen; Holy Basil (Tulsi) is the balancing one — often paired in Ayurvedic stress stacks.",
    why_compare:
      "Both are premier adaptogens in Ayurveda and both lower cortisol response to stress. Ashwagandha leans sedating and is best-suited for evening or anxious-mind stress profiles. Holy Basil (Ocimum sanctum) is more neutral — it's calming without being sedating, and has additional benefits on metabolic health and immune function that Ashwagandha doesn't hit.",
    when_a:
      "Pick Ashwagandha for anxiety, sleep issues, or high evening cortisol. Strongest evidence base of any adaptogen. Dose: 300–600 mg/day standardized extract. Watch for thyroid interactions.",
    when_b:
      "Pick Holy Basil if you want adaptogen support without the sedating edge, plus blood sugar and immune benefits. Dose: 300–600 mg/day of a standardized leaf extract. Good choice for daytime use or users sensitive to Ashwagandha's drowsy feel.",
    combine:
      "Classic Ayurvedic stress stack. Ashwagandha PM + Holy Basil AM is a defensible protocol. No documented interactions beyond the shared adaptogen class — watch Ashwagandha with thyroid medication.",
    tags: ["Adaptogens", "Stress", "Anxiety", "Ayurveda"],
  },
  {
    a: "dha",
    b: "epa",
    topic: "Omega-3 Components",
    bottom_line:
      "EPA is the anti-inflammatory workhorse; DHA is the brain structural fat — most fish oil has both.",
    why_compare:
      "The two 'omega-3 fatty acids' that actually matter are EPA (eicosapentaenoic acid) and DHA (docosahexaenoic acid). Generic fish oil has both in varying ratios — 18:12, 40:20, 55:25 (EPA:DHA) are common. For most daily use they work together, but if you're picking a high-EPA or high-DHA product for a specific goal, the split matters.",
    when_a:
      "Pick DHA-dominant formulas for brain, eye, and cognitive goals — DHA is the structural fat in neuron membranes and the retina. Particularly important in pregnancy/lactation. Dose: 200–1,000 mg/day DHA.",
    when_b:
      "Pick EPA-dominant formulas for anti-inflammatory goals, mood support (especially depression), or cardiovascular focus. EPA competes with arachidonic acid for COX/LOX enzymes, shifting the balance toward less-inflammatory signaling molecules. Dose: 1,000–2,000 mg/day EPA.",
    combine:
      "Almost always combined (natural fish oil has both). For a targeted EPA or DHA intake, pick a product with the ratio that matches your goal. Both have mild anticoagulant effects at high doses — watch with blood thinners.",
    tags: ["Omega-3", "Brain Health", "Cardiovascular", "Anti-Inflammatory"],
  },
  {
    a: "milk-thistle",
    b: "nac",
    topic: "Liver Support",
    bottom_line:
      "NAC rebuilds glutathione; Milk Thistle stabilizes liver cell membranes — different ways of protecting the same organ.",
    why_compare:
      "Both are the most-recommended liver supplements, with decades of clinical and traditional use. NAC (N-acetyl cysteine) is the precursor for glutathione, the liver's primary detox antioxidant; it's the FDA-approved antidote for acetaminophen overdose. Milk Thistle (silymarin) stabilizes hepatocyte membranes against toxin penetration and supports liver cell regeneration.",
    when_a:
      "Pick Milk Thistle for general liver protection, fatty liver, cirrhosis adjunct support, or as a preventive for drinkers. Use a standardized silymarin extract (70–80% silymarin). Dose: 200–400 mg/day silymarin.",
    when_b:
      "Pick NAC for acute antioxidant support, acetaminophen risk reduction, or broader applications (respiratory, fertility, psychiatric adjunct). Dose: 600–1,800 mg/day. See /ingredients/nac for non-liver uses.",
    combine:
      "Commonly stacked in liver-support protocols. The mechanisms don't overlap (NAC raises glutathione; Milk Thistle protects cell membranes) so combination is rational. No drug interactions at supplement doses, though NAC can thin mucus — useful for some, watch if combining with other mucus thinners.",
    tags: ["Liver", "Detox", "Antioxidants"],
  },
  {
    a: "eleuthero",
    b: "panax-ginseng",
    topic: "Ginseng-Family Adaptogens",
    bottom_line:
      "Panax Ginseng is the stimulating adaptogen; Eleuthero (Siberian Ginseng) is the gentler tonic — different plants, different feels.",
    why_compare:
      "Both are called 'ginseng' in retail settings but they're different plants entirely. True ginseng (Panax ginseng / P. quinquefolius) is from the Panax genus and contains ginsenosides — it's the stimulating, performance-enhancing one. Eleuthero (Eleutherococcus senticosus, 'Siberian ginseng') isn't Panax at all; it contains eleutherosides and is milder, more adaptogenic, with less of a kick.",
    when_a:
      "Pick Eleuthero for chronic stress, endurance, or daily adaptogen support without stimulation. Good for long-term use. Dose: 500–1,000 mg/day of a standardized 0.8% eleutheroside extract.",
    when_b:
      "Pick Panax Ginseng for acute mental performance, fatigue, or energy needs. Red (Korean) ginseng has stronger effects than white (American); the latter is more yin/cooling. Dose: 200–400 mg/day of a standardized 4–7% ginsenoside extract. Don't take evening — can disrupt sleep.",
    combine:
      "Rarely combined — pick one. Panax Ginseng has mild antiplatelet effects and can interact with MAOIs, warfarin, and diabetes drugs; see /interactions/ginseng-and-maoi.",
    tags: ["Adaptogens", "Energy", "Cognition", "Endurance"],
  },
  {
    a: "berberine",
    b: "ceylon-cinnamon",
    topic: "Blood Sugar Support",
    bottom_line:
      "Berberine is the serious glucose-lowering supplement; Ceylon Cinnamon is a mild daily helper — they're not in the same tier.",
    why_compare:
      "Both are sold for blood sugar support and both show activity on glucose and lipid markers, but the effect sizes are very different. Berberine activates AMPK (same pathway as metformin) and has head-to-head RCTs showing HbA1c reductions comparable to metformin in newly diagnosed type-2 diabetics. Ceylon Cinnamon (true cinnamon, not cassia) has modest fasting glucose effects in some trials — helpful but not in the same clinical league.",
    when_a:
      "Pick Berberine for prediabetes, metabolic syndrome, PCOS, or fatty liver — where a real glucose-lowering effect matters. Dose: 500 mg 2–3×/day with meals; short half-life requires split dosing. Caution with diabetes medications; see /interactions for stacking concerns.",
    when_b:
      "Pick Ceylon Cinnamon as a mild daily addition — supportive, not therapeutic. Use Ceylon, not cassia (cassia contains coumarin which is hepatotoxic at higher long-term intake). Dose: 1–3 g/day.",
    combine:
      "Can combine. Berberine is the active lever; Cinnamon is supportive. Watch Berberine with prescription glucose-lowering drugs — hypoglycemia risk from additive effects.",
    tags: ["Blood Sugar", "Metabolic Health", "Diabetes", "AMPK"],
  },
  {
    a: "bcaa",
    b: "eaas",
    topic: "Amino Acids for Muscle",
    bottom_line:
      "BCAAs are 3 of the 9 essentials; EAAs include all 9 — EAAs beat BCAAs for muscle protein synthesis at the same dose.",
    why_compare:
      "This is the amino acid supplement debate. BCAAs (branched-chain: leucine, isoleucine, valine) were the standard for decades; the logic was that leucine triggers muscle protein synthesis (MPS). But MPS requires all 9 essential amino acids to actually build muscle — leucine starts the process, the other 6 are needed to complete it. Taking BCAAs alone signals MPS but limits the build.",
    when_a:
      "Pick BCAAs if you already eat a high-protein diet — BCAAs during training can reduce subjective fatigue and intra-workout soreness. Dose: 5–10 g with water during training. Don't expect big muscle benefit on top of adequate protein.",
    when_b:
      "Pick EAAs if you're supplementing amino acids specifically to build muscle and your diet is light on complete protein — EAAs (all 9) reliably stimulate and support MPS. Dose: 10–15 g per serving. More expensive but the science favors them.",
    combine:
      "No reason to combine — EAAs already contain the BCAAs. Pick one. If calorie/cost-sensitive, BCAAs; if goal is lean mass gain, EAAs.",
    tags: ["Amino Acids", "Muscle", "Protein", "Sports Nutrition"],
  },
  {
    a: "caffeine",
    b: "caffeine-theanine-stack",
    topic: "Caffeine Stacks",
    bottom_line:
      "Plain Caffeine delivers energy with jitters; Caffeine + L-Theanine delivers energy without them — the classic focus stack.",
    why_compare:
      "Caffeine alone is a bimodal experience: the alertness is good, the heart-rate rise and jitters are not. Adding L-Theanine (typically 2:1 theanine-to-caffeine ratio) smooths the curve without reducing the alertness — theanine raises alpha-wave activity and blunts sympathetic output. Head-to-head cognitive tests show the combo beats caffeine alone on sustained-attention tasks.",
    when_a:
      "Pick plain Caffeine when you specifically want the stimulant punch — a pre-workout, a tough morning, pulling an all-nighter. Dose: 100–200 mg.",
    when_b:
      "Pick Caffeine + L-Theanine for sustained focus during work or study, or if you want caffeine benefits without anxiety. Best ratio: 100 mg caffeine + 200 mg L-Theanine. Effects are smoother and last as long.",
    combine:
      "Caffeine + L-Theanine IS the combination — it's not two separate products. Most 'focus' formulas use this pairing as the base. Safe at typical doses. Standard caffeine interactions apply (medications, pregnancy, etc.).",
    tags: ["Nootropics", "Focus", "Caffeine", "Stacks"],
  },
  {
    a: "flaxseed-oil-ala",
    b: "fish-oil-epa-dha",
    topic: "Omega-3 Sources",
    bottom_line:
      "Fish Oil delivers EPA/DHA directly; Flax gives you ALA that barely converts — Fish Oil wins for non-vegans.",
    why_compare:
      "Both are promoted as 'omega-3' but biochemically they're different. Fish Oil provides EPA and DHA — the long-chain omega-3s your body actually uses. Flax (and flaxseed oil) provides ALA (alpha-linolenic acid), a short-chain omega-3 your body converts to EPA (~5–10% efficiency) and DHA (~1–5% efficiency). Unless you're a strict vegan or have a specific ALA goal, Fish Oil is dramatically more efficient.",
    when_a:
      "Pick Fish Oil for cardiovascular, cognitive, and inflammatory benefits. Look for products with IFOS certification (low oxidation, low contaminants). Dose: 1–3 g/day combined EPA+DHA. Krill oil is an alternative with better absorption but higher cost.",
    when_b:
      "Pick Flax Oil if you're vegan/vegetarian and unwilling to use algae-based EPA/DHA (algae oil is the better vegan choice). Dose: 1–2 Tbsp/day, kept refrigerated — ALA oxidizes fast. Ground flaxseed gives fiber plus ALA.",
    combine:
      "Little reason to combine if you eat fish or take fish oil; the ALA conversion doesn't meaningfully add to what EPA/DHA supplementation already provides. Both mildly anticoagulant at high doses.",
    tags: ["Omega-3", "Cardiovascular", "Vegan", "Anti-Inflammatory"],
  },
  {
    a: "rhodiola",
    b: "schisandra",
    topic: "Performance Adaptogens",
    bottom_line:
      "Rhodiola fights mental fatigue; Schisandra protects the liver and endocrine system — both used in Russian cosmonaut and Olympic programs.",
    why_compare:
      "Both are prominent in the Russian/Chinese adaptogen traditions and both have trial-level evidence for fatigue and stress performance. Rhodiola rosea is the nervous-system-focused one — it improves mental endurance under time-pressure stress. Schisandra chinensis is more of a whole-body adaptogen with distinct liver-protective and HPA-axis balancing effects.",
    when_a:
      "Pick Rhodiola for mental fatigue, mild depression, or performance-under-pressure (exam weeks, deadline sprints). Dose: 200–600 mg of a 3% rosavins extract. Morning only — can disrupt sleep if taken late.",
    when_b:
      "Pick Schisandra for liver support alongside stress management, menopause-related fatigue, or endocrine balance. Has noticeable effect on focus and stamina without being stimulating. Dose: 500–1,500 mg/day of a standardized schisandrin extract.",
    combine:
      "Can be stacked — commonly together in Russian 'performance' protocols. Mechanisms are distinct (nervous vs. hepatic focus). No drug interactions at supplement doses.",
    tags: ["Adaptogens", "Performance", "Liver", "Energy"],
  },
  {
    a: "l-arginine",
    b: "l-lysine",
    topic: "Amino Acids: Different Jobs",
    bottom_line:
      "L-Arginine fuels nitric oxide (blood flow); L-Lysine fuels collagen synthesis and antiviral activity — totally different jobs.",
    why_compare:
      "These two get confused because they're both essential-adjacent amino acids sold as supplements, but they work on completely different systems. L-Arginine is the precursor to nitric oxide — it's the main actor in vascular relaxation and blood flow. L-Lysine is a structural amino acid critical for collagen synthesis; it's also the best-evidenced supplement for suppressing herpes simplex virus recurrences.",
    when_a:
      "Pick L-Arginine for blood flow support, erectile function, or pump during training. Dose: 3–6 g pre-workout for vascular effects. Absorption is low; L-Citrulline (the precursor that converts to arginine more efficiently) is often a better pick.",
    when_b:
      "Pick L-Lysine for cold sore / HSV prevention, collagen support, or as a general amino acid for users on low-protein diets. Dose: 1,000–3,000 mg/day for HSV prophylaxis; 500–1,000 mg/day for general use.",
    combine:
      "Safe to combine but rarely needed — they solve different problems. L-Arginine and L-Lysine compete for intestinal transporters; take them 2+ hours apart if you use both. Arginine can trigger HSV outbreaks in susceptible people — avoid if you have recurrent cold sores.",
    tags: ["Amino Acids", "Circulation", "Immune", "Collagen"],
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
