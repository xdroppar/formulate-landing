import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function HairLossWhatActuallyWorks() {
  return (
    <>
      <TLDRBox
        readTime="11 min read"
        takeaways={[
          "Name the type first: pattern hair loss, shedding after a trigger, patchy autoimmune loss and scarring conditions need completely different responses",
          "For pattern hair loss, topical minoxidil (non-prescription) and finasteride (prescription, men) have the strongest trial evidence; both only work while you keep using them",
          "Finasteride is effective but not trivial: sexual side effects in a small minority, and European regulators added suicidal thoughts as a possible side effect in 2025",
          "Low-level laser devices beat sham devices in trials, often maker-funded; biotin does nothing for hair unless you are deficient and can falsify blood tests, including heart-attack tests",
          "See a dermatologist for sudden, patchy, painful or scarring hair loss, or loss in a child",
        ]}
      />

      <p>
        Hair loss is one of the most heavily marketed health worries there is:
        shampoos, serums, gummies, oils, caps and clinics, most promising
        &ldquo;regrowth&rdquo;. The treatments with real evidence behind them
        are few, well-studied, and less glamorous &mdash; and each of them only
        works for the right type of hair loss.
      </p>
      <p>
        This guide starts with the types, because that decides everything
        else. Then it covers what works for the most common one, pattern hair
        loss, with honest notes on side effects and who funded the studies;
        what doesn&rsquo;t work; which shampoos actually have evidence (for
        dandruff, not regrowth); and when to see a dermatologist.
      </p>

      <h2>First, what kind of hair loss is it?</h2>
      <p>
        Losing 50&ndash;100 hairs a day is normal. Beyond that, the main
        patterns are:
      </p>
      <ul>
        <li>
          <strong>Pattern hair loss (androgenetic alopecia).</strong> By far the
          most common. Follicles gradually shrink under the influence of the
          hormone dihydrotestosterone (DHT) in people who are genetically
          sensitive to it. In men it shows as a receding hairline and thinning
          crown; in women as a widening parting and thinning on top, usually
          with the front hairline kept. It is slow and progressive.
        </li>
        <li>
          <strong>Telogen effluvium (shedding).</strong> A sudden increase in
          hair falling out all over the scalp, typically two to three months
          after a trigger: fever or serious illness, childbirth, surgery, crash
          dieting, a major stressor, or starting or stopping some medicines.
          It usually settles by itself within about six months once the trigger
          has passed. Low iron and thyroid problems can cause or prolong it.
        </li>
        <li>
          <strong>Alopecia areata.</strong> An autoimmune condition causing
          round, smooth bald patches, sometimes in the beard or eyebrows. It
          needs a dermatologist; newer prescription tablets (JAK inhibitors)
          are now approved for severe cases.
        </li>
        <li>
          <strong>Traction alopecia.</strong> Loss along the hairline from
          tight braids, ponytails, weaves or extensions. Early on it is
          reversible if the tension stops.
        </li>
        <li>
          <strong>Scarring (cicatricial) alopecias.</strong> Inflammatory
          conditions that destroy follicles permanently, often with itching,
          burning, redness or scaling around hairs. Early treatment matters
          because lost follicles do not come back.
        </li>
        <li>
          <strong>Other causes:</strong> fungal scalp infection (mostly in
          children), cancer treatment, thyroid disease, iron deficiency,
          polycystic ovary syndrome, and some medicines.
        </li>
      </ul>
      <p>
        Everything below is about pattern hair loss unless stated. If your
        hair loss does not fit that pattern, the treatment is different, and a
        diagnosis comes first.
      </p>

      <h2>What works for pattern hair loss</h2>

      <h3>Minoxidil (topical, non-prescription)</h3>
      <p>
        Minoxidil was first a blood-pressure tablet; the hair growth was a side
        effect. As a scalp solution or foam it prolongs the growing phase of
        the hair cycle and enlarges shrunken follicles. In a 48-week trial of
        393 men, 5% minoxidil twice daily beat both 2% and placebo on hair
        counts and on how patients and investigators rated coverage, with 45%
        more regrowth than the 2% strength.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Olsen et al.", year: 2002, journal: "Journal of the American Academy of Dermatology",
          title: "A randomized clinical trial of 5% topical minoxidil versus 2% topical minoxidil and placebo in the treatment of androgenetic alopecia in men",
          url: "https://pubmed.ncbi.nlm.nih.gov/12196747/",
          summary: "393 men, 48 weeks: 5% minoxidil superior to 2% and placebo on hair counts and ratings; 45% more regrowth than 2%. More itching and irritation with 5%.",
        }]} />{" "}
        A parallel trial in 381 women found 5% superior to placebo on all main
        measures and 2% superior on hair counts, with more itching and unwanted
        facial hair at the higher strength.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Lucky et al.", year: 2004, journal: "Journal of the American Academy of Dermatology",
          title: "A randomized, placebo-controlled trial of 5% and 2% topical minoxidil solutions in the treatment of female pattern hair loss",
          url: "https://pubmed.ncbi.nlm.nih.gov/15034503/",
          summary: "381 women, 48 weeks: 5% minoxidil beat placebo on all three primary measures; 2% beat placebo on hair count and investigator rating. More pruritus and facial hair with 5%.",
        }]} />{" "}
        These were large registration-era trials, and the benefit has held up
        in later independent meta-analyses.
      </p>
      <p>What to expect:</p>
      <ul>
        <li>
          <strong>A shedding phase</strong> in the first 2&ndash;8 weeks is
          common and a sign that resting hairs are being pushed into a new
          growth cycle.
        </li>
        <li>
          <strong>Judge it at six to twelve months,</strong> not before. Slowing
          further loss is itself a success.
        </li>
        <li>
          <strong>It only works while you use it.</strong> Gains are typically
          lost within a few months of stopping.
        </li>
        <li>
          <strong>Side effects:</strong> itching and flaking (the solution
          contains propylene glycol; the foam usually does not), unwanted hair
          on the face or forehead, and rarely dizziness or a racing heart.
        </li>
      </ul>

      <Callout variant="warning" title="Minoxidil cautions">
        Do not use during pregnancy or breastfeeding. Stop and seek advice if
        you get chest pain, a fast heartbeat, faintness, or swelling of the
        hands or feet. Topical minoxidil is highly toxic to cats: keep it away
        from pets, let it dry before contact, and wash your hands after
        applying.
      </Callout>

      <p>
        <strong>Low-dose oral minoxidil</strong>, a small daily tablet, has
        become a popular off-label prescription for people who cannot manage
        topical treatment. A review of 17 studies found it effective and
        generally well tolerated, and a randomised trial in 90 men found 5 mg
        daily was not superior to 5% topical minoxidil twice a day over 24
        weeks.{" "}
        <EvidenceBadge level="moderate" studies={[
          {
            authors: "Randolph and Tosti", year: 2021, journal: "Journal of the American Academy of Dermatology",
            title: "Oral minoxidil treatment for hair loss: A review of efficacy and safety",
            url: "https://pubmed.ncbi.nlm.nih.gov/32622136/",
            summary: "17 studies, 634 patients: low-dose oral minoxidil appeared effective and well tolerated in healthy patients who struggle with topical formulations.",
          },
          {
            authors: "Penha et al.", year: 2024, journal: "JAMA Dermatology",
            title: "Oral Minoxidil vs Topical Minoxidil for Male Androgenetic Alopecia: A Randomized Clinical Trial",
            url: "https://pubmed.ncbi.nlm.nih.gov/38598226/",
            summary: "90 men (68 completed), 24 weeks: oral minoxidil 5 mg daily was not superior to 5% topical twice daily; hypertrichosis was the most common side effect.",
          },
        ]} />{" "}
        Because it acts on blood vessels throughout the body, it can cause
        body-hair growth, fluid retention, a faster heart rate and dizziness,
        and it is not suitable for people with some heart conditions. It needs
        a prescriber, not an online shortcut.
      </p>

      <h3>Finasteride (prescription, men)</h3>
      <p>
        Finasteride blocks the enzyme that converts testosterone into DHT. In
        two one-year trials of 1,553 men aged 18&ndash;41, 1 mg daily increased
        hair counts in a one-inch circle of the crown by 107 hairs at one year
        and 138 at two years relative to placebo, while the placebo group kept
        losing hair.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Kaufman et al.", year: 1998, journal: "Journal of the American Academy of Dermatology",
          title: "Finasteride in the treatment of men with androgenetic alopecia. Finasteride Male Pattern Hair Loss Study Group",
          url: "https://pubmed.ncbi.nlm.nih.gov/9777765/",
          summary: "1,553 men, 1–2 years: finasteride 1 mg increased crown hair counts by 107 (1 yr) and 138 (2 yr) vs placebo; placebo group had progressive loss. Manufacturer-sponsored.",
        }]} />{" "}
        The trials were run by the manufacturer, but independent meta-analyses
        agree that finasteride and minoxidil both work.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Adil and Godwin", year: 2017, journal: "Journal of the American Academy of Dermatology",
          title: "The effectiveness of treatments for androgenetic alopecia: A systematic review and meta-analysis",
          url: "https://pubmed.ncbi.nlm.nih.gov/28396101/",
          summary: "Meta-analysis of RCTs: low-level laser therapy (men), 5% and 2% minoxidil (men), 1 mg finasteride (men) and 2% minoxidil (women) all superior to placebo; high heterogeneity.",
        }]} />{" "}
        Combining finasteride with minoxidil is common, because they work in
        different ways.
      </p>

      <h3>Finasteride&rsquo;s safety profile</h3>
      <p>
        In the original trials, sexual side effects &mdash; lower libido,
        erectile difficulty, reduced ejaculate &mdash; were reported by a few
        percent of men on finasteride, only slightly more than on placebo, and
        usually resolved on stopping. The harder questions have come since:
      </p>
      <ul>
        <li>
          <strong>Mood and suicidal thoughts.</strong> An analysis of the World
          Health Organization&rsquo;s global adverse-event database found a
          disproportionate number of reports of suicidality and psychological
          side effects in men under 45 using finasteride for hair loss, though
          reporting may have been boosted by publicity.{" "}
          <EvidenceBadge level="emerging" studies={[{
            authors: "Nguyen et al.", year: 2021, journal: "JAMA Dermatology",
            title: "Investigation of Suicidality and Psychological Adverse Events in Patients Treated With Finasteride",
            url: "https://pubmed.ncbi.nlm.nih.gov/33175100/",
            summary: "WHO VigiBase pharmacovigilance study: significant reporting signals for suicidality (ROR 1.63) and psychological adverse events (ROR 4.33), strongest in men under 45 treated for alopecia.",
          }]} />{" "}
          In 2025 the European Medicines Agency confirmed suicidal ideation as a
          possible side effect of finasteride tablets, of unknown frequency,
          and added a patient card to 1 mg packs, while concluding that the
          benefits still outweigh the risks.
        </li>
        <li>
          <strong>Persistent symptoms.</strong> Some men report sexual,
          cognitive or mood symptoms that continue after stopping, sometimes
          called post-finasteride syndrome. How often this happens, and why,
          is not established.
        </li>
        <li>
          <strong>PSA.</strong> Finasteride roughly halves PSA, the prostate
          blood test. Tell any doctor checking your PSA that you take it.
        </li>
      </ul>

      <Callout variant="warning" title="Before starting finasteride">
        Discuss your mental health history with your prescriber. Stop and seek
        help promptly if you notice low mood, anxiety, or thoughts of
        self-harm. Finasteride can cause abnormalities in a male fetus: women
        who are or may become pregnant should not take it or handle crushed or
        broken tablets. It is not approved for women; some women are prescribed
        other off-label anti-androgen treatments by specialists.
      </Callout>

      <p>
        <strong>Topical finasteride</strong> aims to keep the drug in the scalp.
        In a 24-week European trial of 458 men, a finasteride spray increased
        hair counts more than placebo, by a similar amount to oral finasteride,
        with blood levels more than 100 times lower.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Piraccini et al.", year: 2022, journal: "Journal of the European Academy of Dermatology and Venereology",
          title: "Efficacy and safety of topical finasteride spray solution for male androgenetic alopecia: a phase III, randomized, controlled clinical trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/34634163/",
          summary: "458 men, 24 weeks: topical finasteride beat placebo (+20.2 vs +6.7 hairs), similar to oral finasteride, with >100-fold lower plasma levels. Many authors were employed by the developer.",
        }]} />{" "}
        In the US there is no approved topical finasteride; products sold
        through telehealth are compounded, and in 2025 the FDA warned about
        adverse-event reports with them, including sexual dysfunction,
        depression and suicidal thoughts. Lower blood levels are not the same as
        no risk.
      </p>

      <h3>Low-level laser and light devices</h3>
      <p>
        Laser combs, caps and helmets shine red light on the scalp. In four
        sham-controlled trials partly funded by the device maker (which also
        supplied the devices), men and women using a laser comb three times a
        week for 26 weeks gained about 18&ndash;26 hairs per square centimetre,
        against 2&ndash;9 with the sham.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Jimenez et al.", year: 2014, journal: "American Journal of Clinical Dermatology",
          title: "Efficacy and safety of a low-level laser device in the treatment of male and female pattern hair loss: a multicenter, randomized, sham device-controlled, double-blind study",
          url: "https://pubmed.ncbi.nlm.nih.gov/24474647/",
          summary: "269 men and women, 26 weeks: laser-comb users gained ~18–26 terminal hairs/cm² vs ~2–9 with sham; no serious adverse events. Partly funded by the device maker.",
        }]} />{" "}
        The meta-analysis above also found laser therapy beat placebo in men.
        Caveats: many trials are industry-funded, devices vary widely in power
        and wavelength, FDA &ldquo;clearance&rdquo; is a lower bar than drug
        approval, and long-term data are thin. It is a reasonable add-on or an
        option for people who cannot use drugs. Our{" "}
        <a href="/guides/red-light-therapy-evidence">
          red light therapy guide
        </a>{" "}
        covers the wider evidence.
      </p>

      <h3>Other options</h3>
      <p>
        Platelet-rich plasma injections have mixed evidence and no standard
        protocol. Microneedling may help minoxidil work better in small trials.
        Hair transplantation works well for stable pattern loss when there is
        enough donor hair, though medication is usually still needed to protect
        the remaining hair.
      </p>

      <h2>What doesn&rsquo;t work (or isn&rsquo;t proven)</h2>

      <h3>Biotin</h3>
      <p>
        Biotin is the default ingredient in hair gummies. A systematic review
        found only 18 reported cases where biotin helped hair or nails, and
        every one of them had an underlying condition, such as a genuine
        deficiency or a rare hair disorder. There is no good evidence it helps
        people who are not deficient, and true deficiency is rare.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Patel et al.", year: 2017, journal: "Skin Appendage Disorders",
          title: "A Review of the Use of Biotin for Hair Loss",
          url: "https://pubmed.ncbi.nlm.nih.gov/28879195/",
          summary: "18 reported cases of biotin improving hair or nails, all with an underlying pathology; insufficient evidence for supplementation in healthy people.",
        }]} />
      </p>
      <p>
        Biotin can also cause harm indirectly. Many laboratory blood tests use
        biotin as part of their chemistry, and high-dose supplements interfere.
        When six healthy adults took 10 mg a day for a week, 9 of 23 such tests
        gave wrong results, some falsely high and some falsely low &mdash;
        including thyroid tests.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Li et al.", year: 2017, journal: "JAMA",
          title: "Association of Biotin Ingestion With Performance of Hormone and Nonhormone Assays in Healthy Adults",
          url: "https://pubmed.ncbi.nlm.nih.gov/28973622/",
          summary: "6 adults taking 10 mg/day biotin for 7 days: interference in 9 of 23 biotin-based immunoassays (falsely high or low), including thyroid hormone tests.",
        }]} />{" "}
        The FDA has warned that biotin can cause falsely low troponin results
        &mdash; the blood test used to diagnose heart attacks &mdash; and has
        received a report of a patient on high-dose biotin who died after such
        a result.
      </p>

      <Callout variant="warning" title="Taking biotin? Tell whoever orders your blood tests">
        Hair supplements often contain 5&ndash;10 mg of biotin, hundreds of times
        the daily requirement. Tell your doctor and the lab before any blood
        test, especially thyroid, hormone or cardiac tests, and ask how long to
        stop beforehand. In an emergency, mention it.
      </Callout>

      <h3>Other supplements</h3>
      <p>
        Unless you are deficient, hair vitamins are unlikely to help. Iron
        deficiency is worth checking in anyone with shedding, particularly
        women with heavy periods (see our{" "}
        <a href="/guides/iron-guide">iron guide</a>), but taking iron
        you do not need does not grow hair. Too much vitamin A or selenium can
        cause hair loss. If you have heard that creatine causes baldness, see
        our{" "}
        <a href="/guides/creatine-and-hair-loss">
          creatine and hair loss guide
        </a>
        .
      </p>

      <h3>&ldquo;Growth&rdquo; and &ldquo;anti-hair-loss&rdquo; shampoos</h3>
      <p>
        A shampoo sits on the scalp for a minute or two before being rinsed
        away, which is a poor way to deliver an active ingredient to the hair
        follicle. Caffeine, biotin, peptide and &ldquo;thickening&rdquo;
        shampoos may make hair look fuller for a day by coating the shaft, but
        that is cosmetic. Rosemary oil gets attention because of one trial in
        100 people that found similar hair counts to 2% minoxidil after six
        months; with no placebo group and the weaker minoxidil strength as the
        comparator, it cannot show rosemary works.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Panahi et al.", year: 2015, journal: "Skinmed",
          title: "Rosemary oil vs minoxidil 2% for the treatment of androgenetic alopecia: a randomized comparative trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/25842469/",
          summary: "100 people, 6 months: rosemary oil and 2% minoxidil both increased hair count at 6 months with no difference between them. No placebo group.",
        }]} />{" "}
        Ketoconazole shampoo has a small, old study suggesting some benefit in
        pattern loss; it is a reasonable companion to proven treatment but not a
        replacement.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Piérard-Franchimont et al.", year: 1998, journal: "Dermatology",
          title: "Ketoconazole shampoo: effect of long-term use in androgenic alopecia",
          url: "https://pubmed.ncbi.nlm.nih.gov/9669136/",
          summary: "Small comparative study: 2% ketoconazole shampoo improved hair density and anagen proportion similarly to minoxidil; authors called for larger controlled trials.",
        }]} />
      </p>

      <h2>Shampoos that do have evidence: dandruff</h2>
      <p>
        Dandruff and seborrhoeic dermatitis &mdash; flaking, itching and
        redness driven partly by <em>Malassezia</em> yeast &mdash; do respond to
        medicated shampoos. In a 246-person randomised trial, both 2%
        ketoconazole and 2.5% selenium sulfide shampoos clearly beat placebo for
        flaking and itching; ketoconazole was better tolerated.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Danby et al.", year: 1993, journal: "Journal of the American Academy of Dermatology",
          title: "A randomized, double-blind, placebo-controlled trial of ketoconazole 2% shampoo versus selenium sulfide 2.5% shampoo in the treatment of moderate to severe dandruff",
          url: "https://pubmed.ncbi.nlm.nih.gov/8245236/",
          summary: "246 patients: ketoconazole 2% and selenium sulfide 2.5% both significantly better than placebo for dandruff, itching and irritation; all adverse events were in the selenium group.",
        }]} />{" "}
        Zinc pyrithione, coal tar and salicylic acid shampoos are other options.
        Leave the lather on for three to five minutes and use two or three times
        a week, then less often to keep it under control. Look for the active
        ingredient and its percentage on the label, not the marketing.
      </p>

      <h2>When to see a dermatologist</h2>
      <Callout variant="warning" title="Get it assessed if">
        Hair loss is sudden, patchy, or in round bald spots; the scalp is
        painful, burning, itchy, red, scaly or has pus; patches look smooth and
        shiny (a sign of scarring); you are losing eyebrows, eyelashes or body
        hair; a child is losing hair; shedding lasts longer than about six
        months; or hair loss comes with other symptoms such as fatigue, weight
        change, irregular periods, new acne or excess facial or body hair.
        These can point to autoimmune, hormonal, thyroid, infectious or
        scarring causes that need specific treatment. Scarring hair loss in
        particular should be seen quickly.
      </Callout>

      <h2>Frequently Asked Questions</h2>

      <h3>Does minoxidil work for women?</h3>
      <p>
        Yes. Both 2% and 5% beat placebo in a 381-woman trial. The 5% foam once
        daily is a common starting point; unwanted facial hair is more likely at
        the higher strength and usually settles after stopping.
      </p>

      <h3>What happens if I stop minoxidil or finasteride?</h3>
      <p>
        The hair gained or kept because of the treatment is typically lost over
        the following months, returning you to where the underlying pattern
        would have taken you. These are ongoing treatments, not cures.
      </p>

      <h3>Is finasteride safe?</h3>
      <p>
        Most men take it without problems, and it has decades of use. But
        sexual side effects occur in a small minority, mood changes and
        suicidal thoughts are now a recognised possible side effect in Europe,
        and some men report symptoms that persist after stopping. Discuss your
        history with a prescriber and weigh it honestly.
      </p>

      <h3>Do laser caps work?</h3>
      <p>
        Trials, mostly funded by manufacturers, show more hair growth than sham
        devices. The effect is probably smaller and less certain than
        minoxidil or finasteride, but the devices have few side effects.
      </p>

      <h3>Will a biotin supplement stop my hair falling out?</h3>
      <p>
        Only if you are genuinely deficient, which is rare. For most people it
        does nothing for hair and can distort important blood tests.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Start with a diagnosis. For pattern hair loss, topical minoxidil is the
        evidence-based first step for men and women, finasteride is the
        stronger prescription option for men with side effects worth
        understanding, and laser devices are a modest, industry-studied add-on.
        Skip biotin and &ldquo;growth&rdquo; shampoos; use medicated shampoos
        for dandruff, which is what they are proven for. Whatever you choose,
        give it six to twelve months and expect to continue it. See the{" "}
        <a href="https://app.formulate-health.app/learning/track/personal-care?utm_source=landing&utm_medium=guide_body&utm_campaign=hair-loss-what-actually-works">personal care learning track</a>{" "}
        for more.
      </p>
      <p>
        <a href="https://app.formulate-health.app/skin">
          Compare hair treatments and shampoos on the Formulate personal care shelf &rarr;
        </a>
      </p>
    </>
  );
}
