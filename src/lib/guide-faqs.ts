export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Structured FAQ data mirrored from the prose FAQ sections at the bottom
 * of each guide. Used to emit FAQPage JSON-LD for rich results in Google
 * (accordion in SERP). Keep answers plain-text, no markup. When a guide
 * content file gets new/edited FAQ copy, update the entry here too.
 */
export const guideFaqs: Record<string, FaqItem[]> = {
  "best-creatine-supplements": [
    {
      question: "Is creatine HCl better than monohydrate?",
      answer:
        "No. Creatine HCl dissolves more easily in water, which brands market as better absorption, but solubility and bioavailability are different things. No published study shows HCl produces superior muscle creatine levels compared to monohydrate, and it costs significantly more per effective gram.",
    },
    {
      question: "Can women take creatine?",
      answer:
        "Yes. Research highlights benefits for women including improved strength, body composition, bone health, and mood. Creatine does not cause bulking — the initial 1–2 lbs of weight gain is water drawn into muscle cells, not fat.",
    },
    {
      question: "Does creatine cause bloating?",
      answer:
        "Creatine increases intracellular water retention in muscles, which is part of how it works. This is different from subcutaneous bloating. Most people don't notice visible bloating at maintenance doses (3–5g). Loading doses (20g/day) are more likely to cause temporary GI discomfort.",
    },
    {
      question: "How long does creatine take to work?",
      answer:
        "At maintenance doses (3–5g/day), expect full muscle saturation in about 28 days. With a loading protocol, you can reach saturation in 5–7 days. Performance benefits become noticeable once stores are saturated.",
    },
  ],
  "best-magnesium-supplements": [
    {
      question: "Can you take too much magnesium?",
      answer:
        "The tolerable upper intake level for supplemental magnesium is 350mg/day of elemental magnesium (excluding food). Above this you may experience loose stools, especially with citrate or oxide forms. Glycinate is the most GI-friendly at higher doses.",
    },
    {
      question: "Should I take magnesium glycinate or threonate?",
      answer:
        "Glycinate if your primary goal is sleep, anxiety reduction, or covering a general deficiency. Threonate if you specifically want cognitive benefits. Some people take both — glycinate at night, threonate in the morning. Watch your total elemental magnesium intake.",
    },
    {
      question: "Why is magnesium threonate so expensive?",
      answer:
        "The patented Magtein ingredient carries licensing costs, and the form delivers less elemental magnesium per gram of compound, so you need more capsules to get a meaningful dose. It's genuinely more expensive to produce, not just overpriced.",
    },
    {
      question: "Does magnesium interact with any medications?",
      answer:
        "Yes. Magnesium can interact with antibiotics (tetracyclines, quinolones), bisphosphonates, and some blood pressure medications. Separate magnesium from antibiotics by at least 2 hours, and check with your doctor or pharmacist if you're on prescription medications.",
    },
  ],
  "best-omega-3-supplements": [
    {
      question: "How much omega-3 should I take per day?",
      answer:
        "For general health, aim for 1,000–2,000mg of combined EPA + DHA daily. The American Heart Association recommends at least 1,000mg/day for people with coronary heart disease. Higher doses (2,000–4,000mg) have been used in clinical trials for triglyceride reduction and inflammation.",
    },
    {
      question: "Is fish oil safe to take with blood thinners?",
      answer:
        "Omega-3s have a mild anti-platelet effect. If you're on anticoagulants like warfarin or aspirin, talk to your doctor before starting high-dose fish oil. Standard doses (1,000–2,000mg EPA + DHA) are generally well-tolerated but your provider should be aware.",
    },
    {
      question: "Why does fish oil give me fishy burps?",
      answer:
        "Usually one of three reasons: the oil is oxidized (rancid), you're taking it on an empty stomach, or the product uses ethyl ester form. Switch to a fresh TG-form product, take it with food, and try refrigerating the softgels. Enteric-coated capsules can also help.",
    },
    {
      question: "Is krill oil better than fish oil?",
      answer:
        "Krill oil contains EPA and DHA in phospholipid form and also contains astaxanthin. However, krill oil typically delivers far less EPA + DHA per serving (often 100–200mg total) at a higher cost per milligram. For most people, concentrated TG-form fish oil is more practical and economical.",
    },
  ],
  "best-vitamin-d-supplements": [
    {
      question: "Can I get enough vitamin D from the sun?",
      answer:
        "Theoretically yes — 15–30 minutes of midday sun with arms and legs exposed can produce 10,000–20,000 IU of D3. In practice, most people don't get enough due to latitude, season, sunscreen use, indoor work, and skin tone. Above 37°N latitude, skin produces virtually zero vitamin D from November through February.",
    },
    {
      question: "Is 5,000 IU of vitamin D safe to take daily?",
      answer:
        "For most adults, 5,000 IU/day is safe and commonly used to correct insufficiency. The Endocrine Society considers up to 10,000 IU/day the tolerable upper limit. However, individual responses vary — use blood testing to find your dose rather than defaulting to a high number indefinitely.",
    },
    {
      question: "Should I take vitamin D in the morning or evening?",
      answer:
        "Take it with your largest meal for fat content. Some anecdotal reports suggest evening vitamin D can interfere with sleep by suppressing melatonin, though clinical evidence for this is limited. If you notice sleep disruption, switch to a morning or lunchtime dose with food.",
    },
    {
      question: "Do I need vitamin D if I take a multivitamin?",
      answer:
        "Most multivitamins contain 400–1,000 IU of vitamin D, which is likely insufficient for anyone deficient or insufficient. Check the label, get blood levels tested, and supplement the difference. A multivitamin is a starting point, not necessarily the whole solution.",
    },
  ],
  "best-sleep-supplement-protocol": [
    {
      question: "Can I take all three core supplements together?",
      answer:
        "Yes. Magnesium glycinate, L-theanine, and glycine work through different mechanisms and don't compete for absorption or interfere with each other. Taking them together 30–60 minutes before bed is the simplest approach. No need to stagger.",
    },
    {
      question: "Will I become dependent on sleep supplements?",
      answer:
        "Not with this stack. Unlike prescription sleep medications or even high-dose melatonin, magnesium, L-theanine, and glycine do not create physical dependency. You can stop taking them at any time without rebound insomnia.",
    },
    {
      question: "How long before I notice a difference?",
      answer:
        "Some people notice improved relaxation the first night, especially from L-theanine and glycine. The full effect — particularly from magnesium — builds over 2–3 weeks as your body's stores normalize. Judge the protocol at the 3-week mark, not after one night.",
    },
    {
      question: "What if I'm already taking a multivitamin with magnesium?",
      answer:
        "Most multivitamins contain 50–100mg of magnesium in oxide form (poorly absorbed), which isn't enough to affect sleep meaningfully. You can still take 200–400mg of magnesium glycinate in the evening — the total is within safe limits. The upper tolerable intake for supplemental magnesium is 350mg elemental per day from supplements.",
    },
  ],
  "ashwagandha-guide": [
    {
      question: "Can ashwagandha cause weight gain?",
      answer:
        "Some people report increased appetite, which could lead to weight gain indirectly. The cortisol reduction may also normalize stress-related undereating. In clinical trials, ashwagandha has been associated with modest increases in lean mass, not fat gain. If you gain weight on ashwagandha, it's likely muscle tissue or simply eating more — not a direct pharmacological effect.",
    },
    {
      question: "Does ashwagandha interact with antidepressants or anxiety medications?",
      answer:
        "Ashwagandha has GABAergic and serotonergic activity, meaning it could theoretically potentiate the effects of SSRIs, benzodiazepines, or other CNS-active medications. There are no well-documented dangerous interactions in the literature, but the theoretical risk is real enough that you should discuss it with your prescribing doctor before adding it.",
    },
    {
      question: "KSM-66 or Sensoril — which should I take?",
      answer:
        "For most people, KSM-66 at 600mg/day is the better starting point. More published trials, broader evidence base, and most people tolerate it well in the morning without drowsiness. Choose Sensoril at 125–250mg if your primary goal is sleep or anxiety and you want a more sedating effect.",
    },
    {
      question: "How long does ashwagandha take to work?",
      answer:
        "Most people notice changes in stress reactivity and sleep quality within 2–4 weeks. Cortisol and testosterone data in trials typically reaches statistical significance at the 8-week mark. Give it a full 8–12 week trial before deciding whether it's working for you.",
    },
  ],
  "zinc-guide": [
    {
      question: "Can zinc supplements cause nausea?",
      answer:
        "Yes, and this is the most common side effect. Zinc taken on an empty stomach triggers nausea in many people, sometimes severe enough to cause vomiting. Always take zinc with food. If you still experience discomfort, switch to zinc bisglycinate, which is the gentlest chelated form on the stomach.",
    },
    {
      question: "Is it safe to take zinc every day long-term?",
      answer:
        "At doses of 15–30mg/day, zinc is safe for indefinite daily use — provided you also supplement with 1–2mg of copper to prevent copper depletion. Stay at or below 40mg/day from all sources, and get a serum zinc and copper panel annually if you're supplementing long-term.",
    },
    {
      question: "Does zinc really help with acne?",
      answer:
        "There's moderate evidence. A 2014 meta-analysis found that oral zinc supplementation (30–45mg/day of elemental zinc) reduced inflammatory acne lesion counts, though less effectively than antibiotics. For people with mild to moderate acne who are also zinc deficient, it can meaningfully help.",
    },
    {
      question: "Should I take zinc if I'm already eating red meat regularly?",
      answer:
        "Maybe not. A 6oz serving of beef provides about 7mg of zinc in a highly bioavailable form. If you eat red meat or shellfish several times per week and don't have risk factors like heavy exercise, GI issues, or heavy sweating, you may be getting enough from food. Track your intake or get a serum zinc test to know for sure.",
    },
  ],
  "lions-mane-guide": [
    {
      question: "How long does lion's mane take to work?",
      answer:
        "Most people notice subtle improvements in focus, verbal fluency, or mental clarity after 2–4 weeks of consistent daily use. The Mori 2009 study showed progressive improvement at 8, 12, and 16 weeks, suggesting benefits compound over time.",
    },
    {
      question: "Can I take lion's mane with other nootropics or supplements?",
      answer:
        "Yes. Lion's mane plays well with most supplement stacks. It's commonly paired with omega-3s, vitamin D, and adaptogens like ashwagandha. No known significant drug interactions in the published literature, though if you're on prescription medications, check with your doctor.",
    },
    {
      question: "Is lion's mane a psychedelic or does it cause a 'high'?",
      answer:
        "No. Despite being a mushroom, lion's mane has zero psychoactive properties. It contains no psilocybin, psilocin, or any other psychedelic compound. It will not alter your state of consciousness, produce euphoria, or impair your ability to drive or work.",
    },
    {
      question: "Fruiting body or mycelium — which should I actually buy?",
      answer:
        "For most people, fruiting body extract is the safer bet. More consistent active compound content, verified beta-glucan levels, and avoids the grain starch contamination issue. If you want to try mycelium, look for brands that specifically separate the mycelium from its growth substrate and verify low starch content (<5%).",
    },
  ],
  "nac-guide": [
    {
      question: "Can I take NAC every day long-term?",
      answer:
        "Yes. NAC has been used continuously for months to years in clinical trials and as a prescribed mucolytic without significant accumulation or tolerance issues. It's not something you need to cycle.",
    },
    {
      question: "Is NAC the same as glutathione?",
      answer:
        "No. NAC is a precursor to glutathione, not glutathione itself. It provides the cysteine your cells need to manufacture glutathione internally. Oral glutathione has poor bioavailability because it breaks down in digestion, while NAC survives the GI tract and delivers cysteine directly to cells.",
    },
    {
      question: "Should I take NAC before or after drinking alcohol?",
      answer:
        "Before. NAC works by pre-loading glutathione stores so your liver has ammunition ready when alcohol metabolites hit. A common protocol is 600–1,200mg taken 30–60 minutes before your first drink. Do not take NAC during or after active drinking.",
    },
    {
      question: "Why does NAC smell so bad?",
      answer:
        "NAC is a sulfur-containing compound. The sulfur is what makes it biochemically useful — the thiol (-SH) group is the reactive site that enables glutathione's antioxidant activity. Capsules largely eliminate the taste issue; if using powder, mix it into a strongly flavored drink and consume quickly.",
    },
  ],
  "berberine-guide": [
    {
      question: "Can I take berberine and metformin together?",
      answer:
        "Technically yes, but only under medical supervision with blood glucose monitoring. Both compounds lower blood sugar through similar mechanisms, so combining them significantly increases the risk of hypoglycemia. Do not combine these on your own — the risk of a dangerous blood sugar crash is real.",
    },
    {
      question: "How long does berberine take to work?",
      answer:
        "Blood sugar effects can be detected within the first week, but clinically meaningful changes in HbA1c take at least 8–12 weeks to manifest. Most clinical trials showing significant results ran for 12–13 weeks. Commit to at least three months before evaluating, with blood work before and after.",
    },
    {
      question: "Is dihydroberberine better than regular berberine?",
      answer:
        "Dihydroberberine has roughly 5x higher bioavailability than standard berberine. You can take a lower dose (200–300mg vs 500mg) for equivalent blood levels, typically with fewer GI side effects. Trade-off: DHB has far less direct clinical trial evidence. If GI tolerance isn't an issue, standard berberine has the deeper evidence base.",
    },
    {
      question: "Does berberine affect gut bacteria?",
      answer:
        "Yes. Berberine has broad antimicrobial properties and modulates gut microbiome composition, increasing beneficial bacteria like Akkermansia muciniphila while reducing populations linked to inflammation. Some of berberine's metabolic benefits may be mediated through these microbiome changes.",
    },
  ],
  "vitamin-b12-guide": [
    {
      question: "Can I get enough B12 from fortified foods alone?",
      answer:
        "Technically yes, but it requires careful planning. Fortified plant milks, cereals, and nutritional yeast typically provide 1–3mcg per serving. You'd need multiple servings spread throughout the day since active absorption saturates at ~1.5mcg per meal. Most dietitians recommend supplementation as a more reliable strategy.",
    },
    {
      question: "Are B12 injections better than oral supplements?",
      answer:
        "For severe, symptomatic deficiency — especially with neurological involvement — injections provide the fastest correction and bypass absorption issues. For maintenance and mild-to-moderate deficiency, high-dose oral or sublingual methylcobalamin is equally effective in most people.",
    },
    {
      question: "I take metformin for longevity. Should I worry about B12?",
      answer:
        "Yes. Even at lower longevity doses (500–1,000mg/day), metformin's B12 absorption impairment is present. The ADA recommends periodic B12 monitoring for all metformin users. A reasonable protocol: 500–1,000mcg/day sublingual methylcobalamin alongside metformin, with annual serum B12 and MMA testing.",
    },
    {
      question: "Does B12 interact with any medications?",
      answer:
        "PPIs, H2 blockers, metformin, and colchicine reduce B12 absorption and may necessitate higher supplement doses. Chloramphenicol can interfere with B12's role in red blood cell production. No known cases of B12 supplementation reducing the effectiveness of other medications.",
    },
  ],
  "collagen-guide": [
    {
      question: "Is collagen just expensive protein?",
      answer:
        "Partially. Collagen is an incomplete protein — it lacks tryptophan, so it can't replace your protein intake. Where it differs is its unique amino acid profile: ~33% glycine, 10% proline, and significant hydroxyproline — amino acids underrepresented in most diets and specifically used in connective tissue synthesis.",
    },
    {
      question: "Can vegetarians or vegans get collagen benefits?",
      answer:
        "Not from collagen supplements — all collagen is animal-derived. 'Vegan collagen boosters' typically contain vitamin C, proline, glycine, and other precursors, which support your body's own collagen synthesis but are not the same as providing bioactive collagen peptides.",
    },
    {
      question: "Does bone broth give you the same benefits?",
      answer:
        "Bone broth contains collagen, but amounts vary widely. A 2019 analysis found commercial bone broth collagen ranged from 2.4 to 21.2 mg/mL — a 9-fold difference. A cup might give you 2–5g, on the low end of clinical doses. Supplements offer more consistent dosing.",
    },
    {
      question: "Can collagen supplements cause side effects?",
      answer:
        "Side effects are rare and mild. Some people report aftertaste (especially marine collagen), bloating, or fullness. People with fish or shellfish allergies should avoid marine collagen. No serious adverse events reported in clinical trials at standard doses up to 15g daily.",
    },
  ],
  "iron-guide": [
    {
      question: "Why does iron cause constipation and dark stools?",
      answer:
        "Unabsorbed iron feeds iron-loving bacteria that slow intestinal motility, and it reacts with hydrogen sulfide in the colon to form iron sulfide (black). Both effects are more common with ferrous sulfate than chelated forms like iron bisglycinate. Switching to bisglycinate or every-other-day dosing usually resolves these issues.",
    },
    {
      question: "Can I take iron and calcium at the same time?",
      answer:
        "You shouldn't. Calcium inhibits iron absorption — a 200mg calcium dose can reduce iron uptake by 50–60%. Space iron and calcium by at least 2 hours. A common strategy is iron in the morning with vitamin C, calcium in the evening.",
    },
    {
      question: "How long does it take to correct iron deficiency?",
      answer:
        "Most people notice symptom improvement within 2–4 weeks of starting supplementation. Fully repleting ferritin stores typically takes 3–6 months. Don't stop early just because you feel better. Get follow-up ferritin testing at 8–12 weeks.",
    },
    {
      question: "Is heme iron from supplements better than non-heme?",
      answer:
        "Heme iron absorbs better (15–35% vs 2–20% for non-heme) and is less affected by food interactions. However, heme iron may increase oxidative stress and has been linked to slightly elevated colorectal cancer risk at very high intakes. For most people, well-absorbed non-heme forms like iron bisglycinate provide a better balance.",
    },
  ],
  "creatine-loading-phase": [
    {
      question: "Is creatine safe for teenagers?",
      answer:
        "The ISSN states there is no evidence that creatine is harmful for adolescents. However, most sports medicine organizations recommend it primarily for athletes 18+ out of an abundance of caution. For teenagers, the priority should be nutrition, training, and sleep before supplementation.",
    },
    {
      question: "Does creatine cause hair loss?",
      answer:
        "This comes from a single 2009 study that found creatine increased DHT levels by 56% in rugby players. No follow-up study has replicated this finding, and no study has directly measured hair loss from creatine. The concern is theoretically plausible but currently unsupported by evidence.",
    },
    {
      question: "Should I take creatine on rest days?",
      answer:
        "Yes. Creatine works by maintaining muscle saturation over time. It's not a pre-workout stimulant — it's a daily supplement. Taking it only on training days means your stores never fully saturate.",
    },
    {
      question: "Does the brand of creatine monohydrate matter?",
      answer:
        "Not much. Creapure (manufactured in Germany) is the highest-purity source, but independent testing of major brands consistently shows that most monohydrate products contain what they claim. Don't overpay for fancy branding on what is essentially a commodity ingredient.",
    },
  ],
  "how-to-build-a-supplement-stack": [
    {
      question: "Do I really need bloodwork, or can I just start taking things?",
      answer:
        "You can start with the foundation stack (D3, magnesium, omega-3, creatine) without bloodwork — the risk of harm at recommended doses is very low. But bloodwork transforms supplementation from guessing to precision. It tells you what to prioritize, what to skip, and what dose to use.",
    },
    {
      question: "Should I take a multivitamin instead of individual supplements?",
      answer:
        "Most multivitamins use cheap forms at doses too low to correct deficiencies. Individual supplements let you choose the form, control the dose, and avoid paying for 30 ingredients when you need 4. A high-quality multi can work as a low-effort baseline if you're not ready to build a full stack.",
    },
    {
      question: "How do I know if a supplement is actually working?",
      answer:
        "For deficiency-correcting supplements (D3, magnesium, iron), follow-up bloodwork is the gold standard. For subjective benefits (sleep, energy, mood), keep a simple log for 3–4 weeks rating each on a 1–10 scale daily. Without tracking you're relying on memory bias.",
    },
    {
      question: "Can I take all my supplements at the same time?",
      answer:
        "Some, but not all. Fat-soluble vitamins (D, E, K, A) need food with fat. Calcium and iron compete for absorption and should be separated by at least 2 hours. Magnesium is best in the evening. Caffeine-containing supplements should be avoided after early afternoon.",
    },
  ],
  "strength-training-frequency-longevity": [
    {
      question: "Is lifting twice a week really enough?",
      answer:
        "For mortality benefit, yes. Large cohort studies (including a 2022 systematic review in the British Journal of Sports Medicine) found that 30–60 minutes of strength training per week is associated with the lowest all-cause mortality risk, with diminishing returns beyond that. Twice a week captures the majority of the longevity effect even if it's suboptimal for peak hypertrophy.",
    },
    {
      question: "Does lifting more often produce better results?",
      answer:
        "For strength and mortality, barely. The jump from 0 to 2 sessions is enormous; from 2 to 5 is small. More frequency helps if your goal is maximum hypertrophy (hitting each muscle 2× per week is the sweet spot) but adds little health benefit. Extra sessions mostly trade recovery capacity for incremental gains.",
    },
    {
      question: "Should I lift every day to maximize longevity?",
      answer:
        "No. Daily lifting accumulates systemic fatigue, raises injury risk, and crowds out cardio and recovery — all of which matter for longevity. Most research showing mortality benefits used 2–3 sessions per week. More than 4 strength sessions weekly shows no additional mortality reduction and some large cohorts suggest the curve may flatten or slightly reverse.",
    },
  ],
  "best-longevity-exercises": [
    {
      question: "What's the single best exercise for longevity?",
      answer:
        "If forced to pick one, a loaded carry (farmer's walk) comes closest. It trains grip strength (a strong mortality predictor), leg strength, core stability, and aerobic capacity simultaneously. No other single exercise covers that many mortality-relevant fitness markers in one movement.",
    },
    {
      question: "Do I need to do cardio if I lift heavy?",
      answer:
        "Yes. Strength training and cardio produce largely independent mortality benefits. Lifting builds muscle mass, bone density, and metabolic health; cardio raises VO2 max, the single strongest modifiable mortality predictor. Doing both adds the benefits — doing one gets you only half the longevity effect.",
    },
    {
      question: "Are bodyweight exercises enough for longevity?",
      answer:
        "For older beginners, yes — push-ups, squats, pull-ups, and carries done hard will produce meaningful gains. But most adults will plateau within 6–12 months and need external load (dumbbells, barbells, or weighted vests) to keep driving adaptation. Strength for longevity requires progressive overload, and bodyweight eventually runs out of room to progress.",
    },
  ],
  "zone-2-cardio-longevity": [
    {
      question: "How do I know I'm actually in Zone 2?",
      answer:
        "The talk test is the most reliable field method: you should be able to hold a conversation in complete sentences but not comfortably sing. If you're gasping, you're above Zone 2; if you can recite a podcast transcript, you're below. Heart rate estimates (roughly 60–70% of max) are a useful backup but vary widely between individuals.",
    },
    {
      question: "Can I do Zone 2 on a treadmill or stationary bike?",
      answer:
        "Yes. The physiological adaptations depend on intensity and duration, not the modality. Cycling, walking, rowing, and elliptical all work. Cycling is often easier for hitting true Zone 2 because walking may be too easy and running too hard for deconditioned adults to stay in the window.",
    },
    {
      question: "Is Zone 2 better than HIIT for longevity?",
      answer:
        "They produce different adaptations and work best together. Zone 2 builds mitochondrial density and fat oxidation; HIIT raises your VO2 max ceiling. The strongest research supports a polarized split — about 80% Zone 2, 20% HIIT — rather than choosing one.",
    },
  ],
  "minimum-effective-dose-strength-training": [
    {
      question: "What's the absolute minimum that still counts?",
      answer:
        "Two full-body sessions per week, 30–45 minutes each, with 2–3 hard sets per major movement taken within 0–3 reps of failure. This captures roughly 80% of strength gains and nearly all the mortality benefit. Below this, adaptations are inconsistent and gains are hard to sustain.",
    },
    {
      question: "Can I combine lifting and cardio in one session?",
      answer:
        "Yes, and for time-constrained trainees it's often the right call. The interference effect (cardio blunting strength gains) is real but small at moderate volumes. Lift first while you're fresh, then do cardio. Separating them by several hours is ideal but not required for health outcomes.",
    },
    {
      question: "Do I lose strength faster as I age if I train minimally?",
      answer:
        "Minimum-dose training preserves strength well into your 60s and 70s as long as intensity stays high. The trap isn't low volume — it's low intensity. Two weekly sessions of hard sets beat five sessions of easy sets for preserving strength and muscle mass.",
    },
  ],
  "weekly-longevity-training-plan": [
    {
      question: "What if I can only train three days a week?",
      answer:
        "Do two full-body strength sessions and one longer Zone 2 + HIIT combined session. You'll capture the majority of the benefit. Walk daily on off-days as your baseline activity. This three-day structure preserves the most important adaptations — strength, VO2 max, and aerobic base.",
    },
    {
      question: "How long until I see results from a complete weekly plan?",
      answer:
        "Strength gains show up in 4–6 weeks. VO2 max improvements are measurable at 8–12 weeks. Body composition changes take 3–6 months with consistent training and adequate protein. The mortality-protective adaptations (mitochondrial density, insulin sensitivity, resting heart rate) begin within weeks but compound over years.",
    },
    {
      question: "Is it okay to do strength and cardio on the same day?",
      answer:
        "Yes, and often necessary for busy weeks. Lift first, then do cardio. The interference effect is real but small at recreational volumes. If you care about strength, keep high-intensity cardio (HIIT) on non-lifting days when possible. Zone 2 after lifting is fine and may even aid recovery.",
    },
  ],
  "vo2-max-longevity": [
    {
      question: "How do I measure my VO2 max without a lab test?",
      answer:
        "The 1-mile walk test, the Cooper 12-minute run test, and modern smartwatches (Apple Watch, Garmin, Polar) all provide reasonable estimates. Watch estimates are typically within 10–15% of lab values and accurate enough to track change over time. For absolute precision, a CPET (cardiopulmonary exercise test) at a sports lab costs $150–300.",
    },
    {
      question: "How much can I realistically improve my VO2 max?",
      answer:
        "Untrained adults can improve VO2 max by 15–25% in six months of structured training. Even people over 60 show 10–20% improvements with consistent Zone 2 plus weekly HIIT. Genetic ceiling matters, but virtually everyone who trains structured cardio moves meaningfully up the mortality curve.",
    },
    {
      question: "Does strength training improve VO2 max?",
      answer:
        "Minimally. Strength training produces small VO2 max improvements (3–5%) in untrained individuals and essentially none in trained ones. If VO2 max is your target, you need cardiovascular training — Zone 2 for the base and HIIT for the ceiling. Lifting is complementary, not a substitute.",
    },
  ],
  "grip-strength-longevity": [
    {
      question: "What's a good grip strength for my age?",
      answer:
        "Rough targets by dynamometer (dominant hand): men aged 30–50 should hit 45–55 kg; women 28–35 kg. Below 26 kg for men or 16 kg for women is considered the threshold for sarcopenia risk. Grip declines about 1% per year after 50 — staying above your age cohort's median is the practical target.",
    },
    {
      question: "Can I train grip strength without dedicated exercises?",
      answer:
        "Partially. Heavy deadlifts, rows, and pull-ups done without straps will build grip — but most people plateau. Dedicated work (farmer's carries, dead hangs, thick-bar holds) 1–2 times per week adds the final 20–30% and protects against the aging decline. Total weekly time: 10 minutes is enough.",
    },
    {
      question: "Do grip trainers (spring-loaded squeezers) work?",
      answer:
        "Barely. They train crushing strength in a short range of motion but don't transfer well to real-world grip or the strength the mortality research measures. Farmer's carries and dead hangs train grip under load and duration — the version that actually correlates with mortality outcomes.",
    },
  ],
  "how-to-train-after-50": [
    {
      question: "Is heavy lifting safe after 50?",
      answer:
        "Yes, and necessary. Heavy compound lifting is one of the few proven interventions for bone density in postmenopausal women and for preserving fast-twitch muscle fibers that decline most with age. Start with good technique, progress conservatively, but don't cap your loads at 'light.' Research on adults 60+ consistently shows better outcomes with heavier training.",
    },
    {
      question: "Do I need more recovery time after 50?",
      answer:
        "Slightly, but less than most people assume. Muscle protein synthesis recovers within 48 hours in trained older adults — the same window as younger lifters. Connective tissue and joints take longer. The practical difference is more attention to warm-ups, sleep, and protein intake, not fewer workouts.",
    },
    {
      question: "How much protein do I really need after 50?",
      answer:
        "1.6–2.2 g per kg of bodyweight daily, spread across 3–4 meals with at least 30g each. Older adults are anabolically resistant — they need a higher threshold per meal to trigger muscle protein synthesis. A 75 kg (165 lb) person should target 120–165g of protein daily, not 60.",
    },
  ],
  "sets-per-muscle-per-week": [
    {
      question: "Can I grow muscle with fewer than 10 sets per week?",
      answer:
        "Yes. The 10-set minimum is an average for trained lifters pursuing maximum hypertrophy. For general strength, health, and even meaningful muscle growth, 4–10 hard sets per muscle per week produces real results — especially if those sets are taken close to failure. Lower volume works fine for most people.",
    },
    {
      question: "Does going above 20 sets per muscle give more gains?",
      answer:
        "Marginally, and only for advanced lifters pushing for peak aesthetics. Above 20 hard sets per week, most people hit a wall — recovery can't keep pace, technique degrades, and injury risk climbs. The research shows clear diminishing returns past this range for natural lifters.",
    },
    {
      question: "How do I count sets for compound lifts that hit multiple muscles?",
      answer:
        "Direct sets count as 1.0 for the primary muscle and 0.5 for secondary muscles. A set of barbell rows counts as 1 set for back, 0.5 for biceps. A bench press is 1 set for chest, 0.5 for triceps and front delts. This prevents overcounting and matches how the hypertrophy research typically tallies volume.",
    },
  ],
  "best-exercises-for-legs": [
    {
      question: "Are squats necessary or can I skip them?",
      answer:
        "You can skip the barbell back squat, but you can't skip the squat pattern. Trap bar deadlifts, goblet squats, split squats, and leg press all hit the same muscles with less spinal loading. Pick the variation that matches your mobility and equipment — the movement pattern is what matters, not the specific tool.",
    },
    {
      question: "Is the leg press as good as squats for longevity?",
      answer:
        "For muscle growth and strength, close. For longevity-relevant skills like balance, coordination, and core stability, no. The leg press is a useful tool but shouldn't be the only leg exercise in your program. Pair it with at least one free-weight lower-body lift (trap bar deadlift, goblet squat, or split squat).",
    },
    {
      question: "How often should I train legs?",
      answer:
        "Twice per week is the sweet spot for most adults. Each session should hit a squat pattern, a hinge pattern, and at least one single-leg movement. Total weekly volume of 8–16 hard sets across the lower body covers strength and longevity goals without creating recovery problems.",
    },
  ],
  "best-exercises-for-back": [
    {
      question: "Do I need to deadlift for a strong back?",
      answer:
        "No, but you need something that loads the posterior chain heavily. Trap bar deadlifts, Romanian deadlifts, kettlebell swings, and heavy rows all work. The conventional barbell deadlift produces the most total back recruitment, but alternatives are nearly as effective with lower technique demands and lower injury risk for beginners.",
    },
    {
      question: "Why should I do face pulls?",
      answer:
        "Face pulls train the rear delts and mid-trap — the postural muscles that counter hours of sitting and phone use. Most people press far more than they pull, which creates shoulder imbalances and contributes to the upper-back rounding (kyphosis) that independently predicts mortality in older adults. Two sets, twice a week, fixes most of this.",
    },
    {
      question: "What's the ideal push-to-pull ratio?",
      answer:
        "At least 1:1, ideally 1:1.5 or 1:2 in favor of pulling for most adults. Modern lifestyles already bias people toward rounded-forward posture. Training pulling movements slightly more than pushing corrects this. Track your weekly sets: if you bench twice and row once, you're inverted.",
    },
  ],
  "zone-2-vs-hiit": [
    {
      question: "Can I skip Zone 2 and just do HIIT?",
      answer:
        "You can, but you'll plateau fast. HIIT without an aerobic base runs into recovery problems within weeks — heart rate stays elevated, sleep degrades, and session quality drops. Zone 2 builds the mitochondrial base that makes HIIT sustainable and effective. Pure HIIT plans produce fast initial gains followed by stagnation.",
    },
    {
      question: "Is one HIIT session per week really enough?",
      answer:
        "For VO2 max gains and longevity outcomes, yes. Research (notably the Norwegian 4×4 protocol) shows that a single weekly high-intensity session, done hard, produces substantial VO2 max improvements. Two sessions can accelerate gains for athletes but adds recovery debt for most recreational trainees.",
    },
    {
      question: "What exactly counts as a HIIT session?",
      answer:
        "True HIIT means intervals at 90–100% of max heart rate, typically 30 seconds to 4 minutes of work with matched or longer recovery. The Norwegian 4×4 (four 4-minute intervals at ~90% max HR, with 3-minute active recovery) is the most-studied protocol. Steady-state cardio at 'moderately hard' effort is not HIIT.",
    },
  ],
  "walking-vs-running-longevity": [
    {
      question: "Is walking 10,000 steps really the right target?",
      answer:
        "The evidence for 10,000 steps specifically is weak — it started as a 1960s Japanese marketing slogan. Research points to 7,000–8,000 steps per day as the point where mortality benefits plateau for most adults. More is fine but adds diminishing returns. Sedentary people can get major benefits from moving from 3,000 to 7,000 daily.",
    },
    {
      question: "If running is better per minute, why not just run?",
      answer:
        "Because people don't stick with it. The dropout rate for new runners is over 50% in the first year, largely from injury. Walking has an injury rate a fraction of running's, and adherence at five years is dramatically higher. The best exercise is the one you actually do — and for most people that's walking.",
    },
    {
      question: "Should I walk every day or take rest days?",
      answer:
        "Walking daily is fine and probably optimal. It's low enough intensity that it doesn't require recovery days for most people, and the mortality research consistently shows benefits at daily-walking volumes. Treat walking as baseline activity, not training — it should add to your week, not compete with your strength and cardio sessions.",
    },
  ],
  "protein-intake-muscle-after-40": [
    {
      question: "Is 1 gram of protein per pound of bodyweight necessary?",
      answer:
        "For maximum hypertrophy, 0.7–1.0 g/lb (about 1.6–2.2 g/kg) is the range research supports. For general health and muscle preservation after 40, 0.6–0.8 g/lb is enough. Very high protein intakes don't add benefit in most people and can crowd out fiber and micronutrient-dense foods.",
    },
    {
      question: "Do I really need 30g of protein per meal?",
      answer:
        "After 40, yes. Older adults are anabolically resistant — meals below ~25–30g of protein don't trigger full muscle protein synthesis. Younger adults can do more with less. This is why protein distribution (3–4 meals × 30g) matters more after 40 than it does at 25.",
    },
    {
      question: "Is plant protein as good as animal protein?",
      answer:
        "Close, but not identical. Plant proteins have lower leucine content per gram, which matters for triggering muscle protein synthesis. Soy is nearly equivalent to whey. Other plant sources (pea, rice, hemp) work if you eat slightly more total protein and combine sources. For older adults specifically, animal protein has a modest edge per gram.",
    },
  ],
  "sarcopenia-reverse-muscle-loss": [
    {
      question: "Can I reverse muscle loss at 70?",
      answer:
        "Yes. Multiple RCTs show significant muscle mass and strength gains in adults 70+ with 8–12 weeks of progressive resistance training. The rate of gain is slower than in younger adults but the direction is unambiguously upward. It's never too late to start; the floor just sets lower.",
    },
    {
      question: "Do I need heavy weights to reverse sarcopenia?",
      answer:
        "Not initially. Bodyweight and light resistance produce gains in previously sedentary older adults within 4–8 weeks. But progression is essential — without load increases over time, gains plateau. Within 3–6 months, most older adults should be working with dumbbells, machines, or barbells in the range of 60–80% of their one-rep max.",
    },
    {
      question: "Is protein or exercise more important for fighting sarcopenia?",
      answer:
        "Exercise is the primary driver; protein is the enabler. Resistance training triggers muscle protein synthesis; protein provides the substrate. Neither works well alone in older adults — protein without training produces no meaningful muscle gain, and training without sufficient protein leaves gains on the table. Both are non-negotiable.",
    },
  ],
};

export function getFaqsForGuide(slug: string): FaqItem[] | undefined {
  return guideFaqs[slug];
}
