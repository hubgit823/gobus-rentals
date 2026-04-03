import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/quotes")({
  component: AdminQuotes,
});

const quotes = [
  { id: "Q101", vendor: "ABC Travels", customer: "Priya S.", route: "Mumbai → Goa", price: "₹22,000", avgMarket: "₹20,000", flag: false },
  { id: "Q102", vendor: "Royal Tours", customer: "Rajesh M.", route: "Delhi → Agra", price: "₹35,000", avgMarket: "₹12,000", flag: true },
  { id: "Q103", vendor: "Green Travels", customer: "Anita V.", route: "Pune → Shirdi", price: "₹8,500", avgMarket: "₹8,000", flag: false },
];

function AdminQuotes() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Quote Monitoring</h1>
      <p className="text-muted-foreground text-sm mb-6">Track operator quotes and detect fake pricing</p>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">Quote ID</th>
              <th className="text-left px-5 py-3 font-medium">Vendor</th>
              <th className="text-left px-5 py-3 font-medium">Customer</th>
              <th className="text-left px-5 py-3 font-medium">Route</th>
              <th className="text-left px-5 py-3 font-medium">Price</th>
              <th className="text-left px-5 py-3 font-medium">Market Avg</th>
              <th className="text-left px-5 py-3 font-medium">Flag</th>
              <th className="text-left px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className={`border-b border-border last:border-0 hover:bg-muted/50 ${q.flag ? "bg-destructive/5" : ""}`}>
                <td className="px-5 py-3 font-medium text-foreground">{q.id}</td>
                <td className="px-5 py-3 text-foreground">{q.vendor}</td>
                <td className="px-5 py-3 text-foreground">{q.customer}</td>
                <td className="px-5 py-3 text-muted-foreground">{q.route}</td>
                <td className="px-5 py-3 font-medium text-foreground">{q.price}</td>
                <td className="px-5 py-3 text-muted-foreground">{q.avgMarket}</td>
                <td className="px-5 py-3">
                  {q.flag && <span className="flex items-center gap-1 text-destructive text-xs font-medium"><AlertTriangle className="w-3.5 h-3.5" /> Overpriced</span>}
                </td>
                <td className="px-5 py-3"><Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3.5 h-3.5" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
