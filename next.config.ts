import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's image optimizer is metered (1k source images/mo on Hobby).
    // The desktop image pipeline already emits pre-optimized WebP + thumbs,
    // so routing through /_next/image just burns quota and returns 402s
    // once exhausted. Serve the files directly instead.
    unoptimized: true,
  },

  /**
   * Redirect any legacy / Google-indexed catalog URLs to the app subdomain.
   * The per-product catalog lives on app.formulate-health.app — not landing —
   * but historical canonical tags accidentally pointed Google at
   * formulate-health.app/catalog/*, so real visitors from search results were
   * hitting our 404 page. These 301s fix inbound links instantly; Google will
   * update its index once it re-crawls the corrected canonical on destination.
   *
   * NOTE: /brands and /brands/:slug* are NOT redirected — the SEO-facing brand
   * hub pages live here on the landing site (see src/app/brands/). The webapp
   * has its own /brands view for logged-in users; different surface, same data.
   */
  async redirects() {
    return [
      {
        source: "/catalog",
        destination: "https://app.formulate-health.app/catalog",
        permanent: true,
      },
      {
        source: "/catalog/:slug*",
        destination: "https://app.formulate-health.app/catalog/:slug*",
        permanent: true,
      },
      {
        source: "/stack",
        destination: "https://app.formulate-health.app/stack",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
