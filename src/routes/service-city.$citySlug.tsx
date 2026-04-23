import { createFileRoute, redirect } from "@tanstack/react-router";
import { getServiceCityPage } from "@/data/service-city-pages";

/** Legacy URL: /service-city/{slug} → canonical /{slug}-bus-rental-guide */
export const Route = createFileRoute("/service-city/$citySlug")({
  beforeLoad: ({ params }) => {
    if (!getServiceCityPage(params.citySlug)) {
      throw redirect({ to: "/bus-rental" });
    }
    throw redirect({
      to: "/$seoSlug",
      params: { seoSlug: `${params.citySlug}-bus-rental-guide` },
      replace: true,
    });
  },
  component: () => null,
});
