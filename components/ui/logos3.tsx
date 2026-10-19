"use client";

import Image from "next/image";
import { Asterisk } from "lucide-react";
import { useTranslations } from "next-intl";

// Brand tiles are center-cropped to 2:1; every source logo keeps its mark inside that band.
const LOGOS = [
  { name: "Haycrisp", file: "logo_haycrisp_dengan_motif_daun.png" },
  { name: "Lunara Skin", file: "logo_lunara_skin_minimalis_mewah.png" },
  { name: "Kaldera Coffee", file: "logo_kopi_minimalis_kaldera.png" },
  { name: "Almeira", file: "logo_minimalis_almeira_di_latar_beige.png" },
  { name: "Sora Matcha", file: "logo_matcha_sora_minimalis.png" },
  { name: "Moire Studio", file: "logo_minimalis_moire_studio.png" },
  { name: "Namu Home", file: "logo_minimalis_namu_home_di_latar_mocha.png" },
  { name: "Eclat Muse", file: "logo_mewah_eclat_muse.png" },
  { name: "Aruna Residence", file: "logo_aruna_residence_minimalis.png" },
  { name: "Serasa Scarf", file: "logo_minimalis_serasa_scarf.png" },
];

const Logos3 = () => {
  const t = useTranslations("landing.logos");
  return (
    <section className="py-8 md:py-12 overflow-hidden border-b border-neutral-100 dark:border-neutral-900">
      <style>{`
        @keyframes customMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          animation: customMarquee 40s linear infinite;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal="fade" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 relative z-10 bg-white dark:bg-[#0A0A0A]">
          
          {/* Left Text */}
          <div className="flex items-center self-start gap-3 shrink-0 relative z-20 bg-white dark:bg-[#0A0A0A] pr-4">
            <Asterisk 
              className="w-10 h-10 md:w-12 md:h-12 text-neutral-900 dark:text-white" 
              strokeWidth={1} 
            />
            <p className="text-[13px] md:text-sm font-medium text-neutral-700 dark:text-neutral-300 leading-snug">
              {t("line1")}<br />{t("line2")}
            </p>
          </div>

          {/* Right Logos Slider */}
          <div data-skew-velocity className="flex-1 w-full max-w-4xl overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            {/* Two identical sets; the track slides by exactly one set (-50%) for a seamless loop */}
            <div className="flex w-max animate-marquee-infinite motion-reduce:[animation-play-state:paused]">
              {[0, 1].map((set) => (
                <ul key={set} aria-hidden={set === 1} className="flex shrink-0 items-center gap-4 md:gap-6 pr-4 md:pr-6">
                  {LOGOS.map((logo) => (
                    <li
                      key={logo.file}
                      className="relative h-12 md:h-14 aspect-[2/1] shrink-0 overflow-hidden rounded-lg ring-1 ring-black/5 dark:ring-white/10 select-none"
                    >
                      <Image
                        src={`/content/dummy/logo_brand/${logo.file}`}
                        alt={set === 0 ? logo.name : ""}
                        fill
                        sizes="112px"
                        className="object-cover pointer-events-none"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export { Logos3 };
