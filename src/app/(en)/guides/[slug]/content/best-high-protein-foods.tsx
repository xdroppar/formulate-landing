import Link from "next/link";
import { TLDRBox, Callout, EvidenceBadge, IngredientLink } from "@/components/guide";

export function BestHighProteinFoods() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "Protein quality matters as much as quantity - animal proteins and soy are complete; most plant proteins need combining",
          "Top whole-food sources: eggs, fish, Greek yogurt, lentils, tofu, edamame, and nuts",
          "Most adults do well around 1.2-1.6 g of protein per kg of body weight per day",
          "Spread protein across meals (25-40 g each) rather than loading it all at dinner",
        ]}
      />

      <p>
        Protein is the one macronutrient almost everyone benefits from being
        intentional about. It builds and preserves muscle, keeps you full, and
        supplies the amino acids your body can&rsquo;t make on its own. But
        &ldquo;high protein&rdquo; on a label tells you little &mdash; what matters
        is how much protein a food delivers per serving, how complete its
        amino-acid profile is, and what else comes along with it.
      </p>

      <h2>How Much Protein Do You Actually Need?</h2>
      <p>
        The bare-minimum RDA is 0.8 g/kg of body weight, but that&rsquo;s set to
        prevent deficiency, not to optimize muscle and healthy aging. Most
        evidence points to <strong>1.2-1.6 g/kg/day</strong> for active adults and
        older people working to preserve muscle &mdash; roughly 90-120 g/day for a
        75 kg person. <EvidenceBadge level="strong" />
      </p>
      <p>
        Just as important is <em>distribution</em>: muscle protein synthesis
        responds best to 25-40 g of protein in a sitting, so spreading intake
        across meals beats a single large dose. Learn more on the{" "}
        <Link href="/nutrients/protein">protein nutrient page</Link>.
      </p>

      <h2>Protein Quality: Complete vs. Incomplete</h2>
      <p>
        A <strong>complete protein</strong> contains all nine essential amino
        acids in usable amounts. Animal foods (eggs, fish, dairy, meat) and soy
        are complete. Most individual plant proteins are limited in one or two
        amino acids &mdash; but eating a variety across the day (e.g. legumes plus
        grains) easily covers the gap.
      </p>

      <h2>The Best Whole-Food Protein Sources</h2>

      <h3>Eggs</h3>
      <p>
        The reference standard for protein quality &mdash; about 6 g of highly
        bioavailable protein per egg, plus choline and B12. See what else is
        inside on the <Link href="/foods/egg">egg encyclopedia page</Link>.
      </p>

      <h3>Fish &mdash; Salmon &amp; Sardines</h3>
      <p>
        Around 20-25 g of complete protein per 100 g, plus long-chain omega-3 fats
        most other proteins lack. <Link href="/foods/salmon">Salmon</Link> and{" "}
        <Link href="/foods/sardines">sardines</Link> do double duty as protein
        and heart/brain support.
      </p>

      <h3>Greek Yogurt</h3>
      <p>
        Strained to concentrate protein (often 15-20 g per cup) while adding
        calcium and, when it carries live cultures, probiotics. See the{" "}
        <Link href="/foods/greek-yogurt">Greek yogurt page</Link>.
      </p>

      <h3>Lentils, Tofu &amp; Edamame</h3>
      <p>
        The plant all-stars. <Link href="/foods/lentils">Lentils</Link> bring
        ~18 g of protein per cooked cup alongside fiber and iron;{" "}
        <Link href="/foods/tofu">tofu</Link> and{" "}
        <Link href="/foods/edamame">edamame</Link> are complete soy proteins
        studied for cardiovascular benefit.
      </p>

      <h3>Nuts</h3>
      <p>
        <Link href="/foods/almonds">Almonds</Link> and{" "}
        <Link href="/foods/walnuts">walnuts</Link> add a few grams of protein
        plus healthy fat and minerals &mdash; best as a complement rather than a
        main source.
      </p>

      <Callout variant="tip" title="Build the plate around protein">
        Anchor each meal with a palm-sized portion of a quality protein, then fill
        the rest with vegetables and a smart carb. It&rsquo;s the simplest way to
        hit your daily target without tracking every gram.
      </Callout>

      <h2>When a Protein Supplement Makes Sense</h2>
      <p>
        Whole foods should do most of the work, but a{" "}
        <IngredientLink id="whey-protein" source="best-high-protein-foods">
          protein powder
        </IngredientLink>{" "}
        is a convenient way to close a gap &mdash; around training, on busy
        mornings, or for older adults who struggle to eat enough. It&rsquo;s a
        tool, not a requirement.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Aim for 1.2-1.6 g/kg/day, spread across meals, from a rotation of eggs,
        fish, dairy, legumes, and soy. Quality and distribution matter as much as
        the total. Browse the{" "}
        <Link href="/foods">Food &amp; Beverage encyclopedia</Link> to see the
        full nutrient profile of any food.
      </p>
    </>
  );
}
