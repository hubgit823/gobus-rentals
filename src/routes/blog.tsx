import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BLOG_POSTS } from "@/data/blog-posts";
import { INDIAN_CITIES } from "@/data/indian-cities";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { COMPANY } from "@/lib/company";
import { fleetImages } from "@/lib/media";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock3, BookOpenCheck } from "lucide-react";

export const Route = createFileRoute("/blog")({
  component: BlogIndex,
  head: () => {
    const { meta, links } = buildPageMeta({
      title: `Bus Rental Blog India | ${COMPANY.platformBrand}`,
      description: `Guides on bus rental price, wedding bus booking, Volvo vs sleeper, corporate bus hire, and group travel in India — ${COMPANY.legalName}.`,
      path: "/blog",
      keywords:
        "bus rental blog India, bus hire guide, wedding bus rental tips, luxury bus rental, corporate bus hire guide, tempo traveller vs bus",
    });
    return { meta, links };
  },
});

function BlogIndex() {
  const citySample = INDIAN_CITIES.filter((c) =>
    ["delhi", "mumbai", "bangalore", "hyderabad", "chennai", "kolkata", "pune", "jaipur", "lucknow", "chandigarh"].includes(c.slug),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Blog" }]} />
          <section className="grid lg:grid-cols-2 gap-6 items-stretch mb-10">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
              <Badge variant="secondary" className="mb-3">Updated 2026</Badge>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Bus rental guides &amp; India travel tips
              </h1>
              <p className="text-muted-foreground">
                Practical long-form content on <strong>bus rental in India</strong>, pricing, wedding transport, and fleet
                decisions — curated by {COMPANY.legalName} on {COMPANY.platformBrand}.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="rounded-lg border border-border p-3 bg-muted/30">
                  <BookOpenCheck className="w-4 h-4 text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Guides</p>
                  <p className="font-semibold text-sm text-foreground">{BLOG_POSTS.length}</p>
                </div>
                <div className="rounded-lg border border-border p-3 bg-muted/30">
                  <CalendarDays className="w-4 h-4 text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Year</p>
                  <p className="font-semibold text-sm text-foreground">2026</p>
                </div>
                <div className="rounded-lg border border-border p-3 bg-muted/30">
                  <Clock3 className="w-4 h-4 text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Avg read</p>
                  <p className="font-semibold text-sm text-foreground">10-12 min</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border overflow-hidden bg-card">
              <img
                src={fleetImages.coachGoldenHour}
                alt="Luxury coach for India travel guides"
                className="w-full h-full min-h-[250px] object-cover"
                width={1200}
                height={800}
              />
            </div>
          </section>

          <ul className="space-y-6">
            {BLOG_POSTS.map((p) => (
              <li key={p.slug} className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="group">
                  <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h2>
                </Link>
                <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
                <div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground">
                  <span>{p.datePublished}</span>
                  <span>·</span>
                  <span>{p.readTime} read</span>
                </div>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
                >
                  Read guide →
                </Link>
              </li>
            ))}
          </ul>

          <section className="mt-14 rounded-2xl border border-border bg-card p-5 sm:p-7">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-4">What you will find in our blog</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h3 className="font-semibold text-foreground mb-1">Pricing explainers</h3>
                <p className="text-sm text-muted-foreground">
                  City-wise breakdowns, GST clarity, and inclusions checklist so you compare quotes fairly.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h3 className="font-semibold text-foreground mb-1">Wedding &amp; corporate playbooks</h3>
                <p className="text-sm text-muted-foreground">
                  Guest movement planning, pickup sequencing, and vendor coordination templates.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h3 className="font-semibold text-foreground mb-1">Vehicle comparisons</h3>
                <p className="text-sm text-muted-foreground">
                  Tempo traveller vs coach, Volvo vs sleeper, and when each works better.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h3 className="font-semibold text-foreground mb-1">Route strategy</h3>
                <p className="text-sm text-muted-foreground">
                  City clusters, peak season advice, and practical operational planning for long trips.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">City bus rental hubs</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Explore programmatic <strong>bus hire</strong> pages for major cities:
            </p>
            <div className="flex flex-wrap gap-2">
              {citySample.map((c) => (
                <Link
                  key={c.slug}
                  to="/bus-rental/$citySlug"
                  params={{ citySlug: c.slug }}
                  className="rounded-full border border-border px-3 py-1 text-sm text-primary hover:bg-muted"
                >
                  Bus rental {c.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
