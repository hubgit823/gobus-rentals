import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";

export const Route = createFileRoute("/book")({
  component: BookPage,
  head: () => ({
    meta: [
      { title: "Book a Bus — LuxuryBusRental" },
      { name: "description", content: "Submit your bus rental requirement and get quotes from verified bus operators across India." },
    ],
  }),
});

function BookPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Book Your Bus
            </h1>
            <p className="text-muted-foreground text-lg">
              Tell us your requirements and get quotes from multiple verified operators
            </p>
          </div>
          <BookingForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
