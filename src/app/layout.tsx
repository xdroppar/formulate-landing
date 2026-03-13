import type { Metadata } from "next";
import { ClerkWrapper } from "@/components/clerk-wrapper";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Formulate — Build Your Longevity Stack",
  description:
    "Formulate scores and ranks supplements so you know exactly what to take, what to skip, and why. Build your optimal longevity stack.",
  metadataBase: new URL("https://formulate-health.app"),
  openGraph: {
    title: "Formulate — Build Your Longevity Stack",
    description:
      "Scores every supplement against clinical research. Build your perfect longevity stack.",
    url: "https://formulate-health.app",
    type: "website",
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
        <ClerkWrapper>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ClerkWrapper>
      </body>
    </html>
  );
}
