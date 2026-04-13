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

export function BestOmega3() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "Read EPA + DHA per serving, not \"fish oil\" — a 1,000mg softgel often has only 300mg omega-3",
          "Triglyceride (TG) form absorbs ~70% better than ethyl ester — worth the extra cost",
          "Aim for 1,000–2,000mg combined EPA+DHA daily for general health",
          "Check for IFOS certification and TOTOX values — oxidized fish oil may be harmful",
        ]}
      />

      <p>
        Grab the fish oil bottle from your cabinet and flip it over. See where it
        says &ldquo;1,000mg Fish Oil&rdquo; on the front? Now look at the
        Supplement Facts panel. The actual EPA + DHA &mdash; the omega-3s that
        do the work &mdash; might be 300mg. You&rsquo;ve been taking a third of
        what you thought. This is the single most common trap in the omega-3 market,
        and it&rsquo;s where most &ldquo;best fish oil&rdquo; guides should start
        but don&rsquo;t.
      </p>

      <h2>The Number That Actually Matters: Combined EPA + DHA</h2>
      <p>
        &ldquo;Fish oil&rdquo; is not the same as omega-3. Fish oil is the carrier.
        EPA (eicosapentaenoic acid) and DHA (docosahexaenoic acid) are the specific
        fatty acids with clinical evidence behind them. A standard 1,000mg fish oil
        softgel typically contains only 300mg of combined EPA + DHA. The rest is
        other fats.
      </p>

      <Callout variant="evidence" title="Clinical doses are much higher than you think">
        The VITAL trial (Manson et al., 2019, <em>NEJM</em>) and the REDUCE-IT trial
        (Bhatt et al., 2019, <em>NEJM</em>) used 1,000&ndash;4,000mg of combined
        EPA + DHA daily. To hit even the low end with a standard fish oil,
        you&rsquo;d need 3&ndash;4 softgels. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        Concentrated formulas that
        deliver 500&ndash;1,000mg EPA + DHA per softgel save you from swallowing a
        handful of pills. Always flip the bottle and read the actual EPA + DHA
        numbers. For more on decoding supplement labels,{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          check our label-reading guide
        </a>.
      </p>

      <h2>Triglyceride Form vs. Ethyl Ester: This Matters More Than You Think</h2>
      <p>
        Omega-3s come in two main molecular forms, and the difference in absorption
        is significant.
      </p>

      <Callout variant="evidence" title="TG form absorbs 70% better">
        A 2010 study by Dyerberg et al. in <em>Prostaglandins, Leukotrienes and
        Essential Fatty Acids</em> found TG-form omega-3s had approximately 70%
        better absorption than ethyl ester form. Your body recognizes and processes
        TG-form fats more efficiently because that&rsquo;s how they exist in
        nature. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        <strong>Ethyl ester (EE) form</strong> is cheaper to produce and is what
        you&rsquo;ll find in most budget fish oils. It&rsquo;s created during the
        concentration process and is less bioavailable. If a bottle doesn&rsquo;t
        specify &ldquo;triglyceride form&rdquo; anywhere on the label, it&rsquo;s
        almost certainly ethyl ester.
      </p>

      <Callout variant="tip" title="Quick label check">
        If a bottle doesn&rsquo;t explicitly say &ldquo;triglyceride form&rdquo;
        or &ldquo;rTG form,&rdquo; assume it&rsquo;s ethyl ester. Spend the
        extra few dollars for TG form &mdash; you&rsquo;re literally absorbing
        more of what you paid for.
      </Callout>

      <h2>Oxidation: The Hidden Quality Problem</h2>
      <p>
        Here&rsquo;s something that rarely makes the &ldquo;best fish oil&rdquo;
        listicles: omega-3 fats are highly susceptible to oxidation. Rancid fish oil
        isn&rsquo;t just unpleasant (fishy burps, bad aftertaste) &mdash; oxidized
        lipids may be actively harmful. A 2015 study by Albert et al. in{" "}
        <em>Scientific Reports</em> found that a significant percentage of
        commercially available fish oil products exceeded recommended oxidation
        limits. <EvidenceBadge level="strong" />
      </p>

      <Callout variant="warning" title="How to spot rancid fish oil">
        Check for TOTOX value (should be under 26 per GOED standards), IFOS
        certification (gold standard for purity testing), and do the smell test
        &mdash; fresh fish oil has a mild, clean scent. If it smells strongly
        fishy, the oil may be oxidized.
      </Callout>

      <ul>
        <li>
          <strong>TOTOX value:</strong> This measures total oxidation. The Global
          Organization for EPA and DHA Omega-3s (GOED) sets the standard at under
          26. Quality brands publish their TOTOX values. If they don&rsquo;t,
          that&rsquo;s a yellow flag.
        </li>
        <li>
          <strong>IFOS certification:</strong> The International Fish Oil Standards
          program is the gold standard for purity testing. A five-star IFOS rating
          means the product has been independently tested for oxidation, heavy
          metals, PCBs, and dioxins, and passed on all counts.
        </li>
        <li>
          <strong>Smell test:</strong> Open the bottle. If it smells strongly
          fishy or &ldquo;off,&rdquo; the oil may be oxidized. Fresh fish oil has
          a mild, clean scent.
        </li>
      </ul>

      <h2>EPA vs. DHA: Pick Your Ratio by Goal</h2>
      <p>
        EPA and DHA do different things in your body, and the ratio between them
        matters depending on what you&rsquo;re after:
      </p>
      <ul>
        <li>
          <strong>Higher EPA (2:1 or 3:1 EPA:DHA):</strong> Stronger evidence for
          mood support, inflammation reduction, and cardiovascular markers. A 2019
          meta-analysis by Liao et al. in <em>Translational Psychiatry</em> found
          EPA-dominant formulas were significantly more effective for depression
          than DHA-dominant ones. <EvidenceBadge level="strong" />
        </li>
        <li>
          <strong>Higher DHA:</strong> Better evidence for brain structure,
          cognitive function, and neuroprotection. Critical during pregnancy for
          fetal brain development. The MFGD study (Makrides et al., 2010,{" "}
          <em>JAMA</em>) used DHA-rich supplementation in pregnant women. <EvidenceBadge level="strong" />
        </li>
        <li>
          <strong>Balanced ratio:</strong> Fine for general health maintenance.
          Most standard fish oils are roughly 3:2 EPA:DHA, which works for broad
          coverage.
        </li>
      </ul>

      <h2>What About Algal Omega-3?</h2>
      <p>
        If you&rsquo;re vegetarian, vegan, or concerned about ocean contaminants,
        algal (algae-derived) omega-3 is a legitimate alternative. Here&rsquo;s
        why it makes biological sense: fish don&rsquo;t produce EPA and DHA
        themselves &mdash; they accumulate it from eating algae. Algal oil cuts out
        the middlefish.
      </p>
      <p>
        Algal sources have historically been DHA-heavy with limited EPA, but newer
        products (like those from Örlö or Nordic Naturals Algae Omega) have
        improved EPA content significantly. Algal omega-3 also avoids heavy metal
        and PCB concerns entirely, since it&rsquo;s grown in controlled
        environments. The trade-off is higher cost per gram of EPA + DHA compared
        to fish oil.
      </p>

      <h2>Brands That Check the Boxes</h2>
      <p>
        Rather than a definitive ranking, here are products that consistently meet
        the criteria above &mdash; high EPA + DHA per serving, triglyceride form,
        third-party tested, low oxidation.
      </p>
      <p>
        <strong>Thorne Super EPA Pro</strong> delivers concentrated EPA + DHA in
        triglyceride form with NSF Certified for Sport testing. Low oxidation
        markers, no reported fishy aftertaste, competitive price for a TG-form
        product. A dependable, no-surprises choice.
      </p>

      <ProductCallout product={PRODUCTS["thorne-super-epa-pro"]} />

      <p>
        <strong>Momentous Omega-3</strong> offers another concentrated TG-form
        option with Informed Sport certification and strong manufacturing
        transparency. Good EPA:DHA ratio for general health and inflammation.
      </p>
      <p>
        <strong>Nordic Naturals Ultimate Omega</strong> is one of the most
        IFOS-tested brands on the market. TG form, high concentration, and they
        publish TOTOX values for every batch. Friend of the Sea certified for
        sustainability.
      </p>
      <p>
        <strong>Thorne Omega-3 with CoQ10</strong> is a smart combo for anyone on
        statins or targeting cardiovascular support specifically. Both actives at
        meaningful doses &mdash; not pixie-dusted.
      </p>

      <ProductCallout product={PRODUCTS["thorne-omega-3-coq10"]} />

      <p>
        If you&rsquo;re building a broader supplement protocol, see{" "}
        <a href="/guides/beginner-longevity-supplement-stack">
          our beginner longevity stack guide
        </a>{" "}
        for how omega-3 fits into the bigger picture.
      </p>

      <h2>Interpreting the Omega-3 Index</h2>
      <p>
        The <strong>Omega-3 Index</strong> — the percentage of EPA + DHA in
        your red blood cell membranes — is the single most reliable biomarker
        for long-chain omega-3 status. Serum omega-3 fluctuates with what you
        ate yesterday; the RBC membrane index reflects 3&ndash;4 months of
        intake and maps better to outcomes like sudden cardiac death risk
        and inflammatory markers.
      </p>
      <ul>
        <li>
          <strong>Below 4%:</strong> High-risk zone. Most US adults fall here
          by default. Associated with elevated cardiovascular mortality in
          epidemiological cohorts.
        </li>
        <li>
          <strong>4&ndash;8%:</strong> Intermediate. Typical of people taking
          a low-dose supplement (500&ndash;1,000 mg combined EPA+DHA) or
          eating fish 1&ndash;2x/week.
        </li>
        <li>
          <strong>Above 8%:</strong> Target range for most research-backed
          benefits. Requires roughly 1,500&ndash;2,500 mg combined EPA+DHA
          daily for most people, or regular oily-fish consumption (3&ndash;4
          servings/week).
        </li>
      </ul>
      <p>
        Tests cost $50&ndash;80 through labs like OmegaQuant and require a
        single finger-stick blood drop. Retest 3&ndash;4 months after
        changing dose — anything sooner captures the ramp, not the steady
        state.
      </p>

      <h2>Dose-Response for Specific Outcomes</h2>
      <p>
        One of the biggest sources of confusion in the omega-3 literature is
        that different outcomes require very different doses. A dose that
        helps joint inflammation won&rsquo;t meaningfully move triglycerides;
        a dose that lowers triglycerides is probably overkill for general
        cardiovascular maintenance.
      </p>

      <InteractionGroup title="Dose targets by goal">
        <InteractionCard
          type="synergy"
          a="General cardiovascular / longevity"
          b="1,000–2,000 mg EPA+DHA/day"
          effect="The dose most large-cohort studies associate with lower all-cause mortality. Enough to raise Omega-3 Index into the 6–8% range in most people."
          recommendation="Consistency matters more than precise dose in this range. Pair with weekly fatty fish when possible."
        />
        <InteractionCard
          type="synergy"
          a="Elevated triglycerides"
          b="2,000–4,000 mg EPA+DHA/day"
          effect="At 4,000 mg/day, expect 25–30% triglyceride reduction. Below 2,000 mg, effects on triglycerides are modest."
          recommendation="EPA-dominant products outperform balanced EPA/DHA for triglyceride lowering. Prescription-grade icosapent ethyl is the high-dose option."
        />
        <InteractionCard
          type="synergy"
          a="Inflammatory joint conditions"
          b="2,700 mg EPA+DHA/day"
          effect="The dose used in most RA trials. Measurable reductions in joint tenderness and morning stiffness over 8–12 weeks."
          recommendation="Higher EPA content preferred (EPA is more directly anti-inflammatory than DHA)."
        />
        <InteractionCard
          type="synergy"
          a="Major depression (adjunctive)"
          b="1,000–2,000 mg EPA/day (EPA-dominant)"
          effect="Meta-analyses show meaningful adjunctive benefit when EPA:DHA ratio is >2:1 and EPA dose exceeds 1,000 mg."
          recommendation="DHA-heavy fish oils won't replicate these results. Check the EPA:DHA ratio specifically."
        />
        <InteractionCard
          type="synergy"
          a="Pregnancy / lactation"
          b="200–300 mg DHA/day minimum"
          effect="DHA is preferentially transferred to the fetus/infant and supports neural development."
          recommendation="DHA-dominant or balanced products preferred. Algal oil is a good vegan-compatible option."
        />
      </InteractionGroup>

      <h2>How to Take Fish Oil for Maximum Absorption</h2>

      <Callout variant="evidence" title="Always take with fat">
        A 2019 study in the{" "}
        <em>Journal of the Academy of Nutrition and Dietetics</em> (Lawson
        and Hughes) found omega-3 absorption increased up to 3x when taken with a
        fat-containing meal versus on an empty stomach. <EvidenceBadge level="strong" />
      </Callout>

      <ul>
        <li>
          <strong>Always take with food</strong> &mdash; specifically a meal
          containing fat. Eggs, avocado, nuts, olive oil &mdash; anything with
          dietary fat.
        </li>
        <li>
          <strong>Store properly:</strong> Keep fish oil in a cool, dark place.
          Some people refrigerate softgels, which also reduces any fishy burps.
          Never store near a window or in a hot car.
        </li>
        <li>
          <strong>Split large doses:</strong> If you&rsquo;re taking more than 2g
          EPA + DHA daily, split it into two doses (morning and evening) for better
          absorption and fewer GI effects.
        </li>
      </ul>
      <p>
        For a complete supplement timing framework, check{" "}
        <a href="/guides/supplement-timing-guide">our timing guide</a>.
      </p>

      <InteractionGroup title="Omega-3 interactions">
        <InteractionCard
          type="synergy"
          a="Omega-3"
          b="CoQ10"
          effect="Both support cardiovascular health through complementary mechanisms — omega-3 for lipids, CoQ10 for mitochondrial energy."
          recommendation="A great combo for anyone over 40 or on statins. Some products combine both."
        />
        <InteractionCard
          type="synergy"
          a="Omega-3"
          b="Vitamin D"
          effect="Both are fat-soluble and absorb better with dietary fat. Taking them together at a fat-containing meal is efficient."
          recommendation="Bundle your fat-soluble supplements at breakfast with eggs, avocado, or nuts."
        />
        <InteractionCard
          type="conflict"
          a="Omega-3 (high dose)"
          b="Blood thinners"
          effect="Omega-3s have a mild anti-platelet effect which compounds with anticoagulant medications."
          recommendation="Talk to your doctor before starting high-dose fish oil if you're on warfarin or aspirin."
        />
      </InteractionGroup>

      <h2>Frequently Asked Questions</h2>

      <h3>How much omega-3 should I take per day?</h3>
      <p>
        For general health, aim for 1,000&ndash;2,000mg of combined EPA + DHA daily.
        The American Heart Association recommends at least 1,000mg/day for people
        with coronary heart disease. Higher doses (2,000&ndash;4,000mg) have been
        used in clinical trials for triglyceride reduction and inflammation, but
        work with a healthcare provider at those levels.
      </p>

      <h3>Is fish oil safe to take with blood thinners?</h3>
      <p>
        Omega-3s have a mild anti-platelet effect, which is part of their
        cardiovascular benefit. If you&rsquo;re on anticoagulants (warfarin,
        aspirin, etc.), talk to your doctor before starting high-dose fish oil.
        Standard doses (1,000&ndash;2,000mg EPA + DHA) are generally well-tolerated,
        but your provider should be aware.
      </p>

      <h3>Why does fish oil give me fishy burps?</h3>
      <p>
        Usually one of three reasons: the oil is oxidized (rancid), you&rsquo;re
        taking it on an empty stomach, or the product uses ethyl ester form which
        is harder to digest. Switch to a fresh, TG-form product, take it with food,
        and try refrigerating the softgels. If burps persist, enteric-coated
        capsules can help.
      </p>

      <h3>Is krill oil better than fish oil?</h3>
      <p>
        Krill oil contains EPA and DHA in phospholipid form, which some studies
        suggest absorbs comparably to TG-form fish oil. It also contains
        astaxanthin, an antioxidant. However, krill oil typically delivers far less
        EPA + DHA per serving (often 100&ndash;200mg total) at a higher cost per
        milligram. For most people, concentrated TG-form fish oil is more practical
        and economical.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Stop looking at the &ldquo;fish oil&rdquo; number on the front of the
        bottle. Flip it over. Find the EPA + DHA per serving. You want
        1,000&ndash;2,000mg combined daily, in triglyceride form, from a brand that
        publishes oxidation data or carries IFOS certification. If the product
        doesn&rsquo;t tell you the form or TOTOX value, it&rsquo;s hiding something.
        Buy accordingly.
      </p>

      <ProductRow
        title="Top-scored omega-3 supplements"
        products={[
          PRODUCTS["thorne-super-epa-pro"],
          PRODUCTS["thorne-omega-3-coq10"],
        ]}
      />

      <p>
        <a href="https://app.formulate-health.app/catalog?q=omega">
          Browse omega-3 supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
