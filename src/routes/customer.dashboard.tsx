import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Clock, Star, Bus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { getStoredUser } from "@/lib/auth-storage";

export const Route = createFileRoute("/customer/dashboard")({
  component: CustomerDashboard,
});

type Stats = { activeBookings: string; pendingQuotes: string; reviewsGiven: string };
type BookRes = {
  bookings: Array<{
    id: string;
    from: string;
    to: string;
    date: string;
    bus: string;
    status: string;
    amount: string;
  }>;
};

const statusColor: Record<string, string> = {
  Confirmed: "bg-chart-4/20 text-chart-4",
  Pending: "bg-chart-5/20 text-chart-5",
  Completed: "bg-chart-2/20 text-chart-2",
  Cancelled: "bg-destructive/20 text-destructive",
  "On Trip": "bg-primary/20 text-primary",
};

function CustomerDashboard() {
  const user = getStoredUser();

  const statsQ = useQuery({
    queryKey: ["customer-dashboard-stats"],
    queryFn: () => api<Stats>("/api/customer/dashboard-stats"),
  });

  const bookingsQ = useQuery({
    queryKey: ["customer-bookings"],
    queryFn: () => api<BookRes>("/api/customer/bookings"),
  });

  const stats = statsQ.data;
  const mockBookings = (bookingsQ.data?.bookings ?? []).slice(0, 5);

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Welcome back{user?.name ? `, ${user.name}` : ""}! 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your bus bookings and track quotes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Active Bookings", value: stats?.activeBookings ?? "—", icon: BookOpen, color: "text-primary" },
          { label: "Pending Quotes", value: stats?.pendingQuotes ?? "—", icon: Clock, color: "text-chart-5" },
          { label: "Reviews Given", value: stats?.reviewsGiven ?? "—", icon: Star, color: "text-chart-4" },
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
          {bookingsQ.isLoading ? (
            <p className="p-5 text-sm text-muted-foreground">Loading…</p>
          ) : mockBookings.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">No bookings yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left px-5 py-3 font-medium">Booking</th>
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
                    <td className="px-5 py-3 font-medium text-foreground font-mono text-xs">{b.id.slice(-8)}</td>
                    <td className="px-5 py-3 text-foreground">{b.from} → {b.to}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.date}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.bus}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[b.status] ?? "bg-muted"}`}>{b.status}</span>
                    </td>
                    <td className="px-5 py-3 font-medium text-foreground">{b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
