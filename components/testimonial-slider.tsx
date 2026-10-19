"use client";

import React from "react";
import { Star, Quote, MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Marketing Manager",
    company: "TechFlow",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
    rating: 5,
    content: "Amazing product! It completely transformed the way I work. Highly recommended for any growing business.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "CEO",
    company: "Lumina Creative",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop",
    rating: 5,
    content: "Exceptional service! The support team is responsive and goes above and beyond to make automation effortless.",
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Founder",
    company: "GrowthX",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
    rating: 5,
    content: "Saw immediate results after implementing. A game-changer for our business and social media outreach!",
  },
  {
    id: 4,
    name: "Budi Santoso",
    role: "Owner",
    company: "Kopi Nusantara",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop",
    rating: 5,
    content: "Postmatic sangat membantu bisnis kuliner saya. Pembuatan konten visual dan caption AI berasa punya tim agency sendiri!",
  },
  {
    id: 5,
    name: "Siti Rahma",
    role: "Digital Specialist",
    company: "Hijab Style",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop",
    rating: 5,
    content: "Hemat waktu hingga 80%. Tinggal input profil produk, langsung jadi konten sebulan lengkap dengan jadwal posting otomatis.",
  },
  {
    id: 6,
    name: "Rian Pratama",
    role: "E-commerce Lead",
    company: "Urban Gear",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=250&auto=format&fit=crop",
    rating: 5,
    content: "Platform otomasi AI terbaik yang pernah kami gunakan. Konversi penjualan meningkat tajam setelah rutin posting.",
  },
];

export default function TestimonialSlider() {
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0066FF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", "relative z-10 mb-8 sm:mb-12")}>
        {/* Section Header Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 text-[#0066FF] dark:text-[#3385ff] text-xs font-semibold tracking-wider uppercase">
            <MessageSquare className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Testimonial</span>
          </div>
        </div>

        {/* Section Title & Description */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 sm:mb-4">
            Dipercaya oleh Ribuan <span className="bg-gradient-to-r from-[#0066FF] via-indigo-600 to-[#3385ff] dark:from-[#3385ff] dark:via-indigo-300 dark:to-[#66a3ff] bg-clip-text text-transparent">Pebisnis & Marketer</span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-base leading-relaxed">
            Dengar langsung cerita sukses dari mereka yang telah mengotomasi pembuatan konten dan pemasaran media sosial dengan Postmatic.
          </p>
        </div>
      </div>

      {/* Infinite Marquee Slider Container */}
      <div className="relative w-full overflow-hidden py-2 sm:py-4 group">
        {/* Left & Right Gradient Shadows */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-white dark:from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-white dark:from-[#0A0A0A] to-transparent z-20 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex gap-2 sm:gap-4 md:gap-6 w-max animate-testimonial-scroll group-hover:[animation-play-state:paused] ease-linear py-2 md:py-4">
          {duplicatedTestimonials.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[180px] md:w-[380px] lg:w-[430px] h-[130px] md:h-[185px] lg:h-[205px] shrink-0 relative flex items-center justify-center"
            >
              <div className="absolute w-[360px] md:w-[580px] lg:w-[620px] shrink-0 scale-50 md:scale-[0.65] lg:scale-[0.7] origin-center bg-slate-50 dark:bg-zinc-900/90 text-slate-900 dark:text-zinc-100 rounded-2xl p-5 sm:p-7 shadow-lg border border-slate-200/80 dark:border-zinc-800 flex flex-col justify-between transition-all duration-300 hover:border-[#0066FF]/40">
                <div>
                  {/* Header: Star Rating (Left) & Quote Icon (Right) */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4 sm:w-5 sm:h-5",
                            i < item.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-slate-200 text-slate-300 dark:fill-zinc-700 dark:text-zinc-700"
                          )}
                        />
                      ))}
                    </div>
                    {/* Decorative double quote icon */}
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#0066FF]/50 dark:text-[#3385ff]/50 rotate-180" />
                  </div>

                  {/* Testimonial Quote Content */}
                  <p className="text-slate-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed font-medium mb-4 line-clamp-2">
                    &quot;{item.content}&quot;
                  </p>
                </div>

                <div>
                  {/* Subtle Divider Line */}
                  <div className="w-full h-[1px] bg-slate-200 dark:bg-zinc-800 mb-3" />

                  {/* Footer User Profile */}
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 sm:w-11 sm:h-11 border border-slate-200 dark:border-zinc-700 shadow-sm shrink-0">
                      <AvatarImage src={item.avatar} alt={item.name} className="object-cover" />
                      <AvatarFallback className="bg-[#0066FF]/10 dark:bg-[#0066FF]/25 text-[#0066FF] dark:text-[#66a3ff] font-bold text-xs sm:text-sm">
                        {item.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-tight truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 truncate">
                        {item.role} {item.company ? `• ${item.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Animation Keyframes Style */}
      <style jsx global>{`
        @keyframes testimonial-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-testimonial-scroll {
          animation: testimonial-marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}
