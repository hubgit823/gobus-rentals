import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Shield } from "lucide-react";
import { api } from "@/lib/api";
import { setAuth, type StoredUser } from "@/lib/auth-storage";

export const Route = createFileRoute("/vendor/login")({
  component: VendorLoginPage,
  head: () => ({ meta: [{ title: "Vendor Login — LuxuryBusRental" }] }),
});

type LoginRes = { token: string; user: StoredUser };

function VendorLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mut = useMutation({
    mutationFn: () =>
      api<LoginRes>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    onSuccess: (data) => {
      if (data.user.role !== "vendor") {
        toast.error("This login is for bus operators only.");
        return;
      }
      setAuth(data.token, data.user);
      toast.success("Welcome, operator!");
      navigate({ to: "/vendor/dashboard" });
    },
    onError: (e: Error) => toast.error(e.message || "Login failed"),
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Vendor Login</h1>
            <p className="text-muted-foreground text-sm mt-1">Access your bus operator dashboard</p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mut.mutate();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email"><Mail className="w-4 h-4 text-primary inline mr-1.5" />Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password"><Lock className="w-4 h-4 text-primary inline mr-1.5" />Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button className="w-full" size="lg" type="submit" disabled={mut.isPending}>
                {mut.isPending ? "Signing in…" : "Login to Dashboard"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              New operator? <Link to="/vendor/register" className="text-primary font-medium hover:underline">Register Here</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
