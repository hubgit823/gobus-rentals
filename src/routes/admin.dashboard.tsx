import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Users, Building2, BookOpen, IndianRupee, TrendingUp, Bus } from "lucide-react";
import { api } from "@/lib/api";
import { panelPage, panelStatePadding } from "@/lib/panel-page";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

type StatsRes = {
  totalUsers: number;
  activeVendors: number;
  totalBookings: number;
  totalBuses: number;
  revenueDisplay: string;
  commissionDisplay: string;
  commissionPercent?: number;
  gstEnabled?: boolean;
};

type BookRow = {
  id: string;
  customer: string;
  vendor: string;
  route: string;
  amount: string;
  paymentStatus?: string;
  status: string;
};

type BookingsRes = { bookings: BookRow[] };

const statusColor: Record<string, string> = {
  confirmed: "bg-chart-4/20 text-chart-4",
  on_trip: "bg-primary/20 text-primary",
  completed: "bg-chart-2/20 text-chart-2",
  cancelled: "bg-destructive/20 text-destructive",
  pending_payment: "bg-chart-5/20 text-chart-5",
};

function labelStatus(s: string) {
  const m: Record<string, string> = {
    pending_payment: "Pending payment",
    confirmed: "Confirmed",
    on_trip: "On Trip",
    completed: "Completed",
    cancelled: "Cancelled",
  };
  return m[s] ?? s;
}

function AdminDashboard() {
  const statsQ = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => api<StatsRes>("/api/admin/stats"),
  });

  const bookQ = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => api<BookingsRes>("/api/admin/bookings"),
  });

  const s = statsQ.data;
  const stats = [
    { label: "Total Users", value: String(s?.totalUsers ?? "—"), icon: Users, color: "text-primary" },
    { label: "Active Vendors", value: String(s?.activeVendors ?? "—"), icon: Building2, color: "text-chart-2" },
    { label: "Total Bookings", value: String(s?.totalBookings ?? "—"), icon: BookOpen, color: "text-chart-4" },
    { label: "Revenue (bookings)", value: s?.revenueDisplay ?? "—", icon: IndianRupee, color: "text-chart-5" },
    {
      label: `Commission (${s?.commissionPercent ?? 10}%, est.)`,
      value: s?.commissionDisplay ?? "—",
      icon: TrendingUp,
      color: "text-destructive",
    },
    { label: "Total Buses", value: String(s?.totalBuses ?? "—"), icon: Bus, color: "text-accent" },
  ];

  const recent = (bookQ.data?.bookings ?? []).slice(0, 8);

  return (
    <div className={panelPage.standard}>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Platform overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
        {stats.map((x) => (
          <div key={x.label} className="bg-card rounded-xl border border-border p-4 sm:p-5">
            <x.icon className={`w-5 h-5 ${x.color} mb-2`} />
            <span className={`font-display text-xl font-bold ${x.color} block`}>{x.value}</span>
            <p className="text-xs text-muted-foreground mt-1">{x.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border">
          <h2 className="font-display font-semibold text-foreground">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          {bookQ.isLoading ? (
            <p className="p-5 text-sm text-muted-foreground">Loading…</p>
          ) : recent.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">No bookings yet.</p>
          ) : (
            <table className="w-full min-w-[640px] text-sm">
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
                {recent.map((b) => (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-5 py-3 font-medium text-foreground font-mono text-xs">{b.id.slice(-8)}</td>
                    <td className="px-5 py-3 text-foreground">{b.customer}</td>
                    <td className="px-5 py-3 text-foreground">{b.vendor}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.route}</td>
                    <td className="px-5 py-3 font-medium text-primary">{b.amount}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[b.status] ?? "bg-muted"}`}>{labelStatus(b.status)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
