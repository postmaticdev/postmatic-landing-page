"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { ImageComparisonSlider } from "./image-compararison-slider";
import { Button } from "../ui/button";
import Link from "next/link";
import { LOGIN_URL } from "@/constants";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    description: string;
    imageBefore: string;
    imageAfter: string;
  } | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // Mount + scroll lock + Esc
  useEffect(() => {
    setIsMounted(true);

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      lastActiveRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscapeKey);
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscapeKey);
      lastActiveRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  // Trap fokus sederhana di dalam dialog
  useEffect(() => {
    if (!isOpen) return;

    function trap(e: KeyboardEvent) {
      if (e.key !== "Tab" || !containerRef.current) return;
      const focusables = containerRef.current.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [isOpen]);

  if (!isMounted || !product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            // MOBILE: kontainer modal scrollable
            // DESKTOP: card dengan max-height
            className="
              relative w-screen h-[100dvh] md:w-full md:h-auto md:max-h-[90vh]
              md:max-w-5xl md:mx-4
              bg-card/95 backdrop-blur-md border border-border text-foreground
              rounded-none md:rounded-xl
              pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]
              overflow-y-auto md:overflow-hidden overscroll-y-contain touch-pan-y
            "
            style={{ WebkitOverflowScrolling: "touch" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  {product.name.charAt(0)}
                </div>
                <h3
                  id="product-modal-title"
                  className="text-base sm:text-lg font-semibold truncate"
                  title={product.name}
                >
                  {product.name}
                </h3>
              </div>

              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Tutup"
                className="ml-auto inline-flex items-center justify-center rounded-md p-2 border border-transparent hover:border-border hover:bg-accent/30 focus:outline-none focus-visible:ring focus-visible:ring-primary/40"
              >
                {/* Ikon X */}
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Body */}
            <div className="min-h-0 flex flex-col md:flex-row md:h-[calc(90vh-4rem)]">
              {/* Image column */}
              <div className="w-full md:w-2/3 md:border-r md:border-border md:min-h-0">
                {/* ✅ Pastikan kontainer relatif & full size agar slider mengisi penuh */}
                <div className="relative w-full aspect-square md:h-full md:aspect-auto">
                  <div className="absolute inset-0">
                    <ImageComparisonSlider
                      beforeImage={product.imageAfter}
                      afterImage={product.imageBefore}
                      beforeLabel="Original"
                      afterLabel="Enhanced"
                    />
                  </div>
                </div>
              </div>

              {/* Info + Actions */}
              <div className="w-full md:w-1/3 flex flex-col min-h-0">
                {/* Caption / description */}
                <div className="flex-1 overflow-y-auto p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-border space-y-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>128</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>24</span>
                    </div>
                  </div>

                  <Link href={LOGIN_URL}>
                    <Button className="w-full h-10 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary to-secondary rounded-md hover:from-secondary hover:to-primary hover:scale-[1.02] transition-all text-white shadow-md hover:shadow-lg cursor-pointer">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
