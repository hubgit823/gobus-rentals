import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Eye, X, CreditCard } from "lucide-react";
import { api } from "@/lib/api";
import { COMPANY } from "@/lib/company";

export const Route = createFileRoute("/customer/bookings")({
  component: CustomerBookings,
});

type BookingRow = {
  id: string;
  from: string;
  to: string;
  date: string;
  bus: string;
  vendor: string;
  status: string;
  rawStatus: string;
  amount: string;
  subtotal: string;
  gstAmount: string;
  totalWithGst: string;
  paymentType: string;
  advanceRequired: string;
  amountPaid: string;
  balanceDue: string;
  paymentStatus: string;
  gstRatePercent: number;
};

type Res = { bookings: BookingRow[] };

function CustomerBookings() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["customer-bookings"],
    queryFn: () => api<Res>("/api/customer/bookings"),
  });

  const cancelMut = useMutation({
    mutationFn: (id: string) => api("/api/customer/bookings/" + id + "/cancel", { method: "POST" }),
    onSuccess: () => {
      toast.success("Booking cancelled");
      qc.invalidateQueries({ queryKey: ["customer-bookings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const payAdvanceMut = useMutation({
    mutationFn: (id: string) => api("/api/customer/bookings/" + id + "/pay-advance", { method: "POST" }),
    onSuccess: () => {
      toast.success("Advance payment recorded");
      qc.invalidateQueries({ queryKey: ["customer-bookings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const payBalanceMut = useMutation({
    mutationFn: (id: string) => api("/api/customer/bookings/" + id + "/pay-balance", { method: "POST" }),
    onSuccess: () => {
      toast.success("Balance payment recorded");
      qc.invalidateQueries({ queryKey: ["customer-bookings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const payFullMut = useMutation({
    mutationFn: (id: string) => api("/api/customer/bookings/" + id + "/pay-full", { method: "POST" }),
    onSuccess: () => {
      toast.success("Payment recorded — booking confirmed");
      qc.invalidateQueries({ queryKey: ["customer-bookings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const statusColor: Record<string, string> = {
    Confirmed: "bg-chart-4/20 text-chart-4",
    "Pending payment": "bg-chart-5/20 text-chart-5",
    Pending: "bg-chart-5/20 text-chart-5",
    Completed: "bg-chart-2/20 text-chart-2",
    Cancelled: "bg-destructive/20 text-destructive",
    "On Trip": "bg-primary/20 text-primary",
  };

  function invoicePayload(b: BookingRow) {
    return {
      issuer: COMPANY.legalName,
      platform: COMPANY.platformBrand,
      gstinNote: COMPANY.gstNumber,
      bookingId: b.id,
      route: `${b.from} → ${b.to}`,
      tripDate: b.date,
      operator: b.vendor,
      lines: [
        { label: "Rental (taxable value)", amount: b.subtotal },
        { label: `GST (${b.gstRatePercent || COMPANY.gstPercentage}%)`, amount: b.gstAmount },
        { label: "Total payable", amount: b.totalWithGst },
      ],
      amountPaid: b.amountPaid,
      balanceDue: b.balanceDue,
      paymentStatus: b.paymentStatus,
      paymentType: b.paymentType,
      status: b.status,
    };
  }

  if (isLoading) return <div className="p-8 text-sm text-muted-foreground">Loading bookings…</div>;
  if (error) {
    return <div className="p-8 text-sm text-destructive">{(error as Error).message}</div>;
  }

  const bookings = data?.bookings ?? [];

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Bookings</h1>
      <p className="text-muted-foreground text-sm mb-2">View and manage all your bus bookings</p>
      <p className="text-xs text-muted-foreground mb-6">
        Totals include GST where shown. Balance must be cleared before trip start.{" "}
        <Link to="/policies/refund-cancellation" className="text-primary hover:underline">
          Policy
        </Link>
      </p>

      {bookings.length === 0 ? (
        <p className="text-sm text-muted-foreground border rounded-xl p-8 text-center bg-card border-border">
          No bookings yet. Accept a quote from My Quotes to create one.
        </p>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-5 py-3 font-medium">ID</th>
                <th className="text-left px-5 py-3 font-medium">Route</th>
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Bus</th>
                <th className="text-left px-5 py-3 font-medium">Operator</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Total (incl. GST)</th>
                <th className="text-left px-5 py-3 font-medium">Pay</th>
                <th className="text-left px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-5 py-3 font-medium text-foreground font-mono text-xs">{b.id.slice(-8)}</td>
                  <td className="px-5 py-3 text-foreground">{b.from} → {b.to}</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.date}</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.bus}</td>
                  <td className="px-5 py-3 text-foreground">{b.vendor}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[b.status] ?? "bg-muted"}`}>{b.status}</span>
                    <div className="text-[10px] text-muted-foreground mt-1">{b.paymentStatus}</div>
                  </td>
                  <td className="px-5 py-3 font-medium text-foreground">{b.amount}</td>
                  <td className="px-5 py-3">
                    <div className="flex flex-col gap-1">
                      {b.rawStatus !== "cancelled" && b.paymentStatus === "Unpaid" && b.paymentType === "advance" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs gap-1"
                          type="button"
                          disabled={payAdvanceMut.isPending}
                          onClick={() => payAdvanceMut.mutate(b.id)}
                        >
                          <CreditCard className="w-3 h-3" /> Advance
                        </Button>
                      )}
                      {b.rawStatus !== "cancelled" && b.paymentStatus === "Unpaid" && b.paymentType === "full" && (
                        <Button
                          variant="default"
                          size="sm"
                          className="h-7 text-xs gap-1"
                          type="button"
                          disabled={payFullMut.isPending}
                          onClick={() => payFullMut.mutate(b.id)}
                        >
                          <CreditCard className="w-3 h-3" /> Pay full
                        </Button>
                      )}
                      {b.rawStatus !== "cancelled" && b.paymentStatus === "Partial" && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-7 text-xs gap-1"
                          type="button"
                          disabled={payBalanceMut.isPending}
                          onClick={() => payBalanceMut.mutate(b.id)}
                        >
                          <CreditCard className="w-3 h-3" /> Balance
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1 flex-wrap">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7" type="button"><Eye className="w-3.5 h-3.5" /></Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Booking details</DialogTitle>
                          </DialogHeader>
                          <div className="text-xs space-y-2">
                            <pre className="bg-muted p-3 rounded-md overflow-auto">{JSON.stringify(b, null, 2)}</pre>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        type="button"
                        onClick={() => {
                          const blob = new Blob([JSON.stringify(invoicePayload(b), null, 2)], { type: "application/json" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `invoice-${b.id.slice(-8)}.json`;
                          a.click();
                          URL.revokeObjectURL(url);
                          toast.message("Downloaded invoice summary (JSON). Replace with PDF when gateway is live.");
                        }}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                      {(b.status === "Pending payment" || b.status === "Confirmed" || b.status === "Pending") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          type="button"
                          disabled={cancelMut.isPending}
                          onClick={() => cancelMut.mutate(b.id)}
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
