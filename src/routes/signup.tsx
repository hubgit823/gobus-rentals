import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Phone, User, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Sign Up — LuxuryBusRental" },
      { name: "description", content: "Create your LuxuryBusRental account." },
    ],
  }),
});

function SignupPage() {
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
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-primary" /> Full Name
                </Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-primary" /> Email Address
                </Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-primary" /> Mobile Number
                </Label>
                <Input id="mobile" type="tel" placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-primary" /> Password
                </Label>
                <Input id="password" type="password" placeholder="Minimum 8 characters" />
              </div>
              <Link to="/customer/dashboard">
                <Button className="w-full" size="lg">
                  Create Account <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
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
