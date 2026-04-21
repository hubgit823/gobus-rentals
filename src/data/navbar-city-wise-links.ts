/**
 * Navbar → “City Wise +” menu: labels match reference sites; `to` is a site path.
 * City rows use `/bus-rental-in-{slug}` where the slug exists in `indian-cities`.
 * A few destinations without a city page link to `/book` instead.
 */
export type NavbarCityWiseLink = Readonly<{
  label: string;
  to: string;
}>;

export const NAVBAR_CITY_WISE_LINKS: readonly NavbarCityWiseLink[] = [
  { label: "Delhi -Vehicle Rentals", to: "/bus-rental-in-delhi" },
  { label: "Mumbai -Vehicle Rentals", to: "/bus-rental-in-mumbai" },
  { label: "Bengaluru -Vehicle Rentals", to: "/bus-rental-in-bangalore" },
  { label: "Goa -Vehicle Rentals", to: "/bus-rental-in-panaji" },
  { label: "Hyderabad -Vehicle Rental", to: "/bus-rental-in-hyderabad" },
  { label: "Agra -Vehicle Rentals", to: "/bus-rental-in-agra" },
  { label: "Jaipur -Vehicle Rentals", to: "/bus-rental-in-jaipur" },
  { label: "Pune -Vehicle Rentals", to: "/bus-rental-in-pune" },
  { label: "Udaipur -Vehicle Rentals", to: "/bus-rental-in-udaipur" },
  { label: "Gurugram -Vehicle Rentals", to: "/bus-rental-in-gurgaon" },
  { label: "Noida -Vehicle Rentals", to: "/bus-rental-in-noida" },
  { label: "Ahmedabad -Vehicle Rental", to: "/bus-rental-in-ahmedabad" },
  { label: "Kolkata -Vehicle Rentals", to: "/bus-rental-in-kolkata" },
  { label: "Chennai -Vehicle Rentals", to: "/bus-rental-in-chennai" },
  { label: "Jodhpur -Vehicle Rentals", to: "/bus-rental-in-jodhpur" },
  { label: "Shimla -Vehicle Rentals", to: "/bus-rental-in-shimla" },
  { label: "Manali -Vehicle Rentals", to: "/bus-rental-in-manali" },
  { label: "Dharamshala -Vehicle Rental", to: "/bus-rental-in-dharamshala" },
  { label: "Varanasi -Vehicle Rentals", to: "/bus-rental-in-varanasi" },
  { label: "Patna -Vehicle Rentals", to: "/bus-rental-in-patna" },
  { label: "Khajuraho -Vehicle Rentals", to: "/book" },
  { label: "Gaya -Vehicle Rentals", to: "/bus-rental-in-gaya" },
  { label: "Chandigarh -Vehicle Rentals", to: "/bus-rental-in-chandigarh" },
  { label: "Amritsar -Vehicle Rentals", to: "/bus-rental-in-amritsar" },
  { label: "Aurangabad -Vehicle Rentals", to: "/bus-rental-in-aurangabad" },
  { label: "Jammu -Vehicle Rentals", to: "/bus-rental-in-jammu" },
  { label: "Bhubaneswar City", to: "/bus-rental-in-bhubaneswar" },
  { label: "Srinagar -Vehicle Rentals", to: "/bus-rental-in-srinagar" },
  { label: "Bagdogra -Vehicle Rental", to: "/book" },
  { label: "Surat -Vehicle Rentals", to: "/bus-rental-in-surat" },
  { label: "Guwahati -Vehicle Rentals", to: "/bus-rental-in-guwahati" },
  { label: "Cochin -Vehicle Rentals", to: "/bus-rental-in-kochi" },
  { label: "Trivandrum -Vehicle Rental", to: "/bus-rental-in-thiruvananthapuram" },
  { label: "Lucknow -Vehicle Rentals", to: "/bus-rental-in-lucknow" },
  { label: "Madurai -Vehicle Rentals", to: "/bus-rental-in-madurai" },
  { label: "Gangtok -Vehicle Rentals", to: "/bus-rental-in-gangtok" },
  { label: "Visakhapatnam City", to: "/bus-rental-in-visakhapatnam" },
  { label: "Dehradun -Vehicle Rentals", to: "/bus-rental-in-dehradun" },
  { label: "Bikaner -Vehicle Rentals", to: "/bus-rental-in-bikaner" },
  { label: "Bhopal -Vehicle Rentals", to: "/bus-rental-in-bhopal" },
  { label: "Allahabad -Vehicle Rentals", to: "/bus-rental-in-allahabad" },
  { label: "Leh -Vehicle Rentals", to: "/bus-rental-in-leh" },
  { label: "Vehicle -For Chardham Yatra", to: "/guides" },
  { label: "Ayodhya -Vehicle Rentals", to: "/bus-rental-in-ayodhya" },
];
