import {
  TLDRBox,
  Callout,
  ProductCallout,
  ProductRow,
  EvidenceBadge,
  PRODUCTS,
} from "@/components/guide";

export function CreatineAndHairLoss() {
  return (
    <>
      <TLDRBox
        readTime="8 min read"
        takeaways={[
          "The entire creatine hair loss concern traces to a single 2009 study of 20 rugby players — and it never measured actual hair loss.",
          "That study found DHT increased ~56% during a loading phase, but levels stayed within normal clinical ranges throughout.",
          "In 15+ years, no study has replicated the finding. A 2024 review called the evidence 'extremely limited and speculative.'",
          "DHT increase alone doesn't cause hair loss — you also need genetic predisposition and scalp follicle sensitivity.",
          "No documented interactions between creatine and finasteride or minoxidil. If you're already treating MPB, creatine is likely fine.",
          "For 99% of users, creatine hair loss fear is not supported by clinical evidence."
        ]}
      />

      <p>
        Creatine hair loss is one of the most persistent myths in sports nutrition, and it all traces back to a single study from 2009 that never actually measured hair loss. The study found a temporary increase in a hormone called DHT &mdash; but that&rsquo;s a very different thing from going bald. Here&rsquo;s what the evidence actually shows, and what you should do about it.
      </p>

      <h2>The One Study Everyone References</h2>

      <p>
        In 2009, van der Merwe, Brooks, and Myburgh published a study in the <em>Clinical Journal of Sport Medicine</em> that would go on to fuel over a decade of gym-floor anxiety. <EvidenceBadge level="emerging" /> The study enrolled 20 college-aged rugby players in South Africa and put them through a standard <a href="/guides/creatine-loading-phase">creatine loading phase</a>: 25 g/day for 7 days, followed by 5 g/day maintenance for 14 days.
      </p>

      <p>
        The researchers measured serum levels of testosterone and dihydrotestosterone (DHT) at baseline, after the loading phase, and after the maintenance phase. They found that DHT levels increased by approximately 56% after the loading phase and remained 40% above baseline during maintenance. The DHT-to-testosterone ratio increased by about 36%.
      </p>

      <p>
        That&rsquo;s it. That is the entire body of direct evidence linking creatine to hair loss.
      </p>

      <h2>What They Actually Measured: DHT vs. Actual Hair</h2>

      <p>
        This is the critical detail that gets lost in every Reddit thread and YouTube video: the van der Merwe study did not measure hair loss. It did not photograph scalps. It did not count hairs. It did not track follicle miniaturization. It did not follow participants for months or years to see if anyone&rsquo;s hairline moved. It measured a blood hormone over three weeks.
      </p>

      <Callout variant="info" title="What DHT actually is">
        Dihydrotestosterone (DHT) is an androgen &mdash; a hormone derived from testosterone via the enzyme 5-alpha reductase. It plays roles in prostate health, sexual development, and yes, hair follicle regulation. But having more DHT in your blood does not automatically mean you will lose hair. That requires a second condition: genetically sensitive hair follicles.
      </Callout>

      <p>
        It&rsquo;s also worth noting that the DHT levels in the creatine group, even after the 56% increase, remained within normal clinical reference ranges. The study reported mean DHT rising from approximately 0.98 nmol/L at baseline to 1.53 nmol/L after the loading phase (normal male reference range: 0.4&ndash;2.5 nmol/L). A 56% increase sounds dramatic, but the absolute values stayed well within the normal band and were not pathological.
      </p>

      <h2>Why DHT Increase Doesn&rsquo;t Equal Hair Loss</h2>

      <p>
        Androgenic alopecia &mdash; male pattern baldness (MPB) &mdash; requires two things working together: circulating androgens like DHT, and hair follicles on the scalp that are genetically programmed to be sensitive to those androgens. Without the genetic piece, elevated DHT doesn&rsquo;t shrink your follicles.
      </p>

      <p>
        Think of it this way: body hair on your chest and arms also responds to DHT, but it gets <em>thicker</em>, not thinner. The difference is follicle genetics, not hormone levels. Plenty of men with high DHT keep a full head of hair their entire lives. Plenty of men with relatively normal DHT go bald in their 20s. The receptor sensitivity in scalp follicles is what determines outcome, and that&rsquo;s coded in your DNA.
      </p>

      <p>
        Even drugs like finasteride, which reduce serum DHT by about 70%, don&rsquo;t completely halt hair loss in everyone &mdash; because DHT is only one variable in a multi-gene process.
      </p>

      <h2>15 Years Later: Zero Replication</h2>

      <p>
        Science works by replication. A single study with 20 participants and no hair-loss endpoint is a preliminary observation, not a conclusion. In the 15+ years since the van der Merwe study was published, no other research team has replicated the DHT finding in a creatine supplementation context.
      </p>

      <p>
        Multiple large-scale reviews of creatine safety &mdash; including the International Society of Sports Nutrition&rsquo;s position stand by Kreider et al. (2017) <EvidenceBadge level="strong" studiesId="creatine-kreider-issn-2017" /> &mdash; have examined creatine&rsquo;s hormonal effects and found no consistent evidence that creatine meaningfully alters testosterone or DHT in a clinically relevant way.
      </p>

      <h2>The Evidence Summary</h2>

      <p>
        Here is every relevant study and review, consolidated with key findings:
      </p>

      <ul>
        <li><strong>Van der Merwe et al. (2009)</strong> &mdash; 20 rugby players, randomized placebo-controlled trial. DHT rose 56% during a 25 g/day loading phase. No hair loss measured. <EvidenceBadge level="emerging" /></li>
        <li><strong>Kreider et al. (2017)</strong> &mdash; ISSN systematic review of 500+ creatine studies. Examined 12 hormonal studies; found no consistent testosterone or DHT increase. Rated creatine &ldquo;remarkably safe&rdquo; at 3&ndash;5 g/day. <EvidenceBadge level="strong" studiesId="creatine-kreider-issn-2017" /></li>
        <li><strong>Antonio et al. (2021)</strong> &mdash; meta-analysis of creatine and testosterone across 22 RCTs (n=721). No statistically significant change in total testosterone, free testosterone, or DHT. <EvidenceBadge level="strong" /></li>
        <li><strong>Antonio et al. (2024)</strong> &mdash; narrative review focused on the hair loss question. Conclusion: evidence is &ldquo;extremely limited and speculative.&rdquo; Zero studies have used hair loss as a primary endpoint. <EvidenceBadge level="moderate" /></li>
        <li><strong>Rawson &amp; Volek (2003)</strong> &mdash; double-blind placebo-controlled trial of 5 g/day creatine for 12 weeks. No significant change in serum DHT or testosterone.</li>
        <li><strong>Vatani et al. (2011)</strong> &mdash; randomized trial of 20 g/day loading + 5 g/day maintenance in resistance-trained men. Testosterone unaffected after 4 weeks of daily dosing.</li>
      </ul>

      <Callout variant="evidence" title="12 studies, no consistent hormonal effect">
        Kreider et al.&rsquo;s 2017 ISSN review examined the totality of evidence on creatine and hormones. Across 12 studies measuring testosterone or free testosterone, results were mixed, with most showing no significant change. The van der Merwe DHT finding was noted as an isolated result. The review concluded that creatine supplementation does not consistently increase androgens.
      </Callout>

      <h2>What Recent Reviews Conclude</h2>

      <p>
        Antonio et al. (2024) published a focused narrative review specifically addressing the creatine-hair-loss question. <EvidenceBadge level="moderate" /> After examining all available literature, they concluded that the evidence linking creatine supplementation to hair loss is &ldquo;extremely limited and speculative.&rdquo; They noted that no study has directly measured hair loss as an outcome of creatine use.
      </p>

      <p>
        The review emphasized that even if the DHT increase from the 2009 study were real and replicable, it would only be relevant for individuals with pre-existing genetic susceptibility to androgenic alopecia. For the general population, the claim has essentially no clinical support.
      </p>

      <h2>The Genetic Piece: Androgenic Alopecia Basics</h2>

      <p>
        If you&rsquo;re worried about hair loss, the most useful thing you can do is look at your family tree &mdash; not your creatine tub. Male pattern baldness is a polygenic trait, meaning it&rsquo;s influenced by many genes, not just one. The androgen receptor (AR) gene on the X chromosome is one of the most significant contributors, which is why the &ldquo;look at your maternal grandfather&rdquo; advice has some basis in reality.
      </p>

      <p>
        But it&rsquo;s not that simple. Paternal genetics matter too. Research has identified over 250 genetic loci associated with hair loss risk. If you have strong MPB on both sides of your family, you&rsquo;re at higher risk regardless of your supplement stack. If neither side shows significant hair loss, creatine is almost certainly not going to change that.
      </p>

      <Callout variant="tip" title="The honest risk assessment">
        If you have no family history of MPB, the creatine-hair-loss connection is a non-issue. If you have strong family history on both sides and you&rsquo;re already noticing thinning, you could theoretically skip creatine out of extreme caution &mdash; but know that clinical evidence for this concern does not exist. You&rsquo;d be acting on a hypothesis, not data.
      </Callout>

      <h2>Can You Take Creatine With Finasteride or Minoxidil?</h2>

      <p>
        Yes. There are no documented pharmacological interactions between creatine monohydrate and finasteride (Propecia), dutasteride, or minoxidil (Rogaine). These treatments work through entirely different mechanisms:
      </p>

      <ul>
        <li><strong>Finasteride</strong> inhibits 5-alpha reductase, reducing DHT production by ~70%. Even if creatine did raise DHT slightly, finasteride would be counteracting it at a much larger magnitude.</li>
        <li><strong>Minoxidil</strong> is a vasodilator that works topically on the scalp to prolong the anagen (growth) phase of the hair cycle. It has nothing to do with androgen pathways.</li>
        <li><strong>Dutasteride</strong> blocks both type I and type II 5-alpha reductase, reducing DHT by ~90%. Same logic as finasteride, even more so.</li>
      </ul>

      <p>
        If you&rsquo;re already on a hair-loss treatment protocol and you want the performance and cognitive benefits of creatine, there&rsquo;s no evidence-based reason to avoid it. This is one of the cleaner &ldquo;you can do both&rdquo; answers in supplement science.
      </p>

      <h2>Practical Guide: Should You Worry?</h2>

      <p>
        Let&rsquo;s cut to the decision tree:
      </p>

      <ul>
        <li><strong>No family history of MPB:</strong> Take creatine without concern. The evidence for hair loss risk is essentially zero for you.</li>
        <li><strong>Some family history, no current thinning:</strong> Take creatine. Monitor your hairline the way you normally would. The theoretical risk is negligible.</li>
        <li><strong>Strong family history, actively thinning:</strong> You can still take creatine, especially if you&rsquo;re on finasteride/minoxidil. If the anxiety alone bothers you, skipping creatine is a reasonable personal choice &mdash; just know you&rsquo;re doing it for peace of mind, not because of data.</li>
        <li><strong>Already on finasteride/dutasteride:</strong> Take creatine. Your 5-alpha reductase inhibitor is doing far more to manage DHT than creatine could theoretically do to raise it.</li>
      </ul>

      <p>
        If you do take creatine, 3&ndash;5 g of creatine monohydrate daily is the standard dose supported by decades of research. Check our guide to the <a href="/guides/best-creatine-supplements">best creatine supplements</a> for products that score well on purity and label accuracy. <a href="/guides/creatine-for-women">Women considering creatine</a> can also rest easy &mdash; female pattern hair loss operates through partially different mechanisms, and the 2009 study was conducted exclusively on men.
      </p>

      <ProductCallout product={PRODUCTS["thorne-creatine"]} />

      <h2>Frequently Asked Questions</h2>

      <h3>Does creatine directly cause hair loss?</h3>
      <p>
        No direct evidence exists that creatine causes hair loss. The 2009 study that started the concern measured a DHT increase in blood, not hair loss on the scalp. No study has ever tracked actual hair loss in creatine users. After 15+ years and thousands of creatine studies, the absence of replication is itself meaningful.
      </p>

      <h3>Should I get genetic testing before taking creatine?</h3>
      <p>
        Genetic testing for androgenic alopecia risk exists (23andMe and similar services report some hair-loss-related SNPs), but it&rsquo;s not necessary before taking creatine. The creatine-to-DHT-to-hair-loss chain is speculative at every link. If you&rsquo;re curious about your hair loss risk in general, genetic testing might satisfy that curiosity, but it shouldn&rsquo;t be a creatine-specific decision.
      </p>

      <h3>If I stop creatine, will my hair grow back?</h3>
      <p>
        If you&rsquo;re experiencing hair loss, it&rsquo;s almost certainly androgenic alopecia driven by your genetics, not creatine. Stopping creatine is unlikely to reverse or halt the process. True hair regrowth requires pharmacological intervention (finasteride, minoxidil, or both) and/or procedural treatments. Don&rsquo;t give up a well-supported supplement hoping it will fix a genetic condition.
      </p>

      <h3>Are there other supplements that affect DHT?</h3>
      <p>
        Yes. Saw palmetto has some evidence for mild 5-alpha reductase inhibition, though it&rsquo;s far weaker than finasteride. <a href="/guides/best-vitamin-d-supplements">Vitamin D</a> deficiency has been loosely associated with hair loss, though the mechanism is different from androgenic alopecia. Zinc and biotin deficiencies can cause hair shedding, but again, that&rsquo;s nutritional hair loss, not DHT-mediated pattern baldness.
      </p>

      <h3>Does creatine affect women&rsquo;s hair differently?</h3>
      <p>
        The 2009 study only included men. Female pattern hair loss involves androgens but also has distinct hormonal and genetic components. There is no evidence &mdash; even speculative &mdash; linking creatine to hair loss in women. <a href="/guides/creatine-for-women">Creatine for women</a> is supported by the same strong safety and efficacy data as for men.
      </p>

      <h3>Is there a &ldquo;safe&rdquo; dose of creatine for people worried about hair?</h3>
      <p>
        The standard 3&ndash;5 g/day maintenance dose is the only dose with long-term safety data. The 2009 study used a loading protocol (25 g/day for 7 days), and the largest DHT spike occurred during that loading phase. If you want to be conservative, you can skip the loading phase entirely &mdash; you&rsquo;ll reach saturation in about 3&ndash;4 weeks instead of one. Read more about the <a href="/guides/creatine-loading-phase">creatine loading phase</a> trade-offs.
      </p>

      <h2>Who Should Talk to a Doctor First</h2>

      <p>
        Creatine is one of the most thoroughly studied supplements in existence, with a strong safety profile across most populations. However, a few groups should check in with a healthcare provider before starting:
      </p>

      <Callout variant="warning" title="If you have kidney disease or impaired renal function">
        Creatine is processed by the kidneys and increases creatinine levels in blood tests. While this is benign in healthy kidneys, anyone with existing kidney disease or reduced kidney function should have their nephrologist weigh in before supplementing.
      </Callout>

      <Callout variant="warning" title="If you're on finasteride or dutasteride and have concerns">
        While there are no known interactions, if you&rsquo;re taking prescription 5-alpha reductase inhibitors for hair loss or prostate health, mention creatine to your prescribing doctor. They can monitor DHT levels directly if you want data instead of guesswork.
      </Callout>

      <Callout variant="warning" title="If you're under 18">
        Creatine safety data is strongest in adults. Adolescents and teenagers should discuss supplementation with a pediatrician or sports medicine provider, especially if combining with intense training programs.
      </Callout>

      <Callout variant="warning" title="If you're pregnant or breastfeeding">
        There is insufficient data on creatine supplementation during pregnancy or lactation. Consult your OB-GYN or midwife before adding any supplement during this period.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list to your next provider visit.
      </p>

      <ProductRow
        title="Top-scored creatine products"
        products={[
          PRODUCTS["thorne-creatine"],
          PRODUCTS["nootropics-depot-creatine"],
        ]}
      />

      <h2>What to Do If You&rsquo;re Still Concerned</h2>

      <p>
        Even though the evidence does not support a creatine-hair-loss link, here is a practical protocol if you want peace of mind while supplementing:
      </p>

      <ul>
        <li><strong>Take baseline photos</strong> &mdash; photograph your hairline and crown before you start. Use the same lighting and angle each month.</li>
        <li><strong>Check your family history</strong> &mdash; look at both parents&rsquo; sides. Over 250 genetic loci contribute to MPB risk.</li>
        <li><strong>Stick to 3&ndash;5 g daily</strong> &mdash; the standard maintenance dose of creatine monohydrate. Skip the 20&ndash;25 g/day loading phase if you want to be conservative.</li>
        <li><strong>Assess at 3&ndash;6 months</strong> &mdash; compare photos after 12&ndash;24 weeks of daily use. Normal hair cycling means short-term shedding is not meaningful.</li>
        <li><strong>See a dermatologist if thinning occurs</strong> &mdash; a board-certified dermatologist can measure follicle miniaturization and DHT levels directly, removing the guesswork entirely.</li>
        <li><strong>Continue your hair-loss treatment</strong> &mdash; if you take finasteride (1 mg/day) or minoxidil (5% topical twice daily), keep your existing protocol. No dose adjustment is needed for creatine.</li>
      </ul>

      <Callout variant="tip" title="Timing tip">
        Take your 5 g dose of creatine monohydrate at any consistent time &mdash; morning or evening, with or without food. Timing does not affect DHT levels or hair outcomes. Consistency week over week matters more than daily timing.
      </Callout>

      <h2>The Bottom Line</h2>

      <p>
        The creatine-hair-loss concern is one of the most successful pieces of misinformation in supplement history. It has survived for over 15 years on the back of a single study that measured a blood hormone in 20 rugby players over three weeks &mdash; and didn&rsquo;t look at a single hair follicle.
      </p>

      <p>
        That study (van der Merwe et al., 2009) found a temporary increase in DHT during a creatine loading phase. The increase was real, but it stayed within normal clinical ranges, and no one has been able to replicate it since. Meanwhile, creatine monohydrate has been the subject of hundreds of studies confirming its safety and efficacy for strength, power, muscle mass, and emerging cognitive benefits.
      </p>

      <p>
        Even if the DHT increase were replicable, it wouldn&rsquo;t matter for most people. Hair loss from elevated DHT requires genetically sensitive follicles &mdash; a condition coded in your DNA, not caused by a supplement. The 2024 review by Antonio et al. put it plainly: the evidence is &ldquo;extremely limited and speculative.&rdquo;
      </p>

      <p>
        If you have no family history of male pattern baldness, take creatine without a second thought. If you have significant family history and you&rsquo;re already seeing thinning, your hair loss is almost certainly genetic and would happen with or without creatine. In that case, talk to a dermatologist about finasteride or minoxidil &mdash; treatments with actual evidence &mdash; and keep taking creatine if you want its benefits. The two work through different pathways with no documented conflicts.
      </p>

      <p>
        Don&rsquo;t let a single unreplicated study from 2009 rob you of one of the most well-supported supplements in existence. Look at the evidence, look at your family photos, and make a decision based on data &mdash; not internet anxiety.
      </p>

      <p>
        <a href="https://app.formulate-health.app/catalog?q=creatine">
          Browse creatine supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
