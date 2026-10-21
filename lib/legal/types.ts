// Struktur dokumen legal (Syarat & Ketentuan, Ketentuan Layanan, Privasi, Penghapusan Data, Cookie).
// Teks mendukung **tebal** dan [label](tautan); tautan "/..." diarahkan ke halaman landing sesuai bahasa.

export type LegalDocKey =
  | "termsAndConditions"
  | "termsOfService"
  | "privacyPolicy"
  | "dataDeletion"
  | "cookiePolicy";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "note"; text: string };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  title: string;
  intro: string;
  summary: string[];
  sections: LegalSection[];
};

export type LegalUi = {
  eyebrow: string;
  lastUpdated: string;
  summaryTitle: string;
  tocTitle: string;
  contactTitle: string;
  contactBody: string;
  relatedTitle: string;
  docLabels: Record<LegalDocKey, string>;
};

export type LegalContent = {
  ui: LegalUi;
  documents: Record<LegalDocKey, LegalDocument>;
};

export const LEGAL_PATHS: Record<LegalDocKey, string> = {
  termsAndConditions: "/terms-and-conditions",
  termsOfService: "/terms-of-service",
  privacyPolicy: "/privacy-policy",
  dataDeletion: "/data-deletion",
  cookiePolicy: "/cookie-policy",
};

export const LEGAL_DOC_ORDER: LegalDocKey[] = [
  "termsAndConditions",
  "termsOfService",
  "privacyPolicy",
  "dataDeletion",
  "cookiePolicy",
];

// Data perusahaan yang dipakai di semua dokumen.
export const LEGAL_COMPANY = {
  name: "PT Haystudio Technology Solutions",
  email: "team@postmatic.id",
  whatsapp: "+62 851-1760-6447",
  whatsappUrl: "https://wa.me/6285117606447",
  lastUpdatedISO: "2026-10-21",
};
