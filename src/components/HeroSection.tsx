import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { fleetImages } from "@/lib/media";
import { BookingForm } from "@/components/BookingForm";

export function HeroSection() {
  return (
    <section className="relative min-h-[min(92vh,56rem)] flex flex-col justify-start overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={fleetImages.coachFrontMountain}
        >
          <source src="/videos/hero-bus.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-14 sm:pb-16 w-full">
        <div className="max-w-5xl">
          <span className="inline-block bg-primary/20 text-primary-foreground border border-primary-foreground/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4 sm:mb-5 backdrop-blur-sm">
            {COMPANY.legalName}
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-[1.15] mb-3 sm:mb-4">
            Luxury buses across North India{" "}
            <span className="block text-accent mt-1">Volvo · Mercedes · Sleeper</span>
          </h1>

          <p className="text-primary-foreground/85 text-sm sm:text-base font-medium mb-4 max-w-xl">
            Enter your route and date — compare verified operators in one place.
          </p>

          <BookingForm compact />

          <p className="text-primary-foreground/75 text-sm sm:text-base mt-6 mb-3 leading-relaxed max-w-2xl">
            {COMPANY.about.slice(0, 140)}…
          </p>
          <p className="text-primary-foreground/65 text-xs sm:text-sm mb-6 flex flex-wrap items-center gap-2 max-w-2xl">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{COMPANY.operatingLocations}</span>
            <span className="text-primary-foreground/45">·</span>
            <span>GST {COMPANY.gstPercentage}% shown at checkout</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/book">
              <Button variant="hero" size="xl" className="gap-2 bg-primary">
                Get Free Quotes <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href={`tel:+91${COMPANY.contactPhone}`}>
              <Button variant="hero-outline" size="xl">
                Call / WhatsApp: {COMPANY.contactPhoneDisplay}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
