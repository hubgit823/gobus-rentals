import { Users, Snowflake, Moon } from "lucide-react";

const fleetItems = [
  {
    title: "12 Seater Mini Bus",
    seats: "12",
    desc: "Perfect for small groups & airport transfers",
    ac: true,
    image: "/images/home/group-travel.jpg",
  },
  {
    title: "17 Seater Mini Bus",
    seats: "17",
    desc: "Ideal for family trips & outings",
    ac: true,
    image: "/images/home/road-trip.jpg",
  },
  {
    title: "26 Seater Bus",
    seats: "26",
    desc: "Great for school trips & office outings",
    ac: true,
    image: "/images/home/bus-travel.jpg",
  },
  {
    title: "32 Seater Bus",
    seats: "32",
    desc: "Best for medium-sized group tours",
    ac: true,
    image: "/images/home/city-lights.jpg",
  },
  {
    title: "40 Seater Luxury Bus",
    seats: "40",
    desc: "Premium comfort for large groups",
    ac: true,
    image: "/images/home/corporate-team.jpg",
  },
  {
    title: "49/52 Seater Coach",
    seats: "49-52",
    desc: "Full-size coach for weddings & events",
    ac: true,
    image: "/images/home/wedding-celebration.jpg",
  },
  {
    title: "Sleeper Bus",
    seats: "30-40",
    desc: "Overnight journeys in comfort",
    ac: true,
    image: "/images/home/city-lights.jpg",
  },
  {
    title: "Non-AC Bus",
    seats: "40-52",
    desc: "Budget-friendly option for any trip",
    ac: false,
    image: "/images/home/mountains-north.jpg",
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
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
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
