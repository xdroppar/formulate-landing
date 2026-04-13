import {
  TLDRBox,
  Callout,
  ProductCallout,
  ProductRow,
  EvidenceBadge,
  PRODUCTS,
} from "@/components/guide";

export function CreatineLoadingPhase() {
  return (
    <>
      <TLDRBox
        readTime="8 min read"
        takeaways={[
          "Loading (20g/day for 5-7 days) fills muscle creatine stores in ~1 week; 3-5g/day reaches the same level in ~28 days",
          "Both protocols achieve identical end-state muscle creatine concentrations — loading is a fast lane, not a different destination",
          "Don't cycle creatine — long-term daily use (studied up to 5 years) is safe with no kidney concerns in healthy individuals",
          "Vegetarians see the biggest response; 20-30% of people are low/non-responders based on baseline muscle creatine",
        ]}
      />

      <p>
        You bought creatine. The label says 3&ndash;5 grams a day. But
        somewhere online you read you should be taking 20 grams a day for the
        first week. Your gym buddy insists the loading phase is mandatory.
        A Reddit thread says loading is &ldquo;broscience.&rdquo; Someone
        else says you need to cycle it.
      </p>
      <p>
        Here&rsquo;s the thing: creatine is the most studied sports
        supplement in history, with over 500 peer-reviewed papers. We
        don&rsquo;t need to guess about any of this. The answers are clear
        &mdash; and simpler than the internet makes them seem.
      </p>

      <h2>What the Loading Phase Actually Does</h2>
      <p>
        Your muscles store creatine in a pool that has a maximum capacity
        &mdash; like filling a tank. For most people, that tank is about
        60&ndash;80% full from diet alone (more if you eat a lot of red meat,
        less if you&rsquo;re vegetarian).
      </p>
      <p>
        The loading protocol &mdash; 20g per day, split into 4 doses of 5g,
        for 5&ndash;7 days &mdash; fills that tank to 100% capacity in about
        a week. After that, you drop to 3&ndash;5g per day to keep it full.
      </p>

      <Callout variant="evidence" title="The original research">
        This protocol comes from the original creatine research by Roger
        Harris and colleagues, published in <em>Clinical Science</em> in
        1992. They used muscle biopsies to directly measure intramuscular
        creatine content. The loading protocol increased muscle creatine
        stores by 20&ndash;40%. <EvidenceBadge level="strong" />
      </Callout>

      <h2>The Part Nobody Tells You: You Don&rsquo;t Need It</h2>
      <p>
        Here&rsquo;s what the same body of research shows: taking{" "}
        <strong>3&ndash;5g per day from day one, with no loading
        phase</strong>, reaches the exact same muscle saturation level. It
        just takes about 28 days instead of 5&ndash;7.
      </p>

      <Callout variant="evidence" title="Same destination, different speed">
        Hultman et al. confirmed in a 2003 study in the{" "}
        <em>Journal of Applied Physiology</em>: both protocols achieve
        identical end-state creatine concentrations in muscle tissue. The
        loading phase is a fast lane, not a different
        destination. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        Same tank. Same fuel level. Different fill speed. That&rsquo;s it.
      </p>

      <h2>The Saturation Math</h2>
      <p>
        The numbers behind the loading debate are actually quite specific, and
        once you see them, the decision gets easier.
      </p>
      <p>
        Baseline muscle creatine stores in an untrained omnivore run roughly
        <strong> 120&ndash;125 mmol/kg of dry muscle</strong>. Full
        saturation caps out around <strong>150&ndash;160 mmol/kg</strong> — the
        physiological ceiling where additional intake stops raising muscle
        concentration because you&rsquo;re just excreting the excess.
        Performance and hypertrophy gains correlate with <em>how saturated</em>
        your muscles are, not how much you took today.
      </p>
      <p>
        The two protocols reach that same ceiling on different timelines:
      </p>
      <ul>
        <li>
          <strong>Loading protocol:</strong> 20&ndash;25g/day (split into 4&ndash;5
          doses) for 5&ndash;7 days, then 3&ndash;5g/day maintenance. Full
          saturation at day 5&ndash;7. Originally demonstrated in the classic
          Harris et al. 1992 study in <em>Clinical Science</em>.
        </li>
        <li>
          <strong>Steady-state protocol:</strong> 3&ndash;5g/day from day one.
          Full saturation at day 28&ndash;30. Confirmed in a 1996 follow-up
          by Hultman et al. showing the same endpoint with no loading phase.
        </li>
      </ul>
      <p>
        From day 30 onward, the two protocols are <strong>identical in every
        measurable way</strong> — same muscle creatine, same performance
        effect, same body composition adjustment. The choice is purely about
        the first month.
      </p>
      <p>
        One more number worth knowing: daily creatine losses through urinary
        creatinine run roughly 2g for a 70 kg person. That&rsquo;s why 3&ndash;5g/day
        maintenance works — it replaces daily losses and accounts for a small
        amount of ongoing gut/kidney inefficiency. Higher maintenance doses
        (10g, 20g) after saturation produce no additional benefit; the excess
        is excreted.
      </p>

      <h2>Loading: The Pros</h2>
      <ul>
        <li>
          <strong>Faster performance benefits.</strong> If you want the
          strength, power, and work capacity improvements within the first
          week rather than waiting a month, loading gets you there. For
          someone starting creatine two weeks before a competition, this
          matters.
        </li>
        <li>
          <strong>Psychologically motivating.</strong> Some people like feeling
          the effects quickly. The initial water weight gain (2&ndash;4 lbs of
          intracellular water, which makes muscles look fuller) and strength
          uptick can be reinforcing early on.
        </li>
        <li>
          <strong>Matches the research protocols.</strong> If you&rsquo;re
          the type who wants to replicate exactly what was studied, most
          clinical trials used the loading protocol. You&rsquo;re following
          the literal playbook.
        </li>
      </ul>

      <h2>Loading: The Cons</h2>

      <Callout variant="warning" title="GI distress is the #1 reason people quit">
        20g of creatine per day causes bloating, stomach cramps, or diarrhea
        in a meaningful percentage of users. Many people load, feel terrible,
        and conclude creatine &ldquo;doesn&rsquo;t work for them&rdquo;
        &mdash; when the loading dose was the problem, not the creatine.
      </Callout>

      <ul>
        <li>
          <strong>GI distress is common.</strong> 20g of creatine per day
          causes bloating, stomach cramps, or diarrhea in a meaningful
          percentage of users. This is the #1 reason people quit creatine
          in the first week &mdash; they load, feel terrible, and conclude
          creatine &ldquo;doesn&rsquo;t work for them.&rdquo; In reality,
          the loading dose was the problem, not the creatine.
        </li>
        <li>
          <strong>Water retention anxiety.</strong> Loading causes a more
          dramatic initial water weight gain. If you step on a scale and see
          +4 lbs after 5 days, it can feel alarming if you&rsquo;re not
          expecting it. This is intracellular water inside muscle cells
          &mdash; not bloating, not fat &mdash; but the number on the
          scale doesn&rsquo;t care about the distinction.
        </li>
        <li>
          <strong>4x the cost for no long-term advantage.</strong> You&rsquo;re
          burning through your supply 4 times faster for a week to reach
          the same endpoint you&rsquo;d reach by just being patient. Not a
          huge deal financially, but it&rsquo;s worth noting.
        </li>
        <li>
          <strong>Same destination either way.</strong> For the vast majority
          of recreational lifters and health-focused users, the 3-week
          difference in saturation time is irrelevant. You&rsquo;re going to
          be taking creatine for months or years. Whether you hit full
          saturation on day 7 or day 28 doesn&rsquo;t change your trajectory.
        </li>
      </ul>

      <Callout variant="tip" title="Our recommendation">
        Skip loading. Take 3&ndash;5g daily from day one. You avoid the GI
        issues, save product, and arrive at the exact same muscle saturation
        within a month. The only exception: you&rsquo;re prepping for a
        competition in the next 2 weeks.
      </Callout>

      <ProductCallout product={PRODUCTS["thorne-creatine"]} />

      <h2>What About Cycling? (Spoiler: Don&rsquo;t)</h2>
      <p>
        Cycling creatine &mdash; 8 weeks on, 4 weeks off, repeat &mdash;
        is one of those gym myths that refuses to die. The rationale is
        usually some version of &ldquo;your body will stop producing its
        own creatine&rdquo; or &ldquo;you need to give your kidneys a
        break.&rdquo;
      </p>
      <p>
        Neither is true.
      </p>

      <Callout variant="evidence" title="ISSN position stand">
        The <strong>International Society of Sports Nutrition (ISSN)</strong>{" "}
        position stand on creatine, updated in 2017, explicitly states that
        long-term daily creatine supplementation (studied for up to 5 years)
        is safe, with no evidence of kidney damage in healthy individuals and
        no clinically meaningful suppression of endogenous creatine
        synthesis. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        When you stop taking creatine, muscle stores gradually return to
        baseline over 4&ndash;6 weeks. You lose the performance benefits you
        built up. Then you start over. Cycling is self-sabotage with no
        upside.
      </p>

      <h2>Timing: The Least Important Variable</h2>
      <p>
        The internet has vigorous opinions about creatine timing. Pre-workout.
        Post-workout. With carbs. Without carbs. First thing in the morning.
      </p>
      <p>
        A 2013 study in the <em>Journal of the International Society of
        Sports Nutrition</em> compared pre-workout vs. post-workout creatine
        in resistance-trained men. The post-workout group showed a slight
        edge in lean mass and strength gains, but the study was small
        (n=19) and the effect was modest. <EvidenceBadge level="emerging" />
      </p>
      <p>
        The practical answer: take creatine whenever you&rsquo;ll actually
        remember. Mixed into morning water. In your protein shake. With
        dinner. Creatine monohydrate is tasteless, dissolves in any liquid,
        and doesn&rsquo;t care what time it is. The only timing variable
        that matters is daily consistency.
      </p>

      <h2>Responders vs. Non-Responders</h2>
      <p>
        Not everyone responds equally, and this is worth understanding
        before you conclude creatine &ldquo;doesn&rsquo;t work.&rdquo;
      </p>
      <p>
        Research suggests 20&ndash;30% of people are low or non-responders.
        The primary factor is your baseline muscle creatine levels:
      </p>
      <ul>
        <li>
          <strong>Vegetarians and vegans</strong> typically have the lowest
          baseline muscle creatine (since dietary creatine comes almost
          exclusively from meat and fish). They tend to see the most
          dramatic response to supplementation &mdash; both for strength
          and for cognitive function.
        </li>
        <li>
          <strong>Heavy meat eaters</strong> already have relatively high
          muscle creatine levels. Their tank is already 70&ndash;80% full,
          so supplementation fills a smaller gap and produces a smaller
          effect.
        </li>
        <li>
          <strong>People with more fast-twitch muscle fibers</strong> store
          more creatine and tend to respond better. This is genetic and not
          something you can change.
        </li>
      </ul>
      <p>
        If you&rsquo;ve been consistently taking 3&ndash;5g daily for 4+
        weeks with no noticeable performance difference, you may be a
        non-responder. It&rsquo;s not harmful to continue (there are
        potential cognitive benefits regardless), but the strength/power
        effects may not materialize for you.
      </p>

      <h2>Creatine and Your Brain</h2>
      <p>
        This is the angle that most people miss. Your brain uses 20% of your
        body&rsquo;s energy despite being 2% of your body weight. That energy
        comes from ATP, which requires creatine to recycle.
      </p>

      <Callout variant="evidence" title="Cognitive benefits">
        Multiple studies have shown that creatine supplementation improves
        cognitive performance under conditions of stress, sleep deprivation,
        and demanding mental tasks. A 2018 systematic review in{" "}
        <em>Experimental Gerontology</em> found evidence for cognitive
        benefits in older adults specifically. <EvidenceBadge level="moderate" />
      </Callout>

      <p>
        This is why creatine appears in our{" "}
        <a href="/guides/beginner-longevity-supplement-stack">
          longevity stack guide
        </a>{" "}
        &mdash; it&rsquo;s not just a gym supplement anymore.
      </p>

      <h2>Hydration: The One Thing to Actually Pay Attention To</h2>
      <p>
        Creatine increases water retention inside muscle cells. This means
        your muscles are pulling more water from your circulation, and you
        need to drink enough to keep up.
      </p>
      <p>
        You don&rsquo;t need to force-drink gallons. Just ensure you&rsquo;re
        hitting reasonable hydration &mdash; roughly 0.5&ndash;1 oz per pound
        of body weight daily. If your urine is pale yellow, you&rsquo;re
        fine.
      </p>
      <p>
        The &ldquo;creatine causes dehydration and cramps&rdquo; myth has
        been debunked in multiple studies. A 2003 study in the{" "}
        <em>Journal of Athletic Training</em> found that creatine users
        actually experienced <em>fewer</em> muscle cramps than non-users
        during preseason football training. <EvidenceBadge level="moderate" /> But staying hydrated is still
        good practice.
      </p>

      <ProductRow
        title="Top-scored creatine supplements"
        products={[
          PRODUCTS["thorne-creatine"],
          PRODUCTS["nootropics-depot-creatine"],
        ]}
      />

      <h2>Frequently Asked Questions</h2>

      <h3>Is creatine safe for teenagers?</h3>
      <p>
        The ISSN states there is no evidence that creatine is harmful for
        adolescents. However, most sports medicine organizations recommend it
        primarily for athletes 18+, largely out of an abundance of caution
        rather than specific safety concerns. For teenagers, the priority
        should be nutrition, training, and sleep before any supplementation.
      </p>

      <h3>Does creatine cause hair loss?</h3>
      <p>
        This comes from a single 2009 study that found creatine increased
        DHT (dihydrotestosterone) levels by 56% in rugby players. DHT is
        linked to male pattern baldness. However, no follow-up study has
        replicated this finding, and no study has directly measured hair loss
        from creatine supplementation. The concern is theoretically plausible
        but currently unsupported by evidence. <EvidenceBadge level="emerging" />
      </p>

      <h3>Should I take creatine on rest days?</h3>
      <p>
        Yes. Creatine works by maintaining muscle saturation over time. It&rsquo;s
        not a pre-workout stimulant &mdash; it&rsquo;s a daily supplement.
        Taking it only on training days means your stores never fully
        saturate.
      </p>

      <h3>Does the brand of creatine monohydrate matter?</h3>
      <p>
        Not much. Creatine monohydrate is creatine monohydrate. Creapure&reg;
        (manufactured in Germany) is considered the highest-purity source,
        but independent testing of major brands consistently shows that
        most monohydrate products contain what they claim. Don&rsquo;t
        overpay for fancy branding on what is essentially a commodity
        ingredient. (More on evaluating supplements in our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          label reading guide
        </a>.)
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Skip the loading phase unless you&rsquo;re in a hurry. Take
        3&ndash;5g of creatine monohydrate every day. Don&rsquo;t cycle it.
        Don&rsquo;t stress about timing. Stay hydrated. Give it 4 weeks to
        reach full saturation. That&rsquo;s it &mdash; the entire creatine
        protocol, backed by three decades of research and 500+ papers.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog?q=creatine">
          Compare creatine supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
