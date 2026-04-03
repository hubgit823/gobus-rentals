import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/customer/reviews")({
  component: CustomerReviews,
});

const reviews = [
  { id: 1, vendor: "ABC Travels", route: "Mumbai → Pune", date: "2025-01-15", rating: 5, text: "Excellent service! Bus was clean and driver was very professional." },
  { id: 2, vendor: "Green Travels", route: "Bangalore → Mysore", date: "2025-01-10", rating: 4, text: "Good bus, on time. AC was slightly weak but overall a nice experience." },
];

function CustomerReviews() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Reviews</h1>
      <p className="text-muted-foreground text-sm mb-6">Your feedback helps other travelers</p>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">{r.vendor}</h3>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < r.rating ? "text-chart-5 fill-chart-5" : "text-muted"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{r.route} • {r.date}</p>
            <p className="text-sm text-foreground">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
