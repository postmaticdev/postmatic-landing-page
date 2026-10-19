import "../globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import MobileNavWrapper from "@/components/navbar";
import { LOGIN_URL, LANDINGPAGE_URL } from "@/constants";
import Footer from "@/components/Footer";
import CookieConsentPopup from "@/components/cookie-consent-popup";
import { IMAGE_PATH } from "@/constants/path-file";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Locale, routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import SmoothScrollProvider from "@/components/scroll/smooth-scroll-provider";
import { localeToLangMap } from "@/lib/seo";

// Keep in sync when a client component starts using a new namespace.
const CLIENT_MESSAGE_NAMESPACES = [
  "landing",
  "navigation",
  "buttons",
  "cookieConsent",
  "cookieSettings",
  "languageToggle",
  "themeToggle",
  "faq",
  "comingSoon",
  "notFound",
  "endToEnd",
  "introVideo",
  "introduction",
] as const;

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

/**
 * Layout-level metadata — only icons and essentials.
 * Page-specific SEO metadata is handled by generateMetadata() in each page.tsx.
 */
export const metadata: Metadata = {
  icons: {
    icon: IMAGE_PATH,
  },
  metadataBase: new URL(LANDINGPAGE_URL),
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    // Not a supported locale (e.g. "/wp-login.php" matched as [locale]):
    // render the root 404 instead of bouncing to the home page.
    notFound();
  }
  // Enables static rendering for every locale (next-intl otherwise reads
  // request headers, which forces dynamic rendering).
  setRequestLocale(locale);
  const tButtons = await getTranslations("buttons");
  const tNav = await getTranslations("navigation");
  const navItems = [
    { name: tNav("home"), link: `/${locale}#home` },
    { name: tNav("about"), link: `/${locale}#about` },
    { name: tNav("features"), link: `/${locale}#features` },
    { name: tNav("pricing"), link: `/${locale}#pricing` },
  ];

  // Only the namespaces client components read (useTranslations in "use client"
  // trees). Everything else — legal pages, SEO metadata, server components —
  // is translated on the server, so it no longer has to be inlined into every
  // page's HTML (~45 KB less per page).
  const allMessages = await getMessages();
  const messages = Object.fromEntries(
    CLIENT_MESSAGE_NAMESPACES.filter((ns) => ns in allMessages).map((ns) => [ns, allMessages[ns]]),
  );
  return (
    <html
      lang={localeToLangMap[locale] ?? locale}
      className={jakarta.variable}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#0066FF" />
      </head>
      <body
        className={`${jakarta.className} bg-white dark:bg-[#0A0A0A] antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <SmoothScrollProvider>
            <Navbar className="top-0">
              <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                    <NavbarButton
                      href={LOGIN_URL}
                      className="flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full"
                      variant="primary"
                    >
                      <span className="font-medium">{tButtons("getStarted")}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                    </NavbarButton>
                </div>
              </NavBody>

              <MobileNavWrapper items={navItems} />
            </Navbar>
            {children}
            <Footer />
            <CookieConsentPopup />
          </SmoothScrollProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
