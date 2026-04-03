import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Percent, Clock, Globe } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <div className="p-6 sm:p-8 max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Platform Settings</h1>
      <p className="text-muted-foreground text-sm mb-6">Configure platform-wide settings</p>

      <div className="space-y-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Percent className="w-5 h-5 text-primary" /> Commission Settings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Default Commission (%)</Label>
              <Input type="number" defaultValue="10" min={0} max={50} />
            </div>
            <div className="space-y-2">
              <Label>Min. Booking Amount (₹)</Label>
              <Input type="number" defaultValue="2000" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Quote Window
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Max Response Time (hours)</Label>
              <Input type="number" defaultValue="4" min={1} max={48} />
            </div>
            <div className="space-y-2">
              <Label>Min KM/Day Rule</Label>
              <Input type="number" defaultValue="250" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" /> General
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Platform Name</Label>
              <Input defaultValue="LuxuryBusRental" />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input defaultValue="support@luxurybusrental.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label>Support Phone</Label>
              <Input defaultValue="+91 99999 99999" type="tel" />
            </div>
          </div>
        </div>

        <Button size="lg">Save Settings</Button>
      </div>
    </div>
  );
}
