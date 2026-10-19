import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const ONE_YEAR = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Optimised images are keyed by their full query string, so a long
    // browser cache is safe.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    // Static marketing assets never change in place (new content = new file).
    return [
      { source: "/video/:path*", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/content/:path*", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/logos/:path*", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
    ];
  },
};

export default withNextIntl(nextConfig);
