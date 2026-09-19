import Link from "next/link";
import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function SaunaHealthBenefits() {
  return (
    <>
      <TLDRBox
        readTime="11 min read"
        takeaways={[
          "The headline sauna numbers come from one Finnish cohort of about 2,300 middle-aged men: 4–7 sessions a week tracked with markedly lower cardiovascular and all-cause death than one a week",
          "Those studies are observational. People who can sauna most days tend to be healthier to begin with, and no trial has tested sauna against death or heart attacks",
          "The dose in the data is a hot, dry traditional sauna, 2–7 times a week, with sessions of roughly 15–20 minutes",
          "Small randomised trials do show real short-term effects: lower blood pressure and arterial stiffness after a session, and better heart-failure markers with infrared heat",
          "Alcohol is the main thing that kills people in saunas. Unstable heart disease, early pregnancy, heat-sensitive medications (including fentanyl patches) and trying to conceive all change the advice",
        ]}
      />

      <p>
        Few wellness habits have better press than sauna bathing. A string of
        studies from eastern Finland has linked frequent sauna use to fewer
        heart attacks, fewer strokes, less dementia and a longer life, and
        those numbers now appear in almost every advert for a home sauna or an
        infrared cabin.
      </p>
      <p>
        The studies are real, the associations are large, and the research
        group behind them is careful. But they come mostly from one cohort of
        Finnish men, they measure habits rather than assign them, and a hot
        room is not risk-free. This guide covers what the evidence shows, the
        dose it describes, where the gaps are, and who should be more careful.
      </p>

      <h2>The Short Answer</h2>
      <p>
        If you already enjoy a sauna, <strong>2&ndash;4 sessions a week of
        about 15&ndash;20 minutes</strong> in a traditional sauna is a
        reasonable habit with good observational support and plausible
        physiology behind it. Frequent users in the Finnish data (4&ndash;7
        sessions a week) did best. Treat it as something that adds to exercise,
        sleep and blood-pressure control, not something that replaces them.
        Skip the alcohol, and check the safety section if you have heart
        disease, are pregnant, take heat-sensitive medicines or are trying to
        conceive.
      </p>

      <h2>What the Finnish Studies Actually Found</h2>
      <p>
        Nearly every famous sauna statistic traces back to the{" "}
        <strong>Kuopio Ischaemic Heart Disease Risk Factor Study
        (KIHD)</strong>, which enrolled men aged 42&ndash;60 in eastern Finland
        in the 1980s. At the start they were asked how often and how long they
        used the sauna. Researchers then followed their health through national
        registries for more than 20 years.
      </p>

      <h3>Mortality and sudden cardiac death</h3>
      <p>
        In the 2015 analysis, men who used the sauna 4&ndash;7 times a week had
        a <strong>63% lower risk of sudden cardiac death</strong> than men who
        went once a week. The figure for all-cause mortality was about 40%
        lower, after adjusting for the usual cardiovascular risk factors.
        Longer sessions (more than 19 minutes) also tracked with fewer sudden
        cardiac deaths, though not with lower all-cause mortality.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Laukkanen et al.", year: 2015, journal: "JAMA Internal Medicine",
          title: "Association between sauna bathing and fatal cardiovascular and all-cause mortality events",
          url: "https://pubmed.ncbi.nlm.nih.gov/25705824/",
          summary: "2,315 Finnish men followed ~21 years. 4–7 sessions/week vs 1: sudden cardiac death HR 0.37; similar inverse associations for fatal CHD, CVD and all-cause mortality.",
        }]} />
      </p>

      <h3>Blood pressure, stroke and dementia</h3>
      <p>
        Later analyses of the same cohort found similar patterns. Men using
        the sauna 4&ndash;7 times a week were less likely to develop high
        blood pressure over about 25 years.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Zaccardi et al.", year: 2017, journal: "American Journal of Hypertension",
          title: "Sauna Bathing and Incident Hypertension: A Prospective Cohort Study",
          url: "https://pubmed.ncbi.nlm.nih.gov/28633297/",
          summary: "4–7 sessions/week vs 1: HR 0.53 for incident hypertension after adjustment including fitness and socioeconomic status.",
        }]} />{" "}
        A sub-study that also included women found a roughly 60% lower stroke
        risk at the same frequency.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Kunutsor et al.", year: 2018, journal: "Neurology",
          title: "Sauna bathing reduces the risk of stroke in Finnish men and women: A prospective cohort study",
          url: "https://pubmed.ncbi.nlm.nih.gov/29720543/",
          summary: "1,628 men and women aged 53–74, ~15-year follow-up. 4–7 sessions/week vs 1: stroke HR 0.38 after adjustment for activity and socioeconomic status.",
        }]} />{" "}
        Dementia and Alzheimer&rsquo;s diagnoses were also about 65% lower
        among the most frequent bathers.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Laukkanen et al.", year: 2017, journal: "Age and Ageing",
          title: "Sauna bathing is inversely associated with dementia and Alzheimer's disease in middle-aged Finnish men",
          url: "https://pubmed.ncbi.nlm.nih.gov/27932366/",
          summary: "4–7 sessions/week vs 1: dementia HR 0.34, Alzheimer's HR 0.35. Only ~200 dementia cases; single cohort.",
        }]} />
      </p>

      <h3>Sauna and fitness together</h3>
      <p>
        One analysis looked at sauna use alongside measured cardiorespiratory
        fitness. Fitness was the stronger predictor, but men who had both high
        fitness and frequent sauna use had the lowest risk of all.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Kunutsor et al.", year: 2018, journal: "Annals of Medicine",
          title: "Joint associations of sauna bathing and cardiorespiratory fitness on cardiovascular and all-cause mortality risk: a long-term prospective cohort study",
          url: "https://pubmed.ncbi.nlm.nih.gov/28972808/",
          summary: "High fitness alone: CVD mortality HR 0.51. Frequent sauna alone: HR 0.74. Both: HR 0.42 vs low fitness + infrequent sauna.",
        }]} />{" "}
        In practice, sauna sits on top of cardio. It is not a substitute. Our{" "}
        <Link href="/guides/vo2-max-longevity">VO2 max guide</Link> covers
        why fitness carries so much weight.
      </p>

      <h2>The Dose Those Studies Describe</h2>
      <p>
        When people say &ldquo;the research says&rdquo;, this is the exposure
        they mean:
      </p>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>What the evidence describes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Type</td>
            <td>Traditional Finnish sauna: dry heat, low humidity, with occasional water thrown on the stones</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>Roughly 70&ndash;90&deg;C in the experimental studies (73&deg;C in one acute study, 80&ndash;90&deg;C in another)</td>
          </tr>
          <tr>
            <td>Session length</td>
            <td>Grouped as under 11, 11&ndash;19 and over 19 minutes; over 19 minutes tracked with fewer sudden cardiac deaths</td>
          </tr>
          <tr>
            <td>Frequency</td>
            <td>Compared against once a week: 2&ndash;3 a week showed smaller, often non-significant benefits; 4&ndash;7 a week showed the largest</td>
          </tr>
        </tbody>
      </table>
      <p>
        Two caveats. First, frequency and duration were reported once, at the
        start, and assumed to hold for decades. Second, only about 200 of the
        2,315 men were in the 4&ndash;7 times a week group, so the headline
        estimates rest on relatively few deaths.
      </p>

      <h2>Why You Can&rsquo;t Take the Numbers at Face Value</h2>
      <p>
        The Finnish researchers adjusted for age, smoking, blood pressure,
        cholesterol, diabetes, alcohol and, in some analyses, fitness and
        socioeconomic status. That is more than many cohort studies do. Several
        problems remain:
      </p>
      <ul>
        <li>
          <strong>Healthy-user effects.</strong> Men who sauna daily may have
          more leisure time, less shift work, better housing and fewer
          illnesses that make heat unpleasant. Adjustment reduces this bias but
          can&rsquo;t remove what wasn&rsquo;t measured.
        </li>
        <li>
          <strong>Reverse causation.</strong> People who are already becoming
          unwell (heart failure, frailty, early cognitive decline) often stop
          using the sauna. That makes infrequent bathers look worse.
        </li>
        <li>
          <strong>One population.</strong> Most of the data are from
          middle-aged Finnish men, in a culture where sauna is a social and
          family routine. How well the results carry over to a 35-year-old
          woman with a garden cabin is unknown.
        </li>
        <li>
          <strong>No outcome trials.</strong> No randomised trial has assigned
          people to frequent sauna use and counted heart attacks or deaths.
          That trial may never be done.
        </li>
      </ul>
      <p>
        What makes the association more believable is that{" "}
        <strong>short-term randomised and experimental studies point the same
        way</strong>. After a single 30-minute session at 73&deg;C, people
        with cardiovascular risk factors saw average blood pressure fall from
        137/82 to 130/75 mmHg, with lower arterial stiffness.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Laukkanen et al.", year: 2018, journal: "Journal of Human Hypertension",
          title: "Acute effects of sauna bathing on cardiovascular function",
          url: "https://pubmed.ncbi.nlm.nih.gov/29269746/",
          summary: "102 adults with a CV risk factor, one 30-min session at 73°C: pulse wave velocity 9.8 → 8.6 m/s; systolic BP 137 → 130 mmHg.",
        }]} />{" "}
        In an 8-week trial, adding a 15-minute sauna after exercise lowered
        systolic blood pressure by about 8 mmHg more than exercise alone.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Lee et al.", year: 2022, journal: "American Journal of Physiology. Regulatory, Integrative and Comparative Physiology",
          title: "Effects of regular sauna bathing in conjunction with exercise on cardiovascular function: a multi-arm, randomized controlled trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/35785965/",
          summary: "47 inactive adults with CVD risk factors, 8 weeks. Exercise + 15-min sauna vs exercise alone: systolic BP −8.0 mmHg, fitness +2.7 mL/kg/min. Small trial.",
        }]} />{" "}
        A systematic review of 40 clinical studies found mostly favourable
        effects but noted that only 13 were randomised and most had fewer than
        40 participants.{" "}
        <EvidenceBadge level="mixed" studies={[{
          authors: "Hussain and Cohen", year: 2018, journal: "Evidence-Based Complementary and Alternative Medicine",
          title: "Clinical Effects of Regular Dry Sauna Bathing: A Systematic Review",
          url: "https://pubmed.ncbi.nlm.nih.gov/29849692/",
          summary: "40 studies, 3,855 participants; only 13 RCTs, mostly n<40. Benefits reported, adverse effects poorly measured.",
        }]} />
      </p>
      <p>
        Mood is an interesting side note. In a small sham-controlled trial,
        a single session of medical whole-body hyperthermia reduced depression
        scores for six weeks.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Janssen et al.", year: 2016, journal: "JAMA Psychiatry",
          title: "Whole-Body Hyperthermia for the Treatment of Major Depressive Disorder: A Randomized Clinical Trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/27172277/",
          summary: "30 adults with major depression. One session of whole-body hyperthermia vs sham: lower Hamilton depression scores through 6 weeks.",
        }]} />{" "}
        That was a clinical device with monitoring, not a home sauna, and it
        is not a treatment for depression you should attempt on your own.
      </p>

      <h2>Traditional vs Infrared</h2>
      <p>
        A <strong>traditional sauna</strong> heats the air (typically
        70&ndash;100&deg;C), which then heats you. An{" "}
        <strong>infrared sauna</strong> uses emitters that warm your skin
        directly, so the air stays cooler, often 45&ndash;65&deg;C. Many
        people find infrared easier to tolerate, and it uses less power.
      </p>
      <p>
        The evidence bases are different, though. The Finnish mortality data
        are about traditional saunas. Most controlled infrared data come from
        Japan&rsquo;s &ldquo;Waon&rdquo; therapy for heart failure: 15 minutes
        in a 60&deg;C far-infrared cabin followed by 30 minutes resting under
        a blanket. Pooled trials showed short-term improvements in heart
        function markers.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Källström et al.", year: 2018, journal: "Clinical Cardiology",
          title: "Effects of sauna bath on heart failure: A systematic review and meta-analysis",
          url: "https://pubmed.ncbi.nlm.nih.gov/30239008/",
          summary: "9 studies, all infrared. 60°C for 15 min + 30 min warm rest, 5×/week for 2–4 weeks: lower BNP, better ejection fraction. Short-term only.",
        }]} />{" "}
        That is useful, but it involves patients under medical supervision,
        over weeks rather than decades.
      </p>
      <p>
        Nobody has shown that infrared produces the same long-term
        associations as a Finnish sauna, or that it doesn&rsquo;t. If an
        infrared cabin makes you sweat heavily and raises your heart rate, it
        is probably delivering some of the same heat stress. If it
        doesn&rsquo;t, it&rsquo;s a warm room. Claims that infrared
        &ldquo;penetrates deeper&rdquo; or &ldquo;detoxes&rdquo; better have
        no good outcome evidence behind them. Sweat is mostly water and salt,
        and clearance of real toxins is done by the liver and kidneys.
      </p>

      <h2>Safety: Who Needs to Be Careful</h2>
      <p>
        For healthy adults, a sauna is a well-tolerated stress. Deaths in
        saunas are rare even in Finland, where there are about two million
        saunas. They cluster in a predictable group, though.
      </p>

      <Callout variant="warning" title="Alcohol is the biggest risk">
        In Finnish deaths that occurred in a sauna between 1990 and 2002, half
        of the people were under the influence of alcohol. In a Swedish
        series, 71% of those tested were positive, and almost all were found
        alone. Alcohol plus heat causes low blood pressure, arrhythmias and
        fainting. Don&rsquo;t drink before or during a sauna, and don&rsquo;t
        leave a drunk person alone in one.{" "}
        <EvidenceBadge level="moderate" studies={[
          {
            authors: "Kenttämies and Karkola", year: 2008, journal: "Journal of Forensic Sciences",
            title: "Death in sauna",
            url: "https://pubmed.ncbi.nlm.nih.gov/18471223/",
            summary: "Finnish sauna deaths 1990–2002: under 2 per 100,000 per year; 50% under the influence of alcohol.",
          },
          {
            authors: "Rodhe and Eriksson", year: 2008, journal: "American Journal of Forensic Medicine and Pathology",
            title: "Sauna deaths in Sweden, 1992-2003",
            url: "https://pubmed.ncbi.nlm.nih.gov/19749613/",
            summary: "77 deaths; 71% of those tested alcohol-positive; all but 2 of those found in a sauna were alone.",
          },
        ]} />
      </Callout>

      <h3>Heart conditions</h3>
      <p>
        Clinical reviews list <strong>unstable angina, a recent heart attack
        and severe aortic stenosis</strong> as reasons not to use a sauna.
        People with stable coronary disease or an old heart attack usually
        tolerate it well, but that decision belongs with your cardiologist.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Hannuksela and Ellahham", year: 2001, journal: "American Journal of Medicine",
          title: "Benefits and risks of sauna bathing",
          url: "https://pubmed.ncbi.nlm.nih.gov/11165553/",
          summary: "Contraindications: unstable angina, recent MI, severe aortic stenosis. Alcohol during sauna raises risk of hypotension, arrhythmia and sudden death.",
        }]} />{" "}
        If you have heart failure, an arrhythmia, a history of fainting or
        low blood pressure, get clearance first. Get out immediately if you
        feel chest pain, palpitations, confusion or faintness.
      </p>

      <h3>Pregnancy</h3>
      <p>
        High fever or heat exposure in <strong>early pregnancy</strong> has
        been linked to neural tube defects. In one large cohort, hot tub use
        in the first trimester carried the clearest signal, with a weaker,
        non-significant signal for sauna.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Milunsky et al.", year: 1992, journal: "JAMA",
          title: "Maternal heat exposure and neural tube defects",
          url: "https://pubmed.ncbi.nlm.nih.gov/1640616/",
          summary: "23,491 pregnancies. First-trimester hot tub use adjusted RR 2.8 for neural tube defects; sauna RR 1.8 (95% CI 0.4–7.9).",
        }]} />{" "}
        A later review found that sitting in a 70&deg;C dry sauna for up to 20
        minutes did not push pregnant women&rsquo;s core temperature to the
        39&deg;C level of concern.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Ravanelli et al.", year: 2019, journal: "British Journal of Sports Medicine",
          title: "Heat stress and fetal risk. Environmental limits for exercise and passive heat stress during pregnancy: a systematic review with best evidence synthesis",
          url: "https://pubmed.ncbi.nlm.nih.gov/29496695/",
          summary: "12 studies, n=347. No woman reached 39.0°C core. Hot/dry sauna at 70°C for up to 20 min stayed below the teratogenic threshold.",
        }]} />{" "}
        The cautious approach is to avoid sauna in the first trimester,
        when the neural tube forms. After that, keep sessions short and
        cooler, and leave at the first sign of feeling unwell. Ask your
        midwife or obstetrician.
      </p>

      <h3>Medications, including fentanyl patches</h3>
      <p>
        Heat changes how some drugs behave. The clearest example is{" "}
        <strong>transdermal fentanyl</strong>. Heating the patch nearly tripled
        peak blood levels in a volunteer study, and regulators warn patients
        not to use saunas, hot tubs or heating pads while wearing one.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Ashburn et al.", year: 2003, journal: "The Journal of Pain",
          title: "The pharmacokinetics of transdermal fentanyl delivered with and without controlled heat",
          url: "https://pubmed.ncbi.nlm.nih.gov/14622685/",
          summary: "Local heat on a 25 µg/h fentanyl patch raised peak serum fentanyl ~3-fold during the first 4 hours (0.63 vs 0.24 ng/mL).",
        }]} />{" "}
        The same applies to other medicated patches. Take extra care, and ask
        your pharmacist, if you take:
      </p>
      <ul>
        <li>blood-pressure medicines, diuretics or nitrates (a higher risk of fainting from low blood pressure)</li>
        <li>drugs that reduce sweating, such as anticholinergics and some antipsychotics</li>
        <li>sedatives, opioids or anything that dulls your sense that you&rsquo;ve had enough</li>
        <li>insulin, which can be absorbed faster from warm skin</li>
      </ul>

      <h3>Heat and sperm</h3>
      <p>
        Testes work best a few degrees below core temperature. In ten healthy
        men who used a sauna twice a week (15 minutes at 80&ndash;90&deg;C) for
        three months, sperm count and motility fell sharply. They were back to
        normal six months after stopping.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Garolla et al.", year: 2013, journal: "Human Reproduction",
          title: "Seminal and molecular evidence that sauna exposure affects human spermatogenesis",
          url: "https://pubmed.ncbi.nlm.nih.gov/23411620/",
          summary: "10 men, 2×/week, 15 min at 80–90°C for 3 months: marked fall in sperm count and motility; fully reversed 6 months after stopping.",
        }]} />{" "}
        If you and a partner are trying to conceive, pausing regular sauna use
        for a few months is a cheap precaution.
      </p>

      <h3>Children and older adults</h3>
      <p>
        Children overheat and dehydrate faster. Keep their sessions short,
        cooler and supervised. Older adults, and anyone prone to dizziness,
        should stand up slowly after a session, because blood pressure can
        drop sharply on standing and cause a fall.
      </p>

      <h2>A Sensible Protocol</h2>
      <p>
        There is no trial comparing protocols against long-term outcomes, so
        this is an evidence-informed default, not a prescription:
      </p>
      <ul>
        <li>
          <strong>Start low.</strong> 5&ndash;10 minutes at the cooler end
          (around 70&ndash;80&deg;C in a traditional sauna, or the top setting
          of an infrared cabin), then build towards 15&ndash;20 minutes over a
          few weeks.
        </li>
        <li>
          <strong>Aim for 2&ndash;4 sessions a week.</strong> More is fine if
          you enjoy it. The Finnish data suggest the benefits keep rising with
          frequency, but so does the time it takes.
        </li>
        <li>
          <strong>Drink water before and after,</strong> and replace salt if
          you sweat heavily or train the same day. Our{" "}
          <Link href="/guides/electrolytes-guide">electrolytes guide</Link>{" "}
          covers how much.
        </li>
        <li>
          <strong>No alcohol</strong>, and don&rsquo;t sauna alone if you have
          a medical condition that could make you faint.
        </li>
        <li>
          <strong>Leave when you feel like leaving.</strong> Dizziness, nausea,
          headache or a pounding heart mean you&rsquo;re done.
        </li>
        <li>
          <strong>Cool down gradually.</strong> A cool shower is fine. If you
          want to add cold water immersion, read our{" "}
          <Link href="/guides/cold-plunge-benefits-and-risks">cold plunge guide</Link>{" "}
          first, because the combination adds cardiovascular stress.
        </li>
      </ul>

      <Callout variant="tip" title="Pair it with the things that matter more">
        In the Finnish data, fitness predicted survival more strongly than
        sauna use did. If you&rsquo;re choosing where to spend your time, keep
        your <Link href="/guides/zone-2-cardio-longevity">aerobic
        training</Link> first and use the sauna afterwards. That&rsquo;s also the
        combination that lowered blood pressure in the one small trial that
        tested it.
      </Callout>

      <h2>Frequently Asked Questions</h2>

      <h3>Is an infrared sauna as good as a traditional one?</h3>
      <p>
        Nobody knows. The long-term associations come from traditional
        saunas. Infrared has short-term trial data in heart failure, but not
        decades of follow-up. If you&rsquo;re choosing one for health rather
        than comfort, pick whichever you will actually use several times a
        week and that gets you properly hot.
      </p>

      <h3>Can I use a sauna if I have high blood pressure?</h3>
      <p>
        Most people with treated, stable high blood pressure can, and blood
        pressure usually falls during and after a session. The risk is
        fainting when you stand up, especially if you take several blood
        pressure medicines or diuretics. Talk to your clinician first, and
        keep an eye on your numbers with a{" "}
        <Link href="/guides/how-to-measure-blood-pressure-at-home">home blood pressure routine</Link>.
        Don&rsquo;t measure straight after a sauna, though, because the
        reading will be misleadingly low.
      </p>

      <h3>Does a sauna count as cardio?</h3>
      <p>
        Partly. Your heart rate can rise to levels similar to light exercise,
        but you&rsquo;re not training your muscles to use oxygen, and fitness
        predicted survival more strongly than sauna use in the same Finnish
        men. It works as an addition to exercise, not a replacement for it.
      </p>

      <h3>Should I use the sauna before or after a workout?</h3>
      <p>
        After is the usual choice and the one that has been tested. Heat
        before training raises core temperature and can reduce performance,
        particularly for endurance work. Rehydrate between the two.
      </p>

      <h3>Does sweating in a sauna detox the body?</h3>
      <p>
        Not in any meaningful sense. Sweat is mostly water and electrolytes.
        Removing toxins is the job of the liver and kidneys. The plausible
        benefits of sauna come from heat stress on the heart and blood
        vessels, not from what leaves through the skin.
      </p>

      <h3>How hot is too hot?</h3>
      <p>
        There is no universal ceiling. Finnish saunas commonly run at
        80&ndash;100&deg;C in dry air, while humid heat feels far hotter at a
        lower temperature. Time and how you feel matter more than the dial.
        If you can&rsquo;t breathe comfortably through your nose, or you feel
        dizzy, it&rsquo;s too much for today.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Frequent sauna use is linked with lower cardiovascular risk, supported
        by a consistent Finnish cohort and short-term trials showing lower
        blood pressure and less arterial stiffness. It is not proven to make
        you live longer, the data mostly describe middle-aged Finnish men, and
        healthier people may simply sauna more. If you enjoy it, 2&ndash;4
        sessions of 15&ndash;20 minutes a week is a sensible habit. Keep alcohol
        out of it, and take the heart, pregnancy, fertility and medication
        cautions seriously.
      </p>
      <p>
        For the wider picture of heat, cold and light, see the{" "}
        <a href="https://app.formulate-health.app/learning/track/therapies?utm_source=landing&utm_medium=guide_body&utm_campaign=sauna-health-benefits">Therapies learning track</a> or the{" "}
        <Link href="/learn/sauna">sauna reference page</Link>.
      </p>
      <p>
        <a href="https://app.formulate-health.app/therapies">
          Compare saunas and other heat therapies in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
