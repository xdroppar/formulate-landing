import { Suspense } from "react";
import { Metadata } from "next";
import { DownloadClient } from "./download-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Download Formulate for Windows — Free Supplement Tracking App",
  description:
    "Score every product, build your personal supplement stack, and track daily intake. Free Windows desktop app — 80 MB, installs in minutes, no account required to browse.",
  alternates: { canonical: "https://formulate-health.app/download" },
  openGraph: {
    title: "Download Formulate — Free Supplement Tracking App",
    description:
      "Score every product, build your personal supplement stack, and track daily intake. Free Windows desktop app.",
    url: "https://formulate-health.app/download",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Download Formulate — Free Supplement Tracking App",
    description:
      "Score every product, build your personal supplement stack, and track daily intake.",
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
