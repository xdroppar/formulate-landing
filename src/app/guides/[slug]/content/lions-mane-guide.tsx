import {
  TLDRBox,
  Callout,
  ProductRow,
  InteractionCard,
  InteractionGroup,
  EvidenceBadge,
  PRODUCTS,
} from "@/components/guide";

export function LionsManeGuide() {
  return (
    <>
      <TLDRBox
        readTime="10 min read"
        takeaways={[
          "Lion's mane stimulates nerve growth factor (NGF) — a unique mechanism among nootropics",
          "The Mori 2009 RCT showed significant cognitive improvement over 16 weeks in mild cognitive impairment",
          "Buy fruiting body dual extract with ≥25% beta-glucans — avoid mycelium-on-grain products",
          "Expect 2–4 weeks before noticing effects; benefits compound over months of use",
        ]}
      />

      <p>
        Lion&rsquo;s mane mushroom supports cognitive function by stimulating{" "}
        <strong>nerve growth factor (NGF)</strong>, a protein the brain uses
        to grow and maintain neurons. This mechanism is backed by
        peer-reviewed neuroscience, not marketing claims &mdash; making
        lion&rsquo;s mane one of the few{" "}
        <a href="/guides/nootropics-guide">nootropics</a> with a genuinely
        interesting biological basis worth examining closely.
      </p>

      <h2>Why NGF Matters (and Why It&rsquo;s Unusual)</h2>
      <p>
        Most cognitive supplements work by tweaking neurotransmitter levels
        &mdash; more dopamine here, more acetylcholine there. Lion&rsquo;s
        mane does something structurally different. The active compounds,{" "}
        <strong>hericenones</strong> (found in the fruiting body) and{" "}
        <strong>erinacines</strong> (found in the mycelium), have been shown
        to cross the blood-brain barrier and stimulate the production of NGF
        and brain-derived neurotrophic factor (BDNF).{" "}
        <EvidenceBadge level="strong" />
      </p>

      <Callout variant="evidence" title="Unique mechanism">
        Unlike most nootropics that tweak neurotransmitter levels, lion&rsquo;s
        mane stimulates NGF — promoting new nerve cell growth, myelination,
        and neuron survival. This was first demonstrated by Kawagishi et al.
        (1991) and confirmed in subsequent studies.{" "}
        <EvidenceBadge level="strong" />
      </Callout>

      <p>
        Think of NGF as fertilizer for your neurons. It promotes the growth
        of new nerve cells, supports myelination (the insulating sheath
        around nerve fibers that speeds signal transmission), and helps
        existing neurons survive longer. This was first demonstrated by
        Kawagishi et al. in a 1991 paper in <em>Tetrahedron Letters</em>,
        and subsequent studies in <em>Biological &amp; Pharmaceutical
        Bulletin</em> confirmed that hericenones C through H all stimulate
        NGF synthesis in vitro.
      </p>
      <p>
        This is why lion&rsquo;s mane interests longevity researchers &mdash;
        it&rsquo;s not just about feeling sharper today, it&rsquo;s about
        supporting the structural health of your brain over decades. If
        you&rsquo;re building a{" "}
        <a href="/guides/beginner-longevity-supplement-stack">
          longevity-focused supplement stack
        </a>, lion&rsquo;s mane is one of the more evidence-backed options
        for the cognitive pillar.
      </p>

      <h2>The Human Evidence: What We Actually Know</h2>
      <p>
        The most cited human study on lion&rsquo;s mane is the{" "}
        <strong>Mori et al. 2009</strong> randomized, double-blind,
        placebo-controlled trial published in <em>Phytotherapy Research</em>.
        Thirty Japanese men and women aged 50&ndash;80, all diagnosed with
        mild cognitive impairment, took 250mg lion&rsquo;s mane tablets four
        times daily (1,000mg/day of 96% dry powder) for 16 weeks.{" "}
        <EvidenceBadge level="moderate" />
      </p>
      <p>
        The results: the lion&rsquo;s mane group showed{" "}
        <strong>significantly improved cognitive function scores</strong> at
        weeks 8, 12, and 16 compared to placebo, measured by the Revised
        Hasegawa Dementia Scale. The improvement was dose-dependent over
        time &mdash; meaning the longer they took it, the better the scores
        got.
      </p>

      <Callout variant="evidence" title="Benefits reverse when you stop">
        In the Mori 2009 trial, when participants stopped lion&rsquo;s mane
        after 16 weeks, cognitive scores declined back toward baseline within
        4 weeks. This suggests the effect is real, ongoing, and requires
        sustained supplementation to maintain.
      </Callout>

      <p>
        Here&rsquo;s the part that makes this study especially interesting:
        when participants stopped taking lion&rsquo;s mane after 16 weeks,{" "}
        <strong>their cognitive scores declined back toward baseline</strong>{" "}
        within 4 weeks. This suggests the effect is real and ongoing, not a
        one-time boost. Your brain appears to need sustained NGF support to
        maintain the benefit.
      </p>
      <p>
        Beyond cognition, <strong>Nagano et al. (2010)</strong> published a
        study in <em>Biomedical Research</em> showing that women who consumed
        lion&rsquo;s mane cookies (containing 500mg of fruiting body powder)
        for four weeks reported significantly reduced feelings of anxiety,
        irritation, and depression compared to placebo. The mechanism is
        thought to involve NGF&rsquo;s role in hippocampal neurogenesis,
        which is linked to mood regulation.{" "}
        <EvidenceBadge level="moderate" />
      </p>

      <h2>The Fruiting Body vs. Mycelium Debate</h2>
      <p>
        This is where the lion&rsquo;s mane market gets messy, and where
        reading your label carefully matters. (If you need a refresher on
        label literacy, our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          guide to reading supplement labels
        </a>{" "}
        covers the fundamentals.)
      </p>
      <p>
        Lion&rsquo;s mane has two parts: the <strong>fruiting body</strong>{" "}
        (the visible mushroom &mdash; the pompom you&rsquo;d see growing on
        a tree) and the <strong>mycelium</strong> (the root-like network that
        grows underground or, in supplement production, on a grain substrate).
      </p>
      <p>
        Here&rsquo;s the distinction that matters:
      </p>
      <ul>
        <li>
          <strong>Fruiting body</strong> contains hericenones &mdash; the
          compounds shown to stimulate NGF. It also has higher beta-glucan
          content (the polysaccharides responsible for immune support).
        </li>
        <li>
          <strong>Mycelium</strong> contains erinacines &mdash; which also
          stimulate NGF and may actually be more potent in some in vitro
          studies. However, most mycelium-based supplements are grown on grain
          (usually rice or oats), and the final product can be{" "}
          <strong>30&ndash;70% residual starch filler</strong> that&rsquo;s
          never separated from the mycelium.
        </li>
      </ul>

      <Callout variant="warning" title="Watch out for starch filler">
        Most mycelium-on-grain products contain 30&ndash;70% residual starch.
        You&rsquo;re paying for rice flour, not mushroom. Always check for
        starch content &lt;5% and beta-glucan content &ge;25%.
      </Callout>

      <p>
        In an ideal world, you&rsquo;d want both hericenones and erinacines.
        In practice, fruiting body extracts are more reliable because
        you&rsquo;re getting the actual mushroom tissue, not a mix of
        mycelium and grain starch. If you go the mycelium route, look for
        products that explicitly state the grain substrate has been removed
        &mdash; but these are rare and expensive.
      </p>

      <h2>Extraction Method: Why &ldquo;Dual Extract&rdquo; Wins</h2>
      <p>
        The active compounds in lion&rsquo;s mane have different solubility
        profiles. Beta-glucans and some hericenones are{" "}
        <strong>water-soluble</strong>. Other hericenones and the triterpenes
        are <strong>alcohol-soluble</strong>. A simple dried powder
        won&rsquo;t fully liberate either group because the compounds are
        locked inside the chitin cell walls of the mushroom.
      </p>

      <Callout variant="tip" title="Look for dual extraction">
        A dual extract (hot water + alcohol extraction) breaks down chitin
        cell walls and pulls out both water-soluble and fat-soluble active
        compounds. Products labeled simply as &ldquo;lion&rsquo;s mane
        powder&rdquo; without mentioning extraction are likely just dried,
        ground mushroom — much less bioavailable.
      </Callout>

      <p>
        A <strong>dual extract</strong> (hot water extraction + alcohol
        extraction) breaks down the chitin and pulls out both water-soluble
        and fat-soluble active compounds. This is the gold standard for
        medicinal mushroom supplements, and you should look for it on the
        label. Products labeled simply as &ldquo;lion&rsquo;s mane
        powder&rdquo; without mentioning extraction are likely just dried,
        ground mushroom &mdash; much less bioavailable.
      </p>

      <h2>What to Look for When Buying</h2>
      <p>
        Here are the concrete quality markers, in order of importance:
      </p>
      <ul>
        <li>
          <strong>Fruiting body extract</strong> (not &ldquo;myceliated
          grain&rdquo; or &ldquo;full spectrum&rdquo; without clarification).
        </li>
        <li>
          <strong>Dual extraction</strong> (hot water + alcohol).
        </li>
        <li>
          <strong>Beta-glucan content &ge; 25%.</strong> This is the most
          reliable quality marker. Higher is generally better. Some premium
          products hit 30&ndash;40%. If the label doesn&rsquo;t list
          beta-glucan content at all, that&rsquo;s a red flag.
        </li>
        <li>
          <strong>Starch content &lt; 5%.</strong> High starch indicates
          grain filler from mycelium-on-grain products. Some brands now test
          and disclose this. Low starch = more actual mushroom.
        </li>
        <li>
          <strong>Third-party testing</strong> for heavy metals, especially
          if the mushrooms are grown in China (which most are &mdash; China
          produces over 85% of the world&rsquo;s medicinal mushrooms).
        </li>
      </ul>

      <h2>Dosing and Timing</h2>
      <p>
        Based on the human studies and clinical usage:
      </p>
      <ul>
        <li>
          <strong>Dose:</strong> 500&ndash;3,000mg per day of fruiting body
          extract. The Mori 2009 study used 1,000mg/day. Most practitioners
          recommend starting at 500&ndash;1,000mg and working up if desired.
        </li>
        <li>
          <strong>Timing:</strong> morning or early afternoon. Some people
          report a subtle stimulating or focus-enhancing effect, so evening
          dosing can occasionally interfere with sleep. That said, others
          find it calming &mdash; experiment and see where it fits your
          routine. (Our{" "}
          <a href="/guides/supplement-timing-guide">
            supplement timing guide
          </a>{" "}
          covers how to schedule your full stack.)
        </li>
        <li>
          <strong>With or without food:</strong> either works. Taking it with
          a meal that contains some fat may improve absorption of the
          alcohol-soluble compounds, but this isn&rsquo;t make-or-break.
        </li>
        <li>
          <strong>Onset:</strong> expect 2&ndash;4 weeks before noticing
          cognitive effects. This is not caffeine &mdash; NGF-mediated
          neuronal growth is a slow, structural process. If someone tells you
          lion&rsquo;s mane &ldquo;kicked in&rdquo; on day two, that&rsquo;s
          placebo.
        </li>
      </ul>

      <h2>&ldquo;Can I Just Eat Lion&rsquo;s Mane Mushrooms?&rdquo;</h2>
      <p>
        Yes, absolutely. Lion&rsquo;s mane is a legitimate culinary mushroom
        with a flavor often compared to crab or lobster. It&rsquo;s delicious
        saut&eacute;ed in butter. You can find it at farmers&rsquo; markets,
        Asian grocery stores, and increasingly at regular supermarkets.
      </p>
      <p>
        The catch is dosing. A typical serving of fresh lion&rsquo;s mane
        (about 100g) contains roughly the equivalent of 10g of dried
        mushroom. But &ldquo;dried mushroom&rdquo; is not the same as
        &ldquo;extract.&rdquo; An extract concentrates the active compounds,
        typically at a 4:1 to 12:1 ratio. So you&rsquo;d need to eat roughly
        150&ndash;300g of fresh lion&rsquo;s mane daily to approximate the
        active compound content of a 1,000mg extract dose.
      </p>
      <p>
        That&rsquo;s doable if you love mushrooms and have a reliable
        supply, but most people find supplementation more practical for
        consistent, targeted dosing.
      </p>

      <h2>Safety and Side Effects</h2>
      <p>
        Lion&rsquo;s mane has an excellent safety profile. No serious adverse
        effects have been reported in human clinical trials. The most common
        complaints are mild digestive discomfort (nausea, bloating) at higher
        doses, which typically resolves within a few days or by taking it
        with food.
      </p>

      <Callout variant="warning" title="Allergy and medication cautions">
        If you have a mushroom allergy, avoid lion&rsquo;s mane. People on
        anticoagulant or antiplatelet medications should consult their doctor,
        as lion&rsquo;s mane may have mild antiplatelet activity.
      </Callout>

      <p>
        One caution: if you have a mushroom allergy, avoid lion&rsquo;s mane
        supplements. There have been rare case reports of allergic reactions,
        including contact dermatitis and respiratory symptoms, in individuals
        with known fungal sensitivities.
      </p>
      <p>
        People on anticoagulant or antiplatelet medications should consult
        their doctor before supplementing, as lion&rsquo;s mane may have
        mild antiplatelet activity based on in vitro data.
      </p>

      <h2>Who Should Talk to a Doctor First</h2>
      <p>
        Lion's mane is generally well-tolerated in the limited human trials conducted so far. But "limited" is the key word — the primary RCT involved just 30 participants, all older adults with mild cognitive impairment. If you fall outside that narrow profile, or take medications that could interact, get clinical input before starting.
      </p>

      <Callout variant="warning" title="If you take blood thinners or antiplatelet drugs">
        Lion's mane may have antiplatelet activity. If you're on warfarin, aspirin, clopidogrel, or regular NSAIDs, talk to your prescriber before supplementing — this is a real interaction concern, not a theoretical one.
      </Callout>

      <Callout variant="warning" title="If you are pregnant or breastfeeding">
        No safety data exists for lion's mane during pregnancy or lactation. Until evidence says otherwise, consult your OB-GYN or midwife before use.
      </Callout>

      <Callout variant="warning" title="If you take antidepressants (SSRIs, SNRIs, or similar)">
        The mood-related findings from the Nagano 2010 study are preliminary and should not substitute for clinical treatment. Talk to your prescriber before combining lion's mane with psychiatric medications.
      </Callout>

      <Callout variant="warning" title="If you have a history of allergies — especially to fungi">
        Rare but serious allergic reactions, including respiratory symptoms and eosinophilia, have been documented in case reports. A known mushroom or mold allergy is a clear reason to avoid lion's mane entirely or proceed only under medical supervision.
      </Callout>

      <Callout variant="warning" title="If you are a healthy adult under 50 without cognitive impairment">
        The existing human evidence comes from older adults with diagnosed mild cognitive impairment. Whether lion's mane benefits younger, cognitively healthy adults is an open question — not a settled one. Manage your expectations accordingly.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list — including what you're considering — to your next provider visit.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>How long does lion&rsquo;s mane take to work?</h3>
      <p>
        Most people notice subtle improvements in focus, verbal fluency, or
        mental clarity after 2&ndash;4 weeks of consistent daily use. The
        Mori 2009 study showed progressive improvement at 8, 12, and 16
        weeks, suggesting benefits compound over time. Don&rsquo;t judge it
        after three days &mdash; the mechanism (NGF stimulation and
        neurogenesis) is a biological process that takes time.
      </p>

      <h3>Can I take lion&rsquo;s mane with other nootropics or supplements?</h3>
      <p>
        Yes. Lion&rsquo;s mane plays well with most supplement stacks.
        It&rsquo;s commonly paired with omega-3s (which also support
        neuroplasticity), <a href="/guides/best-vitamin-d-supplements">vitamin D</a>, and adaptogens like <a href="/guides/ashwagandha-guide">ashwagandha</a>. There
        are no known significant drug interactions in the published
        literature, though if you&rsquo;re on prescription medications,
        check with your doctor as a standard precaution.
      </p>

      <InteractionGroup title="Lion's mane pairings">
        <InteractionCard
          type="synergy"
          a="Lion's Mane"
          b="Omega-3 (DHA)"
          effect="Both support neuroplasticity through complementary mechanisms — NGF stimulation (lion's mane) and membrane fluidity/anti-inflammation (DHA)."
          recommendation="Take together for comprehensive cognitive support."
        />
        <InteractionCard
          type="synergy"
          a="Lion's Mane"
          b="Ashwagandha"
          effect="Lion's mane for cognitive clarity, ashwagandha for stress-related cognitive fog. Different mechanisms, complementary outcomes."
          recommendation="Lion's mane in the morning, ashwagandha morning or evening depending on extract type."
        />
      </InteractionGroup>

      <h3>Is lion&rsquo;s mane a psychedelic or does it cause a &ldquo;high&rdquo;?</h3>
      <p>
        No. Despite being a mushroom, lion&rsquo;s mane has zero
        psychoactive properties. It contains no psilocybin, psilocin, or
        any other psychedelic compound. It will not alter your state of
        consciousness, produce euphoria, or impair your ability to drive or
        work. The &ldquo;mushroom nootropic&rdquo; marketing sometimes
        creates confusion here, but this is a functional food mushroom,
        not a psychoactive one.
      </p>

      <h3>Fruiting body or mycelium &mdash; which should I actually buy?</h3>
      <p>
        For most people, <strong>fruiting body extract</strong> is the safer
        bet. It has more consistent active compound content, verified
        beta-glucan levels, and avoids the grain starch contamination
        issue. If you want to try mycelium, look for brands that
        specifically separate the mycelium from its growth substrate and
        verify low starch content (&lt;5%). These products exist but are
        less common and more expensive.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Lion&rsquo;s mane is one of the few nootropic supplements with a
        plausible, well-studied biological mechanism &mdash; NGF stimulation
        &mdash; and actual human trial data showing cognitive benefits.
        It&rsquo;s not a miracle pill, and the research is still young, but
        the risk-to-reward ratio is favorable: excellent safety profile,
        reasonable cost, and a unique mechanism you won&rsquo;t get from
        other supplements.
      </p>
      <p>
        Buy a fruiting body dual extract with &ge;25% beta-glucans. Start at
        500&ndash;1,000mg per day. Give it a month. If you notice sharper
        focus or easier word recall, you&rsquo;ve got your answer. If not,
        it&rsquo;s not for everyone &mdash; and that&rsquo;s fine too.
      </p>

      <ProductRow
        title="Pair with your cognitive stack"
        products={[
          PRODUCTS["thorne-omega-3-coq10"],
          PRODUCTS["nootropics-depot-cognizin"],
          PRODUCTS["thorne-ashwagandha"],
        ]}
      />

      <p>
        <a href="https://app.formulate-health.app/catalog?q=lion%27s+mane">
          Compare lion&rsquo;s mane supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
