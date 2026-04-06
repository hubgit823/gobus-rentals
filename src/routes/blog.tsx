import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BLOG_POSTS } from "@/data/blog-posts";
import { INDIAN_CITIES } from "@/data/indian-cities";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { COMPANY } from "@/lib/company";

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
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Bus rental guides &amp; India travel tips
          </h1>
          <p className="text-muted-foreground mb-10">
            SEO-focused articles on <strong>bus rental in India</strong>, pricing, weddings, and vehicle choice — updated for
            2026. Operated by {COMPANY.legalName} via {COMPANY.platformBrand}.
          </p>

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
