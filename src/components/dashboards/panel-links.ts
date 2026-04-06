import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Building2,
  BookOpen,
  MessageSquareQuote,
  IndianRupee,
  FileText,
  Bell,
  Settings,
  Bus,
  ClipboardList,
  Clock,
  Star,
  User,
} from "lucide-react";

export type PanelNavLink = { to: string; icon: LucideIcon; label: string };

export const adminPanelLinks: PanelNavLink[] = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/vendors", icon: Building2, label: "Vendors" },
  { to: "/admin/customers", icon: Users, label: "Customers" },
  { to: "/admin/bookings", icon: BookOpen, label: "Bookings" },
  { to: "/admin/quotes", icon: MessageSquareQuote, label: "Quote Monitor" },
  { to: "/admin/payments", icon: IndianRupee, label: "Payments" },
  { to: "/admin/cms", icon: FileText, label: "CMS" },
  { to: "/admin/notifications", icon: Bell, label: "Notifications" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export const vendorPanelLinks: PanelNavLink[] = [
  { to: "/vendor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/vendor/fleet", icon: Bus, label: "Fleet Management" },
  { to: "/vendor/leads", icon: ClipboardList, label: "Leads" },
  { to: "/vendor/quotes", icon: MessageSquareQuote, label: "My Quotes" },
  { to: "/vendor/bookings", icon: BookOpen, label: "Bookings" },
  { to: "/vendor/earnings", icon: IndianRupee, label: "Earnings" },
  { to: "/vendor/profile", icon: User, label: "Profile" },
];

export const customerPanelLinks: PanelNavLink[] = [
  { to: "/customer/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/customer/bookings", icon: BookOpen, label: "My Bookings" },
  { to: "/customer/quotes", icon: Clock, label: "My Quotes" },
  { to: "/customer/reviews", icon: Star, label: "Reviews" },
  { to: "/customer/profile", icon: User, label: "Profile" },
];
