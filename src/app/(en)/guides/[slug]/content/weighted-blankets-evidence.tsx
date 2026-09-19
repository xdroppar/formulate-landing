import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function WeightedBlanketsEvidence() {
  return (
    <>
      <TLDRBox
        readTime="10 min read"
        takeaways={[
          "The strongest positive trial (120 psychiatric outpatients with insomnia) found large improvements with an 8 kg chain blanket — but people can feel which blanket is heavy, so it could not be blinded",
          "In autistic children, a careful trial found no gain in objectively measured sleep, although children and parents preferred the weighted blanket",
          "Pooled reviews point to a small-to-moderate reduction in anxiety; effects on sleep are less consistent",
          "The “10% of body weight” rule is a manufacturer convention, not a tested dose — the best trial used 6–8 kg",
          "Never for babies, and not for anyone who cannot push it off unaided",
        ]}
      />

      <p>
        Weighted blankets went from occupational-therapy tool to mass-market
        bedding in a few years, carried by a simple and appealing idea: firm,
        even pressure calms the nervous system, the way a hug or being tucked in
        tightly does. Some people find them genuinely helpful. Others find them
        hot, heavy and claustrophobic.
      </p>
      <p>
        The research sits between the marketing and the scepticism. There is
        one striking positive trial in adults with psychiatric conditions, one
        well-run negative trial in autistic children, a handful of small studies,
        and a basic problem that runs through all of them. This guide goes
        through what was found, what weight to choose, the heat question, and
        the safety rules that are not optional.
      </p>

      <h2>What a weighted blanket is</h2>
      <p>
        Most weighted blankets are quilted into small pockets filled with glass
        beads or plastic pellets, so the weight stays spread evenly. Others use
        metal chains sewn into the fabric (the design used in the best-known
        trial), or thick knitted yarn with no filler at all. Adult blankets
        usually weigh between about 4 and 13 kg (roughly 9 to 30 lb).
      </p>
      <p>
        The proposed mechanism is &ldquo;deep pressure stimulation&rdquo;:
        steady pressure on the body is thought to shift the nervous system away
        from a fight-or-flight state. It is plausible, and it is the basis of
        long-standing occupational-therapy practice, but it has not been
        directly demonstrated during sleep. One small laboratory study in 26
        healthy young adults found a larger rise in saliva melatonin in the hour
        before lights-out under a blanket weighing about 12% of body weight than
        under a light one, with no difference in sleepiness or sleep duration.
        A co-author worked for a weighted-blanket company.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Meth et al.", year: 2023, journal: "Journal of Sleep Research",
          title: "A weighted blanket increases pre-sleep salivary concentrations of melatonin in young, healthy adults",
          url: "https://pubmed.ncbi.nlm.nih.gov/36184925/",
          summary: "26 healthy adults, one night each: melatonin rose ~32% more under a ~12%-body-weight blanket. No difference in oxytocin, cortisol, sleepiness or sleep duration. One co-author was employed by a blanket maker.",
        }]} />
      </p>

      <h2>The trials</h2>

      <h3>Insomnia in adults with psychiatric conditions: a large effect</h3>
      <p>
        The trial most often quoted was run at the Karolinska Institute in
        Sweden. It randomised 120 outpatients with major depression, bipolar
        disorder, generalised anxiety disorder or ADHD, all with insomnia, to
        four weeks with a metal-chain blanket of 8 kg (6 kg for those who found
        8 too heavy) or a light plastic-chain blanket of about 1.5 kg. On the
        Insomnia Severity Index, 59% of the weighted-blanket group halved their
        score, against 5% of the control group, and 42% versus 4% reached
        remission. Daytime fatigue, depression and anxiety scores also fell,
        and the benefit held over a 12-month open follow-up.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Ekholm et al.", year: 2020, journal: "Journal of Clinical Sleep Medicine",
          title: "A randomized controlled study of weighted chain blankets for insomnia in psychiatric disorders",
          url: "https://pubmed.ncbi.nlm.nih.gov/32536366/",
          summary: "120 psychiatric outpatients with insomnia, 4 weeks: 8 kg (or 6 kg) chain blanket vs 1.5 kg control. Response 59% vs 5%, remission 42% vs 4% on the Insomnia Severity Index. Publicly funded.",
        }]} />
      </p>
      <p>
        That is a large effect, and the study was publicly funded with no
        declared industry ties. The catch is that the main outcome was a
        questionnaire, and participants could obviously tell whether they had
        been given an 8 kg blanket or a light one. When people know they are in
        the active group and rate their own symptoms, expectation inflates the
        result. Tellingly, the wrist activity monitors the participants wore
        showed no significant change in total sleep time or time awake during
        the night; the better sleep maintenance came from people&rsquo;s own
        reports.
      </p>

      <h3>Autistic children: no measurable gain</h3>
      <p>
        A UK trial took the opposite approach and measured sleep objectively.
        Seventy-three children aged 5 to 16 with autism and severe sleep
        problems used a weighted blanket and an otherwise identical normal
        blanket for two weeks each, in random order, with sleep recorded by
        actigraphy. The weighted blanket did not increase total sleep time,
        shorten the time to fall asleep, or reduce night waking, and there was
        no difference in behaviour. Children and parents nonetheless preferred
        it.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Gringras et al.", year: 2014, journal: "Pediatrics",
          title: "Weighted blankets and sleep in autistic children--a randomized controlled trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/25022743/",
          summary: "73 autistic children with severe sleep problems, 2-week crossover: no effect on actigraphy-measured total sleep, sleep onset or waking. Families preferred the weighted blanket.",
        }]} />
      </p>

      <h3>Children with ADHD: small effects</h3>
      <p>
        A Swedish crossover trial in 94 children with ADHD and sleep problems
        found statistically significant but small improvements in total sleep
        time and time awake after falling asleep (a few minutes), and no change
        in how long it took to fall asleep.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Lönn et al.", year: 2024, journal: "Journal of Sleep Research",
          title: "The efficacy of weighted blankets for sleep in children with attention-deficit/hyperactivity disorder-A randomized controlled crossover trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/37452697/",
          summary: "94 children with ADHD, 4 + 4 week crossover: small gains in total sleep time and wake after sleep onset (effect sizes around 0.2–0.3); no change in sleep-onset latency.",
        }]} />
      </p>

      <h3>What the reviews conclude</h3>
      <p>
        Two 2024 meta-analyses of the psychiatric studies came to similar
        conclusions: a small-to-moderate reduction in anxiety, an insomnia effect
        that depends on which studies are included, few serious side effects,
        and a literature that is small, varied and often at high risk of bias
        because participants could not be blinded. An earlier systematic review
        put it plainly: weighted blankets may help with anxiety, but there was
        not enough evidence that they help with insomnia.{" "}
        <EvidenceBadge level="mixed" studies={[
          {
            authors: "Wong et al.", year: 2024, journal: "Journal of Psychiatric Research",
            title: "The effect of weighted blankets on sleep quality and mental health symptoms in people with psychiatric disorders in inpatient and outpatient settings: A systematic review and meta-analysis",
            url: "https://pubmed.ncbi.nlm.nih.gov/39341068/",
            summary: "9 studies, 553 psychiatric patients: anxiety improved (SMD −0.47); sleep findings positive in some studies. Few well-designed RCTs.",
          },
          {
            authors: "Zhao et al.", year: 2024, journal: "Complementary Therapies in Medicine",
            title: "Safety and effectiveness of weighted blankets for symptom management in patients with mental disorders: A systematic review and meta-analysis of randomized controlled trials",
            url: "https://pubmed.ncbi.nlm.nih.gov/39447684/",
            summary: "8 RCTs, 426 patients: small anxiety reduction; pooled insomnia effect not significant (p = 0.06) until one study was removed. Half the trials at high risk of bias. No serious adverse events.",
          },
          {
            authors: "Eron et al.", year: 2020, journal: "American Journal of Occupational Therapy",
            title: "Weighted Blanket Use: A Systematic Review",
            url: "https://pubmed.ncbi.nlm.nih.gov/32204779/",
            summary: "8 studies: weighted blankets may reduce anxiety; not enough evidence that they help insomnia.",
          },
        ]} />
      </p>

      <Callout variant="evidence" title="Why the blinding problem matters">
        You cannot hide an 8 kg blanket. Every trial that relies on people
        rating their own sleep or anxiety is exposed to expectation effects, and
        the trial that measured sleep objectively (in autistic children) found
        nothing. That does not mean weighted blankets do nothing &mdash; feeling
        calmer and preferring your bed are real outcomes &mdash; but it means
        the size of the benefit in the headline trial is probably an
        overestimate.
      </Callout>

      <h2>Who might reasonably try one</h2>
      <ul>
        <li>
          <strong>Adults whose insomnia is tangled up with anxiety or low
          mood</strong>, as an add-on to treatment, not a replacement. This is
          the group with the most encouraging data.
        </li>
        <li>
          <strong>People who already know they like firm pressure</strong>
          &mdash; being tucked in tightly, a heavy duvet, a pet on the bed.
        </li>
        <li>
          <strong>Older children and teenagers</strong> who like the feel and
          can remove the blanket easily themselves, with parental supervision
          and realistic expectations.
        </li>
      </ul>
      <p>
        It is not a treatment for chronic insomnia on its own. The first-line
        treatment for that is cognitive behavioural therapy for insomnia
        (CBT-I), covered in our{" "}
        <a href="/guides/sleep-environment-dark-quiet-cool">
          sleep environment guide
        </a>
        . If you are weighing supplements too, see our{" "}
        <a href="/guides/best-sleep-supplement-protocol">
          sleep supplement protocol
        </a>
        .
      </p>

      <h2>What weight to choose</h2>
      <p>
        You will see &ldquo;about 10% of your body weight&rdquo; everywhere. It
        is a manufacturer convention, not a number that has been tested against
        alternatives. What the research actually used:
      </p>
      <ul>
        <li>
          The positive adult trial used 8 kg, and let people who found that too
          heavy drop to 6 kg (ten of them did).
        </li>
        <li>The melatonin study used about 12% of body weight.</li>
      </ul>
      <p>
        A practical approach: start at or slightly below 10% of your body
        weight, and choose lighter rather than heavier if you are between sizes.
        The blanket should feel like firm pressure, not like being pinned. The
        non-negotiable test is that you can push it off and get out from under
        it easily, half asleep, without help. Buy a size that covers you rather
        than the whole bed &mdash; a weighted blanket that drapes over the edges
        tends to slide off during the night.
      </p>

      <h2>Heat</h2>
      <p>
        Weight and warmth tend to come together. Dense bead-filled blankets with
        polyester covers trap a lot of heat, and heat is one of the most reliable
        ways to make sleep lighter and more broken. If you sleep hot:
      </p>
      <ul>
        <li>
          Choose an open knitted design or a cotton, linen or lyocell cover
          rather than minky or fleece.
        </li>
        <li>
          Glass beads pack more weight into less volume than plastic pellets, so
          the blanket is thinner for the same weight.
        </li>
        <li>
          Use it instead of a duvet, not on top of one, and keep the room cool.
        </li>
        <li>
          Try it for the first part of the evening or while falling asleep, and
          push it off later if you wake warm.
        </li>
      </ul>
      <p>
        &ldquo;Cooling&rdquo; weighted blankets vary a lot. The fabric and
        construction tell you more than the label.
      </p>

      <h2>Trying one: a simple four-week test</h2>
      <p>
        Because expectation plays a large part in how people rate weighted
        blankets, it helps to judge one a little more carefully than
        &ldquo;it feels nice&rdquo;:
      </p>
      <ol>
        <li>
          <strong>Buy where returns are allowed.</strong> Many sellers offer a
          trial period, and weighted blankets are expensive to get wrong.
        </li>
        <li>
          <strong>Write down a baseline for a week first:</strong> roughly how
          long it takes you to fall asleep, how many times you wake, and how
          rested you feel, on a 1&ndash;10 scale.
        </li>
        <li>
          <strong>Use it nightly for four weeks,</strong> the length of the
          main adult trial, and keep the same notes.
        </li>
        <li>
          <strong>Compare the weeks, not single nights.</strong> If nothing has
          changed except that you feel warmer, return it or keep it as a sofa
          blanket for winding down.
        </li>
      </ol>

      <h2>Safety</h2>

      <Callout variant="warning" title="Never for infants">
        The American Academy of Pediatrics advises that weighted blankets,
        weighted sleep sacks, weighted swaddles and other weighted objects
        should not be used on or near a sleeping infant. Babies cannot move a
        heavy covering off their face or roll back if they get stuck, and
        overheating is itself a risk factor for sudden infant death.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Moon et al.", year: 2022, journal: "Pediatrics",
          title: "Sleep-Related Infant Deaths: Updated 2022 Recommendations for Reducing Infant Deaths in the Sleep Environment",
          url: "https://pubmed.ncbi.nlm.nih.gov/35726558/",
          summary: "AAP policy statement on safe infant sleep; includes the recommendation against weighted swaddles, sleepers, blankets and other weighted objects for infants.",
        }]} />
      </Callout>

      <Callout variant="warning" title="Children, and anyone who can't remove it">
        A weighted blanket is only safe for someone who can lift it off
        themselves. Many makers do not sell them for children under about 3
        years or below a minimum body weight. Never use one to hold a child
        still, wrap a child in one, or cover a child&rsquo;s head: in 2008 a
        Quebec coroner found that a 9-year-old autistic boy suffocated after
        being rolled tightly in a weighted blanket at school. The same logic
        applies to adults who are frail, have limited strength or mobility,
        have dementia, or are heavily sedated by alcohol or medication.
      </Callout>

      <Callout variant="warning" title="Talk to a clinician first if you have">
        Obstructive sleep apnoea or any breathing or lung condition (weight on
        the chest and abdomen can make breathing harder); heart failure or
        circulation problems; low blood pressure; a condition affecting skin
        sensation or temperature regulation; or significant claustrophobia.
        Pregnancy is not well studied either; ask your midwife or doctor. If you
        snore loudly or wake gasping, get checked for sleep apnoea before
        adding weight to your bed.
      </Callout>

      <p>
        Two more practical points: check seams regularly on bead-filled
        blankets, because loose beads are a choking hazard for small children
        and pets; and follow the washing instructions, since a wet 10 kg blanket
        can damage a domestic washing machine. Many people use a removable
        cover for this reason.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Do weighted blankets actually work for sleep?</h3>
      <p>
        For some people, probably. The best adult trial found large
        improvements in insomnia in people with depression, anxiety, bipolar
        disorder or ADHD, but it relied on self-report without blinding. The
        trial that measured sleep objectively in autistic children found no
        effect. Expect a modest benefit if any, and judge it on how you sleep
        over a few weeks.
      </p>

      <h3>How heavy should my weighted blanket be?</h3>
      <p>
        Around 10% of body weight is the usual starting point, but it is a
        convention. The main adult trial used 6&ndash;8 kg. Pick the lighter
        option if you are unsure, and make sure you can push it off easily.
      </p>

      <h3>Can I use a weighted blanket every night?</h3>
      <p>
        In the Swedish trial, 112 of the 120 participants carried on into a
        year-long open follow-up, and the authors reported no side effects
        beyond one person who found the blanket made them anxious. If it helps
        and you are not overheating, nightly use is reasonable for healthy
        adults.
      </p>

      <h3>Are weighted blankets safe for children?</h3>
      <p>
        Never for babies. For older children, only if the child can easily
        remove it without help, it is sized and weighted for them, and an adult
        supervises. The trial evidence in children is weak: no objective sleep
        benefit in autism and small effects in ADHD.
      </p>

      <h3>Can I use one if I have sleep apnoea?</h3>
      <p>
        Check with your sleep physician first. Extra weight on the chest and
        abdomen is a reasonable concern in anyone whose breathing is already
        compromised during sleep, and weighted blankets have not been tested in
        people with sleep apnoea.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Weighted blankets are low-risk for healthy adults and may help with
        anxiety and anxious insomnia, but the most impressive result comes from
        a trial whose participants knew which blanket they had, and the most
        rigorous objective test found nothing. Buy one because you like the
        feel, choose the lighter end of the weight range and a breathable
        construction, and keep them away from infants and anyone who cannot
        remove them. For more on the rest of the bedroom, see our guides to{" "}
        <a href="/guides/how-to-choose-a-mattress">choosing a mattress</a>{" "}
        and the{" "}
        <a href="/guides/sleep-environment-dark-quiet-cool">
          sleep environment
        </a>
        , the{" "}
        <a href="/learn/weighted-blankets">weighted blanket reference</a>
        , and the{" "}
        <a href="https://app.formulate-health.app/learning/track/sleep?utm_source=landing&utm_medium=guide_body&utm_campaign=weighted-blankets-evidence">sleep learning track</a>.
      </p>
      <p>
        <a href="https://app.formulate-health.app/sleep">
          Compare weighted blankets on the Formulate sleep shelf &rarr;
        </a>
      </p>
    </>
  );
}
