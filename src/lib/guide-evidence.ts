/**
 * Central registry of clinical studies referenced by EvidenceBadge popovers.
 *
 * The goal: one canonical entry per landmark study, reused across any guide
 * that cites it. When a new study is published or a URL changes, fix it here
 * once rather than hunting through every guide file.
 *
 * Usage in a guide:
 *   <EvidenceBadge level="strong" studiesId="ashwagandha-cortisol-2012" />
 *   <EvidenceBadge level="strong" studiesIds={["creatine-loading-harris-1992", "creatine-meta-kreider-2017"]} />
 *   <EvidenceBadge level="strong" studies={[{ ...inline one-off... }]} />
 *
 * For URLs: prefer direct PubMed article URLs when you have a confirmed PMID.
 * For landmark studies where the PMID is uncertain, a PubMed search URL
 * (https://pubmed.ncbi.nlm.nih.gov/?term=...) always resolves and lets readers
 * find the exact paper themselves.
 */

export interface Study {
  /** "Chandrasekhar et al." or "Harris and Söderlund" */
  authors: string;
  year: number;
  /** Journal name — italicized in the popover */
  journal: string;
  /** Full paper title */
  title: string;
  /** PubMed article URL, DOI URL, or PubMed search URL */
  url: string;
  /** Optional one-line finding summary shown under the title */
  summary?: string;
}

export const studies: Record<string, Study> = {
  // ------------------------------- Ashwagandha
  "ashwagandha-cortisol-2012": {
    authors: "Chandrasekhar et al.",
    year: 2012,
    journal: "Indian Journal of Psychological Medicine",
    title: "A prospective, randomized double-blind, placebo-controlled study of safety and efficacy of a high-concentration full-spectrum extract of ashwagandha root in reducing stress and anxiety in adults",
    url: "https://pubmed.ncbi.nlm.nih.gov/23439798/",
    summary: "27.9% reduction in serum cortisol vs placebo at 60 days in chronically stressed adults.",
  },
  "ashwagandha-lopresti-2019": {
    authors: "Lopresti et al.",
    year: 2019,
    journal: "Medicine",
    title: "An investigation into the stress-relieving and pharmacological actions of an ashwagandha (Withania somnifera) extract",
    url: "https://pubmed.ncbi.nlm.nih.gov/31517876/",
    summary: "240mg/day high-concentration extract produced significant cortisol and stress-score reductions at 60 days.",
  },

  // ------------------------------- Creatine
  "creatine-loading-harris-1992": {
    authors: "Harris, Söderlund, and Hultman",
    year: 1992,
    journal: "Clinical Science",
    title: "Elevation of creatine in resting and exercised muscle of normal subjects by creatine supplementation",
    url: "https://pubmed.ncbi.nlm.nih.gov/1327657/",
    summary: "Landmark paper establishing that oral creatine supplementation raises muscle creatine concentration — founding the loading-phase protocol.",
  },
  "creatine-hultman-1996": {
    authors: "Hultman et al.",
    year: 1996,
    journal: "Journal of Applied Physiology",
    title: "Muscle creatine loading in men",
    url: "https://pubmed.ncbi.nlm.nih.gov/8828669/",
    summary: "Showed that 3g/day for 28 days reaches the same muscle creatine saturation as the classical 20g × 6 day loading protocol.",
  },
  "creatine-kreider-issn-2017": {
    authors: "Kreider et al.",
    year: 2017,
    journal: "Journal of the International Society of Sports Nutrition",
    title: "International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine",
    url: "https://pubmed.ncbi.nlm.nih.gov/28615996/",
    summary: "Comprehensive ISSN position paper. Confirms creatine safety across long-term use and summarizes performance/cognitive benefits.",
  },
  "creatine-post-vs-pre-antonio-2013": {
    authors: "Antonio and Ciccone",
    year: 2013,
    journal: "Journal of the International Society of Sports Nutrition",
    title: "The effects of pre versus post workout supplementation of creatine monohydrate on body composition and strength",
    url: "https://pubmed.ncbi.nlm.nih.gov/23919405/",
    summary: "Small (n=19) trial suggesting modest post-workout edge in lean mass and strength gains vs pre-workout timing.",
  },

  // ------------------------------- Omega-3
  "omega3-mortality-meta-2018": {
    authors: "Aung et al.",
    year: 2018,
    journal: "JAMA Cardiology",
    title: "Associations of omega-3 fatty acid supplement use with cardiovascular disease risks: meta-analysis of 10 trials involving 77,917 individuals",
    url: "https://pubmed.ncbi.nlm.nih.gov/29387889/",
    summary: "Large meta-analysis examining cardiovascular outcomes of omega-3 supplementation across 77,917 participants.",
  },
  "omega3-triglyceride-skulas-ray-2019": {
    authors: "Skulas-Ray et al.",
    year: 2019,
    journal: "Circulation",
    title: "Omega-3 Fatty Acids for the Management of Hypertriglyceridemia: A Science Advisory From the American Heart Association",
    url: "https://pubmed.ncbi.nlm.nih.gov/31422671/",
    summary: "AHA science advisory on triglyceride-lowering effects of 2–4g/day EPA+DHA — typically a 20–30% reduction.",
  },

  // ------------------------------- Vitamin D
  "vitamin-d-absorption-fat-2015": {
    authors: "Dawson-Hughes et al.",
    year: 2015,
    journal: "Journal of the Academy of Nutrition and Dietetics",
    title: "Dietary fat increases vitamin D-3 absorption",
    url: "https://pubmed.ncbi.nlm.nih.gov/25441954/",
    summary: "Monounsaturated-fat-rich meal increased vitamin D3 absorption by ~32% compared to low-fat meal.",
  },

  // ------------------------------- Magnesium
  "magnesium-b6-stress-2018": {
    authors: "Pouteau et al.",
    year: 2018,
    journal: "PLOS ONE",
    title: "Superiority of magnesium and vitamin B6 over magnesium alone on severe stress in healthy adults with low magnesemia",
    url: "https://pubmed.ncbi.nlm.nih.gov/30562392/",
    summary: "Mg+B6 combination outperformed Mg alone for stress score reduction in adults with low baseline magnesium.",
  },

  // ------------------------------- Probiotics
  "probiotics-cdifficile-jama-2017": {
    authors: "Goldenberg et al.",
    year: 2017,
    journal: "Cochrane Database of Systematic Reviews",
    title: "Probiotics for the prevention of Clostridium difficile-associated diarrhea in adults and children",
    url: "https://pubmed.ncbi.nlm.nih.gov/29257353/",
    summary: "39 RCTs, 9,955 participants. Probiotics reduced CDAD risk ~60% in moderate-to-high risk populations.",
  },
  "probiotics-lgg-pediatric-2013": {
    authors: "Szajewska et al.",
    year: 2013,
    journal: "Alimentary Pharmacology & Therapeutics",
    title: "Meta-analysis: Lactobacillus GG for treating acute gastroenteritis in children",
    url: "https://pubmed.ncbi.nlm.nih.gov/17521331/",
    summary: "LGG reduced diarrhea duration by roughly 25 hours in pediatric gastroenteritis across multiple RCTs.",
  },

  // ------------------------------- Creatine (additional)
  "creatine-antonio-forms-2021": {
    authors: "Antonio et al.",
    year: 2021,
    journal: "Journal of the International Society of Sports Nutrition",
    title: "Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show?",
    url: "https://pubmed.ncbi.nlm.nih.gov/33557850/",
    summary: "Systematic review comparing monohydrate to alternative forms — no meaningful difference in muscle creatine uptake.",
  },
  "creatine-smith-ryan-women-2021": {
    authors: "Smith-Ryan et al.",
    year: 2021,
    journal: "Nutrients",
    title: "Creatine Supplementation in Women's Health: A Lifespan Perspective",
    url: "https://pubmed.ncbi.nlm.nih.gov/33578876/",
    summary: "Narrative review highlighting benefits for women: strength, body composition, bone health, mood, and cognitive function.",
  },
  "creatine-avgerinos-cognitive-2018": {
    authors: "Avgerinos et al.",
    year: 2018,
    journal: "Experimental Gerontology",
    title: "Effects of creatine supplementation on cognitive function of healthy individuals: a systematic review of 6 randomized controlled trials",
    url: "https://pubmed.ncbi.nlm.nih.gov/29704637/",
    summary: "Meta-analysis of 6 RCTs showing creatine improved short-term memory and reasoning in healthy adults, especially under stress/sleep deprivation.",
  },

  // ------------------------------- Vitamin D (additional)
  "vitamin-d-tripkovic-d3vsd2-2012": {
    authors: "Tripkovic et al.",
    year: 2012,
    journal: "American Journal of Clinical Nutrition",
    title: "Comparison of vitamin D2 and vitamin D3 supplementation in raising serum 25-hydroxyvitamin D status",
    url: "https://pubmed.ncbi.nlm.nih.gov/22552031/",
    summary: "Meta-analysis showing D3 is ~87% more effective than D2 at raising blood 25(OH)D levels.",
  },
  "vitamin-d-knapen-k2-2017": {
    authors: "Knapen et al.",
    year: 2017,
    journal: "Thrombosis and Haemostasis",
    title: "Menaquinone-7 supplementation improves arterial stiffness in healthy postmenopausal women",
    url: "https://pubmed.ncbi.nlm.nih.gov/28440744/",
    summary: "180mcg/day MK-7 for 3 years significantly improved arterial stiffness in postmenopausal women.",
  },
  "vitamin-d-vital-manson-2019": {
    authors: "Manson et al.",
    year: 2019,
    journal: "New England Journal of Medicine",
    title: "Vitamin D Supplements and Prevention of Cancer and Cardiovascular Disease",
    url: "https://pubmed.ncbi.nlm.nih.gov/30415629/",
    summary: "VITAL trial (n=25,871). 2,000 IU/day D3 did not significantly reduce cancer incidence or cardiovascular events in a generally replete population.",
  },

  // ------------------------------- Omega-3 (additional)
  "omega3-reduce-it-bhatt-2019": {
    authors: "Bhatt et al.",
    year: 2019,
    journal: "New England Journal of Medicine",
    title: "Cardiovascular Risk Reduction with Icosapent Ethyl for Hypertriglyceridemia",
    url: "https://pubmed.ncbi.nlm.nih.gov/30415628/",
    summary: "REDUCE-IT trial. 4g/day icosapent ethyl (EPA) reduced major cardiovascular events by 25% in high-risk statin-treated patients.",
  },
  "omega3-dyerberg-tg-vs-ee-2010": {
    authors: "Dyerberg et al.",
    year: 2010,
    journal: "Prostaglandins, Leukotrienes and Essential Fatty Acids",
    title: "Bioavailability of marine n-3 fatty acid formulations",
    url: "https://pubmed.ncbi.nlm.nih.gov/20434881/",
    summary: "TG-form omega-3s had approximately 70% better absorption than ethyl ester form.",
  },
  "omega3-liao-epa-depression-2019": {
    authors: "Liao et al.",
    year: 2019,
    journal: "Translational Psychiatry",
    title: "Efficacy of omega-3 PUFAs in depression: a meta-analysis",
    url: "https://pubmed.ncbi.nlm.nih.gov/31383846/",
    summary: "EPA-dominant formulas (≥60% EPA) were significantly more effective for depression than DHA-dominant ones.",
  },
  "omega3-albert-oxidation-2015": {
    authors: "Albert et al.",
    year: 2015,
    journal: "Scientific Reports",
    title: "Fish oil supplements in New Zealand are highly oxidised and do not meet label content of n-3 PUFA",
    url: "https://pubmed.ncbi.nlm.nih.gov/25604397/",
    summary: "Significant percentage of commercially available fish oil exceeded recommended oxidation limits (TOTOX values).",
  },

  // ------------------------------- Magnesium (additional)
  "magnesium-abbasi-sleep-2012": {
    authors: "Abbasi et al.",
    year: 2012,
    journal: "Journal of Research in Medical Sciences",
    title: "The effect of magnesium supplementation on primary insomnia in elderly",
    url: "https://pubmed.ncbi.nlm.nih.gov/23853635/",
    summary: "Magnesium supplementation significantly improved sleep quality, sleep time, and sleep onset latency in elderly subjects.",
  },
  "magnesium-slutsky-threonate-2010": {
    authors: "Slutsky et al.",
    year: 2010,
    journal: "Neuron",
    title: "Enhancement of learning and memory by elevating brain magnesium",
    url: "https://pubmed.ncbi.nlm.nih.gov/20152124/",
    summary: "Magnesium L-threonate crossed the blood-brain barrier and improved learning, working memory, and both short/long-term memory in animal models.",
  },
  "magnesium-zhang-bp-2017": {
    authors: "Zhang et al.",
    year: 2017,
    journal: "Hypertension Research",
    title: "Effects of magnesium supplementation on blood pressure",
    url: "https://pubmed.ncbi.nlm.nih.gov/27402922/",
    summary: "Meta-analysis finding magnesium supplementation reduced systolic blood pressure by 2–3 mmHg.",
  },

  // ------------------------------- Ashwagandha (additional)
  "ashwagandha-pratte-2014": {
    authors: "Pratte et al.",
    year: 2014,
    journal: "Journal of Alternative and Complementary Medicine",
    title: "An alternative treatment for anxiety: a systematic review of human trial results reported for the Ayurvedic herb ashwagandha",
    url: "https://pubmed.ncbi.nlm.nih.gov/25405876/",
    summary: "Systematic review across 5 RCTs. Ashwagandha outperformed placebo for anxiety measures.",
  },
  "ashwagandha-langade-sleep-2019": {
    authors: "Langade et al.",
    year: 2019,
    journal: "Cureus",
    title: "Efficacy and Safety of Ashwagandha (Withania somnifera) Root Extract in Insomnia and Anxiety",
    url: "https://pubmed.ncbi.nlm.nih.gov/31728244/",
    summary: "300mg 2x/day KSM-66 for 10 weeks improved sleep onset, sleep quality, and anxiety scores in insomnia patients.",
  },
  "ashwagandha-wankhede-2015": {
    authors: "Wankhede et al.",
    year: 2015,
    journal: "Journal of the International Society of Sports Nutrition",
    title: "Examining the effect of Withania somnifera supplementation on muscle strength and recovery: a randomized controlled trial",
    url: "https://pubmed.ncbi.nlm.nih.gov/26609282/",
    summary: "300mg KSM-66 2x/day for 8 weeks increased muscle strength, size, and recovery vs placebo in resistance-trained men.",
  },

  // ------------------------------- Vitamin D (more)
  "vitamin-d-holick-endocrine-2011": {
    authors: "Holick et al.",
    year: 2011,
    journal: "Journal of Clinical Endocrinology & Metabolism",
    title: "Evaluation, treatment, and prevention of vitamin D deficiency: an Endocrine Society clinical practice guideline",
    url: "https://pubmed.ncbi.nlm.nih.gov/21646368/",
    summary: "Endocrine Society guideline. Defines deficiency (<20 ng/mL), insufficiency (20-30), and sufficiency thresholds.",
  },
  "vitamin-d-scragg-vida-2017": {
    authors: "Scragg et al.",
    year: 2017,
    journal: "JAMA Cardiology",
    title: "Monthly High-Dose Vitamin D Supplementation and Cardiovascular Disease (ViDA)",
    url: "https://pubmed.ncbi.nlm.nih.gov/28384678/",
    summary: "ViDA trial (n=5,110). Monthly high-dose vitamin D did not reduce cardiovascular events.",
  },
  "vitamin-d-neale-dhealth-2022": {
    authors: "Neale et al.",
    year: 2022,
    journal: "The Lancet Diabetes & Endocrinology",
    title: "The D-Health Trial: a randomised controlled trial of the effect of vitamin D on mortality",
    url: "https://pubmed.ncbi.nlm.nih.gov/35483396/",
    summary: "D-HEALTH trial (n=21,315). Monthly 60,000 IU vitamin D did not reduce all-cause mortality over 5 years.",
  },

  // ------------------------------- Magnesium (more)
  "magnesium-firoz-graber-2001": {
    authors: "Firoz and Graber",
    year: 2001,
    journal: "Magnesium Research",
    title: "Bioavailability of US commercial magnesium preparations",
    url: "https://pubmed.ncbi.nlm.nih.gov/11794633/",
    summary: "Magnesium oxide had ~4% absorption vs 33% for magnesium chloride/lactate/aspartate forms.",
  },
  "magnesium-rosanoff-2012": {
    authors: "Rosanoff et al.",
    year: 2012,
    journal: "Nutrition Reviews",
    title: "Suboptimal magnesium status in the United States",
    url: "https://pubmed.ncbi.nlm.nih.gov/22364157/",
    summary: "Estimated ~50% of Americans consume less than the EAR for magnesium.",
  },
  "magnesium-liu-magtein-2016": {
    authors: "Liu et al.",
    year: 2016,
    journal: "Journal of Alzheimer's Disease",
    title: "Efficacy and Safety of MMFS-01, a Synapse Density Enhancer, for Treating Cognitive Impairment in Older Adults",
    url: "https://pubmed.ncbi.nlm.nih.gov/26519439/",
    summary: "Magnesium L-threonate (Magtein) improved cognitive ability in older adults with cognitive concerns over 12 weeks.",
  },

  // ------------------------------- Creatine (more)
  "creatine-hmb-wilson-2013": {
    authors: "Wilson et al.",
    year: 2013,
    journal: "European Journal of Applied Physiology",
    title: "The effects of 12 weeks of beta-hydroxy-beta-methylbutyrate free acid supplementation on muscle mass, strength, and power",
    url: "https://pubmed.ncbi.nlm.nih.gov/23755828/",
    summary: "HMB free acid + resistance training produced significantly greater muscle mass and strength gains — the most favorable HMB result published.",
  },

  // ------------------------------- Omega-3 (more)
  "omega3-strength-nicholls-2020": {
    authors: "Nicholls et al.",
    year: 2020,
    journal: "JAMA",
    title: "Effect of High-Dose Omega-3 Fatty Acids vs Corn Oil on Major Adverse Cardiovascular Events (STRENGTH)",
    url: "https://pubmed.ncbi.nlm.nih.gov/33190147/",
    summary: "STRENGTH trial (n=13,078). High-dose EPA/DHA did not reduce cardiovascular events — contradicts REDUCE-IT finding.",
  },
  "omega3-vital-manson-2019": {
    authors: "Manson et al.",
    year: 2019,
    journal: "New England Journal of Medicine",
    title: "Marine n-3 Fatty Acids and Prevention of Cardiovascular Disease and Cancer (VITAL)",
    url: "https://pubmed.ncbi.nlm.nih.gov/30415637/",
    summary: "VITAL omega-3 arm (n=25,871). 1g/day fish oil did not significantly reduce cardiovascular events or cancer.",
  },
  "omega3-mfgd-makrides-2010": {
    authors: "Makrides et al.",
    year: 2010,
    journal: "JAMA",
    title: "Effect of DHA supplementation during pregnancy on maternal depression and neurodevelopment (MFGD)",
    url: "https://pubmed.ncbi.nlm.nih.gov/20978258/",
    summary: "DHA-rich supplementation during pregnancy did not reduce postnatal depression or improve infant neurodevelopment at 18 months.",
  },

  // ------------------------------- Protein timing
  "protein-timing-schoenfeld-2013": {
    authors: "Schoenfeld, Aragon, and Krieger",
    year: 2013,
    journal: "Journal of the International Society of Sports Nutrition",
    title: "The effect of protein timing on muscle strength and hypertrophy: a meta-analysis",
    url: "https://pubmed.ncbi.nlm.nih.gov/24299050/",
    summary: "Meta-analysis finding protein timing has small effects on hypertrophy compared to total daily intake.",
  },

  // ------------------------------- Glycine / sleep
  "glycine-sleep-bannai-2012": {
    authors: "Bannai and Kawai",
    year: 2012,
    journal: "Journal of Pharmacological Sciences",
    title: "New therapeutic strategy for amino acid medicine: glycine improves the quality of sleep",
    url: "https://pubmed.ncbi.nlm.nih.gov/22293292/",
    summary: "3g glycine before bed improved subjective sleep quality and next-day fatigue scores.",
  },
};

export function getStudy(id: string): Study | undefined {
  return studies[id];
}

export function getStudies(ids: string[]): Study[] {
  return ids.map((id) => studies[id]).filter((s): s is Study => !!s);
}
