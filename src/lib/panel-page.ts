/** Shared layout classes for admin / vendor / customer dashboard pages */
export const panelPage = {
  standard: "w-full max-w-6xl mx-auto px-4 py-4 pb-10 sm:px-6 sm:py-6 lg:px-8 lg:py-8",
  wide: "w-full max-w-7xl mx-auto px-4 py-4 pb-10 sm:px-6 sm:py-6 lg:px-8 lg:py-8",
  narrow: "w-full max-w-2xl mx-auto px-4 py-4 pb-10 sm:px-6 sm:py-6 lg:px-8 lg:py-8",
  md: "w-full max-w-4xl mx-auto px-4 py-4 pb-10 sm:px-6 sm:py-6 lg:px-8 lg:py-8",
} as const;

/** Loading / error states inside panel main area */
export const panelStatePadding = "px-4 py-8 sm:px-6 lg:px-8";
