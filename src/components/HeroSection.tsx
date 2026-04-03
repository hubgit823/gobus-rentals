import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Bus, ArrowRight } from "lucide-react";
import heroBus from "@/assets/hero-bus.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBus}
          alt="Luxury bus on highway"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
        <div className="max-w-2xl">
          <span className="inline-block bg-primary/20 text-primary-foreground border border-primary-foreground/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm">
            🚌 India's #1 Bus Rental Marketplace
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
            Book Premium Buses
            <span className="block text-accent">At Best Prices</span>
          </h1>

          <p className="text-primary-foreground/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-xl">
            Compare quotes from 500+ verified bus operators. Wedding, corporate, tours — get the best deal in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/book">
              <Button variant="hero" size="xl" className="gap-2 bg-primary">
                Get Free Quotes <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+919999999999">
              <Button variant="hero-outline" size="xl">
                Call Now: +91 99999 99999
              </Button>
            </a>
          </div>

          {/* Quick search strip */}
          <div className="mt-12 bg-card/95 backdrop-blur rounded-2xl p-4 sm:p-5 shadow-xl border border-border">
            <form className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> From
                </label>
                <input
                  type="text"
                  placeholder="Pickup City"
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> To
                </label>
                <input
                  type="text"
                  placeholder="Drop City"
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Date
                </label>
                <input
                  type="date"
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Link to="/book" className="w-full">
                <Button size="lg" className="w-full gap-2">
                  <Bus className="w-4 h-4" /> Search Buses
                </Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
