import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProblemSection from "@/components/problem-section";
import SolutionSection from "@/components/solution-section";
import FeaturesSection from "@/components/features-section";
import PricingSection from "@/components/pricing-section";
import CTASection from "@/components/cta-section";
import Hero from "@/components/Hero";

import Introduction from "@/components/introduction";
import { Comparison } from "@/components/comparison";
import EndToEnd from "@/components/end-to-end";
import IntroVideoPage from "@/components/intro-video";
import {
  API_URL,
  DASHBOARD_URL,
  GOOGLE_SITE_VERIFICATION,
  LANDINGPAGE_URL,
  TITLE_APP,
  YAHOO_SITE_VERIFICATION,
  YANDEX_SITE_VERIFICATION,
} from "@/constants";

const REFRESH_TOKEN_COOKIE_NAME =
  process.env.POSTMATIC_REFRESH_COOKIE_NAME || "postmaticRefreshToken";

export const metadata: Metadata = {
  title: {
    default: TITLE_APP,
    template: `${TITLE_APP} | %s`,
  },
  description:
    "Solusi AI/ML terdepan untuk mengotomasi seluruh proses pemasaran digital bisnis...",
  keywords:
    "Bisnis, pemasaran digital, AI marketing, otomasi konten, social media automation, Indonesia, SaaS, artificial intelligence, marketing automation",
  authors: [{ name: "POSTMATIC Team" }],
  creator: "POSTMATIC Team",
  publisher: "POSTMATIC Team",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL(LANDINGPAGE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE_APP,
    description:
      "Solusi AI/ML terdepan untuk mengotomasi seluruh proses pemasaran digital bisnis...",
    url: LANDINGPAGE_URL,
    siteName: TITLE_APP,
    images: [
      {
        url: "/logo-bg-blue.png",
        width: 1200,
        height: 630,
        alt: "POSTMATIC - AI Marketing Automation Platform untuk Bisnis Indonesia",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "POSTMATIC - Platform AI untuk Otomasi Pemasaran Digital Bisnis",
    description:
      "Solusi AI/ML terdepan untuk mengotomasi seluruh proses pemasaran digital bisnis...",
    images: ["logo-bg-blue.png"],
    creator: "@postmatic_id",
    site: "@postmatic_id",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    yandex: YANDEX_SITE_VERIFICATION,
    yahoo: YAHOO_SITE_VERIFICATION,
  },
  category: "technology",
};

async function hasValidRefreshToken() {
  const refreshToken = (await cookies()).get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  console.log({ refreshToken, API_URL });

  if (!refreshToken || !API_URL) {
    return false;
  }

  try {
    const response = await fetch(
      new URL("/api/account/auth/refresh-token", API_URL),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      },
    );

    console.log({ response });

    return response.ok;
  } catch (e) {
    console.error({ e });
    return false;
  }
}

export default async function Home() {
  if (DASHBOARD_URL !== "#" && (await hasValidRefreshToken())) {
    redirect(DASHBOARD_URL);
  }

  return (
    <main className="">
      <Hero />
      <Introduction />
      <Comparison />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <EndToEnd />
      <IntroVideoPage />
      <PricingSection />
      <CTASection />
    </main>
  );
}
