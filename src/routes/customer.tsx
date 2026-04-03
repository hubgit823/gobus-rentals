import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { CustomerSidebar } from "@/components/dashboards/CustomerSidebar";

export const Route = createFileRoute("/customer")({
  component: CustomerLayout,
});

function CustomerLayout() {
  return (
    <div className="min-h-screen bg-surface flex">
      <CustomerSidebar />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
