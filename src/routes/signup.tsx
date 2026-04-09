import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Phone, User, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { setAuth, type StoredUser } from "@/lib/auth-storage";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Sign Up — Luxury Bus Rental" },
      { name: "description", content: "Create your Luxury Bus Rental account." },
    ],
  }),
});

type RegRes = { token: string; user: StoredUser };

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const mut = useMutation({
    mutationFn: () =>
      api<RegRes>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, phone, password }),
      }),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success("Account created!");
      navigate({ to: "/customer/dashboard" });
    },
    onError: (e: Error) => toast.error(e.message || "Sign up failed"),
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground text-sm mt-1">Join thousands of happy travelers</p>
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
                <Label htmlFor="name" className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-primary" /> Full Name
                </Label>
                <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-primary" /> Email Address
                </Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-primary" /> Mobile Number
                </Label>
                <Input id="mobile" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-primary" /> Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
              <Button className="w-full" size="lg" type="submit" disabled={mut.isPending}>
                {mut.isPending ? "Creating…" : "Create Account"} <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
            </p>

            <p className="text-center text-sm text-muted-foreground mt-2">
              Are you a bus operator?{" "}
              <Link to="/vendor/register" className="text-primary font-medium hover:underline">Register as Vendor</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
