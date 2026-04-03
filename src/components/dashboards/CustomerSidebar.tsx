import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, Clock, Star, User, LogOut, Bus } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/customer/dashboard" as const, icon: LayoutDashboard, label: "Dashboard" },
  { to: "/customer/bookings" as const, icon: BookOpen, label: "My Bookings" },
  { to: "/customer/quotes" as const, icon: Clock, label: "My Quotes" },
  { to: "/customer/reviews" as const, icon: Star, label: "Reviews" },
  { to: "/customer/profile" as const, icon: User, label: "Profile" },
];

export function CustomerSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen hidden lg:flex flex-col">
      <div className="p-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.jpeg" alt="LuxuryBusRental" className="h-8 w-auto" />
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              location.pathname === link.to
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
