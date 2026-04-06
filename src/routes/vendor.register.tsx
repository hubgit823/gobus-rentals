import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, User, FileText, CreditCard, Bus, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { setAuth, type StoredUser } from "@/lib/auth-storage";

export const Route = createFileRoute("/vendor/register")({
  component: VendorRegisterPage,
  head: () => ({ meta: [{ title: "Register as Vendor — LuxuryBusRental" }] }),
});

type RegRes = { token: string; user: StoredUser };

function VendorRegisterPage() {
  const navigate = useNavigate();
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    companyName: "",
    gstNumber: "",
    panNumber: "",
    address: "",
    fleetSize: "",
    operatingCities: "",
    bankHolder: "",
    bankAccount: "",
    bankIfsc: "",
    bankName: "",
  });

  const mut = useMutation({
    mutationFn: () =>
      api<RegRes>("/api/auth/vendor/register", {
        method: "POST",
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          phone: f.phone,
          password: f.password,
          companyName: f.companyName,
          gstNumber: f.gstNumber,
          panNumber: f.panNumber,
          address: f.address,
          fleetSize: f.fleetSize ? Number(f.fleetSize) : undefined,
          operatingCities: f.operatingCities,
          bankHolder: f.bankHolder,
          bankAccount: f.bankAccount,
          bankIfsc: f.bankIfsc,
          bankName: f.bankName,
        }),
      }),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success("Registration submitted. Await admin KYC approval to receive leads.");
      navigate({ to: "/vendor/dashboard" });
    },
    onError: (e: Error) => toast.error(e.message || "Registration failed"),
  });

  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Register as Bus Operator</h1>
            <p className="text-muted-foreground text-sm mt-1">Join verified operators on India&apos;s bus rental platform</p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mut.mutate();
              }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Owner name" value={f.name} onChange={(e) => set("name", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Mobile</Label>
                    <Input type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Email</Label>
                    <Input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} required />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Password</Label>
                    <Input type="password" value={f.password} onChange={(e) => set("password", e.target.value)} minLength={8} required />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" /> Business Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Company / Business Name</Label>
                    <Input value={f.companyName} onChange={(e) => set("companyName", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>GST Number</Label>
                    <Input value={f.gstNumber} onChange={(e) => set("gstNumber", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>PAN Number</Label>
                    <Input value={f.panNumber} onChange={(e) => set("panNumber", e.target.value)} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Business Address</Label>
                    <Textarea rows={2} value={f.address} onChange={(e) => set("address", e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Bus className="w-5 h-5 text-primary" /> Fleet Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Total Fleet Size</Label>
                    <Input type="number" min={1} value={f.fleetSize} onChange={(e) => set("fleetSize", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Operating Cities</Label>
                    <Input placeholder="Mumbai, Pune, Delhi" value={f.operatingCities} onChange={(e) => set("operatingCities", e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" /> Bank Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Account Holder Name</Label>
                    <Input value={f.bankHolder} onChange={(e) => set("bankHolder", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input value={f.bankAccount} onChange={(e) => set("bankAccount", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>IFSC Code</Label>
                    <Input value={f.bankIfsc} onChange={(e) => set("bankIfsc", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input value={f.bankName} onChange={(e) => set("bankName", e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" /> KYC Documents
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>GST Certificate</Label>
                    <Input type="file" accept=".pdf,.jpg,.png" disabled className="cursor-not-allowed opacity-70" />
                    <p className="text-xs text-muted-foreground">Upload wiring can connect to S3 / Cloudflare R2.</p>
                  </div>
                  <div className="space-y-2">
                    <Label>PAN Card</Label>
                    <Input type="file" accept=".pdf,.jpg,.png" disabled className="cursor-not-allowed opacity-70" />
                  </div>
                </div>
              </div>

              <Button className="w-full" size="xl" type="submit" disabled={mut.isPending}>
                {mut.isPending ? "Submitting…" : "Submit Registration"} <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Your account will be activated after admin verification.{" "}
                <Link to="/vendor/login" className="text-primary hover:underline">Already registered?</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
