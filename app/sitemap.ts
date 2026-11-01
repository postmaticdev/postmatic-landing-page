import { MetadataRoute } from "next";
import { LANDINGPAGE_URL } from "@/constants";
import { allLocales } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = LANDINGPAGE_URL;
  const now = new Date();

  const pages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    // Solution pages target specific searches (image generator, design, scheduling).
    { path: "/ai-product-image-generator", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/ai-social-media-design", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/social-media-scheduler", changeFrequency: "monthly" as const, priority: 0.9 },
    {
      path: "/terms-and-conditions",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      path: "/privacy-policy",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      path: "/terms-of-service",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      path: "/cookie-policy",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      path: "/data-deletion",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      path: "/status-system",
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of allLocales) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        // hreflang pairs, so search engines link the id/en versions of each page.
        alternates: {
          languages: Object.fromEntries(allLocales.map((l) => [l, `${baseUrl}/${l}${page.path}`])),
        },
      });
    }
  }

  return entries;
}
