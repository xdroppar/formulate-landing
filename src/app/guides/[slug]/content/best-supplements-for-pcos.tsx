import {
  TLDRBox,
  Callout,
  ProductCallout,
  ComparisonTable,
  EvidenceBadge,
  PRODUCTS,
} from "@/components/guide";

export function BestSupplementsForPcos() {
  return (
    <>
      <TLDRBox
        readTime="12 min read"
        takeaways={[
          "Myo-inositol + D-chiro-inositol (40:1 ratio, 2\u20134g/day) has the strongest evidence for improving insulin sensitivity, ovulation, and cycle regularity in PCOS.",
          "NAC (1.5\u20133g/day) and vitamin D (2,000\u20135,000 IU if deficient) both independently improve ovulation rates and metabolic markers.",
          "Berberine mimics metformin\u2019s insulin-sensitizing effects but should never be combined with metformin without medical supervision.",
          "Skip high-dose biotin (skews thyroid labs), cinnamon extract (weak PCOS-specific data), and excess iodine (can worsen thyroid issues common in PCOS).",
          "Introduce one supplement at a time and track cycle length, hirsutism, weight, and mood for at least 3 months before adding another.",
        ]}
      />

      <p>
        The best supplements for PCOS target the condition&rsquo;s root drivers&mdash;insulin resistance, androgen excess, and chronic inflammation&mdash;rather than masking symptoms. Inositol, NAC, vitamin D, magnesium, omega-3s, and berberine each have meaningful clinical evidence in PCOS populations. Below, we break down exactly which ones move the needle, at what doses, and who should be cautious.
      </p>

      <h2>Why PCOS Needs a Multi-Target Approach</h2>

      <p>
        PCOS isn&rsquo;t one disease. It&rsquo;s a cluster of metabolic, hormonal, and inflammatory dysfunctions that feed each other. Elevated insulin drives the ovaries to overproduce androgens. Those androgens disrupt follicle development. Chronic low-grade inflammation worsens insulin resistance, completing the loop.
      </p>

      <p>
        No single supplement breaks every link in that chain. That&rsquo;s why endocrine researchers increasingly talk about &ldquo;multi-target&rdquo; PCOS management: insulin-sensitizing agents, anti-androgen support, inflammation control, and correction of the nutrient deficiencies that are disproportionately common in PCOS patients (vitamin D, magnesium, and chromium among them).
      </p>

      <Callout variant="info" title="PCOS Subtypes Matter">
        Insulin-resistant PCOS, lean PCOS, inflammatory PCOS, and post-pill PCOS don&rsquo;t all respond to the same stack. We cover subtype-specific recommendations below.
      </Callout>

      <p>
        The practical rule: address insulin first (inositol or berberine), then layer in anti-inflammatory and deficiency-correction supplements one at a time. Track outcomes over 3-month windows&mdash;that&rsquo;s roughly one full hormonal cycle of adaptation.
      </p>

      <h2>Inositol: The First-Line Supplement</h2>

      <p>
        If you take only one supplement for PCOS, the evidence points to inositol&mdash;specifically a combination of myo-inositol (MI) and D-chiro-inositol (DCI) in a 40:1 ratio. This mirrors the body&rsquo;s natural ratio and avoids the ovarian toxicity that high-dose DCI alone can cause.
      </p>

      <p>
        A meta-analysis by Unfer et al. (2017) pooling data from multiple RCTs found that myo-inositol significantly improved insulin sensitivity, restored ovulation, and regularized menstrual cycles in PCOS patients. <EvidenceBadge level="moderate" /> (Disclosure: Unfer is a co-inventor on inositol patents and co-founder of Lo.Li Pharma, a major inositol manufacturer. His findings are broadly corroborated by independent reviews &mdash; e.g., Pundir et al., 2018 in the Cochrane Database &mdash; but readers should weigh the primary author&rsquo;s commercial interest.) Several small head-to-head trials (Raffone et al. 2010, n=120; Fruzzetti et al. 2012, n=50) suggest insulin-sensitizing effects in a similar range to metformin, though these studies were not powered to confirm equivalence. The GI side effect profile is consistently better than metformin across trials.
      </p>

      <Callout variant="evidence" title="Dosing: Inositol">
        <strong>Form:</strong> Myo-inositol + D-chiro-inositol, 40:1 ratio<br />
        <strong>Dose:</strong> 2,000&ndash;4,000 mg myo-inositol daily (typically split AM/PM)<br />
        <strong>Timeline:</strong> Most trials show measurable cycle changes within 3&ndash;6 months<br />
        <strong>Note:</strong> Powder form is typically more cost-effective than capsules at these doses
      </Callout>

      <p>
        Inositol also improved oocyte quality in IVF patients with PCOS (Ciotta et al., 2011), making it relevant for those actively pursuing fertility. <EvidenceBadge level="moderate" /> Side effects are minimal&mdash;mild GI upset at high doses is the most commonly reported issue.
      </p>

      <h2>NAC for Ovulation and Insulin</h2>

      <p>
        N-acetylcysteine (NAC) is a precursor to glutathione, the body&rsquo;s master antioxidant. In PCOS, it pulls double duty: reducing oxidative stress and directly improving insulin signaling. For a deeper dive on mechanisms, see our full <a href="/guides/nac-guide">NAC guide</a>.
      </p>

      <p>
        Fulghesu et al. (2002) demonstrated that NAC at 1.8g/day improved ovulation rates and oral glucose tolerance test results in clomiphene-resistant PCOS patients compared to placebo. <EvidenceBadge level="moderate" /> A later trial by Rizk et al. (2005) found NAC as an adjunct to clomiphene significantly increased ovulation and pregnancy rates.
      </p>

      <Callout variant="evidence" title="Dosing: NAC">
        <strong>Dose:</strong> 1,500&ndash;3,000 mg/day, divided into 2&ndash;3 doses<br />
        <strong>Form:</strong> Standard NAC capsules or powder<br />
        <strong>Timing:</strong> Take with food to reduce the sulfurous GI effects<br />
        <strong>Note:</strong> May thin cervical mucus at high doses&mdash;relevant if you&rsquo;re tracking fertility signs
      </Callout>

      <p>
        NAC is particularly worth considering if you have elevated CRP (a marker of inflammation) alongside your PCOS diagnosis, or if oxidative stress markers are high. It&rsquo;s also one of the better-tolerated insulin-sensitizing options.
      </p>

      <ProductCallout product={PRODUCTS["thorne-nac"]} />

      <h2>Vitamin D: The Frequently-Missed Deficiency</h2>

      <p>
        Vitamin D deficiency is strikingly common in PCOS&mdash;estimates range from 67% to 85% of patients, depending on the study population (Thomson et al., 2012). <EvidenceBadge level="strong" /> This isn&rsquo;t just a coincidence. Low vitamin D is independently associated with worse insulin resistance, higher androgens, and more irregular cycles.
      </p>

      <p>
        Several RCTs have shown that correcting deficiency (getting serum 25(OH)D above 30 ng/mL) improves menstrual regularity and insulin sensitivity. Selimoglu et al. (2010) found that 12 weeks of vitamin D supplementation improved HOMA-IR scores in deficient PCOS patients. <EvidenceBadge level="moderate" /> The key word is &ldquo;correcting&rdquo;&mdash;supplementing when you&rsquo;re already replete doesn&rsquo;t seem to add benefit.
      </p>

      <Callout variant="tip" title="Get Tested First">
        Ask your provider for a 25(OH)D blood test before starting. If you&rsquo;re below 30 ng/mL, 2,000&ndash;5,000 IU of vitamin D3 daily is a standard repletion dose. Retest in 3 months. See our <a href="/guides/best-vitamin-d-supplements">best vitamin D supplements</a> breakdown for product recommendations.
      </Callout>

      <p>
        Take vitamin D with a fat-containing meal for absorption. D3 (cholecalciferol) is preferred over D2 (ergocalciferol) for raising and maintaining serum levels.
      </p>

      <ProductCallout product={PRODUCTS["thorne-vitamin-d-5000"]} />

      <h2>Magnesium for Insulin Sensitivity + Mood</h2>

      <p>
        Magnesium deficiency and PCOS share a bidirectional relationship. Insulin resistance depletes magnesium; low magnesium worsens insulin resistance. Sharifi et al. (2012) found that 250 mg/day of magnesium oxide for 8 weeks significantly reduced fasting glucose and insulin in PCOS patients versus placebo. <EvidenceBadge level="moderate" />
      </p>

      <p>
        Beyond metabolics, magnesium addresses something that PCOS clinical trials often ignore: the anxiety and sleep disruption that frequently accompany the condition. Magnesium glycinate is preferred here because it&rsquo;s both well-absorbed and has calming properties via its glycine component. For product picks, check our <a href="/guides/best-magnesium-supplements">best magnesium supplements</a> guide.
      </p>

      <Callout variant="evidence" title="Dosing: Magnesium">
        <strong>Form:</strong> Magnesium glycinate (preferred) or magnesium citrate<br />
        <strong>Dose:</strong> 200&ndash;400 mg elemental magnesium daily<br />
        <strong>Timing:</strong> Evening dosing may support sleep<br />
        <strong>Caution:</strong> Citrate forms can cause loose stools at higher doses
      </Callout>

      <ProductCallout product={PRODUCTS["thorne-magnesium-bisglycinate"]} />

      <h2>Omega-3 for Androgen and Lipid Control</h2>

      <p>
        PCOS frequently comes with dyslipidemia&mdash;elevated triglycerides and low HDL&mdash;alongside elevated androgens. Omega-3 fatty acids address both. A systematic review by Sadeghi et al. (2017) found that omega-3 supplementation (1&ndash;2g EPA+DHA daily) significantly reduced testosterone levels and improved triglycerides in PCOS patients. <EvidenceBadge level="moderate" />
      </p>

      <p>
        The anti-inflammatory effects of EPA specifically may also help with the low-grade chronic inflammation that characterizes many PCOS presentations. Look for supplements providing at least 1,000 mg combined EPA+DHA. Our <a href="/guides/best-omega-3-supplements">best omega-3 supplements</a> guide covers quality and purity considerations.
      </p>

      <Callout variant="evidence" title="Dosing: Omega-3">
        <strong>Dose:</strong> 1,000&ndash;2,000 mg combined EPA+DHA daily<br />
        <strong>Ratio:</strong> Higher-EPA formulas may be more relevant for inflammation and androgen reduction<br />
        <strong>Form:</strong> Triglyceride-form fish oil or algae-based (vegan)<br />
        <strong>Timing:</strong> With a fat-containing meal
      </Callout>

      <h2>Berberine: Metformin Alternative (With Caveats)</h2>

      <p>
        Berberine activates AMPK, the same metabolic pathway targeted by metformin. In PCOS, it reduces fasting blood glucose, lowers insulin levels, and improves lipid profiles. Wei et al. (2012), a single small RCT (n=89) in a Chinese cohort, found berberine showed similar improvements to metformin for waist circumference and insulin resistance over 3 months. <EvidenceBadge level="emerging" /> The result is promising but needs replication in larger, more diverse populations before drawing strong equivalence claims. For a detailed comparison, see our <a href="/guides/berberine-vs-metformin">berberine vs metformin</a> deep dive.
      </p>

      <Callout variant="warning" title="Do Not Combine With Metformin Without Medical Supervision">
        Berberine and metformin both lower blood glucose through overlapping mechanisms. Stacking them without monitoring can cause dangerous hypoglycemia. If you&rsquo;re on metformin, talk to your prescriber before adding berberine.
      </Callout>

      <p>
        Berberine is best suited for insulin-resistant PCOS patients who can&rsquo;t tolerate metformin&rsquo;s GI side effects, or who prefer a non-pharmaceutical approach and aren&rsquo;t currently on blood-sugar-lowering medication. Our <a href="/guides/berberine-guide">berberine guide</a> covers forms, timing, and drug interactions in detail.
      </p>

      <ProductCallout product={PRODUCTS["thorne-berberine"]} />

      <Callout variant="evidence" title="Dosing: Berberine">
        <strong>Dose:</strong> 500 mg three times daily (1,500 mg total), with meals<br />
        <strong>Duration:</strong> Most trials ran 3&ndash;6 months<br />
        <strong>Side effects:</strong> GI upset, constipation, or diarrhea&mdash;usually less severe than metformin<br />
        <strong>Interactions:</strong> CYP enzyme inhibitor; interacts with many medications
      </Callout>

      <p>
        A brief note on spearmint tea: two small RCTs found that spearmint tea (2 cups/day) reduced free testosterone in PCOS patients (Grant, 2010). <EvidenceBadge level="emerging" /> It&rsquo;s not a supplement per se, but it&rsquo;s low-risk, inexpensive, and may complement an anti-androgen stack.
      </p>

      <h2>What to Skip</h2>

      <p>
        Not everything marketed for PCOS deserves your money&mdash;or your trust. A few popular recommendations have problems specific to PCOS patients:
      </p>

      <Callout variant="warning" title="High-Dose Biotin (>1,000 mcg)">
        Biotin at high doses interferes with immunoassay-based lab tests, including TSH and free T4. Given that thyroid dysfunction is already more common in PCOS and needs careful monitoring, high-dose biotin can lead to misdiagnosis or inappropriate treatment changes. If you take it for hair or nails, stop 3&ndash;5 days before thyroid labs.
      </Callout>

      <Callout variant="warning" title="Cinnamon Extract">
        Despite heavy marketing for blood sugar, the PCOS-specific evidence for cinnamon extract is weak. Most positive studies are in type 2 diabetes populations, and the few PCOS trials are small, short, and inconsistent. It&rsquo;s unlikely to harm you, but it&rsquo;s unlikely to move the needle either.
      </Callout>

      <Callout variant="warning" title="Excess Iodine">
        PCOS patients have higher rates of Hashimoto&rsquo;s thyroiditis and other thyroid autoimmunity. Supplementing iodine above the RDA (150 mcg) without testing can worsen autoimmune thyroid flares. Get your iodine from dietary sources unless a deficiency is confirmed.
      </Callout>

      <h2>Sample Stack by PCOS Subtype</h2>

      <p>
        There&rsquo;s no one-size-fits-all PCOS stack. Your primary driver should determine your priority supplements. Here&rsquo;s a starting framework:
      </p>

      <h3>Insulin-Resistant PCOS (Most Common)</h3>
      <p>
        Signs: elevated fasting insulin, weight concentrated around the midsection, acanthosis nigricans, sugar cravings.
      </p>
      <ul>
        <li><strong>Priority:</strong> Inositol (40:1, 2&ndash;4g/day) + magnesium glycinate (300&ndash;400 mg)</li>
        <li><strong>Add:</strong> Berberine (1,500 mg/day) OR NAC (1,800 mg/day)&mdash;not both to start</li>
        <li><strong>Test and correct:</strong> Vitamin D</li>
      </ul>

      <h3>Lean PCOS</h3>
      <p>
        Signs: normal BMI, irregular cycles, elevated androgens without significant insulin resistance.
      </p>
      <ul>
        <li><strong>Priority:</strong> Inositol (40:1, 2g/day) + omega-3 (1&ndash;2g EPA+DHA)</li>
        <li><strong>Add:</strong> NAC (1,500 mg/day) for ovulation support</li>
        <li><strong>Consider:</strong> Spearmint tea for mild anti-androgen effect</li>
        <li><strong>Test and correct:</strong> Vitamin D</li>
      </ul>

      <h3>Inflammatory PCOS</h3>
      <p>
        Signs: elevated CRP or ESR, joint pain, fatigue, skin issues, symptoms worsen with stress.
      </p>
      <ul>
        <li><strong>Priority:</strong> Omega-3 (2g EPA+DHA) + NAC (1,800&ndash;3,000 mg/day)</li>
        <li><strong>Add:</strong> Inositol (40:1, 2g/day) + magnesium glycinate (400 mg)</li>
        <li><strong>Test and correct:</strong> Vitamin D (especially important&mdash;vitamin D is immunomodulatory)</li>
      </ul>

      <Callout variant="tip" title="Protocol: One at a Time">
        Introduce one new supplement every 4&ndash;6 weeks. Track cycle length, hirsutism severity, weight, acne, mood, and energy. This lets you identify what&rsquo;s actually helping&mdash;and catch any intolerances early. Commit to at least 3 months on your full stack before judging results.
      </Callout>

      <h2>Frequently Asked Questions</h2>

      <h3>How long do PCOS supplements take to work?</h3>
      <p>
        Most clinical trials show measurable changes in insulin markers within 8&ndash;12 weeks, and cycle regularity improvements within 3&ndash;6 months. Hormonal endpoints like testosterone reduction tend to follow insulin improvements. This isn&rsquo;t a 2-week fix&mdash;commit to 3 months minimum before reassessing your stack.
      </p>

      <h3>Can I take inositol and metformin together?</h3>
      <p>
        Yes, and several studies have actually tested this combination. Inositol and metformin work through partially overlapping but complementary pathways. Some endocrinologists prescribe both. However, always confirm with your prescribing doctor before adding inositol to an existing metformin regimen, especially if you&rsquo;re on a higher metformin dose.
      </p>

      <h3>Is berberine safe long-term?</h3>
      <p>
        Most PCOS berberine trials lasted 3&ndash;6 months. Longer-term safety data in PCOS is limited. Berberine inhibits several CYP450 enzymes, which can change how your body processes other medications. If you plan to use it beyond 6 months, periodic liver function tests and medication interaction reviews with your provider are prudent.
      </p>

      <h3>Do these supplements replace medication?</h3>
      <p>
        They can complement medication, and in some cases (particularly berberine vs. metformin) evidence suggests comparable effects. But PCOS management often requires a combination of dietary changes, exercise, stress management, and sometimes pharmaceutical intervention. Supplements are one layer&mdash;not the whole strategy.
      </p>

      <h3>What about DIM or saw palmetto for PCOS?</h3>
      <p>
        DIM (diindolylmethane) has theoretical anti-androgen mechanisms via estrogen metabolism modulation, but PCOS-specific clinical trials are essentially absent. Saw palmetto has some prostate-related evidence in men but minimal controlled data in PCOS. Neither makes our recommended list due to insufficient human evidence in this population.
      </p>

      <h3>Should I take all six supplements at once?</h3>
      <p>
        No. Start with inositol (the broadest evidence base), add vitamin D if deficient, and layer in one additional supplement every 4&ndash;6 weeks based on your dominant symptoms. Taking six new things simultaneously makes it impossible to identify what&rsquo;s working, what&rsquo;s not, and what might be causing side effects.
      </p>

      <h2>Who Should Talk to a Doctor First</h2>

      <p>
        PCOS supplements are generally well-tolerated, but several populations need medical clearance before starting.
      </p>

      <Callout variant="warning" title="If You Take Metformin or Other Blood Sugar Medications">
        Both berberine and inositol affect insulin signaling. Combining them with prescription glucose-lowering drugs without monitoring raises hypoglycemia risk. Your provider may need to adjust medication doses.
      </Callout>

      <Callout variant="warning" title="If You Are Pregnant or Actively Trying to Conceive">
        Inositol has a reasonable pregnancy safety profile and is used in some fertility clinics, but berberine is contraindicated in pregnancy. NAC doses above 1,200 mg/day lack sufficient pregnancy safety data. Confirm every supplement with your OB-GYN or reproductive endocrinologist.
      </Callout>

      <Callout variant="warning" title="If You Have Thyroid Disease">
        Hashimoto&rsquo;s thyroiditis co-occurs with PCOS at elevated rates. Avoid excess iodine, high-dose biotin (interferes with thyroid labs), and discuss selenium supplementation carefully. Inositol at high doses has emerging evidence for thyroid modulation&mdash;which is beneficial in some cases but warrants monitoring.
      </Callout>

      <Callout variant="warning" title="If You Take Blood Thinners or Have Surgery Scheduled">
        Omega-3s at high doses (&gt;3g/day) can increase bleeding time. NAC also has mild anticoagulant properties. Discontinue both 1&ndash;2 weeks before scheduled surgery and inform your surgical team of everything you take.
      </Callout>

      <Callout variant="warning" title="If You Are Under 18">
        Adolescent PCOS is increasingly recognized, but supplement dosing in teens is not well-studied. Pediatric endocrinology guidance is important here&mdash;don&rsquo;t extrapolate adult doses.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list to your next provider visit.
      </p>

      <h2>The Bottom Line</h2>

      <p>
        PCOS is a multi-system condition, and the supplement evidence reflects that&mdash;no single pill solves it, but several have genuine clinical data behind them. Inositol is the clear first-line choice: the 40:1 myo-inositol to D-chiro-inositol ratio at 2&ndash;4g/day has the broadest and most consistent evidence for improving insulin sensitivity, ovulation, and cycle regularity, with a side-effect profile that rivals placebo.
      </p>

      <p>
        After inositol, your next moves depend on your PCOS subtype and dominant symptoms. Insulin-resistant presentations benefit most from adding berberine or NAC. Inflammatory presentations respond to omega-3s and NAC. Virtually everyone should test and correct vitamin D deficiency&mdash;it&rsquo;s too common in PCOS and too easy to fix to ignore. Magnesium glycinate is a low-risk addition that addresses both metabolic dysfunction and the anxiety or sleep disruption that many PCOS patients deal with daily.
      </p>

      <p>
        The approach matters as much as the ingredients. Introduce one supplement at a time. Track quantifiable outcomes&mdash;cycle length, fasting insulin if you have access, body composition, symptom severity&mdash;over 3-month windows. This discipline separates evidence-based supplementation from expensive guesswork. Resist the temptation to add everything at once; you&rsquo;ll never know what&rsquo;s actually working.
      </p>

      <p>
        And know what to skip. High-dose biotin, cinnamon extract marketed for blood sugar, and excess iodine are either ineffective for PCOS specifically or carry risks that outweigh their marginal benefits. Your supplement budget is finite&mdash;spend it on the interventions with real trial data behind them.
      </p>

      <p>
        <a href="https://app.formulate-health.app/catalog?q=pcos">
          Browse PCOS supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
