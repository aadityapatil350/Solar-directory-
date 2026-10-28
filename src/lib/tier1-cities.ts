/**
 * Tier-1, Top Metro & SolarSquare Operational Solar Markets in India
 *
 * SolarSquare Energy specializes in high-tariff, residential rooftop installations
 * with dedicated customer Experience Centres and turnkey in-house installation fleets.
 */

export interface Tier1CityConfig {
  name: string;
  slug: string;
  state: string;
  pinPrefixes: string[];
  aliases: string[];
  isSolarSquare: boolean;
  isExperienceCentre: boolean;
  experienceCentreLocation?: string;
  experienceCentreLandmark?: string;
}

export const TIER1_CITIES: Tier1CityConfig[] = [
  // ─── 9 FLAGSHIP SOLARSQUARE EXPERIENCE CENTRE HUBS ───
  {
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    pinPrefixes: ['411', '412'],
    aliases: ['pune', 'pcmc', 'pimpri', 'chinchwad', 'wakad', 'baner', 'kothrud', 'hadapsar', 'hinjewadi', 'kharadi', 'aundh', 'bavdhan', 'viman nagar'],
    isSolarSquare: true,
    isExperienceCentre: true,
    experienceCentreLocation: 'Wakad & Kharadi',
    experienceCentreLandmark: 'Amar Business Zone (Baner) & Kharadi IT Corridor',
  },
  {
    name: 'Nagpur',
    slug: 'nagpur',
    state: 'Maharashtra',
    pinPrefixes: ['440', '441'],
    aliases: ['nagpur', 'sitabuldi', 'ramdas peth', 'dharampeth', 'wardha road', 'manish nagar', 'sadar'],
    isSolarSquare: true,
    isExperienceCentre: true,
    experienceCentreLocation: 'Sitabuldi & Ramdas Peth',
    experienceCentreLandmark: 'Glocal Square Mall, Sitabuldi',
  },
  {
    name: 'Nashik',
    slug: 'nashik',
    state: 'Maharashtra',
    pinPrefixes: ['422'],
    aliases: ['nashik', 'nasik', 'cidco', 'panchavati', 'college road', 'untwadi', 'gangapur road', 'indira nagar'],
    isSolarSquare: true,
    isExperienceCentre: true,
    experienceCentreLocation: 'Untwadi & College Road',
    experienceCentreLandmark: 'Near City Centre Mall, Sambhaji Chowk',
  },
  {
    name: 'Bhopal',
    slug: 'bhopal',
    state: 'Madhya Pradesh',
    pinPrefixes: ['462'],
    aliases: ['bhopal', 'arera colony', 'kolar', 'mp nagar', 'tulsi nagar', 'stt nagar', 'shahpura', 'hoshangabad road'],
    isSolarSquare: true,
    isExperienceCentre: true,
    experienceCentreLocation: 'South TT Nagar & MP Nagar',
    experienceCentreLandmark: 'Srishti CBD, Gammon Mall, Tulsi Nagar',
  },
  {
    name: 'Indore',
    slug: 'indore',
    state: 'Madhya Pradesh',
    pinPrefixes: ['452', '453'],
    aliases: ['indore', 'vijay nagar', 'palasia', 'lig square', 'ab road', 'bicholi mardana', 'annapurna', 'sukhlia'],
    isSolarSquare: true,
    isExperienceCentre: true,
    experienceCentreLocation: 'LIG Square & AB Road',
    experienceCentreLandmark: 'Singapore Business Park, LIG Square',
  },
  {
    name: 'Gwalior',
    slug: 'gwalior',
    state: 'Madhya Pradesh',
    pinPrefixes: ['474'],
    aliases: ['gwalior', 'city centre', 'patel nagar', 'lashkar', 'morar', 'thathipur', 'govindpuri'],
    isSolarSquare: true,
    isExperienceCentre: true,
    experienceCentreLocation: 'Patel Nagar, City Centre',
    experienceCentreLandmark: 'Patel Nagar Commercial Complex, City Centre',
  },
  {
    name: 'Jabalpur',
    slug: 'jabalpur',
    state: 'Madhya Pradesh',
    pinPrefixes: ['482'],
    aliases: ['jabalpur', 'wright town', 'napier town', 'civil lines', 'vijay nagar jabalpur', 'gorakhpur jabalpur'],
    isSolarSquare: true,
    isExperienceCentre: true,
    experienceCentreLocation: 'Wright Town Commercial Hub',
    experienceCentreLandmark: 'Wright Town (Near Civic Centre)',
  },
  {
    name: 'Lucknow',
    slug: 'lucknow',
    state: 'Uttar Pradesh',
    pinPrefixes: ['226'],
    aliases: ['lucknow', 'gomti nagar', 'aliganj', 'indira nagar', 'hazratganj', 'ashiyana', 'jankipuram', 'sushant golf city'],
    isSolarSquare: true,
    isExperienceCentre: true,
    experienceCentreLocation: 'Gomti Nagar & Aliganj',
    experienceCentreLandmark: 'Vibhuti Khand, Gomti Nagar Hub',
  },
  {
    name: 'Kanpur',
    slug: 'kanpur',
    state: 'Uttar Pradesh',
    pinPrefixes: ['208'],
    aliases: ['kanpur', 'civil lines', 'swaroop nagar', 'sarvodaya nagar', 'kakadeo', 'shyam nagar', 'kidwai nagar', 'saket nagar'],
    isSolarSquare: true,
    isExperienceCentre: true,
    experienceCentreLocation: 'Sarvodaya Nagar & Civil Lines',
    experienceCentreLandmark: 'Beside PVR Deep Cinema, GT Road',
  },

  // ─── TIER-1 METROS & SOLARSQUARE OPERATIONAL RESIDENTIAL HUBS ───
  {
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    pinPrefixes: ['400'],
    aliases: ['mumbai', 'bombay', 'andheri', 'borivali', 'bandra', 'chembur', 'dadar', 'goregaon', 'malad', 'kandivali', 'powai', 'ghatkopar', 'mulund'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Thane & Navi Mumbai',
    slug: 'thane',
    state: 'Maharashtra',
    pinPrefixes: ['400', '410', '421'],
    aliases: ['thane', 'navi mumbai', 'vashi', 'nerul', 'kharghar', 'panvel', 'kalyan', 'dombivli', 'ghodbunder', 'belapur', 'airoli', 'ulwe'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Bengaluru',
    slug: 'bangalore',
    state: 'Karnataka',
    pinPrefixes: ['560', '562'],
    aliases: ['bengaluru', 'bangalore', 'whitefield', 'hsr', 'indiranagar', 'koramangala', 'electronic city', 'yelahanka', 'bellandur', 'sarjapur', 'jayanagar', 'jp nagar'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    pinPrefixes: ['500', '501'],
    aliases: ['hyderabad', 'secunderabad', 'cyberabad', 'gachibowli', 'hitec', 'madhapur', 'kondapur', 'kukkatpally', 'jubilee hills', 'banjara hills', 'miyapur', 'manikonda'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Delhi',
    slug: 'delhi',
    state: 'Delhi',
    pinPrefixes: ['110'],
    aliases: ['delhi', 'new delhi', 'dwarka', 'rohini', 'vasant kunj', 'saket', 'greater kailash', 'pitampura', 'janakpuri', 'punjabi bagh'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Gurgaon',
    slug: 'gurgaon',
    state: 'Haryana',
    pinPrefixes: ['122'],
    aliases: ['gurgaon', 'gurugram', 'dlf phase', 'sohna road', 'golf course road', 'sector 56', 'sector 57', 'sushant lok'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Noida',
    slug: 'noida',
    state: 'Uttar Pradesh',
    pinPrefixes: ['201'],
    aliases: ['noida', 'greater noida', 'sector 62', 'sector 137', 'sector 150', 'noida expressway', 'crossing republik'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Ghaziabad',
    slug: 'ghaziabad',
    state: 'Uttar Pradesh',
    pinPrefixes: ['201'],
    aliases: ['ghaziabad', 'indirapuram', 'vaishali', 'vasundhara', 'raj nagar', 'raj nagar extension'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Faridabad',
    slug: 'faridabad',
    state: 'Haryana',
    pinPrefixes: ['121'],
    aliases: ['faridabad', 'neharpar', 'greater faridabad', 'sector 15 faridabad', 'sector 21 faridabad', 'surajkund'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat',
    pinPrefixes: ['380', '382'],
    aliases: ['ahmedabad', 'gandhinagar', 'bopal', 'vastrapur', 'maninagar', 'sg highway', 'satellite', 'prahlad nagar', 'thaltej'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Surat',
    slug: 'surat',
    state: 'Gujarat',
    pinPrefixes: ['395', '394'],
    aliases: ['surat', 'adajan', 'vesu', 'varachha', 'piplod', 'pal', 'dumas road', 'katargam'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Vadodara',
    slug: 'vadodara',
    state: 'Gujarat',
    pinPrefixes: ['390'],
    aliases: ['vadodara', 'baroda', 'alkapuri', 'gotri', 'vasna', 'manjalpur', 'karelibaug', 'waghodia road'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    pinPrefixes: ['302', '303'],
    aliases: ['jaipur', 'vaishali nagar', 'mansarovar', 'malviya nagar', 'c scheme', 'jagatpura', 'raja park', 'tonk road'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Aurangabad',
    slug: 'aurangabad',
    state: 'Maharashtra',
    pinPrefixes: ['431'],
    aliases: ['aurangabad', 'chhatrapati sambhajinagar', 'sambhajinagar', 'cidco aurangabad', 'garkheda', 'samarth nagar'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Solapur',
    slug: 'solapur',
    state: 'Maharashtra',
    pinPrefixes: ['413'],
    aliases: ['solapur', 'sholapur', 'hotgi road', 'jule solapur', 'saiful'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Kolhapur',
    slug: 'kolhapur',
    state: 'Maharashtra',
    pinPrefixes: ['416'],
    aliases: ['kolhapur', 'rajarampuri', 'tarabai park', 'shahupuri', 'nagala park'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Varanasi',
    slug: 'varanasi',
    state: 'Uttar Pradesh',
    pinPrefixes: ['221'],
    aliases: ['varanasi', 'banaras', 'kashi', 'sigra', 'bhelupur', 'mahmurganj', 'shivam nagar'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Agra',
    slug: 'agra',
    state: 'Uttar Pradesh',
    pinPrefixes: ['282'],
    aliases: ['agra', 'sanjay place', 'kamla nagar', 'dayalbagh', 'fatehabad road', 'tajganj'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Meerut',
    slug: 'meerut',
    state: 'Uttar Pradesh',
    pinPrefixes: ['250'],
    aliases: ['meerut', 'shastri nagar meerut', 'ganga nagar meerut', 'modipuram'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Bareilly',
    slug: 'bareilly',
    state: 'Uttar Pradesh',
    pinPrefixes: ['243'],
    aliases: ['bareilly', 'civil lines bareilly', 'rajendra nagar bareilly', 'dd puram'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Prayagraj',
    slug: 'prayagraj',
    state: 'Uttar Pradesh',
    pinPrefixes: ['211'],
    aliases: ['prayagraj', 'allahabad', 'civil lines prayagraj', 'george town', 'tagore town'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },
  {
    name: 'Raipur',
    slug: 'raipur',
    state: 'Chhattisgarh',
    pinPrefixes: ['492'],
    aliases: ['raipur', 'shankar nagar', 'samta colony', 'devendra nagar', 'tatibandh', 'naya raipur'],
    isSolarSquare: true,
    isExperienceCentre: false,
  },

  // ─── OTHER HIGH-VALUE METROS IN INDIA ───
  {
    name: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu',
    pinPrefixes: ['600'],
    aliases: ['chennai', 'madras', 'omr', 'anna nagar', 'velachery', 'adyar', 't nagar', 'porur'],
    isSolarSquare: false,
    isExperienceCentre: false,
  },
  {
    name: 'Kolkata',
    slug: 'kolkata',
    state: 'West Bengal',
    pinPrefixes: ['700'],
    aliases: ['kolkata', 'calcutta', 'salt lake', 'new town', 'rajarhat', 'ballygunge', 'alipore'],
    isSolarSquare: false,
    isExperienceCentre: false,
  },
  {
    name: 'Chandigarh Tricity',
    slug: 'chandigarh',
    state: 'Punjab/Haryana',
    pinPrefixes: ['160'],
    aliases: ['chandigarh', 'mohali', 'panchkula', 'zirakpur'],
    isSolarSquare: false,
    isExperienceCentre: false,
  },
  {
    name: 'Coimbatore',
    slug: 'coimbatore',
    state: 'Tamil Nadu',
    pinPrefixes: ['641'],
    aliases: ['coimbatore', 'kovai', 'rs puram', 'peelamedu', 'gandhipuram'],
    isSolarSquare: false,
    isExperienceCentre: false,
  },
];

/** Check if a given city string is a Tier-1 metro hub */
export function isTier1City(rawCity: string | null | undefined): boolean {
  if (!rawCity) return false;
  const lower = rawCity.toLowerCase().trim();

  return TIER1_CITIES.some((metro) =>
    metro.aliases.some((alias) => lower.includes(alias)) ||
    lower.includes(metro.name.toLowerCase()) ||
    lower.includes(metro.slug)
  );
}

/** Check if a 6-digit Indian PIN code belongs to a Tier-1 metro area */
export function isTier1Pincode(rawPin: string | null | undefined): boolean {
  if (!rawPin) return false;
  const clean = rawPin.replace(/\D/g, '').slice(0, 6);
  if (clean.length < 3) return false;

  return TIER1_CITIES.some((metro) =>
    metro.pinPrefixes.some((prefix) => clean.startsWith(prefix))
  );
}

/**
 * Determine if a lead qualifies as Tier-1 based on city name or pincode.
 * Returns true if either the city or PIN code indicates a Tier-1 metro.
 */
export function isTier1Lead(city: string | null | undefined, pincode: string | null | undefined): boolean {
  return isTier1Pincode(pincode) || isTier1City(city);
}

/**
 * Check if the lead is in SolarSquare's direct operational network (31 cities).
 */
export function isSolarSquareLead(city: string | null | undefined, pincode: string | null | undefined): boolean {
  const profile = getSolarProfile(city, pincode);
  return profile?.isSolarSquare ?? false;
}

/**
 * Check if the lead is in one of SolarSquare's 9 flagship Experience Centre cities
 * (Pune, Bhopal, Indore, Nagpur, Nashik, Lucknow, Kanpur, Gwalior, Jabalpur).
 */
export function isExperienceCentreLead(city: string | null | undefined, pincode: string | null | undefined): boolean {
  const profile = getSolarProfile(city, pincode);
  return profile?.isExperienceCentre ?? false;
}

/**
 * Comprehensive solar market and channel partner profile resolver.
 */
export function getSolarProfile(city: string | null | undefined, pincode: string | null | undefined): Tier1CityConfig | null {
  const cleanPin = (pincode ?? '').replace(/\D/g, '').slice(0, 6);
  const cleanCity = (city ?? '').toLowerCase().trim();

  // 1. PIN code prefix match (most accurate for postal boundary)
  if (cleanPin.length >= 3) {
    for (const metro of TIER1_CITIES) {
      if (metro.pinPrefixes.some((prefix) => cleanPin.startsWith(prefix))) {
        return metro;
      }
    }
  }

  // 2. City name / alias match
  if (cleanCity) {
    for (const metro of TIER1_CITIES) {
      if (
        metro.aliases.some((alias) => cleanCity.includes(alias)) ||
        cleanCity.includes(metro.name.toLowerCase()) ||
        cleanCity.includes(metro.slug)
      ) {
        return metro;
      }
    }
  }

  return null;
}

/**
 * Auto-detect city from a 6-digit Indian PIN code.
 * Useful for smart auto-fill and instant qualification in forms.
 */
export function detectCityFromPincode(rawPin: string | null | undefined): {
  name: string;
  slug: string;
  state: string;
  isTier1: boolean;
  isSolarSquare: boolean;
  isExperienceCentre: boolean;
  experienceCentreLocation?: string;
  experienceCentreLandmark?: string;
} | null {
  if (!rawPin) return null;
  const clean = rawPin.replace(/\D/g, '').slice(0, 6);
  if (clean.length < 3) return null;

  for (const metro of TIER1_CITIES) {
    if (metro.pinPrefixes.some((prefix) => clean.startsWith(prefix))) {
      return {
        name: metro.name,
        slug: metro.slug,
        state: metro.state,
        isTier1: true,
        isSolarSquare: metro.isSolarSquare,
        isExperienceCentre: metro.isExperienceCentre,
        experienceCentreLocation: metro.experienceCentreLocation,
        experienceCentreLandmark: metro.experienceCentreLandmark,
      };
    }
  }

  return null;
}
