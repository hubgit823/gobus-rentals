import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check, X, Clock } from "lucide-react";

export const Route = createFileRoute("/customer/quotes")({
  component: CustomerQuotes,
});

const quotes = [
  { id: "Q001", vendor: "ABC Travels", route: "Mumbai → Pune", bus: "40 Seater AC", price: "₹16,000", rating: 4.5, responseTime: "15 min", inclusions: "Driver, Toll, Parking" },
  { id: "Q002", vendor: "Royal Tours", route: "Mumbai → Pune", bus: "40 Seater AC", price: "₹18,500", rating: 4.8, responseTime: "8 min", inclusions: "Driver, Toll, Parking, Water" },
  { id: "Q003", vendor: "Green Travels", route: "Mumbai → Pune", bus: "40 Seater AC", price: "₹15,200", rating: 4.2, responseTime: "32 min", inclusions: "Driver, Toll" },
];

function CustomerQuotes() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Quotes</h1>
      <p className="text-muted-foreground text-sm mb-6">Compare quotes from bus operators and select the best one</p>

      <div className="space-y-4">
        {quotes.map((q) => (
          <div key={q.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{q.vendor}</h3>
                  <span className="px-2 py-0.5 bg-chart-4/20 text-chart-4 rounded-full text-xs font-medium">⭐ {q.rating}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {q.responseTime}</span>
                </div>
                <p className="text-sm text-muted-foreground">{q.route} • {q.bus}</p>
                <p className="text-xs text-muted-foreground mt-1">Includes: {q.inclusions}</p>
              </div>
              <div className="text-right flex sm:flex-col items-center sm:items-end gap-3">
                <span className="font-display text-2xl font-bold text-primary">{q.price}</span>
                <div className="flex gap-2">
                  <Button size="sm" className="gap-1"><Check className="w-3.5 h-3.5" /> Accept</Button>
                  <Button variant="outline" size="sm" className="gap-1"><X className="w-3.5 h-3.5" /> Decline</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
