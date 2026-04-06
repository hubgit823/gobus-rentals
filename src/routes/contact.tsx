import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { COMPANY } from "@/lib/company";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [{ title: `Contact — ${COMPANY.legalName}` }],
  }),
});

function ContactPage() {
  const wa = `https://wa.me/${COMPANY.whatsappE164}`;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Contact us</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Reach {COMPANY.legalName} for bookings, quotes, and support.
          </p>
          <ul className="space-y-6">
            <li className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <a href={`tel:+91${COMPANY.contactPhone}`} className="text-primary hover:underline">
                  {COMPANY.contactPhoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <Phone className="w-5 h-5 text-chart-2 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">WhatsApp</p>
                <a href={wa} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  Chat on WhatsApp ({COMPANY.contactPhoneDisplay})
                </a>
              </div>
            </li>
            <li className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <a href={`mailto:${COMPANY.contactEmail}`} className="text-primary hover:underline">
                  {COMPANY.contactEmail}
                </a>
              </div>
            </li>
            <li className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Service areas</p>
                <p className="text-muted-foreground">{COMPANY.operatingLocations}</p>
              </div>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
