"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Facebook, Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { LOGO_BLUE, LOGO_WHITE } from "@/constants/path-file";
import {
  COMMUNITY_URL,
  COMPANY_NAME,
  EMAIL,
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  PHONE_NUMBER,
  TWITTER,
  WHATSAPP_URL,
} from "@/constants";
import { LanguageToggle } from "./language-toggle";
import { useTranslations } from "next-intl";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.31l-.35-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.45-9.43a9.4 9.4 0 0 1 6.68 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43zm8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.67 12.06c0 2 .52 3.96 1.52 5.68L.57 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.27 0 11.37-5.1 11.38-11.37a11.3 11.3 0 0 0-3.34-8.06z" />
    </svg>
  );
}

const isSet = (url: string) => !!url && url !== "#";

// Social links come from NEXT_PUBLIC_* env vars; unset ones are hidden.
const SOCIALS: Array<{ href: string; label: string; icon: ReactNode }> = [
  { href: FACEBOOK, label: "Facebook", icon: <Facebook className="w-5 h-5" /> },
  { href: LINKEDIN, label: "LinkedIn", icon: <Linkedin className="w-5 h-5" /> },
  { href: INSTAGRAM, label: "Instagram", icon: <Instagram className="w-5 h-5" /> },
  { href: TWITTER, label: "X", icon: <XIcon className="w-[18px] h-[18px]" /> },
].filter((s) => isSet(s.href));

// Lima dokumen legal; isinya ada di lib/legal.
const LEGAL_LINKS = [
  { href: "/terms-and-conditions", labelKey: "termsConditions" },
  { href: "/terms-of-service", labelKey: "terms" },
  { href: "/privacy-policy", labelKey: "privacy" },
  { href: "/data-deletion", labelKey: "dataDeletion" },
  { href: "/cookie-policy", labelKey: "cookie" },
] as const;

const linkCls =
  "inline-flex min-h-11 items-center lg:min-h-0 text-[15px] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors";
const headCls = "font-bold text-neutral-900 dark:text-white mb-1 lg:mb-2";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const t = useTranslations("landing.footer");
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <footer className="w-full bg-white dark:bg-[#0A0A0A] font-sans border-t border-neutral-100 dark:border-neutral-900 pt-16 md:pt-24 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:flex lg:flex-row justify-between lg:gap-12 mb-12 lg:mb-16">

          {/* Column 1: Brand & Description */}
          <div className="col-span-2 w-full lg:max-w-sm flex flex-col gap-6">
            <Link href="/" aria-label={t("homeAriaLabel")} className="inline-flex min-h-11 items-center gap-2.5 self-start">
              <span className="relative w-8 h-8 shrink-0">
                {mounted && (
                  <Image
                    src={isDark ? LOGO_WHITE : LOGO_BLUE}
                    alt=""
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                )}
              </span>
              <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Postmatic
              </span>
            </Link>
            <p className="text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
              {t("description")}
            </p>
            {SOCIALS.length > 0 && (
              <div className="flex items-center gap-4 mt-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Navigation (mirrors the navbar) */}
          <nav aria-label={t("navigation")} className="w-full lg:w-auto flex flex-col gap-0 lg:gap-5">
            <h3 className={headCls}>{t("navigation")}</h3>
            <Link href="/#home" className={linkCls}>{t("home")}</Link>
            <Link href="/#about" className={linkCls}>{t("about")}</Link>
            <Link href="/#features" className={linkCls}>{t("features")}</Link>
            <Link href="/#pricing" className={linkCls}>{t("pricing")}</Link>
          </nav>

          {/* Column 3: Resource */}
          <div className="w-full lg:w-auto flex flex-col gap-0 lg:gap-5">
            <h3 className={headCls}>{t("resource")}</h3>
            <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>{t("community")}</a>
            <a href="https://docs.postmatic.id/" target="_blank" rel="noopener noreferrer" className={linkCls}>{t("docs")}</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>{t("helpCenter")}</a>
          </div>

          {/* Column 4: Contact */}
          <address className="col-span-2 not-italic w-full lg:w-auto flex flex-col gap-0 lg:gap-5">
            <h3 className={headCls}>{t("contact")}</h3>
            <a href={`mailto:${EMAIL}`} className={`${linkCls} flex items-center gap-3`}>
              <Mail className="w-5 h-5 shrink-0 text-[#0066FF]" aria-label={t("emailLabel")} />
              <span>{EMAIL}</span>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${linkCls} flex items-center gap-3`}>
              <WhatsAppIcon className="w-5 h-5 shrink-0 text-[#0066FF]" />
              <span><span className="sr-only">{t("whatsappLabel")}: </span>{PHONE_NUMBER}</span>
            </a>
            <p className={`${linkCls} flex items-center gap-3 hover:text-neutral-500`}>
              <MapPin className="w-5 h-5 shrink-0 text-[#0066FF]" aria-label={t("locationLabel")} />
              <span>{t("location")}</span>
            </p>
          </address>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-neutral-100 dark:border-neutral-900 gap-6">
          {/* The page is prerendered, so after New Year the build-time year can
              differ from the visitor's until the next deploy. The mismatch is
              tolerated during hydration (no whole-page client re-render), and
              the remount after mount shows the visitor's current year. */}
          <p className="text-[13px] text-neutral-400 dark:text-neutral-500">
            © <span key={mounted ? "client" : "server"} suppressHydrationWarning>{currentYear}</span> {COMPANY_NAME}. {t("rights")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-0 lg:gap-6">
            <LanguageToggle />
            {LEGAL_LINKS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex min-h-11 items-center md:min-h-0 text-[13px] text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white transition-colors"
              >
                {t(labelKey)}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
