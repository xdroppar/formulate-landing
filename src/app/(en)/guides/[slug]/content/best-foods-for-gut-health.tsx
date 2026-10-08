import Link from "next/link";
import { TLDRBox, Callout, EvidenceBadge, IngredientLink } from "@/components/guide";

export function BestFoodsForGutHealth() {
  return (
    <>
      <TLDRBox
        readTime="8 min read"
        takeaways={[
          "Gut health rests on two pillars: fiber (prebiotics) to feed bacteria, and fermented foods (probiotics) to seed them",
          "Top sources: legumes, whole grains, and onions for fiber; yogurt and kefir for live cultures",
          "Diversity of plants is the single best predictor of a healthy microbiome",
          "Go gradual - a sudden fiber jump causes gas while your microbes adapt",
        ]}
      />

      <p>
        Your gut is home to trillions of microbes that influence digestion,
        immunity, metabolism, and even mood. You can&rsquo;t micromanage them, but
        you can feed and seed them well. Two food strategies do most of the work:{" "}
        <strong>prebiotic fiber</strong> that nourishes the bacteria you already
        have, and <strong>fermented foods</strong> that introduce live cultures.
      </p>

      <h2>Pillar 1: Feed Them (Prebiotic Fiber)</h2>
      <p>
        Gut bacteria ferment soluble fiber into short-chain fatty acids like
        butyrate &mdash; the main fuel for your colon cells and a key
        anti-inflammatory signal. The best feeders are everyday plants:
      </p>
      <ul>
        <li>
          <Link href="/foods/lentils">Lentils</Link>,{" "}
          <Link href="/foods/black-beans">black beans</Link>, and other legumes
          &mdash; rich in fermentable fiber and resistant starch
        </li>
        <li>Whole grains like oats and barley (beta-glucan)</li>
        <li>Onions, garlic, leeks, and asparagus (inulin)</li>
        <li>
          <Link href="/foods/broccoli">Broccoli</Link> and other cruciferous
          vegetables
        </li>
      </ul>
      <p>
        See how fiber drives this on the{" "}
        <Link href="/nutrients/fiber">fiber nutrient page</Link>.
      </p>

      <h2>Pillar 2: Seed Them (Fermented Foods)</h2>
      <p>
        Fermented foods deliver live bacteria plus the beneficial compounds they
        produce. A meta-analysis of cohort studies linked fermented dairy in
        particular to lower cardiovascular risk. <EvidenceBadge level="moderate" />{" "}
        Reach for:
      </p>
      <ul>
        <li>
          <Link href="/foods/yogurt">Yogurt</Link> and{" "}
          <Link href="/foods/greek-yogurt">Greek yogurt</Link> with live active
          cultures
        </li>
        <li>Kefir, a more culture-diverse fermented milk</li>
        <li>Sauerkraut, kimchi, miso, and tempeh (look for unpasteurized)</li>
      </ul>

      <Callout variant="tip" title="Diversity beats any single superfood">
        The strongest dietary predictor of a healthy microbiome isn&rsquo;t one
        food &mdash; it&rsquo;s the <em>number of different plants</em> you eat per
        week. Aim for 30+ distinct plant foods (vegetables, fruit, legumes, grains,
        nuts, seeds, herbs) across the week.
      </Callout>

      <Callout variant="warning" title="Increase fiber gradually">
        A sudden jump in fiber feeds your bacteria faster than they can adapt,
        causing gas and bloating. Add it in over a couple of weeks and drink more
        water alongside.
      </Callout>

      <h2>Where Probiotic Supplements Fit</h2>
      <p>
        Food first &mdash; fermented foods are cheaper and more diverse than most
        capsules. But a targeted{" "}
        <IngredientLink id="probiotics" source="best-foods-for-gut-health">
          probiotic
        </IngredientLink>{" "}
        can help in specific situations, such as after a course of antibiotics or
        for certain digestive conditions. Strain and dose matter more than the CFU
        count on the front of the bottle.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Feed your microbes with a wide variety of fiber-rich plants and seed them
        with fermented foods. Diversity is the real superfood. Explore the
        prebiotic and bioactive content of any food on the{" "}
        <Link href="/foods">Food &amp; Beverage encyclopedia</Link>.
      </p>
    </>
  );
}
