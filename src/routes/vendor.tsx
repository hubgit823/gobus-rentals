import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { VendorSidebar } from "@/components/dashboards/VendorSidebar";

export const Route = createFileRoute("/vendor")({
  component: VendorLayout,
});

function VendorLayout() {
  return (
    <div className="min-h-screen bg-surface flex">
      <VendorSidebar />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
