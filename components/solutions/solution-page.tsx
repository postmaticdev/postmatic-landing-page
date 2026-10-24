import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/routing";
import { LOGIN_URL, WHATSAPP_URL } from "@/constants";
import { cn, getMobileMargins } from "@/lib/utils";
import { SOLUTION_ORDER, SOLUTION_PATHS, type SolutionKey } from "@/lib/solutions";
import type { SolutionContent, SolutionVisual } from "@/lib/solutions/types";

// **tebal** → <strong>; konten ini statis milik kita, tanpa HTML mentah.
function renderBold(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-neutral-900 dark:text-white">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function Visuals({ visuals }: { visuals: SolutionVisual[] }) {
  // Dua gambar = sebelum/sesudah, tiga = contoh feed, satu = cuplikan aplikasi.
  if (visuals.length === 1) {
    const [v] = visuals;
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-100 shadow-2xl shadow-blue-900/10 dark:border-neutral-800 dark:bg-neutral-900">
        <Image src={v.src} alt={v.alt} fill priority sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
      </div>
    );
  }
  return (
    <div className={cn("grid gap-3 sm:gap-4", visuals.length === 2 ? "grid-cols-2" : "grid-cols-3")}>
      {visuals.map((v, i) => (
        <figure key={v.src} className={cn(visuals.length === 3 && i === 1 && "translate-y-6")}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-neutral-100 shadow-xl shadow-blue-900/10 dark:border-neutral-800 dark:bg-neutral-900">
            <Image src={v.src} alt={v.alt} fill priority={i === 0} sizes="(max-width: 1024px) 50vw, 280px" className="object-cover" />
          </div>
          {v.caption && (
            <figcaption className="mt-2 text-center text-xs font-medium text-neutral-500 dark:text-neutral-400">{v.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-8 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-3xl">
      {children}
    </h2>
  );
}

type SolutionPageViewProps = {
  solutionKey: SolutionKey;
  content: SolutionContent;
};

export function SolutionPageView({ solutionKey, content }: SolutionPageViewProps) {
  const { ui } = content;
  const page = content.pages[solutionKey];
  const container = cn("mx-auto max-w-6xl", getMobileMargins());

  return (
    <main className="bg-white dark:bg-neutral-950">
      {/* Hero */}
      <section className={cn(container, "pb-16 pt-28 md:pb-24 md:pt-36")}>
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#0066FF]">
                {ui.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-neutral-700 dark:text-neutral-200">
              {ui.navLabels[solutionKey]}
            </li>
          </ol>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#0066FF]">{page.eyebrow}</p>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 dark:text-white md:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">{renderBold(page.lead)}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {page.highlights.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-[#0052cc] dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300"
                >
                  <Check className="size-4" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={LOGIN_URL}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#0066FF] py-2 pl-6 pr-2 font-semibold text-white shadow-lg shadow-[#0066FF]/20 transition-colors hover:bg-[#0052cc]"
              >
                {ui.primaryCta}
                <span className="flex size-8 items-center justify-center rounded-full bg-white">
                  <ArrowRight className="size-4 text-[#0066FF]" aria-hidden />
                </span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 font-semibold text-neutral-800 transition-colors hover:border-[#0066FF] hover:text-[#0066FF] dark:border-neutral-800 dark:text-neutral-100"
              >
                {ui.secondaryCta}
              </a>
            </div>
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">{ui.freeNote}</p>
          </div>
          <Visuals visuals={page.visuals} />
        </div>
      </section>

      {/* Steps */}
      <section aria-labelledby="steps" className="border-t border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-900 dark:bg-neutral-900/40 md:py-24">
        <div className={container}>
          <SectionHeading id="steps">{page.stepsTitle}</SectionHeading>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {page.steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#0066FF] text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-4 font-semibold text-neutral-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features" className="py-16 md:py-24">
        <div className={container}>
          <SectionHeading id="features">{page.featuresTitle}</SectionHeading>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {page.features.map((feature) => (
              <div key={feature.title}>
                <h3 className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-white">
                  <span className="size-2 rounded-full bg-[#0066FF]" aria-hidden />
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section aria-labelledby="use-cases" className="border-y border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-900 dark:bg-neutral-900/40 md:py-24">
        <div className={container}>
          <SectionHeading id="use-cases">{page.useCasesTitle}</SectionHeading>
          <div className={cn("grid gap-4 sm:grid-cols-2", page.useCases.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
            {page.useCases.map((useCase) => (
              <div key={useCase.title} className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
                <h3 className="font-semibold text-neutral-900 dark:text-white">{useCase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{useCase.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section aria-labelledby="compare" className="py-16 md:py-24">
        <div className={container}>
          <SectionHeading id="compare">{page.compareTitle}</SectionHeading>
          <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-neutral-50 dark:bg-neutral-900">
                <tr>
                  {page.compareHeaders.map((header, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={cn("px-5 py-4 font-semibold text-neutral-900 dark:text-white", i === 1 && "text-[#0066FF]")}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {page.compareRows.map(([label, ours, theirs]) => (
                  <tr key={label}>
                    <th scope="row" className="px-5 py-4 font-medium text-neutral-700 dark:text-neutral-300">
                      {label}
                    </th>
                    <td className="px-5 py-4 font-medium text-neutral-900 dark:text-white">{ours}</td>
                    <td className="px-5 py-4 text-neutral-500 dark:text-neutral-400">{theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ: <details> keeps every answer in the HTML for crawlers and AI answer engines. */}
      <section aria-labelledby="faq" className="border-t border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-900 dark:bg-neutral-900/40 md:py-24">
        <div className={cn("mx-auto max-w-3xl", getMobileMargins())}>
          <SectionHeading id="faq">{page.faqTitle}</SectionHeading>
          <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950">
            {page.faq.map((item, i) => (
              <details key={item.question} className="group px-5 py-4" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-neutral-900 dark:text-white [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base">{item.question}</h3>
                  <ChevronDown className="size-5 shrink-0 text-neutral-400 transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + related solutions */}
      <section className={cn(container, "py-16 md:py-24")}>
        <div className="rounded-[2.5rem] bg-gradient-to-r from-[#1875FF] to-[#002688] px-6 py-14 text-center md:px-12 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{page.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">{page.ctaText}</p>
          <a
            href={LOGIN_URL}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-[#0066FF] transition-colors hover:bg-blue-50"
          >
            {ui.primaryCta}
            <ArrowRight className="size-4" aria-hidden />
          </a>
          <p className="mt-4 text-sm text-white/70">{ui.freeNote}</p>
        </div>

        <nav aria-labelledby="related" className="mt-14">
          <h2 id="related" className="mb-4 text-sm font-semibold text-neutral-900 dark:text-white">
            {ui.relatedTitle}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {SOLUTION_ORDER.filter((key) => key !== solutionKey).map((key) => (
              <li key={key}>
                <Link
                  href={SOLUTION_PATHS[key]}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-neutral-200 px-4 text-sm text-neutral-700 hover:border-[#0066FF] hover:text-[#0066FF] dark:border-neutral-800 dark:text-neutral-300"
                >
                  {ui.navLabels[key]}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  );
}
