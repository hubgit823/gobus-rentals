import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCityBySlug } from "@/data/indian-cities";

export const Route = createFileRoute("/bus-rental/$citySlug")({
  beforeLoad: ({ params }) => {
    if (!getCityBySlug(params.citySlug)) {
      throw redirect({ to: "/routes" });
    }
    throw redirect({
      to: "/$seoSlug",
      params: { seoSlug: `bus-rental-in-${params.citySlug}` },
      replace: true,
    });
  },
  component: () => null,
});
