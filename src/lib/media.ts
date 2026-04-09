/**
 * Curated premium imagery served from Unsplash CDN.
 * Keep transformations for fast, consistent rendering across sections.
 */
const premiumImage = (id: string, width: number, height: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=85`;

export const fleetImages = {
  coachFrontMountain: premiumImage("photo-1494515843206-f3117d3f51b7", 1600, 1000),
  coachGoldenHour: premiumImage("photo-1544620347-c4fd4a3d5957", 1920, 1080),
  coachMountainRoad: premiumImage("photo-1570125909232-eb263c188f7e", 1600, 1066),
  coachDepotLine: premiumImage("photo-1556122071-e404eaedb77f", 1800, 900),
  coachSeatsReclining: premiumImage("photo-1549924231-f129b911e442", 1280, 960),
  coachInteriorSemiSleeper: premiumImage("photo-1512850183-6d7990f42385", 1280, 960),
  busInteriorOverheadRacks: premiumImage("photo-1474487548417-781cb71495f3", 1280, 960),
  vanUrbaniaFront: premiumImage("photo-1449965408869-eaa3f722e40d", 1280, 960),
  vanTravellerSide: premiumImage("photo-1533473359331-0135ef1b58bf", 1280, 960),
  vanInteriorAisle: premiumImage("photo-1517940310602-26535839fe84", 1280, 960),
} as const;
