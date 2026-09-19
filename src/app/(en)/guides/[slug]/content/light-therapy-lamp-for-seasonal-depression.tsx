import Link from "next/link";
import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function LightTherapyLampForSeasonalDepression() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "Bright light therapy is an established treatment for seasonal affective disorder, with response rates similar to an antidepressant in a head-to-head trial",
          "The standard dose is 10,000 lux for about 30 minutes, early in the morning, every day through the dark months. Most people notice a change within 1–2 weeks",
          "It also helps non-seasonal depression: in a placebo-controlled trial, light alone beat placebo and light plus an antidepressant did best",
          "The 10,000 lux has to reach your eyes at your actual sitting distance. Many cheap boxes only reach it at the surface",
          "Bipolar disorder needs medical supervision because light can trigger hypomania, and a SAD lamp is not the same thing as a red light device",
        ]}
      />

      <p>
        For some people, autumn brings more than shorter days. Energy drops,
        sleep gets longer, carbohydrate cravings rise, and mood sinks, then
        lifts again in spring. When that pattern meets the criteria for major
        depression, it&rsquo;s called <strong>seasonal affective disorder
        (SAD)</strong>, or depression with a seasonal pattern. It affects
        roughly 1.5&ndash;9% of people depending on latitude, and many more
        have a milder version.
      </p>
      <p>
        Bright light therapy has been used for SAD for over 30 years, and
        it&rsquo;s one of the few non-drug treatments in psychiatry with solid
        randomised evidence. It only works properly with the right intensity,
        timing and device, though, and it isn&rsquo;t safe for everyone to use
        unsupervised.
      </p>

      <Callout variant="warning" title="If you are struggling now">
        A light box is a treatment for a diagnosable condition, not a
        substitute for care. If your low mood is severe, lasts more than two
        weeks, or you have thoughts of harming yourself, contact a doctor or
        mental health service. In the US you can call or text 988. Elsewhere,
        contact your local emergency number or crisis line.
      </Callout>

      <h2>The Short Answer</h2>
      <p>
        Sit near a light box that delivers <strong>10,000 lux at your
        eyes</strong> for <strong>about 30 minutes each morning</strong>, soon
        after you wake, every day from when symptoms usually start until
        spring. You don&rsquo;t stare at it. You read, eat or work with it in
        your field of view. If you have bipolar disorder, a retinal condition,
        or take photosensitising medication, get medical advice first.
      </p>

      <h2>What the Evidence Shows</h2>

      <h3>Seasonal affective disorder</h3>
      <p>
        A 2005 meta-analysis of randomised trials found that bright light
        substantially reduced depression severity in SAD, with an effect size
        of 0.84, similar to or larger than many antidepressant trials. Dawn
        simulation (a light that slowly brightens before you wake) also
        worked, based on fewer studies.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Golden et al.", year: 2005, journal: "American Journal of Psychiatry",
          title: "The efficacy of light therapy in the treatment of mood disorders: a review and meta-analysis of the evidence",
          url: "https://pubmed.ncbi.nlm.nih.gov/15800134/",
          summary: "Bright light for SAD: effect size 0.84 (8 studies). Dawn simulation for SAD: 0.73 (5 studies). Bright light for non-seasonal depression: 0.53 (3 studies). Only 13% of studies met quality criteria.",
        }]} />
      </p>
      <p>
        A 2020 meta-analysis of 19 trials found a smaller but still clear
        benefit. People were 42% more likely to respond with bright light
        than with placebo light, though the authors noted moderate-to-high
        risk of bias in the studies.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Pjrek et al.", year: 2020, journal: "Psychotherapy and Psychosomatics",
          title: "The Efficacy of Light Therapy in the Treatment of Seasonal Affective Disorder: A Meta-Analysis of Randomized Controlled Trials",
          url: "https://pubmed.ncbi.nlm.nih.gov/31574513/",
          summary: "19 RCTs. Bright light vs placebo: SMD −0.37 for depression scores; response RR 1.42. Heterogeneous, small-to-medium trials.",
        }]} />{" "}
        Part of the reason estimates vary is that a convincing placebo is hard
        to design. People know when a light is bright.
      </p>
      <p>
        In the Canadian CAN-SAD trial, 10,000 lux light for 30 minutes each
        morning matched a standard antidepressant: 67% of people responded in
        each group. Light worked faster in the first week and had fewer side
        effects.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Lam et al.", year: 2006, journal: "American Journal of Psychiatry",
          title: "The Can-SAD study: a randomized controlled trial of the effectiveness of light therapy and fluoxetine in patients with winter seasonal affective disorder",
          url: "https://pubmed.ncbi.nlm.nih.gov/16648320/",
          summary: "96 patients, 8 weeks. 10,000 lux × 30 min + placebo pill vs dim light + fluoxetine 20 mg: response 67% in both; light faster at week 1 with fewer adverse effects.",
        }]} />
      </p>

      <h3>Non-seasonal depression</h3>
      <p>
        Light therapy isn&rsquo;t only for winter. In an 8-week double-blind
        trial of adults with ordinary (non-seasonal) major depression, 30
        minutes of 10,000 lux light each morning beat placebo. Combining light
        with an antidepressant produced the best results, with 76% responding,
        compared with 33% on placebo.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Lam et al.", year: 2016, journal: "JAMA Psychiatry",
          title: "Efficacy of Bright Light Treatment, Fluoxetine, and the Combination in Patients With Nonseasonal Major Depressive Disorder: A Randomized Clinical Trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/26580307/",
          summary: "122 adults with non-seasonal MDD. Response: placebo 33%, fluoxetine 29%, light 50%, combination 76%. Light and combination significantly better than placebo.",
        }]} />{" "}
        For non-seasonal depression, light works best as part of treatment
        planned with a clinician, not as a replacement for it.
      </p>

      <h3>Prevention</h3>
      <p>
        Starting light therapy before symptoms appear sounds sensible, but it
        has barely been studied. A Cochrane review found a single small trial
        and couldn&rsquo;t draw conclusions.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Nussbaumer-Streit et al.", year: 2019, journal: "Cochrane Database of Systematic Reviews",
          title: "Light therapy for preventing seasonal affective disorder",
          url: "https://pubmed.ncbi.nlm.nih.gov/30883670/",
          summary: "Only one RCT (46 people) met criteria; very low-quality evidence. No conclusion possible on preventive light therapy.",
        }]} />{" "}
        Many people with a clear yearly pattern start at the first sign of
        symptoms rather than months before.
      </p>

      <h2>The Dose: 10,000 Lux for 30 Minutes</h2>
      <p>
        Lux measures how much visible light lands on a surface. For
        comparison, typical indoor lighting is a few hundred lux, and daylight
        outdoors runs from several thousand lux on an overcast day to far more
        in sunshine. The standard therapeutic dose came from trials comparing
        intensities and durations. In one, <strong>10,000 lux for 30
        minutes</strong> in the early morning produced remission in 75% of
        patients, compared with 19% for 3,000 lux and 25% for evening
        sessions. It roughly matched the older protocol of 2,500 lux for two
        hours.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Terman et al.", year: 1990, journal: "Psychopharmacology Bulletin",
          title: "Efficacy of brief, intense light exposure for treatment of winter depression",
          url: "https://pubmed.ncbi.nlm.nih.gov/2371371/",
          summary: "Crossover trials: remission 75% with 10,000 lux × 30 min in the morning vs 25% in the evening and 19% at 3,000 lux. 10,000 lux × 30 min ≈ 2,500 lux × 2 h.",
        }]} />
      </p>
      <p>
        That reciprocity is useful. If your box gives a lower intensity at a
        comfortable distance, you need longer sessions. A 5,000-lux position,
        for example, would need roughly an hour. Intensity and time trade off,
        but only within limits. A dim lamp for a very long time won&rsquo;t
        reach the same effect.
      </p>

      <h2>Timing: Early Morning, Relative to Your Sleep</h2>
      <p>
        Morning light moves your body clock earlier, and that shift seems to be
        part of how it works. In one study, the antidepressant effect was
        strongest when light came about 2.5 hours after the midpoint of the
        person&rsquo;s sleep. For most people, that means{" "}
        <strong>within the first hour after waking</strong>.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Terman et al.", year: 2001, journal: "Archives of General Psychiatry",
          title: "Circadian time of morning light administration and therapeutic response in winter depression",
          url: "https://pubmed.ncbi.nlm.nih.gov/11146760/",
          summary: "Early-morning light (in circadian time) beat late-morning and evening light; optimal ~8.5 h after melatonin onset, or ~2.5 h after mid-sleep.",
        }]} />
      </p>
      <p>
        So if you sleep 11 pm to 7 am (midpoint 3 am), light at around 6:30
        to 7:30 am fits. If you&rsquo;re a late sleeper, time it from your own
        waking, not the clock. Evening sessions are less effective for most
        people and can delay sleep, causing insomnia.
      </p>

      <h2>Distance and Position</h2>
      <p>
        The lux rating depends on distance. Light from a small box falls off
        quickly as you move away, so a box rated at 10,000 lux at 30 cm may
        give well under half that at 60 cm. Practical rules:
      </p>
      <ul>
        <li>
          Sit at the distance the maker specifies for 10,000 lux, usually
          somewhere between 30 and 60 cm.
        </li>
        <li>
          Place the light slightly above eye level and angled down, off to one
          side of your line of sight, the way daylight comes from the sky.
          This reduces glare.
        </li>
        <li>
          Keep your eyes open and the light in your field of view. You
          don&rsquo;t need to look at it, and shouldn&rsquo;t stare.
        </li>
        <li>
          Stay put. Walking around the room while the lamp runs means you get
          a fraction of the dose.
        </li>
      </ul>

      <h2>What Makes a Box Qualify</h2>
      <p>
        There is no single regulatory standard for &ldquo;SAD lamps&rdquo;, so
        read the specs. A qualifying box should have:
      </p>
      <ul>
        <li>
          <strong>10,000 lux at a stated, realistic sitting distance.</strong>{" "}
          A figure given at the surface of the lamp, or with no distance, is
          not useful.
        </li>
        <li>
          <strong>White light.</strong> The trials used white (usually
          fluorescent, now often LED) light. You don&rsquo;t need
          &ldquo;full spectrum&rdquo; branding.
        </li>
        <li>
          <strong>UV filtering.</strong> The therapeutic effect is from
          visible light through the eyes. UV adds only risk to the skin and eyes.
        </li>
        <li>
          <strong>A large, diffused surface.</strong> Bigger panels keep the
          dose steady if you move slightly, and diffusers cut glare. Small
          handheld or clip-on units rarely deliver 10,000 lux at a usable
          distance.
        </li>
        <li>
          <strong>A stand that tilts</strong> so the light comes from above.
        </li>
      </ul>
      <p>
        Be cautious with blue-only devices and light glasses. They can work
        at lower lux because the body clock is most sensitive to blue light,
        but they have fewer trials and raise more questions about retinal
        exposure. Dawn simulators are a reasonable option for people who find
        morning sessions hard to fit in, based on the smaller evidence base
        above.
      </p>

      <h2>Safety and Side Effects</h2>
      <p>
        Most side effects are mild and settle within days: headache, eye
        strain, nausea, feeling wired or jittery, and trouble sleeping if you
        use the light too late in the day. Reducing the session length or
        sitting a little further away usually helps.
      </p>
      <p>
        Long-term eye safety looks reassuring. In people using 10,000-lux
        light boxes for 3&ndash;6 winters, eye examinations showed no damage.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Gallin et al.", year: 1995, journal: "American Journal of Ophthalmology",
          title: "Ophthalmologic examination of patients with seasonal affective disorder, before and after bright light therapy",
          url: "https://pubmed.ncbi.nlm.nih.gov/7832227/",
          summary: "50 patients at 10,000 lux × 30 min; 17 followed 3–6 years. No ocular abnormalities. Periodic eye exams advised for pre-existing eye disease or photosensitising drugs.",
        }]} />{" "}
        That study still advised periodic eye checks for people with existing
        eye disease or on photosensitising drugs.
      </p>

      <Callout variant="warning" title="Bipolar disorder and other cautions">
        <p>
          <strong>Bipolar disorder:</strong> light therapy can help bipolar
          depression, but it can also trigger hypomania or mania, especially
          early in treatment. In a controlled trial, midday light alongside
          mood-stabilising medication improved remission without mood
          switches. International bipolar guidance recommends anti-manic
          medication and clinical monitoring, starting with 15 minutes and
          building up slowly.{" "}
          <EvidenceBadge level="moderate" studies={[
            {
              authors: "Sit et al.", year: 2018, journal: "American Journal of Psychiatry",
              title: "Adjunctive Bright Light Therapy for Bipolar Depression: A Randomized Double-Blind Placebo-Controlled Trial",
              url: "https://pubmed.ncbi.nlm.nih.gov/28969438/",
              summary: "46 patients on antimanic medication. Midday 7,000-lux light vs dim red placebo: remission 68% vs 22%; no mood polarity switches.",
            },
            {
              authors: "Geoffroy et al.", year: 2025, journal: "Dialogues in Clinical Neuroscience",
              title: "Light therapy for bipolar disorders: Clinical recommendations from the international society for bipolar disorders (ISBD) Chronobiology and Chronotherapy Task Force",
              url: "https://pubmed.ncbi.nlm.nih.gov/40705857/",
              summary: "Recommends anti-manic prophylaxis and monitoring; morning or midday light; start at 15 min/day and increase by 15 min weekly if wary of hypomania.",
            },
          ]} />{" "}
          Don&rsquo;t start a light box on your own if you have bipolar
          disorder.
        </p>
        <p>
          <strong>Eyes:</strong> talk to an eye specialist first if you have
          retinal disease (such as macular degeneration or diabetic
          retinopathy), glaucoma or cataracts, or have had eye surgery.
        </p>
        <p>
          <strong>Medications:</strong> photosensitising drugs (including St
          John&rsquo;s wort, some antibiotics, and some antipsychotics) may make
          bright light riskier for the eyes and skin. Ask your pharmacist.
        </p>
      </Callout>

      <h2>Not the Same as Red Light Therapy</h2>
      <p>
        People often confuse the two. A SAD lamp is{" "}
        <strong>bright white visible light aimed at your eyes</strong> to act on
        your body clock and mood. Red and near-infrared light therapy aims
        light at skin and tissue, at far lower brightness, and you should
        protect your eyes from it. A red panel won&rsquo;t treat SAD, and a
        SAD lamp won&rsquo;t do what red light marketing claims. See our{" "}
        <Link href="/guides/red-light-therapy-evidence">red light therapy guide</Link>{" "}
        for that side.
      </p>

      <h2>How to Tell If It&rsquo;s Working</h2>
      <p>
        Rate your mood, energy and sleep once a week using a simple scale or a
        standard questionnaire your clinician uses. Improvement usually starts
        within 1&ndash;2 weeks, with a full response by about 4&ndash;6 weeks.
        If nothing has changed after two to four weeks of correct use (right
        lux, right distance, right time, every day), talk to your clinician
        about adjusting the timing or duration, or adding other treatment.
        Symptoms often come back if you stop early, so most people continue
        until their usual spring recovery.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Can I use my light box in the evening?</h3>
      <p>
        For most people, no. Evening bright light pushes your body clock later,
        which can cause insomnia and was less effective in trials. A small
        group of people who wake very early and feel sleepy in the early
        evening may benefit from evening light, but that&rsquo;s a decision to
        make with a sleep or mood specialist.
      </p>

      <h3>Can I just use a bright ordinary lamp or sit by a window?</h3>
      <p>
        Ordinary household lamps give a few hundred lux at your eyes, far below
        the therapeutic dose. Outdoor daylight is much brighter, even when
        overcast, and a morning walk outside is a good habit. It&rsquo;s less
        reliable than a box on dark winter mornings, and sitting behind a
        window cuts the light you receive.
      </p>

      <h3>Does it help if I just have the &ldquo;winter blues&rdquo;?</h3>
      <p>
        Many people with milder seasonal symptoms use light boxes and report
        benefit. The strongest evidence comes from people who meet criteria for
        SAD, though. For milder symptoms, it&rsquo;s a low-risk thing to try if
        you don&rsquo;t have bipolar disorder or eye disease.
      </p>

      <h3>Is a sunrise alarm clock enough?</h3>
      <p>
        Dawn simulation showed benefit in the 2005 meta-analysis, based on five
        small studies. It&rsquo;s a reasonable option if you can&rsquo;t sit
        with a light box in the morning. Most sunrise alarms are much dimmer than
        research dawn simulators, and their effect is less certain.
      </p>

      <h3>Can I use light therapy while taking antidepressants?</h3>
      <p>
        Yes, and in the non-seasonal depression trial the combination worked
        best. Tell your prescriber, especially if you take any drug that makes
        your skin or eyes sensitive to light, or if you have ever had a manic
        or hypomanic episode.
      </p>

      <h3>Will it help my sleep?</h3>
      <p>
        Morning bright light helps anchor your body clock, which often makes
        it easier to fall asleep at night and wake in the morning. That&rsquo;s
        a secondary benefit. For more on the timing side, see the{" "}
        <a href="https://app.formulate-health.app/learning/track/sleep?utm_source=landing&utm_medium=guide_body&utm_campaign=light-therapy-lamp-for-seasonal-depression">Sleep learning track</a> and our{" "}
        <Link href="/guides/best-sleep-supplement-protocol">sleep protocol guide</Link>.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        For seasonal affective disorder, a proper light box is one of the best
        supported treatments available, and it has good evidence for
        non-seasonal depression as well. The details decide whether it works:
        10,000 lux measured at your eyes, about 30 minutes, early in the
        morning, every day through the season. Buy a box that states its lux at
        a realistic distance. Get medical advice first if you have bipolar
        disorder, eye disease or take photosensitising drugs, and treat severe
        depression as a medical problem, with light as one tool among several.
      </p>
      <p>
        See the <Link href="/learn/light-therapy">light therapy reference page</Link>{" "}
        and the <a href="https://app.formulate-health.app/learning/track/therapies?utm_source=landing&utm_medium=guide_body&utm_campaign=light-therapy-lamp-for-seasonal-depression">Therapies learning track</a>.
      </p>
      <p>
        <a href="https://app.formulate-health.app/therapies">
          Compare light therapy lamps in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
