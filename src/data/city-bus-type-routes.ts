/**
 * Defines the bus types available as /:citySlug/:busTypeSlug URL routes.
 * Each entry maps a clean URL slug to a bus type with content for landing pages.
 */

export type BusTypeRoute = {
  /** URL segment, e.g. "volvo-bus" → /:citySlug/volvo-bus */
  slug: string;
  /** Display label, e.g. "Volvo Bus" */
  label: string;
  /** Matches a value in BOOKING_BUS_TYPES */
  bookingType: string;
  /** Seat range for display */
  seats: string;
  /** One-line tagline */
  tagline: string;
  /** 3-4 feature highlights */
  features: string[];
  /** Best use cases */
  useCases: string[];
  /** Emoji icon */
  emoji: string;
  /** Accent colour class (Tailwind) */
  colorClass: string;
};

export const BUS_TYPE_ROUTES: readonly BusTypeRoute[] = [
  {
    slug: "volvo-bus",
    label: "Volvo Bus",
    bookingType: "Volvo buses",
    seats: "45–52 Seater",
    tagline: "Premium Volvo coaches with air suspension, superior AC and highway comfort.",
    features: ["Air suspension", "Premium AC", "45–52 seats", "Highway-grade reliability"],
    useCases: ["Corporate outings", "Wedding guest fleet", "Interstate tours", "Premium pilgrimages"],
    emoji: "🚌",
    colorClass: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    slug: "mini-bus",
    label: "Mini Bus",
    bookingType: "Mini bus",
    seats: "12–20 Seater",
    tagline: "Compact AC buses perfect for small groups, airport pickups, and city events.",
    features: ["12–20 seats", "Full AC", "City-friendly size", "Multi-pickup routes"],
    useCases: ["Airport transfers", "Wedding VIP shuttle", "Corporate small teams", "School activity runs"],
    emoji: "🚐",
    colorClass: "bg-green-50 border-green-200 text-green-700",
  },
  {
    slug: "tempo-traveller",
    label: "Tempo Traveller",
    bookingType: "Tempo Traveller",
    seats: "12–17 Seater",
    tagline: "India's most popular small-group transport with pushback seats and powerful AC.",
    features: ["Pushback seats", "12–17 passengers", "AC cooling", "Luggage compartment"],
    useCases: ["Family tours", "Pilgrimage trips", "Corporate outings", "Station transfers"],
    emoji: "🚙",
    colorClass: "bg-amber-50 border-amber-200 text-amber-700",
  },
  {
    slug: "luxury-bus",
    label: "Luxury Bus",
    bookingType: "Luxury bus",
    seats: "40–52 Seater",
    tagline: "Premium AC coaches for weddings, corporate events, and group tours in style.",
    features: ["Premium interiors", "Full AC", "40–52 seats", "Event-grade fleet"],
    useCases: ["Wedding transport", "Corporate events", "Group tourism", "VIP movement"],
    emoji: "✨",
    colorClass: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    slug: "large-coach",
    label: "Large Coach",
    bookingType: "Large coach",
    seats: "45–66 Seater",
    tagline: "High-capacity coaches for large group movements and institutional travel.",
    features: ["45–66 seats", "AC available", "Long-distance ready", "Under-belly luggage hold"],
    useCases: ["Conventions", "School trips", "Pilgrimage groups", "Mega events"],
    emoji: "🏢",
    colorClass: "bg-red-50 border-red-200 text-red-700",
  },
  {
    slug: "mercedes-coach",
    label: "Mercedes Coach",
    bookingType: "Mercedes coach",
    seats: "40–50 Seater",
    tagline: "Luxury Mercedes-Benz coaches for the most premium group travel experience.",
    features: ["Mercedes quality", "Premium interiors", "Powerful AC", "VIP comfort"],
    useCases: ["Corporate VIP groups", "High-profile weddings", "Premium tourism", "Executive travel"],
    emoji: "⭐",
    colorClass: "bg-slate-50 border-slate-200 text-slate-700",
  },
  {
    slug: "bharatbenz-bus",
    label: "BharatBenz Bus",
    bookingType: "Bharatbenz bus",
    seats: "40–52 Seater",
    tagline: "Reliable BharatBenz coaches — performance meets comfort at the best price.",
    features: ["BharatBenz chassis", "AC equipped", "40–52 seats", "Value for money"],
    useCases: ["Wedding transport", "Corporate groups", "School excursions", "Interstate travel"],
    emoji: "🛣️",
    colorClass: "bg-orange-50 border-orange-200 text-orange-700",
  },
  {
    slug: "bus-with-washroom",
    label: "Bus with Washroom",
    bookingType: "Bus with washroom",
    seats: "40–45 Seater",
    tagline: "Long-haul buses with onboard washroom for maximum comfort on extended journeys.",
    features: ["Onboard washroom", "AC cooling", "40–45 seats", "Long-distance comfort"],
    useCases: ["Overnight tours", "Mountain trips", "Long-distance pilgrimages", "Extended corporate travel"],
    emoji: "🚿",
    colorClass: "bg-teal-50 border-teal-200 text-teal-700",
  },
  {
    slug: "toyota-minibus",
    label: "Toyota Minibus",
    bookingType: "Toyota minibus",
    seats: "10–14 Seater",
    tagline: "Toyota-powered minibuses delivering reliability and comfort for small groups.",
    features: ["Toyota reliability", "10–14 seats", "AC available", "Smooth ride"],
    useCases: ["Family outings", "Airport pickup", "Small corporate teams", "Local sightseeing"],
    emoji: "🚗",
    colorClass: "bg-cyan-50 border-cyan-200 text-cyan-700",
  },
  {
    slug: "isuzu-bus",
    label: "Isuzu Bus",
    bookingType: "Isuzu bus",
    seats: "20–35 Seater",
    tagline: "Dependable Isuzu mid-size buses built for Indian roads and long-haul comfort.",
    features: ["Isuzu engine", "20–35 seats", "AC equipped", "Fuel-efficient"],
    useCases: ["Mid-size groups", "Corporate travel", "School trips", "City tours"],
    emoji: "🚌",
    colorClass: "bg-indigo-50 border-indigo-200 text-indigo-700",
  },
  {
    slug: "mitsubishi-bus",
    label: "Mitsubishi Bus",
    bookingType: "Mitsubishi bus",
    seats: "20–35 Seater",
    tagline: "Mitsubishi buses combining Japanese engineering with comfort for group travel.",
    features: ["Mitsubishi build", "20–35 seats", "AC available", "Smooth performance"],
    useCases: ["Group outings", "Corporate teams", "Tourism circuits", "Event transport"],
    emoji: "🚌",
    colorClass: "bg-pink-50 border-pink-200 text-pink-700",
  },
  {
    slug: "motorhome",
    label: "Motorhome",
    bookingType: "Motorhome",
    seats: "6–10 Berths",
    tagline: "Self-contained motorhomes with sleeping, living and cooking facilities on the go.",
    features: ["Sleep onboard", "Self-contained", "6–10 berths", "Full amenities"],
    useCases: ["Luxury road trips", "Film/shoot crew", "Extended family tours", "Adventure travel"],
    emoji: "🏠",
    colorClass: "bg-lime-50 border-lime-200 text-lime-700",
  },
];

/** Look up a bus type route by its URL slug. */
export function getBusTypeRoute(slug: string): BusTypeRoute | undefined {
  return BUS_TYPE_ROUTES.find((r) => r.slug === slug);
}

/** Slugify a BOOKING_BUS_TYPES label to its route slug. */
export function bookingTypeToSlug(bookingType: string): string | undefined {
  return BUS_TYPE_ROUTES.find((r) => r.bookingType === bookingType)?.slug;
}
