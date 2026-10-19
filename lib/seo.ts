import {
  LANDINGPAGE_URL,
  TITLE_APP,
  COMPANY_NAME,
  EMAIL,
  PHONE_NUMBER,
  ADDRESS,
  INSTAGRAM,
  FACEBOOK,
  TWITTER,
  LINKEDIN,
} from "@/constants";
import { IMAGE_PATH } from "@/constants/path-file";

/**
 * Map locale codes to BCP-47 language tags for hreflang.
 */
export const localeToLangMap: Record<string, string> = {
  id: "id",
  en: "en",
};

/**
 * All supported locale codes.
 */
export const allLocales = ["id", "en"];

/** Social-media-friendly Open Graph image (1200×630). */
export const OG_IMAGE = "/og-image.png";

const ORG_ID = `${LANDINGPAGE_URL}/#organization`;
const WEBSITE_ID = `${LANDINGPAGE_URL}/#website`;
const APP_ID = `${LANDINGPAGE_URL}/#software`;

const SOCIAL_LINKS = [INSTAGRAM, FACEBOOK, TWITTER, LINKEDIN].filter(
  (u) => u && u !== "#",
);

/**
 * Localized JSON-LD copy: plain-language facts that answer engines can quote
 * verbatim. Lives in messages under `metadata.jsonLd` so it follows the page
 * locale; pages pass it in via `getTranslations(...).raw("jsonLd")`.
 */
export type SeoJsonLdCopy = {
  description: string;
  knowsAbout: string[];
  features: string[];
  appSubCategory: string;
  appOfferDescription: string;
  serviceName: string;
  serviceTypes: string[];
  audience: string;
  serviceOfferDescription: string;
  offerCatalogName: string;
};

/**
 * Generate hreflang alternates for a given path (relative, without locale prefix).
 */
export function generateAlternates(path: string = "", locale: string = allLocales[0]) {
  const languages: Record<string, string> = {};

  for (const l of allLocales) {
    languages[localeToLangMap[l]] = `${LANDINGPAGE_URL}/${l}${path}`;
  }

  // x-default = the un-prefixed URL, which auto-redirects to the visitor's
  // language (see middleware.ts / lib/locale-detect.ts).
  languages["x-default"] = `${LANDINGPAGE_URL}${path || "/"}`;

  return {
    canonical: `${LANDINGPAGE_URL}/${locale}${path}`,
    languages,
  };
}

/**
 * Organization JSON-LD: who is behind the product (entity for knowledge graphs).
 */
export function getOrganizationJsonLd(copy: SeoJsonLdCopy) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: COMPANY_NAME,
    alternateName: "Postmatic.id",
    url: LANDINGPAGE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${LANDINGPAGE_URL}${IMAGE_PATH}`,
    },
    image: `${LANDINGPAGE_URL}${OG_IMAGE}`,
    description: copy.description,
    email: EMAIL,
    telephone: PHONE_NUMBER,
    address: {
      "@type": "PostalAddress",
      addressLocality: ADDRESS,
      addressCountry: "ID",
    },
    areaServed: ["ID", "Worldwide"],
    knowsAbout: copy.knowsAbout,
    ...(SOCIAL_LINKS.length ? { sameAs: SOCIAL_LINKS } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: EMAIL,
      telephone: PHONE_NUMBER,
      availableLanguage: ["Indonesian", "English"],
    },
  };
}

/**
 * WebSite JSON-LD.
 */
export function getWebSiteJsonLd(locale: string = "id") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: TITLE_APP,
    url: LANDINGPAGE_URL,
    inLanguage: localeToLangMap[locale] ?? "id",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * SoftwareApplication JSON-LD: the product itself, with features and pricing model.
 */
export function getSoftwareApplicationJsonLd(copy: SeoJsonLdCopy, locale: string = "id") {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: TITLE_APP,
    url: LANDINGPAGE_URL,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: copy.appSubCategory,
    operatingSystem: "Web",
    inLanguage: localeToLangMap[locale] ?? "id",
    description: copy.description,
    featureList: copy.features,
    publisher: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
      description: copy.appOfferDescription,
      availability: "https://schema.org/InStock",
      url: LANDINGPAGE_URL,
    },
  };
}

/**
 * Service JSON-LD: Postmatic as an AI social media agency service.
 */
export function getServiceJsonLd(copy: SeoJsonLdCopy) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.serviceName,
    serviceType: copy.serviceTypes,
    provider: { "@id": ORG_ID },
    areaServed: ["ID", "Worldwide"],
    audience: {
      "@type": "BusinessAudience",
      audienceType: copy.audience,
    },
    description: copy.description,
    url: LANDINGPAGE_URL,
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: "2000",
      description: copy.serviceOfferDescription,
      url: LANDINGPAGE_URL,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: copy.offerCatalogName,
      itemListElement: copy.features.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

/**
 * Generate FAQ JSON-LD structured data from FAQ items.
 */
export function getFaqJsonLd(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
