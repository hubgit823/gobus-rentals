import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, User, Mail, Phone, CreditCard } from "lucide-react";

export const Route = createFileRoute("/vendor/profile")({
  component: VendorProfile,
});

function VendorProfile() {
  return (
    <div className="p-6 sm:p-8 max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Vendor Profile</h1>
      <p className="text-muted-foreground text-sm mb-6">Update your business information</p>

      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">ABC Travels Pvt Ltd</h3>
            <p className="text-sm text-muted-foreground">Verified Operator • KYC Approved ✅</p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Owner Name</Label>
              <Input defaultValue="Suresh Patel" />
            </div>
            <div className="space-y-2">
              <Label>Mobile</Label>
              <Input defaultValue="+91 98765 43210" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Email</Label>
              <Input defaultValue="suresh@abctravels.com" type="email" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Business Address</Label>
              <Textarea defaultValue="123, Transport Nagar, Andheri East, Mumbai 400069" rows={2} />
            </div>
            <div className="space-y-2">
              <Label>GST Number</Label>
              <Input defaultValue="27AABCA1234F1ZP" disabled />
            </div>
            <div className="space-y-2">
              <Label>PAN Number</Label>
              <Input defaultValue="ABCDE1234F" disabled />
            </div>
          </div>
          <Button size="lg">Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
