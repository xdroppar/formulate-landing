import Link from "next/link";
import { TLDRBox, Callout, EvidenceBadge, IngredientLink } from "@/components/guide";

export function BestFoodSourcesOfOmega3() {
  return (
    <>
      <TLDRBox
        readTime="8 min read"
        takeaways={[
          "The long-chain omega-3s EPA and DHA - the most studied - come mainly from oily fish",
          "Plant sources (walnuts, flax, chia) provide ALA, which converts to EPA/DHA only inefficiently",
          "Two servings of oily fish a week is the standard heart-health recommendation",
          "A fish-oil or algae supplement is a reasonable backup if you don't eat fish",
        ]}
      />

      <p>
        Omega-3 fatty acids are essential fats your body can&rsquo;t make, and
        they&rsquo;re central to heart, brain, and eye health. The catch is that
        not all omega-3s are equal: the long-chain forms <strong>EPA and DHA</strong>{" "}
        drive most of the documented benefits, while the plant form{" "}
        <strong>ALA</strong> must be converted to EPA/DHA &mdash; a process
        that&rsquo;s slow and inefficient in humans (often under 10%). That makes
        your food source matter a lot.
      </p>

      <h2>Why Omega-3s Matter</h2>
      <p>
        A dose-response analysis of prospective cohorts found that each additional
        ~20 g/day of fish was associated with lower all-cause and cardiovascular
        mortality, with the benefit attributed largely to long-chain omega-3s.{" "}
        <EvidenceBadge level="strong" /> See the mechanisms on the{" "}
        <Link href="/nutrients/omega-3">omega-3 nutrient page</Link>.
      </p>

      <h2>The Best Sources of EPA &amp; DHA (Marine)</h2>

      <h3>Salmon</h3>
      <p>
        The flagship source &mdash; rich in both EPA and DHA plus complete protein
        and vitamin D. See the <Link href="/foods/salmon">salmon page</Link> for
        the full profile.
      </p>

      <h3>Sardines</h3>
      <p>
        Small, affordable, and low in mercury, with calcium from the edible bones
        as a bonus. The <Link href="/foods/sardines">sardines page</Link> has the
        details. Mackerel, herring, and anchovies are in the same tier.
      </p>

      <h2>Plant Sources of ALA</h2>
      <p>
        <Link href="/foods/walnuts">Walnuts</Link> are the standout nut for ALA;
        ground flaxseed and chia are even more concentrated. These are valuable
        &mdash; especially for vegetarians &mdash; but because ALA converts poorly,
        they don&rsquo;t fully replace marine sources.
      </p>

      <Callout variant="tip" title="If you don't eat fish">
        Aim for daily ALA from walnuts, flax, or chia, and consider an algae-based
        omega-3 supplement &mdash; algae is where fish get their DHA in the first
        place, so it delivers the long-chain form directly without animal products.
      </Callout>

      <h2>Food vs. Supplement</h2>
      <p>
        Two servings of oily fish a week is the simplest way to cover EPA and DHA.
        If that&rsquo;s not realistic, a{" "}
        <IngredientLink id="fish-oil" source="best-food-sources-of-omega-3">
          fish-oil
        </IngredientLink>{" "}
        or algae supplement is a well-studied backup &mdash; look for a combined
        EPA+DHA dose, not just total &ldquo;fish oil.&rdquo;
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Prioritize oily fish for EPA/DHA, use walnuts and seeds for daily ALA, and
        supplement if you don&rsquo;t eat fish. Explore the full fat profile of any
        food on the <Link href="/foods">Food &amp; Beverage encyclopedia</Link>.
      </p>
    </>
  );
}
