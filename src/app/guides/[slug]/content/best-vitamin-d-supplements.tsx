import {
  TLDRBox,
  Callout,
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

      <h2>D3 vs. D2: This Is Not a Close Contest</h2>

      <Callout variant="evidence" title="D3 outperforms D2 by 87%">
        A 2012 meta-analysis by Tripkovic et al. in the{" "}
        <em>American Journal of Clinical Nutrition</em> pooled data across multiple
        RCTs and found D3 (cholecalciferol) is roughly 87% more effective at
        raising blood levels than D2 (ergocalciferol). <EvidenceBadge level="strong" />
      </Callout>

      <p>
        D2 is cheaper to produce and is the form historically used in prescription
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
        improved arterial stiffness in healthy postmenopausal women. <EvidenceBadge level="strong" />
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
        meal. <EvidenceBadge level="strong" />
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
        30 ng/mL. <EvidenceBadge level="strong" /> That&rsquo;s a reasonable starting point if you don&rsquo;t have
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
