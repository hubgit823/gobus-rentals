import { BOOKING_BUS_TYPES } from "@/data/booking-bus-types";

/**
 * Navbar → "Bus types +" menu. Labels mirror the City Wise pattern (`Name -Service`).
 */
export type NavbarBusTypeLink = Readonly<{
  label: string;
  busType: string;
}>;

export const NAVBAR_BUS_TYPE_LINKS: readonly NavbarBusTypeLink[] = BOOKING_BUS_TYPES.map((busType) => ({
  label: `${busType} -Bus hire`,
  busType,
}));
