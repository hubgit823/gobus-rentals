import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, X, Lock, Unlock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { panelPage, panelStatePadding } from "@/lib/panel-page";

export const Route = createFileRoute("/admin/bookings")({
  component: AdminBookings,
});

type B = {
  id: string;
  customer: string;
  vendor: string;
  route: string;
  amount: string;
  subtotal: string;
  gstAmount: string;
  totalWithGst: string;
  paymentType: string;
  paymentStatus: string;
  status: string;
  date: string;
  payoutStatus: string;
  commissionDeducted: string;
  vendorPayout: string;
};

type Res = { bookings: B[] };

const displayOpts = [
  { v: "pending_payment", l: "Pending payment" },
  { v: "confirmed", l: "Confirmed" },
  { v: "on_trip", l: "On Trip" },
  { v: "completed", l: "Completed" },
  { v: "cancelled", l: "Cancelled" },
];

const statusColor: Record<string, string> = {
  confirmed: "bg-chart-4/20 text-chart-4",
  on_trip: "bg-primary/20 text-primary",
  completed: "bg-chart-2/20 text-chart-2",
  cancelled: "bg-destructive/20 text-destructive",
  pending_payment: "bg-chart-5/20 text-chart-5",
};

function label(s: string) {
  return displayOpts.find((o) => o.v === s)?.l ?? s;
}

function AdminBookings() {
  const qc = useQueryClient();
  const [view, setView] = useState<B | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => api<Res>("/api/admin/bookings"),
  });

  const patchMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api("/api/admin/bookings/" + id, { method: "PATCH", body: JSON.stringify({ status }) }),
    onSuccess: (_, v) => {
      toast.success(v.status === "completed" ? "Updated — payout auto-processed if eligible" : "Booking updated");
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
      qc.invalidateQueries({ queryKey: ["admin-payments"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const payoutMut = useMutation({
    mutationFn: ({ id, action }: { id: string; action: "hold" | "release" }) =>
      api("/api/admin/bookings/" + id + "/payout-override", {
        method: "POST",
        body: JSON.stringify({ action }),
      }),
    onSuccess: () => {
      toast.success("Payout override saved");
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
      qc.invalidateQueries({ queryKey: ["admin-payments"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <div className={`${panelStatePadding} text-sm text-muted-foreground`}>Loading…</div>;
  if (error) return <div className={`${panelStatePadding} text-sm text-destructive`}>{(error as Error).message}</div>;

  const bookings = data?.bookings ?? [];

  return (
    <div className={panelPage.wide}>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">All Bookings</h1>
      <p className="text-muted-foreground text-sm mb-6">GST, payments, and vendor payouts</p>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full min-w-[920px] text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-left px-4 py-3 font-medium">Customer</th>
              <th className="text-left px-4 py-3 font-medium">Vendor</th>
              <th className="text-left px-4 py-3 font-medium">Route</th>
              <th className="text-left px-4 py-3 font-medium">Total (GST)</th>
              <th className="text-left px-4 py-3 font-medium">Pay</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Payout</th>
              <th className="text-left px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-4 py-3 font-medium text-foreground font-mono text-xs">{b.id.slice(-8)}</td>
                <td className="px-4 py-3 text-foreground">{b.customer}</td>
                <td className="px-4 py-3 text-foreground">{b.vendor}</td>
                <td className="px-4 py-3 text-muted-foreground">{b.route}</td>
                <td className="px-4 py-3 font-medium text-foreground">
                  <div>{b.amount}</div>
                  <div className="text-[10px] text-muted-foreground">GST {b.gstAmount}</div>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {b.paymentType} · {b.paymentStatus}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[b.status] ?? "bg-muted"}`}>{label(b.status)}</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <div className="font-medium text-foreground">{b.payoutStatus}</div>
                  <div className="text-muted-foreground">Net {b.vendorPayout}</div>
                  {b.status === "completed" ? (
                    <div className="flex gap-1 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-[10px] px-1 gap-0.5"
                        type="button"
                        disabled={payoutMut.isPending}
                        onClick={() => payoutMut.mutate({ id: b.id, action: "hold" })}
                      >
                        <Lock className="w-3 h-3" /> Hold
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-[10px] px-1 gap-0.5"
                        type="button"
                        disabled={payoutMut.isPending}
                        onClick={() => payoutMut.mutate({ id: b.id, action: "release" })}
                      >
                        <Unlock className="w-3 h-3" /> Release
                      </Button>
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 items-center flex-wrap">
                    <Button variant="ghost" size="icon" className="h-7 w-7" type="button" onClick={() => setView(b)}><Eye className="w-3.5 h-3.5" /></Button>
                    <Select value={b.status} onValueChange={(v) => patchMut.mutate({ id: b.id, status: v })}>
                      <SelectTrigger className="h-8 w-[140px] text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {displayOpts.map((o) => <SelectItem key={o.v} value={o.v}>{o.l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" type="button" disabled={patchMut.isPending} onClick={() => patchMut.mutate({ id: b.id, status: "cancelled" })}><X className="w-3.5 h-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking</DialogTitle>
          </DialogHeader>
          {view ? <pre className="text-xs bg-muted p-3 rounded-md overflow-auto">{JSON.stringify(view, null, 2)}</pre> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
