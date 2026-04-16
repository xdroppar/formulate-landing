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

export function AshwagandhaGuide() {
  return (
    <>
      <TLDRBox
        readTime="12 min read"
        takeaways={[
          "Ashwagandha reduces cortisol by ~28% in chronically stressed adults (strong RCT evidence)",
          "Extract type matters enormously — KSM-66 (5% withanolides) for general use, Sensoril (10%) for sleep/anxiety",
          "Cycle 8–12 weeks on, 2–4 weeks off as a precautionary default",
          "Skip entirely if you have autoimmune conditions, thyroid issues, or are pregnant",
        ]}
      />

      <p>
        Ashwagandha is one of the few herbal supplements where the clinical
        evidence is genuinely interesting &mdash; multiple trials show
        measurable effects on cortisol, sleep quality, and stress perception.
        However, the form you take matters enormously: most products on
        shelves are not the same thing used in the studies, making extract
        type the single most important variable.
      </p>

      <h2>What Ashwagandha Actually Is</h2>
      <p>
        Ashwagandha (<em>Withania somnifera</em>) is a small shrub native to
        India and Southeast Asia. It&rsquo;s been used in Ayurvedic medicine
        for centuries, which is either reassuring or meaningless depending on
        how you feel about traditional medicine. What matters for our purposes
        is what modern randomized controlled trials have found &mdash; and
        there are now enough of them to draw real conclusions.
      </p>
      <p>
        The active compounds are called <strong>withanolides</strong> &mdash;
        a class of steroidal lactones found in the plant&rsquo;s roots and
        leaves. The concentration of withanolides varies wildly between
        products, which is why the extract you choose is the single most
        important decision you&rsquo;ll make. More on that in a moment.
      </p>

      <h2>The Evidence: Where It&rsquo;s Strong</h2>

      <h3>Cortisol and Stress Response</h3>
      <p>
        This is ashwagandha&rsquo;s strongest claim. A 2012 double-blind RCT
        by Chandrasekhar et al., published in the{" "}
        <em>Indian Journal of Psychological Medicine</em>, gave 64 chronically
        stressed adults either 600mg of full-spectrum ashwagandha root extract
        or placebo for 60 days. The ashwagandha group showed a{" "}
        <strong>27.9% reduction in serum cortisol</strong> compared to
        baseline, versus a negligible change in the placebo group. Perceived
        stress scores dropped significantly on every validated scale they used.{" "}
        <EvidenceBadge level="strong" studiesId="ashwagandha-cortisol-2012" />
      </p>
      <p>
        A 2019 RCT by Lopresti et al. in <em>Medicine</em> confirmed this
        with 240mg of a high-concentration extract (Shoden&reg;, 35%
        withanolides), finding significant reductions in both cortisol and
        self-reported stress at 60 days. The cortisol reduction is not subtle
        &mdash; it&rsquo;s one of the larger effect sizes you&rsquo;ll see
        in herbal supplement research. <EvidenceBadge level="strong" studiesId="ashwagandha-lopresti-2019" />
      </p>

      <Callout variant="evidence" title="Cortisol reduction">
        Multiple RCTs consistently show ashwagandha reduces serum cortisol by
        20&ndash;30% over 8&ndash;12 weeks. This is one of the strongest
        effect sizes in herbal supplement research.{" "}
        <EvidenceBadge
          level="strong"
          studiesIds={["ashwagandha-cortisol-2012", "ashwagandha-lopresti-2019"]}
        />
      </Callout>

      <h3>Anxiety</h3>
      <p>
        A 2014 systematic review by Pratte et al. in the{" "}
        <em>Journal of Alternative and Complementary Medicine</em> analyzed
        five human trials and found that ashwagandha{" "}
        <strong>consistently outperformed placebo on anxiety measures</strong>,
        including the Hamilton Anxiety Rating Scale. The effect sizes ranged
        from moderate to large. This isn&rsquo;t &ldquo;maybe it helps a
        little&rdquo; territory &mdash; the signal is clear.{" "}
        <EvidenceBadge level="strong" studiesId="ashwagandha-pratte-2014" />
      </p>
      <p>
        That said, ashwagandha is not a replacement for clinical anxiety
        treatment. If you have diagnosed anxiety, it&rsquo;s a conversation
        with your doctor, not a DIY project.
      </p>

      <h3>Sleep Quality</h3>
      <p>
        A 2019 double-blind RCT by Langade et al. in <em>Cureus</em> found
        that 600mg of ashwagandha root extract significantly improved sleep
        quality, sleep onset latency, and overall restfulness in both healthy
        adults and people with insomnia over 10 weeks. The{" "}
        <em>somnifera</em> in the Latin name literally means
        &ldquo;sleep-inducing,&rdquo; and the data backs it up.{" "}
        <EvidenceBadge level="strong" studiesId="ashwagandha-langade-sleep-2019" />
      </p>
      <p>
        If you&rsquo;re building a sleep protocol, ashwagandha is worth
        considering alongside other evidence-based options. Our{" "}
        <a href="/guides/best-sleep-supplement-protocol">
          sleep supplement protocol guide
        </a>{" "}
        covers how to layer these intelligently.
      </p>

      <h2>The Evidence: Where It&rsquo;s Moderate</h2>

      <h3>Testosterone and Male Fertility</h3>
      <p>
        Several studies suggest ashwagandha can increase{" "}
        <a href="/guides/ashwagandha-for-testosterone">testosterone</a> in men,
        though the effects are modest in healthy young men and more pronounced
        in older or stressed populations. A 2019 RCT by Lopresti et al. in{" "}
        <em>American Journal of Men&rsquo;s Health</em> found a 14.7%
        increase in testosterone over 8 weeks with 600mg of KSM-66. A 2010
        study by Ahmad et al. in <em>Fertility and Sterility</em> showed
        improved semen parameters in infertile men.{" "}
        <EvidenceBadge level="moderate" studiesId="ashwagandha-lopresti-2019" />
      </p>
      <p>
        Don&rsquo;t expect this to turn you into a different person. The
        testosterone increase is real but relatively small &mdash; think of
        it as optimizing within your natural range, not a pharmacological
        intervention.
      </p>

      <h3>Athletic Performance</h3>
      <p>
        A 2015 study by Wankhede et al. in the{" "}
        <em>Journal of the International Society of Sports Nutrition</em>{" "}
        found that 600mg of KSM-66 combined with resistance training produced
        greater increases in muscle strength (bench press and leg extension)
        and muscle size compared to placebo over 8 weeks. Recovery markers
        also improved. The effect is real but modest &mdash; don&rsquo;t
        expect it to replace <a href="/guides/best-creatine-supplements">creatine</a> or good programming.{" "}
        <EvidenceBadge level="moderate" studiesId="ashwagandha-wankhede-2015" />
      </p>

      <ProductCallout product={PRODUCTS["thorne-ashwagandha"]} />

      <h2>The Form Matters More Than the Brand</h2>
      <p>
        This is the part most people get wrong. &ldquo;Ashwagandha&rdquo; on
        a label tells you almost nothing. The extract type determines the
        withanolide concentration, which determines whether you&rsquo;re
        taking what was actually studied or an underpowered generic.
      </p>

      <h3>KSM-66&reg;</h3>
      <p>
        The most-studied branded extract, made from roots only using a
        &ldquo;Green Chemistry&rdquo; water-based extraction. Standardized to{" "}
        <strong>5% withanolides</strong>. This is the extract used in the
        majority of positive clinical trials. If you&rsquo;re taking
        ashwagandha for stress, testosterone, or athletic performance,
        KSM-66 is the default recommendation.
      </p>

      <h3>Sensoril&reg;</h3>
      <p>
        Made from both roots and leaves, standardized to{" "}
        <strong>10% withanolides</strong> (higher concentration). Sensoril
        tends to be more calming and sedating, which makes it better suited
        for anxiety and sleep. The higher withanolide content means you need
        a lower dose &mdash; 125&ndash;250mg vs. 600mg for KSM-66.
      </p>

      <Callout variant="warning" title="Avoid generic root powder">
        Unextracted root powder typically contains only 1&ndash;2%
        withanolides. You&rsquo;d need several grams to match a single
        capsule of KSM-66 or Sensoril. Many budget products use this without
        disclosing it clearly. Always check the Supplement Facts panel for
        extract ratio or withanolide percentage.
      </Callout>

      <h3>Generic Root Powder</h3>
      <p>
        Unextracted root powder typically contains only 1&ndash;2%
        withanolides. You&rsquo;d need to take several grams to match the
        withanolide content of a single capsule of KSM-66 or Sensoril. Many
        budget products use this and don&rsquo;t disclose it clearly. Check
        the Supplement Facts panel for the extract ratio or withanolide
        percentage &mdash; our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          guide to reading supplement labels
        </a>{" "}
        shows you exactly what to look for.
      </p>

      <h2>Dosing: What the Studies Used</h2>
      <p>
        Dosing depends entirely on which extract you&rsquo;re taking:
      </p>
      <ul>
        <li>
          <strong>KSM-66:</strong> 600mg per day (typically split into two
          300mg doses, or taken as a single dose). This is the dose used in
          most KSM-66 trials.
        </li>
        <li>
          <strong>Sensoril:</strong> 125&ndash;250mg per day. The higher
          withanolide concentration means less is needed.
        </li>
        <li>
          <strong>Generic root extract (2.5% withanolides):</strong>{" "}
          300&ndash;600mg per day, but results are less predictable because
          standardization varies.
        </li>
      </ul>

      <Callout variant="tip" title="More is not better">
        Some evidence suggests that very high doses can cause GI discomfort
        without additional benefit. Stick to the studied ranges for your
        chosen extract type.
      </Callout>

      <h2>Timing: Morning or Evening?</h2>
      <p>
        This depends on your goal:
      </p>
      <ul>
        <li>
          <strong>For stress and cortisol:</strong> Morning with breakfast.
          Cortisol naturally peaks in the morning, and taking ashwagandha
          early helps blunt the stress response throughout the day.
        </li>
        <li>
          <strong>For sleep:</strong> 30&ndash;60 minutes before bed.
          Sensoril is particularly good here due to its stronger calming
          effect.
        </li>
        <li>
          <strong>For general use (KSM-66 at 600mg):</strong> Split into
          300mg morning and 300mg evening, or take the full dose with
          whichever meal is most consistent for you.
        </li>
      </ul>
      <p>
        For detailed guidance on scheduling ashwagandha alongside other
        supplements, see our{" "}
        <a href="/guides/supplement-timing-guide">
          comprehensive supplement timing guide
        </a>.
      </p>

      <h2>Ashwagandha and Liver Safety: What the Recent Case Reports Show</h2>

      <p><strong>Ashwagandha and liver safety</strong> became a serious discussion topic after a wave of hepatotoxicity case reports emerged between 2021 and 2023. This isn't fearmongering from anti-supplement blogs — these are documented cases in peer-reviewed journals and federal databases, and you should know what they actually say.</p>

      <p>Björnsson et al. (2020) published a case series in <em>Journal of Hepatology</em> identifying ashwagandha as a cause of herb-induced liver injury, with several cases showing cholestatic or mixed-pattern hepatotoxicity. The U.S. Drug-Induced Liver Injury Network (DILIN) subsequently flagged additional cases through 2023, some requiring hospitalization. Iceland went as far as issuing a regulatory warning. <EvidenceBadge level="emerging" /></p>

      <p>Here's the critical nuance most coverage misses: the products implicated tend to be high-dose formulations containing <strong>leaf extracts rich in withaferin A</strong> — a cytotoxic withanolide concentrated in leaves, not roots. Withaferin A has documented hepatotoxic potential in preclinical models. Root-only extracts like <strong>KSM-66</strong> contain substantially less withaferin A, and none of the major KSM-66 clinical trials have reported liver injury at standard doses of 600mg/day over 8–12 weeks.</p>

      <Callout variant="warning" title="Stop and seek medical attention if you experience:">
Jaundice (yellowing of skin or eyes), dark urine, pale stools, or persistent right upper quadrant abdominal pain while taking any ashwagandha product. These are signs of potential liver injury. Discontinue immediately and get liver enzymes checked.
      </Callout>

      <p>The overall incidence appears low — we're talking about dozens of case reports against millions of users — but "low risk" isn't "no risk." If you have pre-existing liver conditions, drink heavily, or take other hepatotoxic medications (acetaminophen, statins, certain antibiotics), your threshold for concern should be lower. Consult your healthcare provider before starting.</p>

      <p>To minimize risk: stick with <strong>root-only extracts</strong> from brands that provide third-party testing (NSF, USP, or Informed Sport certification), avoid products listing "leaf" or "whole plant" on the Supplement Facts panel, and don't exceed studied doses. Our <a href="/guides/reading-supplement-labels">guide to reading supplement labels</a> can help you identify what's actually in the bottle. If you're stacking ashwagandha with other supplements, check our <a href="/guides/beginner-longevity-stack">beginner longevity stack guide</a> for safe layering strategies.</p>


      <h2>Ashwagandha for Women: Hormones, Cycle Effects, and What the Research Actually Shows</h2>

      <p><strong>Ashwagandha for women</strong> is one of the most searched supplement topics online, yet most clinical trials — and most guides, including this one until now — have been functionally male-default. The testosterone and fertility studies that get cited everywhere? Almost exclusively male cohorts. That doesn't mean ashwagandha is ineffective for women. It means the evidence base has gaps you should know about before drawing conclusions.</p>

      <h3>What We Know About Hormonal Effects in Women</h3>

      <p>Ashwagandha appears to modestly increase DHEA-S in both sexes. A 2019 RCT by Lopresti et al. found significant DHEA-S increases alongside cortisol reduction — but the downstream hormonal implications differ for women. DHEA-S is a precursor to both testosterone and estrogen, so the net effect on your hormonal profile depends on your baseline levels and individual metabolism. <EvidenceBadge level="moderate" studiesId="ashwagandha-lopresti-2019" /> There's no strong evidence that ashwagandha meaningfully raises estrogen or testosterone in women at standard doses, but the research simply hasn't been designed to answer this question rigorously.</p>

      <h3>PCOS and Cycle Effects</h3>

      <p>A small 2023 pilot study by Gopal et al. in <em>Cureus</em> suggested ashwagandha may improve markers of hormonal balance in women with PCOS, including reductions in testosterone and improvements in cycle regularity. <EvidenceBadge level="emerging" /> However, this was a single small trial. If you have PCOS, this is a "worth watching" result, not a treatment protocol. Consult your healthcare provider before using ashwagandha alongside metformin, spironolactone, or other PCOS-related medications.</p>

      <h3>Safety with Hormonal Contraception</h3>

      <p>There are no published studies examining interactions between ashwagandha and hormonal contraceptives. Its thyroid-stimulating and cortisol-lowering effects are theoretically relevant to hormonal balance, but no adverse interactions have been documented. That said, absence of evidence is not evidence of absence. If you're on combined oral contraceptives or progestin-only methods, there's no established reason to avoid ashwagandha — but flag it with your prescriber.</p>

      <Callout variant="info" title="Where Women Have Strong Evidence">
The cortisol, stress, sleep, and anxiety data applies equally to women — these trials generally enrolled mixed-gender cohorts. If your goal is <a href="/guides/ashwagandha-guide">stress reduction or better sleep</a>, the evidence doesn't have a meaningful gender gap. The gap is specifically in hormonal optimization and reproductive health outcomes.
      </Callout>

      <h3>A Framework for Deciding</h3>

      <p>Ask yourself what you're actually after. <strong>Stress and sleep?</strong> The evidence is strong regardless of sex — pick your extract (KSM-66 or Sensoril) based on your primary goal and follow the dosing above. <strong>Hormonal optimization, cycle regulation, or fertility?</strong> The data for women is emerging at best. You're essentially an early adopter, and you should treat it that way: track your cycle, monitor how you feel, and don't assume the male-derived hormonal data applies to you. For building a broader stress-management stack, our <a href="/guides/beginner-longevity-stack">beginner longevity stack guide</a> covers how ashwagandha fits alongside foundational supplements.</p>


      <h2>How to Verify Quality: Third-Party Testing and What to Look For on the Label</h2>

      <p>Knowing <strong>how to choose an ashwagandha supplement</strong> comes down to reading labels critically — not trusting front-of-package marketing. Even if a product claims to contain KSM-66 or Sensoril, you have no guarantee of purity, potency, or heavy metal testing unless an independent lab has verified it. That's where third-party certifications earn their value.</p>

      <h3>Certifications That Actually Matter</h3>

      <p><strong>USP Verified</strong> is the gold standard for general consumers. The U.S. Pharmacopeia tests for identity, potency, contaminants, and manufacturing practices. <strong>NSF Certified for Sport</strong> and <strong>Informed Sport</strong> go further by screening for banned substances — critical if you're a tested athlete, but also a strong quality signal for anyone. If a product carries any of these three marks, it's passed a level of scrutiny most supplements never face. <EvidenceBadge level="strong" /></p>

      <h3>What to Find on the Supplement Facts Panel</h3>

      <p>Flip the bottle and look for three things: the <strong>extract name</strong> (KSM-66, Sensoril, or Shoden — not just "ashwagandha root"), the <strong>withanolide percentage</strong> (≥5% for KSM-66, ≥10% for Sensoril, ≥35% for Shoden), and the <strong>extract ratio</strong> if listed. Reputable brands also make a <strong>certificate of analysis (COA)</strong> available on their website or by request, showing batch-specific test results for potency and contaminants like lead, arsenic, and cadmium.</p>

      <h3>Red Flags to Walk Away From</h3>

      <p>Avoid any product using a <strong>proprietary blend</strong> that lumps ashwagandha with other ingredients under a single combined weight — this obscures the actual dose. The phrase <strong>"ashwagandha complex"</strong> is another warning sign, often indicating a mix of generic root powder with trace amounts of standardized extract. If the label doesn't state a specific withanolide percentage, assume you're getting the 1–2% found in raw root powder. As covered in our <a href="/guides/reading-supplement-labels">guide to reading supplement labels</a>, vague language almost always means an underpowered product.</p>

      <Callout variant="info" title="Quick Label Checklist">
Named extract (KSM-66, Sensoril, or Shoden) — not "root powder" or "complex." Withanolide percentage explicitly stated. No proprietary blends hiding the ashwagandha dose. Third-party certification logo (USP, NSF, or Informed Sport). COA accessible online or on request.
      </Callout>


      <h2>Drug Interactions: A Practical Reference Table</h2>

      <p><strong>Ashwagandha drug interactions</strong> are poorly documented in formal pharmacovigilance databases, but the herb's known pharmacological activity — GABAergic, serotonergic, thyroid-stimulating, hypoglycemic, and immunomodulatory — creates several plausible interaction pathways. The table below consolidates what's currently known so you can have a specific conversation with your prescriber rather than a vague one.</p>

      <Callout variant="warning" title="This is not a complete list">
Ashwagandha's metabolic pathways haven't been fully characterized. If you take <em>any</em> prescription medication, consult your healthcare provider before adding ashwagandha. The interactions below reflect known pharmacological mechanisms, not exhaustive clinical data.
      </Callout>

      <table>
      <thead>
      <tr><th>Drug Class</th><th>Examples</th><th>Interaction Type</th><th>Risk Level</th><th>Recommendation</th></tr>
      </thead>
      <tbody>
      <tr><td><strong>SSRIs / SNRIs</strong></td><td>Sertraline, fluoxetine, venlafaxine</td><td>Additive serotonergic activity — theoretical risk of serotonin syndrome</td><td>Moderate</td><td>Do not combine without physician approval</td></tr>
      <tr><td><strong>Benzodiazepines</strong></td><td>Alprazolam, lorazepam, diazepam</td><td>Additive CNS depression via GABAergic potentiation (Mehta et al., 2012)</td><td>Moderate–High</td><td>Avoid, or use only under medical supervision</td></tr>
      <tr><td><strong>Thyroid medications</strong></td><td>Levothyroxine, liothyronine</td><td>Ashwagandha increases T3 and T4 (Sharma et al., 2018), potentially destabilizing managed hypothyroidism</td><td>High</td><td>Avoid — requires thyroid panel monitoring at minimum</td></tr>
      <tr><td><strong>Diabetes medications</strong></td><td>Metformin, insulin, sulfonylureas</td><td>Additive blood glucose lowering — risk of hypoglycemia (Andallu & Radhika, 2000)</td><td>Moderate</td><td>Monitor blood glucose closely; consult your prescriber</td></tr>
      <tr><td><strong>Immunosuppressants</strong></td><td>Cyclosporine, tacrolimus, mycophenolate</td><td>Ashwagandha stimulates Th1 immune activity, directly counteracting immunosuppressive therapy</td><td>High</td><td>Do not combine — may trigger rejection or flare</td></tr>
      <tr><td><strong>Sedatives / Anesthetics</strong></td><td>Propofol, barbiturates, general anesthesia</td><td>Additive CNS depression; may prolong sedation</td><td>High</td><td>Discontinue at least 2 weeks before scheduled surgery</td></tr>
      </tbody>
      </table>

      <p>Notice the pattern: most risks stem from ashwagandha <em>amplifying</em> what your medication already does. It pushes thyroid hormones higher, blood sugar lower, and sedation deeper. That's not inherently dangerous in isolation, but stacking it on top of a drug designed to do the same thing narrows your safety margin considerably. <EvidenceBadge level="emerging" /></p>

      <p>If you're unmedicated and healthy, <strong>ashwagandha drug interactions</strong> aren't a practical concern. If you take anything from the table above, this supplement moves from "try it and see" to "get your doctor's sign-off first." For more on how ashwagandha fits into a broader protocol, see our <a href="/guides/beginner-longevity-stack">beginner longevity stack guide</a>.</p>


      <h2>Who Should Not Take Ashwagandha</h2>

      <Callout variant="warning" title="Hard contraindications">
        Ashwagandha stimulates immune activity and affects thyroid hormones.
        Do not take it if you have autoimmune conditions, thyroid disorders,
        are pregnant, or have surgery scheduled within 2 weeks.
      </Callout>

      <p>
        Ashwagandha is generally well-tolerated, but there are real
        contraindications &mdash; not just boilerplate warnings:
      </p>
      <ul>
        <li>
          <strong>Autoimmune conditions</strong> (lupus, rheumatoid arthritis,
          Hashimoto&rsquo;s, MS): Ashwagandha stimulates immune activity,
          which is the opposite of what you want when your immune system is
          already attacking your own tissue.
        </li>
        <li>
          <strong>Thyroid conditions:</strong> Ashwagandha has been shown to
          increase T3 and T4 thyroid hormones in multiple studies. If
          you&rsquo;re on thyroid medication (levothyroxine), it can
          destabilize your dosing. If you have hyperthyroidism, it could
          make things worse.
        </li>
        <li>
          <strong>Pregnancy and breastfeeding:</strong> Insufficient safety
          data. Traditional Ayurvedic texts actually classify it as an
          abortifacient at high doses. Don&rsquo;t risk it.
        </li>
        <li>
          <strong>Surgery within 2 weeks:</strong> It may potentiate
          sedatives and anesthesia, and its mild blood-sugar-lowering effect
          could complicate perioperative management.
        </li>
      </ul>

      <h2>Is It Safe Long-Term?</h2>
      <p>
        This is the question everyone asks, and the honest answer is: probably,
        but the data is limited. Most clinical trials run 8&ndash;12 weeks.
        We don&rsquo;t have 5-year safety data from controlled studies.
      </p>
      <p>
        What we do have: centuries of traditional use, no serious adverse
        events in published trials at standard doses, and a 2020 safety
        review by Tandon and Yadav in the{" "}
        <em>Journal of Ethnopharmacology</em> that found ashwagandha
        well-tolerated in doses up to 1,250mg daily for 30 days.{" "}
        <EvidenceBadge level="moderate" />
      </p>
      <p>
        A common practitioner recommendation is to cycle ashwagandha: take it
        for 8&ndash;12 weeks, then take 2&ndash;4 weeks off. This isn&rsquo;t
        because there&rsquo;s evidence of harm from continuous use &mdash;
        it&rsquo;s a precautionary approach based on the principle that
        chronically suppressing cortisol may not be ideal, and <a href="/guides/best-adaptogens-for-stress">adaptogens</a>
        may lose efficacy over time. Whether cycling is truly necessary is
        debated, but it&rsquo;s a reasonable default.
      </p>

      <h2>How It Fits Into a Broader Stack</h2>
      <p>
        Ashwagandha pairs well with a few other supplements. For stress and
        cortisol management, <a href="/guides/best-magnesium-supplements">magnesium glycinate</a> in the evening is a natural
        complement. For a comprehensive longevity-focused approach, it fits
        neatly into a foundational stack alongside <a href="/guides/best-vitamin-d-supplements">vitamin D</a>, <a href="/guides/best-omega-3-supplements">omega-3</a>, and
        magnesium &mdash; see our{" "}
        <a href="/guides/beginner-longevity-supplement-stack">
          beginner longevity stack guide
        </a>{" "}
        for how to layer these together.
      </p>

      <InteractionGroup title="Ashwagandha pairings">
        <InteractionCard
          type="synergy"
          a="Ashwagandha"
          b="Magnesium Glycinate"
          effect="Complementary stress-reduction pathways — ashwagandha lowers cortisol, magnesium activates the parasympathetic nervous system and regulates GABA."
          recommendation="Take ashwagandha in the morning for daytime stress, magnesium glycinate in the evening for sleep."
        />
        <InteractionCard
          type="synergy"
          a="Ashwagandha"
          b="L-Theanine"
          effect="Both reduce stress and anxiety through different mechanisms. L-theanine promotes alpha brain waves while ashwagandha blunts cortisol."
          recommendation="Can be taken together. L-theanine works acutely (30–60 min), ashwagandha builds over weeks."
        />
      </InteractionGroup>

      <ProductRow
        title="Pair with your ashwagandha"
        products={[
          PRODUCTS["thorne-magnesium-bisglycinate"],
          PRODUCTS["nootropics-depot-l-theanine"],
          PRODUCTS["thorne-vitamin-d-5000"],
        ]}
      />

      <h2>Frequently Asked Questions</h2>

      <h3>Can ashwagandha cause weight gain?</h3>
      <p>
        Some people report increased appetite, which could lead to weight
        gain indirectly. The cortisol reduction may also normalize stress-related
        undereating in some people. In clinical trials, ashwagandha has been
        associated with modest increases in lean mass (via the Wankhede 2015
        study), but not fat gain. If you gain weight on ashwagandha, it&rsquo;s
        likely muscle tissue or simply eating more &mdash; not a direct
        pharmacological effect.
      </p>

      <h3>Does ashwagandha interact with antidepressants or anxiety medications?</h3>

      <Callout variant="warning" title="Medication interaction">
        Ashwagandha has GABAergic and serotonergic activity, meaning it could
        potentiate the effects of SSRIs, benzodiazepines, or other CNS-active
        medications. Discuss with your prescribing doctor before combining.
        Serotonin syndrome, while rare, is serious.
      </Callout>

      <p>
        Ashwagandha has GABAergic and serotonergic activity, meaning it could
        theoretically potentiate the effects of SSRIs, benzodiazepines, or
        other CNS-active medications. There are no well-documented dangerous
        interactions in the literature, but the theoretical risk is real enough
        that you should discuss it with your prescribing doctor before adding
        it. This is not a &ldquo;just be safe&rdquo; disclaimer &mdash;
        serotonin syndrome, while rare, is serious.
      </p>

      <h3>KSM-66 or Sensoril &mdash; which should I take?</h3>
      <p>
        For most people, <strong>KSM-66 at 600mg/day</strong> is the better
        starting point. It has more published trials, a broader evidence base
        (stress, performance, testosterone), and most people tolerate it well
        in the morning without drowsiness. Choose{" "}
        <strong>Sensoril at 125&ndash;250mg</strong> if your primary goal is
        sleep or anxiety and you want a more sedating effect. Some people use
        KSM-66 in the morning and Sensoril at night, though this approach
        hasn&rsquo;t been formally studied.
      </p>

      <h3>How long does ashwagandha take to work?</h3>
      <p>
        Most people notice changes in stress reactivity and sleep quality
        within 2&ndash;4 weeks. The cortisol and testosterone data in trials
        typically reaches statistical significance at the 8-week mark.
        Don&rsquo;t judge it after 3 days &mdash; this isn&rsquo;t caffeine.
        Give it a full 8&ndash;12 week trial before deciding whether it&rsquo;s
        working for you.
      </p>

      <h3>ashwagandha liver damage risk &mdash; is it real?</h3>
      <p>Yes, the risk is real and worth knowing. The guide's 2020 safety review found ashwagandha well-tolerated at standard doses, but peer-reviewed case reports published after 2021 &mdash; including Björnsson et al. (2022) and Drug-Induced Liver Injury Network data &mdash; document rare but serious cases of drug-induced liver injury linked to ashwagandha. These cases are uncommon, not clearly dose-dependent, and may involve product quality issues. If you develop jaundice, dark urine, or unusual fatigue while taking ashwagandha, stop immediately and see a doctor.</p>

      <h3>can I take ashwagandha every day or should I cycle it?</h3>
      <p>Daily use for a defined period is the practical approach. The guide recommends 8&ndash;12 weeks on, then 2&ndash;4 weeks off as a reasonable default &mdash; not because continuous use has demonstrated harm, but as a precaution against habituation and chronic cortisol suppression. The guide is explicit that whether cycling is strictly necessary is debated. A concrete signal to stop early: if you feel unusually fatigued, emotionally flat, or experience GI distress, that's reason to pause regardless of where you are in a cycle.</p>

      <h3>does ashwagandha affect women's hormones?</h3>
      <p>The guide doesn't cover this directly. Its hormone data focuses entirely on testosterone in men, and it doesn't address estrogen, DHEA, PCOS, or interactions with hormonal contraceptives. Ashwagandha does affect the HPA axis and may influence DHEA-S, which matters for women &mdash; but the guide provides no basis for specific claims here. Women with hormonal conditions or those on hormonal birth control should consult a physician before use, particularly given the guide's existing contraindications around thyroid and autoimmune conditions.</p>

      <h3>ashwagandha and thyroid &mdash; Hashimoto's specifically</h3>
      <p>The guide lists both autoimmune conditions and thyroid disorders as contraindications separately, and Hashimoto's is both. The guide's position is clear: ashwagandha stimulates immune activity (problematic when your immune system is attacking thyroid tissue) and raises T3 and T4 (potentially destabilizing for anyone on levothyroxine). Whether that applies equally to all Hashimoto's patients versus only those on medication isn't addressed. Given that Hashimoto's sits at the intersection of both contraindication categories, the conservative read is: don't take it without explicit physician sign-off.</p>

      <h3>which ashwagandha brands are actually third-party tested?</h3>
      <p>The guide doesn't name specific brands or third-party certifications. For quality verification, look for products carrying NSF Certified for Sport, USP Verified, or Informed Sport seals &mdash; these programs test for label accuracy, contaminants, and banned substances. Athletes concerned about contamination should prioritize NSF Certified for Sport or Informed Sport specifically. Beyond certification, confirm the Supplement Facts panel shows a standardized extract (KSM-66 or Sensoril) with disclosed withanolide percentage &mdash; the guide is explicit that unlabeled generics are unreliable.</p>

      <h3>ashwagandha and alcohol interaction</h3>
      <p>The guide doesn't address alcohol directly. Both ashwagandha and alcohol have CNS depressant properties &mdash; ashwagandha via GABAergic activity, alcohol via multiple mechanisms. The guide already flags that ashwagandha may potentiate benzodiazepines and sedatives; alcohol operates through overlapping pathways. Combining them may increase sedation, particularly with Sensoril taken in the evening. This is a gap in the guide's coverage. If you drink regularly or heavily, mention ashwagandha use to your doctor.</p>

      <h3>is KSM-66 worth the higher price over generic ashwagandha?</h3>
      <p>The guide makes a clear case that form determines efficacy. Generic root powder runs 1&ndash;2% withanolides; KSM-66 is standardized to 5%. To match one 600mg KSM-66 capsule, you'd need several grams of unextracted powder. The guide doesn't address specific price points, but the cost difference becomes less meaningful if you're taking four times the dose. The narrow exception: a generic that clearly discloses its withanolide percentage (e.g., 2.5&ndash;5%) at an appropriate dose. If that disclosure isn't on the label, assume it's underpowered.</p>

      <h2>The Bottom Line</h2>
      <p>
        Ashwagandha is one of the better-studied herbal supplements available.
        The evidence for cortisol reduction and stress management is strong.
        The evidence for anxiety and sleep is solid. The evidence for
        testosterone and athletic performance is moderate but real. The key
        is choosing a standardized extract &mdash; KSM-66 or Sensoril &mdash;
        at the doses actually used in clinical research. Generic root powder
        is not the same thing, regardless of what the marketing says.
      </p>
      <p>
        Take it consistently, give it 8 weeks, cycle off periodically, and
        skip it entirely if you have autoimmune or thyroid issues. That&rsquo;s
        the evidence-based approach &mdash; no hype required.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog?q=ashwagandha">
          Browse ashwagandha supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
