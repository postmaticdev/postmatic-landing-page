import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Send } from "lucide-react";

export type NotFoundCopy = {
  label: string;
  title: string;
  description: string;
  home: string;
  contact: string;
  orVisit: string;
  cardLabel: string;
  cardCaption: string;
  links: Array<{ label: string; href: string }>;
};

/**
 * 404 view in the landing page's visual language: blue-square label, heavy
 * headline, rounded-full buttons, and a hero-style content card standing in
 * for the "0" — with the site's paper plane drifting off course.
 * Pure presentational component (no hooks), so it works both inside the
 * locale layout and in the bare root not-found.
 */
export default function NotFoundView({
  copy,
  homeHref,
  contactHref,
}: {
  copy: NotFoundCopy;
  homeHref: string;
  contactHref: string;
}) {
  return (
    <section className="relative w-full min-h-[100svh] pt-28 lg:pt-36 pb-20 font-sans overflow-hidden flex items-center">
      <style>{`
        @keyframes nf-float { 0%,100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-10px) rotate(-6deg); } }
        @keyframes nf-plane { 0%,100% { transform: translate(0,0) rotate(-18deg); } 50% { transform: translate(6px,-8px) rotate(-10deg); } }
        @keyframes nf-dash { to { stroke-dashoffset: -40; } }
      `}</style>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-14 lg:gap-8">

          {/* Left: copy */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="w-3.5 h-3.5 bg-[#0066FF]" />
              <span className="text-[10px] sm:text-sm font-bold tracking-widest text-neutral-800 dark:text-neutral-300 uppercase">
                {copy.label}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.05] mb-6">
              {copy.title}
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-medium leading-snug mb-10 max-w-xl">
              {copy.description}
            </p>

            <div className="flex flex-row items-center gap-3 sm:gap-4 mb-10">
              <Link
                href={homeHref}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white px-4 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold transition-all hover:scale-105 shadow-xl shadow-[#0066FF]/20 text-[13px] sm:text-base whitespace-nowrap"
              >
                {copy.home}
                <ArrowUpRight className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              </Link>
              <a
                href={contactHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 px-4 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold transition-all hover:scale-105 text-[13px] sm:text-base whitespace-nowrap"
              >
                {copy.contact}
                <ArrowUpRight className="text-neutral-500 w-[18px] h-[18px] sm:w-5 sm:h-5" />
              </a>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-[11px] md:text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-3">
                {copy.orVisit}
              </p>
              <nav className="flex flex-wrap gap-x-6 gap-y-2">
                {copy.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-[15px] font-medium text-neutral-700 dark:text-neutral-300 hover:text-[#0066FF] dark:hover:text-[#3385ff] transition-colors"
                  >
                    {l.label}
                    <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Right: 4 [card] 4 */}
          <div aria-hidden className="relative flex-1 flex items-center justify-center lg:justify-end select-none">
            {/* Off-course flight path + paper plane */}
            <svg
              viewBox="0 0 420 160"
              className="absolute -top-14 sm:-top-20 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 w-[300px] sm:w-[420px] h-auto pointer-events-none"
              fill="none"
            >
              <path
                d="M10 140 C 90 140, 120 40, 200 60 S 300 150, 360 40"
                stroke="#0066FF"
                strokeOpacity="0.35"
                strokeWidth="2"
                strokeDasharray="2 8"
                strokeLinecap="round"
                className="motion-safe:animate-[nf-dash_2.5s_linear_infinite]"
              />
            </svg>
            <Send
              className="absolute -top-14 sm:-top-20 right-[18%] lg:right-[2%] w-8 h-8 sm:w-10 sm:h-10 text-[#0066FF] motion-safe:animate-[nf-plane_4s_ease-in-out_infinite]"
              strokeWidth={1.75}
            />

            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-[7rem] sm:text-[10rem] lg:text-[12rem] font-extrabold leading-none tracking-tighter text-neutral-900 dark:text-white">
                4
              </span>

              {/* The "0": a hero-style content card */}
              <div className="relative w-[96px] sm:w-[140px] lg:w-[170px] aspect-[4/5] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 dark:border-neutral-800/50 bg-neutral-200 dark:bg-neutral-900 motion-safe:animate-[nf-float_5s_ease-in-out_infinite] [transform:rotate(-8deg)]">
                <Image
                  src="/content/almeira-feeds"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 170px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
                <div className="absolute top-0 left-0 p-3 sm:p-5 text-white">
                  <p className="text-sm sm:text-xl font-bold tracking-tight leading-tight">{copy.cardLabel}</p>
                  <p className="text-white/85 font-medium text-[10px] sm:text-xs">{copy.cardCaption}</p>
                </div>
              </div>

              <span className="text-[7rem] sm:text-[10rem] lg:text-[12rem] font-extrabold leading-none tracking-tighter text-[#0066FF]">
                4
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
