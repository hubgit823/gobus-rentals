import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/customer/profile")({
  component: CustomerProfile,
});

function CustomerProfile() {
  return (
    <div className="p-6 sm:p-8 max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">My Profile</h1>
      <p className="text-muted-foreground text-sm mb-6">Update your personal information</p>

      <div className="bg-card rounded-xl border border-border p-6">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">John Doe</h3>
              <p className="text-sm text-muted-foreground">Customer since Jan 2024</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label><User className="w-4 h-4 text-primary inline mr-1" />Full Name</Label>
              <Input defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label><Phone className="w-4 h-4 text-primary inline mr-1" />Mobile</Label>
              <Input defaultValue="+91 98765 43210" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label><Mail className="w-4 h-4 text-primary inline mr-1" />Email</Label>
              <Input defaultValue="john@example.com" type="email" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label><MapPin className="w-4 h-4 text-primary inline mr-1" />City</Label>
              <Input defaultValue="Mumbai" />
            </div>
          </div>

          <Button size="lg">Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
