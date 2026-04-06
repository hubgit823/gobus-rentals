import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/site";

export type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
};

/**
 * TanStack Router head() meta + links (canonical, OG, Twitter).
 */
export function buildPageMeta(input: PageMetaInput) {
  const url = absoluteUrl(input.path);
  const ogImage = input.ogImage || DEFAULT_OG_IMAGE;
  const titleFull = input.title.includes(SITE_NAME) ? input.title : `${input.title} | ${SITE_NAME}`;

  const meta: Array<Record<string, string> | { title: string }> = [
    { title: titleFull },
    { name: "description", content: input.description },
    ...(input.keywords ? [{ name: "keywords", content: input.keywords }] : []),
    ...(input.noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    { property: "og:title", content: titleFull },
    { property: "og:description", content: input.description },
    { property: "og:url", content: url },
    { property: "og:type", content: input.ogType || "website" },
    { property: "og:image", content: ogImage },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: titleFull },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: ogImage },
  ];

  const links = [{ rel: "canonical", href: url }];

  return { meta, links };
}
