import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, MessageSquareQuote } from "lucide-react";

export const Route = createFileRoute("/vendor/leads")({
  component: VendorLeads,
});

const leads = [
  { id: "L001", customer: "Priya Sharma", from: "Mumbai", to: "Goa", date: "2025-02-18", passengers: 35, bus: "40 Seater AC", purpose: "Wedding", status: "New" },
  { id: "L002", customer: "Rajesh Mehta", from: "Delhi", to: "Agra", date: "2025-02-20", passengers: 20, bus: "26 Seater AC", purpose: "Corporate", status: "Quoted" },
  { id: "L003", customer: "Anita Verma", from: "Pune", to: "Shirdi", date: "2025-02-22", passengers: 15, bus: "17 Seater", purpose: "Pilgrimage", status: "New" },
  { id: "L004", customer: "Suresh K.", from: "Chennai", to: "Pondicherry", date: "2025-02-25", passengers: 45, bus: "49 Seater AC", purpose: "Tour", status: "Rejected" },
];

const statusColor: Record<string, string> = {
  New: "bg-primary/20 text-primary",
  Quoted: "bg-chart-4/20 text-chart-4",
  Accepted: "bg-chart-2/20 text-chart-2",
  Rejected: "bg-destructive/20 text-destructive",
};

function VendorLeads() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Lead Management</h1>
      <p className="text-muted-foreground text-sm mb-6">View and respond to customer booking requests</p>

      <div className="space-y-4">
        {leads.map((l) => (
          <div key={l.id} className="bg-card rounded-xl border border-border p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{l.customer}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[l.status]}`}>{l.status}</span>
                </div>
                <p className="text-sm text-foreground">{l.from} → {l.to}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                  <span>📅 {l.date}</span>
                  <span>👥 {l.passengers} passengers</span>
                  <span>🚌 {l.bus}</span>
                  <span>🎯 {l.purpose}</span>
                </div>
              </div>
              {l.status === "New" && (
                <div className="flex gap-2">
                  <Button size="sm" className="gap-1"><MessageSquareQuote className="w-3.5 h-3.5" /> Send Quote</Button>
                  <Button variant="outline" size="sm" className="gap-1 text-destructive"><X className="w-3.5 h-3.5" /> Reject</Button>
                </div>
              )}
              {l.status === "Quoted" && (
                <Button variant="outline" size="sm" className="gap-1"><Eye className="w-3.5 h-3.5" /> View Quote</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
