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

export function BestMagnesium() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "Choose by form, not brand — glycinate for sleep, threonate for cognition, citrate for budget",
          "Magnesium oxide (4% absorption) is a waste of money — glycinate absorbs at ~80%",
          "Always check elemental magnesium per serving, not compound weight",
          "50% of adults are below optimal intake — a 100–200mg supplement covers the gap",
        ]}
      />

      <p>
        You take magnesium for sleep, but you&rsquo;re wired at midnight. Your
        friend takes magnesium for sleep and is out cold by 10pm. Same mineral,
        completely different results. The difference? The <em>form</em> of
        magnesium on that label. And this is where most magnesium guides fail you
        &mdash; they rank products when they should be teaching you which of the
        dozen forms actually does what you need.
      </p>

      <h2>Why the Form of Magnesium Matters More Than the Brand</h2>
      <p>
        Magnesium is involved in over 300 enzymatic reactions in your body &mdash;
        sleep, muscle contraction, blood pressure regulation, nerve signaling, DNA
        synthesis. An estimated 50% of Americans don&rsquo;t meet the RDA
        (Rosanoff et al., 2012, <em>Nutrition Reviews</em>). <EvidenceBadge level="strong" /> But &ldquo;take
        magnesium&rdquo; is incomplete advice because the form you choose
        determines where it goes and what it does.
      </p>

      <Callout variant="evidence" title="Absorption varies 20x across forms">
        Magnesium oxide absorbs at roughly 4%. Magnesium glycinate absorbs at
        closer to 80%. You could take the same number of milligrams and get 20x
        more usable magnesium from one form versus the other. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        If you&rsquo;re not sure whether you&rsquo;re deficient in the first
        place,{" "}
        <a href="/guides/signs-you-are-magnesium-deficient">
          check our guide on signs of magnesium deficiency
        </a>{" "}
        before buying anything.
      </p>

      <h2>Match the Form to Your Goal</h2>
      <p>
        This is the decision that actually matters. Pick the form first, then find
        a quality product in that form.
      </p>

      <h3>Magnesium Glycinate (Bisglycinate) &mdash; Best for Sleep and Anxiety</h3>
      <p>
        Glycinate is magnesium bound to glycine, an amino acid that itself has
        calming, inhibitory effects on the nervous system. A 2012 study in the{" "}
        <em>Journal of Research in Medical Sciences</em> (Abbasi et al.) found
        magnesium supplementation significantly improved subjective sleep quality,
        sleep time, and sleep onset latency in elderly subjects. <EvidenceBadge level="strong" /> The glycinate form
        is gentle on the stomach &mdash; no laxative effect &mdash; making it the
        best all-around choice for most people.
      </p>

      <Callout variant="tip" title="Default recommendation">
        If you want better sleep, deal with anxiety, or just need to cover a
        general magnesium gap, glycinate is the default choice. Start here
        unless you have a specific cognitive or cardiovascular goal.
      </Callout>

      <ProductCallout product={PRODUCTS["thorne-magnesium-bisglycinate"]} />

      <h3>Magnesium L-Threonate &mdash; Best for Cognitive Function</h3>
      <p>
        Threonate is the only form shown to meaningfully cross the blood-brain
        barrier and increase brain magnesium levels. The key study (Slutsky et al.,
        2010, <em>Neuron</em>) demonstrated improved learning, working memory, and
        both short- and long-term memory in animal models. <EvidenceBadge level="moderate" /> Subsequent human trials
        using the patented Magtein&reg; form (Liu et al., 2016,{" "}
        <em>Journal of Alzheimer&rsquo;s Disease</em>) showed improved cognitive
        ability in older adults with cognitive concerns. <EvidenceBadge level="moderate" />
      </p>
      <p>
        <strong>Take this if:</strong> Brain fog, memory support, or neuroprotection
        is your primary goal. Note that threonate delivers less elemental magnesium
        per capsule, so it&rsquo;s not the most efficient way to fix a general
        magnesium deficit.
      </p>

      <h3>Magnesium Citrate &mdash; Best Budget Option</h3>
      <p>
        Citrate offers good absorption, wide availability, and a lower price point
        than glycinate or threonate. The trade-off: it has a mild laxative effect at
        higher doses. For some people that&rsquo;s a feature (hello, regularity).
        For others, it&rsquo;s a reason to choose glycinate instead.
      </p>
      <p>
        <strong>Take this if:</strong> You&rsquo;re price-sensitive and don&rsquo;t
        have a specific sleep or cognitive goal, or you could use some help with
        regularity.
      </p>

      <ProductCallout product={PRODUCTS["thorne-magnesium-citramate"]} />

      <h3>Magnesium Taurate &mdash; Best for Cardiovascular Support</h3>
      <p>
        Combines magnesium with taurine, which has independent cardiovascular
        benefits. A 2018 meta-analysis by Zhang et al. in{" "}
        <em>Hypertension Research</em> found magnesium supplementation reduced
        systolic blood pressure by 2&ndash;3 mmHg. <EvidenceBadge level="moderate" /> Taurate is the form with the
        most emerging evidence for blood pressure and heart rhythm support.
      </p>
      <p>
        <strong>Take this if:</strong> You&rsquo;re specifically interested in
        cardiovascular health or have been advised to support healthy blood pressure.
      </p>

      <h3>Magnesium Oxide &mdash; Skip It</h3>

      <Callout variant="warning" title="Avoid magnesium oxide">
        Magnesium oxide has roughly 4% bioavailability (Firoz and Graber, 2001,{" "}
        <em>Magnesium Research</em>). It&rsquo;s the cheapest form on the shelf
        because most of it passes straight through you. If you see magnesium oxide
        as the primary form in a product, put it back. The only exception is if
        you specifically want a laxative effect. <EvidenceBadge level="strong" />
      </Callout>

      <h2>The Elemental Magnesium Trap</h2>

      <Callout variant="warning" title="Don't be fooled by compound weight">
        When a label says &ldquo;Magnesium Glycinate &mdash; 1,000mg,&rdquo;
        that&rsquo;s the weight of the entire compound (magnesium + glycine). The
        actual elemental magnesium might only be 100&ndash;140mg. Good brands list
        both. Shady brands only list the compound weight to make the dose look bigger.
      </Callout>

      <p>
        The elemental number is what your body uses, and it&rsquo;s what the RDA
        refers to. If you&rsquo;re not sure how to decode the label,{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          our supplement label reading guide
        </a>{" "}
        walks through exactly what to look for.
      </p>

      <h2>How Much Do You Actually Need?</h2>
      <p>
        The RDA is 400&ndash;420mg/day for men and 310&ndash;320mg/day for women
        (elemental magnesium). Most people get 250&ndash;300mg from food
        (leafy greens, nuts, seeds, whole grains). That means a supplement
        providing 100&ndash;200mg of elemental magnesium typically covers the gap
        without risk of excess. There&rsquo;s no need to megadose.
      </p>

      <InteractionGroup title="Magnesium interactions to know">
        <InteractionCard
          type="conflict"
          a="Magnesium"
          b="Antibiotics"
          effect="Magnesium binds to tetracyclines and quinolones, reducing absorption of both."
          recommendation="Separate magnesium from antibiotics by at least 2 hours."
        />
        <InteractionCard
          type="conflict"
          a="Calcium (500mg+)"
          b="Magnesium"
          effect="At high doses, calcium and magnesium compete for absorption."
          recommendation="Separate therapeutic doses. Take calcium and magnesium at different times of day."
        />
        <InteractionCard
          type="synergy"
          a="Magnesium"
          b="Vitamin B6"
          effect="B6 may facilitate magnesium transport into cells. A 2018 PLOS ONE study found the combo more effective for stress."
          recommendation="Many quality magnesium products include B6 for this reason."
        />
      </InteractionGroup>

      <h2>Brands That Do It Right</h2>
      <p>
        Instead of a numbered ranking, here are brands that consistently deliver on
        the criteria above &mdash; appropriate forms, transparent elemental dosing,
        third-party testing.
      </p>
      <p>
        <strong>Thorne Magnesium Bisglycinate</strong> is the go-to glycinate
        option. NSF Certified for Sport, clean label, no fillers. If you want
        glycinate and don&rsquo;t want to overthink it, start here.
      </p>
      <p>
        <strong>Nootropics Depot Magnesium Glycinate</strong> is another strong
        glycinate option at a competitive price point, with rigorous in-house
        testing and full label transparency.
      </p>

      <ProductRow
        title="Top-scored magnesium supplements"
        products={[
          PRODUCTS["thorne-magnesium-bisglycinate"],
          PRODUCTS["nootropics-depot-magnesium-glycinate"],
          PRODUCTS["thorne-magnesium-citramate"],
        ]}
      />

      <p>
        <strong>Nootropics Depot Magnesium L-Threonate (Magtein&reg;)</strong> is
        the cognitive-focused pick. They use the patented Magtein ingredient at
        the studied dose, with full transparency on sourcing. Higher price per
        serving, but that&rsquo;s inherent to the threonate form.
      </p>
      <p>
        <strong>Life Extension Magnesium Citrate</strong> offers solid citrate at a
        reasonable price with third-party testing. Good budget-friendly option for
        general supplementation.
      </p>
      <p>
        <strong>Momentous Magnesium Threonate</strong> is another strong
        Magtein-based option with excellent manufacturing transparency and Informed
        Sport certification.
      </p>

      <h2>When to Take Magnesium</h2>
      <p>
        Timing depends on why you&rsquo;re taking it:
      </p>
      <ul>
        <li>
          <strong>For sleep:</strong> Take glycinate or threonate 30&ndash;60 minutes
          before bed. This is one supplement where timing genuinely matters.
        </li>
        <li>
          <strong>For general health:</strong> Take with food to improve absorption
          and reduce any GI effects. Morning or evening, doesn&rsquo;t matter.
        </li>
        <li>
          <strong>Splitting doses:</strong> If you&rsquo;re taking more than 200mg
          elemental magnesium, split it into two doses. Your body absorbs smaller
          amounts more efficiently.
        </li>
      </ul>
      <p>
        For a full breakdown of how to time all your supplements together, see{" "}
        <a href="/guides/supplement-timing-guide">our supplement timing guide</a>.
        If you&rsquo;re building a broader sleep protocol,{" "}
        <a href="/guides/best-sleep-supplement-protocol">
          our sleep supplement guide
        </a>{" "}
        covers how magnesium fits alongside other sleep-supporting nutrients.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Can you take too much magnesium?</h3>
      <p>
        The tolerable upper intake level for supplemental magnesium is 350mg/day of
        elemental magnesium (this doesn&rsquo;t include magnesium from food). Going
        above this won&rsquo;t cause serious harm in most people, but you may
        experience loose stools, especially with citrate or oxide forms. Glycinate
        is the most GI-friendly at higher doses.
      </p>

      <h3>Should I take magnesium glycinate or threonate?</h3>
      <p>
        Glycinate if your primary goal is sleep, anxiety reduction, or covering a
        general deficiency. Threonate if you specifically want cognitive benefits.
        Some people take both &mdash; glycinate at night for sleep, threonate in the
        morning for focus. Just watch your total elemental magnesium intake.
      </p>

      <h3>Why is magnesium threonate so expensive?</h3>
      <p>
        Two reasons: the patented Magtein&reg; ingredient carries licensing costs,
        and the form delivers less elemental magnesium per gram of compound, so you
        need more capsules to get a meaningful dose. It&rsquo;s not overpriced
        &mdash; it&rsquo;s genuinely more expensive to produce. Whether the
        cognitive benefits justify the premium depends on your priorities.
      </p>

      <h3>Does magnesium interact with any medications?</h3>
      <p>
        Yes. Magnesium can interact with antibiotics (tetracyclines, quinolones),
        bisphosphonates, and some blood pressure medications. If you&rsquo;re on
        prescription medications, check with your doctor or pharmacist before
        starting magnesium supplementation. Separate magnesium from antibiotics by
        at least 2 hours.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Stop choosing magnesium by brand and start choosing by form. Glycinate for
        sleep and general use. Threonate for your brain. Citrate if budget matters.
        Skip oxide entirely. Always check the <em>elemental</em> magnesium per
        serving, not the compound weight. And if you&rsquo;re not sure whether you
        need magnesium at all, a simple RBC magnesium blood test is more useful
        than guessing.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog?q=magnesium">
          Browse magnesium supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
