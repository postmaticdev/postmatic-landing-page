"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import ScrollWords from "@/components/scroll/scroll-words";
import { ScrollTrigger, prefersReducedMotion, PIN_PRIORITY, PIN_STEP_SCROLL } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const DUMMY = "/content/dummy";

// Copy lives in messages under landing.testimonial.items.<id>
const testimonials = [
  { id: "almeira", brand: "Almeira", logo: "logo_minimalis_almeira_di_latar_beige.png", screen: "01_almeira_grid.png" },
  { id: "serasa", brand: "Serasa Scarf", logo: "logo_minimalis_serasa_scarf.png", screen: "02_serasa_scarf_grid.png" },
  { id: "haycrisp", brand: "Haycrisp", logo: "logo_haycrisp_dengan_motif_daun.png", screen: "03_haycrisp_grid.png" },
  { id: "lunara", brand: "Lunara Skin", logo: "logo_lunara_skin_minimalis_mewah.png", screen: "04_lunara_skin_grid.png" },
  { id: "sora", brand: "Sora Matcha", logo: "logo_matcha_sora_minimalis.png", screen: "05_sora_matcha_grid.png" },
  { id: "eclat", brand: "Eclat Muse", logo: "logo_mewah_eclat_muse.png", screen: "06_eclat_muse_grid.png" },
  { id: "namu", brand: "Namu Home", logo: "logo_minimalis_namu_home_di_latar_mocha.png", screen: "07_namu_home_grid.png" },
  { id: "moire", brand: "Moire Studio", logo: "logo_minimalis_moire_studio.png", screen: "08_moire_studio_grid.png" },
  { id: "kaldera", brand: "Kaldera Coffee", logo: "logo_kopi_minimalis_kaldera.png", screen: "09_kaldera_coffee_grid.png" },
  { id: "aruna", brand: "Aruna Residence", logo: "logo_aruna_residence_minimalis.png", screen: "10_aruna_residence_grid.png" },
] as const;

const AUTOPLAY_MS = 7000;
// The section stays pinned while scrolling through the first N testimonials.
const PINNED_SLIDES = 3;

// Every slide stays mounted and stacked in the same grid cell, so the section
// keeps the height of its tallest quote and the page's scroll triggers below
// never shift when the slide changes.
const slide = (isActive: boolean) =>
  cn(
    "[grid-area:1/1] transition-[opacity,visibility] duration-500 ease-out",
    isActive ? "opacity-100 visible" : "opacity-0 invisible",
  );

export default function TestimonialMinimal() {
  const t = useTranslations("landing.testimonial");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [pinned, setPinned] = useState(false);

  const count = testimonials.length;
  const go = (step: number) => setActive((i) => (i + step + count) % count);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Restarts on every slide change, so a manual click gets a full interval.
  // Scroll drives the slides while pinned, so autoplay waits until the pin releases.
  useEffect(() => {
    if (!inView || hovered || pinned || prefersReducedMotion()) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, inView, hovered, pinned, count]);

  // Pin the section and step through the first PINNED_SLIDES testimonials with the scroll.
  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content || prefersReducedMotion()) return;

      const slideAt = (progress: number) => Math.min(PINNED_SLIDES - 1, Math.floor(progress * PINNED_SLIDES));
      let last = -1;
      const sync = (progress: number) => {
        const next = slideAt(progress);
        // Only react to segment changes, so a manual prev/next click isn't overwritten on every scroll tick.
        if (next !== last) {
          last = next;
          setActive(next);
        }
      };

      ScrollTrigger.create({
        trigger: section,
        // Centre the section when it fits; otherwise keep quote, phone and author on screen.
        start: () => {
          const vh = window.innerHeight;
          const height = section.offsetHeight;
          if (height <= vh) return "center center";
          const contentTop = content.getBoundingClientRect().top - section.getBoundingClientRect().top - 16;
          return height - contentTop <= vh ? "bottom bottom" : `top+=${contentTop} top`;
        },
        end: () => {
          const step = window.matchMedia("(max-width: 767px)").matches ? PIN_STEP_SCROLL.mobile : PIN_STEP_SCROLL.desktop;
          return `+=${(window.innerHeight * step * PINNED_SLIDES) / 100}`;
        },
        pin: true,
        refreshPriority: PIN_PRIORITY.testimonial,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          setPinned(self.isActive);
          if (self.isActive) {
            last = -1;
            sync(self.progress);
          }
        },
        onUpdate: (self) => {
          if (self.isActive) sync(self.progress);
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-roledescription={t("roleDescription")}
      className="w-full py-16 md:py-32 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">

        {/* Top border */}
        <div data-reveal="line" className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-800 relative mb-4">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-neutral-900 dark:bg-white -mt-[0.5px]"></div>
        </div>

        {/* Subhead */}
        <div data-reveal="fade" className="text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-16 md:mb-24">
          {t("label")}
        </div>

        {/* Content: quote (left) + half iPhone sitting on the bottom rule (right) */}
        <div ref={contentRef} className="flex flex-col md:flex-row md:items-end gap-12 md:gap-10 lg:gap-16">
          <div className="flex flex-1 flex-col md:flex-row gap-6 md:gap-10 md:self-center md:pb-16">
            {/* Icon */}
            <div data-reveal="scale" className="shrink-0 pt-1 md:pt-2">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-300 dark:text-neutral-700">
                 <path d="M7 4l-4 16h5l4-16h-5zm10 0l-4 16h5l4-16h-5z" />
              </svg>
            </div>

            {/* Quote */}
            <div className="grid">
              {testimonials.map((item, i) => (
                <div key={item.id} className={slide(i === active)} aria-hidden={i !== active}>
                  <ScrollWords
                    text={t(`items.${item.id}.quote`)}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.3] font-medium text-neutral-900 dark:text-white tracking-tight"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Half iPhone — clipped by the bottom rule, rises as you scroll */}
          <div
            data-reveal="fade"
            className="relative mx-auto md:mx-0 shrink-0 w-[260px] sm:w-[280px] lg:w-[320px] h-[380px] sm:h-[420px] lg:h-[480px] overflow-hidden px-5"
          >
            <div data-parallax="-0.25" className="absolute inset-x-5 top-10 will-change-transform">
              <div className="relative w-full aspect-[9/19.5] rounded-[2.8rem] bg-neutral-900 p-[9px] ring-1 ring-neutral-700/60 dark:ring-neutral-600/60">
                {/* Side buttons */}
                <span className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-neutral-700" />
                <span className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l bg-neutral-700" />
                <span className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r bg-neutral-700" />

                {/* Screen — the grid screenshots carry their own status bar */}
                <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-white">
                  {testimonials.map((item, i) => (
                    <div key={item.id} className={cn("absolute inset-0", slide(i === active))} aria-hidden={i !== active}>
                      <Image
                        src={`${DUMMY}/Testimonials/${item.screen}`}
                        alt={t("screenAlt", { brand: item.brand })}
                        fill
                        sizes="(min-width: 1024px) 300px, 240px"
                        className="object-contain object-top"
                      />
                    </div>
                  ))}

                  {/* Dynamic Island */}
                  <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[34%] -translate-x-1/2 rounded-full bg-black" />
                </div>
              </div>
            </div>

            {/* Post chip — pinned to the bottom-right of the cut, so it stays put while the phone drifts */}
            <div aria-hidden="true" className="absolute bottom-4 right-9 z-10 flex items-center gap-1.5 rounded-full bg-neutral-900/75 py-1 pl-1 pr-2.5 shadow-lg backdrop-blur-md">
              <Image src="/logo-bg-blue.png" alt="" width={20} height={20} className="h-5 w-5 shrink-0 rounded-[5px]" />
              <span className="whitespace-nowrap text-[10px] font-semibold text-white">{t("autoPosted")}</span>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div data-reveal="line" className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-800 relative mb-6">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-neutral-900 dark:bg-white -mt-[0.5px]"></div>
        </div>

        {/* Footer */}
        <div data-reveal="up" className="flex flex-row items-center justify-between gap-6">
          {/* Author */}
          <div className="grid min-w-0">
            {testimonials.map((item, i) => (
              <div key={item.id} className={cn("flex items-center gap-4 min-w-0", slide(i === active))} aria-hidden={i !== active}>
                <div className="w-12 h-12 shrink-0 relative bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <Image
                    src={`${DUMMY}/logo_brand/${item.logo}`}
                    alt={t("logoAlt", { brand: item.brand })}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-[13px] md:text-sm font-bold text-neutral-900 dark:text-white truncate">{t(`items.${item.id}.author`)}</p>
                  <span className="text-[11px] md:text-[10px] font-bold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase truncate">{t(`items.${item.id}.role`)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:block text-[11px] font-bold tracking-wider text-neutral-400 dark:text-neutral-500 tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => go(-1)} className="w-10 h-10 bg-[#F4F4F5] hover:bg-[#E4E4E7] dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center" aria-label={t("prev")}>
                <ArrowLeft className="w-4 h-4 text-neutral-500" strokeWidth={1.5} />
              </button>
              <button type="button" onClick={() => go(1)} className="w-10 h-10 bg-[#F4F4F5] hover:bg-[#E4E4E7] dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center" aria-label={t("next")}>
                <ArrowRight className="w-4 h-4 text-neutral-500" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
