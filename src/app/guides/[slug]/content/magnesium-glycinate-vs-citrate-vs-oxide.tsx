import {
  TLDRBox,
  Callout,
  ProductCallout,
  EvidenceBadge,
  IngredientLink,
  PRODUCTS,
} from "@/components/guide";

export function MagnesiumGlycinateVsCitrateVsOxide() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "Glycinate (bisglycinate) is the default for sleep, anxiety, and general deficiency — ~80% absorbed, no GI side effects",
          "Citrate is second-best absorbed (~50%) and causes loose stools, making it useful specifically for constipation",
          "Oxide is cheap but only ~4% absorbed — most of it passes through. Skip it unless you need a laxative",
          "Threonate is the only form that reliably crosses the blood-brain barrier and is the better pick for cognition-specific goals (but 3-5x the cost)",
          "Malate is better than oxide but less studied than the other three — worth considering for fatigue and fibromyalgia",
          "Label dose matters less than elemental magnesium — a 400 mg magnesium oxide tablet delivers ~16 mg absorbed; a 400 mg bisglycinate delivers ~320 mg",
        ]}
      />

      <p>
        The magnesium shelf is the single most confusing category in the
        supplement store. Every bottle says &ldquo;magnesium&rdquo; and
        every brand claims &ldquo;high absorption.&rdquo; The real
        differences between{" "}
        <IngredientLink id="magnesium" source="magnesium-glycinate-vs-citrate-vs-oxide">magnesium</IngredientLink>{" "}
        forms are measured, documented, and usually ignored by marketing
        copy. This guide compares the three most common forms head-to-head
        — glycinate, citrate, and oxide — and tells you which one is
        actually right for your goal.
      </p>

      <h2>The Short Version: Pick Your Form by Goal</h2>

      <p>
        Before the deep dive, here&rsquo;s the decision tree that fits
        90% of people:
      </p>

      <div className="not-prose my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-bold text-muted uppercase py-2 pr-3">Your goal</th>
              <th className="text-left text-xs font-bold text-muted uppercase py-2 px-3">Best form</th>
              <th className="text-left text-xs font-bold text-muted uppercase py-2 px-3">Dose</th>
              <th className="text-left text-xs font-bold text-muted uppercase py-2 pl-3">Why</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Sleep, anxiety, general deficiency", "Glycinate / Bisglycinate", "200–400 mg elemental", "~80% absorbed, calming glycine, zero GI upset"],
              ["Constipation", "Citrate", "200–400 mg elemental", "Osmotic laxative effect pulls water into colon"],
              ["Muscle cramps, exercise recovery", "Glycinate or Malate", "200–400 mg elemental", "Bioavailable + supports ATP production"],
              ["Memory, cognition, brain fog", "Threonate (L-threonate)", "1,500–2,000 mg compound", "Only form that reliably crosses the blood–brain barrier"],
              ["Cheap daily insurance", "Citrate", "200 mg elemental", "Better absorbed than oxide at similar price"],
              ["Heartburn / acid reflux", "Oxide (short-term)", "400 mg as antacid", "Works as an antacid — just not as a supplement"],
            ].map(([goal, form, dose, why]) => (
              <tr key={goal} className="border-b border-border/40">
                <td className="py-2 pr-3 text-text font-medium">{goal}</td>
                <td className="py-2 px-3 text-text">{form}</td>
                <td className="py-2 px-3 text-muted">{dose}</td>
                <td className="py-2 pl-3 text-muted">{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How to Read a Magnesium Label</h2>

      <p>
        Every comparison that follows depends on one concept: the
        difference between <strong>compound weight</strong> and{" "}
        <strong>elemental magnesium</strong>. The label &ldquo;400 mg
        magnesium oxide&rdquo; does not mean 400 mg of magnesium. It
        means 400 mg of the oxide compound, which is roughly 60%
        magnesium by weight — so ~240 mg elemental. Of that 240 mg,
        only ~4% gets absorbed. You end up with ~9.6 mg of actual
        magnesium in your blood.
      </p>

      <p>
        A similarly-labeled &ldquo;400 mg magnesium bisglycinate&rdquo; is
        only ~14% magnesium by weight (the rest is glycine), so the
        elemental dose is ~56 mg. But ~80% of that gets absorbed,
        giving you ~45 mg actual magnesium.
      </p>

      <Callout variant="tip" title="What to look for on the label">
        Most good supplement labels show <em>elemental magnesium</em> in
        parentheses — e.g., &ldquo;Magnesium Bisglycinate (200 mg elemental
        magnesium).&rdquo; If the label only shows the compound weight,
        you&rsquo;re probably looking at a low-quality brand doing
        regulatory minimum disclosure.
      </Callout>

      <h2>Magnesium Glycinate (Bisglycinate) — The Default Recommendation</h2>

      <p>
        Magnesium glycinate and magnesium bisglycinate are functionally
        the same compound — magnesium bound to two glycine amino acid
        molecules via chelation. The two names are often used
        interchangeably; Thorne, Pure Encapsulations, and most
        clinical-grade brands use them synonymously.
      </p>

      <p>
        <strong>Absorption:</strong> ~80% in most published trials, the
        highest of any common magnesium form. <EvidenceBadge level="strong" />{" "}
        Absorbed primarily in the small intestine via amino acid transporters,
        which means it bypasses the osmotic pathway that causes other
        forms (citrate, oxide) to draw water into the bowel.
      </p>

      <p>
        <strong>Bonus effect — glycine:</strong> The glycine attached to
        each magnesium atom isn&rsquo;t just a carrier. Glycine itself
        has sedative and anti-anxiety properties and is one of the few
        amino acids studied for improving sleep-onset latency. At the
        doses found in a 200 mg elemental magnesium bisglycinate pill,
        you&rsquo;re also getting roughly 1.2 g of glycine — enough to
        contribute meaningfully to the sedative effect. This is why
        bisglycinate feels more calming than a pure-elemental equivalent.
      </p>

      <p>
        <strong>Side effects:</strong> Essentially none at typical doses.
        Because absorption is complete at the small intestine, there&rsquo;s
        no osmotic laxative effect.
      </p>

      <p>
        <strong>Cost:</strong> Moderate. Thorne, Pure Encapsulations, and
        Designs for Health all sell high-quality versions at $15-30 per
        month.
      </p>

      <ProductCallout product={PRODUCTS["thorne-magnesium-bisglycinate"]} />

      <Callout variant="warning" title="Watch for hidden oxide blends">
        Some cheaper brands sell &ldquo;magnesium glycinate&rdquo; that&rsquo;s
        actually a blend — partially bisglycinate and partially oxide. The
        oxide portion is there to pad the label weight cheaply. Check the
        ingredient panel for &ldquo;magnesium oxide&rdquo; listed anywhere;
        if it&rsquo;s there, the claimed elemental dose is inflated.
      </Callout>

      <h2>Magnesium Citrate — The Middle Ground (and Laxative)</h2>

      <p>
        Magnesium citrate is magnesium bound to citric acid. It&rsquo;s
        the most commonly sold form globally because it&rsquo;s
        significantly better absorbed than oxide but much cheaper to
        manufacture than bisglycinate.
      </p>

      <p>
        <strong>Absorption:</strong> ~40-50% in studies. Notably better
        than oxide, notably worse than bisglycinate.{" "}
        <EvidenceBadge level="strong" />
      </p>

      <p>
        <strong>Main feature — laxative effect:</strong> Citrate is an
        osmotic laxative. It draws water into the colon and produces
        loose stools within a few hours at doses ≥300 mg elemental
        magnesium. This is why pharmacy-strength magnesium citrate is
        sold as a bowel prep drink before colonoscopy. At everyday
        supplement doses (200-300 mg), most users get a mild stool-softening
        effect rather than full diarrhea.
      </p>

      <p>
        <strong>When to pick citrate over bisglycinate:</strong>
      </p>
      <ul>
        <li>You have chronic constipation and the laxative effect is a feature, not a bug</li>
        <li>You&rsquo;re on a tight budget — citrate is ~30% cheaper than bisglycinate per mg elemental magnesium</li>
        <li>You want a slightly more acidic digestive environment (rare, but useful for some low-stomach-acid users)</li>
      </ul>

      <p>
        <strong>When to avoid citrate:</strong> Anyone with IBS-D, loose
        stools, or sensitive digestion should skip this form. The
        laxative effect is dose-dependent but hard to titrate precisely.
      </p>

      <h2>Magnesium Oxide — The One to Skip</h2>

      <p>
        Magnesium oxide is what you find in 95% of drugstore &ldquo;magnesium&rdquo;
        bottles and most generic multivitamins. It&rsquo;s the cheapest
        form by a wide margin — often 10x cheaper per gram than chelated
        forms — which is exactly why it dominates low-end shelves.
      </p>

      <p>
        <strong>Absorption:</strong> ~4% in published trials.{" "}
        <EvidenceBadge level="strong" /> The other 96% passes through the
        digestive tract unabsorbed, where it can cause loose stools at
        high doses (magnesium oxide is actually the active ingredient in
        Milk of Magnesia laxative).
      </p>

      <p>
        <strong>The math:</strong> A 500 mg magnesium oxide tablet (which
        contains ~300 mg elemental magnesium) delivers approximately 12
        mg of actually-absorbed magnesium. That&rsquo;s less than what
        you&rsquo;d get from a handful of spinach. Compare to 200 mg
        elemental magnesium bisglycinate which delivers ~160 mg absorbed —
        13x more, from a pill with less raw material.
      </p>

      <p>
        <strong>Legitimate use case:</strong> Occasional antacid. Magnesium
        oxide is a real antacid — it neutralizes stomach acid effectively.
        If you need short-term heartburn relief and don&rsquo;t want
        aluminum-based antacids, magnesium oxide works for the job. Just
        don&rsquo;t buy it as a supplement.
      </p>

      <Callout variant="warning" title="The cheap-multivitamin trap">
        Many popular drugstore multivitamins claim &ldquo;50 mg of
        magnesium&rdquo; in their formulas. That&rsquo;s almost always
        magnesium oxide, delivering ~2 mg absorbed per dose — negligible
        toward your RDA of 310-420 mg. This is one of the single clearest
        reasons to look at ingredient forms, not just label weights, when
        comparing supplements.
      </Callout>

      <h2>Absorption and Elemental Dose — Side-by-Side</h2>

      <div className="not-prose my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-bold text-muted uppercase py-2 pr-3">Form</th>
              <th className="text-left text-xs font-bold text-muted uppercase py-2 px-3">% magnesium by weight</th>
              <th className="text-left text-xs font-bold text-muted uppercase py-2 px-3">% absorbed</th>
              <th className="text-left text-xs font-bold text-muted uppercase py-2 pl-3">Effective dose from 500 mg pill</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Bisglycinate", "~14%", "~80%", "~56 mg absorbed"],
              ["Citrate", "~16%", "~40–50%", "~36 mg absorbed"],
              ["Oxide", "~60%", "~4%", "~12 mg absorbed"],
              ["Malate", "~11%", "~60%", "~33 mg absorbed"],
              ["Threonate", "~8%", "~70% (brain-targeted)", "~28 mg absorbed, reaches CNS"],
            ].map(([form, pct, absorbed, effective]) => (
              <tr key={form} className="border-b border-border/40">
                <td className="py-2 pr-3 text-text font-medium">{form}</td>
                <td className="py-2 px-3 text-muted">{pct}</td>
                <td className="py-2 px-3 text-muted">{absorbed}</td>
                <td className="py-2 pl-3 text-muted">{effective}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Bisglycinate&rsquo;s per-pill yield looks &ldquo;only&rdquo;
        slightly better than citrate in raw numbers, but remember: the
        citrate pill comes with a laxative side effect. Bisglycinate
        delivers more absorbed magnesium with no GI penalty.
      </p>

      <h2>What About Threonate, Malate, and Taurate?</h2>

      <p>
        <strong>Magnesium L-Threonate (Magtein):</strong> The only form
        shown in human trials to significantly raise brain magnesium
        levels. Studied for age-related cognitive decline with modest
        effect sizes. <EvidenceBadge level="moderate" /> At 3-5x the cost
        of bisglycinate and requiring 2,000+ mg compound dose for 144 mg
        elemental, it&rsquo;s specialty — not a first-line recommendation
        unless cognition is specifically your goal.
      </p>

      <p>
        <strong>Magnesium Malate:</strong> Magnesium bound to malic acid,
        an intermediate in the ATP energy cycle. Claimed to help with
        fibromyalgia and chronic fatigue. Evidence is sparser than the
        three main forms but absorption is decent (~60%). Reasonable
        alternative to bisglycinate if energy is your specific goal.
      </p>

      <p>
        <strong>Magnesium Taurate:</strong> Magnesium bound to taurine.
        Taurine itself has cardiovascular benefits, so this form is often
        marketed for heart health. Absorption is good but clinical data
        on the combined compound is thin — for heart health, the
        underlying evidence supports magnesium (any well-absorbed form) +
        taurine separately rather than this specific combination.
      </p>

      <h2>How Much Should I Actually Take?</h2>

      <p>
        The RDA is 310-420 mg elemental magnesium daily for adults. Food
        provides some — leafy greens, nuts, seeds, dark chocolate — but
        modern diets fall short for roughly half the US population.
      </p>

      <p>
        <strong>Maintenance dose:</strong> 200-400 mg elemental magnesium
        bisglycinate daily. Split across morning and evening if over
        300 mg, or take the whole dose 30-60 minutes before bed for sleep
        benefits.
      </p>

      <p>
        <strong>Therapeutic dose (documented deficiency, muscle cramps, migraines):</strong>{" "}
        400-600 mg elemental daily, usually split across 2-3 doses.
        Upper Tolerable Intake from supplements (not food) is 350 mg in
        the US — that&rsquo;s a GI-tolerance limit, not a toxicity
        threshold. Exceeding it often causes loose stools.
      </p>

      <Callout variant="warning" title="Kidney considerations">
        Your kidneys clear excess magnesium. Anyone with chronic kidney
        disease, stage 3+ CKD, or on dialysis should consult their
        nephrologist before magnesium supplementation — the safety margin
        is much tighter when clearance is impaired.
      </Callout>

      <h2>When to Take Magnesium</h2>

      <p>
        Timing matters less than consistency, but there are nuances:
      </p>

      <p>
        <strong>Evening:</strong> Bisglycinate specifically benefits from
        evening dosing — the glycine component enhances sleep quality.
        This is the default recommendation for most users.
      </p>

      <p>
        <strong>Morning:</strong> If you get any drowsiness from evening
        doses (rare), shift to morning. Threonate is often recommended
        in the morning for cognitive benefit during waking hours.
      </p>

      <p>
        <strong>With or without food:</strong> Bisglycinate absorbs well
        either way. Citrate and oxide are better tolerated with food,
        which slows gastric emptying and reduces the laxative spike.
        See our <a href="/guides/best-time-to-take-magnesium">best time to take magnesium</a>{" "}
        guide for the full breakdown.
      </p>

      <h2>Interactions Worth Knowing</h2>

      <p>
        Magnesium interacts with several common medications:
      </p>
      <ul>
        <li><strong>Antibiotics (tetracyclines, quinolones):</strong> Magnesium binds to these and blocks absorption. Separate by 4-6 hours.</li>
        <li><strong>Bisphosphonates (osteoporosis drugs):</strong> Same issue — separate doses by 2+ hours.</li>
        <li><strong>Levothyroxine (thyroid):</strong> Magnesium reduces T4 absorption. Take magnesium at least 4 hours after your morning levothyroxine.</li>
        <li><strong>Diuretics:</strong> Loop and thiazide diuretics deplete magnesium; you may need more. Potassium-sparing diuretics can cause retention.</li>
      </ul>

      <p>
        Check any stack with Formulate&rsquo;s free{" "}
        <a href="/interactions">interaction checker</a> before combining
        magnesium with prescription medications.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Is magnesium glycinate the same as magnesium bisglycinate?</h3>
      <p>
        Functionally yes. Bisglycinate specifically means two glycine
        molecules per magnesium atom, which is the standard chelation
        ratio. Most products labeled &ldquo;glycinate&rdquo; are actually
        bisglycinate. True mono-glycinate (one glycine per magnesium) is
        rare and not commonly sold.
      </p>

      <h3>Can I take magnesium glycinate with food?</h3>
      <p>
        Yes. Bisglycinate absorbs well regardless of food. Taking with
        meals doesn&rsquo;t hurt absorption and can improve comfort if
        you have a sensitive stomach.
      </p>

      <h3>Why do I feel sleepy from magnesium?</h3>
      <p>
        Bisglycinate in particular combines magnesium (which relaxes smooth
        muscle and downregulates the HPA stress axis) with glycine (an
        inhibitory neurotransmitter). Both contribute to sedation. If
        you&rsquo;re sensitive, this is a feature — most users take it
        before bed. If it&rsquo;s unwanted, switch to citrate or malate.
      </p>

      <h3>Does magnesium really help with sleep and anxiety?</h3>
      <p>
        Moderate evidence — multiple randomized trials show improvement
        in subjective sleep quality scores and mild-to-moderate anxiety,
        especially in deficient individuals. Effect size is modest but
        consistent. <EvidenceBadge level="moderate" /> See our{" "}
        <a href="/guides/magnesium-for-anxiety">magnesium for anxiety</a> guide.
      </p>

      <h3>Can I take too much magnesium?</h3>
      <p>
        From food, essentially no — healthy kidneys excrete excess. From
        supplements, the 350 mg/day UL is a GI-tolerance guideline; most
        people can handle more in practice. Signs of overdose include
        diarrhea, nausea, weakness, and very high doses can cause
        arrhythmia. Kidney disease changes all these thresholds — check
        with a clinician.
      </p>

      <h2>Bottom Line</h2>

      <p>
        If you&rsquo;re starting magnesium today with no specific goal,
        buy{" "}
        <IngredientLink id="magnesium" source="magnesium-glycinate-vs-citrate-vs-oxide">magnesium</IngredientLink>{" "}
        bisglycinate at 200-400 mg elemental, take it before bed, and
        stop reading about forms. You&rsquo;ve picked the one with the
        best absorption, the fewest side effects, and the widest clinical
        evidence.
      </p>

      <p>
        Save oxide for the antacid shelf. Reach for citrate if constipation
        is your primary issue. Save threonate for cognition-specific needs
        where the 3-5x price is justified. Everything else is edge-case.
      </p>
    </>
  );
}
