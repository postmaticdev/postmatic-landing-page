"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger, prefersReducedMotion, PIN_PRIORITY, PIN_STEP_SCROLL } from "@/lib/gsap";

const VIDEO_ID = "LRGvK7NwriE";
const YT_ORIGIN = "https://www.youtube.com";
// Muted autoplay is the only autoplay browsers allow; viewers can unmute from the controls.
// YouTube refuses embeds that arrive without a referrer ("Video unavailable" / Error 153),
// so the iframe sets referrerPolicy explicitly and passes its origin for the JS API.
// No `playlist=` param: YouTube answers "This video is unavailable" for this video when it
// is present, so looping is done through the JS API instead (see the message listener).
const videoSrc = (origin: string) =>
  `${YT_ORIGIN}/embed/${VIDEO_ID}?autoplay=1&mute=1&playsinline=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`;

const ytPost = (iframe: HTMLIFrameElement | null, message: Record<string, unknown>) =>
  iframe?.contentWindow?.postMessage(JSON.stringify(message), YT_ORIGIN);
const ytCommand = (iframe: HTMLIFrameElement | null, func: string, args: unknown[] = []) =>
  ytPost(iframe, { event: "command", func, args });

type FeatureItem = { id: string; title: string; description: string };

export default function WhatIsPostmatic() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const t = useTranslations("landing.features");
  const features = t.raw("items") as FeatureItem[];
  const sectionRef = useRef<HTMLElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const lastIndex = useRef(0);

  // The player is only mounted once the section is first in view (it starts playing
  // via autoplay=1), then paused / resumed as the section leaves and re-enters.
  useEffect(() => {
    const box = videoBoxRef.current;
    if (!box) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoLoaded(true);
          ytCommand(iframeRef.current, "playVideo");
        } else {
          ytCommand(iframeRef.current, "pauseVideo");
        }
      },
      { threshold: 0.4 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  // Loop: when the player reports "ended" (state 0), jump back to the start and play again.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== YT_ORIGIN || e.source !== iframeRef.current?.contentWindow) return;
      let data: { event?: string; info?: unknown } | null = null;
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      const info = data?.info as { playerState?: number } | number | undefined;
      const ended =
        (data?.event === "onStateChange" && info === 0) ||
        (data?.event === "infoDelivery" && typeof info === "object" && info?.playerState === 0);
      if (ended) {
        ytCommand(iframeRef.current, "seekTo", [0, true]);
        ytCommand(iframeRef.current, "playVideo");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Subscribe to player events once the iframe has loaded.
  const onVideoLoad = () => {
    ytPost(iframeRef.current, { event: "listening", id: VIDEO_ID, channel: "widget" });
    ytCommand(iframeRef.current, "addEventListener", ["onStateChange"]);
  };

  // Scroll progress opens menu 01 → 04 in turn,
  // then releases to normal scroll. Desktop pins the whole section; phones and
  // tablets pin the video + accordion block just below the navbar.
  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      const step = (self: ScrollTrigger) => {
        const idx = Math.min(features.length - 1, Math.floor(self.progress * features.length));
        if (idx !== lastIndex.current) {
          lastIndex.current = idx;
          setOpenIndex(idx);
        }
      };
      mm.add("(max-width: 1023px)", () => {
        ScrollTrigger.create({
          trigger: blockRef.current,
          start: "top 76px",
          end: `+=${features.length * PIN_STEP_SCROLL.mobile}%`,
          pin: true,
          refreshPriority: PIN_PRIORITY.features,
          anticipatePin: 1,
          onUpdate: step,
        });
      });
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${features.length * PIN_STEP_SCROLL.desktop}%`,
          pin: true,
          refreshPriority: PIN_PRIORITY.features,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              features.length - 1,
              Math.floor(self.progress * features.length),
            );
            if (idx !== lastIndex.current) {
              lastIndex.current = idx;
              setOpenIndex(idx);
            }
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="features"
      className="scroll-mt-24 w-full py-16 md:py-32 lg:py-20 font-sans lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-8 md:mb-12 lg:mb-8">
          <div data-reveal="up" className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3.5 h-3.5 bg-[#0066FF]"></div>
              <span className="text-xs font-bold tracking-widest text-neutral-800 dark:text-neutral-300 uppercase">
                {t("label")}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 dark:text-white tracking-tight transition-all duration-300">
              {/* Desktop: the title follows the active item (the whole section is
                  pinned, so its height cannot change). Below lg the header scrolls
                  away above the pinned block, and a changing line count would
                  resize the page mid-pin, so the title stays fixed there. */}
              <span className="lg:hidden">{t("fallbackTitle")}</span>
              <span className="hidden lg:inline">
                {openIndex !== -1 ? features[openIndex].title : t("fallbackTitle")}
              </span>
            </h2>
          </div>
          <div data-reveal="up" className="max-w-sm lg:max-w-md pb-2">
            <p className="text-[13px] md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div data-reveal="line" className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-800 mb-8 md:mb-12 lg:mb-8"></div>

        {/* Bottom Content Section */}
        {/* Below lg this block is pinned under the navbar. Its height is fixed so
            opening a different item never resizes the page mid-pin (a resize
            triggers ScrollTrigger.refresh, which would reset the reveals). */}
        <div ref={blockRef} className="flex flex-col lg:flex-row gap-5 md:gap-8 lg:gap-16 bg-white dark:bg-[#0A0A0A] lg:bg-transparent lg:dark:bg-transparent max-md:h-[min(610px,calc(100svh-92px))] md:max-lg:h-[min(860px,calc(100svh-92px))] max-lg:overflow-hidden">
          
          {/* Left Video — 16:9 on desktop; below lg it covers the fixed-height box */}
          <div
            ref={videoBoxRef}
            data-reveal="clip"
            className="block w-full lg:w-1/2 lg:self-start rounded-[1.25rem] lg:rounded-[1.5rem] overflow-hidden h-[26svh] min-h-[170px] md:h-[30svh] lg:h-auto lg:min-h-0 lg:aspect-video relative shadow-lg bg-neutral-900 [container-type:size] lg:[container-type:normal]"
          >
            {videoLoaded && (
              <iframe
                ref={iframeRef}
                src={videoSrc(window.location.origin)}
                title={t("videoTitle")}
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={onVideoLoad}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0 w-[max(100%,calc(100cqh*16/9))] h-[max(100%,calc(100cqw*9/16))] lg:w-full lg:h-full"
              />
            )}
          </div>

          {/* Right Accordion */}
          <div data-reveal-stagger="0.12" className="w-full lg:w-1/2 flex flex-col justify-start">
            {features.map((feature, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={feature.id} 
                  className={cn(
                    "border-b border-neutral-200 dark:border-neutral-800 py-4 md:py-6 lg:py-5 first:pt-2 cursor-pointer transition-all duration-300",
                  )}
                  onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-6 md:gap-8">
                      <span className={cn(
                        "text-xs font-semibold pt-2 md:pt-2.5 transition-colors duration-300",
                        isOpen ? "text-[#0066FF]" : "text-neutral-400 dark:text-neutral-500"
                      )}>
                        {feature.id}
                      </span>
                      <div className="flex flex-col">
                        <h3 className={cn(
                          "text-xl md:text-3xl font-medium tracking-tight transition-colors duration-300",
                          isOpen ? "text-[#0066FF]" : "text-neutral-900 dark:text-white"
                        )}>
                          {feature.title}
                        </h3>
                        
                        {/* Expandable Content */}
                        <div 
                          className={cn(
                            "grid transition-all duration-400 ease-in-out",
                            isOpen ? "grid-rows-[1fr] opacity-100 mt-3 md:mt-4" : "grid-rows-[0fr] opacity-0"
                          )}
                        >
                          <div className="overflow-hidden">
                            <p className="text-[13px] md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[90%] font-medium">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1.5 md:pt-2 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#0066FF]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
