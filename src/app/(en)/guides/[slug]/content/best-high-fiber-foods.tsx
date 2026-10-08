import Link from "next/link";
import { TLDRBox, Callout, EvidenceBadge, IngredientLink } from "@/components/guide";

export function BestHighFiberFoods() {
  return (
    <>
      <TLDRBox
        readTime="8 min read"
        takeaways={[
          "Most adults eat ~15 g of fiber a day; the evidence-based target is 25-29 g or more",
          "Soluble fiber lowers cholesterol and blunts blood sugar; insoluble fiber keeps you regular",
          "Top sources: legumes, whole grains, berries, cruciferous vegetables, nuts, and seeds",
          "Increase intake gradually and drink more water to avoid bloating",
        ]}
      />

      <p>
        Fiber is the most under-eaten nutrient in the modern diet, and closing
        that gap is one of the highest-leverage dietary upgrades available. It
        isn&rsquo;t digested for energy &mdash; instead it feeds your gut
        microbiome, slows digestion, and carries cholesterol out of the body. A
        large synthesis of cohort studies and trials found the clearest benefit at
        around <strong>25-29 g of fiber a day</strong>, with lower rates of heart
        disease, type 2 diabetes, and colorectal cancer. <EvidenceBadge level="strong" />
      </p>

      <h2>Two Kinds of Fiber</h2>
      <p>
        <strong>Soluble fiber</strong> dissolves into a gel &mdash; it lowers LDL
        cholesterol and smooths out blood-sugar spikes (oats, beans, apples,
        psyllium). <strong>Insoluble fiber</strong> adds bulk and speeds transit
        (whole grains, vegetable skins, nuts). Most whole plants carry both, so
        variety matters more than tracking each type. See the{" "}
        <Link href="/nutrients/fiber">fiber nutrient page</Link> for the full
        picture.
      </p>

      <h2>The Best High-Fiber Foods</h2>

      <h3>Legumes</h3>
      <p>
        Pound for pound the richest everyday source.{" "}
        <Link href="/foods/lentils">Lentils</Link>,{" "}
        <Link href="/foods/black-beans">black beans</Link>, and{" "}
        <Link href="/foods/kidney-beans">kidney beans</Link> deliver 12-16 g per
        cooked cup, plus plant protein and slow-release carbohydrate.
      </p>

      <h3>Berries</h3>
      <p>
        Among the highest-fiber fruits per calorie.{" "}
        <Link href="/foods/blueberries">Blueberries</Link> and{" "}
        <Link href="/foods/strawberries">strawberries</Link> also bring
        anthocyanins, polyphenols linked to cardiovascular benefit.
      </p>

      <h3>Cruciferous Vegetables</h3>
      <p>
        <Link href="/foods/broccoli">Broccoli</Link>,{" "}
        <Link href="/foods/cabbage">cabbage</Link>, and{" "}
        <Link href="/foods/brussels-sprouts">Brussels sprouts</Link> combine
        fiber with glucosinolates &mdash; sulfur compounds with their own health
        signaling.
      </p>

      <h3>Nuts &amp; Seeds</h3>
      <p>
        <Link href="/foods/almonds">Almonds</Link> and{" "}
        <Link href="/foods/walnuts">walnuts</Link> add fiber plus healthy fat
        and minerals. Chia and flax are especially soluble-fiber rich.
      </p>

      <Callout variant="warning" title="Ramp up slowly">
        Jumping from 15 g to 35 g overnight is a recipe for bloating and gas. Add
        ~5 g every few days and increase water alongside it &mdash; your gut
        bacteria need time to adapt.
      </Callout>

      <h2>Do You Need a Fiber Supplement?</h2>
      <p>
        Food first &mdash; whole-food fiber comes packaged with nutrients a
        supplement can&rsquo;t replicate. But a{" "}
        <IngredientLink id="psyllium-husk" source="best-high-fiber-foods">
          psyllium husk
        </IngredientLink>{" "}
        supplement is a reasonable, well-studied way to top up soluble fiber if you
        struggle to hit your target from food alone.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Build toward 25-29 g a day from legumes, whole grains, berries, and
        vegetables &mdash; increase gradually, hydrate, and let variety do the
        work. Explore exact fiber content on the{" "}
        <Link href="/foods">Food &amp; Beverage encyclopedia</Link>.
      </p>
    </>
  );
}
