"use client";

import { useState } from "react";
import {
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LOGIN_URL } from "@/constants";
import { useTranslations } from "next-intl";

type NavItem = { name: string; link: string };

export default function MobileNavWrapper({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const tButtons = useTranslations('buttons');

  return (
    <div className="lg:hidden">
      {/* Mobile Navbar with solid background */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <NavbarLogo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <MobileNavToggle isOpen={open} onClick={() => setOpen(!open)} />
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Menu - positioned below fixed navbar */}
      <div
        className={cn(
          "fixed top-16 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-neutral-800 shadow-xl transition-all duration-300 ease-in-out",
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="px-5 py-6 space-y-3">
          {items.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setOpen(false)}
              className="block text-slate-700 dark:text-neutral-200 hover:text-[#0066FF] dark:hover:text-[#3385ff] transition-colors py-2.5 px-3 rounded-xl hover:bg-blue-50/60 dark:hover:bg-neutral-900 text-base font-medium"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-3 border-t border-gray-100 dark:border-neutral-800">
            <NavbarButton
              onClick={() => setOpen(false)}
              href={LOGIN_URL}
              variant="primary"
              className="w-full py-3.5 text-base font-medium"
            >
              {tButtons('getStarted')}
            </NavbarButton>
          </div>
        </div>
      </div>
    </div>
  );
}
