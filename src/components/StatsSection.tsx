import { Bus, Users, Star, MapPin } from "lucide-react";

const stats = [
  { icon: Bus, value: "500+", label: "Bus Operators" },
  { icon: Users, value: "50,000+", label: "Happy Customers" },
  { icon: Star, value: "4.8/5", label: "Average Rating" },
  { icon: MapPin, value: "200+", label: "Cities Covered" },
];

export function StatsSection() {
  return (
    <section className="bg-primary py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-7 h-7 text-primary-foreground/70 mx-auto mb-2" />
              <div className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground">{stat.value}</div>
              <div className="text-sm text-primary-foreground/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
