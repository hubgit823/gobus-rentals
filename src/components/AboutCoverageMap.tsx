import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";

const MAP_CITIES = [
  { name: "Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Chandigarh", lat: 30.7333, lng: 76.7794 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { name: "Patna", lat: 25.5941, lng: 85.1376 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
] as const;

/**
 * Imperative Leaflet map (no react-leaflet) so React 19 never reconciles Leaflet-owned DOM,
 * avoiding "removeChild" / hydration issues from the declarative wrappers.
 */
export function AboutCoverageMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let map: LeafletMap | null = null;
    let cancelled = false;

    void import("leaflet").then((L) => {
      if (cancelled || !el.isConnected) return;

      const instance = L.map(el, {
        center: [22.9734, 78.6569],
        zoom: 5,
        minZoom: 4,
        maxZoom: 9,
        scrollWheelZoom: false,
      });

      if (cancelled) {
        instance.remove();
        return;
      }

      map = instance;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(instance);

      for (const city of MAP_CITIES) {
        L.circleMarker([city.lat, city.lng], {
          radius: 6,
          color: "#2563eb",
          fillColor: "#2563eb",
          fillOpacity: 0.8,
          weight: 2,
        })
          .addTo(instance)
          .bindTooltip(city.name, { direction: "top", offset: [0, -4], opacity: 1 });
      }
    });

    return () => {
      cancelled = true;
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full min-h-[300px] z-0" />;
}
