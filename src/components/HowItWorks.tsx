import { ClipboardList, MessageSquareQuote, CheckCircle2, Bus } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Submit Requirement",
    desc: "Tell us your pickup, drop, date, bus type & group size.",
  },
  {
    icon: MessageSquareQuote,
    title: "Get Multiple Quotes",
    desc: "Verified bus operators in your city send competitive quotes.",
  },
  {
    icon: CheckCircle2,
    title: "Compare & Choose",
    desc: "Compare prices, ratings & reviews. Pick the best operator.",
  },
  {
    icon: Bus,
    title: "Travel in Comfort",
    desc: "Confirm booking, pay securely, and enjoy your journey.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
            How It Works
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Book your bus in 4 easy steps — no hassle, best prices guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-border" />
              )}
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 relative">
                <step.icon className="w-9 h-9 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-primary-foreground rounded-full text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { src: "/images/home/group-travel.jpg", alt: "Small group pickup" },
            { src: "/images/home/bus-travel.jpg", alt: "On the road with your charter" },
            { src: "/images/home/corporate-team.jpg", alt: "Corporate booking experience" },
            { src: "/images/home/mountains-north.jpg", alt: "Hill station and North India routes" },
          ].map((ph) => (
            <div key={ph.src} className="relative overflow-hidden rounded-xl border border-border aspect-[4/3] group">
              <img
                src={ph.src}
                alt={ph.alt}
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
