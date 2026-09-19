import Link from "next/link";
import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function HrvExplainedWearables() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "Heart rate variability (HRV) is the small beat-to-beat variation in your heartbeat. Most wearables report RMSSD, a marker of the “rest and recover” side of the nervous system",
          "HRV is highly personal: age, sex, genetics and fitness set your range, so comparing your number with someone else’s is close to meaningless. Compare yourself with your own baseline",
          "Alcohol, illness, poor sleep, hard training and stress lower it. Alcohol has one of the clearest dose-dependent effects",
          "Wearables measure resting heart rate well and overnight HRV reasonably well, depending on the device. Their sleep-stage breakdowns are much weaker",
          "Resting heart rate is a simpler, more robust signal: a sustained rise of several beats above your normal often means illness, overreaching or too little recovery",
        ]}
      />

      <p>
        Open almost any fitness ring or watch app and you&rsquo;ll find heart
        rate variability, often turned into a &ldquo;readiness&rdquo; or
        &ldquo;recovery&rdquo; score that tells you whether to train hard,
        take it easy or go to bed early. HRV is a real physiological signal
        with decades of research behind it. It&rsquo;s also noisy, personal,
        and easy to over-read.
      </p>
      <p>
        This guide covers what HRV is, what the numbers mean, what moves them,
        how accurate wearables are, and how to use a baseline without letting
        a score run your life.
      </p>

      <h2>The Short Answer</h2>
      <p>
        Use HRV as a <strong>trend against your own baseline</strong>, never as
        a grade against other people. Collect two to four weeks of data, look
        at a 7-day rolling average, and pay attention when it sits clearly
        below your usual range for several days, especially if your resting
        heart rate is also up. Ignore single-night dips, treat sleep-stage
        charts with scepticism, and never let a wearable override how you
        actually feel or what a doctor tells you.
      </p>

      <h2>What HRV Is</h2>
      <p>
        Your heart doesn&rsquo;t beat like a metronome. Even at 60 beats per
        minute, the gap between beats might be 0.95 seconds, then 1.04, then
        0.99. That variation is HRV. It comes mostly from the constant
        tug-of-war between the two branches of your autonomic nervous
        system: the sympathetic (&ldquo;fight or flight&rdquo;) side speeds
        the heart and makes it more regular, and the parasympathetic (vagal,
        &ldquo;rest and digest&rdquo;) side slows it and adds variability.
        Breathing also plays a part. Your heart speeds up slightly as you
        breathe in and slows as you breathe out.
      </p>
      <p>
        In general, higher resting HRV reflects stronger parasympathetic
        activity and a more adaptable system, and lower HRV reflects stress,
        fatigue, illness or reduced fitness. A healthy heart is variable.{" "}
        <EvidenceBadge level="strong" studies={[
          {
            authors: "Task Force of the European Society of Cardiology and the North American Society of Pacing and Electrophysiology", year: 1996, journal: "Circulation",
            title: "Heart rate variability: standards of measurement, physiological interpretation and clinical use. Task Force of the European Society of Cardiology and the North American Society of Pacing and Electrophysiology",
            url: "https://pubmed.ncbi.nlm.nih.gov/8598068/",
            summary: "The founding standards document defining HRV measures (including RMSSD and SDNN) and their physiological interpretation.",
          },
          {
            authors: "Shaffer and Ginsberg", year: 2017, journal: "Frontiers in Public Health",
            title: "An Overview of Heart Rate Variability Metrics and Norms",
            url: "https://pubmed.ncbi.nlm.nih.gov/29034226/",
            summary: "Review of HRV metrics and published norms; stresses that recording length, age and sex shape values and that 24-h, 5-min and ultra-short norms are not interchangeable.",
          },
        ]} />
      </p>

      <h2>RMSSD: The Number Your Wearable Probably Shows</h2>
      <p>
        There are dozens of HRV metrics. Most consumer devices report{" "}
        <strong>RMSSD</strong> (root mean square of successive differences), in
        milliseconds. It takes the difference between each pair of consecutive
        beat intervals, squares them, averages them and takes the square root.
        RMSSD mainly reflects parasympathetic activity, and it&rsquo;s fairly
        robust over short recordings, which is why wearables favour it.
      </p>
      <p>
        Important details that make numbers hard to compare:
      </p>
      <ul>
        <li>
          <strong>When it&rsquo;s measured.</strong> Some devices average the
          whole night, some use a window of deep sleep, and some use a short
          morning reading. These give different values.
        </li>
        <li>
          <strong>Different algorithms.</strong> Two devices on the same
          person on the same night can report different numbers. Switching
          devices means starting a new baseline.
        </li>
        <li>
          <strong>Other metrics.</strong> SDNN, which captures total
          variability, is used more in clinical research, often over 24 hours.
          It isn&rsquo;t interchangeable with a wearable&rsquo;s nightly RMSSD.
        </li>
      </ul>

      <h2>Why HRV Is Personal</h2>
      <p>
        Healthy adults have wildly different HRV. A review of short-term HRV
        in more than 21,000 healthy people found large differences between
        individuals and between studies, much of it driven by how HRV was
        measured.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Nunan et al.", year: 2010, journal: "Pacing and Clinical Electrophysiology",
          title: "A quantitative systematic review of normal values for short-term heart rate variability in healthy adults",
          url: "https://pubmed.ncbi.nlm.nih.gov/20663071/",
          summary: "44 studies, 21,438 healthy adults. Large between-person variation; values lower than older Task Force norms; methodological differences drive discrepancies.",
        }]} />{" "}
        Age matters a lot. RMSSD falls steeply through early and middle
        adulthood, to roughly half of young-adult values by the sixth decade,
        and sex differences are present in younger adults.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Umetani et al.", year: 1998, journal: "Journal of the American College of Cardiology",
          title: "Twenty-four hour time domain heart rate variability and heart rate: relations to age and gender over nine decades",
          url: "https://pubmed.ncbi.nlm.nih.gov/9502641/",
          summary: "260 healthy people aged 10–99. HRV declined with age; RMSSD reached ~47% of second-decade values by the sixth decade. Women had lower HRV under 30; differences faded after 50.",
        }]} />
      </p>
      <p>
        Genetics, body size, fitness, medications and breathing patterns add
        more spread. A 55-year-old with an RMSSD of 30 ms may be in excellent
        shape, and a 25-year-old with 90 ms may be run down by their own
        standard. That&rsquo;s why the useful comparison is always{" "}
        <strong>you versus your usual</strong>.
      </p>

      <h2>What Moves HRV</h2>
      <p>
        Things that typically <strong>lower</strong> overnight HRV (and raise
        resting heart rate):
      </p>
      <ul>
        <li>
          <strong>Alcohol.</strong> In a real-world study of thousands of
          Finnish employees, alcohol lowered HRV-based recovery during the first
          hours of sleep in a dose-dependent way, even at low intakes. Being
          young or physically active didn&rsquo;t protect against it.{" "}
          <EvidenceBadge level="moderate" studies={[{
            authors: "Pietilä et al.", year: 2018, journal: "JMIR Mental Health",
            title: "Acute Effect of Alcohol Intake on Cardiovascular Autonomic Regulation During the First Hours of Sleep in a Large Real-World Sample of Finnish Employees: Observational Study",
            url: "https://pubmed.ncbi.nlm.nih.gov/29549064/",
            summary: "Large observational sample. HRV-derived recovery fell by ~9, 24 and 39 percentage points after low, moderate and high alcohol intake, in both sexes and regardless of activity level.",
          }]} />
        </li>
        <li><strong>Illness,</strong> often a day or two before symptoms.</li>
        <li><strong>Short or disrupted sleep,</strong> jet lag and shift work.</li>
        <li><strong>Hard training blocks,</strong> especially without enough recovery.</li>
        <li><strong>Psychological stress,</strong> late heavy meals, dehydration and a hot bedroom.</li>
        <li>
          <strong>The menstrual cycle:</strong> vagally mediated HRV tends to
          fall from the first (follicular) half of the cycle to the second
          (luteal) half, so a dip before a period is expected.{" "}
          <EvidenceBadge level="moderate" studies={[{
            authors: "Schmalenberger et al.", year: 2019, journal: "Journal of Clinical Medicine",
            title: "A Systematic Review and Meta-Analysis of Within-Person Changes in Cardiac Vagal Activity across the Menstrual Cycle: Implications for Female Health and Future Studies",
            url: "https://pubmed.ncbi.nlm.nih.gov/31726666/",
            summary: "37 studies, 1,004 naturally cycling women: cardiac vagal activity (vagally mediated HRV) fell from the follicular to the luteal phase (d = −0.39), most sharply before menstruation.",
          }]} />
        </li>
      </ul>
      <p>
        Things that tend to <strong>raise</strong> it over weeks and months:
        regular aerobic exercise, consistent sleep, less alcohol, and
        recovering from illness or a stressful period. Slow breathing raises
        HRV while you&rsquo;re doing it. Whether that carries over is less
        clear.
      </p>

      <h2>How Accurate Are Wearables?</h2>
      <p>
        It depends on what you&rsquo;re asking them to measure.
      </p>
      <h3>Resting heart rate: good</h3>
      <p>
        Optical sensors on the wrist or finger measure heart rate at rest and
        during sleep well. In a comparison with multi-lead ECG, most consumer
        devices reported resting heart rate accurately.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Stone et al.", year: 2021, journal: "Frontiers in Sports and Active Living",
          title: "Assessing the Accuracy of Popular Commercial Technologies That Measure Resting Heart Rate and Heart Rate Variability",
          url: "https://pubmed.ncbi.nlm.nih.gov/33733234/",
          summary: "7 consumer technologies vs ECG. Resting HR accurate for all but a camera-based app. RMSSD error ranged from ~4% for the best to over 100% for the worst.",
        }]} />
      </p>
      <h3>HRV: varies a lot by device</h3>
      <p>
        In the same study, RMSSD error ranged from about 4&ndash;7% for the
        best devices to more than 100% for the worst. Another study of six
        popular wearables found that devices sampling during sleep agreed well
        with ECG for heart rate and moderately to highly for HRV, while a short
        daytime test agreed least.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Miller et al.", year: 2022, journal: "Sensors",
          title: "A Validation of Six Wearable Devices for Estimating Sleep, Heart Rate and Heart Rate Variability in Healthy Adults",
          url: "https://pubmed.ncbi.nlm.nih.gov/36016077/",
          summary: "53 adults, one lab night. Sleep vs wake agreement 86–89%; sleep-stage agreement only 50–65%. Sleep-sampled HR agreed highly with ECG, HRV moderately to highly.",
        }]} />{" "}
        Optical sensors are most reliable when you&rsquo;re still, which is
        why overnight or first-thing-in-the-morning readings are best. ECG
        chest straps remain the reference for consumer HRV, especially during
        exercise.
      </p>
      <h3>Sleep stages: weak</h3>
      <p>
        Wearables are good at telling sleep from wake over the night and at
        measuring total sleep time. They are much weaker at deciding which
        stage you&rsquo;re in. In a comparison of seven consumer sleep
        trackers with polysomnography, detecting sleep was excellent, detecting
        wake was mediocre, and stage estimates were inconsistent, especially on
        nights of poor sleep.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Chinoy et al.", year: 2021, journal: "Sleep",
          title: "Performance of seven consumer sleep-tracking devices compared with polysomnography",
          url: "https://pubmed.ncbi.nlm.nih.gov/33378539/",
          summary: "7 devices vs lab polysomnography. Sleep sensitivity ≥0.93, wake specificity 0.18–0.54; sleep-stage estimates inconsistent; worse on disrupted nights.",
        }]} />{" "}
        Treat &ldquo;deep sleep&rdquo; and &ldquo;REM&rdquo; minutes as rough
        guesses. Our <a href="https://app.formulate-health.app/learning/track/sleep?utm_source=landing&utm_medium=guide_body&utm_campaign=hrv-explained-wearables">Sleep learning track</a>{" "}
        covers what actually improves sleep.
      </p>

      <h2>How to Use a Baseline</h2>
      <ol>
        <li>
          <strong>Measure the same way every time.</strong> Overnight readings
          from the same device, or a morning reading taken lying down right
          after waking, before coffee or checking your phone.
        </li>
        <li>
          <strong>Build 2&ndash;4 weeks of baseline</strong> during a normal
          period, not while ill or travelling.
        </li>
        <li>
          <strong>Look at the 7-day rolling average</strong> against your
          longer-term normal range (many apps show roughly the last 30&ndash;60
          days). Single-day values bounce around too much to act on.
        </li>
        <li>
          <strong>Act on patterns, not points.</strong> Several days clearly
          below your range, especially with a higher resting heart rate, poor
          sleep or feeling off, is a reason to ease training, prioritise sleep
          and check for illness.
        </li>
        <li>
          <strong>Expect fitness to change your baseline.</strong> Sustained
          endurance training usually raises HRV over months. In elite athletes
          the patterns get more complicated, and HRV can fall even as fitness
          improves.
        </li>
      </ol>
      <p>
        There is reasonable evidence for this approach. Sports scientists
        recommend rolling averages and individual reference ranges rather than
        daily values.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Plews et al.", year: 2013, journal: "Sports Medicine",
          title: "Training adaptation and heart rate variability in elite endurance athletes: opening the door to effective monitoring",
          url: "https://pubmed.ncbi.nlm.nih.gov/23852425/",
          summary: "Review: daily HRV is noisy; rolling averages and individual reference ranges are needed; interpretation differs in elite athletes.",
        }]} />{" "}
        In a small trial, runners who chose hard or easy sessions based on
        their morning HRV improved running performance more than those
        following a fixed plan.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Kiviniemi et al.", year: 2007, journal: "European Journal of Applied Physiology",
          title: "Endurance training guided individually by daily heart rate variability measurements",
          url: "https://pubmed.ncbi.nlm.nih.gov/17849143/",
          summary: "26 moderately fit men, 4 weeks. HRV-guided training improved max running speed more than a predefined plan (+0.9 vs +0.5 km/h). Small, short trial.",
        }]} />{" "}
        For how to structure the easy days, see our{" "}
        <Link href="/guides/zone-2-cardio-longevity">Zone 2 guide</Link>.
      </p>

      <h2>Don&rsquo;t Let the Score Run You</h2>
      <p>
        Sleep specialists have described patients whose worry about tracker
        data became the problem, a pattern they called{" "}
        <strong>orthosomnia</strong>: chasing a perfect sleep or recovery score,
        and losing sleep over the numbers.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Baron et al.", year: 2017, journal: "Journal of Clinical Sleep Medicine",
          title: "Orthosomnia: Are Some Patients Taking the Quantified Self Too Far?",
          url: "https://pubmed.ncbi.nlm.nih.gov/27855740/",
          summary: "Case series of patients seeking treatment for self-diagnosed sleep problems based on tracker data; tracker scores often trusted over validated measures.",
        }]} />{" "}
        If you feel fine but your score is low, you are probably fine. If you
        feel terrible but your score is green, believe how you feel. If
        checking the app makes you anxious, hide the score for a few weeks.
      </p>

      <h2>Resting Heart Rate: The Simpler Signal</h2>
      <p>
        Resting heart rate is measured more accurately than HRV, varies less
        from night to night, and is easier to interpret. It also carries long-
        term information. Across 46 studies and over a million people, every
        10 beats per minute higher resting heart rate was linked to about 9%
        higher all-cause mortality.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Zhang et al.", year: 2016, journal: "CMAJ",
          title: "Resting heart rate and all-cause and cardiovascular mortality in the general population: a meta-analysis",
          url: "https://pubmed.ncbi.nlm.nih.gov/26598376/",
          summary: "46 studies, 1.2 million people. Each +10 bpm resting HR: RR 1.09 for all-cause and 1.08 for CV mortality. Above 80 bpm vs lowest: RR 1.45 all-cause.",
        }]} />
      </p>
      <p>
        Short-term, a rise above your own baseline is one of the most useful
        things a wearable can show you. In one study, smartwatch data showed
        changes in 81% of people who caught COVID-19, most often a rise in
        resting heart rate, frequently before symptoms appeared.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Mishra et al.", year: 2020, journal: "Nature Biomedical Engineering",
          title: "Pre-symptomatic detection of COVID-19 from smartwatch data",
          url: "https://pubmed.ncbi.nlm.nih.gov/33208926/",
          summary: "26 of 32 infected people (81%) had changes in heart rate, steps or sleep; 63% could have been flagged before symptoms using resting-HR elevations vs personal baseline.",
        }]} />{" "}
        If your overnight resting heart rate is several beats above your usual
        for two or more nights without an obvious cause like alcohol, a late
        meal or a hard session, it&rsquo;s worth taking it easy and watching
        for illness.
      </p>
      <p>
        Low HRV measured by clinical ECG is linked to a higher risk of a first
        cardiovascular event in people without known heart disease.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Hillebrand et al.", year: 2013, journal: "Europace",
          title: "Heart rate variability and first cardiovascular event in populations without known cardiovascular disease: meta-analysis and dose-response meta-regression",
          url: "https://pubmed.ncbi.nlm.nih.gov/23370966/",
          summary: "Meta-analysis of population cohorts: low HRV associated with a 32–45% higher risk of a first cardiovascular event.",
        }]} />{" "}
        That&rsquo;s an association from clinical measurements. It
        doesn&rsquo;t mean that pushing your wearable&rsquo;s nightly score up
        will lower your risk. The things that improve both numbers
        (fitness, sleep, less alcohol, managing blood pressure) are what
        matter.
      </p>

      <Callout variant="warning" title="What a wearable can't tell you">
        HRV and readiness scores are not medical diagnostics. See a doctor
        promptly for <strong>chest pain, fainting, palpitations, a racing or
        irregular heartbeat, or breathlessness</strong>, whatever your app says.
        Also mention it if your resting heart rate is consistently above 100,
        or below about 40 with dizziness or fatigue (unless you&rsquo;re a
        well-trained endurance athlete). Arrhythmias such as atrial
        fibrillation and frequent ectopic beats can make HRV look falsely{" "}
        <em>high</em>. Beta-blockers and some other heart medications change
        both heart rate and HRV, so compare readings only within the same
        treatment.
      </Callout>

      <h2>Frequently Asked Questions</h2>

      <h3>What is a good HRV?</h3>
      <p>
        There isn&rsquo;t a universal good number. HRV depends heavily on age,
        sex, genetics, the device and the measurement window. A &ldquo;good&rdquo;
        HRV is one that sits in or above your usual range and holds steady or
        rises over months as your fitness and sleep improve.
      </p>

      <h3>Why is my HRV so much lower than my partner&rsquo;s?</h3>
      <p>
        Probably for reasons unrelated to health: age, sex, genetics, body size
        or a different device and algorithm. Comparing between people is
        almost meaningless. Compare yourself with your own baseline.
      </p>

      <h3>Should I skip training when my HRV is low?</h3>
      <p>
        One low night: usually no. Several days below your range, especially
        with a raised resting heart rate or feeling unwell: swap hard sessions
        for easy ones or rest until it recovers. That&rsquo;s the approach
        tested in HRV-guided training studies.
      </p>

      <h3>Is a ring, watch or chest strap best?</h3>
      <p>
        For overnight HRV and resting heart rate, rings and watches that
        measure during stillness can do well, and accuracy varies more by
        model than by form. For HRV during exercise or short morning readings,
        an ECG chest strap is the most accurate consumer option. Pick one
        device and stick with it.
      </p>

      <h3>Why does my HRV drop after drinking, even one drink?</h3>
      <p>
        Alcohol raises sympathetic activity and heart rate during the first
        part of the night, even at low doses. It&rsquo;s one of the most
        consistent effects wearables pick up, and a useful personal experiment
        if you want to see the effect for yourself.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        HRV is a real window into your nervous system, but a narrow and noisy
        one. Use it as a personal trend with a 7-day average, respond to
        multi-day drops rather than single nights, and pair it with resting
        heart rate, which is more accurate and often more informative.
        Don&rsquo;t compare numbers with other people, don&rsquo;t trust
        sleep-stage charts much, and don&rsquo;t let a score override your own
        judgement or medical advice.
      </p>
      <p>
        Explore more in the <a href="https://app.formulate-health.app/learning/track/body?utm_source=landing&utm_medium=guide_body&utm_campaign=hrv-explained-wearables">Body learning track</a>{" "}
        and the <Link href="/learn/watches-trackers">watches and trackers reference page</Link>.
        Wearables can&rsquo;t take a proper blood pressure reading yet. Our{" "}
        <Link href="/guides/how-to-measure-blood-pressure-at-home">home blood pressure guide</Link>{" "}
        explains why.
      </p>
      <p>
        <a href="https://app.formulate-health.app/body">
          Compare rings, watches and chest straps in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
