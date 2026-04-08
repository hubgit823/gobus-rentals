import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { COMPANY } from "@/lib/company";
import { Badge } from "@/components/ui/badge";
import { INDIAN_CITIES } from "@/data/indian-cities";
import { fleetImages } from "@/lib/media";
import { Building2, CalendarRange, CheckCircle2, MapPin, ShieldCheck, Users } from "lucide-react";

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
  const timeline = [
    {
      year: "2018",
      title: "Company started",
      detail: "Kartar Travels started operations with a focus on premium bus rentals and dependable drivers.",
      icon: Building2,
    },
    {
      year: "2020",
      title: "North India expansion",
      detail: "Expanded to high-demand intercity and event routes across Punjab, Haryana, Himachal, and Delhi NCR.",
      icon: MapPin,
    },
    {
      year: "2023",
      title: "Verified operator network",
      detail: "Built a partner network with quality checks, transparent pricing, and on-trip support processes.",
      icon: ShieldCheck,
    },
    {
      year: "Today",
      title: "Digital quote platform",
      detail: "LuxuryBusRental helps travelers compare operators faster and book with GST-transparent checkout.",
      icon: CalendarRange,
    },
  ];

  const mapCities = [
    { name: "Delhi", top: "31%", left: "46%" },
    { name: "Chandigarh", top: "23%", left: "43%" },
    { name: "Jaipur", top: "38%", left: "41%" },
    { name: "Ahmedabad", top: "52%", left: "33%" },
    { name: "Mumbai", top: "69%", left: "30%" },
    { name: "Pune", top: "73%", left: "34%" },
    { name: "Lucknow", top: "35%", left: "56%" },
    { name: "Patna", top: "39%", left: "63%" },
    { name: "Kolkata", top: "51%", left: "73%" },
    { name: "Hyderabad", top: "67%", left: "52%" },
    { name: "Bengaluru", top: "84%", left: "47%" },
    { name: "Chennai", top: "86%", left: "58%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div>
              <p className="text-sm text-primary font-semibold mb-3">{COMPANY.platformBrand}</p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                About {COMPANY.legalName}
              </h1>
              <Badge variant="secondary" className="mb-5">
                GST {COMPANY.gstEnabled ? `${COMPANY.gstPercentage}% on bookings` : "off"} — shown on invoices
              </Badge>
              <p className="text-foreground/90 leading-relaxed text-base sm:text-lg">{COMPANY.about}</p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-2xl font-display font-bold text-primary">{INDIAN_CITIES.length}+</p>
                  <p className="text-xs text-muted-foreground">City pages covered</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-2xl font-display font-bold text-primary">2018</p>
                  <p className="text-xs text-muted-foreground">Operating since</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
              <img
                src={fleetImages.coachGoldenHour}
                alt="Luxury coach fleet by Kartar Travels"
                className="w-full h-[260px] sm:h-[320px] object-contain sm:object-cover bg-muted/30"
                width={1200}
                height={800}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 to-transparent p-4 sm:p-5">
                <img
                  src="/images/logo.png"
                  alt={COMPANY.platformBrand}
                  className="h-10 sm:h-12 w-auto object-contain mb-2"
                  width={884}
                  height={458}
                />
                <p className="text-primary-foreground text-sm">
                  Trusted buses for weddings, corporate trips, tours, airport transfers, and daily group movement.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">Our journey timeline</h2>
            <div className="space-y-5">
              {timeline.map((item) => (
                <div key={item.year} className="grid sm:grid-cols-[110px_1fr] gap-3 sm:gap-5">
                  <div className="flex sm:block items-center gap-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
                      <item.icon className="w-4 h-4" />
                    </span>
                    <p className="text-sm font-semibold text-primary">{item.year}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Where we operate in India</h2>
              <Badge variant="outline" className="text-xs">
                {INDIAN_CITIES.length}+ city routes indexed
              </Badge>
            </div>

            <div className="relative rounded-2xl border border-border bg-gradient-to-b from-primary/5 to-muted/40 h-[420px] sm:h-[500px] overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_55%)]" />
              <div className="absolute inset-0 p-4 sm:p-6">
                <div className="absolute top-3 right-3 text-[10px] sm:text-xs text-muted-foreground bg-background/80 rounded px-2 py-1">
                  Indicative route coverage map
                </div>
                {mapCities.map((city) => (
                  <div key={city.name} className="absolute" style={{ top: city.top, left: city.left }}>
                    <div className="group relative">
                      <span className="flex h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-primary/20" />
                      <div className="absolute -translate-x-1/2 left-1/2 mt-1 whitespace-nowrap rounded bg-foreground text-primary-foreground text-[10px] sm:text-xs px-2 py-0.5 opacity-85 group-hover:opacity-100">
                        {city.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Core operating region: {COMPANY.operatingLocations}. We also support broader India routes through partner operators.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-5">Why travelers choose us</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Verified operators", icon: ShieldCheck, text: "Onboarded partners with profile checks and quality standards." },
                { title: "Transparent checkout", icon: CheckCircle2, text: `Clear fare with GST ${COMPANY.gstEnabled ? `${COMPANY.gstPercentage}%` : "as applicable"} before confirmation.` },
                { title: "Support for all groups", icon: Users, text: "From small family trips to wedding and corporate movement plans." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border p-4 bg-muted/30">
                  <item.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-background p-5 mt-6">
              <h3 className="font-semibold text-foreground mb-2">Contact</h3>
              <p className="text-muted-foreground text-sm">
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
              <p className="text-sm text-muted-foreground pt-3">
                <Link to="/policies/refund-cancellation" className="text-primary hover:underline">
                  Refund &amp; cancellation policy
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
