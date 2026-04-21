import { COMPANY } from "@/lib/company";

export const BUS_SEAT_MIN = 12;
export const BUS_SEAT_MAX = 66;

type BusCapacityRow = {
  seats: number;
  title: string;
  /** Unique on-page copy for SEO + user guidance */
  description: string;
};

const region = `${COMPANY.operatingLocations}`;
const brand = COMPANY.platformBrand;

function describe(seats: number): string {
  const n = seats;
  const mod = n % 5;
  const purpose = [
    "airport crew transfers, hotel loops, and last-mile delegate shuttles",
    "corporate town-halls, off-site training batches, and B2B conference circuits",
    "wedding baraat legs, sangeet guest blocks, and multi-venue same-day hops",
    "school and university industrial visits with faculty escorts",
    "pilgrimage convoys, temple circuits, and faith-group charters with luggage-heavy manifests",
  ][mod]!;

  if (n <= 16) {
    return `${n}-seater mini-bus hire suits compact groups needing ${purpose} across ${region}. Operators typically propose high-roof vans or short-wheelbase coaches with generous door width for luggage, reclining seats where trim allows, and tight turning circles for old-city gates. Mention stair-climb difficulty if elderly passengers dominate so vendors suggest grab-rail configurations and step-lighting. This band competes with premium tempo travellers—choose a coach when aisle headroom and under-belly lockers beat roof-carrier compromises.`;
  }
  if (n <= 22) {
    return `${n}-seater midi layouts bridge vans and full coaches, ideal when ${purpose} but you still want hill-road agility on ghat sections. Expect two-by-two seating, mid-position emergency exits, and PA microphones standard. AC compressor sizing matters for June heat—ask for coach age. Quote comparisons on ${brand} should list night-driving dual-driver options if your itinerary exceeds safe single-driver hours.`;
  }
  if (n <= 30) {
    return `${n}-seater buses appear constantly in college fest shuttles, IT park employee batches, and regional wedding guest lists where ${purpose}. Luggage volume becomes meaningful; specify soft bags versus hard cases. Some fleets offer washrooms at this tier—availability is route-dependent. GST-inclusive totals should still separate toll/parking actuals unless explicitly packaged.`;
  }
  if (n <= 36) {
    return `${n}-seater coaches suit medium tour groups executing ${purpose} with moderate aisle traffic. Push-back seats, reading lamps, and curtains are common. For Himachal rotations, confirm retarder and engine braking comments from prior customers—gradient discipline matters. If your group mixes standing crew (photographers, event managers), clarify legal standing rules; seated capacity must not be exceeded on national permits.`;
  }
  if (n <= 42) {
    return `${n}-seater full-width bodies align with corporate annual days, large wedding guest blocks, and MICE ${purpose}. Compare Volvo versus Indian OEM builds for suspension comfort on broken NH sections. Entertainment licensing varies—state needs explicitly. Corporate clients should request Wi-Fi dongle throughput estimates; fifty simultaneous phones stress consumer-grade routers.`;
  }
  if (n <= 49) {
    return `${n}-seater luxury coaches dominate premium wedding markets and high-visibility ${purpose}. Panoramic windshields, improved NVH, and larger fuel tanks for long non-stop legs appear more often. Check seat pitch millimetres in quotations—two coaches both labelled “luxury” may differ by ten centimetres per row, compounding comfort over eight-hour drives.`;
  }
  if (n <= 55) {
    return `${n}-seater highway coaches are the workhorse class for interstate ${purpose}, political rallies, and large school batches. Operators may propose Volvo B11R-class layouts, Scania Metrolink derivatives, or Tata Marcopolo Starbus configurations. Ask about pantry modules, water heaters, and second-driver bunks for overnight positioning legs empty of passengers.`;
  }
  if (n <= 60) {
    return `${n}-seater layouts approach maximum single-deck lengths permitted on Indian schedules while still serving ${purpose}. Turning radius at tight U-turns becomes a planning constraint—share Google Maps pin accuracy. Luggage manifests for exhibition cargo or sports kits should list dimensions; belly height may require tail lifts.`;
  }
  return `${n}-seater represents near-maximum single-deck seating for large ${purpose} where every seat must be documented on permits and manifests. Operators will scrutinise axle loads on weak rural bridges—provide accurate headcounts and cargo weights. For Delhi–Himachal loops, expect premium quotes reflecting wear-and-tear, hill permits, and higher insurance exposure.`;
}

export const busCapacities12to66: readonly BusCapacityRow[] = Array.from(
  { length: BUS_SEAT_MAX - BUS_SEAT_MIN + 1 },
  (_, i) => {
    const seats = BUS_SEAT_MIN + i;
    return {
      seats,
      title: `${seats} Seater Bus`,
      description: describe(seats),
    };
  },
);
