import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL — canonical hub is `/bus-rental`. */
export const Route = createFileRoute("/routes")({
  beforeLoad: () => {
    throw redirect({ to: "/bus-rental", replace: true });
  },
});
