import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { ResponsivePanelLayout } from "@/components/dashboards/ResponsivePanelLayout";
import { customerPanelLinks } from "@/components/dashboards/panel-links";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/auth-storage";

export const Route = createFileRoute("/customer")({
  component: CustomerLayout,
});

/** Shown in the mobile panel header when there is no auth token */
function CustomerMobileLogin() {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState<boolean | null>(null);

  useEffect(() => {
    setShowLogin(!getToken());
  }, [location.pathname]);

  if (showLogin !== true) return null;

  return (
    <Link to="/login" search={{ role: "customer" }}>
      <Button type="button" size="sm" variant="secondary" className="h-9 gap-1 px-3 text-xs">
        <LogIn className="w-3.5 h-3.5" />
        Login
      </Button>
    </Link>
  );
}

function CustomerLayout() {
  return (
    <ResponsivePanelLayout
      links={customerPanelLinks}
      panelLabel="My account"
      logoutTo="/login"
      mobileHeaderEnd={<CustomerMobileLogin />}
    >
      <Outlet />
    </ResponsivePanelLayout>
  );
}
