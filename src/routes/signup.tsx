import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { buildPageMeta } from "@/lib/seo/buildMeta";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () =>
    buildPageMeta({
      title: "Sign up",
      description: "Create your Luxury Bus Rental customer account.",
      path: "/signup",
      noindex: true,
    }),
});

type RegRes = { token: string; user: StoredUser };
const GOOGLE_IDENTITY_SCRIPT = "https://accounts.google.com/gsi/client";
let googleScriptPromise: Promise<void> | null = null;
let googleInitializedClientId: string | null = null;

function ensureGoogleScript() {
  if (globalThis.window === undefined) return Promise.resolve();
  if ((globalThis.window as any).google?.accounts?.id) return Promise.resolve();
  if (googleScriptPromise) return googleScriptPromise;
  googleScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GOOGLE_IDENTITY_SCRIPT}"]`);
    if (existing) {
      if ((globalThis.window as any).google?.accounts?.id) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Google Identity script")), {
        once: true,
      });
      return;
    }
    const script = document.createElement("script");
    script.src = GOOGLE_IDENTITY_SCRIPT;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Identity script"));
    document.head.appendChild(script);
  });
  return googleScriptPromise;
}

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isGooglePrompting, setIsGooglePrompting] = useState(false);
  const googleClientId =
    typeof import.meta.env.VITE_GOOGLE_CLIENT_ID === "string" ? import.meta.env.VITE_GOOGLE_CLIENT_ID.trim() : "";

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
  const googleMut = useMutation({
    mutationFn: (idToken: string) =>
      api<RegRes>("/api/auth/google", {
        method: "POST",
        body: JSON.stringify({ idToken }),
      }),
    onSuccess: (data) => {
      if (data.user.role !== "customer") {
        toast.error("This Google account belongs to a vendor/admin. Use Login portal.");
        return;
      }
      setAuth(data.token, data.user);
      toast.success("Signed up with Google");
      navigate({ to: "/customer/dashboard" });
    },
    onError: (e: Error) => toast.error(e.message || "Google sign up failed"),
  });

  useEffect(() => {
    return () => {
      const google = (globalThis.window as any)?.google;
      if (google?.accounts?.id && typeof google.accounts.id.cancel === "function") {
        try {
          google.accounts.id.cancel();
        } catch {
          // Ignore widget cleanup race.
        }
      }
    };
  }, []);

  const handleGoogleSignup = async () => {
    if (!googleClientId) {
      toast.error("Missing VITE_GOOGLE_CLIENT_ID in frontend .env");
      return;
    }
    if (!import.meta.env.VITE_API_URL?.trim()) {
      toast.error("Missing VITE_API_URL in frontend .env");
      return;
    }
    try {
      await ensureGoogleScript();
      const google = (globalThis.window as any).google;
      if (!google?.accounts?.id) throw new Error("Google Identity Services not available");
      if (googleInitializedClientId !== googleClientId) {
        google.accounts.id.initialize({
          client_id: googleClientId,
          callback: ({ credential }: { credential?: string }) => {
            setIsGooglePrompting(false);
            if (!credential) {
              toast.error("Google did not return a credential");
              return;
            }
            googleMut.mutate(credential);
          },
        });
        googleInitializedClientId = googleClientId;
      }
      setIsGooglePrompting(true);
      if (typeof google.accounts.id.cancel === "function") google.accounts.id.cancel();
      google.accounts.id.prompt(() => setIsGooglePrompting(false));
    } catch (e) {
      setIsGooglePrompting(false);
      const msg = e instanceof Error ? e.message : "Google signup setup failed";
      toast.error(msg);
    }
  };

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

            <div className="relative mt-6">
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
              className="mt-4 w-full gap-2"
              size="lg"
              onClick={handleGoogleSignup}
              disabled={googleMut.isPending || isGooglePrompting}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {googleMut.isPending || isGooglePrompting ? "Signing up with Google..." : "Sign up with Google"}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" search={{ role: "customer" }} className="text-primary font-medium hover:underline">
                Login
              </Link>
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
