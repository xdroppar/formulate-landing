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

export function BestSleepProtocol() {
  return (
    <>
      <TLDRBox
        readTime="10 min read"
        takeaways={[
          "Core stack: magnesium glycinate (200–400mg) + L-theanine (200mg) + glycine (3g) before bed",
          "This protocol costs under $1/night and is non-habit-forming",
          "Melatonin is safe but misunderstood — optimal sleep dose is 0.3mg, not 10mg",
          "Give the stack 2–3 weeks of consistent use before evaluating results",
        ]}
      />

      <p>
        It&rsquo;s 2 AM. You&rsquo;ve been lying there for an hour,
        mentally rehearsing tomorrow&rsquo;s to-do list while your body
        refuses to cooperate. So you reach for a melatonin gummy &mdash;
        the 10mg one, because the 5mg &ldquo;stopped working&rdquo; &mdash;
        and hope for the best. Sound familiar?
      </p>
      <p>
        Here&rsquo;s the problem: most people&rsquo;s sleep supplement
        strategy is backwards. They reach for the wrong compounds at the
        wrong doses while ignoring the ones with the strongest evidence.
        The research on sleep supplementation is actually quite clear, and
        the protocol that emerges from it is cheap, effective, and
        non&ndash;habit&ndash;forming. Let&rsquo;s build it.
      </p>

      <h2>Yes, Sleep Hygiene Matters &mdash; But You Already Know That</h2>

      <Callout variant="tip" title="The non-negotiable foundation">
        Consistent sleep/wake times, 65&ndash;68&deg;F bedroom, blackout curtains,
        no caffeine after noon, and screens off 30&ndash;60 minutes before bed.
        If you&rsquo;re doing none of them, supplements won&rsquo;t save you.
      </Callout>

      <p>
        Every sleep article opens with &ldquo;keep your room cool and dark
        and put your phone down.&rdquo; You&rsquo;ve heard it. So let&rsquo;s
        be brief. These are the foundation. If you&rsquo;re doing
        most of them and still struggling, that&rsquo;s exactly where targeted
        supplementation shines.
      </p>

      <h2>The Core Sleep Stack: Three Compounds, Strong Evidence</h2>
      <p>
        These three supplements have the best clinical support for improving
        sleep onset, depth, and overall quality. They work through different
        mechanisms, they&rsquo;re safe for long-term daily use, and they
        cost less than a dollar a night combined.
      </p>

      <h3>Magnesium Glycinate &mdash; 200&ndash;400mg Elemental (Before Bed)</h3>
      <p>
        If you only take one sleep supplement, make it this one. Magnesium
        regulates GABA receptors &mdash; the primary &ldquo;calm down&rdquo;
        signaling system in your brain. And roughly half of adults
        don&rsquo;t get enough from diet alone.
      </p>

      <Callout variant="evidence" title="RCT: magnesium improves sleep markers">
        A 2012 randomized controlled trial in the{" "}
        <em>Journal of Research in Medical Sciences</em> gave elderly insomniacs
        500mg of magnesium or placebo for 8 weeks. The magnesium group saw
        significant improvements in sleep efficiency, sleep time, melatonin
        levels, and serum cortisol. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        <strong>Why glycinate specifically?</strong> The glycinate form has
        two advantages. First, it&rsquo;s better absorbed than oxide or
        citrate without the laxative effect. Second, the glycine it&rsquo;s
        bonded to has its own independent sleep benefits (more on that in a
        moment). You&rsquo;re getting two sleep-active compounds in one
        supplement. If you suspect you&rsquo;re deficient, our{" "}
        <a href="/guides/signs-you-are-magnesium-deficient">
          magnesium deficiency guide
        </a>{" "}
        covers the signs to watch for.
      </p>

      <ProductCallout product={PRODUCTS["thorne-magnesium-bisglycinate"]} />

      <h3>L-Theanine &mdash; 200mg (Before Bed)</h3>
      <p>
        L-theanine is an amino acid found naturally in green tea, and
        it&rsquo;s one of the few supplements that relaxes you without
        sedating you. It works by promoting alpha brain wave activity &mdash;
        the pattern associated with calm, focused wakefulness &mdash; and
        by reducing the beta waves that characterize anxious mental chatter.
      </p>

      <Callout variant="evidence" title="Improved sleep quality without dependency">
        A 2019 randomized, placebo-controlled trial in <em>Nutrients</em> found
        that 200mg of L-theanine daily significantly improved sleep quality scores
        (PSQI) and reduced sleep disturbances. Unlike melatonin, your body
        doesn&rsquo;t develop tolerance. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        What makes L-theanine especially useful: it doesn&rsquo;t create
        dependency, it has no next-day grogginess, and it actually works
        better with consistent use rather than worse. The 200mg dose is the
        clinical sweet spot &mdash; going higher doesn&rsquo;t add much
        benefit.
      </p>

      <ProductCallout product={PRODUCTS["nootropics-depot-l-theanine"]} />

      <h3>Glycine &mdash; 3g (Before Bed)</h3>
      <p>
        This is the underrated workhorse of sleep supplementation.
        Glycine&rsquo;s mechanism is elegant: it lowers core body
        temperature by increasing blood flow to your extremities
        (peripheral vasodilation). Your body needs to drop its core
        temperature by about 1&ndash;2&deg;F to initiate sleep &mdash;
        glycine accelerates this process.
      </p>

      <Callout variant="evidence" title="Glycine improves deep sleep">
        Yamadera et al. (<em>Sleep and Biological Rhythms</em>, 2007) showed that
        3g of glycine before bed improved subjective sleep quality, reduced
        daytime sleepiness, and improved next-day cognition. A companion study in{" "}
        <em>Neuropsychopharmacology</em> confirmed glycine increased time spent in
        slow-wave (deep) sleep. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        Glycine is also dirt cheap. A month&rsquo;s supply in powder form
        costs $10&ndash;15 from most brands, dissolves easily in water, and
        has a mildly sweet taste. If you&rsquo;re already taking magnesium
        glycinate, you&rsquo;re getting some glycine from that, but not
        enough &mdash; the studies used 3g of free glycine on top of any
        other supplementation.
      </p>

      <ProductCallout product={PRODUCTS["thorne-glycine"]} />

      <h2>How to Take the Core Stack</h2>

      <ScheduleTable
        title="Sleep protocol timing"
        slots={[
          {
            emoji: "😴",
            label: "Before Bed",
            time: "30–60 min before sleep",
            color: "#6366F1",
            supplements: [
              "Magnesium Glycinate (200–400mg elemental)",
              "L-Theanine (200mg)",
              "Glycine (3g powder in water or herbal tea)",
            ],
            note: "Take all three together — they work through different mechanisms and are synergistic",
          },
        ]}
      />

      <p>
        Total cost: roughly $0.50&ndash;$1.00 per night depending on brands
        and sources. For a deeper dive on when to take supplements relative
        to meals and each other, see our{" "}
        <a href="/guides/supplement-timing-guide">
          supplement timing guide
        </a>.
      </p>

      <Callout variant="info" title="Give it time">
        Give this protocol at least 2&ndash;3 weeks of consistent use before
        evaluating. Magnesium levels take time to normalize if you&rsquo;re
        depleted, and the sleep architecture improvements from glycine are
        cumulative, not instant.
      </Callout>

      <InteractionGroup title="Sleep stack synergies">
        <InteractionCard
          type="synergy"
          a="Magnesium Glycinate"
          b="L-Theanine"
          effect="Magnesium regulates GABA receptors while L-theanine promotes alpha brain waves — complementary calming mechanisms."
          recommendation="Take together 30–60 min before bed for maximum effect."
        />
        <InteractionCard
          type="synergy"
          a="Magnesium Glycinate"
          b="Glycine"
          effect="The glycine in magnesium glycinate provides some glycine, but not enough for the 3g sleep dose. Adding free glycine compounds the benefit."
          recommendation="Take 3g free glycine powder in addition to your magnesium glycinate."
        />
      </InteractionGroup>

      <h2>Secondary Options: Worth Considering, Weaker Evidence</h2>

      <h3>Apigenin &mdash; 50mg (Before Bed)</h3>
      <p>
        Apigenin is a flavonoid found in chamomile that acts as a mild
        anxiolytic through GABA-A receptor modulation. The direct clinical
        evidence for sleep is thinner than the core three &mdash; most of
        the data comes from chamomile extract studies rather than isolated
        apigenin. <EvidenceBadge level="emerging" /> That said, it&rsquo;s safe, inexpensive, and many users
        report a noticeable calming effect. It gained popularity through
        Andrew Huberman&rsquo;s sleep protocol, and while it&rsquo;s not a
        must-have, it&rsquo;s a reasonable addition if the core stack alone
        isn&rsquo;t quite enough.
      </p>

      <h3>Tart Cherry Extract &mdash; 500mg (With Dinner)</h3>
      <p>
        Tart cherry contains natural melatonin precursors and
        anti-inflammatory anthocyanins. A 2018 pilot study in the{" "}
        <em>American Journal of Therapeutics</em> found that tart cherry
        juice increased sleep time by 84 minutes and improved sleep
        efficiency. <EvidenceBadge level="emerging" /> The study was small, but the signal is interesting &mdash;
        particularly for people who exercise heavily, since the
        anti-inflammatory benefits may compound the sleep benefits. Think of
        this as a &ldquo;nice to have,&rdquo; not a cornerstone.
      </p>

      <h2>What to Avoid (and Why)</h2>

      <h3>Melatonin: Misunderstood, Not Bad</h3>

      <Callout variant="info" title="The optimal melatonin dose is 0.3mg, not 10mg">
        A 2005 MIT study (Zhdanova et al.) found that the optimal chronobiotic dose
        for sleep onset is <strong>0.3mg</strong> &mdash; one-thirtieth of what
        most products contain. At higher doses, melatonin caused next-day
        grogginess. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        Walk into any drugstore and you&rsquo;ll find melatonin gummies with
        5, 10, even 15mg per serving. For <em>sleep onset</em> specifically,
        these are overkill. Melatonin is a chronobiotic, not a sedative. It tells your brain
        what time it is, not to go to sleep. For jet lag or circadian rhythm
        shifts, 0.3&ndash;0.5mg is the evidence-based dose and it works
        well for that purpose.
      </p>

      <Callout variant="evidence" title="Melatonin does NOT suppress natural production">
        This myth has been repeated so often it became accepted wisdom, but a study
        by Matsumoto et al. (1997) in <em>Clinical Endocrinology</em> found that
        exogenous melatonin can shift the timing of pineal secretion but does not
        reduce its amplitude. No withdrawal, no rebound insomnia, and no
        downregulation have been demonstrated even with long-term use. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        What about high-dose melatonin? This is where it gets interesting.
        Beyond its role as a sleep timing signal, melatonin is a powerful
        endogenous antioxidant. Some researchers are actively studying
        higher doses (3&ndash;10mg+) for antioxidant, anti-inflammatory,
        and neuroprotective effects &mdash; a completely separate use case
        from sleep onset. A 2023 review in <em>Antioxidants</em> highlighted
        melatonin&rsquo;s ability to neutralize free radicals, reduce
        oxidative stress, and support mitochondrial function at
        pharmacological doses. <EvidenceBadge level="emerging" /> Some longevity-focused practitioners
        deliberately megadose melatonin for these properties.
      </p>
      <p>
        The bottom line on melatonin: it&rsquo;s safe, it doesn&rsquo;t
        suppress your natural production, and it has legitimate uses at both
        low doses (circadian signaling) and higher doses (antioxidant). The
        reason we don&rsquo;t include it in the core sleep stack above is
        simply that magnesium, L-theanine, and glycine address the actual
        mechanisms of poor sleep more directly. If you&rsquo;re already
        taking melatonin and it works for you, there&rsquo;s no reason to
        stop.
      </p>

      <h3>Valerian Root</h3>

      <Callout variant="warning" title="Weak evidence for valerian">
        A 2006 meta-analysis in the <em>American Journal of Medicine</em> found
        valerian might improve subjective sleep quality but showed no significant
        improvement in objective measures like sleep latency or efficiency. Product
        standardization is also a mess. <EvidenceBadge level="mixed" />
      </Callout>

      <h3>Oral GABA Supplements</h3>
      <p>
        GABA is the primary inhibitory neurotransmitter &mdash; exactly what
        you&rsquo;d want more of for sleep. The problem: supplemental GABA
        doesn&rsquo;t cross the blood-brain barrier effectively when taken
        orally. Any calming effect people report is likely either placebo
        or mediated by peripheral nervous system receptors in the gut. Your
        money is better spent on compounds that actually reach the brain
        (like magnesium, which modulates GABA receptors directly).
      </p>

      <h3>Diphenhydramine (Benadryl, ZzzQuil)</h3>

      <Callout variant="warning" title="Antihistamines degrade sleep quality">
        Not technically a supplement, but so commonly used for sleep it&rsquo;s
        worth addressing. Antihistamines produce drowsiness but reduce time in
        REM and deep sleep. Tolerance develops within days. Long-term
        anticholinergic use is associated with increased dementia risk per a 2015
        study in <em>JAMA Internal Medicine</em>. <EvidenceBadge level="strong" />
      </Callout>

      <h2>A Note on Expectations</h2>
      <p>
        No supplement will fix truly pathological insomnia. If you&rsquo;ve
        been struggling with sleep for months despite good hygiene, talk to
        a doctor. Cognitive behavioral therapy for insomnia (CBT-I) has a
        stronger evidence base than any supplement and addresses root
        causes rather than symptoms.
      </p>
      <p>
        What this protocol <em>will</em> do is shave 10&ndash;20 minutes
        off sleep onset, increase time in deep sleep, reduce nighttime
        awakenings, and improve how you feel in the morning. For most people
        with &ldquo;okay but not great&rdquo; sleep, that&rsquo;s a
        meaningful upgrade. If you&rsquo;re interested in how better sleep
        fits into a broader longevity strategy, check out our{" "}
        <a href="/guides/beginner-longevity-supplement-stack">
          beginner longevity stack guide
        </a>.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Can I take all three core supplements together?</h3>
      <p>
        Yes. <a href="/guides/best-magnesium-supplements">Magnesium glycinate</a>, L-theanine, and glycine work through
        different mechanisms and don&rsquo;t compete for absorption or
        interfere with each other. Taking them together 30&ndash;60 minutes
        before bed is the simplest approach and how most people run this
        protocol. No need to stagger them.
      </p>

      <h3>Will I become dependent on sleep supplements?</h3>
      <p>
        Not with this stack. Unlike prescription sleep medications (or even
        high-dose melatonin), magnesium, L-theanine, and glycine do not
        create physical dependency. You can stop taking them at any time
        without rebound insomnia. Your sleep may return to its previous
        baseline, but it won&rsquo;t get worse than it was before you
        started.
      </p>

      <h3>How long before I notice a difference?</h3>
      <p>
        Some people notice improved relaxation the first night, especially
        from L-theanine and glycine. But the full effect &mdash;
        particularly from magnesium &mdash; builds over 2&ndash;3 weeks as
        your body&rsquo;s stores normalize. Judge the protocol at the
        3-week mark, not after one night.
      </p>

      <h3>What if I&rsquo;m already taking a multivitamin with magnesium?</h3>
      <p>
        Most multivitamins contain 50&ndash;100mg of magnesium, often in
        oxide form (poorly absorbed). That&rsquo;s not enough to affect
        sleep meaningfully. You can still take 200&ndash;400mg of magnesium
        glycinate in the evening &mdash; the total is well within safe
        limits. The upper tolerable intake for supplemental magnesium is
        350mg elemental per day (from supplements, not counting food), so
        adjust accordingly.
      </p>

      <h2>Build This Protocol in Formulate</h2>
      <p>
        Add each of these supplements to your personal stack in Formulate
        to track your doses, compare brands by evidence score, and see your
        nightly cost. The app flags potential interactions and redundancies
        automatically, so you&rsquo;ll know if anything in your broader
        stack conflicts with this sleep protocol.
      </p>

      <ProductRow
        title="Build the sleep stack"
        products={[
          PRODUCTS["thorne-magnesium-bisglycinate"],
          PRODUCTS["nootropics-depot-l-theanine"],
          PRODUCTS["thorne-glycine"],
        ]}
      />

      <p>
        <a href="https://app.formulate-health.app/catalog?q=sleep">
          Browse sleep supplements in the catalog &rarr;
        </a>
      </p>
    </>
  );
}
