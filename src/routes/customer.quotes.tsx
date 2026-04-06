import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, X, Clock, ArrowDownAZ, IndianRupee, Star, Timer } from "lucide-react";
import { api } from "@/lib/api";
import { COMPANY, formatInr } from "@/lib/company";

export const Route = createFileRoute("/customer/quotes")({
  component: CustomerQuotes,
});

type QuoteRow = {
  id: string;
  vendor: string;
  route: string;
  bus: string;
  price: string;
  amount: number;
  quoteSubtotal: number;
  gstAmount: number;
  totalWithGst: number;
  rating: number;
  responseTime: string;
  responseMinutes: number;
  inclusions: string;
};

type QuotesRes = { quotes: QuoteRow[] };

function CustomerQuotes() {
  const qc = useQueryClient();
  const [sort, setSort] = useState<"price" | "rating" | "response">("price");
  const [acceptId, setAcceptId] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<"advance" | "full">("advance");
  const [policyOk, setPolicyOk] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["customer-quotes"],
    queryFn: () => api<QuotesRes>("/api/customer/quotes"),
  });

  const acceptQuote = data?.quotes?.find((q) => q.id === acceptId) ?? null;

  const sorted = useMemo(() => {
    const list = [...(data?.quotes ?? [])];
    if (sort === "price") list.sort((a, b) => a.amount - b.amount);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "response") list.sort((a, b) => a.responseMinutes - b.responseMinutes);
    return list;
  }, [data?.quotes, sort]);

  const acceptMut = useMutation({
    mutationFn: (payload: { id: string; paymentType: "advance" | "full"; policyAccepted: boolean }) =>
      api("/api/customer/quotes/" + payload.id + "/accept", {
        method: "POST",
        body: JSON.stringify({
          paymentType: payload.paymentType,
          policyAccepted: payload.policyAccepted,
        }),
      }),
    onSuccess: () => {
      toast.success("Booking created — complete payment from My Bookings.");
      setAcceptId(null);
      setPolicyOk(false);
      qc.invalidateQueries({ queryKey: ["customer-quotes"] });
      qc.invalidateQueries({ queryKey: ["customer-bookings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const declineMut = useMutation({
    mutationFn: (id: string) => api("/api/customer/quotes/" + id + "/decline", { method: "POST" }),
    onSuccess: () => {
      toast.message("Quote declined");
      qc.invalidateQueries({ queryKey: ["customer-quotes"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openAccept = (id: string) => {
    setAcceptId(id);
    setPaymentType("advance");
    setPolicyOk(false);
  };

  const confirmAccept = () => {
    if (!acceptId) return;
    if (!policyOk) {
      toast.error("Please accept the refund & cancellation policy.");
      return;
    }
    acceptMut.mutate({ id: acceptId, paymentType, policyAccepted: true });
  };

  if (isLoading) {
    return <div className="p-8 text-muted-foreground text-sm">Loading quotes…</div>;
  }
  if (error) {
    return (
      <div className="p-8 text-destructive text-sm">
        {(error as Error).message}. Log in as a customer to view quotes.
      </div>
    );
  }

  const advanceNote =
    acceptQuote != null
      ? formatInr(Math.round(acceptQuote.totalWithGst * COMPANY.advanceFractionDefault * 100) / 100)
      : "";

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Quotes</h1>
      <p className="text-muted-foreground text-sm mb-4">Compare quotes — totals include {COMPANY.gstPercentage}% GST</p>

      <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground mb-6">
        <strong className="text-foreground">Checkout rules:</strong> booking is confirmed only after advance (or full) payment.
        Balance must be paid before trip start. See{" "}
        <Link to="/policies/refund-cancellation" className="text-primary underline-offset-2 hover:underline">
          refund &amp; cancellation
        </Link>
        .
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant={sort === "price" ? "default" : "outline"} size="sm" className="gap-1" onClick={() => setSort("price")}>
          <IndianRupee className="w-3.5 h-3.5" /> Price (incl. GST)
        </Button>
        <Button variant={sort === "rating" ? "default" : "outline"} size="sm" className="gap-1" onClick={() => setSort("rating")}>
          <Star className="w-3.5 h-3.5" /> Rating
        </Button>
        <Button variant={sort === "response" ? "default" : "outline"} size="sm" className="gap-1" onClick={() => setSort("response")}>
          <Timer className="w-3.5 h-3.5" /> Response time
        </Button>
        <span className="text-xs text-muted-foreground self-center ml-2 flex items-center gap-1">
          <ArrowDownAZ className="w-3.5 h-3.5" /> Sorting applies to the list below
        </span>
      </div>

      <Dialog open={!!acceptId} onOpenChange={(o) => !o && setAcceptId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm booking &amp; payment plan</DialogTitle>
          </DialogHeader>
          {acceptQuote ? (
            <div className="space-y-4 text-sm">
              <div className="rounded-lg border border-border bg-muted/50 p-3 space-y-1">
                <p className="font-medium text-foreground">{acceptQuote.vendor}</p>
                <p className="text-muted-foreground text-xs">{acceptQuote.route}</p>
                <div className="pt-2 space-y-0.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rental (excl. GST)</span>
                    <span>{formatInr(acceptQuote.quoteSubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST ({COMPANY.gstPercentage}%)</span>
                    <span>{formatInr(acceptQuote.gstAmount)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-foreground pt-1 border-t border-border">
                    <span>Total</span>
                    <span>{formatInr(acceptQuote.totalWithGst)}</span>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-foreground mb-2 block">Payment type</Label>
                <RadioGroup value={paymentType} onValueChange={(v) => setPaymentType(v as "advance" | "full")}>
                  <div className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value="advance" id="pt-adv" />
                    <Label htmlFor="pt-adv" className="font-normal cursor-pointer">
                      Advance to confirm (~{Math.round(COMPANY.advanceFractionDefault * 100)}% ≈ {advanceNote}), balance before trip
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value="full" id="pt-full" />
                    <Label htmlFor="pt-full" className="font-normal cursor-pointer">
                      Pay full amount now ({formatInr(acceptQuote.totalWithGst)})
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="pol" checked={policyOk} onCheckedChange={(c) => setPolicyOk(c === true)} />
                <Label htmlFor="pol" className="text-xs text-muted-foreground font-normal leading-snug cursor-pointer">
                  I have read and agree to the{" "}
                  <Link to="/policies/refund-cancellation" target="_blank" className="text-primary underline-offset-2 hover:underline">
                    refund &amp; cancellation policy
                  </Link>
                  .
                </Label>
              </div>
            </div>
          ) : null}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" type="button" onClick={() => setAcceptId(null)}>
              Cancel
            </Button>
            <Button type="button" disabled={acceptMut.isPending} onClick={confirmAccept}>
              Accept &amp; create booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground border border-border rounded-xl p-8 text-center bg-card">
          No open quotes yet. Submit a trip request from Book a Bus — operators will respond here.
        </p>
      ) : (
        <div className="space-y-4">
          {sorted.map((q) => (
            <div key={q.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{q.vendor}</h3>
                    <span className="px-2 py-0.5 bg-chart-4/20 text-chart-4 rounded-full text-xs font-medium">⭐ {q.rating}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {q.responseTime}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{q.route} • {q.bus}</p>
                  {q.inclusions ? <p className="text-xs text-muted-foreground mt-1">Includes: {q.inclusions}</p> : null}
                  <p className="text-xs text-muted-foreground mt-2">
                    Subtotal {formatInr(q.quoteSubtotal)} + GST ({COMPANY.gstPercentage}%) {formatInr(q.gstAmount)}
                  </p>
                </div>
                <div className="text-right flex sm:flex-col items-center sm:items-end gap-3">
                  <div>
                    <span className="font-display text-2xl font-bold text-primary block">{q.price}</span>
                    <span className="text-[10px] text-muted-foreground">incl. GST</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-1" disabled={acceptMut.isPending} onClick={() => openAccept(q.id)}>
                      <Check className="w-3.5 h-3.5" /> Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      disabled={declineMut.isPending}
                      onClick={() => declineMut.mutate(q.id)}
                    >
                      <X className="w-3.5 h-3.5" /> Decline
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
