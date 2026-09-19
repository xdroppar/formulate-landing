import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function ColdPlungeBenefitsAndRisks() {
  return (
    <>
      <TLDRBox
        readTime="10 min read"
        takeaways={[
          "The first 1–3 minutes are the dangerous part: the cold shock gasp and hyperventilation, not hypothermia, cause most cold-water deaths",
          "Cold water reliably makes people feel more alert and upbeat for a while, but trials on mood, stress and immunity are small and mostly unblinded",
          "Plunging after exercise modestly reduces muscle soreness. Plunging straight after lifting blunts muscle growth in several trials and a 2024 meta-analysis",
          "Brown-fat and insulin effects in studies came from hours of mild cold air over days, not a three-minute plunge. Don’t buy a tub for fat loss",
          "Skip it, or get medical advice first, if you have heart disease, uncontrolled blood pressure, Raynaud’s, cold urticaria or are pregnant, and never plunge after drinking",
        ]}
      />

      <p>
        Cold plunges have gone from something athletes did in ice-filled bins
        to a household appliance. The pitch is broad: more energy, better mood,
        faster recovery, more brown fat, a stronger immune system. Some of
        that is supported, some isn&rsquo;t, and one important part of the
        story rarely makes it into the marketing: sudden immersion in cold
        water is a well-studied way to die.
      </p>
      <p>
        This guide goes through the physiology, what the trials show, the
        temperatures and durations that were actually studied, and who should
        stay out.
      </p>

      <h2>The Short Answer</h2>
      <p>
        A plunge at <strong>10&ndash;15&deg;C for 1&ndash;5 minutes</strong>,
        with your head above water, is a reasonable thing for a healthy adult
        to try. It will wake you up. After hard running or team sport it will
        probably take the edge off soreness. It is not a proven route to fat
        loss, immunity or longevity. If your main goal is building muscle,
        keep it away from the hours after your lifting sessions. If you have
        a heart condition, get medical advice before your first plunge.
      </p>

      <h2>The Part the Adverts Leave Out: Cold Shock</h2>
      <p>
        When cold water hits your skin, you get an involuntary{" "}
        <strong>cold shock response</strong>: a sharp gasp, several minutes of
        rapid breathing you can&rsquo;t fully control, and a spike in heart
        rate and blood pressure. It peaks in the first 30 seconds and settles
        over 1&ndash;3 minutes. Research on open-water deaths concludes that
        this response, not hypothermia, accounts for most of them. People
        inhale water, panic or suffer a cardiac event long before their core
        temperature drops.{" "}
        <EvidenceBadge level="strong" studies={[
          {
            authors: "Tipton", year: 1989, journal: "Clinical Science",
            title: "The initial responses to cold-water immersion in man",
            url: "https://pubmed.ncbi.nlm.nih.gov/2691172/",
            summary: "Review concluding that the cold shock response can kill or incapacitate long before hypothermia, and probably accounts for most open-water immersion deaths.",
          },
          {
            authors: "Tipton et al.", year: 2017, journal: "Experimental Physiology",
            title: "Cold water immersion: kill or cure?",
            url: "https://pubmed.ncbi.nlm.nih.gov/28833689/",
            summary: "Broad review of cold water as hazard and treatment; evidence for many health claims ranges from credible to anecdotal.",
          },
        ]} />
      </p>
      <p>
        There is a second risk. Putting your face in cold water triggers the
        diving reflex, which slows the heart, at the same moment cold shock
        is speeding it up. Physiologists call this{" "}
        <strong>autonomic conflict</strong>, and it can provoke arrhythmias,
        especially when someone holds their breath and then releases it.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Shattock and Tipton", year: 2012, journal: "The Journal of Physiology",
          title: "'Autonomic conflict': a different way to die during cold water immersion?",
          url: "https://pubmed.ncbi.nlm.nih.gov/22547634/",
          summary: "Simultaneous cold shock (sympathetic) and diving response (parasympathetic) can trigger arrhythmias; proposed as a cause of some deaths blamed on drowning.",
        }]} />{" "}
        That&rsquo;s why submerging your head, or breath-hold challenges in a
        plunge, are a bad idea.
      </p>
      <p>
        The good news is that cold shock <strong>habituates</strong>. Across
        studies, the heart-rate and breathing responses shrink noticeably after
        about four immersions.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Barwood et al.", year: 2024, journal: "Journal of Thermal Biology",
          title: "Habituation of the cold shock response: A systematic review and meta-analysis",
          url: "https://pubmed.ncbi.nlm.nih.gov/38211547/",
          summary: "17 groups. Repeated immersions reduced the cold shock heart rate response by ~14 beats/min and ventilation by ~21 L/min; habituation after ~4 immersions.",
        }]} />{" "}
        Your first few plunges are the riskiest, so start gently.
      </p>

      <Callout variant="warning" title="Rules that apply to everyone">
        Keep your head above water. Don&rsquo;t hold your breath. Get in
        slowly, or sit down gradually, rather than jumping. Never plunge
        after drinking alcohol. In open water, never go alone, and stay
        within reach of the edge: cold shock and, later, cooling muscles drown
        strong swimmers.
      </Callout>

      <h2>Mood and Alertness: Real, but Thinly Studied</h2>
      <p>
        Almost everyone feels more awake after cold water, and there&rsquo;s a
        clear physiological reason. In a classic study, young men sitting in
        14&deg;C water for an hour had noradrenaline rise about 530% and
        dopamine about 250%.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Šrámek et al.", year: 2000, journal: "European Journal of Applied Physiology",
          title: "Human physiological responses to immersion into water of different temperatures",
          url: "https://pubmed.ncbi.nlm.nih.gov/10751106/",
          summary: "1-hour head-out immersion at 14°C: metabolic rate +350%, plasma noradrenaline +530%, dopamine +250%. Small group of young men.",
        }]} />{" "}
        That is the source of the dopamine figure you&rsquo;ll see quoted. Note
        that it was a full hour at 14&deg;C, which is far more than anyone
        should do at home.
      </p>
      <p>
        Shorter exposures seem to lift mood as well. After a 5-minute
        immersion, volunteers reported feeling more active, alert and
        attentive, with less distress.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Yankouskaya et al.", year: 2023, journal: "Biology",
          title: "Short-Term Head-Out Whole-Body Cold-Water Immersion Facilitates Positive Affect and Increases Interaction between Large-Scale Brain Networks",
          url: "https://pubmed.ncbi.nlm.nih.gov/36829490/",
          summary: "Brain imaging before and after a 5-minute immersion: higher positive affect (more alert, active, attentive) and lower distress. Small pre/post study.",
        }]} />{" "}
        A 2025 meta-analysis of randomised trials found lower stress about 12
        hours later and better self-rated sleep and quality of life, but no
        clear effect on mood scores. It also found that inflammation markers
        rise in the hour after immersion.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Cain et al.", year: 2025, journal: "PLoS One",
          title: "Effects of cold-water immersion on health and wellbeing: A systematic review and meta-analysis",
          url: "https://pubmed.ncbi.nlm.nih.gov/39879231/",
          summary: "11 trials, 7–15°C, 30 s to 2 h. Acute rise in inflammation; lower stress at 12 h; better sleep quality and quality of life; no clear effect on mood.",
        }]} />
      </p>
      <p>
        The largest trial asked 3,018 Dutch adults to end their daily shower
        with 30&ndash;90 seconds of cold water. They reported 29% fewer days
        off work sick, but no fewer days of illness.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Buijze et al.", year: 2016, journal: "PLoS One",
          title: "The Effect of Cold Showering on Health and Work: A Randomized Controlled Trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/27631616/",
          summary: "3,018 adults, 30–90 s of cold at the end of a hot shower for 30 days: 29% fewer self-reported sickness absence days; no difference in illness days.",
        }]} />{" "}
        Participants knew which group they were in, and people who volunteer
        to take cold showers may be motivated to go to work. It&rsquo;s a
        reason to try a cold shower, not proof that cold water boosts immunity.
      </p>

      <h2>Brown Fat and Metabolism: Mostly Not From Plunges</h2>
      <p>
        Brown adipose tissue burns energy to make heat. Adults have more of it
        than was once thought, and cold switches it on. When young men sat in
        a 16&deg;C room, brown fat activity showed up in 23 of 24, less so in
        those carrying more body fat.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "van Marken Lichtenbelt et al.", year: 2009, journal: "The New England Journal of Medicine",
          title: "Cold-activated brown adipose tissue in healthy men",
          url: "https://pubmed.ncbi.nlm.nih.gov/19357405/",
          summary: "24 men, mild cold air (16°C): brown fat activity detected in 96%, lower in overweight and obese men.",
        }]} />
      </p>
      <p>
        The most striking metabolic result came from ten days of{" "}
        <strong>cold air acclimation (14&ndash;15&deg;C)</strong> in eight people
        with type 2 diabetes, whose insulin sensitivity improved by about
        43%. Most of that came from muscle, not brown fat.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Hanssen et al.", year: 2015, journal: "Nature Medicine",
          title: "Short-term cold acclimation improves insulin sensitivity in patients with type 2 diabetes mellitus",
          url: "https://pubmed.ncbi.nlm.nih.gov/26147760/",
          summary: "8 people with type 2 diabetes, 10 days of mild cold (14–15°C): ~43% higher insulin sensitivity, driven mainly by muscle glucose uptake.",
        }]} />{" "}
        Experienced winter swimmers who also used saunas showed different
        thermoregulation and more cold-induced heat production than
        non-swimmers, but that was a cross-sectional comparison of a small,
        self-selected group.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Søberg et al.", year: 2021, journal: "Cell Reports Medicine",
          title: "Altered brown fat thermoregulation and enhanced cold-induced thermogenesis in young, healthy, winter-swimming men",
          url: "https://pubmed.ncbi.nlm.nih.gov/34755128/",
          summary: "Winter swimmers (2–3 sessions/week with sauna) vs controls: greater cold-induced thermogenesis. Small cross-sectional study.",
        }]} />
      </p>
      <p>
        The honest summary is that the fat-loss case for plunging is
        extrapolation. The calories burned during a few minutes in cold water
        are small, and cold often increases appetite. A broad review of
        voluntary cold-water exposure found promising effects on insulin
        sensitivity and body fat but called the evidence inconclusive, partly
        because winter swimmers may simply be healthier people.{" "}
        <EvidenceBadge level="mixed" studies={[{
          authors: "Esperland et al.", year: 2022, journal: "International Journal of Circumpolar Health",
          title: "Health effects of voluntary exposure to cold water - a continuing subject of debate",
          url: "https://pubmed.ncbi.nlm.nih.gov/36137565/",
          summary: "Review of 104 studies: possible benefits for insulin sensitivity and adipose tissue, but small, heterogeneous studies; unclear whether winter swimmers are simply healthier.",
        }]} />
      </p>

      <h2>Recovery: Less Soreness, Possibly Less Muscle</h2>
      <p>
        This is where the evidence is most useful, because it points in two
        directions.
      </p>
      <h3>Soreness</h3>
      <p>
        A Cochrane review of 17 small trials found that cold-water immersion
        after exercise reduced muscle soreness at 24&ndash;96 hours compared
        with resting, though study quality was low.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Bleakley et al.", year: 2012, journal: "Cochrane Database of Systematic Reviews",
          title: "Cold-water immersion (cryotherapy) for preventing and treating muscle soreness after exercise",
          url: "https://pubmed.ncbi.nlm.nih.gov/22336838/",
          summary: "17 small trials, 366 people. Less soreness vs passive rest at 24–96 h; no clear difference vs warm or contrast water; low quality.",
        }]} />{" "}
        A later meta-analysis found the best results with water at about
        11&ndash;15&deg;C for 11&ndash;15 minutes, and described the benefit
        over passive recovery as small.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Machado et al.", year: 2016, journal: "Sports Medicine",
          title: "Can Water Temperature and Immersion Time Influence the Effect of Cold Water Immersion on Muscle Soreness? A Systematic Review and Meta-Analysis",
          url: "https://pubmed.ncbi.nlm.nih.gov/26581833/",
          summary: "9 RCTs. Cold water slightly better than passive recovery for soreness; best results at 11–15°C for 11–15 minutes.",
        }]} />{" "}
        If you have a match or race again in a day or two, that trade can be
        worth making.
      </p>

      <h3>Muscle growth</h3>
      <p>
        The catch is that some of the inflammation and signalling that makes
        you sore also drives adaptation. In a 12-week study, men who took a
        10-minute cold plunge after each strength session gained less muscle
        and strength than men who did an active cool-down instead.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Roberts et al.", year: 2015, journal: "The Journal of Physiology",
          title: "Post-exercise cold water immersion attenuates acute anabolic signalling and long-term adaptations in muscle to strength training",
          url: "https://pubmed.ncbi.nlm.nih.gov/26174323/",
          summary: "21 men, 12 weeks, 2 sessions/week. 10 min of cold water after training: smaller gains in strength and muscle mass than active recovery; blunted satellite cell and anabolic signalling.",
        }]} />{" "}
        A 7-week trial using 15 minutes at 10&deg;C found smaller growth in
        type II muscle fibres, although strength gains were similar.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Fyfe et al.", year: 2019, journal: "Journal of Applied Physiology",
          title: "Cold water immersion attenuates anabolic signaling and skeletal muscle fiber hypertrophy, but not strength gain, following whole-body resistance training",
          url: "https://pubmed.ncbi.nlm.nih.gov/31513450/",
          summary: "16 men, 7 weeks, 15 min at 10°C after each session: type II fibre growth attenuated; 1-RM strength gains similar.",
        }]} />{" "}
        A 2024 meta-analysis of eight studies concluded that cold water
        immediately after resistance training probably reduces muscle growth,
        while noting that the studies were of fair to poor quality.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Piñero et al.", year: 2024, journal: "European Journal of Sport Science",
          title: "Throwing cold water on muscle growth: A systematic review with meta-analysis of the effects of postexercise cold water immersion on resistance training-induced hypertrophy",
          url: "https://doi.org/10.1002/ejsc.12074",
          summary: "8 studies. Hypertrophy smaller with post-lifting cold water immersion than without (comparative SMD −0.22); overall study quality fair to poor.",
        }]} />
      </p>
      <p>
        Nobody has tested whether waiting several hours, or plunging on rest
        days, avoids the problem, though it seems a sensible hedge. For more on
        building and keeping muscle, see our{" "}
        <a href="/guides/minimum-effective-dose-strength-training">minimum effective dose guide</a>.
      </p>

      <h2>Temperatures and Durations That Were Actually Studied</h2>
      <table>
        <thead>
          <tr>
            <th>Goal in the research</th>
            <th>Exposure used</th>
            <th>What it showed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Soreness after exercise</td>
            <td>10&ndash;15&deg;C, about 10&ndash;15 min, soon after exercise</td>
            <td>Small reduction in soreness</td>
          </tr>
          <tr>
            <td>Strength training outcomes</td>
            <td>About 10&deg;C for 10&ndash;15 min, straight after lifting</td>
            <td>Less muscle growth</td>
          </tr>
          <tr>
            <td>Wellbeing and stress</td>
            <td>7&ndash;15&deg;C, 30 seconds to 2 hours</td>
            <td>Lower stress later in the day; better sleep ratings; mood unclear</td>
          </tr>
          <tr>
            <td>Cold showers</td>
            <td>30&ndash;90 seconds at the end of a normal shower</td>
            <td>Fewer sick days reported; no fewer illnesses</td>
          </tr>
          <tr>
            <td>Brown fat and insulin</td>
            <td>Cold air, 14&ndash;16&deg;C, for long periods over days</td>
            <td>More brown fat activity; better insulin sensitivity in a tiny trial</td>
          </tr>
        </tbody>
      </table>
      <p>
        Popular weekly-minute targets come from describing what habitual
        winter swimmers do, not from trials comparing doses. Nobody has
        established an optimal weekly amount of cold.
      </p>

      <h2>Who Should Avoid Cold Plunging</h2>

      <Callout variant="warning" title="Get medical advice first, or skip it">
        Cold immersion sharply raises heart rate and blood pressure and can
        trigger arrhythmias. Don&rsquo;t plunge without talking to a doctor if
        you have <strong>coronary heart disease, a previous heart attack,
        heart failure, an arrhythmia or a pacemaker/ICD, uncontrolled high
        blood pressure, or a previous stroke</strong>. Also avoid it with{" "}
        <strong>Raynaud&rsquo;s phenomenon, cold urticaria (hives from cold)
        or cryoglobulinaemia</strong>, where cold itself causes harm. Take
        care with <strong>diabetes or neuropathy</strong>, where reduced
        sensation hides cold injury, and with epilepsy or any condition that
        causes sudden loss of consciousness.
      </Callout>

      <ul>
        <li>
          <strong>Pregnancy:</strong> there is essentially no safety data, and
          the blood pressure spike is not something to test in pregnancy. Skip
          it, or ask your obstetrician.
        </li>
        <li>
          <strong>Children:</strong> they cool faster and can&rsquo;t judge
          risk. Short, supervised cold showers are a different thing from an
          ice bath.
        </li>
        <li>
          <strong>Alcohol and sedatives:</strong> they blunt judgement and
          shivering, and increase the risk of hypothermia and drowning.
        </li>
        <li>
          <strong>Medications:</strong> beta-blockers blunt the heart-rate
          response, and some psychiatric drugs impair temperature regulation.
          Ask your pharmacist if you take regular medication.
        </li>
      </ul>
      <p>
        Warning signs to get out immediately: chest pain, palpitations,
        breathlessness that doesn&rsquo;t settle after the first minute,
        confusion, slurred speech, or shivering you can&rsquo;t control.
      </p>

      <h2>A Cautious Way to Start</h2>
      <ol>
        <li>
          <strong>Begin with cold showers.</strong> 30&ndash;60 seconds at the
          end of a normal shower for a week or two lets the cold shock response
          habituate.
        </li>
        <li>
          <strong>Start warmer and shorter than you think.</strong> 12&ndash;15&deg;C
          for 1&ndash;2 minutes. Colder is not better. It just raises the
          cardiovascular load.
        </li>
        <li>
          <strong>Get in slowly and breathe out long.</strong> Sit down
          gradually, keep your head and neck out, and focus on slow exhales
          until the gasping settles.
        </li>
        <li>
          <strong>Build to 2&ndash;5 minutes at 10&ndash;15&deg;C</strong> if
          you like it. Longer sessions (10&ndash;15 minutes) are what the
          soreness trials used, and those were supervised.
        </li>
        <li>
          <strong>Rewarm actively.</strong> Dry off, dress and move. Your core
          temperature can keep falling for a while after you get out (the
          &ldquo;afterdrop&rdquo;), so don&rsquo;t drive straight away if
          you&rsquo;re still shivering.
        </li>
        <li>
          <strong>Time it around training.</strong> After endurance work or
          sport, go ahead. After lifting, if muscle growth matters to you,
          keep the plunge for another time of day or a rest day.
        </li>
      </ol>

      <Callout variant="tip" title="Hygiene for home tubs">
        Standing water at room temperature grows bacteria. Follow the
        filtration and sanitising instructions for your tub, shower before
        getting in, and don&rsquo;t plunge with open wounds.
      </Callout>

      <h2>Frequently Asked Questions</h2>

      <h3>Is a cold shower as good as a plunge?</h3>
      <p>
        For alertness and getting used to cold, a cold shower does much of
        the same job for free, and it&rsquo;s the only form with a large
        randomised trial behind it. For the soreness effect, full-body
        immersion is what was studied. Showers cool you less evenly.
      </p>

      <h3>Will cold plunging help me lose fat?</h3>
      <p>
        Probably not in a way you&rsquo;d notice. The metabolic studies used
        hours of cold air exposure, and a few minutes in a tub burns few
        calories. Cold can also increase hunger. Diet, activity and sleep
        matter far more.
      </p>

      <h3>Should I plunge after lifting weights?</h3>
      <p>
        If your goal is muscle size, not straight after. Several trials found
        smaller gains when people plunged within minutes of training. If
        your priority is feeling fresh for a competition tomorrow, the
        soreness benefit may be worth it.
      </p>

      <h3>How cold does the water need to be?</h3>
      <p>
        The recovery and wellbeing studies mostly used 7&ndash;15&deg;C, with
        10&ndash;15&deg;C the most common. Ice-cold water near 0&ndash;5&deg;C
        adds risk without evidence of extra benefit.
      </p>

      <h3>Is going from sauna to plunge safe?</h3>
      <p>
        Many healthy people do it, and it&rsquo;s traditional in Nordic
        countries. It is also a big swing in blood pressure and heart rate, so
        anyone with heart disease should ask a doctor first. See our{" "}
        <a href="/guides/sauna-health-benefits">sauna guide</a> for the
        heat side of the equation.
      </p>

      <h3>Can cold exposure improve my HRV?</h3>
      <p>
        Cold briefly activates both branches of the nervous system, and some
        people see changes in overnight heart rate variability. There&rsquo;s
        no good evidence that this translates into a health benefit. Our{" "}
        <a href="/guides/hrv-explained-wearables">HRV guide</a>{" "}
        explains why a single number is hard to interpret.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Cold water is a strong stimulus with a few well-supported effects (a
        burst of alertness and a modest reduction in soreness) and many
        overstated ones. Its main documented cost for lifters is less muscle
        growth, and its main danger for everyone is the first minute or two.
        If you want to try it, start with cold showers, then short plunges at
        10&ndash;15&deg;C with your head above water. Never drink first, and
        check with a doctor if your heart or blood pressure is a concern.
      </p>
      <p>
        More on recovery tools in the{" "}
        <a href="https://app.formulate-health.app/learning/track/therapies?utm_source=landing&utm_medium=guide_body&utm_campaign=cold-plunge-benefits-and-risks">Therapies learning track</a> and the{" "}
        <a href="/learn/cold-plunge">cold plunge reference page</a>.
      </p>
      <p>
        <a href="https://app.formulate-health.app/therapies">
          Compare cold plunges and other recovery therapies in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
