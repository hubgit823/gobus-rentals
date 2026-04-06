import { COMPANY } from "@/lib/company";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site";
import type { CityRecord } from "@/data/indian-cities";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    alternateName: SITE_NAME,
    url: SITE_URL,
    description: COMPANY.about,
    email: COMPANY.contactEmail,
    telephone: `+91-${COMPANY.contactPhone}`,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@type": "Organization", name: COMPANY.legalName },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/book?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchemaForCity(city: CityRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${COMPANY.legalName} — Bus rental in ${city.name}`,
    description: `Luxury and AC bus hire in ${city.name}, ${city.state}. Volvo, Mercedes-Benz, sleeper and seater buses via ${SITE_NAME}.`,
    url: absoluteUrl(`/bus-rental/${city.slug}`),
    telephone: `+91-${COMPANY.contactPhone}`,
    email: COMPANY.contactEmail,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "State", name: city.state },
    },
    priceRange: "$$",
  };
}

export function productBusMarketplaceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Luxury bus rental marketplace (India)",
    description: "Compare quotes for Volvo, Mercedes-Benz, AC seater and sleeper buses for weddings, corporate travel, and tours.",
    brand: { "@type": "Brand", name: COMPANY.legalName },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: { "@type": "Organization", name: COMPANY.legalName },
    publisher: {
      "@type": "Organization",
      name: COMPANY.legalName,
      url: SITE_URL,
    },
    url: absoluteUrl(input.path),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(input.path),
    },
  };
}
