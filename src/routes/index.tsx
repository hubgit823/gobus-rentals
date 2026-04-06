import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HomeGallerySection } from "@/components/HomeGallerySection";
import { FleetSection } from "@/components/FleetSection";
import { HowItWorks } from "@/components/HowItWorks";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { COMPANY } from "@/lib/company";
import { buildPageMeta } from "@/lib/seo/buildMeta";
import { faqPageSchema } from "@/lib/seo/schemas";

const homeFaqs = [
  {
    question: "How does LuxuryBusRental.in work?",
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
      title: "LuxuryBusRental.in — Bus Rental India | Compare Luxury Bus Hire Quotes",
      description: `${COMPANY.about} Book bus rental in India: AC, Volvo, sleeper. GST-transparent checkout on ${COMPANY.platformBrand}.`,
      path: "/",
      keywords:
        "bus rental India, bus hire India, luxury bus rental, Volvo bus booking, wedding bus rental, corporate bus hire, LuxuryBusRental.in",
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
        <HowItWorks />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
