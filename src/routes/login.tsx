import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, Phone, ArrowRight, User, Bus, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api";
import { setAuth, type StoredUser } from "@/lib/auth-storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    role: search.role === "vendor" || search.role === "admin" ? search.role : undefined,
  }),
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Login — Luxury Bus Rental" },
      { name: "description", content: "Login as a customer, vendor, or admin." },
    ],
  }),
});

type LoginRes = { token: string; user: StoredUser };
type AccountRole = "customer" | "vendor" | "admin";

const roleLabels: Record<AccountRole, { title: string; description: string }> = {
  customer: { title: "Customer", description: "Book buses, quotes & trips" },
  vendor: { title: "Vendor", description: "Operators & fleet dashboard" },
  admin: { title: "Admin", description: "Platform staff only" },
};

function LoginPage() {
  const navigate = useNavigate();
  const { role: roleFromUrl } = Route.useSearch();
  const [accountRole, setAccountRole] = useState<AccountRole>("customer");
  const [loginMethod, setLoginMethod] = useState<"email" | "otp">("email");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (roleFromUrl === "vendor" || roleFromUrl === "admin") {
      setAccountRole(roleFromUrl);
      setLoginMethod("email");
      setOtpSent(false);
    }
  }, [roleFromUrl]);

  const loginMut = useMutation({
    mutationFn: () =>
      api<LoginRes>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    onSuccess: (data) => {
      const role = data.user.role;
      if (accountRole === "customer") {
        if (role !== "customer") {
          toast.error("This account is not a customer. Choose Vendor or Admin above.");
          return;
        }
        setAuth(data.token, data.user);
        toast.success("Welcome back!");
        navigate({ to: "/customer/dashboard" });
        return;
      }
      if (accountRole === "vendor") {
        if (role !== "vendor") {
          toast.error("This account is not registered as a vendor.");
          return;
        }
        setAuth(data.token, data.user);
        toast.success("Vendor session started");
        navigate({ to: "/vendor/dashboard" });
        return;
      }
      if (accountRole === "admin") {
        if (role !== "admin") {
          toast.error("Administrator access only. This email is not an admin.");
          return;
        }
        setAuth(data.token, data.user);
        toast.success("Admin session started");
        navigate({ to: "/admin/dashboard" });
      }
    },
    onError: (e: Error) => toast.error(e.message || "Login failed"),
  });

  const subtitle =
    accountRole === "customer"
      ? "Sign in to manage bookings and quotes"
      : accountRole === "vendor"
        ? "Sign in to your operator dashboard"
        : "Sign in to the admin console";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-6">
            <img
              src="/images/logo.png"
              alt="Luxury Bus Rental"
              className="h-[4.5rem] sm:h-[5.25rem] w-auto mx-auto mb-4 object-contain"
              width={884}
              height={458}
              decoding="async"
            />
            <h1 className="font-display text-2xl font-bold text-foreground">Sign in</h1>
            <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border border-border p-5 sm:p-8">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Login as</p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {(
                [
                  { role: "customer" as const, icon: User },
                  { role: "vendor" as const, icon: Bus },
                  { role: "admin" as const, icon: ShieldCheck },
                ] as const
              ).map(({ role, icon: Icon }) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setAccountRole(role);
                    setLoginMethod("email");
                    setOtpSent(false);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors min-h-[5.5rem] touch-manipulation",
                    accountRole === role
                      ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/30"
                      : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <Icon className={cn("w-5 h-5 shrink-0", accountRole === role ? "text-primary" : "")} />
                  <span className="text-xs font-semibold leading-tight">{roleLabels[role].title}</span>
                  <span className="text-[10px] leading-tight opacity-80 line-clamp-2 hidden sm:block">{roleLabels[role].description}</span>
                </button>
              ))}
            </div>

            <Tabs
              value={accountRole === "customer" ? loginMethod : "email"}
              onValueChange={(v) => {
                if (accountRole === "customer") setLoginMethod(v as "email" | "otp");
              }}
            >
              <TabsList className={cn("grid w-full mb-6", accountRole === "customer" ? "grid-cols-2" : "grid-cols-1")}>
                <TabsTrigger value="email" className="gap-1">
                  <Mail className="w-3.5 h-3.5" /> Email
                </TabsTrigger>
                {accountRole === "customer" ? (
                  <TabsTrigger value="otp" className="gap-1">
                    <Phone className="w-3.5 h-3.5" /> Mobile OTP
                  </TabsTrigger>
                ) : null}
              </TabsList>

              <TabsContent value="email" className="mt-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    loginMut.mutate();
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-primary" /> Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-primary" /> Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <a
                      href="mailto:support@luxurybusrental.com?subject=Password%20reset"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Button className="w-full" size="lg" type="submit" disabled={loginMut.isPending}>
                    {loginMut.isPending ? "Signing in…" : `Continue as ${roleLabels[accountRole].title}`}{" "}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </TabsContent>

              {accountRole === "customer" ? (
                <TabsContent value="otp" className="mt-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!otpSent) {
                        setOtpSent(true);
                        toast.message("Demo mode", {
                          description: "SMS OTP is not wired. Please use the Email tab with a registered account.",
                        });
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="mobile" className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-primary" /> Mobile Number
                      </Label>
                      <Input id="mobile" type="tel" placeholder="+91 98765 43210" />
                    </div>
                    {otpSent ? (
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input id="otp" placeholder="6-digit OTP" maxLength={6} />
                      </div>
                    ) : null}
                    <Button type="submit" className="w-full" size="lg">
                      {otpSent ? "Verify (use email login)" : "Send OTP"}
                    </Button>
                  </form>
                </TabsContent>
              ) : null}
            </Tabs>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-4 gap-2"
              size="lg"
              onClick={() =>
                toast.message("Google sign-in", {
                  description: "Configure OAuth client ID and backend callback to enable Google login.",
                })
              }
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>

            {accountRole === "customer" ? (
              <p className="text-center text-sm text-muted-foreground mt-6">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            ) : accountRole === "vendor" ? (
              <p className="text-center text-sm text-muted-foreground mt-6">
                New operator?{" "}
                <Link to="/vendor/register" className="text-primary font-medium hover:underline">
                  Register as vendor
                </Link>
              </p>
            ) : (
              <p className="text-center text-xs text-muted-foreground mt-6">
                Admin accounts are created by platform staff only.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
