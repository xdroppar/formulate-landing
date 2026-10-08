import Link from "next/link";
import { TLDRBox, Callout, EvidenceBadge, IngredientLink } from "@/components/guide";

export function BestFoodSourcesOfMagnesium() {
  return (
    <>
      <TLDRBox
        readTime="7 min read"
        takeaways={[
          "Magnesium powers 300+ enzyme reactions, yet roughly half of adults fall short of the target",
          "The RDA is 310-420 mg/day depending on age and sex",
          "Top food sources: leafy greens, nuts, seeds, legumes, whole grains, and dark chocolate",
          "If supplementing, glycinate and citrate are better absorbed than oxide",
        ]}
      />

      <p>
        Magnesium is a quiet workhorse &mdash; it&rsquo;s a cofactor in more than
        300 enzyme reactions, from energy production to muscle and nerve function
        to blood-sugar control. Despite that, dietary surveys consistently find a
        large share of adults below the recommended intake, in part because
        refining grains strips most of their magnesium. The good news: it&rsquo;s
        easy to get from whole foods.
      </p>

      <h2>How Much You Need</h2>
      <p>
        The RDA is about <strong>400-420 mg/day for men</strong> and{" "}
        <strong>310-320 mg/day for women</strong>. Because magnesium is spread
        across many plant foods, a varied whole-food diet gets most people there.
        See what it does in the body on the{" "}
        <Link href="/nutrients/magnesium">magnesium nutrient page</Link>.
      </p>

      <h2>The Best Food Sources</h2>

      <h3>Leafy Greens</h3>
      <p>
        Magnesium sits at the center of the chlorophyll molecule, so green leaves
        are naturally rich in it. <Link href="/foods/spinach">Spinach</Link> and{" "}
        <Link href="/foods/kale">kale</Link> deliver a meaningful dose per cooked
        cup along with vitamin K and folate.
      </p>

      <h3>Nuts &amp; Seeds</h3>
      <p>
        <Link href="/foods/almonds">Almonds</Link> are among the most convenient
        sources (~80 mg per ounce), and pumpkin seeds are even denser.{" "}
        <Link href="/foods/walnuts">Walnuts</Link> add magnesium plus plant
        omega-3s.
      </p>

      <h3>Legumes</h3>
      <p>
        <Link href="/foods/black-beans">Black beans</Link> and{" "}
        <Link href="/foods/lentils">lentils</Link> combine magnesium with fiber
        and plant protein &mdash; a recurring theme in nutrient-dense foods.
      </p>

      <h3>Dark Chocolate / Cacao</h3>
      <p>
        One of the more enjoyable sources:{" "}
        <Link href="/foods/cacao">cacao</Link> is genuinely magnesium-rich, and
        the flavanols in dark chocolate carry their own cardiovascular signal.{" "}
        <EvidenceBadge level="moderate" /> Choose higher-cocoa, lower-sugar bars.
      </p>

      <Callout variant="info" title="Why refined grains fall short">
        Most of a grain&rsquo;s magnesium lives in the bran and germ &mdash; the
        parts removed during refining. Choosing whole grains over white flour is
        one of the easiest ways to recover lost magnesium.
      </Callout>

      <h2>Food vs. Supplement</h2>
      <p>
        Whole foods are the foundation, but magnesium is also a reasonable
        supplement if your diet runs low or you&rsquo;re managing sleep or muscle
        cramps. Forms matter:{" "}
        <IngredientLink id="magnesium-glycinate" source="best-food-sources-of-magnesium">
          magnesium glycinate
        </IngredientLink>{" "}
        and citrate are far better absorbed than the cheap oxide found in many
        budget products.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Greens, nuts, seeds, legumes, whole grains, and dark chocolate cover
        magnesium comfortably for most people. Reach for a well-absorbed supplement
        only to fill a genuine gap. See exact amounts on the{" "}
        <Link href="/foods">Food &amp; Beverage encyclopedia</Link>.
      </p>
    </>
  );
}
