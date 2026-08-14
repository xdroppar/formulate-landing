import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { Inter } from "next/font/google";
import { APP_STORE_ID, IOS_LIVE } from "@/lib/app-store";
import "@/app/globals.css";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Formulate Health — Score Your Supplements, Track Your Food, Cover Your Nutrients",
    template: "%s | Formulate",
  },
  description:
    "Score your supplements against clinical research, track your food and meals, and fill your daily nutrient gaps — all in one free app. Transparent scoring, no brand sponsorships.",
  metadataBase: new URL("https://formulate-health.app"),
  alternates: { canonical: "https://formulate-health.app" },
  openGraph: {
    title: "Formulate Health — Score Your Supplements, Track Your Food, Cover Your Nutrients",
    description:
      "Score your supplements against clinical research, track your food and meals, and watch your daily nutrient coverage fill in — one free app for everything you put in your body.",
    url: "https://formulate-health.app",
    siteName: "Formulate",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formulate Health — Score Your Supplements, Track Your Food, Cover Your Nutrients",
    description:
      "Score your supplements against clinical research, track your food and meals, and watch your daily nutrient coverage fill in — one free app for everything you put in your body.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // Apple Smart App Banner, site-wide. iOS Safari renders a native "Formulate
  // — FREE — View" strip at the top of the page, which is the single
  // highest-converting install surface on iOS and costs no layout: Safari
  // draws it above the page rather than inside it, and it is dismissible.
  //
  // Site-wide is deliberate. Most traffic here lands on a long-tail pSEO page
  // from search, not the homepage, so putting this only on `/` would miss ~93%
  // of sessions. Emitted from metadata rather than the old `AppleSmartBanner`
  // client component, which rendered a <meta> inside <body> where Safari never
  // looks for it — it was exported but never mounted anywhere, so it had never
  // worked.
  //
  // Gated on IOS_LIVE: an unknown app-id renders a banner reading "App not
  // available", which looks more broken than no banner at all.
  ...(IOS_LIVE ? { itunes: { appId: APP_STORE_ID } } : {}),
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://formulate-health.app/#organization",
      name: "Formulate",
      url: "https://formulate-health.app",
      logo: {
        "@type": "ImageObject",
        url: "https://formulate-health.app/logo.png",
        width: 512,
        height: 512,
      },
      description:
        "Evidence-based health platform: supplements scored 50–100 against clinical research, whole foods and meals scored on nutritional quality, and daily nutrient coverage tracked across your diet and stack.",
      sameAs: ["https://app.formulate-health.app"],
    },
    {
      "@type": "SoftwareApplication",
      name: "Formulate",
      applicationCategory: "HealthApplication",
      operatingSystem: "Windows, Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Score your supplements against clinical research, track your food and meals, and watch your daily nutrient coverage fill in — one free app for everything you put in your body.",
      url: "https://formulate-health.app",
      publisher: { "@id": "https://formulate-health.app/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell lang="en" fontVariable={inter.variable} jsonLd={jsonLd}>
      {children}
    </SiteShell>
  );
}
