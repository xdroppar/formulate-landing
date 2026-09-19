import Link from "next/link";
import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function HowToChooseAMattress() {
  return (
    <>
      <TLDRBox
        readTime="11 min read"
        takeaways={[
          "The best trial evidence favours medium-firm over firm: in a 313-person randomised trial, people with chronic low-back pain did better on a medium-firm mattress",
          "Materials mostly change heat, motion transfer and how quickly the surface responds — not whether a mattress is “supportive”",
          "Use the trial period properly: bodies take weeks to adjust, so judge a new mattress after about a month, not after one night",
          "“Orthopedic”, “zoned” and most “cooling” claims are marketing language with little independent testing behind them",
          "A topper can change the feel of a sound mattress; it cannot fix one that sags",
        ]}
      />

      <p>
        A mattress is one of the few health purchases most people make only a
        handful of times in their lives, and one of the few where the shop floor
        is almost no help. Ten minutes lying on a showroom bed in your coat tells
        you very little about eight hours a night for eight years. The marketing
        does not help either: every mattress is &ldquo;supportive&rdquo;,
        &ldquo;pressure-relieving&rdquo; and &ldquo;cooling&rdquo;, and firmness
        numbers are not comparable between brands.
      </p>
      <p>
        The research is thinner than the industry&rsquo;s confidence suggests,
        but it does answer the most common question &mdash; how firm &mdash; and
        it gives a sensible way to think about the rest. This guide covers what
        the trials found, what each material actually changes, how to use a
        trial period, when to replace, and which claims to ignore.
      </p>

      <h2>What the evidence says about firmness</h2>
      <p>
        For decades the standard advice for a bad back was &ldquo;sleep on
        something hard&rdquo;. It was never tested until 2003, when a Spanish
        group randomised 313 adults with chronic non-specific low-back pain to a
        firm or a medium-firm mattress, with neither patients nor assessors told
        which was which. After 90 days the medium-firm group had less pain in
        bed, less pain on rising, and less disability.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Kovacs et al.", year: 2003, journal: "The Lancet",
          title: "Effect of firmness of mattress on chronic non-specific low-back pain: randomised, double-blind, controlled, multicentre trial",
          url: "https://pubmed.ncbi.nlm.nih.gov/14630439/",
          summary: "313 adults with chronic low-back pain: medium-firm mattresses (5.6 on a 1–10 European scale) beat firm ones (2.3) for pain in bed, pain on rising and disability at 90 days.",
        }]} />
      </p>
      <p>
        A Danish trial five years later pointed the same way from a different
        angle. People with chronic low-back pain who slept for a month on a
        body-conforming foam mattress or a waterbed did slightly better than
        those given a hard mattress &mdash; though the authors stressed the
        differences were small and many participants dropped out.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Bergholdt et al.", year: 2008, journal: "Spine",
          title: "Better backs by better beds?",
          url: "https://pubmed.ncbi.nlm.nih.gov/18379395/",
          summary: "160 people with chronic low-back pain; foam and waterbed both did slightly better than a hard mattress over one month. Differences were small and dropout was high.",
        }]} />
      </p>
      <p>
        Two later systematic reviews pulled the controlled trials together and
        reached the same broad conclusion: a mattress people describe as
        medium-firm is the best-supported choice for comfort, sleep quality and
        spinal alignment, and adjustable (self-inflated) air surfaces also did
        well because the sleeper can tune them.{" "}
        <EvidenceBadge level="moderate" studies={[
          {
            authors: "Radwan et al.", year: 2015, journal: "Sleep Health",
            title: "Effect of different mattress designs on promoting sleep quality, pain reduction, and spinal alignment in adults with or without back pain; systematic review of controlled trials",
            url: "https://pubmed.ncbi.nlm.nih.gov/29073401/",
            summary: "24 controlled trials: medium-firm and custom-inflated (self-adjusted) mattresses were best for sleep comfort, quality and spinal alignment.",
          },
          {
            authors: "Caggiari et al.", year: 2021, journal: "Journal of Orthopaedics and Traumatology",
            title: "What type of mattress should be chosen to avoid back pain and improve sleep quality? Review of the literature",
            url: "https://pubmed.ncbi.nlm.nih.gov/34878594/",
            summary: "39 studies reviewed: medium-firm mattresses promoted comfort, sleep quality and spinal alignment.",
          },
        ]} />
      </p>

      <Callout variant="evidence" title="How much weight to put on this">
        The trials are few, mostly short (one to three months), and mostly in
        people who already had back pain. &ldquo;Medium-firm&rdquo; is also a
        loose category: the Kovacs trial used a standardised European scale, but
        the numbers printed on retail mattresses are each brand&rsquo;s own and
        cannot be compared across brands. Treat medium-firm as the sensible
        default, not a precise prescription.
      </Callout>

      <h2>Sleeping position and body weight</h2>
      <p>
        Beyond &ldquo;medium-firm&rdquo;, most advice about matching a mattress
        to your body comes from mattress-industry convention and basic mechanics
        rather than trials. It is still reasonable:
      </p>
      <ul>
        <li>
          <strong>Side sleepers</strong> put their weight through the shoulder
          and hip. A surface with a softer top layer lets those points sink in so
          the spine stays roughly straight.
        </li>
        <li>
          <strong>Back sleepers</strong> generally do well on medium-firm, which
          is where most of the trial evidence sits.
        </li>
        <li>
          <strong>Stomach sleepers</strong> tend to need a firmer surface so the
          hips do not sag and arch the lower back.
        </li>
        <li>
          <strong>Heavier people</strong> compress foam further, so the same
          mattress feels softer to them and wears faster. Thicker comfort layers,
          denser foams or coil support cores help.
        </li>
        <li>
          <strong>Couples</strong> with very different weights or preferences
          may do better with split-firmness or two single mattresses on one
          frame than with a compromise that suits neither.
        </li>
      </ul>

      <h2>Materials: what each one actually changes</h2>
      <p>
        The big differences between materials are not in
        &ldquo;support&rdquo;, which any well-made mattress of the right firmness
        provides. They are in heat, motion transfer, responsiveness (how quickly
        the surface springs back when you move), durability and price.
      </p>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Heat</th>
            <th>Motion transfer</th>
            <th>Feel</th>
            <th>Watch for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Memory foam</td>
            <td>Warmest; foam insulates and you sink into it</td>
            <td>Lowest</td>
            <td>Slow, hugging, pressure-relieving</td>
            <td>Feeling &ldquo;stuck&rdquo; when turning; low-density foams soften quickly</td>
          </tr>
          <tr>
            <td>Polyfoam (all-foam)</td>
            <td>Warm</td>
            <td>Low</td>
            <td>Faster response than memory foam</td>
            <td>Density matters for lifespan; cheap foams sag early</td>
          </tr>
          <tr>
            <td>Latex</td>
            <td>Cooler than memory foam, especially perforated</td>
            <td>Low to moderate</td>
            <td>Buoyant, springy</td>
            <td>Heavy; expensive; rare latex allergy</td>
          </tr>
          <tr>
            <td>Innerspring</td>
            <td>Coolest; air moves through the coils</td>
            <td>Highest with linked coils, lower with pocketed coils</td>
            <td>Bouncy, &ldquo;on top&rdquo; of the bed</td>
            <td>Thin comfort layers wear through; can be noisy</td>
          </tr>
          <tr>
            <td>Hybrid (coils plus thick foam or latex)</td>
            <td>In between</td>
            <td>Low to moderate with pocketed coils</td>
            <td>Pressure relief with some bounce</td>
            <td>Price; the comfort layer decides most of the feel</td>
          </tr>
          <tr>
            <td>Adjustable air</td>
            <td>Depends on the top layers</td>
            <td>Low if each side is separate</td>
            <td>Firmness you can change</td>
            <td>Pumps and valves can fail; price</td>
          </tr>
        </tbody>
      </table>
      <p>
        If you share a bed with a restless partner, motion isolation is the
        property most worth paying for: foam and pocketed coils do this well,
        linked-coil innersprings do it badly. If you sleep hot, the material and
        how deeply you sink into it matter more than any &ldquo;cooling&rdquo;
        additive (more on that below).
      </p>

      <h3>Why heat matters</h3>
      <p>
        Your core temperature has to fall a little for sleep to start and stay
        deep. Laboratory work on thermal environment shows that when people
        sleep with normal bedding, heat increases wakefulness and cuts
        slow-wave and REM sleep.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Okamoto-Mizuno and Mizuno", year: 2012, journal: "Journal of Physiological Anthropology",
          title: "Effects of thermal environment on sleep and circadian rhythm",
          url: "https://pubmed.ncbi.nlm.nih.gov/22738673/",
          summary: "Review: with bedding and clothing, heat exposure increases wakefulness and reduces slow-wave and REM sleep; humid heat adds to the load.",
        }]} />{" "}
        A mattress that you sink deeply into, wrapped in thick foam, reduces the
        skin area that can shed heat. For hot sleepers that is a real, not a
        marketing, reason to prefer latex, coils or a firmer foam. Our guide to
        the{" "}
        <Link href="/guides/sleep-environment-dark-quiet-cool">
          sleep environment
        </Link>{" "}
        covers room temperature and bedding.
      </p>

      <h2>Certifications worth knowing</h2>
      <p>
        Certifications do not tell you whether a mattress is comfortable, but
        they do tell you something about what is in it:
      </p>
      <ul>
        <li>
          <strong>CertiPUR-US</strong> (foams): tested for specified chemicals
          (certain flame retardants, heavy metals, formaldehyde) and for
          low emissions of volatile organic compounds.
        </li>
        <li>
          <strong>OEKO-TEX Standard 100</strong> (textiles and components):
          tested for a list of harmful substances.
        </li>
        <li>
          <strong>GOLS / GOTS</strong>: organic latex and organic textiles
          respectively. These certify how materials were grown and processed,
          not that the mattress is healthier to sleep on.
        </li>
        <li>
          <strong>Greenguard Gold</strong>: low chemical emissions into indoor
          air.
        </li>
      </ul>
      <p>
        New foam mattresses often smell for a few days (&ldquo;off-gassing&rdquo;).
        Airing the room usually clears it. If a smell persists for weeks, use
        the trial period.
      </p>

      <h2>Trial periods and break-in</h2>
      <p>
        Most online mattress sellers now offer home trials of around 100 nights.
        They exist because a showroom test is a poor predictor, and they are the
        most useful consumer protection in this market. Use them deliberately:
      </p>
      <ol>
        <li>
          <strong>Read the return terms before buying.</strong> Many trials
          require you to keep the mattress for a minimum period (often 30 days)
          before returning, and some charge collection or restocking fees.
        </li>
        <li>
          <strong>Give it three to four weeks.</strong> New foam softens a little
          over the first weeks, and your body adjusts to a new surface. Morning
          stiffness in the first week is common and not, by itself, a verdict.
        </li>
        <li>
          <strong>Keep a simple log.</strong> Note morning pain, how often you
          woke, and whether you slept hot, for a week on your old bed and then
          weekly on the new one. Memory of &ldquo;how it felt&rdquo; is
          unreliable after a month.
        </li>
        <li>
          <strong>Decide before the deadline.</strong> If you are still waking
          stiff or hot after a month, return it.
        </li>
      </ol>
      <p>
        Also check the foundation. A mattress on a sagging base or slats that
        are too far apart will feel worse than it is, and may void the warranty.
      </p>

      <h2>When to replace a mattress</h2>
      <p>
        There is no good evidence for a fixed lifespan. &ldquo;Every seven to
        eight years&rdquo; is an industry rule of thumb. What does exist is a
        small study in which healthy people with mild sleep-related aches
        switched from their own beds (on average about nine and a half years old)
        to new medium-firm ones, and reported better sleep quality and less back
        discomfort over four weeks.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Jacobson et al.", year: 2009, journal: "Journal of Chiropractic Medicine",
          title: "Changes in back pain, sleep quality, and perceived stress after introduction of new bedding systems",
          url: "https://pubmed.ncbi.nlm.nih.gov/19646380/",
          summary: "59 healthy adults with minor aches: after switching from ~9.5-year-old beds to new medium-firm ones, self-rated sleep quality and back discomfort improved over 4 weeks.",
        }]} />{" "}
        It had no control group and people knew they had a new bed, so some of
        that improvement is expectation. Better signals than age:
      </p>
      <ul>
        <li>A visible dip or body impression where you sleep</li>
        <li>You wake stiff or sore and it eases within half an hour of getting up</li>
        <li>You sleep noticeably better in hotels or on other beds</li>
        <li>Coils you can feel, or foam that has gone lumpy</li>
        <li>You or your partner roll towards the middle</li>
      </ul>
      <p>
        Many warranties treat a body impression deeper than a stated limit
        &mdash; often somewhere around 2&ndash;4&nbsp;cm (&frac34;&ndash;1&frac12;
        inches) &mdash; as a defect. Check your warranty and measure the dip
        with a straight edge across the bed before you assume you have to pay
        for a replacement.
      </p>

      <h2>What&rsquo;s marketing</h2>
      <ul>
        <li>
          <strong>&ldquo;Orthopedic&rdquo;.</strong> An unregulated word. It
          usually just means firm &mdash; and firm is the option that lost to
          medium-firm in the best trial.
        </li>
        <li>
          <strong>&ldquo;Zoned support&rdquo;.</strong> Firmer under the hips,
          softer under the shoulders makes mechanical sense. But when we searched
          PubMed, the only sleep-lab study of a zoned mattress we found was 20
          young adults on an adjustable zoned air mattress, co-authored by a
          mattress-company employee, with mixed results. We found no trial
          showing zoning reduces back pain compared with a well-chosen unzoned
          mattress.
        </li>
        <li>
          <strong>&ldquo;Cooling&rdquo; foams.</strong> Gel beads, copper,
          graphite and &ldquo;phase-change&rdquo; covers often feel cool to the
          touch for the first minutes, then reach body temperature. Airflow
          through coils and not sinking too deeply make a larger, more lasting
          difference. Actively temperature-controlled covers (water pumped
          through a pad) are a different product: one study found more deep
          sleep with cooling early in the night, but the company that makes the
          device funded it and its employees wrote it.{" "}
          <EvidenceBadge level="emerging" studies={[{
            authors: "Moyen et al.", year: 2024, journal: "Bioengineering",
            title: "Sleeping for One Week on a Temperature-Controlled Mattress Cover Improves Sleep and Cardiovascular Recovery",
            url: "https://pubmed.ncbi.nlm.nih.gov/38671774/",
            summary: "54 people, 4 nights on vs 4 nights off an active temperature-controlled cover: more deep and REM sleep with early-night cooling. Funded by the maker; most authors were its employees.",
          }]} />
        </li>
        <li>
          <strong>Firmness scores.</strong> A &ldquo;6 out of 10&rdquo; from one
          brand is not a 6 from another. Only the trial period tells you what a
          number means for your body.
        </li>
        <li>
          <strong>&ldquo;Doctor recommended&rdquo; or &ldquo;chiropractor
          approved&rdquo;.</strong> These are endorsements, not evidence.
        </li>
        <li>
          <strong>Sleep-tracking &ldquo;smart&rdquo; mattresses.</strong> The
          sensors may be interesting, but tracking does not change how the
          mattress supports you. See our guide to{" "}
          <Link href="/guides/hrv-explained-wearables">wearables and HRV</Link>{" "}
          for what these numbers can and cannot tell you.
        </li>
      </ul>

      <h2>Toppers vs replacing</h2>
      <p>
        A topper is a layer of foam, latex, wool or fibre, usually
        5&ndash;8&nbsp;cm (2&ndash;3 inches) thick, laid on top of the mattress.
        It is a good, cheap fix for one specific problem: a mattress that is in
        good shape but feels too firm. A soft topper on a medium-firm or firm
        mattress can make it comfortable for a side sleeper, for example.
      </p>
      <p>
        A topper cannot fix sagging. It follows the dip underneath it, so the
        spine still ends up bent. It also cannot make a soft mattress
        meaningfully firmer. And a thick memory-foam topper will make a bed
        warmer. If the mattress under it is worn out, put the money towards a
        replacement instead. Pillows matter too: a pillow that is too high or
        too flat for your position can undo a good mattress. Our{" "}
        <Link href="/learn/pillows">pillow reference</Link> covers loft and
        fill.
      </p>

      <Callout variant="warning" title="When back pain is not a mattress problem">
        See a clinician rather than shopping for a new bed if back pain comes
        with fever, unexplained weight loss, numbness around the genitals or
        buttocks, new bladder or bowel problems, leg weakness, pain after a fall
        or accident, a history of cancer, or pain that is worse at night no
        matter how you lie. These can signal conditions that need prompt
        assessment.
      </Callout>

      <Callout variant="warning" title="Babies and toddlers">
        Infants need a firm, flat mattress made for their crib or cot, fitted
        without gaps, with no toppers, pillows or soft bedding. Adult mattress
        advice does not apply to them.
      </Callout>

      <h2>Frequently Asked Questions</h2>

      <h3>Is a firm mattress better for back pain?</h3>
      <p>
        Not according to the best trial. In the Kovacs study, people with
        chronic low-back pain did better on medium-firm than on firm mattresses,
        and a later trial found a very hard mattress slightly worse than foam or
        a waterbed. &ldquo;Firm is best&rdquo; is folklore.
      </p>

      <h3>Memory foam or hybrid if I sleep hot?</h3>
      <p>
        A hybrid or latex mattress is usually the cooler choice, because air
        moves through coils and you sink less deeply. If you prefer foam,
        choose a firmer one with a breathable cover, and look at your bedding
        and room temperature before paying extra for &ldquo;cooling&rdquo;
        features.
      </p>

      <h3>How long should a mattress last?</h3>
      <p>
        It depends on materials, body weight and use. Treat seven to ten years
        as a rough range, but replace on the signs &mdash; sagging, morning
        stiffness that eases once you are up, sleeping better elsewhere &mdash;
        rather than on a calendar.
      </p>

      <h3>Can a topper fix a sagging mattress?</h3>
      <p>
        No. A topper follows whatever is beneath it. Toppers are useful for
        softening a mattress that is still structurally sound.
      </p>

      <h3>Is an expensive mattress worth it?</h3>
      <p>
        Price buys durability (denser foams, better coils), materials such as
        natural latex, and sometimes a longer trial or warranty. It does not buy
        a better match for your body. None of the trials above compared price
        levels, so there is no evidence that paying more buys less pain.
      </p>

      <h3>Should couples buy a split mattress?</h3>
      <p>
        If you differ a lot in weight, sleeping position or how hot you sleep,
        yes, it is worth considering. Otherwise one of you is always on the
        wrong mattress. Two single mattresses on one frame, or a split-firmness
        model, solves it.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Start from medium-firm, adjust for how you sleep and how much you weigh,
        and choose the material for heat and motion rather than for
        &ldquo;support&rdquo; claims. Buy where the trial period is generous and
        the return terms are clear, give the mattress a month, and keep a short
        log so you are judging by nights rather than memory. Ignore
        &ldquo;orthopedic&rdquo;, zoning and cooling-gel claims until someone
        shows independent data. For the rest of the bedroom, see our guides to
        the{" "}
        <Link href="/guides/sleep-environment-dark-quiet-cool">
          sleep environment
        </Link>{" "}
        and{" "}
        <Link href="/guides/weighted-blankets-evidence">weighted blankets</Link>
        , and the{" "}
        <a href="https://app.formulate-health.app/learning/track/sleep?utm_source=landing&utm_medium=guide_body&utm_campaign=how-to-choose-a-mattress">sleep learning track</a>.
      </p>
      <p>
        <a href="https://app.formulate-health.app/sleep">
          Compare mattresses and sleep gear on the Formulate sleep shelf &rarr;
        </a>
      </p>
    </>
  );
}
