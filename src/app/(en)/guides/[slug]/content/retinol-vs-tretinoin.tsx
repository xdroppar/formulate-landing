import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function RetinolVsTretinoin() {
  return (
    <>
      <TLDRBox
        readTime="10 min read"
        takeaways={[
          "All retinoids act through retinoic acid, which switches on genes that speed skin renewal and collagen production; retinol has to be converted first, so it is gentler and weaker",
          "Tretinoin (prescription) has the strongest evidence for sun-aged skin, and 0.025% worked as well as 0.1% over 48 weeks with less irritation",
          "Retinol works too: 0.4% improved fine wrinkles over 24 weeks in a controlled trial — but more slowly and modestly",
          "For acne, adapalene 0.1% (sold without prescription in the US) is the evidence-based over-the-counter retinoid",
          "Start two or three nights a week, wear sunscreen every day, and do not use retinoids while pregnant or trying to conceive",
        ]}
      />

      <p>
        Retinoids are the rare skincare ingredient that dermatologists and the
        beauty industry agree on. They are also the source of more confusion
        than almost anything else on the shelf: retinol, retinal, retinyl
        palmitate, tretinoin, adapalene, &ldquo;retinol alternatives&rdquo;, and
        percentages that do not mean the same thing from one ingredient to the
        next.
      </p>
      <p>
        The short version: they all aim to do the same job, they differ mainly
        in strength and in how much evidence stands behind them, and the
        strongest ones need the most careful introduction. This guide explains
        how retinoids work, how good the evidence is for each, how to start
        without wrecking your skin barrier, and the pregnancy warning that
        applies to all of them.
      </p>

      <h2>How retinoids work</h2>
      <p>
        Retinoids are compounds related to vitamin A. The active form in skin
        is <strong>retinoic acid</strong> (the drug name is tretinoin). It
        enters skin cells and binds to retinoic acid receptors in the nucleus,
        which change which genes are switched on. The visible results:
      </p>
      <ul>
        <li>
          <strong>Faster turnover</strong> of the outer skin cells, so the
          surface becomes smoother and pores are less likely to clog &mdash;
          the main reason retinoids treat acne.
        </li>
        <li>
          <strong>More collagen</strong> in the dermis and less activity of the
          enzymes that break collagen down after sun exposure &mdash; the main
          reason they soften fine lines.
        </li>
        <li>
          <strong>More even pigmentation</strong> over months.
        </li>
      </ul>
      <p>
        Cosmetic retinoids are <em>precursors</em> that skin enzymes convert,
        step by step, into retinoic acid:
      </p>
      <p>
        <strong>
          retinyl esters (e.g. retinyl palmitate) &rarr; retinol &rarr;
          retinaldehyde (retinal) &rarr; retinoic acid
        </strong>
      </p>
      <p>
        Each step converts only part of what is applied, so each form further
        back is weaker, slower and gentler than the one after it. Adapalene and
        tazarotene are different again: synthetic molecules designed to act on
        the receptors directly, with no conversion needed.
      </p>

      <table>
        <thead>
          <tr>
            <th>Retinoid</th>
            <th>How you get it</th>
            <th>Typical strengths</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tretinoin (retinoic acid)</td>
            <td>Prescription in the US, UK and most countries</td>
            <td>0.025%, 0.05%, 0.1%</td>
            <td>Strongest for photoageing and acne; decades of trials</td>
          </tr>
          <tr>
            <td>Adapalene</td>
            <td>0.1% over the counter in the US; prescription in many countries</td>
            <td>0.1%, 0.3%</td>
            <td>Strong for acne; less studied for ageing</td>
          </tr>
          <tr>
            <td>Tazarotene</td>
            <td>Prescription</td>
            <td>0.045%&ndash;0.1%</td>
            <td>Strong for acne and psoriasis; potent and irritating</td>
          </tr>
          <tr>
            <td>Retinaldehyde (retinal)</td>
            <td>Cosmetic</td>
            <td>0.05%&ndash;0.1%</td>
            <td>Small studies; one step from retinoic acid</td>
          </tr>
          <tr>
            <td>Retinol</td>
            <td>Cosmetic</td>
            <td>0.1%&ndash;1%</td>
            <td>Moderate for fine wrinkles; slower than tretinoin</td>
          </tr>
          <tr>
            <td>Retinyl esters</td>
            <td>Cosmetic</td>
            <td>Often unstated</td>
            <td>Weak; three conversion steps away</td>
          </tr>
        </tbody>
      </table>

      <h2>The evidence, tier by tier</h2>

      <h3>Tretinoin: the benchmark</h3>
      <p>
        Tretinoin has been used for acne since the early 1970s. Its role in
        ageing skin was established in a 1988 double-blind trial: 30 people
        applied tretinoin to one forearm and an inactive cream to the other,
        and half also used tretinoin on the face. Every tretinoin-treated
        forearm improved, and 14 of 15 tretinoin-treated faces improved, while
        none of the placebo-treated faces did. The only side effect was
        irritation.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Weiss et al.", year: 1988, journal: "JAMA",
          title: "Topical tretinoin improves photoaged skin. A double-blind vehicle-controlled study",
          url: "https://pubmed.ncbi.nlm.nih.gov/3336176/",
          summary: "16-week double-blind trial: photoaging improved on all tretinoin-treated forearms and 14 of 15 tretinoin-treated faces vs none on vehicle. Irritation was the only side effect.",
        }]} />
      </p>
      <p>
        The most useful follow-up for anyone choosing a strength came in 1995.
        Ninety-nine people with sun-damaged skin used 0.1% tretinoin, 0.025%
        tretinoin or a placebo cream daily for 48 weeks. Both strengths
        improved photoageing equally and thickened the epidermis similarly, but
        the 0.1% cream caused significantly more redness and peeling.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Griffiths et al.", year: 1995, journal: "Archives of Dermatology",
          title: "Two concentrations of topical tretinoin (retinoic acid) cause similar improvement of photoaging but different degrees of irritation. A double-blind, vehicle-controlled comparison of 0.1% and 0.025% tretinoin creams",
          url: "https://pubmed.ncbi.nlm.nih.gov/7544967/",
          summary: "99 patients, 48 weeks: 0.1% and 0.025% tretinoin gave similar clinical and histological improvement; 0.1% caused significantly more irritation.",
        }]} />{" "}
        In other words, irritation is not the mechanism, and more is not
        better. Starting low is not a compromise.
      </p>

      <h3>Retinol: real, but slower and smaller</h3>
      <p>
        The best-known retinol trial was run by the same University of Michigan
        group that did much of the tretinoin work. Thirty-six elderly residents
        of care homes (average age 87) had 0.4% retinol lotion applied to one
        arm and an inactive lotion to the other, up to three times a week for
        24 weeks. Fine wrinkling improved on the retinol arm, and skin biopsies
        showed more collagen production and more water-holding molecules in
        the dermis.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Kafi et al.", year: 2007, journal: "Archives of Dermatology",
          title: "Improvement of naturally aged skin with vitamin A (retinol)",
          url: "https://pubmed.ncbi.nlm.nih.gov/17515510/",
          summary: "36 elderly adults, 24 weeks, 0.4% retinol vs vehicle on opposite arms: fine wrinkling improved and procollagen and glycosaminoglycans increased with retinol.",
        }]} />
      </p>
      <p>
        That was forearm skin in very old people, not faces in 40-year-olds.
        A direct comparison funded and largely run by a cosmetics company found
        that retinol produced the same kinds of changes as retinoic acid over
        four weeks &mdash; thicker epidermis, more collagen gene activity
        &mdash; but smaller in size, plus fewer facial wrinkles after 12 weeks
        of retinol use.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Kong et al.", year: 2016, journal: "Journal of Cosmetic Dermatology",
          title: "A comparative study of the effects of retinol and retinoic acid on histological, molecular, and clinical properties of human skin",
          url: "https://pubmed.ncbi.nlm.nih.gov/26578346/",
          summary: "Retinol produced similar but smaller changes than retinoic acid in epidermal thickness and collagen expression; facial wrinkles fell after 12 weeks of retinol. Most authors worked for a cosmetics manufacturer.",
        }]} />{" "}
        Together, the evidence supports retinol as a genuine, milder
        alternative to tretinoin &mdash; with results measured in months, not
        weeks.
      </p>

      <h3>Retinal and retinyl esters</h3>
      <p>
        Retinaldehyde is one conversion step from retinoic acid and is often
        marketed as &ldquo;faster than retinol&rdquo;. That is plausible, but
        the published trials are small. Retinyl palmitate and other esters are
        three steps away, and there is little good evidence that they do much
        for wrinkles at the concentrations used in moisturisers and daytime
        creams. Treat them as a label feature, not an active treatment.
      </p>

      <h3>Adapalene: the over-the-counter acne option</h3>
      <p>
        For acne, the American Academy of Dermatology&rsquo;s 2024 guideline
        makes a strong recommendation for topical retinoids, alongside benzoyl
        peroxide.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Reynolds et al.", year: 2024, journal: "Journal of the American Academy of Dermatology",
          title: "Guidelines of care for the management of acne vulgaris",
          url: "https://pubmed.ncbi.nlm.nih.gov/38300170/",
          summary: "AAD guideline (GRADE): strong recommendations for benzoyl peroxide, topical retinoids, topical antibiotics and oral doxycycline; combination therapy encouraged.",
        }]} />{" "}
        Adapalene is the retinoid most people can reach first: 0.1% gel has been
        sold without a prescription in the US since 2016. In a 653-person trial
        comparing 0.3%, 0.1% and an inactive gel over 12 weeks, both strengths
        beat the inactive gel and the higher strength did best, with side
        effects that were mostly mild and short-lived.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Thiboutot et al.", year: 2006, journal: "Journal of the American Academy of Dermatology",
          title: "Adapalene gel 0.3% for the treatment of acne vulgaris: a multicenter, randomized, double-blind, controlled, phase III trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/16443054/",
          summary: "653 patients, 12 weeks: adapalene 0.3% beat 0.1% and vehicle on success rate and lesion counts, with a dose-dependent effect; side effects mostly mild and transient.",
        }]} />{" "}
        Adapalene is chemically stable alongside benzoyl peroxide, which is why
        the two are often combined. Its evidence for wrinkles is thinner than
        tretinoin&rsquo;s.
      </p>

      <h3>Bakuchiol: promising, small</h3>
      <p>
        Bakuchiol is a plant compound, not a retinoid, that switches on some of
        the same genes in laboratory work. In the one head-to-head trial, 44
        people used 0.5% bakuchiol twice daily or 0.5% retinol once daily for 12
        weeks. Both reduced wrinkle area and pigmentation by a similar amount,
        and the retinol group reported more scaling and stinging.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Dhaliwal et al.", year: 2019, journal: "British Journal of Dermatology",
          title: "Prospective, randomized, double-blind assessment of topical bakuchiol and retinol for facial photoageing",
          url: "https://pubmed.ncbi.nlm.nih.gov/29947134/",
          summary: "44 patients, 12 weeks: 0.5% bakuchiol twice daily and 0.5% retinol daily both reduced wrinkle area and hyperpigmentation with no significant difference; retinol caused more scaling and stinging.",
        }]} />{" "}
        That is encouraging, but it is one small trial, and a trial that
        finds &ldquo;no difference&rdquo; with 44 people cannot show two
        treatments are equivalent. Bakuchiol is a reasonable choice if you
        cannot tolerate any retinoid. It has not been studied in pregnancy, so
        &ldquo;pregnancy-safe retinol alternative&rdquo; is a marketing claim,
        not a finding.
      </p>

      <h2>Strengths: which to start with</h2>
      <ul>
        <li>
          <strong>First retinoid, anti-ageing, normal or dry skin:</strong>{" "}
          retinol around 0.25&ndash;0.5%, or, if you are seeing a clinician,
          tretinoin 0.025%.
        </li>
        <li>
          <strong>Sensitive skin:</strong> the lowest retinol you can find,
          two nights a week, applied over moisturiser.
        </li>
        <li>
          <strong>Acne:</strong> adapalene 0.1% gel every night or every other
          night, usually with a benzoyl peroxide wash or gel in the morning.
          If acne is scarring, painful or not improving after about three
          months, see a clinician.
        </li>
        <li>
          <strong>Already tolerating retinol well for months:</strong> a
          higher retinol, retinaldehyde, or a prescription retinoid is the next
          step.
        </li>
      </ul>
      <p>
        Retinol percentages are not comparable to tretinoin percentages. 1%
        retinol is not ten times stronger than 0.1% tretinoin; it is weaker.
      </p>

      <h2>Irritation, and how to start</h2>
      <p>
        Most people get some &ldquo;retinoid dermatitis&rdquo; in the first two
        to six weeks: dryness, flaking, redness, stinging, especially around the
        mouth and nose. It usually settles as skin adapts. The way to keep it
        manageable:
      </p>
      <ol>
        <li>
          <strong>Use a pea-sized amount for the whole face.</strong> More does
          not work better; it just irritates more.
        </li>
        <li>
          <strong>Start two or three nights a week,</strong> and add a night
          every week or two as your skin allows.
        </li>
        <li>
          <strong>Apply to dry skin at night,</strong> avoiding the corners of
          the eyes, nostrils and lips.
        </li>
        <li>
          <strong>Moisturise.</strong> Applying moisturiser before or after
          (&ldquo;buffering&rdquo;) reduces irritation; it may slightly slow
          results, which is usually a good trade.
        </li>
        <li>
          <strong>Pause other exfoliants</strong> (glycolic, salicylic, scrubs)
          for the first month, and do not combine several retinoid products.
        </li>
        <li>
          <strong>Keep tretinoin and benzoyl peroxide apart:</strong> benzoyl
          peroxide can break down tretinoin, so use them at different times of
          day (adapalene does not have this problem).
        </li>
        <li>
          <strong>Stop a few days before waxing, peels or laser,</strong> which
          can tear or burn retinoid-treated skin.
        </li>
      </ol>
      <p>
        Acne may flare briefly in the first weeks (&ldquo;purging&rdquo;) as
        blocked pores come to the surface. Expect acne results at 8&ndash;12
        weeks and wrinkle or pigment changes over three to six months.
        Retinoids need to be continued to keep their effect.
      </p>

      <h2>Sun sensitivity</h2>
      <p>
        Tretinoin is broken down by sunlight, which is one reason retinoids are
        applied at night. Retinoid-treated skin also tends to burn more easily,
        and prescription labels advise minimising sun exposure. That makes
        daily broad-spectrum sunscreen part of any retinoid routine, not an
        optional extra &mdash; and sunscreen is itself one of the
        best-evidenced ways to prevent visible ageing (see our{" "}
        <a href="/guides/sunscreen-guide">sunscreen guide</a>). Take
        extra care if you also take other photosensitising medicines such as
        doxycycline.
      </p>

      <h2>Safety</h2>

      <Callout variant="warning" title="Pregnancy and trying to conceive">
        Oral retinoids such as isotretinoin and acitretin cause severe birth
        defects and require strict contraception. Topical retinoids are
        absorbed far less, and a meta-analysis of 654 exposed pregnancies found
        no significant increase in major birth defects or miscarriage &mdash;
        but it was too small to prove safety, and tazarotene is specifically
        contraindicated in pregnancy. The standard advice is to stop all
        retinoids, including cosmetic retinol, while pregnant or trying to
        conceive, and to check with your clinician about breastfeeding. If you
        used one before you knew you were pregnant, do not panic; tell your
        midwife or doctor.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Kaplan et al.", year: 2015, journal: "British Journal of Dermatology",
          title: "Pregnancy outcomes following first-trimester exposure to topical retinoids: a systematic review and meta-analysis",
          url: "https://pubmed.ncbi.nlm.nih.gov/26215715/",
          summary: "654 exposed vs 1,375 unexposed pregnancies: no significant increase in major malformations (OR 1.22) or miscarriage; reassuring after accidental exposure but not powered to justify use in pregnancy.",
        }]} />
      </Callout>

      <Callout variant="warning" title="Use caution or ask a clinician first if">
        You have rosacea, eczema or very reactive skin; you are taking oral
        isotretinoin; you have a rash, broken skin or sunburn on the area; or
        you are treating a child. See a dermatologist for acne that scars,
        painful cystic spots, or acne that has not improved after three months
        of consistent treatment.
      </Callout>

      <h2>What&rsquo;s marketing</h2>
      <ul>
        <li>
          <strong>Percentage races.</strong> A higher retinol percentage mostly
          means more irritation. The tretinoin data show the lowest effective
          strength works as well as a high one.
        </li>
        <li>
          <strong>&ldquo;Encapsulated&rdquo; or &ldquo;time-release&rdquo;
          retinol.</strong> May reduce irritation, but independent comparisons
          are scarce.
        </li>
        <li>
          <strong>Retinyl palmitate in day creams.</strong> Too weak and too
          far down the conversion chain to count as a retinoid treatment.
        </li>
        <li>
          <strong>&ldquo;Natural retinol&rdquo;.</strong> Plant extracts
          marketed this way (including bakuchiol) are not retinoids. Some may
          help; the evidence is small.
        </li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>Is retinol as good as tretinoin?</h3>
      <p>
        No, but it works. Retinol produces the same kinds of changes more
        slowly and to a smaller degree, and it is gentler. Many people do well
        on retinol; tretinoin is the step up if you want the strongest
        evidence and can see a prescriber.
      </p>

      <h3>Can I use retinol with vitamin C?</h3>
      <p>
        Yes. The simplest routine is vitamin C in the morning under sunscreen
        and the retinoid at night, which avoids piling several potentially
        irritating products on at once.
      </p>

      <h3>Can I use a retinoid around my eyes?</h3>
      <p>
        Carefully. The skin is thin and irritates easily. Use a tiny amount on
        the bony area under the eye, stay away from the lash line, or choose a
        lower-strength product made for that area.
      </p>

      <h3>How long until I see results?</h3>
      <p>
        For acne, 8&ndash;12 weeks. For fine lines and uneven tone, three to six
        months, with continued improvement over a year in the tretinoin trials.
        If you stop, the benefits gradually fade.
      </p>

      <h3>Is bakuchiol a safe alternative in pregnancy?</h3>
      <p>
        We don&rsquo;t know. Bakuchiol has not been studied in pregnancy, so
        calling it &ldquo;pregnancy-safe&rdquo; goes beyond the evidence. Ask
        your clinician; ingredients such as azelaic acid have a longer safety
        record in pregnancy.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Retinoids earn their reputation. Tretinoin has the strongest evidence
        for sun-aged skin, retinol is a real but gentler option, and adapalene
        0.1% is the evidence-based over-the-counter choice for acne in the US.
        Choose the lowest strength that works, introduce it slowly, pair it with
        daily sunscreen, and stop during pregnancy. For how collagen fits into
        skin ageing more broadly, see our{" "}
        <a href="/guides/collagen-guide">collagen guide</a>, and the{" "}
        <a href="https://app.formulate-health.app/learning/track/personal-care?utm_source=landing&utm_medium=guide_body&utm_campaign=retinol-vs-tretinoin">personal care learning track</a>.
      </p>
      <p>
        <a href="https://app.formulate-health.app/skin">
          Compare retinol serums and treatments on the Formulate personal care shelf &rarr;
        </a>
      </p>
    </>
  );
}
