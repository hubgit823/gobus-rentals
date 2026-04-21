import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLayoutEffect } from "react";

/** Legacy-style URL — unified login at `/login` with customer portal pre-selected */
export const Route = createFileRoute("/customer/login")({
  component: CustomerLoginRedirect,
  head: () => ({ meta: [{ title: "Customer Login — Luxury Bus Rental" }] }),
});

function CustomerLoginRedirect() {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    navigate({ to: "/login", search: { role: "customer" }, replace: true });
  }, [navigate]);
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 text-sm text-muted-foreground">
      Opening sign in…
    </div>
  );
}
