"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Reveals a block of text word-by-word as the user scrolls through it
 * (Apple-style). Scrubbed, so scrolling back un-reveals it.
 *
 * Screen readers get the sentence once, as plain text; the animated word
 * spans are hidden from the accessibility tree.
 */
export default function ScrollWords({
  text,
  className,
  start = "clamp(top 85%)",
  end = "clamp(top 35%)",
}: {
  text: string;
  className?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      const spans = ref.current.querySelectorAll<HTMLSpanElement>("[data-word]");
      gsap.fromTo(
        spans,
        { opacity: 0.12, y: 6, filter: "blur(2px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "none",
          stagger: 1 / spans.length,
          scrollTrigger: { trigger: ref.current, start, end, scrub: true },
        },
      );
    },
    { scope: ref },
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
