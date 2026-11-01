import { notFound } from "next/navigation";

/**
 * Any URL under a locale that no other route matches (e.g. /id/abc) lands
 * here and renders app/[locale]/not-found.tsx with a real 404 status, inside
 * the locale layout.
 */
export default function CatchAllNotFound() {
  notFound();
}
