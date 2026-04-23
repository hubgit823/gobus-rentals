import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL: /bus-types → canonical /bus-types-for-hire */
export const Route = createFileRoute("/bus-types")({
  beforeLoad: () => {
    throw redirect({ to: "/bus-types-for-hire", replace: true });
  },
  component: () => null,
});
