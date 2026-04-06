import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Bus, ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/company";
import heroBus from "@/assets/hero-bus.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[min(92vh,56rem)] flex flex-col justify-start overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBus}
          alt="Luxury bus on highway"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-14 sm:pb-16 w-full">
        <div className="max-w-5xl">
          <span className="inline-block bg-primary/20 text-primary-foreground border border-primary-foreground/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4 sm:mb-5 backdrop-blur-sm">
            {COMPANY.legalName}
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-[1.15] mb-3 sm:mb-4">
            Luxury buses across North India
            <span className="block text-accent mt-1">Volvo · Mercedes · Sleeper</span>
          </h1>

          <p className="text-primary-foreground/85 text-sm sm:text-base font-medium mb-4 max-w-xl">
            Enter your route and date — compare verified operators in one place.
          </p>

          {/* Quick search strip — primary action, placed high in the hero */}
          <div className="bg-card shadow-2xl rounded-2xl p-4 sm:p-5 border border-border ring-1 ring-primary/15">
            <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> From
                </label>
                <input
                  type="text"
                  placeholder="Pickup City"
                  className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> To
                </label>
                <input
                  type="text"
                  placeholder="Drop City"
                  className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Date
                </label>
                <input
                  type="date"
                  className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <Link to="/book" className="w-full sm:col-span-2 lg:col-span-1">
                <Button size="lg" className="w-full h-11 gap-2 rounded-xl text-base font-semibold shadow-md">
                  <Bus className="w-4 h-4" /> Search Buses
                </Button>
              </Link>
            </form>
          </div>

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
