/**
 * Per-nutrient narrative content for the public /nutrients/* SEO pages.
 *
 * The structural data (DV/UL/synonyms/forms) lives in nutrients.ts. This
 * module adds the human-written context the structural data alone can't
 * carry: why the nutrient matters, what foods deliver it, who's at risk
 * of running low, and what deficiency actually looks like.
 *
 * Keyed by the same `key` field as nutrients.ts. Missing entries fall
 * back to the registry-only render path on the page.
 *
 * Sources: NIH ODS fact sheets, USDA FoodData Central, Linus Pauling
 * Institute Micronutrient Information Center. Numbers are rounded to
 * representative whole-food servings — not laboratory-precise — and
 * intended to anchor reader intuition, not replace clinical assessment.
 */

export interface FoodSource {
  /** Food name as it appears in everyday speech. */
  food: string;
  /** Conventional serving size. */
  serving: string;
  /** Approximate amount of the nutrient in that serving. Include units. */
  amount: string;
}

export interface NutrientContent {
  /** 1–2 short paragraphs. Why it matters, biological role, what extremes look like. */
  key_facts: string;
  /** Notable dietary sources, ordered roughly by how much the food delivers per serving. */
  food_sources: FoodSource[];
  /** Specific signs/symptoms associated with deficiency. Keep falsifiable, not vague. */
  deficiency_signs: string[];
  /** Groups or situations where requirements rise or status commonly runs low. */
  who_needs_more: string[];
  /** Plain-English form-selection guidance. Omit when there's no meaningful choice. */
  best_form?: string;
}

export const NUTRIENT_CONTENT: Record<string, NutrientContent> = {
  vitamin_a: {
    key_facts:
      "Vitamin A exists in two distinct pools. Preformed retinoids (retinol, retinyl esters) come from animal foods and supplements and are usable as-is. Provitamin carotenoids (beta-carotene, alpha-carotene) come from orange and dark-leafy plants and are converted to retinol on demand — conversion is rate-limited by your current status, so plant sources can't easily push you into toxicity. Preformed retinol can: chronic intakes above the upper limit cause liver damage, bone loss, and during pregnancy are teratogenic. Mixed sources are safer than retinol-only megadoses.",
    food_sources: [
      { food: "Beef liver (cooked)", serving: "3 oz", amount: "6,500 mcg RAE" },
      { food: "Sweet potato (baked, with skin)", serving: "1 medium", amount: "1,400 mcg RAE" },
      { food: "Cooked spinach", serving: "1 cup", amount: "950 mcg RAE" },
      { food: "Cooked carrots", serving: "1 cup", amount: "1,300 mcg RAE" },
      { food: "Cantaloupe", serving: "1 cup cubed", amount: "270 mcg RAE" },
      { food: "Egg yolk", serving: "1 large", amount: "75 mcg RAE" },
    ],
    deficiency_signs: [
      "Night blindness — the earliest and most specific sign",
      "Dry eyes, Bitot's spots, corneal ulceration in advanced cases",
      "Increased respiratory and gastrointestinal infections",
      "Dry, scaly skin and impaired wound healing",
    ],
    who_needs_more: [
      "Cystic fibrosis and fat-malabsorption disorders (Crohn's, celiac, pancreatic insufficiency)",
      "Recent bariatric surgery — duodenal/jejunal bypass impairs absorption",
      "Strict low-fat diets that also exclude orange and leafy vegetables",
      "Premature infants and severely undernourished children",
    ],
    best_form:
      "Look for products that deliver most of the dose as beta-carotene plus a small amount of retinyl palmitate or retinyl acetate. Avoid supplements above 100% DV from preformed retinol, especially during pregnancy.",
  },

  vitamin_d: {
    key_facts:
      "Vitamin D acts more like a hormone than a classical vitamin: 25(OH)D circulates and is converted to active 1,25(OH)₂D in the kidneys, which regulates calcium absorption, bone mineralization, and immune cell behavior. Most adults in temperate latitudes do not get enough from sun exposure year-round — winter sun above ~37°N is too oblique to drive cutaneous synthesis. Diet alone rarely covers the gap. Below 20 ng/mL serum 25(OH)D is the conventional deficiency cutoff; 30–60 ng/mL is the commonly targeted sufficient range.",
    food_sources: [
      { food: "Wild salmon (cooked)", serving: "3 oz", amount: "15 mcg (600 IU)" },
      { food: "Cod liver oil", serving: "1 tsp", amount: "11 mcg (450 IU)" },
      { food: "Fortified milk", serving: "1 cup", amount: "3 mcg (120 IU)" },
      { food: "Canned sardines (with bones)", serving: "3 oz", amount: "4 mcg (165 IU)" },
      { food: "Egg yolk", serving: "1 large", amount: "1 mcg (45 IU)" },
      { food: "UV-exposed mushrooms", serving: "1 cup", amount: "10 mcg (400 IU)" },
    ],
    deficiency_signs: [
      "Bone pain, muscle weakness, frequent falls in older adults",
      "Stress fractures or low bone density on DXA",
      "Fatigue and low mood that improves with repletion (mechanism debated, association common)",
      "Severe deficiency: rickets in children, osteomalacia in adults",
    ],
    who_needs_more: [
      "Living above ~37° latitude (Boston, Madrid, Beijing) from October through March",
      "Darker skin tones — melanin reduces UVB-driven synthesis 3–6×",
      "Indoor lifestyle, sunscreen-heavy use, full-coverage clothing",
      "Older adults — skin synthesis drops ~50% by age 70",
      "Obesity — D is sequestered in adipose tissue and less bioavailable",
    ],
    best_form:
      "D3 (cholecalciferol) raises serum 25(OH)D more efficiently than D2 (ergocalciferol). Take with a fat-containing meal for absorption. K2 (MK-7) pairing is reasonable but optional.",
  },

  vitamin_e: {
    key_facts:
      "Vitamin E is a family of eight compounds — four tocopherols and four tocotrienols. Alpha-tocopherol is the form maintained in human plasma and the only one with an established RDA. Its primary job is interrupting lipid peroxidation chains in cell membranes and LDL particles. High-dose alpha-tocopherol monotherapy (>400 IU/day) has been associated with all-cause mortality increases in meta-analyses and may displace other tocopherols from circulation, so mixed-tocopherol products at modest doses are generally preferred.",
    food_sources: [
      { food: "Sunflower seeds", serving: "1 oz", amount: "7 mg" },
      { food: "Almonds", serving: "1 oz", amount: "7 mg" },
      { food: "Sunflower oil", serving: "1 tbsp", amount: "5 mg" },
      { food: "Avocado", serving: "1 medium", amount: "4 mg" },
      { food: "Hazelnuts", serving: "1 oz", amount: "4 mg" },
      { food: "Cooked spinach", serving: "1 cup", amount: "4 mg" },
    ],
    deficiency_signs: [
      "Peripheral neuropathy, ataxia, loss of position sense",
      "Skeletal myopathy with elevated CK",
      "Hemolytic anemia in premature infants",
      "Impaired immune function, particularly cell-mediated",
    ],
    who_needs_more: [
      "Fat-malabsorption disorders (cystic fibrosis, cholestatic liver disease, abetalipoproteinemia)",
      "Severe pancreatic insufficiency",
      "Very low-fat diets that exclude nuts, seeds, and seed oils",
    ],
    best_form:
      "Choose d-alpha-tocopherol with mixed tocopherols (gamma especially) over synthetic dl-alpha-tocopherol. Doses at or near the 15 mg RDA are sufficient for most adults — high-dose mono-alpha is the wrong default.",
  },

  vitamin_k: {
    key_facts:
      "Vitamin K is required to gamma-carboxylate clotting factors II, VII, IX, X and bone-matrix proteins like osteocalcin. Two natural forms differ meaningfully: K1 (phylloquinone) from leafy greens primarily supports clotting; K2 (menaquinones, MK-4 through MK-9) from fermented foods and animal products has a longer half-life and is more active in vascular and bone tissue. There's no UL because no toxicity has been observed at high intakes — but warfarin users must keep K intake stable, since K reverses the anticoagulant effect.",
    food_sources: [
      { food: "Cooked kale", serving: "1 cup", amount: "1,060 mcg K1" },
      { food: "Cooked spinach", serving: "1 cup", amount: "890 mcg K1" },
      { food: "Cooked broccoli", serving: "1 cup", amount: "220 mcg K1" },
      { food: "Natto (fermented soy)", serving: "1 oz", amount: "300 mcg K2 (MK-7)" },
      { food: "Hard cheese", serving: "1 oz", amount: "10 mcg K2" },
      { food: "Egg yolk", serving: "1 large", amount: "30 mcg K2" },
    ],
    deficiency_signs: [
      "Easy bruising, prolonged bleeding from minor cuts",
      "Heavy menstrual bleeding, nosebleeds",
      "Elevated prothrombin time (PT/INR) on a coagulation panel",
      "Newborns: hemorrhagic disease of the newborn (why a K injection is given at birth)",
    ],
    who_needs_more: [
      "Long-term broad-spectrum antibiotic use — disrupts gut flora that synthesize K2",
      "Fat-malabsorption (cystic fibrosis, biliary atresia, IBD)",
      "Very low intake of leafy greens",
      "Bone-health-focused supplementation may benefit from added MK-7",
    ],
    best_form:
      "K2 as MK-7 has a much longer half-life (~3 days) than MK-4 (~1 hour) — once-daily MK-7 dosing is practical; MK-4 needs split doses to maintain levels. K1 is well-covered if you eat cooked greens regularly.",
  },

  vitamin_b1: {
    key_facts:
      "Thiamin is required for the pyruvate dehydrogenase, alpha-ketoglutarate dehydrogenase, and transketolase reactions — without it, glucose can't fully enter the citric acid cycle and ATP production stalls in metabolically active tissues, especially the heart and brain. Body stores are small (~30 mg) and turn over in roughly two weeks, so deficiency develops faster than for most vitamins. Severe deficiency causes beriberi and Wernicke-Korsakoff syndrome.",
    food_sources: [
      { food: "Pork loin (cooked)", serving: "3 oz", amount: "0.7 mg" },
      { food: "Trout (cooked)", serving: "3 oz", amount: "0.4 mg" },
      { food: "Black beans (cooked)", serving: "1/2 cup", amount: "0.4 mg" },
      { food: "Sunflower seeds", serving: "1 oz", amount: "0.4 mg" },
      { food: "Fortified breakfast cereal", serving: "1 cup", amount: "0.4–1.5 mg" },
      { food: "Brown rice (cooked)", serving: "1 cup", amount: "0.2 mg" },
    ],
    deficiency_signs: [
      "Peripheral neuropathy with tingling and burning in feet and hands",
      "Wet beriberi: high-output cardiac failure with edema",
      "Wernicke encephalopathy: confusion, ataxia, ophthalmoplegia (an emergency)",
      "Korsakoff syndrome: severe anterograde memory loss in chronic deficiency",
    ],
    who_needs_more: [
      "Chronic heavy alcohol use — both reduces intake and impairs absorption",
      "Chronic vomiting (hyperemesis gravidarum, post-bariatric)",
      "Diuretic-dependent heart failure — urinary thiamin loss",
      "Diets dominated by polished/white rice without other thiamin sources",
    ],
    best_form:
      "Standard thiamin HCl is fine for most. Benfotiamine, a fat-soluble derivative, achieves higher tissue concentrations and is sometimes used for diabetic neuropathy.",
  },

  vitamin_b2: {
    key_facts:
      "Riboflavin is the precursor to FAD and FMN, flavin coenzymes that drive a large fraction of redox reactions in mitochondrial electron transport, fatty-acid oxidation, and glutathione regeneration. Deficiency rarely occurs in isolation — it tends to come bundled with broader B-complex undernutrition. Excess riboflavin is excreted unchanged in urine, producing the bright-yellow color B-complex users notice; this is harmless.",
    food_sources: [
      { food: "Beef liver (cooked)", serving: "3 oz", amount: "2.9 mg" },
      { food: "Fortified cereal", serving: "1 cup", amount: "0.5–1.7 mg" },
      { food: "Greek yogurt", serving: "1 cup", amount: "0.5 mg" },
      { food: "Cooked salmon", serving: "3 oz", amount: "0.5 mg" },
      { food: "Cooked spinach", serving: "1 cup", amount: "0.4 mg" },
      { food: "Almonds", serving: "1 oz", amount: "0.3 mg" },
    ],
    deficiency_signs: [
      "Cracking and inflammation at the corners of the mouth (angular cheilitis)",
      "Smooth, magenta-colored tongue (glossitis)",
      "Sore throat and cracked lips",
      "Sebborheic dermatitis around the nose and ears",
    ],
    who_needs_more: [
      "Vegan diets without fortified foods (riboflavin is concentrated in dairy and animal foods)",
      "Anorexia nervosa or other prolonged low-energy intakes",
      "Hereditary riboflavin transporter defects",
      "Migraine prophylaxis: 400 mg/day has clinical-trial support — well above the RDA",
    ],
  },

  vitamin_b3: {
    key_facts:
      "Niacin is the precursor to NAD+ and NADP+ — the most heavily used redox cofactors in the cell. The body can synthesize a small amount of niacin from tryptophan (~1 mg per 60 mg tryptophan), so frank deficiency requires both low niacin and low protein. The upper limit of 35 mg/day applies to nicotinic acid only; high-dose nicotinic acid causes intense flushing (prostaglandin-mediated) and at gram-level cardiology doses can cause hepatotoxicity. Nicotinamide and inositol hexanicotinate do not flush.",
    food_sources: [
      { food: "Cooked chicken breast", serving: "3 oz", amount: "10 mg" },
      { food: "Cooked tuna", serving: "3 oz", amount: "9 mg" },
      { food: "Cooked turkey breast", serving: "3 oz", amount: "10 mg" },
      { food: "Peanuts", serving: "1 oz", amount: "4 mg" },
      { food: "Brown rice (cooked)", serving: "1 cup", amount: "5 mg" },
      { food: "Cooked salmon", serving: "3 oz", amount: "9 mg" },
    ],
    deficiency_signs: [
      "Pellagra's classic 'three Ds': dermatitis (sun-exposed areas), diarrhea, dementia",
      "Bright-red, painful tongue",
      "Apathy, depression, irritability",
      "Death in untreated severe pellagra",
    ],
    who_needs_more: [
      "Chronic alcohol use disorder",
      "Hartnup disease (impaired tryptophan absorption)",
      "Carcinoid syndrome — tryptophan diverted to serotonin synthesis",
      "Diets dominated by untreated maize without nixtamalization (historical pellagra cause)",
    ],
    best_form:
      "Nicotinamide for a daily multivitamin (no flushing, no liver risk at common doses). Reserve nicotinic acid for medically supervised lipid management — the doses required (1.5–3 g/day) are above the UL and need monitoring.",
  },

  vitamin_b5: {
    key_facts:
      "Pantothenic acid is the structural backbone of coenzyme A and the acyl carrier protein of fatty-acid synthase. It's required for nearly every reaction that activates an acyl group — fatty acid oxidation, ketogenesis, cholesterol synthesis, heme synthesis, and acetylcholine production all depend on CoA. Because pantothenic acid is widespread in foods (the name is from Greek for 'from everywhere'), isolated deficiency is essentially never seen in normal eating patterns.",
    food_sources: [
      { food: "Beef liver (cooked)", serving: "3 oz", amount: "8 mg" },
      { food: "Sunflower seeds", serving: "1 oz", amount: "2 mg" },
      { food: "Avocado", serving: "1 medium", amount: "2 mg" },
      { food: "Cooked salmon", serving: "3 oz", amount: "1.5 mg" },
      { food: "Mushrooms (cooked)", serving: "1 cup", amount: "3 mg" },
      { food: "Cooked chicken breast", serving: "3 oz", amount: "1 mg" },
    ],
    deficiency_signs: [
      "Only seen in experimental antagonist studies and severe malnutrition",
      "Burning-feet syndrome reported in WWII POWs",
      "Fatigue, headache, irritability with mixed B-vitamin undernutrition",
    ],
    who_needs_more: [
      "Severe generalized malnutrition",
      "Specific genetic disorders of CoA synthesis (very rare)",
    ],
  },

  vitamin_b6: {
    key_facts:
      "B6 (pyridoxine, pyridoxal, pyridoxamine and their phosphate forms) is a cofactor for over 100 enzymes — most of them involved in amino-acid transamination and decarboxylation, which makes B6 central to neurotransmitter synthesis (serotonin, GABA, dopamine, norepinephrine), heme synthesis, and homocysteine regulation. Unusually for a water-soluble vitamin, B6 has a UL because chronic high doses (typically >100 mg/day for months) cause sensory neuropathy that may not fully reverse.",
    food_sources: [
      { food: "Chickpeas (cooked)", serving: "1 cup", amount: "1.1 mg" },
      { food: "Cooked tuna", serving: "3 oz", amount: "0.9 mg" },
      { food: "Cooked salmon", serving: "3 oz", amount: "0.6 mg" },
      { food: "Cooked chicken breast", serving: "3 oz", amount: "0.5 mg" },
      { food: "Banana", serving: "1 medium", amount: "0.4 mg" },
      { food: "Baked potato (with skin)", serving: "1 medium", amount: "0.4 mg" },
    ],
    deficiency_signs: [
      "Microcytic anemia (impaired heme synthesis)",
      "Peripheral neuropathy — tingling, numbness in extremities",
      "Seborrheic dermatitis, glossitis, cheilosis",
      "Confusion, depression, in severe cases seizures",
    ],
    who_needs_more: [
      "Renal disease, particularly dialysis",
      "Alcohol use disorder — acetaldehyde displaces B6 from its protein carrier",
      "Autoimmune conditions like rheumatoid arthritis",
      "Long-term isoniazid (TB), hydralazine, or oral-contraceptive use",
    ],
    best_form:
      "Pyridoxal-5-phosphate (P5P/PLP) is the active form and bypasses the conversion step. Standard pyridoxine HCl works fine for most people. Avoid chronic doses above 100 mg/day unless clinically directed — sensory neuropathy from over-supplementation is real.",
  },

  vitamin_b7: {
    key_facts:
      "Biotin is a cofactor for five carboxylase enzymes that drive gluconeogenesis, fatty-acid synthesis, branched-chain amino-acid catabolism, and odd-chain fatty-acid metabolism. Frank deficiency is rare in adults eating a normal diet because gut bacteria contribute appreciable biotin. The 'hair, skin, nails' marketing claim is heavily oversold for biotin-replete adults — supplemental megadoses (5,000–10,000 mcg, 100×+ the DV) also interfere with troponin, TSH, and many hormone immunoassays, causing dangerous lab-test errors.",
    food_sources: [
      { food: "Beef liver (cooked)", serving: "3 oz", amount: "31 mcg" },
      { food: "Egg (whole, cooked)", serving: "1 large", amount: "10 mcg" },
      { food: "Cooked salmon", serving: "3 oz", amount: "5 mcg" },
      { food: "Sunflower seeds", serving: "1 oz", amount: "2.5 mcg" },
      { food: "Almonds", serving: "1 oz", amount: "1.5 mcg" },
      { food: "Sweet potato (cooked)", serving: "1/2 cup", amount: "2.5 mcg" },
    ],
    deficiency_signs: [
      "Thinning hair, sometimes with loss of color",
      "Scaly red rash around the eyes, nose, mouth",
      "Brittle nails",
      "Neurological: depression, lethargy, paresthesias",
    ],
    who_needs_more: [
      "Long-term raw-egg-white consumption (avidin binds biotin)",
      "Long-term anticonvulsants (phenytoin, carbamazepine)",
      "Inherited biotinidase deficiency (newborn-screened)",
      "Pregnancy — modest increase in turnover",
    ],
    best_form:
      "If you take biotin, stop it at least 72 hours before lab work — high-dose biotin has caused missed heart attacks and incorrect thyroid diagnoses through assay interference.",
  },

  vitamin_b9: {
    key_facts:
      "Folate is required for one-carbon transfer reactions — DNA synthesis, methylation of DNA and proteins, and conversion of homocysteine to methionine. Adequate folate before conception and through the first trimester is the single most cost-effective intervention against neural tube defects, which is why grain fortification with folic acid was mandated in the US in 1998. Folic acid (synthetic) and methylfolate (natural/active) both work; people with reduced MTHFR activity may prefer methylfolate, but the clinical importance of MTHFR variants for healthy adults is overstated in marketing.",
    food_sources: [
      { food: "Beef liver (cooked)", serving: "3 oz", amount: "215 mcg DFE" },
      { food: "Lentils (cooked)", serving: "1/2 cup", amount: "180 mcg DFE" },
      { food: "Cooked spinach", serving: "1 cup", amount: "260 mcg DFE" },
      { food: "Asparagus (cooked)", serving: "1/2 cup", amount: "135 mcg DFE" },
      { food: "Avocado", serving: "1 medium", amount: "165 mcg DFE" },
      { food: "Fortified bread", serving: "1 slice", amount: "60 mcg DFE" },
    ],
    deficiency_signs: [
      "Macrocytic (megaloblastic) anemia — large, immature red blood cells",
      "Glossitis, mouth ulcers",
      "Fatigue, irritability, difficulty concentrating",
      "Elevated homocysteine on a serum panel",
      "Neural tube defects in offspring of deficient mothers (spina bifida, anencephaly)",
    ],
    who_needs_more: [
      "Anyone planning pregnancy — start 400 mcg/day at least 1 month preconception",
      "Pregnancy and lactation — RDA rises to 600 and 500 mcg DFE",
      "Long-term methotrexate, sulfasalazine, anti-epileptic, or trimethoprim use",
      "Alcohol use disorder",
    ],
    best_form:
      "Methylfolate (5-MTHF, L-methylfolate) is the active form and bypasses the MTHFR step. For routine prenatal use, folic acid in the standard 400–800 mcg range remains the most clinically validated. Always pair high-dose folate with B12 — folate alone can mask B12 deficiency and let neurological damage progress.",
  },

  vitamin_b12: {
    key_facts:
      "B12 is required for two reactions: methionine synthase (regenerates methionine from homocysteine, needed for methylation) and methylmalonyl-CoA mutase (in odd-chain fatty acid metabolism). Absorption is uniquely complex — it requires intrinsic factor secreted by the stomach and is taken up in the terminal ileum. Status deteriorates slowly because the liver stores ~3–5 years' worth, but once symptoms appear, neurological damage may not fully reverse even with repletion. Untreated deficiency permanently damages the spinal cord (subacute combined degeneration).",
    food_sources: [
      { food: "Clams (cooked)", serving: "3 oz", amount: "85 mcg" },
      { food: "Beef liver (cooked)", serving: "3 oz", amount: "70 mcg" },
      { food: "Cooked salmon", serving: "3 oz", amount: "4.8 mcg" },
      { food: "Beef (cooked)", serving: "3 oz", amount: "2.4 mcg" },
      { food: "Greek yogurt", serving: "1 cup", amount: "1.3 mcg" },
      { food: "Egg (whole)", serving: "1 large", amount: "0.5 mcg" },
    ],
    deficiency_signs: [
      "Macrocytic anemia identical in appearance to folate deficiency",
      "Peripheral neuropathy: numbness, tingling, glove-and-stocking distribution",
      "Loss of vibration and position sense; ataxia",
      "Cognitive changes: memory loss, confusion, sometimes misdiagnosed as dementia",
      "Glossitis with smooth, beefy-red tongue",
    ],
    who_needs_more: [
      "Vegans and most long-term vegetarians — B12 is virtually absent from plant foods",
      "Adults over 50 — atrophic gastritis reduces intrinsic factor production (~10–30% prevalence)",
      "Long-term proton pump inhibitor or metformin users",
      "Pernicious anemia, gastric bypass, ileal resection, Crohn's disease of the terminal ileum",
    ],
    best_form:
      "Methylcobalamin and adenosylcobalamin are the two coenzyme forms. Hydroxocobalamin has the longest serum half-life. Cyanocobalamin works for most healthy people but requires conversion and is usually penalized by Formulate's scoring. Sublingual or oral high-dose (1,000+ mcg) supplements work for most absorption deficits because passive uptake bypasses intrinsic factor.",
  },

  vitamin_c: {
    key_facts:
      "Vitamin C is a water-soluble antioxidant and required cofactor for collagen hydroxylase, dopamine beta-hydroxylase, and several other dioxygenases. Humans (along with other primates, guinea pigs, and bats) lost the gene to synthesize it, which is why we need it in the diet. Plasma saturates around 200 mg/day intake — additional intake is excreted. The 2,000 mg upper limit is set on GI tolerance (osmotic diarrhea), not chronic toxicity. Megadose claims for cold prevention are weakly supported; modest reductions in cold duration in habitually deficient people are the most defensible finding.",
    food_sources: [
      { food: "Red bell pepper (raw)", serving: "1 medium", amount: "150 mg" },
      { food: "Orange", serving: "1 medium", amount: "70 mg" },
      { food: "Kiwifruit", serving: "1 medium", amount: "65 mg" },
      { food: "Strawberries", serving: "1 cup", amount: "85 mg" },
      { food: "Cooked broccoli", serving: "1 cup", amount: "100 mg" },
      { food: "Brussels sprouts (cooked)", serving: "1 cup", amount: "95 mg" },
    ],
    deficiency_signs: [
      "Scurvy: bleeding gums, loose teeth, slow wound healing, perifollicular hemorrhages",
      "Corkscrew hairs, hyperkeratosis on the back of arms",
      "Fatigue, irritability, joint pain",
      "Iron-deficiency anemia (vitamin C enhances non-heme iron absorption)",
    ],
    who_needs_more: [
      "Smokers — RDA is ~35 mg higher because of increased oxidative burden",
      "Severe restrictive eating, alcohol use disorder, some hospital-fed patients",
      "Pregnancy and lactation — small bumps to RDA",
      "Wound healing and post-surgical periods (modest evidence)",
    ],
    best_form:
      "Plain ascorbic acid is fine and inexpensive. 'Buffered' mineral ascorbates (sodium, calcium, magnesium ascorbate) are gentler on the stomach. Liposomal forms achieve modestly higher plasma peaks but at meaningful cost premium. Doses above 500 mg in a single sitting are largely excreted unchanged.",
  },

  calcium: {
    key_facts:
      "Calcium is the most abundant mineral in the body — 99% sits in bone as hydroxyapatite, the remaining 1% drives muscle contraction, nerve signaling, and blood clotting. Serum calcium is held in a narrow range by parathyroid hormone, vitamin D, and calcitonin; when intake falls, the body pulls from bone to defend serum levels. Most adults can hit the RDA from food (dairy, leafy greens, fortified foods); routine supplementation above modest doses has been associated in some meta-analyses with cardiovascular risk, so total intake (food + supplements) is what matters.",
    food_sources: [
      { food: "Plain yogurt", serving: "1 cup", amount: "450 mg" },
      { food: "Milk", serving: "1 cup", amount: "300 mg" },
      { food: "Tofu (calcium-set)", serving: "1/2 cup", amount: "430 mg" },
      { food: "Canned sardines (with bones)", serving: "3 oz", amount: "325 mg" },
      { food: "Cooked collard greens", serving: "1 cup", amount: "270 mg" },
      { food: "Fortified plant milk", serving: "1 cup", amount: "300 mg" },
    ],
    deficiency_signs: [
      "Long-term: low bone density, osteoporosis, fragility fractures",
      "Muscle cramps, twitching, numbness around the mouth (acute hypocalcemia)",
      "Severe: tetany, seizures, cardiac arrhythmias",
      "Children: rickets if combined with vitamin D deficiency",
    ],
    who_needs_more: [
      "Postmenopausal women — estrogen loss accelerates bone resorption",
      "Adults over 70 — RDA rises to 1,200 mg",
      "Lactose intolerance or dairy avoidance without fortified replacements",
      "Long-term corticosteroid, anticonvulsant, or PPI use",
      "Inflammatory bowel disease, celiac, post-bariatric",
    ],
    best_form:
      "Calcium citrate absorbs equally well with or without food and is preferred for older adults on PPIs. Calcium carbonate is cheaper but needs stomach acid to absorb — take with meals. Avoid single doses above 500 mg of elemental calcium; absorption efficiency drops sharply. Pair with vitamin D for full benefit.",
  },

  magnesium: {
    key_facts:
      "Magnesium is a cofactor for over 300 enzymes — including every reaction that uses ATP (which is biologically active as Mg-ATP), DNA synthesis, and the Na/K-ATPase that maintains membrane potential. Roughly 50% of US adults consume below the EAR. Serum magnesium is poorly correlated with total body status because most magnesium is intracellular; RBC or 24-hour urine measurement gives a better picture. The unusual UL of 350 mg from supplements only (food is unrestricted) reflects that supplemental magnesium causes osmotic diarrhea well below toxic systemic levels.",
    food_sources: [
      { food: "Pumpkin seeds (raw)", serving: "1 oz", amount: "150 mg" },
      { food: "Almonds", serving: "1 oz", amount: "80 mg" },
      { food: "Cooked spinach", serving: "1 cup", amount: "160 mg" },
      { food: "Black beans (cooked)", serving: "1/2 cup", amount: "60 mg" },
      { food: "Dark chocolate (70%+)", serving: "1 oz", amount: "65 mg" },
      { food: "Avocado", serving: "1 medium", amount: "60 mg" },
    ],
    deficiency_signs: [
      "Muscle cramps, twitches, restless legs",
      "Fatigue, irritability, poor sleep quality",
      "Cardiac arrhythmias (palpitations, PVCs)",
      "Refractory hypocalcemia and hypokalemia (Mg is required for K and Ca handling)",
      "Migraine in some individuals",
    ],
    who_needs_more: [
      "Long-term PPI users (PPIs reduce intestinal magnesium absorption)",
      "Loop diuretics, thiazides — increase urinary magnesium loss",
      "Type 2 diabetes — magnesium is lost through glycosuria",
      "Alcohol use disorder, chronic diarrhea, IBD",
      "Endurance athletes with high sweat losses",
    ],
    best_form:
      "Glycinate, malate, citrate, and threonate are the well-absorbed forms. Avoid magnesium oxide and sulfate as the primary source — under 5% bioavailable, mostly laxative. Threonate has the strongest evidence for crossing the blood-brain barrier and is the niche pick for cognition; glycinate is the best general-purpose default.",
  },

  phosphorus: {
    key_facts:
      "Phosphorus is the second-most abundant mineral after calcium, with ~85% in bone as hydroxyapatite. The rest is in ATP, DNA, RNA, phospholipid membranes, and as the phosphate buffer system that helps regulate blood pH. Phosphorus is so widespread in food (especially in protein and processed-food additives) that intake routinely exceeds the RDA — supplementation is essentially never needed, and excess can drive vascular calcification in chronic kidney disease.",
    food_sources: [
      { food: "Greek yogurt", serving: "1 cup", amount: "300 mg" },
      { food: "Cooked salmon", serving: "3 oz", amount: "215 mg" },
      { food: "Cooked chicken breast", serving: "3 oz", amount: "200 mg" },
      { food: "Lentils (cooked)", serving: "1 cup", amount: "350 mg" },
      { food: "Almonds", serving: "1 oz", amount: "135 mg" },
      { food: "Eggs (whole)", serving: "1 large", amount: "100 mg" },
    ],
    deficiency_signs: [
      "Anorexia, muscle weakness, bone pain",
      "Severe (hypophosphatemia, often iatrogenic in refeeding syndrome): respiratory failure, hemolysis, rhabdomyolysis, heart failure",
      "Children: rickets",
    ],
    who_needs_more: [
      "Refeeding syndrome (severe malnutrition + rapid carb refeeding causes phosphate to crash intracellularly)",
      "Chronic alcohol use disorder",
      "Long-term phosphate-binding antacid use",
      "Diabetic ketoacidosis treatment",
    ],
  },

  potassium: {
    key_facts:
      "Potassium is the dominant intracellular cation; the steep gradient against extracellular sodium maintains resting membrane potential, drives every action potential, and is fundamental to cardiac, neural, and muscle function. The DV of 4,700 mg reflects an intake associated with lower blood pressure and stroke risk in observational data. Most US adults consume around 2,500–3,000 mg, well below the target. Supplementation above 99 mg per pill is restricted by the FDA because of the cardiac risk of acute hyperkalemia — food is the safer route.",
    food_sources: [
      { food: "Baked potato (with skin)", serving: "1 medium", amount: "925 mg" },
      { food: "Cooked salmon", serving: "3 oz", amount: "535 mg" },
      { food: "Banana", serving: "1 medium", amount: "420 mg" },
      { food: "White beans (cooked)", serving: "1/2 cup", amount: "600 mg" },
      { food: "Cooked spinach", serving: "1 cup", amount: "840 mg" },
      { food: "Avocado", serving: "1 medium", amount: "700 mg" },
    ],
    deficiency_signs: [
      "Muscle weakness, cramping, fatigue",
      "Constipation",
      "Cardiac arrhythmias (palpitations, ECG changes — flattened T waves, U waves)",
      "Severe (hypokalemia): paralysis, rhabdomyolysis, life-threatening arrhythmia",
    ],
    who_needs_more: [
      "Loop diuretic and thiazide users (without potassium-sparing pairing)",
      "Chronic vomiting or diarrhea",
      "Anyone with hypertension who hasn't optimized food potassium",
      "Endurance athletes with very high sweat losses (uncommon as a primary deficit)",
    ],
    best_form:
      "Increase food intake first — DASH-style eating (vegetables, fruits, beans, dairy) routinely doubles potassium without supplement risk. If a clinician prescribes potassium chloride or citrate, follow their dosing closely; potassium supplementation can cause arrhythmias in renal-impaired patients.",
  },

  sodium: {
    key_facts:
      "Sodium is the dominant extracellular cation and indispensable — it sets plasma volume, drives nerve and muscle action potentials, and underlies most active transport at the cell membrane. The deficiency case is essentially never the issue in the modern food supply; the issue is excess. Average US intake is ~3,400 mg/day against a 2,300 mg target. Reducing sodium lowers blood pressure on average, with larger benefits in salt-sensitive populations (older adults, Black Americans, people with hypertension or kidney disease).",
    food_sources: [
      { food: "Restaurant entrees (most)", serving: "1 serving", amount: "1,000–2,500 mg" },
      { food: "Bread (most commercial)", serving: "1 slice", amount: "150 mg" },
      { food: "Soy sauce", serving: "1 tbsp", amount: "900 mg" },
      { food: "Canned soup", serving: "1 cup", amount: "700 mg" },
      { food: "Cottage cheese", serving: "1/2 cup", amount: "400 mg" },
      { food: "Salted nuts", serving: "1 oz", amount: "100–200 mg" },
    ],
    deficiency_signs: [
      "True dietary deficiency essentially never occurs in unrestricted eaters",
      "Hyponatremia from excessive water intake during endurance events: nausea, headache, confusion, seizures",
      "Hyponatremia from SIADH or thiazide use: lethargy, falls in older adults",
    ],
    who_needs_more: [
      "Endurance athletes during multi-hour events in heat (use electrolyte mix, not pure water)",
      "People with adrenal insufficiency, salt-wasting nephropathy",
      "Specific clinical situations directed by a physician",
    ],
    best_form:
      "Most readers should be reducing sodium, not supplementing it. Read labels — 'low sodium' = ≤140 mg/serving, 'reduced sodium' = at least 25% less than the original. Total sodium targets matter more than salt-shaker behavior; ~75% of dietary sodium comes from packaged and restaurant food.",
  },

  iron: {
    key_facts:
      "Iron is the heme center of hemoglobin and myoglobin (oxygen transport) and the iron-sulfur clusters of the electron transport chain. The body has no regulated way to excrete iron — once absorbed, it stays unless lost through bleeding, sweat, or sloughed cells — so absorption is tightly controlled by hepcidin in response to body iron stores. Heme iron (animal) is absorbed at 15–35% efficiency; non-heme iron (plant) at 2–20% and is inhibited by phytates, calcium, and tannins, and enhanced by vitamin C. Iron supplements taken when stores are already replete cause oxidative damage, GI distress, and constipation; check ferritin before starting one.",
    food_sources: [
      { food: "Beef (cooked)", serving: "3 oz", amount: "2.5 mg heme" },
      { food: "Chicken liver (cooked)", serving: "3 oz", amount: "11 mg heme" },
      { food: "Lentils (cooked)", serving: "1 cup", amount: "6.5 mg non-heme" },
      { food: "Spinach (cooked)", serving: "1 cup", amount: "6.5 mg non-heme" },
      { food: "Tofu", serving: "1/2 cup", amount: "3 mg non-heme" },
      { food: "Pumpkin seeds", serving: "1 oz", amount: "2 mg non-heme" },
    ],
    deficiency_signs: [
      "Fatigue, exercise intolerance, shortness of breath on exertion",
      "Pallor of skin, conjunctivae, nail beds",
      "Pica (craving ice, dirt, paper) — surprisingly specific for iron deficiency",
      "Restless legs, brittle/spoon-shaped nails (koilonychia)",
      "Microcytic, hypochromic anemia on a CBC",
    ],
    who_needs_more: [
      "Menstruating women — RDA is 18 mg vs 8 mg for men",
      "Pregnancy — RDA jumps to 27 mg",
      "Endurance athletes (foot-strike hemolysis, sweat loss, hepcidin elevation)",
      "Vegetarians/vegans — non-heme iron is less bioavailable; effective requirement ~1.8× higher",
      "Frequent blood donors, GI bleeding, post-bariatric, celiac",
    ],
    best_form:
      "Ferrous bisglycinate is the best-tolerated chelated form and well-absorbed at lower elemental doses. Ferrous sulfate is the cheapest and clinically validated but causes constipation and GI distress in many users. Take on an empty stomach with vitamin C; avoid taking with calcium, coffee, or tea. Alternate-day dosing achieves similar repletion with better tolerability.",
  },

  zinc: {
    key_facts:
      "Zinc is a structural and catalytic component of more than 300 enzymes and transcription factors. It's central to immune function (T-cell development, NK activity), wound healing, taste perception, sperm production, and growth. There's no major body store, so deficiency develops within weeks of inadequate intake. Long-term high-dose supplementation (>40 mg/day) induces copper deficiency by upregulating intestinal metallothionein — neurological copper deficiency from chronic zinc lozenge use is a well-documented case-report cluster.",
    food_sources: [
      { food: "Oysters (cooked)", serving: "3 oz", amount: "75 mg" },
      { food: "Beef (cooked)", serving: "3 oz", amount: "7 mg" },
      { food: "Crab (cooked)", serving: "3 oz", amount: "6.5 mg" },
      { food: "Pumpkin seeds", serving: "1 oz", amount: "2 mg" },
      { food: "Cashews", serving: "1 oz", amount: "1.6 mg" },
      { food: "Chickpeas (cooked)", serving: "1 cup", amount: "2.5 mg" },
    ],
    deficiency_signs: [
      "Frequent infections, slow wound healing",
      "Loss of taste and smell (hypogeusia, hyposmia)",
      "Hair loss, brittle nails with white spots",
      "Diarrhea, dermatitis around mouth/eyes/anus",
      "Children: growth failure, delayed sexual maturation",
    ],
    who_needs_more: [
      "Vegetarians/vegans (phytates inhibit absorption; effective requirement ~50% higher)",
      "Pregnancy and lactation (modest RDA increase)",
      "Older adults — both lower intake and reduced absorption",
      "Sickle cell disease, IBD, chronic diarrhea, alcohol use disorder",
      "After bariatric surgery",
    ],
    best_form:
      "Zinc bisglycinate, picolinate, and citrate are well-absorbed. Avoid zinc oxide as the primary form — bioavailability is low. Don't run high doses (>40 mg) for more than a few weeks without paired copper or lab monitoring. For immune support during a cold, zinc acetate or gluconate lozenges are the best-supported delivery.",
  },

  copper: {
    key_facts:
      "Copper is required for cytochrome c oxidase (the terminal step of the electron transport chain), Cu-Zn superoxide dismutase, ceruloplasmin (iron transport), lysyl oxidase (collagen and elastin cross-linking), and dopamine beta-hydroxylase. The most common cause of copper deficiency in modern populations is over-supplementation with zinc — which is why a copper-to-zinc ratio matters in any high-zinc protocol. Wilson's disease (genetic copper accumulation) is the rare flip side and requires copper restriction.",
    food_sources: [
      { food: "Beef liver (cooked)", serving: "3 oz", amount: "12 mg" },
      { food: "Oysters (cooked)", serving: "3 oz", amount: "4 mg" },
      { food: "Cashews", serving: "1 oz", amount: "0.6 mg" },
      { food: "Sunflower seeds", serving: "1 oz", amount: "0.5 mg" },
      { food: "Dark chocolate (70%+)", serving: "1 oz", amount: "0.5 mg" },
      { food: "Cooked shiitake mushrooms", serving: "1/2 cup", amount: "0.65 mg" },
    ],
    deficiency_signs: [
      "Anemia that looks like iron deficiency but doesn't respond to iron",
      "Neutropenia (low white blood cell count)",
      "Myelopathy: gait instability, paresthesias, sensory ataxia (looks like B12 deficiency)",
      "Hypopigmentation of hair and skin",
      "Connective tissue weakness, vascular fragility",
    ],
    who_needs_more: [
      "Anyone supplementing high-dose zinc (>40 mg/day) without paired copper",
      "Bariatric surgery patients, especially gastric bypass",
      "Long-term denture-cream users (older formulas contained zinc that displaced copper)",
      "Severe malabsorption, celiac, IBD",
    ],
    best_form:
      "Copper bisglycinate or copper sulfate at 1–2 mg/day is sufficient as a counterweight to zinc supplementation. A common ratio is 1 mg copper per 10–15 mg zinc when both are supplemented chronically.",
  },

  manganese: {
    key_facts:
      "Manganese is a cofactor for manganese-superoxide dismutase (MnSOD, the mitochondrial antioxidant defense), arginase, glutamine synthetase, and pyruvate carboxylase. Deficiency is rare in unrestricted diets — manganese is widespread in plant foods, particularly whole grains and tea. Excessive intake (almost always occupational, from welding fumes or contaminated water) causes a Parkinson-like neurological syndrome called manganism.",
    food_sources: [
      { food: "Mussels (cooked)", serving: "3 oz", amount: "5.8 mg" },
      { food: "Brown rice (cooked)", serving: "1 cup", amount: "2 mg" },
      { food: "Oats (cooked)", serving: "1 cup", amount: "1.5 mg" },
      { food: "Pineapple", serving: "1 cup", amount: "1.5 mg" },
      { food: "Black tea (brewed)", serving: "1 cup", amount: "0.5 mg" },
      { food: "Spinach (cooked)", serving: "1 cup", amount: "1.7 mg" },
    ],
    deficiency_signs: [
      "Documented mainly in experimental depletion: rash, mood changes, slowed hair/nail growth",
      "Possibly impaired bone mineralization in long-term low intakes",
    ],
    who_needs_more: [
      "Severely restricted parenteral nutrition without trace-mineral supplementation",
      "Cholestatic liver disease (paradoxically: manganese accumulates in the brain)",
    ],
    best_form:
      "Most multivitamins include 1–2 mg manganese, which is plenty. Standalone manganese supplementation is rarely indicated — chronic high-dose intake risks manganism.",
  },

  selenium: {
    key_facts:
      "Selenium is incorporated as selenocysteine into ~25 selenoproteins, including the glutathione peroxidases (antioxidant defense), thioredoxin reductases, and the deiodinases that convert thyroid prohormone T4 into active T3. Soil selenium varies wildly by geography — Brazil-nut content can swing 10× between regions. The UL is among the lowest of any nutrient (400 mcg) because selenosis (hair/nail loss, GI distress, neuropathy) develops at chronic intakes around 1,000 mcg/day. A few unmonitored Brazil nuts a day can cross that.",
    food_sources: [
      { food: "Brazil nuts", serving: "1 nut", amount: "70–90 mcg" },
      { food: "Yellowfin tuna (cooked)", serving: "3 oz", amount: "90 mcg" },
      { food: "Cooked sardines", serving: "3 oz", amount: "45 mcg" },
      { food: "Cooked beef", serving: "3 oz", amount: "30 mcg" },
      { food: "Cooked chicken breast", serving: "3 oz", amount: "20 mcg" },
      { food: "Eggs (whole)", serving: "1 large", amount: "15 mcg" },
    ],
    deficiency_signs: [
      "Keshan disease — cardiomyopathy described in selenium-poor regions of China",
      "Kashin-Beck disease — chronic joint disease in selenium-poor areas",
      "Hypothyroidism (impaired T4-to-T3 conversion)",
      "Increased susceptibility to certain viral infections",
    ],
    who_needs_more: [
      "Living in regions with selenium-poor soil who eat only locally grown food",
      "HIV infection — depletion is common and contributes to disease progression",
      "Severe GI disease with prolonged total parenteral nutrition",
      "Hashimoto's thyroiditis — modest evidence for autoantibody reduction",
    ],
    best_form:
      "Selenomethionine (organic, well-absorbed, builds tissue stores) is preferred over sodium selenite or sodium selenate. Two Brazil nuts most days will hit the RDA without a supplement. Don't stack multiple selenium-containing supplements with daily Brazil-nut intake — selenosis is real.",
  },

  iodine: {
    key_facts:
      "Iodine has one job in humans — synthesis of the thyroid hormones T3 and T4 — and its absence causes the most preventable cause of intellectual disability worldwide. Universal salt iodization eliminated endemic goiter and cretinism in most developed countries by the mid-20th century. Two trends in wealthy countries are quietly reintroducing risk: artisan/sea/Himalayan salts that aren't iodized, and dairy reduction (milk is a major source through iodophor sanitization residues and iodine-supplemented animal feed).",
    food_sources: [
      { food: "Kelp (dried)", serving: "1 g", amount: "15–3,000 mcg (highly variable)" },
      { food: "Cod (cooked)", serving: "3 oz", amount: "100 mcg" },
      { food: "Iodized salt", serving: "1/4 tsp", amount: "75 mcg" },
      { food: "Milk", serving: "1 cup", amount: "85 mcg" },
      { food: "Egg (whole)", serving: "1 large", amount: "25 mcg" },
      { food: "Plain yogurt", serving: "1 cup", amount: "75 mcg" },
    ],
    deficiency_signs: [
      "Goiter (visible thyroid enlargement)",
      "Hypothyroidism: fatigue, weight gain, cold intolerance, dry skin, hair loss",
      "In pregnancy: maternal hypothyroidism, intellectual disability and cretinism in offspring",
      "Children: growth and cognitive delay",
    ],
    who_needs_more: [
      "Pregnancy and lactation — RDA rises to 220 and 290 mcg",
      "Vegan and dairy-free diets without iodized salt or sea vegetables",
      "Habitual use of artisan, kosher, sea, or pink salts (most are not iodized)",
      "Living in iodine-deficient regions (mountainous, glaciated soil)",
    ],
    best_form:
      "Potassium iodide (from a multivitamin or prenatal at 150 mcg) is reliable. Kelp-based supplements vary 100× in iodine content batch-to-batch and can deliver doses far above the UL. Pregnant and breastfeeding women should specifically check that their prenatal contains iodine — many do not.",
  },

  chromium: {
    key_facts:
      "Chromium has been promoted aggressively for blood sugar control and weight loss; the evidence is weaker than the marketing implies. Trials of chromium picolinate at 200–1,000 mcg show modest, inconsistent effects on insulin sensitivity in people with prediabetes or type 2 diabetes, with no clear benefit in metabolically healthy adults. There is no known frank deficiency syndrome in humans outside of a few historical TPN cases. The DV exists, but realistic supplementation upside is small.",
    food_sources: [
      { food: "Broccoli (cooked)", serving: "1/2 cup", amount: "11 mcg" },
      { food: "Grape juice", serving: "1 cup", amount: "8 mcg" },
      { food: "Whole-wheat English muffin", serving: "1", amount: "4 mcg" },
      { food: "Beef (cooked)", serving: "3 oz", amount: "2 mcg" },
      { food: "Brewer's yeast", serving: "1 tbsp", amount: "10 mcg" },
    ],
    deficiency_signs: [
      "Reported only in long-term chromium-free total parenteral nutrition: glucose intolerance, peripheral neuropathy, weight loss",
      "No reliable deficiency biomarker exists for outpatient assessment",
    ],
    who_needs_more: [
      "Long-term total parenteral nutrition without trace-mineral supplementation",
      "Otherwise: not clearly indicated — claimed benefits in healthy adults are not well supported",
    ],
    best_form:
      "Chromium picolinate is the most studied. If you supplement, 200 mcg/day is a reasonable starting dose; benefits are most plausible in people with existing insulin resistance.",
  },

  molybdenum: {
    key_facts:
      "Molybdenum is the cofactor for sulfite oxidase, xanthine oxidase, and aldehyde oxidase — three enzymes that handle sulfur metabolism, purine catabolism, and various detoxification reactions. Dietary molybdenum is abundant in legumes, grains, and water — frank deficiency is essentially nonexistent outside of specific genetic enzyme defects. The 2,000 mcg UL is set with a wide margin; routine intakes are ~50–500 mcg/day depending on local soil.",
    food_sources: [
      { food: "Black-eyed peas (cooked)", serving: "1 cup", amount: "550 mcg" },
      { food: "Lima beans (cooked)", serving: "1 cup", amount: "140 mcg" },
      { food: "Lentils (cooked)", serving: "1 cup", amount: "75 mcg" },
      { food: "Oats (cooked)", serving: "1 cup", amount: "20 mcg" },
      { food: "Eggs (whole)", serving: "1 large", amount: "5 mcg" },
      { food: "Plain yogurt", serving: "1 cup", amount: "10 mcg" },
    ],
    deficiency_signs: [
      "Inherited molybdenum cofactor deficiency: neonatal seizures, developmental delay (extremely rare)",
      "Acquired deficiency reported only in exceptional TPN cases",
    ],
    who_needs_more: [
      "Long-term TPN without trace minerals",
      "Otherwise: routine supplementation is not indicated",
    ],
  },

  glycine: {
    key_facts:
      "Glycine is the smallest amino acid and triple-jobbed: it's an inhibitory neurotransmitter in the spinal cord and brainstem, the most abundant amino acid in collagen (33% of all collagen residues), and a precursor to glutathione, heme, creatine, and bile acids. The body can synthesize glycine, but at a rate that probably falls short of total demand — particularly when collagen turnover is high. Three grams before bed is the most-studied dose for sleep depth and morning alertness.",
    food_sources: [
      { food: "Bone broth", serving: "1 cup", amount: "0.5–2 g" },
      { food: "Pork rinds", serving: "1 oz", amount: "1.5 g" },
      { food: "Chicken skin (cooked)", serving: "1 oz", amount: "1.2 g" },
      { food: "Gelatin powder", serving: "1 tbsp", amount: "2 g" },
      { food: "Cooked salmon", serving: "3 oz", amount: "1 g" },
      { food: "Beef (cooked)", serving: "3 oz", amount: "1.2 g" },
    ],
    deficiency_signs: [
      "No classical deficiency syndrome — glycine is conditionally essential",
      "Chronic suboptimal intake may contribute to poor connective tissue repair, low glutathione, sleep fragmentation",
    ],
    who_needs_more: [
      "Diets that exclude collagen-rich tissues (skin, bone, connective tissue)",
      "Heavy training/recovery loads with high collagen turnover",
      "Sleep depth and onset (clinical-trial-supported at 3 g pre-sleep)",
    ],
    best_form:
      "Plain L-glycine powder is cheap, dissolves easily, and tastes mildly sweet. 3 g 30–60 minutes before bed is the canonical sleep-quality dose.",
  },

  taurine: {
    key_facts:
      "Taurine is conditionally essential — most adults can synthesize enough from cysteine and methionine, but synthesis declines with age and is impaired in some clinical states. It's the most abundant free amino acid in the heart and skeletal muscle and plays a role in osmoregulation, bile-acid conjugation, calcium signaling, and antioxidant defense. A 2023 paper in *Science* reported that taurine declines with age in mammals and that supplementation extended lifespan in mice and improved several aging biomarkers in monkeys — clinical extrapolation is still tentative.",
    food_sources: [
      { food: "Scallops (cooked)", serving: "3 oz", amount: "830 mg" },
      { food: "Mussels (cooked)", serving: "3 oz", amount: "655 mg" },
      { food: "Cooked turkey", serving: "3 oz", amount: "300 mg" },
      { food: "Cooked beef", serving: "3 oz", amount: "60 mg" },
      { food: "Cooked salmon", serving: "3 oz", amount: "130 mg" },
    ],
    deficiency_signs: [
      "Cats develop dilated cardiomyopathy on taurine-deficient diets — humans don't, but this is the canonical mammalian deficiency syndrome",
      "Possible role in retinal and cardiac dysfunction in chronic dialysis patients",
      "No specific outpatient deficiency syndrome described in healthy adults",
    ],
    who_needs_more: [
      "Strict vegans (plant taurine content is negligible)",
      "Older adults — endogenous taurine declines with age",
      "Patients with chronic kidney disease, diabetes, or cardiac dysfunction (under clinical guidance)",
    ],
    best_form:
      "L-taurine powder or capsules at 1–3 g/day is the conventional range. Well-tolerated; no UL established.",
  },

  l_theanine: {
    key_facts:
      "L-Theanine is a non-protein amino acid concentrated in tea (especially shade-grown matcha and gyokuro). It crosses the blood-brain barrier and increases alpha-wave activity on EEG within ~30 minutes — the neural correlate of relaxed alertness. Its most reliable acute effect is attenuating the jitter and stress response from caffeine without reducing the alertness benefit; pairing 100 mg L-theanine with 50–100 mg caffeine has clinical-trial support for cognitive tasks under load. It's not a sedative.",
    food_sources: [
      { food: "Matcha green tea", serving: "1 cup", amount: "20–45 mg" },
      { food: "Brewed green tea", serving: "1 cup", amount: "8–25 mg" },
      { food: "Brewed black tea", serving: "1 cup", amount: "5–15 mg" },
      { food: "Brewed white tea", serving: "1 cup", amount: "5–15 mg" },
    ],
    deficiency_signs: [
      "Not an essential nutrient — no deficiency state",
    ],
    who_needs_more: [
      "Anyone using caffeine for performance who doesn't tolerate the jitter or anxiety component",
      "Pre-meeting / pre-presentation calm-focus protocols",
      "Sleep-onset support at 200–400 mg (modest evidence; works for some)",
    ],
    best_form:
      "Suntheanine is a patented, consistent L-theanine and the form used in most clinical trials. 100–200 mg is the typical dose. Pairs cleanly with caffeine in a 2:1 theanine:caffeine ratio.",
  },

  nac: {
    key_facts:
      "N-acetyl-cysteine is the rate-limiting precursor to glutathione, the body's master antioxidant tripeptide. It's been used clinically for decades — at gram doses to break up mucus in cystic fibrosis and as the standard antidote for acetaminophen overdose. Outside acute medicine, NAC has clinical-trial support for psychiatric uses (trichotillomania, OCD, bipolar depression as adjunct) and PCOS, with weaker evidence for general respiratory and cognitive benefit. The FDA briefly contested NAC's supplement status in 2020 (it's a registered drug for inhalation use); it remains widely sold as a supplement.",
    food_sources: [
      { food: "NAC isn't directly in food", serving: "—", amount: "—" },
      { food: "Cysteine sources: poultry, eggs", serving: "3 oz / 1 egg", amount: "200–300 mg cysteine" },
      { food: "Whey protein", serving: "1 scoop", amount: "300+ mg cysteine" },
      { food: "Allium vegetables (garlic, onions)", serving: "1 clove", amount: "Sulfur compounds, indirect" },
    ],
    deficiency_signs: [
      "Not an essential nutrient — body synthesizes glutathione from dietary cysteine",
      "Glutathione depletion (low intake, oxidative load): increased susceptibility to oxidative damage, slower recovery from exposures",
    ],
    who_needs_more: [
      "Acetaminophen overdose (clinical/emergency setting)",
      "Cystic fibrosis, COPD with thick mucus production",
      "Adjunct use in trichotillomania, OCD, bipolar depression (psychiatric guidance)",
      "PCOS (small trials supportive)",
    ],
    best_form:
      "N-acetyl-cysteine (NAC) at 600–1,200 mg/day in divided doses. Take on an empty stomach for absorption. Sulfur smell is normal. Don't combine with nitroglycerin without medical supervision.",
  },

  l_arginine: {
    key_facts:
      "L-Arginine is the substrate for nitric oxide synthase, which produces NO — the primary endothelial vasodilator. Oral arginine raises plasma arginine but its effect on NO is blunted by intestinal and liver metabolism (first-pass arginase). Citrulline supplementation often raises plasma arginine more effectively than arginine itself. Clinical-trial evidence is mixed for blood-flow and exercise outcomes; arginine has stronger evidence in clinical situations like erectile dysfunction (5 g/day) and pre-eclampsia prevention than for general performance.",
    food_sources: [
      { food: "Pumpkin seeds", serving: "1 oz", amount: "1.4 g" },
      { food: "Cooked turkey", serving: "3 oz", amount: "2 g" },
      { food: "Cooked chicken breast", serving: "3 oz", amount: "1.9 g" },
      { food: "Cooked salmon", serving: "3 oz", amount: "1.5 g" },
      { food: "Lentils (cooked)", serving: "1 cup", amount: "1.3 g" },
      { food: "Peanuts", serving: "1 oz", amount: "0.9 g" },
    ],
    deficiency_signs: [
      "Conditionally essential — adults rarely become deficient on a normal protein intake",
      "Inherited urea cycle disorders cause arginine deficiency with hyperammonemia",
    ],
    who_needs_more: [
      "Erectile dysfunction (5 g/day, modest effect)",
      "Pre-eclampsia prevention (under obstetric guidance)",
      "Wound healing and post-surgical recovery (clinical trials use 6–12 g)",
      "Severely catabolic states (burns, sepsis — clinical use)",
    ],
    best_form:
      "L-arginine HCl or arginine alpha-ketoglutarate at 3–6 g/day. For NO support in healthy adults, citrulline often outperforms arginine on a per-gram basis. Don't combine with PDE-5 inhibitors (Viagra, Cialis) without medical supervision — additive hypotension.",
  },

  l_citrulline: {
    key_facts:
      "L-Citrulline is converted to arginine in the kidneys, bypassing the intestinal arginase that limits oral arginine's effectiveness. Gram-for-gram, citrulline raises plasma arginine more reliably than arginine itself. Best-supported use is exercise: 6–8 g of citrulline malate ~60 minutes before training has clinical-trial evidence for delayed muscle fatigue, more reps to failure, and reduced post-exercise soreness. Effects on resting blood pressure are modest. Citrulline malate's '2:1' or '1:1' ratio matters less than total citrulline content.",
    food_sources: [
      { food: "Watermelon (especially rind)", serving: "1 cup", amount: "0.5–1.5 g" },
      { food: "Pumpkin", serving: "1 cup cooked", amount: "0.3 g" },
      { food: "Bitter melon", serving: "1 cup", amount: "0.4 g" },
      { food: "Cucumber", serving: "1 cup", amount: "0.05 g" },
    ],
    deficiency_signs: [
      "Not essential — body produces citrulline as a urea-cycle intermediate",
      "Citrullinemia (rare genetic disorder) causes accumulation, not deficiency",
    ],
    who_needs_more: [
      "Resistance and endurance athletes seeking acute training effect",
      "Erectile function support (1.5 g/day citrulline outperforms similar arginine doses in small trials)",
      "Mild hypertension, modest benefit",
    ],
    best_form:
      "L-citrulline (free form) at 3–6 g, or citrulline malate at 6–8 g, 60 minutes pre-workout. Free-form L-citrulline is the cleaner pick if you don't need malate. Doses above 10 g cause GI distress for many.",
  },

  l_carnitine: {
    key_facts:
      "L-Carnitine shuttles long-chain fatty acids across the inner mitochondrial membrane for beta-oxidation. The body synthesizes carnitine from lysine and methionine; vegetarians have lower body stores but rarely become deficient. Acetyl-L-carnitine (ALCAR) crosses the blood-brain barrier and has been studied for cognitive aging, peripheral neuropathy, and depression. A 2013 meta-analysis raised concern that gut bacteria convert carnitine to TMAO (a cardiovascular risk biomarker) — clinical significance for healthy supplement users is contested.",
    food_sources: [
      { food: "Beef (cooked)", serving: "3 oz", amount: "85 mg" },
      { food: "Pork (cooked)", serving: "3 oz", amount: "25 mg" },
      { food: "Cod (cooked)", serving: "3 oz", amount: "5 mg" },
      { food: "Whole milk", serving: "1 cup", amount: "8 mg" },
      { food: "Chicken breast (cooked)", serving: "3 oz", amount: "3 mg" },
    ],
    deficiency_signs: [
      "Primary carnitine deficiency (genetic OCTN2 mutations): cardiomyopathy, hypoketotic hypoglycemia, muscle weakness",
      "Secondary deficiency in renal dialysis, valproate use, prematurity",
      "Vegetarian/vegan diets show lower stores but usually no clinical syndrome",
    ],
    who_needs_more: [
      "Hemodialysis patients (carnitine is dialyzed out)",
      "Long-term valproate or pivampicillin use",
      "Diabetic peripheral neuropathy (ALCAR has trial support)",
      "Older adults with fatigue and cognitive complaints (modest evidence)",
    ],
    best_form:
      "L-carnitine tartrate (gym/recovery), L-carnitine fumarate, or acetyl-L-carnitine (cognition and neuropathy). 500–2,000 mg/day in divided doses. Take on empty stomach for absorption.",
  },

  l_glutamine: {
    key_facts:
      "Glutamine is the most abundant free amino acid in plasma and the primary fuel for enterocytes (gut lining cells) and rapidly dividing immune cells. It's produced in skeletal muscle and consumed quickly during catabolic stress — burns, sepsis, post-surgery — which is why clinical glutamine supplementation has trial support for hospitalized patients. The 'leaky gut' marketing case for healthy adults outpaces the evidence: glutamine is conditionally essential, and well-fed people without acute illness rarely become deficient.",
    food_sources: [
      { food: "Beef (cooked)", serving: "3 oz", amount: "1.5 g" },
      { food: "Eggs (whole)", serving: "1 large", amount: "0.5 g" },
      { food: "Cottage cheese", serving: "1/2 cup", amount: "1.5 g" },
      { food: "Tofu", serving: "1/2 cup", amount: "0.7 g" },
      { food: "White rice (cooked)", serving: "1 cup", amount: "0.3 g" },
      { food: "Cooked salmon", serving: "3 oz", amount: "1 g" },
    ],
    deficiency_signs: [
      "No standard outpatient deficiency syndrome — body makes it",
      "Severely catabolic states (burns, sepsis, ICU) deplete plasma glutamine and benefit from clinical supplementation",
    ],
    who_needs_more: [
      "Burn injury, surgery, sepsis, ICU stays (clinical use)",
      "IBS, IBD with ongoing symptoms (modest evidence as an adjunct)",
      "Endurance athletes during heavy-volume blocks (URTI risk)",
    ],
    best_form:
      "L-glutamine free-form powder at 5 g/day is the conventional starting dose. For clinical IBD/IBS protocols, 5–10 g in divided doses with food. Don't take if you have liver cirrhosis or hepatic encephalopathy — glutamine elevates ammonia.",
  },

  l_tyrosine: {
    key_facts:
      "L-Tyrosine is the precursor to dopamine, norepinephrine, epinephrine, and thyroid hormones. The strongest case for supplementation is acute cognitive performance under stress — military and lab studies show 100–150 mg/kg roughly an hour before a stressor (sleep deprivation, cold exposure, multitasking under threat) helps maintain working memory and reaction time. There's no clear chronic-supplementation benefit in healthy, non-stressed adults; the brain's tyrosine supply is normally adequate.",
    food_sources: [
      { food: "Cooked chicken breast", serving: "3 oz", amount: "1 g" },
      { food: "Cooked beef", serving: "3 oz", amount: "1 g" },
      { food: "Cooked salmon", serving: "3 oz", amount: "0.8 g" },
      { food: "Pumpkin seeds", serving: "1 oz", amount: "0.4 g" },
      { food: "Almonds", serving: "1 oz", amount: "0.5 g" },
      { food: "Plain yogurt", serving: "1 cup", amount: "0.5 g" },
    ],
    deficiency_signs: [
      "Phenylketonuria (PKU): can't make tyrosine from phenylalanine — needs dietary tyrosine supplementation",
      "Otherwise: not a classical deficiency state",
    ],
    who_needs_more: [
      "Acute stressors that tax working memory: sleep deprivation, cold exposure, sustained vigilance tasks",
      "PKU (clinical management)",
      "Adjunct interest in ADHD and depression (mixed/modest evidence)",
    ],
    best_form:
      "L-tyrosine free-form at 500–2,000 mg, taken 30–60 minutes before a stressor on empty stomach. N-acetyl-L-tyrosine (NALT) is more water-soluble but less efficiently converted to plasma tyrosine — plain L-tyrosine is usually a better pick despite the marketing.",
  },

  l_lysine: {
    key_facts:
      "Lysine is one of the nine essential amino acids — the body can't make it. Most balanced diets cover the requirement easily; legume-heavy diets without grain pairing can fall short, since legumes are typically lower in methionine but adequate in lysine, while grains are the reverse. The one notable supplement use case is recurrent oral or genital herpes (HSV-1/HSV-2) outbreaks: 1–3 g/day during prodrome has small clinical-trial support for reducing outbreak duration and frequency.",
    food_sources: [
      { food: "Cooked chicken breast", serving: "3 oz", amount: "2.4 g" },
      { food: "Cooked beef", serving: "3 oz", amount: "2.5 g" },
      { food: "Cooked tuna", serving: "3 oz", amount: "2.4 g" },
      { food: "Cottage cheese", serving: "1/2 cup", amount: "1.4 g" },
      { food: "Lentils (cooked)", serving: "1 cup", amount: "1.2 g" },
      { food: "Eggs (whole)", serving: "1 large", amount: "0.5 g" },
    ],
    deficiency_signs: [
      "Rare in protein-adequate diets",
      "Slow growth in children, fatigue, hair loss, irritability in protein-undernourished populations",
    ],
    who_needs_more: [
      "Recurrent herpes simplex outbreaks (1–3 g during prodrome)",
      "Wheat-dominant diets without animal protein or legumes",
      "Athletes with very high protein turnover and limited animal-protein intake",
    ],
    best_form:
      "L-lysine HCl at 1–3 g/day during outbreak prodrome (HSV use case). For general protein adequacy, food-first.",
  },

  choline: {
    key_facts:
      "Choline is the precursor to acetylcholine (neurotransmitter), phosphatidylcholine (cell membranes), and betaine (one-carbon metabolism). It was formally classified as essential in 1998 — the body makes some, but not enough to meet adult requirements without diet. ~90% of US adults consume below the AI. During pregnancy and lactation, choline supports fetal brain development; the prenatal RDA is high (450 mg/day), and most prenatal vitamins contain very little. Egg yolks are by far the most concentrated common source.",
    food_sources: [
      { food: "Egg yolk", serving: "1 large", amount: "150 mg" },
      { food: "Beef liver (cooked)", serving: "3 oz", amount: "335 mg" },
      { food: "Cooked chicken breast", serving: "3 oz", amount: "75 mg" },
      { food: "Cooked salmon", serving: "3 oz", amount: "55 mg" },
      { food: "Soybeans (cooked)", serving: "1/2 cup", amount: "55 mg" },
      { food: "Quinoa (cooked)", serving: "1 cup", amount: "45 mg" },
    ],
    deficiency_signs: [
      "Non-alcoholic fatty liver (impaired phosphatidylcholine for VLDL export)",
      "Muscle damage with elevated CK on prolonged choline-free diets",
      "In pregnancy: poor fetal neural tube and cognitive outcomes (observational)",
    ],
    who_needs_more: [
      "Pregnancy and lactation (450 and 550 mg/day AI)",
      "People who don't eat eggs or organ meats regularly",
      "MTHFR variants — choline pathway substitutes for the impaired folate methylation",
      "Endurance athletes (suggestive evidence for performance)",
    ],
    best_form:
      "Alpha-GPC and CDP-choline (citicoline) cross the blood-brain barrier most efficiently — preferred for cognitive applications. Phosphatidylcholine (lecithin) is cheaper and adequate for liver and general support. Choline bitartrate is the cheapest but less bioavailable to the brain.",
  },

  omega_3: {
    key_facts:
      "Omega-3 refers to a family of polyunsaturated fats with double bonds three carbons from the methyl end. The two long-chain forms with established clinical relevance are EPA (eicosapentaenoic acid) and DHA (docosahexaenoic acid), both abundant in cold-water fish. ALA (alpha-linolenic acid) from flax, chia, and walnuts is also omega-3 but converts to EPA at only ~5–10% efficiency, and to DHA at <0.5% — it's not a substitute. The strongest evidence is for triglyceride lowering (clear) and cardiovascular events in primary prevention (modest); claims for cognition, mood, and joint health vary in support.",
    food_sources: [
      { food: "Wild salmon (cooked)", serving: "3 oz", amount: "1,800 mg EPA+DHA" },
      { food: "Sardines (canned)", serving: "3 oz", amount: "1,200 mg EPA+DHA" },
      { food: "Mackerel (cooked)", serving: "3 oz", amount: "2,500 mg EPA+DHA" },
      { food: "Anchovies (canned)", serving: "2 oz", amount: "1,000 mg EPA+DHA" },
      { food: "Algae oil supplement", serving: "1 capsule", amount: "300–500 mg DHA" },
      { food: "Ground flaxseed", serving: "1 tbsp", amount: "2,300 mg ALA (~115 mg net EPA equivalent)" },
    ],
    deficiency_signs: [
      "No formal deficiency syndrome — likely contribution to dry skin, scaly rash, poor visual acuity in extreme depletion",
      "Chronically low intake associated with worse outcomes for cardiovascular disease, depression, retinal health (observational)",
    ],
    who_needs_more: [
      "People who don't eat fatty fish twice a week (most US adults)",
      "Pregnancy and lactation — DHA accrues rapidly in fetal brain through last trimester",
      "Triglycerides above 500 mg/dL (prescription icosapent ethyl is FDA-indicated)",
      "Vegan diets (ALA conversion is insufficient — algae-derived DHA is the alternative)",
    ],
    best_form:
      "Triglyceride or re-esterified triglyceride (rTG) forms absorb better than ethyl ester (EE) forms. Look for products that specify EPA and DHA content per serving — total 'fish oil' mg is misleading. 1–2 g EPA+DHA daily is the typical maintenance dose. For vegan, algae-derived DHA (often paired with EPA) is the only direct route.",
  },

  fiber: {
    key_facts:
      "Dietary fiber refers to plant carbohydrates that human enzymes can't digest — they reach the colon largely intact, where some are fermented by gut bacteria into short-chain fatty acids (butyrate, propionate, acetate) and others provide bulk and water retention. Soluble fibers (oats, beans, psyllium) lower LDL cholesterol and slow glucose absorption; insoluble fibers (whole grains, vegetables, nuts) speed transit and add stool bulk. The American average is ~16 g/day against the 28 g DV; the Adventist Health Study and others associate higher fiber intakes with lower all-cause mortality.",
    food_sources: [
      { food: "Black beans (cooked)", serving: "1/2 cup", amount: "7.5 g" },
      { food: "Lentils (cooked)", serving: "1/2 cup", amount: "8 g" },
      { food: "Avocado", serving: "1 medium", amount: "10 g" },
      { food: "Raspberries", serving: "1 cup", amount: "8 g" },
      { food: "Whole-wheat pasta (cooked)", serving: "1 cup", amount: "6 g" },
      { food: "Chia seeds", serving: "1 tbsp", amount: "5 g" },
    ],
    deficiency_signs: [
      "Constipation, hard stools, hemorrhoids",
      "Higher LDL cholesterol on average than equivalent diets with adequate fiber",
      "Worse glycemic excursions postprandially",
      "Gut microbiome diversity reduction in long-term low-fiber diets",
    ],
    who_needs_more: [
      "Most US and Western adults — average intake is well below the DV",
      "Constipation, diverticular disease, IBS-C",
      "Hyperlipidemia (soluble fiber lowers LDL ~5–10% at therapeutic doses)",
      "Type 2 diabetes — improved postprandial glucose with each meal",
    ],
    best_form:
      "Food first — fiber from whole foods comes with vitamins, polyphenols, and a mix of fiber types. If supplementing, psyllium husk is the best-studied for both LDL and bowel regularity. Inulin and FODMAP-rich fibers can worsen IBS symptoms in some.",
  },

  protein: {
    key_facts:
      "Protein supplies the nine essential amino acids the body can't make and the substrate for building all enzymes, tissues, hormones, immune cells, and neurotransmitters. The 50 g DV is a 'prevent deficiency' floor, not an optimum. The actual RDA of 0.8 g/kg is widely considered too low for older adults and for active people; 1.2–1.6 g/kg is the modern recommendation for muscle preservation and recovery, with diminishing returns above 2 g/kg. Distribution matters — ~30 g per meal stimulates muscle protein synthesis better than 60 g once and 0 g elsewhere.",
    food_sources: [
      { food: "Cooked chicken breast", serving: "3 oz", amount: "26 g" },
      { food: "Cooked salmon", serving: "3 oz", amount: "22 g" },
      { food: "Cooked beef", serving: "3 oz", amount: "25 g" },
      { food: "Greek yogurt (plain, nonfat)", serving: "1 cup", amount: "23 g" },
      { food: "Lentils (cooked)", serving: "1 cup", amount: "18 g" },
      { food: "Tofu (firm)", serving: "1/2 cup", amount: "20 g" },
      { food: "Whey protein", serving: "1 scoop", amount: "20–25 g" },
    ],
    deficiency_signs: [
      "Sarcopenia and loss of muscle mass (especially in older adults)",
      "Slow wound healing, brittle hair and nails, edema in severe cases",
      "Frequent infections (immune cells need protein turnover)",
      "Children: kwashiorkor, growth failure",
    ],
    who_needs_more: [
      "Older adults (60+) — anabolic resistance means higher per-meal protein is needed",
      "Resistance-training athletes (1.6–2.2 g/kg/day)",
      "Recovery from surgery, injury, or critical illness",
      "Weight-loss phases — higher protein preserves lean mass",
    ],
    best_form:
      "Whole-food protein is the best baseline. Whey isolate has the highest leucine content per gram (best muscle protein synthesis trigger). Casein digests slowly and is good before sleep. Plant blends (pea + rice) provide complete amino acid coverage. Soy is a complete protein on its own.",
  },

  creatine: {
    key_facts:
      "Creatine is synthesized from glycine, arginine, and methionine and stored mostly in skeletal muscle as phosphocreatine — the immediate ATP-regeneration substrate for high-intensity efforts under ~10 seconds. Supplementation at 3–5 g/day saturates muscle creatine over 3–4 weeks (or in 5–7 days with a 20 g/day loading phase) and is one of the most consistently effective ergogenic aids in the human-performance literature. Beyond strength and power, creatine has growing trial support for cognition under stress, sleep deprivation, and possibly age-related muscle and bone preservation. It does not damage kidneys in healthy individuals — that's been studied repeatedly and consistently disproven.",
    food_sources: [
      { food: "Beef (cooked)", serving: "3 oz", amount: "0.4 g" },
      { food: "Pork (cooked)", serving: "3 oz", amount: "0.4 g" },
      { food: "Cooked salmon", serving: "3 oz", amount: "0.4 g" },
      { food: "Cooked herring", serving: "3 oz", amount: "0.7 g" },
      { food: "Cooked chicken breast", serving: "3 oz", amount: "0.3 g" },
    ],
    deficiency_signs: [
      "Not classically deficient — body synthesizes ~1 g/day",
      "Rare genetic creatine synthesis or transport disorders cause intellectual disability and movement disorders",
      "Vegetarians and vegans have lower muscle creatine stores and gain more from supplementation than omnivores",
    ],
    who_needs_more: [
      "Anyone doing resistance training or high-intensity intervals",
      "Vegetarians/vegans (lower baseline stores)",
      "Older adults — sarcopenia and strength preservation",
      "Cognitive demands under sleep deprivation or stress (modest, growing evidence)",
    ],
    best_form:
      "Creatine monohydrate is the only form that's well-studied at the gram-per-day level. 5 g/day is the maintenance dose; loading is optional. The 'creatine HCl' and 'micronized' versions sell at premium prices for no documented advantage. Take with carbs and/or protein for slightly improved muscle uptake.",
  },
};

export function nutrientContent(key: string): NutrientContent | undefined {
  return NUTRIENT_CONTENT[key];
}
