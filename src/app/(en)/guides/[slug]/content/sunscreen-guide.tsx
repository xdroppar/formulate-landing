import Link from "next/link";
import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function SunscreenGuide() {
  return (
    <>
      <TLDRBox
        readTime="11 min read"
        takeaways={[
          "Daily sunscreen is one of the few skin products tested in long randomised trials: fewer squamous-cell cancers, fewer precancerous keratoses, less visible skin ageing, and a probable drop in melanoma",
          "SPF measures sunburn (UVB) protection at a thick layer most people never apply; “broad spectrum” or a UVA rating tells you about the rays that age skin",
          "Use enough: about half a teaspoon for face and neck, roughly 30 ml for the whole body, and reapply every two hours outdoors and after swimming or sweating",
          "FDA studies found some filters absorb into the blood; that triggers more safety testing, not a finding of harm, and the FDA says keep using sunscreen",
          "Babies under six months need shade and clothing first; several common medicines make skin burn much faster",
        ]}
      />

      <p>
        Most skincare claims rest on small, short, company-run studies.
        Sunscreen is different. A community trial in a subtropical Australian
        town followed people for years and then for another decade, and it
        showed that daily sunscreen reduces skin cancer and visible ageing. That
        makes sunscreen one of the best-evidenced things you can put on your
        skin.
      </p>
      <p>
        The confusion comes afterwards: what SPF numbers mean, why
        &ldquo;broad spectrum&rdquo; matters, how much to use, whether chemical
        filters are safe, what &ldquo;reef-safe&rdquo; means, and what to do for
        babies. This guide takes each in turn.
      </p>

      <h2>What the trials show</h2>

      <h3>The Nambour trial</h3>
      <p>
        In 1992, researchers randomly assigned 1,621 adults in Nambour,
        Queensland, to apply an SPF 15+ sunscreen every day to the head, neck,
        arms and hands, or to use sunscreen as and when they chose. After four
        and a half years, the daily group had about 40% fewer squamous-cell
        carcinomas (counted as tumours). Basal-cell carcinoma, the most common
        skin cancer, did not differ.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Green et al.", year: 1999, journal: "The Lancet",
          title: "Daily sunscreen application and betacarotene supplementation in prevention of basal-cell and squamous-cell carcinomas of the skin: a randomised controlled trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/10475183/",
          summary: "1,621 adults, 4.5 years: daily SPF 15+ reduced squamous-cell carcinoma tumours (rate ratio 0.61) but not basal-cell carcinoma. No harm from daily use.",
        }]} />
      </p>
      <p>
        The team kept following participants. Ten years after the trial ended,
        there had been 11 new melanomas in the daily-sunscreen group and 22 in
        the discretionary group. The overall result only just missed
        conventional statistical significance, but invasive melanomas were
        clearly lower: 3 versus 11.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Green et al.", year: 2011, journal: "Journal of Clinical Oncology",
          title: "Reduced melanoma after regular sunscreen use: randomized trial follow-up",
          url: "https://pubmed.ncbi.nlm.nih.gov/21135266/",
          summary: "10 years after the Nambour trial: 11 vs 22 new melanomas (HR 0.50, P = .051); invasive melanoma 3 vs 11 (HR 0.27).",
        }]} />{" "}
        The numbers are small, so this is strong evidence of direction rather
        than a precise estimate.
      </p>
      <p>
        The same trial measured skin ageing. In adults under 55, those using
        sunscreen daily showed no detectable increase in skin ageing over the
        four and a half years, and 24% less ageing overall than the
        discretionary group.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Hughes et al.", year: 2013, journal: "Annals of Internal Medicine",
          title: "Sunscreen and prevention of skin aging: a randomized trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/23732711/",
          summary: "903 adults under 55: daily broad-spectrum sunscreen group showed no detectable increase in photoageing over 4.5 years; 24% less ageing than discretionary use.",
        }]} />{" "}
        That is a more reliable anti-ageing result than almost any serum on the
        market.
      </p>

      <h3>Precancerous spots</h3>
      <p>
        An earlier Australian trial gave 588 adults aged 40 and over either an
        SPF 17 broad-spectrum sunscreen or the same cream without the filters
        for one summer. The sunscreen group developed fewer new solar
        (actinic) keratoses &mdash; rough precancerous patches &mdash; and more
        existing ones cleared. People who used more sunscreen did better.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Thompson et al.", year: 1993, journal: "New England Journal of Medicine",
          title: "Reduction of solar keratoses by regular sunscreen use",
          url: "https://pubmed.ncbi.nlm.nih.gov/8377777/",
          summary: "588 adults aged 40+, one summer: SPF 17 sunscreen vs base cream. Fewer new solar keratoses (rate ratio 0.62) and more remissions, with a dose-response relationship.",
        }]} />
      </p>

      <h2>SPF, UVA and &ldquo;broad spectrum&rdquo;</h2>
      <p>
        Sunlight reaching the skin includes two kinds of ultraviolet light.
        <strong> UVB</strong> causes sunburn and much of the direct DNA damage
        behind skin cancer. <strong>UVA</strong> penetrates deeper, drives much
        of wrinkling and pigmentation, contributes to cancer, passes through
        window glass and is present all day, all year.
      </p>
      <p>
        <strong>SPF (sun protection factor)</strong> measures protection against
        sunburn, which is mostly UVB. It is tested on volunteers at a set
        thickness of 2 mg of sunscreen per square centimetre of skin. SPF 15
        lets through about 1/15 of burning UV (blocking roughly 93%), SPF 30
        about 1/30 (97%), SPF 50 about 1/50 (98%). The jump from 30 to 50 looks
        small in percentage terms, but it halves the UV getting through
        &mdash; and it gives you a buffer for under-application.
      </p>
      <p>
        <strong>UVA protection</strong> is labelled differently by region:
      </p>
      <ul>
        <li>
          <strong>US:</strong> &ldquo;Broad spectrum&rdquo; means the product
          passed a test showing its protection extends into the UVA range.
        </li>
        <li>
          <strong>EU and UK:</strong> a UVA logo in a circle means the UVA
          protection is at least a third of the labelled SPF.
        </li>
        <li>
          <strong>Asia:</strong> a PA rating from PA+ to PA++++, with more plus
          signs meaning more UVA protection.
        </li>
      </ul>
      <p>
        Dermatology bodies generally recommend at least SPF 30 and broad-spectrum
        (or equivalent UVA) protection for daily use. Go higher for fair skin,
        a history of skin cancer, high altitude, snow, water, or the tropics.
      </p>

      <h2>How much to apply</h2>
      <p>
        This is where most sunscreen fails. SPF is measured at 2 mg/cm&sup2;, but
        studies of real-world use find people apply around a quarter of that.
        Protection does not fall in proportion: a Danish study found SPF falls
        roughly exponentially as the layer thins, so half the amount gives
        something like the square root of the labelled SPF, and a quarter gives
        far less.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Faurschou and Wulf", year: 2007, journal: "British Journal of Dermatology",
          title: "The relation between sun protection factor and amount of suncreen applied in vivo",
          url: "https://pubmed.ncbi.nlm.nih.gov/17493070/",
          summary: "20 volunteers: SPF rose exponentially with amount applied. 1 mg/cm² gave roughly the square root of the labelled SPF, 0.5 mg/cm² roughly the fourth root.",
        }]} />{" "}
        At half the tested amount, an SPF 50 may behave more like an SPF 7.
      </p>
      <p>A practical way to get close to the tested amount:</p>
      <ul>
        <li>
          <strong>Face and neck:</strong> about half a teaspoon (roughly
          2.5&nbsp;ml). Some people use two full finger-lengths of lotion.
        </li>
        <li>
          <strong>Whole body in swimwear:</strong> about 30&nbsp;ml &mdash;
          roughly a shot glass, or six to seven teaspoons: half a teaspoon each
          for face-and-neck and each arm, a teaspoon each for the front of the
          torso, the back, and each leg.
        </li>
        <li>
          <strong>Apply in two passes</strong> if you tend to go thin, and
          don&rsquo;t forget ears, the back of the neck, the tops of the feet
          and the scalp parting.
        </li>
        <li>
          <strong>Make-up and moisturisers with SPF</strong> are rarely applied
          thickly enough to reach their label. Treat them as a top-up, not your
          main protection on a sunny day.
        </li>
      </ul>

      <h3>Reapplication</h3>
      <p>
        Sunscreen rubs, sweats and washes off. Outdoors, reapply at least every
        two hours, and straight after swimming, heavy sweating or towelling.
        &ldquo;Water resistant&rdquo; in the US means the SPF holds for 40 or
        80 minutes of swimming or sweating, as stated on the label; no
        sunscreen is &ldquo;waterproof&rdquo;. For a normal indoor day, one
        careful morning application to the face covers incidental exposure;
        reapply before going out for a long lunch outside.
      </p>
      <p>
        Sunscreen also does not extend the time you can safely spend in strong
        sun. Shade, a wide-brimmed hat, sunglasses and clothing (a UPF rating
        tells you how much UV the fabric blocks) do most of the work when the UV
        index is 3 or above, especially around the middle of the day.
      </p>

      <h2>Mineral vs organic filters</h2>
      <p>
        Sunscreen filters come in two families:
      </p>
      <ul>
        <li>
          <strong>Mineral (inorganic) filters:</strong> zinc oxide and titanium
          dioxide. Zinc oxide covers both UVB and long UVA well; titanium dioxide
          is stronger in UVB and short UVA. They tend to be gentler on sensitive
          skin and around the eyes, and they are the usual choice for babies
          and children. The trade-off is a white cast, especially on darker skin
          &mdash; tinted versions with iron oxides help, and also block some
          visible light, which matters for melasma.
        </li>
        <li>
          <strong>Organic (&ldquo;chemical&rdquo;) filters:</strong> molecules
          such as avobenzone, octocrylene, homosalate, octisalate, oxybenzone
          and octinoxate, and newer ones used widely in Europe, Asia and
          Australia. They make thin, invisible, pleasant formulas, which means
          people use more of them. Some can sting eyes or, rarely, cause
          allergic reactions.
        </li>
      </ul>
      <p>
        Both work. The best sunscreen for you is the one you will apply
        generously and every day.
      </p>

      <h2>The FDA absorption studies, in context</h2>
      <p>
        In 2019 and 2020, FDA scientists published two trials in which healthy
        volunteers applied sunscreen at the full test thickness to 75% of the
        body, up to four times a day for four days. All six organic filters
        tested &mdash; avobenzone, oxybenzone, octocrylene, homosalate,
        octisalate and octinoxate &mdash; reached blood levels above 0.5
        ng/mL, many after a single application.{" "}
        <EvidenceBadge level="strong" studies={[
          {
            authors: "Matta et al.", year: 2019, journal: "JAMA",
            title: "Effect of Sunscreen Application Under Maximal Use Conditions on Plasma Concentration of Sunscreen Active Ingredients: A Randomized Clinical Trial",
            url: "https://pubmed.ncbi.nlm.nih.gov/31058986/",
            summary: "24 volunteers, 4 products at maximal use: avobenzone, oxybenzone, octocrylene and ecamsule all exceeded 0.5 ng/mL in plasma. Authors: results do not mean people should stop using sunscreen.",
          },
          {
            authors: "Matta et al.", year: 2020, journal: "JAMA",
            title: "Effect of Sunscreen Application on Plasma Concentration of Sunscreen Active Ingredients: A Randomized Clinical Trial",
            url: "https://pubmed.ncbi.nlm.nih.gov/31961417/",
            summary: "48 volunteers: all 6 organic filters exceeded 0.5 ng/mL, most after one application; oxybenzone reached the highest levels.",
          },
        ]} />
      </p>
      <p>
        What that threshold means matters. 0.5 ng/mL is the level above which
        the FDA asks manufacturers for further toxicology testing. It is a
        trigger for more data, not a level at which harm has been shown. Both
        papers state plainly that the findings do not mean people should stop
        using sunscreen. For years the FDA classed only zinc oxide and titanium
        dioxide as generally recognised as safe and effective and asked for
        more data on most organic filters. In June 2026 it added a third,
        bemotrizinol &mdash; a broad-spectrum organic filter used for decades in
        Europe and Asia &mdash; at up to 6% for anyone six months or older. The
        missing data on the older organic filters is a gap, not a finding of
        danger. If you would rather not wait for it, mineral sunscreens avoid
        the question.
      </p>
      <p>
        One genuine problem did turn up: in 2021 some aerosol sunscreens were
        recalled after testing found benzene, a carcinogen, as a manufacturing
        contaminant rather than an ingredient. Sprays also make it hard to apply
        enough and are easy to inhale. Rub them in, never spray the face
        directly, and keep them away from flames.
      </p>

      <h2>Reef-safe claims</h2>
      <p>
        Hawaii and some other places have banned sunscreens containing
        oxybenzone and octinoxate to protect coral. Laboratory work showed that
        oxybenzone can deform and kill coral larvae at high enough
        concentrations.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Downs et al.", year: 2016, journal: "Archives of Environmental Contamination and Toxicology",
          title: "Toxicopathological Effects of the Sunscreen UV Filter, Oxybenzone (Benzophenone-3), on Coral Planulae and Cultured Primary Cells and Its Environmental Contamination in Hawaii and the U.S. Virgin Islands",
          url: "https://pubmed.ncbi.nlm.nih.gov/26487337/",
          summary: "Lab study: oxybenzone deformed and killed coral larvae, with toxicity worse in light; reported high concentrations at some US Virgin Islands sites.",
        }]} />{" "}
        A later critical review of the field found that measured concentrations
        near reefs are mostly in the nanograms-per-litre range, while toxic
        effects in the lab appeared at micrograms to milligrams per litre, and
        it identified major gaps and flaws in the evidence.{" "}
        <EvidenceBadge level="mixed" studies={[{
          authors: "Mitchelmore et al.", year: 2021, journal: "Environmental Toxicology and Chemistry",
          title: "A Critical Review of Organic Ultraviolet Filter Exposure, Hazard, and Risk to Corals",
          url: "https://pubmed.ncbi.nlm.nih.gov/33528837/",
          summary: "Seawater concentrations near reefs mostly ng/L; lab effects at µg/L to mg/L; many data gaps and methodological flaws; risk not established.",
        }]} />
      </p>
      <p>
        &ldquo;Reef-safe&rdquo; and &ldquo;reef-friendly&rdquo; are not regulated
        terms. Ocean warming is by far the largest threat to coral. If you
        swim near reefs and want to minimise your footprint, a rash guard and a
        mineral sunscreen is a sensible choice &mdash; but do not skip sun
        protection over it.
      </p>

      <h2>Vitamin D</h2>
      <p>
        An international expert panel reviewing the evidence concluded that
        daily and holiday sunscreen use does not compromise vitamin D status in
        healthy people. Several panel members worked for a large cosmetics
        company, so read it alongside your own blood test if you are at risk of
        deficiency.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Passeron et al.", year: 2019, journal: "British Journal of Dermatology",
          title: "Sunscreen photoprotection and vitamin D status",
          url: "https://pubmed.ncbi.nlm.nih.gov/31069788/",
          summary: "Expert consensus review: broad-spectrum sunscreens that prevent sunburn are unlikely to compromise vitamin D in healthy people; strict photoprotection for photosensitivity disorders may. Several authors were cosmetics-industry employees.",
        }]} />{" "}
        If you avoid the sun strictly, have dark skin and live far from the
        equator, or cover up for cultural reasons, supplementing is simpler than
        sunbathing; see our{" "}
        <Link href="/guides/best-vitamin-d-supplements">
          vitamin D guide
        </Link>
        .
      </p>

      <h2>Medicines that make you burn</h2>
      <p>
        Some medicines make skin react to sunlight &mdash; usually as an
        exaggerated sunburn, sometimes as a rash or lasting pigmentation. A
        review of drug-induced photosensitivity listed amiodarone,
        chlorpromazine, doxycycline, hydrochlorothiazide, nalidixic acid,
        naproxen, piroxicam, tetracycline, thioridazine, vemurafenib and
        voriconazole among the most consistently implicated.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Blakely et al.", year: 2019, journal: "Drug Safety",
          title: "Drug-Induced Photosensitivity-An Update: Culprit Drugs, Prevention and Management",
          url: "https://pubmed.ncbi.nlm.nih.gov/30888626/",
          summary: "Review: amiodarone, chlorpromazine, doxycycline, hydrochlorothiazide, naproxen, piroxicam, tetracycline, voriconazole and others are the most consistently implicated photosensitisers.",
        }]} />{" "}
        Other common culprits include fluoroquinolone and sulfonamide
        antibiotics, isotretinoin, methotrexate, St John&rsquo;s wort, and
        topical retinoids (see our{" "}
        <Link href="/guides/retinol-vs-tretinoin">retinoid guide</Link>).
      </p>
      <p>
        The blood-pressure pill hydrochlorothiazide deserves a specific
        mention. A Danish registry study found that long-term, high cumulative
        use was associated with a substantially higher risk of squamous-cell
        skin cancer, with a clear dose-response; the study had no data on sun
        exposure.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Pedersen et al.", year: 2018, journal: "Journal of the American Academy of Dermatology",
          title: "Hydrochlorothiazide use and risk of nonmelanoma skin cancer: A nationwide case-control study from Denmark",
          url: "https://pubmed.ncbi.nlm.nih.gov/29217346/",
          summary: "Danish registries: high cumulative hydrochlorothiazide use associated with OR 3.98 for squamous-cell carcinoma and 1.29 for basal-cell carcinoma, with dose-response. No sun-exposure data.",
        }]} />
      </p>

      <Callout variant="warning" title="On a photosensitising medicine?">
        Do not stop a prescribed medicine because of sun sensitivity &mdash;
        talk to your prescriber or pharmacist. Use high-SPF broad-spectrum
        sunscreen, cover up, and seek shade, especially during the first weeks
        of a new medicine. If you take hydrochlorothiazide long term, have
        regular skin checks and report any new or changing spot. Seek medical
        care for blistering or widespread sunburn.
      </Callout>

      <h2>Babies and children</h2>
      <Callout variant="warning" title="Under six months">
        Keep babies under six months out of direct sun: shade, a hat, and
        lightweight clothing covering arms and legs. Their skin is thin and
        they overheat easily. The American Academy of Pediatrics advises that
        if shade and clothing are not possible, a small amount of
        broad-spectrum SPF 15 or higher sunscreen can be used on small exposed
        areas such as the face and backs of the hands. In the US, sunscreen
        labels tell parents to ask a doctor before using on babies under six
        months.
      </Callout>
      <p>
        From six months, use a broad-spectrum SPF 30 or higher sunscreen
        generously, alongside hats, sun-protective swimwear and shade. Mineral
        formulas are often better tolerated on children&rsquo;s skin and around
        their eyes. Sunburn in childhood is a well-established risk factor for
        later skin cancer, so this is where sun habits pay off most.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Is SPF 100 better than SPF 50?</h3>
      <p>
        Slightly, in theory: SPF 50 lets through about 2% of burning UV, SPF 100
        about 1%. The real benefit of very high numbers is a buffer against
        applying too little. Applying SPF 30&ndash;50 properly and reapplying
        matters more than the number on the bottle.
      </p>

      <h3>Are mineral sunscreens safer?</h3>
      <p>
        Zinc oxide and titanium dioxide have the most complete safety file:
        the FDA classes them as generally recognised as safe and effective, and
        very little passes through healthy skin. Of the organic filters, only
        bemotrizinol (added in 2026) has that status in the US so far. That does
        not mean the others have been shown to be harmful &mdash; they need more
        data. Both kinds prevent sunburn and skin damage when used properly.
      </p>

      <h3>Do I need sunscreen on cloudy days or indoors?</h3>
      <p>
        Up to about 80% of UV can pass through light cloud, so yes on cloudy
        days. Indoors, UVA passes through most window glass; if you sit by a
        window for long periods, a morning application to the face is
        worthwhile. Otherwise indoor exposure is low.
      </p>

      <h3>Does sunscreen expire?</h3>
      <p>
        Yes. Unless there is an expiry date, US sunscreens are made to stay
        stable for three years. Heat speeds breakdown, so don&rsquo;t leave it
        in a hot car, and replace products that have separated or changed
        smell.
      </p>

      <h3>Is sunscreen safe in pregnancy?</h3>
      <p>
        Sun protection is important in pregnancy, partly because melasma (dark
        facial patches) often flares. Many people choose mineral sunscreens
        during pregnancy to avoid the absorption question entirely; there is no
        evidence that normal sunscreen use harms a pregnancy.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Sunscreen has real, long-term trial evidence behind it: fewer skin
        cancers, fewer precancerous spots and less visible ageing. Choose SPF 30
        or higher with broad-spectrum or rated UVA protection, pick a texture
        you will actually wear, use about half a teaspoon on the face and 30 ml
        on the body, and reapply outdoors. Mineral or organic is a personal
        choice rather than a safety verdict. Check your medicines, keep babies
        in the shade, and treat sunscreen as one layer alongside clothing and
        timing. See the{" "}
        <Link href="/learn/sunscreen">sunscreen reference</Link> and the{" "}
        <a href="https://app.formulate-health.app/learning/track/personal-care?utm_source=landing&utm_medium=guide_body&utm_campaign=sunscreen-guide">personal care learning track</a>{" "}
        for more.
      </p>
      <p>
        <a href="https://app.formulate-health.app/skin">
          Compare sunscreens on the Formulate personal care shelf &rarr;
        </a>
      </p>
    </>
  );
}
