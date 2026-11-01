import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const ONE_YEAR = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  // The Dockerfile ships .next/standalone (Vercel ignores this setting).
  output: "standalone",
  images: {
    // AVIF first (typically 20-30% smaller than WebP), WebP for older browsers.
    formats: ["image/avif", "image/webp"],
    // Every `fill` image lists one srcset entry per size below, in the HTML
    // and again in the RSC payload. Nothing on the site renders wider than
    // ~1000 device px, so the 2048/3840 (and 16px) variants were only bloat.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
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
