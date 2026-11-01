import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";

type Messages = Record<string, unknown>;

/**
 * Deep-merge `fallback` under `primary`: any key missing from the requested
 * locale resolves to the English copy instead of throwing MISSING_MESSAGE.
 * (Seven locales only carry partial translations.)
 */
function withFallback(primary: Messages, fallback: Messages): Messages {
  const out: Messages = { ...fallback };
  for (const [key, value] of Object.entries(primary)) {
    const base = fallback[key];
    out[key] =
      value && typeof value === "object" && !Array.isArray(value) &&
      base && typeof base === "object" && !Array.isArray(base)
        ? withFallback(value as Messages, base as Messages)
        : value;
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`@/messages/${locale}.json`)).default as Messages;
  const fallback =
    locale === "en"
      ? messages
      : ((await import(`@/messages/en.json`)).default as Messages);

  return {
    locale,
    messages: locale === "en" ? messages : withFallback(messages, fallback),
  };
});
