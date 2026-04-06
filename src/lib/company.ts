/** Canonical public company & tax defaults — keep mock-api/server.mjs companySettings in sync. */
export const COMPANY = {
  legalName: "Kartar Travels Private Limited",
  platformBrand: "LuxuryBusRental",
  about:
    "Kartar Travels Private Limited is a trusted luxury bus rental service provider since 2018, offering Volvo, Mercedes-Benz, seater and sleeper buses for comfortable journeys. We are committed to delivering safe, reliable, and premium travel experiences across North India at the best prices.",
  operatingLocations:
    "Chandigarh, Mohali, Panchkula, Delhi, Punjab, Haryana, Himachal Pradesh & North regions",
  contactPhone: "7380027102",
  contactPhoneDisplay: "+91 73800 27102",
  whatsappE164: "917380027102",
  contactEmail: "support@luxurybusrental.in",
  gstNumber: "GSTIN will appear on tax invoice (update in Admin → Settings).",
  gstEnabled: true,
  gstPercentage: 18,
  commissionPercent: 10,
  advanceFractionDefault: 0.3,
} as const;

export function formatInr(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function computeGstBreakdown(subtotal: number, gstPercent: number, gstEnabled: boolean) {
  const s = Math.round(subtotal * 100) / 100;
  const gstAmount = gstEnabled ? Math.round(s * (gstPercent / 100) * 100) / 100 : 0;
  const totalWithGst = Math.round((s + gstAmount) * 100) / 100;
  return { subtotal: s, gstAmount, totalWithGst };
}

export function vendorCommissionAmount(subtotal: number, commissionPercent: number): number {
  return Math.round(subtotal * (commissionPercent / 100) * 100) / 100;
}

export function vendorNetAfterCommission(subtotal: number, commissionPercent: number): number {
  const c = vendorCommissionAmount(subtotal, commissionPercent);
  return Math.round((subtotal - c) * 100) / 100;
}
