/**
 * Build src/data/goal-evidence.json — what systematic reviews concluded,
 * grouped by the goal a reader searches for ("supplements for blood pressure").
 *
 * THE SOURCE. Formulate/data/evidence_directions.json in the Formulate hub:
 * per (ingredient, outcome), the DIRECTION a set of systematic reviews reached
 * (benefit / no_effect / unclear / harm), with the PMIDs and a sentence quoted
 * from one of them that the hub verified occurs in that abstract. It is the data
 * behind the supplement scores' V3.24 evidence component. Nothing here re-reads
 * or re-judges a study; this only groups rows.
 *
 * WHY NOT THE ENCYCLOPEDIA'S LETTER GRADES. An ingredient's overall grade is not
 * evidence for every use listed beside it — vitamin D can be grade A and still
 * have reviews finding no effect on a given outcome. A goal page built from
 * overall grades would put an overstated health claim on every page at once.
 * Directions are per outcome, and they include "no effect", which is worth as
 * much to a reader as "benefit" and which almost no site publishes.
 *
 *   FORMULATE_EVIDENCE=<path to evidence_directions.json> \
 *   FORMULATE_EVIDENCE_COMMIT=<hub commit the file was read at> \
 *   node scripts/build-goal-evidence.mjs
 *
 * Read the file at a COMMIT (git show <sha>:Formulate/data/evidence_directions.json),
 * not a working copy: the output records which commit it came from.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = process.env.FORMULATE_EVIDENCE;
const COMMIT = process.env.FORMULATE_EVIDENCE_COMMIT;
if (!SRC || !COMMIT) {
  console.error("set FORMULATE_EVIDENCE and FORMULATE_EVIDENCE_COMMIT (see header)");
  process.exit(2);
}
const source = JSON.parse(readFileSync(SRC, "utf8"));
const encyclopedia = JSON.parse(readFileSync("src/data/encyclopedia.json", "utf8"));

/** Goals, the outcome wording that belongs to each, and wording that looks like
 *  it belongs but does not ("oxidative stress" is not stress). `condition`
 *  marks a goal that already has a hand-written /conditions page: its evidence
 *  is attached there instead of competing with it on a second URL. */
const GOALS = [
  { slug: "blood-pressure", label: "Blood Pressure", inc: /\bblood pressure\b|\bsystolic\b|\bdiastolic\b|\bhypertension\b/, exc: /pulmonary|intraocular|portal/ },
  { slug: "cholesterol", label: "Cholesterol & Triglycerides", inc: /cholesterol|triglyceride|\blipid|\bldl\b|\bhdl\b|apolipoprotein/, exc: /peroxidation|hepatic/ },
  { slug: "blood-sugar", label: "Blood Sugar", inc: /glucose|\bhba1c\b|glycemic|glycaemic|insulin resistance|insulin sensitivity|fasting insulin|\bhoma/, exc: /insulin-like/ },
  { slug: "inflammation", label: "Inflammation", inc: /c-reactive|\bcrp\b|inflammat|interleukin|\bil-6\b|\btnf/, exc: /bowel disease|exercise/ },
  { slug: "weight", label: "Weight & Body Fat", inc: /body weight|weight loss|waist|\bbmi\b|body mass index|body fat|fat mass/, exc: /birth weight/ },
  { slug: "depression", label: "Depression", inc: /depress/, exc: /bipolar/ },
  { slug: "stress", label: "Stress & Cortisol", inc: /\bcortisol\b|perceived stress|\bstress\b/, exc: /oxidative|heat stress|incontinence|fracture/ },
  { slug: "muscle-strength", label: "Muscle Strength & Mass", inc: /muscle strength|\bstrength\b|muscle mass|hypertroph|lean (body )?mass|sarcopen/, exc: /bone strength/ },
  { slug: "exercise-recovery", label: "Exercise Recovery", inc: /soreness|muscle damage|\brecovery\b|creatine kinase/, exc: /stroke/ },
  { slug: "exercise-performance", label: "Exercise Performance", inc: /exercise performance|athletic performance|physical performance|endurance|vo2|time trial|exercise capacity|swimming performance|cycling performance/, exc: /cognitive/ },
  { slug: "bone-health", label: "Bone Health", inc: /\bbone\b|fracture|osteopor/, exc: /marrow/ },
  { slug: "liver-health", label: "Liver Health", inc: /\bliver\b|hepatic steatosis|\balt\b|\bast\b|nafld|fatty liver|transaminase/, exc: /toxicity/ },
  { slug: "memory-cognition", label: "Memory & Cognition", inc: /memory|cognit|executive function/, exc: /$^/ },
  { slug: "gut-health", label: "Gut & Digestion", inc: /diarrh|constipation|\bibs\b|irritable bowel|bloating/, exc: /$^/ },
  { slug: "heart-health", label: "Heart & Arteries", inc: /cardiovascular|endothelial|arterial stiffness|flow-mediated|coronary|atheroscl/, exc: /heart rate variability/ },
  { slug: "immune-health", label: "Colds & Immunity", inc: /common cold|respiratory infection|immune function|immune system/, exc: /$^/ },
  { slug: "mens-health", label: "Testosterone & Erectile Function", inc: /testosterone|erectile|sperm|semen/, exc: /$^/ },
  { slug: "skin-health", label: "Skin", inc: /\bskin\b|wrinkle|acne|dermatitis/, exc: /lightening|contact dermatitis|allergic skin|sensiti[sz]/ },
  { slug: "iron-anemia", label: "Iron & Anemia", inc: /ferritin|an(a)?emia|hemoglobin levels|hemoglobin \(|^hemoglobin$|hematologic/, exc: /glycated/ },
  { slug: "homocysteine", label: "Homocysteine", inc: /homocysteine/, exc: /$^/ },
  // Attached to existing hand-written condition pages rather than given a URL.
  { slug: "anxiety", label: "Anxiety", condition: "anxiety", inc: /anxiety|anxious/, exc: /$^/ },
  { slug: "sleep", label: "Sleep", condition: "insomnia", inc: /\bsleep|insomnia/, exc: /apnea|apnoea|delirium/ },
  { slug: "joint-health", label: "Joint Pain", condition: "joint-pain", inc: /joint pain|osteoarthritis|knee pain|womac|arthritis symptoms/, exc: /$^/ },
  { slug: "migraine", label: "Migraine", condition: "migraines", inc: /migraine/, exc: /$^/ },
];

/** Outcomes measured in a population a general reader is not in. A review of
 *  omega-3 in chemotherapy or of probiotics in preterm infants is real evidence,
 *  but listing it under "supplements for X" would apply it to the wrong person. */
const SPECIAL_POPULATION =
  /cancer|chemotherap|checkpoint|immunotherap|pregnan|gestation|preterm|infant|neonat|\bicu\b|critically ill|dialysis|\bhiv\b|surg|schizophren|bipolar|child|pediatric|paediatric|adolescen|cirrhosis|multiple sclerosis|parkinson|alzheimer|autism|covid|tubercul|drug.induced|antenatal|maternal|birth\b/;
/** The outcome label can omit the population the quote names: "intraventricular
 *  hemorrhage" is a preterm-infant outcome, and only the quote says so. Checked
 *  on both, erring toward leaving a finding out. */
const isSpecial = (o) => SPECIAL_POPULATION.test(o.outcome.toLowerCase()) || SPECIAL_POPULATION.test(o.quote.toLowerCase());

/** One ingredient under several names. Display name on the right. */
const CANON = {
  "Omega-3": "Omega-3 (fish oil, EPA, DHA)",
  "Omega-3 Fatty Acids": "Omega-3 (fish oil, EPA, DHA)",
  "Fish Oil": "Omega-3 (fish oil, EPA, DHA)",
  "Eicosapentaenoic Acid": "Omega-3 (fish oil, EPA, DHA)",
  "Eicosapentaenoic Acid as TG": "Omega-3 (fish oil, EPA, DHA)",
  "Docosahexaenoic Acid": "Omega-3 (fish oil, EPA, DHA)",
  "Docosahexaenoic Acid as TG": "Omega-3 (fish oil, EPA, DHA)",
  "Omega-3 DHA": "Omega-3 (fish oil, EPA, DHA)",
  "Other Omega 3s": "Omega-3 (fish oil, EPA, DHA)",
  "Krill Oil-NKO": "Omega-3 (fish oil, EPA, DHA)",
  "Cod Liver Oil": "Omega-3 (fish oil, EPA, DHA)",
  "Omega Fatty Acids": "Omega-3 (fish oil, EPA, DHA)",
  "Ascorbic Acid": "Vitamin C",
  Cholecalciferol: "Vitamin D",
  "Ashwagandha Brood-Spectrum": "Ashwagandha",
  "Rhodiola rosea": "Rhodiola",
  "L-Lysine": "Lysine",
  "Bacopa monnieri": "Bacopa",
  "Moringa oleifera": "Moringa",
  "Boswellia Serrata": "Boswellia",
  "Indian Frankincense": "Boswellia",
  "Collagen Hydrolysate": "Collagen",
  "Collagen Peptides": "Collagen",
  Methylcobalamin: "Vitamin B12",
  "Folic Acid": "Folate",
  "5-Methyltetrahydrofolate": "Folate",
  Pyridoxine: "Vitamin B6",
  Thiamine: "Vitamin B1 (thiamine)",
  "Vitamin B1": "Vitamin B1 (thiamine)",
  "Vitamin B2": "Vitamin B2 (riboflavin)",
  beetroot: "Beetroot",
  "Beet Root": "Beetroot",
  "β-Hydroxy β-Methylbutyrate": "HMB",
  NAC: "NAC (N-acetylcysteine)",
  "N-Acetyl-L-Cysteine": "NAC (N-acetylcysteine)",
  "Tongkat Ali": "Tongkat Ali",
  "Eurycoma longifolia": "Tongkat Ali",
  "Valerian Root": "Valerian",
  "Chicory Root": "Chicory",
  "Beta-Hydroxybutyrate": "Beta-Hydroxybutyrate",
  "Beta Hydroxybutyrate": "Beta-Hydroxybutyrate",
  "Myo-Inositol": "Inositol",
  "D-Chiro-Inositol": "Inositol",
  "Citrulline Malate": "L-Citrulline",
  Licorice: "Licorice",
  "Glycyrrhiza glabra": "Licorice",
  "Cinnamomum verum": "Cinnamon",
  "Vaccinium myrtillus": "Bilberry",
  "Ganoderma lucidum": "Reishi",
  "Lepidium meyenii": "Maca",
  "Taurine 98%": "Taurine",
  "Boron ††": "Boron",
  "Whey Protein": "Whey protein",
  "Hydrolyzed Whey Protein": "Whey protein",
};
/** Names that are a product category or a placeholder, not an ingredient. */
const NOT_AN_INGREDIENT = /proprietary|health probiotic|synthesis probiotic|modulating probiotic|^corn$|^brown rice$|^oyster$|^mustard$/i;

const encByName = new Map(encyclopedia.map((e) => [e.name.toLowerCase().trim(), e.slug]));
/** Link only on an exact NAME match: aliases send "Omega-3" to a branded fish oil
 *  and "Quercetin" to citrus bioflavonoids, which is a wrong page, not a near one. */
const LINK = {
  "Omega-3 (fish oil, EPA, DHA)": "omega-3",
  "Vitamin B1 (thiamine)": "thiamin",
  "Vitamin B2 (riboflavin)": "riboflavin",
  "NAC (N-acetylcysteine)": "nac",
  HMB: "calcium-hmb",
  "Whey protein": "protein",
  // Checked by hand 2026-09-17: the generic entry, not a branded or stacked one.
  "Acetyl-L-Carnitine": "acetyl-l-carnitine",
  Bacopa: "bacopa-monnieri",
  Boswellia: "boswellia",
  CoQ10: "coq10",
  Lysine: "l-lysine",
  Niacin: "niacin",
  "Vitamin B12": "vitamin-b12",
  Citicoline: "cdp-choline",
  Phosphatidylserine: "phosphatidylserine",
  "Nicotinamide Mononucleotide": "nmn",
  "Nicotinamide Riboside": "nr-nicotinamide-riboside",
  Betaine: "trimethylglycine",
  "Bacillus Coagulans": "spore-probiotics",
  Probiotics: "multi-strain-probiotic",
  "Beta-Hydroxybutyrate": "beta-hydroxybutyrate",
  "Plant Sterols": "beta-sitosterol",
  "Alpha Lipoic Acid": "alpha-lipoic-acid",
  "Milk Thistle": "milk-thistle",
  DHEA: "dhea",
  Pycnogenol: "pycnogenol",
  "Tart Cherry": "tart-cherry",
  "Grape Seed": "grape-seed-extract",
  Pomegranate: "pomegranate-extract",
  Cranberry: "cranberry-extract",
  Blueberry: "blueberry-extract",
  "Tongkat Ali": "tongkat-ali",
  Allicin: "garlic",
  Capsicum: "capsaicin",
  Gymnema: "gymnema",
  "Bitter Melon": "bitter-melon",
  "L-Leucine": "leucine",
  "2:1:1 BCAA": "bcaa",
};
const slugFor = (name) => LINK[name] ?? encByName.get(name.toLowerCase()) ?? null;
if (Object.values(LINK).some((s) => !encyclopedia.some((e) => e.slug === s))) {
  console.error("a LINK override points at a slug the encyclopedia does not have");
  process.exit(1);
}

const out = [];
const dropped = { population: 0, notIngredient: new Set() };
for (const g of GOALS) {
  const byIngredient = new Map();
  for (const row of Object.values(source.ingredients)) {
    if (!row.outcomes) continue;
    if (NOT_AN_INGREDIENT.test(row.ingredient)) { dropped.notIngredient.add(row.ingredient); continue; }
    const name = CANON[row.ingredient] ?? row.ingredient;
    for (const o of row.outcomes) {
      const text = o.outcome.toLowerCase();
      if (!g.inc.test(text) || (g.exc && g.exc.test(text))) continue;
      if (isSpecial(o)) { dropped.population++; continue; }
      if (!byIngredient.has(name)) byIngredient.set(name, { name, slug: slugFor(name), findings: [] });
      byIngredient.get(name).findings.push({
        direction: o.direction,
        outcome: o.outcome,
        as: row.ingredient === name ? undefined : row.ingredient,
        quote: o.quote,
        quote_pmid: o.quote_pmid,
        pmids: o.pmids,
      });
    }
  }
  out.push({
    slug: g.slug,
    label: g.label,
    condition: g.condition,
    ingredients: [...byIngredient.values()].sort((a, b) => a.name.localeCompare(b.name)),
  });
}

writeFileSync(
  "src/data/goal-evidence.json",
  JSON.stringify(
    {
      _source: {
        file: "Formulate/data/evidence_directions.json",
        commit: COMMIT,
        generated_at: source.generated_at,
        note: "Grouped by scripts/build-goal-evidence.mjs. Do not edit by hand; re-run the script.",
      },
      goals: out,
    },
    null,
    1,
  ) + "\n",
);
/*
 * Second output: every finding per ingredient, for the ingredient pages and the
 * review-conclusions report. Same names, same exclusions of what is not an
 * ingredient; special-population findings are KEPT but flagged, because the
 * report counts the whole dataset while pages show what applies to a general
 * reader. `goal` is the goal a finding belongs to, where one does, so a page
 * can link it.
 */
const byName = new Map();
for (const row of Object.values(source.ingredients)) {
  if (!row.outcomes) continue;
  if (NOT_AN_INGREDIENT.test(row.ingredient)) continue;
  const name = CANON[row.ingredient] ?? row.ingredient;
  if (!byName.has(name)) byName.set(name, { name, slug: slugFor(name), findings: [] });
  for (const o of row.outcomes) {
    const text = o.outcome.toLowerCase();
    const goal = GOALS.find((g) => !g.condition && g.inc.test(text) && !(g.exc && g.exc.test(text)));
    byName.get(name).findings.push({
      direction: o.direction,
      outcome: o.outcome,
      as: row.ingredient === name ? undefined : row.ingredient,
      quote: o.quote,
      quote_pmid: o.quote_pmid,
      pmids: o.pmids,
      goal: goal?.slug,
      special: isSpecial(o) || undefined,
    });
  }
}
// Totals count what the report lists: real ingredients (placeholders like
// "Proprietary" excluded), one review quoted under two names counted once.
const totals = { ingredients: byName.size, conclusions: 0, benefit: 0, no_effect: 0, unclear: 0, harm: 0 };
for (const i of byName.values()) {
  const seen = new Set();
  i.findings = i.findings.filter((x) => {
    const key = [x.direction, x.quote_pmid, x.quote].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  for (const x of i.findings) {
    totals.conclusions++;
    totals[x.direction] = (totals[x.direction] ?? 0) + 1;
  }
}
writeFileSync(
  "src/data/ingredient-evidence.json",
  JSON.stringify(
    {
      _source: {
        file: "Formulate/data/evidence_directions.json",
        commit: COMMIT,
        generated_at: source.generated_at,
        note: "Written by scripts/build-goal-evidence.mjs. Do not edit by hand; re-run the script.",
      },
      totals,
      ingredients: [...byName.values()].sort((a, b) => a.name.localeCompare(b.name)),
    },
    null,
    1,
  ) + "\n",
);
console.log("ingredient-evidence:", JSON.stringify(totals), "| canonical ingredients", byName.size, "| with a page link", [...byName.values()].filter((i) => i.slug).length);

for (const g of out) {
  const benefit = g.ingredients.filter((i) => i.findings.some((f) => f.direction === "benefit")).length;
  console.log(`${g.slug.padEnd(22)} ingredients ${String(g.ingredients.length).padStart(3)} | with a benefit ${String(benefit).padStart(2)}${g.condition ? `  -> /conditions/${g.condition}` : ""}`);
}
console.log(`dropped: ${dropped.population} special-population findings; not ingredients: ${[...dropped.notIngredient].join(", ")}`);
