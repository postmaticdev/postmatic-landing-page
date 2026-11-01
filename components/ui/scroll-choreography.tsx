"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, Palette, MessageSquareText, CalendarClock } from "lucide-react";
import EndToEnd from "@/components/end-to-end";

// ─── Feature card data ───
const FEATURES = [
  {
    icon: TrendingUp,
    title: "Analisis Tren",
    description: "AI memantau tren 24/7 di semua platform dan mengidentifikasi konten paling relevan untuk bisnis Anda.",
    accent: "from-[#0066FF] to-cyan-400",
    iconBg: "bg-[#0066FF]/15",
    iconColor: "text-[#3385ff]",
  },
  {
    icon: Palette,
    title: "Create Content",
    description: "Desain visual berkualitas tinggi dihasilkan otomatis sesuai identitas brand Anda — tanpa perlu desainer.",
    accent: "from-violet-500 to-purple-400",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    icon: CalendarClock,
    title: "Auto Posting",
    description: "Konten dijadwalkan dan diposting otomatis di waktu terbaik berdasarkan pola engagement audiens Anda.",
    accent: "from-amber-500 to-orange-400",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
  },
  {
    icon: MessageSquareText,
    title: "Create Caption",
    description: "Caption menarik dan hashtag tepat sasaran dibuat otomatis, disesuaikan dengan gaya dan tone bisnis Anda.",
    accent: "from-emerald-500 to-teal-400",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
];

interface ScrollChoreographyProps {
  className?: string;
}

export function ScrollChoreography({ className }: ScrollChoreographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 50,
    mass: 1.2,
    restDelta: 0.001,
  });

  // Default positions relative to center
  const xLeft = "-20vw";
  const xRight = "20vw";
  const yTop = "-14vh";
  const yBottom = "14vh";

  // Phase 1: 0 - 0.3 (Diagonal movement)
  // Phase 2: 0.35 - 0.65 (Stack alignment to center)
  // Phase 3: 0.7 - 0.9 (Hero expands to full screen)

  // Top Left -> moves to Bottom Left, then to Center
  const tlX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xLeft, xLeft, xLeft, "0vw", "0vw"]);
  const tlY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yTop, yBottom, yBottom, "0vh", "0vh"]);

  // Bottom Right -> moves to Top Right, then to Center
  const brX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xRight, xRight, xRight, "0vw", "0vw"]);
  const brY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yBottom, yTop, yTop, "0vh", "0vh"]);

  // Bottom Left -> stays, then moves to Center
  const blX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xLeft, xLeft, xLeft, "0vw", "0vw"]);
  const blY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yBottom, yBottom, yBottom, "0vh", "0vh"]);

  // Top Right -> stays, then moves to Center, then expands
  const trX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xRight, xRight, xRight, "0vw", "0vw"]);
  const trY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yTop, yTop, yTop, "0vh", "0vh"]);

  // Hero card scaling/expansion
  const heroWidth = useTransform(smoothProgress, [0.65, 0.7, 0.9, 1], ["36vw", "36vw", "100vw", "100vw"]);
  const heroHeight = useTransform(smoothProgress, [0.65, 0.7, 0.9, 1], ["24vh", "24vh", "100vh", "100vh"]);
  const heroRadius = useTransform(smoothProgress, [0.65, 0.7, 0.9, 1], ["0.75rem", "0.75rem", "0rem", "0rem"]);

  // Opacity fading for cards underneath the hero as it expands
  const underCardsOpacity = useTransform(smoothProgress, [0.75, 0.85], [1, 0]);

  // Hero content opacity (appears as card expands)
  const heroContentOpacity = useTransform(smoothProgress, [0.8, 0.92], [0, 1]);

  const baseCardClasses =
    "absolute left-1/2 top-1/2 w-[36vw] h-[24vh] overflow-hidden -translate-x-1/2 -translate-y-1/2 shadow-2xl will-change-transform rounded-xl";

  // Feature card component (renders inside each animated slot)
  const FeatureCard = ({ index }: { index: number }) => {
    const feature = FEATURES[index];
    const Icon = feature.icon;
    return (
      <div className="h-full w-full bg-zinc-950 border border-zinc-800/80 rounded-xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group">
        {/* Accent gradient glow */}
        <div className={cn("absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-20 blur-2xl bg-gradient-to-br", feature.accent)} />

        <div className="relative z-10 flex flex-col gap-3 flex-1">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", feature.iconBg)}>
            <Icon className={cn("w-5 h-5", feature.iconColor)} />
          </div>
          <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight">{feature.title}</h3>
          <p className="text-zinc-400 text-[11px] sm:text-xs lg:text-sm leading-relaxed line-clamp-3">{feature.description}</p>
        </div>

        {/* Bottom accent line */}
        <div className={cn("absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-40", feature.accent)} />
      </div>
    );
  };

  return (
    <div ref={containerRef} className={cn("relative h-[300vh] w-full", className)}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 flex items-center justify-center">

          {/* Top Left Card — Analisis Tren */}
          <motion.div
            style={{ x: tlX, y: tlY, opacity: underCardsOpacity }}
            className={cn(baseCardClasses, "z-10")}
          >
            <FeatureCard index={0} />
          </motion.div>

          {/* Bottom Right Card — Create Caption */}
          <motion.div
            style={{ x: brX, y: brY, opacity: underCardsOpacity }}
            className={cn(baseCardClasses, "z-20")}
          >
            <FeatureCard index={2} />
          </motion.div>

          {/* Bottom Left Card — Auto Posting */}
          <motion.div
            style={{ x: blX, y: blY, opacity: underCardsOpacity }}
            className={cn(baseCardClasses, "z-30")}
          >
            <FeatureCard index={3} />
          </motion.div>

          {/* Top Right Card — Create Content (Hero — expands at the end) */}
          <motion.div
            style={{
              x: trX,
              y: trY,
              width: heroWidth,
              height: heroHeight,
              borderRadius: heroRadius,
            }}
            className={cn(baseCardClasses, "z-40")}
          >
            {/* Feature card content (visible while small) */}
            <motion.div style={{ opacity: underCardsOpacity }} className="absolute inset-0">
              <FeatureCard index={1} />
            </motion.div>

            {/* EndToEnd hero content (fades in as card expands) */}
            <motion.div
              style={{ opacity: heroContentOpacity }}
              className="absolute inset-0 bg-slate-950 dark:bg-black flex items-center justify-center overflow-hidden"
            >
              <div className="w-full">
                <EndToEnd />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default ScrollChoreography;
