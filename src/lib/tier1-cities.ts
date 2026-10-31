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
  experienceCentreHours?: string;
  officeType?: 'hq' | 'experience_centre' | 'regional_office' | 'operational_hub';
  officeAddress?: string;
}

export const TIER1_CITIES: Tier1CityConfig[] = [
  // ─── 1. FLAGSHIP SOLARSQUARE EXPERIENCE CENTRE HUBS ───
  {
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    pinPrefixes: ['411', '412'],
    aliases: ['pune', 'pcmc', 'pimpri', 'chinchwad', 'wakad', 'baner', 'kothrud', 'hadapsar', 'hinjewadi', 'kharadi', 'aundh', 'bavdhan', 'viman nagar'],
    isSolarSquare: true,
    isExperienceCentre: true,
    officeType: 'experience_centre',
    experienceCentreLocation: 'Kharadi & Wakad Experience Centres',
    experienceCentreLandmark: 'Kharadi: Ground Floor, Nyati Plaza, Shop No 43, Thite Nagar | Wakad: Unit No. 13–15, VTP Altitude, Aundh - Ravet BRTS Road',
    experienceCentreHours: 'Open 10:00 AM – 8:00 PM',
  },
  {
    name: 'Nagpur',
    slug: 'nagpur',
    state: 'Maharashtra',
    pinPrefixes: ['440', '441'],
    aliases: ['nagpur', 'sitabuldi', 'ramdas peth', 'dharampeth', 'wardha road', 'manish nagar', 'sadar'],
    isSolarSquare: true,
    isExperienceCentre: true,
    officeType: 'experience_centre',
    experienceCentreLocation: 'Glocal Square Mall, Sitabuldi',
    experienceCentreLandmark: 'Glocal Square Mall showroom holding a fully functional Experience Centre',
    experienceCentreHours: 'Open 10:00 AM – 8:00 PM',
  },
  {
    name: 'Nashik',
    slug: 'nashik',
    state: 'Maharashtra',
    pinPrefixes: ['422'],
    aliases: ['nashik', 'nasik', 'cidco', 'panchavati', 'college road', 'untwadi', 'gangapur road', 'indira nagar'],
    isSolarSquare: true,
    isExperienceCentre: true,
    officeType: 'experience_centre',
    experienceCentreLocation: 'Untwadi & College Road',
    experienceCentreLandmark: 'Designated Experience Centre location, Near City Centre Mall, Sambhaji Chowk',
    experienceCentreHours: 'Open 10:00 AM – 8:00 PM',
  },
  {
    name: 'Bhopal',
    slug: 'bhopal',
    state: 'Madhya Pradesh',
    pinPrefixes: ['462'],
    aliases: ['bhopal', 'arera colony', 'kolar', 'mp nagar', 'tulsi nagar', 'stt nagar', 'south tt nagar', 'shahpura', 'hoshangabad road'],
    isSolarSquare: true,
    isExperienceCentre: true,
    officeType: 'experience_centre',
    experienceCentreLocation: 'South TT Nagar',
    experienceCentreLandmark: 'Ground Floor, Block C, Shrishti C.B.D., South T T Nagar',
    experienceCentreHours: 'Open 10:00 AM – 8:00 PM',
  },
  {
    name: 'Indore',
    slug: 'indore',
    state: 'Madhya Pradesh',
    pinPrefixes: ['452', '453'],
    aliases: ['indore', 'vijay nagar', 'palasia', 'lig square', 'ab road', 'bicholi mardana', 'annapurna', 'sukhlia'],
    isSolarSquare: true,
    isExperienceCentre: true,
    officeType: 'experience_centre',
    experienceCentreLocation: 'LIG Square & Old AB Road',
    experienceCentreLandmark: 'Singapore Business Park, LIG Square, Old AB Road',
    experienceCentreHours: 'Open 10:00 AM – 8:00 PM',
  },
  {
    name: 'Gwalior',
    slug: 'gwalior',
    state: 'Madhya Pradesh',
    pinPrefixes: ['474'],
    aliases: ['gwalior', 'city centre', 'patel nagar', 'lashkar', 'morar', 'thathipur', 'govindpuri'],
    isSolarSquare: true,
    isExperienceCentre: true,
    officeType: 'experience_centre',
    experienceCentreLocation: 'Patel Nagar, City Centre',
    experienceCentreLandmark: 'Krishna Business Centre, Patel Nagar City Centre',
    experienceCentreHours: 'Open 10:00 AM – 8:00 PM',
  },
  {
    name: 'Jabalpur',
    slug: 'jabalpur',
    state: 'Madhya Pradesh',
    pinPrefixes: ['482'],
    aliases: ['jabalpur', 'wright town', 'napier town', 'civil lines', 'vijay nagar jabalpur', 'gorakhpur jabalpur'],
    isSolarSquare: true,
    isExperienceCentre: true,
    officeType: 'experience_centre',
    experienceCentreLocation: 'Wright Town',
    experienceCentreLandmark: 'Shashwat Building, Wright Town',
    experienceCentreHours: 'Open 10:00 AM – 8:00 PM',
  },
  {
    name: 'Lucknow',
    slug: 'lucknow',
    state: 'Uttar Pradesh',
    pinPrefixes: ['226'],
    aliases: ['lucknow', 'gomti nagar', 'aliganj', 'indira nagar', 'hazratganj', 'ashiyana', 'jankipuram', 'sushant golf city'],
    isSolarSquare: true,
    isExperienceCentre: true,
    officeType: 'experience_centre',
    experienceCentreLocation: 'Vishesh Khand, Gomti Nagar',
    experienceCentreLandmark: 'Active localized branch & Experience Centre at Vishesh Khand, Gomti Nagar',
    experienceCentreHours: 'Open 10:00 AM – 8:00 PM',
  },
  {
    name: 'Kanpur',
    slug: 'kanpur',
    state: 'Uttar Pradesh',
    pinPrefixes: ['208'],
    aliases: ['kanpur', 'civil lines', 'swaroop nagar', 'sarvodaya nagar', 'kakadeo', 'shyam nagar', 'kidwai nagar', 'saket nagar', 'juhi kalan'],
    isSolarSquare: true,
    isExperienceCentre: true,
    officeType: 'experience_centre',
    experienceCentreLocation: 'Juhi Kalan, Saket Nagar',
    experienceCentreLandmark: 'Inside Deep Cinema Complex, Juhi Kalan, Saket Nagar',
    experienceCentreHours: 'Open 10:00 AM – 8:00 PM',
  },

  // ─── 2. NATIONAL HEADQUARTERS & CORPORATE REGIONAL HUBS ───
  {
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    pinPrefixes: ['400'],
    aliases: ['mumbai', 'bombay', 'andheri', 'andheri west', 'borivali', 'bandra', 'chembur', 'dadar', 'goregaon', 'malad', 'kandivali', 'powai', 'ghatkopar', 'mulund'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'hq',
    officeAddress: 'National Headquarters (HQ) at Suvidha Square, Andheri West, Mumbai',
  },
  {
    name: 'Bengaluru',
    slug: 'bangalore',
    state: 'Karnataka',
    pinPrefixes: ['560', '562'],
    aliases: ['bengaluru', 'bangalore', 'indiranagar', 'whitefield', 'hsr', 'koramangala', 'electronic city', 'yelahanka', 'bellandur', 'sarjapur', 'jayanagar', 'jp nagar'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'regional_office',
    officeAddress: 'Regional Corporate Office at HAL 2nd Stage, Indiranagar, Bengaluru',
  },
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    pinPrefixes: ['500', '501'],
    aliases: ['hyderabad', 'secunderabad', 'gachibowli', 'cyberabad', 'hitec', 'madhapur', 'kondapur', 'kukkatpally', 'jubilee hills', 'banjara hills', 'miyapur', 'manikonda'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'regional_office',
    officeAddress: 'Regional Infrastructure Office at Vasavi Sky City, Gachibowli, Hyderabad',
  },
  {
    name: 'Delhi',
    slug: 'delhi',
    state: 'Delhi',
    pinPrefixes: ['110'],
    aliases: ['delhi', 'new delhi', 'dwarka', 'rohini', 'vasant kunj', 'saket', 'greater kailash', 'pitampura', 'janakpuri', 'punjabi bagh'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'regional_office',
    officeAddress: 'Corporate Footprint Office, New Delhi',
  },
  {
    name: 'Gurgaon',
    slug: 'gurgaon',
    state: 'Haryana',
    pinPrefixes: ['122'],
    aliases: ['gurgaon', 'gurugram', 'unitech cyber park', 'sector 39', 'dlf phase', 'sohna road', 'golf course road', 'sector 56', 'sector 57', 'sushant lok'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'regional_office',
    officeAddress: 'Unitech Cyber Park, Sector 39, Gurugram',
  },
  {
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    pinPrefixes: ['302', '303'],
    aliases: ['jaipur', 'malviya nagar', 'vaishali nagar', 'mansarovar', 'c scheme', 'jagatpura', 'raja park', 'tonk road'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'regional_office',
    officeAddress: 'Main Regional Branch Office at Malviya Nagar, Jaipur',
  },

  // ─── 3. ACTIVE OPERATIONAL SERVICE ZONES & HUBS ───
  // Maharashtra
  {
    name: 'Thane',
    slug: 'thane',
    state: 'Maharashtra',
    pinPrefixes: ['400', '421'],
    aliases: ['thane', 'ghodbunder', 'majiwada', 'naupada', 'kalyan', 'dombivli'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Navi Mumbai',
    slug: 'navi-mumbai',
    state: 'Maharashtra',
    pinPrefixes: ['400', '410'],
    aliases: ['navi mumbai', 'vashi', 'nerul', 'kharghar', 'panvel', 'belapur', 'airoli', 'ulwe', 'seawoods', 'kopar khairane', 'ghansoli'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Chhatrapati Sambhajinagar',
    slug: 'aurangabad',
    state: 'Maharashtra',
    pinPrefixes: ['431'],
    aliases: ['aurangabad', 'chhatrapati sambhajinagar', 'sambhajinagar', 'cidco aurangabad', 'garkheda', 'samarth nagar'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Amravati',
    slug: 'amravati',
    state: 'Maharashtra',
    pinPrefixes: ['444'],
    aliases: ['amravati', 'badnera', 'gadge nagar', 'rajasthan bhawan'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Kolhapur',
    slug: 'kolhapur',
    state: 'Maharashtra',
    pinPrefixes: ['416'],
    aliases: ['kolhapur', 'rajarampuri', 'tarabai park', 'shahupuri', 'nagala park'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Jalgaon',
    slug: 'jalgaon',
    state: 'Maharashtra',
    pinPrefixes: ['425'],
    aliases: ['jalgaon', 'midc jalgaon', 'ring road jalgaon', 'shani peth'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Solapur',
    slug: 'solapur',
    state: 'Maharashtra',
    pinPrefixes: ['413'],
    aliases: ['solapur', 'sholapur', 'hotgi road', 'jule solapur', 'saiful'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },

  // Uttar Pradesh & Delhi NCR
  {
    name: 'Noida',
    slug: 'noida',
    state: 'Uttar Pradesh',
    pinPrefixes: ['201'],
    aliases: ['noida', 'greater noida', 'sector 62', 'sector 137', 'sector 150', 'noida expressway', 'crossing republik'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Ghaziabad',
    slug: 'ghaziabad',
    state: 'Uttar Pradesh',
    pinPrefixes: ['201'],
    aliases: ['ghaziabad', 'indirapuram', 'vaishali', 'vasundhara', 'raj nagar', 'raj nagar extension'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Faridabad',
    slug: 'faridabad',
    state: 'Haryana',
    pinPrefixes: ['121'],
    aliases: ['faridabad', 'neharpar', 'greater faridabad', 'sector 15 faridabad', 'sector 21 faridabad', 'surajkund'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Varanasi',
    slug: 'varanasi',
    state: 'Uttar Pradesh',
    pinPrefixes: ['221'],
    aliases: ['varanasi', 'banaras', 'kashi', 'sigra', 'bhelupur', 'mahmurganj', 'shivam nagar'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },

  // Gujarat
  {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat',
    pinPrefixes: ['380', '382'],
    aliases: ['ahmedabad', 'bopal', 'vastrapur', 'maninagar', 'sg highway', 'satellite', 'prahlad nagar', 'thaltej'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'regional_office',
    officeAddress: 'Central regional hub covering surrounding jurisdictions, Ahmedabad',
  },
  {
    name: 'Surat',
    slug: 'surat',
    state: 'Gujarat',
    pinPrefixes: ['395', '394'],
    aliases: ['surat', 'adajan', 'vesu', 'varachha', 'piplod', 'pal', 'dumas road', 'katargam'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Vadodara',
    slug: 'vadodara',
    state: 'Gujarat',
    pinPrefixes: ['390'],
    aliases: ['vadodara', 'baroda', 'alkapuri', 'gotri', 'vasna', 'manjalpur', 'karelibaug', 'waghodia road'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Anand',
    slug: 'anand',
    state: 'Gujarat',
    pinPrefixes: ['388'],
    aliases: ['anand', 'vidyanagar', 'vallabh vidyanagar'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Gandhinagar',
    slug: 'gandhinagar',
    state: 'Gujarat',
    pinPrefixes: ['382'],
    aliases: ['gandhinagar', 'kudasan', 'sargasan', 'infocity', 'raysan'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },

  // Rajasthan
  {
    name: 'Kota',
    slug: 'kota',
    state: 'Rajasthan',
    pinPrefixes: ['324'],
    aliases: ['kota', 'talwandi', 'vigyan nagar', 'dadabari', 'mahaveer nagar'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Jodhpur',
    slug: 'jodhpur',
    state: 'Rajasthan',
    pinPrefixes: ['342'],
    aliases: ['jodhpur', 'shastri nagar jodhpur', 'sardarpura', 'paota'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Ajmer',
    slug: 'ajmer',
    state: 'Rajasthan',
    pinPrefixes: ['305'],
    aliases: ['ajmer', 'vaishali nagar ajmer', 'civil lines ajmer'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },

  // Karnataka & South
  {
    name: 'Mysuru',
    slug: 'mysore',
    state: 'Karnataka',
    pinPrefixes: ['570'],
    aliases: ['mysuru', 'mysore', 'vijayanagar mysore', 'jayalakshmipuram', 'saraswathipuram', 'kuvempunagar', 'gokulam'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
  },
  {
    name: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu',
    pinPrefixes: ['600'],
    aliases: ['chennai', 'madras', 'omr', 'anna nagar', 'velachery', 'adyar', 't nagar', 'porur'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
    officeAddress: 'Core operational setup handling Chennai and neighbouring municipalities',
  },
  {
    name: 'Raipur',
    slug: 'raipur',
    state: 'Chhattisgarh',
    pinPrefixes: ['492'],
    aliases: ['raipur', 'shankar nagar', 'samta colony', 'devendra nagar', 'tatibandh', 'naya raipur'],
    isSolarSquare: true,
    isExperienceCentre: false,
    officeType: 'operational_hub',
    officeAddress: 'Regional service cluster for Chhattisgarh deployments',
  },

  // Other Major Metros
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
  experienceCentreHours?: string;
  officeType?: 'hq' | 'experience_centre' | 'regional_office' | 'operational_hub';
  officeAddress?: string;
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
        experienceCentreHours: metro.experienceCentreHours,
        officeType: metro.officeType,
        officeAddress: metro.officeAddress,
      };
    }
  }

  return null;
}
