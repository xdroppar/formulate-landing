import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Formulate — Every Supplement Scored Against Clinical Research",
    template: "%s | Formulate",
  },
  description:
    "Score any supplement 50–100 against clinical research. Check dose safety, compare brands, and build your optimal stack. Free, transparent, no brand sponsorships.",
  metadataBase: new URL("https://formulate-health.app"),
  alternates: { canonical: "https://formulate-health.app" },
  openGraph: {
    title: "Formulate — Every Supplement Scored Against Clinical Research",
    description:
      "Score any supplement 50–100 against clinical research. Check dose safety, compare brands, and build your optimal stack.",
    url: "https://formulate-health.app",
    siteName: "Formulate",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formulate — Every Supplement Scored Against Clinical Research",
    description:
      "Score any supplement 50–100 against clinical research. Check dose safety, compare brands, and build your optimal stack.",
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
    "Score any supplement 50–100 against clinical research. Check dose safety, compare brands, and build your optimal stack.",
  url: "https://formulate-health.app",
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
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
