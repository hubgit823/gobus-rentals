import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Eye, Edit, X } from "lucide-react";

export const Route = createFileRoute("/admin/bookings")({
  component: AdminBookings,
});

const bookings = [
  { id: "BK1001", customer: "Priya Sharma", vendor: "ABC Travels", route: "Mumbai → Goa", date: "2025-02-18", amount: "₹22,000", commission: "₹2,200", status: "Confirmed" },
  { id: "BK1002", customer: "Rajesh Mehta", vendor: "Royal Tours", route: "Delhi → Agra", date: "2025-02-20", amount: "₹14,500", commission: "₹1,450", status: "On Trip" },
  { id: "BK1003", customer: "Anita Verma", vendor: "Green Travels", route: "Pune → Shirdi", date: "2025-01-10", amount: "₹8,000", commission: "₹800", status: "Completed" },
  { id: "BK1004", customer: "Suresh K.", vendor: "Star Bus Co.", route: "Chennai → Pondi", date: "2024-12-25", amount: "₹5,500", commission: "₹550", status: "Cancelled" },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-chart-4/20 text-chart-4",
  "On Trip": "bg-primary/20 text-primary",
  Completed: "bg-chart-2/20 text-chart-2",
  Cancelled: "bg-destructive/20 text-destructive",
};

function AdminBookings() {
  return (
    <div className="p-6 sm:p-8 max-w-7xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">All Bookings</h1>
      <p className="text-muted-foreground text-sm mb-6">View and manage all platform bookings</p>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-left px-4 py-3 font-medium">Customer</th>
              <th className="text-left px-4 py-3 font-medium">Vendor</th>
              <th className="text-left px-4 py-3 font-medium">Route</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-left px-4 py-3 font-medium">Amount</th>
              <th className="text-left px-4 py-3 font-medium">Commission</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-4 py-3 font-medium text-foreground">{b.id}</td>
                <td className="px-4 py-3 text-foreground">{b.customer}</td>
                <td className="px-4 py-3 text-foreground">{b.vendor}</td>
                <td className="px-4 py-3 text-muted-foreground">{b.route}</td>
                <td className="px-4 py-3 text-muted-foreground">{b.date}</td>
                <td className="px-4 py-3 font-medium text-foreground">{b.amount}</td>
                <td className="px-4 py-3 text-primary">{b.commission}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[b.status]}`}>{b.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><X className="w-3.5 h-3.5" /></Button>
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
