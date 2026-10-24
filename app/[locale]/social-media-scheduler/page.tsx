import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SolutionPageView } from "@/components/solutions/solution-page";
import { getSolutionContent, solutionJsonLd, solutionMetadata } from "@/lib/solutions";
import { allLocales } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return solutionMetadata("socialMediaScheduler", locale);
}

export function generateStaticParams() {
  return allLocales.map((locale) => ({ locale }));
}

export default async function SocialMediaSchedulerPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      {solutionJsonLd("socialMediaScheduler", locale).map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
      <SolutionPageView solutionKey="socialMediaScheduler" content={getSolutionContent(locale)} />
    </>
  );
}
