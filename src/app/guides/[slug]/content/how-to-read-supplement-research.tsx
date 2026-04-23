import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function HowToReadSupplementResearch() {
  return (
    <>
      <TLDRBox
        readTime="10 min read"
        takeaways={[
          "Not all evidence is equal — the hierarchy runs meta-analyses > RCTs > cohorts > case reports > in-vitro / animal > expert opinion. Supplement marketing routinely cites the bottom of that stack",
          "Four red flags that flip a study's credibility: industry funding + no disclosure, surrogate endpoints dressed as outcomes, sample sizes under ~30, and duration too short for the claimed effect",
          "PubMed, Cochrane, and Examine.com are the three sources worth trusting. 'Dr.' influencer blog posts, podcast transcripts, and press releases are not evidence",
          "Effect sizes matter more than p-values. A study can show 'statistically significant' 2% HbA1c improvement at p<0.001 and still be clinically meaningless",
        ]}
      />

      <p>
        The supplement industry routinely cites &ldquo;studies show&rdquo;
        and &ldquo;research proves&rdquo; with a straight face. Most of
        those claims are true in a narrow, technical sense — there
        <em>is</em> a study — and completely wrong in the practical sense
        that matters to a user deciding whether to spend $40 on a bottle.
        Learning to read supplement research isn&rsquo;t about becoming a
        researcher. It&rsquo;s about knowing which four questions to ask
        every time someone quotes a study at you.
      </p>
      <p>
        This guide covers the evidence hierarchy, common traps, how to
        skim an abstract in 60 seconds, and the three research sources
        actually worth using. Skip the jargon — the goal is a checklist
        you can carry into your next supplement purchase.
      </p>

      <h2>The Evidence Hierarchy</h2>
      <p>
        Not all research is equal. In descending order of reliability
        for answering &ldquo;does this supplement work?&rdquo;:
      </p>
      <ol>
        <li>
          <strong>Meta-analyses of RCTs.</strong> Pool data from multiple
          randomized trials. The top of the pyramid — closest thing to
          certainty in biology. Look for Cochrane reviews specifically,
          which have the most rigorous methodology.
        </li>
        <li>
          <strong>Randomized controlled trials (RCTs).</strong> Participants
          randomly assigned to supplement or placebo. Blinded (ideally
          double-blinded). Measure a defined outcome. The workhorse of
          actual evidence.
        </li>
        <li>
          <strong>Prospective cohort studies.</strong> Follow a population
          forward over years, measure who takes what, correlate with
          outcomes. Can show association but not cause — confounders are
          everywhere.
        </li>
        <li>
          <strong>Case-control studies.</strong> Retrospectively compare
          affected vs unaffected users. Useful for rare outcomes but
          recall bias is a real problem.
        </li>
        <li>
          <strong>Case reports / case series.</strong> Individual or small-
          group reports of notable events. Useful for signal detection
          (&ldquo;this happened, we should study it&rdquo;), not for
          treatment decisions.
        </li>
        <li>
          <strong>Animal studies.</strong> Mouse biology is not human
          biology. A compound that cures cancer in mice ~90% of the time
          fails in human trials. Treat animal data as suggestive only.
        </li>
        <li>
          <strong>In vitro studies.</strong> Compound + cells in a dish.
          Even weaker than animal data for predicting human outcomes.
          Most &ldquo;curcumin kills cancer cells&rdquo; marketing comes
          from in vitro work — bleach kills cancer cells too.
        </li>
        <li>
          <strong>Expert opinion / mechanism / theory.</strong> Plausible
          biological reasoning. Important for hypothesis generation, not
          conclusion. &ldquo;It should work because X&rdquo; is where
          research starts, not ends.
        </li>
      </ol>
      <Callout variant="evidence" title="Formulate's evidence grades use this hierarchy">
        Every ingredient on the site carries an evidence grade (A, B, C,
        or D) that maps directly to where its strongest available evidence
        sits on this pyramid. Grade A means multiple RCTs or meta-analyses
        converge on the same effect. Grade D means we have a biological
        theory and maybe an animal study — the compound is in the
        encyclopedia for completeness, not endorsement.
      </Callout>

      <h2>Four Red Flags in Any Supplement Study</h2>

      <h3>1. Industry Funding Without Disclosure</h3>
      <p>
        A study funded by the supplement&rsquo;s manufacturer isn&rsquo;t
        automatically wrong — but it&rsquo;s measurably more likely to
        produce favorable results than independent research. Check the
        &ldquo;Funding&rdquo; or &ldquo;Conflict of Interest&rdquo;
        statement at the bottom of the paper. Undisclosed industry
        funding is a major red flag. The FDA and most journals require
        disclosure now, but older papers often slipped through.
      </p>

      <h3>2. Surrogate Endpoints Dressed as Outcomes</h3>
      <p>
        A supplement lowers LDL cholesterol (measurable in blood) — but
        does it reduce actual heart attacks? LDL is a{" "}
        <strong>surrogate endpoint</strong>, a stand-in for what you
        actually care about. Most supplements are tested on surrogates
        because the real outcome (heart attack, death, disability)
        requires long, expensive trials. When you read &ldquo;improved
        biomarker X,&rdquo; ask whether that biomarker reliably predicts
        the real-world outcome. Often it doesn&rsquo;t.
      </p>

      <h3>3. Tiny Sample Sizes</h3>
      <p>
        RCTs with fewer than 30 participants per arm are underpowered for
        most useful claims. They can detect massive effects (say, a drug
        that cures a disease outright), but they regularly miss real
        modest effects (false negatives) and produce apparent effects
        that don&rsquo;t replicate (false positives). When a single small
        trial generates headlines, wait for replication.
      </p>

      <h3>4. Duration Too Short for the Claimed Effect</h3>
      <p>
        A 4-week study of a supplement claimed to prevent age-related
        cognitive decline can&rsquo;t actually measure that claim — the
        effect takes years to materialize. Similarly, a 12-week weight
        loss study may catch early novelty effects that vanish by month 6.
        Match the duration to what&rsquo;s being claimed.
      </p>

      <h2>How to Skim an Abstract in 60 Seconds</h2>
      <p>
        Most studies have a structured abstract. Here&rsquo;s the order
        to read it and what to ask:
      </p>
      <ol>
        <li>
          <strong>Design / Methods.</strong> RCT? Crossover? Open-label?
          (Open-label = participants know what they&rsquo;re taking =
          placebo effect unmeasured.) How many people? How long?
        </li>
        <li>
          <strong>Primary outcome.</strong> What was the prespecified
          main measure? This is the one that counts. Studies often
          report secondary outcomes more prominently — those are
          exploratory and prone to multiple-testing artifacts.
        </li>
        <li>
          <strong>Results: effect size AND statistical significance.</strong>{" "}
          &ldquo;Significant at p&lt;0.05&rdquo; tells you the effect
          probably isn&rsquo;t zero. It doesn&rsquo;t tell you whether
          the effect matters. Look for the magnitude — a mean difference
          of 2 mg/dL on LDL with p&lt;0.001 is statistically significant
          but clinically trivial.
        </li>
        <li>
          <strong>Limitations.</strong> Good papers list their own
          weaknesses. A paper with no limitations section is a warning
          sign.
        </li>
      </ol>

      <h2>Effect Size vs Statistical Significance</h2>
      <p>
        This is where most readers get fooled. Two concepts:
      </p>
      <ul>
        <li>
          <strong>Statistical significance (p-value):</strong> How likely
          is it we&rsquo;d see this result if the supplement had no effect?
          p&lt;0.05 means &ldquo;less than 5% likely.&rdquo;
        </li>
        <li>
          <strong>Effect size:</strong> How big is the effect? Expressed
          as mean difference, relative risk, Cohen&rsquo;s d, etc.
        </li>
      </ul>
      <p>
        A big enough study can produce &ldquo;p&lt;0.001&rdquo; on a
        meaningless effect. For example: a study of 10,000 people showing
        a supplement reduces LDL by 1 mg/dL (statistically bulletproof)
        tells you the supplement does close to nothing clinically —
        you&rsquo;d need a 20–40 mg/dL drop for meaningful cardiovascular
        benefit. Always ask: <em>if this effect were true, would I act
        on it?</em>
      </p>

      <h2>Common Traps Specific to Supplement Research</h2>

      <h3>The &ldquo;In Vitro to Headline&rdquo; Pipeline</h3>
      <p>
        Journalist gets a press release: &ldquo;X supplement kills cancer
        cells in lab study.&rdquo; Cells in a dish, direct chemical contact,
        concentrations unreachable in human bloodstream. The headline
        writes itself; the real-world relevance is near zero. Curcumin,
        resveratrol, green tea extract, CBD, and nearly every &ldquo;anti-
        cancer&rdquo; supplement has this pedigree.
      </p>

      <h3>Extract Potency vs Label Potency</h3>
      <p>
        Studies often use specific standardized extracts at specific
        doses (Ashwagandha KSM-66 at 600 mg, Turmeric Meriva at 1 g). The
        product on the shelf may use a generic extract at half the dose
        in a form that doesn&rsquo;t match. &ldquo;Backed by research&rdquo;
        is technically true but the product you&rsquo;re buying wasn&rsquo;t.
      </p>

      <h3>Single-Study Hype</h3>
      <p>
        One positive trial isn&rsquo;t science — it&rsquo;s a data point.
        True effects replicate. Wait for at least 2–3 independent positive
        trials before treating a claim as established. The file-drawer
        effect — unpublished negative trials — means single positive studies
        overstate effect sizes by about 30–50% in supplement literature.
      </p>

      <h3>Post-Hoc Subgroup Analyses</h3>
      <p>
        A trial failed on its primary outcome, so the authors dig through
        subgroups until they find one where the supplement appears to
        work (&ldquo;effective in postmenopausal women over 60 with
        elevated homocysteine&rdquo;). Treat post-hoc findings as
        hypothesis-generating, not confirmatory. They frequently fail to
        replicate in follow-up trials.
      </p>

      <h2>Where to Find Good Supplement Research</h2>
      <ul>
        <li>
          <strong>
            <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener">
              PubMed
            </a>
          </strong>{" "}
          — the NIH&rsquo;s database of biomedical literature. Free.
          Search with specific terms (&ldquo;ashwagandha&rdquo; +
          &ldquo;randomized controlled trial&rdquo;). Filter by &ldquo;Meta-
          Analysis&rdquo; or &ldquo;Randomized Controlled Trial&rdquo; for
          higher-quality results.
        </li>
        <li>
          <strong>
            <a href="https://www.cochranelibrary.com/" target="_blank" rel="noopener">
              Cochrane Library
            </a>
          </strong>{" "}
          — gold-standard systematic reviews. Smaller selection, but what
          they cover is cover is done to the highest methodological
          standard available.
        </li>
        <li>
          <strong>
            <a href="https://examine.com" target="_blank" rel="noopener">
              Examine.com
            </a>
          </strong>{" "}
          — independent research aggregator. Not peer-reviewed but
          methodologically rigorous. Paywalled for full detail; free for
          basic summaries.
        </li>
      </ul>
      <p>
        Sources to <strong>skip</strong>:
      </p>
      <ul>
        <li>Supplement manufacturer websites and blog posts</li>
        <li>&ldquo;Dr.&rdquo;-branded influencer sites without cited studies</li>
        <li>Podcast transcripts and YouTube videos as primary sources</li>
        <li>Press releases (read the underlying paper instead)</li>
        <li>Wikipedia (decent for overview, not for evidence weight)</li>
      </ul>

      <h2>Putting It Together: The 2-Minute Claim Audit</h2>
      <p>
        You see a supplement making a specific health claim. Run this
        checklist:
      </p>
      <ol>
        <li>
          <strong>What&rsquo;s the evidence?</strong> Click through to
          the study. If there&rsquo;s no link, stop here.
        </li>
        <li>
          <strong>Where does it sit on the hierarchy?</strong> Meta-
          analysis / RCT / cohort / animal / in-vitro? If it&rsquo;s
          below RCT, the claim is weak regardless of how confident the
          marketing sounds.
        </li>
        <li>
          <strong>Was the tested product the same form and dose?</strong>{" "}
          Standardized extracts, specific forms, specific doses matter
          enormously. A study on Meriva curcumin doesn&rsquo;t validate a
          plain turmeric powder.
        </li>
        <li>
          <strong>Was the outcome the one you care about?</strong> Did
          they measure a real endpoint (reduced joint pain, fewer heart
          attacks) or a surrogate (a biomarker that&rsquo;s loosely
          associated with the real endpoint)?
        </li>
        <li>
          <strong>Has it replicated?</strong> One positive trial,
          especially industry-funded, isn&rsquo;t enough. Check if 2+
          independent studies converge.
        </li>
      </ol>
      <p>
        If the claim survives all five, it&rsquo;s probably real. Most
        supplement claims fail at step 2 or step 3.
      </p>

      <h2>How Formulate Applies This</h2>
      <p>
        Every supplement product and ingredient on Formulate is scored
        against this evidence framework. The rubric weighs evidence
        quality explicitly — a supplement with a plausible mechanism but
        zero human trials (Grade D) can&rsquo;t score higher than a
        ceiling set by its evidence tier, no matter how good the sourcing
        or transparency is otherwise. The{" "}
        <a href="/methodology">methodology page</a> has the full scoring
        breakdown. The{" "}
        <a href="/ingredients">ingredient encyclopedia</a> surfaces the
        evidence grade per substance so you can see the tier at a glance.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What&rsquo;s the difference between &ldquo;significant&rdquo; and &ldquo;meaningful&rdquo;?</h3>
      <p>
        Statistical significance (p&lt;0.05) tells you the effect is
        probably real — non-zero. Clinical meaningfulness tells you
        whether the effect is big enough to matter. A supplement can be
        statistically significant and clinically useless at the same time.
        Always ask about magnitude, not just whether there was &ldquo;an
        effect.&rdquo;
      </p>

      <h3>Why can&rsquo;t I just trust a positive study?</h3>
      <p>
        Because of the replication crisis and publication bias. Roughly
        half of initial positive findings in biomedical research fail to
        replicate in follow-up studies. Supplement research is worse than
        average due to industry funding and smaller sample sizes. Wait
        for independent replication before treating a single positive
        trial as established.
      </p>

      <h3>Is a systematic review better than an RCT?</h3>
      <p>
        Usually yes, when it&rsquo;s done well. A Cochrane-style systematic
        review pools data from multiple RCTs and accounts for quality
        differences. But a bad systematic review can be worse than a good
        RCT — check the methodology section, not just the title.
      </p>

      <h3>What if there&rsquo;s no research on a supplement?</h3>
      <p>
        Then the claim that it &ldquo;works&rdquo; is conjecture. Some
        supplements are effective and simply haven&rsquo;t been trial-
        tested because there&rsquo;s no financial incentive. But &ldquo;no
        research&rdquo; isn&rsquo;t evidence of efficacy — it&rsquo;s the
        absence of evidence. Proceed cautiously and weight the risk/benefit
        without a data anchor.
      </p>

      <h3>How do I find the original research on a supplement?</h3>
      <p>
        PubMed is your starting point. Search for the supplement name +
        &ldquo;randomized.&rdquo; Read the abstracts first, then focus on
        the most-cited recent meta-analyses. The Formulate{" "}
        <a href="/ingredients">ingredient encyclopedia</a> also cites
        primary research per substance so you can skip the search step
        for common supplements.
      </p>
    </>
  );
}
