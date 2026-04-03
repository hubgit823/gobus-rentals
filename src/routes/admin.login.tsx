import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Mail } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
  head: () => ({ meta: [{ title: "Admin Login — LuxuryBusRental" }] }),
});

function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-destructive/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-destructive" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground text-sm mt-1">Restricted access — authorized personnel only</p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email"><Mail className="w-4 h-4 text-primary inline mr-1.5" />Admin Email</Label>
                <Input id="email" type="email" placeholder="admin@luxurybusrental.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password"><Lock className="w-4 h-4 text-primary inline mr-1.5" />Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Link to="/admin/dashboard">
                <Button className="w-full" size="lg">Access Dashboard</Button>
              </Link>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
