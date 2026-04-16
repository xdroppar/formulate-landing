import {
  TLDRBox,
  Callout,
  ProductCallout,
  InteractionCard,
  InteractionGroup,
  EvidenceBadge,
  PRODUCTS,
} from "@/components/guide";

export function ElectrolytesGuide() {
  return (
    <>
      <TLDRBox
        readTime="12 min read"
        takeaways={[
          "Most people are dramatically under-consuming potassium (97% of Americans miss the 4,700mg target)",
          "The sodium-to-potassium ratio matters more than absolute sodium intake",
          "Low-carb dieters, fasters, and heavy exercisers need significantly more electrolytes than guidelines suggest",
          "A DIY electrolyte drink costs ~$0.10/serving vs $1.50+ for commercial products",
        ]}
      />

      <p>
        The three electrolytes that actually matter are sodium, potassium, and
        magnesium &mdash; and most people&rsquo;s intake of all three is
        quietly terrible. Low-carb diets make this worse by causing your
        kidneys to dump sodium at an accelerated rate, which is why
        &ldquo;keto flu&rdquo; is really just electrolyte deficiency. Fixing
        it costs about 15 cents a day, no sugar-laden sports drinks required.
      </p>

      <Callout variant="info" title="It's not keto flu">
        What most people call &ldquo;keto flu&rdquo; is actually an electrolyte
        deficiency &mdash; specifically sodium and potassium. Low-carb diets
        cause your kidneys to dump sodium at an accelerated rate, and drinking
        more plain water only dilutes what&rsquo;s left.
      </Callout>

      <p>
        But this isn&rsquo;t just a keto problem. Most people&rsquo;s
        electrolyte intake is quietly terrible, and the conventional advice
        around sodium has been more wrong than right for decades. The sports
        drink industry has spent billions convincing you that you need their
        sugar-laden products after a 30-minute jog. You don&rsquo;t. This
        guide breaks down the three electrolytes that actually matter, why
        the standard narrative is backwards, and how to fix it for about 15
        cents a day.
      </p>

      <h2>The Three That Matter: Sodium, Potassium, Magnesium</h2>
      <p>
        Technically, calcium, chloride, phosphorus, and bicarbonate are also
        electrolytes. But when people talk about &ldquo;electrolyte
        balance&rdquo; in the context of supplementation, performance, and
        daily health, three dominate the conversation &mdash; because
        three are the ones most people get wrong.
      </p>

      <h3>Sodium &mdash; The One You&rsquo;re Told to Fear</h3>
      <p>
        Sodium is the primary extracellular electrolyte. It regulates fluid
        balance, blood pressure, nerve impulse transmission, and muscle
        contraction. Every time a neuron fires or a muscle fiber contracts,
        sodium channels are doing the work. It&rsquo;s also the{" "}
        <strong>primary electrolyte lost in sweat</strong> &mdash; not
        potassium, not magnesium, sodium. A liter of sweat contains
        roughly 800&ndash;1,500mg of sodium but only about 200mg of
        potassium. When you&rsquo;re drenched after a hard workout, the
        mineral you&rsquo;re mostly losing is salt.
      </p>
      <p>
        The Adequate Intake set by the National Academies is 1,500mg/day,
        with an upper limit of 2,300mg/day for the general population. Most
        Americans consume 3,400mg/day on average &mdash; well above the
        guideline. But here&rsquo;s where it gets interesting: the evidence
        for universal sodium restriction is far weaker than most people
        assume.
      </p>

      <h3>Potassium &mdash; The One Nobody Gets Enough Of</h3>
      <p>
        Potassium is sodium&rsquo;s intracellular counterpart. It&rsquo;s
        critical for heart rhythm, muscle function, and nerve signaling. The
        Adequate Intake is <strong>4,700mg per day</strong> for adults &mdash;
        and according to NHANES data, <strong>97% of Americans</strong>{" "}
        don&rsquo;t meet that target. That&rsquo;s not a typo. Virtually no
        one gets enough potassium from diet alone.
      </p>
      <p>
        The average American intake is around 2,500mg &mdash; roughly half
        what it should be. You&rsquo;d need to eat 7&ndash;8 bananas or 4
        large avocados per day to hit the AI from food. Nobody does that.
        The irony is that most people worry about sodium while being
        catastrophically low in potassium.
      </p>

      <Callout variant="warning" title="The potassium gap">
        97% of Americans don&rsquo;t meet the 4,700mg daily potassium target.
        Most people worry about sodium while being catastrophically low in
        potassium &mdash; the mineral that actually buffers sodium&rsquo;s
        effect on blood pressure.
      </Callout>

      <h3>Magnesium &mdash; The Silent Deficiency</h3>
      <p>
        The third pillar. Magnesium is involved in over 300 enzymatic
        reactions and is essential for energy production, DNA synthesis,
        muscle relaxation, and nervous system regulation. We&rsquo;ve written
        extensively about magnesium deficiency in our{" "}
        <a href="/guides/signs-you-are-magnesium-deficient">
          magnesium deficiency guide
        </a>
        , but the short version: roughly 50% of Americans are subclinically
        deficient, and it&rsquo;s the most common electrolyte deficit after
        potassium. Our{" "}
        <a href="/guides/best-magnesium-supplements">
          magnesium supplement roundup
        </a>{" "}
        covers form selection in detail.
      </p>

      <ProductCallout product={PRODUCTS["thorne-magnesium-bisglycinate"]} />

      <h2>The Sodium Controversy: Why &ldquo;Salt Is Bad&rdquo; Is Oversimplified</h2>
      <p>
        For fifty years, public health messaging has been unequivocal: eat
        less salt. The logic seems straightforward &mdash; sodium raises
        blood pressure, high blood pressure causes heart disease, therefore
        less sodium means less heart disease. But the actual evidence is far
        more nuanced than the soundbite.
      </p>

      <Callout variant="evidence" title="Cochrane review on sodium">
        A 2011 Cochrane systematic review (Graudal et al.) analyzed 167
        studies on sodium reduction and concluded that while reducing sodium
        modestly lowers blood pressure in hypertensive individuals, there was{" "}
        <strong>no strong evidence</strong> that sodium reduction decreased
        all-cause mortality or cardiovascular events in people with normal
        blood pressure. <EvidenceBadge level="moderate" />
      </Callout>

      <p>
        Then came the <strong>PURE study</strong> (Mente et al., 2014,{" "}
        <em>The New England Journal of Medicine</em>), which followed over
        100,000 participants across 17 countries and found a J-shaped
        relationship between sodium intake and cardiovascular events. The
        lowest risk was in the range of{" "}
        <strong>3,000&ndash;6,000mg of sodium per day</strong> &mdash; well
        above the 2,300mg upper limit recommended by the AHA. Both very low{" "}
        <em>and</em> very high sodium intakes were associated with increased
        mortality. <EvidenceBadge level="strong" />
      </p>
      <p>
        What does this mean practically? If you&rsquo;re sedentary, eating
        processed food, have hypertension, and don&rsquo;t exercise, the
        standard advice to cut sodium probably still applies. But if you
        exercise regularly, eat mostly whole foods, do low-carb or keto,
        fast, or live in a hot climate &mdash; you almost certainly need{" "}
        <em>more</em> sodium than the guidelines suggest, not less.
      </p>

      <h2>The Ratio Matters More Than the Absolutes</h2>
      <p>
        This is the piece most people miss. It&rsquo;s not just about how
        much sodium or potassium you consume individually &mdash; it&rsquo;s
        about the <strong>sodium-to-potassium ratio</strong>. A 2014
        meta-analysis published in the <em>British Medical Journal</em>{" "}
        (Aburto et al., originally 2013, WHO-commissioned review) found
        that higher potassium intake was associated with a{" "}
        <strong>24% lower risk of stroke</strong> and significantly lower
        blood pressure, independent of sodium intake. <EvidenceBadge level="strong" />
      </p>
      <p>
        The ideal dietary sodium-to-potassium ratio is roughly{" "}
        <strong>1:2</strong>. Most Americans eat closer to 2:1 &mdash;
        double the sodium, half the potassium. The fix isn&rsquo;t necessarily
        to slash sodium; it&rsquo;s to dramatically increase potassium while
        keeping sodium appropriate for your activity level.
      </p>

      <Callout variant="tip" title="Fix the ratio">
        The ideal sodium-to-potassium ratio is roughly 1:2. Most Americans eat
        closer to 2:1. The fix isn&rsquo;t to slash sodium &mdash; it&rsquo;s to
        dramatically increase potassium while keeping sodium appropriate for
        your activity level.
      </Callout>

      <h2>Who Actually Needs Electrolyte Supplements</h2>
      <p>
        Here&rsquo;s the uncomfortable truth the electrolyte industry
        doesn&rsquo;t want you to hear: <strong>most people don&rsquo;t
        need electrolyte supplements</strong>. If you eat a normal diet, do
        moderate exercise, and aren&rsquo;t on a restricted eating pattern,
        food covers you. The people who genuinely benefit fall into specific
        categories:
      </p>

      <h3>Intense Exercisers and Athletes</h3>
      <p>
        A moderately intense 60-minute workout can produce 0.5&ndash;1.5
        liters of sweat. That&rsquo;s 400&ndash;2,250mg of sodium lost in a
        single session, plus potassium and magnesium. If you train hard for
        over an hour, especially in heat, targeted electrolyte replacement
        makes a real difference. The American College of Sports Medicine
        recommends <strong>300&ndash;600mg sodium per hour</strong> during
        prolonged exercise. Our{" "}
        <a href="/guides/best-pre-workout-supplement-protocol">
          pre-workout protocol guide
        </a>{" "}
        covers how to time electrolytes around training.
      </p>

      <h3>Low-Carb and Keto Dieters</h3>
      <p>
        When carbohydrate intake drops below roughly 50g/day, insulin
        levels fall significantly. Insulin signals your kidneys to retain
        sodium &mdash; so when insulin drops, your kidneys start dumping
        sodium at an accelerated rate. This is why the first 5&ndash;7
        pounds lost on keto is almost entirely water weight &mdash; your
        body is shedding fluid because it can&rsquo;t hold onto sodium.
      </p>

      <Callout variant="evidence" title="Keto electrolyte needs">
        Volek &amp; Phinney, in <em>The Art and Science of Low Carbohydrate
        Living</em> (2011), recommended that ketogenic dieters consume{" "}
        <strong>3,000&ndash;5,000mg of sodium</strong>,{" "}
        <strong>1,000&ndash;3,500mg of potassium</strong>, and{" "}
        <strong>300&ndash;500mg of magnesium</strong> daily &mdash; far above
        standard dietary guidelines. <EvidenceBadge level="moderate" />
      </Callout>

      <p>
        Most keto &ldquo;failures&rdquo;
        in the first two weeks are electrolyte failures, not willpower
        failures.
      </p>

      <h3>People Who Fast</h3>
      <p>
        Intermittent fasting (16:8, OMAD) and extended fasting accelerate
        electrolyte depletion through the same insulin mechanism as keto,
        compounded by the simple fact that you&rsquo;re not eating.
        Supplementing sodium, potassium, and magnesium during fasting
        windows makes extended fasts dramatically more comfortable and
        safer.
      </p>

      <h3>Heavy Sweaters and Hot-Climate Residents</h3>
      <p>
        Individual sweat rates and sodium concentrations vary enormously.
        Some people lose twice the sodium per liter of sweat as others.
        If your workout clothes have white salt lines after a session, you
        are a heavy sodium sweater and need more replacement than average.
      </p>

      <ProductCallout product={PRODUCTS["thorne-daily-electrolytes"]} />

      <h2>The &ldquo;8 Glasses of Water&rdquo; Myth and Overhydration</h2>
      <p>
        The advice to drink eight glasses (64oz) of water per day has no
        scientific basis. It was traced back by Heinz Valtin in a 2002{" "}
        <em>American Journal of Physiology</em> review to a
        misinterpretation of a 1945 National Research Council recommendation
        that included water from <em>food</em>. Yet it persists as gospel.
      </p>

      <Callout variant="warning" title="Overhydration is real">
        Exercise-associated hyponatremia (dangerously low blood sodium from
        drinking too much water) hospitalizes marathon runners every year.
        Drink to thirst rather than forcing a fixed volume &mdash; your
        body&rsquo;s thirst mechanism is more reliable than any formula.
      </Callout>

      <p>
        The real danger here isn&rsquo;t dehydration &mdash; it&rsquo;s{" "}
        <strong>overhydration diluting your electrolytes</strong>.
        Exercise-associated hyponatremia (dangerously low blood sodium
        from drinking too much water) hospitalizes marathon runners every
        year. A 2015 consensus statement in the{" "}
        <em>Clinical Journal of Sport Medicine</em> (Hew-Butler et al.)
        recommended drinking to thirst rather than forcing a fixed volume
        &mdash; your body&rsquo;s thirst mechanism is more reliable than
        any formula. <EvidenceBadge level="strong" />
      </p>

      <h2>Commercial Electrolyte Products: An Honest Assessment</h2>
      <p>
        The electrolyte drink market is enormous and mostly terrible.
        Let&rsquo;s look at what&rsquo;s actually in these products and
        evaluate them on what matters: adequate electrolyte doses, minimal
        sugar, and whether they address all three key minerals.
      </p>
      <p>
        <strong>Gatorade (20oz):</strong> 270mg sodium, 75mg potassium, 0mg
        magnesium, 34g sugar. That&rsquo;s a tablespoon of salt dissolved in
        sugar water. The sodium is token, the potassium is negligible, and
        the sugar negates most of the hydration benefit.
      </p>
      <p>
        <strong>Liquid I.V.:</strong> 500mg sodium, 370mg potassium, 0mg
        magnesium, 11g sugar. Better sodium, but still sugar-dependent and
        missing magnesium entirely. Uses Cellular Transport Technology (CTT),
        which is essentially oral rehydration therapy &mdash; a real concept,
        but not unique to their product.
      </p>
      <p>
        <strong>Drip Drop (ORS):</strong> 330mg sodium, 185mg potassium, 39mg
        magnesium, 7g sugar. Developed by a doctor, based on WHO oral
        rehydration science. The most medically credible option, but the
        electrolyte doses are still modest for heavy exercise or keto use.
      </p>
      <p>
        <strong>LMNT:</strong> 1,000mg sodium, 200mg potassium, 60mg
        magnesium, 0g sugar. This is closer to what active people actually
        need. The sodium is high enough to be meaningful, the potassium and
        magnesium are present (though supplementary, not replacements for
        dietary intake), and there&rsquo;s no sugar undermining the effect.
      </p>

      <Callout variant="tip" title="What to look for">
        The criteria that matter: does it provide at least 500mg sodium per
        serving, does it include all three electrolytes, and is it low or
        zero sugar? Most products fail on at least one of those.
      </Callout>

      <h2>The DIY Electrolyte Recipe</h2>
      <p>
        You can make a perfectly effective electrolyte drink for pennies.
        Here&rsquo;s the formula:
      </p>
      <ul>
        <li>
          <strong>1/2 teaspoon table salt</strong> (roughly 1,150mg sodium)
        </li>
        <li>
          <strong>1/4 teaspoon NoSalt&reg; or NuSalt&reg;</strong> (potassium
          chloride &mdash; roughly 650mg potassium)
        </li>
        <li>
          <strong>1/4 teaspoon magnesium citrate powder</strong> (roughly
          75mg elemental magnesium)
        </li>
        <li>
          <strong>Juice of 1/2 lemon or lime</strong> (for flavor and a
          small potassium contribution)
        </li>
        <li>
          <strong>16&ndash;32oz water</strong>
        </li>
      </ul>
      <p>
        Cost per serving: roughly $0.10&ndash;$0.15, compared to $1.50+
        for a Liquid I.V. packet or $2.00+ for LMNT. Adjust the salt up or
        down based on your taste and activity level. If the salt taste is
        too aggressive at first, use more water and sip over a longer period.
      </p>
      <p>
        One caveat: potassium chloride (NoSalt&reg;) has a distinctly
        metallic, bitter taste. The lemon juice helps mask it, but
        don&rsquo;t expect this to taste like a sports drink. It&rsquo;s
        functional, not delicious.
      </p>

      <h2>Timing Your Electrolytes</h2>
      <p>
        How you time electrolyte intake matters more than most people
        realize:
      </p>
      <ul>
        <li>
          <strong>First thing in the morning:</strong> you wake up mildly
          dehydrated after 7&ndash;8 hours without fluid. A glass of
          electrolyte water before coffee sets a better baseline than plain
          water, which can dilute already-depleted levels.
        </li>
        <li>
          <strong>30&ndash;60 minutes before exercise:</strong>{" "}
          pre-loading sodium improves plasma volume and delays the onset of
          exercise-induced hyponatremia.
        </li>
        <li>
          <strong>During long sessions (90+ minutes):</strong> sipping an
          electrolyte drink throughout extended training prevents progressive
          performance decline from sodium depletion.
        </li>
        <li>
          <strong>During fasting windows:</strong> spread your electrolyte
          intake throughout the fast rather than taking it all at once.
          Large boluses of sodium on an empty stomach can cause nausea;
          steady sipping is better tolerated.
        </li>
      </ul>
      <p>
        For a complete breakdown of how to schedule electrolytes alongside
        other supplements, see our{" "}
        <a href="/guides/supplement-timing-guide">
          supplement timing guide
        </a>
        .
      </p>

      <InteractionGroup title="Electrolyte interactions to know">
        <InteractionCard
          type="synergy"
          a="Magnesium"
          b="Potassium"
          effect="Magnesium is required for proper potassium retention. Low magnesium causes the kidneys to waste potassium, making deficiency harder to correct."
          recommendation="Always address magnesium alongside potassium. Supplementing potassium alone may not resolve deficiency if magnesium is low."
        />
        <InteractionCard
          type="synergy"
          a="Sodium"
          b="Potassium"
          effect="These two electrolytes work as a pair for nerve signaling and fluid balance. The ratio between them matters more than either absolute amount."
          recommendation="Aim for a 1:2 sodium-to-potassium ratio. Increase potassium before cutting sodium."
        />
      </InteractionGroup>

      <h2>Signs You&rsquo;re Electrolyte Deficient</h2>
      <p>
        Electrolyte deficiency rarely shows up on standard blood tests
        because your body aggressively maintains serum levels by pulling
        from intracellular stores and bone. By the time your blood sodium or
        potassium is flagged as &ldquo;low,&rdquo; you&rsquo;re in serious
        trouble. Subclinical deficiency manifests through symptoms:
      </p>
      <ul>
        <li>
          <strong>Muscle cramps and twitches</strong> (especially calves,
          feet, and eyelids) &mdash; typically magnesium and/or potassium
        </li>
        <li>
          <strong>Headaches</strong> &mdash; often sodium, especially if
          they worsen with exercise or fasting
        </li>
        <li>
          <strong>Dizziness on standing</strong> (orthostatic hypotension)
          &mdash; sodium depletion reducing blood volume
        </li>
        <li>
          <strong>Heart palpitations</strong> &mdash; potassium and/or
          magnesium imbalance affecting cardiac rhythm
        </li>
        <li>
          <strong>Brain fog and difficulty concentrating</strong> &mdash;
          all three electrolytes; neurons are exquisitely sensitive to
          electrolyte balance
        </li>
        <li>
          <strong>Persistent fatigue despite adequate sleep</strong> &mdash;
          magnesium deficiency impairs mitochondrial energy production
        </li>
      </ul>
      <p>
        If you&rsquo;re experiencing several of these and you exercise
        regularly, eat low-carb, fast, or live in a warm climate, start
        with electrolytes before chasing more exotic explanations.
      </p>

      <h2>Cautions and Contraindications</h2>

      <Callout variant="warning" title="Medical cautions">
        Supplementing electrolytes without medical supervision is not
        appropriate for everyone. Kidney disease, heart failure, and
        aldosterone disorders fundamentally change how your body handles
        sodium and potassium.
      </Callout>

      <ul>
        <li>
          <strong>Kidney disease:</strong> impaired kidneys cannot excrete
          potassium efficiently. Supplementing potassium with reduced kidney
          function can cause dangerous hyperkalemia. Consult your doctor
          before supplementing potassium if you have any kidney issues.
        </li>
        <li>
          <strong>Heart failure or hypertension on medication:</strong>{" "}
          many blood pressure medications (ACE inhibitors, ARBs,
          potassium-sparing diuretics) affect sodium and potassium balance.
          Adding supplemental electrolytes requires medical supervision.
        </li>
        <li>
          <strong>Aldosterone or adrenal disorders:</strong> conditions
          affecting aldosterone (Addison&rsquo;s disease, primary
          aldosteronism) fundamentally alter sodium and potassium handling.
          Standard electrolyte advice does not apply.
        </li>
      </ul>
      <p>
        For healthy, active people without kidney or cardiovascular
        conditions, the risk of harm from supplemental electrolytes at the
        doses described here is extremely low.
      </p>

      <h2>Drug Interactions: When Electrolyte Supplementation Becomes Dangerous</h2>

      <p>Electrolyte drug interactions are among the most under-discussed risks in supplement guides, and this one needs to address that directly. The DIY recipe above contains potassium chloride (NoSalt), which is safe for healthy people — but genuinely dangerous if you're on certain medications. This isn't a hypothetical concern. Hyperkalemia (elevated blood potassium) causes cardiac arrhythmias and can be fatal.</p>

      <Callout variant="warning" title="Do not supplement potassium without physician clearance if you take any of the following">
      <strong>ACE inhibitors</strong> (lisinopril, enalapril, ramipril), <strong>ARBs</strong> (losartan, valsartan, irbesartan), and <strong>potassium-sparing diuretics</strong> (spironolactone, amiloride, triamterene) all reduce your kidneys' ability to excrete potassium. Combining any of these with supplemental potassium chloride can push serum levels into dangerous territory. <strong>NSAIDs</strong> (ibuprofen, naproxen) and the antibiotic <strong>trimethoprim</strong> (commonly prescribed as Bactrim/Septra) independently impair renal potassium excretion and compound the risk further. A 2016 retrospective study (Antoniou et al., <em>BMJ</em>) found that trimethoprim co-prescribed with ACE inhibitors or ARBs was associated with a significantly elevated risk of sudden death from hyperkalemia. <EvidenceBadge level="moderate" /> These aren't edge cases — these are among the most commonly prescribed drugs in the world.
      </Callout>

      <h3>Lithium and Sodium: A Separate but Serious Concern</h3>

      <p>If you take <strong>lithium</strong> for bipolar disorder, sodium intake directly affects your lithium blood levels. Lithium and sodium compete for reabsorption in the kidneys. Increasing sodium intake accelerates lithium excretion, potentially making your medication less effective. Decreasing sodium — or becoming dehydrated — causes lithium retention and can push you toward toxicity. Either direction is dangerous. Evidence suggests even moderate changes in daily sodium intake can shift lithium levels enough to matter (Finley et al., 1995). <EvidenceBadge level="moderate" /></p>

      <p>The bottom line: the DIY recipe's NoSalt component specifically requires physician clearance if you take any of the medications listed above. This isn't overcautious boilerplate — it's the single most important safety consideration in this entire guide. If you're on <a href="/guides/supplement-safety">any chronic medication</a>, consult your healthcare provider before adding supplemental potassium or meaningfully changing your sodium intake.</p>

      <h2>High-Potassium Foods: The Food-First Approach Before You Buy Anything</h2>

      <p>Before reaching for supplements, consider <strong>high-potassium foods</strong> as your primary strategy. The "7–8 bananas" framing makes dietary potassium sound impossible, but bananas are actually a mediocre source — just 422mg each. Plenty of common whole foods deliver far more per serving, and a deliberate day of eating can get you surprisingly close to that 4,700mg target.</p>

      <h3>Potassium-Dense Whole Foods by the Numbers</h3>

      <p>A <strong>medium baked potato with skin</strong> delivers roughly 926mg. One cup of cooked <strong>lentils</strong> provides about 731mg. A cup of cooked <strong>spinach</strong> hits around 839mg. One cup of <strong>acorn squash</strong> gives you approximately 896mg. A 6oz fillet of <strong>Atlantic salmon</strong> contains about 730mg. And one cup of <strong>edamame</strong> adds roughly 676mg. These aren't exotic superfoods — they're grocery store staples.</p>

      <p>A realistic day might look like this: baked potato at lunch (926mg), lentil soup at dinner with a side of spinach (731mg + 839mg), salmon for protein (730mg), and edamame as a snack (676mg). That's approximately <strong>3,900mg of potassium</strong> from food alone — without touching a supplement bottle.</p>

      <Callout variant="info" title="The Gap Is Real, But Smaller Than You Think">Most people eating a standard American diet land around 2,500mg/day because they're eating processed food, not because food-based potassium is inherently insufficient. Shifting toward whole foods closes the majority of that gap. Supplements fill the remaining 800–1,700mg — they shouldn't be doing all the heavy lifting.</Callout>

      <p>That said, consistently hitting 4,700mg from diet alone does require intentional planning. Evidence suggests most people will still fall short by 500–1,000mg on an average day (Cogswell et al., 2012). <EvidenceBadge level="moderate" /> This is where a small potassium chloride supplement — like the NoSalt in the <a href="/guides/electrolytes-guide">DIY recipe above</a> — makes sense as a gap-filler, not a replacement for eating actual food.</p>

      <p>If you're also working on your <a href="/guides/magnesium-deficiency">magnesium intake</a>, the good news is that many high-potassium foods — spinach, lentils, edamame — are solid magnesium sources too. Two deficiencies, one plate.</p>

      <h2>Electrolytes for Older Adults (65+)</h2>

      <p>Electrolytes for older adults require a fundamentally different approach than the general advice above. Several age-related physiological changes make the standard "drink to thirst" strategy unreliable and the DIY protocol potentially risky without medical oversight.</p>

      <h3>Your Thirst Mechanism Is No Longer Trustworthy</h3>

      <p>The "drink to thirst" recommendation we endorsed earlier assumes a functioning thirst response. After 65, that assumption breaks down. Kenney and Chiu (2001) documented that aging blunts osmoreceptor sensitivity, meaning your brain responds more slowly — or not at all — to rising blood concentration. Phillips et al. (1984) showed that older adults deprived of water for 24 hours reported significantly less thirst than younger subjects despite identical levels of dehydration. <EvidenceBadge level="moderate" /> You cannot rely on the signal that isn't firing.</p>

      <h3>Potassium Tolerance Drops With Kidney Function</h3>

      <p>Glomerular filtration rate declines roughly 1% per year after age 40. By 70, many people have lost 25–30% of their kidney function without knowing it — serum creatinine can appear normal due to reduced muscle mass. This means your kidneys clear potassium more slowly. The DIY recipe's 650mg potassium dose may be fine for a healthy 35-year-old, but it demands more caution here, especially if you're on ACE inhibitors, ARBs, or potassium-sparing diuretics — medications that are extremely common in this age group. <EvidenceBadge level="strong" /></p>

      <Callout variant="warning" title="Hyperkalemia Risk">
      Potassium supplementation combined with common blood pressure medications can push serum potassium to dangerous levels. Do not start the DIY protocol — or any potassium-containing electrolyte product — without discussing it with your physician and getting a recent metabolic panel.
      </Callout>

      <h3>Sodium Depletion Hits Harder</h3>

      <p>Orthostatic hypotension — that dizziness when you stand up — affects roughly 20–30% of adults over 65 (Saedon et al., 2012). <EvidenceBadge level="moderate" /> Sodium depletion worsens it by reducing blood volume, and the consequences are more severe: falls in this population cause hip fractures, head injuries, and hospitalizations. Aggressive sodium restriction or under-supplementation isn't just uncomfortable here — it's genuinely dangerous.</p>

      <Callout variant="info" title="Before You Start">
      If you're over 65, ask your doctor for a basic metabolic panel (sodium, potassium, magnesium, creatinine, eGFR) before adjusting electrolyte intake. Bring the DIY recipe to your appointment so they can evaluate it against your medications and kidney function. This isn't overcaution — it's the minimum responsible step.
      </Callout>

      <h3>The PURE Study Controversy: What Critics Say</h3>
      <p>The PURE study is one of the most cited — and most criticized — pieces of evidence in the sodium debate. You should know what the objections are before deciding how much weight to give it.</p>
      <p>The main criticisms are serious. PURE estimated sodium intake from spot urine samples rather than 24-hour collections, a method that Cogswell et al. (2016) and others have argued systematically biases results. The low-sodium populations in PURE were disproportionately from low-income countries where poverty, malnutrition, and poor healthcare access are <em>independently</em> associated with higher mortality — meaning the increased risk at low sodium intakes may reflect confounding, not causation. And as an observational study, PURE cannot establish that low sodium <strong>caused</strong> worse outcomes. The AHA and World Heart Federation have both issued statements cautioning against using PURE to justify higher sodium intake. <EvidenceBadge level="moderate" /></p>
      <Callout variant="info" title="Why we still mention PURE">
      Despite these valid criticisms, PURE isn't an outlier. Multiple large observational datasets — including O'Donnell et al. (2011) and Alderman et al. (1998) — have found similar J-shaped curves. The consistent signal across different populations and methodologies is worth noting, even if each individual study has flaws. We treat the J-curve as a plausible hypothesis, not a settled fact.
      </Callout>
      <p>The practical takeaway doesn't change: if you're active, eating whole foods, and not hypertensive, rigidly restricting sodium to below 2,300mg is likely unnecessary. But intellectual honesty requires acknowledging that the evidence is observational, contested, and far from conclusive. If you have hypertension or cardiovascular risk factors, consult your healthcare provider rather than self-adjusting based on any single study.</p>

      <h2>Frequently Asked Questions</h2>

      <h3>Can I just add more salt to my food instead of making electrolyte drinks?</h3>
      <p>
        For sodium, yes &mdash; salting your food liberally is a perfectly
        valid strategy, especially if you eat whole foods that are naturally
        low in sodium. The problem is that food-based salting doesn&rsquo;t
        address potassium or magnesium, and it doesn&rsquo;t help during
        fasting windows when you&rsquo;re not eating. If you&rsquo;re
        active, combining generous food salting with a dedicated electrolyte
        drink around training covers all three bases.
      </p>

      <h3>Won&rsquo;t all this sodium raise my blood pressure?</h3>
      <p>
        In salt-sensitive individuals (estimated at about 25% of the
        population with normal blood pressure, and about 50% of those
        with hypertension), excess sodium can raise blood pressure. But
        the PURE study data suggests that for most people, the range of
        3,000&ndash;6,000mg/day carries no increased cardiovascular risk.
        The key variables are your activity level, how much you sweat,
        your potassium intake (which buffers sodium&rsquo;s effect on
        blood pressure), and whether you have existing hypertension. If
        you&rsquo;re concerned, monitor your blood pressure at home for
        a few weeks after increasing sodium intake.
      </p>

      <h3>Are electrolyte tablets (like Nuun) effective?</h3>
      <p>
        They&rsquo;re convenient but usually underdosed. A single Nuun
        tablet provides about 300mg sodium and 150mg potassium &mdash;
        enough for a light walk, not enough for a serious training
        session or a day of fasting. Check the label for actual milligrams
        per serving rather than trusting marketing claims. Our{" "}
        <a href="/guides/how-to-read-a-supplement-label">
          label reading guide
        </a>{" "}
        shows you exactly what to look for.
      </p>

      <h3>How do I know if I&rsquo;m getting too many electrolytes?</h3>
      <p>
        Your body is remarkably good at excreting excess electrolytes
        through urine &mdash; assuming healthy kidney function. Signs of
        overconsumption include excessive thirst (paradoxically, from too
        much sodium), bloating, GI distress (especially from magnesium,
        which is osmotic at high doses), and in extreme potassium excess,
        irregular heartbeat. At the supplemental doses recommended here,
        healthy individuals are very unlikely to experience any of these.
      </p>

      <h3>Do I really need electrolyte supplements?</h3>
      <p>Only under specific conditions: high sweat loss (over 60 min of exercise, hot climates), low-carb diets (which increase sodium excretion), illness with vomiting/diarrhea, or high water intake without food. Most sedentary adults eating normally don't need them. The 'everyone needs electrolytes' marketing push is overstated.</p>

      <h3>What's a good sodium-to-potassium ratio?</h3>
      <p>For exercise and hydration, roughly 3:1 sodium to potassium (e.g., 600 mg sodium + 200 mg potassium per serving) matches typical sweat losses. Products with equal or higher potassium are formulated for medical rehydration, not athletic use. LMNT, Liquid IV, and DripDrop all use variations on this ratio.</p>

      <h3>Is table salt enough, or do I need a supplement?</h3>
      <p>For most people with normal activity levels, salting food to taste covers sodium needs. Electrolyte supplements become worth it when you're sweating heavily, on a low-carb diet, or need precise dosing during endurance events. For everyday hydration, plain water + a normal diet handles it.</p>

      <h3>Is it safe to take NoSalt or NuSalt if I'm on blood pressure medication?</h3>
      <p>Do not use NoSalt or NuSalt without consulting your prescribing physician if you take blood pressure medication. The guide notes that ACE inhibitors, ARBs, and potassium-sparing diuretics all affect potassium balance &mdash; and adding supplemental potassium chloride on top of these medications can cause dangerous hyperkalemia (elevated blood potassium), which can trigger cardiac arrhythmia. This interaction is not covered in detail in the guide. Your doctor can review your specific medication and kidney function before you add any potassium source.</p>

      <h3>How much potassium is too much per day from supplements?</h3>
      <p>The guide targets up to 3,500mg/day of potassium for keto dieters, but doesn't state the tolerable upper intake or explain why OTC potassium pills are capped at 99mg per tablet by the FDA. That cap exists specifically because high-dose potassium can cause hyperkalemia &mdash; dangerously elevated blood potassium &mdash; particularly in people with impaired kidney function or on certain medications. The gap between a 99mg pill and a 3,500mg daily target is typically made up through food and potassium chloride salt substitutes, not by taking dozens of pills.</p>

      <h3>Electrolytes during pregnancy &mdash; what's safe?</h3>
      <p>The guide doesn't cover pregnancy. Pregnancy significantly alters fluid and electrolyte needs, and conditions like pre-eclampsia can make standard sodium advice inappropriate. Do not apply the doses or protocols in this guide during pregnancy without guidance from your OB or midwife. This is a case where individual medical supervision is essential, not optional.</p>

      <h3>What kind of magnesium powder should I buy for the DIY recipe?</h3>
      <p>Buy a pure magnesium citrate powder sold as a dietary supplement &mdash; not a laxative preparation like Milk of Magnesia or liquid magnesium citrate bowel-prep products, which are entirely different formulations. Look for bulk magnesium citrate powder from a supplement supplier; the label should list elemental magnesium per gram. The guide's magnesium supplement roundup covers form selection in more detail if you want to compare alternatives like magnesium glycinate or malate.</p>

      <h3>Do electrolytes break a fast?</h3>
      <p>The guide recommends spreading electrolyte intake throughout fasting windows but doesn't address whether flavored electrolyte products break a fast. Plain sodium, potassium, and magnesium dissolved in water contain no calories and are generally considered fasting-compatible. However, products containing citric acid, natural flavors, stevia, or trace carbohydrates may affect insulin response depending on your fasting goal. For strict fasting protocols, use unflavored electrolytes or add only plain lemon juice, as the DIY recipe does.</p>

      <h3>Electrolytes for children &mdash; are adult doses safe?</h3>
      <p>The guide doesn't address pediatric dosing. Adult electrolyte targets &mdash; up to 5,000mg sodium and 3,500mg potassium daily &mdash; are not appropriate for children, and medical keto protocols for epilepsy in particular require individualized clinical management. Do not use adult supplement doses for children. Consult a pediatrician or registered dietitian, especially if your child is on a therapeutic ketogenic diet.</p>

      <h3>Can I get enough potassium from food without supplements?</h3>
      <p>Yes, for many people &mdash; the guide's banana-and-avocado example illustrates difficulty hitting 4,700mg/day, but other high-potassium foods are more practical. A large baked potato with skin (~900mg), a cup of cooked lentils (~730mg), cooked spinach (~840mg per cup), and a salmon fillet (~600mg) all deliver meaningful potassium. Stacking several of these daily can get you close to the AI without supplements. Supplementation becomes more relevant if you eat low-carb, fast, or restrict potassium-rich foods.</p>

      <h2>The Bottom Line</h2>
      <p>
        Electrolyte balance is one of the highest-impact, lowest-cost
        interventions available. Most people are dramatically
        under-consuming potassium, about half are deficient in magnesium,
        and anyone who exercises, fasts, or eats low-carb likely needs
        more sodium than the standard guidelines suggest. But if you eat
        a normal mixed diet and do moderate exercise, you probably
        don&rsquo;t need to buy expensive electrolyte packets &mdash; the
        sports drink industry has massively overstated the need.
      </p>
      <p>
        If you <em>do</em> fall into one of the groups that benefits, start
        with the DIY recipe: half a teaspoon of salt, a quarter teaspoon of
        NoSalt&reg;, a quarter teaspoon of magnesium citrate powder, a
        squeeze of lemon, and 16&ndash;32oz of water. Drink one in the
        morning and one around training. Give it a week. The cramps,
        headaches, and brain fog you&rsquo;ve been blaming on stress,
        aging, or &ldquo;keto flu&rdquo; may simply disappear.
      </p>
      <p>
        <a href="https://app.formulate-health.app/catalog?q=electrolytes">
          Compare electrolyte supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
