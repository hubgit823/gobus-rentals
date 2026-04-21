import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { COMPANY } from "@/lib/company";
import { loadRazorpayScript } from "@/lib/razorpay-checkout";

type OrderRes = { id: string; amount: number; currency: string; keyId: string };
type MeRes = { user: { email: string; name: string; phone?: string } };

type Props = {
  bookingId: string;
  purpose: "advance" | "balance" | "full";
  children: React.ReactNode;
  disabled?: boolean;
};

export function RazorpayBookingPayButton({ bookingId, purpose, children, disabled }: Readonly<Props>) {
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const { data: me } = useQuery({
    queryKey: ["auth-me"],
    queryFn: () => api<MeRes>("/api/auth/me"),
    staleTime: 60_000,
  });

  const pay = async () => {
    if (!import.meta.env.VITE_API_URL?.trim()) {
      toast.error("Set VITE_API_URL to your API (e.g. http://localhost:3020) to use Razorpay.");
      return;
    }
    setBusy(true);
    let settled = false;
    try {
      await loadRazorpayScript();
      const RZP = window.Razorpay;
      if (!RZP) throw new Error("Razorpay SDK not available");

      const order = await api<OrderRes>("/api/payments/razorpay/order", {
        method: "POST",
        body: JSON.stringify({ bookingId, purpose }),
      });

      await new Promise<void>((resolve, reject) => {
        const done = () => {
          if (!settled) {
            settled = true;
            resolve();
          }
        };
        const fail = (err: Error) => {
          if (!settled) {
            settled = true;
            reject(err);
          }
        };

        const rzp = new RZP({
          key: order.keyId,
          order_id: order.id,
          currency: order.currency,
          name: COMPANY.legalName,
          description: `Bus booking — ${purpose}`,
          notes: { bookingId, purpose },
          prefill: {
            email: me?.user.email ?? "",
            name: me?.user.name ?? "",
          },
          theme: { color: "#0f172a" },
          handler(response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) {
            void (async () => {
              try {
                await api("/api/payments/razorpay/verify", {
                  method: "POST",
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                });
                toast.success("Payment successful");
                await qc.invalidateQueries({ queryKey: ["customer-bookings"] });
                done();
              } catch (e) {
                fail(e instanceof Error ? e : new Error("Verification failed"));
              }
            })();
          },
          modal: {
            ondismiss() {
              fail(new Error("dismiss"));
            },
          },
        });
        rzp.open();
      });
    } catch (e) {
      const err = e instanceof Error ? e : new Error("Payment failed");
      if (err.message !== "dismiss") toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      type="button"
      variant="default"
      size="sm"
      className="h-7 gap-1 text-xs"
      disabled={disabled || busy}
      onClick={() => void pay()}
    >
      {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : <CreditCard className="h-3 w-3" />}
      {children}
    </Button>
  );
}
