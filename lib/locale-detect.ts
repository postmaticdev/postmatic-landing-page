import { routing, type Locale } from "@/i18n/routing";

/**
 * Picks the site locale for a visitor who opened a URL without a locale
 * prefix (e.g. "/" or "/privacy-policy"). The site is Indonesian + English.
 *
 * Order:
 *  1. NEXT_LOCALE cookie: the visitor picked a language in the toggle.
 *  2. Browser language (Accept-Language): Indonesian → "id".
 *  3. Country header (Cloudflare / Vercel / proxy): Indonesia → "id".
 *     Covers Indonesians whose phone UI is set to English.
 *  4. Everyone else → English.
 */

const isLocale = (v: string | undefined): v is Locale =>
  !!v && (routing.locales as readonly string[]).includes(v);

// "in" is the legacy code some Android builds still send for Indonesian.
const INDONESIAN_LANGS = new Set(["id", "in"]);

// Headers that commonly carry the visitor's country, by hosting provider.
const COUNTRY_HEADERS = [
  "cf-ipcountry", // Cloudflare
  "x-vercel-ip-country", // Vercel
  "cloudfront-viewer-country", // AWS CloudFront
  "x-country-code", // custom reverse proxy / load balancer
];

/** Accept-Language → primary subtags ordered by preference (q-value). */
function parseAcceptLanguage(header: string | null): string[] {
  if (!header) return [];
  return header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const quality = q ? Number.parseFloat(q.trim().slice(2)) : 1;
      return {
        lang: tag.trim().toLowerCase().split("-")[0],
        quality: Number.isFinite(quality) ? quality : 0,
        index,
      };
    })
    .filter((x) => x.lang && x.lang !== "*" && x.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)
    .map((x) => x.lang);
}

function countryFrom(headers: Headers): string | undefined {
  for (const name of COUNTRY_HEADERS) {
    const value = headers.get(name)?.trim().toUpperCase();
    // Cloudflare uses "XX" (unknown) and "T1" (Tor).
    if (value && /^[A-Z]{2}$/.test(value) && value !== "XX" && value !== "T1") return value;
  }
  return undefined;
}

export function detectLocale(headers: Headers, cookieLocale?: string): Locale {
  if (isLocale(cookieLocale)) return cookieLocale;

  // First language in the browser's list that is Indonesian or English.
  const preferred = parseAcceptLanguage(headers.get("accept-language")).find(
    (lang) => INDONESIAN_LANGS.has(lang) || lang === "en",
  );
  if (preferred && INDONESIAN_LANGS.has(preferred)) return "id";

  if (countryFrom(headers) === "ID") return "id";

  return "en";
}
