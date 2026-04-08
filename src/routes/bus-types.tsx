import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { faqPageSchema, productBusMarketplaceSchema } from "@/lib/seo/schemas";
import { fleetImages } from "@/lib/media";
import { Badge } from "@/components/ui/badge";
import { Bus, Snowflake, Users, RouteIcon } from "lucide-react";

const types = [
  {
    name: "Mini bus & tempo traveller (12–17 seater)",
    desc: "Ideal for airport transfers, small weddings, and city shuttles. Often compared in tempo traveller vs bus decisions for narrow lanes.",
    image: fleetImages.vanUrbaniaFront,
  },
  {
    name: "Mid-size AC bus (26–35 seater)",
    desc: "School trips, college excursions, and SME corporate outings. Strong value for group travel bus booking per seat.",
    image: fleetImages.vanInteriorAisle,
  },
  {
    name: "Luxury coach (40–52 seater)",
    desc: "Wedding guest transport, large conferences, and interstate tours. Common choice for luxury bus rental in metro cities.",
    image: fleetImages.coachDepotLine,
  },
  {
    name: "Volvo / premium highway coach",
    desc: "Long-distance comfort, reclining seats, luggage bays. Popular for corporate bus hire and premium tourism circuits.",
    image: fleetImages.coachSeatsReclining,
  },
  {
    name: "Sleeper bus",
    desc: "Overnight routes where passengers need berths. Compare with seated Volvo in our Volvo vs sleeper guide.",
    image: fleetImages.coachInteriorSemiSleeper,
  },
];

const faqs = [
  {
    question: "Which bus type is best for a wedding?",
    answer: "Usually 45–52 seater AC coaches for bulk guests, plus tempo travellers for VIP shuttles. Itinerary and parking access decide the mix.",
  },
  {
    question: "Do you list non-AC buses?",
    answer: "Operators may offer non-AC for budget charters. Specify your preference when posting requirements on LuxuryBusRental.in.",
  },
];

export const Route = createFileRoute("/bus-types")({
  component: BusTypesPage,
  head: () => {
    const { meta, links } = buildPageMeta({
      title: "Bus Types for Hire in India | AC, Volvo, Sleeper & Coaches",
      description: `Compare mini bus, tempo traveller, AC coach, Volvo, and sleeper buses for rental in India. Book via ${COMPANY.platformBrand}.`,
      path: "/bus-types",
      keywords:
        "bus types India, tempo traveller vs bus, Volvo bus rental, sleeper bus hire, luxury coach rental, 45 seater bus hire",
    });
    return {
      meta: [
        ...meta,
        { "script:ld+json": productBusMarketplaceSchema() },
        { "script:ld+json": faqPageSchema(faqs.map((f) => ({ question: f.question, answer: f.answer }))) },
      ],
      links,
    };
  },
});

function BusTypesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Bus types" }]} />
          <section className="rounded-2xl border border-border bg-card overflow-hidden mb-10">
            <img
              src={fleetImages.coachFrontMountain}
              alt="Bus types for hire in India"
              className="w-full h-52 sm:h-64 object-cover"
              width={1400}
              height={820}
            />
            <div className="p-5 sm:p-7">
              <Badge variant="secondary" className="mb-3">Fleet selection guide</Badge>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Bus types for hire in India
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Choose the right vehicle for <strong className="text-foreground">bus rental</strong> outcomes.{" "}
                {COMPANY.platformBrand} helps you request quotes across categories so operators respond with fleet that matches
                your headcount, comfort needs, and route profile.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {[
                  { label: "Seat range", value: "12-52", icon: Users },
                  { label: "AC options", value: "Yes", icon: Snowflake },
                  { label: "Use cases", value: "City + Highway", icon: RouteIcon },
                  { label: "Fleet classes", value: "5", icon: Bus },
                ].map((k) => (
                  <div key={k.label} className="rounded-lg border border-border bg-muted/30 p-3">
                    <k.icon className="w-4 h-4 text-primary mb-1" />
                    <p className="text-[11px] text-muted-foreground">{k.label}</p>
                    <p className="text-sm font-semibold text-foreground">{k.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ul className="space-y-6">
            {types.map((t) => (
              <li key={t.name} className="rounded-xl border border-border bg-card overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-44 sm:h-52 object-cover" width={1100} height={620} />
                <div className="p-5">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-2">{t.name}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <section className="mt-12 rounded-xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">How to pick the right bus quickly</h2>
            <ol className="space-y-3 text-sm text-muted-foreground list-decimal pl-5">
              <li>Fix passenger count + luggage expectations first.</li>
              <li>Mark route type: city-only, mixed, or long highway.</li>
              <li>Choose comfort level: standard AC, premium coach, or sleeper.</li>
              <li>Compare quotes by inclusions (fuel, toll, GST, overtime).</li>
            </ol>
          </section>

          <h2 className="font-display text-xl font-semibold mt-12 mb-3">Related reading</h2>
          <p className="text-sm text-muted-foreground mb-6">
            <Link to="/blog/volvo-bus-vs-sleeper-bus-india" className="text-primary hover:underline">
              Volvo bus vs sleeper bus
            </Link>
            {" · "}
            <Link to="/guides" className="text-primary hover:underline">
              All guides
            </Link>
            {" · "}
            <Link to="/blog/how-to-book-bus-for-wedding-india" className="text-primary hover:underline">
              Wedding bus rental
            </Link>
          </p>

          <h3 className="font-semibold text-foreground mb-3">FAQs</h3>
          <dl className="space-y-4 mb-10">
            {faqs.map((f) => (
              <div key={f.question}>
                <dt className="text-sm font-medium text-foreground">{f.question}</dt>
                <dd className="text-sm text-muted-foreground mt-1">{f.answer}</dd>
              </div>
            ))}
          </dl>

          <Link to="/book">
            <Button size="lg">Compare quotes for any bus type</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
