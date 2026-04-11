import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },

  /**
   * Redirect any legacy / Google-indexed catalog and brand URLs to the app
   * subdomain. The catalog lives on app.formulate-health.app — not the
   * landing site — but historical canonical tags on the product pages
   * accidentally pointed Google at formulate-health.app/catalog/*, so real
   * visitors from search results were hitting our 404 page. These 301s
   * fix every inbound link instantly; Google will update its index once
   * it re-crawls the corrected canonical on the destination pages.
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
        source: "/brands",
        destination: "https://app.formulate-health.app/brands",
        permanent: true,
      },
      {
        source: "/brands/:slug*",
        destination: "https://app.formulate-health.app/brands/:slug*",
        permanent: true,
      },
      {
        source: "/stack",
        destination: "https://app.formulate-health.app/stack",
        permanent: true,
      },
      {
        source: "/methodology",
        destination: "https://app.formulate-health.app/methodology",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
