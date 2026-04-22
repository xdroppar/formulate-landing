import {
  TLDRBox,
  Callout,
  ProductCallout,
  ProductRow,
  InteractionCard,
  InteractionGroup,
  ScheduleTable,
  EvidenceBadge,
  IngredientLink,
  PRODUCTS,
} from "@/components/guide";

export function BestPreWorkoutProtocol() {
  return (
    <>
      <TLDRBox
        readTime="10 min read"
        takeaways={[
          "Only 4 ingredients have strong evidence: creatine (5g), citrulline (6–8g), beta-alanine (3.2g), caffeine (3–6mg/kg)",
          "Creatine and beta-alanine work through daily loading — timing doesn't matter for these",
          "Most commercial pre-workouts underdose the active ingredients and hide behind proprietary blends",
          "Building your own costs ~$0.30–0.60/workout vs $1.50–2.50 for branded tubs",
        ]}
      />

      <p>
        The best pre-workout supplement protocol uses four well-studied
        ingredients purchased individually rather than as a proprietary blend:{" "}
        <IngredientLink id="creatine" source="best-pre-workout-supplement-protocol">creatine</IngredientLink>,
        citrulline, beta-alanine, and caffeine paired with{" "}
        <IngredientLink id="l-theanine" source="best-pre-workout-supplement-protocol">L-theanine</IngredientLink>.
        This approach costs roughly a third of branded pre-workout tubs and
        ensures each ingredient hits its effective dose &mdash; something most
        proprietary blends obscure by hiding individual amounts behind a
        single combined number on the label.
      </p>

      <h2>The Four Ingredients That Actually Work</h2>
      <p>
        These are the compounds with the deepest evidence base for exercise
        performance. Everything else is either unproven, underdosed in
        commercial products, or both.
      </p>

      <h3>Creatine Monohydrate &mdash; 5g Daily (Timing Doesn&rsquo;t Matter)</h3>
      <p>
        Creatine is the most studied ergogenic supplement in existence &mdash;
        over 500 peer-reviewed papers and counting. It replenishes
        phosphocreatine stores in muscle, which fuel short-burst, high-intensity
        efforts: heavy lifts, sprints, HIIT intervals. <EvidenceBadge level="strong" /> The performance
        benefits are consistent and well-documented: increased strength,
        improved power output, faster recovery between sets.
      </p>

      <Callout variant="tip" title="Creatine works by saturation, not timing">
        Your muscles maintain a creatine &ldquo;tank&rdquo; that stays full
        as long as you take 3&ndash;5g every day. Whether you take it in the
        morning, before training, or with dinner makes no meaningful difference.
        Putting it in your pre-workout is fine for convenience, but it&rsquo;s
        not doing anything special at that moment.
      </Callout>

      <p>
        Stick with <a href="/guides/best-creatine-supplements">creatine monohydrate</a> &mdash; not HCl, not buffered, not
        ethyl ester. The monohydrate form is what the research used, and
        fancier forms haven&rsquo;t demonstrated any advantage despite
        costing 3&ndash;5x more. For a deeper dive on dosing protocol
        (including whether you need a loading phase), see our{" "}
        <a href="/guides/creatine-loading-phase">
          creatine loading guide
        </a>.
      </p>

      <ProductCallout product={PRODUCTS["thorne-creatine"]} />

      <h3>L-Citrulline &mdash; 6&ndash;8g (30&ndash;60 Min Before Training)</h3>
      <p>
        Citrulline gets converted to arginine in the kidneys, which boosts
        nitric oxide production and increases blood flow to working muscles.
        More blood flow means better oxygen delivery, improved nutrient
        transport, and the &ldquo;pump&rdquo; that people chase with
        pre-workouts &mdash; except this one is backed by data.
      </p>

      <Callout variant="evidence" title="52.9% more reps to failure">
        A landmark 2010 study in the{" "}
        <em>Journal of Strength and Conditioning Research</em> found that 8g of
        citrulline malate increased reps to failure by 52.9% across 8 sets of
        bench press, and significantly reduced muscle soreness at 24 and 48
        hours. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        <strong>Citrulline vs. citrulline malate:</strong> Citrulline malate
        is citrulline bonded to malic acid, typically in a 2:1 ratio. If a
        product says &ldquo;8g citrulline malate (2:1),&rdquo; you&rsquo;re
        getting about 5.3g of actual citrulline. Pure L-citrulline at 6g
        delivers more active ingredient with less powder. Either works &mdash;
        just check the math.
      </p>

      <Callout variant="info" title="Why not just take arginine?">
        Oral arginine is subject to extensive first-pass metabolism in the
        liver &mdash; most of it gets broken down before reaching your
        bloodstream. Citrulline bypasses this entirely, making it a far more
        efficient way to raise arginine and nitric oxide levels.
      </Callout>

      <h3>Beta-Alanine &mdash; 3.2&ndash;6.4g Daily (Timing Flexible)</h3>
      <p>
        Beta-alanine increases muscle carnosine levels, which act as a pH
        buffer during intense exercise. When you&rsquo;re in the
        &ldquo;burn&rdquo; zone &mdash; hard sets of 8&ndash;15 reps, 400m
        sprints, rowing intervals, circuit training &mdash; carnosine
        buffers the hydrogen ions that cause that burning sensation and
        force you to stop. More carnosine means more reps before failure in
        the 1&ndash;4 minute effort range.
      </p>

      <Callout variant="evidence" title="Consistent performance improvement">
        A 2012 meta-analysis in <em>Amino Acids</em> (Hobson et al.) analyzed 15
        studies and found a statistically significant improvement in exercise
        capacity for efforts lasting 60&ndash;240 seconds — roughly 2.85%
        improvement. <EvidenceBadge level="strong" />
      </Callout>

      <p>
        Like creatine, beta-alanine works through chronic loading, not
        acute dosing. You need 3&ndash;4 weeks of daily use to fully
        elevate muscle carnosine. Taking it pre-workout is fine, but
        it&rsquo;s not doing anything <em>at that moment</em> &mdash; the
        benefit is from the accumulated carnosine in your muscles.
      </p>

      <Callout variant="info" title="About the tingling">
        Beta-alanine causes paresthesia &mdash; a harmless tingling in the
        skin, usually in the face, ears, and hands. It&rsquo;s dose-dependent
        and completely benign. If it bothers you, split the daily dose across
        two servings or use a sustained-release formulation.
      </Callout>

      <ProductCallout product={PRODUCTS["thorne-beta-alanine"]} />

      <h3>Caffeine &mdash; 3&ndash;6mg/kg Bodyweight (30 Min Before Training)</h3>
      <p>
        Caffeine is the most reliable acute performance enhancer we have.
        The mechanisms are well-understood: it blocks adenosine receptors
        (reducing perceived fatigue), increases catecholamine release
        (improving alertness and reaction time), and enhances calcium
        release in muscle fibers (directly improving force output).
      </p>

      <Callout variant="evidence" title="Broad performance benefits confirmed">
        A 2019 umbrella review in the <em>British Journal of Sports Medicine</em>{" "}
        (Grgic et al.) concluded that caffeine improves muscle strength, power,
        endurance, and high-intensity exercise performance across a wide range
        of activities. Evidence-based dose: 3&ndash;6mg/kg bodyweight (210&ndash;420mg
        for a 70kg person). <EvidenceBadge level="strong" />
      </Callout>

      <p>
        <strong>Tolerance and dosing strategy:</strong> Caffeine tolerance
        is real and determines how much you need. If you&rsquo;re a regular
        coffee drinker (3+ cups/day), your adenosine receptors have
        upregulated &mdash; you&rsquo;ll need the higher end (5&ndash;6mg/kg)
        and even then the boost may be blunted. If you rarely consume
        caffeine, start low (2&ndash;3mg/kg). The performance benefits will
        be more pronounced, and you&rsquo;ll avoid the jitters, anxiety, and
        GI distress that hit caffeine-naive people at full dose.
      </p>
      <p>
        <strong>Will you build tolerance over time?</strong> Yes, but the
        speed depends on frequency. Daily caffeine use builds meaningful
        tolerance within 1&ndash;3 weeks. If you only use caffeine
        3&ndash;4 times per week for training, tolerance builds more
        slowly. To maintain sensitivity long-term, consider cycling off
        caffeine entirely for 7&ndash;14 days every 2&ndash;3 months. The
        withdrawal is unpleasant (headaches and fatigue for 2&ndash;5 days),
        but resensitization is rapid and the ergogenic effects come back
        stronger. If you don&rsquo;t drink coffee or tea at all, you
        likely won&rsquo;t need to cycle &mdash; your baseline sensitivity
        stays high as long as you&rsquo;re only using caffeine a few times
        per week pre-training.
      </p>

      <Callout variant="warning" title="The sleep tradeoff">
        Caffeine has a half-life of 5&ndash;7 hours. If you train at 4pm and
        take 300mg, you&rsquo;ll still have ~150mg circulating at 10pm. If
        sleep quality matters to you, keep afternoon doses moderate or train
        earlier.
      </Callout>

      <p>
        For more on caffeine and supplement interactions, see our{" "}
        <a href="/guides/supplement-timing-guide">
          supplement timing guide
        </a>. For the full sleep protocol, see our{" "}
        <a href="/guides/best-sleep-supplement-protocol">
          sleep supplement guide
        </a>.
      </p>

      <h2>Optional Additions (Emerging Evidence)</h2>

      <h3>Beetroot Powder / Dietary Nitrate &mdash; 400mg Nitrate (60&ndash;90 Min Before)</h3>
      <p>
        Dietary nitrate from beetroot converts to nitric oxide via a
        different pathway than citrulline, improving oxygen efficiency
        during aerobic exercise. A 2017 systematic review in{" "}
        <em>Nutrients</em> found consistent improvements in time-trial
        performance and time to exhaustion in endurance activities. <EvidenceBadge level="moderate" /> Less
        relevant for pure strength training, but a solid addition if your
        training includes significant cardio or conditioning work.
      </p>

      <h3>Alpha-GPC &mdash; 300&ndash;600mg (30 Min Before)</h3>
      <p>
        A choline source that may increase acetylcholine availability and
        acute growth hormone output. A 2008 study in the{" "}
        <em>Journal of the International Society of Sports Nutrition</em>{" "}
        found 600mg Alpha-GPC increased bench press power output by 14%. <EvidenceBadge level="emerging" />{" "}
        The evidence is promising but limited to a handful of small studies.
        Consider it experimental rather than foundational.
      </p>

      <h2>What to Skip (and Why)</h2>

      <Callout variant="warning" title="BCAAs are unnecessary with adequate protein">
        A 2017 review in the <em>JISSN</em> (Wolfe) concluded that BCAAs alone
        cannot stimulate muscle protein synthesis to a meaningful degree. If you
        eat 1.6g+ protein per kg bodyweight daily, you&rsquo;re already getting
        more BCAAs than any supplement provides. <EvidenceBadge level="strong" />
      </Callout>

      <h3>L-Arginine</h3>
      <p>
        As mentioned above, oral arginine gets destroyed in first-pass
        liver metabolism. Citrulline is the objectively better route to
        raising arginine levels. Arginine in a pre-workout is filler, not
        function.
      </p>

      <h3>Proprietary &ldquo;Pump&rdquo; and &ldquo;Focus&rdquo; Blends</h3>
      <p>
        Ingredients like agmatine sulfate, huperzine A, and various plant
        extracts with aggressive marketing names (&ldquo;NeuroDrive
        Complex&rdquo;) either lack clinical evidence at the doses used in
        commercial products or have evidence so preliminary that
        recommending them is premature. If you can&rsquo;t find the
        ingredient studied at that dose in a peer-reviewed journal,
        it&rsquo;s marketing. Our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          label reading guide
        </a>{" "}
        covers how to spot this pattern.
      </p>

      <h2>Why Building Your Own Is Better</h2>

      <Callout variant="tip" title="DIY vs. commercial pre-workout">
        Individual bulk ingredients cost ~$0.30&ndash;$0.60 per workout at full
        clinical doses. A name-brand pre-workout runs $1.50&ndash;$2.50 per
        scoop at sub-clinical doses. You&rsquo;re paying more for less.
      </Callout>

      <ul>
        <li>
          <strong>You control the doses.</strong> Most commercial
          pre-workouts contain 1&ndash;2g of citrulline when the clinical
          dose is 6&ndash;8g. They include 1.5g of creatine when you need
          5g. They&rsquo;re selling you label decoration at clinical
          price points.
        </li>
        <li>
          <strong>You skip the junk.</strong> No artificial dyes (Red 40,
          Blue 1), no sucralose, no mysterious proprietary blends. Just
          the active ingredients.
        </li>
        <li>
          <strong>It&rsquo;s cheaper.</strong> Individual bulk ingredients
          cost roughly $0.30&ndash;$0.60 per workout at full clinical doses.
          A name-brand pre-workout runs $1.50&ndash;$2.50 per scoop at
          sub-clinical doses. You&rsquo;re paying more for less.
        </li>
        <li>
          <strong>You can customize.</strong> Train in the evening? Skip the
          caffeine. Already take creatine separately? Leave it out. Building
          your own means every ingredient is there for a reason.
        </li>
      </ul>

      <h2>The Protocol: Putting It All Together</h2>

      <ScheduleTable
        title="Pre-workout protocol"
        slots={[
          {
            emoji: "📅",
            label: "Daily",
            time: "Any time (chronic loading)",
            color: "#6B7280",
            supplements: [
              "Creatine monohydrate: 5g",
              "Beta-alanine: 3.2g (can split to reduce tingling)",
            ],
            note: "These work through saturation — timing is irrelevant, consistency is everything",
          },
          {
            emoji: "💪",
            label: "Pre-Training",
            time: "30–60 min before",
            color: "#F97316",
            supplements: [
              "L-Citrulline: 6–8g (or 8–10g citrulline malate)",
              "Caffeine: 200–400mg based on bodyweight (optional)",
            ],
            note: "Mix in water — it won't taste like Blue Raspberry Explosion™, but it'll actually work",
          },
        ]}
      />

      <ProductRow
        title="Build the evidence-based pre-workout"
        products={[
          PRODUCTS["thorne-creatine"],
          PRODUCTS["thorne-beta-alanine"],
          PRODUCTS["nootropics-depot-creatine"],
        ]}
      />

      <h2>The Protocol: Full Stack at a Glance (Timing Table)</h2>

<p>Here's your complete <strong>pre-workout supplement protocol</strong> in one reference table. Screenshot it, print it, save it to your phone — this is the "just tell me what to do" version of everything covered above.</p>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr>
<th className="border-b-2 border-gray-300 p-2">Ingredient</th>
<th className="border-b-2 border-gray-300 p-2">Dose</th>
<th className="border-b-2 border-gray-300 p-2">When to Take</th>
<th className="border-b-2 border-gray-300 p-2">Rest Days?</th>
<th className="border-b-2 border-gray-300 p-2">~Cost/Dose</th>
</tr>
</thead>
<tbody>
<tr>
<td className="border-b border-gray-200 p-2"><strong>Creatine Monohydrate</strong></td>
<td className="border-b border-gray-200 p-2">5 g</td>
<td className="border-b border-gray-200 p-2">Any time (chronic loading)</td>
<td className="border-b border-gray-200 p-2">Yes — daily</td>
<td className="border-b border-gray-200 p-2">$0.05–$0.10</td>
</tr>
<tr>
<td className="border-b border-gray-200 p-2"><strong>L-Citrulline</strong></td>
<td className="border-b border-gray-200 p-2">6–8 g</td>
<td className="border-b border-gray-200 p-2">30–60 min pre-training</td>
<td className="border-b border-gray-200 p-2">No</td>
<td className="border-b border-gray-200 p-2">$0.15–$0.25</td>
</tr>
<tr>
<td className="border-b border-gray-200 p-2"><strong>Beta-Alanine</strong></td>
<td className="border-b border-gray-200 p-2">3.2–6.4 g</td>
<td className="border-b border-gray-200 p-2">Any time (chronic loading)</td>
<td className="border-b border-gray-200 p-2">Yes — daily</td>
<td className="border-b border-gray-200 p-2">$0.08–$0.15</td>
</tr>
<tr>
<td className="border-b border-gray-200 p-2"><strong>Caffeine</strong></td>
<td className="border-b border-gray-200 p-2">3–6 mg/kg BW</td>
<td className="border-b border-gray-200 p-2">30 min pre-training</td>
<td className="border-b border-gray-200 p-2">No (or at baseline intake)</td>
<td className="border-b border-gray-200 p-2">$0.02–$0.08</td>
</tr>
</tbody>
</table>
</div>

<p><strong>Total cost per training day: roughly $0.30–$0.58.</strong> On rest days you're only taking creatine and beta-alanine, so about $0.13–$0.25. Compare that to $1.50–$2.50 per scoop for a branded pre-workout that likely underdoses at least two of these ingredients.</p>

<Callout variant="info" title="Timing shortcut">
Mix citrulline and caffeine together in water 30–60 minutes before you train. Toss creatine and beta-alanine into the same glass or take them separately at any point during the day — their benefits come from daily saturation, not acute timing. See our <a href="/guides/supplement-timing-guide">supplement timing guide</a> for more detail.
</Callout>

<p>If you train in the evening and need to protect sleep, drop the caffeine entirely. The remaining three ingredients carry independent, well-documented benefits — you're not gutting the protocol, you're just removing the stimulant. Our <a href="/guides/best-sleep-supplement-protocol">sleep supplement guide</a> covers how to manage that tradeoff.</p>

      <h2>Who Should NOT Use This Stack (Contraindications)</h2>

<p>Pre-workout supplement contraindications exist for good reason — several ingredients in this protocol interact with medical conditions and medications in ways that go beyond "check with your doctor" boilerplate. If you fall into any of these categories, you need to modify or skip specific components entirely.</p>

<h3>Pregnant or Nursing Women</h3>
<p>The American College of Obstetricians and Gynecologists recommends capping caffeine at 200mg/day during pregnancy. The performance doses in this protocol (210–420mg) exceed that ceiling outright. Beyond caffeine, safety data for supplemental L-citrulline, beta-alanine, and beetroot extract during pregnancy and lactation is essentially nonexistent — not "probably fine," but unstudied. <strong>Consult your OB-GYN before using any component of this stack.</strong></p>

<h3>People on Antihypertensives or Nitrates</h3>
<p>Both citrulline and beetroot powder lower blood pressure through nitric oxide–mediated vasodilation. If you're taking ACE inhibitors, ARBs, calcium channel blockers, or especially nitrate medications (nitroglycerin, isosorbide), stacking additional NO precursors risks symptomatic hypotension — dizziness, fainting, or worse. <strong>Talk to your prescribing physician before adding either ingredient.</strong> This is not theoretical; the vasodilatory mechanisms are well-established. <EvidenceBadge level="strong" /></p>

<Callout variant="warning" title="Cardiac Arrhythmia History">Caffeine at 3–6mg/kg increases catecholamine release and can provoke atrial fibrillation, SVT, or ectopic beats in susceptible individuals. If you have a history of arrhythmia or are on antiarrhythmic medication, caffeine at performance doses is a specific risk — not a vague one. Discuss any stimulant use with your cardiologist.</Callout>

<h3>Adolescents Under 18</h3>
<p>None of the performance dosing in this protocol has been validated in minors. Caffeine at 3–6mg/kg poses cardiovascular and neurodevelopmental concerns in adolescents, and the long-term effects of chronic beta-alanine and citrulline supplementation in developing bodies are simply unknown. The <a href="/guides/best-pre-workout-supplement-protocol">full protocol</a> is designed for healthy adults.</p>

<h3>Anxiety Disorders</h3>
<p>Caffeine is a well-documented anxiogenic at the doses discussed here. A 2022 review by Temple et al. in <em>Frontiers in Psychiatry</em> confirmed dose-dependent increases in anxiety symptoms, particularly in individuals with generalized anxiety or panic disorder. If you're on SSRIs, SNRIs, or benzodiazepines, adding 200–400mg of caffeine complicates the picture considerably. You can still use citrulline, creatine, and beta-alanine — just drop the caffeine or work with your provider on a tolerable dose.</p>

<Callout variant="info" title="Bring Your Full List">Print or screenshot every supplement you're taking — and considering — and bring it to your next provider visit. Interactions between supplements and medications are underreported precisely because patients don't disclose them. Your doctor can't flag a problem they don't know about.</Callout>

      <h2>If You Can Only Start With One Ingredient</h2>

<p>If you can only start with one ingredient, make it creatine monohydrate. It has the largest effect size of any sports supplement ever studied, costs roughly $0.05–$0.10 per day at the full 5g dose, and requires zero timing precision — take it whenever you remember. <EvidenceBadge level="strong" /> A 2003 meta-analysis by Branch found creatine increased strength performance by roughly 8% and power output by 14% across 96 studies. No other legal supplement comes close to that magnitude.</p>

<p>Once creatine is locked in, add <strong>caffeine</strong> — but only if you tolerate it well. It's the strongest acute performance enhancer in this stack, and you already know if your body handles it (you drink coffee or you don't). A 200mg caffeine tablet costs less than a cent. If you're caffeine-sensitive or train at night, skip it entirely and move to step three.</p>

<p>Third priority: <strong>L-citrulline</strong>. The blood flow and endurance-to-failure benefits are meaningful, especially for higher-rep training. But at 6–8g per session, the powder goes faster and costs more than creatine. It's worth adding once your budget stabilizes.</p>

<p>Last: <strong>beta-alanine</strong>. The Hobson et al. (2012) meta-analysis showed a real but modest ~2.85% improvement in exercise capacity for efforts lasting 60–240 seconds. That's statistically significant but the smallest effect size of the four. It also takes 3–4 weeks of daily loading before you see anything. If you're on a tight budget, this is the one that can wait.</p>

<Callout variant="info" title="The priority order">
<strong>Creatine → Caffeine → Citrulline → Beta-Alanine.</strong> Start with creatine alone for a month. You'll spend under $3 total, build the daily habit, and see real strength gains before adding complexity. Each subsequent ingredient is additive — none of them depend on the others to work.
</Callout>

      <h3>Kidney Disease, Creatine, and Renal Contraindications</h3>

      <p><strong>Creatine and kidney disease</strong> is one of the most searched safety questions in sports nutrition — and for good reason. Creatine supplementation reliably raises serum creatinine levels by 20–30%, because creatinine is a direct metabolic byproduct of creatine breakdown in muscle. Serum creatinine is also the standard biomarker clinicians use to estimate kidney function (eGFR). This creates a diagnostic collision: your lab work may look like kidney impairment when your kidneys are actually fine.</p>

      <Callout variant="warning" title="False Positives on Kidney Function Tests">If you're supplementing 5g creatine daily and get blood work, your eGFR may read artificially low. Tell your doctor you're taking creatine <em>before</em> they interpret the results. A cystatin C–based eGFR test can provide an alternative measure unaffected by creatine intake.</Callout>

      <p>In healthy adults, long-term creatine use at standard doses does not appear to impair renal function. A 2018 systematic review by de Souza e Silva et al. in the <em>Journal of Renal Nutrition</em> found no adverse effects on kidney function across studies lasting up to five years in individuals with normal baseline renal health. <EvidenceBadge level="strong" /> That said, the evidence base is almost entirely drawn from people with two functioning kidneys and no pre-existing renal pathology.</p>

      <p>If you have <strong>chronic kidney disease (any stage), a single kidney, or a history of kidney stones</strong>, the calculus changes entirely. Creatine increases the metabolic load your kidneys must clear. Evidence in these populations is too limited to confirm safety, and nephrologists generally advise against supplementation as a precaution. A 2019 position statement from the <em>National Kidney Foundation</em> explicitly flagged creatine as a supplement warranting clinical discussion for anyone with compromised renal function.</p>

      <Callout variant="info" title="Who Needs Specialist Clearance">Anyone with diagnosed kidney disease, reduced eGFR unrelated to creatine use, polycystic kidney disease, a solitary kidney, or a history of recurrent kidney stones should consult a nephrologist before starting 5g daily creatine. This isn't boilerplate — it's a specific contraindication. Bring your supplement list to the appointment.</Callout>

      <p>For everyone else: get baseline blood work before you start, mention creatine use at every lab draw, and don't panic if your creatinine ticks up modestly. That's pharmacokinetics, not pathology. For more on integrating creatine into your protocol safely, see our <a href="/guides/creatine-loading-phase">creatine loading guide</a>.</p>

      <h2>Total Daily Caffeine Intake: Adding It All Up</h2>

      <p>Your total daily caffeine intake matters more than your pre-workout dose in isolation. The 3–6 mg/kg recommendation above (210–420 mg for a 70 kg person) assumes that dose is essentially your only meaningful caffeine source for the day. For many people, it won't be.</p>

      <p>An 8 oz cup of brewed coffee contains roughly 80–100 mg of caffeine. A large coffee-shop pour can hit 200–300 mg on its own. Black tea runs 40–70 mg per cup. An afternoon energy drink adds another 80–200 mg. If you drink two cups of coffee in the morning and then take 300 mg of caffeine before an afternoon session, you're already at 500–600 mg — and that's a conservative scenario.</p>

      <Callout variant="warning" title="The 400 mg/day General Safety Ceiling">
      Both the <strong>EFSA (2015)</strong> and the <strong>FDA</strong> identify 400 mg/day as the level below which adverse effects are unlikely in healthy, non-pregnant adults. This is not a performance target — it's a risk threshold. Exceeding it doesn't guarantee problems, but the incidence of anxiety, insomnia, tachycardia, and GI distress rises meaningfully above this line. <EvidenceBadge level="strong" />
      </Callout>

      <p>To stay within that ceiling while still using caffeine as an ergogenic aid, you have two practical options. First, <strong>audit your background intake</strong> — track every caffeinated beverage for a few days and get an honest baseline number. Most people underestimate by 30–50%. Second, <strong>subtract that baseline from 400 mg</strong> to find your available pre-workout budget. If you drink 200 mg worth of coffee before noon, your pre-workout caffeine should cap at roughly 200 mg — not the 5–6 mg/kg dose suggested for high-tolerance users.</p>

      <p>If the math leaves you with less than 2 mg/kg for training, the ergogenic benefit becomes marginal. At that point, you're better off either cycling off daily coffee for a resensitization period (see the caffeine tolerance section above) or dropping the pre-workout caffeine entirely. The remaining three ingredients in this protocol — creatine, citrulline, and beta-alanine — don't depend on caffeine to work. For more on managing caffeine around sleep, see our <a href="/guides/best-sleep-supplement-protocol">sleep supplement guide</a>.</p>

      <Callout variant="info" title="Quick Math">
      Morning coffee (2 cups): ~180 mg. Afternoon tea: ~50 mg. Pre-workout caffeine tablet: 200 mg. <strong>Total: 430 mg</strong> — already over the general safety ceiling. Know your number before you dose.
      </Callout>

      <h3>Creatine and Water Retention: What to Expect in the First Two Weeks</h3>

      <p>Creatine and water retention go hand in hand — and it's the number one reason people quit the most effective supplement in this protocol before it has a chance to work. Here's what's actually happening so you don't panic when the scale moves.</p>

      <p>Creatine is an osmolyte. When your muscles accumulate it, water follows via osmotic gradient into the intracellular space. This isn't bloating and it isn't fat gain — it's your muscle cells becoming more hydrated. A 2003 study by Powers et al. in the <em>Journal of Athletic Training</em> measured a mean body mass increase of roughly 1.0–2.0 kg within the first 5–7 days of supplementation at 20g/day (loading) and similar gains over 2 weeks at the standard 5g/day dose. <EvidenceBadge level="strong" /></p>

      <p>This intracellular hydration is the <strong>intended mechanism</strong>, not a side effect. Cell swelling triggers anabolic signaling pathways — evidence suggests it upregulates protein synthesis and inhibits proteolysis (Häussinger et al., 1993). In practical terms, fuller muscle cells are stronger muscle cells. The "water weight" is doing something useful.</p>

      <Callout variant="info" title="What the Scale Will Show">
      Expect a 1–2 kg increase in body weight within the first 7–14 days. This stabilizes once muscle creatine stores reach saturation (~160 mmol/kg dry muscle). After that initial bump, further weight changes reflect actual tissue gain or loss, not ongoing water accumulation.
      </Callout>

      <p>If you're tracking body composition, use waist measurements or skinfold calipers alongside the scale during weeks one and two. The scale alone will mislead you. And if you're cutting, don't reduce calories to "compensate" — the water is intramuscular and temporary in its rate of change, not a signal that your diet is off.</p>

      <Callout variant="warning" title="Don't Quit Over Scale Weight">
      Discontinuing creatine because of a 1.5 kg bump in week one means abandoning the supplement with the largest effect size in sports nutrition — roughly 8% strength and 14% power improvements (Branch, 2003) — over a cosmetically irrelevant and physiologically beneficial water shift.
      </Callout>

      <p>For more on the loading phase and how quickly saturation occurs, see our <a href="/guides/creatine-loading-phase">creatine loading guide</a>.</p>

      <h2>What to Buy: Quality Standards and Trusted Vendors</h2>

      <p><strong>Quality standards for pre-workout supplements</strong> matter more than most people realize. A 2018 study by Labdoor found that 52% of supplement products tested had measurable discrepancies between label claims and actual contents. Some contained contaminants — heavy metals, undeclared stimulants, or banned substances — that never appeared on the label. If you're a drug-tested athlete, a single contaminated batch can end your career. If you're not, you still deserve to know what you're swallowing.</p>

      <h3>Third-Party Certifications Worth Trusting</h3>

      <p><strong>NSF Certified for Sport</strong> is the gold standard. Products bearing this mark are tested for over 270 banned substances, verified for label accuracy, and subject to unannounced facility audits. The NFL, MLB, and NCAA all recognize it. <strong>Informed Sport</strong> runs a similar program with batch-specific testing — every production run gets screened before release. Either certification dramatically reduces your contamination risk. <EvidenceBadge level="strong" /></p>

      <p>For creatine specifically, look for <strong>Creapure®</strong> — a pharmaceutical-grade creatine monohydrate manufactured by AlzChem in Germany. It's produced via chemical synthesis rather than extracted from animal byproducts, which means fewer impurities (specifically lower levels of creatinine, dicyandiamide, and dihydrotriazine). Most reputable bulk creatine brands source from Creapure and say so on the label.</p>

      <h3>Where to Actually Buy</h3>

      <p>For bulk individual ingredients at clinical doses, <strong>Nutricost</strong>, <strong>BulkSupplements</strong>, and <strong>NOW Sports</strong> consistently offer transparent labeling, third-party testing documentation, and reasonable pricing. Nutricost's creatine monohydrate is Creapure-sourced. NOW Sports carries NSF Certified for Sport options across several lines. All three are available on Amazon and direct.</p>

      <Callout variant="info" title="Use the Formulate Catalog">
      Rather than Googling individual brands and cross-referencing certifications yourself, use the <a href="/guides/how-to-read-a-supplement-label">Formulate catalog</a> to compare products by actual ingredient doses, certification status, and cost per serving. It's built to answer exactly this question.
      </Callout>

      <Callout variant="warning" title="Drug-Tested Athletes">
      If you compete in any tested sport, <em>only</em> use products carrying NSF Certified for Sport or Informed Sport marks. "Third-party tested" without specifying the certifying body is marketing language, not a quality guarantee.
      </Callout>

      <h2>Who Should Talk to a Doctor First</h2>
      <p>
        The four core ingredients in this protocol are well-studied in healthy adults, but several populations face specific risks that the general dosing guidance above doesn't cover. If any of the following apply to you, get clinical input before starting.
      </p>

      <Callout variant="warning" title="If you take blood pressure medication">
        Both citrulline and beetroot nitrate lower blood pressure via nitric oxide pathways. Combined with antihypertensives, this could cause dangerous hypotension. Talk to your prescribing physician before adding either ingredient.
      </Callout>

      <Callout variant="warning" title="If you're under 18">
        Caffeine at the doses discussed here (3–6mg/kg) poses cardiovascular and developmental concerns for adolescents. No part of this protocol has been validated for minors. Talk to your healthcare provider — and a parent — before using any of these compounds.
      </Callout>

      <Callout variant="warning" title="If you have an anxiety disorder">
        Caffeine at performance doses is a potent anxiogenic — well beyond the "jitters" mentioned above. If you have generalized anxiety, panic disorder, or are on anxiolytic medication, discuss caffeine use and dosing with your provider before adding it to any stack.
      </Callout>

      <Callout variant="warning" title="If you're pregnant or breastfeeding">
        Safety data for supplemental citrulline, beta-alanine, and high-dose caffeine during pregnancy or lactation is insufficient for a recommendation. Consult your OB-GYN before using any of these.
      </Callout>

      <Callout variant="warning" title="If you're over 50">
        Caffeine sensitivity tends to increase with age, and interactions with common medications (statins, beta-blockers, etc.) become more likely. Talk to your healthcare provider about appropriate dosing — especially for caffeine and the nitric oxide precursors.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list — including what you're considering — to your next provider visit.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Can I just buy a pre-workout that has these ingredients at the right doses?</h3>
      <p>
        You can, and some products do get the formulation right &mdash;
        full clinical doses, transparent labels, no proprietary blends.
        They exist, but they&rsquo;re the minority. The key is checking
        that citrulline is at 6g+, creatine at 5g, and beta-alanine at
        3.2g+. If any of those are missing or underdosed, you&rsquo;re
        paying a premium for an incomplete product. Use the Formulate
        catalog to compare products by actual ingredient doses, not
        marketing claims.
      </p>

      <h3>Should I take pre-workout on rest days?</h3>
      <p>
        The chronic-loading ingredients (creatine and beta-alanine) should
        be taken daily, including rest days &mdash; they work through
        sustained tissue saturation. Citrulline and caffeine are
        acute-effect compounds and only need to be taken before training
        sessions. So on rest days, just take your creatine and
        beta-alanine whenever is convenient.
      </p>

      <h3>Is caffeine necessary, or can I skip it?</h3>
      <p>
        Caffeine provides the most noticeable acute performance boost, but
        it&rsquo;s entirely optional. If you&rsquo;re caffeine-sensitive,
        train late in the day, or simply prefer not to use stimulants, the
        other three ingredients carry their own independent benefits.
        You&rsquo;re not &ldquo;missing out&rdquo; in any meaningful
        way &mdash; you&rsquo;re just skipping the stimulant component.
      </p>

      <h3>How long does it take to notice the effects?</h3>
      <p>
        Caffeine and citrulline work acutely &mdash; you&rsquo;ll feel
        caffeine within 30 minutes, and citrulline&rsquo;s blood flow
        effects peak around 60 minutes. Creatine and beta-alanine require
        3&ndash;4 weeks of daily loading before performance benefits
        emerge. If you &ldquo;don&rsquo;t feel anything&rdquo; after one
        workout with creatine and beta-alanine, that&rsquo;s expected &mdash;
        stay consistent.
      </p>

      <h3>Do I need a pre-workout supplement?</h3>
      <p>No. For most trainees, creatine, caffeine, and adequate carbs cover 90% of the performance benefit a pre-workout delivers. Dedicated pre-workouts add convenience and extras like beta-alanine and citrulline &mdash; useful but not essential. If you're new to lifting, a simple cup of coffee 30&ndash;60 minutes before training is a reasonable starting protocol.</p>

      <h3>How much caffeine is effective before training?</h3>
      <p>3&ndash;6 mg per kg of bodyweight, taken 30&ndash;60 minutes before training. That's roughly 200&ndash;400 mg for most adults. Above 6 mg/kg, side effects (jitters, GI distress, elevated heart rate) rise without additional performance benefit. Regular caffeine consumers may need the higher end of this range due to tolerance.</p>

      <h3>What does citrulline actually do?</h3>
      <p>L-citrulline raises plasma arginine, which supports nitric oxide production and vasodilation. Effective doses are 6&ndash;8g of L-citrulline or 8g of citrulline malate. Meta-analyses show small but measurable increases in reps-to-failure and reductions in perceived exertion. Most commercial pre-workouts underdose it &mdash; check for at least 6g per serving.</p>

      <h3>is pre-workout safe during pregnancy</h3>
      <p>The guide doesn't cover pregnancy or prenatal contraindications. This is a meaningful gap: the caffeine doses recommended here (3&ndash;6mg/kg, or 210&ndash;420mg for a 70kg person) far exceed the 200mg/day ceiling widely cited for pregnancy. Do not follow this protocol while pregnant without explicit medical clearance. Consult your OB or midwife before using any pre-workout supplement, including individual ingredients like caffeine and creatine.</p>

      <h3>does creatine cause hair loss</h3>
      <p>The guide doesn't address this concern. The hypothesis comes from a single 2009 study showing creatine supplementation raised DHT (a hormone linked to androgenic hair loss) in rugby players &mdash; but no study has directly measured creatine's effect on hair loss. Current evidence is insufficient to confirm a causal link. If you have a personal or family history of androgenic alopecia and are concerned, discuss creatine use with a dermatologist or physician before starting.</p>

      <h3>pre-workout supplement interactions with SSRIs / antidepressants</h3>
      <p>The guide doesn't cover drug interactions. This is a real concern: caffeine interacts with MAOIs (a class of antidepressants) and can potentiate cardiovascular side effects. High-dose citrulline may amplify the blood-pressure-lowering effects of certain medications, including PDE5 inhibitors. If you take any prescription medication &mdash; including antidepressants &mdash; consult your prescribing physician or pharmacist before adding high-dose caffeine or citrulline to your routine.</p>

      <h3>best pre-workout for women</h3>
      <p>The guide's dosing examples use a 70kg reference, but the principles apply to any bodyweight &mdash; caffeine is dosed per kilogram, so a 60kg woman would use 180&ndash;360mg rather than 210&ndash;420mg. The guide doesn't address sex-specific differences in caffeine sensitivity or creatine response rates. Women tend to have smaller absolute muscle mass, which can affect creatine saturation timelines. The core stack (creatine, citrulline, beta-alanine, optional caffeine) has evidence across sexes; adjust all weight-based doses to your actual bodyweight.</p>

      <h3>how to mix creatine and citrulline together &mdash; do they interact</h3>
      <p>The guide doesn't address mixing compatibility directly. There is no known chemical interaction between creatine monohydrate, L-citrulline, and beta-alanine that would reduce their efficacy when combined in one shaker. Practically, creatine monohydrate dissolves best in warm water and may clump in cold liquid; citrulline and beta-alanine dissolve readily. Mixing all four ingredients in a single serving is standard practice and the guide explicitly recommends it for convenience &mdash; no special sequencing or separation is required.</p>

      <h3>citrulline malate vs L-citrulline which to buy</h3>
      <p>Buy whichever form delivers 6&ndash;8g of actual citrulline at the lowest cost per dose. The guide explains the math clearly: citrulline malate (2:1) is roughly 67% citrulline by weight, so you need ~9&ndash;12g of the bonded form to match 6&ndash;8g of pure L-citrulline. Pure L-citrulline typically requires less powder per effective dose and is often cheaper per gram of active ingredient. Check the label math on any product before buying &mdash; the form matters less than hitting the clinical dose.</p>

      <h3>pre-workout without caffeine &mdash; does it actually work</h3>
      <p>Yes, with realistic expectations. The guide notes caffeine is optional, and the remaining three ingredients carry independent, well-documented benefits: creatine increases strength and power output, beta-alanine improves capacity in the 60&ndash;240 second effort range, and citrulline increased reps to failure by 52.9% in a key bench press study. You won't get the acute alertness or perceived-fatigue reduction that caffeine provides, but the structural performance benefits from a stimulant-free stack are real &mdash; they just require 3&ndash;4 weeks of consistent loading to fully emerge.</p>

      <h2>Build This Stack in Formulate</h2>
      <p>
        Add each ingredient to your stack in the Formulate app to track
        your doses, see evidence scores, and calculate your real per-day
        cost. The app scores every product on clinical dose alignment, label
        transparency, and third-party testing so you can compare brands
        objectively rather than by marketing.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog?q=pre-workout">
          Browse pre-workout supplements in the catalog &rarr;
        </a>
      </p>
    </>
  );
}
