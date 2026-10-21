import type { Metadata } from "next";
import { LANDINGPAGE_URL } from "@/constants";
import type { Locale } from "@/i18n/routing";
import { generateAlternates } from "@/lib/seo";
import { legalContentEn } from "./en";
import { legalContentId } from "./id";
import { LEGAL_COMPANY, LEGAL_PATHS, type LegalContent, type LegalDocKey } from "./types";

export { LEGAL_PATHS, type LegalDocKey } from "./types";

export function getLegalContent(locale: Locale): LegalContent {
  return locale === "en" ? legalContentEn : legalContentId;
}

export function formatLegalDate(locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(`${LEGAL_COMPANY.lastUpdatedISO}T00:00:00+07:00`));
}

// Metadata dibangun dari konten dokumen agar judul & deskripsi selalu sinkron dengan isi halaman.
export function legalMetadata(docKey: LegalDocKey, locale: Locale): Metadata {
  const doc = getLegalContent(locale).documents[docKey];
  const path = LEGAL_PATHS[docKey];
  const title = `${doc.title} - Postmatic`;
  const description = doc.intro.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");
  // Potong di batas kata agar deskripsi meta tidak terpotong di tengah kata.
  const short =
    description.length > 160 ? `${description.slice(0, description.lastIndexOf(" ", 157))}…` : description;
  return {
    title,
    description: short,
    alternates: generateAlternates(path, locale),
    openGraph: { title, description: short, url: `${LANDINGPAGE_URL}/${locale}${path}`, type: "website" },
  };
}
