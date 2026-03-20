import { Suspense } from "react";
import { Metadata } from "next";
import { DownloadClient } from "./download-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Download",
  description: "Download Formulate for Windows — build your optimal longevity stack.",
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
