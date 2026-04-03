import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-hero-gradient-start to-hero-gradient-end">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5">
          Ready to Book Your Bus?
        </h2>
        <p className="text-primary-foreground/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
          Get instant quotes from verified operators. No hidden charges, best prices, 24/7 support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/book">
            <Button variant="hero" size="xl" className="gap-2 bg-card text-primary hover:bg-card/90">
              Get Free Quotes <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <a href="tel:+919999999999">
            <Button variant="hero-outline" size="xl" className="gap-2">
              <Phone className="w-5 h-5" /> Call +91 99999 99999
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
