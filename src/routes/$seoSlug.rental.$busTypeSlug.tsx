/**
 * Route: /:citySlug/rental/:busTypeSlug
 * e.g. /delhi/rental/volvo-bus, /chandigarh/rental/mini-bus
 *
 * Renders a city-specific rental product page.
 */
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COMPANY } from "@/lib/company";
import { getCityBySlug, getRelatedCities } from "@/data/indian-cities";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { getBusTypeRoute, BUS_TYPE_ROUTES } from "@/data/city-bus-type-routes";
import { VEHICLE_CATALOG } from "@/lib/vehicle-catalog";
import { CheckCircle2, MapPin, Phone, MessageCircle, Bus, Star, ArrowRight, Users } from "lucide-react";

export const Route = createFileRoute("/$seoSlug/rental/$busTypeSlug")({
  beforeLoad: ({ params }) => {
    const city = getCityBySlug(params.seoSlug);
    if (!city) throw notFound();
    const bt = getBusTypeRoute(params.busTypeSlug);
    if (!bt) throw notFound();
  },
  head: ({ params }) => {
    const city = getCityBySlug(params.seoSlug);
    const bt = getBusTypeRoute(params.busTypeSlug);
    if (!city || !bt) return {};
    const { meta, links } = buildPageMeta({
      title: `${bt.label} Rental in ${city.name} | Best Price — ${COMPANY.legalName}`,
      description: `Book ${bt.label.toLowerCase()} rental in ${city.name} with ${COMPANY.legalName}. ${bt.tagline} Compare quotes from verified operators with GST-transparent pricing.`,
      path: `/${city.slug}/rental/${bt.slug}`,
      keywords: `${bt.label.toLowerCase()} rental ${city.name}, ${bt.label.toLowerCase()} hire ${city.name}, ${bt.bookingType} ${city.name}, bus rental ${city.name}`,
    });
    return { meta, links };
  },
  component: CityBusTypePage,
});

function CityBusTypePage() {
  const { seoSlug: citySlug, busTypeSlug } = Route.useParams();
  const city = getCityBySlug(citySlug)!;
  const bt = getBusTypeRoute(busTypeSlug)!;
  const related = getRelatedCities(city, 6);
  const otherBusTypes = BUS_TYPE_ROUTES.filter((r) => r.slug !== bt.slug).slice(0, 6);

  const faqs = [
    {
      q: `How do I book a ${bt.label} in ${city.name}?`,
      a: `Submit your trip details on ${COMPANY.platformBrand} — pickup, drop, date, and passenger count. Select "${bt.bookingType}" as your bus type. Verified operators in ${city.name} will send you itemised quotes to compare.`,
    },
    {
      q: `What is the price of ${bt.label} rental in ${city.name}?`,
      a: `Prices depend on route, duration, and operator. On ${COMPANY.platformBrand} you receive multiple quotes so you can compare all-in costs (including ${COMPANY.gstPercentage}% GST) before confirming.`,
    },
    {
      q: `Is AC available in ${bt.label} rental in ${city.name}?`,
      a: `Yes, most ${bt.label} options in ${city.name} available on ${COMPANY.platformBrand} are fully air-conditioned. Specify your AC requirement when submitting trip details.`,
    },
    {
      q: `Can I book a ${bt.label} for outstation travel from ${city.name}?`,
      a: `Absolutely. Operators cover both local ${city.name} contracts and interstate outstation routes. Provide your complete itinerary so operators can include tolls, state permits, and driver allowance in the estimate.`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-24 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Bus rental", to: "/bus-rental" },
              { label: city.name, to: `/${city.slug}` },
              { label: bt.label },
            ]}
          />

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-4xl">{bt.emoji}</span>
              <Badge variant="secondary">{city.state}</Badge>
              <Badge variant="outline">{bt.seats}</Badge>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {bt.label} Rental in {city.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Book <strong className="text-foreground">{bt.label.toLowerCase()} rental in {city.name}</strong> with{" "}
              {COMPANY.legalName}. {bt.tagline} Compare quotes from verified operators with transparent GST pricing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link to="/book">
              <Button size="lg" className="font-semibold gap-2">
                <Bus className="w-4 h-4" />
                Get free {bt.label} quotes
              </Button>
            </Link>
            <a href={`tel:+91${COMPANY.contactPhone}`}>
              <Button size="lg" variant="outline" className="gap-2">
                <Phone className="w-4 h-4" />
                {COMPANY.contactPhoneDisplay}
              </Button>
            </a>
            <a href={`https://wa.me/${COMPANY.whatsappE164}`} target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Key features</h2>
              </div>
              <ul className="space-y-2">
                {bt.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Best use cases</h2>
              </div>
              <ul className="space-y-2">
                {bt.useCases.map((u) => (
                  <li key={u} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {u}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="rounded-xl border border-border bg-card p-5 sm:p-7 mb-10">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              {bt.label} rental in {city.name} — complete guide
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                {bt.label} rental in {city.name} is one of the most sought-after group transport options in {city.state}.
                Whether you are planning a wedding, corporate outing, school excursion, or pilgrimage trip,{" "}
                {bt.label.toLowerCase()}s offer the right combination of capacity, comfort, and cost-effectiveness
                for groups of {bt.seats.split("–")[0].replaceAll(/\D/g, "")}+ passengers.
              </p>
              <p>
                {COMPANY.legalName} connects you with verified {bt.label.toLowerCase()} operators in {city.name} who
                maintain clean, well-serviced fleets. Each operator on {COMPANY.platformBrand} responds to your
                specific trip details — pickup, drop, date, duration, and group size — with itemised quotes that
                include driver allowance, tolls, and {COMPANY.gstPercentage}% GST. This allows you to compare real
                all-in costs before making any payment.
              </p>
            </div>
          </section>

          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Available fleet sizes in {city.name}
          </h2>
          <div className="grid gap-3 mb-10">
            {VEHICLE_CATALOG.slice(0, 8).map((v) => (
              <div key={v.seats} className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-semibold text-foreground text-sm">
                  {v.seats} — {v.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{v.description}</p>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Best for: <span className="text-foreground/80">{v.bestFor}</span>
                </p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            FAQs — {bt.label} rental in {city.name}
          </h2>
          <dl className="space-y-4 mb-10">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-border pb-4">
                <dt className="font-medium text-foreground">{f.q}</dt>
                <dd className="text-sm text-muted-foreground mt-1">{f.a}</dd>
              </div>
            ))}
          </dl>

          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Other bus types in {city.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {otherBusTypes.map((r) => (
              <Link
                key={r.slug}
                to="/$seoSlug/rental/$busTypeSlug"
                params={{ seoSlug: city.slug, busTypeSlug: r.slug }}
                className="group rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all p-3 flex items-center gap-2"
              >
                <span className="text-2xl">{r.emoji}</span>
                <div className="min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.seats}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary ml-auto shrink-0 transition-colors" />
              </Link>
            ))}
          </div>

          {related.length > 0 && (
            <>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                {bt.label} rental — other cities
              </h2>
              <div className="flex flex-wrap gap-2 mb-10">
                {related.map((c) => (
                  <Link
                    key={c.slug}
                    to="/$seoSlug/rental/$busTypeSlug"
                    params={{ seoSlug: c.slug, busTypeSlug: bt.slug }}
                    className="rounded-full border border-border bg-card px-3 py-1 text-sm text-primary hover:bg-muted transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
