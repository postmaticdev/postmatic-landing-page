"use client";

import React, { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SIGNUP_URL } from "@/constants";
import { getContainerMargins, cn } from "@/lib/utils";

interface CategoryProduct {
  id: string;
  name: string;
  icon: string;
  productTitle: string;
  tag: string;
  image: string;
  caption: string;
  hashtags: string[];
  cta: string;
  schedule: string;
}

const CATEGORIES: CategoryProduct[] = [
  {
    id: "kuliner",
    name: "Kuliner",
    icon: "🍜",
    productTitle: "Ramen Signature Miso Tori",
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop",
    caption: "Kuah miso yang creamy, dipadukan dengan chashu ayam tender. Rasa yang bikin kangen dari pagi sampai malam. Datang ke outlet kami hari ini!",
    hashtags: ["#RamenJakarta", "#KulinerJakarta", "#JajanEnak", "#Foodie"],
    cta: "Pesan Sekarang",
    schedule: "Jumat, 18.30 WIB",
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "👗",
    productTitle: "Oversized Linen Shirt Cream",
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop",
    caption: "Tampil effortless dan elegan setiap hari. Bahan linen premium yang sejuk, cocok untuk ngantor maupun nongkrong santai. Grab yours now!",
    hashtags: ["#FashionOOTD", "#LinenShirt", "#BajuCasual", "#LocalBrand"],
    cta: "Beli Sekarang",
    schedule: "Sabtu, 12.00 WIB",
  },
  {
    id: "kecantikan",
    name: "Kecantikan",
    icon: "✨",
    productTitle: "Glow Radiance Vitamin C Serum",
    tag: "POPULAR",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    caption: "Rahasia kulit cerah dan bebas noda hitam hanya dalam 14 hari. Diformulasikan dengan Pure Vitamin C & Hyaluronic Acid. Coba sekarang!",
    hashtags: ["#SkincareRoutine", "#GlowSkin", "#SerumLokal", "#BeautyHacks"],
    cta: "Klaim Diskon 20%",
    schedule: "Rabu, 19.00 WIB",
  },
  {
    id: "properti",
    name: "Properti",
    icon: "🏠",
    productTitle: "Rumah Minimalis ModernLand",
    tag: "HOT DEAL",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    caption: "Hunian impian keluarga di lokasi paling strategis. Akses 5 menit ke tol, DP 0%, dan free kanopi. Wujudkan rumah idaman Anda tahun ini!",
    hashtags: ["#RumahDijual", "#PropertiMurah", "#RumahImpian", "#InvestasiProperti"],
    cta: "Hubungi Agent",
    schedule: "Minggu, 10.00 WIB",
  },
  {
    id: "jasa",
    name: "Jasa",
    icon: "🛠",
    productTitle: "Jasa Cleaning & Hydro Vacuum",
    tag: "SERVICE",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    caption: "Sofa dan kasur bebas tungau & debu dalam 60 menit. Dikerjakan oleh tim profesional dengan alat sertifikasi internasional. Booking hari ini!",
    hashtags: ["#JasaCleaning", "#VacuumTungau", "#RumahBersih", "#HomeService"],
    cta: "Booking Jadwal",
    schedule: "Senin, 09.00 WIB",
  },
];

export default function OurProduct() {
  const [selectedCategory, setSelectedCategory] = useState<string>("kuliner");

  const currentItem = CATEGORIES.find((item) => item.id === selectedCategory) || CATEGORIES[0];

  return (
    <section id="our-product" className="py-16 md:py-20 bg-slate-50/70 dark:bg-[#0A0A0A] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0066FF]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className={cn(getContainerMargins(), "relative z-10")}>
        {/* Top Header Badge */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 text-[#0066FF] dark:text-[#3385ff] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Coba Sekarang</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Lihat bagaimana satu produk <br className="hidden sm:inline" />
            berubah menjadi <span className="bg-gradient-to-r from-[#0066FF] to-indigo-600 dark:from-[#3385ff] dark:to-indigo-300 bg-clip-text text-transparent italic font-normal">konten siap posting.</span>
          </h2>
        </div>

        {/* Subtitle */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed">
            Pilih kategori bisnis Anda, lalu lihat preview konten yang bisa dihasilkan Postmatic.
          </p>
        </div>

        {/* Category Pills Tab (Horizontal Scroll on Mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 mb-12 overflow-x-auto scrollbar-hide py-2 px-1 sm:justify-center flex-nowrap sm:flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 border whitespace-nowrap shrink-0 cursor-pointer",
                  isActive
                    ? "bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-[#0066FF]/25 scale-105"
                    : "bg-white dark:bg-zinc-950/80 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-[#0066FF] dark:hover:text-white hover:border-[#0066FF]/40 dark:hover:border-zinc-700"
                )}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive 2-Column Preview Box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Left Column: Social Media Post Card (Instagram Style) */}
          <div className="bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/90 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between transition-all duration-300">
            <div>
              {/* Instagram Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0066FF] to-indigo-600 flex items-center justify-center p-[2px]">
                    <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center text-[10px] font-bold text-slate-900 dark:text-white">
                      B
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">brand.anda</span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-500">{currentItem.schedule}</span>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-slate-400 dark:text-zinc-400 cursor-pointer" />
              </div>

              {/* Main Image Container */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/60 group">
                <img
                  src={currentItem.image}
                  alt={currentItem.productTitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* AI Generated Badge (Top Right) */}
                <div className="absolute top-3 right-3 bg-slate-900/80 dark:bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-white border border-white/10 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#3385ff]" />
                  <span>AI Generated</span>
                </div>

                {/* Bottom Overlay Title & Tag */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <span className="text-[10px] font-bold tracking-widest text-[#66a3ff] uppercase block mb-1">
                    {currentItem.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {currentItem.productTitle}
                  </h3>
                </div>
              </div>

              {/* Engagement Bar */}
              <div className="flex items-center justify-between mb-3 text-slate-600 dark:text-zinc-300">
                <div className="flex items-center gap-4">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500 cursor-pointer" />
                  <MessageCircle className="w-5 h-5 cursor-pointer hover:text-[#0066FF] dark:hover:text-white" />
                  <Send className="w-5 h-5 cursor-pointer hover:text-[#0066FF] dark:hover:text-white" />
                </div>
                <Bookmark className="w-5 h-5 cursor-pointer hover:text-[#0066FF] dark:hover:text-white" />
              </div>

              {/* Caption Preview */}
              <div className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-white mr-2">brand.anda</span>
                {currentItem.caption}
              </div>

              {/* Hashtags */}
              <div className="mt-2.5 flex flex-wrap gap-1.5 text-xs text-[#0066FF] dark:text-[#3385ff] font-medium">
                {currentItem.hashtags.map((tag, idx) => (
                  <span key={idx}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Output Details Box */}
          <div className="bg-white dark:bg-zinc-950/90 border border-slate-200/80 dark:border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              {/* Header Label */}
              <div className="mb-4">
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#0066FF] dark:text-[#3385ff] block mb-1">
                  HASIL AI
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {currentItem.productTitle}
                </h3>
              </div>

              {/* Caption Section */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-zinc-400 block mb-2">
                  CAPTION
                </span>
                <p className="text-slate-700 dark:text-zinc-300 text-sm leading-relaxed bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-4">
                  {currentItem.caption}
                </p>
              </div>

              {/* Hashtag Section */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-zinc-400 block mb-2">
                  HASHTAG
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentItem.hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-medium text-slate-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA & Recommended Schedule Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/80 dark:border-zinc-800/80 mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-zinc-400 block mb-1">
                    CALL TO ACTION
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{currentItem.cta}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-zinc-400 block mb-1">
                    JADWAL REKOMENDASI
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{currentItem.schedule}</span>
                </div>
              </div>
            </div>

            {/* Bottom Primary Action Button */}
            <div>
              <Link href={SIGNUP_URL}>
                <Button className="w-full bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-sm sm:text-base py-6 rounded-full shadow-lg shadow-[#0066FF]/25 hover:scale-[1.01] transition-all duration-300">
                  Buat konten untuk bisnis saya
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
