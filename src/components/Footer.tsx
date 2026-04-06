import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY } from "@/lib/company";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div>
            <img
              src="/images/logo.png"
              alt={COMPANY.platformBrand}
              className="h-16 sm:h-[4.5rem] w-auto mb-4 object-contain object-left"
              width={884}
              height={458}
              decoding="async"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed font-medium">{COMPANY.legalName}</p>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mt-2">
              {COMPANY.about.slice(0, 120)}…
            </p>
            <p className="text-primary-foreground/60 text-xs mt-3">
              Serving {COMPANY.operatingLocations}. GST {COMPANY.gstEnabled ? `${COMPANY.gstPercentage}%` : "exempt"} on bookings — see checkout & invoice.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
              <li><Link to="/book" className="hover:text-primary-foreground transition-colors">Book a Bus</Link></li>
              <li><Link to="/policies/refund-cancellation" className="hover:text-primary-foreground transition-colors">Refund &amp; cancellation</Link></li>
              <li><a href="#fleet" className="hover:text-primary-foreground transition-colors">Our Fleet</a></li>
              <li><a href="#how-it-works" className="hover:text-primary-foreground transition-colors">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">SEO &amp; guides</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link to="/guides" className="hover:text-primary-foreground transition-colors">Guides</Link></li>
              <li><Link to="/bus-types" className="hover:text-primary-foreground transition-colors">Bus types</Link></li>
              <li><Link to="/routes" className="hover:text-primary-foreground transition-colors">City / routes hub</Link></li>
              <li><Link to="/bus-rental/$citySlug" params={{ citySlug: "delhi" }} className="hover:text-primary-foreground transition-colors">Bus rental Delhi</Link></li>
              <li><Link to="/bus-rental/$citySlug" params={{ citySlug: "mumbai" }} className="hover:text-primary-foreground transition-colors">Bus rental Mumbai</Link></li>
              <li><Link to="/bus-rental/$citySlug" params={{ citySlug: "chandigarh" }} className="hover:text-primary-foreground transition-colors">Bus rental Chandigarh</Link></li>
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
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <a href={`tel:+91${COMPANY.contactPhone}`} className="hover:text-primary-foreground">{COMPANY.contactPhoneDisplay}</a>
                <span className="text-primary-foreground/50"> · WhatsApp</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href={`mailto:${COMPANY.contactEmail}`} className="hover:text-primary-foreground">{COMPANY.contactEmail}</a>
              </li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>{COMPANY.operatingLocations}</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
            <Link to="/policies/refund-cancellation" className="hover:text-primary-foreground transition-colors">Refund &amp; cancellation</Link>
            <button type="button" className="hover:text-primary-foreground transition-colors" onClick={() => setPrivacyOpen(true)}>Privacy Policy</button>
            <button type="button" className="hover:text-primary-foreground transition-colors" onClick={() => setTermsOpen(true)}>Terms of Service</button>
          </div>
        </div>
      </div>

      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {COMPANY.legalName} collects trip and contact details to connect you with bus operators. We do not sell your personal
            data. Operators you choose may contact you about quotes and bookings.
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Quotes and final transport agreements are between you and the selected operator. Cancellations and disputes follow
            our <Link to="/policies/refund-cancellation" className="underline">refund &amp; cancellation policy</Link> and your confirmed booking.
          </p>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
