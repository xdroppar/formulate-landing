import {
  TLDRBox,
  Callout,
  ProductCallout,
  EvidenceBadge,
  InteractionCard,
  InteractionGroup,
  PRODUCTS,
} from "@/components/guide";

export function WhatToLookForInProbiotic() {
  return (
    <>
      <TLDRBox
        readTime="8 min read"
        takeaways={[
          "Strain specificity is the #1 factor — L. rhamnosus GG has 1,000+ studies; a different L. rhamnosus strain may have zero",
          "Most clinical trials showing real benefits use 1-20 billion CFU — not the 100+ billion marketed by many brands",
          "If a probiotic doesn't list specific strain designations (the letters after the species), you can't evaluate its evidence",
          "Match the strain to your goal: S. boulardii for antibiotics, LP299V for IBS bloating, LGG for general gut health",
        ]}
      />

      <p>
        Walk into any pharmacy and you&rsquo;ll see it: an entire aisle of
        probiotic products, each one louder than the last. &ldquo;50 billion
        CFU!&rdquo; &ldquo;30 clinically studied strains!&rdquo;
        &ldquo;Immune support + digestive health + mood + weight
        management!&rdquo;
      </p>
      <p>
        Here&rsquo;s the problem: almost none of that marketing tells you
        anything useful. The probiotic industry has a unique issue that most
        supplement categories don&rsquo;t &mdash; the thing that actually
        determines whether a probiotic works (the specific <em>strain</em>)
        is the thing most products don&rsquo;t even list on the label.
      </p>
      <p>
        This guide will teach you to cut through the noise and choose a
        probiotic that has actual clinical evidence behind it &mdash; not
        just a big number on the box.
      </p>

      <h2>The One Thing Most People Get Wrong</h2>
      <p>
        When people shop for probiotics, they look at CFU count (how many
        organisms), maybe the number of strains, and the price. These are
        the three <em>least</em> important factors. The single most important
        factor is one that most consumers don&rsquo;t even know to look
        for: <strong>strain specificity</strong>.
      </p>

      <Callout variant="warning" title="The #1 red flag">
        If a probiotic product doesn&rsquo;t list specific strain designations
        (the letters/numbers after the species name), you literally cannot
        evaluate whether it has any evidence behind it. <em>L. rhamnosus
        GG</em> has over 1,000 published studies. A different{" "}
        <em>L. rhamnosus</em> strain may have zero. Same species, completely
        different evidence.
      </Callout>

      <p>
        A probiotic organism is identified by three parts: genus, species,
        and strain. For example: <em>Lactobacillus rhamnosus{" "}
        <strong>GG</strong></em>. That last part &mdash; GG &mdash; is the
        strain designation. And it makes all the difference.
      </p>
      <p>
        <em>Lactobacillus rhamnosus GG</em> has been the subject of over
        1,000 published studies. It has strong evidence for preventing
        antibiotic-associated diarrhea, reducing IBS symptoms, and supporting
        immune function in children. A <em>different</em> strain of{" "}
        <em>Lactobacillus rhamnosus</em> &mdash; say, one with no strain
        designation or a different code &mdash; may have zero clinical
        evidence. Same genus. Same species. Completely different evidence
        base.
      </p>

      <h2>CFU Count: Why Bigger Isn&rsquo;t Better</h2>
      <p>
        The marketing arms race around CFU (Colony Forming Units) has gotten
        absurd. Products now advertise 100 billion, 200 billion CFU. The
        implication is that more = better. The research says otherwise.
      </p>

      <Callout variant="evidence" title="What the research actually uses">
        Most clinical trials showing real benefits use{" "}
        <strong>1&ndash;20 billion CFU</strong> of specific strains. The
        studies demonstrating <em>L. rhamnosus GG</em>&rsquo;s benefits used
        10 billion CFU. <em>S. boulardii</em> for antibiotic-associated
        diarrhea? 5&ndash;10 billion CFU. <em>B. longum 35624</em> for IBS?
        Just 1 billion. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        What actually matters about CFU:
      </p>
      <ul>
        <li>
          <strong>CFU at expiration, not at manufacture.</strong> Probiotics
          die over time. Heat, moisture, and oxygen kill them. A product
          boasting &ldquo;100 billion at time of manufacture&rdquo; might
          deliver 10 billion by the time you open it. The only number that
          matters is what&rsquo;s guaranteed <em>through the expiration
          date</em>. If the label doesn&rsquo;t specify, assume the worst.
        </li>
        <li>
          <strong>CFU per strain, not per blend.</strong> &ldquo;50 billion
          CFU from 30 strains&rdquo; sounds impressive. But that&rsquo;s an
          average of 1.6 billion per strain &mdash; potentially below clinical
          thresholds for any of them. What you want is a product with
          clinically studied doses of a <em>few well-chosen</em> strains,
          not a shotgun blast of 30.
        </li>
        <li>
          <strong>Survival matters more than quantity.</strong> 100 billion
          organisms that die in stomach acid before reaching your intestines
          are worth less than 5 billion that actually survive the trip. Which
          brings us to delivery.
        </li>
      </ul>

      <h2>The Strains Worth Knowing About</h2>
      <p>
        If a product contains one of these strains at the studied dose, it
        has real evidence behind it &mdash; not just marketing:
      </p>
      <ul>
        <li>
          <strong>Lactobacillus rhamnosus GG (LGG):</strong> The most studied
          probiotic strain in the world. Strong evidence for
          antibiotic-associated diarrhea prevention, IBS symptom reduction,
          and pediatric gastroenteritis. Studied at 10&ndash;20 billion CFU. <EvidenceBadge level="strong" />
        </li>
        <li>
          <strong>Saccharomyces boulardii (CNCM I-745):</strong> Not a
          bacterium &mdash; it&rsquo;s a yeast. And that&rsquo;s its
          superpower: it&rsquo;s naturally antibiotic-resistant, so you can
          take it <em>during</em> an antibiotic course without it being
          killed. Strong evidence for C. difficile prevention and
          traveler&rsquo;s diarrhea. Studied at 5&ndash;10 billion CFU. <EvidenceBadge level="strong" />
        </li>
        <li>
          <strong>Bifidobacterium lactis BB-12:</strong> One of the
          best-documented bifidobacteria. Evidence for improved regularity,
          immune function in infants, and gut barrier integrity. Studied at
          1&ndash;10 billion CFU. <EvidenceBadge level="strong" />
        </li>
        <li>
          <strong>Lactobacillus plantarum 299v (LP299V):</strong> Specifically
          studied for IBS, particularly bloating and abdominal pain. Multiple
          RCTs showing benefit. Studied at 10&ndash;20 billion CFU. <EvidenceBadge level="strong" />
        </li>
        <li>
          <strong>Bifidobacterium longum 35624:</strong> Also known as
          Alflorex&reg;. Evidence from multiple trials for IBS symptom
          improvement (bloating, pain, bowel habit). Studied at 1 billion
          CFU &mdash; proving that low-dose, single-strain products can be
          highly effective. <EvidenceBadge level="strong" />
        </li>
      </ul>

      <Callout variant="tip" title="Match strain to goal">
        &ldquo;I want better gut health&rdquo; isn&rsquo;t specific enough.
        &ldquo;I get IBS bloating&rdquo; points you toward LP299V or B.
        longum 35624. &ldquo;I&rsquo;m going on antibiotics&rdquo; points
        you toward S. boulardii. This is strain-specific medicine, not
        one-size-fits-all.
      </Callout>

      <ProductCallout product={PRODUCTS["thorne-floramend"]} />

      <h2>Delivery: Getting Them There Alive</h2>
      <p>
        Your stomach has a pH of 1.5&ndash;3.5. That&rsquo;s acidic enough
        to dissolve metal. Most probiotic bacteria die in it. How a product
        handles this determines whether you&rsquo;re swallowing live
        organisms or expensive dead ones.
      </p>
      <ul>
        <li>
          <strong>Enteric-coated or delayed-release capsules:</strong> These
          resist stomach acid and dissolve in the less acidic environment of
          the small intestine. This is the most reliable delivery method for
          acid-sensitive strains.
        </li>
        <li>
          <strong>Spore-based probiotics:</strong> Bacillus strains naturally
          form protective endospores &mdash; essentially armor plating that
          survives stomach acid, heat, and even boiling water. They don&rsquo;t
          need refrigeration and have excellent shelf stability. The tradeoff:
          they&rsquo;re a different category of organism than Lactobacillus
          and Bifidobacterium, with a different (and smaller) evidence base.
        </li>
        <li>
          <strong>Taking with food:</strong> Eating buffers stomach acid and
          can improve survival. Some studies suggest taking probiotics with a
          meal (especially one containing some fat) is optimal for conventional
          capsules.
        </li>
        <li>
          <strong>Refrigerated products:</strong> Many Lactobacillus and
          Bifidobacterium strains are heat-sensitive. A product that says
          &ldquo;shelf stable&rdquo; should back that up with stability
          testing data showing viable CFU at room temperature through
          expiration. If it doesn&rsquo;t, be skeptical.
        </li>
      </ul>

      <h2>The Evidence Hierarchy</h2>
      <p>
        Not all probiotic claims are equal. Some strains are backed by
        Cochrane-level systematic reviews; others rest on one small trial
        in a specific population. When you see marketing language like
        &ldquo;clinically studied,&rdquo; check <em>which</em> tier of
        evidence the product is riding.
      </p>

      <Callout variant="evidence" title="Tier 1 — Strong evidence (multiple RCTs + meta-analyses)">
        <strong>LGG (L. rhamnosus GG):</strong> 2013 Cochrane review of 23
        RCTs for pediatric acute gastroenteritis showed reduced diarrhea
        duration by roughly 25 hours.<br />
        <strong>S. boulardii CNCM I-745:</strong> 2017 <em>JAMA</em>{" "}
        meta-analysis of 82 RCTs showed ~60% reduction in C. difficile diarrhea
        when co-administered with antibiotics in high-risk groups.<br />
        <strong>B. longum 35624 (Alflorex):</strong> Multiple RCTs published
        in <em>Gastroenterology</em> and <em>Alimentary Pharmacology &amp;
        Therapeutics</em> showed composite IBS symptom improvement at 1 billion
        CFU. <EvidenceBadge level="strong" />
      </Callout>

      <Callout variant="evidence" title="Tier 2 — Moderate evidence (few RCTs, consistent direction)">
        <strong>LP299V (L. plantarum 299v):</strong> Several RCTs showing
        IBS bloating and pain reduction; effect sizes variable across
        studies.<br />
        <strong>BB-12 (B. animalis subsp. lactis):</strong> Evidence for
        bowel regularity and some immune markers; results in healthy adults
        more mixed than in infants.<br />
        <strong>L. reuteri DSM 17938:</strong> Infant colic RCTs in breastfed
        babies are positive; formula-fed results are inconsistent.
        <EvidenceBadge level="moderate" />
      </Callout>

      <Callout variant="warning" title="Tier 3 — Weak or preliminary evidence">
        Most multi-strain &ldquo;broad spectrum&rdquo; blends. Strains with
        a single small trial. Any product making claims about mood, weight,
        skin, or immunity based on mechanistic reasoning without a named
        strain and RCT backing. The research may come; for now, the dollar
        value is marketing more than medicine.
      </Callout>

      <p>
        A practical rule: if a product&rsquo;s marketing leans on the word
        &ldquo;probiotic&rdquo; generically rather than naming a specific
        strain plus the condition it&rsquo;s been studied for, you&rsquo;re
        in Tier 3. The strong-evidence products are almost always boring —
        one or two named strains, a specific condition, a studied dose.
      </p>

      <h2>When Probiotics Won&rsquo;t Help</h2>
      <p>
        Some conditions consistently fail to respond to probiotic
        supplementation, despite marketing suggesting otherwise. Knowing
        when to skip the probiotic aisle is as valuable as knowing what to
        buy.
      </p>
      <ul>
        <li>
          <strong>Chronic constipation as a standalone complaint.</strong>{" "}
          Fiber, hydration, and <a href="/guides/best-magnesium-supplements">magnesium</a> oxide/citrate all outperform
          probiotics here. Probiotic effects on transit time are small and
          strain-dependent.
        </li>
        <li>
          <strong>SIBO (small intestinal bacterial overgrowth).</strong>{" "}
          Conventional Lactobacillus probiotics can worsen SIBO symptoms by
          adding to the bacterial load in the wrong part of the gut. Spore
          or S. boulardii may be tolerated; diagnosis first is critical.
        </li>
        <li>
          <strong>Weight loss.</strong> The &ldquo;probiotic for weight
          management&rdquo; category has extremely thin evidence. Modest
          signals exist for specific strains (L. gasseri, L. plantarum)
          but effect sizes are 1&ndash;3 lb over 12 weeks — not
          clinically meaningful.
        </li>
        <li>
          <strong>Generalized immune support in healthy adults.</strong>{" "}
          Probiotics have stronger immune effects in specific scenarios
          (antibiotics, daycare-age children, athletes in heavy training)
          than in the average adult. &ldquo;Immune health&rdquo; on a
          probiotic label is closer to marketing than evidence in most
          contexts.
        </li>
        <li>
          <strong>During active gut inflammation (IBD flare).</strong>{" "}
          Evidence is strain-specific and nuanced; self-supplementing during
          active Crohn&rsquo;s or UC flares can worsen symptoms. Work with
          a GI specialist.
        </li>
      </ul>

      <h2>Condition-to-Strain Cheat Sheet</h2>
      <p>
        If you have a specific goal, start here. This is where the research
        actually converges &mdash; generic &ldquo;gut health&rdquo; probiotics
        are vague by design; strain-condition matching is not.
      </p>

      <InteractionGroup title="Match your goal to a studied strain">
        <InteractionCard
          type="synergy"
          a="Antibiotic-associated diarrhea"
          b="S. boulardii CNCM I-745 or LGG"
          effect="Meta-analyses show roughly 50% reduction in antibiotic-associated diarrhea with either strain. S. boulardii is yeast-based and naturally antibiotic-resistant."
          recommendation="5–10 billion CFU daily of S. boulardii, starting day 1 of antibiotics and continuing 1–2 weeks after."
        />
        <InteractionCard
          type="synergy"
          a="IBS — bloating and pain"
          b="B. longum 35624 (Alflorex) or LP299V"
          effect="Multiple RCTs show measurable improvement in composite IBS symptom scores at 4–8 weeks."
          recommendation="1 billion CFU B. longum 35624, or 10–20 billion CFU LP299V. Give it 4 weeks before judging effect."
        />
        <InteractionCard
          type="synergy"
          a="Traveler's diarrhea prevention"
          b="S. boulardii CNCM I-745"
          effect="Cochrane reviews show ~15% absolute risk reduction in travelers taking S. boulardii prophylactically."
          recommendation="5 billion CFU daily, starting 5 days before travel and continuing throughout the trip."
        />
        <InteractionCard
          type="synergy"
          a="Recurrent vaginal/UTI issues"
          b="L. rhamnosus GR-1 + L. reuteri RC-14"
          effect="Urogenital strains with evidence for reducing BV and UTI recurrence. Different from gut strains."
          recommendation="1–10 billion CFU of each, oral daily for 30+ days. Strain designations matter enormously here."
        />
        <InteractionCard
          type="synergy"
          a="Infant colic"
          b="L. reuteri DSM 17938"
          effect="RCTs show reduced crying time in breastfed colicky infants; less consistent in formula-fed."
          recommendation="100 million CFU daily, 5 drops typically. Only under pediatrician supervision."
        />
        <InteractionCard
          type="synergy"
          a="General gut health / maintenance"
          b="Multi-strain with LGG, BB-12, and a Bifidobacterium"
          effect="Weakest evidence category — no strong consensus. Fermented food may be equal or better."
          recommendation="If supplementing, choose a simple 2–3 strain product with disclosed individual CFU. Consider kefir, yogurt, sauerkraut instead."
        />
      </InteractionGroup>

      <h2>The Antibiotic Protocol</h2>
      <p>
        This is the single highest-evidence use case for probiotics, and it&rsquo;s
        often done wrong. The common mistake is taking the probiotic at the
        same time as the antibiotic &mdash; which kills most bacterial strains
        outright.
      </p>
      <ol>
        <li>
          <strong>Start on day 1 of antibiotics</strong>, not after. Waiting
          until the course is over means you&rsquo;ve already lost the
          protective window.
        </li>
        <li>
          <strong>Separate antibiotic and probiotic doses by at least 2 hours.</strong>
          If your antibiotic is twice daily at 8am and 8pm, take the probiotic
          at 2pm. S. boulardii is the exception &mdash; as a yeast, antibiotics
          don&rsquo;t affect it, so timing is flexible.
        </li>
        <li>
          <strong>Continue 1&ndash;2 weeks after the antibiotic course ends.</strong>
          Gut microbial recovery takes longer than the prescription. Stopping
          on the last antibiotic day is premature.
        </li>
        <li>
          <strong>Pair with dietary fiber.</strong> Probiotics colonize better
          when there&rsquo;s prebiotic substrate available. Oats, lentils,
          onions, garlic, and fermented foods all help.
        </li>
      </ol>

      <Callout variant="evidence" title="What the evidence supports">
        A 2017 meta-analysis in <em>JAMA</em> of 82 RCTs found probiotic use
        during antibiotic therapy reduced the incidence of C. difficile–associated
        diarrhea by roughly 60% in high-risk populations. The largest effects
        came from S. boulardii and LGG at clinically validated doses.
        <EvidenceBadge level="strong" />
      </Callout>

      <h2>The Red Flag Checklist</h2>

      <Callout variant="warning" title="If a probiotic does any of these, think twice">
        No strain designations listed. Advertises 30+ strains as a selling
        point. Guarantees CFU only at manufacture. Uses proprietary blends
        with undisclosed per-strain amounts. Claims to support 5+ health
        outcomes.
      </Callout>

      <p>
        If a probiotic product does any of these, think twice:
      </p>
      <ul>
        <li>
          <strong>Lists no strain designations</strong> &mdash; just genus
          and species. Without the strain code, you can&rsquo;t verify any
          clinical evidence. This eliminates the majority of products on
          shelves.
        </li>
        <li>
          <strong>Advertises &ldquo;30+ strains!&rdquo; as a selling
          point</strong> &mdash; more strains usually means less of each.
          The best-studied probiotic products use 1&ndash;4 strains at
          individually validated doses.
        </li>
        <li>
          <strong>Guarantees CFU only at manufacture</strong> &mdash; this is
          effectively meaningless. Demand &ldquo;through expiration date.&rdquo;
        </li>
        <li>
          <strong>Uses a proprietary blend with undisclosed per-strain
          amounts</strong> &mdash; you need to know how much of each strain
          you&rsquo;re getting. (See our{" "}
          <a href="/guides/how-to-read-a-supplement-label">
            label reading guide
          </a>{" "}
          for more on proprietary blends.)
        </li>
        <li>
          <strong>Claims to support 5+ health outcomes</strong> &mdash;
          &ldquo;immune, digestive, mood, weight, skin, energy!&rdquo; No
          single probiotic product has evidence for all of these. This is
          marketing, not science.
        </li>
      </ul>

      <h2>What to Actually Look For</h2>
      <p>
        A quality probiotic should have:
      </p>
      <ul>
        <li>Specific strain designations (e.g., <em>L. rhamnosus GG</em>, not just <em>L. rhamnosus</em>)</li>
        <li>Clinical evidence for those specific strains at the doses provided</li>
        <li>CFU guaranteed through expiration date</li>
        <li>Individual CFU counts per strain, not just a total</li>
        <li>A delivery mechanism that addresses stomach acid survival</li>
        <li>Clear storage instructions (refrigerated or shelf-stable with supporting data)</li>
        <li>Third-party testing for purity and potency</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>Should I take a probiotic every day?</h3>
      <p>
        Most probiotic strains don&rsquo;t colonize your gut permanently
        &mdash; they pass through over 1&ndash;3 weeks. For ongoing benefits,
        daily supplementation is typically needed. If you&rsquo;re taking a
        probiotic for a specific event (like during antibiotics), you can
        stop afterward &mdash; most practitioners recommend continuing for
        1&ndash;2 weeks after the antibiotic course ends.
      </p>

      <h3>Can probiotics cause side effects?</h3>
      <p>
        Mild bloating and gas are common when starting a probiotic &mdash;
        they usually resolve within a few days to a week as your microbiome
        adjusts. If symptoms persist or worsen, try reducing the dose or
        switching strains. People with SIBO (small intestinal bacterial
        overgrowth) should consult a doctor before starting probiotics, as
        they can sometimes worsen symptoms.
      </p>

      <h3>Are probiotic foods (yogurt, kefir, kimchi) better than supplements?</h3>
      <p>
        They&rsquo;re different. Fermented foods provide a diverse range of
        organisms and have strong epidemiological evidence for gut health.
        But you can&rsquo;t control which strains or how many CFU you&rsquo;re
        getting. Supplements give you specific strains at known doses. Ideally,
        eat fermented foods regularly AND supplement a specific strain if
        you have a targeted goal.
      </p>

      <h3>Do I need to refrigerate my probiotic?</h3>
      <p>
        Depends on the product. Traditional Lactobacillus and Bifidobacterium
        products often need refrigeration. Spore-based (Bacillus) and
        yeast-based (S. boulardii) probiotics are inherently shelf-stable.
        If a conventional probiotic claims to be shelf-stable, check whether
        the CFU guarantee accounts for room temperature storage through
        expiration. When in doubt, refrigerate.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Stop shopping for probiotics by CFU count or number of strains.
        Start shopping by evidence. Identify what you want the probiotic
        to do, find a product using clinically studied strains for that
        specific purpose at validated doses, and verify it has a delivery
        mechanism that gets the organisms past your stomach acid alive.
        It&rsquo;s a smaller pool of products than the aisle suggests &mdash;
        but the ones that pass are the ones that actually work.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog?q=probiotic">
          Browse probiotic supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
