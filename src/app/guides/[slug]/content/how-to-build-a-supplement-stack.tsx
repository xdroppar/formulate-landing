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

<p>Supplement interactions can quietly undermine your stack. Two well-researched compounds that each work in isolation may compete for absorption or accumulate to risky levels when combined carelessly. Redundancy — paying twice for the same nutrient without realizing it — is equally common and equally wasteful.</p>

<h3>Absorption Competition</h3>

<p><strong>Zinc and copper</strong> compete for the same intestinal transporter (DMT1). Supplementing zinc above 40mg/day without copper can induce copper deficiency over time — a finding documented by Prasad (2013) and reflected in the tolerable upper intake set by the Institute of Medicine. If your stack includes standalone zinc, look for a product that includes 1–2mg copper, or separate dosing by several hours. <EvidenceBadge level="moderate" /></p>

<p><strong>Calcium and iron</strong> inhibit each other's absorption when taken together. Hallberg (1991) showed that 300mg calcium reduced iron absorption by up to 50–60% in a single meal. If you need both — common for women — take them at least two hours apart. Our <a href="/guides/supplement-timing">supplement timing guide</a> covers the practical scheduling.</p>

<h3>Fat-Soluble Vitamin Accumulation</h3>

<p>Vitamins A, D, E, and K are stored in body fat and liver tissue, not excreted in urine like B vitamins. Stacking multiple products that each contain fat-soluble vitamins — a multivitamin, a standalone D3 capsule, a greens powder with added vitamin A — can push your total intake well past safe levels without you noticing. Chronic vitamin A intake above 10,000 IU/day is associated with liver toxicity and increased fracture risk (Penniston &amp; Tanumihardjo, 2006). <EvidenceBadge level="strong" /></p>

<Callout variant="warning" title="The Multivitamin Overlap Trap">If you take a multivitamin <em>and</em> standalone vitamin D3, magnesium, or B-complex, you are almost certainly double-dosing. A typical multi already contains 1,000–2,000 IU of D3 and 50–100mg of magnesium. Add your standalone D3 (another 5,000 IU) and you may be at 7,000 IU daily — fine for someone with tested deficiency, potentially excessive for someone who isn't tracking totals. Pull out every bottle, sum up overlapping ingredients, and compare against your targets. Our <a href="/guides/multivitamin">multivitamin guide</a> helps you decide whether a multi even belongs in your stack.</Callout>

<h3>Run This Quick Audit Against Your Stack</h3>

<p><strong>1. List every product you take and write out every ingredient with its dose</strong> — including what's buried in blends, greens powders, and protein powders. <strong>2. Sum the totals for each overlapping nutrient</strong> (vitamin D, magnesium, zinc, B12, and vitamin A are the most common culprits). <strong>3. Flag any pair with known absorption competition</strong> — zinc/copper, calcium/iron, calcium/zinc — and separate them by at least two hours. <strong>4. Check your total fat-soluble vitamin intake</strong> (A, D, E, K) against established upper limits. <strong>5. Eliminate pure redundancy</strong> — if your multi already delivers 100% DV of B12, the standalone B12 is wasted money unless bloodwork says otherwise.</p>

<p>This five-minute audit catches the most expensive and most common stacking errors. If you want it automated, the Formulate app flags ingredient overlap and interaction issues across your entire stack in seconds.</p>

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

      <h2>Drug–Supplement Interactions: What to Check Before You Start</h2>

<p><strong>Drug–supplement interactions</strong> are the most under-checked risk in stack building. If you take any prescription medication, certain supplements in this guide require timing adjustments, dose changes, or outright avoidance. The table below covers the six most common prescription classes paired with specific supplements recommended above.</p>

<h3>High-Risk Interactions You Need to Know</h3>

<p><strong>Warfarin and other blood thinners + Vitamin K2:</strong> K2 directly opposes warfarin's mechanism of action by activating clotting factors. Even the 100–200mcg MK-7 dose recommended in Step 2 can destabilize your INR. <strong>Action: avoid K2 unless your prescriber explicitly monitors and adjusts your warfarin dose around it.</strong> The same caution applies to high-dose omega-3 — a 2019 review (Begtrup et al.) found EPA/DHA above 2,000mg/day measurably increased bleeding time. At the 1,000–2,000mg range in this guide the risk is lower, but consult your prescriber before starting. <EvidenceBadge level="strong" /></p>

<p><strong>Statins + CoQ10:</strong> Statins inhibit the mevalonate pathway, which your body also uses to produce CoQ10. Evidence suggests supplemental CoQ10 (100–200mg) may reduce statin-associated muscle symptoms — a 2018 meta-analysis (Qu et al., <em>Atherosclerosis</em>) found modest but significant reductions in myalgia scores. <strong>Action: CoQ10 is safe to add alongside statins, but inform your prescriber.</strong> <EvidenceBadge level="moderate" /></p>

<p><strong>Levothyroxine (thyroid meds) + Magnesium, Calcium, Iron:</strong> All three minerals bind levothyroxine in the gut, reducing absorption by up to 40–50% (Zamfirescu &amp; Carlson, 2011). <strong>Action: take levothyroxine on an empty stomach at least 4 hours before any mineral supplement.</strong> This is non-negotiable — it's one of the most clinically significant timing interactions in supplementation. <EvidenceBadge level="strong" /></p>

<p><strong>SSRIs/SNRIs + Omega-3 and L-Theanine:</strong> High-dose omega-3 has mild serotonergic activity and could theoretically compound SSRI effects, though clinically significant serotonin syndrome from fish oil alone is not well-documented. L-theanine modulates GABA and glutamate but has no reported dangerous SSRI interactions at 200mg. <strong>Action: generally safe at guide doses, but mention both to your prescriber.</strong> <EvidenceBadge level="emerging" /></p>

<p><strong>Metformin + B12:</strong> Long-term <a href="/guides/berberine-vs-metformin">metformin</a> use reduces B12 absorption in 10–30% of users (Aroda et al., 2016, <em>Journal of Clinical Endocrinology &amp; Metabolism</em>). <strong>Action: if you're on metformin, get B12 and MMA tested annually and supplement if levels drop.</strong> Magnesium is also worth monitoring since metformin may increase urinary magnesium loss. <EvidenceBadge level="moderate" /></p>

<p><strong>Oral contraceptives + Magnesium and B vitamins:</strong> OCs can deplete magnesium, B6, B12, and folate over time (Palmery et al., 2013). The foundation stack's magnesium already partially addresses this. <strong>Action: no conflicts — supplementation is actually more important if you're on OCs.</strong> <EvidenceBadge level="moderate" /></p>

<Callout variant="warning" title="Bring Your Full List">
Print or screenshot your complete supplement list — including doses and forms — and bring it to your prescriber or pharmacist before starting. Interactions depend on specific doses, and your provider can't catch what they don't know about. This applies even to supplements marked "generally safe" above.
</Callout>

<p>For detailed timing strategies that help you separate competing supplements, see our <a href="/guides/supplement-timing">supplement timing guide</a>. If you're on a statin and considering the longevity tier, our <a href="/guides/beginner-longevity-stack">longevity stack guide</a> addresses CoQ10 dosing in more detail.</p>

      <h2>Evidence Tier Labels: How to Read Supplement Claims Critically</h2>

<p>Learning how to read supplement claims critically is the single most important skill for building a stack that actually works. Not all evidence is created equal, and this guide deliberately recommends compounds with vastly different levels of research support. The tier system below lets you calibrate your confidence — and your willingness to spend money — accordingly.</p>

<h3>The Three Tiers</h3>

<p><strong>Tier 1 — Strong evidence.</strong> <EvidenceBadge level="strong" /> Multiple large RCTs (10+), systematic reviews, or meta-analyses in humans. Effects are reproducible and clinically meaningful. Examples in this guide: <strong>creatine monohydrate</strong> (500+ studies), <strong>vitamin D3</strong>, <strong>omega-3 EPA/DHA</strong>, <strong>magnesium</strong>. When you see Tier 1, the question isn't <em>whether</em> it works — it's whether <em>you</em> specifically need it.</p>

<p><strong>Tier 2 — Moderate evidence.</strong> <EvidenceBadge level="moderate" /> Several small-to-mid-sized RCTs with generally positive but not fully consistent results. Mechanisms are well-understood, but optimal dosing or long-term outcomes may still be unsettled. Examples: <strong>ashwagandha</strong> (Chandrasekhar 2012; Salve 2019), <strong>L-citrulline</strong>, <strong>L-theanine</strong>. Reasonable to try if your foundation is covered, but set realistic expectations.</p>

<p><strong>Tier 3 — Emerging evidence.</strong> <EvidenceBadge level="emerging" studiesId="ashwagandha-cortisol-2012" /> Primarily observational data, animal models, in vitro studies, or a handful of small human trials. The biological rationale may be compelling, but human-grade proof is thin. Examples: <strong>lion's mane</strong> (Mori 2009 — one 30-person RCT is the most cited), <strong>NMN/NR</strong>, <strong>quercetin as a senolytic</strong>. These are speculative bets, not proven interventions.</p>

<Callout variant="warning" title="Why this matters for your wallet">
Tier 3 supplements tend to be the most expensive per month and the least likely to produce noticeable results. Before spending $40–$60/month on NMN, make sure you've already covered your $15/month vitamin D deficiency. Evidence tiers map directly to ROI — the strongest evidence almost always comes from the cheapest compounds.
</Callout>

<p>Throughout this guide, every recommendation carries an implicit tier. When the <a href="/guides/beginner-longevity-stack">longevity stack guide</a> discusses quercetin alongside CoQ10, those are not equivalent bets. When the cognitive section lists creatine next to lion's mane, the gap in evidence is enormous. Use the tiers to decide where you spend first — and where you experiment only after the basics are locked in.</p>

      <h2>Special Populations: Pregnancy, Vegans, Older Adults, and Athletes</h2>
      <p>Special populations need more than a generic supplement stack — they need targeted modifications based on distinct physiological demands, absorption differences, and regulatory risks. The foundation stack from Step 2 is a solid starting point, but applying it unchanged to a pregnant woman, a 70-year-old, or a tested athlete is a mistake. Here's what to adjust.</p>

      <h3>Pregnant or Trying to Conceive</h3>
      <p>Methylfolate (400–800mcg) replaces folic acid as the preferred form — roughly 30–40% of people carry MTHFR variants that impair folic acid conversion (Crider et al., 2012). Add <strong>choline</strong> (450mg/day, the AI set by the Institute of Medicine) since most prenatals underdose it, and <strong>iodine</strong> (150–220mcg) for fetal neurodevelopment. <EvidenceBadge level="strong" /></p>
      <Callout variant="warning" title="Avoid high-dose vitamin A">
      Preformed vitamin A (retinol) above 10,000 IU/day is teratogenic. Check your prenatal, multivitamin, and any standalone products — sum every source. Betacarotene is not the same risk. Consult your OB-GYN before modifying any supplement during pregnancy.
      </Callout>

      <h3>Vegans and Plant-Based Eaters</h3>
      <p><strong>Sublingual B12</strong> (1,000mcg methylcobalamin, 2–3x/week) is non-negotiable — no plant food provides reliable B12, and deficiency rates among unsupplemented vegans reach 40–90% depending on the study (Pawlak et al., 2013). Swap fish oil for <strong>algae-derived omega-3</strong> providing at least 500mg combined EPA+DHA. Add <strong>iodine</strong> (150mcg) if you don't use iodized salt regularly — plant-based diets are consistently low. <EvidenceBadge level="strong" /></p>

      <h3>Adults 60+</h3>
      <p>B12 absorption declines with age due to atrophic gastritis, affecting an estimated 10–30% of adults over 60 (Allen, 2009). A <strong>sublingual or high-dose oral B12</strong> (1,000mcg) bypasses the gastric barrier more effectively. <strong>Vitamin D3</strong> needs often increase — the Endocrine Society suggests 1,500–2,000 IU minimum for older adults, with many clinicians targeting higher based on bloodwork. Pair with <strong>calcium</strong> (500–600mg if dietary intake is below 1,200mg/day) but avoid mega-doses — evidence suggests exceeding 1,000mg supplemental calcium may increase cardiovascular risk (Bolland et al., 2011). <EvidenceBadge level="moderate" /> Protein supplementation (20–40g whey or plant protein) also becomes more relevant as anabolic resistance increases with age.</p>

      <h3>Tested Athletes</h3>
      <p>Product quality isn't just a health concern — it's a career and legal one. Supplement contamination with banned substances like nandrolone precursors or stimulants has been documented in 12–25% of over-the-counter products (Martínez-Sanz et al., 2017). <strong>NSF Certified for Sport</strong> and <strong>Informed Sport</strong> certifications test for over 270 banned substances on the WADA list. This isn't optional quality assurance — it's your defense against a positive test and potential suspension. <EvidenceBadge level="strong" /> Every single product in your stack should carry one of these certifications, including basics like creatine and protein powder. Our <a href="/guides/how-to-build-a-supplement-stack">product quality section</a> covers what to look for on labels.</p>
      <Callout variant="info" title="One stack doesn't fit all">
      These modifications layer on top of the foundation stack — they don't replace it. Vitamin D, magnesium, omega-3, and creatine remain relevant across all four groups, with form and dose adjustments as noted above. Consult your healthcare provider for personalized dosing.
      </Callout>

      <h2>How to Read a Supplement Label (Serving Size, Elemental Dose, and Form)</h2>

      <p>Knowing <strong>how to read a supplement label</strong> is the difference between hitting your target dose and wasting money on a fraction of what you think you're getting. Three things trip people up most often: elemental dose vs. compound weight, EPA+DHA vs. total fish oil, and multi-capsule serving sizes. Here's how to catch all three.</p>

      <h3>Worked Example: Magnesium Glycinate 500mg</h3>

      <p>Pick up a bottle labeled "Magnesium Glycinate 500mg." That 500mg almost certainly refers to the <em>compound weight</em> — the magnesium atom bonded to two glycine molecules. Elemental magnesium makes up roughly 14% of magnesium glycinate's molecular weight. So 500mg of the compound delivers about <strong>70mg of actual magnesium</strong>. If your target is 300mg elemental (a common evening dose from Step 2), you'd need four or five capsules — not one. Check the Supplement Facts panel: the "Amount Per Serving" column should list elemental magnesium in milligrams. If it only says "Magnesium (as Magnesium Glycinate) — 100mg," that 100mg <em>is</em> elemental and you're fine. If it says 500mg, look for clarifying parentheses.</p>

      <h3>Worked Example: Fish Oil EPA+DHA</h3>

      <p>A "1,000mg Fish Oil" softgel typically contains only 300–500mg of combined EPA+DHA — the rest is other fats. Flip to the Supplement Facts panel and find the EPA and DHA lines separately. Add them. If EPA is 360mg and DHA is 240mg, your combined dose is 600mg per softgel. To reach the 1,000–2,000mg EPA+DHA target from Step 2, you need two to three capsules daily.</p>

      <h3>The Serving Size Trap</h3>

      <p>Always check the <strong>"Serving Size"</strong> line at the top of the panel before reading any numbers. A vitamin D product listing 2,000 IU may have a serving size of two capsules — meaning each capsule is only 1,000 IU. This is especially common with gummies, where serving sizes of 2–4 pieces are standard. Every dose listed on the panel applies to that full serving size, not per unit.</p>

      <Callout variant="info" title="Quick Label-Reading Checklist">
      Before you buy: (1) find the serving size, (2) confirm whether the dose listed is elemental or compound weight, and (3) multiply per-serving cost by the number of servings you actually need daily. A "cheap" bottle requiring four capsules per dose often costs more than a concentrated alternative. Our <a href="/guides/supplement-timing">supplement timing guide</a> covers how to schedule multi-capsule doses across the day.
      </Callout>

      <h2>Creatine FAQ: Hair Loss, Water Retention, Women, Timing, and Kidney Concerns</h2>

      <p>Creatine concerns are the single biggest reason people hesitate to start the most evidence-backed supplement available. Let's address the five most common objections directly so you can make a decision based on data, not Reddit threads.</p>

      <h3>Does Creatine Cause Hair Loss?</h3>

      <p>This comes from one 2009 study (van der Merwe et al.) on 20 college rugby players that found increased DHT levels after a creatine loading phase. It has <strong>never been replicated</strong>. A 2021 systematic review (Antonio et al., <em>Journal of the International Society of Sports Nutrition</em>) examined 12 studies measuring androgenic hormones and found no consistent effect of creatine on testosterone or DHT. <EvidenceBadge level="emerging" /> One unreplicated finding in 20 athletes is not a reason to skip a supplement with 500+ supporting studies.</p>

      <h3>What About Water Retention?</h3>

      <p>Creatine does increase total body water — typically 1–2kg during the first week or two. But this water is drawn <em>into muscle cells</em> (intracellular), not under your skin. You won't look bloated; if anything, muscles appear fuller. Loading phases (20g/day for 5–7 days) accelerate saturation but aren't required. Taking 3–5g daily reaches the same saturation point within 3–4 weeks.</p>

      <h3>Is Creatine Safe and Effective for Women?</h3>

      <p>Women typically have 70–80% lower baseline creatine stores than men, partly due to lower dietary intake and muscle mass. Evidence suggests this means women may see <em>proportionally greater</em> cognitive and performance benefits from supplementation (Smith-Ryan et al., 2021). Same dose — 3–5g daily. No virilizing effects. No hormonal disruption. <EvidenceBadge level="strong" studiesId="creatine-smith-ryan-women-2021" /></p>

      <h3>Does Timing Matter?</h3>

      <p>Not meaningfully. Creatine works through saturation, not acute dosing — it builds up in muscle tissue over days and weeks. Take it whenever you'll actually remember. With breakfast, in a post-workout shake, before bed — consistency matters far more than the clock. A 2013 study (Antonio &amp; Ciccone) found a slight advantage for post-exercise timing, but the difference was small and the study had only 19 participants.</p>

      <h3>Will Creatine Damage My Kidneys?</h3>

      <Callout variant="warning" title="Creatinine vs. Kidney Damage">Creatine supplementation raises serum creatinine — the metabolic byproduct doctors use to <em>estimate</em> kidney function. This is an artifact of higher creatine turnover, not evidence of kidney stress. If you supplement creatine and get bloodwork, tell your doctor so they interpret the GFR estimate correctly.</Callout>

      <p>A 2019 meta-analysis (de Souza e Silva et al.) covering studies up to 5 years in duration found no adverse effects on kidney function in healthy adults. <EvidenceBadge level="strong" /> If you have <em>pre-existing</em> kidney disease, consult your healthcare provider before starting — the safety data applies specifically to people with healthy kidney function. For everyone else, this is a settled question.</p>

      <h3>The REDUCE-IT Problem: What the Omega-3 Headlines Actually Showed</h3>
      <p>The omega-3 cardiovascular outcome data you'll see cited everywhere — including earlier in this guide — deserves a critical clarification. The headline "8% reduction in cardiovascular events" comes from a 2019 meta-analysis that pooled several trials, but the blockbuster result driving enthusiasm was REDUCE-IT (Bhatt et al., 2019). That trial used <strong>icosapent ethyl (Vascepa) at 4g/day of pure EPA</strong> — a prescription drug, not an OTC fish oil capsule.</p>
      <p>REDUCE-IT showed a striking 25% relative risk reduction in major cardiovascular events. But the VITAL trial (Manson et al., 2019), which tested a standard 1g/day fish oil capsule — the kind and dose most people actually buy — found <strong>no significant reduction in major cardiovascular events</strong> in the general population. <EvidenceBadge level="strong" studiesId="omega3-reduce-it-bhatt-2019" /> The ASCEND trial (2018) in diabetic patients showed similarly neutral primary results at the same OTC-comparable dose.</p>
      <Callout variant="warning" title="What this means for your stack">The cardiovascular "event reduction" stat applies to a prescription-grade, high-dose pure EPA product in patients with elevated triglycerides — not to the 1,000–2,000mg EPA+DHA fish oil recommended in Step 2. Conflating the two is the most common error in supplement marketing.</Callout>
      <p>This doesn't make OTC omega-3 worthless. Evidence still supports EPA+DHA at 1–2g/day for <strong>triglyceride reduction</strong>, inflammatory marker improvement, and cognitive health. <EvidenceBadge level="moderate" /> But if cardiovascular risk reduction is your primary motivation, understand that OTC fish oil at standard doses hasn't demonstrated that outcome in large trials. Honesty about this distinction is what separates evidence-based stacking from headline repetition.</p>

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

      <h3>Can I take creatine if I have kidney disease or high creatinine?</h3>
      <p>The guide doesn't cover this directly. Creatine supplementation raises serum creatinine as a byproduct of normal creatine metabolism &mdash; this can falsely suggest reduced kidney function on standard labs, and the distinction matters if you already have kidney disease or elevated creatinine. If you have any diagnosed kidney condition or abnormal kidney markers, consult a nephrologist or physician before starting creatine. This is a case where the guide's general recommendation doesn't apply without medical clearance.</p>

      <h3>What supplements should I avoid while pregnant or breastfeeding?</h3>
      <p>The guide doesn't cover pregnancy or breastfeeding at all. This is a meaningful gap: high-dose vitamin A (common in multivitamins) is teratogenic above certain thresholds, some herbal compounds have unknown safety profiles in pregnancy, and even fish oil dosing has pregnancy-specific guidance. Do not use this guide to build a supplement stack during pregnancy or while breastfeeding. Consult your OB-GYN or midwife &mdash; prenatal-specific supplementation guidance exists and is meaningfully different.</p>

      <h3>Do any of these supplements interact with my medication (antidepressants, blood thinners, statins)?</h3>
      <p>The guide flags interactions as a concern but doesn't detail specific risks. Several are clinically significant: K2 (MK-7) can interfere with warfarin's anticoagulant effect; high-dose omega-3 may increase bleeding risk on blood thinners; CoQ10 has documented interactions with statins; St. John's Wort (not in this guide but common in stacks) severely reduces SSRI efficacy. If you take any prescription medication, review your full supplement list with a pharmacist or physician before starting &mdash; this is a non-negotiable step the guide doesn't substitute for.</p>

      <h3>How long before I see results from vitamin D or magnesium supplementation?</h3>
      <p>The guide recommends running the starter stack for 4&ndash;6 weeks before evaluating results, which is reasonable for both. Vitamin D levels typically rise measurably within 4&ndash;8 weeks of consistent supplementation, but symptoms of deficiency (fatigue, mood, immune function) may improve before bloodwork reflects full correction. Magnesium changes can appear faster &mdash; some people notice improved sleep and reduced muscle tension within 1&ndash;2 weeks. Bloodwork at 6&ndash;8 weeks is the most reliable way to confirm progress rather than relying on subjective feel alone.</p>

      <h3>Is creatine safe for teenagers?</h3>
      <p>The guide doesn't address age-specific safety for creatine. Most major sports medicine and pediatric organizations have historically recommended against creatine supplementation for under-18s, citing insufficient long-term safety data in adolescents rather than known harm. The guide's recommendation applies to adults. If you're considering creatine for a teenager, consult a sports medicine physician or pediatrician &mdash; this guide doesn't provide a basis for that decision.</p>

      <h3>What's the best vegan omega-3 supplement?</h3>
      <p>The guide only mentions fish oil and marine omega-3 without addressing vegan sources. Algae-based DHA/EPA is the only evidence-supported vegan alternative &mdash; it's also the original source fish accumulate omega-3 from, so bioavailability is comparable. Look for algae oil products that list EPA and DHA amounts separately, targeting the same 1,000&ndash;2,000mg combined EPA+DHA the guide recommends. Apply the same quality criteria: third-party testing, disclosed oxidation values, and transparent labeling.</p>

      <h3>Can I take magnesium and zinc together?</h3>
      <p>The guide doesn't address this combination directly. At supplemental doses, high zinc (above ~40mg/day) competes with copper absorption and can deplete it over time &mdash; this is a more established concern than zinc-magnesium competition. Zinc and magnesium at typical stack doses (200&ndash;400mg magnesium glycinate, 15&ndash;30mg zinc) are generally taken together without issue, but if you're using high-dose zinc for immune or testosterone goals, pair it with a small amount of copper (1&ndash;2mg) and avoid taking it simultaneously with iron.</p>

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
