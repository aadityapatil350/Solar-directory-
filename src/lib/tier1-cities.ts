/**
 * Tier-1 and Top Metro Solar Markets in India
 *
 * Channel partners (e.g. SolarSquare) prioritize residential rooftop installations
 * in high-tariff, high-density metro and Tier-1 urban clusters.
 */

export interface Tier1CityConfig {
  name: string;
  slug: string;
  state: string;
  pinPrefixes: string[];
  aliases: string[];
}

export const TIER1_CITIES: Tier1CityConfig[] = [
  {
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    pinPrefixes: ['411', '412'],
    aliases: ['pune', 'pcmc', 'pimpri', 'chinchwad', 'wakad', 'baner', 'kothrud', 'hadapsar', 'hinjewadi'],
  },
  {
    name: 'Bengaluru',
    slug: 'bangalore',
    state: 'Karnataka',
    pinPrefixes: ['560', '562'],
    aliases: ['bengaluru', 'bangalore', 'whitefield', 'hsr', 'indiranagar', 'koramangala', 'electronic city', 'yelahanka'],
  },
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    pinPrefixes: ['500', '501'],
    aliases: ['hyderabad', 'secunderabad', 'cyberabad', 'gachibowli', 'hitec', 'madhapur', 'kondapur', 'kukkatpally'],
  },
  {
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    pinPrefixes: ['400'],
    aliases: ['mumbai', 'bombay', 'andheri', 'borivali', 'bandra', 'chembur', 'dadar'],
  },
  {
    name: 'Thane & Navi Mumbai',
    slug: 'thane',
    state: 'Maharashtra',
    pinPrefixes: ['400', '410', '421'],
    aliases: ['thane', 'navi mumbai', 'vashi', 'nerul', 'kharghar', 'panvel', 'kalyan', 'dombivli'],
  },
  {
    name: 'Delhi-NCR',
    slug: 'delhi',
    state: 'Delhi',
    pinPrefixes: ['110', '122', '201', '121'],
    aliases: ['delhi', 'new delhi', 'noida', 'greater noida', 'gurgaon', 'gurugram', 'ghaziabad', 'faridabad', 'dwarka', 'rohini'],
  },
  {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat',
    pinPrefixes: ['380', '382'],
    aliases: ['ahmedabad', 'gandhinagar', 'bopal', 'vastrapur', 'maninagar'],
  },
  {
    name: 'Surat',
    slug: 'surat',
    state: 'Gujarat',
    pinPrefixes: ['395', '394'],
    aliases: ['surat', 'adajan', 'vesu', 'varachha'],
  },
  {
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    pinPrefixes: ['302', '303'],
    aliases: ['jaipur', 'vaishali nagar', 'mansarovar', 'malviya nagar'],
  },
  {
    name: 'Nagpur',
    slug: 'nagpur',
    state: 'Maharashtra',
    pinPrefixes: ['440', '441'],
    aliases: ['nagpur', 'dharampeth', 'wardha road'],
  },
  {
    name: 'Lucknow',
    slug: 'lucknow',
    state: 'Uttar Pradesh',
    pinPrefixes: ['226'],
    aliases: ['lucknow', 'gomti nagar', 'aliganj', 'indira nagar'],
  },
  {
    name: 'Indore',
    slug: 'indore',
    state: 'Madhya Pradesh',
    pinPrefixes: ['452'],
    aliases: ['indore', 'vijay nagar', 'palasia'],
  },
  {
    name: 'Bhopal',
    slug: 'bhopal',
    state: 'Madhya Pradesh',
    pinPrefixes: ['462'],
    aliases: ['bhopal', 'arera colony', 'kolar'],
  },
  {
    name: 'Chandigarh Tricity',
    slug: 'chandigarh',
    state: 'Punjab/Haryana',
    pinPrefixes: ['160'],
    aliases: ['chandigarh', 'mohali', 'panchkula', 'zirakpur'],
  },
  {
    name: 'Vadodara',
    slug: 'vadodara',
    state: 'Gujarat',
    pinPrefixes: ['390'],
    aliases: ['vadodara', 'baroda', 'alkapuri'],
  },
  {
    name: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu',
    pinPrefixes: ['600'],
    aliases: ['chennai', 'madras', 'omr', 'anna nagar', 'velachery', 'adyar'],
  },
  {
    name: 'Kolkata',
    slug: 'kolkata',
    state: 'West Bengal',
    pinPrefixes: ['700'],
    aliases: ['kolkata', 'calcutta', 'salt lake', 'new town', 'rajarhat'],
  },
  {
    name: 'Nashik',
    slug: 'nashik',
    state: 'Maharashtra',
    pinPrefixes: ['422'],
    aliases: ['nashik', 'nasik', 'cidco', 'panchavati'],
  },
  {
    name: 'Coimbatore',
    slug: 'coimbatore',
    state: 'Tamil Nadu',
    pinPrefixes: ['641'],
    aliases: ['coimbatore', 'kovai', 'rs puram', 'peelamedu'],
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
 * Auto-detect city from a 6-digit Indian PIN code.
 * Useful for smart auto-fill and instant qualification in forms.
 */
export function detectCityFromPincode(rawPin: string | null | undefined): {
  name: string;
  slug: string;
  state: string;
  isTier1: boolean;
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
      };
    }
  }

  return null;
}
