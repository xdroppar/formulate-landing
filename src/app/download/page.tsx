import { Suspense } from "react";
import { Metadata } from "next";
import { DownloadClient } from "./download-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Formulate — Free Supplement Tracking, in your browser",
  description:
    "Score every product, build your personal supplement stack, and track daily intake — free in the web app, no install. The Windows desktop app is in limited access; request a download link.",
  alternates: { canonical: "https://formulate-health.app/download" },
  openGraph: {
    title: "Formulate — Free Supplement Tracking",
    description:
      "Score every product, build your stack, and track daily intake — free in the web app. Desktop app available by request.",
    url: "https://formulate-health.app/download",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Formulate — Free Supplement Tracking",
    description:
      "Score every product, build your stack, and track daily intake — free in the web app.",
  },
};

export default function DownloadPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      }
    >
      <DownloadClient />
    </Suspense>
  );
}
