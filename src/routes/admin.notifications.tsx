import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Send, Mail, MessageSquare, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin/notifications")({
  component: AdminNotifications,
});

const recentNotifications = [
  { id: 1, type: "SMS", to: "All Vendors", message: "New lead available in Mumbai area", date: "2025-02-15 10:30 AM" },
  { id: 2, type: "Email", to: "Priya Sharma", message: "Your booking BK001 is confirmed", date: "2025-02-14 3:15 PM" },
  { id: 3, type: "Push", to: "All Users", message: "Special discount on weekend bookings!", date: "2025-02-13 9:00 AM" },
];

function AdminNotifications() {
  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Notifications</h1>
      <p className="text-muted-foreground text-sm mb-6">Send push notifications, SMS, and emails</p>

      <Tabs defaultValue="send">
        <TabsList className="mb-6">
          <TabsTrigger value="send">Send Notification</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="send">
          <div className="bg-card rounded-xl border border-border p-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="space-y-2">
                <Label>Channel</Label>
                <div className="flex gap-3">
                  {[
                    { icon: Smartphone, label: "SMS" },
                    { icon: Mail, label: "Email" },
                    { icon: Bell, label: "Push" },
                    { icon: MessageSquare, label: "WhatsApp" },
                  ].map((ch) => (
                    <label key={ch.label} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" />
                      <ch.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{ch.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Recipients</Label>
                <Input placeholder="All Users, All Vendors, or specific user ID" />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="Notification subject" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Type your notification message..." rows={4} />
              </div>
              <Button className="gap-2"><Send className="w-4 h-4" /> Send Notification</Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="bg-card rounded-xl border border-border">
            {recentNotifications.map((n) => (
              <div key={n.id} className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{n.type}</span>
                    <span className="text-sm font-medium text-foreground">→ {n.to}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                </div>
                <p className="text-xs text-muted-foreground shrink-0 ml-4">{n.date}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
