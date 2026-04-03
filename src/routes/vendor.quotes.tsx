import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/vendor/quotes")({
  component: VendorQuotes,
});

const quotes = [
  { id: "Q001", customer: "Priya S.", route: "Mumbai → Goa", price: "₹22,000", date: "2025-02-14", status: "Sent", inclusions: "Driver, Toll, Parking, Water" },
  { id: "Q002", customer: "Rajesh M.", route: "Delhi → Agra", price: "₹14,500", date: "2025-02-15", status: "Accepted", inclusions: "Driver, Toll" },
  { id: "Q003", customer: "Amit K.", route: "Pune → Mumbai", price: "₹8,000", date: "2025-02-16", status: "Declined", inclusions: "Driver, Toll, Parking" },
];

const statusColor: Record<string, string> = {
  Sent: "bg-chart-5/20 text-chart-5",
  Accepted: "bg-chart-2/20 text-chart-2",
  Declined: "bg-destructive/20 text-destructive",
};

function VendorQuotes() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Quotes</h1>
      <p className="text-muted-foreground text-sm mb-6">Track all quotes you've sent to customers</p>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">Quote ID</th>
              <th className="text-left px-5 py-3 font-medium">Customer</th>
              <th className="text-left px-5 py-3 font-medium">Route</th>
              <th className="text-left px-5 py-3 font-medium">Price</th>
              <th className="text-left px-5 py-3 font-medium">Inclusions</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-5 py-3 font-medium text-foreground">{q.id}</td>
                <td className="px-5 py-3 text-foreground">{q.customer}</td>
                <td className="px-5 py-3 text-foreground">{q.route}</td>
                <td className="px-5 py-3 font-medium text-primary">{q.price}</td>
                <td className="px-5 py-3 text-muted-foreground text-xs">{q.inclusions}</td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[q.status]}`}>{q.status}</span></td>
                <td className="px-5 py-3"><Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3.5 h-3.5" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
