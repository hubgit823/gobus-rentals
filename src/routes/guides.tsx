import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL: /guides → canonical /bus-rental-guides */
export const Route = createFileRoute("/guides")({
  beforeLoad: () => {
    throw redirect({ to: "/bus-rental-guides", replace: true });
  },
  component: () => null,
});
