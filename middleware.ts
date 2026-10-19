import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { API_URL, DASHBOARD_URL } from "@/constants";
import { detectLocale } from "@/lib/locale-detect";

const intlMiddleware = createMiddleware(routing);

const REFRESH_TOKEN_COOKIE_NAME =
  process.env.POSTMATIC_REFRESH_COOKIE_NAME || "postmaticRefreshToken";

// "/" or "/{locale}" (with optional trailing slash): the landing page only.
const HOME_PATH = new RegExp(`^/(?:(?:${routing.locales.join("|")})/?)?$`);

// Locales the site used to serve. Their URLs may still be indexed or shared,
// so they are permanently redirected to the English version.
const RETIRED_LOCALE = /^\/(?:jp|kr|cn|ar|ru|hi|sp)(?=\/|$)/;

// Path already starts with a supported locale, e.g. "/en" or "/id/privacy-policy".
const HAS_LOCALE = new RegExp(`^/(?:${routing.locales.join("|")})(?:/|$)`);

/**
 * Signed-in visitors are bounced to the dashboard before the landing page
 * renders. Doing this here (instead of calling `cookies()` inside the page)
 * keeps every locale homepage fully static and cacheable.
 */
async function hasValidRefreshToken(request: NextRequest): Promise<boolean> {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  if (!refreshToken || !API_URL) return false;

  try {
    const response = await fetch(
      new URL("/api/account/auth/refresh-token", API_URL),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        // A slow auth API must never hold the landing page hostage.
        signal: AbortSignal.timeout(3000),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
}

export default async function middleware(request: NextRequest) {
  if (
    DASHBOARD_URL !== "#" &&
    HOME_PATH.test(request.nextUrl.pathname) &&
    (await hasValidRefreshToken(request))
  ) {
    return NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
  }

  if (RETIRED_LOCALE.test(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = request.nextUrl.pathname.replace(RETIRED_LOCALE, "/en");
    return NextResponse.redirect(url, 301);
  }

  // No locale in the URL: send the visitor to their language
  // (saved choice → Indonesian browser or Indonesian visitor → English).
  const { pathname, search } = request.nextUrl;
  if (!HAS_LOCALE.test(pathname)) {
    const locale = detectLocale(request.headers, request.cookies.get("NEXT_LOCALE")?.value);
    const target = new URL(`/${locale}${pathname === "/" ? "" : pathname}${search}`, request.url);
    const response = NextResponse.redirect(target, 307);
    // The answer depends on who is asking: never let a CDN cache one
    // language for everybody.
    response.headers.set("Vary", "Accept-Language, Cookie");
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  // Everything except API routes, Next internals and files with an extension
  // (robots.txt, sitemap.xml, llms.txt, images, …).
  // Public asset folders are excluded too: some files there have no extension
  // (e.g. /content/almeira-feeds) and must never be locale-redirected.
  matcher: ["/((?!api|_next|_vercel|content/|video/|logos/|social-media/|dummy/|.*\\..*).*)"],
};
