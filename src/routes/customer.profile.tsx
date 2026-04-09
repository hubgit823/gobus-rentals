import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone } from "lucide-react";
import { api } from "@/lib/api";
import { panelPage } from "@/lib/panel-page";

export const Route = createFileRoute("/customer/profile")({
  component: CustomerProfile,
});

type MeRes = {
  user: { id: string; email: string; name: string; phone?: string };
};

function CustomerProfile() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const meQ = useQuery({
    queryKey: ["auth-me"],
    queryFn: () => api<MeRes>("/api/auth/me"),
  });

  useEffect(() => {
    if (meQ.data?.user) {
      setName(meQ.data.user.name);
      setPhone(meQ.data.user.phone ?? "");
    }
  }, [meQ.data]);

  const mut = useMutation({
    mutationFn: () =>
      api("/api/customer/profile", {
        method: "PATCH",
        body: JSON.stringify({ name, phone }),
      }),
    onSuccess: () => {
      toast.success("Profile updated");
      qc.invalidateQueries({ queryKey: ["auth-me"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className={panelPage.narrow}>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Profile</h1>
      <p className="text-muted-foreground text-sm mb-6">Update your personal information</p>

      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        {meQ.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : meQ.error ? (
          <p className="text-sm text-destructive">{(meQ.error as Error).message}</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mut.mutate();
            }}
            className="space-y-5"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{name || "Customer"}</h3>
                <p className="text-sm text-muted-foreground">Luxury Bus Rental customer</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label><User className="w-4 h-4 text-primary inline mr-1" />Full Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label><Phone className="w-4 h-4 text-primary inline mr-1" />Mobile</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label><Mail className="w-4 h-4 text-primary inline mr-1" />Email</Label>
                <Input value={meQ.data?.user.email ?? ""} disabled className="opacity-80" />
              </div>
            </div>

            <Button size="lg" type="submit" disabled={mut.isPending}>
              {mut.isPending ? "Saving…" : "Save Changes"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
