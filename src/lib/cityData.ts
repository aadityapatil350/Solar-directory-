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
  },
  'nashik': {
    city: 'Nashik',
    state: 'Maharashtra',
    discoms: ['MSEDCL'],
    avgCost3kW: '₹42,000 - ₹75,000',
    avgCost5kW: '₹70,000 - ₹1,24,000',
    topAreas: ['Pathardi Phata', 'Satpur', 'College Road', 'Gangapur Road', 'Panchavati', 'Adgaon', 'Makhmalabad', 'CIDCO'],
    subsidyInfo: 'Maharashtra residents can claim up to ₹78,000 subsidy under PM Surya Ghar Yojana via MSEDCL',
    highlights: [
      'MSEDCL net metering process same as Mumbai/Pune',
      'Average 5.5-6 hours of peak sunlight daily',
      'Wine capital of India with growing solar adoption',
      'Favorable net metering policies for home installations'
    ]
  },
  'nagpur': {
    city: 'Nagpur',
    state: 'Maharashtra',
    discoms: ['MSEDCL'],
    avgCost3kW: '₹40,000 - ₹72,000',
    avgCost5kW: '₹66,000 - ₹1,19,000',
    topAreas: ['Dharampeth', 'Sadar', 'Sitabuldi', 'Laxmi Nagar', 'Pratap Nagar', 'Wardha Road', 'Kamptee Road', 'Hingna'],
    subsidyInfo: 'Central subsidy up to ₹78,000 available through MSEDCL net metering scheme',
    highlights: [
      'Second capital of Maharashtra with excellent solar potential',
      'MSEDCL offers streamlined net metering approval',
      'Average 6-6.5 hours of peak sunlight (higher than coastal areas)',
      'Lower installation costs compared to Mumbai/Pune'
    ]
  },
  'surat': {
    city: 'Surat',
    state: 'Gujarat',
    discoms: ['DGVCL', 'Torrent Power'],
    avgCost3kW: '₹35,000 - ₹65,000',
    avgCost5kW: '₹58,000 - ₹1,08,000',
    topAreas: ['Vesu', 'Adajan', 'Pal', 'Athwa', 'Piplod', 'Althan', 'Citylight', 'Bhatar'],
    subsidyInfo: 'PM Surya Ghar Yojana subsidy up to ₹78,000 + Additional Gujarat state benefits',
    highlights: [
      'Diamond city with high commercial solar adoption',
      'Gujarat offers some of India\'s lowest solar installation costs',
      'Excellent solar irradiation (6-6.5 hours peak sunlight)',
      'DGVCL and Torrent Power provide efficient net metering'
    ]
  }
};

/**
 * Generate city-specific "About Solar" description
 */
export function getCityDescription(city: string): string {
  const cityInfo = citySpecificData[city.toLowerCase()];

  if (!cityInfo) {
    return `${city} offers excellent solar potential with abundant sunshine throughout the year. Installing solar panels in ${city} can help you reduce electricity bills significantly while contributing to a greener environment. Contact verified solar installers in ${city} for free quotes and start your solar journey today.`;
  }

  // Calculate typical post-subsidy cost range
  const costLower = cityInfo.avgCost3kW.split(' - ')[0];
  const costUpper = cityInfo.avgCost3kW.split(' - ')[1];

  // Extract peak sun hours from highlights
  const sunHours = cityInfo.highlights.find(h => h.includes('hours'))?.match(/[\d.]+-?[\d.]*\s*hours?/)?.[0] || '5-6 hours';

  return `${city} receives ${sunHours} of peak sun hours daily, making it ideal for solar. A 3kW system in ${city} typically costs ${costLower}–${costUpper} after PM Surya Ghar subsidy via ${cityInfo.discoms[0]}. Popular areas include ${cityInfo.topAreas.slice(0, 4).join(', ')}, and ${cityInfo.topAreas[4] || cityInfo.topAreas[cityInfo.topAreas.length - 1]}. ${cityInfo.subsidyInfo}`;
}

export interface CityFAQ {
  question: string;
  answer: string;
}

export function getCityFAQs(city: string, state: string): CityFAQ[] {
  const cityInfo = citySpecificData[city.toLowerCase()];

  return [
    {
      question: `How much does solar installation cost in ${city} in 2026?`,
      answer: cityInfo
        ? `In ${city}, a 3kW residential solar system costs ${cityInfo.avgCost3kW} on average in 2026. After applying the PM Surya Ghar Yojana subsidy of up to ₹78,000, your net cost comes down to approximately ₹1.2L–₹1.8L. A 5kW system ranges from ${cityInfo.avgCost5kW}. Costs vary based on panel brand (Tata, Adani, Waaree, etc.), inverter type (string vs micro), and installation complexity. Most ${city} homeowners recover their investment in 3-4 years through electricity bill savings. Get free quotes from verified installers to find the best deal.`
        : `In ${city}, solar installation costs typically range from ₹40,000 to ₹80,000 for a 3kW system in 2026. With PM Surya Ghar Yojana subsidy of up to ₹78,000, your net investment reduces to ₹1.2L–₹1.8L. Contact verified installers for accurate quotes based on your requirements.`
    },
    {
      question: `Which are the best solar companies in ${city}?`,
      answer: `The best solar companies in ${city} are those verified by GoSolarIndex with proven track records. We list only MNRE-certified installers who have completed successful installations in ${city}. Top-rated companies have 4+ star ratings, authentic customer reviews, and comply with ${cityInfo?.discoms[0] || state + ' DISCOM'} net metering requirements. Look for the "Verified" badge and check reviews before choosing. ${cityInfo ? `Popular installers serve areas like ${cityInfo.topAreas.slice(0, 3).join(', ')}.` : ''} Filter by rating and reviews to find the best fit for your needs.`
    },
    {
      question: `Is PM Surya Ghar subsidy available in ${city}?`,
      answer: `Yes! PM Surya Ghar Yojana subsidy is fully available in ${city}, ${state}. You can get up to ₹78,000 central government subsidy (₹30,000 for 1-2kW, ₹60,000 for 2-3kW, and ₹78,000 for 3kW+). ${cityInfo?.subsidyInfo || 'The subsidy is credited directly to your bank account after installation and inspection by DISCOM officials.'} ${cityInfo?.discoms[0] ? `Applications are processed through ${cityInfo.discoms[0]}.` : ''} Our verified installers help you with documentation, subsidy application, and follow-ups to ensure you receive the full amount.`
    },
    {
      question: `How does net metering work in ${city}?`,
      answer: cityInfo
        ? `Net metering in ${city} is managed by ${cityInfo.discoms.join('/')}. After installing solar panels, you export excess electricity to the grid during the day and consume grid power at night. Your meter runs backward when exporting, earning you credits. ${cityInfo.discoms[0]} approval takes 15-45 days on average. You'll need: solar installation completion certificate, ${cityInfo.discoms[0]} application form, building NOC, and technical drawings. ${cityInfo.discoms.length > 1 ? 'Process varies slightly by DISCOM area.' : ''} Our verified installers handle all ${cityInfo.discoms[0]} paperwork and inspections. You get billed only for net consumption (consumed - exported).`
        : `Net metering in ${city} allows you to export excess solar electricity to the grid and earn credits. Your DISCOM installs a bi-directional meter that tracks both consumption and export. Applications typically take 2-6 weeks for approval. You'll need installation certificates, DISCOM application, and building approvals. Verified installers handle all paperwork and coordinate with ${state} DISCOM for smooth approval.`
    }
  ];
}
