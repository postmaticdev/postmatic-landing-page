import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalDocumentView } from "@/components/legal/legal-document";
import { formatLegalDate, getLegalContent, legalMetadata } from "@/lib/legal";
import { allLocales } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return legalMetadata("termsAndConditions", locale);
}

export function generateStaticParams() {
  return allLocales.map((locale) => ({ locale }));
}

export default async function TermsAndConditionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <LegalDocumentView
      docKey="termsAndConditions"
      content={getLegalContent(locale)}
      lastUpdatedLabel={formatLegalDate(locale)}
    />
  );
}
