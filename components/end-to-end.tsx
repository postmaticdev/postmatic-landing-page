import EndToEndClient from "./end-to-end.client";
import { useTranslations } from "next-intl";
import { getContainerMargins } from "@/lib/utils";

export default function EndToEnd() {
  const t = useTranslations('endToEnd');
  
  return (
    <section className="py-16 md:py-20 bg-slate-50/70 dark:bg-[#0A0A0A] transition-colors duration-300 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0066FF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className={`${getContainerMargins()} relative z-10`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
            <span className="bg-gradient-to-r from-[#0066FF] via-indigo-600 to-[#3385ff] dark:from-[#3385ff] dark:via-indigo-300 dark:to-[#66a3ff] bg-clip-text text-transparent drop-shadow-sm">{t('highlight')}</span>
            <span className="block sm:inline sm:ml-2">{t('title')}</span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>
        
        <EndToEndClient />
      </div>
    </section>
  );
}
