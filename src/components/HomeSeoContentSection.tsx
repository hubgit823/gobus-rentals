import { Link } from "@tanstack/react-router";
import { homeSeoArticleSections } from "@/data/home-seo-longform";
import { busCapacities12to66, BUS_SEAT_MIN, BUS_SEAT_MAX } from "@/data/bus-capacities";
import { COMPANY } from "@/lib/company";
import { Button } from "@/components/ui/button";

const tocBands = [
  { label: "12–21", from: 12, to: 21 },
  { label: "22–31", from: 22, to: 31 },
  { label: "32–41", from: 32, to: 41 },
  { label: "42–51", from: 42, to: 51 },
  { label: "52–61", from: 52, to: 61 },
  { label: "62–66", from: 62, to: 66 },
];

export function HomeSeoContentSection() {
  return (
    <section id="bus-rental-guide" className="border-t border-border bg-muted/20 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center sm:text-left">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Tempo Traveller &amp; Bus Rental Guide</span>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Bus Rental in India: Complete Guide — Tempo Traveller to {BUS_SEAT_MAX} Seater Luxury Coach
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-muted-foreground sm:mx-0">
            Compare tempo traveller on rent, mini bus on rent, Volvo bus hire, AC luxury bus booking, and sleeper coaches for weddings, corporate travel, group tours &amp; outstation trips across {COMPANY.operatingLocations}. Jump to a capacity band below.
          </p>
        </header>

        <nav
          aria-label="Bus capacity table of contents"
          className="mb-10 flex flex-wrap justify-center gap-2 sm:justify-start"
        >
          {tocBands.map((b) => (
            <a
              key={b.label}
              href={`#seater-${b.from}`}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              {b.label} seater
            </a>
          ))}
        </nav>

        <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-display prose-a:text-primary">
          {homeSeoArticleSections.map((sec) => (
            <section key={sec.id} className="mb-12 border-b border-border/80 pb-12 last:mb-0 last:border-0 last:pb-0">
              <h3 className="text-foreground">{sec.title}</h3>
              {sec.paragraphs.map((p, i) => (
                <p key={`${sec.id}-${i}`}>{p}</p>
              ))}
            </section>
          ))}
        </article>

        <div className="mt-16 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <h3 className="font-display text-2xl font-bold text-foreground">
            All Tempo Traveller &amp; Bus Rental Options: {BUS_SEAT_MIN} Seater to {BUS_SEAT_MAX} Seater
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            From cheap tempo traveller on rent to premium luxury bus hire — each listing explains use cases, comfort expectations, and bus rental price per km. Availability depends on operator fleet in your route. Serving all major cities in India.
          </p>

          <ul className="mt-10 divide-y divide-border">
            {busCapacities12to66.map((row) => (
              <li
                key={row.seats}
                id={`seater-${row.seats}`}
                className="scroll-mt-28 py-8 first:pt-0 first:md:scroll-mt-32"
              >
                <h4 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                  {row.title} rental in India
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{row.description}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-start gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Ready to get the best bus rental quote? Book tempo traveller on rent or luxury bus hire instantly.
            </p>
            <Button asChild size="lg">
              <Link to="/book">Book Tempo Traveller &amp; Get Free Bus Quotes</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
