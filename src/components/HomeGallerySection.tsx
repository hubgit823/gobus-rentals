import { COMPANY } from "@/lib/company";

const photos = [
  { src: "/images/home/bus-travel.jpg", alt: "Comfortable bus travel for groups", tall: true },
  { src: "/images/home/mountains-north.jpg", alt: "Scenic hill and highway routes", tall: false },
  { src: "/images/home/wedding-celebration.jpg", alt: "Wedding and celebration transport", tall: false },
  { src: "/images/home/corporate-team.jpg", alt: "Corporate outings and team travel", tall: true },
  { src: "/images/home/group-travel.jpg", alt: "Family and friends on the road", tall: false },
  { src: "/images/home/city-lights.jpg", alt: "City departures and evening travel", tall: false },
];

export function HomeGallerySection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Gallery</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Journeys we love to power
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Weddings, corporate runs, school trips, and hill routes across North India — real moments from the kind
            of trips {COMPANY.legalName} supports every day.
          </p>
        </div>

        {/* Wide highlight */}
        <figure className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-md mb-4 sm:mb-5 group">
          <img
            src="/images/home/road-trip.jpg"
            alt="Highway charter and intercity bus travel"
            width={1600}
            height={640}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[21/9] sm:aspect-[3/1] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 to-transparent px-5 py-6 sm:py-8">
            <p className="text-primary-foreground font-display text-lg sm:text-xl font-semibold">
              Charter &amp; intercity — Volvo, Mercedes-Benz, sleeper &amp; seater
            </p>
          </figcaption>
        </figure>

        {/* Masonry-style columns */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((p) => (
            <figure
              key={p.src}
              className={`break-inside-avoid relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm group ${p.tall ? "" : ""}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                width={800}
                height={p.tall ? 1000 : 640}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  p.tall ? "min-h-[220px] sm:min-h-[280px] max-h-[420px]" : "aspect-[4/3]"
                }`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent p-3 sm:p-4 pt-10 sm:pt-14">
                <p className="text-primary-foreground text-xs sm:text-sm font-medium leading-snug">{p.alt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
