import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Users, Building2, BookOpen, MessageSquareQuote, IndianRupee, FileText, Bell, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { clearAuth } from "@/lib/auth-storage";
import { COMPANY } from "@/lib/company";

const links = [
  { to: "/admin/dashboard" as const, icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/vendors" as const, icon: Building2, label: "Vendors" },
  { to: "/admin/customers" as const, icon: Users, label: "Customers" },
  { to: "/admin/bookings" as const, icon: BookOpen, label: "Bookings" },
  { to: "/admin/quotes" as const, icon: MessageSquareQuote, label: "Quote Monitor" },
  { to: "/admin/payments" as const, icon: IndianRupee, label: "Payments" },
  { to: "/admin/cms" as const, icon: FileText, label: "CMS" },
  { to: "/admin/notifications" as const, icon: Bell, label: "Notifications" },
  { to: "/admin/settings" as const, icon: Settings, label: "Settings" },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen hidden lg:flex flex-col">
      <div className="p-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt={COMPANY.platformBrand} className="h-10 w-auto object-contain object-left" width={884} height={458} decoding="async" />
        </Link>
        <p className="text-xs text-destructive font-semibold mt-1">Admin Panel</p>
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
          to="/admin/login"
          onClick={() => clearAuth()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
