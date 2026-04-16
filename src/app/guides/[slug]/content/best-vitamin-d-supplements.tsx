import {
  TLDRBox,
  Callout,
  ComparisonTable,
  ProductCallout,
  ProductRow,
  InteractionCard,
  InteractionGroup,
  EvidenceBadge,
  PRODUCTS,
} from "@/components/guide";

export function BestVitaminD() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "D3 is 87% more effective than D2 at raising blood levels — always choose D3",
          "Pair with K2 (MK-7) at doses above 2,000 IU to direct calcium into bones, not arteries",
          "Take with a fat-containing meal — absorption increases up to 50%",
          "Get a 25(OH)D blood test ($30–60) to find your ideal dose instead of guessing",
        ]}
      />

      <p>
        The best vitamin D supplements use vitamin D3 (cholecalciferol), pair it
        with vitamin K2 as a cofactor, and are backed by third-party testing
        &mdash; because form and formulation details matter more than brand. With
        42% of American adults deficient and nearly every major health
        organization recommending supplementation, choosing the right product has
        real clinical stakes.
      </p>
      <p>
        If you work indoors, live above the 37th parallel (roughly the latitude
        of San Francisco or Richmond, Virginia), or have darker skin, your odds
        are even worse.
      </p>

      <Callout variant="info" title="How we scored these">
        We evaluated 14 vitamin D products across six pillars: clinical evidence
        (25%), manufacturing quality (20%), dose accuracy (20%), bioavailability
        (15%), label transparency (10%), and safety (10%). Products that
        didn&rsquo;t meet minimum thresholds for third-party testing or dose
        accuracy were excluded. See our{" "}
        <a href="/methodology">full methodology</a> for details.
      </Callout>

      <h2>D3 vs. D2: This Is Not a Close Contest</h2>

      <Callout variant="evidence" title="D3 outperforms D2 by 87%">
        A 2012 meta-analysis by Tripkovic et al. in the{" "}
        <em>American Journal of Clinical Nutrition</em> pooled data across multiple
        RCTs and found D3 (cholecalciferol) is roughly 87% more effective at
        raising blood levels than D2 (ergocalciferol). <EvidenceBadge level="strong" studiesId="vitamin-d-tripkovic-d3vsd2-2012" />
      </Callout>

      <p>
        <a href="/guides/vitamin-d3-vs-d2">D2</a> is cheaper to produce and is the form historically used in prescription
        vitamin D supplements. But it clears from your bloodstream faster and is
        less efficient at converting to the active hormone (1,25-dihydroxyvitamin D).
        Unless you have a specific reason to take D2, always choose D3. Vegans take
        note: lichen-sourced D3 now exists, so plant-based is no longer a reason to
        settle for D2.
      </p>

      <h2>The K2 Question: Why Higher Doses Demand a Partner</h2>
      <p>
        Vitamin D increases calcium absorption in your gut. That&rsquo;s a good
        thing &mdash; unless that calcium ends up in your arteries instead of your
        bones. Vitamin K2, specifically the MK-7 form, activates proteins that
        direct calcium into bones and teeth while keeping it out of soft tissues
        and blood vessels.
      </p>

      <Callout variant="evidence" title="K2 improves arterial health">
        A 2017 study by Knapen et al. in <em>Thrombosis and Haemostasis</em> found
        that MK-7 supplementation (180mcg/day for three years) significantly
        improved arterial stiffness in healthy postmenopausal women. <EvidenceBadge level="strong" studiesId="vitamin-d-knapen-k2-2017" />
      </Callout>

      <InteractionGroup title="Vitamin D synergies">
        <InteractionCard
          type="synergy"
          a="Vitamin D3"
          b="Vitamin K2 (MK-7)"
          effect="D3 increases calcium absorption. K2 directs that calcium into bones and teeth, not arteries and soft tissue."
          recommendation="At D3 doses above 2,000 IU, pair with 100–200mcg K2 (MK-7). Many quality products combine both."
        />
        <InteractionCard
          type="synergy"
          a="Vitamin D3"
          b="Dietary fat"
          effect="D3 is fat-soluble and absorbs up to 50% better when taken with a fat-containing meal."
          recommendation="Take with eggs, avocado, nuts, or any meal with fat. Softgels in oil have built-in absorption."
        />
        <InteractionCard
          type="synergy"
          a="Vitamin D3"
          b="Magnesium"
          effect="Magnesium is required for vitamin D metabolism — converting it to its active form."
          recommendation="Ensure adequate magnesium intake (200–400mg/day) to fully utilize your vitamin D."
        />
      </InteractionGroup>

      <p>
        <strong>Practical advice:</strong> If you&rsquo;re taking 1,000 IU or less,
        you&rsquo;re probably fine without K2 (assuming a reasonable diet). At 2,000+
        IU daily, pair it with at least 90&ndash;120mcg of MK-7. Many quality
        products now combine both in a single capsule or drop.
      </p>

      <ProductCallout product={PRODUCTS["thorne-vitamin-d-k2"]} />

      <h2>Fat-Soluble Means Take It With Fat</h2>

      <Callout variant="evidence" title="Absorption study">
        A 2015 study by Dawson-Hughes et al. in the{" "}
        <em>Journal of the Academy of Nutrition and Dietetics</em> found that
        taking vitamin D with the largest meal of the day increased blood levels
        by up to 50% compared to taking it on an empty stomach or with a fat-free
        meal. <EvidenceBadge level="strong" studiesId="vitamin-d-absorption-fat-2015" />
      </Callout>

      <p>
        This has direct implications for product format:
      </p>
      <ul>
        <li>
          <strong>Softgels with oil</strong> (olive oil, MCT oil) &mdash; Built-in
          fat source for absorption. Take with any meal. Best convenience option.
        </li>
        <li>
          <strong>Liquid drops in MCT oil</strong> &mdash; Same absorption
          advantage as softgels, plus precise dose adjustment. Drop on food or
          under the tongue.
        </li>
        <li>
          <strong>Dry tablets</strong> &mdash; Cheapest, but absorb less
          efficiently unless taken with a fat-containing meal. Fine on a budget if
          you take them with food.
        </li>
      </ul>
      <p>
        For how vitamin D fits into your daily supplement timing, see{" "}
        <a href="/guides/supplement-timing-guide">our supplement timing guide</a>.
      </p>

      <h2>How to Determine Your Dose: Test, Don&rsquo;t Guess</h2>

      <Callout variant="tip" title="A $30 blood test beats guessing">
        A 25(OH)D blood test costs $30&ndash;60 and tells you exactly what dose
        you need. Most adults land between 1,000 and 5,000 IU daily for
        maintenance, but your number is personal.
      </Callout>

      <p>
        The right dose
        depends on your current blood level, which varies enormously based on
        sun exposure, skin tone, latitude, body weight, and genetics. Here&rsquo;s how
        to read it:
      </p>
      <ul>
        <li>
          <strong>Below 20 ng/mL &mdash; Deficient:</strong> The Endocrine Society
          recommends 5,000&ndash;6,000 IU/day for 8&ndash;12 weeks, then retest.
          Work with a healthcare provider at these levels.
        </li>
        <li>
          <strong>20&ndash;30 ng/mL &mdash; Insufficient:</strong> Most guidelines
          suggest 2,000&ndash;4,000 IU/day to bring levels up. Retest after 3
          months.
        </li>
        <li>
          <strong>30&ndash;50 ng/mL &mdash; Sufficient:</strong> Maintenance dose
          of 1,000&ndash;2,000 IU/day. This is where most health organizations
          want you.
        </li>
        <li>
          <strong>50&ndash;80 ng/mL:</strong> Some longevity researchers (including
          Dr. Rhonda Patrick and the Vitamin D Council) suggest targeting
          40&ndash;60 ng/mL for optimal health. Maintain with current dose.
        </li>
        <li>
          <strong>Above 100 ng/mL:</strong> Risk of toxicity (hypercalcemia).
          Reduce dose and retest.
        </li>
      </ul>
      <p>
        The Endocrine Society&rsquo;s 2011 clinical practice guideline (Holick
        et al., <em>Journal of Clinical Endocrinology &amp; Metabolism</em>)
        recommends 1,500&ndash;2,000 IU/day for adults to maintain levels above
        30 ng/mL. <EvidenceBadge level="strong" studiesId="vitamin-d-holick-endocrine-2011" /> That&rsquo;s a reasonable starting point if you don&rsquo;t have
        a blood test yet, but getting tested is always better than guessing.
      </p>

      <h2>What to Look For in a Vitamin D Product</h2>
      <ul>
        <li>
          <strong>D3, not D2.</strong> Cholecalciferol over ergocalciferol. Always.
          If vegan, look for lichen-sourced D3.
        </li>
        <li>
          <strong>K2 (MK-7) included</strong> if taking 2,000+ IU daily. Look for
          at least 90mcg MK-7.
        </li>
        <li>
          <strong>Oil-based delivery</strong> &mdash; softgel or liquid drops in
          MCT/olive oil.
        </li>
        <li>
          <strong>Flexible dosing</strong> &mdash; liquid drops let you adjust
          dose precisely, which is useful since vitamin D needs are individual.
        </li>
        <li>
          <strong>Third-party testing</strong> &mdash; USP, NSF, or ConsumerLab
          verification. Vitamin D is one of the supplements most commonly found to
          have label inaccuracy (both over- and under-dosed) in independent testing.
        </li>
      </ul>
      <p>
        For more on evaluating any supplement label,{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          our label-reading guide
        </a>{" "}
        covers what to check.
      </p>

      <h2>Brands That Deliver</h2>
      <p>
        Here are products that consistently meet the criteria above &mdash; D3
        form, appropriate cofactors, quality delivery format, third-party tested.
      </p>

      <ComparisonTable
        products={[
          PRODUCTS["thorne-vitamin-d-k2"],
          PRODUCTS["thorne-vitamin-d-5000"],
          PRODUCTS["thorne-vitamin-k"],
        ]}
        columns={[
          { label: "Form", key: "form" },
          { label: "Dose", key: "dose" },
          { label: "K2 Included", key: "k2" },
          { label: "Format", key: "format" },
        ]}
        data={{
          "thorne-vitamin-d-k2": { form: "D3 + MK-7", dose: "1,000 IU + 200mcg K2", k2: "Yes (MK-7)", format: "Liquid drops" },
          "thorne-vitamin-d-5000": { form: "D3", dose: "5,000 IU", k2: "No (pair separately)", format: "Capsule" },
          "thorne-vitamin-k": { form: "K2 (MK-4)", dose: "1mg MK-4", k2: "Standalone K", format: "Capsule" },
        }}
      />
      <p>
        <strong>Thorne Vitamin D/K2 Liquid</strong> combines D3 with K2 (MK-7) in
        an MCT oil base. Each drop delivers a precise, adjustable dose. NSF
        Certified for Sport. The liquid format makes it easy to titrate up or down
        based on blood test results. Hard to beat for a D3 + K2 combo.
      </p>

      <ProductCallout product={PRODUCTS["thorne-vitamin-d-k2"]} />

      <p>
        <strong>Momentous Vitamin D3</strong> offers well-dosed D3 with their
        standard high manufacturing transparency and Informed Sport certification.
        Clean formula, straightforward option if you&rsquo;re getting K2 elsewhere.
      </p>
      <p>
        <strong>Nordic Naturals Vitamin D3</strong> uses olive oil as the carrier in
        a softgel format. Third-party tested, no artificial additives. Available in
        1,000 and 5,000 IU strengths to match different needs.
      </p>
      <p>
        <strong>Thorne Vitamin D3 5,000 IU</strong> is a straightforward
        high-dose option for those correcting a deficiency. No K2 included, so
        pair it separately if needed.
      </p>

      <ProductCallout product={PRODUCTS["thorne-vitamin-d-5000"]} />

      <p>
        Building a broader supplement protocol? See{" "}
        <a href="/guides/beginner-longevity-supplement-stack">
          our beginner longevity stack guide
        </a>{" "}
        for how vitamin D fits into the full picture.
      </p>

      <h2>The Dosing Ladder — By Starting Level</h2>
      <p>
        Generic &ldquo;take 2,000 IU&rdquo; advice ignores where you&rsquo;re
        starting. The dose that raises a deeply-deficient person into the
        sufficient range does nothing for someone already there, and can
        push a replete person into excess over months. Here&rsquo;s the
        approximate ladder based on your current 25(OH)D level:
      </p>

      <InteractionGroup title="Daily dose by current 25(OH)D level">
        <InteractionCard
          type="synergy"
          a="Below 20 ng/mL (deficient)"
          b="5,000 IU/day"
          effect="Roughly 40% of US adults fall here. Clinical deficiency territory; warrants aggressive correction."
          recommendation="5,000 IU/day with K2 (100–200 mcg MK-7) for 8–12 weeks, then retest. Some protocols use 50,000 IU weekly short-term; equivalent daily dosing is typically cleaner."
        />
        <InteractionCard
          type="synergy"
          a="20–30 ng/mL (insufficient)"
          b="2,000–4,000 IU/day"
          effect="Most common bucket. Symptoms are often subtle (fatigue, low immunity, mood). Raising to 40+ ng/mL is the goal."
          recommendation="2,000–4,000 IU/day with K2. Retest after 12 weeks to confirm trajectory."
        />
        <InteractionCard
          type="synergy"
          a="30–50 ng/mL (sufficient)"
          b="1,000–2,000 IU/day"
          effect="The maintenance zone. Most research associates this range with lowest risk for cardiovascular, autoimmune, and respiratory outcomes."
          recommendation="1,000–2,000 IU/day is enough to hold level in winter for most adults at temperate latitudes."
        />
        <InteractionCard
          type="synergy"
          a="50–80 ng/mL (high-normal)"
          b="Pause or reduce"
          effect="Some longevity practitioners target this range, but incremental benefit above 50 ng/mL is unclear and inconsistently supported."
          recommendation="Drop to 1,000 IU/day or take seasonally (winter only). Continue K2 if dosing above 2,000 IU."
        />
        <InteractionCard
          type="conflict"
          a="Above 80 ng/mL"
          b="Stop supplementing"
          effect="No evidence of additional benefit; rising risk of hypercalcemia. Pause until level falls into target range."
          recommendation="Stop vitamin D entirely for 4–8 weeks, retest, then resume at a lower maintenance dose."
        />
      </InteractionGroup>

      <p>
        Two caveats. First, BMI matters — vitamin D is stored in adipose
        tissue, so people with higher body fat percentages may need 1.5&ndash;2x
        the dose to reach the same serum level. Second, dose-response is
        individual: some people raise their serum level 10 ng/mL per 1,000 IU
        daily; others see half that. Retesting after 10&ndash;12 weeks is how
        you actually calibrate to <em>your</em> physiology, not the population
        average.
      </p>

      <h2>Seasonal Adjustments</h2>
      <p>
        Vitamin D production from sunlight is nearly zero above 37° latitude
        (roughly San Francisco, Washington DC, Athens) between October and
        March — the UVB angle is too shallow to produce cholecalciferol in
        skin, regardless of how much time you spend outside. This is why
        serum 25(OH)D follows a predictable seasonal curve in most people:
        peaks in September, bottoms in February or March.
      </p>
      <p>
        Two practical implications:
      </p>
      <ul>
        <li>
          If you live above 37°N (or below 37°S), your winter dose should
          likely be 1.5&ndash;2x your summer dose to maintain level.
        </li>
        <li>
          The ideal time to test is late winter (February/March). A
          late-summer test shows your peak, not your trough — and
          &ldquo;sufficient&rdquo; in August can mean &ldquo;deficient&rdquo;
          by March.
        </li>
      </ul>

      <h2>Common Mistakes to Avoid</h2>

      <Callout variant="warning" title="Taking D2 because your doctor prescribed it">
        Prescription vitamin D is often D2 (ergocalciferol) in a 50,000 IU weekly
        dose. Ask your provider about switching to daily D3 &mdash; the evidence
        favors it.
      </Callout>

      <Callout variant="warning" title="Taking it on an empty stomach">
        You&rsquo;re absorbing up to 50% less. Take with your fattiest meal.
      </Callout>

      <Callout variant="warning" title="Megadosing without testing">
        Taking 10,000 IU/day &ldquo;just in case&rdquo; without blood work is
        reckless. Vitamin D toxicity is rare but real. Test first, dose accordingly.
      </Callout>

      <Callout variant="warning" title="Ignoring K2 at higher doses">
        D3 without K2 means more calcium absorbed but less control over where it
        goes. Add K2 (MK-7) at doses above 2,000 IU/day.
      </Callout>

      <h2>What the Landmark Vitamin D RCTs Actually Show (And What They Don&rsquo;t)</h2>

      <p>The vitamin D RCT evidence is something you should understand before buying any product on this page. Three major trials — each enrolling thousands of participants — tested whether supplementing vitamin D <em>beyond correcting deficiency</em> prevents serious disease. The results were sobering for anyone expecting a miracle pill.</p>

      <p>The <strong>VITAL trial</strong> (Manson et al., 2019, n=25,871) gave healthy adults 2,000 IU/day of D3 for a median of 5.3 years. It found <strong>no significant reduction</strong> in cardiovascular events (HR 0.97) or invasive cancer incidence (HR 0.96). <EvidenceBadge level="strong" studiesId="vitamin-d-vital-manson-2019" /> A secondary analysis did show a 25% reduction in cancer <em>mortality</em> after excluding the first two years, but this was an exploratory finding, not the primary endpoint.</p>

      <p>The <strong>ViDA trial</strong> (Scragg et al., 2017, n=5,110) tested monthly high-dose boluses (100,000 IU) in New Zealand adults and found no reduction in cardiovascular disease. <EvidenceBadge level="strong" studiesId="vitamin-d-scragg-vida-2017" /> The <strong>D-HEALTH trial</strong> (Neale et al., 2022, n=21,315) tested 60,000 IU/month for five years in Australian adults aged 60–84 and found no significant reduction in cancer mortality or all-cause mortality. <EvidenceBadge level="strong" studiesId="vitamin-d-neale-dhealth-2022" /></p>

      <Callout variant="info" title="The critical distinction">
        Correcting a true deficiency (below 20 ng/mL) has consistent evidence for improving bone health, reducing fracture risk, and resolving symptoms like fatigue and muscle weakness. What these mega-trials tested was different: whether pushing <em>already-sufficient</em> people higher would prevent cardiovascular disease or cancer. That hypothesis has not held up.
      </Callout>

      <p>This matters for how you read this guide. If you&rsquo;re one of the 42% of American adults who are genuinely deficient, supplementation has clear, well-supported benefits — that&rsquo;s not in question. But if you&rsquo;re already at 30–40 ng/mL and hoping that megadosing to 60+ ng/mL will slash your cancer or heart disease risk, the strongest available evidence doesn&rsquo;t support that expectation. <EvidenceBadge level="strong" /> Dose to sufficiency, retest, and save your money for interventions with better evidence behind them — like the ones covered in our <a href="/guides/beginner-longevity-stack">beginner longevity stack guide</a>.</p>

      <h2>Vitamin D Drug Interactions: Who Should Talk to Their Doctor First</h2>

      <p>Vitamin D drug interactions are underappreciated precisely because vitamin D feels benign. It&rsquo;s an over-the-counter supplement, not a prescription — so most people never think to cross-check it against their medication list. But vitamin D is a fat-soluble hormone precursor that affects calcium metabolism, enzyme activity, and drug absorption. If you take any of the following medication categories, talk to your prescriber before starting or adjusting your dose.</p>

      <h3>Thiazide Diuretics</h3>
      <p>Thiazides (hydrochlorothiazide, chlorthalidone) reduce calcium excretion through the kidneys. Add supplemental vitamin D — which increases calcium absorption in the gut — and you&rsquo;re pushing calcium levels up from both directions. The result can be <strong>hypercalcemia</strong>, with symptoms ranging from nausea and confusion to kidney stones and cardiac arrhythmias. <EvidenceBadge level="moderate" /> If you&rsquo;re on a thiazide, your provider should monitor serum calcium before and after starting vitamin D.</p>

      <h3>Corticosteroids</h3>
      <p>Long-term corticosteroid use (prednisone, dexamethasone) depletes vitamin D and accelerates bone loss — meaning you likely <em>need</em> more vitamin D, but corticosteroids also reduce intestinal calcium absorption and alter vitamin D metabolism. The dose that works for someone not on steroids may be inadequate or inappropriate for you. Ask your provider about adjusted dosing and calcium co-monitoring.</p>

      <h3>Orlistat and Cholestyramine</h3>
      <p>Both orlistat (Alli, Xenical) and bile acid sequestrants like cholestyramine directly interfere with fat absorption — and vitamin D is fat-soluble. Evidence suggests these medications can reduce vitamin D absorption by 30% or more (McDuffie et al., 2002). <EvidenceBadge level="moderate" /> Separate your vitamin D dose from these medications by at least two hours, and discuss whether you need a higher baseline dose with your prescriber.</p>

      <h3>Antiepileptic Drugs</h3>
      <p>Phenytoin, carbamazepine, and phenobarbital induce hepatic CYP450 enzymes that accelerate the breakdown of 25(OH)D, effectively lowering your circulating vitamin D regardless of intake (Pack &amp; Morrell, 2004). <EvidenceBadge level="moderate" /> If you&rsquo;re on antiepileptics, standard supplementation doses are often insufficient. Your neurologist should be monitoring your 25(OH)D levels and adjusting accordingly.</p>

      <Callout variant="warning" title="Bring your full medication list">
        Adults over 50 — the demographic most likely to be vitamin D deficient — are also the most likely to be on one or more of these medications. Don&rsquo;t rely on a supplement guide to navigate interactions. Print your supplement list (including doses) and review it with your prescriber or pharmacist.
      </Callout>

      <h2>Vitamin D During Pregnancy and Breastfeeding</h2>

      <p><strong>Vitamin D during pregnancy</strong> is one of the most under-dosed nutrients in standard prenatal care. Most prenatal vitamins contain just 400–600 IU of D3 — a dose based on decades-old recommendations designed to prevent rickets, not optimize maternal or fetal health. That&rsquo;s a problem, because pregnant women are among the most commonly deficient populations.</p>

      <h3>What the Guidelines Actually Say</h3>

      <p>ACOG (American College of Obstetricians and Gynecologists) considers 1,000–2,000 IU/day safe during pregnancy and sufficient for most women. The Endocrine Society&rsquo;s 2011 guideline (Holick et al.) recommends at least 1,500–2,000 IU/day for pregnant and lactating women to maintain 25(OH)D above 30 ng/mL. <EvidenceBadge level="moderate" /> Some researchers argue these numbers are still too conservative — a large RCT by Hollis et al. (2011, <em>Journal of Bone and Mineral Research</em>) found that 4,000 IU/day was safe throughout pregnancy and more effective at achieving sufficiency than 400 or 2,000 IU, with no adverse events.</p>

      <h3>Why It Matters for Your Baby</h3>

      <p>Vitamin D is critical for fetal skeletal development. Maternal deficiency is associated with reduced neonatal bone mineral content and higher risk of neonatal hypocalcemia. Evidence also suggests links between low maternal D status and increased preeclampsia and gestational diabetes risk, though these associations are still being refined (Aghajafari et al., 2013, <em>BMJ</em>). <EvidenceBadge level="moderate" /></p>

      <p>Breast milk is notoriously low in vitamin D — typically 20–80 IU per liter — regardless of maternal diet. This is why the AAP recommends 400 IU/day supplementation directly to exclusively breastfed infants. However, Hollis et al. (2015, <em>Pediatrics</em>) demonstrated that maternal supplementation of 6,400 IU/day could raise breast milk D content enough to meet infant needs without separate infant drops. <EvidenceBadge level="emerging" /></p>

      <Callout variant="warning" title="Don't Self-Prescribe Here">
        Dosing above 2,000 IU/day during pregnancy should be guided by your OB, midwife, or healthcare provider based on your 25(OH)D levels. This includes <a href="/guides/best-vitamin-d-supplements">D3/K2 combination products</a> — vitamin K2 safety data in pregnancy is limited. Get your blood levels tested and let your provider set the target.
      </Callout>

      <p>The takeaway: your prenatal vitamin almost certainly isn&rsquo;t giving you enough vitamin D. A 25(OH)D test in your first trimester — and a conversation with your provider about supplementing 1,000–2,000 IU on top of your prenatal — is one of the simplest interventions available. For general dosing guidance outside of pregnancy, see the dosing ladder above.</p>

      <h2>How to Get a Vitamin D Blood Test (And What to Order)</h2>

      <p>Getting a <strong>vitamin D blood test</strong> is the single most useful thing you can do before choosing a dose — yet most people don&rsquo;t know which test to request or where to get one without a doctor&rsquo;s visit. Here&rsquo;s exactly how to do it.</p>

      <h3>Order the Right Test: 25(OH)D, Not 1,25(OH)&#8322;D</h3>

      <p>The test you want is <strong>25-hydroxyvitamin D</strong>, written as <strong>25(OH)D</strong>. This measures your circulating vitamin D stores and is the standard marker used by the Endocrine Society and virtually every clinical guideline. It reflects what your body has available over the past two to three weeks.</p>

      <p>The test you <em>don&rsquo;t</em> want is <strong>1,25-dihydroxyvitamin D</strong> (1,25(OH)&#8322;D). This is the active hormonal form, tightly regulated by your kidneys, and it can read normal even when you&rsquo;re severely deficient. Ordering the wrong test is surprisingly common — if your provider orders &ldquo;vitamin D&rdquo; without specifying, confirm it&rsquo;s the 25(OH)D version.</p>

      <Callout variant="warning" title="Common ordering mistake">
        Some labs list 1,25(OH)&#8322;D as &ldquo;Vitamin D, Active&rdquo; or &ldquo;Calcitriol.&rdquo; This test has clinical uses (kidney disease evaluation, for example), but it does not tell you your vitamin D status. Always verify the order says 25(OH)D or 25-hydroxyvitamin D.
      </Callout>

      <h3>Where to Order Without a Doctor&rsquo;s Visit</h3>

      <p><strong>Ulta Lab Tests</strong> and <strong>Walk-In Lab</strong> let you order a 25(OH)D test directly for roughly $30–$50. You pay online, visit a local LabCorp or Quest draw site, and get results in one to three business days — no prescription needed in most states.</p>

      <p><strong>At-home finger-prick kits</strong> from companies like Everlywell (~$50–$60) skip the blood draw entirely. You collect a small sample at home and mail it in. Accuracy is reasonable for screening purposes, though a venous blood draw remains the gold standard. If your finger-prick result is borderline, consider confirming with a lab draw.</p>

      <h3>How to Read Your Results</h3>

      <p>Your report will show a number in <strong>ng/mL</strong> (U.S. labs) or <strong>nmol/L</strong> (international labs; divide by 2.5 to convert to ng/mL). Reference ranges vary by lab, but the clinical consensus from our <a href="/guides/best-vitamin-d-supplements">dosing section above</a> applies: below 20 ng/mL is deficient, 20–30 is insufficient, and 30–50 is where most guidelines want you. Test in <strong>late winter</strong> (February or March) to catch your lowest point rather than your summer peak.</p>

      <Callout variant="info" title="Testing cadence">
        Retest 10–12 weeks after starting or changing your dose. Once you&rsquo;re stable in the 30–50 ng/mL range, an annual late-winter check is usually enough to confirm your maintenance dose is working.
      </Callout>

      <h2>Who Should Talk to a Doctor First</h2>
      <p>
        Vitamin D is one of the better-studied supplements for generally healthy adults, but several populations face meaningfully different risks or dosing needs that this guide doesn't address in depth. If any of the following apply to you, get clinical input before starting or changing your dose.
      </p>

      <Callout variant="warning" title="If you are pregnant or breastfeeding">
        This guide's dosing recommendations were not developed with pregnancy in mind. Vitamin D needs during pregnancy are specific and tied to outcomes like neonatal bone health and preeclampsia risk. Talk to your OB or midwife before supplementing — including any D3/K2 combination products.
      </Callout>

      <Callout variant="warning" title="If you take thiazide diuretics, corticosteroids, antiepileptics, statins, or orlistat">
        High-dose vitamin D combined with thiazide diuretics can raise hypercalcemia risk substantially. Corticosteroids and antiepileptics alter vitamin D metabolism in ways that affect both your need and your safe ceiling. Bring your full medication list to your provider before adding any vitamin D product.
      </Callout>

      <Callout variant="warning" title="If you are 65 or older">
        Older adults synthesize vitamin D from sunlight far less efficiently and are more likely to be on multiple medications that interact with supplementation. Dosing guidance and fall-prevention implications differ for this age group — work with your provider rather than self-dosing from general recommendations.
      </Callout>

      <Callout variant="warning" title="If you have a malabsorption condition (Crohn's, celiac, IBD, or history of bariatric surgery)">
        Fat-soluble vitamin absorption is significantly impaired in these conditions. Standard doses discussed in this guide may be inadequate, and monitoring needs are more frequent. Talk to your gastroenterologist or prescribing provider before choosing a product or dose.
      </Callout>

      <Callout variant="warning" title="If you are currently on a prescription vitamin D2 (ergocalciferol) regimen">
        This guide expresses a preference for D3, but weekly high-dose D2 is a clinically validated repletion protocol your provider may have chosen deliberately. Do not stop or switch a prescribed regimen based on supplement guide recommendations — discuss any change with the provider who prescribed it.
      </Callout>

      <Callout variant="warning" title="If you are considering doses above 4,000 IU/day without blood work">
        The guide references the Endocrine Society's 10,000 IU/day figure, but the National Academy of Medicine sets the Tolerable Upper Intake Level at 4,000 IU/day for adults — the standard most clinicians use. Sustained doses above 4,000 IU without 25(OH)D monitoring increase hypercalcemia risk. Test first.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list — including what you're considering — to your next provider visit.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Can I get enough vitamin D from the sun?</h3>
      <p>
        Theoretically, yes &mdash; 15&ndash;30 minutes of midday sun with arms and
        legs exposed can produce 10,000&ndash;20,000 IU of D3. In practice, most
        people don&rsquo;t get enough consistent sun exposure due to latitude,
        season, sunscreen use, indoor work, and skin tone. If you live above 37&deg;N
        latitude, your skin produces virtually zero vitamin D from November through
        February regardless of sun exposure.
      </p>

      <h3>Is 5,000 IU of vitamin D safe to take daily?</h3>
      <p>
        For most adults, 5,000 IU/day is safe and commonly used to correct
        insufficiency. The Endocrine Society considers up to 10,000 IU/day the
        tolerable upper limit for adults. However, individual responses vary &mdash;
        some people reach optimal levels on 2,000 IU while others need 5,000+. Use
        blood testing to find your sweet spot rather than defaulting to a high dose
        indefinitely.
      </p>

      <h3>Should I take vitamin D in the morning or evening?</h3>
      <p>
        Take it with your largest meal (for fat content). Some anecdotal reports
        suggest evening vitamin D can interfere with sleep by suppressing melatonin
        production, though clinical evidence for this is limited. <EvidenceBadge level="emerging" /> If you notice any
        sleep disruption, switch to a morning or lunchtime dose with food.
      </p>

      <h3>Do I need vitamin D if I take a multivitamin?</h3>
      <p>
        Most multivitamins contain 400&ndash;1,000 IU of vitamin D, which is
        likely insufficient for anyone who is deficient or even insufficient. Check
        the label, get your blood levels tested, and supplement the difference.
        A multivitamin is a starting point, not necessarily the whole solution.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Choose D3, not D2. Take it with a fat-containing meal. Pair with K2 (MK-7)
        if you&rsquo;re at 2,000+ IU daily. Prefer softgels or liquid drops in oil
        over dry tablets. And get a blood test &mdash; a $30&ndash;60 test tells you
        exactly what dose you need instead of guessing. Most adults land somewhere
        between 1,000 and 5,000 IU daily for maintenance, but your number is
        personal.
      </p>

      <ProductRow
        title="Top-scored vitamin D supplements"
        products={[
          PRODUCTS["thorne-vitamin-d-k2"],
          PRODUCTS["thorne-vitamin-d-5000"],
          PRODUCTS["thorne-vitamin-k"],
        ]}
      />

      <p>
        <a href="https://app.formulate-health.app/catalog?q=vitamin+d">
          Browse vitamin D supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
