import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { INDIAN_CITIES } from "@/data/indian-cities";
import { FEATURED_VEHICLE_RENTAL_CITIES } from "@/data/featured-vehicle-rental-cities";
import { listServiceCitySlugs } from "@/data/service-city-pages";
import { COMPANY } from "@/lib/company";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { CityVehicleRentalsStrip } from "@/components/seo/CityVehicleRentalsStrip";

const HIGHLIGHT = [
  "delhi",
  "mumbai",
  "bangalore",
  "hyderabad",
  "chennai",
  "kolkata",
  "pune",
  "ahmedabad",
  "jaipur",
  "lucknow",
  "kanpur",
  "nagpur",
  "indore",
  "thane",
  "bhopal",
  "visakhapatnam",
  "patna",
  "vadodara",
  "ghaziabad",
  "ludhiana",
  "agra",
  "nashik",
  "faridabad",
  "meerut",
  "rajkot",
  "varanasi",
  "srinagar",
  "amritsar",
  "chandigarh",
  "ranchi",
];

export const Route = createFileRoute("/bus-rental")({
  component: BusRentalHubPage,
  head: () => {
    const { meta, links } = buildPageMeta({
      title: "Bus Rental in India — Cities & Popular Hubs",
      description: `Find bus hire and luxury coach rental by city across India. Internal index for ${COMPANY.platformBrand} programmatic SEO pages — ${COMPANY.legalName}.`,
      path: "/bus-rental",
      keywords:
        "bus rental India cities, bus hire by city, luxury bus rental locations, intercity bus charter India, group travel hubs",
    });
    return { meta, links };
  },
});

function BusRentalHubPage() {
  const featuredSlugSet = new Set(FEATURED_VEHICLE_RENTAL_CITIES.map((c) => c.slug));
  const moreHubs = (HIGHLIGHT.map((slug) => INDIAN_CITIES.find((c) => c.slug === slug)).filter(Boolean) as typeof INDIAN_CITIES).filter(
    (c) => !featuredSlugSet.has(c.slug),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Bus rental" }]} />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Bus rental — cities &amp; hubs across India
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Jump to <strong className="text-foreground">bus rental in your city</strong> landing pages across India.
            {` ${COMPANY.platformBrand}`} hosts 400+ city pages for <strong>bus hire</strong> and{" "}
            <strong>luxury bus rental</strong> search intent.
          </p>
          {listServiceCitySlugs().length > 0 ? (
            <p className="mb-8 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Premium service-city guides</span> (1,500+ words, branded title,
              hero image):{" "}
              {listServiceCitySlugs().map((slug, i) => (
                <span key={slug}>
                  {i > 0 ? " · " : null}
                  <Link to="/service-city/$citySlug" params={{ citySlug: slug }} className="text-primary hover:underline">
                    /service-city/{slug}
                  </Link>
                </span>
              ))}
            </p>
          ) : null}

          <div className="mb-10">
            <Link to="/book">
              <Button size="lg" className="font-semibold">
                Get best bus quotes now
              </Button>
            </Link>
          </div>

          <h2 className="font-display text-xl font-semibold mb-2">Popular city vehicle rentals</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
            Same hub links as the site footer — jump to a city landing page, then scroll for the full A–Z list.
          </p>
          <div className="max-w-md mb-12">
            <CityVehicleRentalsStrip variant="page" />
          </div>

          <h2 className="font-display text-xl font-semibold mb-4">More popular hubs</h2>
          <div className="flex flex-wrap gap-2 mb-12">
            {moreHubs.map((c) => (
              <Link
                key={c.slug}
                to="/$seoSlug"
                params={{ seoSlug: `bus-rental-in-${c.slug}` }}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-primary hover:bg-muted transition-colors"
              >
                {c.name} — vehicle rentals
              </Link>
            ))}
          </div>

          <h2 className="font-display text-xl font-semibold mb-4">All cities A–Z</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Complete list for crawlers and users ({INDIAN_CITIES.length} locations):
          </p>
          <ul className="columns-2 sm:columns-3 md:columns-4 gap-x-4 text-sm">
            {INDIAN_CITIES.map((c) => (
              <li key={c.slug} className="break-inside-avoid mb-1">
                <Link to="/$seoSlug" params={{ seoSlug: `bus-rental-in-${c.slug}` }} className="text-primary hover:underline">
                  {c.name}
                </Link>
                <span className="text-muted-foreground"> · {c.state}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-muted-foreground mt-12">
            Content hubs:{" "}
            <Link to="/blog" className="text-primary hover:underline">
              Blog
            </Link>
            {" · "}
            <Link to="/guides" className="text-primary hover:underline">
              Guides
            </Link>
            {" · "}
            <Link to="/bus-types" className="text-primary hover:underline">
              Bus types
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
