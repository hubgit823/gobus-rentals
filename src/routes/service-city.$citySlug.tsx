import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";
import {
  getServiceCityPage,
  listServiceCitySlugs,
  serviceCityImageUrl,
} from "@/data/service-city-pages";
import { fleetImages } from "@/lib/media";
import { absoluteUrl } from "@/lib/site";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { faqPageSchema } from "@/lib/seo/schemas";

const brandShort = "Kartar Travels Pvt Ltd";

export const Route = createFileRoute("/service-city/$citySlug")({
  beforeLoad: ({ params }) => {
    if (!getServiceCityPage(params.citySlug)) throw notFound();
  },
  head: ({ params }) => {
    const page = getServiceCityPage(params.citySlug)!;
    const path = `/service-city/${page.slug}`;
    const ogImagePath = `/images/service-cities/${page.imageFile}`;
    const { meta, links } = buildPageMeta({
      title: page.pageTitle,
      description: page.metaDescription,
      path,
      keywords: page.keywords,
      ogImage: absoluteUrl(ogImagePath),
      ogType: "article",
    });
    const faqs = [
      {
        question: `How do I book luxury bus rental in ${page.cityName}?`,
        answer: `Use the Book flow on ${COMPANY.platformBrand}, or call ${COMPANY.contactPhoneDisplay}. Compare quotes for Volvo, Mercedes-Benz class coaches, and tempo travellers with GST-transparent totals managed by ${COMPANY.legalName}.`,
      },
      {
        question: `Is GST shown for bus hire in ${page.cityName}?`,
        answer: `Yes. Confirmed bookings show rental value and applicable GST (${COMPANY.gstPercentage}% where enabled) before you pay, consistent with ${COMPANY.serviceBillingTagline}.`,
      },
    ];
    return {
      meta: [
        ...meta,
        { "script:ld+json": faqPageSchema(faqs.map((f) => ({ question: f.question, answer: f.answer }))) },
      ],
      links,
    };
  },
  component: ServiceCityPage,
});

function HeroImage({ src, alt }: Readonly<{ src: string; alt: string }>) {
  const [useFallback, setUseFallback] = useState(false);
  return (
    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-border bg-muted md:aspect-[24/9]">
      <img
        src={useFallback ? fleetImages.coachFrontMountain : src}
        alt={alt}
        width={1200}
        height={514}
        className="h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
        onError={() => setUseFallback(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
    </div>
  );
}

function ServiceCityPage() {
  const { citySlug } = Route.useParams();
  const page = getServiceCityPage(citySlug)!;
  const imgUrl = serviceCityImageUrl(page.slug);
  const standardCityUrl = `/bus-rental-in-${page.slug}` as const;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-24 pt-20 md:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Bus rental", to: "/bus-rental" },
              { label: "Service cities" },
              { label: page.cityName },
            ]}
          />

          <article className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              {COMPANY.legalName} · {page.state}
            </p>
            <h1 className="font-display mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">{page.h1}</h1>
            <p className="mb-6 text-lg text-muted-foreground">
              In-depth guide and booking context for{" "}
              <strong className="text-foreground">luxury bus hire in {page.cityName}</strong> — same fleet standards as{" "}
              {brandShort}.
            </p>

            <HeroImage src={imgUrl} alt={page.imageAlt} />
            <p className="mt-2 text-xs text-muted-foreground">
              Image file:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
                public/images/service-cities/{page.imageFile}
              </code>{" "}
              (replace with your photography; falls back if missing).
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book">
                <Button size="lg" className="font-semibold">
                  Get quotes — {page.cityName}
                </Button>
              </Link>
              <Link to="/$seoSlug" params={{ seoSlug: `bus-rental-in-${page.slug}` }}>
                <Button size="lg" variant="outline">
                  City hub page
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Standard SEO URL:{" "}
              <Link to="/$seoSlug" params={{ seoSlug: `bus-rental-in-${page.slug}` }} className="text-primary underline-offset-4 hover:underline">
                {standardCityUrl}
              </Link>{" "}
              — this service-city page adds a long-form guide and branded title for select locations.
            </p>

            <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert prose-headings:font-display prose-a:text-primary">
              {page.sections.map((sec) => (
                <section key={sec.id} className="mb-10">
                  <h2 className="text-2xl font-semibold text-foreground">{sec.heading}</h2>
                  {sec.paragraphs.map((p, i) => (
                    <p key={`${sec.id}-${i}`} className="text-muted-foreground leading-relaxed">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <section className="mt-14 rounded-xl border border-border bg-card p-6">
              <h2 className="font-display mb-2 text-xl font-semibold text-foreground">Other service city guides</h2>
              <p className="mb-3 text-sm text-muted-foreground">
                URLs follow <code className="rounded bg-muted px-1">/service-city/{"{slug}"}</code> with images{" "}
                <code className="rounded bg-muted px-1">luxury-bus-rental-{"{slug}"}.jpg</code>.
              </p>
              <ul className="list-inside list-disc text-sm text-primary">
                {listServiceCitySlugs().map((slug) => (
                  <li key={slug}>
                    <Link to="/service-city/$citySlug" params={{ citySlug: slug }} className="hover:underline">
                      /service-city/{slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
