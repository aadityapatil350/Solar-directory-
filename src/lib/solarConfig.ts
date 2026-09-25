/**
 * Comprehensive Solar & PM Surya Ghar configuration for Indian States & DISCOMs
 * GoSolarIndex Technical Architecture
 */

export interface StateSolarConfig {
  state: string;
  slug: string;
  discoms: string[];
  centralSubsidyMax: number; // PM Surya Ghar cap (₹78,000 for >=3kW)
  stateSubsidyAmount: number; // Additional state top-up subsidy (₹)
  stateSubsidyName?: string;
  stateSubsidyNotes?: string;
  avgSunHoursDaily: number;
  monthlyUnitsPerKw: number;
  avgGridTariffPerUnit: number; // ₹ per kWh
  netMeteringAuthority: string;
  netMeteringApprovalDays: number;
  dcrCompliantMandatory: boolean;
}

export const CENTRAL_SUBSIDY_RATES = {
  // PM Surya Ghar Muft Bijli Yojana standard rates
  oneKw: 30000,
  twoKw: 60000,
  threeKwAndAbove: 78000, // Fixed cap for residential systems >= 3 kW
  costPerKwEstimate: 65000,
  rooftopAreaSqFtPerKw: 100,
};

export function calculateCentralSubsidy(kw: number): number {
  if (kw <= 0) return 0;
  if (kw <= 1) return CENTRAL_SUBSIDY_RATES.oneKw;
  if (kw <= 2) return CENTRAL_SUBSIDY_RATES.twoKw;
  return CENTRAL_SUBSIDY_RATES.threeKwAndAbove;
}

export const STATE_SOLAR_CONFIG: Record<string, StateSolarConfig> = {
  'Maharashtra': {
    state: 'Maharashtra',
    slug: 'maharashtra',
    discoms: ['MSEDCL (Mahavitaran)', 'Adani Electricity Mumbai (AEML)', 'Tata Power Mumbai (TPC)', 'BEST Mumbai'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'MSEDCL Net Metering Direct Credit',
    stateSubsidyNotes: 'MSEDCL facilitates immediate online processing via Mahavitaran Solar Portal',
    avgSunHoursDaily: 5.6,
    monthlyUnitsPerKw: 120,
    avgGridTariffPerUnit: 8.50,
    netMeteringAuthority: 'MSEDCL / MERC',
    netMeteringApprovalDays: 21,
    dcrCompliantMandatory: true,
  },
  'Delhi': {
    state: 'Delhi',
    slug: 'delhi',
    discoms: ['BSES Rajdhani (BRPL)', 'BSES Yamuna (BYPL)', 'Tata Power DDL (TPDDL)', 'NDMC'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 10000, // Generation Based Incentive (GBI) of ₹3/unit up to ~₹2,000-₹3,000/yr or state capital top-up
    stateSubsidyName: 'Delhi Solar Policy GBI (₹3/kWh)',
    stateSubsidyNotes: '₹3 per solar unit generated credited directly to your bank account for 5 years',
    avgSunHoursDaily: 5.3,
    monthlyUnitsPerKw: 120,
    avgGridTariffPerUnit: 7.80,
    netMeteringAuthority: 'DERC / BSES / TPDDL',
    netMeteringApprovalDays: 15,
    dcrCompliantMandatory: true,
  },
  'Uttar Pradesh': {
    state: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    discoms: ['MVVNL (Madhyanchal)', 'PVVNL (Paschimanchal)', 'PuVVNL (Purvanchal)', 'DVVNL (Dakshinanchal)', 'KESCO'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 30000, // UP state subsidy: ₹15,000 for 1kW, ₹30,000 for >=2kW
    stateSubsidyName: 'UPNEDA State Solar Subsidy Top-up',
    stateSubsidyNotes: 'State top-up of ₹15,000 to ₹30,000 credited through UPNEDA portal',
    avgSunHoursDaily: 5.4,
    monthlyUnitsPerKw: 120,
    avgGridTariffPerUnit: 7.50,
    netMeteringAuthority: 'UPPCL / UPNEDA',
    netMeteringApprovalDays: 30,
    dcrCompliantMandatory: true,
  },
  'Gujarat': {
    state: 'Gujarat',
    slug: 'gujarat',
    discoms: ['DGVCL (Dakshin Gujarat)', 'UGVCL (Uttar Gujarat)', 'PGVCL (Paschim Gujarat)', 'MGVCL (Madhya Gujarat)', 'Torrent Power'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 20000,
    stateSubsidyName: 'Surya Gujarat Scheme Integration',
    stateSubsidyNotes: 'Highest solar adoption in India; fast-track DISCOM meter replacement within 14 days',
    avgSunHoursDaily: 6.2,
    monthlyUnitsPerKw: 130,
    avgGridTariffPerUnit: 7.20,
    netMeteringAuthority: 'GERC / GUVNL',
    netMeteringApprovalDays: 14,
    dcrCompliantMandatory: true,
  },
  'Karnataka': {
    state: 'Karnataka',
    slug: 'karnataka',
    discoms: ['BESCOM (Bangalore)', 'MESCOM (Mangalore)', 'HESCOM (Hubli)', 'GESCOM (Gulbarga)', 'CESC (Mysore)'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'KREDL Solar Facilitation',
    stateSubsidyNotes: 'BESCOM provides unified online net metering workflow and bidirectional meter testing',
    avgSunHoursDaily: 5.5,
    monthlyUnitsPerKw: 120,
    avgGridTariffPerUnit: 8.20,
    netMeteringAuthority: 'BESCOM / KERC',
    netMeteringApprovalDays: 20,
    dcrCompliantMandatory: true,
  },
  'Tamil Nadu': {
    state: 'Tamil Nadu',
    slug: 'tamil-nadu',
    discoms: ['TANGEDCO (Tamil Nadu Generation and Distribution Corporation)'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'TEDA Net Feed-in Scheme',
    stateSubsidyNotes: 'Bi-directional net feed-in billing processed directly in bimonthly TANGEDCO cycle',
    avgSunHoursDaily: 5.7,
    monthlyUnitsPerKw: 125,
    avgGridTariffPerUnit: 7.90,
    netMeteringAuthority: 'TANGEDCO / TNERC',
    netMeteringApprovalDays: 25,
    dcrCompliantMandatory: true,
  },
  'Rajasthan': {
    state: 'Rajasthan',
    slug: 'rajasthan',
    discoms: ['JVVNL (Jaipur Vidyut)', 'AVVNL (Ajmer Vidyut)', 'JdVVNL (Jodhpur Vidyut)'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'RRECL Solar Assistance',
    stateSubsidyNotes: 'Highest solar irradiation in India; ideal output exceeding 135 units/kW/month',
    avgSunHoursDaily: 6.4,
    monthlyUnitsPerKw: 135,
    avgGridTariffPerUnit: 7.60,
    netMeteringAuthority: 'RERC / RRECL',
    netMeteringApprovalDays: 21,
    dcrCompliantMandatory: true,
  },
  'Telangana': {
    state: 'Telangana',
    slug: 'telangana',
    discoms: ['TSSPDCL (Southern Power)', 'TSNPDCL (Northern Power)'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'TGREDCO Rooftop Solar Net Metering',
    stateSubsidyNotes: 'Streamlined online application via TSSPDCL consumer portal',
    avgSunHoursDaily: 5.8,
    monthlyUnitsPerKw: 125,
    avgGridTariffPerUnit: 8.00,
    netMeteringAuthority: 'TSERC / TSSPDCL',
    netMeteringApprovalDays: 18,
    dcrCompliantMandatory: true,
  },
  'Andhra Pradesh': {
    state: 'Andhra Pradesh',
    slug: 'andhra-pradesh',
    discoms: ['APEPDCL (Eastern Power)', 'APSPDCL (Southern Power)', 'APCPDCL (Central Power)'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'NREDCAP Net Metering Scheme',
    stateSubsidyNotes: 'Solar generation off-set directly against progressive slab tariffs',
    avgSunHoursDaily: 5.6,
    monthlyUnitsPerKw: 120,
    avgGridTariffPerUnit: 7.70,
    netMeteringAuthority: 'APERC / NREDCAP',
    netMeteringApprovalDays: 25,
    dcrCompliantMandatory: true,
  },
  'Kerala': {
    state: 'Kerala',
    slug: 'kerala',
    discoms: ['KSEB (Kerala State Electricity Board)'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'KSEB Soura Scheme Integration',
    stateSubsidyNotes: 'High grid tariffs make solar payback among the fastest in South India',
    avgSunHoursDaily: 5.2,
    monthlyUnitsPerKw: 115,
    avgGridTariffPerUnit: 8.40,
    netMeteringAuthority: 'KSERC / KSEBL',
    netMeteringApprovalDays: 20,
    dcrCompliantMandatory: true,
  },
  'Haryana': {
    state: 'Haryana',
    slug: 'haryana',
    discoms: ['DHBVN (Dakshin Haryana)', 'UHBVN (Uttar Haryana)'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'HAREDA Rooftop Solar Program',
    stateSubsidyNotes: 'Net metering with gross feed-in option available for residential societies',
    avgSunHoursDaily: 5.5,
    monthlyUnitsPerKw: 120,
    avgGridTariffPerUnit: 7.60,
    netMeteringAuthority: 'HERC / HAREDA',
    netMeteringApprovalDays: 20,
    dcrCompliantMandatory: true,
  },
  'Punjab': {
    state: 'Punjab',
    slug: 'punjab',
    discoms: ['PSPCL (Punjab State Power Corporation)'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'PEDA Solar Net Metering',
    stateSubsidyNotes: 'Zero electricity bill achievable for consumption up to 600 bi-monthly units',
    avgSunHoursDaily: 5.4,
    monthlyUnitsPerKw: 120,
    avgGridTariffPerUnit: 7.80,
    netMeteringAuthority: 'PSERC / PSPCL',
    netMeteringApprovalDays: 28,
    dcrCompliantMandatory: true,
  },
  'Madhya Pradesh': {
    state: 'Madhya Pradesh',
    slug: 'madhya-pradesh',
    discoms: ['MPMKVVCL (Bhopal)', 'MPPKVVCL (Indore)', 'MPPoKVVCL (Jabalpur)'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'MP Urja Vikas Nigam Solar Support',
    stateSubsidyNotes: 'Strong sunshine availability throughout Malwa and Nimar regions',
    avgSunHoursDaily: 5.8,
    monthlyUnitsPerKw: 125,
    avgGridTariffPerUnit: 7.90,
    netMeteringAuthority: 'MPERC / MPUVN',
    netMeteringApprovalDays: 22,
    dcrCompliantMandatory: true,
  },
  'West Bengal': {
    state: 'West Bengal',
    slug: 'west-bengal',
    discoms: ['WBSEDCL (State Electricity)', 'CESC Kolkata'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'WBREDA Rooftop Program',
    stateSubsidyNotes: 'CESC and WBSEDCL support residential net metering for consumer loads >= 1 kW',
    avgSunHoursDaily: 5.0,
    monthlyUnitsPerKw: 115,
    avgGridTariffPerUnit: 8.60,
    netMeteringAuthority: 'WBERC / WBREDA',
    netMeteringApprovalDays: 30,
    dcrCompliantMandatory: true,
  },
  'Odisha': {
    state: 'Odisha',
    slug: 'odisha',
    discoms: ['TPCODL (Central)', 'TPNODL (Northern)', 'TPSODL (Southern)', 'TPWODL (Western)'],
    centralSubsidyMax: 78000,
    stateSubsidyAmount: 0,
    stateSubsidyName: 'OREDA Solar Rooftop Incentive',
    stateSubsidyNotes: 'Tata Power joint venture DISCOMs offer digital single-window portal',
    avgSunHoursDaily: 5.4,
    monthlyUnitsPerKw: 120,
    avgGridTariffPerUnit: 7.40,
    netMeteringAuthority: 'OERC / OREDA',
    netMeteringApprovalDays: 24,
    dcrCompliantMandatory: true,
  },
};

export const DEFAULT_STATE_CONFIG: StateSolarConfig = {
  state: 'India (Standard)',
  slug: 'india',
  discoms: ['Regional State DISCOM / Power Utility'],
  centralSubsidyMax: 78000,
  stateSubsidyAmount: 0,
  stateSubsidyName: 'Central PM Surya Ghar Muft Bijli Yojana',
  stateSubsidyNotes: 'National portal direct benefit transfer into Aadhaar-linked bank account',
  avgSunHoursDaily: 5.5,
  monthlyUnitsPerKw: 120,
  avgGridTariffPerUnit: 8.00,
  netMeteringAuthority: 'State Electricity Regulatory Commission',
  netMeteringApprovalDays: 21,
  dcrCompliantMandatory: true,
};

export function getStateSolarConfig(stateName?: string | null): StateSolarConfig {
  if (!stateName) return DEFAULT_STATE_CONFIG;
  // Case-insensitive lookup
  const clean = stateName.trim().toLowerCase();
  for (const [key, config] of Object.entries(STATE_SOLAR_CONFIG)) {
    if (key.toLowerCase() === clean || config.slug === clean) {
      return config;
    }
  }
  return {
    ...DEFAULT_STATE_CONFIG,
    state: stateName,
    slug: stateName.toLowerCase().replace(/\s+/g, '-'),
  };
}
