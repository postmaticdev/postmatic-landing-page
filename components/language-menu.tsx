"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import type { LocaleItem } from "./language-toggle";

/**
 * The dropdown half of LanguageToggle. Radix's menu (popper, floating-ui,
 * focus/scroll locking) is loaded on its own, after the page is up; the
 * trigger button passed as `children` is the same one rendered before.
 */
export default function LanguageMenu({
  locales,
  locale,
  defaultOpen,
  onSelect,
  children,
}: {
  locales: LocaleItem[];
  locale: string;
  defaultOpen?: boolean;
  onSelect: (locale: string) => void;
  children: React.ReactNode;
}) {
  const t = useTranslations("languageToggle");

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((l) => {
          const selected = l.value === locale;
          return (
            <DropdownMenuItem
              key={l.value}
              role="menuitemradio"
              aria-checked={selected}
              onClick={() => onSelect(l.value)}
              className="flex items-center gap-2"
            >
              <span className={`fi ${l.flag ?? "fi-xx"}`}></span>
              <span className="flex-1">{l.label}</span>
              <Check
                className={`h-4 w-4 ${selected ? "opacity-100" : "opacity-0"}`}
              />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
