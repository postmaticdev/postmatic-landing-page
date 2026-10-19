"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { LOGIN_URL } from "@/constants";
import { useTranslations } from "next-intl";
import { gsap, prefersReducedMotion, PIN_PRIORITY, HERO_PIN_SCROLL } from "@/lib/gsap";

const cards = [
  { title: "Lunara Skin", subtitleKey: "lunara", image: "/content/dummy/Feeds/lunara-skin-3-langkah.png", zIndex: 10 },
  { title: "Haycrisp", subtitleKey: "haycrisp", image: "/content/dummy/Feeds/haycrisp-balado-lime.png", zIndex: 20 },
  { title: "Sora Matcha", subtitleKey: "sora", image: "/content/dummy/Feeds/sora-strawberry-matcha.png", zIndex: 30 },
  { title: "Almeira", subtitleKey: "almeira", image: "/content/dummy/Feeds/almeira-everyday-bag.png", zIndex: 20 },
  { title: "Namu Home", subtitleKey: "namu", image: "/content/dummy/Feeds/namu-slow-living.png", zIndex: 10 },
];

// Fan layout (open state)
const OPEN = {
  desktop: { x: [-360, -180, 0, 180, 360], y: [80, 30, 0, 30, 80], r: [-16, -8, 0, 8, 16] },
  mobile: { x: [-110, -55, 0, 55, 110], y: [50, 15, 0, 15, 50], r: [-16, -8, 0, 8, 16] },
};
// Deck layout (closed state): a tidy stack with the edges just peeking out
const CLOSED = { x: [-14, -7, 0, 7, 14], y: [10, 5, 0, 5, 10], r: [-4, -2, 0, 2, 4] };

export default function Hero() {
  const t = useTranslations("landing.hero");
  const lines = t.raw("lines") as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion()) return;

      const cardEls = gsap.utils.toArray<HTMLElement>("[data-hero-card]");
      const mm = gsap.matchMedia();

      mm.add(
        { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" },
        (ctx) => {
          const open = ctx.conditions?.desktop ? OPEN.desktop : OPEN.mobile;

          // ── Initial state: closed deck ──
          gsap.set(cardEls, {
            xPercent: -50,
            x: (i) => CLOSED.x[i],
            y: (i) => CLOSED.y[i],
            rotation: (i) => CLOSED.r[i],
            transformOrigin: "50% 100%",
            force3D: true,
          });

          // ── Intro (plays once on load, only if we're at the top) ──
          if (window.scrollY < 10) {
            const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
            intro
              .from("[data-hero-label]", { y: 18, opacity: 0, duration: 0.6 })
              .from(
                "[data-hero-line]",
                { yPercent: 110, duration: 0.9, stagger: 0.1 },
                "-=0.35",
              )
              .from(
                "[data-hero-right] > *",
                { y: 26, opacity: 0, duration: 0.7, stagger: 0.1 },
                "-=0.6",
              )
              .from(
                cardEls,
                { y: "+=180", opacity: 0, duration: 1, stagger: 0.06, ease: "power3.out" },
                "-=0.8",
              )
              .from(hintRef.current, { opacity: 0, y: 10, duration: 0.5 }, "-=0.4");
          }

          // ── Scroll sequence (scrubbed 1:1 with scroll) ──
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${HERO_PIN_SCROLL}%`,
              pin: true,
              refreshPriority: PIN_PRIORITY.hero,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl
            // 1. open the fan, centre card first then the neighbours
            .to(
              cardEls,
              {
                x: (i) => open.x[i],
                y: (i) => open.y[i],
                rotation: (i) => open.r[i],
                duration: 1,
                ease: "power2.inOut",
                stagger: { each: 0.08, from: "center" },
              },
              0,
            )
            .to(hintRef.current, { opacity: 0, y: -10, duration: 0.3 }, 0)
            // 2. short hold so the open fan is the last frame before unpin.
            // (The headline stays put: the hero already sits right under the
            // navbar, so any upward drift would slide it beneath the navbar.)
            .to({}, { duration: 0.3 }, 1.3);
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full min-h-[100svh] pt-[5.5rem] sm:pt-24 lg:pt-24 overflow-hidden font-sans flex flex-col"
    >
      <div ref={headerRef} className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8 will-change-transform">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-8">
          {/* Left Column */}
          <div className="flex-1 max-w-3xl">
            <div data-hero-label className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="w-3.5 h-3.5 bg-[#0066FF]"></div>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-neutral-800 dark:text-neutral-300 uppercase whitespace-nowrap truncate">
                {t("label")}
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-[4.75rem] font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.05]">
              {lines.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                  <span data-hero-line className="block will-change-transform">
                    {line}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Right Column */}
          <div data-hero-right className="flex-1 max-w-md lg:pb-4">
            <p className="text-xl sm:text-2xl text-neutral-800 dark:text-neutral-200 font-medium mb-8 leading-snug">
              {t("subtitle")}
            </p>
            <div className="flex flex-row items-center gap-3 sm:gap-4 w-full">
              <Link
                href={LOGIN_URL}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white px-3 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold transition-all hover:scale-105 shadow-xl shadow-[#0066FF]/20 text-[13px] sm:text-base"
              >
                {t("getStarted")}
                <ArrowUpRight size={18} className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              </Link>
              <a
                href="https://www.youtube.com/watch?v=rEkeRl3WkFk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 px-3 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold transition-all hover:scale-105 text-[13px] sm:text-base whitespace-nowrap"
              >
                {t("watchTutorial")}
                <ArrowUpRight size={18} className="text-neutral-500 w-[18px] h-[18px] sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Deck / Fan */}
      <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[380px] lg:min-h-[420px]">
        <div ref={deckRef} className="absolute inset-0 will-change-transform">
          {cards.map((card, idx) => (
            <div
              key={card.title}
              data-hero-card
              className="absolute top-0 left-1/2 w-[160px] sm:w-[220px] md:w-[min(270px,32vh)] lg:w-[min(300px,36vh)] will-change-transform motion-reduce:[transform:var(--transform-mobile)] md:motion-reduce:[transform:var(--transform-desktop)]"
              style={
                {
                  "--transform-desktop": `translateX(calc(-50% + ${OPEN.desktop.x[idx]}px)) translateY(${OPEN.desktop.y[idx]}px) rotate(${OPEN.desktop.r[idx]}deg)`,
                  "--transform-mobile": `translateX(calc(-50% + ${OPEN.mobile.x[idx]}px)) translateY(${OPEN.mobile.y[idx]}px) rotate(${OPEN.mobile.r[idx]}deg)`,
                  transformOrigin: "bottom center",
                  zIndex: card.zIndex,
                } as React.CSSProperties
              }
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.03] hover:-translate-y-2 cursor-pointer border border-white/10 dark:border-neutral-800/50 group bg-neutral-200 dark:bg-neutral-900">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10 transition-opacity group-hover:opacity-80"></div>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 150px, (max-width: 1024px) 270px, 300px"
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 p-2.5 sm:p-4 lg:p-5 z-20 w-full text-left text-white">
                  <p className="text-sm sm:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1 tracking-tight">
                    {card.title}
                  </p>
                  <p className="text-white/90 font-medium text-[10px] sm:text-xs lg:text-sm">
                    {t(`cards.${card.subtitleKey}`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] flex flex-col items-center gap-2 text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400 pointer-events-none"
        >
          <span>{t("scroll")}</span>
          <span className="relative block w-px h-8 overflow-hidden bg-neutral-200 dark:bg-neutral-800">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-[#0066FF] animate-[hero-hint_1.6s_ease-in-out_infinite]" />
          </span>
        </div>

        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[140px] sm:h-[260px] bg-gradient-to-t from-white from-15% via-white/85 via-55% to-transparent dark:from-[#0A0A0A] dark:from-15% dark:via-[#0A0A0A]/85 dark:via-55% z-[100] pointer-events-none"></div>
      </div>
    </section>
  );
}
