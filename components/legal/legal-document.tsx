import type { ReactNode } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn, getMobileMargins } from "@/lib/utils";
import {
  LEGAL_COMPANY,
  LEGAL_DOC_ORDER,
  LEGAL_PATHS,
  type LegalBlock,
  type LegalContent,
  type LegalDocKey,
} from "@/lib/legal/types";

const INLINE_RE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

// Mengubah **tebal** dan [label](tautan) menjadi elemen React tanpa HTML mentah.
function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(INLINE_RE)) {
    const index = match.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    if (match[1]) {
      out.push(
        <strong key={key++} className="font-semibold text-neutral-900 dark:text-white">
          {match[1]}
        </strong>
      );
    } else {
      const label = match[2];
      const href = match[3];
      const linkCls = "font-medium text-[#0066FF] underline underline-offset-2 hover:text-[#0052cc]";
      out.push(
        href.startsWith("/") ? (
          <Link key={key++} href={href} className={linkCls}>
            {label}
          </Link>
        ) : (
          <a
            key={key++}
            href={href}
            className={linkCls}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </a>
        )
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p>{renderInline(block.text)}</p>;
    case "list":
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-[#0066FF]">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    case "note":
      return (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
          {renderInline(block.text)}
        </p>
      );
  }
}

type LegalDocumentViewProps = {
  docKey: LegalDocKey;
  content: LegalContent;
  lastUpdatedLabel: string;
};

export function LegalDocumentView({ docKey, content, lastUpdatedLabel }: LegalDocumentViewProps) {
  const { ui } = content;
  const doc = content.documents[docKey];

  return (
    <main className="bg-white dark:bg-neutral-950">
      <div className={cn("mx-auto max-w-3xl pb-20 pt-28 md:pt-32", getMobileMargins())}>
        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#0066FF]">{ui.eyebrow}</p>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">{doc.title}</h1>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            {ui.lastUpdated}: <time dateTime={LEGAL_COMPANY.lastUpdatedISO}>{lastUpdatedLabel}</time>
          </p>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">{renderInline(doc.intro)}</p>
        </header>

        <section
          aria-labelledby="legal-summary"
          className="mb-10 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 dark:border-blue-500/20 dark:bg-blue-500/10 md:p-6"
        >
          <h2 id="legal-summary" className="mb-3 text-base font-semibold text-neutral-900 dark:text-white">
            {ui.summaryTitle}
          </h2>
          <ul className="space-y-2 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-200">
            {doc.summary.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#0066FF]" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        </section>

        <nav aria-labelledby="legal-toc" className="mb-12">
          <h2 id="legal-toc" className="mb-3 text-sm font-semibold text-neutral-900 dark:text-white">
            {ui.tocTitle}
          </h2>
          <ol className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
            {doc.sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-neutral-600 hover:text-[#0066FF] dark:text-neutral-400 dark:hover:text-white"
                >
                  {i + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-12">
          {doc.sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
                {i + 1}. {section.title}
              </h2>
              <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-14 rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800 md:p-6">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">{ui.contactTitle}</h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{ui.contactBody}</p>
          <div className="mt-4 flex flex-col gap-3 text-sm sm:flex-row sm:gap-6">
            <a href={`mailto:${LEGAL_COMPANY.email}`} className="inline-flex items-center gap-2 font-medium text-[#0066FF]">
              <Mail className="size-4" aria-hidden />
              {LEGAL_COMPANY.email}
            </a>
            <a
              href={LEGAL_COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-[#0066FF]"
            >
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp {LEGAL_COMPANY.whatsapp}
            </a>
          </div>
        </aside>

        <nav aria-labelledby="legal-related" className="mt-10">
          <h2 id="legal-related" className="mb-3 text-sm font-semibold text-neutral-900 dark:text-white">
            {ui.relatedTitle}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {LEGAL_DOC_ORDER.filter((key) => key !== docKey).map((key) => (
              <li key={key}>
                <Link
                  href={LEGAL_PATHS[key]}
                  className="inline-flex min-h-10 items-center rounded-full border border-neutral-200 px-4 text-sm text-neutral-700 hover:border-[#0066FF] hover:text-[#0066FF] dark:border-neutral-800 dark:text-neutral-300"
                >
                  {ui.docLabels[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
