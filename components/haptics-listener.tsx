"use client";

import { useEffect } from "react";
import { DASHBOARD_URL, LOGIN_URL, SIGNUP_URL } from "@/constants";
import { createHapticClickHandler } from "@/lib/haptics";

// CTA di landing berupa link ke auth/workspace, bukan <button>; ikut diberi getaran.
const ctaSelector = Array.from(
  new Set(
    [LOGIN_URL, DASHBOARD_URL, SIGNUP_URL].flatMap((url) => {
      try {
        return [new URL(url).origin];
      } catch {
        return [];
      }
    })
  )
)
  .map((origin) => `a[href^="${origin}"]`)
  .join(",");

const handleHapticClick = createHapticClickHandler(ctaSelector);

// Memberi getaran halus setiap kali tombol atau CTA ditekan di perangkat sentuh.
export function HapticsListener() {
  useEffect(() => {
    document.addEventListener("click", handleHapticClick, { capture: true });
    return () => document.removeEventListener("click", handleHapticClick, { capture: true });
  }, []);

  return null;
}
