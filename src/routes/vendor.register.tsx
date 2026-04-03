import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, User, Mail, Phone, FileText, CreditCard, Bus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/vendor/register")({
  component: VendorRegisterPage,
  head: () => ({ meta: [{ title: "Register as Vendor — LuxuryBusRental" }] }),
});

function VendorRegisterPage() {
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
            <p className="text-muted-foreground text-sm mt-1">Join 500+ operators on India's largest bus rental platform</p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Owner name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Mobile</Label>
                    <Input type="tel" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="operator@company.com" />
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
                    <Input placeholder="ABC Travels Pvt Ltd" />
                  </div>
                  <div className="space-y-2">
                    <Label>GST Number</Label>
                    <Input placeholder="22AAAAA0000A1Z5" />
                  </div>
                  <div className="space-y-2">
                    <Label>PAN Number</Label>
                    <Input placeholder="ABCDE1234F" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Business Address</Label>
                    <Textarea placeholder="Full address with city and pincode" rows={2} />
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
                    <Input type="number" placeholder="e.g. 10" min={1} />
                  </div>
                  <div className="space-y-2">
                    <Label>Operating Cities</Label>
                    <Input placeholder="Mumbai, Pune, Delhi" />
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
                    <Input placeholder="Name on bank account" />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input placeholder="Bank account number" />
                  </div>
                  <div className="space-y-2">
                    <Label>IFSC Code</Label>
                    <Input placeholder="SBIN0001234" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input placeholder="State Bank of India" />
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
                    <Input type="file" accept=".pdf,.jpg,.png" />
                  </div>
                  <div className="space-y-2">
                    <Label>PAN Card</Label>
                    <Input type="file" accept=".pdf,.jpg,.png" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="Create a strong password" />
              </div>

              <Button className="w-full" size="xl">
                Submit Registration <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Your account will be activated after admin verification of your KYC documents.
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
