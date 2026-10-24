"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import "./flag-icons.css";

import { Button } from "@/components/ui/button";

export type LocaleItem = { label: string; value: string; flag: string };

const LOCALES: LocaleItem[] = [
  { label: "ID", value: "id", flag: "fi fi-id" },
  { label: "EN", value: "en", flag: "fi fi-us" },
];

type LanguageMenuComponent = typeof import("./language-menu").default;
const loadLanguageMenu = () => import("./language-menu").then((m) => m.default);

export function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("languageToggle");
  const router = useRouter();
  const pathname = usePathname();
  // The dropdown lives in its own chunk (see language-menu.tsx), loaded once
  // the browser is idle — or right away if the button is used before that.
  const [Menu, setMenu] = React.useState<LanguageMenuComponent | null>(null);
  const [openOnLoad, setOpenOnLoad] = React.useState(false);

  const load = React.useCallback(() => {
    loadLanguageMenu().then((component) => setMenu(() => component));
  }, []);

  React.useEffect(() => {
    // Safari has no requestIdleCallback.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(load, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(load, 2000);
    return () => window.clearTimeout(id);
  }, [load]);

  const active = LOCALES.find((l) => l.value === locale);
  const triggerLabel = active?.label ?? locale?.toUpperCase() ?? "ID";
  const triggerFlag = active?.flag ?? "fi fi-xx";

  const changeLocale = (next: string) => {
    if (!next || next === locale) return;
    // Explicit choice: remember it for a year so postmatic.id opens in this
    // language next time (read by middleware.ts → lib/locale-detect.ts).
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    router.replace(pathname, { locale: next });
  };

  const openEarly = () => {
    setOpenOnLoad(true);
    load();
  };

  const trigger = (
    <Button
      variant="ghost"
      size="sm"
      className="h-11 md:h-9 px-2 gap-2"
      aria-label={t("triggerAriaLabel", { language: triggerLabel })}
      onClick={Menu ? undefined : openEarly}
    >
      <span className={`fi ${triggerFlag}`}></span>
      <span className="font-medium">{triggerLabel}</span>
    </Button>
  );

  if (!Menu) return trigger;

  return (
    <Menu locales={LOCALES} locale={locale} defaultOpen={openOnLoad} onSelect={changeLocale}>
      {trigger}
    </Menu>
  );
}
