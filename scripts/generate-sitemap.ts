import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { INDIAN_CITIES } from "../src/data/indian-cities.ts";
import { BLOG_POSTS } from "../src/data/blog-posts.ts";
import { listServiceCitySlugs } from "../src/data/service-city-pages.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const SITE = (process.env.VITE_SITE_URL || "https://luxurybusrental.in").replace(/\/$/, "");

/** Build date helps crawlers notice deploys (refresh lastmod on meaningful releases). */
const LASTMOD = new Date().toISOString().slice(0, 10);

const staticPaths: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/book", changefreq: "weekly", priority: "0.95" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.85" },
  { path: "/guides", changefreq: "monthly", priority: "0.75" },
  { path: "/bus-types", changefreq: "monthly", priority: "0.75" },
  { path: "/bus-rental", changefreq: "weekly", priority: "0.75" },
  { path: "/policies/refund-cancellation", changefreq: "yearly", priority: "0.5" },
];

function esc(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

let body = "";
for (const x of staticPaths) {
  body += `  <url>\n    <loc>${esc(SITE + x.path)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>${x.changefreq}</changefreq>\n    <priority>${x.priority}</priority>\n  </url>\n`;
}
for (const c of INDIAN_CITIES) {
  const cityPath = `${SITE}/bus-rental-in-${c.slug}`;
  body += `  <url>\n    <loc>${esc(cityPath)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
}
for (const slug of listServiceCitySlugs()) {
  const p = `${SITE}/service-city/${slug}`;
  body += `  <url>\n    <loc>${esc(p)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
}
for (const b of BLOG_POSTS) {
  const blogPath = `${SITE}/blog/${b.slug}`;
  body += `  <url>\n    <loc>${esc(blogPath)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml, "utf8");
const svc = listServiceCitySlugs().length;
console.log(
  `[sitemap] ${SITE} — ${staticPaths.length} static + ${INDIAN_CITIES.length} cities + ${svc} service-city + ${BLOG_POSTS.length} blog → public/sitemap.xml`,
);
