"use client";

import { useEffect, useState } from "react";
import { Shield, X } from "lucide-react";
import CookieSettingsModal from "./cookie-setting-modal";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { readStorage, writeStorage } from "@/lib/safe-storage";

export default function CookieConsentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const t = useTranslations("cookieConsent");
  useEffect(() => {
    const consent = readStorage("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    writeStorage("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    writeStorage("cookieConsent", "declined");
    setIsVisible(false);
  };

  const handleSettings = () => {
    setShowCookieSettings(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 md:left-1/2 md:-translate-x-1/2 md:max-w-4xl lg:max-w-5xl z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-2xl p-4 sm:p-5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Content (Icon + Title + Description) */}
        <div className="flex items-start md:items-center gap-3.5 flex-1">
          <div className="w-9 h-9 rounded-xl bg-[#0066FF]/10 dark:bg-[#0066FF]/20 text-[#0066FF] dark:text-[#3385ff] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">
              {t("title")}
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {t("description")}
              <Link
                href="/cookie-policy"
                className="text-[#0066FF] dark:text-[#3385ff] hover:underline font-semibold ml-1 inline-block"
              >
                {t("learnMore")}
                {/* Descriptive link text for screen readers and crawlers */}
                <span className="sr-only"> {t("learnMoreTarget")}</span>
              </Link>
            </p>
          </div>
        </div>

        {/* Actions + Close Button inline */}
        <div className="flex items-center gap-2 sm:gap-2.5 w-full md:w-auto shrink-0 justify-end">
          <button
            onClick={handleSettings}
            className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-xl transition-colors text-center whitespace-nowrap cursor-pointer"
          >
            {t("manageCookies")}
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold text-white bg-[#0066FF] hover:bg-[#0052cc] rounded-xl transition-colors shadow-md shadow-[#0066FF]/25 text-center whitespace-nowrap cursor-pointer"
          >
            {t("acceptAll")}
          </button>
          <button
            onClick={handleDecline}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
            aria-label={t("close")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <CookieSettingsModal
        isOpen={showCookieSettings}
        onClose={() => setShowCookieSettings(false)}
        closeConsent={() => setIsVisible(false)}
      />
    </div>
  );
}
