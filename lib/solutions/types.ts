// Halaman solusi: satu halaman per kebutuhan pencarian (image generator, desain konten,
// auto posting). Konten sengaja "jawaban dulu" agar mudah dikutip mesin pencari dan AI.

export type SolutionKey = "aiProductImageGenerator" | "aiSocialMediaDesign" | "socialMediaScheduler";

export const SOLUTION_PATHS: Record<SolutionKey, string> = {
  aiProductImageGenerator: "/ai-product-image-generator",
  aiSocialMediaDesign: "/ai-social-media-design",
  socialMediaScheduler: "/social-media-scheduler",
};

export const SOLUTION_ORDER: SolutionKey[] = ["aiProductImageGenerator", "aiSocialMediaDesign", "socialMediaScheduler"];

export type SolutionItem = { title: string; text: string };

export type SolutionVisual = { src: string; alt: string; caption?: string };

export type SolutionPage = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  /** Jawaban langsung "apa ini" di paragraf pertama (untuk snippet & jawaban AI). */
  lead: string;
  highlights: string[];
  visuals: SolutionVisual[];
  stepsTitle: string;
  steps: SolutionItem[];
  featuresTitle: string;
  features: SolutionItem[];
  useCasesTitle: string;
  useCases: SolutionItem[];
  compareTitle: string;
  compareHeaders: [string, string, string];
  compareRows: Array<[string, string, string]>;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
  ctaTitle: string;
  ctaText: string;
};

export type SolutionUi = {
  breadcrumbHome: string;
  breadcrumbSolutions: string;
  primaryCta: string;
  secondaryCta: string;
  freeNote: string;
  relatedTitle: string;
  navLabels: Record<SolutionKey, string>;
};

export type SolutionContent = {
  ui: SolutionUi;
  pages: Record<SolutionKey, SolutionPage>;
};
