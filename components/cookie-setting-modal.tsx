"use client";

import { useState, useEffect } from "react";
import { X, ShieldCheck, BarChart3, Megaphone } from "lucide-react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { readStorage, writeStorage } from "@/lib/safe-storage";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieSettingsModal({
  
  isOpen,
  onClose,
  closeConsent,
}: {
  isOpen: boolean;
  onClose: () => void;
  closeConsent: () => void;
}) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // selalu aktif
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (!isOpen) return;
    const saved = readStorage("cookiePrefs");
    if (!saved) return;
    try {
      setPreferences(JSON.parse(saved));
    } catch {
      // Corrupted value: keep the defaults.
    }
  }, [isOpen]);
  const t = useTranslations("cookieSettings");

  const handleSave = () => {
    writeStorage("cookiePrefs", JSON.stringify(preferences));
    writeStorage("cookieConsent", "custom");
    onClose();
    closeConsent();
  };

  const handleRejectAll = () => {
    const rejected = { necessary: true, analytics: false, marketing: false };
    setPreferences(rejected);
    writeStorage("cookiePrefs", JSON.stringify(rejected));
    writeStorage("cookieConsent", "rejected");
    onClose();
    closeConsent();
  };

  if (!isOpen) return null;

  

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin" data-lenis-prevent>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("title")}</h2>
          <button
            onClick={onClose}
            aria-label={t("close")}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Necessary */}
          <CookieToggle
            icon={<ShieldCheck className="w-6 h-6 text-green-500" />}
            title={t("cookieWajib")}
            description={t("cookieWajibDescription")}
            enabled={preferences.necessary}
            onToggle={() => {}} // tidak bisa dimatikan
            disabled
          />

          {/* Analytics */}
          <CookieToggle
            icon={<BarChart3 className="w-6 h-6 text-[#0066FF]" />}
            title={t("cookieAnalitik")}
            description={t("cookieAnalitikDescription")}
            enabled={preferences.analytics}
            onToggle={() =>
              setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
            }
          />

          {/* Marketing */}
          <CookieToggle
            icon={<Megaphone className="w-6 h-6 text-purple-500" />}
            title={t("cookieIklan")}
            description={t("cookieIklanDescription")}
            enabled={preferences.marketing}
            onToggle={() =>
              setPreferences((prev) => ({ ...prev, marketing: !prev.marketing }))
            }
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200 dark:border-zinc-800">
          <button
            onClick={handleSave}
            className="flex-1 bg-[#0066FF] hover:bg-[#0052cc] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md shadow-[#0066FF]/25 cursor-pointer"
          >
            {t("simpanDanTerima")}
          </button>
          <button
            onClick={handleRejectAll}
            className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-white font-semibold py-3 rounded-xl transition cursor-pointer"
          >
            {t("tolakSemua")}
          </button>
        </div>
      </div>

      {/* Tailwind animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>, document.body
  );
}

// Sub-component untuk toggle
function CookieToggle({
  icon,
  title,
  description,
  enabled,
  onToggle,
  disabled = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={onToggle}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors ${
            enabled
              ? "bg-[#0066FF]"
              : "bg-gray-300 dark:bg-gray-600"
          } peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#0066FF]/50`}
        />
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            enabled ? "translate-x-5" : ""
          }`}
        />
      </label>
    </div>
  );
}