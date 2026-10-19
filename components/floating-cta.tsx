"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface PurchaseItem {
  name: string;
  tokens: number;
}

const PURCHASES: PurchaseItem[] = [
  { name: "H**** R****", tokens: 100000 },
  { name: "G***** A****", tokens: 50000 },
  { name: "H*****", tokens: 240000 },
  { name: "B*** S******", tokens: 120000 },
  { name: "A**** P******", tokens: 75000 },
  { name: "D**** K******", tokens: 200000 },
  { name: "R*** M******", tokens: 50000 },
  { name: "F**** H*****", tokens: 150000 },
  { name: "M******* A****", tokens: 300000 },
  { name: "S**** W*******", tokens: 100000 },
  { name: "N**** A******", tokens: 60000 },
  { name: "Y**** P*******", tokens: 180000 },
  { name: "E*** K********", tokens: 90000 },
  { name: "I***** S*******", tokens: 250000 },
  { name: "T**** A******", tokens: 50000 },
  { name: "W***** P******", tokens: 120000 },
  { name: "A*** F******", tokens: 100000 },
  { name: "K**** M******", tokens: 500000 },
  { name: "J**** S******", tokens: 220000 },
  { name: "R***** N*****", tokens: 160000 },
];

// Pola interval kemunculan: 10 detik sekali, 2 detik sekali, 15 detik sekali, 5 detik sekali, dan loop
const INTERVAL_PATTERN = [10_000, 2_000, 15_000, 5_000];
const VISIBLE_MS = 4_000;

export default function FloatingCta() {
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimer: number | undefined;
    let hideTimer: number | undefined;
    let patternIndex = 0;

    // Pick an initial random item on mount
    setIndex(Math.floor(Math.random() * PURCHASES.length));

    const scheduleNext = () => {
      const delay = INTERVAL_PATTERN[patternIndex % INTERVAL_PATTERN.length];
      patternIndex++;

      showTimer = window.setTimeout(() => {
        if (document.hidden) {
          scheduleNext();
          return;
        }

        setIndex((prev) => {
          const next = Math.floor(Math.random() * (PURCHASES.length - 1));
          return next >= prev ? next + 1 : next;
        });

        setVisible(true);

        hideTimer = window.setTimeout(() => {
          setVisible(false);
          // Setelah menghilang, jalankan delay berikutnya sesuai pola urutan
          scheduleNext();
        }, VISIBLE_MS);
      }, delay);
    };

    scheduleNext();

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const item = PURCHASES[index];
  const isEn = locale === "en";
  const label = isEn
    ? `${item.name} purchased ${item.tokens.toLocaleString("en-US")} Tokens`
    : `${item.name} Membeli ${item.tokens.toLocaleString("id-ID")} Token`;

  return (
    <a
      href="#pricing"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 rounded-full bg-[#0066FF] hover:bg-blue-600 text-white pl-3.5 pr-3 py-2 text-xs sm:text-sm font-semibold shadow-xl shadow-[#0066FF]/30 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] max-w-[calc(100vw-2rem)]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
      <span className="truncate">{label}</span>
      <ArrowUpRight className="w-4 h-4 shrink-0 opacity-80" strokeWidth={2.5} />
    </a>
  );
}
