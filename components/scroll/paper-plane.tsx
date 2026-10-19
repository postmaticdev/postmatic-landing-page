"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * A CSS-3D paper plane that flies around the viewport for the whole page.
 * Position follows a Catmull-Rom curve through WAYPOINTS, driven by page
 * scroll progress. Heading (nose direction) and banking are derived from the
 * actual motion, so scrolling back up makes the plane turn around.
 *
 * Everything is written once per frame on GSAP's ticker (same rAF as Lenis),
 * touching only `transform` / `opacity` → compositor-only, 60fps.
 */

// x, y = fraction of viewport, s = scale (depth: >1 closer to the viewer)
const WAYPOINTS: Array<{ x: number; y: number; s: number }> = [
  { x: 0.86, y: 0.2, s: 0.8 }, // hero, top right
  { x: 0.62, y: 0.34, s: 1.0 },
  { x: 0.14, y: 0.3, s: 1.15 }, // sweeps left
  { x: 0.08, y: 0.68, s: 0.9 },
  { x: 0.42, y: 0.82, s: 0.7 }, // dives far away
  { x: 0.9, y: 0.6, s: 1.0 },
  { x: 0.92, y: 0.22, s: 1.25 }, // climbs right, towards camera
  { x: 0.5, y: 0.14, s: 1.4 },
  { x: 0.12, y: 0.42, s: 1.05 },
  { x: 0.3, y: 0.78, s: 0.75 },
  { x: 0.74, y: 0.86, s: 0.85 },
  { x: 0.94, y: 0.48, s: 1.1 },
  { x: 0.64, y: 0.26, s: 1.3 },
  { x: 0.22, y: 0.2, s: 1.0 },
  { x: 0.06, y: 0.55, s: 0.85 },
  { x: 0.46, y: 0.7, s: 1.15 }, // lands near the CTA, centre
  { x: 0.5, y: 0.5, s: 1.35 },
];

// Barrel rolls at these scroll windows [start, end] (page progress 0..1)
const ROLLS: Array<[number, number]> = [
  [0.27, 0.33],
  [0.62, 0.68],
];

const TRAIL_POINTS = 26;

function catmull(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  );
}

function samplePath(progress: number) {
  const n = WAYPOINTS.length - 1;
  const f = Math.min(Math.max(progress, 0), 1) * n;
  const i = Math.min(Math.floor(f), n - 1);
  const t = f - i;
  const p0 = WAYPOINTS[Math.max(i - 1, 0)];
  const p1 = WAYPOINTS[i];
  const p2 = WAYPOINTS[i + 1];
  const p3 = WAYPOINTS[Math.min(i + 2, n)];
  return {
    x: catmull(p0.x, p1.x, p2.x, p3.x, t),
    y: catmull(p0.y, p1.y, p2.y, p3.y, t),
    s: catmull(p0.s, p1.s, p2.s, p3.s, t),
  };
}

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(Math.max((v - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

// Depth thresholds (path scale, before the mobile multiplier) for switching
// between flying behind components and in front of them. The gap between the
// two values is hysteresis so the plane doesn't flicker between layers.
const BACK_BELOW = 0.95;
const FRONT_ABOVE = 1.05;
const Z_FRONT = "35"; // above content, below navbar (z-40) & cookie popup
const Z_BACK = "-1"; // below in-flow content, above the page canvas

export default function PaperPlane() {
  const [mounted, setMounted] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPolylineElement>(null);

  // Render into <body> so no ancestor stacking context can trap the z-index.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const layer = layerRef.current;
    const plane = planeRef.current;
    const shadow = shadowRef.current;
    const trail = trailRef.current;
    if (!layer || !plane || !shadow || !trail || prefersReducedMotion()) return;

    const mq = window.matchMedia("(max-width: 767px)");
    let baseScale = mq.matches ? 0.5 : 1;
    const onMq = () => (baseScale = mq.matches ? 0.5 : 1);
    mq.addEventListener("change", onMq);

    let target = 0; // raw scroll progress
    let prog = 0; // eased progress (plane lags a touch behind = feels airborne)
    let footerP = 0; // 0 → footer not visible, 1 → plane tucked behind it
    let heading = 180; // degrees, 0 = nose pointing right
    let bank = 0;
    let pitch = 0;
    let prevX = 0;
    let prevY = 0;
    let prevS = 1;
    let first = true;
    let inFront = true;
    let layerFade = 1; // dips briefly when switching layers
    const pts: Array<[number, number]> = [];

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        target = self.progress;
      },
    });
    target = st.progress;
    prog = target;

    // Exit: as the footer scrolls in, the plane drops to the back layer and
    // dives below the footer's top edge, so the (opaque) footer covers it.
    const footer = document.querySelector("footer");
    const footerST = footer
      ? ScrollTrigger.create({
          trigger: footer,
          start: "top bottom",
          end: "top 55%",
          onUpdate: (self) => {
            footerP = self.progress;
          },
        })
      : null;
    if (footerST) footerP = footerST.progress;

    const setLayer = (front: boolean) => {
      if (front === inFront) return;
      inFront = front;
      layer.style.zIndex = front ? Z_FRONT : Z_BACK;
      layerFade = 0.35;
    };

    const tick = (time: number, deltaTime: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const dt = Math.min(deltaTime / 16.67, 3); // frame-rate independent easing

      prog += (target - prog) * (1 - Math.pow(0.92, dt));
      const p = samplePath(prog);
      const exit = smooth(0, 1, footerP);

      // idle bob so it never looks frozen
      const bob = Math.sin(time * 2.2) * 6 * baseScale;
      const x = p.x * vw;
      const pathY = p.y * vh + bob;
      // Dive target: just under the footer's top edge (tracks the footer as it
      // scrolls up, so once hidden the plane stays tucked behind it).
      const footerTop = footer && footerP > 0 ? footer.getBoundingClientRect().top : vh;
      const hiddenY = footerTop + 110 * baseScale;
      const y = pathY + (Math.max(pathY, hiddenY) - pathY) * exit;
      const s = p.s * baseScale * (1 - exit * 0.2);

      // ── layer: far → behind components, near → in front ──
      // Phones: always behind content, so the plane never covers text the
      // visitor is reading (desktop keeps the front/back depth effect).
      if (mq.matches || footerP > 0.02) setLayer(false);
      else if (p.s < BACK_BELOW) setLayer(false);
      else if (p.s > FRONT_ABOVE) setLayer(true);
      layerFade += (1 - layerFade) * (1 - Math.pow(0.85, dt));

      const dx = x - prevX;
      const dy = y - prevY;
      const speed = Math.hypot(dx, dy);

      if (first) {
        const ahead = samplePath(Math.min(prog + 0.01, 1));
        heading = (Math.atan2(ahead.y * vh - y, ahead.x * vw - x) * 180) / Math.PI;
        first = false;
      } else if (speed > 0.6) {
        const targetHeading = (Math.atan2(dy, dx) * 180) / Math.PI;
        let diff = targetHeading - heading;
        diff = ((((diff + 180) % 360) + 360) % 360) - 180; // shortest turn
        heading += diff * (1 - Math.pow(0.88, dt));
        heading = ((((heading + 180) % 360) + 360) % 360) - 180;
        // bank into the turn
        bank += (gsap.utils.clamp(-65, 65, diff * 2.2) - bank) * 0.1;
      } else {
        bank += (0 - bank) * 0.05;
      }
      // pitch with depth change (climbing towards the viewer = nose up)
      pitch += (gsap.utils.clamp(-30, 30, ((s - prevS) / baseScale) * 900) - pitch) * 0.1;

      let roll = 0;
      for (const [a, b] of ROLLS) roll += smooth(a, b, prog) * 360;

      plane.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) ` +
        `rotateZ(${heading}deg) rotateX(${bank + roll}deg) rotateY(${pitch}deg) scale(${s})`;

      // ground shadow: offset grows with depth (closer = higher above the page)
      const lift = (18 + (s / baseScale) * 26) * baseScale;
      shadow.style.transform =
        `translate3d(${x + lift * 0.6}px, ${y + lift}px, 0) translate(-50%, -50%) ` +
        `rotateZ(${heading}deg) scale(${s * 0.9})`;
      shadow.style.opacity = String(Math.max(0, 0.28 - (s / baseScale - 1) * 0.12));

      // whole layer: back = slightly hazier (no fade on exit: the footer hides it)
      const depthAlpha = inFront ? 1 : 0.88;
      layer.style.opacity = String(depthAlpha * layerFade);

      // trail: record the tail position, decay when idle
      const rad = (heading * Math.PI) / 180;
      const tailX = x - Math.cos(rad) * 46 * s;
      const tailY = y - Math.sin(rad) * 46 * s;
      if (speed > 0.6) {
        pts.push([tailX, tailY]);
        if (pts.length > TRAIL_POINTS) pts.shift();
      } else if (pts.length) {
        pts.shift();
      }
      trail.setAttribute("points", pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" "));

      prevX = x;
      prevY = y;
      prevS = s;
    };

    gsap.ticker.add(tick);
    plane.style.opacity = "1";

    return () => {
      gsap.ticker.remove(tick);
      mq.removeEventListener("change", onMq);
      st.kill();
      footerST?.kill();
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden motion-reduce:hidden"
      style={{ zIndex: Number(Z_FRONT), opacity: 0 }}
    >
      {/* Dashed flight trail */}
      <svg className="absolute inset-0 h-full w-full">
        <polyline
          ref={trailRef}
          fill="none"
          stroke="#0066FF"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="2 7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Soft shadow on the page */}
      <div ref={shadowRef} className="absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
        <div
          className="h-[64px] w-[120px] bg-neutral-900/70 dark:bg-black blur-[6px]"
          style={{ clipPath: "polygon(100% 50%, 0% 0%, 14% 50%, 0% 100%)" }}
        />
      </div>

      {/* Paper plane (nose points to +X in its local space) */}
      <div
        ref={planeRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ opacity: 0, perspective: "800px", transformStyle: "preserve-3d" }}
      >
        <div className="relative h-[64px] w-[120px]" style={{ transformStyle: "preserve-3d" }}>
          {/* Left wing (top half), folded up towards the viewer */}
          <div
            className="absolute left-0 top-0 h-1/2 w-full bg-gradient-to-br from-[#FBFDFF] to-[#D3E2FF] dark:from-[#F4F7FF] dark:to-[#C9D8F5]"
            style={{
              clipPath: "polygon(100% 100%, 0% 0%, 14% 100%)",
              transformOrigin: "50% 100%",
              transform: "rotateX(-24deg)",
            }}
          />
          {/* Right wing (bottom half) */}
          <div
            className="absolute left-0 bottom-0 h-1/2 w-full bg-gradient-to-tr from-[#EAF1FF] to-[#BFD3FF] dark:from-[#E4ECFB] dark:to-[#B6C9EE]"
            style={{
              clipPath: "polygon(100% 0%, 0% 100%, 14% 0%)",
              transformOrigin: "50% 0%",
              transform: "rotateX(24deg)",
            }}
          />
          {/* Keel, left half (hangs away from the viewer) */}
          <div
            className="absolute left-0 top-0 h-1/2 w-full bg-gradient-to-r from-[#B9CEF5] to-[#8FB0EE]"
            style={{
              clipPath: "polygon(100% 100%, 14% 100%, 20% 45%)",
              transformOrigin: "50% 100%",
              transform: "rotateX(78deg)",
            }}
          />
          {/* Keel, right half */}
          <div
            className="absolute left-0 bottom-0 h-1/2 w-full bg-gradient-to-r from-[#A9C2F2] to-[#7FA3EA]"
            style={{
              clipPath: "polygon(100% 0%, 14% 0%, 20% 55%)",
              transformOrigin: "50% 0%",
              transform: "rotateX(-78deg)",
            }}
          />
          {/* Centre fold line */}
          <div className="absolute left-[14%] top-1/2 h-px w-[86%] -translate-y-1/2 bg-[#0066FF]/50" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
