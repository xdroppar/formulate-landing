import Link from "next/link";
import { TLDRBox, Callout, EvidenceBadge, IngredientLink } from "@/components/guide";

export function AntiInflammatoryFoods() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "Chronic low-grade inflammation is linked to heart disease, diabetes, and cognitive decline",
          "The strongest 'anti-inflammatory' signal comes from a whole dietary pattern, not one food",
          "Standouts: oily fish, berries, leafy greens, extra-virgin olive oil, and green tea",
          "Ultra-processed foods, refined sugar, and excess processed meat push the other way",
        ]}
      />

      <p>
        &ldquo;Anti-inflammatory&rdquo; is a popular label, and the science behind
        it is real &mdash; but it&rsquo;s easy to overstate. No single food
        switches off inflammation. What the evidence actually supports is that an
        overall <em>pattern</em> rich in certain whole foods, and low in
        ultra-processed ones, is associated with lower markers of chronic
        inflammation and lower disease risk.
      </p>

      <h2>What &ldquo;Inflammation&rdquo; Means Here</h2>
      <p>
        Acute inflammation is healthy &mdash; it&rsquo;s how you heal. The concern
        is <strong>chronic, low-grade inflammation</strong>, a persistent
        background state linked to cardiovascular disease, type 2 diabetes, and
        cognitive decline. Diet is one of several levers (alongside sleep,
        exercise, and body composition) that nudge it up or down.
      </p>

      <h2>The Foods With the Best Evidence</h2>

      <h3>Oily Fish</h3>
      <p>
        The long-chain omega-3s in <Link href="/foods/salmon">salmon</Link> and{" "}
        <Link href="/foods/sardines">sardines</Link> are precursors to
        specialized pro-resolving mediators that help switch off inflammation.{" "}
        <EvidenceBadge level="strong" />
      </p>

      <h3>Berries</h3>
      <p>
        <Link href="/foods/blueberries">Blueberries</Link> and{" "}
        <Link href="/foods/strawberries">strawberries</Link> are dense in
        anthocyanins &mdash; polyphenol pigments associated with lower
        cardiovascular risk and favorable inflammatory markers.
      </p>

      <h3>Leafy &amp; Cruciferous Vegetables</h3>
      <p>
        <Link href="/foods/spinach">Spinach</Link>,{" "}
        <Link href="/foods/kale">kale</Link>, and{" "}
        <Link href="/foods/broccoli">broccoli</Link> bring carotenoids, vitamin
        K, and (in cruciferous veg) sulforaphane, which activates the body&rsquo;s
        own antioxidant defenses.
      </p>

      <h3>Extra-Virgin Olive Oil</h3>
      <p>
        <Link href="/foods/olive-oil">Extra-virgin olive oil</Link> contains
        oleocanthal, a polyphenol with ibuprofen-like activity, and is the
        signature fat of the Mediterranean pattern. <EvidenceBadge level="strong" />
      </p>

      <h3>Green Tea</h3>
      <p>
        <Link href="/foods/green-tea">Green tea</Link> catechins (notably EGCG)
        are among the most-studied dietary polyphenols for metabolic and vascular
        health.
      </p>

      <Callout variant="warning" title="What pushes inflammation up">
        The flip side matters as much as the additions: ultra-processed foods,
        refined sugar, sugary drinks, and a high intake of processed meat are all
        associated with higher inflammatory markers. Crowding them out is half the
        strategy.
      </Callout>

      <h2>Supplements in Context</h2>
      <p>
        A whole-food pattern is the foundation. Where supplements have the best
        anti-inflammatory evidence, they mirror these foods &mdash;{" "}
        <IngredientLink id="omega-3" source="anti-inflammatory-foods">
          omega-3
        </IngredientLink>{" "}
        and{" "}
        <IngredientLink id="curcumin" source="anti-inflammatory-foods">
          curcumin
        </IngredientLink>{" "}
        are the two most studied. Treat them as add-ons to the diet, not
        substitutes.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Build meals around fish, berries, leafy and cruciferous vegetables, olive
        oil, and green tea, and minimize ultra-processed foods. The pattern is the
        medicine. Explore each food&rsquo;s bioactives on the{" "}
        <Link href="/foods">Food &amp; Beverage encyclopedia</Link>.
      </p>
    </>
  );
}
