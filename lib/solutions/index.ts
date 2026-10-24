import type { Metadata } from "next";
import { LANDINGPAGE_URL, TITLE_APP } from "@/constants";
import type { Locale } from "@/i18n/routing";
import { generateAlternates, getBreadcrumbJsonLd, getFaqJsonLd, localeToLangMap, OG_IMAGE, SEO_IDS } from "@/lib/seo";
import { solutionContentEn } from "./en";
import { solutionContentId } from "./id";
import { SOLUTION_PATHS, type SolutionContent, type SolutionKey } from "./types";

export { SOLUTION_ORDER, SOLUTION_PATHS, type SolutionKey } from "./types";

export function getSolutionContent(locale: Locale): SolutionContent {
  return locale === "en" ? solutionContentEn : solutionContentId;
}

const stripMarkdown = (text: string) => text.replace(/\*\*/g, "");

export function solutionMetadata(key: SolutionKey, locale: Locale): Metadata {
  const page = getSolutionContent(locale).pages[key];
  const path = SOLUTION_PATHS[key];
  const url = `${LANDINGPAGE_URL}/${locale}${path}`;
  return {
    // Absolute: the home page's "%s | Postmatic" template does not apply here.
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: generateAlternates(path, locale),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: TITLE_APP,
      locale: locale === "en" ? "en_US" : "id_ID",
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

// WebPage (about the Postmatic SoftwareApplication), breadcrumb, and FAQ structured data.
export function solutionJsonLd(key: SolutionKey, locale: Locale) {
  const content = getSolutionContent(locale);
  const page = content.pages[key];
  const url = `${LANDINGPAGE_URL}/${locale}${SOLUTION_PATHS[key]}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.h1,
      description: stripMarkdown(page.lead),
      inLanguage: localeToLangMap[locale] ?? "id",
      isPartOf: { "@id": SEO_IDS.website },
      about: { "@id": SEO_IDS.software },
      publisher: { "@id": SEO_IDS.organization },
      primaryImageOfPage: page.visuals[0] ? `${LANDINGPAGE_URL}${page.visuals[page.visuals.length - 1].src}` : undefined,
    },
    getBreadcrumbJsonLd([
      { name: content.ui.breadcrumbHome, url: `${LANDINGPAGE_URL}/${locale}` },
      { name: content.ui.navLabels[key], url },
    ]),
    getFaqJsonLd(page.faq),
  ];
}
