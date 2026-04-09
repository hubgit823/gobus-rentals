import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { COMPANY } from "@/lib/company";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { INDIAN_CITIES } from "@/data/indian-cities";
import { fleetImages } from "@/lib/media";
import { Building2, CalendarRange, CheckCircle2, Headset, MapPin, MessageCircle, Phone, ShieldCheck, Users } from "lucide-react";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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
      detail: "Luxury Bus Rental helps travelers compare operators faster and book with GST-transparent checkout.",
      icon: CalendarRange,
    },
  ];

  const [mapReady, setMapReady] = useState(false);
  const mapCities = [
    { name: "Delhi", lat: 28.6139, lng: 77.209 },
    { name: "Chandigarh", lat: 30.7333, lng: 76.7794 },
    { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
    { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
    { name: "Mumbai", lat: 19.076, lng: 72.8777 },
    { name: "Pune", lat: 18.5204, lng: 73.8567 },
    { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
    { name: "Patna", lat: 25.5941, lng: 85.1376 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
    { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
    { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  ];

  useEffect(() => {
    setMapReady(true);
  }, []);
  const gstText = COMPANY.gstEnabled ? `${COMPANY.gstPercentage}%` : "as applicable";

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
                className="w-full h-[260px] sm:h-[320px] object-contain bg-muted/30"
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

            <div className="relative rounded-2xl border border-border bg-muted/20 h-[420px] sm:h-[500px] overflow-hidden">
              <div className="absolute top-3 right-3 z-[500] text-[10px] sm:text-xs text-muted-foreground bg-background/90 rounded px-2 py-1">
                Live route coverage map
              </div>
              {mapReady ? (
                <MapContainer
                  center={[22.9734, 78.6569]}
                  zoom={5}
                  minZoom={4}
                  maxZoom={9}
                  className="h-full w-full"
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {mapCities.map((city) => (
                    <CircleMarker
                      key={city.name}
                      center={[city.lat, city.lng]}
                      radius={6}
                      pathOptions={{ color: "#2563eb", fillColor: "#2563eb", fillOpacity: 0.8, weight: 2 }}
                    >
                      <Tooltip direction="top" offset={[0, -4]} opacity={1}>
                        {city.name}
                      </Tooltip>
                    </CircleMarker>
                  ))}
                </MapContainer>
              ) : (
                <div className="h-full w-full grid place-items-center text-sm text-muted-foreground">
                  Loading India map...
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Core operating region: {COMPANY.operatingLocations}. We also support broader India routes through partner operators.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Why travelers choose us</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Trusted operations, transparent billing, and real support from planning to trip completion.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:min-w-[20rem]">
                <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-center">
                  <p className="text-lg font-bold text-foreground">2018</p>
                  <p className="text-[11px] text-muted-foreground">Since</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-center">
                  <p className="text-lg font-bold text-foreground">{INDIAN_CITIES.length}+</p>
                  <p className="text-[11px] text-muted-foreground">City pages</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-center">
                  <p className="text-lg font-bold text-foreground">{COMPANY.gstPercentage}%</p>
                  <p className="text-[11px] text-muted-foreground">GST clarity</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Verified operators", icon: ShieldCheck, text: "Onboarded partners with profile checks and quality standards." },
                { title: "Transparent checkout", icon: CheckCircle2, text: `Clear fare with GST ${gstText} before confirmation.` },
                { title: "Support for all groups", icon: Headset, text: "From small family trips to wedding and corporate movement plans." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <item.icon className="w-5 h-5" />
                  </div>
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
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <a href={`tel:+91${COMPANY.contactPhone}`} className="sm:flex-1">
                  <Button variant="secondary" className="w-full gap-2">
                    <Phone className="w-4 h-4" />
                    Call now
                  </Button>
                </a>
                <a
                  href={`https://wa.me/${COMPANY.whatsappE164}?text=${encodeURIComponent("Hi, I need bus rental support.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sm:flex-1"
                >
                  <Button variant="outline" className="w-full gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>
                <Link to="/book" className="sm:flex-1">
                  <Button className="w-full gap-2">
                    <Users className="w-4 h-4" />
                    Get quotes
                  </Button>
                </Link>
              </div>
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
