"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Plus, Check } from "lucide-react";
import Link from "next/link";
import { LOGIN_URL } from "@/constants";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger, prefersReducedMotion, PIN_PRIORITY, PIN_STEP_SCROLL } from "@/lib/gsap";

function CardVideo({ src, isActive, className }: { src: string; isActive: boolean; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // The three videos weigh ~50MB together: only attach a source once the
  // card first comes near the viewport (then keep it, so scrolling back never
  // re-downloads), and pause whenever it scrolls away.
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setLoaded(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (isActive && inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive, inView]);

  return (
    <video
      ref={videoRef}
      src={loaded ? src : undefined}
      loop
      muted
      playsInline
      preload={loaded ? "auto" : "none"}
      aria-hidden
      className={className}
    />
  );
}

interface CardItem {
  id: number;
  bgImage?: string;
  bgVideo?: string;
  bgColor: string;
  hasWidget: boolean;
}

const cards: CardItem[] = [
  {
    id: 0,
    bgImage: "", 
    bgVideo: "/video/One-Time-Input-Knowledge.mp4",
    bgColor: "bg-neutral-900",
    hasWidget: false,
  },
  {
    id: 1,
    bgImage: "",
    bgVideo: "/video/schedule-content.mp4",
    bgColor: "bg-neutral-900",
    hasWidget: false,
  },
  {
    id: 2,
    bgImage: "",
    bgVideo: "/video/postmatic-tiga-brand-satu-jadwal.mp4",
    bgColor: "bg-neutral-900",
    hasWidget: false,
  },
];

export default function AboutSection() {
  const [activeCard, setActiveCard] = useState<number>(0);
  const t = useTranslations("landing.about");
  const texts = t.raw("cards") as Array<{ title: string; description: string }>;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lastIndex = useRef(0);

  // Pin the section and let scroll progress open card 1 → 2 → 3 in turn,
  // then release so the page keeps scrolling normally.
  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * PIN_STEP_SCROLL.desktop}%`,
          pin: true,
          refreshPriority: PIN_PRIORITY.about,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
            if (idx !== lastIndex.current) {
              lastIndex.current = idx;
              setActiveCard(idx);
            }
          },
        });
      });
      // Phones: the card stack sticks just below the navbar and opens
      // card 1 → 2 → 3 in turn, then releases (same rhythm as desktop).
      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 76px",
          end: `+=${cards.length * PIN_STEP_SCROLL.mobile}%`,
          pin: true,
          refreshPriority: PIN_PRIORITY.about,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
            if (idx !== lastIndex.current) {
              lastIndex.current = idx;
              setActiveCard(idx);
            }
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="about" className="scroll-mt-24 w-full py-16 md:py-24 font-sans overflow-hidden md:min-h-screen md:flex md:flex-col md:justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-12">
          <div data-reveal="blur" className="max-w-3xl">
            <p className="text-[#0066FF] text-xs font-bold tracking-widest uppercase mb-4">
              {t("label")}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-medium leading-[1.1] text-neutral-900 dark:text-white tracking-tight">
              {t.rich("title", {
                hl: (chunks) => (
                  <span className="relative whitespace-nowrap">
                    {chunks}
                    {/* Green SVG Underline */}
                    <svg
                      className="absolute -bottom-1 md:-bottom-2 left-0 w-full"
                      viewBox="0 0 200 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path d="M2 10C50 3 150 2 198 8" stroke="#3ECF8E" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                ),
                br: () => <br className="hidden md:block" />,
              })}
            </h2>
          </div>
          <div data-reveal="up" className="max-w-sm flex flex-col items-start lg:items-end gap-6">
            <p className="text-[13px] md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed lg:text-right font-medium">
              {t("description")}
            </p>
            <Link href={LOGIN_URL} className="flex items-center gap-3 bg-[#0066FF] hover:bg-blue-700 text-white pl-6 pr-2 py-2 rounded-full font-semibold transition-all shadow-lg shadow-[#0066FF]/20">
              <span className="text-sm">{t("cta")}</span>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 text-[#0066FF]" />
              </div>
            </Link>
          </div>
        </div>

        {/* Expanding Cards Area */}
        <div ref={cardsRef} data-tilt className="flex flex-col md:flex-row gap-3 md:gap-4 h-[min(640px,calc(100svh-104px))] md:h-[min(500px,55vh)] w-full">
          {cards.map((card, index) => {
            const isActive = activeCard === index;
            return (
              <div
                key={card.id}
                className={cn(
                  "relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 md:flex-shrink",
                  isActive
                    ? "flex-[5] md:flex-[5] h-full"
                    : "flex-[1] md:flex-[1.5] h-full opacity-90 hover:opacity-100",
                  card.bgColor
                )}
                onClick={() => setActiveCard(index)}
              >
                {/* Background Image or Video */}
                {card.bgVideo ? (
                  <CardVideo
                    src={card.bgVideo}
                    isActive={isActive}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-transform duration-700",
                      isActive ? "scale-105" : "scale-100"
                    )}
                  />
                ) : card.bgImage ? (
                  <Image
                    src={card.bgImage}
                    alt={texts[index].title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700",
                      isActive ? "scale-105" : "scale-100"
                    )}
                  />
                ) : null}
                
                {/* Gradient Overlay for better text readability */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    isActive
                      ? "bg-gradient-to-r from-black/80 via-black/40 to-transparent"
                      : "bg-black/45 md:bg-black/20"
                  )}
                />

                {/* Expanded Content */}
                <div
                  className={cn(
                    "absolute inset-0 p-6 md:p-8 flex flex-col justify-between transition-all duration-700 delay-100",
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 pointer-events-none"
                  )}
                >
                  <div className="max-w-sm">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 tracking-tight">
                      {texts[index].title}
                    </h3>
                    <p className="text-white/80 text-sm font-medium leading-relaxed">
                      {texts[index].description}
                    </p>
                  </div>

                  {card.hasWidget ? (
                    <div className="flex items-end justify-between w-full">
                      {/* Floating UI Widget */}
                      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-[1.5rem] flex flex-col gap-3 shadow-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#FF9F43] flex items-center justify-center">
                            <Plus className="text-white w-5 h-5" />
                          </div>
                          <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center flex-col">
                            <span className="text-[8px] font-bold text-neutral-400 -mb-1">NOV</span>
                            <span className="text-xs font-bold text-neutral-800">23</span>
                          </div>
                          <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center">
                            <Check className="text-neutral-600 w-4 h-4" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-neutral-200 overflow-hidden border-2 border-white">
                              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="" width={24} height={24} loading="lazy" decoding="async" />
                            </div>
                            <div className="w-6 h-6 rounded-full bg-neutral-200 overflow-hidden border-2 border-white">
                              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="" width={24} height={24} loading="lazy" decoding="async" />
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-neutral-500 ml-1">+2</span>
                          <span className="text-[10px] font-bold text-neutral-400 ml-auto pr-1">AI</span>
                        </div>
                      </div>

                      {/* Black Arrow Button */}
                      <div className="w-12 h-12 bg-[#1A1A1A] hover:bg-black transition-colors rounded-full flex items-center justify-center shrink-0">
                        <ArrowRight className="text-white w-5 h-5" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-end justify-end w-full h-full">
                       <div className="w-12 h-12 bg-white/20 backdrop-blur hover:bg-white/30 transition-colors rounded-full flex items-center justify-center shrink-0">
                        <ArrowRight className="text-white w-5 h-5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsed Content */}
                <div
                  className={cn(
                    "absolute transition-all duration-700 flex items-center justify-center",
                    "left-6 sm:left-8 top-1/2 -translate-y-1/2",
                    "md:left-1/2 md:top-auto md:bottom-10 md:-translate-x-1/2 md:translate-y-0",
                    isActive 
                      ? "opacity-0 pointer-events-none md:translate-y-8" 
                      : "opacity-100 md:translate-y-0"
                  )}
                >
                  <h3 
                    className="text-white font-bold text-xl sm:text-2xl md:text-3xl whitespace-nowrap tracking-wide [writing-mode:horizontal-tb] md:[writing-mode:vertical-rl] md:rotate-180"
                  >
                    {texts[index].title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
