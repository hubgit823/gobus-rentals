import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2 } from "lucide-react";
import { api } from "@/lib/api";
import { panelPage } from "@/lib/panel-page";

export const Route = createFileRoute("/vendor/profile")({
  component: VendorProfile,
});

type VendorDoc = {
  companyName?: string;
  address?: string;
  gstNumber?: string;
  panNumber?: string;
  status?: string;
  operatingCities?: string[];
};

type UserDoc = { name?: string; email?: string; phone?: string };
type ProfileRes = { user: UserDoc; vendor: VendorDoc };

function VendorProfile() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [operatingCities, setOperatingCities] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["vendor-profile"],
    queryFn: () => api<ProfileRes>("/api/vendor/profile"),
  });

  useEffect(() => {
    if (data?.user) {
      setName(data.user.name ?? "");
      setPhone(data.user.phone ?? "");
    }
    if (data?.vendor) {
      setCompanyName(data.vendor.companyName ?? "");
      setAddress(data.vendor.address ?? "");
      setOperatingCities((data.vendor.operatingCities ?? []).join(", "));
    }
  }, [data]);

  const mut = useMutation({
    mutationFn: () =>
      api("/api/vendor/profile", {
        method: "PATCH",
        body: JSON.stringify({ name, phone, companyName, address, operatingCities }),
      }),
    onSuccess: () => {
      toast.success("Profile updated");
      qc.invalidateQueries({ queryKey: ["vendor-profile"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className={panelPage.narrow}>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Vendor Profile</h1>
      <p className="text-muted-foreground text-sm mb-6">Update your business information</p>

      <div className="bg-card rounded-xl border border-border p-4 sm:p-6 space-y-6">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : error ? (
          <p className="text-sm text-destructive">{(error as Error).message}</p>
        ) : (
          <>
            <div className="flex items-center gap-4 pb-4 border-b border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{companyName || "Your business"}</h3>
                <p className="text-sm text-muted-foreground">
                  Status: {data?.vendor?.status ?? "—"}
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                mut.mutate();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Owner Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Mobile</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Email</Label>
                  <Input value={data?.user?.email ?? ""} disabled className="opacity-80" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Company name</Label>
                  <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Business Address</Label>
                  <Textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Operating cities (comma-separated)</Label>
                  <Input value={operatingCities} onChange={(e) => setOperatingCities(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>GST Number</Label>
                  <Input value={data?.vendor?.gstNumber ?? ""} disabled className="opacity-80" />
                </div>
                <div className="space-y-2">
                  <Label>PAN Number</Label>
                  <Input value={data?.vendor?.panNumber ?? ""} disabled className="opacity-80" />
                </div>
              </div>
              <Button size="lg" type="submit" disabled={mut.isPending}>{mut.isPending ? "Saving…" : "Save Changes"}</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
