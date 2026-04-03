import { createFileRoute } from "@tanstack/react-router";
import { IndianRupee, TrendingUp, Clock, Percent } from "lucide-react";

export const Route = createFileRoute("/vendor/earnings")({
  component: VendorEarnings,
});

const transactions = [
  { id: "TXN001", booking: "BK003", amount: "₹8,000", commission: "₹800", net: "₹7,200", date: "2025-01-12", status: "Paid" },
  { id: "TXN002", booking: "BK001", amount: "₹22,000", commission: "₹2,200", net: "₹19,800", date: "2025-02-19", status: "Pending" },
  { id: "TXN003", booking: "BK002", amount: "₹14,500", commission: "₹1,450", net: "₹13,050", date: "2025-02-21", status: "Pending" },
];

function VendorEarnings() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Earnings Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-6">Track your revenue and pending payouts</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Earnings", value: "₹4,85,000", icon: IndianRupee, color: "text-chart-2" },
          { label: "Pending Payout", value: "₹32,850", icon: Clock, color: "text-chart-5" },
          { label: "This Month", value: "₹1,20,000", icon: TrendingUp, color: "text-primary" },
          { label: "Commission (10%)", value: "₹48,500", icon: Percent, color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5">
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <span className={`font-display text-lg font-bold ${s.color} block`}>{s.value}</span>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <div className="p-5 border-b border-border">
          <h2 className="font-display font-semibold text-foreground">Transaction History</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">Transaction</th>
              <th className="text-left px-5 py-3 font-medium">Booking</th>
              <th className="text-left px-5 py-3 font-medium">Amount</th>
              <th className="text-left px-5 py-3 font-medium">Commission</th>
              <th className="text-left px-5 py-3 font-medium">Net Payout</th>
              <th className="text-left px-5 py-3 font-medium">Date</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-5 py-3 font-medium text-foreground">{t.id}</td>
                <td className="px-5 py-3 text-foreground">{t.booking}</td>
                <td className="px-5 py-3 text-foreground">{t.amount}</td>
                <td className="px-5 py-3 text-destructive">{t.commission}</td>
                <td className="px-5 py-3 font-medium text-chart-2">{t.net}</td>
                <td className="px-5 py-3 text-muted-foreground">{t.date}</td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.status === "Paid" ? "bg-chart-2/20 text-chart-2" : "bg-chart-5/20 text-chart-5"}`}>{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
