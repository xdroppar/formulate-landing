import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { I18nProvider } from "@/components/i18n-provider";
import { LanguagePrompt } from "@/components/language-prompt";
import { AttributionTracker } from "@/components/attribution-tracker";
import { PageTracker } from "@/components/page-tracker";
import { AppModeBoot } from "@/components/app-mode-boot";

/**
 * The shared `<html>` document for both root layouts.
 *
 * There are two root layouts — `(en)` and `(intl)/[locale]` — because `<html
 * lang>` can only be set by a root layout, and the English tree and the
 * localised tree need different values. Route groups let a Next app have more
 * than one, without changing a single URL.
 *
 * Everything below the `lang`/`dir` attributes is identical between them, so
 * it lives here once. Two hand-maintained copies of a document shell is the
 * kind of duplication that drifts silently — one gets a new analytics tag or a
 * changed provider order and the other quietly does not.
 *
 * Note the absence of HtmlLangSync: the whole point of this split is that the
 * server now emits the correct `lang`, so there is nothing left to sync on the
 * client.
 */
export function SiteShell({
  lang,
  dir = "ltr",
  fontVariable,
  jsonLd,
  children,
}: {
  lang: string;
  dir?: "ltr" | "rtl";
  fontVariable: string;
  jsonLd: unknown;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} dir={dir} className={fontVariable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <AppModeBoot />
        <I18nProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <LanguagePrompt />
        </I18nProvider>
        <Analytics />
        <AttributionTracker />
        <PageTracker />
      </body>
    </html>
  );
}
