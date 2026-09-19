import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function SmartScaleBodyFatAccuracy() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "A smart scale weighs you accurately. Its body-fat figure is an estimate from a tiny electrical current plus an equation, and can be several percentage points off for an individual",
          "Hydration moves the number: drinking 2 litres of water raised measured body fat by 1–3 percentage points in one study. Measure at the same time, in the same state, and watch the trend",
          "Waist-to-height ratio is a cheap, well-validated measure of risky central fat. UK guidance says keep your waist under half your height",
          "BMI is a population screening tool, not a diagnosis. A 2025 Lancet Commission said excess fat should be confirmed with waist measures or direct body-fat measurement",
          "Don’t use the body-composition mode if you have a pacemaker, defibrillator or other implanted electronic device, or are pregnant, unless the maker says it’s safe. Use weight-only mode instead",
        ]}
      />

      <p>
        Smart scales promise far more than weight: body-fat percentage, muscle
        mass, water, bone mass, visceral fat, even a &ldquo;metabolic
        age&rdquo;. All of that comes from a few metal pads under your feet
        and some maths. Some of those numbers are useful if you understand
        them, and some are closer to decoration.
      </p>
      <p>
        This guide explains what the scale actually measures, how accurate it
        is compared with lab methods, why your body fat seems to change after
        a glass of water, and why a tape measure may tell you more.
      </p>

      <h2>The Short Answer</h2>
      <p>
        Trust the <strong>weight</strong>. Treat the{" "}
        <strong>body-fat percentage</strong> as a rough estimate that&rsquo;s
        more useful for spotting a trend over weeks than for giving a true
        value on any single day. Measure under the same conditions every time,
        and look at weekly averages. For a quick, well-validated read on
        health risk, measure your <strong>waist-to-height ratio</strong> once a
        month. If you have an implanted cardiac device or are pregnant, use
        weight-only mode.
      </p>

      <h2>What a Smart Scale Actually Measures</h2>
      <p>
        Weight is a direct measurement, and even inexpensive scales do it well.
        Everything else uses <strong>bioelectrical impedance analysis
        (BIA)</strong>. The scale passes a very small, painless current
        between the electrodes and measures how much the body resists it.
        Water-rich lean tissue conducts well, and fat conducts poorly.
      </p>
      <p>
        The scale doesn&rsquo;t measure fat directly. It measures impedance,
        estimates total body water, converts that to fat-free mass using an
        equation built on a reference population and your height, age and
        sex, and then subtracts from your weight to get fat.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Kyle et al.", year: 2004, journal: "Clinical Nutrition",
          title: "Bioelectrical impedance analysis--part I: review of principles and methods",
          url: "https://pubmed.ncbi.nlm.nih.gov/15380917/",
          summary: "BIA estimates total body water and fat-free mass validly only in people without significant fluid abnormalities, using population-appropriate equations and standard procedures.",
        }]} />{" "}
        That has consequences:
      </p>
      <ul>
        <li>
          <strong>Foot-to-foot scales</strong> send the current up one leg and
          down the other, so they mostly &ldquo;see&rdquo; your legs and
          estimate the upper body.
        </li>
        <li>
          <strong>Eight-electrode scales</strong>, with a hand-held bar, pass
          current through arms, trunk and legs and tend to do better.
        </li>
        <li>
          <strong>Muscle mass, bone mass, visceral fat and metabolic age</strong>{" "}
          are further estimates derived from the same reading. None is
          measured independently.
        </li>
        <li>
          <strong>Equations fit averages.</strong> Very muscular people, older
          adults, people with obesity and some ethnic groups are often
          estimated less accurately.
        </li>
      </ul>

      <h2>How Accurate Is the Body-Fat Number?</h2>
      <p>
        The most useful recent study compared 15 BIA devices, 14 of them
        consumer models, with a laboratory four-compartment model, which
        combines DEXA with other methods and is more accurate than DEXA alone. The devices were highly repeatable, but
        their average error ranged from about 3.5 percentage points too low to
        nearly 12 too high. Individual estimates were typically off by 3 to 7.5
        points.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Siedler et al.", year: 2023, journal: "British Journal of Nutrition",
          title: "Assessing the reliability and cross-sectional and longitudinal validity of fifteen bioelectrical impedance analysis devices",
          url: "https://pubmed.ncbi.nlm.nih.gov/36404739/",
          summary: "73 adults vs a 4-compartment model. Precision error 0–0.5%; constant error −3.5 to +11.7 points; SEE 3.1–7.5 points. Tracking change was better (SEE 1.7–2.6), especially for octapolar and some foot-to-foot models.",
        }]} />
      </p>
      <p>
        So if a scale says 25%, your true value might plausibly be anywhere
        from about 20% to 30%, and one brand can read consistently higher than
        another. The same study found that{" "}
        <strong>tracking change over 12&ndash;16 weeks</strong> was more
        accurate than any single reading, especially for eight-electrode and
        better foot-to-foot models. That&rsquo;s the realistic use: the same
        scale, the same conditions, the direction of travel.
      </p>
      <p>
        Wrist-worn BIA has reached a similar place. In one study, smartwatch
        estimates of fat-free mass agreed closely with a laboratory BIA device
        after correcting for a systematic bias, but were less precise than
        DEXA.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Bennett et al.", year: 2022, journal: "The American Journal of Clinical Nutrition",
          title: "Next-generation smart watches to estimate whole-body composition using bioimpedance analysis: accuracy and precision in a diverse, multiethnic sample",
          url: "https://pubmed.ncbi.nlm.nih.gov/35883219/",
          summary: "75 adults. After correcting systematic bias, watch BIA fat-free mass agreed with lab 8-electrode BIA (CCC 0.97); precision lower than DEXA.",
        }]} />
      </p>

      <Callout variant="info" title="DEXA isn't perfect either">
        DEXA scans are often treated as the gold standard, but they are also
        affected by hydration, recent meals and exercise, and different
        machines disagree. For athletes, some sports scientists argue that
        skinfold measurements by the same trained tester track change more
        reliably day to day.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Kasper et al.", year: 2021, journal: "Nutrients",
          title: "Come Back Skinfolds, All Is Forgiven: A Narrative Review of the Efficacy of Common Body Composition Methods in Applied Sports Practice",
          url: "https://pubmed.ncbi.nlm.nih.gov/33806245/",
          summary: "Review of body composition methods: DEXA needs control of food, exercise and hydration; skinfolds least affected by day-to-day variability.",
        }]} />
      </Callout>

      <h2>Why Hydration Changes Your Body Fat</h2>
      <p>
        Because BIA is really measuring water, anything that shifts your
        body water shifts the fat estimate. In one experiment, drinking 2
        litres of water increased measured body fat by 1.3&ndash;2.6
        percentage points on BIA devices. The devices counted the extra mass as
        fat.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Jeong et al.", year: 2023, journal: "The Journal of Sports Medicine and Physical Fitness",
          title: "The effect of acute hydration on body composition assessed by multi-frequency and single-frequency bioelectrical impedance",
          url: "https://pubmed.ncbi.nlm.nih.gov/37335581/",
          summary: "39 adults before and after 2 L of water: BIA body fat rose 1.3–2.6 percentage points; BIA misclassified the added water mass as fat.",
        }]} />{" "}
        Exercise, sweating, a sauna, alcohol, a salty meal, and where you are
        in your menstrual cycle can all move the number in a similar way, in
        either direction.
      </p>
      <p>
        To make readings comparable:
      </p>
      <ul>
        <li>Weigh first thing in the morning, after using the toilet, before eating, drinking or exercising.</li>
        <li>Stand barefoot on clean, dry feet (lotion and wet feet both change contact), with weight spread evenly.</li>
        <li>Put the scale in the same place, on a hard, level floor, not carpet.</li>
        <li>Compare weekly averages, not single days.</li>
      </ul>

      <h2>Waist-to-Height Ratio: The Better Cheap Metric</h2>
      <p>
        Where you carry fat matters more for health than how much you weigh.
        Fat around the abdomen and organs is closely linked to diabetes, high
        blood pressure and heart disease. A tape measure captures that
        directly.
      </p>
      <p>
        A meta-analysis of studies involving more than 300,000 adults found
        that <strong>waist-to-height ratio</strong> identified cardiometabolic
        risk better than waist circumference alone and better than BMI, in men
        and women and across ethnic groups.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Ashwell et al.", year: 2012, journal: "Obesity Reviews",
          title: "Waist-to-height ratio is a better screening tool than waist circumference and BMI for adult cardiometabolic risk factors: systematic review and meta-analysis",
          url: "https://pubmed.ncbi.nlm.nih.gov/22106927/",
          summary: "31 studies, >300,000 adults. Waist-to-height ratio discriminated diabetes, hypertension and CVD risk better than waist circumference and BMI in both sexes.",
        }]} />{" "}
        UK guidance from NICE, updated in 2022, uses these bands for adults
        with a BMI under 35:
      </p>
      <table>
        <thead>
          <tr>
            <th>Waist-to-height ratio</th>
            <th>Central adiposity</th>
            <th>Health risk</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0.40&ndash;0.49</td>
            <td>Healthy</td>
            <td>No increased risk</td>
          </tr>
          <tr>
            <td>0.50&ndash;0.59</td>
            <td>Increased</td>
            <td>Increased risk</td>
          </tr>
          <tr>
            <td>0.60 or more</td>
            <td>High</td>
            <td>Further increased risk</td>
          </tr>
        </tbody>
      </table>
      <p>
        The message NICE suggests giving people is simple:{" "}
        <strong>keep your waist to less than half your height</strong>. It
        applies to both sexes, all ethnicities, and adults with high muscle
        mass (
        <a href="https://www.nice.org.uk/guidance/ng246/chapter/Identifying-and-assessing-overweight-obesity-and-central-adiposity">NICE NG246</a>
        ).
      </p>
      <p>
        <strong>How to measure:</strong> find the bottom of your lowest rib
        and the top of your hip bone. Wrap the tape around your waist halfway
        between them, breathe out normally, and read it without pulling tight.
        Divide by your height in the same units. For example, 86 cm &divide; 175 cm
        = 0.49.
      </p>

      <h2>What BMI Can and Can&rsquo;t Tell You</h2>
      <p>
        BMI (weight in kg divided by height in metres squared) is quick and
        useful for tracking populations. For individuals, it can call a
        muscular person &ldquo;overweight&rdquo; and miss someone with a normal
        BMI but a lot of abdominal fat. In 2025, a Lancet Commission of 58
        experts recommended using BMI only as a screening or population
        measure. Excess fat should be confirmed with at least one other
        measure, such as waist circumference or waist-to-height ratio, or with
        direct body-fat measurement. The Commission also separated{" "}
        <em>preclinical</em> obesity (excess fat, organs still working
        normally) from <em>clinical</em> obesity (excess fat already causing
        illness).{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Rubino et al.", year: 2025, journal: "The Lancet Diabetes & Endocrinology",
          title: "Definition and diagnostic criteria of clinical obesity",
          url: "https://pubmed.ncbi.nlm.nih.gov/39824205/",
          summary: "Lancet Commission (58 experts): BMI only as a population or screening measure; confirm excess adiposity with direct measurement or anthropometric criteria such as waist; defines clinical vs preclinical obesity.",
        }]} />
      </p>
      <p>
        UK guidance also recommends lower BMI thresholds (overweight from 23,
        obesity from 27.5) for people of South Asian, Chinese, other Asian,
        Middle Eastern, Black African or African-Caribbean background, who
        tend to develop cardiometabolic risk at lower BMI.
      </p>

      <h2>Safety: Implants, Pregnancy and Eating Disorders</h2>

      <Callout variant="warning" title="When not to use body-composition mode">
        <p>
          <strong>Pacemakers, defibrillators and other implanted electronic
          devices:</strong> scale manufacturers tell people with these not to
          use BIA. A 2025 systematic review found no device interference with{" "}
          <em>clinical-grade</em> BIA in 531 patients with cardiac devices, but
          the authors cautioned against extrapolating that to consumer
          devices, and consumer scales weren&rsquo;t studied.{" "}
          <EvidenceBadge level="emerging" studies={[{
            authors: "Uribe-Cavero et al.", year: 2025, journal: "Heart Rhythm O2",
            title: "Safety of bioelectrical impedance analysis in patients with cardiac implantable electronic devices: A systematic review",
            url: "https://pubmed.ncbi.nlm.nih.gov/41541720/",
            summary: "6 cohort studies, 531 patients with pacemakers/ICDs/CRT-D: no interference with clinical-grade BIA. Authors caution against extrapolating to consumer-grade wearables.",
          }]} />{" "}
          Follow your device clinic&rsquo;s and the scale maker&rsquo;s advice,
          and use weight-only mode. The same applies to neurostimulators,
          insulin pumps and similar implants unless the maker says otherwise.
        </p>
        <p>
          <strong>Pregnancy:</strong> body-fat estimates are not valid during
          pregnancy because body water changes so much, and most makers advise
          against BIA mode. Weight alone is fine.
        </p>
        <p>
          <strong>Eating disorders:</strong> daily weight and body-fat numbers
          can feed obsessive checking. If you have, or have had, an eating
          disorder, decide with your care team whether to use a scale at all.
        </p>
      </Callout>

      <p>
        Children and teenagers are still growing, and adult BIA equations
        don&rsquo;t apply. Leave body-fat estimates for children to a
        clinician.
      </p>

      <h2>How to Use Weight Trends</h2>
      <p>
        Day-to-day weight bounces by a kilo or more with water, salt,
        carbohydrate stores and gut contents. A single morning tells you very
        little. The trend tells you a lot.
      </p>
      <ul>
        <li>
          <strong>Use a 7-day average.</strong> Compare this week&rsquo;s
          average with last week&rsquo;s. Most apps can show a moving average.
        </li>
        <li>
          <strong>Expect a weekly rhythm.</strong> In one study of people
          weighing daily, weight rose over the weekend and fell during the
          week. People who reversed the weekend rise were the ones who lost or
          maintained weight.{" "}
          <EvidenceBadge level="emerging" studies={[{
            authors: "Orsama et al.", year: 2014, journal: "Obesity Facts",
            title: "Weight rhythms: weight increases during weekends and decreases during weekdays",
            url: "https://pubmed.ncbi.nlm.nih.gov/24504358/",
            summary: "Daily weighers were heaviest Sunday–Monday and lightest later in the week; weekday compensation was strongest in those who lost or maintained weight.",
          }]} />
        </li>
        <li>
          <strong>Daily weighing can help weight loss</strong> for people who
          find it motivating rather than stressful. Among people in one
          weight-loss trial, those who weighed daily lost more weight and
          adopted more weight-control habits.{" "}
          <EvidenceBadge level="emerging" studies={[{
            authors: "Steinberg et al.", year: 2015, journal: "Journal of the Academy of Nutrition and Dietetics",
            title: "Weighing every day matters: daily weighing improves weight loss and adoption of weight control behaviors",
            url: "https://pubmed.ncbi.nlm.nih.gov/25683820/",
            summary: "47 adults over 6 months: daily weighers lost 6.1 kg more than those weighing less often and adopted more weight-control behaviours. Secondary analysis.",
          }]} />
        </li>
        <li>
          <strong>Pair weight with waist.</strong> If you&rsquo;re strength
          training, weight may stay flat while your waist shrinks. That&rsquo;s
          progress the scale alone would miss. Our guide to{" "}
          <a href="/guides/sarcopenia-reverse-muscle-loss">preventing muscle loss</a>{" "}
          explains why muscle matters more with age.
        </li>
        <li>
          <strong>Unintended weight loss</strong> of around 5% or more over
          6&ndash;12 months without trying is a reason to see a doctor.
        </li>
      </ul>

      <h2>What to Look for in a Scale</h2>
      <ul>
        <li><strong>Consistent weight readings:</strong> step on three times in a row and the numbers should match closely.</li>
        <li><strong>A weight-only or &ldquo;BIA off&rdquo; mode</strong> for pregnancy, implants, or simply not wanting body-fat numbers.</li>
        <li><strong>Eight electrodes (hand-held bar)</strong> if body composition trends matter to you. They generally did better than foot-only models.</li>
        <li><strong>Multi-user profiles</strong> that assign readings correctly, so your trend isn&rsquo;t mixed with someone else&rsquo;s.</li>
        <li><strong>Data export and a clear privacy policy.</strong> Body data is sensitive, and you should be able to take it with you.</li>
      </ul>
      <p>
        Be sceptical of &ldquo;metabolic age&rdquo;, &ldquo;protein
        percentage&rdquo; and heart-health scores from a scale. They are
        derived from the same impedance reading and aren&rsquo;t validated as
        independent measurements.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Why did my body fat jump after a big dinner or a workout?</h3>
      <p>
        Your fat didn&rsquo;t change overnight. Food, fluid, salt and sweat
        change your body water and the path the current takes, and the equation
        reads that as a change in fat. That&rsquo;s why the same-conditions
        routine and weekly averages matter.
      </p>

      <h3>Is the visceral fat reading real?</h3>
      <p>
        It&rsquo;s an estimate, not a measurement, and a foot-to-foot scale
        barely passes current through your abdomen. Waist-to-height ratio is a
        better practical guide to abdominal fat. Imaging such as DEXA, CT or
        MRI measures it directly.
      </p>

      <h3>Can a scale track muscle gain?</h3>
      <p>
        Only roughly. Muscle holds water, so gains and losses do show up in
        impedance, but a few hundred grams of real muscle change is within the
        error. Strength numbers, photos and waist and limb measurements are
        more reliable signals over a few months.
      </p>

      <h3>Is a DEXA scan worth it?</h3>
      <p>
        If you want a baseline, a regional breakdown or bone density, a DEXA
        scan is the most informative practical option. Repeat it on the same
        machine under the same conditions (fasted, not after exercise) if you
        want to compare. For most people, a waist measurement and a weight
        trend answer the practical question.
      </p>

      <h3>How often should I weigh myself?</h3>
      <p>
        Daily if it helps you and doesn&rsquo;t cause distress, weekly if you
        prefer. Either way, judge the average, not the day. For waist, once a
        month is plenty.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        A smart scale is a good scale and a rough body-fat estimator. The fat
        percentage can be several points off, moves with hydration, and is
        most useful as a trend measured under the same conditions. For health
        risk, a tape measure and a waist-to-height ratio under 0.5 tell you
        more than BMI or a scale&rsquo;s visceral fat score. Use weight-only
        mode if you have an implanted electronic device or are pregnant, and
        judge progress by weekly averages.
      </p>
      <p>
        See the <a href="https://app.formulate-health.app/learning/track/body?utm_source=landing&utm_medium=guide_body&utm_campaign=smart-scale-body-fat-accuracy">Body learning track</a> and the{" "}
        <a href="/learn/smart-scales">smart scale reference page</a>,
        or learn to read another home measurement properly in our{" "}
        <a href="/guides/how-to-measure-blood-pressure-at-home">blood pressure guide</a>.
      </p>
      <p>
        <a href="https://app.formulate-health.app/body">
          Compare smart scales and body measurement devices in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
