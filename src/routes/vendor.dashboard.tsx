import { createFileRoute } from "@tanstack/react-router";
import { Bus, ClipboardList, IndianRupee, Star, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/vendor/dashboard")({
  component: VendorDashboard,
});

const stats = [
  { label: "Total Buses", value: "12", icon: Bus, color: "text-primary" },
  { label: "Active Leads", value: "8", icon: ClipboardList, color: "text-chart-5" },
  { label: "Confirmed Bookings", value: "24", icon: Users, color: "text-chart-2" },
  { label: "Total Earnings", value: "₹4,85,000", icon: IndianRupee, color: "text-chart-4" },
  { label: "Avg Rating", value: "4.6", icon: Star, color: "text-chart-5" },
  { label: "This Month", value: "₹1,20,000", icon: TrendingUp, color: "text-primary" },
];

const recentLeads = [
  { id: "L001", customer: "Priya S.", route: "Mumbai → Goa", date: "2025-02-18", bus: "40 Seater AC", status: "New" },
  { id: "L002", customer: "Rajesh M.", route: "Delhi → Agra", date: "2025-02-20", bus: "26 Seater AC", status: "Quoted" },
  { id: "L003", customer: "Anita V.", route: "Pune → Shirdi", date: "2025-02-22", bus: "17 Seater", status: "New" },
];

function VendorDashboard() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Vendor Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your bus rental business</p>
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
          <h2 className="font-display font-semibold text-foreground">Recent Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-5 py-3 font-medium">Lead ID</th>
                <th className="text-left px-5 py-3 font-medium">Customer</th>
                <th className="text-left px-5 py-3 font-medium">Route</th>
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Bus Type</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-5 py-3 font-medium text-foreground">{l.id}</td>
                  <td className="px-5 py-3 text-foreground">{l.customer}</td>
                  <td className="px-5 py-3 text-foreground">{l.route}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.date}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.bus}</td>
                  <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.status === "New" ? "bg-primary/20 text-primary" : "bg-chart-4/20 text-chart-4"}`}>{l.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
