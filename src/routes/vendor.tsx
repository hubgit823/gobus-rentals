import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ResponsivePanelLayout } from "@/components/dashboards/ResponsivePanelLayout";
import { vendorPanelLinks } from "@/components/dashboards/panel-links";

export const Route = createFileRoute("/vendor")({
  component: VendorLayout,
});

function VendorLayout() {
  return (
    <ResponsivePanelLayout links={vendorPanelLinks} panelLabel="Vendor Panel" logoutTo="/vendor/login">
      <Outlet />
    </ResponsivePanelLayout>
  );
}
