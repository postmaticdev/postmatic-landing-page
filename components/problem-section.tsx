import Image from "next/image";
import { Asterisk, X, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ProblemSection() {
  const t = await getTranslations("landing.problem");
  const tools = t.raw("limits.tools") as string[];
  const agency = t.raw("limits.agency") as string[];
  return (
    <section className="w-full py-16 md:py-32 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div data-reveal="up" className="mb-10">
          <span className="text-xs font-bold tracking-widest text-[#0066FF] uppercase">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 dark:text-white tracking-tight mt-2">
            {t("title")}
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - Image Card */}
          <div data-reveal="clip" className="lg:col-span-5 relative rounded-[2rem] overflow-hidden min-h-[420px] sm:min-h-[500px] lg:min-h-[100%] flex flex-col justify-end">
            <Image
              data-parallax-img="0.1"
              src="/ibu-asih.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover grayscale"
            />
            {/* White Quote Card inside Image */}
            <div data-reveal="up" data-reveal-end="clamp(top 75%)" className="relative z-10 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-sm m-4 md:m-6 p-6 md:p-8 rounded-[1.5rem] shadow-xl">
              <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-medium italic leading-relaxed mb-6">
                {t("quote")}
              </p>
              <p className="text-neutral-900 dark:text-white text-[13px] md:text-sm font-bold">
                {t("author")}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Stats Row */}
            <div data-reveal-stagger="0.25" data-reveal-type="scale" className="grid grid-cols-2 gap-3 sm:gap-6">
              
              {/* Stat 1 (Blue) */}
              <div className="bg-[#0066FF] p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] flex flex-col justify-between md:aspect-square lg:aspect-auto">
                <Asterisk className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-4 sm:mb-8" strokeWidth={2.5} />
                <div>
                  <h3 data-count="83.46" data-count-locale={t("numberLocale")} data-count-decimals="2" data-count-suffix="%" className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-4 tracking-tight tabular-nums">{t("stat1.value")}</h3>
                  <p className="text-white text-xs sm:text-[13px] md:text-sm font-medium leading-relaxed">
                    {t("stat1.text")} <span className="underline decoration-white/50 underline-offset-2 sm:underline-offset-4 font-bold block sm:inline mt-1 sm:mt-0">{t("stat1.source")}</span>
                  </p>
                </div>
              </div>

              {/* Stat 2 (Light) */}
              <div className="bg-[#F8F9FA] dark:bg-[#111111] border border-neutral-100 dark:border-neutral-800 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] flex flex-col justify-between md:aspect-square lg:aspect-auto">
                <Asterisk className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-900 dark:text-white mb-4 sm:mb-8" strokeWidth={2.5} />
                <div>
                  <h3 data-count="70" data-count-locale={t("numberLocale")} data-count-suffix="%" className="text-3xl sm:text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-2 sm:mb-4 tracking-tight tabular-nums">{t("stat2.value")}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-[13px] md:text-sm font-medium leading-relaxed">
                    {t("stat2.text")} <span className="underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 sm:underline-offset-4 text-neutral-800 dark:text-neutral-300 font-bold block sm:inline mt-1 sm:mt-0">{t("stat2.source")}</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Dark Card (Keterbatasan) */}
            <div data-tilt className="bg-[#1A1A1A] p-8 md:p-10 rounded-[2rem] flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500" strokeWidth={3} />
                <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">{t("limits.title")}</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left */}
                <div>
                  <h5 className="text-white font-bold text-[13px] md:text-sm mb-4">{t("limits.toolsTitle")}</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-500 mt-0.5 text-xs">•</span>
                      <span className="text-[#A1A1AA] text-[13px] font-medium leading-snug">{tools[0]}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-500 mt-0.5 text-xs">•</span>
                      <span className="text-[#A1A1AA] text-[13px] font-medium leading-snug">{tools[1]}</span>
                    </li>
                  </ul>
                </div>
                {/* Right */}
                <div>
                  <h5 className="text-white font-bold text-[13px] md:text-sm mb-4">{t("limits.agencyTitle")}</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-500 mt-0.5 text-xs">•</span>
                      <span className="text-[#A1A1AA] text-[13px] font-medium leading-snug">{agency[0]}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-500 mt-0.5 text-xs">•</span>
                      <span className="text-[#A1A1AA] text-[13px] font-medium leading-snug">{agency[1]}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Light Border Card (Solusi) */}
            <div data-reveal="up" className="bg-white dark:bg-[#0A0A0A] border border-[#BFDBFE] dark:border-[#1E3A8A] p-8 md:p-10 rounded-[2rem]">
              <div className="flex items-center gap-3 mb-4">
                <Check className="w-5 h-5 text-[#0066FF]" strokeWidth={3} />
                <h4 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white tracking-tight">{t("solution.title")}</h4>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-[13px] md:text-sm font-medium leading-relaxed max-w-3xl">
                {t.rich("solution.text", { strong: (chunks) => <strong className="text-neutral-900 dark:text-white">{chunks}</strong> })}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
