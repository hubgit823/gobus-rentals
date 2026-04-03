import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Eye, Ban, Mail } from "lucide-react";

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomers,
});

const customers = [
  { id: "U001", name: "Priya Sharma", email: "priya@gmail.com", phone: "+91 98765 43210", bookings: 5, joined: "2024-08-10", status: "Active" },
  { id: "U002", name: "Rajesh Mehta", email: "rajesh@company.com", phone: "+91 87654 32100", bookings: 3, joined: "2024-10-15", status: "Active" },
  { id: "U003", name: "Anita Verma", email: "anita@email.com", phone: "+91 76543 21000", bookings: 8, joined: "2024-03-20", status: "Active" },
  { id: "U004", name: "Suresh Kumar", email: "suresh@gmail.com", phone: "+91 65432 10000", bookings: 1, joined: "2025-01-05", status: "Blocked" },
];

function AdminCustomers() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Customer Management</h1>
      <p className="text-muted-foreground text-sm mb-6">View and manage platform users</p>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">ID</th>
              <th className="text-left px-5 py-3 font-medium">Name</th>
              <th className="text-left px-5 py-3 font-medium">Email</th>
              <th className="text-left px-5 py-3 font-medium">Phone</th>
              <th className="text-left px-5 py-3 font-medium">Bookings</th>
              <th className="text-left px-5 py-3 font-medium">Joined</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-5 py-3 font-medium text-foreground">{c.id}</td>
                <td className="px-5 py-3 font-medium text-foreground">{c.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.email}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.phone}</td>
                <td className="px-5 py-3 text-foreground">{c.bookings}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.joined}</td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === "Active" ? "bg-chart-2/20 text-chart-2" : "bg-destructive/20 text-destructive"}`}>{c.status}</span></td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Mail className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Ban className="w-3.5 h-3.5" /></Button>
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
