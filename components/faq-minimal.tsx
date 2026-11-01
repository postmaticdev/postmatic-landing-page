"use client";

import { useState } from "react";
import { Plus, ArrowDownRight, ArrowUpLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { expandableProps } from "@/lib/a11y";
import { useTranslations } from "next-intl";



export default function FaqMinimal() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const t = useTranslations("landing.faq");
  const faqs = t.raw("items") as Array<{ question: string; answer: string }>;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="w-full py-16 md:py-32 font-sans scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-4 md:gap-0">
          <h2 data-drift-x="70" className="text-7xl md:text-8xl lg:text-[8rem] font-bold italic text-[#0066FF] tracking-tighter leading-none will-change-transform">
            {t("title")}
          </h2>
          <span data-reveal="right" className="inline-block text-xs font-bold tracking-widest text-neutral-500 uppercase pb-2 md:pb-4">
            {t("subtitle")}
          </span>
        </div>

        {/* FAQ List */}
        <div data-reveal-stagger="0.1" className="flex flex-col border-t border-[#EAF2FF] dark:border-neutral-800">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="group border-b border-[#EAF2FF] dark:border-neutral-800 py-6 md:py-8 cursor-pointer transition-colors"
                {...expandableProps(isOpen, () => toggleFaq(index))}
              >
                <div className="flex items-start justify-between gap-4 md:gap-12">
                  {/* Plus Icon (Left) */}
                  <div className="hidden md:block pt-1.5 shrink-0">
                    <Plus className="w-5 h-5 md:w-6 md:h-6 text-[#0066FF]" strokeWidth={2.5} />
                  </div>
                  
                  {/* Content (Right aligned) */}
                  <div className="flex-1 flex flex-col items-start text-left md:items-end md:text-right">
                    <div className="flex items-center gap-4 md:gap-6 justify-between md:justify-end w-full">
                      <h3 className="text-[15px] sm:text-base md:text-[1.1rem] lg:text-lg font-medium text-neutral-800 dark:text-neutral-200">
                        {faq.question}
                      </h3>
                      {/* Circle Arrow Button */}
                      <div className={cn(
                        "w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                        isOpen ? "bg-[#EBF3FF] dark:bg-[#0066FF]/20 text-[#0066FF]" : "bg-[#0066FF] text-white group-hover:bg-blue-700"
                      )}>
                        {isOpen ? (
                          <ArrowUpLeft className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2.5} />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2.5} />
                        )}
                      </div>
                    </div>
                    
                    {/* Answer (Expanded) */}
                    <div className={cn(
                      "grid transition-all duration-400 ease-in-out w-full lg:w-[85%]",
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-4 md:mt-5" : "grid-rows-[0fr] opacity-0"
                    )}>
                      <div className="overflow-hidden">
                        <p className="text-[13px] md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed text-left md:text-right font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        </div>
      </div>
    </section>
  );
}
