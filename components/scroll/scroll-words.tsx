"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Reveals a block of text word-by-word as the user scrolls through it
 * (Apple-style). Scrubbed, so scrolling back un-reveals it.
 *
 * Screen readers get the sentence once, as plain text; the animated word
 * spans are hidden from the accessibility tree.
 *
 * Performance: the ScrollTrigger (positions) is created on mount, but the
 * per-word tween — the expensive part, one styled span per word — is only
 * built once the block is `active` (e.g. the visible testimonial slide) and
 * close to the viewport. It then jumps straight to the trigger's progress, so
 * what is on screen is identical to a tween that existed from the start.
 */
export default function ScrollWords({
  text,
  className,
  start = "clamp(top 85%)",
  end = "clamp(top 35%)",
  active = true,
}: {
  text: string;
  className?: string;
  start?: string;
  end?: string;
  active?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [near, setNear] = useState(false);
  const words = text.split(" ");

  // Becomes true (once) when the block is within a viewport of the screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      if (!triggerRef.current) {
        // Same as `scrub: true`: the tween's progress simply follows the trigger.
        const sync = (self: ScrollTrigger) => tweenRef.current?.progress(self.progress);
        triggerRef.current = ScrollTrigger.create({
          trigger: ref.current,
          start,
          end,
          onUpdate: sync,
          onRefresh: sync,
        });
      }
      if (active && near && !tweenRef.current) {
        const spans = ref.current.querySelectorAll<HTMLSpanElement>("[data-word]");
        tweenRef.current = gsap.fromTo(
          spans,
          { opacity: 0.12, y: 6, filter: "blur(2px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "none",
            stagger: 1 / spans.length,
            paused: true,
          },
        );
        tweenRef.current.progress(triggerRef.current.progress);
      }
    },
    // Re-runs add to the same context (no revert), so nothing is rebuilt.
    { scope: ref, dependencies: [active, near] },
  );

  return (
    <p ref={ref} className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span
            key={i}
            data-word
            className="inline-block whitespace-pre will-change-[opacity,transform]"
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </p>
  );
}
