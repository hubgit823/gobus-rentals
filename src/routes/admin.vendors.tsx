import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, Ban } from "lucide-react";

export const Route = createFileRoute("/admin/vendors")({
  component: AdminVendors,
});

const vendors = [
  { id: "V001", name: "ABC Travels", owner: "Suresh Patel", city: "Mumbai", buses: 12, kyc: "Approved", status: "Active", joined: "2024-06-15" },
  { id: "V002", name: "Royal Tours", owner: "Amit Shah", city: "Delhi", buses: 8, kyc: "Pending", status: "Pending", joined: "2025-01-20" },
  { id: "V003", name: "Green Travels", owner: "Ravi Kumar", city: "Bangalore", buses: 15, kyc: "Approved", status: "Active", joined: "2024-03-10" },
  { id: "V004", name: "Star Bus Co.", owner: "Mohan Gupta", city: "Chennai", buses: 5, kyc: "Rejected", status: "Blocked", joined: "2024-11-05" },
];

const statusColor: Record<string, string> = {
  Active: "bg-chart-2/20 text-chart-2",
  Pending: "bg-chart-5/20 text-chart-5",
  Blocked: "bg-destructive/20 text-destructive",
};

function AdminVendors() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Vendor Management</h1>
      <p className="text-muted-foreground text-sm mb-6">Approve, manage, and monitor bus operators</p>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">ID</th>
              <th className="text-left px-5 py-3 font-medium">Business</th>
              <th className="text-left px-5 py-3 font-medium">Owner</th>
              <th className="text-left px-5 py-3 font-medium">City</th>
              <th className="text-left px-5 py-3 font-medium">Buses</th>
              <th className="text-left px-5 py-3 font-medium">KYC</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-5 py-3 font-medium text-foreground">{v.id}</td>
                <td className="px-5 py-3 font-medium text-foreground">{v.name}</td>
                <td className="px-5 py-3 text-foreground">{v.owner}</td>
                <td className="px-5 py-3 text-muted-foreground">{v.city}</td>
                <td className="px-5 py-3 text-foreground">{v.buses}</td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v.kyc === "Approved" ? "bg-chart-2/20 text-chart-2" : v.kyc === "Pending" ? "bg-chart-5/20 text-chart-5" : "bg-destructive/20 text-destructive"}`}>{v.kyc}</span></td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[v.status]}`}>{v.status}</span></td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3.5 h-3.5" /></Button>
                    {v.status === "Pending" && <><Button variant="ghost" size="icon" className="h-7 w-7 text-chart-2"><Check className="w-3.5 h-3.5" /></Button><Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><X className="w-3.5 h-3.5" /></Button></>}
                    {v.status === "Active" && <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Ban className="w-3.5 h-3.5" /></Button>}
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
