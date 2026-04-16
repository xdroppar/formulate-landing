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

export function SupplementTimingGuide() {
  return (
    <>
      <TLDRBox
        readTime="10 min read"
        takeaways={[
          "Fat-soluble vitamins (D, K, E, A) absorb up to 50% better with a fat-containing meal",
          "Calcium blocks iron absorption by 50–60% — separate by at least 2 hours",
          "Put calming supplements (magnesium, L-theanine, glycine) before bed",
          "Consistency matters more than perfect timing — a supplement taken at the \"wrong\" time still works",
        ]}
      />

      <p>
        Supplement timing matters only in a few specific cases: fat-soluble
        vitamins (D, E, K, A) need dietary fat for absorption, iron and{" "}
        <a href="/guides/zinc-guide">zinc</a> compete for the same uptake
        pathways and should be separated, and stimulating supplements like
        B-complex can disrupt sleep if taken late. Beyond these interactions,
        consistency matters far more than clock precision.
      </p>
      <p>
        A supplement taken at the &ldquo;wrong&rdquo; time still works. A
        supplement you skip because the timing felt complicated does nothing.
      </p>

      <Callout variant="tip" title="The #1 rule">
        A supplement taken at the &ldquo;wrong&rdquo; time still works.
        A supplement you skip because the timing felt complicated does nothing.
        The best timing protocol is the one you actually follow.
      </Callout>

      <h2>The Rules That Actually Matter</h2>

      <h3>Rule 1: Fat-Soluble Vitamins Need Fat</h3>
      <p>
        Vitamins A, D, E, and K dissolve in fat, not water. If you take them
        on an empty stomach, a significant portion passes through unabsorbed.
      </p>

      <Callout variant="evidence" title="Absorption study">
        A 2015 study in the <em>Journal of the Academy of Nutrition and
        Dietetics</em> found that taking vitamin D with a fat-containing meal
        increased absorption by <strong>up to 50%</strong> compared to taking
        it fasted. <EvidenceBadge level="strong" studiesId="vitamin-d-absorption-fat-2015" />
      </Callout>

      <p>
        That means if you&rsquo;re taking your <a href="/guides/best-vitamin-d-supplements">vitamin D</a> with a black coffee
        and nothing else, you&rsquo;re absorbing roughly half of what
        you&rsquo;re paying for. Take it with eggs, avocado toast, a handful
        of nuts &mdash; anything with fat. This applies to <a href="/guides/best-omega-3-supplements">omega-3</a> capsules
        and CoQ10 as well.
      </p>

      <ProductCallout product={PRODUCTS["thorne-vitamin-d-5000"]} />

      <h3>Rule 2: Some Minerals Block Each Other</h3>
      <p>
        Certain minerals use the same transport channels in your gut, and when
        they arrive at the same time, they compete for entry. These are the
        conflicts that actually matter:
      </p>

      <InteractionGroup title="Mineral conflicts">
        <InteractionCard
          type="conflict"
          a="Calcium"
          b="Iron"
          effect="Calcium can reduce iron absorption by 50–60%. This is the most clinically significant mineral interaction."
          recommendation="Separate by at least 2 hours. Take iron in the morning, calcium in the evening."
        />
        <InteractionCard
          type="conflict"
          a="Calcium"
          b="Magnesium"
          effect="At high doses (500mg+ calcium), absorption of both minerals suffers."
          recommendation="Separate therapeutic doses. Less critical than calcium-iron."
        />
        <InteractionCard
          type="conflict"
          a="Zinc (40mg+)"
          b="Copper"
          effect="Chronic high-dose zinc depletes copper stores, causing fatigue and brain fog."
          recommendation="Use a zinc product with copper included, or take 1–2mg copper separately."
        />
        <InteractionCard
          type="conflict"
          a="Iron"
          b="Zinc"
          effect="On an empty stomach, they compete for the same transporters."
          recommendation="Take with food to largely resolve this, or take at different times."
        />
      </InteractionGroup>

      <h3>Rule 3: Some Combinations Are Synergistic</h3>
      <p>
        The flip side of mineral competition: certain pairings actually
        enhance each other. These are worth taking together deliberately:
      </p>

      <InteractionGroup title="Beneficial pairings">
        <InteractionCard
          type="synergy"
          a="Vitamin D"
          b="Vitamin K2"
          effect="D3 cranks up calcium absorption. K2 (MK-7) directs that calcium into bones, not arteries."
          recommendation="At D3 doses above 2,000 IU, pair with 100–200mcg K2."
        />
        <InteractionCard
          type="synergy"
          a="Iron"
          b="Vitamin C"
          effect="Vitamin C converts non-heme iron into its more absorbable ferrous form, potentially doubling absorption."
          recommendation="Take 200mg+ vitamin C with your iron. Squeeze a lemon or pop a C tablet."
        />
        <InteractionCard
          type="synergy"
          a="Curcumin"
          b="Piperine"
          effect="Piperine inhibits the enzyme that breaks curcumin down, boosting absorption by ~2,000%."
          recommendation="Use curcumin with piperine or a lipid delivery system (Meriva, Longvida)."
        />
        <InteractionCard
          type="synergy"
          a="Magnesium"
          b="Vitamin B6"
          effect="B6 may facilitate magnesium transport into cells. A 2018 PLOS ONE study found the combo more effective for stress."
          recommendation="Many quality magnesium products include B6 for this reason."
        />
      </InteractionGroup>

      <h2>The Daily Schedule</h2>
      <p>
        Here&rsquo;s the practical template. Adapt it to your actual stack:
      </p>

      <ScheduleTable
        title="Optimal timing schedule"
        slots={[
          {
            emoji: "🌅",
            label: "Wake Up",
            time: "Empty stomach",
            color: "#F97316",
            supplements: ["Iron", "Vitamin C"],
            note: "Wait 30 min before coffee — tannins block iron absorption by up to 60%",
          },
          {
            emoji: "🍳",
            label: "Breakfast",
            time: "With fat",
            color: "#F59E0B",
            supplements: ["Vitamin D3 + K2", "Omega-3", "CoQ10", "B-Complex"],
            note: "Needs fat for absorption — eggs, avocado, nuts, butter",
          },
          {
            emoji: "🌤️",
            label: "Lunch",
            time: "With food",
            color: "#10B981",
            supplements: ["Zinc", "Curcumin + Piperine"],
            note: "Keep zinc separated from morning iron",
          },
          {
            emoji: "😴",
            label: "Before Bed",
            time: "30–60 min before sleep",
            color: "#6366F1",
            supplements: ["Magnesium Glycinate", "L-Theanine", "Glycine", "Calcium"],
            note: "Calming stack — magnesium activates parasympathetic nervous system",
          },
          {
            emoji: "⏰",
            label: "Anytime",
            time: "Just be consistent",
            color: "#6B7280",
            supplements: ["Creatine", "Collagen", "Probiotics"],
          },
        ]}
      />

      <h2>Morning Stack — Details</h2>

      <h3>Before Breakfast (Empty Stomach)</h3>
      <p>
        <strong><a href="/guides/iron-guide">Iron</a></strong> absorbs best on an empty stomach. Take
        with a vitamin C source, then wait 30 minutes before coffee &mdash;
        tannins in coffee and tea reduce iron absorption by up to 60%.
        Yes, this is annoying. Yes, it matters if you&rsquo;re actually
        iron-deficient.
      </p>

      <ProductCallout product={PRODUCTS["thorne-iron-bisglycinate"]} />

      <h3>With Breakfast</h3>
      <p>
        Everything fat-soluble goes here, plus anything mildly energizing:
      </p>
      <ul>
        <li>
          <strong>Vitamin D3 + K2</strong> &mdash; take with a meal
          containing fat. Eggs, avocado, nuts, butter.
        </li>
        <li>
          <strong>Omega-3 / fish oil</strong> &mdash; fat-soluble. Taking it
          with food also reduces the fishy burps.
        </li>
        <li>
          <strong>CoQ10 (ubiquinol)</strong> &mdash; fat-soluble, and some
          people find it mildly energizing.
        </li>
        <li>
          <strong>B-complex / <a href="/guides/vitamin-b12-guide">B12</a></strong> &mdash; B vitamins can be mildly
          stimulating. Taking B12 at night interferes with sleep for some people.
        </li>
      </ul>

      <ProductRow
        title="Morning stack — top scored"
        products={[
          PRODUCTS["thorne-vitamin-d-5000"],
          PRODUCTS["thorne-omega-3-coq10"],
          PRODUCTS["thorne-b-complex-12"],
        ]}
      />

      <h2>Evening Stack — Details</h2>
      <p>
        Evening is for anything calming, anything that competes with your
        morning minerals, and anything that supports sleep architecture:
      </p>
      <ul>
        <li>
          <strong><a href="/guides/best-magnesium-supplements">Magnesium glycinate</a></strong> &mdash; the MVP of evening
          supplementation. Activates the parasympathetic nervous system,
          regulates GABA, and the glycine component has its own sleep-promoting
          effects. 200&ndash;400mg about 30&ndash;60 minutes before bed.
        </li>
        <li>
          <strong>L-theanine</strong> &mdash; promotes alpha brain wave activity.
          200mg before bed helps you wind down without making you drowsy.
          Works well stacked with magnesium.
        </li>
        <li>
          <strong>Glycine</strong> &mdash; 3g before bed improves subjective
          sleep quality. It lowers core body temperature slightly, triggering
          sleep onset. <EvidenceBadge level="strong" studiesId="glycine-sleep-bannai-2012" />
        </li>
        <li>
          <strong>Calcium</strong> &mdash; if you take it, evening is ideal.
          Keeps it separated from morning iron.
        </li>
      </ul>

      <ProductRow
        title="Evening stack — top scored"
        products={[
          PRODUCTS["thorne-magnesium-bisglycinate"],
          PRODUCTS["nootropics-depot-l-theanine"],
        ]}
      />

      <h2>Timing Around Medications</h2>
      <p>
        This is the category where &ldquo;timing matters&rdquo; stops being
        optimization and starts being genuinely important. Several common
        supplement-medication interactions are well-documented and clinically
        relevant. If you take any of the following, build your supplement
        schedule around them.
      </p>

      <InteractionGroup title="Supplement ↔ medication timing">
        <InteractionCard
          type="conflict"
          a="Levothyroxine"
          b="Calcium, iron, magnesium"
          effect="These minerals bind to levothyroxine in the gut and can reduce absorption by 30–40%. Also applies to coffee taken within 30 minutes."
          recommendation="Take thyroid meds on an empty stomach 30–60 minutes before breakfast. Save mineral supplements for later in the day."
        />
        <InteractionCard
          type="conflict"
          a="Statins"
          b="Grapefruit, St. John's Wort"
          effect="Grapefruit inhibits CYP3A4, raising statin blood levels and myopathy risk. St. John's Wort does the opposite, reducing efficacy."
          recommendation="Avoid grapefruit and St. John's Wort entirely if you're on simvastatin, atorvastatin, or lovastatin."
        />
        <InteractionCard
          type="conflict"
          a="Warfarin / blood thinners"
          b="Vitamin K, fish oil, ginkgo"
          effect="Vitamin K directly opposes warfarin; fish oil and ginkgo add antiplatelet effects. Even small dose changes can shift INR."
          recommendation="Never start or stop these supplements abruptly if you're on anticoagulants. Talk to your prescriber first."
        />
        <InteractionCard
          type="conflict"
          a="Antibiotics (tetracyclines, quinolones)"
          b="Calcium, iron, magnesium, zinc"
          effect="Polyvalent cations bind to the antibiotic in the gut, reducing absorption by up to 50%."
          recommendation="Separate by at least 2 hours. Take the antibiotic first, minerals later."
        />
      </InteractionGroup>

      <Callout variant="warning" title="If you take prescription meds">
        Build your supplement timing around your medication schedule, not
        the other way around. Many of these interactions aren&rsquo;t
        obvious from reading a supplement bottle &mdash; they require
        knowing the pharmacokinetics of both. If you&rsquo;re on anything
        chronic, a 10-minute conversation with your pharmacist is worth
        more than any online timing guide.
      </Callout>

      <h2>Timing Around Training</h2>
      <p>
        If you lift, do cardio, or compete, a handful of supplements have
        meaningfully different effects based on timing relative to the workout.
        Most of this is overhyped online, but a few items are real:
      </p>

      <h3>Creatine</h3>
      <p>
        The timing debate is mostly noise. Creatine works by saturating muscle
        stores over weeks; a single day&rsquo;s timing changes almost nothing.
        That said, a 2013 study by Antonio and Ciccone in the{" "}
        <em>Journal of the International Society of Sports Nutrition</em>{" "}
        suggested a modest post-workout advantage when combined with carbs and
        protein. The effect size was small. Far more important:{" "}
        <strong>take it every day, including rest days</strong>. The saturation
        is what matters, not when you top it up. <EvidenceBadge level="moderate" studiesId="creatine-post-vs-pre-antonio-2013" />
      </p>

      <h3>Protein</h3>
      <p>
        The &ldquo;anabolic window&rdquo; has been quietly walked back by the
        research community over the last decade. A 2013 meta-analysis by
        Schoenfeld et al. in the <em>Journal of the International Society of
        Sports Nutrition</em> found that protein timing produced small effects
        on hypertrophy compared to total daily intake. Practical rule: get
        20&ndash;40g of protein within two hours of training, and hit your
        daily target (1.6&ndash;2.2g/kg). Nailing the second matters far more
        than the first. <EvidenceBadge level="strong" studiesId="protein-timing-schoenfeld-2013" />
      </p>

      <h3>Caffeine + pre-workout</h3>
      <p>
        Caffeine peaks in plasma 30&ndash;60 minutes after ingestion. Take it
        closer to 45 minutes before the hardest portion of your session. Avoid
        it within 6&ndash;8 hours of your intended sleep time &mdash; caffeine&rsquo;s
        half-life is 5&ndash;6 hours, so an afternoon pre-workout will blunt
        deep sleep that night even if you don&rsquo;t feel wired at bedtime.
      </p>

      <h3>Beta-alanine</h3>
      <p>
        Like creatine, beta-alanine is a saturation supplement &mdash; daily
        dose matters, acute timing doesn&rsquo;t. The tingling (paresthesia)
        from a single large dose is harmless but can be unpleasant. Split
        3.2&ndash;6.4g across the day in 1.5&ndash;2g doses, preferably with
        meals, to minimize it.
      </p>

      <h2>Bioavailability vs Absorption — Why the Distinction Matters</h2>
      <p>
        A lot of supplement marketing conflates two different concepts:
        <strong>absorption</strong> (how much of the dose crosses your gut
        wall) and <strong>bioavailability</strong> (how much of the absorbed
        dose reaches systemic circulation in an active form). They&rsquo;re
        related but not interchangeable.
      </p>
      <p>
        Curcumin is the canonical example. Plain curcumin is absorbed at
        roughly 1&ndash;2% of the oral dose because it&rsquo;s heavily
        metabolized in the gut wall and liver before it reaches the
        bloodstream. Piperine-boosted curcumin raises absorption by inhibiting
        that first-pass metabolism. Lipid delivery systems (Meriva, Longvida,
        Theracurmin) work by a different mechanism &mdash; they change how
        curcumin is packaged into chylomicrons, improving both absorption and
        bioavailability. &ldquo;High-absorption&rdquo; claims on a label are
        meaningless without knowing the mechanism.
      </p>
      <p>
        Similar distinctions matter for B12 (methylcobalamin vs cyanocobalamin),
        folate (L-methylfolate vs folic acid), magnesium (glycinate vs oxide),
        and iron (bisglycinate vs sulfate). In each case, the &ldquo;better&rdquo;
        form costs more because it either absorbs better, reaches tissues more
        effectively, or causes fewer GI side effects. Timing won&rsquo;t fix
        a poor-form supplement.
      </p>

      <h2>The 5 Most Common Timing Mistakes</h2>

      <Callout variant="warning" title="Mistake #1: The handful approach">
        Taking 8–10 supplements in one handful with your morning coffee.
        You&rsquo;re creating mineral competition, taking fat-soluble vitamins
        with a zero-fat liquid, and probably getting GI distress as a bonus.
        Spread things across 2–3 time points.
      </Callout>

      <Callout variant="warning" title="Mistake #2: Vitamin D with black coffee">
        You need fat for absorption. Black coffee has no fat. That
        5,000 IU vitamin D capsule you take every morning with your
        Americano? You&rsquo;re absorbing about half of it.
      </Callout>

      <Callout variant="warning" title="Mistake #3: Iron with coffee">
        Tannins in coffee and tea chelate iron, reducing absorption by up to
        60%. Wait at least 30 minutes after iron before your first cup.
        This is the single most impactful timing mistake people make.
      </Callout>

      <Callout variant="warning" title="Mistake #4: B vitamins at night">
        B6 and B12 can interfere with sleep quality when taken in the evening.
        Some people are more sensitive than others, but morning is the safer default.
      </Callout>

      <Callout variant="tip" title="Mistake #5: Optimizing at the expense of compliance">
        The biggest timing mistake isn&rsquo;t taking something at the
        wrong hour. It&rsquo;s making your routine so complicated
        that you stop doing it. If splitting into morning/lunch/evening
        means you forget lunch and evening, just take everything with
        breakfast. Imperfect timing with daily compliance beats perfect
        timing with inconsistent use. Every single time.
      </Callout>

      <h2>FAQ</h2>

      <h3>Can I take all my supplements with dinner instead of breakfast?</h3>
      <p>
        For most supplements, yes. Fat-soluble vitamins work with any
        fat-containing meal. The main exception is B vitamins (potentially
        stimulating at night) and iron (better on an emptier stomach).
      </p>

      <h3>Does it matter if I take supplements with hot vs cold liquid?</h3>
      <p>
        No. Capsules dissolve in your stomach regardless. Probiotics are an
        exception &mdash; some strains are heat-sensitive, so don&rsquo;t
        mix them into hot coffee.
      </p>

      <h3>What if I forget my morning supplements?</h3>
      <p>
        Just take your normal dose whenever you remember. Don&rsquo;t
        double up &mdash; especially on iron, zinc, or fat-soluble vitamins.
        Resume your normal schedule the next day. Creatine is the exception
        &mdash; it accumulates over time, so one missed dose is genuinely
        irrelevant.
      </p>

      <h3>Does calcium in food block iron the same way?</h3>
      <p>
        Yes. It&rsquo;s the calcium itself, not the pill form. A cup of
        kefir or yogurt contains 300&ndash;400mg calcium &mdash; enough to
        reduce iron uptake by 50&ndash;60%. If your morning includes dairy,
        take iron 30&ndash;60 minutes before, or shift iron to a different
        time of day.
      </p>

      <h2>Who Should Talk to a Doctor First</h2>
      <p>
        Most supplement timing advice in this guide assumes a healthy adult with no chronic conditions and no prescription medications. If any of the following apply to you, get clinical input before building or changing your stack.
      </p>

      <Callout variant="warning" title="If you take prescription medications">
        Warfarin and vitamin K, levothyroxine and calcium or iron, SSRIs and 5-HTP, and oral contraceptives altering B-vitamin metabolism are all common, high-stakes interactions where timing alone isn't enough — dosing and form matter too. Bring your full supplement list to your prescriber or pharmacist before following any schedule from this guide.
      </Callout>

      <Callout variant="warning" title="If you supplement iron without a confirmed deficiency">
        The iron timing advice here is written for people with documented deficiency. Unsupervised iron supplementation — especially in men and post-menopausal women — carries real oxidative stress risk. Talk to your healthcare provider before adding iron to your routine without lab-confirmed need.
      </Callout>

      <Callout variant="warning" title="If you are a slow caffeine metabolizer or take oral contraceptives">
        Caffeine half-life varies dramatically — from roughly 1.5 to 9.5 hours — depending on CYP1A2 genetics, oral contraceptive use, pregnancy, liver function, and smoking status. The 5–6 hour figure in this guide is an average, not a universal. If caffeine affects your sleep despite an early cutoff, you may be a slow metabolizer and should adjust accordingly.
      </Callout>

      <Callout variant="warning" title="If you take magnesium at the upper end of the range mentioned here">
        The guide references 200–400mg of magnesium glycinate before bed. Note that 400mg of elemental magnesium from supplements exceeds the NIH tolerable upper intake level for supplemental magnesium (350mg) and can cause diarrhea. Start at the lower end and talk to your healthcare provider before pushing toward 400mg, especially if you also get magnesium from food or other supplements.
      </Callout>

      <Callout variant="warning" title="If you are 65 or older">
        Reduced stomach acid in older adults impairs B12 absorption from standard oral forms, and high-dose supplemental calcium carries contested cardiovascular concerns in this population. Talk to your healthcare provider about appropriate forms and doses rather than following generic timing advice.
      </Callout>

      <Callout variant="warning" title="If you are pregnant or breastfeeding">
        Supplement needs, safe upper limits, and caffeine metabolism all change significantly during pregnancy and lactation. Do not use this guide as a substitute for prenatal supplementation guidance from your provider.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list — including what you're considering — to your next provider visit.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Three rules matter: take fat-soluble vitamins with fat, separate
        competing minerals (especially calcium and iron), and put calming
        supplements in the evening. Everything else is marginal optimization.
        Don&rsquo;t let perfect timing become the enemy of actually taking
        your supplements daily.
      </p>

      <ProductRow
        title="Build your stack with top-scored products"
        products={[
          PRODUCTS["thorne-creatine"],
          PRODUCTS["thorne-magnesium-bisglycinate"],
          PRODUCTS["thorne-vitamin-d-5000"],
          PRODUCTS["nootropics-depot-l-theanine"],
        ]}
      />
    </>
  );
}
