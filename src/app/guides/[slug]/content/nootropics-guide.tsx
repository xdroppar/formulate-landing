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

export function NootropicsGuide() {
  return (
    <>
      <TLDRBox
        readTime="11 min read"
        takeaways={[
          "Caffeine + L-theanine is the most evidence-backed nootropic stack — simple, cheap, effective",
          "Creatine improves short-term memory and reasoning under stress, not just muscle performance",
          "Bacopa and lion's mane need 8–12 weeks of daily use before cognitive benefits emerge",
          "If a product uses a proprietary blend or promises \"10x focus,\" it's selling hype, not science",
        ]}
      />

      <p>
        Nootropics are compounds that enhance cognition without significant
        side effects &mdash; a term coined in 1972 by Romanian psychologist
        Corneliu Giurgea with a conservative, specific definition. Today
        the category has been stretched to cover everything from caffeine to
        prescription stimulants to unregulated research chemicals, making it
        nearly impossible to navigate without tiering substances by the
        strength of their human evidence.
      </p>

      <h2>The Foundation You Can&rsquo;t Supplement Around</h2>

      <Callout variant="warning" title="No nootropic compensates for poor fundamentals">
        No supplement will reverse the cognitive cost of poor sleep, no
        exercise, chronic stress, or a bad diet. These are the primary
        drivers of cognitive performance, and the research isn&rsquo;t close.
      </Callout>

      <p>
        A 2017 meta-analysis in <em>Sleep Medicine Reviews</em> (Lowe et
        al.) found that even one night of partial sleep restriction
        reduced working memory, attention, and processing speed by{" "}
        <strong>15&ndash;25%</strong>. <EvidenceBadge level="strong" /> No supplement reverses that. Regular
        aerobic exercise increases BDNF (brain-derived neurotrophic factor)
        more reliably than any nootropic studied to date (Szuhany et al.,
        2015, <em>Journal of Psychiatric Research</em>). <EvidenceBadge level="strong" />
      </p>
      <p>
        Think of nootropics as the last 5&ndash;10% of cognitive
        optimization. If sleep, exercise, nutrition, and stress management
        are the engine, nootropics are the fuel additive. Useful, but only
        once the engine is running properly.
      </p>

      <h2>Tier 1: Strong Human Evidence</h2>
      <p>
        These compounds have robust, replicated data from randomized
        controlled trials in healthy humans. They work. They&rsquo;re safe.
        Start here.
      </p>

      <h3>Caffeine + L-Theanine (The Original Nootropic Stack)</h3>
      <p>
        If you drink coffee, you&rsquo;re already using the world&rsquo;s
        most popular nootropic. Caffeine blocks adenosine receptors,
        reducing the perception of fatigue and increasing alertness. That
        much is obvious. What&rsquo;s less obvious is that caffeine alone
        tends to increase anxiety, jitteriness, and an unfocused &ldquo;wired&rdquo;
        feeling &mdash; especially at higher doses.
      </p>

      <Callout variant="evidence" title="The caffeine + L-theanine combo">
        A landmark 2008 study by Owen et al. in <em>Nutritional
        Neuroscience</em> showed that 100mg caffeine + 200mg L-theanine
        improved both accuracy and speed on attention-switching tasks
        compared to either compound alone. <EvidenceBadge level="strong" /> Subsequent studies
        (Haskell et al., 2008, <em>Biological Psychology</em>) confirmed
        improved attention and task-switching with the combo.
      </Callout>

      <p>
        L-theanine, an amino acid found naturally in tea leaves, preserves
        caffeine&rsquo;s alertness benefits while smoothing out the anxiety
        and jitteriness.
      </p>

      <Callout variant="tip" title="Dosing">
        100&ndash;200mg caffeine with 200mg L-theanine. The classic ratio
        is 1:2 (caffeine:theanine). Take in the morning or early
        afternoon &mdash; caffeine&rsquo;s half-life of 5&ndash;6 hours
        means afternoon dosing disrupts sleep in most people. If you
        already drink coffee, simply add an L-theanine capsule alongside it.
      </Callout>

      <InteractionGroup title="Caffeine + L-Theanine synergy">
        <InteractionCard
          type="synergy"
          a="Caffeine"
          b="L-Theanine"
          effect="L-theanine promotes alpha brain wave activity, counteracting caffeine's tendency to increase anxiety and jitteriness while preserving alertness."
          recommendation="Use a 1:2 ratio (100mg caffeine : 200mg L-theanine). Add L-theanine to your existing coffee habit."
        />
      </InteractionGroup>

      <ProductCallout product={PRODUCTS["nootropics-depot-l-theanine"]} />

      <h3>Creatine (Not Just for Muscles)</h3>
      <p>
        Most people associate creatine with gym bros and bicep curls. Fair
        enough &mdash; it&rsquo;s the most evidence-backed sports
        supplement in existence. But creatine is fundamentally an energy
        molecule, and your brain uses a surprising amount of energy &mdash;
        roughly <strong>20% of your total metabolic output</strong> despite
        being 2% of your body weight. The brain relies on
        phosphocreatine to buffer ATP during periods of high demand, which
        is exactly why cognitive benefits emerge under stress.
      </p>

      <Callout variant="evidence" title="Creatine and cognition">
        A 2018 systematic review by Avgerinos et al. in <em>Experimental
        Gerontology</em> analyzed six RCTs and found that creatine
        supplementation significantly improved short-term memory and
        reasoning, with the strongest effects under sleep deprivation and
        mental fatigue. <EvidenceBadge level="strong" studiesId="creatine-avgerinos-cognitive-2018" /> A 2003 study by Rae et al. showed
        creatine improved working memory and processing speed in
        vegetarians &mdash; who have lower baseline creatine stores.
        <EvidenceBadge level="moderate" />
      </Callout>

      <p>
        <strong>Dose:</strong> 3&ndash;5g <a href="/guides/best-creatine-supplements">creatine monohydrate</a> daily. No
        loading phase necessary for cognitive benefits &mdash; it
        saturates brain stores over 4&ndash;8 weeks of consistent use.
        Vegetarians and vegans may see the most pronounced cognitive
        effects. Creatine monohydrate is the only form with strong
        evidence; skip the fancy variants.
      </p>

      <ProductRow
        title="Top-scored creatine"
        products={[
          PRODUCTS["thorne-creatine"],
          PRODUCTS["nootropics-depot-creatine"],
        ]}
      />

      <h3>Omega-3 DHA (Structural Brain Support)</h3>
      <p>
        DHA (docosahexaenoic acid) isn&rsquo;t a fast-acting focus pill.
        It&rsquo;s a structural component of your brain &mdash; DHA
        comprises roughly <strong>40% of the polyunsaturated fatty acids in
        the cerebral cortex</strong>. Low DHA status is consistently
        associated with accelerated cognitive decline, and supplementation
        appears most beneficial for people with low baseline intake (i.e.,
        those who don&rsquo;t eat fatty fish regularly).
      </p>

      <Callout variant="evidence" title="MIDAS trial">
        A 2012 study by Yurko-Mauro et al. in <em>Alzheimer&rsquo;s &amp;
        Dementia</em> found that 900mg DHA daily for 24 weeks significantly
        improved episodic memory in healthy older adults with mild memory
        complaints. <EvidenceBadge level="strong" /> The benefits aren&rsquo;t dramatic on a
        day-to-day basis, but the trajectory of cognitive preservation over
        time is what matters with DHA.
      </Callout>

      <p>
        <strong>Dose:</strong> 1&ndash;2g combined EPA/DHA daily, with at
        least 500mg from DHA specifically. Take with a fat-containing meal
        for absorption. This is a long-game supplement &mdash; think months
        and years, not days.
      </p>

      <ProductCallout product={PRODUCTS["thorne-super-epa-pro"]} />

      <h2>Tier 2: Moderate Evidence (Worth Considering)</h2>
      <p>
        These have promising human trial data but either fewer replication
        studies, smaller sample sizes, or effects that take weeks to
        manifest. They&rsquo;re reasonable additions after you&rsquo;ve
        established a Tier 1 foundation.
      </p>

      <h3>Lion&rsquo;s Mane (Hericium erinaceus)</h3>
      <p>
        Lion&rsquo;s mane stands out in the mushroom-supplement world
        because it has a plausible and well-studied mechanism: it
        stimulates production of <strong>nerve growth factor (NGF)</strong>,
        a protein critical for neuron maintenance and growth. Mori et al.
        (2009, <em>Phytotherapy Research</em>) conducted a double-blind,
        placebo-controlled trial showing that 3g/day of lion&rsquo;s mane
        for 16 weeks significantly improved cognitive function scores in
        older adults with mild cognitive impairment. <EvidenceBadge level="moderate" /> Benefits disappeared
        four weeks after stopping supplementation, suggesting an ongoing
        mechanism rather than a permanent structural change.
      </p>

      <Callout variant="tip" title="Lion's mane dosing">
        500&ndash;3,000mg daily of a fruiting body extract standardized for
        beta-glucans and hericenones. Mycelium-on-grain products are
        typically lower potency. We cover this in depth in our{" "}
        <a href="/guides/lions-mane-guide">
          complete lion&rsquo;s mane guide
        </a>.
      </Callout>

      <h3>Bacopa Monnieri</h3>
      <p>
        Bacopa is an Ayurvedic herb with genuinely interesting memory data.
        A 2014 meta-analysis by Kongkeaw et al. in the{" "}
        <em>Journal of Ethnopharmacology</em> pooled nine RCTs and
        concluded that bacopa significantly improved{" "}
        <strong>attention, cognitive processing speed, and working
        memory</strong> in healthy subjects. <EvidenceBadge level="moderate" /> The catch? Effects typically
        require <strong>8&ndash;12 weeks</strong> of consistent use to
        emerge. This isn&rsquo;t a take-it-and-feel-it supplement &mdash;
        it&rsquo;s a slow-building cognitive support.
      </p>
      <p>
        The proposed mechanism involves modulation of acetylcholine,
        serotonin, and dopamine, along with antioxidant activity in the
        hippocampus. Stough et al. (2001, <em>Psychopharmacology</em>)
        found that 300mg of a standardized extract (KeenMind&reg;, 55%
        bacosides) improved the speed of visual information processing,
        learning rate, and memory consolidation in healthy adults over 12
        weeks. <EvidenceBadge level="moderate" />
      </p>
      <p>
        <strong>Dose:</strong> 300&ndash;600mg daily of an extract
        standardized to 50%+ bacosides. Take with a fat-containing meal
        (bacosides are fat-soluble). Common side effect: mild GI discomfort,
        which usually resolves by taking it with food. Some people report
        mild lethargy, so evening dosing may work better initially.
      </p>

      <h3>Alpha-GPC</h3>
      <p>
        Alpha-GPC (alpha-glycerophosphocholine) is a choline source that
        crosses the blood-brain barrier efficiently and serves as a
        precursor to acetylcholine &mdash; the neurotransmitter most
        directly associated with learning, memory, and attention. It&rsquo;s
        also the form used in most clinical research on choline and
        cognition.
      </p>
      <p>
        A 2003 clinical trial by De Jesus Moreno Moreno in{" "}
        <em>Clinical Therapeutics</em> found that 1,200mg/day of alpha-GPC
        improved cognitive scores in patients with mild to moderate
        Alzheimer&rsquo;s dementia over 180 days. <EvidenceBadge level="moderate" /> In healthy adults, the
        evidence is thinner but directionally positive, particularly for
        people with low dietary choline intake (eggs and liver are the
        primary food sources, and many people under-consume both).
      </p>
      <p>
        <strong>Dose:</strong> 300&ndash;600mg daily. Higher doses
        (1,200mg) are used in clinical settings for cognitive decline.
        Alpha-GPC is hygroscopic (absorbs moisture), so store it sealed
        and in a cool place.
      </p>

      <InteractionGroup title="Cholinergic stacking caution">
        <InteractionCard
          type="conflict"
          a="Alpha-GPC"
          b="Other cholinergics (e.g. CDP-Choline)"
          effect="Stacking multiple cholinergic compounds can cause excess acetylcholine — headache, jaw tension, brain fog."
          recommendation="Pick one choline source. Add one new compound at a time and run it for 2–4 weeks before stacking."
        />
      </InteractionGroup>

      <h2>Tier 3: Emerging or Mixed Evidence</h2>
      <p>
        These appear frequently in nootropic discussions but have
        significant caveats &mdash; limited human data, regulatory
        restrictions, or effect sizes that don&rsquo;t clearly justify the
        cost and risk.
      </p>

      <h3>Racetams (Piracetam, Aniracetam, Phenylpiracetam)</h3>
      <p>
        Piracetam is technically the original nootropic &mdash; it&rsquo;s
        the compound Giurgea coined the term for in 1972. The racetam
        family modulates glutamate and acetylcholine signaling, and there
        is <em>some</em> evidence for cognitive benefits in elderly
        populations with cognitive decline (Waegemans et al., 2002,{" "}
        <em>Dementia and Geriatric Cognitive Disorders</em>). <EvidenceBadge level="emerging" /> However,
        evidence in healthy young adults is weak and inconsistent.
        Racetams are prescription medications in many European countries
        and exist in a regulatory gray zone in the US &mdash; not
        FDA-approved, not clearly a dietary supplement. If you&rsquo;re
        considering them, understand that you&rsquo;re in
        self-experimentation territory.
      </p>

      <h3>Modafinil</h3>

      <Callout variant="warning" title="This is a prescription drug, not a supplement">
        Modafinil is a prescription wakefulness-promoting agent approved for
        narcolepsy, shift-work sleep disorder, and obstructive sleep apnea.
        It requires a prescription, has side effects (headache, insomnia,
        appetite suppression), and carries legal risks if obtained without one.
      </Callout>

      <p>
        Including it here because it appears constantly in nootropic
        communities and the distinction matters. Battleday &amp; Brem (2015,{" "}
        <em>European Neuropsychopharmacology</em>) conducted a systematic
        review finding that modafinil did enhance attention and executive
        function in non-sleep-deprived individuals. <EvidenceBadge level="moderate" />
      </p>

      <h3>Noopept</h3>
      <p>
        A synthetic peptide developed in Russia, often grouped with
        racetams but structurally distinct. Noopept has shown
        neuroprotective effects in animal models and some preliminary
        human data in cognitively impaired populations (Neznamov &amp;
        Teleshova, 2009, <em>Neuroscience and Behavioral Physiology</em>). <EvidenceBadge level="emerging" />{" "}
        It&rsquo;s potent at very low doses (10&ndash;30mg) but lacks
        robust human RCT data in healthy adults. Another
        self-experimentation compound.
      </p>

      <h2>Red Flags in Nootropic Marketing</h2>

      <Callout variant="warning" title="The nootropics space is full of snake oil">
        More than almost any other supplement category, nootropics attract
        products with unsubstantiated claims. Know what to look for.
      </Callout>

      <ul>
        <li>
          <strong>Proprietary blends.</strong> If a product lists
          &ldquo;Cognitive Enhancement Matrix&rdquo; followed by a total
          weight but no individual ingredient doses, you have no idea what
          you&rsquo;re taking. Most proprietary blends are built around
          cheap caffeine with pixie-dust amounts of expensive ingredients.
          Our{" "}
          <a href="/guides/how-to-read-a-supplement-label">
            label reading guide
          </a>{" "}
          teaches you to spot these instantly.
        </li>
        <li>
          <strong>&ldquo;10x focus&rdquo; or &ldquo;unlock your
          brain&rsquo;s potential.&rdquo;</strong> No supplement
          produces 10x anything. The best-studied nootropics produce
          modest, measurable improvements in specific cognitive domains.
          If the marketing sounds like a movie trailer, the product is
          selling an experience, not a mechanism.
        </li>
        <li>
          <strong>Citing rat studies as human evidence.</strong> Many
          nootropic ingredients show dramatic effects in rodent models that
          don&rsquo;t translate to humans. If a product page only references
          animal research, that&rsquo;s a yellow flag.
        </li>
        <li>
          <strong>Kitchen-sink formulas.</strong> Products with 15+ active
          ingredients at undisclosed doses. More ingredients doesn&rsquo;t
          mean more effect &mdash; it usually means none of them are at a
          clinically relevant dose.
        </li>
      </ul>

      <h2>How to Build a Cognitive Supplement Stack</h2>
      <p>
        Start simple. Add one thing at a time. Give each addition 2&ndash;4
        weeks before evaluating. This is the only way to know what&rsquo;s
        actually working for you.
      </p>
      <ul>
        <li>
          <strong>Step 1:</strong> Caffeine + L-theanine (100mg + 200mg).
          If you already drink coffee, just add L-theanine. This alone
          handles most people&rsquo;s &ldquo;I want better focus&rdquo;
          needs.
        </li>
        <li>
          <strong>Step 2:</strong> Creatine monohydrate (5g daily). Benefits
          accumulate over weeks. Virtually no downside at this dose.
        </li>
        <li>
          <strong>Step 3:</strong> <a href="/guides/best-omega-3-supplements">Omega-3</a> (DHA-dominant, 1&ndash;2g
          daily). Long-game cognitive preservation. Also supports
          cardiovascular health.
        </li>
        <li>
          <strong>Step 4:</strong> Choose one Tier 2 compound based on your
          specific goal &mdash; lion&rsquo;s mane for neuroprotection and
          NGF support, bacopa for memory, or alpha-GPC if you suspect low
          choline intake. Run it for 8&ndash;12 weeks before evaluating.
        </li>
      </ul>
      <p>
        For a broader framework on combining supplements across multiple
        health goals, see our{" "}
        <a href="/guides/how-to-build-a-supplement-stack">
          guide to building a supplement stack
        </a>. And if you&rsquo;re interested in nootropics as part of a
        longevity-oriented protocol, our{" "}
        <a href="/guides/beginner-longevity-supplement-stack">
          beginner longevity stack guide
        </a>{" "}
        covers where cognitive supplements fit alongside the core longevity
        compounds.
      </p>

      <ProductRow
        title="The evidence-based cognitive stack"
        products={[
          PRODUCTS["nootropics-depot-l-theanine"],
          PRODUCTS["thorne-creatine"],
          PRODUCTS["thorne-super-epa-pro"],
          PRODUCTS["nootropics-depot-cognizin"],
        ]}
      />

      <h2>The Role of Adaptogens</h2>
      <p>
        Adaptogens like{" "}
        <a href="/guides/ashwagandha-guide">ashwagandha</a> and rhodiola
        aren&rsquo;t classical nootropics, but they appear frequently in
        cognitive supplement stacks because chronic stress is one of the
        biggest cognitive performance killers. Cortisol impairs
        hippocampal function (memory consolidation), reduces prefrontal
        cortex activity (executive function), and fragments attention.
      </p>

      <Callout variant="tip" title="When stress is the bottleneck">
        If your cognitive fog is driven by stress and anxiety rather than
        raw processing-speed limitations, an adaptogen may do more for your
        subjective experience of &ldquo;mental clarity&rdquo; than a
        traditional nootropic.
      </Callout>

      <p>
        Ashwagandha in particular has solid human
        data for reducing perceived stress and anxiety (Chandrasekhar et
        al., 2012, <em>Indian Journal of Psychological Medicine</em>). <EvidenceBadge level="strong" studiesId="ashwagandha-cortisol-2012" />{" "}
        It won&rsquo;t make you &ldquo;smarter,&rdquo; but it may remove
        the stress-induced cognitive ceiling that no amount of caffeine
        or lion&rsquo;s mane can fix.
      </p>

      <ProductCallout product={PRODUCTS["thorne-ashwagandha"]} />

      <h2>Drug Interactions and Medical Contraindications</h2>

      <p><strong>Drug interactions with nootropics</strong> are poorly tracked because most of these compounds aren't regulated as pharmaceuticals — meaning interaction data comes from case reports, pharmacological reasoning, and limited clinical trials rather than the systematic post-market surveillance applied to prescription drugs. That gap makes this section more important, not less.</p>

      <h3>Compound-Specific Interactions</h3>

      <p><strong>Bacopa monnieri</strong> may potentiate thyroid medications (it has shown thyroid-stimulating effects in animal models — Kar et al., 2002, <em>Journal of Ethnopharmacology</em>) and could theoretically compete with anticholinergic drugs by raising acetylcholine activity. It may also slow heart rate, compounding effects of beta-blockers or calcium channel blockers. If you take thyroid or cardiovascular medication, consult your prescriber before adding bacopa.</p>

      <p><strong>Omega-3 (EPA/DHA)</strong> at doses above 2g/day can inhibit platelet aggregation, increasing bleeding risk. This is clinically relevant if you're on warfarin, aspirin, clopidogrel, or other anticoagulants/antiplatelets (Buckley et al., 2004, <em>Atherosclerosis</em>). <EvidenceBadge level="moderate" /> Discuss timing and dosing with your doctor before combining.</p>

      <p><strong>Alpha-GPC</strong> raises acetylcholine levels, which means it can interact with cholinesterase inhibitors (donepezil, rivastigmine) used in dementia treatment — potentially causing cholinergic excess (nausea, bradycardia, excessive salivation). It may also interact with scopolamine and atropine by opposing their mechanism.</p>

      <p><strong>Caffeine</strong> has the longest interaction list of anything in this guide. It's metabolized by CYP1A2, meaning drugs that inhibit that enzyme — fluvoxamine, ciprofloxacin, oral contraceptives — can dramatically increase caffeine's half-life and side effects. Caffeine also interacts with MAOIs, lithium (by increasing renal clearance), and adenosine-based cardiac drugs. If you're on <em>any</em> psychiatric or cardiovascular medication, verify caffeine safety with your provider.</p>

      <Callout variant="warning" title="Categorical Disclaimer">
      If you are currently taking prescription medications, are pregnant or breastfeeding, or are under 18, consult your healthcare provider before using any compound discussed in this guide — including the Tier 1 supplements. "Generally well-tolerated in healthy adults" does not mean safe in your specific context. Bring your full supplement list to your next appointment.
      </Callout>

      <h2>How to Verify Supplement Quality (Third-Party Testing)</h2>

      <p>Knowing how to verify supplement quality is the difference between trusting a label and trusting evidence. The FDA doesn't approve dietary supplements for safety or efficacy before they hit shelves — it only intervenes <em>after</em> problems surface. That means the burden of verification falls entirely on you. Fortunately, three certification programs do the heavy lifting if you know what to look for.</p>

      <h3>The Three Certifications That Matter</h3>

      <p><strong>NSF Certified for Sport</strong> tests for label accuracy, contaminant screening (heavy metals, pesticides), and over 270 banned substances. It's the gold standard for athletes but equally useful for anyone who wants proof that what's on the label is what's in the capsule. <strong>USP Verified</strong> confirms potency, purity, and manufacturing quality through facility audits and product testing. <strong>Informed Sport</strong> focuses on banned-substance screening and is widely recognized in professional and Olympic athletics.</p>

      <p>None of these certifications evaluate whether a supplement <em>works</em> — they verify that it contains what it claims, at the stated dose, without dangerous contaminants. That's the baseline, and most nootropic products don't clear it.</p>

      <h3>Why Proprietary Blends Fail Here</h3>

      <p>Even a third-party tested product is useless if you can't verify individual ingredient doses. Proprietary blends — the "Cognitive Enhancement Matrix" formulas called out in our <a href="/guides/how-to-read-supplement-labels">label reading guide</a> — make it impossible to confirm whether any single ingredient reaches a clinically relevant amount. A certified proprietary blend is still a black box. Certification plus full label transparency is the combination you need.</p>

      <h3>Your 3-Step Verification Checklist</h3>

      <p><strong>Step 1: Look for a certification mark.</strong> Check the product packaging or manufacturer's website for NSF Certified for Sport, USP Verified, or Informed Sport logos. No mark? Move to Step 2 with higher skepticism.</p>

      <p><strong>Step 2: Request or find the Certificate of Analysis (COA).</strong> A COA is a document from an independent lab confirming the product's identity, potency, and contaminant levels for a specific batch. Reputable brands publish COAs on their website or provide them on request. If a company won't share a COA, treat that as a disqualifying red flag.</p>

      <p><strong>Step 3: Cross-check the COA details.</strong> Verify that the batch number matches your product, the testing lab is ISO 17025 accredited, and the results confirm the label's claimed doses. A COA from an unaccredited lab or with a mismatched batch number is theater, not transparency.</p>

      <Callout variant="warning" title="No Certification ≠ Unsafe, But…">
      Many smaller nootropic brands skip certification due to cost. That doesn't automatically mean their products are contaminated or underdosed — but it does mean you're relying entirely on the company's integrity with no independent verification. For compounds you'll take daily for months (creatine, omega-3, lion's mane), the cost of choosing a verified product is worth the peace of mind.
      </Callout>

      <p>If you're building a <a href="/guides/how-to-build-a-supplement-stack">supplement stack</a> with multiple products, apply this checklist to each one. Quality failures compound just like the supplements do — except in the wrong direction.</p>

      <h3>Caffeine Genetics: Why the Same Dose Affects People Differently</h3>

      <p>Caffeine genetics explain why your coworker drinks three espressos and sleeps like a rock while you're wired until 2 AM from a single cup. The difference isn't tolerance or willpower — it's largely determined by two genes that govern how your body processes and responds to caffeine.</p>

      <p>The first is <strong>CYP1A2</strong>, which codes for the liver enzyme responsible for metabolizing roughly 95% of ingested caffeine. About half the population carries a variant (CYP1A2*1F) that makes them <em>slow metabolizers</em> — caffeine lingers in their system significantly longer. Sachse et al. (1999, <em>British Journal of Clinical Pharmacology</em>) identified this polymorphism, and subsequent research by Cornelis et al. (2006, <em>JAMA</em>) linked slow-metabolizer status to increased cardiovascular risk from coffee, suggesting the extended exposure window has real physiological consequences.</p>

      <p>The second gene is <strong>ADORA2A</strong>, which encodes the adenosine A2A receptor — the very receptor caffeine blocks. Certain ADORA2A variants make you substantially more prone to caffeine-induced anxiety. Alsene et al. (2003, <em>Neuropsychopharmacology</em>) found that individuals with the 1976T/T genotype reported significantly higher anxiety after 150mg of caffeine compared to other genotypes. <EvidenceBadge level="moderate" /> If caffeine makes you jittery or anxious even at low doses, this variant is a likely culprit — and L-theanine can only partially compensate.</p>

      <Callout variant="warning" title="If caffeine has ever kept you up or made you anxious">
      You may be a CYP1A2 slow metabolizer, an ADORA2A anxiety-sensitive type, or both. Start at <strong>50–75mg caffeine</strong> (roughly half a small coffee) rather than the 100–200mg range. Cut off caffeine by 10 AM instead of early afternoon — your effective half-life may be closer to 8–9 hours, not the standard 5–6. Pair with L-theanine regardless, and titrate up only if you tolerate the lower dose well.
      </Callout>

      <p>You can get CYP1A2 and ADORA2A genotyping through consumer DNA services or pharmacogenomic panels. But honestly, your own response history is a decent proxy — if you've always been "sensitive to caffeine," act accordingly rather than forcing a standard dose. The <a href="/guides/nootropics-guide">caffeine + L-theanine recommendation</a> in this guide still applies, but the dose that works for <em>you</em> may be half of what works for a fast metabolizer.</p>

      <h2>Who Should Talk to a Doctor First</h2>
      <p>
        The Tier 1 and Tier 2 compounds in this guide are well-studied in healthy, unmedicated adults. But "well-studied in healthy adults" is not the same as "safe for everyone." If any of the following apply to you, get clinical input before starting — or stacking — these supplements.
      </p>

      <Callout variant="warning" title="If you take prescription medications">
        Several compounds in this guide have real interaction profiles. Bacopa may interact with thyroid medications and anticholinergic drugs. High-dose omega-3 can affect platelet aggregation, which matters if you're on blood thinners. Alpha-GPC may interact with cholinesterase inhibitors. Caffeine interacts with MAOIs, certain antidepressants, and blood pressure medications. Talk to your prescriber before adding any of these to an existing medication regimen.
      </Callout>

      <Callout variant="warning" title="If you are pregnant or breastfeeding">
        Even the Tier 1 compounds in this guide — including caffeine dosing and DHA — require pregnancy-specific guidance that this guide does not cover. Talk to your OB-GYN or midwife before using any nootropic supplement during pregnancy or while nursing.
      </Callout>

      <Callout variant="warning" title="If you are 65 or older">
        Older adults face different pharmacokinetics and higher polypharmacy risk. You may also benefit most from DHA and lion's mane, but appropriate starting doses and interaction checks differ from those calibrated for younger adults. Discuss with your healthcare provider before beginning a stack.
      </Callout>

      <Callout variant="warning" title="If you have an anxiety disorder">
        This guide recommends caffeine + L-theanine as the starting point, but for someone with generalized anxiety disorder or panic disorder, additional caffeine — even buffered by L-theanine — may worsen symptoms. Talk to your provider before adding stimulatory compounds.
      </Callout>

      <Callout variant="warning" title="If you are a competitive athlete subject to anti-doping testing">
        Alpha-GPC and many mushroom-derived products are not certified for sport. Untested supplements carry contamination risk that has caused inadvertent doping violations. Look for third-party sport-certified products and consult your sport's anti-doping authority before use.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list — including what you're considering — to your next provider visit.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Do nootropics actually make you smarter?</h3>
      <p>
        Not in the way movies portray it. No supplement will raise your IQ
        or give you abilities you don&rsquo;t already have. What the
        evidence-backed nootropics <em>can</em> do is improve specific
        cognitive domains &mdash; attention, working memory, processing
        speed, mental endurance under fatigue &mdash; by modest but
        meaningful margins. Think of it as reducing friction rather than
        adding horsepower. A well-rested, well-fed brain on caffeine +
        L-theanine is sharper than the same brain without them, but
        it&rsquo;s still the same brain.
      </p>

      <h3>Is it safe to stack multiple nootropics together?</h3>
      <p>
        Generally yes, if you&rsquo;re sticking to Tier 1 and Tier 2
        compounds at recommended doses. Caffeine, L-theanine, creatine,
        omega-3, and lion&rsquo;s mane can all be taken together without
        known negative interactions. The risk increases when you start
        combining multiple compounds that affect the same neurotransmitter
        system &mdash; for example, stacking alpha-GPC with another
        cholinergic compound could theoretically cause excess acetylcholine
        (headache, jaw tension, brain fog). The rule: add one new compound
        at a time, run it for 2&ndash;4 weeks, assess, then decide
        whether to add another.
      </p>

      <h3>How long do nootropics take to work?</h3>
      <p>
        It depends entirely on the compound. Caffeine and L-theanine work
        within <strong>30&ndash;60 minutes</strong>. Creatine takes{" "}
        <strong>2&ndash;4 weeks</strong> to saturate brain stores (you
        won&rsquo;t feel a single dose). Bacopa requires{" "}
        <strong>8&ndash;12 weeks</strong> of daily use before cognitive
        improvements emerge. Lion&rsquo;s mane typically needs{" "}
        <strong>4&ndash;8 weeks</strong>. DHA is a structural investment
        measured in <strong>months</strong>. If a product claims you&rsquo;ll
        &ldquo;feel it instantly,&rdquo; it either contains caffeine or
        stimulants (check the label) or is overselling its effects. Our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          label reading guide
        </a>{" "}
        can help you identify what&rsquo;s actually inside.
      </p>

      <h3>What about microdosing psychedelics as nootropics?</h3>
      <p>
        This topic generates enormous interest online, but the controlled
        research to date has been underwhelming. A 2022 double-blind RCT
        by Marschall et al. in <em>Translational Psychiatry</em> found
        that microdosing psilocybin did not improve cognitive performance,
        emotional processing, or creativity compared to placebo over four
        weeks. <EvidenceBadge level="emerging" /> Positive reports from open-label and anecdotal sources
        likely reflect expectation effects. Psychedelics also carry legal
        risk in most jurisdictions. We won&rsquo;t say &ldquo;never,&rdquo;
        but the evidence doesn&rsquo;t currently support microdosing as
        a reliable cognitive enhancer.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        The &ldquo;limitless pill&rdquo; doesn&rsquo;t exist. What does
        exist is a small set of well-studied compounds that can meaningfully
        improve specific aspects of cognitive performance &mdash; provided
        your sleep, exercise, and nutrition foundations are solid. The gap
        between what the marketing promises and what the science delivers
        is wide, but within that gap there are genuinely useful tools.
      </p>
      <p>
        Start with caffeine + L-theanine. Add creatine. Get your omega-3
        intake up. Then, if you want more, explore lion&rsquo;s mane or
        bacopa with realistic expectations and an 8-week evaluation window.
        That&rsquo;s it. That&rsquo;s the evidence-based nootropic stack
        for someone who wants to think more clearly without getting scammed.
      </p>

      <ProductRow
        title="Build your cognitive stack"
        products={[
          PRODUCTS["nootropics-depot-l-theanine"],
          PRODUCTS["nootropics-depot-creatine"],
          PRODUCTS["thorne-super-epa-pro"],
          PRODUCTS["thorne-ashwagandha"],
        ]}
      />

      <p>
        <a href="https://app.formulate-health.app/catalog">
          Explore cognitive supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
