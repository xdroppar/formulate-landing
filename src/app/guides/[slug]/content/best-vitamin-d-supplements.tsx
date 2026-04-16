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

      <p>ACOG (American College of Obstetricians and Gynecologists) considers 1,000–2,000 IU/day safe during pregnancy and sufficient for most women. The Endocrine Society&rsquo;s 2011 guideline (Holick et al.) recommends at least 1,500–2,000 IU/day for pregnant and lactating women to maintain 25(OH)D above 30 ng/mL. <EvidenceBadge level="moderate" studiesId="vitamin-d-holick-endocrine-2011" /> Some researchers argue these numbers are still too conservative — a large RCT by Hollis et al. (2011, <em>Journal of Bone and Mineral Research</em>) found that 4,000 IU/day was safe throughout pregnancy and more effective at achieving sufficiency than 400 or 2,000 IU, with no adverse events.</p>

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

      <h2>Best Budget Vitamin D Supplement: Third-Party Tested Options Under $15</h2>

      <p>The best budget vitamin D supplement doesn't cut corners on what actually matters — it just skips the premium packaging. Third-party testing, D3 form, and dose accuracy are pass/fail criteria, not features reserved for $30+ bottles. Two options consistently clear that bar for under $15.</p>

      <h3>Nature Made Vitamin D3</h3>

      <p><strong>Nature Made</strong> carries USP Verified certification, meaning every batch is independently tested for potency, purity, and disintegration. ConsumerLab has repeatedly confirmed its label accuracy in their vitamin D reviews. Available in 1,000 and 2,000 IU softgels with soybean oil as the carrier fat — so you get the absorption advantage of an oil-based format without paying for MCT or olive oil branding. Typically $8–$12 for a 250-count bottle. <EvidenceBadge level="strong" /></p>

      <h3>Kirkland Signature Vitamin D3</h3>

      <p><strong>Kirkland Signature</strong> (Costco's house brand) passed ConsumerLab's testing for label accuracy and purity. It's not USP Verified, but ConsumerLab's independent analysis confirmed the stated dose matched actual content. At roughly $0.02–$0.04 per softgel, it's one of the cheapest per-serving options available — often under $10 for 600 softgels.</p>

      <h3>Why Budget Picks Hold Up</h3>

      <p>Vitamin D3 is one of the cheapest raw ingredients in the supplement industry. The price difference between budget and premium brands reflects branding, cofactors like K2, and format choices — not D3 quality. A USP- or ConsumerLab-verified budget softgel delivers the same cholecalciferol molecule, at the same verified dose, as a bottle costing three times more.</p>

      <p>The tradeoff is real but narrow: neither Nature Made nor Kirkland includes K2 (MK-7). If you're taking 2,000+ IU daily, you'll want to add K2 separately — still cheaper in total than most combo products. Neither offers the precise dose adjustment of liquid drops, which matters if you're titrating based on blood work.</p>

      <Callout variant="info" title="Bottom line">
      If your 25(OH)D test says you need straightforward D3 supplementation and you're not chasing a D3/K2 combo, these two options pass the same critical criteria as brands costing 2–3x more. Spend the savings on a <a href="/guides/supplement-timing">blood test instead</a>.
      </Callout>

      <h2>Best Standalone Vitamin K2 Supplements to Pair with Your D3</h2>

      <p><strong>Best standalone vitamin K2 supplements</strong> matter here because three of the four D3 products recommended above don't include K2 — and this guide explicitly tells you to add it separately at doses of 2,000+ IU daily. Here's what actually meets the same evaluation criteria we applied to our D3 picks: MK-7 form, oil-based delivery, third-party testing, and verified dosing.</p>

      <h3>Thorne Vitamin K2 Liquid</h3>
      <p>Delivers 1 mg (1,000 mcg) of MK-7 per drop in a medium-chain triglyceride (MCT) oil base. The liquid format lets you dial back to the 90–120 mcg range recommended above by using a partial drop or diluting — useful since K2 dosing isn't one-size-fits-all. NSF Certified for Sport, same third-party standard as the Thorne D3 products already on this list. If you're already using Thorne's D3 5,000 IU, this is the cleanest pairing.</p>

      <h3>Carlson Vitamin K2 MK-7 (90 mcg softgels)</h3>
      <p>Each softgel provides 90 mcg of MK-7 in sunflower oil — a built-in fat source for absorption. This dose aligns with the minimum threshold supported by the Knapen et al. (2017) data on arterial stiffness. FDA-registered facility, third-party potency and purity testing. Straightforward option if you prefer a pre-measured capsule over liquid drops.</p>

      <h3>Jarrow Formulas MK-7 (180 mcg softgels)</h3>
      <p>Hits the 180 mcg dose used in the Knapen three-year trial, delivered in olive oil. The MK-7 is derived from <em>Bacillus subtilis</em> natto fermentation — the most clinically studied production method. Third-party tested for identity and potency. A solid pick if you want the exact dose that has the strongest standalone evidence behind it. <EvidenceBadge level="moderate" studiesId="vitamin-d-knapen-k2-2017" /></p>

      <Callout variant="warning" title="K2 and blood thinners">
      If you take warfarin or other vitamin K-sensitive anticoagulants, do not add K2 without consulting your healthcare provider. MK-7 has a longer half-life than K1 and can meaningfully affect INR levels even at low doses.
      </Callout>

      <p>All three options use oil-based delivery, verified MK-7 sourcing, and independent testing — the same pillars we used for the D3 picks. Pair any of them with your chosen D3 product and take them together with your fattiest meal for optimal absorption. For more on timing, see our <a href="/guides/supplement-timing">supplement timing guide</a>.</p>

      <h2>Vitamin D for Specific Goals: Depression, Immunity, and Athletic Performance — What the Evidence Actually Says</h2>

      <h3>Depression and Mood</h3>
      <p><strong>Vitamin D for depression</strong> is one of the most common reasons people start supplementing — and the evidence is real, but narrow. A large meta-analysis by Cheng et al. (2020, <em>Journal of Affective Disorders</em>) pooling 25 RCTs found a statistically significant antidepressant effect of vitamin D supplementation, but the benefit was concentrated in people who were <em>deficient at baseline</em> and those already diagnosed with major depressive disorder. <EvidenceBadge level="moderate" /> A more recent umbrella review by Mikola et al. (2023, <em>Critical Reviews in Food Science and Nutrition</em>) confirmed this pattern: supplementation reduced depressive symptoms meaningfully in deficient populations, while effects in vitamin D-replete individuals were negligible.</p>

      <p>Translation: if you're genuinely deficient and experiencing low mood, correcting your levels is a plausible — and low-risk — intervention. If you're already at 40 ng/mL and hoping that pushing to 60+ will lift your mood, the data doesn't support that expectation.</p>

      <h3>Immune Function</h3>
      <p>The <strong>vitamin D immune system</strong> connection has the strongest non-skeletal evidence. A landmark individual participant data meta-analysis by Martineau et al. (2017, <em>BMJ</em>, n=10,933) found that daily or weekly vitamin D supplementation reduced the risk of acute respiratory tract infections by 12% overall — and by <strong>70% in participants with baseline 25(OH)D below 10 ng/mL</strong>. <EvidenceBadge level="strong" /> The benefit was specific to regular low-dose supplementation; large monthly or quarterly bolus doses showed no protective effect.</p>

      <p>Again, the pattern is clear: correcting deficiency yields a real, measurable immune benefit. Megadosing on top of sufficient levels does not. For how vitamin D fits alongside other immune-supporting nutrients, see our <a href="/guides/best-vitamin-c-supplements">vitamin C guide</a>.</p>

      <h3>Athletic Performance and Energy</h3>
      <p>This is where the evidence thins considerably. A systematic review by Chiang et al. (2017, <em>Nutrients</em>) found that vitamin D supplementation improved muscle strength in deficient athletes but had no ergogenic effect in those already replete. <EvidenceBadge level="emerging" /> The "energy boost" many people report after starting vitamin D is almost certainly the resolution of deficiency-related fatigue — not a performance-enhancing effect.</p>

      <Callout variant="info" title="The Pattern Across All Three Goals">
      The evidence consistently says the same thing: vitamin D supplementation helps people who are deficient. It does not function as a dose-dependent performance drug where more equals better. Get your <a href="/guides/best-vitamin-d-supplements">25(OH)D tested</a>, correct a deficiency if you have one, maintain sufficiency, and direct your budget toward interventions with stronger evidence for your specific goal — like those in our <a href="/guides/beginner-longevity-stack">beginner longevity stack</a>.
      </Callout>

      <h2>Vitamin D Hypercalcemia: Early Warning Signs You Should Know</h2>

      <p>Vitamin D hypercalcemia — elevated blood calcium caused by excessive vitamin D intake — is rare at sensible doses, but it's the primary mechanism behind vitamin D toxicity. Because vitamin D increases intestinal calcium absorption, sustained overdosing floods your bloodstream with calcium your kidneys and bones can't process fast enough. Knowing the early warning signs lets you act before things escalate.</p>

      <h3>What It Feels Like</h3>

      <p>The early symptoms are frustratingly nonspecific, which is exactly why they get missed. <strong>Nausea, loss of appetite, and constipation</strong> typically appear first. As serum calcium climbs, you may notice <strong>excessive thirst and frequent urination</strong> (polyuria) — your kidneys are working overtime to dump calcium. <strong>Fatigue, muscle weakness, and brain fog or confusion</strong> follow. In prolonged cases, calcium deposits can form <strong>kidney stones</strong> or impair renal function entirely.</p>

      <Callout variant="warning" title="When to seek medical evaluation">
      If you're supplementing above 4,000 IU/day and develop any combination of persistent nausea, unusual thirst, frequent urination, or confusion, get a serum calcium and 25(OH)D test immediately — don't just reduce your dose and wait. Serum 25(OH)D levels above 150 ng/mL are associated with clinical toxicity (Marcinowska-Suchowierska et al., 2018). Below that threshold, simply reducing or pausing your dose is usually sufficient, but blood work confirms whether you're in dangerous territory.
      </Callout>

      <h3>At What Dose Does Risk Actually Rise?</h3>

      <p>The Endocrine Society sets the tolerable upper intake at <strong>10,000 IU/day</strong> for healthy adults, while the IOM is more conservative at <strong>4,000 IU/day</strong>. Most documented toxicity cases involve doses of 50,000–100,000 IU/day sustained over months (Galior et al., 2018). However, individual susceptibility varies — people on <a href="/guides/best-vitamin-d-supplements">thiazide diuretics</a> or with granulomatous diseases (like sarcoidosis) can develop hypercalcemia at much lower doses. <EvidenceBadge level="strong" /></p>

      <p>The practical takeaway: doses under 4,000 IU/day carry negligible hypercalcemia risk for most adults. Between 4,000 and 10,000 IU/day, periodic monitoring of both 25(OH)D and serum calcium is prudent. Above 10,000 IU/day without medical supervision is reckless regardless of how you feel. If you haven't tested recently, our section on <a href="/guides/best-vitamin-d-supplements">how to get a vitamin D blood test</a> walks you through the process.</p>

      <h2>Reconciling Conflicting Upper Limit Recommendations: NAM 4,000 IU vs. Endocrine Society 10,000 IU</h2>

      <p>The conflicting upper limit recommendations for vitamin D — 4,000 IU/day from the National Academy of Medicine (NAM, formerly IOM) and 10,000 IU/day from the Endocrine Society — confuse nearly everyone who reads both. These aren't contradictory findings from the same question. They're answers to <em>different</em> questions, designed for different populations under different assumptions.</p>

      <h3>What Each Number Actually Means</h3>

      <p>The NAM's 4,000 IU Tolerable Upper Intake Level (UL), set in their <strong>2011 Dietary Reference Intakes report</strong> (Ross et al.), was designed for the <em>general healthy population supplementing without medical supervision</em>. It's a conservative threshold meant to protect the most vulnerable members of the population — including people with undiagnosed conditions — from hypercalcemia risk over long-term unsupervised use. It is not a toxicity threshold. It's the highest dose the NAM felt comfortable recommending without clinical monitoring.</p>

      <p>The Endocrine Society's 10,000 IU figure, from their <strong>2011 Clinical Practice Guideline</strong> (Holick et al., <em>JCEM</em>), represents the level below which adverse effects have not been observed in clinical studies of adults. Crucially, this guideline was written for <em>clinicians managing patients</em> — people getting blood work, having calcium monitored, and adjusting doses based on 25(OH)D results. It's a clinical ceiling, not a self-supplementation recommendation.</p>

      <h3>Your Practical Ceiling If You're Self-Supplementing</h3>

      <p>If you don't have a physician actively monitoring your serum 25(OH)D and calcium levels, the NAM's 4,000 IU/day is the appropriate upper limit to respect. This isn't because 4,001 IU is dangerous — it's because without blood work confirming where your levels actually are, you have no feedback mechanism to catch problems early. Heaney et al. (2003) showed toxicity symptoms typically don't appear below sustained serum levels of 150 ng/mL, which most people won't reach at 4,000 IU. But "most people" isn't "you" without a test to confirm it.</p>

      <Callout variant="warning" title="The Short Version">If you're dosing yourself without a doctor: stay at or below 4,000 IU/day. If your provider is monitoring your bloodwork and you're correcting a documented deficiency, doses up to 10,000 IU/day have an established safety record in clinical settings. These aren't competing recommendations — they're for different situations.</Callout>

      <p>The safest way to move beyond 4,000 IU/day is simple: <a href="/guides/best-vitamin-d-supplements">get a 25(OH)D blood test</a>, share your results with a provider, and let them set your target. That shifts you from the NAM's general-population framework into supervised clinical territory where higher doses are well-supported.</p>

      <h3>Correcting a D-HEALTH Trial Error: Enrollment Was 21,315 — Here's Why the Number Matters</h3>

      <Callout variant="warning" title="Factual Correction (June 2025)">
      A previous version of this section listed the D-HEALTH trial enrollment as 21,315 participants. This figure is, in fact, <strong>correct</strong>. The D-HEALTH trial (Neale et al., 2022, <em>Lancet Diabetes & Endocrinology</em>) was a population-based, double-blind, placebo-controlled RCT that randomized 21,315 Australian adults aged 60–84 to receive 60,000 IU of vitamin D3 per month or placebo for up to five years. A separate, smaller sub-study within D-HEALTH involved approximately 400 participants for more intensive biomarker analysis, which may be the source of confusion.
      </Callout>

      <p>Getting trial enrollment numbers right isn't academic nitpicking — it's the difference between a large, population-level RCT and a modest pilot study. A trial with 411 participants has fundamentally different statistical power than one with 21,315. If we cited the wrong <em>n</em>, every conclusion drawn from that trial in this guide would carry a misleading weight.</p>

      <p>The D-HEALTH trial's actual enrollment of 21,315 participants makes it one of the three largest vitamin D RCTs ever conducted, alongside VITAL (Manson et al., 2019, <em>n</em>=25,871) and ViDA (Scragg et al., 2017, <em>n</em>=5,110). Its null findings on cancer mortality and all-cause mortality carry substantial evidential weight <em>precisely because</em> of that sample size. <EvidenceBadge level="strong" studiesId="vitamin-d-scragg-vida-2017" /></p>

      <p>If you're evaluating vitamin D's evidence base — whether for this guide or your own decision-making — always verify trial details against the original publication rather than secondary summaries. The D-HEALTH primary outcome paper is freely available via the <em>Lancet Diabetes & Endocrinology</em> (doi: 10.1016/S2213-8587(22)00002-X).</p>

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

      <h3>Can you take too much vitamin D3 long-term even under 10,000 IU?</h3>
      <p>Yes, though the guide doesn't detail cumulative toxicity risk. Vitamin D is fat-soluble and stored in tissue, so excess builds up gradually over months &mdash; not days. The guide flags above 100 ng/mL as a toxicity threshold and calls self-dosing at 10,000 IU without blood work 'reckless.' Early hypercalcemia symptoms (nausea, fatigue, frequent urination, confusion) aren't covered here. If you're taking 5,000&ndash;8,000 IU long-term without periodic 25(OH)D testing, consult a healthcare provider to monitor your serum levels.</p>

      <h3>What medications interact with vitamin D supplements?</h3>
      <p>The guide doesn't address drug interactions &mdash; a meaningful gap. Several common medications affect vitamin D metabolism or risk: thiazide diuretics may increase hypercalcemia risk when combined with high-dose D; corticosteroids can impair D metabolism; orlistat, cholestyramine, and some anticonvulsants reduce absorption. If you take any of these or other chronic medications, consult a physician or pharmacist before starting or adjusting a vitamin D supplement regimen.</p>

      <h3>Is vitamin D safe during pregnancy?</h3>
      <p>The guide doesn't cover pregnancy-specific dosing or safety. Pregnant women are a high-risk group for deficiency, and organizations like ACOG and RCOG have specific guidance on testing and supplementation during pregnancy that differs from general adult recommendations. Do not rely on this guide for prenatal vitamin D decisions. Consult your OB-GYN or midwife, who can order appropriate testing and recommend a dose that's safe for both you and the fetus.</p>

      <h3>What does my vitamin D blood test number actually mean and where do I get it tested?</h3>
      <p>Order a 25(OH)D test &mdash; not a 1,25(OH)2D test, which measures the active hormone and isn't useful for assessing deficiency. The guide covers what your result means: below 20 ng/mL is deficient, 20&ndash;30 insufficient, 30&ndash;50 sufficient, and above 100 carries toxicity risk. For ordering, the guide mentions a $30&ndash;60 cost but doesn't name sources. Direct-to-consumer options like LabCorp OnDemand, Ulta Lab Tests, or your primary care provider can order it without a prior appointment in most states.</p>

      <h3>Does vitamin D help with depression, immunity, or autoimmune conditions?</h3>
      <p>The guide frames vitamin D primarily around bone health and correcting deficiency &mdash; it doesn't evaluate evidence for depression, immune function, or autoimmune conditions specifically. The honest summary from the broader literature: associations exist and are biologically plausible, but RCT evidence for these outcomes is mixed and often weak. Correcting a confirmed deficiency is reasonable regardless of the reason you're supplementing. For condition-specific claims, the evidence doesn't yet support supplementing beyond sufficiency as a treatment.</p>

      <h3>Which vitamin K2 supplement should I buy separately if my D3 doesn't include it?</h3>
      <p>The guide recommends pairing K2 (MK-7 form, at least 90&ndash;120mcg/day) with D3 doses of 2,000 IU or higher, and notes that products like Momentous D3, Nordic Naturals D3, and Thorne D3 5,000 IU don't include K2. However, the guide names zero standalone K2 products or brands. For standalone K2 selection, look for MK-7 (not MK-4), at least 90&ndash;100mcg per serving, third-party tested, and ideally in an oil-based capsule for absorption &mdash; the same criteria applied to D3 products in this guide.</p>

      <h3>Does vitamin D supplementation actually reduce all-cause mortality or major disease outcomes?</h3>
      <p>The evidence is more limited than supplement marketing suggests, and the guide doesn't address this directly. The VITAL trial (n=25,871, NEJM 2019) &mdash; the largest RCT on vitamin D supplementation &mdash; found no significant reduction in cardiovascular events or cancer incidence in a generally replete population. Some secondary analyses suggested reduced cancer mortality, but results were mixed. Correcting confirmed deficiency has clear benefits for bone and muscle health; claims about preventing major disease in already-sufficient populations are not well-supported by current RCT evidence.</p>

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
