import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src="/images/logo.jpeg" alt="LuxuryBusRental" className="h-12 w-auto mb-4 rounded bg-card p-1" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              India's premier bus rental marketplace connecting you with verified bus operators for weddings, corporate events, tours & more.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link to="/book" className="hover:text-primary-foreground transition-colors">Book a Bus</Link></li>
              <li><a href="#fleet" className="hover:text-primary-foreground transition-colors">Our Fleet</a></li>
              <li><a href="#how-it-works" className="hover:text-primary-foreground transition-colors">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Bus Types</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>12 Seater Mini Bus</li>
              <li>26 Seater AC Bus</li>
              <li>40 Seater Luxury Bus</li>
              <li>49/52 Seater Coach</li>
              <li>Sleeper Bus</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /><span>+91 99999 99999</span></li>
              <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" /><span>info@luxurybusrental.com</span></li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>Mumbai, Maharashtra, India</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>&copy; 2025 LuxuryBusRental. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
