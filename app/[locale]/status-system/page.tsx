import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { allLocales, generateAlternates } from "@/lib/seo";
import { LANDINGPAGE_URL } from "@/constants";
import { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: tMeta("statusSystemTitle"),
    description: tMeta("statusSystemDescription"),
    alternates: generateAlternates("/status-system", locale),
    openGraph: {
      title: tMeta("statusSystemTitle"),
      description: tMeta("statusSystemDescription"),
      url: `${LANDINGPAGE_URL}/${locale}/status-system`,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return allLocales.map((locale) => ({ locale }));
}

export default async function StatusSystem({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ComingSoon />;
}
