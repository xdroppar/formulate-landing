import {
  TLDRBox,
  Callout,
  ProductCallout,
  ProductRow,
  InteractionCard,
  InteractionGroup,
  ScheduleTable,
  EvidenceBadge,
  PRODUCTS,
} from "@/components/guide";

export function HowToBuildStack() {
  return (
    <>
      <TLDRBox
        readTime="12 min read"
        takeaways={[
          "Start with bloodwork (vitamin D, magnesium, omega-3 index, B12, iron) — fixing deficiencies beats any exotic supplement",
          "Foundation stack: D3+K2, omega-3, magnesium glycinate, creatine — covers the biggest gaps for ~$2/day",
          "Add one supplement at a time with 1–2 weeks between additions to isolate effects",
          "If you're spending $200+/month, you're almost certainly taking redundant products",
        ]}
      />

      <p>
        Building a supplement stack is a systematic process: identify your
        actual needs, start with the highest-evidence basics like creatine
        and vitamin D, layer in goal-specific compounds, and cut everything
        that wastes money. The key is prioritizing supplements with strong
        research support over influencer-endorsed megadoses &mdash; then
        adding only what targets your specific goals and deficiencies.
      </p>

      <h2>Step 1: Start With Deficiencies, Not Desires</h2>

      <Callout variant="tip" title="The highest-ROI move in supplementation">
        Get bloodwork. Fixing a real deficiency produces dramatically more
        noticeable results than any exotic compound ever will. A $100 blood
        panel tells you more than a $250/month supplement haul.
      </Callout>

      <p>
        This is the single most important principle, and almost everyone
        gets it backwards. People start by googling &ldquo;best supplements
        for energy&rdquo; or &ldquo;best supplements for focus&rdquo; when
        the most impactful thing they could do is check whether they&rsquo;re
        deficient in basic nutrients.
      </p>
      <p>
        Get bloodwork. Specifically, ask your doctor (or use a direct-to-consumer
        lab service) to test:
      </p>
      <ul>
        <li>
          <strong>Vitamin D (25-hydroxyvitamin D):</strong> 42% of US
          adults are deficient according to a 2011 study in{" "}
          <em>Nutrition Research</em> (Forrest &amp; Stuhldreher). <EvidenceBadge level="strong" /> If
          you&rsquo;re indoors most of the day, live above the 37th
          parallel, or have darker skin, your odds of deficiency are even
          higher. Optimal range: 40&ndash;60 ng/mL.
        </li>
        <li>
          <strong>Magnesium (RBC magnesium, not serum):</strong> Standard
          serum magnesium is a poor marker &mdash; it reflects only 1% of
          total body magnesium. RBC magnesium is more informative. Roughly
          50% of adults are below optimal intake. Our{" "}
          <a href="/guides/signs-you-are-magnesium-deficient">
            magnesium deficiency guide
          </a>{" "}
          covers the symptoms and testing in detail.
        </li>
        <li>
          <strong><a href="/guides/best-omega-3-supplements">Omega-3</a> index:</strong> Measures EPA+DHA in red blood
          cell membranes. Optimal is above 8%. Most people eating a
          standard Western diet land at 4&ndash;5%, which is associated
          with higher cardiovascular risk.
        </li>
        <li>
          <strong><a href="/guides/vitamin-b12-guide">B12</a>:</strong> Especially critical if you eat little or
          no meat. Serum B12 can miss early depletion &mdash;
          methylmalonic acid (MMA) is the more sensitive marker.
        </li>
        <li>
          <strong><a href="/guides/iron-guide">Iron</a> / ferritin:</strong> Particularly relevant for
          women, endurance athletes, and vegetarians. But here&rsquo;s
          a crucial distinction: <strong>never supplement iron without
          testing first</strong>. Excess iron is harmful and
          pro-oxidative. This is one case where blind supplementation can
          genuinely backfire.
        </li>
      </ul>

      <Callout variant="warning" title="Never supplement iron without testing">
        Unlike most supplements, excess iron is actively harmful and
        pro-oxidative. Always get ferritin levels tested before starting
        iron supplementation.
      </Callout>

      <p>
        This step alone will tell you more about what your body needs than
        any quiz, influencer, or supplement company marketing page. It&rsquo;s
        the highest-ROI move in supplementation.
      </p>

      <h2>Step 2: Build the Foundation (The Evidence-Based Basics)</h2>
      <p>
        Once you know your levels, these four supplements have the broadest
        evidence base for general health in the modern population. Think of
        them as covering the most common gaps in a typical diet and
        lifestyle.
      </p>

      <h3>Vitamin D3 + K2</h3>
      <p>
        Even if your levels aren&rsquo;t clinically deficient, maintaining
        optimal vitamin D (40&ndash;60 ng/mL) is associated with better
        immune function, bone density, mood regulation, and reduced
        all-cause mortality in observational studies. <EvidenceBadge level="strong" /> Dose: 2,000&ndash;5,000
        IU daily, adjusted based on bloodwork. Always pair with K2
        (MK-7 form, 100&ndash;200mcg) &mdash; K2 directs calcium into
        bones and teeth rather than arteries and soft tissue.
      </p>
      <p>
        Take with a meal containing fat. Vitamin D is fat-soluble and
        absorbs poorly on an empty stomach. For more context on whether a
        multivitamin covers this, see our{" "}
        <a href="/guides/do-you-need-a-multivitamin">
          multivitamin guide
        </a>.
      </p>

      <ProductCallout product={PRODUCTS["thorne-vitamin-d-k2"]} />

      <h3>Omega-3 (EPA + DHA)</h3>
      <p>
        Target 1,000&ndash;2,000mg combined EPA+DHA daily (not total fish
        oil &mdash; read the label for EPA and DHA specifically). The
        evidence spans cardiovascular health, cognitive function,
        inflammatory markers, and mood. A 2019 meta-analysis in the{" "}
        <em>Journal of the American Heart Association</em> found that
        marine omega-3 supplementation reduced cardiovascular events by
        8% with stronger effects at higher doses. <EvidenceBadge level="strong" />
      </p>
      <p>
        Quality matters here more than with most supplements. Look for
        products that disclose total oxidation values (TOTOX) and use
        molecular distillation. Rancid fish oil is worse than no fish oil.
      </p>

      <ProductCallout product={PRODUCTS["thorne-super-epa-pro"]} />

      <h3>Magnesium Glycinate</h3>
      <p>
        200&ndash;400mg elemental magnesium in the evening. Supports sleep,
        muscle function, stress response, and over 300 enzymatic processes.
        The glycinate form is preferred because it&rsquo;s well-absorbed,
        doesn&rsquo;t cause GI distress, and the glycine component has its
        own benefits (particularly for sleep). Our{" "}
        <a href="/guides/signs-you-are-magnesium-deficient">
          magnesium deficiency guide
        </a>{" "}
        goes deeper on forms and dosing.
      </p>

      <ProductCallout product={PRODUCTS["thorne-magnesium-bisglycinate"]} />

      <h3>Creatine Monohydrate</h3>
      <p>
        3&ndash;5g daily. Yes, even if you don&rsquo;t lift weights.
        Creatine is the most researched supplement in sports nutrition with
        over 500 studies, but the emerging evidence for cognitive function
        is what makes it a foundation-tier supplement for everyone. A 2018
        systematic review in <em>Experimental Gerontology</em> found
        cognitive benefits in older adults, and studies in younger
        populations show improvements under sleep deprivation and mental
        stress. <EvidenceBadge level="strong" />
      </p>

      <ProductCallout product={PRODUCTS["thorne-creatine"]} />

      <Callout variant="info" title="Foundation stack cost">
        These four supplements cover the most common nutritional gaps in a
        modern diet. Total cost with quality brands: roughly $1.50&ndash;$2.00
        per day, or about $45&ndash;$60 per month.
      </Callout>

      <ScheduleTable
        title="Foundation stack daily schedule"
        slots={[
          {
            emoji: "🍳",
            label: "Morning",
            time: "With breakfast (fat-containing)",
            color: "#F59E0B",
            supplements: [
              "Vitamin D3+K2 (2,000–5,000 IU D3 + 100mcg K2)",
              "Omega-3 (1,000mg EPA+DHA)",
              "Creatine (5g in water or coffee)",
            ],
            note: "Fat-soluble vitamins need fat for absorption — eggs, avocado, nuts",
          },
          {
            emoji: "😴",
            label: "Evening",
            time: "With dinner or before bed",
            color: "#6366F1",
            supplements: [
              "Magnesium glycinate (200–400mg elemental)",
            ],
            note: "Calming effect supports sleep — take 30–60 min before bed for best results",
          },
        ]}
      />

      <h2>Step 3: Add Goal-Specific Supplements</h2>

      <Callout variant="tip" title="Foundation first, goals second">
        Only after your foundation is solid should you consider targeted
        supplements. <a href="/guides/ashwagandha-guide">Ashwagandha</a> is sexier than vitamin D, but vitamin D
        deficiency is probably affecting your energy more than ashwagandha
        ever will.
      </Callout>

      <h3>For Better Sleep</h3>
      <ul>
        <li>L-Theanine: 200mg before bed</li>
        <li>Glycine: 3g before bed</li>
        <li>Magnesium glycinate (already in your foundation)</li>
      </ul>

      <ProductRow
        title="Sleep additions"
        products={[
          PRODUCTS["nootropics-depot-l-theanine"],
          PRODUCTS["thorne-glycine"],
        ]}
      />

      <p>
        Full protocol with dosing and timing in our{" "}
        <a href="/guides/supplement-timing-guide">
          supplement timing guide
        </a>.
      </p>

      <h3>For Exercise Performance</h3>
      <ul>
        <li>Creatine (already in your foundation)</li>
        <li>L-Citrulline: 6&ndash;8g, 30&ndash;60 min before training</li>
        <li>Beta-alanine: 3.2g daily</li>
        <li>Caffeine: 200&ndash;400mg before training (optional)</li>
      </ul>

      <ProductRow
        title="Performance additions"
        products={[
          PRODUCTS["thorne-beta-alanine"],
          PRODUCTS["nootropics-depot-taurine"],
        ]}
      />

      <h3>For Cognitive Function</h3>
      <ul>
        <li>Omega-3 (already in your foundation &mdash; emphasize DHA)</li>
        <li>Creatine (already in your foundation)</li>
        <li>Magnesium L-threonate: 144mg elemental (the form that crosses the blood-brain barrier most efficiently)</li>
        <li>Lion&rsquo;s Mane: 500&ndash;1,000mg (emerging evidence for nerve growth factor stimulation) <EvidenceBadge level="emerging" /></li>
      </ul>

      <ProductCallout product={PRODUCTS["nootropics-depot-cognizin"]} />

      <h3>For Longevity</h3>
      <ul>
        <li>NR or NMN: 300&ndash;500mg (NAD+ precursors, active area of research) <EvidenceBadge level="emerging" /></li>
        <li>CoQ10: 100&ndash;200mg (mitochondrial function, especially relevant after age 40) <EvidenceBadge level="moderate" /></li>
        <li>Quercetin: 500&ndash;1,000mg (senolytic properties, early but promising research) <EvidenceBadge level="emerging" /></li>
      </ul>

      <ProductCallout product={PRODUCTS["thorne-coq10"]} />

      <p>
        For a complete longevity-focused protocol, see our{" "}
        <a href="/guides/beginner-longevity-supplement-stack">
          beginner longevity stack guide
        </a>.
      </p>

      <h2>Step 4: Avoid the Most Common Mistakes</h2>

      <Callout variant="warning" title="Add one supplement at a time">
        If you start 6 supplements on the same day and feel different (better
        or worse), you have no idea which one is responsible. Add one at a time,
        give each 1&ndash;2 weeks before adding the next.
      </Callout>

      <h3>Not Checking Actual Doses</h3>
      <p>
        A product that says &ldquo;Magnesium 500mg&rdquo; might contain
        500mg of magnesium glycinate, which delivers only ~70mg of
        elemental magnesium. A vitamin D product listing &ldquo;2000
        IU&rdquo; per serving might have a serving size of 2 capsules.
        Always check the dose per serving <em>and</em> the serving size.
        Our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          label reading guide
        </a>{" "}
        breaks down exactly what to look for.
      </p>

      <Callout variant="warning" title="Influencer stacks are paid endorsements">
        When someone with a large following recommends 15 supplements, they
        are almost certainly being paid by at least some of those brands.
        Financial incentive &mdash; not evidence &mdash; is driving the
        selection. Build your stack from the research, not from someone&rsquo;s
        affiliate page.
      </Callout>

      <h3>Ignoring Interactions and Redundancy</h3>

      <InteractionGroup title="Common stacking mistakes">
        <InteractionCard
          type="conflict"
          a="Calcium"
          b="Iron"
          effect="Taking a multivitamin, standalone vitamin D, and calcium-D combo can result in triple-dosing vitamin D. Calcium inhibits iron absorption when taken together."
          recommendation="Track total intake across ALL products. Separate calcium and iron by 2+ hours."
        />
        <InteractionCard
          type="conflict"
          a="Fat-soluble vitamins"
          b="Empty stomach"
          effect="Vitamins D, E, K, and A need dietary fat for absorption. Taking them fasted wastes your money."
          recommendation="Always take fat-soluble vitamins with a meal containing fat."
        />
        <InteractionCard
          type="synergy"
          a="Vitamin D3"
          b="Vitamin K2 (MK-7)"
          effect="D3 increases calcium absorption; K2 directs calcium into bones, not arteries."
          recommendation="Always pair D3 with K2 at doses above 2,000 IU."
        />
      </InteractionGroup>

      <h2>Step 5: Evaluate Product Quality</h2>
      <p>
        The same ingredient varies enormously across brands. Two magnesium
        glycinate products can differ in actual elemental magnesium content
        by 50%. Here&rsquo;s what separates a quality product from a
        questionable one:
      </p>
      <ul>
        <li>
          <strong>Third-party testing:</strong> Look for NSF Certified for
          Sport, USP Verified, Informed Sport, or ConsumerLab tested. These
          certifications verify that what&rsquo;s on the label is actually
          in the bottle (and nothing else is).
        </li>
        <li>
          <strong>Full label transparency:</strong> No proprietary blends.
          Every ingredient listed with its exact amount. If a company
          hides behind a blend, assume the doses are inadequate.
        </li>
        <li>
          <strong>Bioavailable forms:</strong> Magnesium glycinate over
          oxide. Methylfolate over folic acid. D3 over D2. The form of an
          ingredient matters as much as the ingredient itself. Cheaper
          forms often mean your body absorbs a fraction of what you think
          you&rsquo;re getting.
        </li>
        <li>
          <strong>Minimal unnecessary additives:</strong> Titanium dioxide,
          artificial colors, and excessive fillers add cost and potential
          risk with zero benefit. Some fillers are necessary for
          manufacturing; artificial dyes never are.
        </li>
      </ul>

      <Callout variant="info" title="Formulate automates this evaluation">
        This evaluation process is exactly what Formulate&rsquo;s scoring
        system does &mdash; every product is rated on clinical dose alignment,
        form quality, label transparency, and third-party testing so you can
        compare objectively.
      </Callout>

      <h2>Budget Tiers: What Good Stacks Actually Cost</h2>

      <h3>Basic Foundation &mdash; ~$30&ndash;$40/month</h3>
      <ul>
        <li><a href="/guides/best-vitamin-d-supplements">Vitamin D3</a>+K2: ~$8&ndash;$12/month</li>
        <li>Magnesium glycinate: ~$8&ndash;$10/month</li>
        <li><a href="/guides/best-creatine-supplements">Creatine monohydrate</a>: ~$8&ndash;$10/month</li>
      </ul>
      <p>
        This covers the highest-ROI supplements for someone on a tight
        budget. If you eat fatty fish twice a week, you can potentially
        skip standalone omega-3.
      </p>

      <h3>Comprehensive &mdash; ~$60&ndash;$80/month</h3>
      <ul>
        <li>Everything in basic, plus:</li>
        <li>Omega-3 (quality fish oil): ~$15&ndash;$20/month</li>
        <li>One goal-specific addition (e.g., L-theanine for sleep, citrulline for performance): ~$10&ndash;$15/month</li>
      </ul>
      <p>
        This is the sweet spot for most people &mdash; covering
        foundational needs plus one targeted goal without overspending.
      </p>

      <h3>Optimized &mdash; $100&ndash;$150+/month</h3>
      <ul>
        <li>Everything in comprehensive, plus:</li>
        <li>2&ndash;3 goal-specific supplements: ~$25&ndash;$40/month</li>
        <li>Premium brands with third-party testing: additional ~$15&ndash;$30/month premium</li>
      </ul>

      <Callout variant="warning" title="$200+/month is a red flag">
        If you&rsquo;re spending $200+/month on supplements, you&rsquo;re
        almost certainly either taking redundant products, overpaying for
        brands, or supplementing things you don&rsquo;t need. More isn&rsquo;t
        better &mdash; more <em>targeted</em> is better.
      </Callout>

      <h2>A Starter Stack You Can Use Today</h2>

      <ScheduleTable
        title="Starter stack protocol"
        slots={[
          {
            emoji: "🍳",
            label: "Morning",
            time: "With breakfast",
            color: "#F59E0B",
            supplements: [
              "Vitamin D3+K2 (2,000–5,000 IU + 100mcg K2)",
              "Omega-3 (1,000mg EPA+DHA)",
              "Creatine (5g in water or coffee)",
            ],
            note: "Take with a fat-containing meal for optimal absorption",
          },
          {
            emoji: "😴",
            label: "Evening",
            time: "With dinner or before bed",
            color: "#6366F1",
            supplements: [
              "Magnesium glycinate (200–400mg elemental)",
            ],
            note: "Four supplements, under $2/day — covers the most common gaps",
          },
        ]}
      />

      <p>
        Run this for
        4&ndash;6 weeks, get follow-up bloodwork if possible, then decide
        whether to add goal-specific supplements from Step 3.
      </p>

      <ProductRow
        title="The foundation stack — top scored"
        products={[
          PRODUCTS["thorne-vitamin-d-k2"],
          PRODUCTS["thorne-super-epa-pro"],
          PRODUCTS["thorne-magnesium-bisglycinate"],
          PRODUCTS["thorne-creatine"],
        ]}
      />

      <h2>Who Should Talk to a Doctor First</h2>
      <p>
        The foundation stack outlined above is well-studied in generally healthy adults. But several populations have specific risks, interactions, or absorption differences that change the calculus. If any of the following apply to you, get clinical input before starting.
      </p>

      <Callout variant="warning" title="If you have kidney disease or reduced kidney function">
        Creatine monohydrate raises serum creatinine levels, which can produce false positives on kidney function panels — a direct concern if you're also following this guide's advice to get bloodwork. People with pre-existing kidney disease or single-kidney status should consult a nephrologist before using creatine.
      </Callout>

      <Callout variant="warning" title="If you are pregnant, breastfeeding, or trying to conceive">
        This guide does not cover pregnancy-specific needs like folate, choline, or iodine, and some compounds in the goal-specific tiers may be contraindicated. Talk to your OB-GYN or midwife before building any stack.
      </Callout>

      <Callout variant="warning" title="If you take prescription medications">
        Statins, SSRIs, blood thinners, thyroid medications (especially levothyroxine), and metformin all have documented supplement interactions. Bring your full supplement list — including what you're considering — to your prescriber or pharmacist before adding anything.
      </Callout>

      <Callout variant="warning" title="If you are over 60">
        B12 absorption declines with age due to atrophic gastritis, and calcium and vitamin D needs shift meaningfully. The doses and forms in this guide target a general adult population and may not be appropriate without provider review.
      </Callout>

      <Callout variant="warning" title="If you have a diagnosed condition such as hypothyroidism, autoimmune disease, or IBD">
        These conditions alter nutrient absorption and create timing constraints with medications. A blanket stack built for healthy adults can interfere with treatment. Work with your treating physician.
      </Callout>

      <Callout variant="warning" title="If you are a competitive athlete subject to drug testing">
        The guide mentions NSF Certified for Sport — that certification exists specifically because supplement contamination with banned substances is a real and career-ending risk. Tested athletes should use only certified products and verify each one.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list — including what you're considering — to your next provider visit.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Do I really need bloodwork, or can I just start taking things?</h3>
      <p>
        You <em>can</em> start with the foundation stack (D3, magnesium,
        omega-3, creatine) without bloodwork &mdash; the risk of harm at
        recommended doses is very low, and the probability that you&rsquo;re
        suboptimal in at least one of these is high. But bloodwork
        transforms supplementation from guessing to precision. It tells
        you what to prioritize, what to skip, and what dose to use. Think
        of it as the difference between shooting in the dark and turning on
        the lights.
      </p>

      <h3>Should I take a multivitamin instead of individual supplements?</h3>
      <p>
        Most multivitamins use cheap forms (magnesium oxide, folic acid,
        vitamin D2) at doses too low to correct deficiencies and too high
        to be ignored in your total intake math. Individual supplements let
        you choose the form, control the dose, and avoid paying for 30
        ingredients when you need 4. That said, a high-quality multi can
        work as a low-effort baseline if you&rsquo;re not ready to build a
        full stack. Our{" "}
        <a href="/guides/do-you-need-a-multivitamin">
          multivitamin deep-dive
        </a>{" "}
        covers when it makes sense and when it doesn&rsquo;t.
      </p>

      <h3>How do I know if a supplement is actually working?</h3>
      <p>
        For deficiency-correcting supplements (D3, magnesium, iron),
        follow-up bloodwork is the gold standard &mdash; you&rsquo;ll see
        the numbers move. For subjective benefits (sleep, energy, mood),
        keep a simple log for 3&ndash;4 weeks: rate your sleep quality,
        energy, and mood on a 1&ndash;10 scale daily. This sounds tedious,
        but without it you&rsquo;re relying on memory bias, which is
        unreliable. The Formulate app automates this tracking.
      </p>

      <h3>Can I take all my supplements at the same time?</h3>
      <p>
        Some, but not all. Fat-soluble vitamins (D, E, K, A) need to be
        taken with food containing fat. Calcium and iron compete for
        absorption and should be separated by at least 2 hours. Magnesium
        is best in the evening due to its relaxation effects. Caffeine-containing
        supplements should be avoided after early afternoon. For a complete
        breakdown, see our{" "}
        <a href="/guides/supplement-timing-guide">
          supplement timing guide
        </a>.
      </p>

      <h2>Track Your Stack With Formulate</h2>
      <p>
        The Formulate app lets you build your stack, compare products by
        evidence score, track your daily cost across everything you take,
        and catch ingredient overlap or interaction issues automatically.
        Every product in the catalog is scored on clinical dose alignment,
        label transparency, and testing certifications &mdash; so you can
        make decisions based on data, not marketing.
      </p>
      <p>
        <a href="https://app.formulate-health.app/stack">
          Start building your stack in Formulate &rarr;
        </a>
      </p>
    </>
  );
}
