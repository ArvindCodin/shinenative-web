// ─── Site-wide config ──────────────────────────────────────────────────────
// Update these two values when going live:
export const WHATSAPP_NUMBER = "917574002531"; // client's WhatsApp number (with country code, no + or spaces)
export const COMPANY_BROCHURE_URL = ""; // paste the PDF URL here when ready (Google Drive, Dropbox, etc.)
// ───────────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  location: string;
  city: string;
  status: "new_launch" | "under_construction" | "ready_to_move" | "ready_for_registration";
  type: string;
  configurations: string[];
  priceMin: number;
  priceMax: number;
  area: string;
  possession: string;
  coverImage: string;
  images: string[];
  amenities: string[];
  description: string;
  highlights: string[];
  reraNumber?: string;
  totalUnits?: string;
  totalArea?: string;
  floorPlans: { label: string; image: string }[];
  about: string;
}

export const projects: Project[] = [
  {
    id: "shine-greenfields",
    name: "Shine Greenfields",
    location: "Panvel, Navi Mumbai",
    city: "Navi Mumbai",
    status: "new_launch",
    type: "Residential",
    configurations: ["1 BHK", "2 BHK", "3 BHK"],
    priceMin: 4500000,
    priceMax: 9500000,
    area: "1.2 Acres",
    possession: "Dec 2027",
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6d78b3d2?w=800&auto=format&fit=crop",
    ],
    amenities: [
      "Swimming Pool", "Gym & Fitness Center", "Clubhouse", "Children's Play Area",
      "Landscaped Gardens", "24x7 Security", "Power Backup", "High-Speed Elevators",
      "Covered Parking", "Indoor Games", "Yoga Deck", "Jogging Track",
    ],
    description: "Shine Greenfields is a landmark residential project nestled in the heart of Panvel, offering spacious 1, 2 & 3 BHK homes surrounded by lush greenery and world-class amenities.",
    highlights: [
      "5 mins from Panvel Railway Station",
      "Near Kharghar Hills",
      "Close to upcoming Navi Mumbai Metro",
      "RERA Registered",
    ],
    reraNumber: "P51700048391",
    totalUnits: "240",
    totalArea: "1.2 Acres",
    floorPlans: [
      { label: "1 BHK — 550 sq ft", image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&auto=format&fit=crop" },
      { label: "2 BHK — 850 sq ft", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop" },
      { label: "3 BHK — 1200 sq ft", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop" },
    ],
    about: "Located at the gateway to Navi Mumbai, Shine Greenfields redefines urban living with thoughtfully designed homes that blend modern architecture with the tranquility of nature. Every home is crafted to maximise space, light, and ventilation.",
  },
  {
    id: "shine-elite-residences",
    name: "Shine Elite Residences",
    location: "Kharghar, Navi Mumbai",
    city: "Navi Mumbai",
    status: "under_construction",
    type: "Residential",
    configurations: ["2 BHK", "3 BHK", "4 BHK"],
    priceMin: 8500000,
    priceMax: 18000000,
    area: "2.5 Acres",
    possession: "Jun 2026",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop",
    ],
    amenities: [
      "Rooftop Pool", "Sky Lounge", "Business Center", "Concierge Services",
      "Valet Parking", "Spa & Wellness", "Kids Zone", "Amphitheatre",
      "Solar Panels", "EV Charging", "Smart Home Features", "CCTV Surveillance",
    ],
    description: "Shine Elite Residences stands as a testament to luxury living in Kharghar — a premium address offering expansive 2, 3 & 4 BHK residences with panoramic views and curated amenities.",
    highlights: [
      "Rooftop infinity pool with city views",
      "Near Central Park, Kharghar",
      "Walking distance to Kharghar Station",
      "RERA Registered",
    ],
    reraNumber: "P51700051284",
    totalUnits: "180",
    totalArea: "2.5 Acres",
    floorPlans: [
      { label: "2 BHK — 1050 sq ft", image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&auto=format&fit=crop" },
      { label: "3 BHK — 1450 sq ft", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop" },
    ],
    about: "An address that speaks volumes about your taste and lifestyle. Shine Elite Residences offers premium residences designed for those who seek the finest in life.",
  },
  {
    id: "shine-valley-view",
    name: "Shine Valley View",
    location: "Ulwe, Navi Mumbai",
    city: "Navi Mumbai",
    status: "ready_to_move",
    type: "Residential",
    configurations: ["1 BHK", "2 BHK"],
    priceMin: 3200000,
    priceMax: 6500000,
    area: "0.8 Acres",
    possession: "Ready to Move",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop",
    ],
    amenities: [
      "Swimming Pool", "Gym", "Garden", "Children's Play Area",
      "24x7 Security", "Power Backup", "Parking", "Lift",
    ],
    description: "Shine Valley View offers affordable yet premium 1 & 2 BHK homes in Ulwe, one of Navi Mumbai's fastest growing corridors. Move in immediately!",
    highlights: [
      "Occupation Certificate Received",
      "Near NMIA International Airport",
      "Excellent connectivity to Mumbai",
      "Ready for immediate possession",
    ],
    reraNumber: "P51700039847",
    totalUnits: "120",
    totalArea: "0.8 Acres",
    floorPlans: [
      { label: "1 BHK — 480 sq ft", image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&auto=format&fit=crop" },
      { label: "2 BHK — 780 sq ft", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop" },
    ],
    about: "A home that is truly ready for you. Shine Valley View is the perfect choice for first-time homebuyers and investors looking for immediate possession in Navi Mumbai's emerging zone.",
  },
];

export const statusLabels: Record<string, string> = {
  new_launch: "New Launch",
  under_construction: "Under Construction",
  ready_to_move: "Ready to Move",
  ready_for_registration: "Ready for Registration",
};

export const statusColors: Record<string, string> = {
  new_launch: "bg-amber-100 text-amber-800",
  under_construction: "bg-blue-100 text-blue-800",
  ready_to_move: "bg-green-100 text-green-800",
  ready_for_registration: "bg-purple-100 text-purple-800",
};

export function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(0)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

export const teamMembers = [
  {
    name: "Rajesh Sharma",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop",
    bio: "25+ years in real estate development across Mumbai and Navi Mumbai.",
  },
  {
    name: "Priya Mehta",
    role: "Director — Sales & Marketing",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop",
    bio: "15+ years crafting homebuying journeys with over 1,200 families.",
  },
  {
    name: "Anil Desai",
    role: "Chief Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop",
    bio: "Award-winning architect with a portfolio of landmark projects.",
  },
  {
    name: "Sunita Kapoor",
    role: "NRI Relations Head",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop",
    bio: "Specialises in seamless property transactions for NRI clients globally.",
  },
];
