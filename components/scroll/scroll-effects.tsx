"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { queueSetup } from "@/lib/deferred-setup";

/**
 * Declarative, scroll-scrubbed effects driven by data-attributes.
 * Every tween uses `scrub: true`, so the animation position is a pure
 * function of scroll progress (reversible, 1:1 with the wheel / finger),
 * and Lenis provides the interpolation that keeps it buttery.
 *
 *  data-reveal="up|down|left|right|scale|clip|fade|blur|line"   single element
 *  data-reveal-stagger="0.15"  (on a parent)  direct children reveal in sequence
 *  data-reveal-type="..."      reveal type for a stagger group
 *  data-parallax="0.2"         vertical drift, negative = opposite direction
 *  data-parallax-img="0.12"    same but for media inside an overflow-hidden box
 *  data-tilt                   3D card falling into place
 *  data-count="83.46" data-count-decimals="2" data-count-suffix="%"
 *  data-draw                   SVG path drawn by scroll (uses pathLength)
 *  data-drift-x="-120"         horizontal drift across the section (px)
 *  data-skew-velocity          skews with scroll velocity (marquees)
 *  data-scale-in="0.9"         grows from the given scale into view
 *
 * Performance notes (this is ~130 ScrollTriggers on a 900-node page):
 *  - Setup is deferred until after React has finished hydrating and is
 *    spread over several animation frames, so it never sits inside one
 *    long task (this alone was ~3.5s of blocking time on a slow phone).
 *  - Each batch is split into a WRITE phase (gsap.set of every initial
 *    state) and a READ phase (tween + ScrollTrigger creation, which
 *    measures). Tweens use `immediateRender: false` so they don't write
 *    again mid-measurement. Result: one forced layout per batch instead of
 *    one per element, with identical visuals.
 */

const CHUNK = 24;

export default function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      if (prefersReducedMotion() || !contextSafe) return;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      // Phones: shorter travel so motion feels calm and nothing slides off-screen.
      const m = isMobile ? 0.45 : 1;
      const mPar = isMobile ? 0.35 : 1;

      const q = <T extends Element = HTMLElement>(sel: string) =>
        gsap.utils.toArray<T>(sel);
      const chunk = <T,>(arr: T[], size: number) => {
        const out: T[][] = [];
        for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
        return out;
      };
      const st = (
        trigger: Element | undefined,
        start: string,
        end: string,
      ): ScrollTrigger.Vars => ({ trigger, start, end, scrub: true });
      const NO_IR = { immediateRender: false } as const;

      const revealFrom = (type: string): gsap.TweenVars => {
        switch (type) {
          case "left":
            return { x: -72 * m, opacity: 0 };
          case "right":
            return { x: 72 * m, opacity: 0 };
          case "down":
            return { y: -56 * m, opacity: 0 };
          case "scale":
            return { scale: 0.88, opacity: 0 };
          case "fade":
            return { opacity: 0 };
          case "blur":
            return { opacity: 0, filter: `blur(${isMobile ? 8 : 14}px)`, y: 24 * m };
          case "clip":
            return { clipPath: "inset(0 0 100% 0 round 2rem)", scale: 1.12 };
          case "line":
            return { scaleX: 0, transformOrigin: "0% 50%" };
          case "up":
          default:
            return { y: 64 * m, opacity: 0 };
        }
      };
      const revealTo = (type: string): gsap.TweenVars => {
        switch (type) {
          case "clip":
            return { clipPath: "inset(0 0 0% 0 round 2rem)", scale: 1 };
          case "line":
            return { scaleX: 1 };
          default:
            return { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)" };
        }
      };

      // A job = write phase (initial states) followed by read phase (triggers).
      type Job = { write: () => void; read: () => void };
      const jobs: Job[] = [];

      // ─── Page progress bar ───
      if (barRef.current) {
        const bar = barRef.current;
        jobs.push({
          write: () => gsap.set(bar, { scaleX: 0 }),
          read: () =>
            gsap.to(bar, {
              scaleX: 1,
              ease: "none",
              ...NO_IR,
              scrollTrigger: { start: 0, end: "max", scrub: true },
            }),
        });
      }

      // ─── Single reveals (children of a stagger group are handled by the group) ───
      const singles = q("[data-reveal]").filter(
        (el) => !el.parentElement?.hasAttribute("data-reveal-stagger"),
      );
      for (const batch of chunk(singles, CHUNK)) {
        jobs.push({
          write: () => {
            for (const el of batch) gsap.set(el, revealFrom(el.dataset.reveal || "up"));
          },
          read: () => {
            for (const el of batch) {
              const type = el.dataset.reveal || "up";
              gsap.fromTo(el, revealFrom(type), {
                ...revealTo(type),
                ease: "none",
                ...NO_IR,
                scrollTrigger: st(
                  el,
                  el.dataset.revealStart || "clamp(top 94%)",
                  el.dataset.revealEnd || "clamp(top 62%)",
                ),
              });
            }
          },
        });
      }

      // ─── Staggered groups ───
      for (const batch of chunk(q("[data-reveal-stagger]"), CHUNK)) {
        const groups = batch.map((group) => ({
          group,
          children: Array.from(group.children) as HTMLElement[],
          type: group.dataset.revealType || "up",
          each: parseFloat(group.dataset.revealStagger || "0.15"),
        }));
        jobs.push({
          write: () => {
            for (const g of groups) if (g.children.length) gsap.set(g.children, revealFrom(g.type));
          },
          read: () => {
            for (const g of groups) {
              if (!g.children.length) continue;
              gsap
                .timeline({
                  scrollTrigger: st(
                    g.group,
                    g.group.dataset.revealStart || "clamp(top 92%)",
                    g.group.dataset.revealEnd || "clamp(top 45%)",
                  ),
                })
                .fromTo(g.children, revealFrom(g.type), {
                  ...revealTo(g.type),
                  duration: 1,
                  ease: "none",
                  ...NO_IR,
                  stagger: g.each,
                });
            }
          },
        });
      }

      // ─── Parallax (block + media) ───
      {
        const blocks = q("[data-parallax]").map((el) => ({
          el,
          dist: parseFloat(el.dataset.parallax || "0.2") * 160 * mPar,
        }));
        const media = q("[data-parallax-img]").map((el) => {
          const speed = parseFloat(el.dataset.parallaxImg || "0.12");
          return { el, pct: speed * 100, scale: 1 + speed * 2.2 };
        });
        jobs.push({
          write: () => {
            for (const b of blocks) gsap.set(b.el, { y: -b.dist });
            for (const v of media) gsap.set(v.el, { yPercent: -v.pct, scale: v.scale });
          },
          read: () => {
            for (const b of blocks)
              gsap.fromTo(
                b.el,
                { y: -b.dist },
                {
                  y: b.dist,
                  ease: "none",
                  ...NO_IR,
                  scrollTrigger: st(b.el.parentElement ?? b.el, "clamp(top bottom)", "clamp(bottom top)"),
                },
              );
            for (const v of media)
              gsap.fromTo(
                v.el,
                { yPercent: -v.pct, scale: v.scale },
                {
                  yPercent: v.pct,
                  scale: v.scale,
                  ease: "none",
                  ...NO_IR,
                  scrollTrigger: st(v.el.parentElement ?? v.el, "clamp(top bottom)", "clamp(bottom top)"),
                },
              );
          },
        });
      }

      // ─── Tilt, scale-in, drift ───
      {
        const tiltFrom = {
          rotateX: isMobile ? 8 : 16,
          y: 80 * m,
          opacity: 0,
          transformPerspective: 1200,
          transformOrigin: "50% 100%",
        };
        const tilts = q("[data-tilt]");
        const scales = q("[data-scale-in]").map((el) => ({
          el,
          from: { scale: parseFloat(el.dataset.scaleIn || "0.9"), opacity: 0.4 },
        }));
        const drifts = q("[data-drift-x]").map((el) => ({
          el,
          dist: parseFloat(el.dataset.driftX || "-120") * (isMobile ? 0.2 : 1),
        }));
        jobs.push({
          write: () => {
            for (const el of tilts) gsap.set(el, tiltFrom);
            for (const s of scales) gsap.set(s.el, s.from);
            for (const d of drifts) gsap.set(d.el, { x: -d.dist });
          },
          read: () => {
            for (const el of tilts)
              gsap.fromTo(el, tiltFrom, {
                rotateX: 0,
                y: 0,
                opacity: 1,
                ease: "none",
                ...NO_IR,
                scrollTrigger: st(el, "clamp(top 95%)", "clamp(top 55%)"),
              });
            for (const s of scales)
              gsap.fromTo(s.el, s.from, {
                scale: 1,
                opacity: 1,
                ease: "none",
                ...NO_IR,
                scrollTrigger: st(s.el, "clamp(top 95%)", "clamp(top 45%)"),
              });
            for (const d of drifts)
              gsap.fromTo(
                d.el,
                { x: -d.dist },
                {
                  x: d.dist,
                  ease: "none",
                  ...NO_IR,
                  scrollTrigger: st(d.el.closest("section") ?? d.el, "clamp(top bottom)", "clamp(bottom top)"),
                },
              );
          },
        });
      }

      // ─── Count-up, SVG draw, velocity skew ───
      {
        const counts = q("[data-count]").map((el) => {
          const decimals = parseInt(el.dataset.countDecimals || "0", 10);
          const suffix = el.dataset.countSuffix || "";
          const prefix = el.dataset.countPrefix || "";
          const locale = el.dataset.countLocale || "id-ID";
          const state = { v: 0 };
          const render = () => {
            el.textContent =
              prefix +
              state.v.toLocaleString(locale, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              }) +
              suffix;
          };
          return { el, state, render, target: parseFloat(el.dataset.count || "0") };
        });
        const paths = q<SVGPathElement>("[data-draw]");
        const skews = q("[data-skew-velocity]");
        jobs.push({
          write: () => {
            for (const c of counts) c.render();
            for (const p of paths) {
              p.setAttribute("pathLength", "1");
              gsap.set(p, { strokeDasharray: 1, strokeDashoffset: 1 });
            }
          },
          read: () => {
            for (const c of counts)
              gsap.to(c.state, {
                v: c.target,
                ease: "none",
                onUpdate: c.render,
                scrollTrigger: st(c.el, "clamp(top 90%)", "clamp(top 45%)"),
              });
            for (const p of paths)
              gsap.fromTo(
                p,
                { strokeDasharray: 1, strokeDashoffset: 1 },
                {
                  strokeDashoffset: 0,
                  ease: "none",
                  ...NO_IR,
                  scrollTrigger: st(
                    p.closest("[data-draw-scope]") ?? p,
                    "clamp(top 85%)",
                    p.dataset.draw || "clamp(top 35%)",
                  ),
                },
              );
            for (const el of skews) {
              const proxy = { skew: 0 };
              const setter = gsap.quickSetter(el, "skewX", "deg");
              const clamp = gsap.utils.clamp(-14, 14);
              ScrollTrigger.create({
                onUpdate: (self) => {
                  const skew = clamp(self.getVelocity() / -220);
                  if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, {
                      skew: 0,
                      duration: 0.7,
                      ease: "power3",
                      overwrite: true,
                      onUpdate: () => setter(proxy.skew),
                    });
                  }
                },
              });
            }
          },
        });
      }

      // ─── Run one job per frame, after the deferred section setups (pins) ───
      let cancelled = false;
      let raf = 0;
      const run = contextSafe(() => {
        if (cancelled) return;
        const job = jobs.shift();
        if (job) {
          job.write();
          job.read();
          raf = requestAnimationFrame(run);
        } else {
          // One pass re-measures every trigger with all initial states applied.
          ScrollTrigger.refresh();
        }
      });
      // Queued behind the pinned sections' setups (see lib/deferred-setup),
      // so the final refresh() above sees every pin spacer.
      const dequeue = queueSetup(() => {
        if (!cancelled) raf = requestAnimationFrame(run);
      });

      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
        dequeue();
      };
    },
    { dependencies: [] },
  );

  return (
    <div
      ref={barRef}
      aria-hidden
      className="fixed top-0 left-0 z-[200] h-[3px] w-full origin-left bg-[#0066FF] pointer-events-none"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
