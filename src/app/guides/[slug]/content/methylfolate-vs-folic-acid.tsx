import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function MethylfolateVsFolicAcid() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "Folic acid and methylfolate (5-MTHF) both raise blood folate — but only methylfolate bypasses the MTHFR enzyme step that ~40% of people have a reduced-activity variant of",
          "For most people with normal MTHFR, either form works — folic acid is cheaper and has the stronger pregnancy/neural-tube-defect evidence base",
          "For MTHFR C677T homozygous or compound-heterozygous users, methylfolate (Quatrefolic, Metafolin) produces higher effective folate than folic acid at the same dose",
          "Unmetabolized folic acid (UMFA) from high-dose or long-term supplementation has raised some concerns; methylfolate has no UMFA equivalent",
        ]}
      />

      <p>
        Folate is a B-vitamin required for DNA synthesis, red blood cell
        production, and methylation reactions throughout the body. The
        supplement market gives you two forms: <strong>folic acid</strong>{" "}
        (the synthetic form added to fortified food and most
        multivitamins) and <strong>methylfolate</strong> (the biologically
        active form, also called 5-MTHF or L-methylfolate). They look
        interchangeable on the shelf, but pharmacologically they&rsquo;re
        different in a way that matters for a substantial minority of
        users.
      </p>
      <p>
        This guide explains the MTHFR enzyme story, which form to pick
        based on your genetics (if you know them), and what the research
        actually says about the &ldquo;folic acid is bad&rdquo; claim that
        has circulated in wellness circles.
      </p>

      <h2>The MTHFR Story</h2>
      <p>
        Folic acid isn&rsquo;t the form your body uses for methylation —
        it&rsquo;s a precursor that must be converted through a multi-step
        enzyme cascade to become the active 5-MTHF (5-methyltetrahydrofolate).
        The final and rate-limiting step is performed by an enzyme called{" "}
        <strong>methylenetetrahydrofolate reductase (MTHFR)</strong>.
      </p>
      <p>
        The MTHFR gene has two common variants that reduce the enzyme&rsquo;s
        activity:
      </p>
      <ul>
        <li>
          <strong>C677T</strong> — the more studied variant. Heterozygous
          (one copy): ~35% reduced activity. Homozygous (two copies):
          ~70% reduced activity. Prevalence: ~30–40% of people carry at
          least one copy.
        </li>
        <li>
          <strong>A1298C</strong> — less reduction in activity alone;
          clinically meaningful mostly in combination with C677T.
        </li>
      </ul>
      <p>
        In users with reduced MTHFR activity, folic acid supplementation
        converts to active 5-MTHF less efficiently. Blood folate rises
        but the usable pool (for methylation, homocysteine management,
        red blood cell synthesis) rises less. Methylfolate supplementation
        bypasses the enzyme entirely — you&rsquo;re taking the product
        directly.
      </p>
      <Callout variant="evidence" title="What MTHFR testing actually tells you">
        Genetic tests (23andMe, direct-to-consumer panels, or clinical
        labs) can report MTHFR status. Clinical interpretation is
        contested: MTHFR variants are common, and most carriers have no
        clinical problem. Actual decision utility is highest in users with
        elevated homocysteine, recurrent miscarriage, or certain
        cardiovascular risk profiles. A positive test doesn&rsquo;t
        automatically require treatment. <EvidenceBadge level="moderate" />
      </Callout>

      <h2>The Evidence Picture</h2>

      <h3>Pregnancy &amp; Neural Tube Defects</h3>
      <p>
        This is where folic acid&rsquo;s evidence base is dominant. Every
        pregnancy guideline globally recommends 400–800 mcg folic acid
        daily starting before conception; the neural-tube-defect evidence
        is decades deep and based on folic acid, not methylfolate. Some
        guidelines now allow methylfolate as an acceptable alternative in
        MTHFR-affected users, but folic acid remains the reference
        standard. <EvidenceBadge level="strong" />
      </p>

      <h3>Homocysteine Reduction</h3>
      <p>
        Both forms reduce homocysteine at supplement doses. In users with
        MTHFR C677T homozygosity, methylfolate produces a measurably
        larger reduction than folic acid at the same dose — the difference
        tracks exactly what you&rsquo;d predict from the enzyme kinetics.
        <EvidenceBadge level="strong" />
      </p>

      <h3>Mood, Depression, &amp; L-Methylfolate as Adjunct</h3>
      <p>
        L-methylfolate has specific FDA clearance as a medical food for
        adjunct use in major depressive disorder at 7.5–15 mg/day (way
        higher than supplement doses). Evidence shows response
        improvements when added to SSRI therapy, particularly in users
        with low folate or MTHFR variants. Folic acid at similar doses
        has weaker evidence for this application. <EvidenceBadge level="moderate" />
      </p>

      <h3>The Unmetabolized Folic Acid (UMFA) Concern</h3>
      <p>
        High-dose or long-term folic acid supplementation (typically
        &gt;400–1,000 mcg/day) can saturate the conversion pathway,
        leading to circulating &ldquo;unmetabolized folic acid&rdquo; in
        the bloodstream. Observational studies have associated UMFA with
        reduced NK-cell activity and some epigenetic concerns, but causal
        evidence in humans is thin. At typical supplement doses
        (400–800 mcg) it&rsquo;s not an established problem. Methylfolate
        doesn&rsquo;t produce UMFA by definition. <EvidenceBadge level="low" />
      </p>

      <h2>When to Pick Each Form</h2>

      <h3>Pick Folic Acid (or Folate) If:</h3>
      <ul>
        <li>
          You&rsquo;re pregnant or planning to be — the neural-tube
          evidence is folic-acid-specific
        </li>
        <li>
          You don&rsquo;t know your MTHFR status and don&rsquo;t have
          symptoms suggesting an issue
        </li>
        <li>
          Cost matters — folic acid is dramatically cheaper
        </li>
        <li>
          You take a multivitamin — most use folic acid, and the
          400–600 mcg dose is well below the UMFA concern threshold
        </li>
      </ul>

      <h3>Pick Methylfolate (5-MTHF / L-Methylfolate) If:</h3>
      <ul>
        <li>
          You know you&rsquo;re MTHFR C677T homozygous or
          compound-heterozygous
        </li>
        <li>
          You have elevated homocysteine despite folic acid
          supplementation
        </li>
        <li>
          You have treatment-resistant depression (discuss with
          prescriber; higher doses as adjunct)
        </li>
        <li>
          You&rsquo;re taking folate long-term at doses over 800 mcg/day
          and want to avoid UMFA buildup
        </li>
      </ul>
      <Callout variant="info" title="Form names on supplement labels">
        Look for: <strong>Quatrefolic</strong> (calcium L-5-MTHF, a
        stable branded form), <strong>Metafolin</strong> (another stable
        branded form), <strong>L-methylfolate</strong>, or{" "}
        <strong>5-MTHF</strong>. Plain &ldquo;methylfolate&rdquo; without
        stereochemistry designation can be the less-active form — the
        branded names guarantee the bioactive L-isomer.
      </Callout>

      <h2>Dose</h2>
      <ul>
        <li>
          <strong>General adult:</strong> 400 mcg/day (either form)
        </li>
        <li>
          <strong>Pregnancy / preconception:</strong> 400–800 mcg folic
          acid/day (methylfolate at equivalent dose is an acceptable
          alternative per some guidelines)
        </li>
        <li>
          <strong>MTHFR-aware user:</strong> 400–1,000 mcg/day
          methylfolate
        </li>
        <li>
          <strong>Adjunct for depression (prescription):</strong>{" "}
          7.5–15 mg/day L-methylfolate, under physician supervision
        </li>
        <li>
          <strong>Upper limit:</strong> 1,000 mcg/day from supplements
          (folic acid) is the current US recommendation. Methylfolate
          doesn&rsquo;t have the same concern since it doesn&rsquo;t
          produce UMFA.
        </li>
      </ul>

      <h2>Can I Take Both?</h2>
      <p>
        Yes, though there&rsquo;s rarely a reason. Most commercial
        &ldquo;combined&rdquo; folate products use methylfolate because
        it covers both MTHFR-affected and MTHFR-normal users effectively.
        If your multivitamin already has folic acid and you&rsquo;re
        adding a methylfolate supplement for a specific reason, keep the
        combined total below 1,000 mcg/day.
      </p>

      <h2>Interactions to Know</h2>
      <p>
        Folate (either form) has a few clinically relevant interactions:
      </p>
      <ul>
        <li>
          <strong>Methotrexate:</strong> High-dose folate can interfere
          with methotrexate&apos;s therapeutic effect. Patients on
          methotrexate are typically prescribed a specific folate
          regimen by their rheumatologist; don&rsquo;t freelance.
        </li>
        <li>
          <strong>Certain anticonvulsants:</strong> Phenytoin and
          phenobarbital lower folate levels; dose adjustment may be
          needed.
        </li>
        <li>
          <strong>Trimethoprim, pyrimethamine:</strong> Antifolate
          antibiotics. Separate dosing or discuss with prescriber.
        </li>
        <li>
          <strong>High-dose folate + low-dose B12:</strong> Folate can
          mask the anemia of B12 deficiency while neurological damage
          progresses. Always supplement B12 alongside any long-term
          high-dose folate. See our{" "}
          <a href="/guides/vitamin-b12-guide">Vitamin B12 guide</a>.
        </li>
      </ul>

      <h2>How Formulate Scores Folate Supplements</h2>
      <p>
        The product catalog scores both folate-containing multivitamins
        and single-ingredient folate products. Key differentiators that
        drive higher scores:
      </p>
      <ul>
        <li>
          Form disclosure (methylfolate vs folic acid) on the label
        </li>
        <li>
          Branded bioactive form (Quatrefolic, Metafolin) vs generic
        </li>
        <li>
          Paired B12 (prevents masking)
        </li>
        <li>
          Dose clearly stated (per mcg, not per &ldquo;complex&rdquo;)
        </li>
        <li>
          Third-party testing coverage
        </li>
      </ul>
      <p>
        See the <a href="/brands">brand hub</a> for how specific brands
        score on folate forms, or the{" "}
        <a href="/supplements">product review hub</a> for individual
        scored products.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Should everyone take methylfolate instead of folic acid?</h3>
      <p>
        No. The narrative that &ldquo;folic acid is bad&rdquo; has
        overrun the actual evidence. For MTHFR-normal users at typical
        supplement doses, folic acid works fine and has stronger
        population-level evidence, particularly for pregnancy. The case
        for methylfolate is strongest in specific populations, not as a
        universal default.
      </p>

      <h3>How do I know if I have an MTHFR variant?</h3>
      <p>
        Genetic testing (direct-to-consumer or through a clinician).
        Testing without a clinical reason isn&rsquo;t usually
        recommended, but if you&rsquo;ve had unexplained elevated
        homocysteine, recurrent pregnancy loss, or cardiovascular events
        at a young age, it&rsquo;s a reasonable workup addition.
      </p>

      <h3>Is folate the same as folic acid?</h3>
      <p>
        Sort of, but the terminology is inconsistent. &ldquo;Folate&rdquo;
        technically refers to the natural food form and the collective
        family of folate compounds. &ldquo;Folic acid&rdquo; is the
        synthetic form used in fortification and cheap supplements.
        Product labels use the terms loosely — always check the
        form-name column specifically (5-MTHF, L-methylfolate, folic
        acid, etc.) rather than relying on the category name.
      </p>

      <h3>Can methylfolate cause side effects?</h3>
      <p>
        At high adjunct doses (7.5–15 mg), a subset of users report
        anxiety, irritability, or &ldquo;overstimulation.&rdquo; This is
        reversible with dose reduction. Start low (400 mcg) and titrate
        if using for depression. Folic acid at typical doses has very
        low side-effect incidence.
      </p>

      <h3>What if I take too much folate?</h3>
      <p>
        Folic acid at doses over 1,000 mcg/day carries the UMFA concern
        (observational, not strongly causal) and can mask B12 deficiency.
        Methylfolate is considered lower-risk at similar doses but
        hasn&rsquo;t been tested at very high chronic doses. Stay at or
        below 1,000 mcg/day combined unless a clinician has a specific
        reason for higher dosing.
      </p>
    </>
  );
}
