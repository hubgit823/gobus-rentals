import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Users, Bus, Clock } from "lucide-react";

const busTypes = [
  "12 Seater Mini Bus",
  "17 Seater Mini Bus",
  "26 Seater Bus",
  "32 Seater Bus",
  "40 Seater Bus",
  "49 Seater Bus",
  "52 Seater Bus",
  "Sleeper Bus",
];

const purposes = ["Wedding", "Corporate", "Tour", "School/College", "Pilgrimage", "Airport Transfer", "Other"];

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-card rounded-2xl shadow-lg border border-border p-10 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bus className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Requirement Submitted!
        </h2>
        <p className="text-muted-foreground mb-6">
          Our partner bus operators will send you quotes shortly. You'll receive them via SMS and email.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" size="lg">
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8 space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="pickup" className="flex items-center gap-1.5 text-foreground font-medium">
            <MapPin className="w-4 h-4 text-primary" /> Pickup Location
          </Label>
          <Input id="pickup" placeholder="e.g. Mumbai" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="drop" className="flex items-center gap-1.5 text-foreground font-medium">
            <MapPin className="w-4 h-4 text-primary" /> Drop Location
          </Label>
          <Input id="drop" placeholder="e.g. Pune" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="journey-date" className="flex items-center gap-1.5 text-foreground font-medium">
            <Calendar className="w-4 h-4 text-primary" /> Journey Date
          </Label>
          <Input id="journey-date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="journey-time" className="flex items-center gap-1.5 text-foreground font-medium">
            <Clock className="w-4 h-4 text-primary" /> Journey Time
          </Label>
          <Input id="journey-time" type="time" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="return-date" className="flex items-center gap-1.5 text-foreground font-medium">
            <Calendar className="w-4 h-4 text-primary" /> Return Date (Optional)
          </Label>
          <Input id="return-date" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passengers" className="flex items-center gap-1.5 text-foreground font-medium">
            <Users className="w-4 h-4 text-primary" /> Number of Passengers
          </Label>
          <Input id="passengers" type="number" min={1} max={100} placeholder="e.g. 30" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-foreground font-medium">
            <Bus className="w-4 h-4 text-primary" /> Bus Type
          </Label>
          <Select required>
            <SelectTrigger><SelectValue placeholder="Select bus type" /></SelectTrigger>
            <SelectContent>
              {busTypes.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-foreground font-medium">AC Preference</Label>
          <Select required>
            <SelectTrigger><SelectValue placeholder="AC / Non-AC" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ac">AC</SelectItem>
              <SelectItem value="non-ac">Non-AC</SelectItem>
              <SelectItem value="any">No Preference</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground font-medium">Purpose of Travel</Label>
        <Select>
          <SelectTrigger><SelectValue placeholder="Select purpose" /></SelectTrigger>
          <SelectContent>
            {purposes.map((p) => (
              <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground font-medium">Your Name</Label>
          <Input id="name" placeholder="Full name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground font-medium">Mobile Number</Label>
          <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground font-medium">Email (Optional)</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-foreground font-medium">Additional Notes</Label>
        <Textarea id="notes" placeholder="Any special requirements..." rows={3} />
      </div>

      <Button type="submit" size="xl" className="w-full">
        Get Free Quotes
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By submitting, you agree to our Terms of Service. We'll share your requirement with verified bus operators.
      </p>
    </form>
  );
}
