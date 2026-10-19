import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Logos3 } from "@/components/ui/logos3";
import WhatIsPostmatic from "@/components/what-is-postmatic";
import ProblemSection from "@/components/problem-section";
import AboutSection from "@/components/about-section";
import WorkflowSection from "@/components/workflow-section";
import DesignSection from "@/components/design-section";
import TestimonialMinimal from "@/components/testimonial-minimal";
import FaqMinimal from "@/components/faq-minimal";
import PricingSection from "@/components/pricing-section";
import CtaSection from "@/components/cta-section";
import ScrollEffects from "@/components/scroll/scroll-effects";
import PaperPlane from "@/components/scroll/paper-plane";
import FloatingCta from "@/components/floating-cta";
import {
  GOOGLE_SITE_VERIFICATION,
  LANDINGPAGE_URL,
  TITLE_APP,
  YAHOO_SITE_VERIFICATION,
  YANDEX_SITE_VERIFICATION,
} from "@/constants";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  generateAlternates,
  getOrganizationJsonLd,
  getWebSiteJsonLd,
  getSoftwareApplicationJsonLd,
  getFaqJsonLd,
  getServiceJsonLd,
  allLocales,
  type SeoJsonLdCopy,
} from "@/lib/seo";
import { Locale } from "@/i18n/routing";

/**
 * Pre-render all locale variants at build time for better performance and SEO.
 */
export function generateStaticParams() {
  return allLocales.map((locale) => ({ locale }));
}

/**
 * Dynamic metadata per locale — ensures each language version has
 * its own title, description, OpenGraph, Twitter, and hreflang tags.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const ogLocaleMap: Record<string, string> = {
    id: "id_ID",
    en: "en_US",
  };

  return {
    title: {
      default: t("title"),
      template: `%s | ${TITLE_APP}`,
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "POSTMATIC Team" }],
    creator: "POSTMATIC Team",
    publisher: "POSTMATIC Team",
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(LANDINGPAGE_URL),
    alternates: generateAlternates("", locale),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${LANDINGPAGE_URL}/${locale}`,
      siteName: TITLE_APP,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      locale: ogLocaleMap[locale] || "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["/og-image.png"],
      creator: "@postmatic_id",
      site: "@postmatic_id",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
      yandex: YANDEX_SITE_VERIFICATION,
      yahoo: YAHOO_SITE_VERIFICATION,
    },
    category: "technology",
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFaq = await getTranslations({ locale, namespace: "landing.faq" });
  const faqItems = tFaq.raw("items") as Array<{ question: string; answer: string }>;
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const jsonLdCopy = tMeta.raw("jsonLd") as SeoJsonLdCopy;

  return (
    <main className="overflow-x-clip">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationJsonLd(jsonLdCopy)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebSiteJsonLd(locale)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSoftwareApplicationJsonLd(jsonLdCopy, locale)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFaqJsonLd(faqItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getServiceJsonLd(jsonLdCopy)),
        }}
      />

      <Hero />
      <Logos3 />
      <WhatIsPostmatic />
      <ProblemSection />
      <AboutSection />
      <WorkflowSection />
      <DesignSection />
      <TestimonialMinimal />
      <FaqMinimal />
      <PricingSection />
      <CtaSection />
      <ScrollEffects />
      <PaperPlane />
      <FloatingCta />
    </main>
  );
}
