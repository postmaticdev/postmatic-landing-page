"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { LOGIN_URL } from "@/constants";
import { getContainerMargins, cn } from "@/lib/utils";

const MIN_PRICE = 2000;
const MAX_PRICE = 2000000;
const PRICE_STEP = 2000;

export default function PricingPayAsYouGo() {
  const [price, setPrice] = useState<number>(100000); // Default Rp 100.000

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="pricing-pay-as-you-go" className="py-16 md:py-20 bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Glow background circles */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#0066FF]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className={cn(getContainerMargins(), "relative z-10")}>
        {/* Header Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 text-[#0066FF] dark:text-[#3385ff] text-xs font-semibold tracking-wider uppercase">
            <Zap className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Pay As You Go • Tanpa Langganan</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
            Simulasi Harga Token <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#0066FF] via-indigo-600 to-[#3385ff] dark:from-[#3385ff] dark:via-indigo-300 dark:to-[#66a3ff] bg-clip-text text-transparent">
              Bayar Sesuai Kebutuhan Konten
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed">
            Fleksibilitas penuh untuk bisnis Anda. Tanpa biaya bulanan terikat. Beli token sesuai budget, mulai dari <strong className="text-slate-900 dark:text-white">Rp 1.100 – Rp 2.000 / konten</strong> dan token berlaku selamanya.
          </p>
        </div>

        {/* Interactive Pricing Card Container */}
        <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-zinc-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-5 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Top border accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0066FF] via-indigo-600 to-[#3385ff]" />

          {/* Main Slider Section */}
          <div className="bg-white dark:bg-zinc-950/80 border border-slate-200/80 dark:border-zinc-800/90 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">Geser untuk Simulasi Budget:</span>
                <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                  {formatIDR(price)}
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 dark:text-zinc-400">Estimasi Jumlah Konten:</span>
                <div className="text-sm font-bold text-[#0066FF] dark:text-[#3385ff]">
                  {Math.floor(price / 2000)} - {Math.floor(price / 1100)} <span className="text-slate-500 dark:text-zinc-500 font-normal">konten (Rp 1.100 - Rp 2.000 / konten)</span>
                </div>
              </div>
            </div>

            {/* Slider Control */}
            <div className="py-3">
              <Slider
                value={[price]}
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                onValueChange={(val) => setPrice(val[0])}
                className="cursor-pointer [&>span:first-child]:bg-slate-200 dark:[&>span:first-child]:bg-zinc-700 [&>span:first-child]:h-2.5 [&>span:first-child>span]:bg-[#0066FF]"
              />
              <div className="flex justify-between items-center text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400 mt-3 font-medium">
                <span>{formatIDR(MIN_PRICE)}</span>
                <span>{formatIDR(1000000)}</span>
                <span>{formatIDR(MAX_PRICE)}</span>
              </div>
            </div>
          </div>

          {/* Included Features List */}
          <div className="border-t border-slate-200 dark:border-zinc-800/80 pt-6 mb-8">
            <h4 className="text-xs uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-semibold mb-4">Semua Paket Pay-As-You-Go Sudah Termasuk:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-zinc-300">
                <div className="w-5 h-5 rounded-full bg-[#0066FF]/15 text-[#0066FF] dark:text-[#3385ff] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong className="text-slate-900 dark:text-white">Token Berlaku Selamanya</strong> (No Expiration)</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-700 dark:text-zinc-300">
                <div className="w-5 h-5 rounded-full bg-[#0066FF]/15 text-[#0066FF] dark:text-[#3385ff] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>AI Visual Generator & Copywriting</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-700 dark:text-zinc-300">
                <div className="w-5 h-5 rounded-full bg-[#0066FF]/15 text-[#0066FF] dark:text-[#3385ff] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Auto Schedule & Multi-Channel Posting</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-700 dark:text-zinc-300">
                <div className="w-5 h-5 rounded-full bg-[#0066FF]/15 text-[#0066FF] dark:text-[#3385ff] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Tanpa Biaya Berlangganan Bulanan</span>
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#0066FF]/10 via-indigo-900/10 to-[#0066FF]/15 dark:from-[#0066FF]/20 dark:via-indigo-950/40 dark:to-zinc-950 p-4 sm:p-5 rounded-2xl border border-[#0066FF]/20 dark:border-indigo-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 dark:border-[#0066FF]/40 flex items-center justify-center text-[#0066FF] dark:text-[#3385ff] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">Siap Memulai Pemasaran AI Anda?</h5>
                <p className="text-xs text-slate-500 dark:text-zinc-400">Proses top-up instan & keamanan bertransaksi terjamin.</p>
              </div>
            </div>

            <Link href={LOGIN_URL} className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-[#0066FF]/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                <span>Beli Token Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
