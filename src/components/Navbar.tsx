import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, LogIn } from "lucide-react";
import { COMPANY } from "@/lib/company";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt={COMPANY.platformBrand}
            className="h-12 w-auto object-contain object-left"
            width={884}
            height={458}
            decoding="async"
          />
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
          <Link to="/" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Home</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link to="/routes" className="hover:text-primary transition-colors">Cities</Link>
          <Link to="/bus-types" className="hover:text-primary transition-colors">Bus types</Link>
          <Link to="/guides" className="hover:text-primary transition-colors">Guides</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <a href="#fleet" className="hover:text-primary transition-colors">Fleet</a>
          <Link to="/book" className="hover:text-primary transition-colors">Book</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href={`tel:+91${COMPANY.contactPhone}`} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            {COMPANY.contactPhoneDisplay}
          </a>
          <Link to="/login">
            <Button variant="outline" size="lg" className="gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          </Link>
          <Link to="/book">
            <Button size="lg">Get Quotes</Button>
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3 animate-in slide-in-from-top-2">
          <Link to="/" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/about" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>About</Link>
          <Link to="/blog" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link to="/routes" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Cities</Link>
          <Link to="/bus-types" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Bus types</Link>
          <Link to="/guides" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Guides</Link>
          <Link to="/contact" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Contact</Link>
          <a href="#fleet" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Fleet</a>
          <Link to="/login" onClick={() => setMobileOpen(false)}>
            <Button variant="outline" className="w-full gap-2" size="lg">
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          </Link>
          <Link to="/book" onClick={() => setMobileOpen(false)}>
            <Button className="w-full" size="lg">Get Quotes</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
