import { COMPANY } from "@/lib/company";

/**
 * On-page SEO copy for the homepage (search engines index visible body text).
 * Meta description in head stays short; this block carries depth + keywords.
 */
export const homeSeoArticleSections: readonly {
  id: string;
  title: string;
  paragraphs: readonly string[];
}[] = [
  {
    id: "intro",
    title: "Luxury Bus Rental in India: Compare Volvo, Mercedes & AC Coach Hire Online",
    paragraphs: [
      `Luxury bus rental in India has evolved from phone-only broker networks into transparent, route-based marketplaces where travellers submit one itinerary and receive multiple quotations from verified coach operators. ${COMPANY.legalName} powers ${COMPANY.platformBrand}, a platform built around GST-transparent pricing, clear advance and balance schedules, and documented cancellation rules so corporate procurement teams, wedding planners, school administrators, and pilgrimage organisers can plan large-group road transport with confidence. Whether you need a compact 12 seater mini bus for an airport transfer or a 66 seater highway coach for interstate movement, the same workflow applies: define pickup, drop, date, passenger count, and preferred bus category, then compare operator responses side by side before you commit capital to a single vendor.`,
      `Across North India—Chandigarh Tricity, Delhi NCR, Punjab, Haryana, Himachal Pradesh, Uttarakhand, and Rajasthan gateway sectors—demand for premium bus hire spikes around wedding seasons, college fests, corporate annual days, cricket and concert shuttles, and long-weekend hill getaways. Search intent clusters around phrases such as “Volvo bus rental”, “Mercedes coach hire”, “AC luxury bus booking”, “wedding bus Punjab”, “corporate bus Delhi”, “Himachal Volvo package”, and “tempo traveller vs mini bus”. This guide explains how ${COMPANY.platformBrand} aligns with those intents: we emphasise operator verification, published GST percentages, and structured quote comparison rather than opaque “call for best rate” messaging that frustrates procurement teams and families alike.`,
      `Indian coach configurations typically span 12 seater Urbania-style mini buses through 66 seater full-length intercity bodies built on Volvo B8R, B11R, Scania, Tata Marcopolo, Ashok Leyland, and Eicher platforms depending on operator inventory. Sleeper buses add berth counts and night-route comfort layers, while day-seater coaches prioritise reclining seats, reading lamps, USB charging, and luggage volume under the cabin. Non-AC options still appear for budget school runs and certain rural routes, though most marketplace demand concentrates on air-conditioned vehicles with experienced drivers who understand hill-road discipline, monsoon cautions, and highway night-driving regulations.`,
    ],
  },
  {
    id: "keywords-routes",
    title: "Bus Hire Keywords, City Coverage & Route Planning Across India",
    paragraphs: [
      `Effective bus hire SEO is not keyword stuffing; it is matching traveller language to genuine service capability. Travellers search “bus rental Chandigarh”, “Mohali coach hire”, “Panchkula Volvo booking”, “Delhi to Manali bus package”, “Shimla corporate outing bus”, “Amritsar wedding baraat coach”, “Jaipur corporate charter”, and “Gurgaon employee shuttle bus”. ${COMPANY.operatingLocations} represent core operating strength, while hundreds of programmatic city pages extend discovery for users who begin research from a locality-first lens. When you plan a route, include buffer time for Mandi bypass congestion, Parwanoo toll queues, Murthal dhaba stops if your group requests them, and Himachal border taxi permit coordination where applicable—serious operators bake realistic schedules into quotations instead of impossible timelines that fail on day one.`,
      `Corporate bus hire differs from wedding bus rental in load-in rules, branding wraps, alcohol policies, and payment milestones. Schools prioritise seat-belt availability, female attendant requests, and police NOC pathways for interstate educational tours. Religious groups emphasise luggage nets for prasad cartons, microphone availability for kirtan (where legally permitted), and early-morning departure discipline. Pilgrimage circuits such as Vaishno Devi, Amarnath base legs, Haridwar, and Char Dham segments require altitude-aware maintenance histories—your quote request should mention maximum altitude and road width constraints so operators propose the correct axle configuration rather than an oversized coach that cannot negotiate tight ghat bends.`,
    ],
  },
  {
    id: "fleet-tech",
    title: "Coach Specifications: Suspension, HVAC, Entertainment & Accessibility",
    paragraphs: [
      `Modern luxury coaches advertise pneumatic suspension, panoramic windscreens, retarders for downhill braking, and fire-suppression systems in engine bays on premium builds. HVAC performance matters in May–June North Indian heat and in humid monsoon weeks when glass fogging becomes a safety issue. Entertainment systems range from basic PA microphones to dual LCD screens; licencing for commercial film exhibition is operator-specific. USB charging per seat is now a default expectation for executive charters—state this requirement explicitly in your notes so quotations include amperage-sufficient alternators rather than overloaded inverters.`,
      `Accessibility is gradually improving: some fleets offer mid-door wheelchair lifts or fold-flat aisle seats; availability is limited, so request accessibility features at enquiry time, not after shortlisting. Luggage manifests matter for airport crew movements and exhibition cargo where hard cases exceed standard under-belly cubic capacity. If your group transports sports equipment, musical instruments, or medical cold-chain boxes, describe dimensions in centimetres so operators propose appropriate belly lockers or tag-along luggage tempo arrangements.`,
    ],
  },
  {
    id: "pricing-gst",
    title: "GST on Bus Rental, Advances, Fuel Surcharges & Quote Transparency",
    paragraphs: [
      `India’s GST regime applies to passenger transport services supplied by registered operators; advertised rental plus ${COMPANY.gstPercentage}% GST should appear clearly at checkout or in formal quotations so finance teams can reconcile input tax credits where eligible. ${COMPANY.serviceBillingTagline} Marketplace models may split operator rental from platform facilitation fees—read each quote’s tax table rather than comparing headline totals only. Advance percentages (often near thirty percent for long-lead bookings) secure vehicle blocking during peak wedding dates; balance schedules may tie to journey start or kilometre thresholds for multi-day rotations.`,
      `Fuel surcharge clauses occasionally activate when diesel prices swing beyond contracted bands; ethical operators disclose formulas up front. Toll and parking are typically billed as actuals with receipts unless a package lumps them in. Driver night allowance, interstate permit fees, and hill-state green-tax line items should be itemised so your accounts payable team does not dispute invoices later. If your organisation requires purchase orders, vendor master data, and TDS sections, upload those expectations in the notes field so operators pre-validate compliance before accepting.`,
    ],
  },
  {
    id: "safety-compliance",
    title: "Safety, Insurance, Permits & Driver Fatigue Management",
    paragraphs: [
      `Commercial passenger vehicles must carry valid fitness certificates, PUC, insurance covering third-party and often passenger liability, national permit or state reciprocity where applicable, and driver badges with commercial licence classes matching vehicle gross weight. Ask operators for FASTag balance status before long toll-heavy routes. GPS tracking portals are increasingly standard—request read-only guest links for security desks monitoring employee shuttles. Fatigue rules matter: dual-driver rotations should appear on multi-day Himachal loops exceeding statutory continuous hours; single-driver savings that violate fatigue norms are not worth the liability exposure.`,
      `Emergency protocols should include operator hotline, breakdown substitute vehicle SLA, and medical escalation paths for highway incidents. First-aid kit presence is mandatory; AED availability is rare but valuable for large corporate contracts. Fire extinguisher inspection dates and emergency exit unblock drills (especially for school groups) differentiate premium fleets from bare-minimum compliance operators. ${COMPANY.platformBrand} encourages you to validate these details in writing before you accept a quote, because the cheapest coach is rarely the safest coach when weather, night driving, and mountain passes stack risk.`,
    ],
  },
  {
    id: "booking-workflow",
    title: "How Quote Comparison Works on Luxury Bus Rental",
    paragraphs: [
      `Start from the Book page: enter pickup and drop geography, journey date and preferred time, passenger headcount, desired bus type band (mini, mid, full coach, sleeper), AC preference, and trip purpose. Contact details route to verified operators who service that geography and capacity band. You receive structured quotes rather than unstructured WhatsApp voice notes—compare inclusions, GST lines, advance rules, and cancellation windows side by side. Customer dashboards track accepted quotes, booking states, and payment milestones; vendor dashboards manage fleet assignment and driver allocation.`,
      `If your itinerary includes multi-night halts, empty-leg repositioning, or partial group drop-offs along a corridor, describe the kilometre logic you expect (garage-to-garage vs point-to-point) so quotes align. International delegations may need English-speaking stewards, bottled water quantity guarantees, and Wi-Fi dongles—note language and amenity expectations explicitly. For recurring employee shuttles, ask for monthly retainer models with SLA-backed substitution clauses instead of ad-hoc daily pricing that becomes unpredictable during festivals.`,
    ],
  },
  {
    id: "seasonality",
    title: "Peak Seasons, Festival Blackouts & Advance Booking Windows",
    paragraphs: [
      `Indian bus hire peaks around Diwali, New Year long weekends, Holi long weekends, summer vacation exodus to hills, and regional wedding calendars (especially November–February high-density Saturdays). Vehicle blocking requires earlier advances in those windows; last-minute enquiries may still succeed but with reduced model choice. College fest seasons around March and September spike 29–35 seater demand; election cycles spike 52–66 seater convoy demand with police escort coordination. Plan sixty to ninety days ahead for marquee wedding dates � especially in Delhi NCR, Mumbai, Bengaluru, Hyderabad, Jaipur, and other high-demand cities.`,
      `Monsoon months elevate landslide risk on certain Himachal and Uttarakhand segments—operators may propose alternate timings or smaller axle configurations for safety. Winter fog on NH-44 impacts early-morning airport transfers from satellite towns; build ninety-minute buffers for crew flights. Summer heat waves stress AC compressor duty cycles—ask for coach age and compressor service history for June afternoon charters. These operational nuances rarely appear in generic aggregator copy, which is why long-form, geography-aware guidance improves both user trust and search relevance for intent-rich queries.`,
    ],
  },
  {
    id: "sustainability",
    title: "Fleet Modernisation, BS6 Emissions & Fuel Efficiency Narratives",
    paragraphs: [
      `BS6 diesel norms reshaped Indian commercial vehicle supply chains; newer engines pair with improved SCR after-treatment. While electric intercity coaches are still emerging, some operators already run CNG intra-city variants for shorter loops. If your corporate ESG policy rewards lower-emission assets, request build year and emission standard in your RFP notes. Efficient driving behaviour—smooth acceleration, anticipation of braking, correct tyre inflation—materially impacts per-kilometre diesel burn on long charters; premium operators train drivers on eco-driving without compromising schedule integrity.`,
    ],
  },
  {
    id: "conclusion",
    title: "Start Your Bus Rental Search With Clear Capacity & Compliance Criteria",
    paragraphs: [
      `Successful bus rental outcomes combine correct capacity sizing (from 12 seater through 66 seater as detailed below), transparent commercial terms, and operator discipline on safety documentation. Use this page as a reference while you collect quotations: cross-check GST disclosures, advance percentages, permit scopes, and amenity lists. When ready, proceed to the Book workflow on ${COMPANY.platformBrand}, or call ${COMPANY.contactPhoneDisplay} for human assistance if your itinerary involves multi-state permits, escort vehicles, or accessibility adaptations. ${COMPANY.legalName} remains focused on trustworthy marketplace standards so Indian group travel can move beyond opaque phone haggling into documented, comparable, and accountable coach hire.`,
    ],
  },
  {
    id: "capacity-planning",
    title: "Right-Sizing Passenger Counts, Aisle Width & Luggage Mathematics",
    paragraphs: [
      `Many first-time charter customers confuse “seats sold” with “comfortable usable seats” once luggage, camera tripods, foldable wheelchairs, and aisle standing helpers enter the equation. Indian coach bodies publish rated capacities under ARAI norms, but real comfort depends on seat pitch, door placement, and whether your group includes children who legally occupy seats yet consume less shoulder width than adults. Wedding outfits with lehenga volume and corporate travellers with roller bags stress aisle clearance differently; when in doubt, size up one band (for example from a tight 40 seater to a 45 seater) to preserve dignity and boarding speed at every halt. Pilgrimage groups carrying steel lota sets and additional dry-food cartons should model under-belly cubic metres explicitly—operators can suggest roof carriers where legal, but wind noise and height restrictions on certain tunnels may veto that approach.`,
      `Interstate permit planning also interacts with capacity because some state agreements reference seat count tiers for green-tax slabs. Exhibition logistics teams sometimes remove rear bench rows temporarily to secure palletised booth materials—such modifications require operator consent and structural safety sign-off, never ad-hoc removal on site. Sports teams transporting bicycles may prefer tail-door coaches or tag trailers; musical touring acts may prioritise vibration isolation near cargo bays. Document these edge cases in your enquiry so quotations include the correct vehicle subtype rather than a generic “luxury bus” label that collapses important distinctions under marketing gloss.`,
    ],
  },
];
