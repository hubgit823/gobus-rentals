import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Clock, Star, Bus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/customer/dashboard")({
  component: CustomerDashboard,
});

const mockBookings = [
  { id: "BK001", from: "Mumbai", to: "Pune", date: "2025-02-15", bus: "40 Seater AC", status: "Confirmed", amount: "₹18,000" },
  { id: "BK002", from: "Delhi", to: "Jaipur", date: "2025-02-20", bus: "26 Seater AC", status: "Pending", amount: "₹12,500" },
  { id: "BK003", from: "Bangalore", to: "Mysore", date: "2025-01-10", bus: "17 Seater Mini", status: "Completed", amount: "₹8,000" },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-chart-4/20 text-chart-4",
  Pending: "bg-chart-5/20 text-chart-5",
  Completed: "bg-chart-2/20 text-chart-2",
  Cancelled: "bg-destructive/20 text-destructive",
};

function CustomerDashboard() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, John! 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your bus bookings and track quotes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Active Bookings", value: "2", icon: BookOpen, color: "text-primary" },
          { label: "Pending Quotes", value: "3", icon: Clock, color: "text-chart-5" },
          { label: "Reviews Given", value: "5", icon: Star, color: "text-chart-4" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <span className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</span>
            </div>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display font-semibold text-foreground">Recent Bookings</h2>
          <Link to="/customer/bookings">
            <Button variant="ghost" size="sm" className="gap-1 text-primary">View All <ArrowRight className="w-3.5 h-3.5" /></Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-5 py-3 font-medium">Booking ID</th>
                <th className="text-left px-5 py-3 font-medium">Route</th>
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Bus</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-5 py-3 font-medium text-foreground">{b.id}</td>
                  <td className="px-5 py-3 text-foreground">{b.from} → {b.to}</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.date}</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.bus}</td>
                  <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[b.status]}`}>{b.status}</span></td>
                  <td className="px-5 py-3 font-medium text-foreground">{b.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/book">
          <Button size="lg" className="gap-2">
            <Bus className="w-4 h-4" /> Book a New Bus
          </Button>
        </Link>
      </div>
    </div>
  );
}
