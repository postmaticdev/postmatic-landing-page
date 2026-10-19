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
    title: tMeta("cookiePolicyTitle"),
    description: tMeta("cookiePolicyDescription"),
    alternates: generateAlternates("/cookie-policy", locale),
    openGraph: {
      title: tMeta("cookiePolicyTitle"),
      description: tMeta("cookiePolicyDescription"),
      url: `${LANDINGPAGE_URL}/${locale}/cookie-policy`,
      type: "website",
    },
  };
}

interface CookieContent {
  type: "text" | "list";
  text?: string;
  items?: string[];
}

interface CookieSection {
  title: string;
  content: CookieContent[];
}

export function generateStaticParams() {
  return allLocales.map((locale) => ({ locale }));
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cookiePolicy");
  const cookieSections = t.raw('sections') as CookieSection[];

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
          {cookieSections.map((section: CookieSection, idx: number) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose prose-sm max-w-none">
                  {section.content.map((block: CookieContent, i: number) => {
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
                        <ul key={i} className="list-disc pl-6 space-y-2">
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