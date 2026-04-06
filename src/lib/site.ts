/** Canonical site URL for canonical tags, OG URLs, sitemap, and JSON-LD. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://luxurybusrental.in";

export const SITE_NAME = "LuxuryBusRental.in";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/home/bus-travel.jpg`;

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
