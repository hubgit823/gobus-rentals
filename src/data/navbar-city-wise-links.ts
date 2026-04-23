/**
 * Navbar → "City Wise +" menu: labels match reference sites; `to` is a site path.
 * City rows use `/{slug}-bus-rental` (e.g. /delhi-bus-rental).
 * A few destinations without a city page link to `/book` or `/guides` instead.
 */
export type NavbarCityWiseLink = Readonly<{
  label: string;
  to: string;
}>;

export const NAVBAR_CITY_WISE_LINKS: readonly NavbarCityWiseLink[] = [
  { label: "Delhi -Vehicle Rentals", to: "/delhi-bus-rental" },
  { label: "Mumbai -Vehicle Rentals", to: "/mumbai-bus-rental" },
  { label: "Bengaluru -Vehicle Rentals", to: "/bangalore-bus-rental" },
  { label: "Goa -Vehicle Rentals", to: "/panaji-bus-rental" },
  { label: "Hyderabad -Vehicle Rental", to: "/hyderabad-bus-rental" },
  { label: "Agra -Vehicle Rentals", to: "/agra-bus-rental" },
  { label: "Jaipur -Vehicle Rentals", to: "/jaipur-bus-rental" },
  { label: "Pune -Vehicle Rentals", to: "/pune-bus-rental" },
  { label: "Udaipur -Vehicle Rentals", to: "/udaipur-bus-rental" },
  { label: "Gurugram -Vehicle Rentals", to: "/gurgaon-bus-rental" },
  { label: "Noida -Vehicle Rentals", to: "/noida-bus-rental" },
  { label: "Ahmedabad -Vehicle Rental", to: "/ahmedabad-bus-rental" },
  { label: "Kolkata -Vehicle Rentals", to: "/kolkata-bus-rental" },
  { label: "Chennai -Vehicle Rentals", to: "/chennai-bus-rental" },
  { label: "Jodhpur -Vehicle Rentals", to: "/jodhpur-bus-rental" },
  { label: "Shimla -Vehicle Rentals", to: "/shimla-bus-rental" },
  { label: "Manali -Vehicle Rentals", to: "/manali-bus-rental" },
  { label: "Dharamshala -Vehicle Rental", to: "/dharamshala-bus-rental" },
  { label: "Varanasi -Vehicle Rentals", to: "/varanasi-bus-rental" },
  { label: "Patna -Vehicle Rentals", to: "/patna-bus-rental" },
  { label: "Khajuraho -Vehicle Rentals", to: "/book" },
  { label: "Gaya -Vehicle Rentals", to: "/gaya-bus-rental" },
  { label: "Chandigarh -Vehicle Rentals", to: "/chandigarh-bus-rental" },
  { label: "Amritsar -Vehicle Rentals", to: "/amritsar-bus-rental" },
  { label: "Aurangabad -Vehicle Rentals", to: "/aurangabad-bus-rental" },
  { label: "Jammu -Vehicle Rentals", to: "/jammu-bus-rental" },
  { label: "Bhubaneswar City", to: "/bhubaneswar-bus-rental" },
  { label: "Srinagar -Vehicle Rentals", to: "/srinagar-bus-rental" },
  { label: "Bagdogra -Vehicle Rental", to: "/book" },
  { label: "Surat -Vehicle Rentals", to: "/surat-bus-rental" },
  { label: "Guwahati -Vehicle Rentals", to: "/guwahati-bus-rental" },
  { label: "Cochin -Vehicle Rentals", to: "/kochi-bus-rental" },
  { label: "Trivandrum -Vehicle Rental", to: "/thiruvananthapuram-bus-rental" },
  { label: "Lucknow -Vehicle Rentals", to: "/lucknow-bus-rental" },
  { label: "Madurai -Vehicle Rentals", to: "/madurai-bus-rental" },
  { label: "Gangtok -Vehicle Rentals", to: "/gangtok-bus-rental" },
  { label: "Visakhapatnam City", to: "/visakhapatnam-bus-rental" },
  { label: "Dehradun -Vehicle Rentals", to: "/dehradun-bus-rental" },
  { label: "Bikaner -Vehicle Rentals", to: "/bikaner-bus-rental" },
  { label: "Bhopal -Vehicle Rentals", to: "/bhopal-bus-rental" },
  { label: "Allahabad -Vehicle Rentals", to: "/allahabad-bus-rental" },
  { label: "Leh -Vehicle Rentals", to: "/leh-bus-rental" },
  { label: "Vehicle -For Chardham Yatra", to: "/guides" },
  { label: "Ayodhya -Vehicle Rentals", to: "/ayodhya-bus-rental" },
];
