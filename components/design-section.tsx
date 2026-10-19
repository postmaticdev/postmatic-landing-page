"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LOGIN_URL } from "@/constants";
import { useTranslations } from "next-intl";

const ASPECT = { story: "aspect-[9/16]", feed: "aspect-[4/5]" } as const;

const columns: {
  parallax: string;
  offset: boolean;
  // altKey → landing.design.imageAlt.<altKey>
  items: { src: string; altKey: string; format: keyof typeof ASPECT }[];
}[] = [
  {
    parallax: "-0.45",
    offset: false,
    items: [
      { src: "/content/dummy/Story/kemewahan_emas_untuk_sehari_hari.png", altKey: "eclatStory", format: "story" },
      { src: "/content/dummy/Feeds/bites-daily-weekend-sale.png", altKey: "bitesFeed", format: "feed" },
    ],
  },
  {
    parallax: "0.35",
    offset: true,
    items: [
      { src: "/content/dummy/Feeds/serasa-scarf-kata-mereka.png", altKey: "serasaFeed", format: "feed" },
      { src: "/content/dummy/Story/hari_yang_lebih_cerah_secangkir_kopi_kaldera.png", altKey: "kalderaStory", format: "story" },
    ],
  },
  {
    parallax: "-0.25",
    offset: false,
    items: [
      { src: "/content/dummy/Story/poster_serum_niacinamide_lunara_skin.png", altKey: "lunaraStory", format: "story" },
      { src: "/content/dummy/Feeds/moire-1-kemeja-3-look.png", altKey: "moireFeed", format: "feed" },
    ],
  },
  {
    parallax: "0.55",
    offset: true,
    items: [
      { src: "/content/dummy/Feeds/bundle-favorit.png", altKey: "bundleFeed", format: "feed" },
      { src: "/content/dummy/Story/residensi_aruna_kehidupan_lebih_cerah.png", altKey: "arunaStory", format: "story" },
    ],
  },
];

export default function DesignSection() {
  const t = useTranslations("landing.design");
  return (
    <section className="w-full py-16 md:py-32 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Masonry Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {columns.map((column) => (
            <div key={column.parallax} data-parallax={column.parallax} className={`flex flex-col gap-4 md:gap-6 ${column.offset ? "mt-8 md:mt-16" : ""}`}>
              {column.items.map((item) => (
                <div key={item.src} data-reveal="clip" className={`relative w-full ${ASPECT[item.format]} rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900`}>
                  <Image
                    src={item.src}
                    alt={t(`imageAlt.${item.altKey}`)}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Text and Button Section */}
        <div data-reveal-stagger="0.2" className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-16 md:mt-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-3">
              {t("title")}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium text-[15px] md:text-base">
              {t("subtitle")}
            </p>
          </div>
          <Link href={LOGIN_URL} className="flex items-center gap-3 bg-[#0066FF] hover:bg-blue-700 text-white pl-6 pr-2 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-[#0066FF]/20">
            <span className="text-sm">{t("cta")}</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-[#0066FF]" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
