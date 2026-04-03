import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Download, Eye, X } from "lucide-react";

export const Route = createFileRoute("/customer/bookings")({
  component: CustomerBookings,
});

const bookings = [
  { id: "BK001", from: "Mumbai", to: "Pune", date: "2025-02-15", bus: "40 Seater AC", vendor: "ABC Travels", status: "Confirmed", amount: "₹18,000" },
  { id: "BK002", from: "Delhi", to: "Jaipur", date: "2025-02-20", bus: "26 Seater AC", vendor: "Royal Tours", status: "Pending", amount: "₹12,500" },
  { id: "BK003", from: "Bangalore", to: "Mysore", date: "2025-01-10", bus: "17 Seater Mini", vendor: "Green Travels", status: "Completed", amount: "₹8,000" },
  { id: "BK004", from: "Chennai", to: "Pondicherry", date: "2024-12-25", bus: "12 Seater Mini", vendor: "Star Bus Co.", status: "Cancelled", amount: "₹5,500" },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-chart-4/20 text-chart-4",
  Pending: "bg-chart-5/20 text-chart-5",
  Completed: "bg-chart-2/20 text-chart-2",
  Cancelled: "bg-destructive/20 text-destructive",
};

function CustomerBookings() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Bookings</h1>
      <p className="text-muted-foreground text-sm mb-6">View and manage all your bus bookings</p>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">ID</th>
              <th className="text-left px-5 py-3 font-medium">Route</th>
              <th className="text-left px-5 py-3 font-medium">Date</th>
              <th className="text-left px-5 py-3 font-medium">Bus</th>
              <th className="text-left px-5 py-3 font-medium">Operator</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Amount</th>
              <th className="text-left px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-5 py-3 font-medium text-foreground">{b.id}</td>
                <td className="px-5 py-3 text-foreground">{b.from} → {b.to}</td>
                <td className="px-5 py-3 text-muted-foreground">{b.date}</td>
                <td className="px-5 py-3 text-muted-foreground">{b.bus}</td>
                <td className="px-5 py-3 text-foreground">{b.vendor}</td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[b.status]}`}>{b.status}</span></td>
                <td className="px-5 py-3 font-medium text-foreground">{b.amount}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="w-3.5 h-3.5" /></Button>
                    {b.status === "Pending" && <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><X className="w-3.5 h-3.5" /></Button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
