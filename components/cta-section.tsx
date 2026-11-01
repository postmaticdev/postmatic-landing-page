import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { LOGIN_URL, WHATSAPP_URL } from "@/constants";
import { getTranslations } from "next-intl/server";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.31l-.35-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.45-9.43a9.4 9.4 0 0 1 6.68 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43zm8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.67 12.06c0 2 .52 3.96 1.52 5.68L.57 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.27 0 11.37-5.1 11.38-11.37a11.3 11.3 0 0 0-3.34-8.06z" />
    </svg>
  );
}

export default async function CtaSection() {
  const t = await getTranslations("landing.cta");
  return (
    <section className="w-full py-16 md:py-32 font-sans px-4 sm:px-6 lg:px-8">
      <div data-scale-in="0.84" className="max-w-7xl mx-auto rounded-[2.5rem] bg-gradient-to-r from-[#1875FF] to-[#002688] flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 md:px-12 shadow-2xl shadow-blue-900/20 will-change-transform">
        <div data-reveal-stagger="0.2" className="flex flex-col items-center w-full">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-6 leading-[1.2] max-w-3xl tracking-tight">
          {t("title")}
        </h2>
        
        {/* Subheading */}
        <p className="text-white/90 text-[13px] md:text-base lg:text-lg font-medium leading-relaxed max-w-2xl mb-10">
          {t("description")}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Get Started Button */}
          <Link
            href={LOGIN_URL}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#F0F5FF] hover:bg-white text-[#0066FF] px-8 py-4 md:py-3.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 hover:scale-105 group shadow-xl shadow-black/10 whitespace-nowrap"
          >
            <span>{t("getStarted")}</span>
            <ChevronRight className="w-4 h-4 text-[#0066FF] group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
          </Link>

          {/* Contact Us (WA) Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 md:py-3.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 hover:scale-105 group shadow-xl shadow-black/10 whitespace-nowrap"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
            <span>{t("contactWa")}</span>
          </a>
        </div>

        {/* Reassurance perks */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {(t.raw("perks") as string[]).map((perk) => (
            <li key={perk} className="flex items-center gap-1.5 text-white/85 text-xs md:text-sm font-medium">
              <Check className="w-4 h-4 text-[#3ECF8E] shrink-0" strokeWidth={3} />
              {perk}
            </li>
          ))}
        </ul>
        </div>

      </div>
    </section>
  );
}
