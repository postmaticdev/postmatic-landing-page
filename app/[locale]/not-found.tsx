import { useLocale, useTranslations } from "next-intl";
import NotFoundView from "@/components/not-found-view";
import { WHATSAPP_URL } from "@/constants";

/**
 * 404 inside the locale layout (navbar + footer stay visible).
 * Triggered by notFound() — e.g. from app/[locale]/[...rest]/page.tsx.
 */
export default function LocaleNotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();
  const base = `/${locale}`;

  return (
    <>
      <title>{t("metaTitle")}</title>
      <NotFoundView
        homeHref={base}
        contactHref={WHATSAPP_URL}
        copy={{
          label: t("label"),
          title: t("title"),
          description: t("description"),
          home: t("home"),
          contact: t("contact"),
          orVisit: t("orVisit"),
          cardLabel: t("cardLabel"),
          cardCaption: t("cardCaption"),
          links: [
            { label: t("links.features"), href: `${base}#features` },
            { label: t("links.pricing"), href: `${base}#pricing` },
            { label: t("links.faq"), href: `${base}#faq` },
          ],
        }}
      />
    </>
  );
}
