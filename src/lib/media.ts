/**
 * Category-matched transport imagery using fixed Unsplash photo IDs.
 * This avoids random unrelated images while keeping strong visual quality.
 */
const premiumImage = (photoId: string, width: number, height: number) =>
  `https://source.unsplash.com/${photoId}/${width}x${height}`;

export const fleetImages = {
  coachFrontMountain: premiumImage("zK0MWN31qQo", 1600, 1000),
  coachGoldenHour: premiumImage("v4BzhqGVeNI", 1920, 1080),
  coachMountainRoad: premiumImage("DJvwF7U6FC0", 1600, 1066),
  coachDepotLine: premiumImage("ubxqlmH3bFk", 1800, 900),
  coachSeatsReclining: premiumImage("ziwpr6iItpk", 1280, 960),
  coachInteriorSemiSleeper: premiumImage("BOAJwI3WXKs", 1280, 960),
  busInteriorOverheadRacks: premiumImage("ufC1gjg0dXs", 1280, 960),
  vanUrbaniaFront: premiumImage("LYA-0k00fUw", 1280, 960),
  vanTravellerSide: premiumImage("UguKo19QCfg", 1280, 960),
  vanInteriorAisle: premiumImage("07k9_DUujBw", 1280, 960),
} as const;
