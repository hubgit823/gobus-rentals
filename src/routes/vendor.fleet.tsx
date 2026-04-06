import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Bus, Snowflake, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { panelPage, panelStatePadding } from "@/lib/panel-page";

export const Route = createFileRoute("/vendor/fleet")({
  component: VendorFleet,
});

type BusRow = {
  id: string;
  name: string;
  type: string;
  capacity: number;
  ac: boolean;
  pricePerKm: number;
  pricePerDay: number;
  status: string;
  rawStatus: string;
};

type Res = { buses: BusRow[] };

function VendorFleet() {
  const qc = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [editBus, setEditBus] = useState<BusRow | null>(null);

  const [name, setName] = useState("");
  const [busType, setBusType] = useState("seater");
  const [capacity, setCapacity] = useState("");
  const [ac, setAc] = useState("ac");
  const [pricePerKm, setPricePerKm] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["vendor-buses"],
    queryFn: () => api<Res>("/api/vendor/buses"),
  });

  const resetForm = () => {
    setName("");
    setBusType("seater");
    setCapacity("");
    setAc("ac");
    setPricePerKm("");
    setPricePerDay("");
  };

  const createMut = useMutation({
    mutationFn: () =>
      api("/api/vendor/buses", {
        method: "POST",
        body: JSON.stringify({
          name,
          busType,
          capacity: Number(capacity),
          ac: ac === "ac",
          pricePerKm: Number(pricePerKm) || 0,
          pricePerDay: Number(pricePerDay) || 0,
        }),
      }),
    onSuccess: () => {
      toast.success("Bus added");
      setShowAdd(false);
      resetForm();
      qc.invalidateQueries({ queryKey: ["vendor-buses"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMut = useMutation({
    mutationFn: () =>
      api("/api/vendor/buses/" + editBus!.id, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          busType,
          capacity: Number(capacity),
          ac: ac === "ac",
          pricePerKm: Number(pricePerKm) || 0,
          pricePerDay: Number(pricePerDay) || 0,
        }),
      }),
    onSuccess: () => {
      toast.success("Bus updated");
      setEditBus(null);
      resetForm();
      qc.invalidateQueries({ queryKey: ["vendor-buses"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => api("/api/vendor/buses/" + id, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Bus removed");
      qc.invalidateQueries({ queryKey: ["vendor-buses"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openEdit = (b: BusRow) => {
    setEditBus(b);
    setName(b.name);
    setBusType(b.type === "Sleeper" ? "sleeper" : "seater");
    setCapacity(String(b.capacity));
    setAc(b.ac ? "ac" : "non-ac");
    setPricePerKm(String(b.pricePerKm));
    setPricePerDay(String(b.pricePerDay));
  };

  const buses = data?.buses ?? [];

  if (isLoading) return <div className={`${panelStatePadding} text-sm text-muted-foreground`}>Loading fleet…</div>;
  if (error) return <div className={`${panelStatePadding} text-sm text-destructive`}>{(error as Error).message}</div>;

  return (
    <div className={panelPage.standard}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold text-foreground">Fleet Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Add, edit, and manage your bus fleet</p>
        </div>
        <Button onClick={() => { resetForm(); setShowAdd(!showAdd); }} className="gap-2 w-full sm:w-auto shrink-0">
          <Plus className="w-4 h-4" /> Add Bus
        </Button>
      </div>

      {showAdd && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Add New Bus</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createMut.mutate();
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="space-y-2">
              <Label>Bus Name/Model</Label>
              <Input placeholder="e.g. Volvo 9400" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={busType} onValueChange={setBusType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="seater">Seater</SelectItem>
                  <SelectItem value="sleeper">Sleeper</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Seating Capacity</Label>
              <Input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>AC / Non-AC</Label>
              <Select value={ac} onValueChange={setAc}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ac">AC</SelectItem>
                  <SelectItem value="non-ac">Non-AC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Price per KM (₹)</Label>
              <Input type="number" value={pricePerKm} onChange={(e) => setPricePerKm(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Price per Day (₹)</Label>
              <Input type="number" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} />
            </div>
            <div className="sm:col-span-3 flex gap-2">
              <Button type="submit" disabled={createMut.isPending}>{createMut.isPending ? "Saving…" : "Save Bus"}</Button>
              <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {buses.map((bus) => (
          <div key={bus.id} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Bus className="w-5 h-5 text-primary" />
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                bus.status === "Available" ? "bg-chart-2/20 text-chart-2" :
                bus.status === "On Trip" ? "bg-chart-5/20 text-chart-5" :
                "bg-muted text-muted-foreground"
              }`}>{bus.status}</span>
            </div>
            <h3 className="font-semibold text-foreground">{bus.name}</h3>
            <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {bus.capacity} seats</span>
              <span className="flex items-center gap-1"><Snowflake className="w-3 h-3" /> {bus.ac ? "AC" : "Non-AC"}</span>
            </div>
            <div className="mt-3 text-sm">
              <span className="text-primary font-semibold">₹{bus.pricePerKm}/km</span>
              <span className="text-muted-foreground mx-2">•</span>
              <span className="text-muted-foreground">₹{Number(bus.pricePerDay).toLocaleString("en-IN")}/day</span>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1 gap-1" type="button" onClick={() => openEdit(bus)}><Edit className="w-3 h-3" /> Edit</Button>
              <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive" type="button" onClick={() => { if (confirm("Delete this bus?")) deleteMut.mutate(bus.id); }}><Trash2 className="w-3 h-3" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editBus} onOpenChange={(o) => !o && setEditBus(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit bus</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={busType} onValueChange={setBusType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seater">Seater</SelectItem>
                    <SelectItem value="sleeper">Sleeper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Capacity</Label>
                <Input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>AC</Label>
              <Select value={ac} onValueChange={setAc}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ac">AC</SelectItem>
                  <SelectItem value="non-ac">Non-AC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>₹/km</Label>
                <Input type="number" value={pricePerKm} onChange={(e) => setPricePerKm(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>₹/day</Label>
                <Input type="number" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setEditBus(null)}>Cancel</Button>
            <Button type="button" disabled={updateMut.isPending} onClick={() => updateMut.mutate()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
