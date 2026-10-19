"use client";

import React from "react";
import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFaqItems: FAQItem[] = [
  {
    question: "Bagaimana cara kerja Postmatic.id?",
    answer:
      "Postmatic.id adalah platform berbasis AI/ML yang mengotomasi seluruh alur kerja media sosial Anda. Cukup masukkan profil bisnis Anda, dan AI kami akan meriset tren, membuat desain konten visual, menulis caption, serta menjadwalkan postingan secara otomatis.",
  },
  {
    question: "Apakah Postmatic.id gratis untuk digunakan?",
    answer:
      "Ya, Anda dapat membuat akun secara gratis untuk mencoba fitur dasar Postmatic.id dan merasakan kemudahan otomasi pembuatan konten sebelum mengupgrade ke paket berlangganan.",
  },
  {
    question: "Apakah saya bisa mengkustomisasi konten dan hasil generasi AI?",
    answer:
      "Tentu saja! Semua konten visual, teks caption, dan jadwal posting yang dibuat oleh AI dapat Anda edit, kustomisasi, atau pratinjau terlebih dahulu sebelum dipublikasikan.",
  },
  {
    question: "Apakah Postmatic.id terintegrasi dengan berbagai media sosial?",
    answer:
      "Ya, Postmatic.id mendukung integrasi langsung dengan platform media sosial populer seperti Instagram, Facebook, TikTok, WhatsApp, dan LinkedIn.",
  },
  {
    question: "Apakah Postmatic.id cocok untuk bisnis UMKM?",
    answer:
      "Sangat cocok! Postmatic.id dirancang khusus untuk mempermudah pemilik bisnis dan UMKM dalam mengelola pemasaran digital tanpa perlu keahlian desain atau tim media sosial khusus.",
  },
];

export default function FAQSection() {
  const t = useTranslations("faq");

  const title = t("title");
  const subtitle = t("subtitle");

  let items: FAQItem[] = defaultFaqItems;
  try {
    const rawItems = t.raw("items") as FAQItem[];
    if (Array.isArray(rawItems) && rawItems.length > 0) {
      items = rawItems;
    }
  } catch {
    items = defaultFaqItems;
  }

  return (
    <section
      id="faq"
      className="py-16 md:py-20 bg-slate-50/70 dark:bg-[#0A0A0A] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300"
    >
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", "relative z-10")}>
        {/* Help Icon Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 text-[#0066FF] dark:text-[#3385ff] text-xs font-semibold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Pertanyaan Umum</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto space-y-4"
        >
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/80 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:border-[#0066FF]/40 rounded-2xl px-6 transition-all duration-200 shadow-sm"
            >
              <AccordionTrigger className="text-left font-semibold text-slate-900 dark:text-white text-base sm:text-lg py-5 hover:no-underline [&[data-state=open]>svg]:rotate-180 transition-transform">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed pb-5 pt-1 border-t border-slate-100 dark:border-zinc-800/50">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
