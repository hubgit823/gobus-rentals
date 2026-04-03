import { createFileRoute } from "@tanstack/react-router";
import { IndianRupee, TrendingUp, ArrowDownRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/payments")({
  component: AdminPayments,
});

const payments = [
  { id: "PAY001", booking: "BK1003", vendor: "Green Travels", amount: "₹8,000", commission: "₹800", payout: "₹7,200", status: "Paid", date: "2025-01-15" },
  { id: "PAY002", booking: "BK1001", vendor: "ABC Travels", amount: "₹22,000", commission: "₹2,200", payout: "₹19,800", status: "Pending", date: "2025-02-20" },
  { id: "PAY003", booking: "BK1004", vendor: "Star Bus Co.", amount: "₹5,500", commission: "₹0", payout: "₹5,500", status: "Refunded", date: "2024-12-28" },
];

function AdminPayments() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Payment Management</h1>
      <p className="text-muted-foreground text-sm mb-6">Commission tracking, refunds, and vendor payouts</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: "₹2.8 Cr", icon: IndianRupee, color: "text-chart-2" },
          { label: "Commission", value: "₹28 L", icon: TrendingUp, color: "text-primary" },
          { label: "Pending Payouts", value: "₹3.2 L", icon: ArrowDownRight, color: "text-chart-5" },
          { label: "Refunds", value: "₹45,000", icon: RefreshCw, color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5">
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <span className={`font-display text-lg font-bold ${s.color} block`}>{s.value}</span>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">Payment ID</th>
              <th className="text-left px-5 py-3 font-medium">Booking</th>
              <th className="text-left px-5 py-3 font-medium">Vendor</th>
              <th className="text-left px-5 py-3 font-medium">Amount</th>
              <th className="text-left px-5 py-3 font-medium">Commission</th>
              <th className="text-left px-5 py-3 font-medium">Payout</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-5 py-3 font-medium text-foreground">{p.id}</td>
                <td className="px-5 py-3 text-foreground">{p.booking}</td>
                <td className="px-5 py-3 text-foreground">{p.vendor}</td>
                <td className="px-5 py-3 font-medium text-foreground">{p.amount}</td>
                <td className="px-5 py-3 text-primary">{p.commission}</td>
                <td className="px-5 py-3 font-medium text-chart-2">{p.payout}</td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === "Paid" ? "bg-chart-2/20 text-chart-2" : p.status === "Pending" ? "bg-chart-5/20 text-chart-5" : "bg-destructive/20 text-destructive"}`}>{p.status}</span></td>
                <td className="px-5 py-3 text-muted-foreground">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
