"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const ANCHOR_OFFSET = -80;

// A malformed hash such as "#%" makes decodeURIComponent throw.
function decodeHash(hash: string) {
  try {
    return decodeURIComponent(hash);
  } catch {
    return hash;
  }
}

function scrollToSection(hash: string) {
  let target: HTMLElement | null = null;
  try {
    target = document.querySelector<HTMLElement>(hash);
  } catch {
    // Not a valid selector (e.g. "#:~:text=…"): not one of our sections.
  }
  if (!target) return false;
  // The hero sits at the very top (and is pinned): go to 0, not to its pin spacer.
  const to = hash === "#home" ? 0 : target;
  if (window.__lenis) {
    window.__lenis.scrollTo(to, { offset: to === 0 ? 0 : ANCHOR_OFFSET });
  } else if (to === 0) {
    window.scrollTo({ top: 0 });
  } else {
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + ANCHOR_OFFSET });
  }
  return true;
}

/**
 * Scroll to a section now, and again after each ScrollTrigger refresh during
 * the next few seconds: the pinned sections above it are set up one by one
 * after hydration and only then get their final spacing, which moves the
 * target. Stops as soon as the visitor scrolls on their own. Returns a cancel
 * function, or null when the hash isn't a section on this page.
 */
let cancelSettle: (() => void) | null = null;
function scrollToSectionAndSettle(hash: string) {
  cancelSettle?.();
  if (!scrollToSection(hash)) return false;
  const onRefresh = () => scrollToSection(hash);
  const userEvents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
  const stop = () => {
    window.clearTimeout(timeout);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    userEvents.forEach((type) => window.removeEventListener(type, stop));
    if (cancelSettle === stop) cancelSettle = null;
  };
  const timeout = window.setTimeout(stop, 4000);
  ScrollTrigger.addEventListener("refresh", onRefresh);
  userEvents.forEach((type) => window.addEventListener(type, stop, { passive: true }));
  cancelSettle = stop;
  return true;
}

// True only for the document's first render after a reload; later client-side
// navigations in the same document keep the reload's navigation entry.
let isInitialReload =
  typeof window !== "undefined" &&
  (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type ===
    "reload";

/**
 * Lenis smooth scroll synced to GSAP's ticker so every ScrollTrigger
 * (scrub) animation samples the same interpolated scroll position.
 * One rAF loop, no layout thrash => consistent 60fps.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Section links (navbar, footer, logo) point at "/{locale}#about" or "/#about".
  // When that section is on the current page, scroll to it instead of letting
  // the browser/router reload the page; otherwise let the link navigate.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash || url.hash === "#") return;
      if (!scrollToSectionAndSettle(decodeHash(url.hash))) return;
      e.preventDefault();
      history.replaceState(null, "", window.location.pathname + window.location.search + url.hash);
    };
    // Capture phase: runs before Next's <Link> handler, which then sees defaultPrevented.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    // Re-measure the triggers when the page height changes (fonts, images,
    // accordions); ScrollTrigger's own load-time refreshes are disabled in
    // lib/gsap. Debounced: accordions/videos resize the body many times per
    // second while opening; one refresh after things settle is enough.
    // Only a real change in page height needs one: a refresh itself resizes
    // the body (pin spacers), and without this check that resize scheduled yet
    // another full refresh — 2-3 redundant whole-page re-measures on load.
    let refreshTimer: number | undefined;
    let settledHeight = document.body.offsetHeight;
    const onRefreshed = () => {
      settledHeight = document.body.offsetHeight;
    };
    ScrollTrigger.addEventListener("refresh", onRefreshed);
    const ro = new ResizeObserver(() => {
      if (document.body.offsetHeight === settledHeight) return;
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        if (document.body.offsetHeight !== settledHeight) ScrollTrigger.refresh();
      }, 150);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      ScrollTrigger.removeEventListener("refresh", onRefreshed);
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Arriving with a hash (/en#pricing), on first load or via client-side
  // navigation from another page (this layout stays mounted). A reload starts
  // from the top instead, and drops the hash a section link left in the URL.
  useEffect(() => {
    if (isInitialReload) {
      isInitialReload = false;
      if (window.location.hash) {
        history.replaceState(history.state, "", window.location.pathname + window.location.search);
      }
      window.__lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      return;
    }
    const hash = decodeHash(window.location.hash);
    if (!hash || hash === "#") return;
    const raf = requestAnimationFrame(() => scrollToSectionAndSettle(hash));
    return () => {
      cancelAnimationFrame(raf);
      cancelSettle?.();
    };
  }, [pathname]);

  return <>{children}</>;
}
