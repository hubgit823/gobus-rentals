import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { COMPANY } from "@/lib/company";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: `About — ${COMPANY.legalName}` },
      {
        name: "description",
        content: COMPANY.about.slice(0, 155),
      },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground mb-2">{COMPANY.platformBrand}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">About {COMPANY.legalName}</h1>
          <Badge variant="secondary" className="mb-6">
            GST {COMPANY.gstEnabled ? `${COMPANY.gstPercentage}% on bookings` : "off"} — shown on invoices
          </Badge>
          <p className="text-foreground/90 leading-relaxed text-lg mb-8">{COMPANY.about}</p>
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <h2 className="font-semibold text-foreground">Operating locations</h2>
            <p className="text-muted-foreground">{COMPANY.operatingLocations}</p>
            <h2 className="font-semibold text-foreground pt-2">Contact</h2>
            <p className="text-muted-foreground">
              Phone / WhatsApp:{" "}
              <a href={`tel:+91${COMPANY.contactPhone}`} className="text-primary hover:underline">
                {COMPANY.contactPhoneDisplay}
              </a>
              <br />
              Email:{" "}
              <a href={`mailto:${COMPANY.contactEmail}`} className="text-primary hover:underline">
                {COMPANY.contactEmail}
              </a>
            </p>
            <p className="text-sm text-muted-foreground pt-2">
              <Link to="/policies/refund-cancellation" className="text-primary hover:underline">
                Refund &amp; cancellation policy
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
