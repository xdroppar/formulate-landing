import {
  TLDRBox,
  Callout,
  EvidenceBadge,
  IngredientLink,
} from "@/components/guide";

export function ProteinGuide() {
  return (
    <>
      <TLDRBox
        readTime="11 min read"
        takeaways={[
          "For muscle gain, 1.6–2.2 g/kg body weight daily is the evidence-based range — higher intake doesn't help, lower limits adaptation",
          "Distribute across 3–5 meals of 25–40g each; muscle protein synthesis saturates per-meal above this, so 'one big protein meal' wastes most of it",
          "Complete vs incomplete matters less than the internet claims — any varied diet covers all essential amino acids; isolated leucine deficiency is rare",
          "Whey is king for post-training; casein is king pre-sleep; plant blends work if they're actually blended (single-source plant proteins under-deliver)",
        ]}
      />

      <p>
        Protein is the one macronutrient where most people actively
        undershoot their needs and the supplement industry has a real
        use-case. It&rsquo;s also the macronutrient with the most nonsense
        around it: complete vs incomplete panics, anabolic window myths,
        30-gram-per-meal absorption ceilings, BCAA obsessions. This guide
        covers what the actual research says, what doesn&rsquo;t matter,
        and how to use protein supplements effectively if you&rsquo;re
        going to use them at all.
      </p>

      <h2>How Much Protein Do You Actually Need?</h2>
      <p>
        The RDA is 0.8 g/kg body weight — but that&rsquo;s the minimum to
        prevent deficiency, not the optimum for any real goal. Contemporary
        evidence suggests:
      </p>
      <ul>
        <li>
          <strong>General health / sedentary:</strong> 1.0–1.2 g/kg
        </li>
        <li>
          <strong>Active lifestyle (3+ sessions/week):</strong> 1.4–1.6 g/kg
        </li>
        <li>
          <strong>Muscle gain / resistance training:</strong> 1.6–2.2 g/kg
        </li>
        <li>
          <strong>Fat loss (preserve muscle in deficit):</strong> 2.0–2.4 g/kg
        </li>
        <li>
          <strong>Over age 65:</strong> 1.2–1.6 g/kg (higher than typically
          recommended — older adults have muscle protein synthesis
          resistance)
        </li>
      </ul>
      <p>
        A 70 kg (154 lb) adult in a muscle-gain phase needs roughly
        110–155 g of protein daily. That&rsquo;s reachable from food, but
        it takes deliberate attention — it&rsquo;s where a scoop or two
        of whey becomes useful insurance rather than a bro-marketing
        gimmick.
      </p>
      <Callout variant="evidence" title="Per-meal ceiling isn't 30 grams, but it's real">
        The &ldquo;body can only use 30 g of protein per meal&rdquo; claim
        is a misunderstood approximation. The reality: muscle protein
        synthesis saturates per-meal at roughly 25–40 g for adults (higher
        end for larger users, older adults, or after heavy training).
        Excess protein above that is still useful — it goes to amino acid
        pools, gluconeogenesis, or energy — it just doesn&rsquo;t further
        stimulate muscle building. Split your protein across 3–5 meals for
        maximum anabolic effect. <EvidenceBadge level="strong" />
      </Callout>

      <h2>Complete vs Incomplete: Less Important Than You&rsquo;ve Heard</h2>
      <p>
        The nine essential amino acids are those your body can&rsquo;t
        make. A &ldquo;complete&rdquo; protein contains all nine in useful
        proportions. An &ldquo;incomplete&rdquo; protein is low in one
        (the limiting amino acid). All animal proteins and most plant
        proteins in practice are complete or functionally complete.
      </p>
      <p>
        The idea that you must pair complementary plant proteins at the
        same meal (e.g. rice + beans) was debunked decades ago. Your body
        maintains an amino acid pool that replenishes over hours — as long
        as you eat varied protein sources over the course of the day,
        pairing timing is irrelevant.
      </p>
      <p>
        The one amino acid worth watching on a strict plant-based diet:
        <strong>leucine</strong>. Leucine is the primary trigger for
        muscle protein synthesis, and plant proteins (except soy) are
        lower in it than animal proteins. A 30 g serving of whey has ~3 g
        leucine; a 30 g serving of pea protein has ~2 g. On plant-only
        diets, aim for slightly larger protein servings or specifically
        leucine-enriched sources.
      </p>

      <h2>Animal Protein Sources</h2>
      <ul>
        <li>
          <strong>Eggs:</strong> The benchmark for protein quality. ~6 g
          per egg. Cheap, versatile, complete.
        </li>
        <li>
          <strong>Chicken / turkey:</strong> 25–30 g per 100 g cooked.
          Low fat, very digestible.
        </li>
        <li>
          <strong>Fish:</strong> 20–25 g per 100 g. Fatty fish (salmon,
          sardines) add EPA/DHA.
        </li>
        <li>
          <strong>Red meat:</strong> 25–30 g per 100 g. Higher in
          creatine, zinc, B12, heme iron.
        </li>
        <li>
          <strong>Dairy (Greek yogurt, cottage cheese):</strong> 10–20 g
          per serving. Slow-digesting due to casein content.
        </li>
      </ul>

      <h2>Plant Protein Sources</h2>
      <ul>
        <li>
          <strong>Soy:</strong> The best-matched plant protein — complete
          and high-leucine. Edamame, tempeh, tofu, and soy protein isolate
          all work. ~10–20 g per serving.
        </li>
        <li>
          <strong>Legumes (lentils, chickpeas, beans):</strong> 15 g per
          cooked cup. Lower in methionine but dietary variety covers it.
        </li>
        <li>
          <strong>Seitan (wheat gluten):</strong> 20–25 g per 100 g.
          Complete after combining with a small amount of soy/other
          legume; near-complete alone.
        </li>
        <li>
          <strong>Hemp, pumpkin, chia seeds:</strong> Protein-dense but
          not practical as a primary source (you&rsquo;d need a lot).
        </li>
      </ul>

      <h2>Protein Supplements: When to Use Them</h2>
      <p>
        Protein powder isn&rsquo;t magic — it&rsquo;s just protein, usually
        convenient, often a good value per gram. Useful when:
      </p>
      <ul>
        <li>
          You&rsquo;re in a muscle-gain or high-activity phase and
          hitting 1.6+ g/kg from food alone is hard
        </li>
        <li>
          Post-training when whole-food protein isn&rsquo;t practical
        </li>
        <li>
          Travel or busy work schedules disrupt regular meals
        </li>
        <li>
          You&rsquo;re older (65+) and want a precise, high-leucine
          serving to combat muscle protein synthesis resistance
        </li>
      </ul>
      <p>
        It&rsquo;s not a weight-loss tool on its own, it doesn&rsquo;t
        magically build muscle, and there&rsquo;s nothing wrong with
        skipping supplements if your diet is already on track.
      </p>

      <h2>Supplement Forms: Which One to Pick</h2>

      <h3><IngredientLink id="whey-protein" source="protein-guide">Whey Protein</IngredientLink></h3>
      <p>
        The gold standard. Digests in 1–2 hours, produces a big, brief
        amino acid spike ideal for post-training. Leucine-rich. Concentrate
        is cheaper (~80% protein, some lactose). Isolate is ~90% protein,
        near-zero lactose, slightly more expensive. Hydrolyzed whey is
        pre-digested, fastest absorbing, most expensive, niche use case.
      </p>
      <ul>
        <li>
          <strong>Dose:</strong> 25–40 g per serving
        </li>
        <li>
          <strong>Best for:</strong> Post-workout, breakfast, snack
        </li>
      </ul>

      <h3><IngredientLink id="casein-protein" source="protein-guide">Casein Protein</IngredientLink></h3>
      <p>
        Forms a gel in the stomach and digests over 6–8 hours. Steady
        amino acid drip, ideal overnight when you&rsquo;re fasting.
        Thicker texture than whey — pudding-like when mixed.
      </p>
      <ul>
        <li>
          <strong>Dose:</strong> 30–40 g before bed
        </li>
        <li>
          <strong>Best for:</strong> Pre-sleep, long gaps between meals
        </li>
      </ul>
      <p>
        See the{" "}
        <a href="/compare/casein-protein-vs-whey-protein">
          Whey vs Casein comparison
        </a>{" "}
        for stacking and timing detail.
      </p>

      <h3>Plant Protein Blends</h3>
      <p>
        Single-source plant proteins (pea alone, rice alone) under-deliver
        on leucine. The answer is blends — pea + rice combines
        complementary amino acid profiles and hits leucine thresholds.
        Look for explicit pea + rice or pea + rice + seed combinations,
        not single-source.
      </p>
      <ul>
        <li>
          <strong>Dose:</strong> 30–40 g per serving (slightly higher
          than whey to match leucine content)
        </li>
        <li>
          <strong>Best for:</strong> Vegans, lactose intolerant users,
          anyone who dislikes whey
        </li>
      </ul>

      <h3>Collagen Peptides (Not a Complete Protein)</h3>
      <p>
        Hydrolyzed collagen is marketed as a protein supplement and is
        genuinely useful for joint, skin, and connective tissue support.
        But it&rsquo;s missing tryptophan and low in several other
        essential amino acids — <strong>collagen doesn&rsquo;t count
        toward muscle-building protein totals.</strong> Use it alongside,
        not instead of, a complete protein source.
      </p>

      <h3>BCAAs and EAAs (Usually Unnecessary)</h3>
      <p>
        Branched-chain amino acid (BCAA) supplements were popular but
        are largely redundant if you&rsquo;re already getting adequate
        protein. EAAs (all nine essentials) are slightly more useful for
        amino acid supplementation during fasted training or low-protein
        diets. For most people eating a normal diet, skip both. See the{" "}
        <a href="/compare/bcaa-vs-eaas">BCAA vs EAA comparison</a> for the
        specific case analysis.
      </p>

      <h2>Protein Timing: Overrated</h2>
      <p>
        The &ldquo;anabolic window&rdquo; — the idea that protein must be
        consumed within 30 minutes post-training — has been thoroughly
        debunked. What matters is total daily intake spread across meals.
        You have 4–6 hours of elevated muscle protein synthesis after
        training; hitting a protein meal anywhere in that window
        captures the effect.
      </p>
      <p>
        What does still matter:
      </p>
      <ul>
        <li>
          <strong>Per-meal leucine threshold:</strong> ~2.5–3 g leucine
          per meal maximizes MPS. 30 g whey or 40 g pea-rice blend
          clears this.
        </li>
        <li>
          <strong>Pre-sleep casein:</strong> One meta-analysis suggests
          modest benefit from a casein-dominant pre-sleep meal for
          overnight recovery — not magic, but real.
        </li>
        <li>
          <strong>Meal frequency:</strong> 3–5 protein-containing meals
          outperforms 1–2 big ones for total MPS accumulation.
        </li>
      </ul>

      <h2>Protein Safety</h2>
      <p>
        The &ldquo;high protein damages kidneys&rdquo; myth has been
        comprehensively debunked in healthy adults — multiple long-term
        studies show no effect of protein intake up to 3 g/kg on
        glomerular filtration rate. Existing kidney disease is a
        different story: consult your nephrologist for specific targets.
      </p>
      <ul>
        <li>
          <strong>Upper intake:</strong> 2.5–3 g/kg is a soft practical
          ceiling; above that, most people plateau on benefits and add GI
          discomfort
        </li>
        <li>
          <strong>Hydration:</strong> Higher protein intake slightly
          increases water needs — not dramatically, but worth noting for
          aggressive bulks
        </li>
        <li>
          <strong>Kidney disease:</strong> See a nephrologist for
          individualized targets
        </li>
        <li>
          <strong>Gout:</strong> Very high animal protein can raise uric
          acid; moderation or plant protein preference for gout-prone
          users
        </li>
      </ul>

      <h2>A Practical Daily Protein Plan</h2>
      <p>
        For a 75 kg adult aiming for 1.8 g/kg (135 g total) daily:
      </p>
      <ul>
        <li>
          <strong>Breakfast:</strong> 30 g (Greek yogurt + eggs, or whey
          in oats)
        </li>
        <li>
          <strong>Lunch:</strong> 35 g (chicken bowl, fish, tofu stir-fry)
        </li>
        <li>
          <strong>Pre-/Post-training:</strong> 25 g (whey shake)
        </li>
        <li>
          <strong>Dinner:</strong> 30 g (red meat, seitan, legumes)
        </li>
        <li>
          <strong>Pre-sleep (optional):</strong> 15–20 g (cottage cheese
          or casein)
        </li>
      </ul>
      <p>
        Total: 135 g across 4–5 meals. Each meal clears the leucine
        threshold for MPS. Most of the protein comes from whole food;
        the supplement is a time-convenience layer, not the foundation.
      </p>

      <h2>How Formulate Scores Protein Products</h2>
      <p>
        The rubric weighs protein-per-serving accuracy (some brands
        inflate nitrogen via spiking with amino acids, which the scoring
        catches), amino acid completeness, heavy metal testing coverage
        (especially relevant for protein powders, which concentrate
        contaminants from source raw materials), and third-party testing
        (NSF Certified for Sport is the gold standard in this category).
        See the <a href="/brands">brand grades</a> for brand-level protein
        quality or{" "}
        <a href="/supplements">product reviews</a> for specific scores.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Is there really a &ldquo;30g per meal&rdquo; protein limit?</h3>
      <p>
        Approximately. Muscle protein synthesis saturates between 25 and
        40 g per meal depending on body size and training status. Protein
        above that is still useful — it goes to amino acid pools and
        other metabolic fates — just not for additional muscle building.
        Split protein across 3–5 meals for maximum cumulative MPS.
      </p>

      <h3>Is whey better than plant protein?</h3>
      <p>
        For muscle building, pound-for-pound yes — whey has higher leucine
        and faster digestion. In practice, a well-designed plant protein
        blend at slightly higher doses closes the gap. If you&rsquo;re
        plant-based for ethical or dietary reasons, plant blends work
        fine — just use 40 g instead of 30 g per serving to match MPS.
      </p>

      <h3>Does collagen count as protein?</h3>
      <p>
        Toward connective tissue support, yes. Toward muscle-building
        totals, no — it&rsquo;s missing tryptophan and low in leucine.
        Don&rsquo;t replace your whey with collagen expecting muscle
        results. They serve different purposes.
      </p>

      <h3>Do I need protein supplements at all?</h3>
      <p>
        If you&rsquo;re hitting your daily targets from food and meal
        timing works for your schedule, no. Protein powder is a
        convenience and precision tool — it&rsquo;s easier to hit 2 g/kg
        reliably if a scoop of whey is a 25 g option on busy days.
      </p>

      <h3>Will high protein damage my kidneys?</h3>
      <p>
        Not if they&rsquo;re healthy. Long-term studies up to 3 g/kg show
        no effect on glomerular filtration rate. Existing kidney disease
        is the exception — consult a nephrologist for individualized
        targets in that case.
      </p>

      <h3>What about the anabolic window?</h3>
      <p>
        Mostly a myth for practical purposes. Muscle protein synthesis
        is elevated for 4–6 hours after training — eating protein anywhere
        in that window captures the effect. The urgency of a shake
        immediately post-workout is overstated; having protein 1–2 hours
        later works equally well.
      </p>
    </>
  );
}
