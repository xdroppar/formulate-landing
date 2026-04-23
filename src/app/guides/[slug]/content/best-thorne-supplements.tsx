import {
  TLDRBox,
  Callout,
  ProductCallout,
  EvidenceBadge,
  IngredientLink,
  PRODUCTS,
} from "@/components/guide";

export function BestThorneSupplements() {
  return (
    <>
      <TLDRBox
        readTime="12 min read"
        takeaways={[
          "Thorne is the default pick for clinically-dosed, third-party-tested supplements — NSF Certified for Sport on the tier most athletes use",
          "Their highest-scoring products cluster around minerals, fish oil, and single-ingredient formulations where dose accuracy matters most",
          "Thorne Creatine, Vitamin D-5,000, and Magnesium Bisglycinate score 94+/100 on Formulate's rubric — all Grade A",
          "You pay a ~30-50% premium over generic brands for cGMP manufacturing, chelated mineral forms, and NSF/Informed Sport testing",
          "Skip Thorne's proprietary blends (e.g., Meta-Balance, Advanced Testosterone Support) — the single-ingredient line is where the value is",
          "If you're cost-sensitive, Thorne's Basic Nutrients 2/Day is still the cheapest path to a high-quality multivitamin foundation",
        ]}
      />

      <p>
        Thorne has built its reputation on one thing: consistently delivering exactly
        what the label claims. Independent third-party testing from ConsumerLab and
        the US Anti-Doping Agency regularly find Thorne products within 2% of
        labeled doses, with no contaminants. That reliability comes at a price —
        usually 30-50% more than drugstore brands — but for anyone who actually
        cares whether their{" "}
        <IngredientLink id="magnesium" source="best-thorne-supplements">magnesium</IngredientLink>,{" "}
        <IngredientLink id="creatine" source="best-thorne-supplements">creatine</IngredientLink>, or{" "}
        <IngredientLink id="vitamin-d" source="best-thorne-supplements">vitamin D</IngredientLink>{" "}
        is actually in the bottle, it's the default recommendation.
      </p>

      <p>
        On Formulate's ingredient-level rubric, 162 Thorne products have been
        scored across 50+ categories. Below are the 12 that score highest for
        common goals — every one Grade A or Grade B, every one third-party tested,
        none built on proprietary-blend marketing.
      </p>

      <h2>Why Thorne Dominates the Clinical Supplement Market</h2>

      <p>
        Thorne Research was founded in 1984 by a pharmacist specifically for
        integrative-medicine clinics that needed pharmaceutical-grade supplements
        they could dose like medications. That clinical-first positioning still
        drives the brand today. Three things separate them from the Amazon long tail:
      </p>

      <p>
        <strong>NSF Certified for Sport on a huge portion of the line.</strong>{" "}
        This is the tier professional athletes trust because it guarantees no
        banned substances. Most competitors either skip this certification or
        only apply it to a few sports-marketed SKUs. For Thorne it's standard
        operating procedure across categories most users don't even realize need
        it.
      </p>

      <p>
        <strong>Chelated mineral forms as the default.</strong> Where other
        brands default to cheap <a href="/guides/best-magnesium-supplements">magnesium</a> oxide (4% absorbed, often causes GI
        upset) or ferrous sulfate <a href="/guides/iron-guide">iron</a> (constipating, poorly absorbed), Thorne
        defaults to bisglycinate chelates — bound to glycine amino acid for
        ~4-6x better absorption. <EvidenceBadge level="strong" />
      </p>

      <p>
        <strong>Single-ingredient formulations over blends.</strong> Thorne does
        sell proprietary blends, but their strongest products are single-nutrient
        SKUs at clinically-studied doses. This makes it easy to build a stack
        without stacking up redundant ingredients across multiple formulas.
      </p>

      <h2>The Top 12 Thorne Supplements, Ranked</h2>

      <h3>1. Thorne Creatine — For Strength, Recovery, and Cognition</h3>
      <p>
        <IngredientLink id="creatine" source="best-thorne-supplements">Creatine monohydrate</IngredientLink> is the single
        most-studied sports supplement in history, with 1,000+ peer-reviewed
        trials. Thorne's version is pure Creapure (the branded German-made
        monohydrate used in most published trials), NSF Certified for Sport,
        and delivers exactly 5g per scoop. No proprietary blend, no fancy
        "HCl" or "nitrate" reformulations that lack clinical evidence.
      </p>
      <p>
        Dose: 3-5g daily. Loading phase (20g/day for 5-7 days) is optional —
        you reach saturation in ~28 days either way.
      </p>
      <ProductCallout product={PRODUCTS["thorne-creatine"]} />
      <Callout variant="tip" title="Women and creatine">
        <a href="/guides/best-creatine-supplements">Creatine</a> is not a men&apos;s supplement. Emerging research shows
        disproportionate benefits for women&rsquo;s muscle retention, cognitive
        function, and postmenopausal bone density. See our{" "}
        <a href="/guides/creatine-for-women">creatine for women</a> guide.
      </Callout>

      <h3>2. Thorne Vitamin D-5,000 — The Foundation Supplement</h3>
      <p>
        Roughly 42% of US adults are{" "}
        <IngredientLink id="vitamin-d" source="best-thorne-supplements">vitamin D</IngredientLink>{" "}
        insufficient (serum 25(OH)D &lt; 30 ng/mL). For most deficient adults,
        a 5,000 IU/day dose is what it takes to push serum levels into the
        40-60 ng/mL range where most benefits plateau. <EvidenceBadge level="strong" />
      </p>
      <p>
        Thorne&rsquo;s D-5,000 is NSF certified, uses cholecalciferol (D3) —
        the form humans make from sunlight — and includes medium-chain
        triglycerides as a delivery vehicle for improved absorption. Pairs
        naturally with vitamin K2 (Thorne sells the combo version), which
        helps direct absorbed calcium to bone instead of arterial walls.
      </p>
      <ProductCallout product={PRODUCTS["thorne-vitamin-d-5000"]} />

      <h3>3. Thorne Magnesium Bisglycinate — For Sleep, Anxiety, and Recovery</h3>
      <p>
        About half the US population doesn&rsquo;t hit the RDA for{" "}
        <IngredientLink id="magnesium" source="best-thorne-supplements">magnesium</IngredientLink>,
        and the forms sold cheapest (oxide, citrate) have either poor
        absorption or laxative side effects at meaningful doses. Thorne&rsquo;s
        bisglycinate is chelated to glycine, which gives it roughly 4x the
        absorption of magnesium oxide with essentially no GI side effects.
        Glycine itself is calming, which makes this form particularly good
        for evening use.
      </p>
      <p>
        Dose: 200-400 mg elemental magnesium daily, most commonly split
        between morning and evening or taken 30-60 minutes before bed.
      </p>
      <ProductCallout product={PRODUCTS["thorne-magnesium-bisglycinate"]} />
      <Callout variant="tip" title="Which magnesium form?">
        Glycinate/bisglycinate for sleep and anxiety. Citrate for constipation
        (it&rsquo;s a mild osmotic laxative). Threonate is the only form that
        crosses the blood-brain barrier well and is studied for cognition —
        but it&rsquo;s 3-5x the cost. For most people, bisglycinate is the
        right default.
      </Callout>

      <h3>4. Thorne Super EPA Pro — The High-EPA Fish Oil</h3>
      <p>
        Standard{" "}
        <IngredientLink id="omega-3" source="best-thorne-supplements">omega-3</IngredientLink>{" "}
        fish oil ships with a roughly 3:2 EPA:DHA ratio because that&rsquo;s
        what&rsquo;s cheapest to extract. Super EPA Pro is concentrated to
        deliver 1,300 mg EPA + 225 mg DHA per 2-softgel dose — the EPA-heavy
        profile with the strongest evidence for triglyceride reduction,
        inflammation, and mood. <EvidenceBadge level="strong" />
      </p>
      <p>
        Third-party tested for oxidation (TOTOX score) and heavy metals.
        Ester form, so it&rsquo;s roughly 50% better absorbed than
        triglyceride-form fish oil at equivalent EPA+DHA labels.
      </p>
      <ProductCallout product={PRODUCTS["thorne-super-epa-pro"]} />

      <h3>5. Thorne NAC — Oral Glutathione Support</h3>
      <p>
        N-Acetylcysteine is the most efficient way to raise intracellular
        glutathione orally. Used clinically for acetaminophen overdose, it
        also has growing evidence for PCOS, fatty liver, and respiratory
        health. <EvidenceBadge level="moderate" />
      </p>
      <p>
        Dose: 600-1,200 mg daily with food. Thorne&rsquo;s <a href="/guides/nac-guide">NAC</a> is NSF
        certified and standardized at 500 mg per capsule.
      </p>
      <ProductCallout product={PRODUCTS["thorne-nac"]} />
      <Callout variant="warning" title="NAC + nitrates interaction">
        NAC can amplify the effects of nitrates (used for chest pain) and
        may interact with some blood pressure medications. If you take
        prescription meds, check with your pharmacist before starting. For
        context on combining NAC with alcohol, see our{" "}
        <a href="/guides/nac-and-alcohol">NAC and alcohol</a> guide.
      </Callout>

      <h3>6. Thorne Berberine — For Blood Sugar and Metabolic Health</h3>
      <p>
        <IngredientLink id="berberine" source="best-thorne-supplements">Berberine</IngredientLink>{" "}
        activates AMPK, the same metabolic pathway targeted by metformin.
        Multiple head-to-head trials show <a href="/guides/berberine-guide">berberine</a> and metformin produce
        comparable drops in fasting glucose and HbA1c for type 2 diabetics.{" "}
        <EvidenceBadge level="moderate" />
      </p>
      <p>
        Dose: 500 mg 2-3 times daily with meals (berberine has a short
        half-life, so splitting is important). Thorne&rsquo;s version is
        200 mg per capsule at their newer formula; take 2-3 per meal.
      </p>
      <ProductCallout product={PRODUCTS["thorne-berberine"]} />
      <Callout variant="tip" title="Berberine vs metformin">
        Berberine is not a replacement for prescribed metformin, but for
        prediabetic users or those not on medication, it has the strongest
        evidence of any over-the-counter option. See our{" "}
        <a href="/guides/berberine-vs-metformin">berberine vs metformin</a>{" "}
        guide for the head-to-head breakdown.
      </Callout>

      <h3>7. Thorne Iron Bisglycinate — For Ferritin Recovery Without GI Upset</h3>
      <p>
        Standard iron (ferrous sulfate) causes constipation, nausea, and
        black stools in roughly 20% of users. Chelated iron bisglycinate
        has equivalent absorption with dramatically fewer side effects.
        For anyone with low ferritin — common in menstruating women,
        endurance athletes, and vegetarians — this is the form to start on.
      </p>
      <p>
        Dose: 25-50 mg elemental iron daily, on an empty stomach if
        tolerated, paired with vitamin C for enhanced absorption.
      </p>
      <ProductCallout product={PRODUCTS["thorne-iron-bisglycinate"]} />
      <Callout variant="warning" title="Test before supplementing">
        Iron overload is genuinely harmful. Test serum ferritin before
        starting iron. Target 30-100 ng/mL for most adults; athletes may
        benefit from the higher end of that range.
      </Callout>

      <h3>8. Thorne Vitamin B12 — For Energy and Methylation</h3>
      <p>
        Vitamin B12 deficiency is common in older adults, vegans, and
        anyone on metformin or acid-suppressing drugs. Thorne&rsquo;s
        B12 uses methylcobalamin — the active form that doesn&rsquo;t
        require additional conversion and works for people with MTHFR
        polymorphisms that limit methylation.
      </p>
      <p>
        Dose: 1,000 mcg daily for most adults; 5,000 mcg weekly for
        confirmed deficiency. See our{" "}
        <a href="/guides/vitamin-b12-guide">vitamin B12 guide</a> for the
        full breakdown.
      </p>
      <ProductCallout product={PRODUCTS["thorne-vitamin-b12"]} />

      <h3>9. Thorne Zinc Bisglycinate — For Immune Function</h3>
      <p>
        <IngredientLink id="zinc" source="best-thorne-supplements">Zinc</IngredientLink>{" "}
        is essential for immune function, wound healing, and testosterone
        synthesis. The bisglycinate form is better absorbed than <a href="/guides/zinc-guide">zinc</a>
        oxide or gluconate, and much easier on an empty stomach.
      </p>
      <p>
        Dose: 15-30 mg daily. Avoid long-term high-dose zinc ({`>`}50 mg) —
        it depletes copper over time.
      </p>
      <ProductCallout product={PRODUCTS["thorne-zinc-bisglycinate"]} />

      <h3>10. Thorne Ashwagandha — For Stress and Sleep Quality</h3>
      <p>
        Thorne uses Sensoril <a href="/guides/ashwagandha-guide">ashwagandha</a> extract, the root-and-leaf blend
        studied in multiple placebo-controlled trials for cortisol
        reduction, sleep quality, and resilience to chronic stress.{" "}
        <EvidenceBadge level="moderate" />
      </p>
      <p>
        Dose: 500-600 mg daily of the standardized extract. Evening dosing
        for sleep benefits, morning for daytime stress management.
      </p>
      <ProductCallout product={PRODUCTS["thorne-ashwagandha"]} />
      <Callout variant="warning" title="Thyroid caution">
        Ashwagandha can stimulate thyroid hormone output in a dose-dependent
        way. If you take levothyroxine or have existing thyroid disease,
        consult your doctor before starting — and plan to retest TSH and
        free T4 at 4-8 weeks.
      </Callout>

      <h3>11. Thorne Glycine — For Sleep Onset and Core Temperature</h3>
      <p>
        3g of glycine taken 30-60 minutes before bed lowers core body
        temperature and improves sleep-onset latency in multiple
        placebo-controlled trials. It&rsquo;s one of the few amino acids
        with a direct sleep benefit. <EvidenceBadge level="moderate" />
      </p>
      <p>
        Thorne&rsquo;s powdered glycine is cost-effective and mixes cleanly
        into water with a faint sweetness.
      </p>
      <ProductCallout product={PRODUCTS["thorne-glycine"]} />

      <h3>12. Thorne CoQ10 — For Heart Health and Statin Users</h3>
      <p>
        Statin drugs deplete endogenous CoQ10 production. For statin users
        over 50, supplementation with 100-200 mg daily may help restore
        mitochondrial function and reduce statin-associated muscle
        symptoms. <EvidenceBadge level="moderate" />
      </p>
      <p>
        Thorne&rsquo;s CoQ10 uses the ubiquinone form at 100 mg per softgel.
        For adults over 60 or those with cardiovascular conditions, the
        ubiquinol (reduced) form is better absorbed but more expensive.
      </p>
      <ProductCallout product={PRODUCTS["thorne-coq10"]} />

      <h2>Where Thorne Doesn&rsquo;t Win</h2>

      <p>
        Formulate&rsquo;s scoring doesn&rsquo;t give Thorne a free pass.
        Several of their products land in the Grade B-C range because of
        real tradeoffs:
      </p>

      <p>
        <strong>Proprietary blends:</strong> Products like Meta-Balance,
        Advanced Testosterone Support, and the &ldquo;Core Series&rdquo; stacks use
        proprietary blends that hide individual ingredient doses. This
        limits how precisely you can compare against clinical trial doses.
        Skip these in favor of single-ingredient formulations.
      </p>

      <p>
        <strong>Some multivitamins:</strong> Basic Nutrients 2/Day is a
        solid everyday multi (Grade A at a 91 score), but Thorne&rsquo;s
        Multi-Vitamin Elite and other higher-priced multis don&rsquo;t
        score meaningfully better than the Basic formula.
      </p>

      <p>
        <strong><a href="/guides/collagen-guide">Collagen</a>:</strong> Thorne Collagen Plus is Grade B. If
        collagen is your priority, brands like Complement or specialized
        type-II formulations may be a better fit — see our{" "}
        <a href="/guides/best-collagen-for-joints">best collagen for joints</a>{" "}
        roundup.
      </p>

      <h2>Building a Thorne Stack for Common Goals</h2>

      <p>
        Most users don&rsquo;t need every supplement above. Here are four
        goal-specific starter stacks built entirely from Thorne products:
      </p>

      <p>
        <strong>Foundation (everyone):</strong> Basic Nutrients 2/Day
        multivitamin + Vitamin D-5,000 + Magnesium Bisglycinate + Super
        EPA Pro. ~$80/month.
      </p>

      <p>
        <strong>Sleep and stress:</strong> Magnesium Bisglycinate (evening)
        + Glycine (evening) + Ashwagandha (morning or evening). Optionally
        add L-Theanine for acute stress or racing thoughts.
      </p>

      <p>
        <strong>Metabolic health:</strong> Berberine (3x daily with meals)
        + Vitamin D-5,000 + <a href="/guides/best-omega-3-supplements">Omega-3</a>. Add chromium or alpha-lipoic acid for
        deeper blood sugar support.
      </p>

      <p>
        <strong>Performance / recovery:</strong> Creatine (daily) + Vitamin
        D-5,000 + Magnesium Bisglycinate (recovery/sleep) + Iron Bisglycinate
        (if ferritin confirmed low).
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Is Thorne NSF Certified for Sport?</h3>
      <p>
        Most of Thorne&rsquo;s single-ingredient products carry NSF Certified
        for Sport certification, which independently verifies the label is
        accurate and screens for over 270 substances banned by major sports
        organizations. Check individual product pages for the current
        certification status — some niche products carry only the base NSF
        certification or none at all.
      </p>

      <h3>Where is Thorne manufactured?</h3>
      <p>
        Thorne manufactures in its FDA-registered facility in South
        Carolina, USA. Their manufacturing meets cGMP standards and is
        independently audited.
      </p>

      <h3>Is Thorne worth the premium price?</h3>
      <p>
        For single-ingredient products at clinically relevant doses — yes,
        the 30-50% price premium over Amazon generics buys genuine quality
        control, better-absorbed chelated forms, and independent testing.
        For proprietary blends or multivitamins, the value proposition is
        weaker; generic alternatives at 1/3 the price often perform
        similarly.
      </p>

      <h3>Thorne vs Pure Encapsulations — which is better?</h3>
      <p>
        Both brands play in the same clinical-grade tier, and both score
        well on Formulate&rsquo;s rubric. Pure Encapsulations is slightly
        more focused on allergen-free (no gluten, soy, dairy, GMO)
        formulations. Thorne has broader NSF Certified for Sport coverage
        and more performance-oriented products. For most users, the
        brand you buy matters less than which product you pick.
      </p>

      <h3>Can I use Thorne supplements if I&rsquo;m on prescription medications?</h3>
      <p>
        Thorne products are supplements, not drugs, but many ingredients
        do interact with prescription medications. The big ones to watch
        are St. John&rsquo;s Wort (not a Thorne product), Ashwagandha with
        thyroid medication, NAC with nitrates, and Berberine with other
        blood sugar medications. Use Formulate&rsquo;s free{" "}
        <a href="/interactions">interaction checker</a> before adding any
        new supplement to a medication regimen, and always discuss with
        your prescribing clinician.
      </p>

      <h2>Bottom Line</h2>

      <p>
        Thorne isn&rsquo;t the cheapest supplement brand, but it&rsquo;s
        arguably the most consistent. If you&rsquo;re tired of reading
        ConsumerLab reports that find the bottle contains 40% of the
        labeled amount, or you just want to stop researching every
        individual brand, Thorne is the default that lets you focus on
        which supplements to take rather than which brand to trust.
      </p>

      <p>
        The 12 products above represent Thorne&rsquo;s strongest
        combination of clinical dosing, third-party testing, and
        single-ingredient clarity. Everything on this list is on
        Formulate&rsquo;s catalog with full ingredient-level scoring —
        click any ProductCallout above to see the full breakdown.
      </p>
    </>
  );
}
