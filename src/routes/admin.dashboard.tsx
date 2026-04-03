import { createFileRoute } from "@tanstack/react-router";
import { Users, Building2, BookOpen, IndianRupee, TrendingUp, Bus } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

const stats = [
  { label: "Total Users", value: "12,450", icon: Users, color: "text-primary" },
  { label: "Active Vendors", value: "523", icon: Building2, color: "text-chart-2" },
  { label: "Total Bookings", value: "8,920", icon: BookOpen, color: "text-chart-4" },
  { label: "Revenue", value: "₹2.8 Cr", icon: IndianRupee, color: "text-chart-5" },
  { label: "Commission Earned", value: "₹28 L", icon: TrendingUp, color: "text-destructive" },
  { label: "Total Buses", value: "3,450", icon: Bus, color: "text-accent" },
];

const recentBookings = [
  { id: "BK1001", customer: "Priya S.", vendor: "ABC Travels", route: "Mumbai → Goa", amount: "₹22,000", status: "Confirmed" },
  { id: "BK1002", customer: "Rajesh M.", vendor: "Royal Tours", route: "Delhi → Agra", amount: "₹14,500", status: "On Trip" },
  { id: "BK1003", customer: "Anita V.", vendor: "Green Travels", route: "Pune → Shirdi", amount: "₹8,000", status: "Completed" },
  { id: "BK1004", customer: "Suresh K.", vendor: "Star Bus Co.", route: "Chennai → Pondi", amount: "₹5,500", status: "Cancelled" },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-chart-4/20 text-chart-4",
  "On Trip": "bg-primary/20 text-primary",
  Completed: "bg-chart-2/20 text-chart-2",
  Cancelled: "bg-destructive/20 text-destructive",
};

function AdminDashboard() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Platform overview and analytics</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5">
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <span className={`font-display text-xl font-bold ${s.color} block`}>{s.value}</span>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border">
          <h2 className="font-display font-semibold text-foreground">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-5 py-3 font-medium">ID</th>
                <th className="text-left px-5 py-3 font-medium">Customer</th>
                <th className="text-left px-5 py-3 font-medium">Vendor</th>
                <th className="text-left px-5 py-3 font-medium">Route</th>
                <th className="text-left px-5 py-3 font-medium">Amount</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-5 py-3 font-medium text-foreground">{b.id}</td>
                  <td className="px-5 py-3 text-foreground">{b.customer}</td>
                  <td className="px-5 py-3 text-foreground">{b.vendor}</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.route}</td>
                  <td className="px-5 py-3 font-medium text-primary">{b.amount}</td>
                  <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[b.status]}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
