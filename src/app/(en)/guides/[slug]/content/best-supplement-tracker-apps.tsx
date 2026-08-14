import { TLDRBox, Callout } from "@/components/guide";

interface AppRow {
  name: string;
  best: string;
  scores: string;
  food: string;
  price: string;
  highlight?: boolean;
}

const APPS: AppRow[] = [
  {
    name: "Formulate",
    best: "Scoring what you take + eat, in one place",
    scores: "Yes — 50–100, ingredient-level",
    food: "Yes — foods, meals & 26 nutrients",
    price: "Free",
    highlight: true,
  },
  {
    name: "SuppCo",
    best: "Scanning & cataloging a large shelf",
    scores: "Yes — StackScore / TrustScore",
    food: "No",
    price: "Free + Pro",
  },
  {
    name: "Examine.com",
    best: "Deep research on a single compound",
    scores: "No (evidence summaries, not products)",
    food: "Partial (nutrition research)",
    price: "Free + subscription",
  },
  {
    name: "ConsumerLab",
    best: "Lab-testing a physical bottle for purity",
    scores: "Pass/fail lab reviews",
    food: "No",
    price: "$39/yr",
  },
  {
    name: "Labdoor",
    best: "Purity & label-accuracy rankings",
    scores: "Yes — 100-pt, lab-tested",
    food: "No",
    price: "Free",
  },
  {
    name: "Cronometer",
    best: "Precise micronutrient diet logging",
    scores: "No (logs only)",
    food: "Yes — best-in-class micros",
    price: "Free + Gold",
  },
  {
    name: "MyFitnessPal",
    best: "Calorie & macro tracking",
    scores: "No",
    food: "Yes — calorie-first",
    price: "Free + Premium",
  },
  {
    name: "Function Health",
    best: "Blood biomarker testing",
    scores: "No (lab panels)",
    food: "No",
    price: "$365/yr",
  },
];

function AppTable() {
  return (
    <div className="not-prose my-8">
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-bold text-muted tracking-wide uppercase py-3 pr-4 min-w-[120px]">
                App
              </th>
              <th className="text-left text-xs font-bold text-muted tracking-wide uppercase py-3 px-3 min-w-[180px]">
                Best for
              </th>
              <th className="text-left text-xs font-bold text-muted tracking-wide uppercase py-3 px-3 min-w-[160px]">
                Scores products?
              </th>
              <th className="text-left text-xs font-bold text-muted tracking-wide uppercase py-3 px-3 min-w-[160px]">
                Food &amp; nutrients?
              </th>
              <th className="text-left text-xs font-bold text-muted tracking-wide uppercase py-3 px-3 min-w-[90px]">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {APPS.map((a) => (
              <tr
                key={a.name}
                className={`border-b border-border/50 ${a.highlight ? "bg-accent/[0.06]" : ""}`}
              >
                <td className="py-3 pr-4 font-semibold text-text whitespace-nowrap">
                  {a.name}
                  {a.highlight && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-accent">
                      This site
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 text-muted">{a.best}</td>
                <td className="py-3 px-3 text-muted">{a.scores}</td>
                <td className="py-3 px-3 text-muted">{a.food}</td>
                <td className="py-3 px-3 text-muted whitespace-nowrap">{a.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-muted/60 mt-2">
        Pricing and features as of 2026. We list competitors honestly — including
        where they beat us.
      </p>
    </div>
  );
}

export function BestSupplementTrackerApps() {
  return (
    <>
      <TLDRBox
        readTime="11 min read"
        takeaways={[
          "The category splits into four jobs: scoring products (is what I take any good?), logging intake (what did I take and eat?), lab-testing bottles (is this specific bottle pure?), and blood biomarkers (what's happening inside me?). Most apps do one well.",
          "Formulate is the only free tool that scores supplements (50–100, ingredient-level) AND foods AND your daily nutrient coverage in one place, with a fully published methodology and no brand sponsorships.",
          "SuppCo has the biggest product database (160,000+) and barcode scanning — best if you want to catalog a large shelf fast. Examine.com is the best pure research encyclopedia. ConsumerLab and Labdoor physically lab-test bottles. Cronometer is the best micronutrient food logger.",
          "Biomarker platforms (Function Health, InsideTracker, Superpower) answer a different question than a tracker and cost $199–365/yr — they complement a tracker rather than replace one.",
        ]}
      />

      <p>
        &ldquo;Best supplement tracker app&rdquo; is a deceptively broad search,
        because the apps that show up are solving four different problems. Some{" "}
        <em>score</em> your products against the evidence. Some just{" "}
        <em>log</em> what you took. Some physically{" "}
        <em>lab-test</em> bottles for purity. And some draw your blood. Picking
        the &ldquo;best&rdquo; one means first deciding which job you actually
        need done.
      </p>

      <p>
        This guide compares the main options honestly — including where each one
        beats the others, and where Formulate (this site) does and doesn&rsquo;t
        win. We don&rsquo;t take sponsorships or paid placements, so the goal
        here is to point you to the right tool, not to pretend ours is best at
        everything.
      </p>

      <h2>The four jobs in this category</h2>
      <ul>
        <li>
          <strong>Scoring products</strong> — answering &ldquo;is what I&rsquo;m
          taking actually good?&rdquo; based on dose, ingredient form,
          bioavailability, and clinical evidence. (Formulate, SuppCo, Labdoor.)
        </li>
        <li>
          <strong>Logging intake</strong> — recording what you took and ate, and
          tracking trends over time. (Formulate, Cronometer, MyFitnessPal,
          SuppCo.)
        </li>
        <li>
          <strong>Lab-testing bottles</strong> — independently assaying physical
          products for purity and label accuracy. (ConsumerLab, Labdoor.)
        </li>
        <li>
          <strong>Researching compounds</strong> — deep, citation-backed
          summaries of what a given supplement actually does. (Examine.com.)
        </li>
        <li>
          <strong>Measuring biomarkers</strong> — blood panels that tell you
          what&rsquo;s happening inside your body. (Function Health,
          InsideTracker, Superpower.)
        </li>
      </ul>

      <h2>The apps, side by side</h2>
      <AppTable />

      <h2>Formulate — scoring + tracking, free</h2>
      <p>
        Formulate started as a supplement-scoring engine and grew into a full
        intake platform. Every product is scored 50–100 on a six-pillar,
        ingredient-level rubric — evidence quality, dose accuracy,
        bioavailability, third-party testing, label transparency, and
        manufacturing — and the entire methodology is published. Foods and meals
        are scored on real nutritional quality (nutrient density, processing
        level, beneficial compounds), and your daily coverage of 26 core
        nutrients fills in as you log supplements <em>and</em> diet together.
      </p>
      <p>
        <strong>Best for:</strong> people who want to know whether what
        they&rsquo;re taking and eating is any good — not just keep a list of it
        — without paying for it. <strong>Where it doesn&rsquo;t win:</strong> the
        product catalog is smaller than SuppCo&rsquo;s, it doesn&rsquo;t
        physically lab-test bottles (that&rsquo;s ConsumerLab and
        Labdoor&rsquo;s job), and it doesn&rsquo;t run blood panels.
      </p>

      <h2>SuppCo — the biggest catalog and barcode scanning</h2>
      <p>
        SuppCo indexes 160,000+ products by ingredient, with barcode scanning, a
        StackScore for your overall regimen, and a TrustScore across 500+ brands.
        It raised $5.5M and is polished and fast. If your priority is scanning a
        large shelf and cataloging it quickly, it&rsquo;s excellent.
      </p>
      <p>
        <strong>Best for:</strong> cataloging and de-duplicating a big supplement
        shelf. <strong>Where it&rsquo;s lighter:</strong> it doesn&rsquo;t track
        food or whole-diet nutrient coverage, and its scoring methodology is less
        exposed than Formulate&rsquo;s fully-published rubric.
      </p>

      <h2>Examine.com — the research encyclopedia</h2>
      <p>
        Examine isn&rsquo;t a tracker; it&rsquo;s the most respected independent
        encyclopedia of supplement and nutrition research. It summarizes the
        human studies on a compound without selling products or running ads. When
        you want to understand <em>whether ashwagandha does anything for
        stress</em>, this is where you read.
      </p>
      <p>
        <strong>Best for:</strong> deep, neutral research on one compound at a
        time. <strong>Not for:</strong> tracking your intake or scoring specific
        branded products — it operates one layer above the product.
      </p>

      <h2>ConsumerLab &amp; Labdoor — lab-testing the bottle</h2>
      <p>
        These two answer a question no scoring app can: <em>did this specific
        bottle actually contain what the label claims, and was it clean?</em>{" "}
        ConsumerLab (subscription, since 1999) and Labdoor (free, since 2012) buy
        products off the shelf and assay them in a lab. That physical testing is
        their moat.
      </p>
      <p>
        <strong>Best for:</strong> confirming purity and label accuracy of a
        product you already own. <strong>Limits:</strong> they cover a narrow
        slice of the market, re-test categories only every year or two, and
        don&rsquo;t track intake or food. Formulate factors third-party testing{" "}
        <em>into</em> a product&rsquo;s score, but doesn&rsquo;t run the assay
        itself — the two are complementary.
      </p>

      <h2>Cronometer &amp; MyFitnessPal — food loggers</h2>
      <p>
        Cronometer is the gold standard for precise micronutrient diet tracking;
        MyFitnessPal is the calorie-and-macro default with the largest food
        database. Both log supplements as plain entries, but neither{" "}
        <em>evaluates</em> a supplement — a 4%-absorbed magnesium oxide and an
        80%-absorbed glycinate look identical in the log.
      </p>
      <p>
        <strong>Best for:</strong> detailed diet tracking. <strong>The gap
        Formulate fills:</strong> it scores the supplement <em>and</em> rolls its
        nutrients into the same coverage view as your food, so your stack and
        your diet are graded on one scale.
      </p>

      <h2>Function Health, InsideTracker &amp; Superpower — biomarkers</h2>
      <p>
        These platforms ($199–365/yr) draw blood and report dozens to hundreds of
        biomarkers with longevity-oriented guidance. They answer &ldquo;what is
        happening inside me?&rdquo; rather than &ldquo;is this product good?&rdquo;
        — a different and complementary job. A common setup is a biomarker panel
        once or twice a year plus a free daily tracker like Formulate in between.
      </p>

      <Callout variant="info" title="So which one is best for you?">
        Want to know if your stack and diet are actually good, for free →{" "}
        <strong>Formulate</strong>. Cataloging a huge shelf by barcode →{" "}
        <strong>SuppCo</strong>. Researching one compound deeply →{" "}
        <strong>Examine</strong>. Verifying a bottle is pure →{" "}
        <strong>ConsumerLab</strong> or <strong>Labdoor</strong>. Precise diet
        micros → <strong>Cronometer</strong>. Blood biomarkers →{" "}
        <strong>Function Health</strong>. Many people pair two — a tracker plus a
        yearly biomarker panel.
      </Callout>

      <h2>Why we list competitors honestly</h2>
      <p>
        We don&rsquo;t take brand sponsorships or paid placements, and that
        includes how we talk about other apps. If SuppCo&rsquo;s catalog is
        bigger, we say so. If ConsumerLab can do something we can&rsquo;t, we say
        that too. The point of Formulate is to help you make better decisions
        about what you put in your body — and sometimes the honest answer is that
        a different tool fits your job better. For the things Formulate{" "}
        <em>does</em> do, it does them free, transparently, and without anyone
        paying to move a number.
      </p>
    </>
  );
}
