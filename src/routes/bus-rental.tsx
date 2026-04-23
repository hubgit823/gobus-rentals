import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { INDIAN_CITIES } from "@/data/indian-cities";
import { COMPANY } from "@/lib/company";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { BUS_TYPE_ROUTES } from "@/data/city-bus-type-routes";
import { Search, MapPin, Bus, ArrowRight, Star } from "lucide-react";

/** Featured cities shown as large cards at the top */
const FEATURED_CITIES = [
  { slug: "delhi", name: "Delhi", state: "Delhi", emoji: "🏛️" },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", emoji: "🌊" },
  { slug: "bangalore", name: "Bengaluru", state: "Karnataka", emoji: "💻" },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", emoji: "🕌" },
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", emoji: "🏰" },
  { slug: "pune", name: "Pune", state: "Maharashtra", emoji: "🎓" },
  { slug: "chandigarh", name: "Chandigarh", state: "Punjab", emoji: "🌿" },
  { slug: "amritsar", name: "Amritsar", state: "Punjab", emoji: "⛪" },
  { slug: "agra", name: "Agra", state: "Uttar Pradesh", emoji: "🕌" },
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", emoji: "🎭" },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", emoji: "🎨" },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", emoji: "🌴" },
];

export const Route = createFileRoute("/bus-rental")({
  component: BusRentalHubPage,
  head: () => {
    const { meta, links } = buildPageMeta({
      title: "Bus Rental in India — Choose Your City",
      description: `Find bus hire by city across India. Compare Volvo, mini bus, luxury coach and more. Verified operators, GST-transparent pricing. ${COMPANY.legalName}.`,
      path: "/bus-rental",
      keywords:
        "bus rental India cities, bus hire by city, luxury bus rental locations, intercity bus charter India, group travel hubs",
    });
    return { meta, links };
  },
});

function BusRentalHubPage() {
  const [search, setSearch] = useState("");

  const filteredCities = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return INDIAN_CITIES;
    return INDIAN_CITIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q),
    );
  }, [search]);

  const showFeatured = search.trim() === "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        {/* ── Hero header ─────────────────────────────────────────────── */}
        <div className="bg-primary/5 border-b border-border py-10 sm:py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Bus rental" }]} />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Bus Rental — Choose Your City
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-6 text-base sm:text-lg">
              Select a city to see all available bus types and get instant quotes.
              Volvo, mini bus, luxury coach, tempo traveller and more — verified operators,
              GST-transparent pricing.
            </p>
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search city or state..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* ── Bus types strip ──────────────────────────────────────── */}
          {showFeatured && (
            <section className="mb-12">
              <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                Popular bus types
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Pick a city first, then choose any of these bus types.
              </p>
              <div className="flex flex-wrap gap-2">
                {BUS_TYPE_ROUTES.map((bt) => (
                  <span
                    key={bt.slug}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground"
                  >
                    <span>{bt.emoji}</span>
                    {bt.label}
                    <span className="text-muted-foreground text-xs">· {bt.seats}</span>
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* ── Featured city cards ──────────────────────────────────── */}
          {showFeatured && (
            <section className="mb-12">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Popular cities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {FEATURED_CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    to="/$seoSlug"
                    params={{ seoSlug: city.slug }}
                    className="group rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all p-4 flex flex-col gap-2"
                  >
                    <span className="text-3xl">{city.emoji}</span>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {city.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{city.state}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-primary mt-auto">
                      <Bus className="w-3 h-3" />
                      <span>See bus types</span>
                      <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Search results / All cities A–Z ─────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {search.trim()
                  ? `Results for "${search.trim()}" (${filteredCities.length})`
                  : `All cities — A to Z (${INDIAN_CITIES.length} locations)`}
              </h2>
              {search.trim() && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-xs text-primary hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {filteredCities.length === 0 ? (
              <div className="rounded-xl border border-border bg-muted/30 p-8 text-center">
                <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-foreground font-medium">No cities found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try a different city or state name.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filteredCities.map((c) => (
                  <Link
                    key={c.slug}
                    to="/$seoSlug"
                    params={{ seoSlug: c.slug }}
                    className="group flex items-center gap-2 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all px-3 py-2.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-foreground truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{c.state}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* ── Bottom CTA ───────────────────────────────────────────── */}
          <div className="mt-14 rounded-2xl bg-primary/5 border border-primary/20 p-6 sm:p-8 text-center">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
              Not sure which city or bus type?
            </h3>
            <p className="text-muted-foreground mb-5 max-w-lg mx-auto">
              Tell us your pickup, destination, date and group size — we'll match you with
              the right operators across India.
            </p>
            <Link to="/book">
              <Button size="lg" className="font-semibold gap-2">
                <Bus className="w-4 h-4" />
                Get free quotes now
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-8 text-center">
            Content hubs:{" "}
            <Link to="/blog" className="text-primary hover:underline">Blog</Link>
            {" · "}
            <Link to="/bus-rental-guides" className="text-primary hover:underline">Guides</Link>
            {" · "}
            <Link to="/bus-types-for-hire" className="text-primary hover:underline">Bus types</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
