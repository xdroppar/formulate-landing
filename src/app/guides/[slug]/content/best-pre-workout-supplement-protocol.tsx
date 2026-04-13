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

export function BestPreWorkoutProtocol() {
  return (
    <>
      <TLDRBox
        readTime="10 min read"
        takeaways={[
          "Only 4 ingredients have strong evidence: creatine (5g), citrulline (6–8g), beta-alanine (3.2g), caffeine (3–6mg/kg)",
          "Creatine and beta-alanine work through daily loading — timing doesn't matter for these",
          "Most commercial pre-workouts underdose the active ingredients and hide behind proprietary blends",
          "Building your own costs ~$0.30–0.60/workout vs $1.50–2.50 for branded tubs",
        ]}
      />

      <p>
        Flip over your favorite pre-workout and read the label. Chances are
        you&rsquo;ll see something like &ldquo;Explosive Performance
        Matrix&trade; &mdash; 8.5g&rdquo; followed by a laundry list of
        ingredients with no individual amounts. That&rsquo;s a proprietary
        blend, and it&rsquo;s how supplement companies hide the fact that
        the one ingredient you&rsquo;re actually paying for &mdash; usually
        caffeine &mdash; is the only thing in there at a useful dose.
      </p>
      <p>
        The truth is, evidence-based pre-workout supplementation comes down
        to four ingredients. They&rsquo;re all well-studied, they&rsquo;re
        all available individually, and buying them separately costs about
        a third of what you&rsquo;d pay for a branded tub. Here&rsquo;s
        how to build a better pre-workout from scratch.
      </p>

      <h2>The Four Ingredients That Actually Work</h2>
      <p>
        These are the compounds with the deepest evidence base for exercise
        performance. Everything else is either unproven, underdosed in
        commercial products, or both.
      </p>

      <h3>Creatine Monohydrate &mdash; 5g Daily (Timing Doesn&rsquo;t Matter)</h3>
      <p>
        Creatine is the most studied ergogenic supplement in existence &mdash;
        over 500 peer-reviewed papers and counting. It replenishes
        phosphocreatine stores in muscle, which fuel short-burst, high-intensity
        efforts: heavy lifts, sprints, HIIT intervals. <EvidenceBadge level="strong" /> The performance
        benefits are consistent and well-documented: increased strength,
        improved power output, faster recovery between sets.
      </p>

      <Callout variant="tip" title="Creatine works by saturation, not timing">
        Your muscles maintain a creatine &ldquo;tank&rdquo; that stays full
        as long as you take 3&ndash;5g every day. Whether you take it in the
        morning, before training, or with dinner makes no meaningful difference.
        Putting it in your pre-workout is fine for convenience, but it&rsquo;s
        not doing anything special at that moment.
      </Callout>

      <p>
        Stick with <a href="/guides/best-creatine-supplements">creatine monohydrate</a> &mdash; not HCl, not buffered, not
        ethyl ester. The monohydrate form is what the research used, and
        fancier forms haven&rsquo;t demonstrated any advantage despite
        costing 3&ndash;5x more. For a deeper dive on dosing protocol
        (including whether you need a loading phase), see our{" "}
        <a href="/guides/creatine-loading-phase">
          creatine loading guide
        </a>.
      </p>

      <ProductCallout product={PRODUCTS["thorne-creatine"]} />

      <h3>L-Citrulline &mdash; 6&ndash;8g (30&ndash;60 Min Before Training)</h3>
      <p>
        Citrulline gets converted to arginine in the kidneys, which boosts
        nitric oxide production and increases blood flow to working muscles.
        More blood flow means better oxygen delivery, improved nutrient
        transport, and the &ldquo;pump&rdquo; that people chase with
        pre-workouts &mdash; except this one is backed by data.
      </p>

      <Callout variant="evidence" title="52.9% more reps to failure">
        A landmark 2010 study in the{" "}
        <em>Journal of Strength and Conditioning Research</em> found that 8g of
        citrulline malate increased reps to failure by 52.9% across 8 sets of
        bench press, and significantly reduced muscle soreness at 24 and 48
        hours. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        <strong>Citrulline vs. citrulline malate:</strong> Citrulline malate
        is citrulline bonded to malic acid, typically in a 2:1 ratio. If a
        product says &ldquo;8g citrulline malate (2:1),&rdquo; you&rsquo;re
        getting about 5.3g of actual citrulline. Pure L-citrulline at 6g
        delivers more active ingredient with less powder. Either works &mdash;
        just check the math.
      </p>

      <Callout variant="info" title="Why not just take arginine?">
        Oral arginine is subject to extensive first-pass metabolism in the
        liver &mdash; most of it gets broken down before reaching your
        bloodstream. Citrulline bypasses this entirely, making it a far more
        efficient way to raise arginine and nitric oxide levels.
      </Callout>

      <h3>Beta-Alanine &mdash; 3.2&ndash;6.4g Daily (Timing Flexible)</h3>
      <p>
        Beta-alanine increases muscle carnosine levels, which act as a pH
        buffer during intense exercise. When you&rsquo;re in the
        &ldquo;burn&rdquo; zone &mdash; hard sets of 8&ndash;15 reps, 400m
        sprints, rowing intervals, circuit training &mdash; carnosine
        buffers the hydrogen ions that cause that burning sensation and
        force you to stop. More carnosine means more reps before failure in
        the 1&ndash;4 minute effort range.
      </p>

      <Callout variant="evidence" title="Consistent performance improvement">
        A 2012 meta-analysis in <em>Amino Acids</em> (Hobson et al.) analyzed 15
        studies and found a statistically significant improvement in exercise
        capacity for efforts lasting 60&ndash;240 seconds — roughly 2.85%
        improvement. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        Like creatine, beta-alanine works through chronic loading, not
        acute dosing. You need 3&ndash;4 weeks of daily use to fully
        elevate muscle carnosine. Taking it pre-workout is fine, but
        it&rsquo;s not doing anything <em>at that moment</em> &mdash; the
        benefit is from the accumulated carnosine in your muscles.
      </p>

      <Callout variant="info" title="About the tingling">
        Beta-alanine causes paresthesia &mdash; a harmless tingling in the
        skin, usually in the face, ears, and hands. It&rsquo;s dose-dependent
        and completely benign. If it bothers you, split the daily dose across
        two servings or use a sustained-release formulation.
      </Callout>

      <ProductCallout product={PRODUCTS["thorne-beta-alanine"]} />

      <h3>Caffeine &mdash; 3&ndash;6mg/kg Bodyweight (30 Min Before Training)</h3>
      <p>
        Caffeine is the most reliable acute performance enhancer we have.
        The mechanisms are well-understood: it blocks adenosine receptors
        (reducing perceived fatigue), increases catecholamine release
        (improving alertness and reaction time), and enhances calcium
        release in muscle fibers (directly improving force output).
      </p>

      <Callout variant="evidence" title="Broad performance benefits confirmed">
        A 2019 umbrella review in the <em>British Journal of Sports Medicine</em>{" "}
        (Grgic et al.) concluded that caffeine improves muscle strength, power,
        endurance, and high-intensity exercise performance across a wide range
        of activities. Evidence-based dose: 3&ndash;6mg/kg bodyweight (210&ndash;420mg
        for a 70kg person). <EvidenceBadge level="strong" />
      </Callout>

      <p>
        <strong>Tolerance and dosing strategy:</strong> Caffeine tolerance
        is real and determines how much you need. If you&rsquo;re a regular
        coffee drinker (3+ cups/day), your adenosine receptors have
        upregulated &mdash; you&rsquo;ll need the higher end (5&ndash;6mg/kg)
        and even then the boost may be blunted. If you rarely consume
        caffeine, start low (2&ndash;3mg/kg). The performance benefits will
        be more pronounced, and you&rsquo;ll avoid the jitters, anxiety, and
        GI distress that hit caffeine-naive people at full dose.
      </p>
      <p>
        <strong>Will you build tolerance over time?</strong> Yes, but the
        speed depends on frequency. Daily caffeine use builds meaningful
        tolerance within 1&ndash;3 weeks. If you only use caffeine
        3&ndash;4 times per week for training, tolerance builds more
        slowly. To maintain sensitivity long-term, consider cycling off
        caffeine entirely for 7&ndash;14 days every 2&ndash;3 months. The
        withdrawal is unpleasant (headaches and fatigue for 2&ndash;5 days),
        but resensitization is rapid and the ergogenic effects come back
        stronger. If you don&rsquo;t drink coffee or tea at all, you
        likely won&rsquo;t need to cycle &mdash; your baseline sensitivity
        stays high as long as you&rsquo;re only using caffeine a few times
        per week pre-training.
      </p>

      <Callout variant="warning" title="The sleep tradeoff">
        Caffeine has a half-life of 5&ndash;7 hours. If you train at 4pm and
        take 300mg, you&rsquo;ll still have ~150mg circulating at 10pm. If
        sleep quality matters to you, keep afternoon doses moderate or train
        earlier.
      </Callout>

      <p>
        For more on caffeine and supplement interactions, see our{" "}
        <a href="/guides/supplement-timing-guide">
          supplement timing guide
        </a>. For the full sleep protocol, see our{" "}
        <a href="/guides/best-sleep-supplement-protocol">
          sleep supplement guide
        </a>.
      </p>

      <h2>Optional Additions (Emerging Evidence)</h2>

      <h3>Beetroot Powder / Dietary Nitrate &mdash; 400mg Nitrate (60&ndash;90 Min Before)</h3>
      <p>
        Dietary nitrate from beetroot converts to nitric oxide via a
        different pathway than citrulline, improving oxygen efficiency
        during aerobic exercise. A 2017 systematic review in{" "}
        <em>Nutrients</em> found consistent improvements in time-trial
        performance and time to exhaustion in endurance activities. <EvidenceBadge level="moderate" /> Less
        relevant for pure strength training, but a solid addition if your
        training includes significant cardio or conditioning work.
      </p>

      <h3>Alpha-GPC &mdash; 300&ndash;600mg (30 Min Before)</h3>
      <p>
        A choline source that may increase acetylcholine availability and
        acute growth hormone output. A 2008 study in the{" "}
        <em>Journal of the International Society of Sports Nutrition</em>{" "}
        found 600mg Alpha-GPC increased bench press power output by 14%. <EvidenceBadge level="emerging" />{" "}
        The evidence is promising but limited to a handful of small studies.
        Consider it experimental rather than foundational.
      </p>

      <h2>What to Skip (and Why)</h2>

      <Callout variant="warning" title="BCAAs are unnecessary with adequate protein">
        A 2017 review in the <em>JISSN</em> (Wolfe) concluded that BCAAs alone
        cannot stimulate muscle protein synthesis to a meaningful degree. If you
        eat 1.6g+ protein per kg bodyweight daily, you&rsquo;re already getting
        more BCAAs than any supplement provides. <EvidenceBadge level="strong" />
      </Callout>

      <h3>L-Arginine</h3>
      <p>
        As mentioned above, oral arginine gets destroyed in first-pass
        liver metabolism. Citrulline is the objectively better route to
        raising arginine levels. Arginine in a pre-workout is filler, not
        function.
      </p>

      <h3>Proprietary &ldquo;Pump&rdquo; and &ldquo;Focus&rdquo; Blends</h3>
      <p>
        Ingredients like agmatine sulfate, huperzine A, and various plant
        extracts with aggressive marketing names (&ldquo;NeuroDrive
        Complex&rdquo;) either lack clinical evidence at the doses used in
        commercial products or have evidence so preliminary that
        recommending them is premature. If you can&rsquo;t find the
        ingredient studied at that dose in a peer-reviewed journal,
        it&rsquo;s marketing. Our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          label reading guide
        </a>{" "}
        covers how to spot this pattern.
      </p>

      <h2>Why Building Your Own Is Better</h2>

      <Callout variant="tip" title="DIY vs. commercial pre-workout">
        Individual bulk ingredients cost ~$0.30&ndash;$0.60 per workout at full
        clinical doses. A name-brand pre-workout runs $1.50&ndash;$2.50 per
        scoop at sub-clinical doses. You&rsquo;re paying more for less.
      </Callout>

      <ul>
        <li>
          <strong>You control the doses.</strong> Most commercial
          pre-workouts contain 1&ndash;2g of citrulline when the clinical
          dose is 6&ndash;8g. They include 1.5g of creatine when you need
          5g. They&rsquo;re selling you label decoration at clinical
          price points.
        </li>
        <li>
          <strong>You skip the junk.</strong> No artificial dyes (Red 40,
          Blue 1), no sucralose, no mysterious proprietary blends. Just
          the active ingredients.
        </li>
        <li>
          <strong>It&rsquo;s cheaper.</strong> Individual bulk ingredients
          cost roughly $0.30&ndash;$0.60 per workout at full clinical doses.
          A name-brand pre-workout runs $1.50&ndash;$2.50 per scoop at
          sub-clinical doses. You&rsquo;re paying more for less.
        </li>
        <li>
          <strong>You can customize.</strong> Train in the evening? Skip the
          caffeine. Already take creatine separately? Leave it out. Building
          your own means every ingredient is there for a reason.
        </li>
      </ul>

      <h2>The Protocol: Putting It All Together</h2>

      <ScheduleTable
        title="Pre-workout protocol"
        slots={[
          {
            emoji: "📅",
            label: "Daily",
            time: "Any time (chronic loading)",
            color: "#6B7280",
            supplements: [
              "Creatine monohydrate: 5g",
              "Beta-alanine: 3.2g (can split to reduce tingling)",
            ],
            note: "These work through saturation — timing is irrelevant, consistency is everything",
          },
          {
            emoji: "💪",
            label: "Pre-Training",
            time: "30–60 min before",
            color: "#F97316",
            supplements: [
              "L-Citrulline: 6–8g (or 8–10g citrulline malate)",
              "Caffeine: 200–400mg based on bodyweight (optional)",
            ],
            note: "Mix in water — it won't taste like Blue Raspberry Explosion™, but it'll actually work",
          },
        ]}
      />

      <ProductRow
        title="Build the evidence-based pre-workout"
        products={[
          PRODUCTS["thorne-creatine"],
          PRODUCTS["thorne-beta-alanine"],
          PRODUCTS["nootropics-depot-creatine"],
        ]}
      />

      <h2>Frequently Asked Questions</h2>

      <h3>Can I just buy a pre-workout that has these ingredients at the right doses?</h3>
      <p>
        You can, and some products do get the formulation right &mdash;
        full clinical doses, transparent labels, no proprietary blends.
        They exist, but they&rsquo;re the minority. The key is checking
        that citrulline is at 6g+, creatine at 5g, and beta-alanine at
        3.2g+. If any of those are missing or underdosed, you&rsquo;re
        paying a premium for an incomplete product. Use the Formulate
        catalog to compare products by actual ingredient doses, not
        marketing claims.
      </p>

      <h3>Should I take pre-workout on rest days?</h3>
      <p>
        The chronic-loading ingredients (creatine and beta-alanine) should
        be taken daily, including rest days &mdash; they work through
        sustained tissue saturation. Citrulline and caffeine are
        acute-effect compounds and only need to be taken before training
        sessions. So on rest days, just take your creatine and
        beta-alanine whenever is convenient.
      </p>

      <h3>Is caffeine necessary, or can I skip it?</h3>
      <p>
        Caffeine provides the most noticeable acute performance boost, but
        it&rsquo;s entirely optional. If you&rsquo;re caffeine-sensitive,
        train late in the day, or simply prefer not to use stimulants, the
        other three ingredients carry their own independent benefits.
        You&rsquo;re not &ldquo;missing out&rdquo; in any meaningful
        way &mdash; you&rsquo;re just skipping the stimulant component.
      </p>

      <h3>How long does it take to notice the effects?</h3>
      <p>
        Caffeine and citrulline work acutely &mdash; you&rsquo;ll feel
        caffeine within 30 minutes, and citrulline&rsquo;s blood flow
        effects peak around 60 minutes. Creatine and beta-alanine require
        3&ndash;4 weeks of daily loading before performance benefits
        emerge. If you &ldquo;don&rsquo;t feel anything&rdquo; after one
        workout with creatine and beta-alanine, that&rsquo;s expected &mdash;
        stay consistent.
      </p>

      <h2>Build This Stack in Formulate</h2>
      <p>
        Add each ingredient to your stack in the Formulate app to track
        your doses, see evidence scores, and calculate your real per-day
        cost. The app scores every product on clinical dose alignment, label
        transparency, and third-party testing so you can compare brands
        objectively rather than by marketing.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog?q=pre-workout">
          Browse pre-workout supplements in the catalog &rarr;
        </a>
      </p>
    </>
  );
}
