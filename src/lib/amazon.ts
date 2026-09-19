/**
 * The "Buy on Amazon" link for a product, always carrying our Associates tag.
 *
 * WHY THIS EXISTS. Amazon is the one buy destination that has measurably
 * earned: Jul 1–Sep 16 2026, 29 clicks turned into 10 orders ($309.82 ordered,
 * $6.50 earned). A third of the people who click "buy" here buy. But only 306
 * of 972 supplement pages had a button: every Pure Encapsulations, Jarrow,
 * Double Wood, Codeage, Onnit and Kaged product, and most Nutricost and
 * BulkSupplements, had none, because `amazon_url` is filled per product
 * upstream and those brands were never filled. And 5 of the 306 links carried
 * no tag at all, so they earned nothing.
 *
 * A product without a stored link gets an Amazon SEARCH for its brand and name
 * — honest about what it is (a search, not a claimed listing), and a tagged
 * search still credits an order placed from it. Names are short (median three
 * words), so the search lands on the product. Stored links are kept, and the
 * tag is set on them whether or not they had one.
 */
export const AMAZON_ASSOCIATES_TAG = "formulate00-20";

const fold = (s: string) =>
  s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Brand + name, without saying the brand twice. Skincare and sleep names
 *  already start with the brand ("Anua Niacinamide 10% + TXA 4% Serum"), so
 *  691 searches read "Anua Anua Niacinamide…"; supplement names do not. */
export function amazonQueryFor(p: { brand: string; name: string }): string {
  const brand = (p.brand ?? "").trim();
  const name = (p.name ?? "").trim();
  // Whole words only: "Nest" must not swallow "Nestle…".
  const named = fold(name) === fold(brand) || fold(name).startsWith(`${fold(brand)} `);
  const q = brand && !named ? `${brand} ${name}` : name;
  return q.replace(/\s+/g, " ").trim();
}

export function amazonLinkFor(p: {
  brand: string;
  name: string;
  amazon_url?: string | null;
}): string {
  const search = `https://www.amazon.com/s?k=${encodeURIComponent(amazonQueryFor(p))}`;
  let url: URL;
  try {
    const stored = p.amazon_url?.trim();
    url = new URL(stored ? (stored.startsWith("http") ? stored : `https://${stored}`) : search);
  } catch {
    // A malformed stored link must not take the page down with it.
    url = new URL(search);
  }
  url.searchParams.set("tag", AMAZON_ASSOCIATES_TAG);
  return url.toString();
}
