import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/dashboards/AdminSidebar";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
