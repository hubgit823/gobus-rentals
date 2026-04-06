import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getBlogPost } from "@/data/blog-posts";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { articleSchema, faqPageSchema } from "@/lib/seo/schemas";
import { COMPANY } from "@/lib/company";

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

function BoldInline({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  const out: ReactNode[] = [];
  parts.forEach((part, i) => {
    if (i % 2 === 1) out.push(<strong key={i} className="text-foreground">{part}</strong>);
    else if (part) out.push(part);
  });
  return <>{out}</>;
}

function BlogArticle() {
  const { slug } = Route.useParams();
  const post = getBlogPost(slug)!;

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
