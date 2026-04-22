import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HomeGallerySection } from "@/components/HomeGallerySection";
import { FleetSection } from "@/components/FleetSection";
import { HomeSeoContentSection } from "@/components/HomeSeoContentSection";
import { HowItWorks } from "@/components/HowItWorks";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { COMPANY } from "@/lib/company";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { faqPageSchema } from "@/lib/seo/schemas";

const homeFaqs = [
  {
    question: "How does Luxury Bus Rental work?",
    answer: `Submit your trip on ${COMPANY.platformBrand}; verified operators send quotes. Compare bus hire options, pay per policy, and travel with ${COMPANY.legalName}'s marketplace standards.`,
  },
  {
    question: "Do you cover all India for bus rental?",
    answer:
      "We publish 400+ city landing pages for bus rental intent. Operators respond based on their service areas; North India is a core strength for Kartar Travels.",
  },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => {
    const { meta, links } = buildPageMeta({
      title: "Tempo Traveller & Bus Rental in India | Affordable Luxury Bus Hire",
      description: "Book tempo traveller and luxury bus rental across India. Best price, verified drivers, GST-transparent quotes. Get free bus hire quote now — instant booking!",
      path: "/",
      keywords:
        "tempo traveller on rent, bus rental in India, luxury bus rental, mini bus on rent, tempo traveller booking, tempo traveller in Delhi, tempo traveller in Patna, bus rental in Mumbai, bus hire in Bangalore, luxury bus rental in India, bus rental for wedding, bus rental for corporate travel, bus rental for outstation trip, tempo traveller for group travel, cheap tempo traveller, best bus rental service, affordable bus hire, book tempo traveller online, bus rental price per km, Volvo bus rental, AC bus booking, 12 seater to 66 seater bus, wedding bus hire, corporate bus charter",
    });
    return {
      meta: [...meta, { "script:ld+json": faqPageSchema(homeFaqs.map((f) => ({ question: f.question, answer: f.answer }))) }],
      links,
    };
  },
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HomeGallerySection />
        <StatsSection />
        <FleetSection />
        <HomeSeoContentSection />
        <HowItWorks />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
