import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/vendor/bookings")({
  component: VendorBookings,
});

const bookings = [
  { id: "BK001", customer: "Priya Sharma", route: "Mumbai → Goa", date: "2025-02-18", bus: "Volvo 9400 (49S)", amount: "₹22,000", status: "Confirmed" },
  { id: "BK002", customer: "Rajesh Mehta", route: "Delhi → Agra", date: "2025-02-20", bus: "Ashok Leyland (40S)", amount: "₹14,500", status: "On Trip" },
  { id: "BK003", customer: "Anita Verma", route: "Pune → Shirdi", date: "2025-01-10", bus: "Force Traveller (17S)", amount: "₹8,000", status: "Completed" },
];

const statusColor: Record<string, string> = {
  Pending: "bg-chart-5/20 text-chart-5",
  Confirmed: "bg-chart-4/20 text-chart-4",
  "On Trip": "bg-primary/20 text-primary",
  Completed: "bg-chart-2/20 text-chart-2",
  Cancelled: "bg-destructive/20 text-destructive",
};

const statusOptions = ["Pending", "Confirmed", "On Trip", "Completed", "Cancelled"];

function VendorBookings() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Booking Management</h1>
      <p className="text-muted-foreground text-sm mb-6">Manage and update booking statuses</p>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">Booking ID</th>
              <th className="text-left px-5 py-3 font-medium">Customer</th>
              <th className="text-left px-5 py-3 font-medium">Route</th>
              <th className="text-left px-5 py-3 font-medium">Date</th>
              <th className="text-left px-5 py-3 font-medium">Bus</th>
              <th className="text-left px-5 py-3 font-medium">Amount</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Update</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-5 py-3 font-medium text-foreground">{b.id}</td>
                <td className="px-5 py-3 text-foreground">{b.customer}</td>
                <td className="px-5 py-3 text-foreground">{b.route}</td>
                <td className="px-5 py-3 text-muted-foreground">{b.date}</td>
                <td className="px-5 py-3 text-muted-foreground">{b.bus}</td>
                <td className="px-5 py-3 font-medium text-primary">{b.amount}</td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[b.status]}`}>{b.status}</span></td>
                <td className="px-5 py-3">
                  <Select defaultValue={b.status}>
                    <SelectTrigger className="h-8 w-32 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
