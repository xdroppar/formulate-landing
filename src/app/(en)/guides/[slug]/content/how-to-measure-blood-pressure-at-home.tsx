import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function HowToMeasureBloodPressureAtHome() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "Home readings predict heart attacks and strokes better than readings taken at the doctor’s office, and they catch white-coat and masked hypertension",
          "Use a validated upper-arm cuff in the right size. A cuff that is too small can add nearly 20 mmHg to the reading on a large arm",
          "Protocol: sit quietly for 5 minutes, back supported, feet flat, arm resting on a table at heart level, no talking. Take 2 readings a minute apart, morning and evening, for 7 days, then average them",
          "US guidelines treat a home average of 130/80 or higher as high blood pressure. European guidelines use 135/85",
          "Cuffless watches and rings are not validated for diagnosis. A reading of 180/120 or higher with chest pain, breathlessness, weakness or vision changes is an emergency",
        ]}
      />

      <p>
        High blood pressure is one of the biggest treatable risk factors for
        heart attacks, strokes, kidney disease and dementia, and it usually
        causes no symptoms at all. Most people find out from a single reading at a
        clinic, taken in a rush, after a walk from the car park, often while
        chatting. That reading can be wrong in either direction.
      </p>
      <p>
        Measuring at home fixes much of that, but only if you use the right
        device and technique. Small errors in cuff size, arm position or
        posture can change a reading by as much as a medication does. This guide
        shows you how to get home numbers you and your clinician can trust.
      </p>

      <h2>The Short Answer</h2>
      <p>
        Buy a <strong>validated, automatic, upper-arm cuff</strong> that fits
        your arm. Measure after 5 minutes of quiet sitting, with your back
        supported, feet flat, and arm resting on a table at heart level. Take{" "}
        <strong>two readings a minute apart, morning and evening, for seven
        days</strong>. Average them, ideally leaving out day one. Take that
        average, not any single reading, to your clinician.
      </p>

      <h2>Why Home Readings Matter So Much</h2>
      <p>
        When researchers compared home and office readings in the same people,
        home blood pressure predicted cardiovascular death and events better.
        Once both were considered together, office blood pressure added little.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Ward et al.", year: 2012, journal: "Journal of Hypertension",
          title: "Home measurement of blood pressure and cardiovascular disease: systematic review and meta-analysis of prospective studies",
          url: "https://pubmed.ncbi.nlm.nih.gov/22241136/",
          summary: "8 cohorts, 17,698 people. Per 10 mmHg systolic, home BP HR 1.29 for CV death vs 1.15 for office BP. Adjusted for each other, home BP stayed predictive (HR 1.20); office BP did not (0.99).",
        }]} />
      </p>
      <p>
        Home monitoring also catches two common patterns that clinic readings
        miss:
      </p>
      <ul>
        <li>
          <strong>White-coat hypertension:</strong> high in the clinic, normal
          at home. Without home readings, some of these people are treated
          unnecessarily.
        </li>
        <li>
          <strong>Masked hypertension:</strong> normal in the clinic, high at
          home. This carries substantially higher cardiovascular risk and is
          missed entirely by office checks.
        </li>
      </ul>
      <p>
        Both US and European bodies now endorse home monitoring for diagnosing
        and managing high blood pressure.{" "}
        <EvidenceBadge level="strong" studies={[
          {
            authors: "Shimbo et al.", year: 2020, journal: "Circulation",
            title: "Self-Measured Blood Pressure Monitoring at Home: A Joint Policy Statement From the American Heart Association and American Medical Association",
            url: "https://pubmed.ncbi.nlm.nih.gov/32567342/",
            summary: "AHA/AMA endorse home monitoring with validated upper-arm devices and a standard protocol, to detect white-coat and masked hypertension and improve control.",
          },
          {
            authors: "Muntner et al.", year: 2019, journal: "Hypertension",
            title: "Measurement of Blood Pressure in Humans: A Scientific Statement From the American Heart Association",
            url: "https://pubmed.ncbi.nlm.nih.gov/30827125/",
            summary: "Masked hypertension carries substantially increased CVD risk; validated, calibrated devices and trained technique are critical.",
          },
        ]} />
      </p>
      <p>
        Monitoring works best when someone acts on the numbers. In a pooled
        analysis of 25 trials, self-monitoring alone barely changed blood
        pressure, but combined with medication adjustments, education or
        coaching it lowered systolic pressure by up to about 6 mmHg over a
        year.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Tucker et al.", year: 2017, journal: "PLoS Medicine",
          title: "Self-monitoring of blood pressure in hypertension: A systematic review and individual patient data meta-analysis",
          url: "https://pubmed.ncbi.nlm.nih.gov/28926573/",
          summary: "Individual data from 25 trials. Self-monitoring alone: −1.0 mmHg (not significant). With intensive co-interventions: −6.1 mmHg systolic at 12 months.",
        }]} />{" "}
        When doctors adjusted medication using patients&rsquo; home readings,
        blood pressure ended up lower than when they used clinic readings.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "McManus et al.", year: 2018, journal: "The Lancet",
          title: "Efficacy of self-monitored blood pressure, with or without telemonitoring, for titration of antihypertensive medication (TASMINH4): an unmasked randomised controlled trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/29499873/",
          summary: "1,182 patients. Titrating medication on home readings lowered systolic BP by 3.5–4.7 mmHg more than clinic-guided care at 12 months.",
        }]} />{" "}
        Share your averages, not just your worries.
      </p>

      <h2>Choosing a Monitor</h2>
      <p>
        The most important feature is one you can&rsquo;t see on the box:{" "}
        <strong>independent validation</strong>, meaning the model has been
        tested against a reference method under an international protocol. An
        Australian study of the online market found that only 18% of
        upper-arm cuff devices, 8% of wrist cuffs and none of 532 cuffless
        wrist-band wearables were validated.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Picone et al.", year: 2020, journal: "Hypertension",
          title: "Nonvalidated Home Blood Pressure Devices Dominate the Online Marketplace in Australia: Major Implications for Cardiovascular Risk Management",
          url: "https://pubmed.ncbi.nlm.nih.gov/32275193/",
          summary: "972 devices sold online: 18.3% of upper-arm cuffs, 8.0% of wrist cuffs and 0% of 532 wearables validated. Validated devices cost more.",
        }]} />
      </p>
      <p>
        Before you buy, look up the exact model number on a validated device
        list:
      </p>
      <ul>
        <li>
          <a href="https://www.validatebp.org/">validatebp.org</a> (US Validated
          Device Listing)
        </li>
        <li>
          <a href="https://www.stridebp.org/bp-monitors">STRIDE BP</a>{" "}
          (international)
        </li>
        <li>
          The British and Irish Hypertension Society list (UK and Ireland)
        </li>
      </ul>
      <p>
        Beyond validation:
      </p>
      <ul>
        <li>
          <strong>Upper arm, not wrist.</strong> Wrist cuffs are very sensitive
          to wrist height and position. Use one only if an upper-arm cuff
          won&rsquo;t fit or can&rsquo;t be used, and hold your wrist at heart
          level.
        </li>
        <li>
          <strong>Cuff range that fits your arm</strong> (see below). Some
          models offer a separate large cuff.
        </li>
        <li>
          <strong>Memory or app export</strong>, so you can average readings
          and share them without hand-copying.
        </li>
        <li>
          Features like irregular-heartbeat symbols are nice to have. Don&rsquo;t
          rely on them to diagnose an arrhythmia.
        </li>
      </ul>

      <h2>Cuff Size: The Error Most People Never Check</h2>
      <p>
        A cuff that is too small squeezes too hard and reads high. One that is
        too large reads low. In a randomised crossover trial, using a
        standard adult cuff on people who needed a large cuff raised systolic
        readings by about 5 mmHg. For those who needed an extra-large cuff, the
        error was nearly 20 mmHg.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Ishigami et al.", year: 2023, journal: "JAMA Internal Medicine",
          title: "Effects of Cuff Size on the Accuracy of Blood Pressure Readings: The Cuff(SZ) Randomized Crossover Trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/37548984/",
          summary: "195 adults. Regular cuff vs correct size: −3.6 mmHg systolic if a small cuff was needed; +4.8 mmHg if large; +19.5 mmHg if extra-large.",
        }]} />{" "}
        That&rsquo;s enough to push someone into a medication they don&rsquo;t
        need.
      </p>
      <p>
        To size it, measure the circumference of your bare upper arm halfway
        between the tip of your shoulder and your elbow, with the arm relaxed.
        Match that to the range printed on the cuff. If you&rsquo;re near the
        top of the range, go up a size.
      </p>

      <h2>The Measurement Protocol</h2>
      <p>
        This combines the AHA and European Society of Hypertension
        recommendations:{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Parati et al.", year: 2021, journal: "Journal of Hypertension",
          title: "Home blood pressure monitoring: methodology, clinical relevance and practical application: a 2021 position paper by the Working Group on Blood Pressure Monitoring and Cardiovascular Variability of the European Society of Hypertension",
          url: "https://pubmed.ncbi.nlm.nih.gov/34269334/",
          summary: "ESH protocol: 7 days (at least 3), duplicate readings morning and evening after 5 min seated rest, 1 min apart, before medication; average all readings. Home hypertension threshold 135/85.",
        }]} />
      </p>
      <h3>Before you measure</h3>
      <ul>
        <li>No caffeine, smoking or exercise in the previous 30 minutes.</li>
        <li>Empty your bladder.</li>
        <li>In the morning, measure before taking blood pressure medication and before breakfast. In the evening, before dinner or bed.</li>
      </ul>
      <h3>Position</h3>
      <ul>
        <li>Sit in a chair with your <strong>back supported</strong> and <strong>feet flat</strong> on the floor, legs uncrossed.</li>
        <li>Rest your <strong>arm on a table</strong> so the middle of the cuff is at heart level (roughly mid-chest).</li>
        <li>Put the cuff on <strong>bare skin</strong>, not over a sleeve, with the bottom edge about 2&ndash;3 cm above the elbow crease.</li>
      </ul>
      <h3>Measuring</h3>
      <ul>
        <li>Sit quietly for <strong>5 minutes</strong> first. No phone, no talking.</li>
        <li>Take <strong>two readings, 1 minute apart</strong>, and record both.</li>
        <li>Stay still and silent during each reading.</li>
        <li>Use the same arm each time. On your first day, check both arms. If one is consistently higher, use that one.</li>
      </ul>
      <h3>Schedule and averaging</h3>
      <ul>
        <li>For diagnosis or after a medication change: <strong>morning and evening for 7 days</strong> (at least 3).</li>
        <li>Average all readings. Many clinicians drop the first day, which is often higher.</li>
        <li>Once your blood pressure is stable and controlled, a week of readings before each appointment, or a few readings a week, is usually enough.</li>
      </ul>

      <h2>How Much Arm Position and Posture Matter</h2>
      <p>
        Details that seem trivial add up. In a randomised crossover trial,
        resting the arm in the lap raised readings by about 4 mmHg compared
        with support on a desk. Letting it hang unsupported at the side raised
        systolic pressure by about 6.5 mmHg.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Liu et al.", year: 2024, journal: "JAMA Internal Medicine",
          title: "Arm Position and Blood Pressure Readings: The ARMS Crossover Randomized Clinical Trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/39373998/",
          summary: "133 adults. vs desk support: arm on lap +3.9/+4.0 mmHg; arm hanging at side +6.5/+4.4 mmHg (systolic/diastolic).",
        }]} />{" "}
        A systematic review of 328 studies found individual sources of error,
        including talking, a full bladder, crossed legs, an unsupported back
        and the wrong cuff, that each shifted systolic readings anywhere from
        about 24 mmHg too low to 33 mmHg too high.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Kallioinen et al.", year: 2017, journal: "Journal of Hypertension",
          title: "Sources of inaccuracy in the measurement of adult patients' resting blood pressure in clinical settings: a systematic review",
          url: "https://pubmed.ncbi.nlm.nih.gov/27977471/",
          summary: "328 studies, 29 sources of inaccuracy. Individual effects ranged from −23.6 to +33 mmHg systolic; single outlying readings should be repeated and averaged.",
        }]} />{" "}
        That&rsquo;s why the protocol matters more than the brand, and why one
        surprising reading should be repeated rather than acted on.
      </p>

      <h2>What Your Average Means</h2>
      <p>
        Home thresholds are slightly different from clinic thresholds, and US
        and European guidelines differ:
      </p>
      <table>
        <thead>
          <tr>
            <th>Home average (mmHg)</th>
            <th>US (ACC/AHA)</th>
            <th>Europe (ESC/ESH)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Below 120/80</td>
            <td>Normal</td>
            <td>Normal</td>
          </tr>
          <tr>
            <td>120/80 up to 134/84</td>
            <td>120&ndash;129 systolic with diastolic under 80 is &ldquo;elevated&rdquo;; 130/80 and above is stage 1 high blood pressure</td>
            <td>Below the hypertension threshold (the 2024 ESC guideline calls part of this range &ldquo;elevated&rdquo;)</td>
          </tr>
          <tr>
            <td>135/85 or higher</td>
            <td>High blood pressure</td>
            <td>Hypertension</td>
          </tr>
        </tbody>
      </table>
      <p>
        The US categories come from the ACC/AHA guideline, updated in 2025,
        where a home average of 130/80 corresponds to stage 1 hypertension.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Jones et al.", year: 2025, journal: "Journal of the American College of Cardiology",
          title: "2025 AHA/ACC/AANP/AAPA/ABC/ACCP/ACPM/AGS/AMA/ASPC/NMA/PCNA/SGIM Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults: A Report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines",
          url: "https://pubmed.ncbi.nlm.nih.gov/40815242/",
          summary: "US guideline: stage 1 hypertension from 130/80 mmHg; recommends out-of-office measurement to confirm diagnosis and guide treatment.",
        }]} />{" "}
        European guidelines set the home diagnostic threshold at 135/85.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "McEvoy et al.", year: 2024, journal: "European Heart Journal",
          title: "2024 ESC Guidelines for the management of elevated blood pressure and hypertension",
          url: "https://pubmed.ncbi.nlm.nih.gov/39210715/",
          summary: "European guideline: hypertension on home monitoring at 135/85 mmHg or higher; introduces an 'elevated BP' category below that.",
        }]} />{" "}
        Treatment decisions also depend on your overall cardiovascular risk,
        kidney function and diabetes status, so the number is a starting point
        for a conversation, not a diagnosis by itself.
      </p>

      <h2>When to Act</h2>

      <Callout variant="warning" title="When a reading is an emergency">
        If a reading is <strong>180/120 or higher</strong>, sit quietly for a
        few minutes and measure again. If it&rsquo;s still that high and you
        have <strong>chest pain, shortness of breath, back pain, numbness or
        weakness, a change in vision, difficulty speaking, confusion or a severe
        headache</strong>, call emergency services. Don&rsquo;t wait to see if
        it comes down. If it&rsquo;s that high without symptoms, contact your
        doctor the same day.
      </Callout>

      <ul>
        <li>
          <strong>Average above your threshold:</strong> book an appointment
          and bring your log. Your clinician may confirm with 24-hour
          ambulatory monitoring.
        </li>
        <li>
          <strong>Average normal but clinic readings high:</strong> this may be
          white-coat hypertension. Share your home data rather than assuming
          you&rsquo;re fine, since it may still need follow-up.
        </li>
        <li>
          <strong>Low readings with dizziness or fainting,</strong> especially
          after starting or increasing medication: contact your prescriber.
          Don&rsquo;t stop medication without advice.
        </li>
        <li>
          <strong>Irregular heartbeat symbol appearing often:</strong> mention
          it. Atrial fibrillation also makes cuff readings less reliable, so it
          needs a proper ECG.
        </li>
      </ul>
      <p>
        Pregnancy is a special case. If you&rsquo;re pregnant or recently gave
        birth, readings of 140/90 or higher, or new headaches, vision changes or
        swelling, need same-day contact with your maternity team because of the
        risk of pre-eclampsia. Use a device validated for pregnancy.
      </p>

      <h2>Cuffless Wearables: Not for Diagnosis</h2>
      <p>
        Smartwatches, rings and patches that estimate blood pressure from
        pulse signals are appealing because they measure constantly without a
        cuff. Most need calibration against a cuff, drift over time, and have
        not passed the validation standards cuffs must meet. The European
        Society of Hypertension concluded that fundamental questions about
        their accuracy must be answered before they can be recommended for
        clinical use.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Stergiou et al.", year: 2022, journal: "Journal of Hypertension",
          title: "Cuffless blood pressure measuring devices: review and statement by the European Society of Hypertension Working Group on Blood Pressure Monitoring and Cardiovascular Variability",
          url: "https://pubmed.ncbi.nlm.nih.gov/35708294/",
          summary: "ESH statement: cuffless devices have potential, but accuracy, performance and implementation questions must be addressed before clinical use.",
        }]} />{" "}
        Some watches now offer alerts that flag a pattern suggesting high blood
        pressure. Treat those as a prompt to check properly with a validated
        cuff, never as a reading. For what wearables do measure well, see our{" "}
        <a href="/guides/hrv-explained-wearables">HRV and wearables guide</a>.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Why are my first readings always higher?</h3>
      <p>
        Anticipation, recent activity and the cuff itself can raise blood
        pressure briefly. That&rsquo;s why the protocol uses 5 minutes of rest,
        two readings, and a week of data, and why many clinicians discard the
        first day. If your first reading of each pair is consistently higher,
        that&rsquo;s normal.
      </p>

      <h3>Should I use my left or right arm?</h3>
      <p>
        Check both on the first day. A small difference is normal. If one arm
        is consistently higher, use that arm from then on. A difference of more
        than about 10&ndash;15 mmHg systolic is worth mentioning to your
        clinician.
      </p>

      <h3>How often should I measure once my blood pressure is controlled?</h3>
      <p>
        Measuring every day indefinitely isn&rsquo;t necessary and can fuel
        anxiety. A common approach is a week of morning and evening readings
        before appointments or after any medication change, plus occasional
        checks in between.
      </p>

      <h3>How do I know if my monitor is still accurate?</h3>
      <p>
        Take it to your next appointment and compare it with the clinic&rsquo;s
        device, measuring alternately on the same arm. Replace cuffs that no
        longer close firmly. Validation also depends on the cuff it was tested
        with, so avoid third-party replacement cuffs.
      </p>

      <h3>Can lifestyle changes really move the numbers?</h3>
      <p>
        Yes. Regular aerobic exercise, less sodium and more potassium, limiting
        alcohol, weight loss if needed, and better sleep each lower blood
        pressure. See our{" "}
        <a href="/guides/zone-2-cardio-longevity">Zone 2 cardio guide</a>{" "}
        and <a href="/guides/electrolytes-guide">electrolytes guide</a>.
        Home monitoring is how you see whether they&rsquo;re working for you.
        Avoid measuring straight after a sauna or hot bath, which temporarily
        lowers readings. More in our{" "}
        <a href="/guides/sauna-health-benefits">sauna guide</a>.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        A validated upper-arm cuff in the right size, used with a simple,
        consistent routine, gives you a more useful picture of your blood
        pressure than occasional clinic checks. Sit for 5 minutes, back
        supported, arm on a table, no talking. Take two readings, morning and
        evening, for a week. Share the average. Treat very high readings with
        symptoms as an emergency, and treat cuffless gadgets as curiosities
        rather than diagnostic tools.
      </p>
      <p>
        Learn more in the <a href="https://app.formulate-health.app/learning/track/biomarkers?utm_source=landing&utm_medium=guide_body&utm_campaign=how-to-measure-blood-pressure-at-home">Biomarkers learning track</a>{" "}
        and the <a href="https://app.formulate-health.app/learning/track/body?utm_source=landing&utm_medium=guide_body&utm_campaign=how-to-measure-blood-pressure-at-home">Body learning track</a>, or see the{" "}
        <a href="/learn/blood-pressure">blood pressure monitor reference page</a>.
      </p>
      <p>
        <a href="https://app.formulate-health.app/body">
          Compare validated blood pressure monitors in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
