import { Plus_Jakarta_Sans } from "next/font/google";
import NotFoundView from "@/components/not-found-view";
import { WHATSAPP_URL } from "@/constants";
import messages from "@/messages/en.json";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

/**
 * Root 404 for URLs the locale routes never see (middleware skips paths with
 * a file extension, e.g. /wp-login.php). The root layout is a pass-through,
 * so this page renders its own <html>. English copy, links to /en.
 */
export default function RootNotFound() {
  const t = messages.notFound;
  return (
    <html lang="en" className={jakarta.variable}>
      <body className={`${jakarta.className} bg-white dark:bg-[#0A0A0A] antialiased`}>
        <title>{t.metaTitle}</title>
        <NotFoundView
          homeHref="/en"
          contactHref={WHATSAPP_URL}
          copy={{
            ...t,
            links: [
              { label: t.links.features, href: "/en#features" },
              { label: t.links.pricing, href: "/en#pricing" },
              { label: t.links.faq, href: "/en#faq" },
            ],
          }}
        />
      </body>
    </html>
  );
}
