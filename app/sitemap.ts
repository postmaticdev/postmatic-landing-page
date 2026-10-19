import { MetadataRoute } from "next";
import { LANDINGPAGE_URL } from "@/constants";
import { allLocales } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = LANDINGPAGE_URL;
  const now = new Date();

  const pages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
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
      });
    }
  }

  return entries;
}
