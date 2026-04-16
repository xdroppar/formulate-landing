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

export function IronGuide() {
  return (
    <>
      <TLDRBox
        readTime="12 min read"
        takeaways={[
          "Never supplement iron without bloodwork first — your body has no way to excrete excess iron",
          "Iron bisglycinate (Ferrochel) achieves equivalent repletion at half the dose of ferrous sulfate, with far fewer side effects",
          "Every-other-day dosing absorbs ~40% more iron per dose than daily dosing (Stoffel et al., Lancet Haematology)",
          "Always take iron with vitamin C and away from calcium, coffee, and tea",
        ]}
      />

      <p>
        Iron supplements should never be taken without bloodwork confirming a
        deficiency &mdash; your body has no regulated mechanism to excrete
        excess iron, so what comes in stays in unless you bleed. Unchecked
        iron overload damages the liver, heart, and pancreas, and hereditary
        hemochromatosis affects roughly 1 in 200 people of Northern European
        descent.
      </p>

      <Callout variant="warning" title="The cardinal rule">
        <strong>Never supplement iron without bloodwork first.</strong> Your
        body has no regulated mechanism to excrete excess iron. What comes in,
        stays in &mdash; unless you bleed. Iron overload damages the liver,
        heart, and pancreas. Get tested, confirm you&rsquo;re deficient, then
        supplement. In that order.
      </Callout>

      <p>
        Here&rsquo;s the thing about iron that makes it fundamentally different
        from, say,{" "}
        <a href="/guides/zinc-guide">zinc</a> or <a href="/guides/best-magnesium-supplements">magnesium</a>:{" "}
        <strong>your body has no regulated mechanism to excrete excess
        iron</strong>. What comes in, stays in &mdash; unless you bleed. This
        means iron is one of the very few supplements that can be genuinely{" "}
        <strong>harmful</strong> if you take it without a legitimate need. Iron
        overload damages the liver, heart, and pancreas, and hereditary
        hemochromatosis (a genetic condition causing iron accumulation) affects
        roughly <strong>1 in 200 people</strong> of Northern European descent.
      </p>
      <p>
        This guide covers who actually needs iron, what to test and what the
        numbers mean, which forms work (and which will wreck your stomach),
        and a dosing trick backed by a <em>Lancet</em> study that most
        doctors still aren&rsquo;t using.
      </p>

      <h2>Who Actually Needs Iron Supplementation?</h2>
      <p>
        Iron deficiency is the most common nutritional deficiency worldwide,
        affecting an estimated <strong>1.6 billion people</strong> according
        to the WHO. But it isn&rsquo;t evenly distributed. Certain groups are
        far more likely to be running low:
      </p>
      <ul>
        <li>
          <strong>Menstruating women.</strong> This is the single largest
          at-risk group. Menstrual blood loss accounts for significant iron
          depletion each cycle, and studies estimate that{" "}
          <strong>up to 33% of menstruating women</strong> in developed
          countries have iron deficiency, with rates climbing higher among
          those with heavy periods. A 2014 study in{" "}
          <em>PLOS ONE</em> (Percy et al.) found that nearly 20% of
          menstruating women in the UK had ferritin below 15 ng/mL &mdash;
          the threshold for outright depletion. <EvidenceBadge level="strong" />
        </li>
        <li>
          <strong>Pregnant women.</strong> Iron requirements roughly double
          during pregnancy (from 18mg to 27mg daily) to support expanded blood
          volume and fetal development. The American College of Obstetricians
          and Gynecologists recommends routine iron supplementation during
          pregnancy for this reason.
        </li>
        <li>
          <strong>Vegetarians and vegans.</strong> This one catches people off
          guard. Plant foods contain only non-heme iron, which is absorbed at
          a rate of <strong>2&ndash;20%</strong> compared to{" "}
          <strong>15&ndash;35%</strong> for heme iron from animal sources.
          That&rsquo;s not a small difference &mdash; it&rsquo;s potentially
          an order of magnitude. Phytates in grains and legumes further
          reduce absorption. The NIH sets the RDA for vegetarians at{" "}
          <strong>1.8x the standard recommendation</strong> to account for
          this gap.
        </li>
        <li>
          <strong>Endurance athletes.</strong> Iron losses in athletes come
          from multiple angles: foot-strike hemolysis (red blood cells
          literally rupturing from the impact of running), iron lost through
          sweat (roughly 0.3&ndash;0.4mg per liter), GI micro-bleeding from
          intense exercise, and dilution from expanded plasma volume. A 2019
          review in <em>Nutrients</em> (Sim et al.) found that iron
          deficiency without anemia affected up to <strong>35% of female
          athletes</strong> and 11% of male athletes. <EvidenceBadge level="strong" />
        </li>
        <li>
          <strong>Frequent blood donors.</strong> Each standard whole blood
          donation removes approximately <strong>200&ndash;250mg of
          iron</strong>. Donating every 8 weeks (the typical minimum
          interval) can deplete stores faster than diet alone can replenish
          them, particularly in women. If you donate regularly and feel
          progressively more fatigued, get your ferritin checked.
        </li>
      </ul>
      <p>
        If you don&rsquo;t fall into any of these categories &mdash;
        particularly if you&rsquo;re a non-menstruating adult who eats red
        meat regularly &mdash; you almost certainly don&rsquo;t need iron
        supplementation, and taking it &ldquo;just in case&rdquo; carries
        real risk.
      </p>

      <h2>The Tests That Actually Matter</h2>
      <p>
        Most people who&rsquo;ve had bloodwork done have seen their hemoglobin
        level. If hemoglobin is normal, they assume their iron is fine.{" "}
        <strong>This is wrong.</strong> You can have entirely normal hemoglobin
        while running on empty iron stores &mdash; a condition called{" "}
        <strong>iron deficiency without anemia</strong>. Your body
        prioritizes keeping hemoglobin stable for oxygen transport, so it
        raids storage iron first. By the time hemoglobin drops, you&rsquo;re
        already deeply depleted.
      </p>

      <Callout variant="info" title="The test you need">
        The marker you need is <strong>ferritin</strong>, not hemoglobin.
        Ferritin reflects your body&rsquo;s iron <em>stores</em>. Normal
        hemoglobin with low ferritin means you&rsquo;re running on fumes.
        Optimal ferritin is generally 40&ndash;100 ng/mL.
      </Callout>

      <p>
        The marker you need is <strong>ferritin</strong>. Ferritin reflects
        your body&rsquo;s iron <em>stores</em>, not just what&rsquo;s
        circulating right now. Here&rsquo;s how to read it:
      </p>
      <ul>
        <li>
          <strong>Below 15 ng/mL:</strong> Depleted stores. You are iron
          deficient, full stop.
        </li>
        <li>
          <strong>15&ndash;30 ng/mL:</strong> Low stores. Functional
          deficiency likely, especially if you have symptoms (fatigue, brain
          fog, cold hands and feet, breathlessness on exertion). Many
          hematologists consider this range deficient even if the lab report
          marks it &ldquo;normal.&rdquo;
        </li>
        <li>
          <strong>30&ndash;100 ng/mL:</strong> Adequate. This is where most
          people feel their best. Optimal is generally considered{" "}
          <strong>40&ndash;100 ng/mL</strong> for energy, cognition, and
          exercise performance.
        </li>
        <li>
          <strong>Above 150 ng/mL:</strong> Worth investigating &mdash;
          especially if unexplained. Could indicate hemochromatosis,
          inflammation (ferritin rises as an acute-phase reactant), or
          excessive supplementation.
        </li>
      </ul>
      <p>
        One important caveat: ferritin is an acute-phase protein, meaning it
        spikes during infection, inflammation, or illness &mdash; even when
        iron stores are actually low. If you&rsquo;re sick or dealing with
        chronic inflammation, ask your doctor to also check{" "}
        <strong>transferrin saturation</strong> and{" "}
        <strong>total iron-binding capacity (TIBC)</strong> for a clearer
        picture. For help understanding what&rsquo;s actually listed on
        your supplement bottles, see our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          guide to reading supplement labels
        </a>.
      </p>

      <h2>Iron Forms: Why Your Choice Matters More Than You Think</h2>
      <p>
        Not all iron supplements are created equal, and the form you choose
        will dramatically affect both how much iron you absorb and how
        miserable you feel taking it.
      </p>
      <ul>
        <li>
          <strong>Iron bisglycinate (Ferrochel&reg;)</strong> &mdash; The
          gold standard. This chelated form wraps elemental iron in two
          glycine molecules, protecting it from interactions with other
          nutrients and food components in the gut. A 2014 study in{" "}
          <em>Current Therapeutic Research</em> (Name et al.) showed iron
          bisglycinate achieved equivalent iron repletion to ferrous sulfate
          at <em>half the dose</em>, with significantly fewer GI side
          effects. <EvidenceBadge level="strong" /> If you can find it, buy it. The branded form
          Ferrochel&reg; has the most clinical data behind it.
        </li>
        <li>
          <strong>Ferrous sulfate</strong> &mdash; The classic, cheap,
          widely prescribed form. It works &mdash; ferrous sulfate has
          decades of clinical use behind it. The problem is tolerability.
          Studies report GI side effects (nausea, constipation, cramping,
          dark stools) in <strong>30&ndash;40% of people</strong>. This is
          the supplement that gives iron its terrible reputation for stomach
          distress. If cost is the primary concern, it&rsquo;s fine. But
          a supplement you can&rsquo;t tolerate is a supplement you
          won&rsquo;t take.
        </li>
        <li>
          <strong>Ferrous fumarate</strong> &mdash; Middle ground. Slightly
          better tolerated than sulfate in some people, similar absorption.
          Contains a higher percentage of elemental iron per milligram (33%
          vs 20% for sulfate), so the pills tend to be smaller.
        </li>
        <li>
          <strong>Ferrous gluconate</strong> &mdash; Lower elemental iron
          content per tablet but generally gentler. Often used when people
          can&rsquo;t tolerate sulfate or fumarate.
        </li>
        <li>
          <strong>Carbonyl iron</strong> &mdash; Highly purified elemental
          iron particles that dissolve slowly in stomach acid. The gradual
          release makes it very well-tolerated and reduces the risk of
          accidental toxicity (particularly important in households with
          children). Absorption is somewhat lower than ferrous salts, so
          it&rsquo;s better suited for maintenance than aggressive repletion.
        </li>
        <li>
          <strong>Slow-release formulations</strong> &mdash; These are
          marketed as &ldquo;gentle&rdquo; iron, and they <em>are</em>{" "}
          easier on the stomach. The trade-off? They release iron further
          down the intestinal tract, past the primary absorption site in the
          duodenum, resulting in significantly lower bioavailability. You
          feel better taking them, but you absorb less. For mild deficiency,
          this may be acceptable. For serious repletion, it&rsquo;s not
          ideal.
        </li>
      </ul>

      <Callout variant="tip" title="Form recommendation">
        Iron bisglycinate (Ferrochel) first. Ferrous fumarate if cost matters.
        Ferrous sulfate if that&rsquo;s what your doctor prescribed and you
        tolerate it. Avoid slow-release unless GI distress is so severe that
        poor absorption beats no absorption.
      </Callout>

      <ProductCallout product={PRODUCTS["thorne-iron-bisglycinate"]} />

      <h2>The Every-Other-Day Dosing Breakthrough</h2>
      <p>
        This might be the most practically useful piece of information in
        this guide, and it comes from a study most doctors haven&rsquo;t
        read yet.
      </p>

      <Callout variant="evidence" title="The Stoffel protocol">
        In 2017, Stoffel et al. published in <em>The Lancet Haematology</em>{" "}
        that taking iron every other day resulted in{" "}
        <strong>~40% higher fractional absorption</strong> than taking it daily.
        The mechanism: hepcidin spikes after each iron dose and stays elevated
        for ~24 hours, blocking absorption of the next day&rsquo;s dose. A
        2020 follow-up confirmed these findings. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        The mechanism involves hepcidin, the master hormone regulating iron
        absorption. When you take an iron dose, hepcidin levels spike within
        6&ndash;8 hours and remain elevated for about 24 hours. While
        hepcidin is elevated, your gut actively blocks iron absorption. So
        that second daily dose? Much of it passes straight through.
      </p>
      <p>
        By spacing doses 48 hours apart, hepcidin returns to baseline
        between doses, allowing each dose to be absorbed more efficiently.
      </p>
      <p>
        <strong>Practical application:</strong> Instead of taking 60mg of
        elemental iron every day and feeling terrible, take it Monday,
        Wednesday, and Friday. You absorb more iron per dose, experience
        fewer side effects, and &mdash; counterintuitively &mdash; may
        replete your stores just as fast. This is especially useful during
        the repletion phase when doses are higher. For more on optimizing
        when you take each supplement in your stack, see our{" "}
        <a href="/guides/supplement-timing-guide">
          supplement timing guide
        </a>.
      </p>

      <h2>Absorption Boosters and Blockers</h2>
      <p>
        Iron absorption is remarkably sensitive to what you eat and drink
        around the time you take it. Getting this right can double your
        effective absorption; getting it wrong can cut it by 60% or more.
      </p>

      <InteractionGroup title="Iron absorption interactions">
        <InteractionCard
          type="synergy"
          a="Iron"
          b="Vitamin C"
          effect="Vitamin C converts non-heme iron to its more absorbable ferrous form. 100mg of vitamin C increases absorption by 4.1x (Hallberg et al., 1989)."
          recommendation="Take 200mg+ vitamin C with your iron dose. A glass of OJ or a vitamin C tablet."
        />
        <InteractionCard
          type="conflict"
          a="Iron"
          b="Calcium"
          effect="Calcium inhibits both heme and non-heme iron absorption. A 200mg calcium dose reduces iron absorption by 50-60%."
          recommendation="Separate by at least 2 hours. Take iron in the morning, calcium in the evening."
        />
        <InteractionCard
          type="conflict"
          a="Iron"
          b="Coffee / Tea"
          effect="Tannins and polyphenols bind iron in the gut. Tea reduces absorption by 60-70%, coffee by ~40%."
          recommendation="Wait at least 30 minutes after iron before coffee. Better yet, take iron at a different meal."
        />
        <InteractionCard
          type="conflict"
          a="Iron"
          b="Zinc"
          effect="At supplemental doses, zinc and iron compete for the same absorption transporters."
          recommendation="Space by at least 2 hours. Taking with food partially mitigates the competition."
        />
      </InteractionGroup>

      <h3>Take WITH:</h3>
      <ul>
        <li>
          <strong>Vitamin C</strong> &mdash; The single most effective
          absorption enhancer. Vitamin C reduces ferric iron (Fe3+) to
          ferrous iron (Fe2+), the form your gut can actually absorb. A
          classic study by Hallberg et al. (1989, <em>American Journal of
          Clinical Nutrition</em>) showed that 100mg of vitamin C taken
          alongside non-heme iron increased absorption by{" "}
          <strong>4.1x</strong>. <EvidenceBadge level="strong" /> A glass of orange juice or a 250mg vitamin
          C tablet with your iron dose is the simplest high-impact move you
          can make.
        </li>
        <li>
          <strong>Meat, fish, or poultry</strong> &mdash; Animal protein
          contains a &ldquo;meat factor&rdquo; that enhances non-heme iron
          absorption through mechanisms not fully understood. If you eat
          animal products, taking your iron supplement with a meal that
          includes some protein helps.
        </li>
      </ul>
      <h3>AVOID within 2 hours:</h3>
      <ul>
        <li>
          <strong>Calcium and dairy</strong> &mdash; Calcium inhibits both
          heme and non-heme iron absorption. This is one of the few
          nutrient interactions that affects both forms. A 200mg calcium
          dose can reduce iron absorption by up to <strong>50&ndash;60%</strong>{" "}
          (Hallberg et al., 1991, <em>American Journal of Clinical
          Nutrition</em>). <EvidenceBadge level="strong" />
        </li>
        <li>
          <strong>Coffee and tea</strong> &mdash; Tannins and polyphenols
          bind iron in the gut, forming insoluble complexes. A single cup
          of tea with a meal can reduce non-heme iron absorption by{" "}
          <strong>60&ndash;70%</strong>. Coffee is slightly less aggressive
          but still significant at 40% reduction. Morning coffee lovers:
          take your iron at lunch or dinner instead.
        </li>
        <li>
          <strong>Zinc supplements</strong> &mdash; At supplemental doses
          (not food doses), zinc and iron compete for the same absorption
          transporters. If you take both, space them by at least 2 hours.
          See our{" "}
          <a href="/guides/supplement-timing-guide">
            supplement timing guide
          </a>{" "}
          for a full scheduling framework.
        </li>
        <li>
          <strong>Antacids and PPIs</strong> &mdash; These reduce stomach
          acid, which is required to solubilize iron salts. Chronic PPI use
          is an underrecognized cause of iron deficiency.
        </li>
      </ul>

      <h2>Dosing Guidelines</h2>
      <p>
        Iron dosing depends entirely on why you&rsquo;re taking it. This
        is not a mineral where &ldquo;more is better&rdquo; logic applies.
      </p>
      <ul>
        <li>
          <strong>Maintenance (preventing deficiency):</strong>{" "}
          <strong>18&ndash;27mg elemental iron daily</strong> &mdash; appropriate
          for menstruating women, vegetarians, or others at ongoing risk.
          This covers the RDA (18mg for premenopausal women, 8mg for men
          and postmenopausal women, 27mg during pregnancy) with some
          margin for imperfect absorption.
        </li>
        <li>
          <strong>Correcting deficiency:</strong>{" "}
          <strong>60&ndash;120mg elemental iron</strong>, taken every other
          day (per the Stoffel protocol above), for 8&ndash;12 weeks.{" "}
          <em>This should be done under medical supervision</em> with
          follow-up ferritin testing to confirm repletion and avoid
          overshoot.
        </li>
        <li>
          <strong>Upper limit:</strong> The NIH Tolerable Upper Intake Level
          for iron is <strong>45mg/day</strong> for adults. Therapeutic doses
          above this are appropriate only under clinical guidance.
        </li>
      </ul>

      <Callout variant="info" title="Elemental iron vs compound weight">
        &ldquo;Elemental iron&rdquo; is not the same as the weight of the iron
        compound on the label. Ferrous sulfate is only 20% elemental iron, so a
        325mg ferrous sulfate tablet delivers about 65mg of actual iron. Always
        check how much <em>elemental</em> iron is listed. Our{" "}
        <a href="/guides/how-to-read-a-supplement-label">label reading guide</a>{" "}
        breaks this down in detail.
      </Callout>

      <h2>When to Worry: Signs of Iron Overload</h2>
      <p>
        Because iron accumulates without a natural excretion pathway,
        supplementing when you don&rsquo;t need it creates a slow-building
        problem. Early symptoms of iron overload include:
      </p>
      <ul>
        <li>Joint pain (especially in the knuckles and first two fingers)</li>
        <li>Chronic fatigue that worsens over time</li>
        <li>Abdominal pain</li>
        <li>Unexplained weight loss</li>
        <li>Bronze or gray skin discoloration</li>
      </ul>

      <Callout variant="warning" title="Hemochromatosis">
        Hereditary hemochromatosis is one of the most common genetic disorders
        in people of Northern European descent (1 in 200). Many carriers
        don&rsquo;t know they have it until organ damage has begun. If you have
        a family history or unexplained elevated ferritin, ask about HFE gene
        testing.
      </Callout>

      <p>
        Long-term iron overload damages the liver (cirrhosis), heart
        (cardiomyopathy), and pancreas (diabetes). This is precisely why the
        &ldquo;get tested first&rdquo; rule
        exists for iron and essentially no other common supplement. It
        isn&rsquo;t paternalism &mdash; it&rsquo;s biochemistry.
      </p>

      <h2>Iron and Your Multivitamin</h2>
      <p>
        Most standard multivitamins include 18mg of iron. If you&rsquo;re a
        man or postmenopausal woman with adequate iron stores, this is
        unnecessary and potentially counterproductive. This is one reason
        many high-quality multivitamins come in &ldquo;iron-free&rdquo;
        formulations &mdash; and it&rsquo;s worth seeking those out if you
        don&rsquo;t have a documented need. Our{" "}
        <a href="/guides/do-you-need-a-multivitamin">
          multivitamin guide
        </a>{" "}
        covers how to choose the right formulation for your situation. And
        if you&rsquo;re thinking about where iron fits in a broader supplement
        routine, our{" "}
        <a href="/guides/how-to-build-a-supplement-stack">
          stack-building guide
        </a>{" "}
        walks through prioritization.
      </p>

      <ProductRow
        title="Iron repletion stack"
        products={[
          PRODUCTS["thorne-iron-bisglycinate"],
          PRODUCTS["megafood-blood-builder"],
        ]}
      />

      <h2>Who Should Talk to a Doctor First</h2>
      <p>
        Iron supplementation is well-studied and straightforward for otherwise healthy adults with confirmed deficiency. But several populations face absorption challenges, interaction risks, or diagnostic complexity that make clinical guidance essential before starting — or continuing — a protocol.
      </p>

      <Callout variant="warning" title="If you have inflammatory bowel disease (Crohn's or ulcerative colitis)">
        Standard oral iron may worsen intestinal inflammation and is often poorly tolerated in IBD. IV iron is frequently required instead. Talk to your gastroenterologist before supplementing orally.
      </Callout>

      <Callout variant="warning" title="If you take PPIs or H2 blockers long-term">
        The guide notes that PPIs reduce the stomach acid needed to solubilize iron salts. If you're on chronic acid suppression, discuss whether a chelated form, adjusted dosing, or more frequent ferritin monitoring is appropriate with your provider.
      </Callout>

      <Callout variant="warning" title="If you're a postmenopausal woman with unexplained fatigue">
        The guide groups postmenopausal women with men at 8mg RDA, but iron deficiency can still develop from GI bleeding, malabsorption, or prior depletion. Don't assume you're in the "no supplementation needed" camp without current ferritin testing.
      </Callout>

      <Callout variant="warning" title="If you're 65 or older">
        Aging reduces stomach acid, increases GI bleeding risk (especially with NSAID or aspirin use), and complicates ferritin interpretation — elevated ferritin may reflect inflammation rather than adequate stores. Talk to your provider before self-supplementing.
      </Callout>

      <Callout variant="warning" title="If you have celiac disease or suspected gluten intolerance">
        Duodenal villous atrophy impairs iron absorption at the primary uptake site. If you've supplemented consistently without ferritin improvement, discuss celiac screening with your doctor — it's a leading cause of iron deficiency that doesn't respond to oral supplementation.
      </Callout>

      <Callout variant="warning" title="If you're an endurance athlete adjusting your own protocol">
        The guide identifies athletes as high-risk but your ferritin targets and timing considerations may differ from the general population. Consult a sports medicine provider to set appropriate targets and coordinate supplementation timing with training loads.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list — including what you're considering — to your next provider visit.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Why does iron cause constipation and dark stools?</h3>
      <p>
        Unabsorbed iron in the gut has two effects. First, it feeds
        iron-loving bacteria that shift the microbial balance and slow
        intestinal motility, leading to constipation. Second, iron reacts
        with hydrogen sulfide in the colon to form iron sulfide, which is
        black &mdash; hence the dark stools. Both effects are dose-dependent
        and more common with ferrous sulfate than chelated forms like iron
        bisglycinate. Switching to bisglycinate, reducing the dose, or
        moving to every-other-day dosing usually resolves these issues. If
        constipation persists, adding magnesium (which has a mild laxative
        effect) at a different time of day can help counterbalance it.
      </p>

      <h3>Can I take iron and calcium at the same time?</h3>
      <p>
        You shouldn&rsquo;t. Calcium inhibits iron absorption at both the
        heme and non-heme level &mdash; a 200mg calcium dose can reduce iron
        uptake by 50&ndash;60%. This includes calcium from dairy products,
        not just supplements. Space iron and calcium by at least{" "}
        <strong>2 hours</strong>. A common strategy is to take iron in the
        morning with vitamin C and calcium in the evening, or vice versa.
        See our{" "}
        <a href="/guides/supplement-timing-guide">
          supplement timing guide
        </a>{" "}
        for specific scheduling recommendations.
      </p>

      <h3>How long does it take to correct iron deficiency?</h3>
      <p>
        Most people notice symptom improvement (reduced fatigue, better
        exercise tolerance, clearer thinking) within{" "}
        <strong>2&ndash;4 weeks</strong> of starting supplementation as
        hemoglobin begins to rise. However, fully repleting ferritin stores
        typically takes <strong>3&ndash;6 months</strong> of consistent
        supplementation. Don&rsquo;t stop early just because you feel
        better &mdash; your hemoglobin recovers long before your storage
        iron does. Get follow-up ferritin testing at 8&ndash;12 weeks to
        track progress and adjust dosing.
      </p>

      <h3>Is heme iron from supplements better than non-heme?</h3>
      <p>
        Heme iron supplements (derived from bovine hemoglobin) do absorb
        better &mdash; at roughly <strong>15&ndash;35%</strong> versus
        2&ndash;20% for non-heme forms. They&rsquo;re also less affected
        by food interactions (phytates, tannins, calcium). However, some
        research suggests that heme iron may increase oxidative stress and
        has been associated with slightly elevated colorectal cancer risk
        at very high intakes. For most people correcting a deficiency,
        well-absorbed non-heme forms like iron bisglycinate provide an
        excellent balance of efficacy, tolerability, and safety. Heme
        iron supplements are a reasonable option for people who cannot
        tolerate any non-heme form.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Iron is the supplement that demands the most respect. Unlike
        virtually everything else on the shelf, taking it when you
        don&rsquo;t need it can cause real harm. But for the millions of
        people who <em>do</em> need it &mdash; menstruating women,
        vegetarians, endurance athletes, pregnant women &mdash; getting iron
        right can be transformative. The fatigue lifts. The brain fog
        clears. Workouts stop feeling impossibly hard.
      </p>
      <p>
        The protocol: <strong>get ferritin tested first</strong>. If
        depleted, use <strong>iron bisglycinate (Ferrochel&reg;)</strong>,{" "}
        <strong>every other day</strong>, taken with{" "}
        <strong>vitamin C</strong> and away from calcium, coffee, and tea.
        Retest at 8&ndash;12 weeks. Stop supplementing once stores are
        replete unless you have an ongoing reason to continue.
      </p>
      <p>
        It&rsquo;s not complicated. But it does require you to test first
        and pay attention to what you&rsquo;re doing &mdash; which is
        exactly how responsible supplementation should work.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog?q=iron">
          Compare iron supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
