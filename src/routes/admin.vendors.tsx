import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, Ban } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/lib/api";

export const Route = createFileRoute("/admin/vendors")({
  component: AdminVendors,
});

type V = {
  id: string;
  name: string;
  owner: string;
  city: string;
  buses: number;
  kyc: string;
  status: string;
  rawStatus: string;
};

type Res = { vendors: V[] };

const statusColor: Record<string, string> = {
  Active: "bg-chart-2/20 text-chart-2",
  Pending: "bg-chart-5/20 text-chart-5",
  Blocked: "bg-destructive/20 text-destructive",
};

function AdminVendors() {
  const qc = useQueryClient();
  const [view, setView] = useState<V | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-vendors"],
    queryFn: () => api<Res>("/api/admin/vendors"),
  });

  const patchMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api("/api/admin/vendors/" + id, { method: "PATCH", body: JSON.stringify({ status }) }),
    onSuccess: () => {
      toast.success("Vendor updated");
      qc.invalidateQueries({ queryKey: ["admin-vendors"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (error) return <div className="p-8 text-sm text-destructive">{(error as Error).message}</div>;

  const vendors = data?.vendors ?? [];

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Vendor Management</h1>
      <p className="text-muted-foreground text-sm mb-6">Approve, manage, and monitor bus operators</p>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">ID</th>
              <th className="text-left px-5 py-3 font-medium">Business</th>
              <th className="text-left px-5 py-3 font-medium">Owner</th>
              <th className="text-left px-5 py-3 font-medium">City</th>
              <th className="text-left px-5 py-3 font-medium">Buses</th>
              <th className="text-left px-5 py-3 font-medium">KYC</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-5 py-3 font-medium text-foreground font-mono text-xs">{v.id.slice(-8)}</td>
                <td className="px-5 py-3 font-medium text-foreground">{v.name}</td>
                <td className="px-5 py-3 text-foreground">{v.owner}</td>
                <td className="px-5 py-3 text-muted-foreground">{v.city}</td>
                <td className="px-5 py-3 text-foreground">{v.buses}</td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v.kyc === "Approved" ? "bg-chart-2/20 text-chart-2" : v.kyc === "Pending" ? "bg-chart-5/20 text-chart-5" : "bg-destructive/20 text-destructive"}`}>{v.kyc}</span></td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[v.status] ?? "bg-muted"}`}>{v.status}</span></td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" type="button" onClick={() => setView(v)}><Eye className="w-3.5 h-3.5" /></Button>
                    {v.status === "Pending" && (
                      <>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-chart-2" type="button" disabled={patchMut.isPending} onClick={() => patchMut.mutate({ id: v.id, status: "active" })}><Check className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" type="button" disabled={patchMut.isPending} onClick={() => patchMut.mutate({ id: v.id, status: "rejected" })}><X className="w-3.5 h-3.5" /></Button>
                      </>
                    )}
                    {v.status === "Active" && (
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" type="button" disabled={patchMut.isPending} onClick={() => patchMut.mutate({ id: v.id, status: "blocked" })}><Ban className="w-3.5 h-3.5" /></Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vendor</DialogTitle>
          </DialogHeader>
          {view ? <pre className="text-xs bg-muted p-3 rounded-md overflow-auto">{JSON.stringify(view, null, 2)}</pre> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
