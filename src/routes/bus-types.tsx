import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { faqPageSchema, productBusMarketplaceSchema } from "@/lib/seo/schemas";

const types = [
  {
    name: "Mini bus & tempo traveller (12–17 seater)",
    desc: "Ideal for airport transfers, small weddings, and city shuttles. Often compared in tempo traveller vs bus decisions for narrow lanes.",
  },
  {
    name: "Mid-size AC bus (26–35 seater)",
    desc: "School trips, college excursions, and SME corporate outings. Strong value for group travel bus booking per seat.",
  },
  {
    name: "Luxury coach (40–52 seater)",
    desc: "Wedding guest transport, large conferences, and interstate tours. Common choice for luxury bus rental in metro cities.",
  },
  {
    name: "Volvo / premium highway coach",
    desc: "Long-distance comfort, reclining seats, luggage bays. Popular for corporate bus hire and premium tourism circuits.",
  },
  {
    name: "Sleeper bus",
    desc: "Overnight routes where passengers need berths. Compare with seated Volvo in our Volvo vs sleeper guide.",
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
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Bus types for hire in India
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Choose the right vehicle for <strong className="text-foreground">bus rental</strong> outcomes.{" "}
            {COMPANY.platformBrand} helps you request quotes across categories so operators respond with fleet that matches
            your headcount and route.
          </p>

          <ul className="space-y-6">
            {types.map((t) => (
              <li key={t.name} className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">{t.name}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </li>
            ))}
          </ul>

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
