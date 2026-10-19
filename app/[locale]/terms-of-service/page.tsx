import type { Metadata } from "next";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getMobileMargins } from "@/lib/utils";
import { cn } from "@/lib/utils";
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
    title: tMeta("termsTitle"),
    description: tMeta("termsDescription"),
    alternates: generateAlternates("/terms-of-service", locale),
    openGraph: {
      title: tMeta("termsTitle"),
      description: tMeta("termsDescription"),
      url: `${LANDINGPAGE_URL}/${locale}/terms-of-service`,
      type: "website",
    },
  };
}

interface TermsContent {
  type: "text" | "list";
  text?: string;
  items?: string[];
}

interface TermsSection {
  title: string;
  content: TermsContent[];
}

export function generateStaticParams() {
  return allLocales.map((locale) => ({ locale }));
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("termsOfService");
  const tocSections = t.raw('sections') as TermsSection[];

  return (
    <main className="mx-auto">
      <div className={cn("max-w-[60rem] mx-auto py-16", getMobileMargins())}>
        <h1 className="text-3xl font-bold mb-8 text-center">
          {t('title')}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-10">
          {t('lastUpdated')}
        </p>

        <Accordion type="single" collapsible className="w-full">
          {tocSections.map((section: TermsSection, idx: number) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose prose-sm max-w-none">
                  {section.content.map((block: TermsContent, i: number) => {
                    if (block.type === "text") {
                      return (
                        <p
                          key={i}
                          dangerouslySetInnerHTML={{ __html: block.text! }}
                        />
                      );
                    }
                    if (block.type === "list") {
                      return (
                        <ul key={i} className="list-disc pl-6">
                          {block.items!.map((li, k) => (
                            <li
                              key={k}
                              dangerouslySetInnerHTML={{
                                __html: li.replace(
                                  /\*\*(.*?)\*\*/g,
                                  "<strong>$1</strong>"
                                ),
                              }}
                            />
                          ))}
                        </ul>
                      );
                    }
                    return null;
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}