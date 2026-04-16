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

export function MagnesiumDeficiency() {
  return (
    <>
      <TLDRBox
        readTime="10 min read"
        takeaways={[
          "~50% of Americans don't meet the recommended daily magnesium intake — and the standard blood test is almost useless at catching it",
          "Only 1% of your body's magnesium is in your blood; request RBC magnesium (intracellular) for an accurate picture",
          "Magnesium glycinate is the best starting form — well-absorbed, gentle, and the glycine has its own calming benefits",
          "Start with 200mg elemental magnesium at night; most people notice sleep improvements within 3-7 days",
        ]}
      />

      <p>
        Common signs of magnesium deficiency include muscle cramps, eyelid
        twitching, chronic fatigue despite adequate sleep, and unexplained
        irritability. Roughly{" "}
        <strong>50% of Americans fail to meet the recommended daily
        intake</strong>, according to USDA data, making it one of the most
        widespread yet underdiagnosed nutrient deficiencies &mdash; partly
        because the standard blood test most doctors order is almost useless
        at catching it.
      </p>

      <h2>Why Your Doctor Probably Won&rsquo;t Catch It</h2>

      <Callout variant="warning" title="The wrong test">
        The standard blood panel measures <strong>serum magnesium</strong> &mdash;
        but only 1% of your body&rsquo;s magnesium is in your blood. Your body
        pulls from bones and muscles to keep serum levels stable. By the time
        serum magnesium drops below range, you&rsquo;re in serious trouble.
        Request <strong>RBC magnesium</strong> instead.
      </Callout>

      <p>
        This is the part that frustrates people once they learn it. The
        standard blood panel measures <strong>serum magnesium</strong> &mdash;
        the magnesium floating in your blood. Sounds reasonable, except for
        one problem: <strong>only 1% of your body&rsquo;s magnesium is in
        your blood</strong>. The other 99% is in your bones, muscles, and
        soft tissues.
      </p>
      <p>
        Your body treats serum magnesium like a thermostat. When blood levels
        dip, it pulls magnesium from your bones and muscles to keep the number
        stable. So your blood test reads &ldquo;normal&rdquo; while your
        tissues are slowly being drained.
      </p>
      <p>
        By the time serum magnesium actually drops below the reference range,
        you&rsquo;re in serious deficiency territory. The subclinical
        stage &mdash; where you <em>feel</em> it but it doesn&rsquo;t show on
        labs &mdash; can last for months or years.
      </p>
      <p>
        The better test is <strong>RBC magnesium</strong> (red blood cell
        magnesium), which measures what&rsquo;s actually inside your cells.
        Most doctors don&rsquo;t order it unless you specifically ask. If you
        suspect you&rsquo;re low, request it. Optimal RBC magnesium is
        generally considered 5.0&ndash;6.5 mg/dL, though reference ranges
        vary by lab.
      </p>

      <h2>Why Half the Population Is Running Low</h2>
      <p>
        It&rsquo;s not just that people eat badly (though that&rsquo;s part of
        it). The deck is genuinely stacked against magnesium intake in modern
        life:
      </p>
      <ul>
        <li>
          <strong>The soil is depleted.</strong> Industrial farming has reduced
          the magnesium content of crops by an estimated 20&ndash;30% over the
          past 50 years. The spinach your grandmother ate had meaningfully more
          magnesium than yours does.
        </li>
        <li>
          <strong>Water treatment removes it.</strong> Municipal water
          purification strips out naturally occurring minerals, including
          magnesium. People who drink well water tend to have higher magnesium
          status.
        </li>
        <li>
          <strong>Processed food has almost none.</strong> Refining grains
          removes 80&ndash;95% of their magnesium content. If your diet leans
          heavily on packaged food, you&rsquo;re almost certainly short.
        </li>
      </ul>
      <p>
        But even if your diet is solid, certain lifestyle factors actively
        drain your magnesium faster than you can replace it:
      </p>
      <ul>
        <li>
          <strong>Stress is the big one.</strong> Cortisol increases urinary
          magnesium excretion. But here&rsquo;s the cruel twist: low magnesium
          <em>increases</em> your stress response, which burns through more
          magnesium, which makes you more stressed. It&rsquo;s a vicious cycle
          that hits high-achievers and anxious people hardest.
        </li>
        <li>
          <strong>Caffeine.</strong> Coffee and tea increase renal magnesium
          excretion. If you&rsquo;re a 3+ cups/day person, you&rsquo;re
          flushing more than you think.
        </li>
        <li>
          <strong>Intense exercise.</strong> You lose magnesium through sweat
          and burn through it during muscle contraction. Athletes and regular
          gym-goers have significantly higher requirements &mdash; and
          ironically, many sports drinks don&rsquo;t contain any.
        </li>
        <li>
          <strong>Alcohol.</strong> Even moderate drinking increases magnesium
          loss. Regular drinkers are at meaningfully higher risk.
        </li>
        <li>
          <strong>Common medications.</strong> Proton pump inhibitors (Prilosec,
          Nexium), diuretics, and certain antibiotics can deplete magnesium
          stores over time. If you&rsquo;ve been on a PPI for months, your
          magnesium status deserves a look.
        </li>
      </ul>

      <Callout variant="info" title="The stress-magnesium cycle">
        Stress burns through magnesium via cortisol-driven excretion. Low
        magnesium amplifies your stress response, burning more magnesium.
        This vicious cycle hits high-stress, high-caffeine, high-exercise
        individuals hardest &mdash; exactly the people most likely to dismiss
        their symptoms.
      </Callout>

      <h2>The 8 Signs to Watch For</h2>
      <p>
        None of these are magnesium-specific on their own. But if you&rsquo;re
        experiencing <strong>three or more of them</strong>, and you tick a
        few of the risk factors above, the pattern starts to look very
        familiar.
      </p>

      <h3>1. Muscle Cramps and Eye Twitches That Won&rsquo;t Quit</h3>
      <p>
        This is the one most people notice first. Magnesium regulates the
        flow of calcium into muscle cells &mdash; calcium triggers
        contraction, magnesium enables relaxation. When magnesium is low,
        the &ldquo;relax&rdquo; signal gets weak.
      </p>
      <p>
        The result: involuntary contractions. A twitching eyelid that lasts
        for days. Calf cramps at 3am. That charley horse after a workout
        that seems disproportionate to what you did. Many people dismiss
        these as random, but persistent twitching and cramping is your
        neuromuscular system telling you something.
      </p>

      <h3>2. You Sleep Enough Hours But Wake Up Unrested</h3>
      <p>
        Magnesium doesn&rsquo;t just help you <em>fall</em> asleep &mdash;
        it affects the <em>quality</em> of sleep you get. It activates the
        parasympathetic nervous system (your &ldquo;rest and digest&rdquo;
        mode) and regulates GABA, the neurotransmitter that quiets neural
        activity.
      </p>

      <Callout variant="evidence" title="Sleep quality study">
        A 2012 double-blind RCT in the <em>Journal of Research in Medical
        Sciences</em> gave elderly insomniacs 500mg of magnesium daily for 8
        weeks. Results: significantly better sleep time, sleep efficiency,
        and melatonin levels, with lower cortisol. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        If you track your sleep and consistently see low deep sleep
        percentages despite adequate total hours, magnesium is one of the
        first things worth trying. For more on sleep supplementation, see
        our{" "}
        <a href="/guides/best-sleep-supplement-protocol">
          sleep supplement protocol guide
        </a>.
      </p>

      <h3>3. Anxiety or Irritability That Feels Disproportionate</h3>
      <p>
        You snap at your partner over nothing. You feel a low-grade
        background anxiety that doesn&rsquo;t match your circumstances.
        Things that normally wouldn&rsquo;t bother you feel overwhelming.
      </p>
      <p>
        This isn&rsquo;t in your head (well, technically it is). Magnesium
        modulates the HPA axis &mdash; your body&rsquo;s central stress
        response system. It also regulates GABA receptors and restricts the
        release of stress hormones. When magnesium is low, your nervous
        system runs hotter than it should.
      </p>
      <p>
        A 2017 systematic review across 18 studies, published in{" "}
        <em>Nutrients</em>, found a statistically significant link between low
        magnesium intake and increased anxiety. Several included trials showed
        improvement in anxiety scores with supplementation in as little as
        6 weeks. <EvidenceBadge level="moderate" />
      </p>

      <h3>4. Persistent Fatigue That Sleep Doesn&rsquo;t Fix</h3>
      <p>
        Every cell in your body uses ATP for energy. Magnesium is required
        for ATP to function &mdash; technically, it&rsquo;s &ldquo;Mg-ATP&rdquo;
        that your cells actually use, not ATP alone. When magnesium is
        depleted, your cells literally cannot produce energy as efficiently.
      </p>
      <p>
        This shows up as that bone-deep tiredness that doesn&rsquo;t improve
        with more sleep. You&rsquo;re not sleep-deprived &mdash; you&rsquo;re
        energy-deprived at the cellular level. People often attribute this to
        getting older, overtraining, or burnout, when the root cause is
        sometimes as simple as a mineral deficiency.
      </p>

      <h3>5. Headaches or Migraines</h3>
      <p>
        The American Migraine Foundation explicitly recognizes magnesium
        supplementation as a preventive therapy for migraines, especially in
        people with demonstrated low levels. The mechanism involves magnesium&rsquo;s
        role in neurotransmitter release, blood vessel constriction, and
        cortical spreading depression (the wave of neural activity believed
        to trigger migraine aura).
      </p>

      <Callout variant="evidence" title="Migraine prevention">
        Clinical trials have used 400&ndash;600mg daily for migraine
        prophylaxis, with a 2021 meta-analysis in <em>Headache</em>{" "}
        confirming reduced frequency and intensity. The American Migraine
        Foundation officially recognizes magnesium as a preventive
        therapy. <EvidenceBadge level="strong" />
      </Callout>

      <h3>6. An Irregular Heartbeat or Random Palpitations</h3>
      <p>
        Magnesium helps maintain the electrical stability of your heart
        muscle. Low levels can cause premature atrial or ventricular
        contractions &mdash; those unsettling &ldquo;skipped beat&rdquo;
        sensations. Hospitals routinely administer IV magnesium for cardiac
        arrhythmias, which tells you how seriously cardiologists take
        this mineral.
      </p>

      <Callout variant="warning" title="Get checked">
        Heart palpitations can have many causes, some of them serious.
        Don&rsquo;t self-diagnose this one &mdash; get it checked out. But
        if your workup comes back &ldquo;structurally normal,&rdquo; ask
        about your magnesium levels.
      </Callout>

      <h3>7. Constipation</h3>
      <p>
        There&rsquo;s a reason magnesium citrate is sold in the pharmacy
        laxative aisle. Magnesium draws water into the intestines through
        osmosis and relaxes the smooth muscle of the GI tract. When levels
        are low, things slow down.
      </p>
      <p>
        If you eat plenty of fiber, drink enough water, and still deal with
        sluggish motility, subclinical magnesium deficiency is one of the
        less obvious culprits worth considering.
      </p>

      <h3>8. Brain Fog and Scattered Focus</h3>
      <p>
        Magnesium is involved in synaptic plasticity &mdash; your brain&rsquo;s
        ability to form and strengthen connections. It also regulates NMDA
        receptors, which are central to learning and memory. Research from
        MIT, published in <em>Neuron</em> (2010), found that increasing
        brain magnesium levels (using magnesium L-threonate) enhanced
        synaptic density and improved both short-term and long-term memory
        in animal models. <EvidenceBadge level="moderate" />
      </p>
      <p>
        Human data on magnesium and cognition is still developing, but if
        you&rsquo;re experiencing that &ldquo;can&rsquo;t think straight&rdquo;
        feeling alongside other symptoms on this list, the connection is
        plausible.
      </p>

      <h2>A Quick Self-Assessment</h2>
      <p>
        Count how many of these apply to you:
      </p>
      <ul>
        <li>You drink 3+ cups of coffee daily</li>
        <li>You exercise intensely 3+ times per week</li>
        <li>Your diet includes significant processed or packaged food</li>
        <li>You&rsquo;re under chronic work or life stress</li>
        <li>You take a PPI, diuretic, or metformin</li>
        <li>You drink alcohol more than a couple times per week</li>
        <li>You&rsquo;re over 50 (absorption decreases with age)</li>
        <li>You have type 2 diabetes</li>
      </ul>
      <p>
        <strong>3+ risk factors plus 2+ symptoms?</strong> Your magnesium
        intake is almost certainly worth investigating. The good news: it&rsquo;s
        cheap, safe, and fast to address.
      </p>

      <h2>How to Fix It</h2>

      <h3>Start With Food</h3>
      <p>
        Before reaching for a bottle, look at your plate. These foods are
        legitimately high in magnesium (and come with other nutrients your
        body wants):
      </p>
      <ul>
        <li><strong>Pumpkin seeds:</strong> 156mg per ounce &mdash; the single best food source</li>
        <li><strong>Spinach (cooked):</strong> 157mg per cup</li>
        <li><strong>Dark chocolate (70%+):</strong> 65mg per ounce &mdash; yes, really</li>
        <li><strong>Black beans:</strong> 120mg per cup</li>
        <li><strong>Almonds:</strong> 80mg per ounce</li>
        <li><strong>Avocado:</strong> 58mg per avocado</li>
      </ul>
      <p>
        The RDA is 400&ndash;420mg for men and 310&ndash;320mg for women.
        Most people eating a whole-foods diet still land somewhere around
        250mg, which is why supplementation fills an important gap for many
        people.
      </p>

      <h3>Choosing the Right Form (This Actually Matters)</h3>
      <p>
        Not all magnesium is the same. The form determines how much you
        absorb, what it&rsquo;s best for, and what side effects you might
        experience. Here&rsquo;s the honest breakdown:
      </p>
      <ul>
        <li>
          <strong><a href="/guides/best-magnesium-supplements">Magnesium glycinate</a></strong> &mdash; The most popular form
          for a reason. Well-absorbed, gentle on the stomach, and the glycine
          component has its own calming properties. Best for: sleep, anxiety,
          general replenishment. This is what most people should start with.
        </li>
        <li>
          <strong>Magnesium L-threonate</strong> &mdash; The only form shown
          to meaningfully raise brain magnesium levels in research (the MIT
          study mentioned above). Best for: cognitive function and focus.
          Downside: lower elemental magnesium per dose, so you&rsquo;d need
          a separate form if correcting a broader deficiency.
        </li>
        <li>
          <strong>Magnesium citrate</strong> &mdash; Well-absorbed and
          affordable. Best for: people who also deal with constipation (it has
          a mild osmotic laxative effect). Can cause loose stools at higher
          doses &mdash; some people consider this a feature, not a bug.
        </li>
        <li>
          <strong>Magnesium taurate</strong> &mdash; The <a href="/guides/taurine-guide">taurine</a> component
          has cardiovascular benefits of its own. Some cardiologists
          specifically recommend this form. Best for: heart health focus.
        </li>
        <li>
          <strong>Magnesium oxide</strong> &mdash; Cheap and ubiquitous.
          But only about 4% is absorbed, making it one of the worst choices
          for actually correcting a deficiency. It&rsquo;s essentially a
          laxative. If this is what&rsquo;s in your current supplement, you&rsquo;re
          probably not absorbing much.
        </li>
      </ul>

      <Callout variant="warning" title="Avoid magnesium oxide">
        Magnesium oxide absorbs at roughly 4% &mdash; making it one of the
        worst choices for correcting a deficiency. If your current supplement
        uses oxide, you&rsquo;re essentially buying a laxative, not a
        magnesium supplement. Switch to glycinate, citrate, or threonate.
      </Callout>

      <p>
        For more on evaluating supplement quality, check our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          guide to reading supplement labels
        </a>.
      </p>

      <ProductCallout product={PRODUCTS["thorne-magnesium-bisglycinate"]} />

      <h3>Dosing and Timing</h3>
      <p>
        Start with <strong>200mg of elemental magnesium</strong> in the
        evening and work up to 300&ndash;400mg over a week or two. Taking it
        at night leverages the calming and sleep-supporting effects. Most
        people notice a difference in sleep quality within 3&ndash;5 days,
        with broader benefits (mood, cramps, energy) appearing over
        2&ndash;4 weeks.
      </p>

      <Callout variant="info" title="Elemental vs compound weight">
        A capsule labeled &ldquo;500mg magnesium glycinate&rdquo; contains
        roughly 70mg of actual magnesium. The rest is glycine. Always look at
        the Supplement Facts panel for the actual magnesium amount, not the
        compound weight.
      </Callout>

      <p>
        For a full breakdown of when to take magnesium relative to other
        supplements, see our{" "}
        <a href="/guides/supplement-timing-guide">
          supplement timing guide
        </a>.
      </p>

      <InteractionGroup title="Magnesium interactions">
        <InteractionCard
          type="synergy"
          a="Magnesium"
          b="Vitamin B6"
          effect="B6 may facilitate magnesium transport into cells. A 2018 PLOS ONE study found the combo more effective for stress than either alone."
          recommendation="Many quality magnesium products include B6 for this reason. Otherwise, your morning B-complex covers it."
        />
        <InteractionCard
          type="synergy"
          a="Magnesium"
          b="Vitamin D"
          effect="Magnesium is required for vitamin D activation. Low magnesium impairs the enzymes that convert D to its active form."
          recommendation="If you supplement vitamin D (most people should), ensure your magnesium is adequate for full benefit."
        />
        <InteractionCard
          type="conflict"
          a="Magnesium"
          b="Calcium (500mg+)"
          effect="At high doses, calcium and magnesium compete for absorption. This is less critical than calcium-iron but still worth separating."
          recommendation="Take calcium and magnesium at different times of day if taking therapeutic doses of both."
        />
      </InteractionGroup>

      <ProductRow
        title="Magnesium supplements — top scored"
        products={[
          PRODUCTS["thorne-magnesium-bisglycinate"],
          PRODUCTS["nootropics-depot-magnesium-glycinate"],
          PRODUCTS["thorne-magnesium-citramate"],
        ]}
      />

      <h2>Who Should Talk to a Doctor First</h2>
      <p>
        Magnesium supplementation is well-studied and well-tolerated by most healthy adults. But this guide recommends a broad protocol — and several populations need clinical input before following it.
      </p>

      <Callout variant="warning" title="If you have chronic kidney disease or impaired kidney function">
        Your kidneys are the primary way your body clears excess magnesium. If kidney function is compromised, even standard supplemental doses can cause magnesium to accumulate to dangerous levels (hypermagnesemia). Talk to your nephrologist or primary care provider before supplementing — this isn't a "start low and see" situation.
      </Callout>

      <Callout variant="warning" title="If you are pregnant or breastfeeding">
        Magnesium needs change during pregnancy, and some forms or doses may not be appropriate. The evidence base this guide draws from was not studied in pregnant populations. Talk to your OB or midwife before supplementing.
      </Callout>

      <Callout variant="warning" title="If you take thyroid medication, blood pressure medication, or calcium channel blockers">
        This guide flags interactions with PPIs, diuretics, antibiotics, and bisphosphonates — but magnesium can also affect absorption of levothyroxine and may interact with calcium channel blockers through a related mechanism. Bring your full medication list to your provider before adding magnesium.
      </Callout>

      <Callout variant="warning" title="If you are over 60">
        Absorption decreases with age, renal excretion patterns shift, and medication burden is typically higher. The dosing guidance in this guide was not calibrated for older adults specifically. Your provider can help determine the right form and dose for your situation.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list — including what you're considering — to your next provider visit.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Can you take too much magnesium?</h3>
      <p>
        From food, practically no &mdash; your kidneys excrete the excess.
        From supplements, the main risk is GI distress (loose stools,
        diarrhea) at higher doses, especially with citrate and oxide forms.
        The tolerable upper intake for supplemental magnesium is 350mg/day
        per NIH guidelines, though many people tolerate more without issues.
        People with kidney disease should consult a doctor before
        supplementing, as impaired kidneys can&rsquo;t clear excess
        magnesium effectively.
      </p>

      <h3>How fast will I notice a difference?</h3>
      <p>
        Sleep improvements are often the fastest &mdash; many people report
        better sleep within 3&ndash;7 days. Muscle cramps and twitches
        typically improve within 1&ndash;2 weeks. Mood and anxiety effects
        may take 2&ndash;6 weeks to become noticeable. If you&rsquo;re
        genuinely deficient, the first week often feels dramatic.
      </p>

      <h3>Should I take magnesium glycinate or threonate?</h3>
      <p>
        If you had to pick one: glycinate. It&rsquo;s better absorbed, has
        more elemental magnesium per dose, and covers the most common
        deficiency symptoms (sleep, cramps, anxiety, energy). Add threonate
        if cognitive function is a specific priority &mdash; some people take
        both (glycinate at night, threonate in the morning).
      </p>

      <h3>Does magnesium interfere with any other supplements?</h3>
      <p>
        High-dose calcium (500mg+) can compete with magnesium for absorption
        &mdash; separate them by 2 hours if you take both. Magnesium can also
        reduce absorption of certain antibiotics (tetracyclines,
        fluoroquinolones) and bisphosphonate medications. Space them
        2&ndash;3 hours apart.
      </p>

      <h3>Is magnesium safe to take every day long-term?</h3>
      <p>
        Yes. There is no evidence of harm from long-term daily magnesium
        supplementation at standard doses (200&ndash;400mg). Your body
        regulates magnesium through renal excretion &mdash; excess is
        eliminated in urine. Many integrative medicine practitioners consider
        it a foundational daily supplement alongside <a href="/guides/best-vitamin-d-supplements">vitamin D</a> and <a href="/guides/best-omega-3-supplements">omega-3</a>.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Magnesium deficiency is one of those problems that&rsquo;s incredibly
        common, genuinely affects quality of life, and remarkably easy to
        fix. The tricky part is recognizing it &mdash; because the symptoms
        are vague enough to blame on stress, aging, or poor sleep, and the
        standard blood test isn&rsquo;t designed to catch it.
      </p>
      <p>
        If you&rsquo;re dealing with a cluster of the symptoms above and
        you tick a few risk factors, a quality magnesium supplement is one of
        the lowest-risk, highest-potential-upside interventions you can try.
        Start with glycinate, take it at night, give it two weeks, and see
        what shifts.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog?q=magnesium">
          Compare magnesium supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
