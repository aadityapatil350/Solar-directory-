/**
 * City-specific data for solar installations in top Indian cities
 */

export interface CityInfo {
  city: string;
  state: string;
  discoms: string[];
  avgCost3kW: string;
  avgCost5kW: string;
  topAreas: string[];
  subsidyInfo: string;
  highlights: string[];
}

export const citySpecificData: Record<string, CityInfo> = {
  'pune': {
    city: 'Pune',
    state: 'Maharashtra',
    discoms: ['MSEDCL'],
    avgCost3kW: '₹45,000 - ₹80,000',
    avgCost5kW: '₹75,000 - ₹1,30,000',
    topAreas: ['Kothrud', 'Baner', 'Wakad', 'Hadapsar', 'Viman Nagar', 'Koregaon Park', 'Aundh', 'Pimpri-Chinchwad'],
    subsidyInfo: 'PM Surya Ghar Yojana provides up to ₹78,000 subsidy for residential installations',
    highlights: [
      'MSEDCL net metering approval within 15-30 days',
      'Average 5.5-6 hours of peak sunlight daily',
      'Strong government support for solar adoption',
      'Net metering policies favorable for home installations'
    ]
  },
  'mumbai': {
    city: 'Mumbai',
    state: 'Maharashtra',
    discoms: ['Adani Electricity', 'BEST', 'Tata Power'],
    avgCost3kW: '₹50,000 - ₹85,000',
    avgCost5kW: '₹80,000 - ₹1,40,000',
    topAreas: ['Andheri', 'Borivali', 'Thane', 'Navi Mumbai', 'Powai', 'Bandra', 'Goregaon', 'Malad'],
    subsidyInfo: 'Up to ₹78,000 subsidy available under PM Surya Ghar Yojana',
    highlights: [
      'Three major DISCOMs serving different areas',
      'High electricity tariffs make solar very cost-effective',
      'Average payback period of 3-5 years',
      'Space constraints lead to premium on efficient panels'
    ]
  },
  'delhi': {
    city: 'Delhi',
    state: 'Delhi',
    discoms: ['BSES Rajdhani', 'BSES Yamuna', 'Tata Power DDL'],
    avgCost3kW: '₹42,000 - ₹75,000',
    avgCost5kW: '₹70,000 - ₹1,25,000',
    topAreas: ['Dwarka', 'Rohini', 'Vasant Kunj', 'Saket', 'Greater Kailash', 'Punjabi Bagh', 'Janakpuri', 'Nehru Place'],
    subsidyInfo: 'Central subsidy up to ₹78,000 + Additional Delhi government incentives',
    highlights: [
      'Additional state-level incentives available',
      'Net metering process streamlined across all DISCOMs',
      'Average 5-5.5 hours peak sunlight',
      'Growing adoption in residential sectors'
    ]
  },
  'bangalore': {
    city: 'Bangalore',
    state: 'Karnataka',
    discoms: ['BESCOM'],
    avgCost3kW: '₹40,000 - ₹72,000',
    avgCost5kW: '₹65,000 - ₹1,20,000',
    topAreas: ['Whitefield', 'Electronic City', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Marathahalli', 'Sarjapur', 'Bannerghatta'],
    subsidyInfo: 'PM Surya Ghar subsidy up to ₹78,000 available',
    highlights: [
      'BESCOM offers smooth net metering process',
      'Karnataka is a solar-friendly state with good policies',
      'Average 5-6 hours of peak sunlight',
      'IT hub with high solar adoption rate'
    ]
  },
  'hyderabad': {
    city: 'Hyderabad',
    state: 'Telangana',
    discoms: ['TSSPDCL', 'TSNPDCL'],
    avgCost3kW: '₹38,000 - ₹70,000',
    avgCost5kW: '₹62,000 - ₹1,15,000',
    topAreas: ['Gachibowli', 'Madhapur', 'Banjara Hills', 'Jubilee Hills', 'Kompally', 'Miyapur', 'Kondapur', 'Kukatpally'],
    subsidyInfo: 'Central subsidy of up to ₹78,000 under PM Surya Ghar Yojana',
    highlights: [
      'Excellent solar irradiation (5.5-6 hours peak sunlight)',
      'State government promotes solar installations',
      'Competitive market keeps costs low',
      'Fast net metering approvals'
    ]
  },
  'chennai': {
    city: 'Chennai',
    state: 'Tamil Nadu',
    discoms: ['TANGEDCO'],
    avgCost3kW: '₹42,000 - ₹74,000',
    avgCost5kW: '₹68,000 - ₹1,22,000',
    topAreas: ['Anna Nagar', 'Velachery', 'OMR', 'ECR', 'Adyar', 'T Nagar', 'Porur', 'Ambattur'],
    subsidyInfo: 'PM Surya Ghar Yojana offers up to ₹78,000 subsidy',
    highlights: [
      'TANGEDCO net metering widely adopted',
      'Tamil Nadu leads in solar capacity in South India',
      'High solar irradiation year-round',
      'Strong installer network and competitive pricing'
    ]
  },
  'kolkata': {
    city: 'Kolkata',
    state: 'West Bengal',
    discoms: ['CESC', 'WBSEDCL'],
    avgCost3kW: '₹44,000 - ₹78,000',
    avgCost5kW: '₹72,000 - ₹1,28,000',
    topAreas: ['Salt Lake', 'New Town', 'Rajarhat', 'Behala', 'Alipore', 'Ballygunge', 'Jadavpur', 'Howrah'],
    subsidyInfo: 'Central government subsidy up to ₹78,000 available',
    highlights: [
      'Growing solar market in Eastern India',
      'CESC and WBSEDCL offer net metering',
      'Average 4.5-5 hours of peak sunlight',
      'Government push for renewable energy adoption'
    ]
  },
  'ahmedabad': {
    city: 'Ahmedabad',
    state: 'Gujarat',
    discoms: ['PGVCL', 'DGVCL', 'Torrent Power'],
    avgCost3kW: '₹36,000 - ₹68,000',
    avgCost5kW: '₹60,000 - ₹1,12,000',
    topAreas: ['SG Highway', 'Satellite', 'Bopal', 'Vastrapur', 'Chandkheda', 'Naroda', 'Maninagar', 'Ghatlodia'],
    subsidyInfo: 'PM Surya Ghar subsidy up to ₹78,000 + Gujarat state incentives',
    highlights: [
      'Gujarat is India\'s solar capital',
      'Excellent solar irradiation (6-6.5 hours peak)',
      'Very competitive pricing due to mature market',
      'State government highly supportive of solar'
    ]
  },
  'jaipur': {
    city: 'Jaipur',
    state: 'Rajasthan',
    discoms: ['JVVNL'],
    avgCost3kW: '₹38,000 - ₹70,000',
    avgCost5kW: '₹62,000 - ₹1,16,000',
    topAreas: ['Vaishali Nagar', 'Mansarovar', 'Malviya Nagar', 'C Scheme', 'Jagatpura', 'Sitapura', 'Murlipura', 'Tonk Road'],
    subsidyInfo: 'Central subsidy up to ₹78,000 under PM Surya Ghar Yojana',
    highlights: [
      'Rajasthan has highest solar potential in India',
      'Excellent solar irradiation (6-6.5 hours peak)',
      'JVVNL actively promotes solar installations',
      'Very low costs due to abundant sunlight'
    ]
  },
  'lucknow': {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    discoms: ['PVVNL'],
    avgCost3kW: '₹42,000 - ₹76,000',
    avgCost5kW: '₹68,000 - ₹1,24,000',
    topAreas: ['Gomti Nagar', 'Hazratganj', 'Aliganj', 'Indira Nagar', 'Alambagh', 'Vikas Nagar', 'Mahanagar', 'Chinhat'],
    subsidyInfo: 'PM Surya Ghar Yojana provides subsidy up to ₹78,000',
    highlights: [
      'Growing solar market in UP',
      'PVVNL offers net metering facilities',
      'Average 5-5.5 hours of peak sunlight',
      'State government encouraging solar adoption'
    ]
  }
};

export interface CityFAQ {
  question: string;
  answer: string;
}

export function getCityFAQs(city: string, state: string): CityFAQ[] {
  const cityInfo = citySpecificData[city.toLowerCase()];

  return [
    {
      question: `How much does solar installation cost in ${city}?`,
      answer: cityInfo
        ? `In ${city}, a 3kW residential solar system costs ${cityInfo.avgCost3kW} on average, while a 5kW system ranges from ${cityInfo.avgCost5kW}. Costs vary based on panel brand, inverter type, and installation complexity. With PM Surya Ghar Yojana subsidy of up to ₹78,000, your net cost reduces significantly. Most ${city} homeowners recover their investment in 3-5 years through electricity bill savings.`
        : `In ${city}, solar installation costs typically range from ₹40,000 to ₹80,000 for a 3kW system. With PM Surya Ghar Yojana subsidy of up to ₹78,000, your net investment reduces significantly. Contact verified installers for accurate quotes based on your requirements.`
    },
    {
      question: `Which solar companies are verified in ${city}?`,
      answer: `GoSolarIndex lists only verified and MNRE-certified solar installers in ${city}. All companies on our platform have been background-checked, customer reviews are authentic, and they comply with ${state} DISCOM net metering requirements. Look for the "Verified" badge on listing pages. You can filter by rating, reviews, and featured status to find the best installer for your needs.`
    },
    {
      question: `Is PM Surya Ghar subsidy available in ${city}?`,
      answer: `Yes! PM Surya Ghar Yojana subsidy is available throughout ${city}, ${state}. You can get up to ₹78,000 subsidy (₹30,000 for 1-2kW, ₹60,000 for 2-3kW, and ₹78,000 for 3kW and above). ${cityInfo?.subsidyInfo || 'The subsidy is credited directly to your bank account after installation and inspection.'} Our verified installers help you with the complete subsidy application process.`
    },
    {
      question: `How long does net metering approval take in ${city}?`,
      answer: cityInfo
        ? `In ${city}, net metering approval from ${cityInfo.discoms.join('/')} typically takes 15-45 days depending on the DISCOM and application completeness. ${cityInfo.discoms.length > 1 ? 'Different DISCOMs may have slightly different timelines.' : `${cityInfo.discoms[0]} has streamlined the process.`} Our verified installers handle all paperwork and follow-ups to ensure quick approval. Once approved, you can start earning credits for excess electricity exported to the grid.`
        : `Net metering approval in ${city} typically takes 2-6 weeks depending on your DISCOM and documentation. Verified installers on our platform handle the complete process including application submission, technical inspection coordination, and approval follow-ups.`
    }
  ];
}
