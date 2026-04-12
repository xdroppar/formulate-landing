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

export function BeginnerLongevityStack() {
  return (
    <>
      <TLDRBox
        readTime="12 min read"
        takeaways={[
          "Tier 1 (omega-3, vitamin D + K2, magnesium) covers the most common deficiencies with the strongest longevity evidence",
          "Tier 2 (creatine, CoQ10, curcumin) adds evidence-based depth once your foundation is solid",
          "Tier 3 (NMN, resveratrol, spermidine) is exciting science but unproven in humans — skip until Tiers 1–2 are dialed in",
          "Exercise, sleep, and nutrition matter more than any supplement stack — build the foundation first",
        ]}
      />

      <p>
        Somewhere in the last five years, &ldquo;longevity&rdquo; went from
        a niche research topic to a full-blown industry. Peter Attia has a
        bestselling book. Bryan Johnson is spending $2 million a year trying
        not to age. Your coworker is putting NMN in his morning smoothie.
        And the supplement market has noticed &mdash; suddenly every product
        is &ldquo;anti-aging.&rdquo;
      </p>
      <p>
        Here&rsquo;s the uncomfortable reality: most &ldquo;longevity
        supplements&rdquo; are running far ahead of the human evidence. Some
        are worth taking. Many are expensive bets on animal data. And a few
        are basically astrology for biohackers.
      </p>
      <p>
        This guide tiers longevity supplements by the strength of their
        evidence in <em>humans</em> &mdash; not mice, not cell cultures,
        not David Sinclair&rsquo;s podcast. We&rsquo;ll tell you what&rsquo;s
        worth your money now, what&rsquo;s worth watching, and what&rsquo;s
        probably not worth the premium.
      </p>

      <Callout variant="tip" title="How to use this guide">
        Start with Tier 1. Get bloodwork. Add Tier 2 after 3 months of
        consistency. Consider Tier 3 only after everything else is dialed
        in. Resist the urge to buy everything at once.
      </Callout>

      <h2>How We Think About Evidence</h2>
      <p>
        Longevity is fundamentally hard to study. You can&rsquo;t run a
        30-year RCT and wait to see who dies later. So the field relies on
        proxy biomarkers: cardiovascular risk factors, insulin sensitivity,
        inflammatory markers, and more recently, biological aging clocks.
      </p>
      <p>
        We&rsquo;re tiering supplements based on:
      </p>
      <ul>
        <li>
          <strong>Tier 1 (Strong):</strong> Large human RCTs showing benefits
          on outcomes strongly linked to healthspan and mortality. These are
          foundational &mdash; not glamorous, but proven.
        </li>
        <li>
          <strong>Tier 2 (Moderate):</strong> Smaller human trials with
          positive results, backed by strong mechanistic understanding.
          Worth adding after your foundation is solid.
        </li>
        <li>
          <strong>Tier 3 (Emerging):</strong> Compelling animal data with
          plausible mechanisms, but human evidence is early or mixed. The
          &ldquo;interesting bet&rdquo; category.
        </li>
      </ul>

      <h2>Tier 1: The Boring Foundation That Actually Works</h2>
      <p>
        These aren&rsquo;t on anyone&rsquo;s &ldquo;Top 10 Anti-Aging
        Supplements&rdquo; YouTube video because they&rsquo;re not exciting.
        They&rsquo;re also the ones with the strongest evidence for keeping
        you alive and healthy longer. Start here.
      </p>

      <h3>Omega-3 Fatty Acids (EPA + DHA)</h3>
      <p>
        If you were going to take one supplement for the rest of your life,
        this would have the strongest argument.
      </p>
      <p>
        The evidence: the <strong>VITAL trial</strong> (25,871 participants)
        found significant reductions in heart attacks. <strong>REDUCE-IT</strong>{" "}
        (8,179 patients) showed a 25% reduction in cardiovascular events with
        high-dose EPA. <EvidenceBadge level="strong" /> A 2021 umbrella review in the <em>British Medical
        Journal</em> confirmed benefits for cardiovascular mortality and
        coronary heart disease.
      </p>
      <p>
        But the longevity angle goes beyond heart health. The{" "}
        <strong>Omega-3 Index</strong> &mdash; the percentage of EPA+DHA in
        your red blood cell membranes &mdash; is emerging as a standalone
        longevity biomarker. A 2018 study in the{" "}
        <em>Journal of Clinical Lipidology</em> found that people in the
        highest Omega-3 Index quartile lived an estimated{" "}
        <strong>5 years longer</strong> than those in the lowest. That&rsquo;s
        comparable to the mortality impact of smoking. <EvidenceBadge level="strong" />
      </p>

      <Callout variant="info" title="What to look for in omega-3">
        Combined EPA+DHA of 1,000&ndash;2,000mg daily (not total fish oil
        &mdash; check the Supplement Facts). Triglyceride form absorbs better
        than ethyl ester. IFOS certification is the gold standard for purity
        testing (heavy metals, oxidation). Take with any fat-containing meal.
      </Callout>

      <ProductCallout product={PRODUCTS["thorne-super-epa-pro"]} />

      <h3>Vitamin D3 + K2</h3>
      <p>
        Vitamin D receptors exist in virtually every cell type in your body.
        It&rsquo;s not really a &ldquo;vitamin&rdquo; &mdash; it functions
        more like a hormone, and low levels are associated with an impressive
        list of bad outcomes: increased all-cause mortality, cardiovascular
        disease, autoimmune conditions, type 2 diabetes, and cognitive
        decline.
      </p>

      <Callout variant="warning" title="42% of American adults are deficient">
        If you work indoors, live above the 37th parallel (roughly north of
        San Francisco or Richmond, VA), or have darker skin, your risk of
        vitamin D deficiency is even higher. Get tested before guessing your
        dose.
      </Callout>

      <p>
        The K2 part is critical and often skipped. Vitamin D increases
        calcium absorption, but K2 (specifically MK-7) directs that calcium
        into bones rather than arteries. Taking high-dose D3 without K2 is
        like flooding a highway with cars and removing all the road signs.
      </p>

      <Callout variant="info" title="What to look for in D3 + K2">
        D3 (not D2 &mdash;{" "}
        <a href="/guides/best-vitamin-d-supplements">
          here&rsquo;s why
        </a>
        ). Dose depends on your blood levels &mdash; get tested. Most people
        need 2,000&ndash;5,000 IU daily to maintain the optimal range of
        40&ndash;60 ng/mL. Pair with 100&ndash;200mcg K2 (MK-7). Take with
        a fat-containing meal.
      </Callout>

      <InteractionGroup title="D3 + K2 synergy">
        <InteractionCard
          type="synergy"
          a="Vitamin D3"
          b="Vitamin K2 (MK-7)"
          effect="D3 increases calcium absorption. K2 directs that calcium into bones rather than arteries, preventing vascular calcification."
          recommendation="At D3 doses above 2,000 IU, always pair with 100–200mcg K2."
        />
      </InteractionGroup>

      <ProductRow
        title="Top-scored D3 + K2 options"
        products={[
          PRODUCTS["thorne-vitamin-d-k2"],
          PRODUCTS["thorne-vitamin-d-5000"],
          PRODUCTS["thorne-vitamin-k"],
        ]}
      />

      <h3>Magnesium</h3>
      <p>
        Involved in 300+ enzymatic reactions including DNA repair, glucose
        metabolism, blood pressure regulation, and mitochondrial function.
        About 50% of Americans don&rsquo;t meet the RDA.
      </p>
      <p>
        From a longevity lens, magnesium&rsquo;s importance is tied to its
        role in metabolic health (insulin sensitivity), cardiovascular
        function (blood pressure, heart rhythm), and inflammatory
        regulation. Low magnesium is independently associated with increased
        cardiovascular mortality and type 2 diabetes risk. <EvidenceBadge level="strong" />
      </p>

      <Callout variant="info" title="What to look for in magnesium">
        Glycinate for general use and sleep support. Threonate if cognitive
        function is a priority. Avoid oxide. 200&ndash;400mg elemental
        magnesium daily, taken in the evening. (Deep dive in our{" "}
        <a href="/guides/signs-you-are-magnesium-deficient">
          magnesium deficiency guide
        </a>.)
      </Callout>

      <ProductRow
        title="Top-scored magnesium"
        products={[
          PRODUCTS["thorne-magnesium-bisglycinate"],
          PRODUCTS["nootropics-depot-magnesium-glycinate"],
          PRODUCTS["thorne-magnesium-citramate"],
        ]}
      />

      <h2>Tier 2: Evidence-Based Additions</h2>
      <p>
        These have meaningful human evidence but smaller effect sizes or
        narrower applications. Worth adding once your Tier 1 foundation is
        solid.
      </p>

      <h3>Creatine</h3>
      <p>
        Wait &mdash; isn&rsquo;t creatine a gym supplement? Yes. It&rsquo;s
        also increasingly relevant for longevity, and here&rsquo;s why:
      </p>
      <p>
        Muscle mass is one of the strongest predictors of all-cause mortality
        in aging populations. Sarcopenia (age-related muscle loss) begins
        in your 30s and accelerates after 60. Creatine is the single most
        evidence-backed supplement for maintaining strength and lean mass.
        <EvidenceBadge level="strong" />
      </p>
      <p>
        Beyond muscle, creatine has emerging neuroprotective evidence.
        Preclinical data shows benefits for brain energy metabolism, and
        several human trials have demonstrated cognitive benefits,
        particularly under conditions of stress or sleep deprivation.
        <EvidenceBadge level="moderate" />
      </p>

      <Callout variant="tip" title="Creatine is the easiest supplement to take">
        Creatine monohydrate, 3&ndash;5g daily. No fancy forms needed.
        Don&rsquo;t cycle it. Take it every day, any time. (More in our{" "}
        <a href="/guides/creatine-loading-phase">creatine loading guide</a>
        .)
      </Callout>

      <ProductRow
        title="Top-scored creatine"
        products={[
          PRODUCTS["thorne-creatine"],
          PRODUCTS["nootropics-depot-creatine"],
        ]}
      />

      <h3>CoQ10 (Coenzyme Q10)</h3>
      <p>
        CoQ10 is essential for mitochondrial electron transport &mdash;
        literally the process that generates cellular energy. It&rsquo;s also
        one of the body&rsquo;s most important lipid-soluble antioxidants.
        Natural levels decline with age, and statins (taken by 25% of
        adults over 40) further deplete them.
      </p>

      <Callout variant="evidence" title="Q-SYMBIO trial">
        The strongest human evidence comes from the Q-SYMBIO trial: 420
        patients with chronic heart failure randomized to CoQ10 or placebo
        for 2 years. The CoQ10 group showed significant reductions in
        cardiovascular mortality and hospital admissions. That&rsquo;s a
        hard clinical endpoint, not a biomarker. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        <strong>What to look for:</strong> Ubiquinol (reduced form) is more
        bioavailable, especially over age 40 when the body&rsquo;s ability
        to convert ubiquinone diminishes. 100&ndash;200mg daily with a
        fat-containing meal.
      </p>

      <ProductCallout product={PRODUCTS["thorne-coq10"]} />

      <h3>Curcumin</h3>
      <p>
        Chronic low-grade inflammation &mdash; sometimes called
        &ldquo;inflammaging&rdquo; &mdash; is one of the hallmarks of
        biological aging. It drives cardiovascular disease, neurodegeneration,
        metabolic dysfunction, and cancer progression. Curcumin is one of the
        most studied natural anti-inflammatory compounds, targeting NF-kB,
        COX-2, and multiple inflammatory cascades simultaneously.
      </p>
      <p>
        Human trials show benefits for inflammatory markers (CRP, IL-6),
        joint health, and cardiovascular risk factors. <EvidenceBadge level="moderate" /> The catch:
        standard curcumin has terrible bioavailability &mdash; most passes
        through unabsorbed.
      </p>

      <Callout variant="warning" title="Bioavailability is non-negotiable">
        Without an enhanced bioavailability formulation (Meriva, Longvida,
        CurcuWIN, or standard curcumin with piperine), you&rsquo;re
        absorbing almost nothing. Standard curcumin with piperine gives
        ~2,000% better absorption. 500&ndash;1,000mg daily.
      </Callout>

      <ProductCallout product={PRODUCTS["thorne-curcumin-phytosome"]} />

      <h2>Tier 3: The Interesting Bets</h2>
      <p>
        This is where things get controversial. These supplements have
        compelling mechanisms, exciting animal data, and in some cases early
        human trials. They&rsquo;re also expensive, and the evidence for
        meaningful longevity benefits in humans is not yet established.
        These are bets, not certainties.
      </p>

      <h3>NMN / NR (NAD+ Precursors)</h3>
      <p>
        NAD+ is a coenzyme involved in hundreds of cellular processes,
        including DNA repair, mitochondrial function, and sirtuin activation
        (the &ldquo;longevity genes&rdquo;). NAD+ levels decline with age
        &mdash; by roughly 50% between ages 40 and 60 in some tissues.
      </p>
      <p>
        NMN (nicotinamide mononucleotide) and NR (nicotinamide riboside) are
        precursors that raise NAD+ levels. The animal data is remarkable:
        improved mitochondrial function, enhanced DNA repair, metabolic
        improvements, and in some studies, extended lifespan.
        <EvidenceBadge level="emerging" />
      </p>

      <Callout variant="info" title="The gap between biomarker and benefit">
        Supplementation does raise blood NAD+ levels &mdash; that&rsquo;s
        been confirmed in multiple trials. What hasn&rsquo;t been confirmed
        is whether raising NAD+ in humans translates to the dramatic benefits
        seen in mice. At $1&ndash;3/day for quality products, it&rsquo;s an
        expensive experiment.
      </Callout>

      <p>
        <strong>Current verdict:</strong> Fascinating science. Unproven
        human benefit. If you have the budget and you&rsquo;ve nailed
        Tiers 1 and 2, it&rsquo;s a reasonable bet. If you&rsquo;re
        choosing between NMN and a quality omega-3, buy the omega-3.
      </p>

      <h3>Resveratrol</h3>
      <p>
        The red wine compound. The darling of longevity research circa
        2008&ndash;2015. Activates sirtuins, extends lifespan in yeast and
        mice, has beautiful in-vitro data.
      </p>

      <Callout variant="warning" title="Human trials have been disappointing">
        Bioavailability is poor (most is metabolized before reaching target
        tissues), and clinical trials have failed to show consistent
        benefits on metabolic or cardiovascular endpoints in humans.
        <EvidenceBadge level="emerging" /> Most serious longevity researchers
        have quietly moved on. Your money is probably better spent elsewhere.
      </Callout>

      <h3>Spermidine</h3>
      <p>
        A polyamine that induces autophagy &mdash; your body&rsquo;s cellular
        recycling process. Autophagy declines with age and is a core
        mechanism in most theories of aging. Caloric restriction and fasting
        activate it. So does spermidine.
      </p>
      <p>
        The most interesting data comes from the <strong>Bruneck
        study</strong>: a 20-year observational cohort that found higher
        dietary spermidine intake was associated with significantly reduced
        all-cause mortality. <EvidenceBadge level="moderate" /> Supplementation trials are ongoing, with early
        results showing improved memory in older adults.
      </p>
      <p>
        Found naturally in aged cheese, wheat germ, soybeans, and mushrooms.
        Supplements are available but expensive and still early in the
        evidence curve.
      </p>

      <h2>The Practical Starter Stack</h2>
      <p>
        If you&rsquo;re just starting, here&rsquo;s the evidence-based
        foundation. Master this before adding anything from Tier 3:
      </p>
      <ul>
        <li><strong>Omega-3 (EPA+DHA):</strong> 1&ndash;2g/day with meals</li>
        <li><strong>Vitamin D3 + K2:</strong> 2,000&ndash;5,000 IU D3 + 100&ndash;200mcg K2 (MK-7), with fat</li>
        <li><strong>Magnesium glycinate:</strong> 300&ndash;400mg, evening</li>
        <li><strong>Creatine monohydrate:</strong> 3&ndash;5g/day, anytime</li>
      </ul>
      <p>
        Total cost: roughly <strong>$40&ndash;60/month</strong>. This covers
        the most common deficiencies, addresses the strongest evidence for
        cardiovascular, metabolic, and muscular healthspan, and forms a
        foundation that Tier 2 and 3 additions can build on.
      </p>
      <p>
        For help with timing this stack, see our{" "}
        <a href="/guides/supplement-timing-guide">
          supplement timing guide
        </a>.
      </p>

      <ProductRow
        title="The starter longevity stack"
        products={[
          PRODUCTS["thorne-super-epa-pro"],
          PRODUCTS["thorne-vitamin-d-k2"],
          PRODUCTS["thorne-magnesium-bisglycinate"],
          PRODUCTS["thorne-creatine"],
        ]}
      />

      <h2>What Matters More Than Any Supplement</h2>

      <Callout variant="warning" title="No supplement stack compensates for poor fundamentals">
        This section isn&rsquo;t here for completeness &mdash; it&rsquo;s
        here because it&rsquo;s genuinely more important than everything
        above combined.
      </Callout>

      <ul>
        <li>
          <strong>Exercise.</strong> Resistance training preserves muscle mass
          (the strongest predictor of longevity in aging populations). Zone 2
          cardio improves mitochondrial function and cardiovascular health.
          Together, they&rsquo;re probably the single most impactful
          longevity intervention available to anyone. Nothing you can buy in
          a bottle comes close.
        </li>
        <li>
          <strong>Sleep.</strong> 7&ndash;9 hours. Non-negotiable. Sleep
          deprivation accelerates biological aging through every pathway
          we know how to measure: inflammation, insulin resistance, cortisol,
          DNA repair, immune function. Fix your sleep before you buy NMN.
          (See our{" "}
          <a href="/guides/best-sleep-supplement-protocol">
            sleep supplement protocol
          </a>{" "}
          if sleep quality is an issue.)
        </li>
        <li>
          <strong>Nutrition.</strong> Whole foods, adequate protein
          (0.7&ndash;1g per pound of body weight), minimize ultra-processed
          food. The Mediterranean diet pattern has the strongest
          epidemiological evidence for longevity of any dietary approach.
        </li>
        <li>
          <strong>Stress management.</strong> Chronic psychological stress
          accelerates telomere shortening and epigenetic aging. It&rsquo;s
          not soft science &mdash; it&rsquo;s measurable and significant.
        </li>
      </ul>
      <p>
        Supplements are the optimization layer. Exercise, sleep, nutrition,
        and stress management are the foundation. Build the foundation
        first.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>I&rsquo;m in my 20s. Is it too early for a longevity stack?</h3>
      <p>
        No, but reframe it: you&rsquo;re not &ldquo;anti-aging&rdquo; at 25.
        You&rsquo;re building a foundation. The Tier 1 supplements (omega-3,
        vitamin D, magnesium) address common deficiencies that affect how you
        feel and perform <em>right now</em>, with the bonus of long-term
        cardiovascular and metabolic benefits. Skip Tier 3 unless you have
        money to burn.
      </p>

      <h3>How do I know if my stack is working?</h3>
      <p>
        Get baseline bloodwork before you start: vitamin D, omega-3 index
        (if your lab offers it), RBC magnesium, hs-CRP (inflammation),
        fasting glucose, and a lipid panel. Retest in 3&ndash;6 months.
        Subjective improvements (energy, sleep, mood) are real but hard to
        attribute. Biomarkers don&rsquo;t lie.
      </p>

      <h3>Is it worth getting a biological age test?</h3>
      <p>
        Epigenetic clocks (like GrimAge or DunedinPACE) are the most
        promising biological aging measurements currently available. They
        measure DNA methylation patterns that correlate with mortality
        risk. However, their sensitivity to supplement interventions
        specifically is still being validated. They&rsquo;re interesting for
        self-experimenters but not yet clinically actionable for most people.
      </p>

      <h3>Should I take all of these forever?</h3>
      <p>
        Tier 1 (omega-3, D3+K2, magnesium): yes, these address chronic
        nutritional gaps that don&rsquo;t resolve on their own. Creatine:
        yes, the benefits require continuous supplementation. Tier 3: re-evaluate
        annually as new evidence emerges &mdash; the science is moving fast.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        The best longevity stack isn&rsquo;t the most expensive one. It&rsquo;s
        the one that addresses your actual deficiencies with evidence-backed
        compounds at clinical doses &mdash; and doesn&rsquo;t distract you
        from the fundamentals (exercise, sleep, nutrition) that no supplement
        can replace.
      </p>
      <p>
        Start with Tier 1. Get bloodwork. Add Tier 2 after 3 months. Consider
        Tier 3 only after everything else is dialed in and only if the
        evidence continues to develop. Resist the urge to buy everything
        Bryan Johnson takes. Your body isn&rsquo;t his, and your budget
        probably isn&rsquo;t either.
      </p>
      <p>
        <a href="https://app.formulate-health.app/stack">
          Build your longevity stack with Formulate &rarr;
        </a>
      </p>
    </>
  );
}
