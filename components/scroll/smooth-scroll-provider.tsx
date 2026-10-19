"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scroll synced to GSAP's ticker so every ScrollTrigger
 * (scrub) animation samples the same interpolated scroll position.
 * One rAF loop, no layout thrash => consistent 60fps.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      anchors: { offset: -80 },
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    // ScrollTrigger already refreshes itself on `load`; a second listener here
    // only doubled that (expensive) full-page measurement.
    // Debounced: accordions/videos resize the body many times per second
    // while opening; one refresh after things settle is enough.
    let refreshTimer: number | undefined;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(document.body);

    // Fallback for links like /#pricing coming from another route.
    if (window.location.hash) {
      requestAnimationFrame(() => lenis.scrollTo(window.location.hash, { offset: -80 }));
    }

    return () => {
      ro.disconnect();
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
