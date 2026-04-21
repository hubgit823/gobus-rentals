import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { FEATURED_VEHICLE_RENTAL_CITIES } from "@/data/featured-vehicle-rental-cities";

type Variant = "footer" | "page";

export function CityVehicleRentalsStrip({ variant }: Readonly<{ variant: Variant }>) {
  const isFooter = variant === "footer";
  return (
    <ul
      className={cn(
        "overflow-hidden rounded-lg border text-sm",
        isFooter ? "border-primary-foreground/15" : "border-border bg-card",
      )}
    >
      {FEATURED_VEHICLE_RENTAL_CITIES.map((row, i) => (
        <li
          key={row.slug}
          className={cn(
            "border-b border-inherit last:border-0",
            isFooter
              ? i % 2 === 0
                ? "bg-primary-foreground/[0.07]"
                : "bg-primary-foreground/[0.03]"
              : i % 2 === 0
                ? "bg-muted/50"
                : "bg-muted/25",
          )}
        >
          <Link
            to="/$seoSlug"
            params={{ seoSlug: `bus-rental-in-${row.slug}` }}
            className={cn(
              "block px-3 py-2.5 font-medium transition-colors",
              isFooter
                ? "text-primary-foreground/95 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                : "text-foreground hover:bg-primary/10 hover:text-primary",
            )}
          >
            {row.line}
          </Link>
        </li>
      ))}
    </ul>
  );
}
