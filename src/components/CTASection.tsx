import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/company";

export function CTASection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/home/bus-travel.jpg"
          alt=""
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-hero-gradient-start/95 via-foreground/88 to-hero-gradient-end/95" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 drop-shadow-sm">
          Ready to book your bus?
        </h2>
        <p className="text-primary-foreground/85 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
          Get quotes from verified operators across {COMPANY.operatingLocations.split(",")[0]} and beyond — clear GST at checkout.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/book">
            <Button variant="hero" size="xl" className="gap-2 bg-card text-primary hover:bg-card/90">
              Get free quotes <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <a href={`tel:+91${COMPANY.contactPhone}`}>
            <Button variant="hero-outline" size="xl" className="gap-2">
              <Phone className="w-5 h-5" /> Call {COMPANY.contactPhoneDisplay}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
