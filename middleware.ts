import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { API_URL, DASHBOARD_URL } from "@/constants";
import { detectLocale } from "@/lib/locale-detect";

const intlMiddleware = createMiddleware(routing);

const REFRESH_TOKEN_COOKIE_NAME =
  process.env.POSTMATIC_REFRESH_COOKIE_NAME || "postmaticRefreshToken";
const ACCESS_TOKEN_COOKIE_NAME =
  process.env.POSTMATIC_ACCESS_COOKIE_NAME || "postmaticAccessToken";

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
type SessionTokens = { accessToken?: string; refreshToken?: string };

async function refreshSession(request: NextRequest): Promise<SessionTokens | null> {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  if (!refreshToken || !API_URL) return null;

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
    if (!response.ok) return null;
    const payload = (await response.json().catch(() => null)) as { data?: SessionTokens } | null;
    return payload?.data ?? {};
  } catch {
    return null;
  }
}

// Seconds until the JWT expires, so the cookie lives exactly as long as the token.
function jwtMaxAge(token: string): number | undefined {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof exp === "number" ? Math.max(exp - Math.floor(Date.now() / 1000), 0) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * The API rotates the refresh token when it is close to expiry and drops the
 * old one, so whatever it hands back must reach the browser — otherwise this
 * check would quietly sign the visitor out of the workspace.
 */
function setSessionCookies(response: NextResponse, request: NextRequest, tokens: SessionTokens) {
  const hostname = request.nextUrl.hostname;
  const isPostmatic = hostname === "postmatic.id" || hostname.endsWith(".postmatic.id");
  const base = {
    path: "/",
    sameSite: "lax" as const,
    secure: request.nextUrl.protocol === "https:",
    ...(isPostmatic ? { domain: ".postmatic.id" } : {}),
  };
  const set = (name: string, value: string, httpOnly: boolean) => {
    const maxAge = jwtMaxAge(value);
    response.cookies.set(name, value, { ...base, httpOnly, ...(maxAge !== undefined ? { maxAge } : {}) });
  };

  if (tokens.accessToken) set(ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, false);
  if (tokens.refreshToken && tokens.refreshToken !== request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value) {
    set(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, true);
  }
}

export default async function middleware(request: NextRequest) {
  if (HOME_PATH.test(request.nextUrl.pathname)) {
    const tokens = await refreshSession(request);
    if (tokens) {
      const response = NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
      setSessionCookies(response, request, tokens);
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }
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
