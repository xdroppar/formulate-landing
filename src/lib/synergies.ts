/**
 * Evidence-backed beneficial pairings — the inverse of /interactions/
 * which catalogs warnings. A synergy page answers "should I take X with Y
 * together?" with positive framing: why the combination is rational, how
 * much of each, and what the evidence shows.
 *
 * Each entry produces a page at `/synergies/<a>-and-<b>`. Template pulls
 * ingredient depth from the encyclopedia. Data file carries editorial
 * layer only.
 */

export type Synergy = {
  /** Encyclopedia slugs for both substances. Renderer sorts for canonical URL. */
  a: string;
  b: string;
  /** Short category/topic label. */
  topic: string;
  /** One-sentence bottom-line. */
  bottom_line: string;
  /** Mechanism of the synergy — why they work better together. ~120 words. */
  why_synergy: string;
  /** Combined dose + timing. ~80 words. */
  dose_protocol: string;
  /** Evidence quality summary — what the research actually shows. ~60 words. */
  evidence: string;
  /** Any watch-outs specific to the pairing. ~60 words. */
  watch_outs: string;
  /** Tags for the synergies index. */
  tags: string[];
};

export const synergies: Synergy[] = [
  {
    a: "vitamin-d",
    b: "vitamin-k2",
    topic: "Calcium Partitioning",
    bottom_line:
      "Vitamin D raises calcium absorption; K2 directs that calcium to bones instead of arteries. Together they cover the partitioning problem.",
    why_synergy:
      "Vitamin D increases intestinal calcium absorption — effective, but without a partitioning signal, some of that extra calcium ends up deposited in arterial walls rather than bone. Vitamin K2 (specifically MK-7) activates matrix Gla protein in arteries to inhibit calcification, and activates osteocalcin in bone to direct calcium deposition there. Taking D3 without K2 at higher doses (2,000+ IU daily) raises a theoretical concern about arterial calcification. Pairing them eliminates that concern and is the canonical longevity-stack combination.",
    dose_protocol:
      "1,000–2,000 IU vitamin D3 + 90–180 mcg MK-7 daily, with a fat-containing meal (both are fat-soluble). Many products now combine them in one softgel. Higher D3 doses (5,000 IU) merit higher K2 (180 mcg) for partitioning balance.",
    evidence:
      "Combination logic is well-established mechanistically; Knapen 2017 (PMID: 29405321) showed K2 reduces arterial stiffness in combination protocols. Still short on large-scale cardiovascular outcome trials of the combination, but the supplement-community consensus is strong.",
    watch_outs:
      "If you take warfarin, K2 supplementation interferes meaningfully with INR — work with prescriber before adding. K2 at supplement doses has no other significant drug interactions. D3 at very high chronic doses (>5,000 IU without blood monitoring) can cause hypercalcemia regardless of K2 pairing.",
    tags: ["Longevity", "Cardiovascular", "Bone Health", "Fat-Soluble Vitamins"],
  },
  {
    a: "iron-bisglycinate",
    b: "vitamin-c",
    topic: "Iron Absorption",
    bottom_line:
      "Vitamin C converts iron to its better-absorbed ferrous form — the cleanest absorption-boost synergy in supplement biology.",
    why_synergy:
      "Non-heme iron (the form in plant foods and most iron supplements) is absorbed better in the ferrous (Fe²⁺) state. Vitamin C reduces the ferric form (Fe³⁺) to ferrous in the stomach, often doubling or tripling iron absorption in meta-analyses. This is why pomegranate juice and orange juice with iron-rich meals is folk nutrition that actually holds up to RCT scrutiny. The pairing is equally useful for supplemental iron (especially in menstruating women, vegetarians, or diagnosed iron deficiency) and for dietary iron at meals.",
    dose_protocol:
      "Take 100–250 mg vitamin C at the same time as your iron supplement (or with iron-rich meals if getting iron from food). The vitamin C needs to be present in the stomach with the iron, not hours apart. Works with any vitamin C form (ascorbic acid is fine).",
    evidence:
      "Well-established — multiple trials spanning decades show 2–4× absorption gains for non-heme iron when vitamin C is co-administered at 100+ mg. It's the default pairing recommendation in hematology practice.",
    watch_outs:
      "Avoid coffee, tea, or calcium supplements within 2 hours of iron — polyphenols and calcium block iron absorption, canceling the vitamin C boost. Vitamin C + iron at very high doses can stress users with hemochromatosis; iron overload is the main safety concern.",
    tags: ["Iron Deficiency", "Absorption", "Women's Health"],
  },
  {
    a: "piperine",
    b: "turmeric-extract-curcumin",
    topic: "Bioavailability",
    bottom_line:
      "Piperine (black pepper extract) inhibits curcumin's glucuronidation — boosting curcumin bioavailability by up to 2,000%.",
    why_synergy:
      "Curcumin is famously poorly absorbed — plain turmeric extract barely crosses into systemic circulation because the liver rapidly glucuronidates it. Piperine (bioperine) inhibits the glucuronidation enzymes, letting more curcumin reach the bloodstream. A landmark Shoba 1998 study showed 20× higher plasma curcumin with 20 mg piperine vs curcumin alone. Most 'bioavailable curcumin' products either add piperine (classic pairing) or use phytosome/nanoparticle formulations (Meriva, Longvida) that achieve similar absorption by a different mechanism.",
    dose_protocol:
      "500–1,000 mg curcumin extract + 5–20 mg piperine (bioperine), ideally in a single capsule that's already combined. Alternatively, pick a phytosome/liposomal curcumin (Meriva, Longvida, BCM-95) that doesn't need piperine.",
    evidence:
      "Multiple human PK studies confirm the absorption boost. Pain/inflammation RCTs using piperine-enhanced curcumin consistently show effects where plain curcumin fails.",
    watch_outs:
      "Piperine's glucuronidation-inhibitory effect extends to OTHER drugs too — it raises blood levels of many prescription medications unpredictably. If you take any prescription drug with a narrow therapeutic window, prefer a phytosome curcumin formulation over piperine-boosted. High-dose curcumin has mild anticoagulant effect; watch with blood thinners.",
    tags: ["Bioavailability", "Anti-Inflammatory", "Joint Support"],
  },
  {
    a: "magnesium",
    b: "vitamin-d",
    topic: "Activation Cofactor",
    bottom_line:
      "Magnesium is required to activate vitamin D. Without adequate magnesium, supplementing D3 produces suboptimal blood levels.",
    why_synergy:
      "Vitamin D metabolism is magnesium-dependent at every step. Magnesium is a cofactor for the enzymes that convert cholecalciferol (D3) to 25-hydroxyvitamin D in the liver and to 1,25-dihydroxyvitamin D (the active form) in the kidneys. Magnesium deficiency — common in Western diets — can result in vitamin D supplementation failing to raise blood 25(OH)D levels. One meta-analysis found that users with adequate magnesium intake had much stronger vitamin D response to supplementation than magnesium-deficient users.",
    dose_protocol:
      "200–400 mg elemental magnesium (glycinate, malate, or citrate form) daily, plus 1,000–2,000 IU vitamin D3 with a fat-containing meal. The two don't need to be taken at the same time — magnesium is working at the enzymatic level day-round.",
    evidence:
      "Increasingly recognized: the 2018 Journal of the American Osteopathic Association review spotlighted this as an under-appreciated explanation for 'vitamin D resistance' in supplementation trials. Strong mechanistic, moderate clinical.",
    watch_outs:
      "High-dose magnesium competes for absorption with zinc, iron, and calcium — separate those by 2 hours. Magnesium oxide is poorly absorbed and laxative — pick glycinate, malate, or citrate instead. Keep total magnesium below 400 mg elemental unless your clinician has specific guidance.",
    tags: ["Fat-Soluble Vitamins", "Deficiency", "Cofactor"],
  },
  {
    a: "caffeine",
    b: "l-theanine",
    topic: "Focus & Cognition",
    bottom_line:
      "L-theanine smooths caffeine's alertness without blunting it — the most-studied cognitive combination in supplement research.",
    why_synergy:
      "Caffeine blocks adenosine receptors to produce alertness, but also stimulates sympathetic output — hence jitters, elevated heart rate, and anxiety at higher doses. L-theanine is an amino acid that raises alpha-wave activity and blunts sympathetic arousal without causing drowsiness. Combined, you get caffeine's alertness and focus benefits with substantially reduced anxiety side effects. Multiple EEG studies show enhanced attention-task performance with the combination beyond what either produces alone.",
    dose_protocol:
      "100 mg caffeine + 200 mg L-theanine (the canonical 2:1 ratio), taken 30 minutes before the task that needs focus. Morning or pre-task only — caffeine's 6-hour half-life means evening dosing disrupts sleep even paired with L-theanine.",
    evidence:
      "Multiple RCTs show improved attention, accuracy on cognitive tasks, and reduced subjective anxiety compared to caffeine alone. The combination is in most serious pre-workout and nootropic formulas.",
    watch_outs:
      "Standard caffeine interactions apply — medications metabolized by CYP1A2, pregnancy, and cardiac conditions are all reasons to discuss with a clinician. L-theanine itself has no known drug interactions at supplement doses. Caffeine tolerance builds with daily use — cycling 2 weeks on / 1 week off preserves effectiveness.",
    tags: ["Nootropics", "Focus", "Caffeine", "Stacks"],
  },
  {
    a: "copper",
    b: "zinc",
    topic: "Mineral Balance",
    bottom_line:
      "Long-term zinc supplementation depletes copper. The pairing prevents the deficiency zinc creates, not a positive synergy in the usual sense.",
    why_synergy:
      "Zinc and copper compete for the same intestinal transporter (DMT1) plus ZIP4. Zinc supplementation over ~40 mg/day for more than a few weeks reliably induces copper deficiency — documented in trials showing anemia and neurological symptoms in users taking zinc for acne or sexual health without copper support. The pairing is preventive: you're supplementing copper alongside zinc to avoid creating a deficiency, not because copper itself needs boosting. Ratio matters — roughly 15:1 zinc:copper is the canonical supplementation ratio.",
    dose_protocol:
      "If zinc >30 mg/day for more than 2 weeks: add 1–2 mg copper (glycinate or bisglycinate form) daily. Take them at DIFFERENT times of day (4+ hours apart) because of the transporter competition — otherwise absorption drops for both. Morning zinc, evening copper (or reverse) is standard.",
    evidence:
      "Well-documented. The National Academy of Medicine's tolerable upper intake for zinc (40 mg) is specifically calibrated to the copper-depletion ceiling. Long-term higher-dose zinc without copper has caused measurable neurological cases.",
    watch_outs:
      "Don't add copper if your zinc dose is <30 mg/day — that's below the depletion threshold. Wilson's disease patients must avoid copper supplementation entirely. Copper supplementation in users without zinc-induced deficiency can cause GI upset.",
    tags: ["Minerals", "Zinc", "Copper", "Preventive"],
  },
  {
    a: "folate",
    b: "vitamin-b12",
    topic: "Methylation Cycle",
    bottom_line:
      "Folate and B12 are paired cofactors in methylation — supplementing one without the other can mask a deficiency of the other.",
    why_synergy:
      "Both vitamins are essential for the methylation cycle (converting homocysteine to methionine) and DNA synthesis. They interact such that adequate folate can mask the anemia of B12 deficiency — blood cell production keeps up, but B12's separate neurological role continues to degrade. This is why high-dose folic acid supplementation without B12 carries a documented risk of irreversible nerve damage in B12-deficient users. Supplementing them together ensures both cycle cofactors are present, and the folate never masks a progressing B12 deficiency.",
    dose_protocol:
      "400 mcg methylfolate (or folic acid) + 500–1,000 mcg methylcobalamin B12 daily. Many multivitamins include both at appropriate doses. For MTHFR variant carriers (40% of population), methylfolate form specifically; cyanocobalamin B12 works for most but methylcobalamin is preferred.",
    evidence:
      "Mechanism is textbook biochemistry. The masking phenomenon led to US fortification limits on folic acid specifically because of B12 deficiency masking concerns in unsupervised populations.",
    watch_outs:
      "Methotrexate (for rheumatoid arthritis, psoriasis, some cancers) is a folate antagonist — supplementing folate requires physician coordination. High-dose folic acid without B12 is the classic configuration to avoid. Pernicious anemia (autoimmune B12 malabsorption) requires injectable B12, not oral.",
    tags: ["B Vitamins", "Methylation", "MTHFR", "Deficiency"],
  },
  {
    a: "alpha-lipoic-acid",
    b: "coq10",
    topic: "Mitochondrial Support",
    bottom_line:
      "CoQ10 fuels the electron transport chain; alpha-lipoic acid regenerates antioxidants that protect it. Complementary rather than redundant.",
    why_synergy:
      "CoQ10 is a direct actor in the mitochondrial electron transport chain — it shuttles electrons between complexes and generates ATP. Alpha-lipoic acid (ALA) is a broad-spectrum antioxidant that also happens to regenerate other antioxidants (glutathione, vitamin C, vitamin E) back to their reduced forms. CoQ10 keeps the mitochondrial engine running; ALA protects it from the oxidative byproducts that engine inevitably produces. The combination is standard in mitochondrial disease protocols and age-related decline support.",
    dose_protocol:
      "100–200 mg CoQ10 (ubiquinol form preferred over 50) with a fat-containing meal + 300–600 mg alpha-lipoic acid split, on empty stomach. The fat pairing matters for CoQ10 absorption; the empty stomach for ALA (it competes with amino acids for transport).",
    evidence:
      "Both have independently strong evidence. Combination evidence is more modest (fewer specific studies) but mechanistically clean and commonly used in clinical mitochondrial protocols.",
    watch_outs:
      "CoQ10 reduces warfarin's effect (structural similarity to vitamin K) — monitor INR if starting. ALA can modestly lower blood sugar in diabetics. Both are well-tolerated at recommended doses; GI upset is the main issue.",
    tags: ["Mitochondrial", "Antioxidants", "Anti-Aging", "Energy"],
  },
  {
    a: "dha",
    b: "epa",
    topic: "Omega-3 Components",
    bottom_line:
      "EPA drives anti-inflammatory action; DHA is the brain structural fat. Together they cover the two distinct clinical uses of fish oil.",
    why_synergy:
      "The two major long-chain omega-3s work on different targets. EPA competes with arachidonic acid for COX/LOX enzymes, shifting eicosanoid production toward less-inflammatory signaling molecules — this is the cardiovascular and mood mechanism. DHA is the structural fat in neuron cell membranes, retinal photoreceptors, and sperm — the brain/eye/reproductive story. Taking both at typical fish-oil ratios covers both mechanisms without having to pick. Natural fish has both; supplement formulations vary the ratio.",
    dose_protocol:
      "1–3 g combined EPA+DHA daily with food (fat-containing meal improves absorption). For anti-inflammatory or mood: tilt EPA-dominant (55:25 or higher). For brain/eye/pregnancy: tilt DHA-dominant. Most balanced fish oils (18:12 or similar) serve general use.",
    evidence:
      "Among the best-evidenced supplements in existence. Meta-analyses of cardiovascular outcomes, depression adjunct, triglyceride reduction all converge on clinical benefit at 2+ g daily.",
    watch_outs:
      "Mild anticoagulant effect at high doses (3+ g combined) — watch with blood thinners. Choose IFOS-certified products or brands with published heavy-metal testing (fish accumulate mercury). Fish oil oxidizes fast — refrigerate after opening, smell-test before using older bottles.",
    tags: ["Omega-3", "Cardiovascular", "Brain Health", "Anti-Inflammatory"],
  },
  {
    a: "magnesium-glycinate",
    b: "melatonin",
    topic: "Sleep Support",
    bottom_line:
      "Magnesium handles sleep quality; melatonin handles sleep timing. They don't overlap — they cover different sides of insomnia.",
    why_synergy:
      "Magnesium glycinate calms the nervous system (parasympathetic tone), relaxes skeletal muscle, and supports deep-sleep maintenance. It addresses 'can't stay asleep' and 'wake up unrested' problems. Melatonin is a hormone that signals darkness to the brain — it addresses 'can't fall asleep on schedule' and circadian shift problems (jet lag, shift work). The two solve different sleep problems; users with both timing AND quality issues benefit from both. Low-dose melatonin (0.3–1 mg) is sufficient; higher doses paradoxically disrupt architecture.",
    dose_protocol:
      "300–400 mg elemental magnesium glycinate + 0.3–1 mg melatonin, both 30–60 minutes before bed. Melatonin is the lever to reserve for timing issues; magnesium goes daily regardless.",
    evidence:
      "Both have independent sleep evidence. Combination is commonly prescribed in sleep clinics and has no negative interaction — just additive benefit on different axes.",
    watch_outs:
      "Melatonin at high chronic doses can affect morning alertness and hormonal function — start low. Melatonin has documented interactions with blood pressure medications and anticoagulants. Magnesium glycinate is among the best-tolerated minerals; excess causes loose stools rather than neurotoxicity.",
    tags: ["Sleep", "Circadian", "Magnesium", "Melatonin"],
  },
  {
    a: "quercetin",
    b: "zinc",
    topic: "Antiviral Immune Support",
    bottom_line:
      "Quercetin acts as a zinc ionophore — helping zinc enter cells where it inhibits viral replication. The acute-illness pairing with real evidence.",
    why_synergy:
      "Zinc has known antiviral activity — it interferes with viral RNA polymerase inside infected cells. The limiting factor is getting zinc across the cell membrane; zinc ions don't enter cells easily on their own. Quercetin acts as a zinc ionophore, binding zinc and escorting it into cells. Hydroxychloroquine famously does the same thing as a pharmaceutical ionophore; quercetin is the supplement-grade alternative. The pairing is the mechanistic backbone of the well-known zinc + quercetin + vitamin C acute-illness stack.",
    dose_protocol:
      "50 mg zinc (picolinate or bisglycinate) split across the day + 500–1,000 mg quercetin (phytosome or with bromelain for bioavailability) during acute illness. Short-term only — 5–7 days max at these doses. Drop zinc to 15 mg/day baseline between illnesses to avoid copper depletion.",
    evidence:
      "Mechanism is well-established in cell culture. Clinical evidence for the stack has grown, particularly during COVID era; multiple RCTs show modest reductions in symptom duration. Effect sizes are moderate, not miraculous.",
    watch_outs:
      "Don't maintain high-dose zinc long-term without copper (see zinc + copper synergy). Quercetin inhibits CYP3A4 modestly — theoretically can affect blood levels of some prescription drugs. Avoid long-term daily high-dose quercetin; reserve for acute-illness windows.",
    tags: ["Immune", "Antiviral", "Zinc", "Acute Illness"],
  },
  {
    a: "hydrolyzed-collagen",
    b: "vitamin-c",
    topic: "Collagen Synthesis",
    bottom_line:
      "Collagen peptides supply substrate; vitamin C is the rate-limiting cofactor enzyme. Both are needed for new collagen.",
    why_synergy:
      "Collagen synthesis requires hydroxylation of proline and lysine residues, which is performed by enzymes (prolyl and lysyl hydroxylases) that require vitamin C as a cofactor. Without adequate vitamin C, collagen synthesis fails — scurvy is the extreme version of this (bleeding gums, poor wound healing). With supplemental hydrolyzed collagen peptides providing amino-acid substrate PLUS vitamin C providing enzymatic co-activation, you're supplying both inputs to the synthesis pathway. The Shaw 2017 study (PMID: 27852613) showed this pairing produces measurable tendon collagen synthesis increases 30–60 minutes after intake.",
    dose_protocol:
      "10–15 g hydrolyzed collagen peptides + 500 mg vitamin C, 30–60 minutes before physical activity. The timing matters — the activity itself drives localized collagen synthesis during the hours after, and the amino-acid + cofactor availability needs to be present then.",
    evidence:
      "Mechanism is biochemistry; the timing protocol has RCT support specifically for tendon and joint collagen. Effect sizes are clinically modest but consistent in athlete populations.",
    watch_outs:
      "Collagen is incomplete protein (low in tryptophan) — don't count it toward muscle-building protein totals. Vitamin C at very high doses (>2 g/day) can increase kidney stone risk in users with stone history.",
    tags: ["Joints", "Collagen", "Athletic Recovery", "Tendons"],
  },
  {
    a: "nmn",
    b: "resveratrol",
    topic: "NAD+ & Sirtuin Activation",
    bottom_line:
      "NMN raises NAD+; resveratrol activates sirtuins that use NAD+. The classic longevity pair — precursor plus activator.",
    why_synergy:
      "Sirtuins are a family of enzymes associated with longevity pathways (SIRT1 drives most of the popular interest). Sirtuins require NAD+ as a cofactor to function — they literally consume NAD+ to deacetylate target proteins. NMN is a precursor that raises intracellular NAD+ levels, which decline sharply with age. Resveratrol is a sirtuin activator — it raises sirtuin activity. Giving resveratrol without enough NAD+ is like revving an engine with no fuel; giving NMN without activation leaves the fuel idle. The pair is mechanistically complementary.",
    dose_protocol:
      "250–500 mg NMN + 150–500 mg trans-resveratrol (micronized for bioavailability) in the morning. Fat-containing meal improves resveratrol absorption. Some protocols add pterostilbene (better bioavailability than resveratrol) as a substitute or adjunct.",
    evidence:
      "Promising preclinical and early human data; effect sizes in humans are modest and long-timeline outcomes aren't yet demonstrated. The longevity case is built on mechanism + animal + small human trials rather than long-duration RCTs.",
    watch_outs:
      "Resveratrol at high doses has mild anticoagulant effect; watch with blood thinners. Both are well-tolerated at supplement doses. This pair is experimental-flavored longevity supplementation; adjust expectations accordingly.",
    tags: ["Longevity", "NAD+", "Sirtuins", "Anti-Aging"],
  },
  {
    a: "boswellia",
    b: "curcumin",
    topic: "Multi-Pathway Anti-Inflammatory",
    bottom_line:
      "Curcumin hits NF-κB and COX-2; boswellia hits 5-LOX. Non-overlapping inflammation pathways means additive effect.",
    why_synergy:
      "Most anti-inflammatories either target COX enzymes (aspirin, ibuprofen, curcumin's COX-2 action) or the 5-LOX pathway (boswellic acids from frankincense). These are separate branches of the arachidonic-acid cascade — hitting both catches more inflammatory signal than hitting either alone. That's why curcumin and boswellia appear paired in most evidence-based joint formulas — the mechanisms don't overlap, so the effect is additive. Osteoarthritis RCTs of the combination consistently outperform single-agent trials.",
    dose_protocol:
      "500–1,000 mg bioavailable curcumin (Meriva, Longvida, or with piperine) + 250–500 mg AKBA-rich boswellia (5-Loxin, AprèsFlex), both with food. Timing can be split AM/PM or taken together.",
    evidence:
      "Strong — both individually and combined. Meta-analyses of osteoarthritis trials consistently support the combination over NSAID comparators for long-term use with better GI tolerability.",
    watch_outs:
      "Both have mild anticoagulant effects at high doses — check with clinician if on warfarin, aspirin, or DOACs. Curcumin can interact with iron absorption and diabetes medications. Bioavailability of generic curcumin is terrible — picking the right form matters more than picking the right dose.",
    tags: ["Anti-Inflammatory", "Joints", "Arthritis"],
  },
  {
    a: "ashwagandha",
    b: "rhodiola",
    topic: "Day-Night Adaptogen Cycling",
    bottom_line:
      "Ashwagandha calms; rhodiola activates. Together they cover a full adaptogen cycle — ashwagandha PM, rhodiola AM.",
    why_synergy:
      "Both reduce cortisol response to stress, but via different profiles. Ashwagandha leans sedating — it's the best evening adaptogen and has the strongest evidence for sleep quality, anxiety reduction, and cortisol normalization. Rhodiola leans activating — it improves mental fatigue and endurance without stimulation. Cycling them across the day (rhodiola morning, ashwagandha evening) covers the 'wired during day, calm at night' profile that most stressed users need. The two don't pharmacologically interact; they hit different receptor systems.",
    dose_protocol:
      "200–600 mg rhodiola (3% rosavins extract) in the morning + 300–600 mg ashwagandha (KSM-66 or Sensoril extract) in the evening. Both build over 2–4 weeks — no acute effect. Well-tolerated at these doses.",
    evidence:
      "Both individually strong. Combination studies are sparse specifically, but mechanistic non-overlap plus complementary day/night positioning makes the pairing widely used in Ayurvedic and Russian stress-protocol traditions.",
    watch_outs:
      "Ashwagandha can shift thyroid hormone levels — monitor if you take levothyroxine. Rhodiola can disrupt sleep if taken late or in sensitive users — morning only. Both are generally very safe at recommended doses.",
    tags: ["Adaptogens", "Stress", "Sleep", "Energy"],
  },
];

function slugPair(a: string, b: string): string {
  const [first, second] = [a, b].sort();
  return `${first}-and-${second}`;
}

export function synergySlug(s: Synergy): string {
  return slugPair(s.a, s.b);
}

const bySlug = new Map(synergies.map((s) => [synergySlug(s), s]));

export function synergyBySlug(slug: string): Synergy | undefined {
  return bySlug.get(slug);
}
