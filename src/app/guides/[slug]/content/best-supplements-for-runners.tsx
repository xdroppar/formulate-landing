import {
  TLDRBox,
  Callout,
  ProductCallout,
  ComparisonTable,
  EvidenceBadge,
  IngredientLink,
  PRODUCTS,
} from "@/components/guide";

export function BestSupplementsForRunners() {
  return (
    <>
      <TLDRBox
        readTime="11 min read"
        takeaways={[
          "Iron deficiency is rampant in runners — get ferritin tested before supplementing, aiming for >30 ng/mL",
          "Caffeine (3–6 mg/kg) is the single strongest legal ergogenic aid for endurance performance",
          "Creatine isn't just for lifters — 3–5 g/day improves recovery between hard sessions and glycogen resynthesis",
          "Beetroot juice (6–12 mmol nitrate) can reduce the oxygen cost of running by 1–3%, meaningful over marathon distance",
          "BCAAs, glutamine, and HMB are popular money pits — skip them if your daily protein is adequate",
          "Electrolytes matter for runs over 60 minutes, especially in heat — but most commercial sports drinks are mostly sugar",
        ]}
      />

      <p>
        The best supplements for runners target the specific physiological demands of endurance training: oxygen transport, muscle buffering, glycogen resynthesis, and connective tissue repair. The short list with real evidence is{" "}
        <IngredientLink id="iron" source="best-supplements-for-runners">iron</IngredientLink> (only if deficient),{" "}
        <IngredientLink id="creatine" source="best-supplements-for-runners">creatine</IngredientLink>,{" "}
        <IngredientLink id="electrolytes" source="best-supplements-for-runners">electrolytes</IngredientLink>, and{" "}
        <IngredientLink id="omega-3" source="best-supplements-for-runners">omega-3s</IngredientLink> &mdash; everything else is mostly noise.
      </p>

      <h2>Why Runner Supplement Needs Are Different</h2>

      <p>
        Running imposes unique stresses that other sports don&rsquo;t. Repetitive foot-strike hemolysis destroys red blood cells. Long sessions deplete glycogen and electrolytes at rates that exceed what diet alone can replenish mid-effort. Eccentric loading through thousands of ground contacts triggers inflammation that compound over weeks of training.
      </p>

      <p>
        These aren&rsquo;t theoretical concerns. A 2019 survey by Sim et al. found iron deficiency in up to 35% of female distance runners. Hyponatremia hospitalizes marathoners every race season. And overtraining syndrome &mdash; partly driven by inadequate recovery nutrition &mdash; ends more training blocks than injuries do.
      </p>

      <p>
        The supplements that actually matter for runners address these specific bottlenecks. Here&rsquo;s the full breakdown, ordered roughly by strength of evidence.
      </p>

      <h2>Caffeine: The Most Reliable Ergogenic</h2>

      <p>
        If you only take one supplement on race day, make it caffeine. Decades of research make caffeine the most well-supported ergogenic aid in sport science. A meta-analysis by Southward et al. (2018) found a mean endurance performance improvement of ~2–4% at doses of 3&ndash;6 mg/kg body weight. <EvidenceBadge level="strong" /> For a 70 kg runner, that&rsquo;s 210&ndash;420 mg &mdash; roughly 2&ndash;3 cups of strong coffee consumed 30&ndash;60 minutes before the start.
      </p>

      <p>
        Caffeine works through multiple mechanisms: it blocks adenosine receptors in the brain (reducing perceived effort), spares glycogen by promoting fat oxidation early in exercise, and improves neuromuscular function. The performance benefit holds even in habitual coffee drinkers, though there&rsquo;s individual variation in the CYP1A2 gene that affects metabolism speed.
      </p>

      <Callout variant="tip" title="Race-day caffeine strategy">
        Take 3&ndash;6 mg/kg 45&ndash;60 minutes pre-race. For ultras and marathons, a second smaller dose (1&ndash;2 mg/kg) via caffeinated gel at the midpoint can extend the benefit. Avoid experimenting on race day &mdash; rehearse in training. For more on pre-training timing, see our <a href="/guides/best-pre-workout-supplement-protocol">best pre-workout supplement protocol</a>.
      </Callout>

      <h2>Iron: Test First, Supplement Second</h2>

      <p>
        Iron is arguably the most important micronutrient for runners &mdash; and the most commonly mismanaged. Hemoglobin carries oxygen to working muscles. When iron stores drop, VO2max falls, lactate accumulates faster, and easy runs feel hard. Runners lose iron through foot-strike hemolysis, GI microbleeding, and sweat at rates that non-athletes don&rsquo;t experience.
      </p>

      <p>
        The problem: supplementing iron when you don&rsquo;t need it is genuinely harmful. Iron overload damages organs. The only responsible approach is to test serum ferritin before supplementing. For our full breakdown on forms and dosing, see the <a href="/guides/iron-guide">iron guide</a>.
      </p>

      <Callout variant="warning" title="Key threshold">
        Many sports physicians flag ferritin below 30 ng/mL as suboptimal for athletes, even when standard lab ranges call it &ldquo;normal.&rdquo; If your ferritin is below 30, discuss supplementation (typically 30&ndash;100 mg elemental iron every other day for better absorption) with your doctor. Retest in 8&ndash;12 weeks.
      </Callout>

      <p>
        Female runners, vegetarian/vegan runners, and those training at altitude are at the highest risk. If you&rsquo;ve noticed declining performance despite consistent training, iron should be one of the first things you check.
      </p>
      <p>If your labs confirm low ferritin, Thorne&rsquo;s Iron Bisglycinate is a well-absorbed chelated form that&rsquo;s easier on the stomach than ferrous sulfate:</p>
      <ProductCallout product={PRODUCTS["thorne-iron-bisglycinate"]} />

      <h2>Electrolytes: Beyond the Sports Drink Aisle</h2>

      <p>
        For runs under 60 minutes, water is usually enough. Beyond that &mdash; especially in heat &mdash; sodium, potassium, and <a href="/guides/best-magnesium-supplements">magnesium</a> losses become meaningful. A liter of sweat contains roughly 900&ndash;1,400 mg sodium (McCubbin et al., 2019), and heavy sweaters can lose 2+ liters per hour. <EvidenceBadge level="moderate" />
      </p>

      <p>
        Most commercial sports drinks are engineered for taste, not physiology. They typically deliver 200&ndash;400 mg sodium per serving &mdash; a fraction of what you&rsquo;re losing. For serious long-run or race hydration, consider sodium-forward options (800&ndash;1,500 mg/L) or a DIY approach: 1/4 tsp salt + electrolyte powder in 500 mL water.
      </p>

      <p>
        For a deeper look at choosing the right electrolyte product, check our <a href="/guides/electrolytes-guide">electrolytes guide</a>. The key takeaway: match your electrolyte intake to your sweat rate and conditions, not to a marketing label.
      </p>
      <p>Thorne&rsquo;s Daily Electrolytes provide a sodium-forward formula with no added sugar, designed for real training conditions:</p>
      <ProductCallout product={PRODUCTS["thorne-daily-electrolytes"]} />

      <h2>Creatine Is for Runners Too</h2>

      <p>
        Most runners dismiss creatine as a &ldquo;gym bro&rdquo; supplement. That&rsquo;s a mistake. Creatine monohydrate at 3&ndash;5 g/day doesn&rsquo;t directly boost your marathon pace, but it meaningfully improves the quality of your training &mdash; particularly interval sessions, hill repeats, and tempo blocks that build the speed endurance determines race performance.
      </p>

      <p>
        Kreider et al. (2017) in the ISSN position stand confirmed creatine&rsquo;s role in improving repeated-bout exercise capacity and accelerating glycogen resynthesis post-exercise. <EvidenceBadge level="strong" studiesId="creatine-kreider-issn-2017" /> Both are directly relevant to runners doing multiple hard sessions per week. Evidence also suggests creatine may reduce muscle damage markers and inflammation after eccentric exercise &mdash; the exact type of loading distance running imposes.
      </p>

      <Callout variant="info" title="What about water retention?">
        Creatine pulls water into muscle cells, and initial loading can add 1&ndash;2 kg of body water. At 3&ndash;5 g/day without a loading phase, this is typically 0.5&ndash;1 kg &mdash; negligible over race distances and offset by training quality gains. Most competitive runners find the tradeoff worthwhile.
      </Callout>

      <p>
        For product comparisons and dosing details, see our guides on <a href="/guides/best-creatine-supplements">best creatine supplements</a> and <a href="/guides/creatine-for-endurance-athletes">creatine for endurance athletes</a>.
      </p>
      <p>Thorne&rsquo;s Creatine is NSF Certified for Sport and delivers pure creatine monohydrate with no fillers:</p>
      <ProductCallout product={PRODUCTS["thorne-creatine"]} />

      <h2>Beta-Alanine for Pace Work</h2>

      <p>
        Beta-alanine is the precursor to carnosine, a dipeptide that buffers hydrogen ions in working muscle. When you&rsquo;re running at 800 m&ndash;2 mile race pace and your legs start burning, that&rsquo;s partly acid accumulation. More carnosine means more buffering capacity before performance drops.
      </p>

      <p>
        A meta-analysis by Saunders et al. (2017) found that beta-alanine supplementation (3.2&ndash;6.4 g/day for 4+ weeks) improved exercise capacity in efforts lasting 1&ndash;4 minutes. <EvidenceBadge level="moderate" /> For distance runners, this translates to harder interval sessions, better kick finishes, and improved performance in middle-distance events.
      </p>

      <Callout variant="info" title="The tingling is harmless">
        Paresthesia &mdash; the pins-and-needles sensation in your face and hands &mdash; is a well-documented side effect of beta-alanine. It&rsquo;s caused by activation of sensory neurons and has no adverse health consequences. Splitting the dose into smaller servings (0.8&ndash;1.6 g) reduces it.
      </Callout>

      <p>
        If your primary events are 5K and shorter, or you do significant speed work, beta-alanine is worth considering. For pure marathon/ultra runners who rarely touch VO2max paces in racing, the benefit is smaller.
      </p>

      <h2>Nitrate/Beetroot for Endurance</h2>

      <p>
        Dietary nitrate &mdash; most commonly delivered via concentrated beetroot juice &mdash; gets converted to nitric oxide in the body, which improves blood vessel dilation and, crucially, reduces the oxygen cost of submaximal exercise. A meta-analysis by McMahon et al. (2017) found a 1&ndash;3% reduction in oxygen consumption during steady-state running after acute nitrate supplementation. <EvidenceBadge level="moderate" />
      </p>

      <p>
        One to three percent sounds small until you do the math over 42 km. That&rsquo;s the difference between a 3:10 and a 3:06 marathon. Effective dosing is 6&ndash;12 mmol nitrate, consumed 2&ndash;3 hours before exercise. Most concentrated beetroot shots deliver 6&ndash;7 mmol per serving.
      </p>

      <Callout variant="tip" title="Nitrate protocol for race day">
        For maximal effect, some researchers recommend &ldquo;loading&rdquo; with 6&ndash;12 mmol/day for 3&ndash;5 days before an event, with a final dose 2&ndash;3 hours pre-race. Avoid mouthwash on race morning &mdash; the oral bacteria that convert nitrate to nitrite live on your tongue, and antiseptic mouthwash kills them.
      </Callout>

      <p>
        Note: highly trained elite runners (VO2max &gt;65 mL/kg/min) may see smaller or no benefit. The effect appears strongest in recreational to sub-elite athletes.
      </p>

      <h2>Protein: Post-Run Recovery</h2>

      <p>
        Runners chronically under-eat protein. The ISSN recommends 1.4&ndash;1.8 g/kg/day for endurance athletes &mdash; significantly more than the generic 0.8 g/kg RDA. For a 70 kg runner, that&rsquo;s 98&ndash;126 g/day. Most runner diets, heavy on carbs and light on planning, fall short.
      </p>

      <p>
        Post-run, 20&ndash;40 g of protein (whey for speed, casein for sustained release) combined with carbohydrates accelerates glycogen resynthesis and muscle protein synthesis. The &ldquo;anabolic window&rdquo; isn&rsquo;t as narrow as old gym lore suggested, but consuming protein within 2 hours of hard sessions is still good practice when you&rsquo;re training daily.
      </p>

      <p>
        If your total daily protein intake is adequate and well-distributed across meals, a dedicated post-run shake is convenient but not magical. Total daily intake matters more than timing.
      </p>

      <h2>Omega-3 and Vitamin D: Daily Foundation</h2>

      <p>
        These two don&rsquo;t produce acute performance gains on race day. They quietly prevent the things that derail training blocks.
      </p>

      <p>
        <strong>Omega-3 fatty acids</strong> (EPA/DHA, 1&ndash;2 g combined per day) reduce systemic inflammation, support cardiovascular health, and may decrease delayed-onset muscle soreness. Philpott et al. (2019) found reduced markers of exercise-induced muscle damage with regular EPA/DHA supplementation. <EvidenceBadge level="moderate" /> For product recommendations, see our <a href="/guides/best-omega-3-supplements">best omega-3 supplements</a> guide.
      </p>
      <ProductCallout product={PRODUCTS["thorne-super-epa-pro"]} />

      <p>
        <strong><a href="/guides/best-vitamin-d-supplements">Vitamin D</a></strong> directly affects bone mineral density and stress fracture risk &mdash; a career-threatening injury for serious runners. Ruohola et al. (2006) found that military recruits with serum 25(OH)D below 30 nmol/L had significantly higher stress fracture rates. <EvidenceBadge level="moderate" /> Get your levels checked. If below 30 ng/mL (75 nmol/L), supplementation with 1,000&ndash;4,000 IU/day is typical, but dosing should be guided by bloodwork.
      </p>

      <h2>What to Skip: BCAAs, Glutamine, HMB</h2>

      <p>
        The supplement industry loves selling runners amino acid blends. Here&rsquo;s the uncomfortable truth.
      </p>

      <p>
        <strong>BCAAs (branched-chain amino acids):</strong> Morton et al. (2018) conducted a comprehensive meta-analysis and found no benefit of BCAA supplementation on muscle protein synthesis or recovery when total daily protein intake was adequate. <EvidenceBadge level="strong" /> If you&rsquo;re eating 1.4+ g/kg protein per day, BCAAs are expensive urine. The leucine trigger for MPS is already satisfied by any quality protein source.
      </p>

      <p>
        <strong>Glutamine:</strong> Marketed for immunity and gut health in athletes, glutamine supplementation has repeatedly failed to outperform placebo in well-controlled RCTs. Plasma glutamine does drop after prolonged exercise, but oral supplementation doesn&rsquo;t reliably prevent upper respiratory infections or improve recovery markers (Gleeson, 2008). <EvidenceBadge level="emerging" />
      </p>

      <p>
        <strong>HMB (beta-hydroxy beta-methylbutyrate):</strong> The evidence for HMB is narrowly positive in untrained individuals beginning resistance exercise (Nissen &amp; Sharp, 2003). For trained endurance athletes, the data is thin and unconvincing. Unless you&rsquo;re a complete novice starting a strength program alongside running, HMB is not worth the cost.
      </p>

      <Callout variant="info" title="The protein rule of thumb">
        If a supplement is just a fragment of protein (individual amino acids or branched chains), ask yourself: could I get this from eating more whole protein? The answer is almost always yes, for less money and with better overall nutrition.
      </Callout>

      <h2>Sample Daily Stack + Race-Day Protocol</h2>

      <p>
        Here&rsquo;s what a reasonable, evidence-backed supplement routine looks like for a serious recreational runner training 40&ndash;60 miles per week.
      </p>

      <h3>Daily Foundation</h3>
      <ul>
        <li><strong>Creatine monohydrate:</strong> 3&ndash;5 g with any meal</li>
        <li><strong>Omega-3 (EPA+DHA):</strong> 1&ndash;2 g combined, with food</li>
        <li><strong>Vitamin D:</strong> 1,000&ndash;4,000 IU (dose based on bloodwork)</li>
        <li><strong>Iron:</strong> Only if ferritin &lt;30 ng/mL &mdash; 30&ndash;100 mg elemental iron every other day on empty stomach with vitamin C (physician-guided; retest ferritin in 8&ndash;12 weeks)</li>
        <li><strong>Protein:</strong> 1.4&ndash;1.8 g/kg total daily, supplementing with whey/casein as needed to hit target</li>
      </ul>

      <h3>Hard Session / Speed Work Days (add to daily)</h3>
      <ul>
        <li><strong>Caffeine:</strong> 3&ndash;6 mg/kg, 45&ndash;60 min pre-session</li>
        <li><strong>Beta-alanine:</strong> 3.2&ndash;6.4 g/day (split doses), ongoing &mdash; requires 4+ weeks of loading to be effective</li>
      </ul>

      <h3>Race-Day Protocol (Half Marathon and Up)</h3>
      <ul>
        <li><strong>Beetroot juice:</strong> 6&ndash;12 mmol nitrate, 2&ndash;3 hours pre-race (optionally loaded 3&ndash;5 days prior)</li>
        <li><strong>Caffeine:</strong> 3&ndash;6 mg/kg, 45&ndash;60 min pre-start</li>
        <li><strong>Electrolytes:</strong> Sodium-forward drink (800&ndash;1,500 mg/L) at aid stations or in handheld, targeting sweat rate replacement</li>
        <li><strong>Mid-race caffeine boost (marathon+):</strong> 50&ndash;100 mg caffeinated gel at miles 16&ndash;18</li>
      </ul>

      <Callout variant="warning" title="Rehearse everything">
        Never try a new supplement on race day. GI distress from beetroot juice, caffeine sensitivity, and electrolyte tolerance should all be tested in training. Your gut is trainable &mdash; but not in the last 24 hours.
      </Callout>

      <h2>Frequently Asked Questions</h2>

      <h3>Do I need a loading phase for creatine?</h3>
      <p>
        No. A loading phase (20 g/day for 5&ndash;7 days) saturates stores faster, but 3&ndash;5 g/day reaches the same saturation level within 3&ndash;4 weeks. For runners who want to avoid the initial water weight spike, skipping the loading phase and taking a consistent daily dose is the better approach. The end result is the same.
      </p>

      <h3>Can caffeine dehydrate me during a marathon?</h3>
      <p>
        At the doses used for performance (3&ndash;6 mg/kg), caffeine does not cause clinically meaningful dehydration during exercise. Killer et al. (2014) found no significant difference in hydration status between moderate coffee and water intake in regular drinkers. The mild diuretic effect at rest is overridden by the anti-diuretic response during exercise. Drink to thirst as usual.
      </p>

      <h3>Should I take iron &ldquo;just in case&rdquo; as a runner?</h3>
      <p>
        Absolutely not. Iron is one of the few supplements where &ldquo;more is better&rdquo; does not apply. Excess iron can cause oxidative stress, GI damage, and in people with undiagnosed hemochromatosis, organ damage. Always test serum ferritin (and ideally a complete iron panel with transferrin saturation) before supplementing. Test, don&rsquo;t guess.
      </p>

      <h3>Is beetroot juice worth the taste?</h3>
      <p>
        If you&rsquo;re a recreational to sub-elite runner targeting a PR, the evidence says yes. A 1&ndash;3% improvement in running economy is significant over long distances. Concentrated shots minimize the volume you have to consume. If you genuinely cannot tolerate it, nitrate capsules exist but have less robust evidence behind them compared to the juice form used in most studies.
      </p>

      <h3>How much protein do I actually need after a long run?</h3>
      <p>
        Aim for 20&ndash;40 g of high-quality protein within 2 hours post-run, ideally paired with carbohydrates at a roughly 3:1 or 4:1 carb-to-protein ratio to maximize glycogen resynthesis. But don&rsquo;t stress the exact window &mdash; total daily protein intake (1.4&ndash;1.8 g/kg) matters far more than any single meal&rsquo;s timing.
      </p>

      <h3>Are there supplements that help prevent running injuries?</h3>
      <p>
        Directly, the strongest evidence is for vitamin D and calcium supporting bone mineral density and reducing stress fracture risk. Omega-3s may reduce chronic inflammation that contributes to overuse injuries. <a href="/guides/collagen-guide">Collagen</a> peptides (15 g with vitamin C, 30&ndash;60 min before exercise) have emerging evidence for tendon and ligament health (Shaw et al., 2017), but this research is still early. <EvidenceBadge level="emerging" /> No supplement replaces proper training load management.
      </p>

      <h2>Who Should Talk to a Doctor First</h2>

      <p>
        Most of these supplements are safe for healthy adults at recommended doses. But certain populations need clinical guidance before starting.
      </p>

      <Callout variant="warning" title="If you take blood thinners or anticoagulants">
        High-dose omega-3 (above 3 g/day EPA+DHA) may have additive anticoagulant effects. Iron supplements can also interact with certain medications. Review your full supplement list with your prescribing physician.
      </Callout>

      <Callout variant="warning" title="If you are pregnant or breastfeeding">
        Iron needs increase during pregnancy, but dosing differs from athletic supplementation. Caffeine should be limited to &lt;200 mg/day. Beetroot juice and beta-alanine lack sufficient safety data in pregnancy. Consult your OB/GYN before continuing any performance supplement regimen.
      </Callout>

      <Callout variant="warning" title="If you have kidney disease or impaired renal function">
        Creatine is safe for healthy kidneys, but it increases creatinine levels (a kidney function marker), which can complicate monitoring in people with existing renal conditions. Your nephrologist needs to know if you&rsquo;re supplementing.
      </Callout>

      <Callout variant="warning" title="If you have hemochromatosis or iron storage disorders">
        Iron supplementation is contraindicated. Even mild additional iron can accelerate organ damage. Get genetic screening if you have a family history before taking any iron supplement.
      </Callout>

      <Callout variant="warning" title="If you have a cardiac arrhythmia or are caffeine-sensitive">
        High-dose caffeine (above 400 mg) can trigger palpitations or exacerbate atrial fibrillation in susceptible individuals. Start low, monitor symptoms, and discuss your planned race-day dose with your cardiologist.
      </Callout>

      <p>
        None of the above is medical advice. Bring your full supplement list to your next provider visit.
      </p>

      <h2>The Bottom Line</h2>

      <p>
        The best supplements for runners aren&rsquo;t glamorous. They&rsquo;re a handful of well-studied compounds that address the specific physiological demands of putting one foot in front of the other for thousands of repetitions per week. Caffeine remains the single most effective legal performance enhancer available &mdash; inexpensive, well-understood, and reliably beneficial across all endurance distances. Iron, when needed (and only when confirmed by bloodwork), can be the difference between progressing and plateauing. Electrolytes keep you functional in heat and over long distances. Creatine, still misunderstood by most of the running community, quietly improves the training sessions that build race fitness.
      </p>

      <p>
        Beetroot juice and beta-alanine occupy a solid supporting tier &mdash; not essential for every runner, but genuinely helpful for those chasing PRs and willing to optimize. Omega-3s and vitamin D won&rsquo;t show up on a stopwatch, but they protect the musculoskeletal and cardiovascular systems that make consistent training possible in the first place.
      </p>

      <p>
        What you don&rsquo;t take matters too. BCAAs, glutamine, and HMB are industry favorites with thin-to-nonexistent evidence for trained endurance athletes. Every dollar spent on them is a dollar not spent on quality food, a good training plan, or sleep &mdash; all of which have bigger performance returns than any supplement.
      </p>

      <p>
        Start with the foundations: test your iron, nail your protein intake, stay hydrated with real electrolytes, and use caffeine strategically. Add the next tier only when the basics are locked in. And always &mdash; always &mdash; test everything in training before race day.
      </p>

      <p>
        <a href="https://app.formulate-health.app/catalog?q=running+supplements">
          Browse running supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
