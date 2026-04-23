import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$seoSlug/$busTypeSlug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$seoSlug/rental/$busTypeSlug",
      params: { seoSlug: params.seoSlug, busTypeSlug: params.busTypeSlug },
      replace: true,
    });
  },
  component: () => null,
});
