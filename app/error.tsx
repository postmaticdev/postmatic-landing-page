"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import idMessages from "@/messages/id.json";
import enMessages from "@/messages/en.json";

/**
 * Route-level error boundary. Previously rendered `null`, which left visitors
 * staring at a blank page whenever anything threw. Keep it nearly
 * dependency-free: nothing imported here should be able to throw itself.
 * It sits above the locale layout (no NextIntlClientProvider), so the copy
 * is picked from the URL's locale segment instead of useTranslations.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] === "en" ? "en" : "id";
  const t = (locale === "en" ? enMessages : idMessages).errorPage;

  return (
    <main className="min-h-[100svh] flex flex-col items-center justify-center text-center px-6 bg-white dark:bg-[#0A0A0A] font-sans">
      <p className="text-xs font-bold tracking-widest uppercase text-[#0066FF] mb-4">
        {t.label}
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
        {t.title}
      </h1>
      <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-md mb-8">
        {t.description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-[#0066FF] hover:bg-[#0052cc] text-white px-6 py-3 rounded-full font-semibold transition-colors"
        >
          {t.retry}
        </button>
        <Link
          href={`/${locale}`}
          className="border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          {t.home}
        </Link>
      </div>
    </main>
  );
}
