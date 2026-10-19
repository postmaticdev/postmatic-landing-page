import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  // hreflang alternates are emitted in <head> via lib/seo.ts, so the
  // auto-generated `Link` response header is not needed.
  alternateLinks: false,
  // Don't remember whatever locale a visitor merely *viewed* (e.g. a shared
  // /en link). The cookie is written only when they pick a language in the
  // toggle (components/language-toggle.tsx), and middleware.ts reads it.
  localeCookie: false,
});
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
