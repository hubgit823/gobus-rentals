import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
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
import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Users, Bus, Clock } from "lucide-react";
import { api } from "@/lib/api";
import { COMPANY } from "@/lib/company";

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
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [journeyTime, setJourneyTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("");
  const [busType, setBusType] = useState("");
  const [acPreference, setAcPreference] = useState("");
  const [purpose, setPurpose] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [notes, setNotes] = useState("");

  const mut = useMutation({
    mutationFn: () =>
      api<{ notifiedVendors?: number }>("/api/leads", {
        method: "POST",
        body: JSON.stringify({
          pickup,
          drop,
          journeyDate,
          journeyTime,
          returnDate: returnDate || undefined,
          passengers: Number(passengers),
          busType,
          acPreference,
          purpose,
          notes,
          guestName,
          guestPhone,
          guestEmail: guestEmail || undefined,
        }),
      }),
    onSuccess: (data) => {
      setSubmitted(true);
      toast.success(
        data.notifiedVendors != null
          ? `Submitted — ${data.notifiedVendors} active operator(s) can respond.`
          : "Requirement submitted.",
      );
    },
    onError: (e: Error) => toast.error(e.message || "Could not submit"),
  });

  if (submitted) {
    return (
      <div className="bg-card rounded-2xl shadow-xl border border-border ring-1 ring-primary/10 p-10 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bus className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Requirement Submitted!
        </h2>
        <p className="text-muted-foreground mb-6">
          Partner bus operators will send quotes to your dashboard (when logged in) and contact details you provided.
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
        if (!busType || !acPreference) {
          toast.error("Please select bus type and AC preference.");
          return;
        }
        mut.mutate();
      }}
      className="bg-card rounded-2xl shadow-xl border border-border ring-1 ring-primary/10 overflow-hidden p-6 sm:p-8 space-y-6"
    >
      <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-2 px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-r from-primary/12 via-primary/5 to-transparent border-b border-border">
        <p className="font-display text-lg sm:text-xl font-bold text-foreground">Get best bus quotes now</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-xl">
          One short form — multiple operators can reply with AC, Volvo, sleeper and mini-bus options for your dates.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="pickup" className="flex items-center gap-1.5 text-foreground font-medium">
            <MapPin className="w-4 h-4 text-primary" /> Pickup Location
          </Label>
          <Input id="pickup" placeholder="e.g. Mumbai" value={pickup} onChange={(e) => setPickup(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="drop" className="flex items-center gap-1.5 text-foreground font-medium">
            <MapPin className="w-4 h-4 text-primary" /> Drop Location
          </Label>
          <Input id="drop" placeholder="e.g. Pune" value={drop} onChange={(e) => setDrop(e.target.value)} required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="journey-date" className="flex items-center gap-1.5 text-foreground font-medium">
            <Calendar className="w-4 h-4 text-primary" /> Journey Date
          </Label>
          <Input id="journey-date" type="date" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="journey-time" className="flex items-center gap-1.5 text-foreground font-medium">
            <Clock className="w-4 h-4 text-primary" /> Journey Time
          </Label>
          <Input id="journey-time" type="time" value={journeyTime} onChange={(e) => setJourneyTime(e.target.value)} required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="return-date" className="flex items-center gap-1.5 text-foreground font-medium">
            <Calendar className="w-4 h-4 text-primary" /> Return Date (Optional)
          </Label>
          <Input id="return-date" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passengers" className="flex items-center gap-1.5 text-foreground font-medium">
            <Users className="w-4 h-4 text-primary" /> Number of Passengers
          </Label>
          <Input id="passengers" type="number" min={1} max={100} placeholder="e.g. 30" value={passengers} onChange={(e) => setPassengers(e.target.value)} required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-foreground font-medium">
            <Bus className="w-4 h-4 text-primary" /> Bus Type
          </Label>
          <Select value={busType} onValueChange={setBusType}>
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
          <Select value={acPreference} onValueChange={setAcPreference}>
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
        <Select value={purpose} onValueChange={setPurpose}>
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
          <Input id="name" placeholder="Full name" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground font-medium">Mobile Number</Label>
          <Input id="phone" type="tel" placeholder="+91 98765 43210" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground font-medium">Email (Optional)</Label>
        <Input id="email" type="email" placeholder="you@example.com" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-foreground font-medium">Additional Notes</Label>
        <Textarea id="notes" placeholder="Any special requirements..." rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <Button type="submit" size="xl" className="w-full" disabled={mut.isPending}>
        {mut.isPending ? "Submitting…" : "Get Free Quotes"}
      </Button>

      <p className="text-center text-xs text-muted-foreground leading-relaxed">
        By submitting, you agree to our Terms of Service and the{" "}
        <Link to="/policies/refund-cancellation" className="text-primary underline-offset-2 hover:underline">
          refund &amp; cancellation policy
        </Link>
        . Quotes show rental + {COMPANY.gstPercentage}% GST at checkout. We share your trip details with verified operators
        across {COMPANY.operatingLocations.split(",")[0]} and nearby regions.
      </p>
    </form>
  );
}
