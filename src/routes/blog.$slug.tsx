import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getBlogPost } from "@/data/blog-posts";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { articleSchema, faqPageSchema } from "@/lib/seo/schemas";
import { COMPANY } from "@/lib/company";
import { fleetImages, heroBackgroundVideos } from "@/lib/media";

export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    if (!getBlogPost(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const post = getBlogPost(params.slug)!;
    const path = `/blog/${post.slug}`;
    const { meta, links } = buildPageMeta({
      title: post.title,
      description: post.description,
      path,
      keywords: post.keywords,
      ogType: "article",
    });
    return {
      meta: [
        ...meta,
        { "script:ld+json": articleSchema({ title: post.title, description: post.description, path, datePublished: post.datePublished }) },
        { "script:ld+json": faqPageSchema(post.faqs.map((f) => ({ question: f.question, answer: f.answer }))) },
      ],
      links,
    };
  },
  component: BlogArticle,
});

function BoldInline({ text }: Readonly<{ text: string }>) {
  const out: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    const full = match[0];
    const bold = match[1];
    const start = match.index ?? 0;

    if (start > lastIndex) out.push(text.slice(lastIndex, start));
    out.push(
      <strong key={`bold-${start}-${bold}`} className="text-foreground">
        {bold}
      </strong>,
    );
    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) out.push(text.slice(lastIndex));
  return <>{out}</>;
}

const BLOG_MEDIA: Record<string, { image: string; imageAlt: string; video?: string }> = {
  "bus-rental-price-delhi-2026-guide": {
    image: fleetImages.coachDepotLine,
    imageAlt: "Luxury bus lineup for Delhi rental planning guide",
    video: heroBackgroundVideos[0],
  },
  "how-to-book-bus-for-wedding-india": {
    image: fleetImages.coachGoldenHour,
    imageAlt: "Wedding-ready luxury coach at golden hour",
    video: heroBackgroundVideos[1],
  },
  "volvo-bus-vs-sleeper-bus-india": {
    image: fleetImages.coachInteriorSemiSleeper,
    imageAlt: "Luxury bus interior for Volvo versus sleeper comparison",
    video: heroBackgroundVideos[2],
  },
};

function BlogArticle() {
  const { slug } = Route.useParams();
  const post = getBlogPost(slug)!;
  const media = BLOG_MEDIA[slug] ?? {
    image: fleetImages.coachFrontMountain,
    imageAlt: "Premium coach for bus rental blog",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />
          <header className="mb-10">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <p className="text-muted-foreground text-lg">{post.description}</p>
            <p className="text-xs text-muted-foreground mt-3">
              Published {post.datePublished} · {post.readTime} read · {COMPANY.legalName}
            </p>
          </header>

          <section className="mb-10 grid gap-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <img
                src={media.image}
                alt={media.imageAlt}
                className="h-full w-full min-h-[220px] object-contain bg-muted/30"
                width={1200}
                height={800}
                loading="eager"
                decoding="async"
              />
            </div>
            {media.video ? (
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <video
                  className="h-full w-full min-h-[220px] object-cover bg-muted/30"
                  src={media.video}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                />
              </div>
            ) : null}
          </section>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.sections.map((sec) => (
              <section key={sec.h2} className="mb-10">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4 not-prose">{sec.h2}</h2>
                {sec.paragraphs.map((para) => (
                  <p key={para.slice(0, 60)} className="text-muted-foreground leading-relaxed mb-4">
                    <BoldInline text={para} />
                  </p>
                ))}
              </section>
            ))}
          </div>

          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">FAQ</h2>
            <dl className="space-y-4">
              {post.faqs.map((f) => (
                <div key={f.question}>
                  <dt className="font-medium text-foreground">{f.question}</dt>
                  <dd className="text-sm text-muted-foreground mt-1">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/book">
              <span className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Get bus quotes
              </span>
            </Link>
            <Link to="/blog" className="text-sm text-primary hover:underline self-center">
              ← All guides
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
