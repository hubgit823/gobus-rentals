/**
 * Featured city links (footer + /bus-rental hub). Each line links to `/{slug}-bus-rental`.
 * Display strings follow common India rental site patterns; slugs match `indian-cities` SEO routes.
 * (Goa → Panaji hub; Gurugram → Gurgaon slug in dataset.)
 */
export type FeaturedVehicleRentalCity = {
  /** Full line shown to users, e.g. "Delhi -Vehicle Rentals" */
  line: string;
  slug: string;
};

export const FEATURED_VEHICLE_RENTAL_CITIES: readonly FeaturedVehicleRentalCity[] = [
  { line: "Delhi -Vehicle Rentals", slug: "delhi" },
  { line: "Mumbai -Vehicle Rentals", slug: "mumbai" },
  { line: "Bengaluru -Vehicle Rentals", slug: "bangalore" },
  { line: "Goa -Vehicle Rentals", slug: "panaji" },
  { line: "Hyderabad -Vehicle Rental", slug: "hyderabad" },
  { line: "Agra -Vehicle Rentals", slug: "agra" },
  { line: "Jaipur -Vehicle Rentals", slug: "jaipur" },
  { line: "Pune -Vehicle Rentals", slug: "pune" },
  { line: "Udaipur -Vehicle Rentals", slug: "udaipur" },
  { line: "Gurugram -Vehicle Rentals", slug: "gurgaon" },
  { line: "Noida -Vehicle Rentals", slug: "noida" },
];
