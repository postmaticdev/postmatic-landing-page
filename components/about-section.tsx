"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LOGIN_URL } from "@/constants";
import { useDeferredGSAP } from "@/lib/deferred-setup";
import { cn } from "@/lib/utils";
import { expandableProps } from "@/lib/a11y";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger, prefersReducedMotion, PIN_PRIORITY, PIN_STEP_SCROLL } from "@/lib/gsap";

function CardVideo({ src, poster, isActive, className }: { src: string; poster: string; isActive: boolean; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Only download a card's video once it is the active (open) card and the
  // section is within a screen of the viewport — the three used to start
  // downloading together and fight over bandwidth. Until then the poster (the
  // video's first frame, which is all a closed card shows) stands in. Once
  // attached the source is kept, so going back never re-downloads.
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const wantsPlay = isActive && inView;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "100% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (wantsPlay) setLoaded(true);
  }, [wantsPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (wantsPlay && loaded) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [wantsPlay, loaded]);

  return (
    <video
      ref={videoRef}
      src={loaded ? src : undefined}
      poster={poster}
      loop
      muted
      playsInline
      preload={loaded ? "auto" : "none"}
      // A play() that was rejected or cut short while the file was still
      // loading is never retried by the browser: retry once it can play.
      onCanPlay={(e) => {
        if (wantsPlay && e.currentTarget.paused) e.currentTarget.play().catch(() => {});
      }}
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
}

const cards: CardItem[] = [
  {
    id: 0,
    bgImage: "", 
    bgVideo: "/video/One-Time-Input-Knowledge.mp4",
    bgColor: "bg-neutral-900",
  },
  {
    id: 1,
    bgImage: "",
    bgVideo: "/video/schedule-content.mp4",
    bgColor: "bg-neutral-900",
  },
  {
    id: 2,
    bgImage: "",
    bgVideo: "/video/postmatic-tiga-brand-satu-jadwal.mp4",
    bgColor: "bg-neutral-900",
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
  useDeferredGSAP(
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
                {...expandableProps(isActive, () => setActiveCard(index))}
              >
                {/* Background Image or Video */}
                {card.bgVideo ? (
                  <CardVideo
                    src={card.bgVideo}
                    poster={card.bgVideo.replace(/\.mp4$/, "-poster.webp")}
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

                {/* Text vignette: darkens only the corner behind the expanded text */}
                <div
                  aria-hidden
                  className={cn(
                    "absolute top-0 left-0 w-[min(100%,36rem)] h-[min(100%,22rem)] pointer-events-none transition-opacity duration-700 delay-100",
                    "bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.35)_40%,transparent_75%)]",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />

                {/* Vignette for collapsed (closed/narrow) state */}
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 pointer-events-none transition-opacity duration-700",
                    "bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]",
                    "shadow-[inset_0_0_30px_rgba(0,0,0,0.4)]",
                    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/45 before:via-transparent before:to-transparent md:before:bg-gradient-to-t md:before:from-black/50 md:before:via-transparent md:before:to-transparent",
                    !isActive ? "opacity-100" : "opacity-0"
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
                  <p
                    aria-hidden
                    className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl whitespace-nowrap tracking-widest [writing-mode:horizontal-tb] md:[writing-mode:vertical-rl] md:rotate-180 drop-shadow-md"
                  >
                    {t("step", { number: index + 1 })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
