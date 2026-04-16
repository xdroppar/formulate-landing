import {
  TLDRBox,
  Callout,
  ProductCallout,
  InteractionCard,
  InteractionGroup,
  EvidenceBadge,
  PRODUCTS,
} from "@/components/guide";

export function CollagenGuide() {
  return (
    <>
      <TLDRBox
        readTime="11 min read"
        takeaways={[
          "Collagen peptides survive digestion as bioactive dipeptides that signal fibroblasts to produce more collagen",
          "Skin elasticity improves measurably in 8 weeks; joint pain in 12–24 weeks (strong RCT evidence)",
          "Vitamin C is essential for collagen synthesis — ensure adequate intake alongside supplementation",
          "5–10g/day hydrolyzed peptides for skin/joints, or 40mg UC-II for osteoarthritis specifically",
        ]}
      />

      <p>
        Collagen supplements have evidence supporting modest improvements in
        skin elasticity and joint pain, though the research is stronger than
        skeptics suggest and weaker than marketing implies. The $7 billion
        industry rests on a counterintuitive digestive mechanism &mdash;
        collagen peptides survive gut breakdown and signal the body to produce
        more of its own collagen.
      </p>

      <h2>The &ldquo;Your Body Just Digests It&rdquo; Argument</h2>
      <p>
        Let&rsquo;s address the biggest criticism first, because it&rsquo;s
        the reason most skeptics dismiss collagen outright. The argument goes
        like this: collagen is a protein. Your stomach breaks proteins into
        individual amino acids. Those amino acids go wherever your body needs
        them, not specifically to your skin or joints. Therefore, collagen
        supplements are no different from eating chicken breast.
      </p>

      <Callout variant="evidence" title="The digestion argument is outdated">
        Hydrolyzed collagen peptides are not fully broken down into individual
        amino acids. A significant portion survives digestion as bioactive
        dipeptides and tripeptides — most importantly Pro-Hyp
        (prolyl-hydroxyproline) — which act as signaling molecules that
        stimulate fibroblasts to produce collagen.{" "}
        <EvidenceBadge level="strong" />
      </Callout>

      <p>
        This was a perfectly reasonable argument &mdash; until researchers
        actually measured what happens. It turns out that{" "}
        <strong>hydrolyzed collagen peptides are not fully broken down into
        individual amino acids</strong>. A significant portion survives
        digestion as dipeptides and tripeptides &mdash; small chains of
        2&ndash;3 amino acids. The most important of these is{" "}
        <strong>Pro-Hyp (prolyl-hydroxyproline)</strong>, which has been
        detected in human blood after oral collagen ingestion at
        physiologically relevant concentrations.
      </p>
      <p>
        A 2005 study by Iwai et al. in the{" "}
        <em>Journal of Agricultural and Food Chemistry</em> confirmed that
        Pro-Hyp and other collagen-specific peptides appear in the bloodstream
        within 1&ndash;2 hours of ingestion and persist for several hours.
        These peptides don&rsquo;t just float around aimlessly &mdash;
        research suggests they act as signaling molecules, stimulating
        fibroblasts (the cells that produce collagen) to ramp up production.{" "}
        <EvidenceBadge level="strong" />
      </p>
      <p>
        So the critics are partially right: your body does digest collagen. But
        they&rsquo;re wrong that it&rsquo;s reduced to generic amino acids.
        The bioactive peptides that survive digestion appear to be the actual
        mechanism of action.
      </p>

      <h2>Types of Collagen: What They Do</h2>
      <p>
        Your body contains at least 28 types of collagen. Supplements focus on
        three:
      </p>
      <ul>
        <li>
          <strong>Type I:</strong> The most abundant collagen in your body
          &mdash; found in skin, bones, tendons, and connective tissue. This
          is the type most relevant to skin elasticity and anti-aging claims.
          Makes up about 90% of your body&rsquo;s total collagen.
        </li>
        <li>
          <strong>Type II:</strong> Found primarily in cartilage. This is the
          type most relevant to joint health. Undenatured type II collagen
          (UC-II&reg;) works through a different mechanism than hydrolyzed
          peptides &mdash; it modulates the immune response to reduce
          cartilage destruction rather than providing building blocks.
        </li>
        <li>
          <strong>Type III:</strong> Found alongside type I in skin, blood
          vessels, and organs. Often co-occurs with type I in bovine collagen
          supplements. Important for skin structure and cardiovascular tissue.
        </li>
      </ul>

      <Callout variant="info" title="Type labels are less important than you think">
        Once collagen is hydrolyzed into peptides, the &ldquo;type&rdquo;
        distinction becomes less meaningful. The exception is undenatured
        type II collagen (UC-II), taken intact at 40mg and working through
        immune modulation, not structural rebuilding.
      </Callout>

      <p>
        Here&rsquo;s the nuance most marketing ignores: once collagen is
        hydrolyzed into peptides, the &ldquo;type&rdquo; distinction becomes
        less meaningful. Hydrolyzed type I and type III peptides are broken
        down into similar amino acid chains. The exception is{" "}
        <strong>undenatured type II collagen</strong>, which is taken intact
        at much lower doses (40mg vs. grams) and works through immune
        modulation, not structural rebuilding.
      </p>

      <h2>What the Evidence Actually Supports</h2>

      <h3>Skin Elasticity and Hydration</h3>
      <p>
        This is collagen&rsquo;s strongest evidence base. A 2014 double-blind
        RCT by Proksch et al. in <em>Skin Pharmacology and Physiology</em>{" "}
        gave 69 women (aged 35&ndash;55) either 2.5g or 5g of collagen
        peptides daily or placebo for 8 weeks. Both collagen groups showed{" "}
        <strong>statistically significant improvements in skin
        elasticity</strong> compared to placebo, with the effect persisting
        4 weeks after supplementation stopped. A follow-up study by the same
        group found reduced wrinkle depth after 8 weeks.{" "}
        <EvidenceBadge level="strong" />
      </p>
      <p>
        A 2019 systematic review by de Miranda et al. in the{" "}
        <em>International Journal of Dermatology</em> analyzed 11 studies
        with over 800 participants and concluded that collagen
        supplementation improves skin hydration, elasticity, and wrinkle
        depth. The effects are real, measurable, and replicated &mdash; though
        modest. Nobody is reversing 20 years of aging with a powder.{" "}
        <EvidenceBadge level="strong" />
      </p>

      <h3>Joint Pain</h3>
      <p>
        A 2008 study by Clark et al. at Penn State, published in{" "}
        <em>Current Medical Research and Opinion</em>, gave 147 athletes
        (both men and women) 10g of collagen hydrolysate or placebo daily for
        24 weeks. The collagen group reported{" "}
        <strong>significantly less joint pain during activity</strong>
        &mdash; walking, standing, carrying objects, and at rest. This was
        a well-designed trial in a population that puts serious stress on
        their joints. <EvidenceBadge level="strong" />
      </p>
      <p>
        For osteoarthritis specifically, a 2016 RCT by Kumar et al. in the{" "}
        <em>International Journal of Medical Sciences</em> found that 40mg
        of undenatured type II collagen (UC-II) outperformed a combination
        of 1,500mg glucosamine plus 1,200mg chondroitin for knee joint
        comfort over 180 days. That&rsquo;s notable because glucosamine and
        chondroitin have been the standard joint supplement recommendation
        for decades. <EvidenceBadge level="strong" />
      </p>

      <h3>Bone Density</h3>
      <p>
        The evidence here is earlier-stage but promising. A 2018 RCT by
        K&ouml;nig et al. in <em>Nutrients</em> found that 5g of collagen
        peptides daily for 12 months significantly increased bone mineral
        density in the spine and femoral neck of postmenopausal women compared
        to placebo. Bone formation markers went up while bone degradation
        markers went down. One study isn&rsquo;t conclusive, but the mechanism
        is plausible and the results are encouraging.{" "}
        <EvidenceBadge level="emerging" />
      </p>

      <ProductCallout product={PRODUCTS["thorne-collagen-plus"]} />

      <h2>Marine vs. Bovine vs. Chicken: Choosing a Source</h2>
      <p>
        The source of your collagen determines the type composition and can
        matter depending on your goal:
      </p>
      <ul>
        <li>
          <strong>Bovine (cow):</strong> Rich in types I and III. The
          most common and affordable source. Best general-purpose choice for
          skin, bones, and connective tissue. Most of the skin elasticity
          research has used bovine-derived peptides.
        </li>
        <li>
          <strong>Marine (fish):</strong> Primarily type I. Often marketed as
          &ldquo;better absorbed&rdquo; due to smaller peptide size, and
          there&rsquo;s some evidence supporting higher bioavailability. A
          2015 study in the <em>Journal of the Science of Food and
          Agriculture</em> found marine collagen peptides had 1.5x higher
          intestinal absorption than bovine peptides in a Caco-2 cell model.
          Best for: skin-focused goals, pescatarian diets.{" "}
          <EvidenceBadge level="moderate" />
        </li>
        <li>
          <strong>Chicken:</strong> Rich in type II collagen. Most relevant
          for joint and cartilage support. UC-II specifically comes from
          chicken sternum cartilage. Best for: joint-specific goals,
          particularly osteoarthritis.
        </li>
      </ul>

      <Callout variant="tip" title="Choosing a source">
        The practical differences between bovine and marine for general use
        are small enough that price and dietary preference should drive your
        decision. Choose chicken/UC-II only if joint cartilage is your
        primary concern.
      </Callout>

      <h2>Dosing: How Much and How</h2>
      <p>
        The effective dose depends on the form and your goal:
      </p>
      <ul>
        <li>
          <strong>Hydrolyzed collagen peptides (types I/III):</strong>{" "}
          2.5&ndash;15g per day. Skin studies typically use 2.5&ndash;10g.
          Joint studies tend toward 10g. If you&rsquo;re targeting both,
          10g daily is a reasonable dose.
        </li>
        <li>
          <strong>Undenatured type II collagen (UC-II):</strong> 40mg per
          day. This is a completely different dosing paradigm because UC-II
          works through immune modulation, not structural rebuilding. More
          is not better &mdash; 40mg is the studied dose.
        </li>
      </ul>
      <p>
        Powder format is the most practical for hydrolyzed collagen because
        the doses are measured in grams. Capsules would require 10&ndash;20
        per serving to hit effective levels. Most people mix the powder into
        coffee, smoothies, or water &mdash; quality collagen peptides should
        dissolve easily and have minimal taste.
      </p>

      <h2>The Vitamin C Connection</h2>

      <Callout variant="warning" title="Vitamin C is non-negotiable">
        Vitamin C is an essential cofactor for collagen synthesis. Your body
        literally cannot produce collagen without it. Supplementing collagen
        without adequate vitamin C is like buying building materials without
        hiring a contractor.
      </Callout>

      <p>
        This is genuinely important and often overlooked.{" "}
        <strong>Vitamin C is an essential cofactor for collagen
        synthesis.</strong> Your body literally cannot produce collagen
        without it &mdash; vitamin C is required for the hydroxylation of
        proline and lysine, the step that gives collagen its structural
        stability. This is why scurvy (severe vitamin C deficiency) causes
        connective tissue breakdown.
      </p>
      <p>
        You don&rsquo;t need megadoses. The RDA of 75&ndash;90mg is enough to
        support normal collagen synthesis, and most people eating any fruits
        or vegetables get this. But if your diet is genuinely low in vitamin
        C, supplementing collagen without addressing that deficiency is like
        buying building materials without hiring a contractor. Some collagen
        products include vitamin C for this reason, which is a smart
        formulation choice. When evaluating products, check whether vitamin
        C is included or if you&rsquo;ll need to source it separately &mdash;
        our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          label-reading guide
        </a>{" "}
        can help you parse what&rsquo;s actually in the formula.
      </p>

      <InteractionGroup title="Collagen synergies">
        <InteractionCard
          type="synergy"
          a="Collagen"
          b="Vitamin C"
          effect="Vitamin C is required for the hydroxylation of proline and lysine — the step that gives collagen its structural stability. Without it, collagen synthesis stalls."
          recommendation="Ensure at least 75–90mg vitamin C daily. Some collagen products include it."
        />
        <InteractionCard
          type="synergy"
          a="Collagen"
          b="Glycine"
          effect="Collagen is ~33% glycine. Additional glycine supports overall collagen synthesis and has independent benefits for sleep quality."
          recommendation="Consider 3g glycine at bedtime for dual collagen + sleep benefits."
        />
      </InteractionGroup>

      <h2>Timing: Does It Matter?</h2>
      <p>
        Unlike many supplements where timing is critical, collagen is
        forgiving. The bioactive peptides accumulate over weeks of consistent
        use, so what time you take it is far less important than whether you
        take it daily.
      </p>
      <p>
        That said, a few practical considerations:
      </p>
      <ul>
        <li>
          Taking collagen with vitamin C-rich food may support absorption and
          synthesis &mdash; though this hasn&rsquo;t been formally tested in
          supplementation studies.
        </li>
        <li>
          Some people prefer taking it on an empty stomach to avoid competing
          with other dietary proteins for absorption. This is theoretically
          reasonable but not proven necessary.
        </li>
        <li>
          <strong>UC-II (type II, 40mg) should be taken on an empty
          stomach</strong> &mdash; the immune modulation mechanism requires
          it to reach the gut-associated lymphoid tissue intact.
        </li>
      </ul>
      <p>
        For how collagen fits into a broader supplement schedule, see our{" "}
        <a href="/guides/supplement-timing-guide">
          supplement timing guide
        </a>.
      </p>

      <h2>How Long Before You See Results?</h2>

      <Callout variant="info" title="Set realistic expectations">
        Skin hydration: 4&ndash;8 weeks. Wrinkle depth: 8&ndash;12 weeks.
        Joint pain: 12&ndash;24 weeks. Bone density: 12 months. If someone
        claims results in 3 days, that&rsquo;s placebo.
      </Callout>

      <p>
        Set realistic expectations:
      </p>
      <ul>
        <li>
          <strong>Skin hydration:</strong> Some studies show measurable
          improvements in 4 weeks, with more significant changes at
          8&ndash;12 weeks.
        </li>
        <li>
          <strong>Wrinkle depth:</strong> 8&ndash;12 weeks in the Proksch
          studies.
        </li>
        <li>
          <strong>Joint pain:</strong> 12&ndash;24 weeks in most studies.
          Joint tissue turns over slowly &mdash; patience is required.
        </li>
        <li>
          <strong>Bone density:</strong> 12 months in the K&ouml;nig study.
          Bone remodeling is a long game.
        </li>
      </ul>
      <p>
        If someone tells you their collagen supplement &ldquo;worked in 3
        days,&rdquo; they&rsquo;re experiencing placebo. The biology of
        connective tissue turnover doesn&rsquo;t move that fast. Give it at
        least 8 weeks before judging.
      </p>

      <h2>Who Should Talk to a Doctor First</h2>
      <p>
        Most collagen research has been conducted in generally healthy adults over relatively short timeframes. If you fall into any of the groups below, get clinical input before starting — the evidence either doesn't cover you or raises specific concerns.
      </p>

      <Callout variant="warning" title="If you are pregnant or breastfeeding">
        No randomized controlled trials have included pregnant or breastfeeding women, and collagen is heavily marketed to this group for skin elasticity. Talk to your healthcare provider before supplementing — the guide's evidence base simply does not extend to you.
      </Callout>

      <Callout variant="warning" title="If you have an autoimmune condition or take immunosuppressants">
        UC-II works through immune modulation — a mechanism that could interact unpredictably with immunosuppressive medications or conditions where the immune system is already dysregulated. Discuss this with your prescribing physician before adding UC-II or any collagen product.
      </Callout>

      <Callout variant="warning" title="If you take bisphosphonates or are being treated for osteoporosis">
        The bone density evidence cited in this guide does not address whether collagen peptides interact with bisphosphonates (like alendronate) or whether they are additive or redundant alongside your existing calcium and vitamin D regimen. Bring your full supplement list to your provider.
      </Callout>

      <Callout variant="warning" title="If you have fish, shellfish, or egg allergies">
        Marine collagen is derived from fish, and some products contain eggshell membrane collagen. Allergic reactions are a real risk — verify the source before purchasing and consult your allergist if there is any ambiguity.
      </Callout>

      <Callout variant="warning" title="If you are concerned about contaminant exposure">
        Marine collagen sourced from polluted waters can carry heavy metal contamination. Look for third-party tested products and talk to your healthcare provider if you are taking collagen long-term, especially at higher doses.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list — including what you're considering — to your next provider visit.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Is collagen just expensive protein?</h3>
      <p>
        Partially, but not entirely. Collagen is an incomplete protein &mdash;
        it lacks tryptophan, so it can&rsquo;t replace your protein intake.
        Where it differs from &ldquo;regular&rdquo; protein is in its unique
        amino acid profile: it&rsquo;s roughly 33% glycine, 10% proline, and
        contains significant hydroxyproline &mdash; amino acids that are
        underrepresented in most diets and specifically used in connective
        tissue synthesis. Plus, the bioactive dipeptides (like Pro-Hyp) that
        survive digestion appear to have signaling effects beyond their amino
        acid content.
      </p>

      <h3>Can vegetarians or vegans get collagen benefits?</h3>
      <p>
        Not from collagen supplements &mdash; all collagen is animal-derived
        (there is no plant collagen). &ldquo;Vegan collagen boosters&rdquo;
        typically contain vitamin C, proline, glycine, and other precursors,
        which support your body&rsquo;s own collagen synthesis but are not
        the same as providing bioactive collagen peptides. The clinical
        evidence for skin and joint benefits is specifically for hydrolyzed
        animal-derived collagen. Lab-grown (recombinant) collagen exists but
        isn&rsquo;t widely available in consumer supplements yet.
      </p>

      <h3>Does cooking bone broth give you the same benefits?</h3>
      <p>
        Bone broth contains collagen, but the amount and consistency are
        highly variable. A 2019 analysis in the{" "}
        <em>International Journal of Sport Nutrition and Exercise
        Metabolism</em> found that collagen content in commercial bone broths
        ranged from 2.4 to 21.2 mg/mL &mdash; a 9-fold difference. A cup of
        bone broth might give you 2&ndash;5g of collagen, which is on the
        low end of clinical doses. Supplements offer more consistent and
        concentrated dosing, but bone broth has other nutritional benefits
        (minerals, glutamine, glycine) that make it a worthwhile food
        regardless. <EvidenceBadge level="moderate" />
      </p>

      <h3>Can collagen supplements cause any side effects?</h3>
      <p>
        Side effects are rare and generally mild. Some people report a
        lingering aftertaste (especially with marine collagen), mild bloating,
        or feelings of fullness. People with fish or shellfish allergies
        should avoid marine collagen. Those with egg allergies should avoid
        products that contain eggshell membrane collagen. No serious adverse
        events have been reported in clinical trials at standard doses up
        to 15g daily.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Collagen supplements are not snake oil, but they&rsquo;re not magic
        either. The evidence for improved skin elasticity and hydration is
        solid and replicated. The evidence for joint pain reduction is
        meaningful, especially for active people and those with
        osteoarthritis. The bone density data is early but promising.
      </p>
      <p>
        The mechanism is more sophisticated than &ldquo;eat collagen, make
        collagen&rdquo; &mdash; bioactive peptides surviving digestion and
        acting as signaling molecules is a legitimate scientific finding.
        Choose hydrolyzed peptides at 5&ndash;10g daily for skin and general
        use, or UC-II at 40mg for joint-specific goals. Make sure you&rsquo;re
        getting adequate vitamin C. Be patient &mdash; results take 8&ndash;12
        weeks minimum. And don&rsquo;t expect supplements to overcome a
        lifetime of sun damage, poor nutrition, or dehydration.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog?q=collagen">
          Browse collagen supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
