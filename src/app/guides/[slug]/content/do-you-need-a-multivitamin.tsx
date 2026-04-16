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

export function DoYouNeedMultivitamin() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "A 2024 JAMA meta-analysis of 700,000+ participants found no significant mortality reduction from multivitamins",
          "The format forces underdosing — you can't fit clinical doses of 25+ nutrients into 1-2 pills",
          "Targeted supplementation of your actual gaps (usually vitamin D, magnesium, omega-3) is more effective at the same cost",
          "Multivitamins still make sense for restricted diets, pregnancy, older adults, or people who won't take multiple bottles",
        ]}
      />

      <p>
        Most people don&rsquo;t need a multivitamin if they eat a reasonably
        varied diet. The clinical evidence on multivitamins is surprisingly
        mixed, in part because cramming 25+ nutrients into one or two small
        pills guarantees most are underdosed. One in three American adults
        takes one daily, but a targeted approach &mdash; supplementing
        specific documented gaps &mdash; is more effective for most people.
      </p>

      <h2>What the Largest Studies Actually Found</h2>
      <p>
        The multivitamin has been studied extensively. The results are
        &hellip; underwhelming:
      </p>
      <ul>
        <li>
          <strong>The Physicians&rsquo; Health Study II (2012):</strong>{" "}
          14,641 male physicians, followed for over a decade. Daily
          multivitamin use showed a modest 8% reduction in total cancer
          incidence. No significant effect on cardiovascular disease, stroke,
          or cognitive decline. An 8% cancer reduction sounds good until you
          realize the absolute risk reduction was tiny &mdash; about 1 fewer
          cancer per 1,000 men per year. <EvidenceBadge level="strong" />
        </li>
        <li>
          <strong>COSMOS-Mind (2022):</strong> A substudy found that daily
          multivitamin use was associated with slowed cognitive aging &mdash;
          roughly 1.8 years of preserved memory function over 3 years.
          This was legitimately interesting, but it was a secondary endpoint
          in a larger trial, and the effect needs replication. <EvidenceBadge level="moderate" />
        </li>
        <li>
          <strong>JAMA Network Open meta-analysis (2024):</strong> Pooled
          data from 20 studies and over 700,000 participants. Result: no
          significant reduction in all-cause mortality from multivitamin use.
          Zero. <EvidenceBadge level="strong" />
        </li>
      </ul>

      <Callout variant="info" title="The verdict">
        Multivitamins probably aren&rsquo;t hurting you. They might help
        marginally with cancer risk and cognitive aging. But they&rsquo;re
        not the health insurance policy most people believe them to be.
      </Callout>

      <h2>Why the Format Itself Is the Problem</h2>
      <p>
        The issue isn&rsquo;t that multivitamins are bad. It&rsquo;s that
        the concept has unavoidable physics and chemistry limitations:
      </p>

      <h3>Problem 1: Everything Is Underdosed</h3>
      <p>
        A single capsule can hold roughly 500&ndash;800mg of material.
        Now try to fit 25+ ingredients in there at clinical doses:
      </p>
      <ul>
        <li>Magnesium alone needs 300&ndash;400mg for a therapeutic dose</li>
        <li>Calcium needs 500&ndash;1,000mg</li>
        <li>Fish oil needs 1,000&ndash;2,000mg</li>
      </ul>

      <Callout variant="warning" title="The physics problem">
        It&rsquo;s literally impossible to fit clinical doses of 25+ nutrients
        into 1&ndash;2 capsules. You end up with 50mg of magnesium (need
        300+), a token 25mg of CoQ10 (clinical dose is 100&ndash;200mg), and
        trace amounts of specialty ingredients that are pure label decoration.
      </Callout>

      <p>
        Check the{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          supplement label guide
        </a>{" "}
        for how to spot underdosed ingredients.
      </p>

      <h3>Problem 2: Minerals Fight Each Other</h3>
      <p>
        Calcium reduces <a href="/guides/iron-guide">iron</a> absorption by up to 60%. <a href="/guides/zinc-guide">Zinc</a> and copper
        compete. Magnesium and calcium interfere at high doses. Putting all
        these minerals in one pill and swallowing them together is like
        shipping two rival packages in the same box and hoping they both
        arrive intact.
      </p>

      <InteractionGroup title="Mineral conflicts inside your multivitamin">
        <InteractionCard
          type="conflict"
          a="Calcium"
          b="Iron"
          effect="Calcium reduces iron absorption by 50-60%. In a multivitamin, they arrive at the same transporter simultaneously."
          recommendation="This is why targeted supplementation with proper timing is more effective than a multi."
        />
        <InteractionCard
          type="conflict"
          a="Zinc"
          b="Copper"
          effect="Chronic zinc supplementation depletes copper. Many multivitamins include zinc but insufficient copper to compensate."
          recommendation="Look for multis with a zinc-to-copper ratio of roughly 10:1 to 15:1."
        />
      </InteractionGroup>

      <p>
        This is why our{" "}
        <a href="/guides/supplement-timing-guide">timing guide</a> recommends
        separating competing minerals &mdash; something a multivitamin
        structurally cannot do.
      </p>

      <h3>Problem 3: Cheapest Forms to Cut Costs</h3>
      <p>
        To keep the per-bottle price competitive, many multivitamins use the
        cheapest forms of each nutrient: magnesium oxide (4% absorption),
        cyanocobalamin (synthetic B12), folic acid (can&rsquo;t be converted
        by 40% of people), vitamin D2 (less effective than D3).
      </p>
      <p>
        You&rsquo;re paying for the ingredient on the label, but your body
        may only absorb a fraction of it.
      </p>

      <h3>Problem 4: One Size Fits Nobody</h3>
      <p>
        A 25-year-old female distance runner and a 60-year-old sedentary
        man have radically different nutritional needs. She probably needs
        more iron and folate. He probably doesn&rsquo;t need iron at all
        (excess iron is harmful for men and postmenopausal women). Yet
        they&rsquo;re buying the same generic multivitamin.
      </p>

      <h2>What the Deficiency Numbers Actually Look Like</h2>
      <p>
        NHANES (the CDC&rsquo;s National Health and Nutrition Examination
        Survey) tracks US nutrient intake across decades. When people argue
        for multivitamins, they cite the population-level gaps. When people
        argue against, they cite the same data. Here&rsquo;s what the numbers
        show, and why both sides are partly right:
      </p>
      <ul>
        <li>
          <strong>Vitamin D:</strong> Roughly 40% of US adults have serum 25(OH)D
          below 20 ng/mL (deficient). Closer to 70% are below 30 ng/mL
          (insufficient). This is the single most common fixable micronutrient
          gap in the US.
        </li>
        <li>
          <strong>Magnesium:</strong> Roughly 48% of Americans consume below
          the EAR (estimated average requirement) from food. Subclinical
          deficiency is common and correlates with poor sleep, cramping, and
          glucose dysregulation.
        </li>
        <li>
          <strong>Vitamin B12:</strong> ~6% of adults under 60 are deficient;
          ~20% of adults over 60 are at least marginally deficient due to
          age-related reductions in intrinsic factor.
        </li>
        <li>
          <strong>Iron:</strong> ~10% of premenopausal women are iron-deficient;
          ~4% have iron-deficiency anemia. Negligible in men and postmenopausal
          women.
        </li>
        <li>
          <strong>Folate, riboflavin, thiamine, vitamin A, vitamin C:</strong>
          Frank deficiency is rare in the US outside of alcohol use disorder,
          bariatric surgery, or severely restrictive diets. Food fortification
          handles most of these.
        </li>
      </ul>
      <p>
        The pattern: a handful of nutrients are common gaps; most aren&rsquo;t.
        A multivitamin covers all of them generically, which means you&rsquo;re
        paying to fix things that weren&rsquo;t broken. Targeted supplementation
        of the 3&ndash;4 that actually matter for your profile is cheaper and
        more effective.
      </p>

      <h2>When a Multivitamin Actually Makes Sense</h2>
      <p>
        Despite everything above, there are real scenarios where a daily
        multivitamin is the right call:
      </p>
      <ul>
        <li>
          <strong>Restricted diets.</strong> If you&rsquo;re vegan,
          vegetarian, or have significant food allergies, you likely have
          multiple nutrient gaps (B12, iron, zinc, omega-3). A quality
          multi partially fills those gaps. It&rsquo;s not optimal, but
          it&rsquo;s better than nothing.
        </li>
        <li>
          <strong>Pregnancy.</strong> Prenatal vitamins are a specific type of
          multivitamin with real clinical evidence. Adequate folate, iron,
          DHA, and choline during pregnancy is non-negotiable, and a
          well-formulated prenatal delivers these.
        </li>
        <li>
          <strong>Older adults.</strong> B12 absorption decreases with age.
          Vitamin D requirements increase. Appetite often decreases. A
          senior-specific multi addresses age-related gaps that food alone
          may not cover.
        </li>
        <li>
          <strong>People who won&rsquo;t take multiple supplements.</strong>{" "}
          This is the most honest reason. If the alternative to a
          multivitamin is nothing &mdash; because you won&rsquo;t take 5
          separate bottles &mdash; then a multi at suboptimal doses beats 5
          optimal supplements collecting dust. Compliance always wins.
        </li>
        <li>
          <strong>Food insecurity or consistently poor diet.</strong> If
          someone rarely eats fruits, vegetables, or whole foods, a
          multivitamin provides a minimal nutritional floor. It&rsquo;s not
          a replacement for food quality, but it&rsquo;s a harm reduction
          measure.
        </li>
      </ul>

      <Callout variant="tip" title="The compliance rule">
        If the alternative to a multivitamin is taking nothing, a multi at
        suboptimal doses still beats 5 optimal supplements collecting dust.
        Compliance always wins.
      </Callout>

      <h2>The Better Alternative: Targeted Supplementation</h2>
      <p>
        For most people with a reasonably varied diet, the smarter approach
        is identifying your specific gaps and supplementing those individually
        at clinical doses:
      </p>

      <h3>Step 1: Track What You Actually Eat</h3>
      <p>
        Use a food tracker for one week. Most people discover they&rsquo;re
        short on 2&ndash;4 specific nutrients, not all 25. The most common
        gaps in American diets: vitamin D, magnesium, omega-3, and sometimes
        B12 (especially for people over 50 or on plant-based diets).
      </p>

      <h3>Step 2: Get Bloodwork</h3>
      <p>
        Four tests that reveal the most actionable information:
      </p>
      <ul>
        <li><strong>Vitamin D (25-hydroxyvitamin D):</strong> Optimal range is 40&ndash;60 ng/mL. About 42% of Americans are below 20 ng/mL.</li>
        <li><strong>B12:</strong> Especially important if you&rsquo;re over 50, vegetarian/vegan, or on metformin.</li>
        <li><strong>Ferritin (iron stores):</strong> Critical for menstruating women. Can be depleted even when hemoglobin looks normal.</li>
        <li><strong>RBC Magnesium:</strong> The intracellular test, not serum magnesium. You may need to specifically request this one.</li>
      </ul>

      <h3>Step 3: Supplement the Gaps</h3>
      <p>
        Buy individual supplements at clinical doses in bioavailable forms.
        Separate competing minerals by timing. This approach costs about the
        same as a quality multivitamin ($30&ndash;50/month) but delivers
        far more effective dosing of the nutrients your body actually needs.
      </p>
      <p>
        For most people, the targeted stack ends up being surprisingly
        simple: <a href="/guides/best-vitamin-d-supplements">vitamin D3</a> + K2, <a href="/guides/best-magnesium-supplements">magnesium glycinate</a>, and <a href="/guides/best-omega-3-supplements">omega-3</a>. Maybe
        <a href="/guides/vitamin-b12-guide">B12</a> if bloodwork shows low levels. That&rsquo;s it. Three to four
        supplements at proper doses instead of 25 at token doses. (See our{" "}
        <a href="/guides/beginner-longevity-supplement-stack">
          longevity stack guide
        </a>{" "}
        for a complete starter protocol.)
      </p>

      <ProductRow
        title="The targeted stack most people actually need"
        products={[
          PRODUCTS["thorne-vitamin-d-5000"],
          PRODUCTS["thorne-magnesium-bisglycinate"],
          PRODUCTS["thorne-omega-3-coq10"],
          PRODUCTS["thorne-b-complex-12"],
        ]}
      />

      <h2>If You Do Choose a Multivitamin: What to Look For</h2>
      <p>
        Not all multis are created equal. The difference between a good
        one and a waste of money:
      </p>
      <ul>
        <li>
          <strong>Methylated B vitamins:</strong> Methylcobalamin (B12),
          methylfolate (folate), pyridoxal-5-phosphate (B6). Not their
          cheap synthetic counterparts.
        </li>
        <li>
          <strong>Vitamin D3, not D2:</strong> D3 raises blood levels
          meaningfully more effectively.
        </li>
        <li>
          <strong>Chelated minerals:</strong> Glycinate, citrate, or malate
          forms instead of oxides and carbonates. Yes, they cost more. Yes,
          you absorb them.
        </li>
        <li>
          <strong>No iron (unless you specifically need it):</strong> Iron is
          one of the few supplements that&rsquo;s harmful in excess. Most men
          and postmenopausal women get enough from diet. Iron should only be
          supplemented based on bloodwork &mdash; never blindly.
        </li>
        <li>
          <strong>Third-party tested:</strong> USP, NSF, or Informed Sport
          certification means someone independent verified the contents.
        </li>
        <li>
          <strong>Realistic serving size:</strong> A quality multi that
          delivers meaningful doses will likely require 2&ndash;4 capsules per
          serving. A one-pill-a-day multivitamin is almost certainly
          underdosed. If one capsule claims to contain everything you need,
          the physics don&rsquo;t add up.
        </li>
      </ul>

      <Callout variant="tip" title="The one-pill test">
        If a multivitamin claims to deliver everything you need in a single
        pill, the physics don&rsquo;t add up. Quality multis require 2&ndash;4
        capsules per serving to fit meaningful doses. One pill = guaranteed
        underdosing.
      </Callout>

      <ProductCallout product={PRODUCTS["thorne-advanced-nutrients"]} />

      <h2>Who Should Talk to a Doctor First</h2>
      <p>
        Whether you stick with a multivitamin or move to a targeted stack, certain populations face drug interactions, absorption issues, or shifting nutrient needs that generic advice can't safely address. If any of the following apply to you, get clinical input before changing your supplement routine.
      </p>

      <Callout variant="warning" title="If you take prescription medications">
        Metformin can deplete B12 over time. PPIs reduce absorption of both B12 and magnesium. Warfarin interacts dangerously with vitamin K — including the K found in many multivitamins. Oral contraceptives can affect B6, folate, and zinc status. Bring your full medication and supplement list to your provider so they can flag overlaps.
      </Callout>

      <Callout variant="warning" title="If you are postmenopausal">
        The guide notes that postmenopausal women should avoid supplemental iron, but calcium, vitamin D, and vitamin K2 needs also shift after menopause — and calcium supplementation carries its own cardiovascular controversy. Talk to your healthcare provider about bone-health testing before adding or removing anything.
      </Callout>

      <Callout variant="warning" title="If you have Crohn's, celiac disease, or have had bariatric surgery">
        Absorption disorders can create severe multi-nutrient deficiencies that standard oral doses won't fix. You may need higher doses, sublingual forms, or clinical monitoring that goes well beyond any over-the-counter multivitamin. Work with a provider who knows your surgical or GI history.
      </Callout>

      <Callout variant="warning" title="If you are pregnant or planning pregnancy">
        The guide recommends a quality prenatal, but folate form matters — and individual needs for iron, DHA, and choline vary. Talk to your OB or midwife about which prenatal formulation fits your bloodwork and health history.
      </Callout>

      <Callout variant="warning" title="If you are over 60">
        B12 absorption declines with age due to reduced intrinsic factor, and vitamin D requirements increase. The guide flags these gaps, but the right form and dose — oral vs. sublingual B12, for example — depends on your labs. Ask your provider to check 25(OH)D and B12 levels before supplementing.
      </Callout>

      <Callout variant="warning" title="If you are a competitive or endurance athlete">
        High training loads increase iron losses (especially in female runners), magnesium depletion through sweat, and B-vitamin turnover. These needs differ meaningfully from the general population. Talk to a sports-medicine provider or dietitian before building your stack.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list — including what you're considering — to your next provider visit.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Can a multivitamin hurt me?</h3>
      <p>
        Unlikely at standard doses. The main risk is unnecessary iron intake
        for people who don&rsquo;t need it (men, postmenopausal women), and
        excessive vitamin A (retinol) in some formulas. Fat-soluble vitamins
        (A, D, E, K) can accumulate, but this is rarely an issue at
        multivitamin doses. If you take other supplements alongside a multi,
        check for overlap to avoid exceeding tolerable upper limits.
      </p>

      <h3>Should kids take a multivitamin?</h3>
      <p>
        The AAP doesn&rsquo;t recommend routine multivitamins for children
        with balanced diets. For picky eaters, a children&rsquo;s multi can
        fill gaps. The most common pediatric deficiency worth supplementing
        is vitamin D &mdash; the AAP recommends 400 IU/day for infants and
        600 IU for children, and most kids don&rsquo;t get this from food
        alone.
      </p>

      <h3>What about prenatal vitamins?</h3>
      <p>
        Different category entirely. Prenatals have specific evidence for
        folate (neural tube defect prevention), iron (increased blood volume),
        DHA (fetal brain development), and choline (often underdosed even
        in prenatals). If you&rsquo;re pregnant or planning pregnancy, a
        quality prenatal is recommended by every major medical
        organization.
      </p>

      <h3>I feel better when I take my multivitamin. Isn&rsquo;t that evidence enough?</h3>
      <p>
        It might be. If you have genuine nutritional deficiencies (common),
        even suboptimal doses can make a noticeable difference. It could also
        be placebo, which isn&rsquo;t nothing &mdash; the placebo effect is
        real and measurable. The question isn&rsquo;t whether you feel
        better, but whether targeted supplementation would make you feel
        even better at the same or lower cost.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Multivitamins aren&rsquo;t bad. They&rsquo;re just not what most
        people think they are. The format forces compromises that make nearly
        every ingredient either underdosed, poorly absorbed, or in
        competition with something else in the same pill.
      </p>
      <p>
        For most people, the better play is simple: get bloodwork, identify
        your actual gaps (usually vitamin D, magnesium, omega-3), and
        supplement those individually at proper doses. It&rsquo;s more
        effective, roughly the same cost, and you&rsquo;re not paying for 20
        ingredients your body doesn&rsquo;t need.
      </p>
      <p>
        If you value simplicity above optimization and the alternative is
        taking nothing, a quality multivitamin is still a reasonable choice.
        Just don&rsquo;t mistake it for comprehensive coverage.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog">
          Explore individually scored supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
