import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, Phone, User, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Login — LuxuryBusRental" },
      { name: "description", content: "Login to your LuxuryBusRental account." },
    ],
  }),
});

function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"email" | "otp">("email");
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <img src="/images/logo.jpeg" alt="LuxuryBusRental" className="h-14 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-sm mt-1">Login to manage your bookings</p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8">
            <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "email" | "otp")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="otp">Mobile OTP</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-primary" /> Email Address
                    </Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-primary" /> Password
                    </Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="flex justify-end">
                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                  </div>
                  <Link to="/customer/dashboard">
                    <Button className="w-full" size="lg">
                      Login <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </form>
              </TabsContent>

              <TabsContent value="otp">
                <form onSubmit={(e) => { e.preventDefault(); setOtpSent(true); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-primary" /> Mobile Number
                    </Label>
                    <Input id="mobile" type="tel" placeholder="+91 98765 43210" />
                  </div>
                  {otpSent && (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input id="otp" placeholder="6-digit OTP" maxLength={6} />
                    </div>
                  )}
                  {otpSent ? (
                    <Link to="/customer/dashboard">
                      <Button className="w-full" size="lg">Verify & Login</Button>
                    </Link>
                  ) : (
                    <Button type="submit" className="w-full" size="lg">Send OTP</Button>
                  )}
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or continue with</span></div>
            </div>

            <Button variant="outline" className="w-full mt-4 gap-2" size="lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Sign in with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
            </p>

            <div className="flex justify-center gap-4 mt-3 text-xs">
              <Link to="/vendor/login" className="text-primary hover:underline">Vendor Login</Link>
              <Link to="/admin/login" className="text-primary hover:underline">Admin Login</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
