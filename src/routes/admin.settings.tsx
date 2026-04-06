import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Percent, Clock, Globe, Receipt } from "lucide-react";
import { api } from "@/lib/api";
import { panelPage } from "@/lib/panel-page";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

type SettingsRes = {
  siteName: string;
  legalName: string;
  about: string;
  operatingLocations: string;
  contactPhone: string;
  contactEmail: string;
  gstNumber: string;
  gstEnabled: boolean;
  gstPercentage: number;
  commissionPercent: number;
  quoteWindowHours: number;
  payoutType: string;
  payoutTrigger: string;
};

function AdminSettings() {
  const qc = useQueryClient();
  const [commissionPercent, setCommissionPercent] = useState("10");
  const [quoteWindowHours, setQuoteWindowHours] = useState("24");
  const [legalName, setLegalName] = useState("");
  const [about, setAbout] = useState("");
  const [operatingLocations, setOperatingLocations] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [gstEnabled, setGstEnabled] = useState(true);
  const [gstPercentage, setGstPercentage] = useState("18");
  const [minBooking, setMinBooking] = useState("2000");
  const [minKm, setMinKm] = useState("250");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: () => api<SettingsRes>("/api/admin/settings"),
  });

  useEffect(() => {
    if (data) {
      setCommissionPercent(String(data.commissionPercent));
      setQuoteWindowHours(String(data.quoteWindowHours));
      setLegalName(data.legalName ?? data.siteName ?? "");
      setAbout(data.about ?? "");
      setOperatingLocations(data.operatingLocations ?? "");
      setContactPhone(data.contactPhone ?? "");
      setContactEmail(data.contactEmail ?? "");
      setGstNumber(data.gstNumber ?? "");
      setGstEnabled(!!data.gstEnabled);
      setGstPercentage(String(data.gstPercentage ?? 18));
    }
  }, [data]);

  const mut = useMutation({
    mutationFn: () =>
      api("/api/admin/settings", {
        method: "PATCH",
        body: JSON.stringify({
          commissionPercent: Number(commissionPercent),
          quoteWindowHours: Number(quoteWindowHours),
          name: legalName,
          about,
          operatingLocations,
          contactPhone,
          contactEmail,
          gstNumber,
          gstEnabled,
          gstPercentage: Number(gstPercentage),
        }),
      }),
    onSuccess: () => {
      toast.success("Settings saved");
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className={panelPage.narrow}>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Platform Settings</h1>
      <p className="text-muted-foreground text-sm mb-6">Company profile, GST, commission, and payouts (CMS-facing)</p>

      {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : null}

      <div className="space-y-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" /> Business profile
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Legal / display name</Label>
              <Input value={legalName} onChange={(e) => setLegalName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>About (public)</Label>
              <Textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Operating locations</Label>
              <Textarea value={operatingLocations} onChange={(e) => setOperatingLocations(e.target.value)} rows={2} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone / WhatsApp</Label>
                <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" /> GST (pricing)
          </h3>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <Label htmlFor="gst-on" className="text-foreground">Enable GST on bookings</Label>
              <p className="text-xs text-muted-foreground">Shown in checkout, customer invoice JSON, and reports</p>
            </div>
            <Switch id="gst-on" checked={gstEnabled} onCheckedChange={setGstEnabled} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>GST %</Label>
              <Input type="number" min={0} max={28} value={gstPercentage} onChange={(e) => setGstPercentage(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>GSTIN note (invoice)</Label>
              <Input value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} placeholder="e.g. 03ABCDE1234F1Z5" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Percent className="w-5 h-5 text-primary" /> Commission &amp; quotes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Default commission (% — vendor pays)</Label>
              <Input type="number" min={0} max={50} value={commissionPercent} onChange={(e) => setCommissionPercent(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Min. Booking Amount (₹) — UI only</Label>
              <Input type="number" value={minBooking} onChange={(e) => setMinBooking(e.target.value)} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Payout type: automatic after trip completion (see vendor dashboard). Admin can hold/release payout per booking.
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Quote window
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Max response time (hours)</Label>
              <Input type="number" min={1} max={48} value={quoteWindowHours} onChange={(e) => setQuoteWindowHours(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Min KM/Day rule — UI only</Label>
              <Input type="number" value={minKm} onChange={(e) => setMinKm(e.target.value)} />
            </div>
          </div>
        </div>

        <Button size="lg" type="button" disabled={mut.isPending} onClick={() => mut.mutate()}>
          {mut.isPending ? "Saving…" : "Save settings"}
        </Button>
      </div>
    </div>
  );
}
