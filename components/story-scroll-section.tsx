'use client';

import { useState } from 'react';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { SIGNUP_URL, VIDEO_INTRODUCTION_URL, VIDEO_TUTORIAL_URL } from '@/constants';
import Link from 'next/link';
import { ArrowRight, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Sparkles, ThumbsUp, Repeat2, Instagram, Linkedin } from 'lucide-react';
import { MacWindow } from '@/components/custom/mac-window';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────
// OurProduct embedded data
// ─────────────────────────────────────────────
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
    id: 'kuliner',
    name: 'Kuliner',
    icon: '🍜',
    productTitle: 'Ramen Signature Miso Tori',
    tag: 'NEW',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop',
    caption: 'Kuah miso yang creamy, dipadukan dengan chashu ayam tender. Rasa yang bikin kangen dari pagi sampai malam. Datang ke outlet kami hari ini!',
    hashtags: ['#RamenJakarta', '#KulinerJakarta', '#JajanEnak', '#Foodie'],
    cta: 'Pesan Sekarang',
    schedule: 'Jumat, 18.30 WIB',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: '👗',
    productTitle: 'Oversized Linen Shirt Cream',
    tag: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop',
    caption: 'Tampil effortless dan elegan setiap hari. Bahan linen premium yang sejuk, cocok untuk ngantor maupun nongkrong santai. Grab yours now!',
    hashtags: ['#FashionOOTD', '#LinenShirt', '#BajuCasual', '#LocalBrand'],
    cta: 'Beli Sekarang',
    schedule: 'Sabtu, 12.00 WIB',
  },
  {
    id: 'kecantikan',
    name: 'Kecantikan',
    icon: '✨',
    productTitle: 'Glow Radiance Vitamin C Serum',
    tag: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    caption: 'Rahasia kulit cerah dan bebas noda hitam hanya dalam 14 hari. Diformulasikan dengan Pure Vitamin C & Hyaluronic Acid. Coba sekarang!',
    hashtags: ['#SkincareRoutine', '#GlowSkin', '#SerumLokal', '#BeautyHacks'],
    cta: 'Klaim Diskon 20%',
    schedule: 'Rabu, 19.00 WIB',
  },
  {
    id: 'properti',
    name: 'Properti',
    icon: '🏠',
    productTitle: 'Rumah Minimalis ModernLand',
    tag: 'HOT DEAL',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    caption: 'Hunian impian keluarga di lokasi paling strategis. Akses 5 menit ke tol, DP 0%, dan free kanopi. Wujudkan rumah idaman Anda tahun ini!',
    hashtags: ['#RumahDijual', '#PropertiMurah', '#RumahImpian', '#InvestasiProperti'],
    cta: 'Hubungi Agent',
    schedule: 'Minggu, 10.00 WIB',
  },
  {
    id: 'jasa',
    name: 'Jasa',
    icon: '🛠',
    productTitle: 'Jasa Cleaning & Hydro Vacuum',
    tag: 'SERVICE',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
    caption: 'Sofa dan kasur bebas tungau & debu dalam 60 menit. Dikerjakan oleh tim profesional dengan alat sertifikasi internasional. Booking hari ini!',
    hashtags: ['#JasaCleaning', '#VacuumTungau', '#RumahBersih', '#HomeService'],
    cta: 'Booking Jadwal',
    schedule: 'Senin, 09.00 WIB',
  },
];

// ─────────────────────────────────────────────
// Video URL helper
// ─────────────────────────────────────────────
function buildVideoUrl(baseUrl: string, playlist: string) {
  const url = new URL(baseUrl);
  url.searchParams.set('rel', '0');
  url.searchParams.set('showinfo', '0');
  url.searchParams.set('controls', '1');
  url.searchParams.set('modestbranding', '1');
  url.searchParams.set('loop', '1');
  url.searchParams.set('playlist', playlist);
  url.searchParams.set('autoplay', '0');
  url.searchParams.set('mute', '0');
  url.searchParams.set('fs', '1');
  return url.toString();
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function StoryScrollSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('kuliner');
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'x' | 'linkedin'>('instagram');
  const currentItem = CATEGORIES.find((item) => item.id === selectedCategory) || CATEGORIES[0];

  const introVideoUrl = buildVideoUrl(VIDEO_INTRODUCTION_URL, 'LRGvK7NwriE');
  const tutorialVideoUrl = buildVideoUrl(VIDEO_TUTORIAL_URL, 'rEkeRl3WkFk');

  return (
    <FlowArt aria-label="Postmatic Story — Cara Kerja Postmatic">

      {/* ── Section 1: What we are ── */}
      <FlowSection
        aria-label="Apa itu Postmatic"
        style={{ backgroundColor: '#0066FF', color: '#fff' }}
      >
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] opacity-80">
          01 — Apa itu Postmatic
        </p>
        <hr className="my-[1.2vw] border-none border-t border-white/30" />
        <div>
          <h2 className="text-[clamp(2.25rem,8.25vw,8.5rem)] font-black leading-[0.85] uppercase tracking-tight">
            Satu<br />Input.<br />Ribuan<br />Konten.
          </h2>
        </div>
        <hr className="my-[1.2vw] border-none border-t border-white/30" />
        <p className="mt-auto max-w-[55ch] text-[clamp(0.85rem,1.7vw,1.35rem)] font-normal leading-relaxed opacity-90">
          Postmatic adalah platform AI yang secara otomatis merancang, menulis, dan menjadwalkan
          konten media sosial bisnis Anda — hanya dari satu kali pengisian profil bisnis.
        </p>
      </FlowSection>

      {/* ── Section 2: The problem ── */}
      <FlowSection
        aria-label="Masalah yang kami selesaikan"
        style={{ backgroundColor: '#090d16', color: '#fff' }}
      >
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] opacity-70">
          02 — Masalah yang Kami Selesaikan
        </p>
        <hr className="my-[1.2vw] border-none border-t border-white/20" />
        <div>
          <h2 className="text-[clamp(2.25rem,8.25vw,8.5rem)] font-black leading-[0.85] uppercase tracking-tight">
            Habis<br />Waktu<br />Buat<br />Konten?
          </h2>
        </div>
        <hr className="my-[1.2vw] border-none border-t border-white/20" />
        <p className="max-w-[55ch] text-[clamp(0.85rem,1.7vw,1.35rem)] font-normal leading-relaxed opacity-80">
          Rata-rata UMKM menghabiskan 15–25 jam per minggu hanya untuk membuat konten. Dengan
          Postmatic, waktu itu bisa dikembalikan — sepenuhnya.
        </p>
        <hr className="my-[1.2vw] border-none border-t border-white/20" />
        <div className="flex flex-wrap gap-[2vw]">
          <div className="min-w-[160px] flex-1">
            <p className="mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#3385ff]">Riset Tren</p>
            <p className="text-[clamp(0.75rem,0.95vw,0.88rem)] leading-relaxed opacity-60">
              AI kami memantau tren 24/7 di semua platform dan mengidentifikasi konten yang paling relevan untuk bisnis Anda.
            </p>
          </div>
          <div className="min-w-[160px] flex-1">
            <p className="mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#3385ff]">Desain Visual</p>
            <p className="text-[clamp(0.75rem,0.95vw,0.88rem)] leading-relaxed opacity-60">
              Konten visual berkualitas tinggi dihasilkan otomatis sesuai identitas brand Anda tanpa perlu desainer.
            </p>
          </div>
          <div className="min-w-[160px] flex-1">
            <p className="mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#3385ff]">Caption & Hashtag</p>
            <p className="text-[clamp(0.75rem,0.95vw,0.88rem)] leading-relaxed opacity-60">
              Teks caption yang menarik dan hashtag yang tepat dibuat secara otomatis, disesuaikan dengan gaya bisnis Anda.
            </p>
          </div>
        </div>
        <hr className="my-[1.2vw] border-none border-t border-white/20" />
        <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(0.85rem,1.7vw,1.35rem)] font-normal leading-relaxed opacity-75">
          Fokus pada bisnis Anda. Biarkan Postmatic yang menangani semua konten marketing.
        </p>
      </FlowSection>

      {/* ── Section 3: Introduction (Apa itu Postmatic — Video) ── */}
      <FlowSection
        aria-label="Apa itu Postmatic — Video"
        style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}
      >
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] opacity-60">
          03 — Mengenal Postmatic
        </p>
        <hr className="my-[1.2vw] border-none border-t border-black/20" />

        {/* Two-column layout: heading+text left, video right */}
        <div className="flex flex-col lg:flex-row items-center gap-[3vw] flex-1">
          {/* Left: text */}
          <div className="flex flex-col justify-center gap-3 lg:max-w-[42%]">
            <h2 className="text-[clamp(1.5rem,4.5vw,4.5rem)] font-black leading-[0.9] uppercase tracking-tight">
              Apa itu<br />
              <span className="bg-gradient-to-r from-[#0066FF] to-indigo-600 bg-clip-text text-transparent">
                Postmatic?
              </span>
            </h2>
            <p className="text-[clamp(0.75rem,0.95vw,0.9rem)] leading-relaxed opacity-70 max-w-[45ch]">
              Postmatic adalah platform AI yang otomatis membantu bisnis dalam mengelola social media mereka — dari menganalisis tren, membuat konten, menulis caption, menjadwalkan posting, hingga mengelola iklan hanya dengan sekali input informasi bisnis.
            </p>
          </div>

          {/* Right: MacWindow video embed */}
          <div className="w-full lg:flex-1 max-w-2xl">
            <MacWindow keepAspectRatio hoverZoom={false} title="What is Postmatic?">
              <iframe
                className="w-full h-full rounded"
                src={introVideoUrl}
                title="Overview Postmatic"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
                allowFullScreen
              />
            </MacWindow>
          </div>
        </div>
      </FlowSection>

      {/* ── Section 4: OurProduct (Demo kategori produk) ── */}
      <FlowSection
        aria-label="Demo produk Postmatic"
        style={{ backgroundColor: '#020617', color: '#fff' }}
      >
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] opacity-70">
          04 — Lihat Hasilnya
        </p>
        <hr className="my-[1.2vw] border-none border-t border-white/20" />

        {/* Two-column layout: Left (Header + Category tabs), Right (Platform switcher + Preview card) */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 flex-1 w-full mt-1">

          {/* LEFT COLUMN: Header & Category Tabs */}
          <div className="flex flex-col gap-4 lg:w-[38%] shrink-0">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[clamp(1.35rem,3.375vw,3.375rem)] font-black leading-[0.95] uppercase tracking-tight">
                Satu Produk.
                <br />
                <span className="text-[#3385ff]">Konten Siap Posting.</span>
              </h2>
              <p className="text-[clamp(0.75rem,0.9vw,0.85rem)] opacity-60 max-w-[50ch] mt-0.5">
                Pilih kategori bisnis Anda, lalu lihat preview konten yang bisa dihasilkan Postmatic secara otomatis di berbagai platform media sosial.
              </p>
            </div>

            {/* Category tabs */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2 block">Pilih Kategori Bisnis:</span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={cn(
                        'px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 border whitespace-nowrap cursor-pointer',
                        isActive
                          ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-[#0066FF]/30 scale-105'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20',
                      )}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Platform Switcher + Preview Card */}
          <div className="flex-1 flex flex-col items-center lg:items-end w-full min-w-0">

            {/* Platform switcher buttons */}
            <div className="flex items-center gap-2 mb-3 justify-center lg:justify-end w-full">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-400 mr-1 hidden sm:inline">Platform:</span>
              {([
                { id: 'instagram' as const, label: 'Instagram', icon: <Instagram className="w-3.5 h-3.5" />, gradient: 'from-pink-500 via-rose-500 to-purple-600' },
                { id: 'x' as const, label: 'X', icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, gradient: 'from-zinc-400 to-zinc-600' },
                { id: 'linkedin' as const, label: 'LinkedIn', icon: <Linkedin className="w-3.5 h-3.5" />, gradient: 'from-[#0066FF] to-blue-800' },
              ]).map((platform) => {
                const isActive = selectedPlatform === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={cn(
                      'px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 border whitespace-nowrap cursor-pointer',
                      isActive
                        ? `bg-gradient-to-r ${platform.gradient} text-white border-transparent shadow-lg scale-105`
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20',
                    )}
                  >
                    {platform.icon}
                    <span>{platform.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Preview Card */}
            <div className="w-full flex justify-center lg:justify-end">

              {/* ═══ INSTAGRAM PREVIEW ═══ */}
              {selectedPlatform === 'instagram' && (
                <div key="ig" className="w-full max-w-lg bg-black border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row animate-in fade-in duration-300">
                  {/* LEFT: Post Image */}
                  <div className="relative sm:w-[48%] aspect-square sm:aspect-auto shrink-0 bg-zinc-900 overflow-hidden">
                    <img src={currentItem.image} alt={currentItem.productTitle} className="w-full h-full object-cover" />
                    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-semibold text-white border border-white/10 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#3385ff]" /> AI Generated
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                      <span className="text-[8px] font-bold tracking-widest text-[#66a3ff] uppercase block">{currentItem.tag}</span>
                      <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">{currentItem.productTitle}</h3>
                    </div>
                  </div>
                  {/* RIGHT: Comment & Detail Panel */}
                  <div className="flex-1 flex flex-col min-h-0 border-t sm:border-t-0 sm:border-l border-zinc-800">
                    {/* Panel Header */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full p-[1.5px] bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 shrink-0">
                          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0066FF] to-indigo-600 flex items-center justify-center text-[9px] font-black text-white">B</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-white leading-none">brand.anda</span>
                            <span className="text-[9px] text-[#3385ff] font-semibold">• Ikuti</span>
                          </div>
                          <span className="text-[8px] text-zinc-500">{currentItem.schedule}</span>
                        </div>
                      </div>
                      <MoreHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    {/* Comments */}
                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 min-h-[120px] max-h-[180px] sm:max-h-none">
                      <div className="flex gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#0066FF] to-indigo-600 flex items-center justify-center text-[8px] font-black text-white shrink-0 mt-0.5">B</div>
                        <div className="flex-1">
                          <p className="text-[10.5px] text-zinc-200 leading-snug">
                            <span className="font-semibold text-white mr-1">brand.anda</span>
                            {currentItem.caption}
                          </p>
                          <div className="flex flex-wrap gap-x-1 mt-1">
                            {currentItem.hashtags.map((tag, i) => (
                              <span key={i} className="text-[9.5px] text-[#3385ff] font-medium">{tag}</span>
                            ))}
                          </div>
                          <span className="text-[8px] text-zinc-600 mt-0.5 block">13j</span>
                        </div>
                      </div>
                    </div>
                    {/* Engagement Row */}
                    <div className="px-3 pt-1.5 pb-1 border-t border-zinc-800 shrink-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-2.5">
                          <Heart className="w-4 h-4 fill-red-500 text-red-500 cursor-pointer" />
                          <MessageCircle className="w-4 h-4 text-zinc-300 hover:text-white cursor-pointer" />
                          <Send className="w-4 h-4 text-zinc-300 hover:text-white cursor-pointer" />
                        </div>
                        <Bookmark className="w-4 h-4 text-zinc-300 hover:text-white cursor-pointer" />
                      </div>
                      <span className="text-[11px] font-semibold text-white block mb-0.5">1.204 suka</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ═══ X (TWITTER) PREVIEW ═══ */}
              {selectedPlatform === 'x' && (
                <div key="x" className="w-full max-w-lg bg-black border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in duration-300">
                  {/* Tweet Header */}
                  <div className="px-3.5 pt-3 pb-1.5 flex gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0066FF] to-indigo-600 flex items-center justify-center text-xs font-black text-white shrink-0">B</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-[13px] font-bold text-white leading-none">Brand Anda</span>
                        <svg className="w-3.5 h-3.5 text-[#3385ff] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91C21.12 14.67 22 13.43 22 12zm-11.07 4.83l-3.54-3.54 1.41-1.41 2.13 2.12 4.24-4.24 1.41 1.41-5.65 5.66z" /></svg>
                        <span className="text-[11px] text-zinc-500">@brand_anda</span>
                        <span className="text-[11px] text-zinc-600">·</span>
                        <span className="text-[11px] text-zinc-500">2j</span>
                      </div>
                      {/* Tweet text */}
                      <p className="text-[12.5px] text-zinc-100 leading-relaxed mt-1.5">
                        {currentItem.caption}
                      </p>
                      <div className="flex flex-wrap gap-x-1 mt-1">
                        {currentItem.hashtags.map((tag, i) => (
                          <span key={i} className="text-[11.5px] text-[#3385ff] font-medium hover:underline cursor-pointer">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                  </div>
                  {/* Tweet Image */}
                  <div className="mx-3.5 mb-2.5 rounded-xl overflow-hidden border border-zinc-800 relative">
                    <img src={currentItem.image} alt={currentItem.productTitle} className="w-full aspect-[16/9] object-cover" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-semibold text-white border border-white/10 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#3385ff]" /> AI Generated
                    </div>
                  </div>
                  {/* Engagement stats */}
                  <div className="px-3.5 py-1.5 border-t border-zinc-800 flex items-center gap-2 text-[11px] text-zinc-500">
                    <span><strong className="text-white">48</strong> Repost</span>
                    <span className="text-zinc-700">·</span>
                    <span><strong className="text-white">12</strong> Kutipan</span>
                    <span className="text-zinc-700">·</span>
                    <span><strong className="text-white">1.204</strong> Suka</span>
                  </div>
                  {/* Action buttons */}
                  <div className="px-3.5 py-2 border-t border-zinc-800 flex items-center justify-around">
                    <button className="flex items-center gap-1 text-zinc-500 hover:text-[#3385ff] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-[11px]">24</span>
                    </button>
                    <button className="flex items-center gap-1 text-zinc-500 hover:text-green-400 transition-colors">
                      <Repeat2 className="w-4 h-4" />
                      <span className="text-[11px]">48</span>
                    </button>
                    <button className="flex items-center gap-1 text-pink-500 transition-colors">
                      <Heart className="w-4 h-4 fill-pink-500" />
                      <span className="text-[11px]">1.2rb</span>
                    </button>
                    <button className="flex items-center gap-1 text-zinc-500 hover:text-[#3385ff] transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ═══ LINKEDIN PREVIEW ═══ */}
              {selectedPlatform === 'linkedin' && (
                <div key="li" className="w-full max-w-lg bg-[#1b1f23] border border-zinc-700/50 rounded-xl overflow-hidden shadow-2xl animate-in fade-in duration-300">
                  {/* Post Header */}
                  <div className="px-3.5 pt-3 pb-1.5 flex gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0066FF] to-indigo-600 flex items-center justify-center text-sm font-black text-white shrink-0">B</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[12.5px] font-bold text-white leading-tight">Brand Anda</span>
                        <span className="text-[10px] text-zinc-500">• 1st</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug mt-0.5 line-clamp-1">Official Page • Marketing & Business Solutions</p>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  </div>
                  {/* Post Text */}
                  <div className="px-3.5 pb-2.5">
                    <p className="text-[12px] text-zinc-200 leading-relaxed">
                      {currentItem.caption}
                    </p>
                    <div className="flex flex-wrap gap-x-1 mt-1.5">
                      {currentItem.hashtags.map((tag, i) => (
                        <span key={i} className="text-[11px] text-[#3385ff] font-medium hover:underline cursor-pointer">{tag}</span>
                      ))}
                    </div>
                  </div>
                  {/* Post Image */}
                  <div className="relative">
                    <img src={currentItem.image} alt={currentItem.productTitle} className="w-full aspect-[1.91/1] object-cover" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-semibold text-white border border-white/10 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#3385ff]" /> AI Generated
                    </div>
                  </div>
                  {/* Reactions row */}
                  <div className="px-3.5 py-1.5 flex items-center justify-between text-[11px] text-zinc-500 border-b border-zinc-700/50">
                    <div className="flex items-center gap-1">
                      <div className="flex -space-x-1">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#0066FF] flex items-center justify-center border border-[#1b1f23]">
                          <ThumbsUp className="w-2 h-2 text-white" />
                        </div>
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center border border-[#1b1f23]">
                          <Heart className="w-2 h-2 text-white fill-white" />
                        </div>
                      </div>
                      <span className="ml-1">128</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>15 komentar</span>
                      <span>•</span>
                      <span>8 repost</span>
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="px-2 py-1 flex items-center justify-around">
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-zinc-400 hover:bg-white/5 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold">Suka</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-zinc-400 hover:bg-white/5 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold">Komentar</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-zinc-400 hover:bg-white/5 transition-colors">
                      <Repeat2 className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold">Repost</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </FlowSection>

      {/* ── Section 5: IntroVideoPage (Tutorial) ── */}
      <FlowSection
        aria-label="Tutorial Postmatic"
        style={{ backgroundColor: '#f0f4ff', color: '#0f172a' }}
      >
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] opacity-60">
          05 — Tutorial
        </p>
        <hr className="my-[1.2vw] border-none border-t border-black/15" />

        <div className="flex flex-col gap-[1.5vw] flex-1 max-w-4xl mx-auto w-full">
          <h2 className="text-[clamp(1.5rem,5.25vw,6rem)] font-black leading-[0.85] uppercase tracking-tight">
            Cara Pakai
            <br />
            <span className="bg-gradient-to-r from-[#0066FF] to-indigo-600 bg-clip-text text-transparent">
              Postmatic.
            </span>
          </h2>

          <MacWindow
            keepAspectRatio
            hoverZoom={false}
            title="Tutorial — Cara Menggunakan Postmatic"
            className="w-full border border-slate-200 shadow-xl"
          >
            <div className="aspect-w-16 aspect-h-10 h-full">
              <iframe
                className="w-full h-full rounded"
                src={tutorialVideoUrl}
                title="Tutorial Postmatic"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
                allowFullScreen
              />
            </div>
          </MacWindow>
        </div>
      </FlowSection>

      {/* ── Section 6: CTA ── */}
      <FlowSection
        aria-label="Mulai sekarang"
        style={{ backgroundColor: '#030712', color: '#fff' }}
      >
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] opacity-60">
          06 — Mulai Sekarang
        </p>
        <hr className="my-[1.2vw] border-none border-t border-white/10" />
        <div>
          <h2 className="text-[clamp(2.25rem,8.25vw,8.5rem)] font-black leading-[0.85] uppercase tracking-tight">
            Siap<br />Mulai<br />Hari<br />Ini?
          </h2>
        </div>
        <hr className="my-[1.2vw] border-none border-t border-white/10" />
        <p className="max-w-[55ch] text-[clamp(0.85rem,1.7vw,1.35rem)] font-normal leading-relaxed opacity-75">
          Bergabunglah dengan ratusan bisnis Indonesia yang sudah mengotomasi pemasaran digital
          mereka dengan Postmatic. Coba gratis sekarang — tanpa kartu kredit.
        </p>
        <hr className="my-[1.2vw] border-none border-t border-white/10" />
        <div className="mt-auto pb-2">
          <Link href={SIGNUP_URL}>
            <button className="group inline-flex items-center gap-3 rounded-full bg-[#0066FF] px-7 py-3.5 text-white font-bold text-sm sm:text-base transition-all duration-300 hover:bg-[#0052cc] hover:scale-105 shadow-xl shadow-[#0066FF]/30 cursor-pointer">
              <span>Buat Konten Pertama Saya</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </FlowSection>
    </FlowArt>
  );
}
