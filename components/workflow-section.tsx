"use client";

import { User, Calendar, Bot, Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function WorkflowSection() {
  const t = useTranslations("landing.workflow");
  return (
    <section className="w-full py-16 md:py-32 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <style>{`
          @keyframes ring-split-1 {
            0% { stroke-dashoffset: 90; opacity: 1; }
            10% { stroke-dashoffset: 0; opacity: 1; }
            25% { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 90; opacity: 0; }
          }
          @keyframes line-1 {
            0%, 9.9% { stroke-dashoffset: 100; opacity: 0; }
            10% { stroke-dashoffset: 100; opacity: 1; }
            20% { stroke-dashoffset: 0; opacity: 1; }
            35% { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 100; opacity: 0; }
          }
          @keyframes ring-split-2 {
            0%, 19.9% { stroke-dashoffset: 90; opacity: 0; }
            20% { stroke-dashoffset: 90; opacity: 1; }
            30% { stroke-dashoffset: 0; opacity: 1; }
            45% { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 90; opacity: 0; }
          }
          @keyframes line-2 {
            0%, 29.9% { stroke-dashoffset: 100; opacity: 0; }
            30% { stroke-dashoffset: 100; opacity: 1; }
            40% { stroke-dashoffset: 0; opacity: 1; }
            55% { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 100; opacity: 0; }
          }
          @keyframes ring-split-3 {
            0%, 39.9% { stroke-dashoffset: 105; opacity: 0; }
            40% { stroke-dashoffset: 105; opacity: 1; }
            50% { stroke-dashoffset: 0; opacity: 1; }
            65% { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 105; opacity: 0; }
          }
          @keyframes line-3 {
            0%, 49.9% { stroke-dashoffset: 100; opacity: 0; }
            50% { stroke-dashoffset: 100; opacity: 1; }
            60% { stroke-dashoffset: 0; opacity: 1; }
            75% { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 100; opacity: 0; }
          }
          @keyframes ring-split-4 {
            0%, 59.9% { stroke-dashoffset: 90; opacity: 0; }
            60% { stroke-dashoffset: 90; opacity: 1; }
            70% { stroke-dashoffset: 0; opacity: 1; }
            85% { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 90; opacity: 0; }
          }
          @keyframes curve-lines {
            0%, 69.9% { stroke-dashoffset: 100; opacity: 0; }
            70% { stroke-dashoffset: 100; opacity: 1; }
            85% { stroke-dashoffset: 0; opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0; }
          }
          @keyframes ring-split-5 {
            0%, 84.9% { stroke-dashoffset: 80; opacity: 0; }
            85% { stroke-dashoffset: 80; opacity: 1; }
            95% { stroke-dashoffset: 0; opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0; }
          }

          .line-1 { stroke-dasharray: 100; animation: line-1 3.5s linear infinite; }
          .line-2 { stroke-dasharray: 100; animation: line-2 3.5s linear infinite; }
          .line-3 { stroke-dasharray: 100; animation: line-3 3.5s linear infinite; }
          .water-curve { stroke-dasharray: 100; animation: curve-lines 3.5s linear infinite; }
          
          .ring-1-top { stroke-dasharray: 90 200; animation: ring-split-1 3.5s linear infinite; transform: rotate(180deg); transform-origin: 100px 200px; }
          .ring-1-bottom { stroke-dasharray: 90 200; animation: ring-split-1 3.5s linear infinite; transform: rotate(180deg) scale(1, -1); transform-origin: 100px 200px; }
          
          .ring-2-top { stroke-dasharray: 90 200; animation: ring-split-2 3.5s linear infinite; transform: rotate(180deg); transform-origin: 300px 200px; }
          .ring-2-bottom { stroke-dasharray: 90 200; animation: ring-split-2 3.5s linear infinite; transform: rotate(180deg) scale(1, -1); transform-origin: 300px 200px; }
          
          .ring-3-top { stroke-dasharray: 105 250; animation: ring-split-3 3.5s linear infinite; transform: rotate(180deg); transform-origin: 500px 200px; }
          .ring-3-bottom { stroke-dasharray: 105 250; animation: ring-split-3 3.5s linear infinite; transform: rotate(180deg) scale(1, -1); transform-origin: 500px 200px; }
          
          .ring-4-top { stroke-dasharray: 90 200; animation: ring-split-4 3.5s linear infinite; transform: rotate(180deg); transform-origin: 700px 200px; }
          .ring-4-bottom { stroke-dasharray: 90 200; animation: ring-split-4 3.5s linear infinite; transform: rotate(180deg) scale(1, -1); transform-origin: 700px 200px; }
          
          .ring-5-top-1 { stroke-dasharray: 80 200; animation: ring-split-5 3.5s linear infinite; transform: rotate(180deg); transform-origin: 900px 80px; }
          .ring-5-bottom-1 { stroke-dasharray: 80 200; animation: ring-split-5 3.5s linear infinite; transform: rotate(180deg) scale(1, -1); transform-origin: 900px 80px; }
          
          .ring-5-top-2 { stroke-dasharray: 80 200; animation: ring-split-5 3.5s linear infinite; transform: rotate(180deg); transform-origin: 900px 160px; }
          .ring-5-bottom-2 { stroke-dasharray: 80 200; animation: ring-split-5 3.5s linear infinite; transform: rotate(180deg) scale(1, -1); transform-origin: 900px 160px; }
          
          .ring-5-top-3 { stroke-dasharray: 80 200; animation: ring-split-5 3.5s linear infinite; transform: rotate(180deg); transform-origin: 900px 240px; }
          .ring-5-bottom-3 { stroke-dasharray: 80 200; animation: ring-split-5 3.5s linear infinite; transform: rotate(180deg) scale(1, -1); transform-origin: 900px 240px; }
          
          .ring-5-top-4 { stroke-dasharray: 80 200; animation: ring-split-5 3.5s linear infinite; transform: rotate(180deg); transform-origin: 900px 320px; }
          .ring-5-bottom-4 { stroke-dasharray: 80 200; animation: ring-split-5 3.5s linear infinite; transform: rotate(180deg) scale(1, -1); transform-origin: 900px 320px; }
        `}</style>
        
        {/* Header Section */}
        <div data-reveal="blur" className="text-center max-w-3xl mx-auto mb-8 md:mb-24">
          <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase mb-4 block">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 dark:text-white tracking-tight mb-6">
            {t.rich("title", { hl: (chunks) => <span className="text-[#0066FF]">{chunks}</span> })}
          </h2>
          <p className="text-[13px] md:text-base text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
            {t.rich("description", { br: () => <br className="hidden md:block" /> })}
          </p>
        </div>

        {/* Diagram Section */}
        <div data-draw-scope className="relative w-full max-w-5xl mx-auto aspect-[4/3] sm:aspect-[2/1] md:aspect-[5/2] sm:min-h-[400px]">
          
          {/* SVG Connecting Lines */}
          <svg 
            viewBox="0 0 1000 400" 
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            {/* Base Gray Lines (Connecting edges) */}
            <path data-draw="clamp(top 70%)" d="M 128 200 L 272 200" stroke="#E5E7EB" strokeWidth="2" className="dark:stroke-neutral-800" />
            <path data-draw="clamp(top 62%)" d="M 328 200 L 468 200" stroke="#E5E7EB" strokeWidth="2" className="dark:stroke-neutral-800" />
            <path data-draw="clamp(top 54%)" d="M 532 200 L 672 200" stroke="#E5E7EB" strokeWidth="2" className="dark:stroke-neutral-800" />
            
            {/* Curved gray lines to socials */}
            <path data-draw="clamp(top 44%)" d="M 728 200 C 780 200, 820 80, 876 80" fill="none" stroke="#E5E7EB" strokeWidth="2" className="dark:stroke-neutral-800" />
            <path data-draw="clamp(top 44%)" d="M 728 200 C 780 200, 820 160, 876 160" fill="none" stroke="#E5E7EB" strokeWidth="2" className="dark:stroke-neutral-800" />
            <path data-draw="clamp(top 44%)" d="M 728 200 C 780 200, 820 240, 876 240" fill="none" stroke="#E5E7EB" strokeWidth="2" className="dark:stroke-neutral-800" />
            <path data-draw="clamp(top 44%)" d="M 728 200 C 780 200, 820 320, 876 320" fill="none" stroke="#E5E7EB" strokeWidth="2" className="dark:stroke-neutral-800" />

            {/* Flowing Water Animation */}
            {/* Main trunk split into sequential lines */}
            <path d="M 128 200 L 272 200" pathLength="100" fill="none" stroke="#0066FF" strokeWidth="3" className="line-1" strokeLinecap="round" />
            <path d="M 328 200 L 468 200" pathLength="100" fill="none" stroke="#0066FF" strokeWidth="3" className="line-2" strokeLinecap="round" />
            <path d="M 532 200 L 672 200" pathLength="100" fill="none" stroke="#0066FF" strokeWidth="3" className="line-3" strokeLinecap="round" />

            {/* From Robot to Socials (Spreading simultaneously like branches of water) */}
            <path d="M 728 200 C 780 200, 820 80, 876 80" pathLength="100" fill="none" stroke="#0066FF" strokeWidth="3" className="water-curve" strokeLinecap="round" />
            <path d="M 728 200 C 780 200, 820 160, 876 160" pathLength="100" fill="none" stroke="#0066FF" strokeWidth="3" className="water-curve" strokeLinecap="round" />
            <path d="M 728 200 C 780 200, 820 240, 876 240" pathLength="100" fill="none" stroke="#0066FF" strokeWidth="3" className="water-curve" strokeLinecap="round" />
            <path d="M 728 200 C 780 200, 820 320, 876 320" pathLength="100" fill="none" stroke="#0066FF" strokeWidth="3" className="water-curve" strokeLinecap="round" />

            {/* Animated Rings around nodes (Split Top and Bottom) */}
            {/* Node 1 */}
            <circle cx="100" cy="200" r="28" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-1-top" strokeLinecap="round" />
            <circle cx="100" cy="200" r="28" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-1-bottom" strokeLinecap="round" />
            
            {/* Node 2 */}
            <circle cx="300" cy="200" r="28" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-2-top" strokeLinecap="round" />
            <circle cx="300" cy="200" r="28" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-2-bottom" strokeLinecap="round" />
            
            {/* Node 3 */}
            <circle cx="500" cy="200" r="32" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-3-top" strokeLinecap="round" />
            <circle cx="500" cy="200" r="32" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-3-bottom" strokeLinecap="round" />
            
            {/* Node 4 */}
            <circle cx="700" cy="200" r="28" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-4-top" strokeLinecap="round" />
            <circle cx="700" cy="200" r="28" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-4-bottom" strokeLinecap="round" />
            
            {/* Node 5 (Socials) */}
            <circle cx="900" cy="80" r="24" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-5-top-1" strokeLinecap="round" />
            <circle cx="900" cy="80" r="24" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-5-bottom-1" strokeLinecap="round" />
            
            <circle cx="900" cy="160" r="24" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-5-top-2" strokeLinecap="round" />
            <circle cx="900" cy="160" r="24" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-5-bottom-2" strokeLinecap="round" />
            
            <circle cx="900" cy="240" r="24" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-5-top-3" strokeLinecap="round" />
            <circle cx="900" cy="240" r="24" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-5-bottom-3" strokeLinecap="round" />
            
            <circle cx="900" cy="320" r="24" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-5-top-4" strokeLinecap="round" />
            <circle cx="900" cy="320" r="24" fill="none" stroke="#0066FF" strokeWidth="3" className="ring-5-bottom-4" strokeLinecap="round" />
          </svg>

          {/* Glowing Blur for Center Node */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-[#0066FF]/20 blur-3xl rounded-full pointer-events-none z-0"></div>

          {/* Nodes */}
          
          {/* Node 1: User */}
          <div data-reveal="scale" data-reveal-start="clamp(top 88%)" data-reveal-end="clamp(top 76%)" className="absolute top-[50%] left-[10%] -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-14 md:h-14 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-100 dark:border-neutral-800">
            <User className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 dark:text-neutral-300" strokeWidth={2} />
          </div>

          {/* Node 2: Calendar */}
          <div data-reveal="scale" data-reveal-start="clamp(top 88%)" data-reveal-end="clamp(top 68%)" className="absolute top-[50%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-14 md:h-14 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-100 dark:border-neutral-800">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 dark:text-neutral-300" strokeWidth={2} />
          </div>

          {/* Node 3: Postmatic (Center) */}
          <div data-reveal="scale" data-reveal-start="clamp(top 88%)" data-reveal-end="clamp(top 60%)" className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-[#0066FF] rounded-full flex items-center justify-center shadow-xl shadow-[#0066FF]/30">
            <Image src="/logo-white.png" alt="Postmatic" width={40} height={40} className="w-6 h-6 md:w-8 md:h-8 object-contain select-none" />
          </div>

          {/* Node 4: Robot */}
          <div data-reveal="scale" data-reveal-start="clamp(top 88%)" data-reveal-end="clamp(top 52%)" className="absolute top-[50%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-14 md:h-14 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-100 dark:border-neutral-800">
            <Bot className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 dark:text-neutral-300" strokeWidth={2} />
          </div>

          {/* Social Nodes */}
          {/* FB */}
          <div data-reveal="scale" data-reveal-start="clamp(top 88%)" data-reveal-end="clamp(top 46%)" className="absolute top-[20%] left-[90%] -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-100 dark:border-neutral-800">
            <Facebook className="w-4 h-4 text-neutral-600 dark:text-neutral-300" strokeWidth={2} />
          </div>
          {/* IG */}
          <div data-reveal="scale" data-reveal-start="clamp(top 88%)" data-reveal-end="clamp(top 44%)" className="absolute top-[40%] left-[90%] -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-100 dark:border-neutral-800">
            <Instagram className="w-4 h-4 text-neutral-600 dark:text-neutral-300" strokeWidth={2} />
          </div>
          {/* LinkedIn */}
          <div data-reveal="scale" data-reveal-start="clamp(top 88%)" data-reveal-end="clamp(top 42%)" className="absolute top-[60%] left-[90%] -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-100 dark:border-neutral-800">
            <Linkedin className="w-4 h-4 text-neutral-600 dark:text-neutral-300" strokeWidth={2} />
          </div>
          {/* TikTok */}
          <div data-reveal="scale" data-reveal-start="clamp(top 88%)" data-reveal-end="clamp(top 40%)" className="absolute top-[80%] left-[90%] -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-100 dark:border-neutral-800">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-neutral-300">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
