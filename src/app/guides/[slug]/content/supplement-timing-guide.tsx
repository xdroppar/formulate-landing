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
          Works well stacked with <a href="/guides/best-time-to-take-magnesium">magnesium</a>.
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

      <h2>Supplement Timing for Intermittent Fasting (IF) Protocols</h2>

<p>Knowing <strong>when to take supplements while intermittent fasting</strong> matters more than it does on a standard eating schedule. A 16:8 protocol (eating noon–8pm) eliminates the morning meal that most timing advice is built around. That means your fat-soluble vitamins, mineral pairings, and calming evening stack all need to be reshuffled into a compressed window — or carefully selected for fasted-state use.</p>

<h3>What You Can Take Fasted (During the Morning Fast)</h3>

<p>Water-soluble supplements that don't require fat or food for absorption are generally fine on an empty stomach. This includes <strong>B-complex vitamins</strong> (which you'd want in the morning anyway for their mild stimulating effect), <strong>vitamin C</strong>, <strong>L-tyrosine</strong>, and <strong>caffeine</strong>. Creatine dissolves in water and doesn't need food — take it whenever you'll remember.</p>

<p><strong>Iron</strong> actually benefits from a fasted state, since food reduces its absorption. If you're supplementing iron (with documented deficiency), the fasting window is ideal. Pair it with vitamin C and wait 30 minutes before coffee.</p>

<Callout variant="warning" title="The Fat-Soluble Vitamin Problem">
Vitamins A, D, E, K, omega-3s, and CoQ10 all require dietary fat for absorption. Taking them during your fasted morning window means you're wasting roughly half the dose — the same 50% absorption penalty described in <a href="/guides/supplement-timing-guide">the fat-soluble vitamins rule above</a>. These <em>must</em> wait for your eating window. No exceptions, no matter how inconvenient.
</Callout>

<h3>Restructuring Your Stack for 16:8</h3>

<p>Move your entire fat-soluble stack to your <strong>first meal</strong> (noon, or whenever you break fast). That's your D3+K2, fish oil, CoQ10, and any fat-soluble nootropics. Eat something with actual fat — not just a protein shake.</p>

<p>Your <strong>evening stack</strong> stays largely unchanged. <a href="/guides/supplement-timing-guide">Magnesium glycinate</a>, L-theanine, and glycine don't require food and work well taken 30–60 minutes before bed, even outside the eating window. Calcium, if you take it, fits best with your last meal.</p>

<p>The real risk with intermittent fasting isn't poor timing — it's cramming everything into one meal. Mineral competition (calcium vs. iron, zinc vs. calcium) still applies. <EvidenceBadge level="moderate" /> Separate competing minerals by at least two hours within your eating window, or assign them to different meals.</p>

<Callout variant="info" title="Practical IF Timing Template">
<strong>Fasted morning:</strong> Iron + vitamin C, B-complex, creatine, caffeine.<br />
<strong>First meal (noon):</strong> D3+K2, omega-3, CoQ10 — all with fat-containing food. Zinc if you take it.<br />
<strong>Last meal (~7–8pm):</strong> Calcium (separated from iron/zinc by hours).<br />
<strong>Before bed:</strong> Magnesium glycinate, L-theanine, glycine.
</Callout>

      <h2>The Recommended Forms Reference Table</h2>

<p>The bioavailability section above raises a critical question it doesn't fully answer: which <strong>recommended forms of supplements</strong> should you actually buy? Below is a scannable reference covering the six supplements most affected by form choice. This isn't exhaustive — it's the short list where form meaningfully changes what you absorb.</p>

<div className="overflow-x-auto">
<table className="w-full text-sm border-collapse">
<thead>
<tr className="border-b-2 border-gray-300">
<th className="text-left p-2">Supplement</th>
<th className="text-left p-2">Preferred Form</th>
<th className="text-left p-2">Why</th>
<th className="text-left p-2">When the Cheaper Form Is Fine</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-gray-200">
<td className="p-2 font-medium">Magnesium</td>
<td className="p-2">Glycinate (bisglycinate)</td>
<td className="p-2">Superior absorption, minimal GI distress, glycine itself supports sleep</td>
<td className="p-2">Magnesium oxide is acceptable if you need a laxative effect or can't afford glycinate — you'll just absorb roughly 4% vs ~24% (Firoz &amp; Graber, 2001)</td>
</tr>
<tr className="border-b border-gray-200">
<td className="p-2 font-medium">Vitamin B12</td>
<td className="p-2">Methylcobalamin</td>
<td className="p-2">Already in its active coenzyme form — no conversion step required</td>
<td className="p-2">Cyanocobalamin is fine for most people. It's more shelf-stable, cheaper, and converts readily unless you have MTHFR polymorphisms or impaired methylation</td>
</tr>
<tr className="border-b border-gray-200">
<td className="p-2 font-medium">Folate</td>
<td className="p-2">L-methylfolate (5-MTHF)</td>
<td className="p-2">Bypasses MTHFR enzyme entirely — roughly 40–60% of people carry variants reducing folic acid conversion (Wilcken et al., 2003)</td>
<td className="p-2">Folic acid is acceptable if you've confirmed normal MTHFR status or are taking standard prenatal doses under provider guidance</td>
</tr>
<tr className="border-b border-gray-200">
<td className="p-2 font-medium">Iron</td>
<td className="p-2">Iron bisglycinate (Ferrochel)</td>
<td className="p-2">Comparable absorption to ferrous sulfate at lower doses, with significantly fewer GI side effects (Milman et al., 2014)</td>
<td className="p-2">Ferrous sulfate remains the clinical standard when cost is a barrier or deficiency is severe — pair with vitamin C and tolerate the gut complaints</td>
</tr>
<tr className="border-b border-gray-200">
<td className="p-2 font-medium">Curcumin</td>
<td className="p-2">Lipid-formulated (Meriva, Longvida, or Theracurmin)</td>
<td className="p-2">Plasma bioavailability 29–185x higher than standard curcumin depending on formulation (Jamwal, 2018)</td>
<td className="p-2">Standard curcumin + piperine (BioPerine) is the budget option — piperine boosts bioavailability ~2,000% (Shoba et al., 1998), though that's still far less than lipid systems</td>
</tr>
<tr className="border-b border-gray-200">
<td className="p-2 font-medium">Vitamin D</td>
<td className="p-2">D3 (cholecalciferol)</td>
<td className="p-2">Raises and sustains serum 25(OH)D more effectively than D2 — a meta-analysis by Tripkovic et al. (2012) confirmed D3's superiority <EvidenceBadge level="strong" studiesId="vitamin-d-tripkovic-d3vsd2-2012" /></td>
<td className="p-2">D2 (ergocalciferol) works if you need a vegan source, but you may need higher or more frequent dosing to maintain equivalent levels</td>
</tr>
</tbody>
</table>
</div>

<Callout variant="info" title="Form doesn't override timing">
The best-absorbed recommended forms of supplements still follow the same rules from this guide. Magnesium glycinate still belongs in the evening. Vitamin D3 still needs dietary fat. Iron bisglycinate still competes with calcium. Form improves <em>how much</em> you absorb — <a href="/guides/supplement-timing-guide">timing determines <em>whether</em> you absorb it</a>.
</Callout>

<Callout variant="warning" title="MTHFR and form selection">
If you suspect methylation issues (family history, elevated homocysteine), choosing methylcobalamin and L-methylfolate over their cheaper counterparts is more than optimization — it may be clinically relevant. Consult your healthcare provider for testing before assuming you need the premium forms.
</Callout>

      <h2>Supplement Timing When You're On Medications: The Non-Negotiable Interactions</h2>

<p>Supplement timing when you're on medications isn't about optimization — it's about whether your drug works or whether you end up in the ER. The interactions below are well-documented and clinically significant. If you're on any of these medications, these spacing rules are non-negotiable.</p>

<Callout variant="warning" title="This Is Not Optional">
The timing windows below are based on pharmacokinetic data, not guesswork. But they don't replace your prescriber. Bring your full supplement list — including doses and forms — to your next appointment. Some of these interactions are dose-dependent, and your situation may require tighter restrictions than a general guide can provide.
</Callout>

<h3>Levothyroxine + Calcium, Iron, or Magnesium</h3>
<p>Calcium, iron, and magnesium all form insoluble complexes with levothyroxine in your gut, dramatically reducing absorption. A study by Singh et al. (2000) in <em>The American Journal of Medicine</em> showed calcium carbonate reduced levothyroxine absorption enough to cause clinical hypothyroidism in previously stable patients. <strong>Spacing rule: take levothyroxine on an empty stomach, then wait at least 4 hours before calcium, iron, or magnesium.</strong> Many endocrinologists recommend taking levothyroxine immediately upon waking, then delaying all supplements until lunch or later. <EvidenceBadge level="strong" /></p>

<h3>Warfarin + Vitamin K</h3>
<p>This isn't a timing issue — it's a consistency issue. Vitamin K directly opposes warfarin's mechanism (inhibiting vitamin K-dependent clotting factors). Sudden increases in vitamin K intake — from supplements or from dramatically increasing leafy green consumption — can destabilize your INR and raise clotting risk. <strong>Rule: don't start, stop, or change the dose of any vitamin K supplement without telling your prescriber.</strong> If you already take a stable daily dose of K2 for bone health, your warfarin dose was likely calibrated around it. Changing either without medical oversight is dangerous. <EvidenceBadge level="strong" /></p>

<h3>SSRIs/SNRIs + 5-HTP or St. John's Wort</h3>
<p>5-HTP is a direct serotonin precursor. Combining it with SSRIs, SNRIs, or MAOIs risks serotonin syndrome — a potentially fatal condition involving agitation, hyperthermia, and neuromuscular instability (Boyer &amp; Shannon, 2005). <strong>Rule: no timing window makes this safe. Do not combine 5-HTP or St. John's Wort with serotonergic medications without explicit approval from your prescriber.</strong> St. John's Wort also induces CYP3A4 enzymes, reducing the effectiveness of dozens of drugs including oral contraceptives and immunosuppressants. <EvidenceBadge level="strong" /></p>

<h3>Statins + CoQ10</h3>
<p>Statins inhibit HMG-CoA reductase, which sits upstream of both cholesterol and CoQ10 synthesis. Evidence suggests statins can reduce plasma CoQ10 levels by 16–54% (Littarru &amp; Langsjoen, 2007). Many statin users supplement CoQ10 to address muscle-related side effects, though trial results on myalgia are mixed. <strong>Timing rule: take CoQ10 (ubiquinol form preferred) with a fat-containing meal. No specific separation from the statin is needed</strong> — they don't compete for absorption. <EvidenceBadge level="moderate" /></p>

<h3>Metformin + Vitamin B12</h3>
<p>Long-term metformin use impairs B12 absorption by interfering with the calcium-dependent B12-intrinsic factor complex in the ileum. A landmark trial by de Jager et al. (2010) in the <em>BMJ</em> found that metformin users had a 19% reduction in B12 levels over 4.3 years. <strong>Rule: if you've been on metformin for more than a year, get your B12 levels tested.</strong> Supplementing with methylcobalamin is reasonable, and taking it at a separate meal from metformin — ideally 2+ hours apart — may modestly improve uptake, though the evidence on spacing specifically is limited. <EvidenceBadge level="moderate" /></p>

<h3>Blood Pressure Medications + Potassium or Magnesium</h3>
<p>ACE inhibitors and potassium-sparing diuretics (like spironolactone) already raise serum potassium. Adding supplemental potassium on top risks hyperkalemia — a cardiac emergency. <strong>Rule: do not supplement potassium if you're on ACE inhibitors, ARBs, or potassium-sparing diuretics without lab monitoring.</strong> Magnesium supplements can also potentiate the blood pressure-lowering effect of antihypertensives, so start low and monitor. <EvidenceBadge level="strong" /></p>

<h3>Antibiotics (Tetracyclines/Fluoroquinolones) + Minerals</h3>
<p>Calcium, magnesium, iron, and zinc all chelate tetracycline-class and fluoroquinolone antibiotics, rendering them ineffective. This is one of the most clinically consequential supplement-drug interactions and one of the most commonly ignored. <strong>Rule: separate these minerals from ciprofloxacin, doxycycline, or similar antibiotics by at least 2 hours before or 6 hours after the antibiotic dose.</strong> When in doubt, skip the mineral supplement entirely for the duration of the course. <EvidenceBadge level="strong" /></p>

<Callout variant="info" title="The Practical Takeaway">
Build your supplement schedule around your medication times, not the other way around. Write down your medication timing first, then slot supplements into the gaps. If spacing gets impossible — say you're on levothyroxine in the morning and an antibiotic twice daily — your pharmacist can help you map a realistic schedule. That conversation takes 10 minutes and it's free.
</Callout>

      <h2>Individual Variation: Why Your Timing May Differ (Genetics, Age, Health Status)</h2>

<p>Individual variation in supplement timing isn't a minor footnote — it's the reason universal schedules fail for a significant chunk of people. Your genetics, age, medication use, and health status can shift the "right" time to take something by hours, or change whether a standard form even works for you at all.</p>

<h3>Caffeine Metabolism: CYP1A2 and Your Cutoff Time</h3>

<p>The CYP1A2 gene determines how quickly you clear caffeine. About 50% of people carry the "slow metabolizer" variant (Sachse et al., 1999), meaning caffeine's half-life can stretch to 9+ hours instead of the typical 5–6. <EvidenceBadge level="strong" /> If you follow this guide's advice to cut caffeine 6–8 hours before bed and still sleep poorly, slow CYP1A2 metabolism is the likely culprit. Oral contraceptives and pregnancy further slow clearance — sometimes doubling the half-life. Adjust your pre-workout timing accordingly, or switch to a non-stimulant stack.</p>

<h3>MTHFR and Folate Form</h3>

<p>Roughly 10–15% of certain populations are homozygous for the MTHFR C677T variant, substantially reducing their ability to convert folic acid to its active form, L-methylfolate (Weisberg et al., 1998). <EvidenceBadge level="moderate" /> For these individuals, timing folic acid perfectly is beside the point — the <em>form</em> matters more. If you've been supplementing folic acid without results, an <a href="/guides/b-vitamins-guide">active folate (5-MTHF)</a> may be worth discussing with your provider.</p>

<h3>Older Adults: Gastric Acid and B12</h3>

<p>By age 60, an estimated 10–30% of adults have significantly reduced stomach acid production (atrophic gastritis), which impairs liberation of protein-bound B12 from food and standard supplements (Allen, 2009). <EvidenceBadge level="strong" /> Sublingual methylcobalamin or high-dose oral cyanocobalamin (1,000 mcg+) can bypass this bottleneck. Timing B12 with meals won't help much if your stomach acid isn't doing its job in the first place.</p>

<h3>Pregnancy: When Standard Rules Don't Apply</h3>

<Callout variant="warning" title="Pregnancy changes everything">
Caffeine clearance roughly doubles in duration during pregnancy. Iron requirements increase substantially, but so does nausea — making empty-stomach iron dosing impractical for many. Folate form and dose become clinically critical. Do not adapt this guide's general timing recommendations for prenatal use without direct input from your healthcare provider.
</Callout>

<p>The common thread across all of these: if the "standard" timing protocol isn't producing results — or is producing side effects — your biology may be the variable, not your discipline. Genetic testing for CYP1A2 and MTHFR is inexpensive and increasingly accessible, and a conversation with your pharmacist about age-related absorption changes takes ten minutes.</p>

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
