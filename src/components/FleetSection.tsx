import { Users, Snowflake, Moon } from "lucide-react";
import { fleetImages } from "@/lib/media";

const fleetItems = [
  {
    title: "12 Seater Mini Bus",
    seats: "12",
    desc: "Perfect for small groups & airport transfers",
    ac: true,
    image: fleetImages.vanUrbaniaFront,
  },
  {
    title: "17 Seater Mini Bus",
    seats: "17",
    desc: "Ideal for family trips & outings",
    ac: true,
    image: fleetImages.vanTravellerSide,
  },
  {
    title: "26 Seater Bus",
    seats: "26",
    desc: "Great for school trips & office outings",
    ac: true,
    image: fleetImages.vanInteriorAisle,
  },
  {
    title: "32 Seater Bus",
    seats: "32",
    desc: "Best for medium-sized group tours",
    ac: true,
    image: fleetImages.busInteriorOverheadRacks,
  },
  {
    title: "40 Seater Luxury Bus",
    seats: "40",
    desc: "Premium comfort for large groups",
    ac: true,
    image: fleetImages.coachSeatsReclining,
  },
  {
    title: "49/52 Seater Coach",
    seats: "49-52",
    desc: "Full-size coach for weddings & events",
    ac: true,
    image: fleetImages.coachDepotLine,
  },
  {
    title: "Sleeper Bus",
    seats: "30-40",
    desc: "Overnight journeys in comfort",
    ac: true,
    image: fleetImages.coachInteriorSemiSleeper,
  },
  {
    title: "Non-AC Bus",
    seats: "40-52",
    desc: "Budget-friendly option for any trip",
    ac: false,
    image: fleetImages.coachMountainRoad,
  },
];

export function FleetSection() {
  return (
    <section id="fleet" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Fleet</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Choose Your Perfect Bus
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            From compact mini buses to full-size luxury coaches — we have the right bus for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fleetItems.map((item) => (
            <div
              key={item.title}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  width={640}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain sm:object-cover bg-muted/30 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 pt-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{item.desc}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-foreground font-medium">
                    <Users className="w-3.5 h-3.5 text-primary" /> {item.seats} seats
                  </span>
                  <span className="flex items-center gap-1 text-foreground font-medium">
                    {item.ac ? <Snowflake className="w-3.5 h-3.5 text-primary" /> : <Moon className="w-3.5 h-3.5 text-muted-foreground" />}
                    {item.ac ? "AC" : "Non-AC"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
