import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Lenis drives the ticker, so GSAP should not lag-smooth on its own.
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    // No automatic full refresh on DOMContentLoaded/load: pins already queue
    // one when created, ScrollEffects runs one after the last trigger exists,
    // and SmoothScrollProvider refreshes whenever the page height changes
    // (fonts, images). The extra load-time passes re-measured the whole page
    // for nothing.
    autoRefreshEvents: "visibilitychange,resize",
  });
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Pinned sections must be refreshed top-to-bottom so each one accounts for the
// spacing added by the pins above it. Creation order is not reliable for that:
// gsap.matchMedia re-creates a pin when a breakpoint is crossed (and Fast Refresh
// does in dev), which would otherwise push it to the end of the refresh queue and
// make every pin below it start too early. Higher value = refreshed first.
// Scroll distance a pinned section spends on each step (accordion item, card,
// testimonial, pricing row), as a percentage of the viewport height. Larger =
// more scrolling per step, so one flick of the wheel doesn't skip past a step.
export const PIN_STEP_SCROLL = { desktop: 110, mobile: 90 } as const;
// Scroll distance for the hero card-fan animation.
export const HERO_PIN_SCROLL = 180;

export const PIN_PRIORITY = {
  hero: 5,
  features: 4,
  about: 3,
  testimonial: 2,
  pricing: 1,
} as const;

export { gsap, ScrollTrigger };
