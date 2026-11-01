"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export default function ImageAutoSlider() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop", // Social Media Feed 4:5 vibe
    "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=800&auto=format&fit=crop", // Digital Marketing Campaign
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", // Analytics dashboard
    "https://images.unsplash.com/photo-1542744094-3a31216994ec?q=80&w=800&auto=format&fit=crop", // Content Strategy Team
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop", // Creative Design Studio
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop", // AI Collaboration
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop", // Mobile Marketing
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop", // Modern Office Studio
  ];

  const duplicatedImages = [...images, ...images];

  return (
    <section className="w-full py-8 md:py-12 bg-white dark:bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#0066FF]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Fade masks left and right */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-[#0A0A0A] to-transparent z-20 pointer-events-none" />

      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="scroll-container w-full overflow-hidden">
          <div className="infinite-scroll flex gap-4 md:gap-6 w-max">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className="image-item flex-shrink-0 aspect-[4/5] w-36 sm:w-48 md:w-56 lg:w-64 rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-zinc-800 transition-all duration-300 hover:border-[#0066FF]/50 cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Social media showcase ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors z-50"
            aria-label="Close fullscreen preview"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage}
            alt="Fullscreen preview"
            className="max-w-[90vw] max-h-[88vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .infinite-scroll {
          animation: scroll-right 28s linear infinite;
        }
        .infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
