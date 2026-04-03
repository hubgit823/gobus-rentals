import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.jpeg" alt="LuxuryBusRental" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground">
          <Link to="/" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Home</Link>
          <a href="#fleet" className="hover:text-primary transition-colors">Our Fleet</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
          <a href="#testimonials" className="hover:text-primary transition-colors">Reviews</a>
          <Link to="/book" className="hover:text-primary transition-colors">Book Now</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+919999999999" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            +91 99999 99999
          </a>
          <Button size="lg">Get Quotes</Button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3 animate-in slide-in-from-top-2">
          <Link to="/" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Home</Link>
          <a href="#fleet" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Our Fleet</a>
          <a href="#how-it-works" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#testimonials" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Reviews</a>
          <Link to="/book" onClick={() => setMobileOpen(false)}>
            <Button className="w-full" size="lg">Get Quotes</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
