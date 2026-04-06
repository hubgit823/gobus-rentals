import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { faqPageSchema } from "@/lib/seo/schemas";

const faqs = [
  {
    question: "How do I compare bus rental quotes fairly?",
    answer:
      "Align inclusions: fuel, driver, tolls, GST, minimum km, and overtime. Use LuxuryBusRental.in to receive comparable quotes from multiple operators for the same itinerary.",
  },
  {
    question: "What documents should I verify before charter?",
    answer: "Check commercial vehicle permit, insurance, fitness, and driver licence class. Reputable operators share these during booking for corporate and wedding clients.",
  },
  {
    question: "When should I book for peak wedding season?",
    answer: "Aim for 8–12 weeks ahead in metros and popular destination venues. Last-minute inventory exists but limits choice of Volvo coaches and sleeper buses.",
  },
];

export const Route = createFileRoute("/guides")({
  component: GuidesPage,
  head: () => {
    const { meta, links } = buildPageMeta({
      title: "Bus Rental Guides India | Booking Tips & Checklists",
      description: `Expert guides for bus hire in India: compare quotes, wedding logistics, corporate charters, GST, and safety — ${COMPANY.legalName}.`,
      path: "/guides",
      keywords: "bus rental guide India, bus hire tips, group travel booking, corporate charter checklist, wedding transport guide",
    });
    return {
      meta: [...meta, { "script:ld+json": faqPageSchema(faqs.map((f) => ({ question: f.question, answer: f.answer }))) }],
      links,
    };
  },
});

function GuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Guides" }]} />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Bus rental guides for India
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-6">
            These guides support <strong className="text-foreground">organic discovery</strong> for teams searching{" "}
            <strong>bus rental in India</strong>, <strong>luxury bus hire</strong>, and{" "}
            <strong>group travel bus booking</strong>. {COMPANY.legalName} operates {COMPANY.platformBrand} as a marketplace
            connecting customers with verified operators across {COMPANY.operatingLocations}.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-3">Start with our long-form articles</h2>
          <ul className="list-disc pl-5 text-primary space-y-2 mb-10">
            <li>
              <Link to="/blog/bus-rental-price-delhi-2026-guide" className="hover:underline">
                Bus rental price in Delhi (2026 guide)
              </Link>
            </li>
            <li>
              <Link to="/blog/how-to-book-bus-for-wedding-india" className="hover:underline">
                How to book a bus for a wedding in India
              </Link>
            </li>
            <li>
              <Link to="/blog/volvo-bus-vs-sleeper-bus-india" className="hover:underline">
                Volvo bus vs sleeper bus — which is better?
              </Link>
            </li>
          </ul>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-3">Keyword clusters we cover</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong className="text-foreground">Primary:</strong> bus rental in [city], bus hire in [city], luxury bus rental in
            [city]. <strong className="text-foreground">Secondary:</strong> wedding bus rental, corporate bus hire, tempo
            traveller vs bus, school trip charter, pilgrimage group transport.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-3">Programmatic city pages</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Browse 400+ city landings (e.g.{" "}
            <Link to="/bus-rental/$citySlug" params={{ citySlug: "delhi" }} className="text-primary hover:underline">
              Delhi
            </Link>
            ,{" "}
            <Link to="/bus-rental/$citySlug" params={{ citySlug: "mumbai" }} className="text-primary hover:underline">
              Mumbai
            </Link>
            ) from our <Link to="/routes" className="text-primary hover:underline">popular routes</Link> hub.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">FAQs</h2>
          <dl className="space-y-4">
            {faqs.map((f) => (
              <div key={f.question} className="border-b border-border pb-4">
                <dt className="font-medium text-foreground">{f.question}</dt>
                <dd className="text-sm text-muted-foreground mt-1">{f.answer}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <Link to="/book">
              <Button size="lg">Get best bus quotes now</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
