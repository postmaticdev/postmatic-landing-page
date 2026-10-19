"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion, PIN_PRIORITY, PIN_STEP_SCROLL } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Check } from "lucide-react";
import Link from "next/link";
import { LOGIN_URL } from "@/constants";
import { useLocale, useTranslations } from "next-intl";

export default function PricingSection() {
  const [konten, setKonten] = useState<number>(50);
  const t = useTranslations("landing.pricing");
  const numberLocale = useLocale() === "en" ? "en-US" : "id-ID";
  const feats = t.raw("features") as Array<{ title: string; description: string }>;
  const costPerKonten = 2000;
  // Normal (struck-through) price shown next to the current price.
  const normalPriceMultiplier = 2.5;
  const normalPerKonten = costPerKonten * normalPriceMultiplier;
  const savePercent = Math.round((1 - 1 / normalPriceMultiplier) * 100);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  // How many feature rows on the right are revealed (1..3), driven by scroll.
  const [shown, setShown] = useState(feats.length);
  const lastShown = useRef(feats.length);

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion()) return;
      const update = (p: number) => {
        const n = Math.min(feats.length, 1 + Math.floor(p * feats.length));
        if (n !== lastShown.current) {
          lastShown.current = n;
          setShown(n);
        }
      };
      lastShown.current = 1;
      setShown(1);
      const mm = gsap.matchMedia();
      // Desktop: pin the section; the three rows appear one by one, then release.
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${feats.length * PIN_STEP_SCROLL.desktop}%`,
          pin: true,
          refreshPriority: PIN_PRIORITY.pricing,
          anticipatePin: 1,
          onUpdate: (self) => update(self.progress),
        });
      });
      // Phones/tablets tall enough to hold card + list: pin that block just
      // below the navbar, rows appear one by one, then release.
      mm.add("(max-width: 1023px) and (min-height: 700px)", () => {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 76px",
          end: `+=${feats.length * PIN_STEP_SCROLL.mobile}%`,
          pin: true,
          refreshPriority: PIN_PRIORITY.pricing,
          anticipatePin: 1,
          onUpdate: (self) => update(self.progress),
        });
      });
      // Very short screens: no pin (it would be cut off); rows appear as the
      // list scrolls through view.
      mm.add("(max-width: 1023px) and (max-height: 699px)", () => {
        ScrollTrigger.create({
          trigger: listRef.current,
          start: "top 80%",
          end: "bottom 60%",
          onUpdate: (self) => update(self.progress),
        });
      });
      return () => {
        lastShown.current = feats.length;
        setShown(feats.length);
      };
    },
    { scope: sectionRef },
  );
  const totalCost = konten * costPerKonten;
  const normalTotalCost = konten * normalPerKonten;

  return (
    <section ref={sectionRef} id="pricing" className="w-full py-16 md:py-32 lg:py-16 font-sans scroll-mt-24 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div data-reveal="blur" className="text-center mb-16 md:mb-24 lg:mb-12">
          <p className="text-neutral-500 font-medium text-sm md:text-base mb-3">{t("label")}</p>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-neutral-900 dark:text-white tracking-tight">
            {t("title")}
          </h2>
        </div>

        {/* Content */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-24 items-center bg-white dark:bg-[#0A0A0A] lg:bg-transparent lg:dark:bg-transparent">
          
          {/* Left Column - Card & Slider */}
          <div className="flex flex-col w-full max-w-lg mx-auto lg:mx-0">
            
            {/* The Card */}
            <div data-tilt className="relative w-full aspect-[16/10] lg:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(255,90,50,0.2)] dark:shadow-[0_30px_60px_-15px_rgba(255,90,50,0.1)] mb-6 md:mb-10">
              {/* Background Image */}
              <Image 
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop" 
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 512px"
                className="object-cover"
              />
              {/* Dark Gradient Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-black/10"></div>
              
              {/* Card Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-bold text-xl md:text-2xl leading-none mb-1 tracking-tight">{t("brand")}</h3>
                    <p className="text-white font-medium text-sm md:text-[15px]">{t("plan")}</p>
                  </div>
                  <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-1.5">
                    <span className="text-white font-bold text-xs">{t("contentCount", { count: konten })}</span>
                  </div>
                </div>

                {/* Bottom Row */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2.5 mb-1.5">
                    <p className="text-white/80 font-medium text-xs md:text-sm">{t("estimate")}</p>
                    <del className="text-white/60 font-semibold text-sm md:text-base decoration-[#FF5A5A] decoration-2">
                      <span className="sr-only">{t("normalPriceLabel")} </span>
                      Rp {normalTotalCost.toLocaleString(numberLocale)}
                    </del>
                  </div>
                  <h4 className="text-white font-bold text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight mb-3">
                    <span className="sr-only">{t("currentPriceLabel")} </span>
                    Rp {totalCost.toLocaleString(numberLocale)}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <del className="text-white/60 font-medium text-xs md:text-sm decoration-[#FF5A5A] decoration-2">
                      <span className="sr-only">{t("normalPriceLabel")} </span>
                      Rp {normalPerKonten.toLocaleString(numberLocale)}
                    </del>
                    <p className="text-white/90 font-medium text-xs md:text-sm">
                      {t("perContent", { price: costPerKonten.toLocaleString(numberLocale) })}
                    </p>
                    <span className="rounded-full bg-[#FF5A5A] px-2 py-0.5 text-[10px] md:text-[11px] font-bold text-white">
                      {t("save", { percent: savePercent })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div data-reveal="up" className="w-full mb-6 md:mb-10 lg:mb-8">
              <div className="flex justify-between items-center mb-5">
                <span className="text-[13px] md:text-sm text-neutral-500 dark:text-neutral-400 font-medium">{t("adjust")}</span>
                <span className="text-sm font-bold text-neutral-900 dark:text-white">{t("contentCount", { count: konten })}</span>
              </div>
              
              <div className="relative w-full h-1.5 md:h-2 bg-[#E6F0FF] dark:bg-blue-900/30 rounded-full">
                {/* Filled Track */}
                <div 
                  className="absolute top-0 left-0 h-full bg-[#0066FF] rounded-full pointer-events-none"
                  style={{ width: `${(konten / 500) * 100}%` }}
                ></div>
                {/* Native Range Input (Invisible) */}
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="10"
                  value={konten}
                  aria-label={t("adjust")}
                  aria-valuetext={t("contentCount", { count: konten })}
                  onChange={(e) => setKonten(Number(e.target.value))}
                  className="absolute inset-x-0 -top-5 -bottom-5 w-full opacity-0 cursor-pointer z-20 md:inset-0 md:h-full"
                />
                {/* Custom Thumb */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 bg-white border-[2.5px] border-[#0066FF] rounded-full shadow-sm pointer-events-none z-10"
                  style={{ left: `calc(${(konten / 500) * 100}% - 10px)` }}
                ></div>
              </div>
            </div>

            {/* Action Button */}
            <Link href={LOGIN_URL} data-reveal="up" className="block w-full text-center bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-[15px] md:text-lg py-4 md:py-4.5 rounded-[1.5rem] md:rounded-full transition-colors shadow-xl shadow-[#0066FF]/20">
              {t("cta")}
            </Link>

          </div>

          {/* Right Column - Features (revealed one by one by scroll) */}
          <div ref={listRef} className="flex flex-col gap-5 md:gap-10 lg:gap-12 lg:pl-8">
            {feats.map((feat, i) => (
              <div
                key={feat.title}
                className={cn(
                  "flex gap-4 md:gap-5 items-start transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  i < shown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none",
                )}
              >
                <Check className="w-5 h-5 md:w-6 md:h-6 text-[#FF4747] shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <h4 className="text-base md:text-lg lg:text-[1.1rem] font-bold text-neutral-900 dark:text-white mb-2 md:mb-3 tracking-tight">{feat.title}</h4>
                  <p className="text-[13px] md:text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        </div>
      </div>
    </section>
  );
}
