import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Wedding Planner, Delhi",
    text: "Luxury Bus Rental made our wedding transport seamless. Got 5 quotes within an hour and saved ₹40,000 compared to our usual vendor!",
    rating: 5,
  },
  {
    name: "Rajesh Mehta",
    role: "HR Manager, TCS Mumbai",
    text: "We use Luxury Bus Rental for all our corporate outings. The platform is reliable, buses are clean, and operators are professional.",
    rating: 5,
  },
  {
    name: "Anita Verma",
    role: "Tour Organizer, Jaipur",
    text: "Best bus rental platform in India! Easy to compare prices and the AC coaches we got for our Rajasthan tour were top-notch.",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Loved by Thousands
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            See what our customers say about their experience with Luxury Bus Rental.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-xl border border-border p-6 sm:p-8 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < t.rating ? "text-chart-5 fill-chart-5" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
