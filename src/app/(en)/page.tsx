import { ConsoleLanding } from "@/components/console/console-landing";
import { ConsoleFaq } from "@/components/console/console-faq";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { getMessages, translate } from "@/lib/i18n/messages";
import { homeFaqs, homeFaqLd, type T } from "@/lib/home-faq";

/**
 * The homepage.
 *
 * This is the console landing, promoted from /preview once it had been looked
 * at. The page it replaces was twelve sections of marketing — hero, problem,
 * trust, stats, platform, foods, how-it-works, comparison, FAQ, pricing,
 * guides, final CTA — and that copy is in git, not deleted from history. What
 * came across, and what did not, is worth stating:
 *
 * THE FAQ CAME WITH IT, because it is the only part with a technical
 * dependency rather than a stylistic one. The FAQPage structured data is a
 * rich result this domain already earns, and it is only valid while a reader
 * can see the same text — so the questions render here, on the server, from
 * the same list the schema is built from. Keeping the schema without the copy
 * would have been worse than dropping both.
 *
 * WHAT DID NOT COME ACROSS: pricing, the comparison table, the guides strip,
 * the stats band and the rest. Nothing internal links to their anchors
 * (checked: no href to #pricing, #compare, #how or #features anywhere in
 * src), so removing them breaks no link on this site. What it does cost is
 * long-form copy that search engines had indexed, and that is a real trade
 * made deliberately rather than a thing nobody noticed.
 *
 * LOCALE STILL FLOWS AS A PROP. The localised homepage renders this same
 * component with its own locale so the copy is server-rendered into the HTML
 * a crawler receives — see (intl)/[locale]/page.tsx. The console's body copy
 * is English, which is exactly why those locales carry noindex.
 */
export default function Home({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const messages = getMessages(locale);
  const t: T = (key, vars) => translate(messages, key, vars);
  const faqs = homeFaqs(t);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqLd(t)) }}
      />
      <ConsoleLanding faq={<ConsoleFaq faqs={faqs} />} />
    </>
  );
}
