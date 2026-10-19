import { MetadataRoute } from "next";
import { LANDINGPAGE_URL } from "@/constants";

/**
 * Everything public is crawlable. AI/LLM crawlers are listed explicitly so
 * that answer engines (ChatGPT, Gemini, Claude, Perplexity, Copilot) can
 * index and cite the site; see also /llms.txt.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "DuckAssistBot",
  "CCBot",
  "Amazonbot",
  "meta-externalagent",
  "YouBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${LANDINGPAGE_URL}/sitemap.xml`,
    host: LANDINGPAGE_URL,
  };
}
