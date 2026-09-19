import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function FlossingAndOralHealth() {
  return (
    <>
      <TLDRBox
        readTime="10 min read"
        takeaways={[
          "Fluoride toothpaste is the best-proven thing you do for your teeth: brush twice a day with at least 1,350 ppm fluoride, then spit and don’t rinse",
          "Cleaning between teeth probably reduces gum inflammation, but the evidence is low certainty and short-term; interdental brushes may beat floss where they fit",
          "Powered toothbrushes remove somewhat more plaque and reduce gum inflammation more than manual brushing",
          "Antiseptic mouthwash is not a substitute for brushing, stains teeth (chlorhexidine), and in small studies nudged blood pressure up by wiping out nitrate-reducing mouth bacteria",
          "Treating gum disease lowers blood sugar in people with diabetes; the link with heart disease is an association, not proven cause and effect",
        ]}
      />

      <p>
        Oral hygiene advice is a stack of habits handed down with equal
        confidence: brush, floss, rinse, see the dentist. The evidence behind
        them is not equal. One of them has some of the strongest prevention
        data in dentistry. Another made headlines when people noticed how
        thin its trial record was. A third has a side effect most people have
        never heard of.
      </p>
      <p>
        This guide sorts them out: fluoride and how to use it, what the research
        really says about flossing and interdental brushes, electric versus
        manual toothbrushes, mouthwash (including the blood-pressure finding),
        how gum health connects to diabetes and heart disease, and when to see
        a dentist.
      </p>

      <h2>Fluoride: the foundation</h2>
      <p>
        Tooth decay happens when mouth bacteria turn sugars into acid that
        dissolves enamel. Fluoride makes enamel more resistant to acid and helps
        repair early damage. A Cochrane review of 74 trials involving more than
        42,000 children found that fluoride toothpaste reduced new decay by
        about a quarter compared with non-fluoride toothpaste, with bigger
        effects at higher concentrations, with more frequent brushing, and with
        supervised brushing.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Marinho et al.", year: 2003, journal: "Cochrane Database of Systematic Reviews",
          title: "Fluoride toothpastes for preventing dental caries in children and adolescents",
          url: "https://pubmed.ncbi.nlm.nih.gov/12535435/",
          summary: "74 trials, ~42,300 children: fluoride toothpaste prevented ~24% of new decayed, missing and filled surfaces vs non-fluoride toothpaste; greater effect with higher concentration, more frequent and supervised brushing.",
        }]} />
      </p>
      <p>
        A later Cochrane review confirmed that toothpaste of 1,000 ppm fluoride
        or more prevents decay in children and adults, and that 1,450&ndash;1,500
        ppm does slightly better than 1,000&ndash;1,250 ppm.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Walsh et al.", year: 2019, journal: "Cochrane Database of Systematic Reviews",
          title: "Fluoride toothpastes of different concentrations for preventing dental caries",
          url: "https://pubmed.ncbi.nlm.nih.gov/30829399/",
          summary: "96 studies: 1,000–1,250 and 1,450–1,500 ppm toothpastes reduce decay vs non-fluoride (high/moderate certainty); 1,450–1,500 slightly better than 1,000–1,250; young children's concentration should be balanced against fluorosis risk.",
        }]} />
      </p>

      <h3>How much fluoride, and how</h3>
      <p>The NHS guidance is a practical summary of this evidence:</p>
      <ul>
        <li>
          <strong>Adults and children 7+:</strong> toothpaste with at least
          1,350 ppm fluoride (1,350&ndash;1,500 ppm).
        </li>
        <li>
          <strong>Children 3&ndash;6:</strong> a pea-sized amount of toothpaste
          with 1,000&ndash;1,500 ppm.
        </li>
        <li>
          <strong>Children under 3:</strong> a smear of toothpaste with no less
          than 1,000 ppm.
        </li>
        <li>
          <strong>Brush twice a day for about two minutes,</strong> last thing
          at night and on one other occasion.
        </li>
        <li>
          <strong>Spit, don&rsquo;t rinse.</strong> Rinsing with water
          straight after brushing washes away the concentrated fluoride left
          on the teeth.
        </li>
      </ul>
      <p>
        That last point has direct support. In a crossover study, fluoride in
        saliva and in the plaque between teeth &mdash; where decay often starts
        &mdash; was highest when people did not rinse after brushing. Rinsing
        with water after a high-fluoride paste cut saliva fluoride about
        2.4-fold, down to roughly the level of an ordinary paste used without
        rinsing.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Nordström and Birkhed", year: 2009, journal: "Caries Research",
          title: "Fluoride retention in proximal plaque and saliva using two NaF dentifrices containing 5,000 and 1,450 ppm F with and without water rinsing",
          url: "https://pubmed.ncbi.nlm.nih.gov/19204390/",
          summary: "26 volunteers, 4-way crossover: interdental saliva and plaque fluoride highest with 5,000 ppm and no rinse, lowest with 1,450 ppm and rinsing; rinsing after the 5,000 ppm paste cut saliva fluoride 2.4-fold.",
        }]} />{" "}
        Look for the fluoride content on the label (often given as sodium
        fluoride, sodium monofluorophosphate or stannous fluoride with a ppm or
        percentage). If you are prone to decay, dentists can prescribe
        higher-strength toothpastes (2,800 or 5,000 ppm).
      </p>
      <p>
        Young children should be supervised, use only the recommended amount,
        and spit rather than swallow, because swallowing too much fluoride while
        adult teeth are forming can cause fluorosis (white marks on the enamel).
        Fluoride-free toothpastes, including hydroxyapatite formulas, have far
        less trial evidence behind them than fluoride, and several of their
        trials were funded by manufacturers.
      </p>

      <h2>Flossing and interdental cleaning: the honest evidence</h2>
      <p>
        In 2016 news reports pointed out that flossing, recommended for decades,
        had surprisingly weak trial evidence. The most recent Cochrane review is
        the best summary of what is known. It pooled 35 trials with nearly 4,000
        adults comparing toothbrushing alone with toothbrushing plus floss,
        interdental brushes, wooden sticks, rubber picks or water irrigators.{" "}
        <EvidenceBadge level="mixed" studies={[{
          authors: "Worthington et al.", year: 2019, journal: "Cochrane Database of Systematic Reviews",
          title: "Home use of interdental cleaning devices, in addition to toothbrushing, for preventing and controlling periodontal diseases and dental caries",
          url: "https://pubmed.ncbi.nlm.nih.gov/30968949/",
          summary: "35 RCTs, 3,929 adults: floss or interdental brushes plus brushing may reduce gingivitis or plaque vs brushing alone; interdental brushes may beat floss. Low to very low certainty, mostly short-term; no trials measured decay between teeth.",
        }]} />
      </p>
      <ul>
        <li>
          <strong>Floss plus brushing</strong> may reduce gum inflammation
          (gingivitis) at one, three and six months compared with brushing
          alone. Effects on plaque were inconsistent.
        </li>
        <li>
          <strong>Interdental brushes</strong> may reduce gum inflammation more
          than floss.
        </li>
        <li>
          <strong>Water flossers and wooden or rubber sticks</strong> had
          limited and inconsistent evidence.
        </li>
        <li>
          <strong>No trial measured decay between the teeth,</strong> and most
          did not measure periodontitis (the destructive stage of gum disease).
          Most trials were short and in people with little gum disease to begin
          with, and the overall evidence was rated low to very low certainty.
        </li>
      </ul>
      <p>
        So the honest position is not &ldquo;flossing doesn&rsquo;t work&rdquo;.
        It is that cleaning between teeth probably reduces gum inflammation,
        the long-term benefits have not been tested well, and the device matters
        less than doing it properly. Short, clean trials of a daily habit over
        decades are hard to run, and absence of good long-term trials is not
        evidence of no benefit.
      </p>

      <h3>Choosing between floss, brushes and water flossers</h3>
      <ul>
        <li>
          <strong>Interdental brushes</strong> are the first choice where the
          gaps are big enough. Use the largest size that fits without forcing;
          many people need two or three sizes.
        </li>
        <li>
          <strong>Floss or tape</strong> suits tight contacts where brushes will
          not go. Curve it around each tooth and slide gently under the gum
          line, rather than snapping it straight down.
        </li>
        <li>
          <strong>Water flossers</strong> are a reasonable option with braces,
          bridges or implants, or for people with limited hand dexterity, even
          though the trial evidence is thinner.
        </li>
        <li>
          <strong>Once a day is enough,</strong> and the NHS suggests before
          brushing.
        </li>
      </ul>
      <p>
        Gums often bleed for the first week or two after you start cleaning
        between teeth. That is usually inflammation settling, not damage.
        Bleeding that continues beyond about two weeks of consistent cleaning is
        a reason to see a dentist or hygienist. The{" "}
        <a href="/learn/floss">floss reference</a> covers the
        product types in more detail.
      </p>

      <h2>Electric vs manual toothbrushes</h2>
      <p>
        A Cochrane review of 56 trials found that powered toothbrushes reduced
        plaque by about 11% in the short term and 21% after three months, and
        gum inflammation by 6% and 11%, compared with manual brushing. The
        largest body of evidence was for rotating-oscillating brush heads.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Yaacob et al.", year: 2014, journal: "Cochrane Database of Systematic Reviews",
          title: "Powered versus manual toothbrushing for oral health",
          url: "https://pubmed.ncbi.nlm.nih.gov/24934383/",
          summary: "56 trials: powered brushes reduced plaque (11% short-term, 21% long-term) and gingivitis (6%, 11%) vs manual; strongest evidence for rotation-oscillation. Clinical importance unclear; some review authors had past toothbrush-maker funding.",
        }]} />{" "}
        The authors described the clinical importance as unclear, and some of
        them had previously worked on trials funded by a toothbrush maker.
      </p>
      <p>
        A good manual technique &mdash; soft bristles, angled at the gum line,
        two minutes, every surface &mdash; is fine. A powered brush makes good
        technique easier, especially with a two-minute timer and a pressure
        warning, and helps people with arthritis, braces or limited dexterity.
        Brushing too hard causes gum recession and wear whichever you use.
      </p>

      <h2>Mouthwash: what it does and doesn&rsquo;t do</h2>

      <h3>Antiseptic rinses</h3>
      <p>
        <strong>Chlorhexidine</strong> is the most powerful antiseptic
        mouthwash. A Cochrane review of 51 trials found it produced a large
        reduction in plaque, but a small reduction in gum inflammation that the
        authors did not consider clinically meaningful in people with mild
        gingivitis. It also caused a large increase in brown tooth staining,
        and commonly taste changes, mouth soreness and burning.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "James et al.", year: 2017, journal: "Cochrane Database of Systematic Reviews",
          title: "Chlorhexidine mouthrinse as an adjunctive treatment for gingival health",
          url: "https://pubmed.ncbi.nlm.nih.gov/28362061/",
          summary: "51 trials, 5,345 participants: large plaque reduction, small (not clinically relevant) gingivitis reduction in mild gingivitis, large increase in tooth staining; taste disturbance and mucosal irritation common.",
        }]} />{" "}
        It is useful for short periods when a dentist recommends it (after
        surgery, or when brushing is impossible), not as a daily habit.
      </p>
      <p>
        Essential-oil rinses reduced gum inflammation by about 16% and plaque
        by about 28% over six months in a pooled analysis &mdash; but every
        trial in it was sponsored by industry.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Araujo et al.", year: 2015, journal: "Journal of the American Dental Association",
          title: "Meta-analysis of the effect of an essential oil-containing mouthrinse on gingivitis and plaque",
          url: "https://pubmed.ncbi.nlm.nih.gov/26227646/",
          summary: "29 industry-sponsored 6-month RCTs: adding an essential-oil rinse to brushing and flossing reduced whole-mouth gingivitis by 16% and plaque by 28%.",
        }]} />{" "}
        Fluoride mouthwashes add some protection
        against decay for people at high risk. Whatever you use, the NHS
        advises using mouthwash at a different time from brushing, such as
        after lunch, so it does not wash away the toothpaste fluoride.
      </p>

      <h3>The nitrate and blood-pressure finding</h3>
      <p>
        Some mouth bacteria convert nitrate (from leafy greens, beetroot and the
        body&rsquo;s own metabolism) into nitrite, which the body turns into
        nitric oxide, a molecule that relaxes blood vessels. In a study of 19
        healthy volunteers, a week of twice-daily antiseptic chlorhexidine
        mouthwash cut the mouth&rsquo;s nitrite production by 90% and raised
        blood pressure by 2&ndash;3.5 mmHg. A crossover study of 15 people with
        treated high blood pressure found a similar rise in systolic pressure
        after just three days.{" "}
        <EvidenceBadge level="emerging" studies={[
          {
            authors: "Kapil et al.", year: 2013, journal: "Free Radical Biology and Medicine",
            title: "Physiological role for nitrate-reducing oral bacteria in blood pressure control",
            url: "https://pubmed.ncbi.nlm.nih.gov/23183324/",
            summary: "19 healthy volunteers, 7 days of chlorhexidine mouthwash: oral nitrite production fell 90%, plasma nitrite 25%, and blood pressure rose 2–3.5 mmHg.",
          },
          {
            authors: "Bondonno et al.", year: 2015, journal: "American Journal of Hypertension",
            title: "Antibacterial mouthwash blunts oral nitrate reduction and increases blood pressure in treated hypertensive men and women",
            url: "https://pubmed.ncbi.nlm.nih.gov/25359409/",
            summary: "15 treated hypertensive adults, 3-day crossover: antibacterial mouthwash reduced oral nitrate-to-nitrite conversion and raised systolic blood pressure by 2.3 mmHg vs water.",
          },
        ]} />
      </p>
      <p>
        These were small, short studies using strong antiseptic rinses, and
        whether everyday mouthwash use changes long-term blood pressure or heart
        risk is not known. But they are a reason not to use a strong antiseptic
        mouthwash routinely without a dental reason, especially if you have
        high blood pressure. If you monitor your blood pressure, see our guide
        to{" "}
        <a href="/guides/how-to-measure-blood-pressure-at-home">
          measuring blood pressure at home
        </a>
        .
      </p>

      <h2>Gum disease, diabetes and the heart</h2>
      <p>
        Gum disease runs from gingivitis (red, bleeding, reversible) to
        periodontitis, where the bone and tissue holding the teeth break down.
        It is linked with several whole-body conditions, but the strength of
        those links varies a great deal.
      </p>
      <p>
        <strong>Diabetes:</strong> the link runs both ways, and here there is
        trial evidence that treating the mouth helps. A Cochrane review of 35
        trials in people with diabetes and periodontitis found that
        professional deep cleaning below the gum line lowered HbA1c (long-term
        blood sugar) by about 0.4 percentage points at three to four months
        &mdash; a clinically meaningful amount, rated moderate certainty.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Simpson et al.", year: 2022, journal: "Cochrane Database of Systematic Reviews",
          title: "Treatment of periodontitis for glycaemic control in people with diabetes mellitus",
          url: "https://pubmed.ncbi.nlm.nih.gov/35420698/",
          summary: "35 RCTs, 3,249 participants: periodontal treatment lowered HbA1c by 0.43% at 3–4 months and 0.30% at 6 months vs no treatment or usual care (moderate certainty).",
        }]} />{" "}
        If you have diabetes, regular gum checks are part of diabetes care.
      </p>
      <p>
        <strong>Heart disease:</strong> people with gum disease have more
        heart and artery disease, but they also share risk factors such as
        smoking, diabetes and age. An American Heart Association scientific
        statement concluded that the association appears to be independent of
        known confounders, but that the evidence does not show gum disease
        causes heart disease, and there is no evidence that treating gum
        disease prevents heart attacks or strokes.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Lockhart et al.", year: 2012, journal: "Circulation",
          title: "Periodontal disease and atherosclerotic vascular disease: does the evidence support an independent association?: a scientific statement from the American Heart Association",
          url: "https://pubmed.ncbi.nlm.nih.gov/22514251/",
          summary: "AHA statement: observational data support an association between periodontal disease and atherosclerotic disease, but not causation; no evidence that periodontal treatment prevents vascular disease.",
        }]} />{" "}
        Healthy gums are worth having for their own sake; be wary of products
        that promise heart benefits.
      </p>

      <h2>What&rsquo;s marketing</h2>
      <ul>
        <li>
          <strong>Charcoal toothpastes and powders.</strong> A review found
          insufficient evidence for their safety or benefit claims, and many
          contain no fluoride; abrasive powders can wear enamel.{" "}
          <EvidenceBadge level="moderate" studies={[{
            authors: "Brooks et al.", year: 2017, journal: "Journal of the American Dental Association",
            title: "Charcoal and charcoal-based dentifrices: A literature review",
            url: "https://pubmed.ncbi.nlm.nih.gov/28599961/",
            summary: "No trials met inclusion criteria; insufficient clinical and laboratory data to support safety and efficacy claims for charcoal dentifrices; online ads made unsubstantiated claims.",
          }]} />
        </li>
        <li>
          <strong>&ldquo;Detox&rdquo; and &ldquo;natural&rdquo; claims.</strong>{" "}
          The ingredient that matters most in a toothpaste is fluoride. Check
          the ppm.
        </li>
        <li>
          <strong>Whitening.</strong> Whitening toothpastes mainly remove
          surface stains by abrasion or chemical action; they do not change the
          underlying tooth colour much. Avoid highly abrasive products if you
          have sensitive teeth or recession.
        </li>
        <li>
          <strong>&ldquo;Kills 99.9% of germs&rdquo;.</strong> Your mouth is
          meant to have bacteria, including the nitrate-reducing ones above.
          Mechanical cleaning and fluoride, not sterilising the mouth, is the
          goal.
        </li>
      </ul>

      <h2>When to see a dentist</h2>
      <Callout variant="warning" title="Book a dental visit if">
        Your gums bleed for more than about two weeks despite regular brushing
        and interdental cleaning; gums are swollen, receding or pulling away
        from teeth; a tooth feels loose; you have persistent bad breath or a bad
        taste; or you have toothache or new sensitivity. See a dentist or doctor
        about any mouth ulcer, or red or white patch, that has not healed within
        three weeks, as these need checking for mouth cancer.
      </Callout>
      <Callout variant="warning" title="Get urgent care for">
        Facial or jaw swelling with fever, swelling spreading to the eye or
        neck, or any difficulty breathing or swallowing. A dental infection can
        spread and become an emergency.
      </Callout>
      <p>
        How often you need routine check-ups depends on your risk: UK NICE
        guidance ranges from every three months for people with active
        problems to up to two years for adults with healthy mouths. People with
        diabetes, who smoke, who have a dry mouth from medications, or who have
        had gum disease usually need more frequent visits.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Is flossing actually necessary?</h3>
      <p>
        Cleaning between your teeth probably reduces gum inflammation, though
        the evidence is low certainty and mostly short-term. It remains
        standard advice from dental bodies. Interdental brushes are often more
        effective and easier where they fit; floss is for the tight gaps.
      </p>

      <h3>Should I rinse after brushing?</h3>
      <p>
        No. Spit out the excess toothpaste and leave the rest. Rinsing with
        water or mouthwash straight after brushing washes away the concentrated
        fluoride.
      </p>

      <h3>Are electric toothbrushes worth it?</h3>
      <p>
        On average they remove a bit more plaque and reduce gum inflammation a
        bit more than manual brushes. A careful manual brusher can do well; an
        electric brush with a timer makes it easier to be careful.
      </p>

      <h3>Is mouthwash bad for you?</h3>
      <p>
        Not in general, but it is not a substitute for brushing, and strong
        antiseptic rinses used routinely can stain teeth and, in small studies,
        raised blood pressure. Use a mouthwash for a specific reason, such as
        fluoride rinse for high decay risk or chlorhexidine short-term on
        dental advice.
      </p>

      <h3>Can gum disease affect my diabetes?</h3>
      <p>
        Yes. Treating periodontitis lowered HbA1c by about 0.4 percentage points
        in trials, a meaningful amount. Tell your dentist if you have diabetes,
        and your diabetes team if your gums bleed.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Fluoride is the backbone: brush twice a day with a 1,350&ndash;1,500
        ppm toothpaste, spit and don&rsquo;t rinse. Clean between your teeth
        once a day with interdental brushes where they fit and floss where they
        don&rsquo;t, knowing the evidence is modest but consistent for gum
        inflammation. An electric brush is a small upgrade. Use mouthwash for a
        reason, not by habit. If you have diabetes, gum care is part of your
        blood sugar care. See the{" "}
        <a href="/learn/toothpaste">toothpaste reference</a> and the{" "}
        <a href="https://app.formulate-health.app/learning/track/personal-care?utm_source=landing&utm_medium=guide_body&utm_campaign=flossing-and-oral-health">personal care learning track</a>{" "}
        for more.
      </p>
      <p>
        <a href="https://app.formulate-health.app/skin">
          Compare toothpastes, floss and mouthwash on the Formulate personal care shelf &rarr;
        </a>
      </p>
    </>
  );
}
