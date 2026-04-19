import {
  TLDRBox,
  Callout,
  ProductCallout,
  EvidenceBadge,
  IngredientLink,
  PRODUCTS,
} from "@/components/guide";

export function VitaminD3VsD2() {
  return (
    <>
      <TLDRBox
        readTime="8 min read"
        takeaways={[
          "D3 (cholecalciferol) raises blood levels ~87% more effectively than D2 (ergocalciferol), per a 2012 meta-analysis of randomized controlled trials.",
          "D2 clears your bloodstream in 6–8 hours; D3 lasts roughly 24 hours and binds more efficiently to vitamin D binding protein.",
          "Most prescription 50,000 IU weekly pills are D2 — ask your doctor about switching to daily D3.",
          "Vegans no longer need D2: lichen-sourced D3 is widely available and equally effective.",
          "Take D3 with a fat-containing meal for up to 50% better absorption, and pair with K2 (MK-7) at doses above 2,000 IU/day.",
        ]}
      />

      <p>
        <IngredientLink id="vitamin-d" source="vitamin-d3-vs-d2">Vitamin D3 vs D2</IngredientLink> isn&rsquo;t a close contest. A landmark meta-analysis found D3
        raises serum 25(OH)D levels roughly 87% more effectively than D2 at
        equivalent doses. Yet millions of people still take prescription D2
        without knowing a superior form sits on every pharmacy shelf for a
        fraction of the price.
      </p>

      <h2>What D3 and D2 Actually Are</h2>

      <p>
        Both D3 and D2 are secosteroid hormones your liver converts into
        25-hydroxyvitamin D &mdash; the form measured in blood tests. But they
        come from different biological kingdoms and behave differently once
        inside your body.
      </p>

      <p>
        <strong>Vitamin D3 (cholecalciferol)</strong> is the form your skin
        synthesizes when UVB radiation hits 7-dehydrocholesterol in your
        epidermis. It&rsquo;s found in fatty fish, egg yolks, and lanolin-based
        supplements. It&rsquo;s what most over-the-counter supplements contain.
      </p>

      <p>
        <strong>Vitamin D2 (ergocalciferol)</strong> comes from UVB-irradiated
        yeast and fungi. It&rsquo;s cheaper to produce at pharmaceutical-grade
        concentrations, which is why it became the default prescription form
        decades ago. Most 50,000 IU weekly prescriptions are D2.
      </p>

      <Callout variant="info" title="Reading your bottle?">
        Check the{" "}
        <a href="/guides/how-to-read-a-supplement-label">supplement label</a>{" "}
        for the specific form. &ldquo;Vitamin D&rdquo; alone doesn&rsquo;t tell
        you which type you&rsquo;re getting. Look for &ldquo;cholecalciferol&rdquo;
        (D3) or &ldquo;ergocalciferol&rdquo; (D2) in the ingredients panel.
      </Callout>

      <h2>The Tripkovic 2012 Meta-Analysis: 87% More Effective</h2>

      <p>
        The most cited comparison comes from Tripkovic et al. (2012), published
        in the <em>American Journal of Clinical Nutrition</em>.{" "}
        <EvidenceBadge level="strong" studiesId="vitamin-d-tripkovic-d3vsd2-2012" />{" "}
        The researchers pooled data from randomized controlled trials directly
        comparing D3 and D2 at equivalent doses and found D3 was approximately
        87% more effective at raising and maintaining serum 25(OH)D
        concentrations.
      </p>

      <p>
        That&rsquo;s not a marginal difference. It means taking 1,000 IU of D2
        gives you roughly the blood-level bump of just 535 IU of D3. If
        you&rsquo;re trying to correct a deficiency, the form you choose matters
        as much as the dose on the bottle.
      </p>

      <ProductCallout product={PRODUCTS["thorne-vitamin-d-5000"]} />

      <Callout variant="evidence" title="What &ldquo;87% more effective&rdquo; actually means">
        In pooled analysis, participants taking D3 achieved 25(OH)D
        concentrations roughly 1.87 times higher than those taking D2 at the
        same IU dose. This effect was strongest in daily dosing studies; the bolus dosing data was more equivocal, and some later analyses (e.g., Bjelakovic et al., 2014) have questioned whether the clinical significance matches the biomarker difference. The 87% figure is the best available estimate, but it&rsquo;s not as settled as a single number implies.
      </Callout>

      <h2>Why D3 Outperforms D2: The Mechanism</h2>

      <p>
        Three pharmacokinetic differences explain the gap:
      </p>

      <p>
        <strong>1. Binding protein affinity.</strong> D3 binds more tightly to
        vitamin D binding protein (DBP) in your bloodstream, the taxi that
        carries vitamin D to your liver for activation. Weaker DBP binding means
        D2 gets cleared faster before it can be used.
      </p>

      <p>
        <strong>2. Half-life of the parent compound.</strong> Unhydroxylated D3 has a circulating half-life of
        approximately 24 hours, while D2&rsquo;s is closer to 6&ndash;8
        hours. That shorter window reduces the total amount converted to the
        storage form, 25(OH)D, in your liver. (Note: the clinically measured storage form 25(OH)D has a much longer half-life of 2&ndash;3 weeks regardless of whether it came from D2 or D3 &mdash; it&rsquo;s the initial conversion step where D3&rsquo;s longer half-life gives it the advantage.)
      </p>

      <p>
        <strong>3. Hepatic conversion efficiency.</strong> The liver enzyme
        CYP2R1, responsible for hydroxylating vitamin D into 25(OH)D, appears to
        have a preference for D3&rsquo;s side chain structure. D2&rsquo;s
        different side chain (a double bond at C22 and a methyl group at C24)
        makes it a less efficient substrate.
      </p>

      <h2>Why Is D2 Still Prescribed?</h2>

      <p>
        If D3 is clearly better, why do doctors still prescribe D2? The answer
        is mostly institutional inertia and economics.
      </p>

      <p>
        D2 was the first commercially available form and the first to receive a
        prescription-grade formulation in the United States. High-dose D3
        prescription products didn&rsquo;t exist when 50,000 IU weekly protocols
        were standardized. Many electronic health records still default to D2
        when a clinician orders &ldquo;vitamin D, 50,000 IU.&rdquo;
      </p>

      <p>
        Additionally, D2 is significantly cheaper to manufacture at pharmaceutical
        scale. Insurance formularies favor it. And while the Endocrine Society
        guidelines (Holick et al. 2011){" "}
        <EvidenceBadge level="strong" studiesId="vitamin-d-holick-endocrine-2011" />{" "}
        initially suggested D2 and D3 were &ldquo;equivalent,&rdquo; subsequent
        evidence &mdash; including the Tripkovic meta-analysis &mdash; has
        shifted the consensus.
      </p>

      <Callout variant="tip" title="Prescription D2 isn&rsquo;t dangerous">
        D2 still works. It raises 25(OH)D levels &mdash; just less efficiently.
        If you&rsquo;re on prescription D2 and your blood levels are in range,
        there&rsquo;s no urgent reason to switch. But if you&rsquo;re not
        reaching target levels despite adherence, the form may be the bottleneck.
      </Callout>

      <h2>Vegan D3: The Lichen Option</h2>

      <p>
        For years, D2 was the only vegan-friendly vitamin D because D3
        supplements came exclusively from lanolin (sheep&rsquo;s wool oil) or
        fish liver oil. That&rsquo;s no longer true.
      </p>

      <p>
        Lichen-sourced D3 &mdash; extracted from species like{" "}
        <em>Cladina rangiferina</em> &mdash; is now widely available in
        capsules, softgels, and sprays. It&rsquo;s chemically identical to
        lanolin-derived D3 and behaves identically in your body. Studies using
        lichen D3 show the same 25(OH)D response curves as animal-sourced D3.
      </p>

      <p>
        If you&rsquo;re vegan and currently taking D2, switching to
        lichen-sourced D3 could nearly double the blood-level benefit at the
        same dose. Check our ranking of the{" "}
        <a href="/guides/best-vitamin-d-supplements">best vitamin D supplements</a>{" "}
        for lichen-based options.
      </p>

      <h2>What to Do If Your Doctor Prescribed D2</h2>

      <p>
        Don&rsquo;t stop a prescription without talking to your provider. But
        you can have an informed conversation. Here&rsquo;s a practical framework:
      </p>

      <p>
        <strong>Step 1:</strong> Check your latest 25(OH)D blood level. If
        you&rsquo;re at or above your provider&rsquo;s target (typically 30&ndash;50
        ng/mL), the current regimen is working regardless of form.
      </p>

      <p>
        <strong>Step 2:</strong> If your levels are stubbornly low despite
        adherence, ask your clinician: &ldquo;Would switching to daily D3 be
        appropriate?&rdquo; Many providers are receptive once they see the
        Tripkovic data.
      </p>

      <p>
        <strong>Step 3:</strong> If you switch, don&rsquo;t just halve the D2
        dose. Use the conversion guidance below and recheck levels in 8&ndash;12
        weeks.
      </p>

      <h2>Dose Equivalence: How to Convert</h2>

      <p>
        Based on the Tripkovic meta-analysis, a rough conversion is:
      </p>

      <p>
        <strong>1 IU of D3 &asymp; 1.87 IU of D2</strong> in raising serum
        25(OH)D.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-3 font-semibold">Regimen</th>
              <th className="text-left py-2 pr-3 font-semibold">Weekly D2 dose</th>
              <th className="text-left py-2 font-semibold">Approximate daily D3 equivalent</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50"><td className="py-2 pr-3">Standard weekly repletion</td><td className="py-2 pr-3">50,000 IU once weekly</td><td className="py-2">~3,800 IU daily*</td></tr>
            <tr><td className="py-2 pr-3">Daily maintenance equivalent</td><td className="py-2 pr-3">N/A</td><td className="py-2">~4,000&ndash;5,000 IU daily</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        <em>
          *50,000 IU D2 &divide; 7 days = ~7,143 IU D2/day. Divide by 1.87 =
          ~3,820 IU D3. Many clinicians round to 4,000&ndash;5,000 IU daily D3
          for repletion. This is not medical advice &mdash; confirm with your
          provider.
        </em>
      </p>

      <h2>Take It Right: Fat, K2, and Magnesium Cofactors</h2>

      <p>
        The form of vitamin D you choose is only half the equation. How and when
        you take it matters significantly.
      </p>

      <p>
        <strong>Take with fat.</strong> Vitamin D is fat-soluble. Dawson-Hughes
        et al. (2015) found that taking vitamin D with a fat-containing meal
        increased absorption by up to 50% compared to taking it on an empty
        stomach.{" "}
        <EvidenceBadge level="moderate" studiesId="vitamin-d-absorption-fat-2015" />{" "}
        A tablespoon of olive oil, avocado, or a handful of nuts is sufficient.
        For more on optimizing timing, see our{" "}
        <a href="/guides/supplement-timing-guide">supplement timing</a> guide.
      </p>

      <p>
        <strong>Add K2 (MK-7) at higher doses.</strong> If you take more than
        2,000 IU/day of D3, pairing with vitamin K2 (specifically the MK-7
        form) helps direct calcium into bones rather than soft tissues. Knapen
        et al. (2017) demonstrated improved osteocalcin carboxylation with MK-7
        supplementation alongside D3.{" "}
        <EvidenceBadge level="moderate" studiesId="vitamin-d-knapen-k2-2017" />
      </p>

      <ProductCallout product={PRODUCTS["thorne-vitamin-d-k2"]} />

      <p>
        <strong>Don&rsquo;t forget{" "}
        <a href="/guides/best-magnesium-supplements">magnesium</a>.</strong>{" "}
        Magnesium is a required cofactor for both the hepatic and renal enzymes
        that activate vitamin D. Subclinical magnesium deficiency is common
        (estimated in 50% of Americans) and can blunt your response to
        supplementation regardless of form.
      </p>

      <Callout variant="tip" title="The D3 absorption stack">
        D3 + fat-containing meal + K2 (MK-7, 100&ndash;200 &micro;g) +
        magnesium (glycinate or citrate, 200&ndash;400 mg). Take in the morning
        or with your largest meal.
      </Callout>

      <ProductCallout product={PRODUCTS["thorne-vitamin-k"]} />

      <h2>Frequently Asked Questions</h2>

      <h3>Is 50,000 IU vitamin D2 the same as 50,000 IU vitamin D3?</h3>
      <p>
        No. While the IU number is identical, D3 at 50,000 IU would raise your
        blood levels roughly 87% more than D2 at the same dose. The IU
        measurement reflects biological activity based on an older assay, not
        the actual effect on serum 25(OH)D. In practice, 50,000 IU D3 is a much
        larger effective dose &mdash; and should only be used under medical
        supervision.
      </p>

      <h3>Does my multivitamin have D2 or D3?</h3>
      <p>
        Most modern multivitamins use D3, but not all. Check the ingredient
        list for &ldquo;cholecalciferol&rdquo; (D3) or &ldquo;ergocalciferol&rdquo;
        (D2). Budget multivitamins are more likely to use D2 because it&rsquo;s
        cheaper. If the label just says &ldquo;vitamin D&rdquo; without
        specifying the form, contact the manufacturer or choose a different
        product.
      </p>

      <h3>Can I get enough vitamin D from sunlight instead?</h3>
      <p>
        Your skin produces D3 (not D2) from UVB exposure. Theoretically, 10&ndash;20
        minutes of midday sun on bare arms and legs can produce 10,000&ndash;20,000
        IU. However, this varies enormously by latitude, season, skin tone, age,
        and sunscreen use. Above the 37th parallel (roughly San Francisco to
        Richmond, VA), UVB intensity is insufficient for D3 synthesis from
        roughly November through February.
      </p>

      <h3>Is D2 dangerous?</h3>
      <p>
        D2 is not dangerous at standard doses. It simply raises blood levels
        less efficiently than D3. Some older studies raised concerns about large
        bolus doses of D2 causing more erratic blood level fluctuations, but at
        typical supplemental doses (1,000&ndash;5,000 IU daily or 50,000 IU
        weekly), D2 has an established safety profile.
      </p>

      <h3>How long does it take D3 to raise my blood levels?</h3>
      <p>
        Most people see a meaningful change in serum 25(OH)D within 4&ndash;6
        weeks of consistent daily D3 supplementation. Full steady-state levels
        typically take 8&ndash;12 weeks. If you&rsquo;re severely deficient
        (below 20 ng/mL), your provider may start with a higher loading dose
        before transitioning to a maintenance regimen.
      </p>

      <h2>Who Should Talk to a Doctor First</h2>

      <p>
        Vitamin D3 is one of the safest supplements available, but certain
        populations should consult a healthcare provider before starting or
        switching forms.
      </p>

      <Callout variant="warning" title="If you take blood thinners (warfarin/Coumadin)">
        Adding K2 alongside D3 can affect vitamin K-dependent clotting factors
        and alter your INR. Do not add K2 without your prescriber&rsquo;s
        knowledge.
      </Callout>

      <Callout variant="warning" title="If you have kidney disease">
        Impaired kidneys cannot efficiently convert 25(OH)D to its active form
        (1,25-dihydroxyvitamin D). Your nephrologist may prescribe calcitriol
        instead of standard D3 or D2. Switching forms without guidance could
        be ineffective or cause calcium imbalances.
      </Callout>

      <Callout variant="warning" title="If you have granulomatous diseases (sarcoidosis, certain lymphomas)">
        These conditions can cause unregulated conversion of 25(OH)D to active
        vitamin D, leading to dangerously high calcium levels
        (hypercalcemia). Any vitamin D supplementation requires close
        monitoring.
      </Callout>

      <Callout variant="warning" title="If you are pregnant or breastfeeding">
        Vitamin D3 is generally considered safe and often recommended during
        pregnancy, but dose adjustments may be needed. Work with your OB/GYN
        or midwife to determine the right amount based on your blood levels.
      </Callout>

      <Callout variant="warning" title="If you take thiazide diuretics or calcium supplements">
        These can increase the risk of hypercalcemia when combined with vitamin
        D supplementation. Monitor calcium levels with your provider.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list to
        your next provider visit.
      </p>

      <h2>The Bottom Line</h2>

      <p>
        The vitamin D3 vs D2 debate is one of the clearest cases in supplement
        science where the evidence overwhelmingly favors one form. D3 raises
        blood levels approximately 87% more effectively than D2 at the same IU
        dose, maintains higher levels for longer thanks to its 24-hour half-life
        and stronger binding protein affinity, and is now available in
        vegan-friendly lichen-sourced options that eliminate the last practical
        argument for D2.
      </p>

      <p>
        If you&rsquo;re currently taking an over-the-counter vitamin D
        supplement, you&rsquo;re almost certainly already on D3 &mdash; good.
        If your doctor prescribed 50,000 IU weekly and you&rsquo;re not hitting
        target blood levels, the D2 form may be the reason. Have a conversation
        about switching to daily D3 at an equivalent dose (roughly 4,000&ndash;5,000
        IU/day for repletion).
      </p>

      <p>
        Regardless of form, remember the three things that determine whether
        your vitamin D actually works: take it with fat, ensure adequate
        magnesium intake, and add K2 (MK-7) if you&rsquo;re dosing above 2,000
        IU daily. The 87% efficacy gap between D3 and D2 is real, but a
        perfectly chosen form taken on an empty stomach without cofactors will
        still underperform.
      </p>

      <p>
        Get your 25(OH)D tested, pick D3, take it with dinner, and recheck in
        8&ndash;12 weeks. That&rsquo;s the evidence-based playbook.
      </p>

      <p>
        <a href="https://app.formulate-health.app/catalog?q=vitamin+d3">
          Browse vitamin D3 supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
