import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Bus, Snowflake, Users } from "lucide-react";

export const Route = createFileRoute("/vendor/fleet")({
  component: VendorFleet,
});

const mockFleet = [
  { id: 1, name: "Volvo 9400", type: "Seater", capacity: 49, ac: true, pricePerKm: 45, pricePerDay: 12000, status: "Available" },
  { id: 2, name: "Ashok Leyland", type: "Seater", capacity: 40, ac: true, pricePerKm: 38, pricePerDay: 10000, status: "Available" },
  { id: 3, name: "Tata Starbus", type: "Seater", capacity: 32, ac: false, pricePerKm: 28, pricePerDay: 7500, status: "On Trip" },
  { id: 4, name: "Force Traveller", type: "Seater", capacity: 17, ac: true, pricePerKm: 22, pricePerDay: 5500, status: "Available" },
  { id: 5, name: "Tempo Traveller", type: "Seater", capacity: 12, ac: true, pricePerKm: 18, pricePerDay: 4000, status: "Maintenance" },
];

function VendorFleet() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Fleet Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Add, edit, and manage your bus fleet</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gap-2"><Plus className="w-4 h-4" /> Add Bus</Button>
      </div>

      {showAdd && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Add New Bus</h3>
          <form onSubmit={(e) => { e.preventDefault(); setShowAdd(false); }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Bus Name/Model</Label>
              <Input placeholder="e.g. Volvo 9400" />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="seater">Seater</SelectItem><SelectItem value="sleeper">Sleeper</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Seating Capacity</Label>
              <Input type="number" placeholder="49" />
            </div>
            <div className="space-y-2">
              <Label>AC / Non-AC</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="ac">AC</SelectItem><SelectItem value="non-ac">Non-AC</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Price per KM (₹)</Label>
              <Input type="number" placeholder="45" />
            </div>
            <div className="space-y-2">
              <Label>Price per Day (₹)</Label>
              <Input type="number" placeholder="12000" />
            </div>
            <div className="space-y-2">
              <Label>Bus Images</Label>
              <Input type="file" accept="image/*" multiple />
            </div>
            <div className="sm:col-span-3 flex gap-2">
              <Button type="submit">Save Bus</Button>
              <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockFleet.map((bus) => (
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
              <span className="text-muted-foreground">₹{bus.pricePerDay.toLocaleString()}/day</span>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1 gap-1"><Edit className="w-3 h-3" /> Edit</Button>
              <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive"><Trash2 className="w-3 h-3" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
