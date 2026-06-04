import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AttributionTracker } from "@/components/attribution-tracker";
import { PageTracker } from "@/components/page-tracker";
import { AppModeBoot } from "@/components/app-mode-boot";
import "./globals.css";

const inter = Inter({
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
};

const jsonLd = {
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
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <AppModeBoot />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <AttributionTracker />
        <PageTracker />
      </body>
    </html>
  );
}
