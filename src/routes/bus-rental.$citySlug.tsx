import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCityBySlug } from "@/data/indian-cities";

export const Route = createFileRoute("/bus-rental/$citySlug")({
  beforeLoad: ({ params }) => {
    if (!getCityBySlug(params.citySlug)) {
      throw redirect({ to: "/bus-rental" });
    }
    throw redirect({
      to: "/$seoSlug",
      params: { seoSlug: `${params.citySlug}-bus-rental` },
      replace: true,
    });
  },
  component: () => null,
});
