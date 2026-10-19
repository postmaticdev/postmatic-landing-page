import "./globals.css";
import type { ReactNode } from "react";

/**
 * Root layout is a pass-through: <html>/<body> are rendered by
 * app/[locale]/layout.tsx (next-intl pattern). It still has to exist because
 * app/not-found.tsx lives at the root.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
