import { BUS_TYPE_PAGES } from "@/data/bus-type-pages";

/**
 * Navbar → "Bus types +" menu.
 * Each entry links to its dedicated SEO landing page (e.g. /mini-bus-rental).
 */
export type NavbarBusTypeLink = Readonly<{
  label: string;
  to: string;
}>;

export const NAVBAR_BUS_TYPE_LINKS: readonly NavbarBusTypeLink[] = BUS_TYPE_PAGES.map((page) => ({
  label: `${page.busType} -Bus hire`,
  to: `/${page.slug}`,
}));
