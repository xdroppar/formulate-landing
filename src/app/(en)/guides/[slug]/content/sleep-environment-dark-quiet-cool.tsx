import Link from "next/link";
import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function SleepEnvironmentDarkQuietCool() {
  return (
    <>
      <TLDRBox
        readTime="11 min read"
        takeaways={[
          "Ordinary room light before bed delays melatonin, and a single night sleeping with a moderate light on raised heart rate and next-morning insulin resistance in a lab study — blackout blinds or an eye mask are cheap fixes",
          "Earplugs have reasonable support; continuous white noise has very low-quality evidence, and some machines are loud enough to worry about hearing",
          "A hot, humid bedroom increases waking and cuts deep sleep; a cool room with enough bedding is the target, and a warm bath 1–2 hours before bed helps you fall asleep faster",
          "Raising the head of the bed on blocks (not extra pillows) reduces night-time reflux",
          "Gear cannot fix a drifting body clock, chronic insomnia or sleep apnoea — CBT-I and CPAP are clinical treatments",
        ]}
      />

      <p>
        &ldquo;Keep your bedroom dark, quiet and cool&rdquo; is the most repeated
        sleep advice there is, and one of the few pieces of sleep-hygiene advice
        with a physiological basis you can actually point to. It has also become
        a shopping list: blackout curtains, silk eye masks, white-noise machines,
        cooling pads, wedge pillows.
      </p>
      <p>
        Some of that gear addresses a real problem well. Some rests on very thin
        evidence. And some sleep problems cannot be solved by changing the room
        at all. This guide takes each element in turn &mdash; light, noise,
        temperature, and bed position for reflux &mdash; and then covers what
        the bedroom cannot fix.
      </p>

      <h2>Light: the strongest case</h2>
      <p>
        Light is the main signal that sets your body clock, and the hormone
        melatonin is its night-time marker. In a study of 116 healthy young
        adults living in a research unit, ordinary room light (under 200 lux,
        the brightness of a normal living room) in the hours before bed delayed
        the rise of melatonin in nearly everyone and shortened the melatonin
        night by about 90 minutes compared with dim light. Room light during the
        usual sleep hours suppressed melatonin by more than half in most tests.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Gooley et al.", year: 2011, journal: "Journal of Clinical Endocrinology & Metabolism",
          title: "Exposure to room light before bedtime suppresses melatonin onset and shortens melatonin duration in humans",
          url: "https://pubmed.ncbi.nlm.nih.gov/21193540/",
          summary: "116 healthy adults: room light (<200 lux) before bed delayed melatonin onset in 99% and shortened melatonin duration by ~90 min vs dim light (<3 lux).",
        }]} />
      </p>
      <p>
        Light during sleep may matter beyond melatonin. In a laboratory study,
        sleeping one night with a moderate overhead light on (100 lux) raised
        night-time heart rate, lowered heart rate variability and increased
        insulin resistance the next morning, compared with sleeping in near
        darkness.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Mason et al.", year: 2022, journal: "PNAS",
          title: "Light exposure during sleep impairs cardiometabolic function",
          url: "https://pubmed.ncbi.nlm.nih.gov/35286195/",
          summary: "Healthy adults, one night at 100 lux vs <3 lux: higher night-time heart rate, lower HRV and higher next-morning insulin resistance with light.",
        }]} />{" "}
        It was a small, short study, so treat it as a reason to keep the room
        dark rather than proof that a night light causes diabetes.
      </p>

      <h3>What helps</h3>
      <ul>
        <li>
          <strong>Blackout curtains or blinds.</strong> The simplest fix for
          streetlights and early summer sunrise. Gaps at the sides and top leak
          a surprising amount of light; side channels or a curtain wider than
          the window help.
        </li>
        <li>
          <strong>An eye mask.</strong> Cheaper than curtains and portable. In
          a study of 94 young adults, wearing a mask every night for a week
          improved next-day memory encoding and alertness compared with a week
          without one.{" "}
          <EvidenceBadge level="emerging" studies={[{
            authors: "Greco et al.", year: 2023, journal: "Sleep",
            title: "Wearing an eye mask during overnight sleep improves episodic learning and alertness",
            url: "https://pubmed.ncbi.nlm.nih.gov/36521010/",
            summary: "94 adults aged 18–35: a week of eye-mask use improved episodic encoding and alertness vs a week without; replicated in a second group of 35.",
          }]} />{" "}
          Choose a contoured mask that does not press on the eyes and seals
          around the nose.
        </li>
        <li>
          <strong>Dimmer, warmer light in the evening.</strong> Lower overhead
          lights and use lamps for the last hour or two. Night lights, if you
          need them, should be dim, low and amber or red.
        </li>
        <li>
          <strong>Bright light in the morning.</strong> Darkness at night works
          best alongside daylight early in the day, which anchors the body
          clock. If mornings are dark where you live, see our guide to{" "}
          <Link href="/guides/light-therapy-lamp-for-seasonal-depression">
            light therapy lamps
          </Link>
          .
        </li>
      </ul>

      <h2>Noise: earplugs yes, white noise unclear</h2>
      <p>
        Noise wakes people, and even noise that does not fully wake you can
        fragment sleep. The two consumer answers work in opposite ways:
        earplugs block sound, and noise machines mask it with a steady sound.
      </p>
      <p>
        <strong>Earplugs</strong> have been studied most in intensive care
        units, one of the noisiest places to sleep. A systematic review of 19
        studies found that earplugs and eye masks generally improved
        self-reported sleep quality, and may reduce delirium in ICU patients,
        though the studies were varied and used different sleep measures.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Locihová et al.", year: 2018, journal: "Journal of Sleep Research",
          title: "Effect of the use of earplugs and eye mask on the quality of sleep in intensive care patients: a systematic review",
          url: "https://pubmed.ncbi.nlm.nih.gov/28944590/",
          summary: "19 studies, 1,379 participants: earplugs and eye masks mostly improved subjective sleep quality and showed potential to reduce ICU delirium; study quality was mixed.",
        }]} />{" "}
        Foam plugs are cheap and effective; silicone or wax plugs suit people
        who find foam uncomfortable. Insert them clean, replace foam plugs
        often, and stop if you get ear pain or discharge.
      </p>
      <p>
        <strong>White noise</strong> is far less certain than its popularity
        suggests. A systematic review of 38 studies rated the quality of
        evidence that continuous noise improves sleep as very low. Results
        ranged from improvement to disruption, and the authors warned that
        continuous noise may itself affect sleep and hearing.{" "}
        <EvidenceBadge level="mixed" studies={[{
          authors: "Riedy et al.", year: 2021, journal: "Sleep Medicine Reviews",
          title: "Noise as a sleep aid: A systematic review",
          url: "https://pubmed.ncbi.nlm.nih.gov/33007706/",
          summary: "38 studies: GRADE quality of evidence that continuous white or broadband noise improves sleep was very low; findings ranged from benefit to harm.",
        }]} />
      </p>
      <p>
        <strong>&ldquo;Pink noise&rdquo;</strong> claims usually borrow from
        laboratory research where very short bursts of sound are timed to the
        brain&rsquo;s slow waves using live EEG monitoring. A speaker playing
        pink noise all night is a different thing, and has not been shown to do
        the same.
      </p>
      <p>
        If a steady sound helps you &mdash; especially against irregular noise
        such as traffic or a snoring partner &mdash; it is reasonable to use,
        with two conditions: keep it quiet, and keep it away from the bed. When
        researchers measured 14 infant sleep machines at maximum volume, all
        exceeded the 50 dB limit recommended for hospital nurseries at 30 cm,
        and three exceeded 85 dB, a level that risks hearing damage over eight
        hours.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Hugh et al.", year: 2014, journal: "Pediatrics",
          title: "Infant sleep machines and hazardous sound pressure levels",
          url: "https://pubmed.ncbi.nlm.nih.gov/24590753/",
          summary: "14 infant sleep machines at maximum volume: all exceeded 50 dBA at 30 cm; three exceeded 85 dBA, above occupational limits for 8-hour exposure.",
        }]} />{" "}
        For babies: place a machine well away from the cot, at low volume, and
        consider switching it off once the baby is asleep.
      </p>

      <Callout variant="warning" title="Make sure you can still hear alarms">
        Earplugs and loud noise machines can mask smoke alarms, a baby monitor
        or a child calling. If you live alone, care for someone at night, or
        sleep deeply, check that you can still hear your alarms, or add
        vibrating or light-based alerts.
      </Callout>

      <h2>Temperature and bedding</h2>
      <p>
        Falling asleep involves a small drop in core body temperature, helped by
        losing heat through the hands and feet. A review of the thermal
        research found that, in real life with bedding and clothing, a hot
        room increases wakefulness and cuts deep (slow-wave) and REM sleep, and
        humid heat is worse. A cold room did not change sleep stages as long as
        people had enough bedding, though it did affect heart-rate responses
        during sleep, which the authors flagged as possibly important.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Okamoto-Mizuno and Mizuno", year: 2012, journal: "Journal of Physiological Anthropology",
          title: "Effects of thermal environment on sleep and circadian rhythm",
          url: "https://pubmed.ncbi.nlm.nih.gov/22738673/",
          summary: "Review: with bedding and clothing, heat exposure increases wakefulness and reduces slow-wave and REM sleep, and humidity adds to it; cold with adequate bedding leaves sleep stages intact but alters cardiac autonomic responses.",
        }]} />{" "}
        The practical reading: cool the room, but keep enough bedding to stay
        comfortably warm under it.
      </p>
      <p>
        You will often see an ideal bedroom temperature of about
        16&ndash;19&nbsp;&deg;C (60&ndash;67&nbsp;&deg;F). Treat that as a
        starting point, not a measured optimum. In a study that tracked older
        adults sleeping in their own homes, sleep was most efficient between 20
        and 25&nbsp;&deg;C, and fell off noticeably as the room warmed from 25 to
        30&nbsp;&deg;C, with large differences between people.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Baniassadi et al.", year: 2023, journal: "Science of the Total Environment",
          title: "Nighttime ambient temperature and sleep in community-dwelling older adults",
          url: "https://pubmed.ncbi.nlm.nih.gov/37474050/",
          summary: "Older adults tracked at home: sleep was most efficient at 20–25 °C, with a 5–10% drop in sleep efficiency from 25 to 30 °C; large individual variation.",
        }]} />{" "}
        The practical message: the right temperature is the one at which you
        are neither sweating nor cold under your usual bedding, and the bedding
        matters as much as the thermostat.
      </p>
      <ul>
        <li>
          <strong>Layer rather than use one heavy duvet,</strong> so you can
          adjust through the night and the seasons.
        </li>
        <li>
          <strong>Breathable fabrics</strong> (cotton, linen, wool) handle
          moisture better than polyester for most hot sleepers.
        </li>
        <li>
          <strong>A warm bath or shower 1&ndash;2 hours before bed.</strong> A
          meta-analysis found that water at 40&ndash;42.5&nbsp;&deg;C, for as
          little as 10 minutes, shortened the time to fall asleep and improved
          sleep quality, probably by drawing heat to the skin so the core cools
          faster afterwards.{" "}
          <EvidenceBadge level="moderate" studies={[{
            authors: "Haghayegh et al.", year: 2019, journal: "Sleep Medicine Reviews",
            title: "Before-bedtime passive body heating by warm shower or bath to improve sleep: A systematic review and meta-analysis",
            url: "https://pubmed.ncbi.nlm.nih.gov/31102877/",
            summary: "17 studies: bathing at 40–42.5 °C 1–2 h before bed, even for 10 min, shortened sleep-onset latency and improved sleep quality and efficiency.",
          }]} />
        </li>
        <li>
          <strong>Your mattress counts.</strong> Deep memory foam holds heat;
          see our{" "}
          <Link href="/guides/how-to-choose-a-mattress">mattress guide</Link>
          . Weighted blankets add heat too (see our{" "}
          <Link href="/guides/weighted-blankets-evidence">
            weighted blanket guide
          </Link>
          ).
        </li>
      </ul>
      <p>
        Actively cooled mattress covers are the newest option. The one
        published study we found was funded by a manufacturer and written
        largely by its employees, so the question is still open.
      </p>

      <h2>Night-time reflux: raise the head of the bed</h2>
      <p>
        If heartburn, sour taste or coughing wakes you at night, bed position
        is one of the few lifestyle measures with direct evidence. Lying flat
        lets stomach acid flow back more easily and makes it slower to clear. An
        evidence review of lifestyle measures for reflux found that raising the
        head of the bed and lying on the left side reduced the time the
        oesophagus was exposed to acid, and the American College of
        Gastroenterology guideline recommends head-of-bed elevation for people
        with night-time symptoms.{" "}
        <EvidenceBadge level="moderate" studies={[
          {
            authors: "Kaltenbach et al.", year: 2006, journal: "Archives of Internal Medicine",
            title: "Are lifestyle measures effective in patients with gastroesophageal reflux disease? An evidence-based approach",
            url: "https://pubmed.ncbi.nlm.nih.gov/16682569/",
            summary: "Review of 16 clinical trials: head-of-bed elevation and left-side lying reduced oesophageal acid exposure; weight loss improved symptoms.",
          },
          {
            authors: "Katz et al.", year: 2022, journal: "American Journal of Gastroenterology",
            title: "ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease",
            url: "https://pubmed.ncbi.nlm.nih.gov/34807007/",
            summary: "ACG guideline: suggests head-of-bed elevation for night-time GERD symptoms and avoiding meals within 2–3 h of bedtime (both conditional, low-quality evidence); recommends weight loss if overweight (strong).",
          },
        ]} />
      </p>
      <p>
        In one small study, 20 people with night-time reflux slept for a week
        with the head of the bed raised on a 20&nbsp;cm block. Acid exposure
        while lying down, the time taken to clear acid and heartburn scores all
        fell, and 13 of the 20 reported better sleep.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Khan et al.", year: 2012, journal: "Journal of Gastroenterology and Hepatology",
          title: "Effect of bed head elevation during sleep in symptomatic patients of nocturnal gastroesophageal reflux",
          url: "https://pubmed.ncbi.nlm.nih.gov/22098332/",
          summary: "20 patients, 20 cm bed-head blocks for 6 nights: supine acid exposure, acid clearance time and symptom scores all improved; sleep disturbance improved in 65%.",
        }]} />
      </p>
      <ul>
        <li>
          <strong>Raise the bed, not just your head.</strong> Blocks of
          15&ndash;20&nbsp;cm (6&ndash;8 inches) under the head-end legs, or a
          full-length wedge under the mattress or upper body, create a gentle
          slope. Stacking pillows bends you at the waist, which can squeeze the
          stomach and make reflux worse.
        </li>
        <li>
          <strong>Wedge pillows</strong> work if they are long enough to slope
          the whole upper body. Short, steep wedges tend to let you slide down.
        </li>
        <li>
          <strong>Try the left side.</strong> The stomach sits lower than the
          oesophagus in that position.
        </li>
        <li>
          <strong>Stop eating 2&ndash;3 hours before bed.</strong>
        </li>
      </ul>

      <Callout variant="warning" title="Reflux symptoms that need a doctor">
        See a doctor promptly if you have difficulty or pain swallowing, food
        sticking, unintended weight loss, vomiting (especially blood), black
        stools, anaemia, or reflux that keeps returning despite treatment. Chest pain that
        spreads to the arm, jaw or back, or comes with breathlessness or
        sweating, is an emergency until proven otherwise &mdash; do not assume
        it is heartburn.
      </Callout>

      <h2>What gear can&rsquo;t fix</h2>

      <h3>A body clock out of step</h3>
      <p>
        If you cannot fall asleep until 2 a.m. and struggle to wake, the problem
        is timing, not the room. A consistent wake time every day, daylight
        soon after waking, and dim evenings shift the clock; blackout curtains
        can even make it worse by hiding the morning light you need. Shift work
        and jet lag are timing problems too.
      </p>

      <h3>Chronic insomnia</h3>
      <p>
        Trouble sleeping at least three nights a week for three months or more
        usually needs more than a better bedroom. The American Academy of Sleep
        Medicine strongly recommends cognitive behavioural therapy for insomnia
        (CBT-I) as treatment, and specifically advises against relying on sleep
        hygiene alone.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Edinger et al.", year: 2021, journal: "Journal of Clinical Sleep Medicine",
          title: "Behavioral and psychological treatments for chronic insomnia disorder in adults: an American Academy of Sleep Medicine clinical practice guideline",
          url: "https://pubmed.ncbi.nlm.nih.gov/33164742/",
          summary: "AASM guideline: strong recommendation for multicomponent CBT-I in chronic insomnia; conditional recommendation against sleep hygiene as a single-component therapy.",
        }]} />{" "}
        CBT-I is available through clinicians and structured digital programmes.
        Supplements are covered in our{" "}
        <Link href="/guides/best-sleep-supplement-protocol">
          sleep supplement protocol
        </Link>
        .
      </p>

      <h3>Sleep apnoea</h3>
      <p>
        Obstructive sleep apnoea &mdash; the airway repeatedly narrowing or
        closing during sleep &mdash; is common and underdiagnosed. A modelling
        study funded by a breathing-device manufacturer estimated that about 936
        million adults aged 30&ndash;69 worldwide have at least mild apnoea and
        425 million moderate to severe.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Benjafield et al.", year: 2019, journal: "The Lancet Respiratory Medicine",
          title: "Estimation of the global prevalence and burden of obstructive sleep apnoea: a literature-based analysis",
          url: "https://pubmed.ncbi.nlm.nih.gov/31300334/",
          summary: "Estimated 936 million adults aged 30–69 with mild-to-severe OSA and 425 million with moderate-to-severe OSA. Funded by a CPAP manufacturer.",
        }]} />{" "}
        No pillow, wedge, mouth tape or anti-snoring gadget treats it. The
        diagnosis needs a sleep test, and the main treatment, positive airway
        pressure (CPAP), is a prescription therapy that the American Academy of
        Sleep Medicine strongly recommends for adults with apnoea and daytime
        sleepiness.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Patil et al.", year: 2019, journal: "Journal of Clinical Sleep Medicine",
          title: "Treatment of Adult Obstructive Sleep Apnea with Positive Airway Pressure: An American Academy of Sleep Medicine Clinical Practice Guideline",
          url: "https://pubmed.ncbi.nlm.nih.gov/30736887/",
          summary: "AASM guideline: strong recommendation for PAP vs no therapy in adults with OSA and excessive sleepiness; diagnosis requires objective sleep testing.",
        }]} />{" "}
        Snoring devices and positional aids can make snoring quieter while the
        apnoea continues, which is why you should be assessed before relying on
        them.
      </p>

      <Callout variant="warning" title="Warning signs of sleep apnoea">
        Talk to a doctor about a sleep study if you have loud, habitual snoring;
        pauses in breathing, choking or gasping that a partner notices;
        daytime sleepiness, especially dozing while driving; morning headaches;
        high blood pressure that is hard to control; or waking often to urinate.
        Risk is higher with obesity, a large neck, male sex, older age and
        menopause, but slim people get it too. Drowsy driving is dangerous: do
        not drive when you are struggling to stay awake.
      </Callout>

      <p>
        Other conditions that need a clinician rather than a purchase include
        restless legs (an urge to move the legs in the evening, sometimes linked
        to low iron &mdash; see our{" "}
        <Link href="/guides/iron-guide">iron guide</Link>), nightmares after
        trauma, and sleep disrupted by pain, mood disorders or medications.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Does white noise help you sleep?</h3>
      <p>
        It might for some people, particularly against irregular noise, but the
        overall evidence is very low quality and some studies found it made
        sleep worse. If you use it, keep it quiet and away from the bed.
        Earplugs are the better-supported option for blocking noise.
      </p>

      <h3>What temperature should my bedroom be?</h3>
      <p>
        Cool enough that you do not sweat under your usual bedding, warm enough
        that you are not cold. The often-quoted 16&ndash;19&nbsp;&deg;C is a
        reasonable starting point for younger adults; one study in older adults
        found the best sleep between 20 and 25&nbsp;&deg;C. Adjust bedding
        before blaming the thermostat.
      </p>

      <h3>Is sleeping with the TV or a light on bad?</h3>
      <p>
        Light at night suppresses melatonin, and one laboratory study found a
        single night with a moderate light on raised heart rate and
        next-morning insulin resistance. A timer that turns the TV off, and a
        dark room once you are asleep, is the sensible compromise.
      </p>

      <h3>Do I need a wedge pillow for reflux?</h3>
      <p>
        Not necessarily. Blocks under the head-end legs of the bed achieve the
        same slope and are what most of the research used. A wedge works if it
        is long enough to incline your whole upper body; extra pillows under
        your head are not a substitute.
      </p>

      <h3>Can an eye mask replace blackout curtains?</h3>
      <p>
        For most adults, yes &mdash; a well-fitted mask blocks more light
        than most curtains and is cheaper. Curtains are better if you find masks
        uncomfortable, share a room with a child, or want the room dark for
        daytime sleep after night shifts.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Darkness has the strongest case, and it is cheap: blackout curtains or
        a good eye mask, dim evenings, bright mornings. Earplugs beat noise
        machines on evidence. Keep the bedroom cool enough not to sweat, use a
        warm bath rather than a gadget to help you wind down, and if reflux
        wakes you, raise the head of the bed on blocks. Then be honest about
        what is left: a drifting body clock, long-running insomnia and snoring
        with gasping or daytime sleepiness are clinical problems, and the
        treatments that work for them &mdash; consistent timing, CBT-I and CPAP
        &mdash; are not sold as bedroom accessories. The{" "}
        <a href="https://app.formulate-health.app/learning/track/sleep?utm_source=landing&utm_medium=guide_body&utm_campaign=sleep-environment-dark-quiet-cool">sleep learning track</a> covers each of
        these in more depth.
      </p>
      <p>
        <a href="https://app.formulate-health.app/sleep">
          Browse blackout curtains, eye masks and bed wedges on the Formulate sleep shelf &rarr;
        </a>
      </p>
    </>
  );
}
