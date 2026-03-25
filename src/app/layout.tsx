import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Formulate — Build Your Longevity Stack",
    template: "%s | Formulate",
  },
  description:
    "Formulate scores and ranks supplements so you know exactly what to take, what to skip, and why. Build your optimal longevity stack.",
  metadataBase: new URL("https://formulate-health.app"),
  alternates: { canonical: "https://formulate-health.app" },
  openGraph: {
    title: "Formulate — Build Your Longevity Stack",
    description:
      "Scores every supplement against clinical research. Build your perfect longevity stack.",
    url: "https://formulate-health.app",
    siteName: "Formulate",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formulate — Build Your Longevity Stack",
    description:
      "Scores every supplement against clinical research. Build your perfect longevity stack.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
