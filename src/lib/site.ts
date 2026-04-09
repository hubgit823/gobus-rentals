import { fleetImages } from "@/lib/media";

/** Canonical site URL for canonical tags, OG URLs, sitemap, and JSON-LD. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://luxurybusrental.in";

export const SITE_NAME = "Luxury Bus Rental";
export const DEFAULT_OG_IMAGE = fleetImages.coachFrontMountain;

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
