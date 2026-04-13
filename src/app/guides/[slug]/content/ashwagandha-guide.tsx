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

export function AshwagandhaGuide() {
  return (
    <>
      <TLDRBox
        readTime="12 min read"
        takeaways={[
          "Ashwagandha reduces cortisol by ~28% in chronically stressed adults (strong RCT evidence)",
          "Extract type matters enormously — KSM-66 (5% withanolides) for general use, Sensoril (10%) for sleep/anxiety",
          "Cycle 8–12 weeks on, 2–4 weeks off as a precautionary default",
          "Skip entirely if you have autoimmune conditions, thyroid issues, or are pregnant",
        ]}
      />

      <p>
        You&rsquo;ve been sleeping seven hours but waking up wired. Your
        resting heart rate has crept up. You snap at people over nothing, and
        by 3pm you&rsquo;re running on fumes and caffeine. Somewhere between
        a podcast and a Reddit thread, someone mentioned ashwagandha, and now
        you&rsquo;re wondering: does this stuff actually work, or is it just
        another overhyped adaptogen riding a wave of wellness marketing?
      </p>
      <p>
        The short answer: ashwagandha is one of the few herbal supplements
        where the clinical evidence is genuinely interesting &mdash; but the
        form you take matters enormously, and most of the products on shelves
        are not the same thing that was used in the studies.
      </p>

      <h2>What Ashwagandha Actually Is</h2>
      <p>
        Ashwagandha (<em>Withania somnifera</em>) is a small shrub native to
        India and Southeast Asia. It&rsquo;s been used in Ayurvedic medicine
        for centuries, which is either reassuring or meaningless depending on
        how you feel about traditional medicine. What matters for our purposes
        is what modern randomized controlled trials have found &mdash; and
        there are now enough of them to draw real conclusions.
      </p>
      <p>
        The active compounds are called <strong>withanolides</strong> &mdash;
        a class of steroidal lactones found in the plant&rsquo;s roots and
        leaves. The concentration of withanolides varies wildly between
        products, which is why the extract you choose is the single most
        important decision you&rsquo;ll make. More on that in a moment.
      </p>

      <h2>The Evidence: Where It&rsquo;s Strong</h2>

      <h3>Cortisol and Stress Response</h3>
      <p>
        This is ashwagandha&rsquo;s strongest claim. A 2012 double-blind RCT
        by Chandrasekhar et al., published in the{" "}
        <em>Indian Journal of Psychological Medicine</em>, gave 64 chronically
        stressed adults either 600mg of full-spectrum ashwagandha root extract
        or placebo for 60 days. The ashwagandha group showed a{" "}
        <strong>27.9% reduction in serum cortisol</strong> compared to
        baseline, versus a negligible change in the placebo group. Perceived
        stress scores dropped significantly on every validated scale they used.{" "}
        <EvidenceBadge level="strong" />
      </p>
      <p>
        A 2019 RCT by Lopresti et al. in <em>Medicine</em> confirmed this
        with 240mg of a high-concentration extract (Shoden&reg;, 35%
        withanolides), finding significant reductions in both cortisol and
        self-reported stress at 60 days. The cortisol reduction is not subtle
        &mdash; it&rsquo;s one of the larger effect sizes you&rsquo;ll see
        in herbal supplement research. <EvidenceBadge level="strong" />
      </p>

      <Callout variant="evidence" title="Cortisol reduction">
        Multiple RCTs consistently show ashwagandha reduces serum cortisol by
        20&ndash;30% over 8&ndash;12 weeks. This is one of the strongest
        effect sizes in herbal supplement research.{" "}
        <EvidenceBadge level="strong" />
      </Callout>

      <h3>Anxiety</h3>
      <p>
        A 2014 systematic review by Pratte et al. in the{" "}
        <em>Journal of Alternative and Complementary Medicine</em> analyzed
        five human trials and found that ashwagandha{" "}
        <strong>consistently outperformed placebo on anxiety measures</strong>,
        including the Hamilton Anxiety Rating Scale. The effect sizes ranged
        from moderate to large. This isn&rsquo;t &ldquo;maybe it helps a
        little&rdquo; territory &mdash; the signal is clear.{" "}
        <EvidenceBadge level="strong" />
      </p>
      <p>
        That said, ashwagandha is not a replacement for clinical anxiety
        treatment. If you have diagnosed anxiety, it&rsquo;s a conversation
        with your doctor, not a DIY project.
      </p>

      <h3>Sleep Quality</h3>
      <p>
        A 2019 double-blind RCT by Langade et al. in <em>Cureus</em> found
        that 600mg of ashwagandha root extract significantly improved sleep
        quality, sleep onset latency, and overall restfulness in both healthy
        adults and people with insomnia over 10 weeks. The{" "}
        <em>somnifera</em> in the Latin name literally means
        &ldquo;sleep-inducing,&rdquo; and the data backs it up.{" "}
        <EvidenceBadge level="strong" />
      </p>
      <p>
        If you&rsquo;re building a sleep protocol, ashwagandha is worth
        considering alongside other evidence-based options. Our{" "}
        <a href="/guides/best-sleep-supplement-protocol">
          sleep supplement protocol guide
        </a>{" "}
        covers how to layer these intelligently.
      </p>

      <h2>The Evidence: Where It&rsquo;s Moderate</h2>

      <h3>Testosterone and Male Fertility</h3>
      <p>
        Several studies suggest ashwagandha can increase testosterone in men,
        though the effects are modest in healthy young men and more pronounced
        in older or stressed populations. A 2019 RCT by Lopresti et al. in{" "}
        <em>American Journal of Men&rsquo;s Health</em> found a 14.7%
        increase in testosterone over 8 weeks with 600mg of KSM-66. A 2010
        study by Ahmad et al. in <em>Fertility and Sterility</em> showed
        improved semen parameters in infertile men.{" "}
        <EvidenceBadge level="moderate" />
      </p>
      <p>
        Don&rsquo;t expect this to turn you into a different person. The
        testosterone increase is real but relatively small &mdash; think of
        it as optimizing within your natural range, not a pharmacological
        intervention.
      </p>

      <h3>Athletic Performance</h3>
      <p>
        A 2015 study by Wankhede et al. in the{" "}
        <em>Journal of the International Society of Sports Nutrition</em>{" "}
        found that 600mg of KSM-66 combined with resistance training produced
        greater increases in muscle strength (bench press and leg extension)
        and muscle size compared to placebo over 8 weeks. Recovery markers
        also improved. The effect is real but modest &mdash; don&rsquo;t
        expect it to replace <a href="/guides/best-creatine-supplements">creatine</a> or good programming.{" "}
        <EvidenceBadge level="moderate" />
      </p>

      <ProductCallout product={PRODUCTS["thorne-ashwagandha"]} />

      <h2>The Form Matters More Than the Brand</h2>
      <p>
        This is the part most people get wrong. &ldquo;Ashwagandha&rdquo; on
        a label tells you almost nothing. The extract type determines the
        withanolide concentration, which determines whether you&rsquo;re
        taking what was actually studied or an underpowered generic.
      </p>

      <h3>KSM-66&reg;</h3>
      <p>
        The most-studied branded extract, made from roots only using a
        &ldquo;Green Chemistry&rdquo; water-based extraction. Standardized to{" "}
        <strong>5% withanolides</strong>. This is the extract used in the
        majority of positive clinical trials. If you&rsquo;re taking
        ashwagandha for stress, testosterone, or athletic performance,
        KSM-66 is the default recommendation.
      </p>

      <h3>Sensoril&reg;</h3>
      <p>
        Made from both roots and leaves, standardized to{" "}
        <strong>10% withanolides</strong> (higher concentration). Sensoril
        tends to be more calming and sedating, which makes it better suited
        for anxiety and sleep. The higher withanolide content means you need
        a lower dose &mdash; 125&ndash;250mg vs. 600mg for KSM-66.
      </p>

      <Callout variant="warning" title="Avoid generic root powder">
        Unextracted root powder typically contains only 1&ndash;2%
        withanolides. You&rsquo;d need several grams to match a single
        capsule of KSM-66 or Sensoril. Many budget products use this without
        disclosing it clearly. Always check the Supplement Facts panel for
        extract ratio or withanolide percentage.
      </Callout>

      <h3>Generic Root Powder</h3>
      <p>
        Unextracted root powder typically contains only 1&ndash;2%
        withanolides. You&rsquo;d need to take several grams to match the
        withanolide content of a single capsule of KSM-66 or Sensoril. Many
        budget products use this and don&rsquo;t disclose it clearly. Check
        the Supplement Facts panel for the extract ratio or withanolide
        percentage &mdash; our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          guide to reading supplement labels
        </a>{" "}
        shows you exactly what to look for.
      </p>

      <h2>Dosing: What the Studies Used</h2>
      <p>
        Dosing depends entirely on which extract you&rsquo;re taking:
      </p>
      <ul>
        <li>
          <strong>KSM-66:</strong> 600mg per day (typically split into two
          300mg doses, or taken as a single dose). This is the dose used in
          most KSM-66 trials.
        </li>
        <li>
          <strong>Sensoril:</strong> 125&ndash;250mg per day. The higher
          withanolide concentration means less is needed.
        </li>
        <li>
          <strong>Generic root extract (2.5% withanolides):</strong>{" "}
          300&ndash;600mg per day, but results are less predictable because
          standardization varies.
        </li>
      </ul>

      <Callout variant="tip" title="More is not better">
        Some evidence suggests that very high doses can cause GI discomfort
        without additional benefit. Stick to the studied ranges for your
        chosen extract type.
      </Callout>

      <h2>Timing: Morning or Evening?</h2>
      <p>
        This depends on your goal:
      </p>
      <ul>
        <li>
          <strong>For stress and cortisol:</strong> Morning with breakfast.
          Cortisol naturally peaks in the morning, and taking ashwagandha
          early helps blunt the stress response throughout the day.
        </li>
        <li>
          <strong>For sleep:</strong> 30&ndash;60 minutes before bed.
          Sensoril is particularly good here due to its stronger calming
          effect.
        </li>
        <li>
          <strong>For general use (KSM-66 at 600mg):</strong> Split into
          300mg morning and 300mg evening, or take the full dose with
          whichever meal is most consistent for you.
        </li>
      </ul>
      <p>
        For detailed guidance on scheduling ashwagandha alongside other
        supplements, see our{" "}
        <a href="/guides/supplement-timing-guide">
          comprehensive supplement timing guide
        </a>.
      </p>

      <h2>Who Should Not Take Ashwagandha</h2>

      <Callout variant="warning" title="Hard contraindications">
        Ashwagandha stimulates immune activity and affects thyroid hormones.
        Do not take it if you have autoimmune conditions, thyroid disorders,
        are pregnant, or have surgery scheduled within 2 weeks.
      </Callout>

      <p>
        Ashwagandha is generally well-tolerated, but there are real
        contraindications &mdash; not just boilerplate warnings:
      </p>
      <ul>
        <li>
          <strong>Autoimmune conditions</strong> (lupus, rheumatoid arthritis,
          Hashimoto&rsquo;s, MS): Ashwagandha stimulates immune activity,
          which is the opposite of what you want when your immune system is
          already attacking your own tissue.
        </li>
        <li>
          <strong>Thyroid conditions:</strong> Ashwagandha has been shown to
          increase T3 and T4 thyroid hormones in multiple studies. If
          you&rsquo;re on thyroid medication (levothyroxine), it can
          destabilize your dosing. If you have hyperthyroidism, it could
          make things worse.
        </li>
        <li>
          <strong>Pregnancy and breastfeeding:</strong> Insufficient safety
          data. Traditional Ayurvedic texts actually classify it as an
          abortifacient at high doses. Don&rsquo;t risk it.
        </li>
        <li>
          <strong>Surgery within 2 weeks:</strong> It may potentiate
          sedatives and anesthesia, and its mild blood-sugar-lowering effect
          could complicate perioperative management.
        </li>
      </ul>

      <h2>Is It Safe Long-Term?</h2>
      <p>
        This is the question everyone asks, and the honest answer is: probably,
        but the data is limited. Most clinical trials run 8&ndash;12 weeks.
        We don&rsquo;t have 5-year safety data from controlled studies.
      </p>
      <p>
        What we do have: centuries of traditional use, no serious adverse
        events in published trials at standard doses, and a 2020 safety
        review by Tandon and Yadav in the{" "}
        <em>Journal of Ethnopharmacology</em> that found ashwagandha
        well-tolerated in doses up to 1,250mg daily for 30 days.{" "}
        <EvidenceBadge level="moderate" />
      </p>
      <p>
        A common practitioner recommendation is to cycle ashwagandha: take it
        for 8&ndash;12 weeks, then take 2&ndash;4 weeks off. This isn&rsquo;t
        because there&rsquo;s evidence of harm from continuous use &mdash;
        it&rsquo;s a precautionary approach based on the principle that
        chronically suppressing cortisol may not be ideal, and adaptogens
        may lose efficacy over time. Whether cycling is truly necessary is
        debated, but it&rsquo;s a reasonable default.
      </p>

      <h2>How It Fits Into a Broader Stack</h2>
      <p>
        Ashwagandha pairs well with a few other supplements. For stress and
        cortisol management, <a href="/guides/best-magnesium-supplements">magnesium glycinate</a> in the evening is a natural
        complement. For a comprehensive longevity-focused approach, it fits
        neatly into a foundational stack alongside <a href="/guides/best-vitamin-d-supplements">vitamin D</a>, <a href="/guides/best-omega-3-supplements">omega-3</a>, and
        magnesium &mdash; see our{" "}
        <a href="/guides/beginner-longevity-supplement-stack">
          beginner longevity stack guide
        </a>{" "}
        for how to layer these together.
      </p>

      <InteractionGroup title="Ashwagandha pairings">
        <InteractionCard
          type="synergy"
          a="Ashwagandha"
          b="Magnesium Glycinate"
          effect="Complementary stress-reduction pathways — ashwagandha lowers cortisol, magnesium activates the parasympathetic nervous system and regulates GABA."
          recommendation="Take ashwagandha in the morning for daytime stress, magnesium glycinate in the evening for sleep."
        />
        <InteractionCard
          type="synergy"
          a="Ashwagandha"
          b="L-Theanine"
          effect="Both reduce stress and anxiety through different mechanisms. L-theanine promotes alpha brain waves while ashwagandha blunts cortisol."
          recommendation="Can be taken together. L-theanine works acutely (30–60 min), ashwagandha builds over weeks."
        />
      </InteractionGroup>

      <ProductRow
        title="Pair with your ashwagandha"
        products={[
          PRODUCTS["thorne-magnesium-bisglycinate"],
          PRODUCTS["nootropics-depot-l-theanine"],
          PRODUCTS["thorne-vitamin-d-5000"],
        ]}
      />

      <h2>Frequently Asked Questions</h2>

      <h3>Can ashwagandha cause weight gain?</h3>
      <p>
        Some people report increased appetite, which could lead to weight
        gain indirectly. The cortisol reduction may also normalize stress-related
        undereating in some people. In clinical trials, ashwagandha has been
        associated with modest increases in lean mass (via the Wankhede 2015
        study), but not fat gain. If you gain weight on ashwagandha, it&rsquo;s
        likely muscle tissue or simply eating more &mdash; not a direct
        pharmacological effect.
      </p>

      <h3>Does ashwagandha interact with antidepressants or anxiety medications?</h3>

      <Callout variant="warning" title="Medication interaction">
        Ashwagandha has GABAergic and serotonergic activity, meaning it could
        potentiate the effects of SSRIs, benzodiazepines, or other CNS-active
        medications. Discuss with your prescribing doctor before combining.
        Serotonin syndrome, while rare, is serious.
      </Callout>

      <p>
        Ashwagandha has GABAergic and serotonergic activity, meaning it could
        theoretically potentiate the effects of SSRIs, benzodiazepines, or
        other CNS-active medications. There are no well-documented dangerous
        interactions in the literature, but the theoretical risk is real enough
        that you should discuss it with your prescribing doctor before adding
        it. This is not a &ldquo;just be safe&rdquo; disclaimer &mdash;
        serotonin syndrome, while rare, is serious.
      </p>

      <h3>KSM-66 or Sensoril &mdash; which should I take?</h3>
      <p>
        For most people, <strong>KSM-66 at 600mg/day</strong> is the better
        starting point. It has more published trials, a broader evidence base
        (stress, performance, testosterone), and most people tolerate it well
        in the morning without drowsiness. Choose{" "}
        <strong>Sensoril at 125&ndash;250mg</strong> if your primary goal is
        sleep or anxiety and you want a more sedating effect. Some people use
        KSM-66 in the morning and Sensoril at night, though this approach
        hasn&rsquo;t been formally studied.
      </p>

      <h3>How long does ashwagandha take to work?</h3>
      <p>
        Most people notice changes in stress reactivity and sleep quality
        within 2&ndash;4 weeks. The cortisol and testosterone data in trials
        typically reaches statistical significance at the 8-week mark.
        Don&rsquo;t judge it after 3 days &mdash; this isn&rsquo;t caffeine.
        Give it a full 8&ndash;12 week trial before deciding whether it&rsquo;s
        working for you.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Ashwagandha is one of the better-studied herbal supplements available.
        The evidence for cortisol reduction and stress management is strong.
        The evidence for anxiety and sleep is solid. The evidence for
        testosterone and athletic performance is moderate but real. The key
        is choosing a standardized extract &mdash; KSM-66 or Sensoril &mdash;
        at the doses actually used in clinical research. Generic root powder
        is not the same thing, regardless of what the marketing says.
      </p>
      <p>
        Take it consistently, give it 8 weeks, cycle off periodically, and
        skip it entirely if you have autoimmune or thyroid issues. That&rsquo;s
        the evidence-based approach &mdash; no hype required.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog?q=ashwagandha">
          Browse ashwagandha supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
