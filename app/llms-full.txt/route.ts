import { getTranslations } from "next-intl/server";
import { LANDINGPAGE_URL } from "@/constants";
import { getSolutionContent, SOLUTION_ORDER, SOLUTION_PATHS } from "@/lib/solutions";
import type { Locale } from "@/i18n/routing";

// Full-text companion to /llms.txt for AI answer engines, built from the same
// content as the pages so it never drifts out of date.
export const dynamic = "force-static";

const plain = (text: string) => text.replace(/\*\*/g, "");

async function localeSection(locale: Locale): Promise<string> {
  const solutions = getSolutionContent(locale);
  const tFaq = await getTranslations({ locale, namespace: "landing.faq" });
  const faq = tFaq.raw("items") as Array<{ question: string; answer: string }>;
  const lines: string[] = [];

  for (const key of SOLUTION_ORDER) {
    const page = solutions.pages[key];
    lines.push(`## ${page.h1}`, "", `URL: ${LANDINGPAGE_URL}/${locale}${SOLUTION_PATHS[key]}`, "", plain(page.lead), "");
    lines.push(`### ${page.stepsTitle}`, ...page.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`), "");
    lines.push(`### ${page.featuresTitle}`, ...page.features.map((f) => `- ${f.title}: ${f.text}`), "");
    lines.push(`### ${page.useCasesTitle}`, ...page.useCases.map((u) => `- ${u.title}: ${u.text}`), "");
    lines.push(
      `### ${page.compareTitle}`,
      ...page.compareRows.map(([label, ours, theirs]) => `- ${label}: Postmatic: ${ours}. ${page.compareHeaders[2]}: ${theirs}.`),
      ""
    );
    lines.push(`### ${page.faqTitle}`, ...page.faq.flatMap((q) => [`Q: ${q.question}`, `A: ${q.answer}`, ""]));
  }

  lines.push(locale === "en" ? "## General FAQ" : "## FAQ umum", "");
  lines.push(...faq.flatMap((q) => [`Q: ${q.question}`, `A: ${q.answer}`, ""]));
  return lines.join("\n");
}

export async function GET() {
  const body = [
    "# Postmatic — full content",
    "",
    "> Postmatic (postmatic.id) is an AI social media content platform for small businesses (UMKM) and growing brands in Indonesia: AI product images, AI social media design, captions and hashtags, and scheduling with auto posting to Instagram, Facebook Pages, and LinkedIn. Pay as you go with tokens; 10,000 free tokens after completing the business profile; tokens never expire.",
    "",
    `Summary: ${LANDINGPAGE_URL}/llms.txt`,
    "",
    "# English",
    "",
    await localeSection("en"),
    "# Bahasa Indonesia",
    "",
    await localeSection("id"),
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
