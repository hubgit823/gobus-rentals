import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { INDIAN_CITIES } from "../src/data/indian-cities.ts";
import { BLOG_POSTS } from "../src/data/blog-posts.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const SITE = (process.env.VITE_SITE_URL || "https://luxurybusrental.in").replace(/\/$/, "");

const staticPaths: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/book", changefreq: "weekly", priority: "0.95" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.85" },
  { path: "/guides", changefreq: "monthly", priority: "0.75" },
  { path: "/bus-types", changefreq: "monthly", priority: "0.75" },
  { path: "/routes", changefreq: "weekly", priority: "0.75" },
  { path: "/policies/refund-cancellation", changefreq: "yearly", priority: "0.5" },
];

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

let body = "";
for (const x of staticPaths) {
  body += `  <url>\n    <loc>${esc(SITE + x.path)}</loc>\n    <changefreq>${x.changefreq}</changefreq>\n    <priority>${x.priority}</priority>\n  </url>\n`;
}
for (const c of INDIAN_CITIES) {
  body += `  <url>\n    <loc>${esc(`${SITE}/bus-rental/${c.slug}`)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
}
for (const b of BLOG_POSTS) {
  body += `  <url>\n    <loc>${esc(`${SITE}/blog/${b.slug}`)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml, "utf8");
console.log(`[sitemap] ${SITE} — ${staticPaths.length} static + ${INDIAN_CITIES.length} cities + ${BLOG_POSTS.length} blog → public/sitemap.xml`);
