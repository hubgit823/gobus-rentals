import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";
import { getCityBySlug, getRelatedCities } from "@/data/indian-cities";
import { absoluteUrl } from "@/lib/site";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { faqPageSchema, localBusinessSchemaForCity, productBusMarketplaceSchema } from "@/lib/seo/schemas";

export const Route = createFileRoute("/bus-rental/$citySlug")({
  beforeLoad: ({ params }) => {
    if (!getCityBySlug(params.citySlug)) throw notFound();
  },
  head: ({ params }) => {
    const city = getCityBySlug(params.citySlug)!;
    const title = `Bus Rental in ${city.name} | Luxury Bus Hire at Best Price`;
    const description = `Book luxury buses in ${city.name} with ${COMPANY.legalName}. AC, Volvo, sleeper buses at best prices. Compare quotes on ${COMPANY.platformBrand}.`;
    const path = `/bus-rental/${city.slug}`;
    const { meta, links } = buildPageMeta({
      title,
      description,
      path,
      keywords: `bus rental in ${city.name}, bus hire in ${city.name}, luxury bus rental in ${city.name}, Volvo bus ${city.name}, wedding bus rental ${city.name}, corporate bus hire ${city.name}`,
    });
    const faqs = cityPageFaqs(city.name, city.state);
    return {
      meta: [
        ...meta,
        { "script:ld+json": localBusinessSchemaForCity(city) },
        { "script:ld+json": productBusMarketplaceSchema() },
        { "script:ld+json": faqPageSchema(faqs) },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: `Bus rental ${city.name}`, item: absoluteUrl(path) },
            ],
          },
        },
      ],
      links,
    };
  },
  component: CityBusRentalPage,
});

function cityPageFaqs(cityName: string, state: string) {
  return [
    {
      question: `How do I book bus rental in ${cityName}?`,
      answer: `Submit your trip details on ${COMPANY.platformBrand} — pickup, drop, date, and group size. Verified operators covering ${cityName} and ${state} send quotes; you compare and confirm with advance payment as per policy.`,
    },
    {
      question: `What types of buses are available in ${cityName}?`,
      answer: `Operators list AC seater buses, luxury coaches, Volvo-class vehicles, tempo travellers for smaller groups, and sleeper buses for overnight routes subject to availability.`,
    },
    {
      question: `Is GST included for bus hire in ${cityName}?`,
      answer: `Quotes show rental value; GST is applied as per Indian law and displayed at checkout with total including GST on confirmed bookings.`,
    },
    {
      question: `Can I use ${COMPANY.platformBrand} for wedding or corporate transport in ${cityName}?`,
      answer: `Yes. Mention wedding, corporate outing, or school trip in your requirement so operators quote the right vehicle class and duration.`,
    },
  ].map((f) => ({ question: f.question, answer: f.answer }));
}

function CityBusRentalPage() {
  const { citySlug } = Route.useParams();
  const city = getCityBySlug(citySlug)!;
  const related = getRelatedCities(city, 10);
  const mapQuery = encodeURIComponent(`${city.name} ${city.state} India bus stand`);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-24 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Bus rental", to: "/routes" },
              { label: city.name },
            ]}
          />

          <article>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Bus rental in {city.name} — luxury bus hire at best price
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Book <strong className="text-foreground">luxury bus rental in {city.name}</strong>, {city.state}, with{" "}
              {COMPANY.legalName}. Whether you need <strong>bus hire in {city.name}</strong> for weddings, corporate teams,
              schools, or pilgrimage groups, compare AC, Volvo, and sleeper options with transparent GST on{" "}
              {COMPANY.platformBrand}.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/book">
                <Button size="lg" className="font-semibold">
                  Get best bus quotes now
                </Button>
              </Link>
              <a href={`https://wa.me/${COMPANY.whatsappE164}`} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline">
                  WhatsApp {COMPANY.contactPhoneDisplay}
                </Button>
              </a>
            </div>

            <section className="mb-10 rounded-xl border border-border overflow-hidden bg-card">
              <iframe
                title={`Map of ${city.name}`}
                src={`https://maps.google.com/maps?q=${mapQuery}&z=11&output=embed`}
                className="w-full h-56 sm:h-72 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </section>

            <h2 className="font-display text-2xl font-semibold text-foreground mt-12 mb-3">
              Why choose us for bus rental in {city.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {COMPANY.legalName} has served travellers since 2018 with Volvo, Mercedes-Benz, seater, and sleeper buses across
              North India. Our marketplace connects you with operators who know local permits, popular routes from{" "}
              {city.name}, and event-day logistics for <strong>wedding bus rental</strong> and{" "}
              <strong>corporate bus hire</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You get multiple quotes instead of haggling one vendor, clear <strong>group travel bus booking</strong> steps,
              and policy-backed payments. Operators compete on service and price—ideal when you are comparing{" "}
              <strong>tempo traveller vs bus</strong> configurations for the same itinerary.
            </p>

            <h2 className="font-display text-2xl font-semibold text-foreground mt-10 mb-3">
              Available buses (AC, Volvo, sleeper)
            </h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-6">
              <li>12–17 seater tempo traveller and mini buses for airport and city shuttles</li>
              <li>26–40 seater AC buses for schools, colleges, and mid-size corporates</li>
              <li>45–52 seater luxury coaches for weddings and large conventions</li>
              <li>Volvo and premium highway coaches for long-distance comfort</li>
              <li>Sleeper buses for overnight intercity legs when berths suit your group</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold text-foreground mt-10 mb-3">
              Popular routes from {city.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Demand patterns vary by season, but groups often book outstation charters from {city.name} to nearby business and
              leisure hubs across {city.state} and neighbouring states. Share your exact pickup and drop when requesting{" "}
              <strong>bus rental in {city.name}</strong> so operators price tolls, driver allowance, and minimum km correctly.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For inspiration, read our guides on{" "}
              <Link to="/blog/how-to-book-bus-for-wedding-india" className="text-primary hover:underline">
                wedding bus booking
              </Link>
              ,{" "}
              <Link to="/blog/volvo-bus-vs-sleeper-bus-india" className="text-primary hover:underline">
                Volvo vs sleeper buses
              </Link>
              , and{" "}
              <Link to="/bus-types" className="text-primary hover:underline">
                bus types
              </Link>
              .
            </p>

            <h2 className="font-display text-2xl font-semibold text-foreground mt-10 mb-3">
              FAQs — bus hire in {city.name}
            </h2>
            <dl className="space-y-4">
              {cityPageFaqs(city.name, city.state).map((f) => (
                <div key={f.question} className="border-b border-border pb-4">
                  <dt className="font-medium text-foreground">{f.question}</dt>
                  <dd className="text-sm text-muted-foreground mt-1">{f.answer}</dd>
                </div>
              ))}
            </dl>

            <h2 className="font-display text-2xl font-semibold text-foreground mt-12 mb-4">More cities — bus rental India</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Internal links help you discover <strong>bus rental</strong> coverage nearby:
            </p>
            <ul className="flex flex-wrap gap-2">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/bus-rental/$citySlug"
                    params={{ citySlug: c.slug }}
                    className="inline-block rounded-full border border-border bg-card px-3 py-1 text-sm text-primary hover:bg-muted transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>

            <aside className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
              <h3 className="font-semibold text-foreground mb-2">NAP (contact)</h3>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{COMPANY.legalName}</span>
                <br />
                Phone / WhatsApp:{" "}
                <a href={`tel:+91${COMPANY.contactPhone}`} className="text-primary hover:underline">
                  {COMPANY.contactPhoneDisplay}
                </a>
                <br />
                Email:{" "}
                <a href={`mailto:${COMPANY.contactEmail}`} className="text-primary hover:underline">
                  {COMPANY.contactEmail}
                </a>
                <br />
                Service areas: {COMPANY.operatingLocations}
              </p>
            </aside>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
