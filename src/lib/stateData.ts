/**
 * State-specific data for solar installations in top Indian states
 */

export interface StateInfo {
  state: string;
  topCities: string[];
  discoms: string[];
  solarPotential: string;
  avgCost3kW: string;
  avgCost5kW: string;
  subsidyScheme: string;
  highlights: string[];
}

export const stateSpecificData: Record<string, StateInfo> = {
  'maharashtra': {
    state: 'Maharashtra',
    topCities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane'],
    discoms: ['MSEDCL', 'Adani Electricity Mumbai', 'BEST Mumbai', 'Tata Power Mumbai'],
    solarPotential: '5.5-6 peak sun hours daily',
    avgCost3kW: '₹42,000 - ₹80,000',
    avgCost5kW: '₹70,000 - ₹1,30,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000 central subsidy) + MSEDCL net metering',
    highlights: [
      'Second largest state economy with high solar adoption',
      'MSEDCL streamlined net metering process (15-30 days)',
      'Strong government support for renewable energy',
      'Mumbai, Pune among top solar markets in India'
    ]
  },
  'karnataka': {
    state: 'Karnataka',
    topCities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
    discoms: ['BESCOM', 'GESCOM', 'HESCOM', 'MESCOM', 'CHESCOM'],
    solarPotential: '5-6 peak sun hours daily',
    avgCost3kW: '₹40,000 - ₹72,000',
    avgCost5kW: '₹65,000 - ₹1,20,000',
    subsidyScheme: 'PM Surya Ghar Yojana + Karnataka Solar Policy incentives',
    highlights: [
      'IT hub with highest tech-savvy solar adoption',
      'BESCOM offers fastest net metering approvals',
      'State ranks #4 in installed solar capacity',
      'Lowest installation costs in South India'
    ]
  },
  'gujarat': {
    state: 'Gujarat',
    topCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    discoms: ['DGVCL', 'UGVCL', 'PGVCL', 'MGVCL', 'Torrent Power'],
    solarPotential: '6-6.5 peak sun hours daily',
    avgCost3kW: '₹36,000 - ₹68,000',
    avgCost5kW: '₹60,000 - ₹1,12,000',
    subsidyScheme: 'SURYA Gujarat + PM Surya Ghar Yojana (₹78,000)',
    highlights: [
      'India\'s solar capital with 17+ GW installed capacity',
      'Lowest solar installation costs nationwide',
      'Excellent solar irradiation (highest in India)',
      'State government highly supportive of solar'
    ]
  },
  'rajasthan': {
    state: 'Rajasthan',
    topCities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
    discoms: ['JVVNL', 'AVVNL', 'JdVVNL'],
    solarPotential: '6-6.5 peak sun hours daily',
    avgCost3kW: '₹38,000 - ₹70,000',
    avgCost5kW: '₹62,000 - ₹1,16,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000) + Rajasthan Solar Policy',
    highlights: [
      'Highest solar potential in India (Thar Desert)',
      'Ranks #1 in installed solar capacity (25+ GW)',
      'Excellent solar irradiation year-round',
      'Low installation costs due to abundant sunlight'
    ]
  },
  'tamil nadu': {
    state: 'Tamil Nadu',
    topCities: ['Chennai', 'Coimbatore', 'Madurai', 'Trichy'],
    discoms: ['TANGEDCO'],
    solarPotential: '5.5-6 peak sun hours daily',
    avgCost3kW: '₹42,000 - ₹74,000',
    avgCost5kW: '₹68,000 - ₹1,22,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000 central subsidy)',
    highlights: [
      'Ranks #2 in solar capacity in South India',
      'TANGEDCO net metering widely adopted',
      'High solar irradiation year-round',
      'Strong installer network and competitive pricing'
    ]
  },
  'delhi': {
    state: 'Delhi',
    topCities: ['New Delhi', 'South Delhi', 'North Delhi', 'East Delhi'],
    discoms: ['BSES Rajdhani', 'BSES Yamuna', 'Tata Power DDL'],
    solarPotential: '5-5.5 peak sun hours daily',
    avgCost3kW: '₹42,000 - ₹75,000',
    avgCost5kW: '₹70,000 - ₹1,25,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000) + Delhi solar policy incentives',
    highlights: [
      'Additional state-level incentives available',
      'Net metering process streamlined across DISCOMs',
      'High electricity tariffs make solar cost-effective',
      'Growing adoption in residential sectors'
    ]
  },
  'uttar pradesh': {
    state: 'Uttar Pradesh',
    topCities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Noida', 'Ghaziabad'],
    discoms: ['PVVNL', 'DVVNL', 'MVVNL', 'PuVVNL', 'UPPCL'],
    solarPotential: '5-5.5 peak sun hours daily',
    avgCost3kW: '₹40,000 - ₹75,000',
    avgCost5kW: '₹65,000 - ₹1,24,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000 central subsidy)',
    highlights: [
      'Largest state by population with growing solar market',
      'UPPCL offers net metering facilities',
      'Government actively promoting solar adoption',
      'Competitive pricing due to large installer network'
    ]
  },
  'telangana': {
    state: 'Telangana',
    topCities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
    discoms: ['TSSPDCL', 'TSNPDCL'],
    solarPotential: '5.5-6 peak sun hours daily',
    avgCost3kW: '₹38,000 - ₹70,000',
    avgCost5kW: '₹62,000 - ₹1,15,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000) + Telangana Solar Policy',
    highlights: [
      'Excellent solar irradiation year-round',
      'State government promotes renewable energy',
      'Competitive market with low installation costs',
      'Fast net metering approvals from TSDISCOMs'
    ]
  },
  'andhra pradesh': {
    state: 'Andhra Pradesh',
    topCities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'],
    discoms: ['APEPDCL', 'APSPDCL'],
    solarPotential: '5.5-6 peak sun hours daily',
    avgCost3kW: '₹40,000 - ₹72,000',
    avgCost5kW: '₹65,000 - ₹1,19,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000 central subsidy)',
    highlights: [
      'High solar potential with coastal sunshine',
      'APDISCOMs actively support net metering',
      'Growing solar market in tier-2 cities',
      'Competitive installation costs'
    ]
  },
  'kerala': {
    state: 'Kerala',
    topCities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
    discoms: ['KSEB'],
    solarPotential: '5-5.5 peak sun hours daily',
    avgCost3kW: '₹44,000 - ₹76,000',
    avgCost5kW: '₹72,000 - ₹1,26,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000) + KSEB Soura scheme',
    highlights: [
      'KSEB Soura scheme provides additional state benefits',
      'High electricity tariffs make solar attractive',
      'Monsoon season reduces but doesn\'t eliminate solar generation',
      'Strong residential solar adoption'
    ]
  },
  'west bengal': {
    state: 'West Bengal',
    topCities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
    discoms: ['CESC', 'WBSEDCL'],
    solarPotential: '4.5-5 peak sun hours daily',
    avgCost3kW: '₹44,000 - ₹78,000',
    avgCost5kW: '₹72,000 - ₹1,28,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000 central subsidy)',
    highlights: [
      'Growing solar market in Eastern India',
      'CESC and WBSEDCL offer net metering',
      'Government push for renewable energy',
      'Kolkata metro area leading solar adoption'
    ]
  },
  'madhya pradesh': {
    state: 'Madhya Pradesh',
    topCities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
    discoms: ['MPCZ'],
    solarPotential: '5.5-6 peak sun hours daily',
    avgCost3kW: '₹40,000 - ₹72,000',
    avgCost5kW: '₹65,000 - ₹1,19,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000) + MP Solar Policy',
    highlights: [
      'Central India with excellent solar irradiation',
      'MPCZ streamlined net metering process',
      'State government highly supportive',
      'Low installation costs due to competition'
    ]
  },
  'haryana': {
    state: 'Haryana',
    topCities: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal'],
    discoms: ['DHBVN', 'UHBVN'],
    solarPotential: '5.5-6 peak sun hours daily',
    avgCost3kW: '₹42,000 - ₹74,000',
    avgCost5kW: '₹68,000 - ₹1,22,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000) + Haryana Solar Policy',
    highlights: [
      'High solar potential with clear skies',
      'DHBVN and UHBVN offer efficient net metering',
      'NCR region (Gurugram, Faridabad) has mature market',
      'Good government support for solar'
    ]
  },
  'punjab': {
    state: 'Punjab',
    topCities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
    discoms: ['PSPCL'],
    solarPotential: '5.5-6 peak sun hours daily',
    avgCost3kW: '₹40,000 - ₹73,000',
    avgCost5kW: '₹66,000 - ₹1,21,000',
    subsidyScheme: 'PM Surya Ghar Yojana (₹78,000) + Punjab Renewable Energy Policy',
    highlights: [
      'Agricultural state with high electricity consumption',
      'PSPCL actively promotes solar for farmers',
      'Excellent solar irradiation',
      'Government subsidies for agricultural solar pumps'
    ]
  },
};

/**
 * Generate state-specific "About Solar" description
 */
export function getStateDescription(state: string): string {
  const stateInfo = stateSpecificData[state.toLowerCase()];

  if (!stateInfo) {
    return `${state} offers excellent solar potential with abundant sunshine throughout the year. Installing solar panels in ${state} can help you reduce electricity bills significantly while contributing to a greener environment. The state government offers various subsidies and incentives through PM Surya Ghar Yojana, making solar installation more affordable. Browse our directory of verified solar installers in ${state} to get free quotes and compare prices.`;
  }

  return `${state} receives ${stateInfo.solarPotential} of sunlight, making it ideal for solar installations. A typical 3kW residential system costs ${stateInfo.avgCost3kW} after PM Surya Ghar subsidy, while a 5kW system ranges from ${stateInfo.avgCost5kW}. Major cities like ${stateInfo.topCities.slice(0, 4).join(', ')} have well-established solar markets with competitive pricing. The state is served by ${stateInfo.discoms.length} major DISCOMs (${stateInfo.discoms.slice(0, 2).join(', ')}${stateInfo.discoms.length > 2 ? ' and others' : ''}) that facilitate net metering connections. ${stateInfo.highlights[0]} ${state} homeowners can claim up to ₹78,000 central government subsidy under ${stateInfo.subsidyScheme}. Browse our directory of ${stateInfo.topCities.length}+ cities across ${state} to find verified solar installers, compare quotes, and switch to solar energy today.`;
}

export interface StateFAQ {
  question: string;
  answer: string;
}

export function getStateFAQs(state: string): StateFAQ[] {
  const stateInfo = stateSpecificData[state.toLowerCase()];

  return [
    {
      question: `How much does solar installation cost in ${state} in 2026?`,
      answer: stateInfo
        ? `In ${state}, a 3kW residential solar system costs ${stateInfo.avgCost3kW} on average in 2026. After applying the PM Surya Ghar Yojana subsidy of up to ₹78,000, your net cost reduces to approximately ₹1.2L–₹1.8L. A 5kW system ranges from ${stateInfo.avgCost5kW}. ${stateInfo.highlights[0]} Costs vary by city — ${stateInfo.topCities.slice(0, 3).join(', ')} typically have competitive pricing due to mature markets. Get free quotes from verified installers in your city to compare exact costs.`
        : `In ${state}, solar installation costs typically range from ₹40,000 to ₹80,000 for a 3kW system in 2026. With PM Surya Ghar Yojana subsidy of up to ₹78,000, your net investment reduces to ₹1.2L–₹1.8L. A 5kW system costs ₹65,000–₹1,30,000 before subsidy. Contact verified installers for accurate quotes based on your requirements.`
    },
    {
      question: `Which DISCOM handles net metering in ${state}?`,
      answer: stateInfo
        ? `${state} is served by ${stateInfo.discoms.length === 1 ? stateInfo.discoms[0] : `${stateInfo.discoms.length} major DISCOMs: ${stateInfo.discoms.join(', ')}`}. After installing solar panels, you need to apply for net metering with your local DISCOM. The process typically takes 15-45 days depending on the DISCOM and city. You'll need: installation completion certificate, DISCOM application form, building NOC, and technical drawings. ${stateInfo.highlights.find(h => h.includes('net metering')) || stateInfo.highlights[1]} Our verified installers handle all paperwork and DISCOM coordination.`
        : `Net metering in ${state} is managed by your local electricity distribution company (DISCOM). After installation, you apply for a bi-directional meter that tracks both consumption and export. The approval process takes 2-6 weeks. Required documents include: installation certificate, DISCOM application, and building approvals. Your installer will handle all paperwork and coordination with the DISCOM.`
    },
    {
      question: `Is PM Surya Ghar subsidy available in ${state}?`,
      answer: stateInfo
        ? `Yes! PM Surya Ghar Yojana subsidy is fully available in ${state}. You can claim up to ₹78,000 central government subsidy (₹30,000 for 1-2kW, ₹60,000 for 2-3kW, and ₹78,000 for 3kW+). ${stateInfo.subsidyScheme}. Applications are processed through your local DISCOM (${stateInfo.discoms[0]} for most areas). The subsidy is credited directly to your bank account after installation and DISCOM inspection. Our verified installers help with documentation, subsidy application, and follow-ups to ensure you receive the full amount.`
        : `Yes! PM Surya Ghar Yojana subsidy is available across all states including ${state}. You can claim up to ₹78,000 central government subsidy. The subsidy is processed through your local DISCOM after installation. Our verified installers assist with all documentation and follow-up to ensure you receive the subsidy.`
    },
    {
      question: `Which cities in ${state} have the best solar installers?`,
      answer: stateInfo
        ? `The best solar installers in ${state} are found in major cities like ${stateInfo.topCities.slice(0, 4).join(', ')}. These cities have mature solar markets with MNRE-certified installers, competitive pricing, and streamlined DISCOM processes. ${stateInfo.topCities[0]} leads with the highest number of verified installers. GoSolarIndex lists only MNRE-certified, verified installers with proven track records. Filter by city, check ratings and reviews, and compare quotes from multiple installers before choosing. All installers on our platform comply with ${stateInfo.discoms[0]} net metering requirements.`
        : `The best solar installers in ${state} are typically found in major urban centers with established solar markets. GoSolarIndex lists only MNRE-certified, verified installers. Check ratings, reviews, and compare quotes from multiple installers in your city before deciding.`
    },
    {
      question: `What is the solar potential of ${state}?`,
      answer: stateInfo
        ? `${state} has excellent solar potential with ${stateInfo.solarPotential} of peak sunlight. ${stateInfo.highlights[0]} ${stateInfo.highlights[2] || stateInfo.highlights[1]} This makes ${state} ideal for rooftop solar installations. A typical 3kW system generates 12-15 units per day, covering 70-100% of average household consumption. ${stateInfo.topCities[0]} and ${stateInfo.topCities[1]} are among the best cities for solar in ${state}.`
        : `${state} receives good solar irradiation making it suitable for rooftop solar. Most areas receive 5-6 hours of peak sunlight daily. A 3kW system typically generates 12-15 units per day, sufficient for average household needs. Contact local installers to assess your specific location's solar potential.`
    },
    {
      question: `How long does it take to install solar in ${state}?`,
      answer: stateInfo
        ? `Solar installation in ${state} typically takes 3-6 weeks from start to finish. Timeline breakdown: (1) Site survey and design: 3-5 days, (2) ${stateInfo.discoms[0]} application and approval: 7-15 days, (3) Installation work: 1-3 days, (4) Inspection and meter installation: 7-15 days. ${stateInfo.highlights.find(h => h.includes('approval') || h.includes('process')) || ''} Our verified installers in ${state} expedite the process and handle all paperwork. Choose installers with good ${stateInfo.discoms[0]} relationships for faster approvals.`
        : `Solar installation in ${state} takes 3-6 weeks on average. This includes DISCOM approvals (2-3 weeks), installation work (1-3 days), and final inspection (1-2 weeks). Timeline varies by DISCOM and city. Experienced installers can expedite the process through established relationships with local DISCOMs.`
    }
  ];
}
