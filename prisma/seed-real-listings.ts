import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// All cities — existing 20 + 15 new Tier 2/3 cities
const cities = [
  // Existing 20 cities (already in DB)
  { city: 'Mumbai', state: 'Maharashtra', slug: 'mumbai-maharashtra' },
  { city: 'Delhi', state: 'Delhi', slug: 'delhi-delhi' },
  { city: 'Bangalore', state: 'Karnataka', slug: 'bangalore-karnataka' },
  { city: 'Pune', state: 'Maharashtra', slug: 'pune-maharashtra' },
  { city: 'Hyderabad', state: 'Telangana', slug: 'hyderabad-telangana' },
  { city: 'Chennai', state: 'Tamil Nadu', slug: 'chennai-tamil-nadu' },
  { city: 'Kolkata', state: 'West Bengal', slug: 'kolkata-west-bengal' },
  { city: 'Ahmedabad', state: 'Gujarat', slug: 'ahmedabad-gujarat' },
  { city: 'Jaipur', state: 'Rajasthan', slug: 'jaipur-rajasthan' },
  { city: 'Lucknow', state: 'Uttar Pradesh', slug: 'lucknow-uttar-pradesh' },
  { city: 'Surat', state: 'Gujarat', slug: 'surat-gujarat' },
  { city: 'Nagpur', state: 'Maharashtra', slug: 'nagpur-maharashtra' },
  { city: 'Indore', state: 'Madhya Pradesh', slug: 'indore-madhya-pradesh' },
  { city: 'Bhopal', state: 'Madhya Pradesh', slug: 'bhopal-madhya-pradesh' },
  { city: 'Chandigarh', state: 'Punjab', slug: 'chandigarh-punjab' },
  { city: 'Coimbatore', state: 'Tamil Nadu', slug: 'coimbatore-tamil-nadu' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh', slug: 'visakhapatnam-andhra-pradesh' },
  { city: 'Kochi', state: 'Kerala', slug: 'kochi-kerala' },
  { city: 'Vadodara', state: 'Gujarat', slug: 'vadodara-gujarat' },
  { city: 'Patna', state: 'Bihar', slug: 'patna-bihar' },
  // New Tier 2/3 cities (batch 1)
  { city: 'Jodhpur', state: 'Rajasthan', slug: 'jodhpur-rajasthan' },
  { city: 'Udaipur', state: 'Rajasthan', slug: 'udaipur-rajasthan' },
  { city: 'Dehradun', state: 'Uttarakhand', slug: 'dehradun-uttarakhand' },
  { city: 'Amritsar', state: 'Punjab', slug: 'amritsar-punjab' },
  { city: 'Ludhiana', state: 'Punjab', slug: 'ludhiana-punjab' },
  { city: 'Nashik', state: 'Maharashtra', slug: 'nashik-maharashtra' },
  { city: 'Aurangabad', state: 'Maharashtra', slug: 'aurangabad-maharashtra' },
  { city: 'Madurai', state: 'Tamil Nadu', slug: 'madurai-tamil-nadu' },
  { city: 'Tiruchirappalli', state: 'Tamil Nadu', slug: 'tiruchirappalli-tamil-nadu' },
  { city: 'Mangalore', state: 'Karnataka', slug: 'mangalore-karnataka' },
  { city: 'Mysore', state: 'Karnataka', slug: 'mysore-karnataka' },
  { city: 'Guwahati', state: 'Assam', slug: 'guwahati-assam' },
  { city: 'Varanasi', state: 'Uttar Pradesh', slug: 'varanasi-uttar-pradesh' },
  { city: 'Agra', state: 'Uttar Pradesh', slug: 'agra-uttar-pradesh' },
  { city: 'Bhubaneswar', state: 'Odisha', slug: 'bhubaneswar-odisha' },
  { city: 'Raipur', state: 'Chhattisgarh', slug: 'raipur-chhattisgarh' },
  // New Tier 2/3 cities (batch 2)
  { city: 'Thiruvananthapuram', state: 'Kerala', slug: 'thiruvananthapuram-kerala' },
  { city: 'Kozhikode', state: 'Kerala', slug: 'kozhikode-kerala' },
  { city: 'Hubli', state: 'Karnataka', slug: 'hubli-karnataka' },
  { city: 'Belgaum', state: 'Karnataka', slug: 'belgaum-karnataka' },
  { city: 'Rajkot', state: 'Gujarat', slug: 'rajkot-gujarat' },
  { city: 'Bhavnagar', state: 'Gujarat', slug: 'bhavnagar-gujarat' },
  { city: 'Meerut', state: 'Uttar Pradesh', slug: 'meerut-uttar-pradesh' },
  { city: 'Kanpur', state: 'Uttar Pradesh', slug: 'kanpur-uttar-pradesh' },
  { city: 'Allahabad', state: 'Uttar Pradesh', slug: 'allahabad-uttar-pradesh' },
  { city: 'Ranchi', state: 'Jharkhand', slug: 'ranchi-jharkhand' },
  { city: 'Jabalpur', state: 'Madhya Pradesh', slug: 'jabalpur-madhya-pradesh' },
  { city: 'Vijayawada', state: 'Andhra Pradesh', slug: 'vijayawada-andhra-pradesh' },
  { city: 'Nellore', state: 'Andhra Pradesh', slug: 'nellore-andhra-pradesh' },
  { city: 'Salem', state: 'Tamil Nadu', slug: 'salem-tamil-nadu' },
  { city: 'Tirunelveli', state: 'Tamil Nadu', slug: 'tirunelveli-tamil-nadu' },
  { city: 'Pondicherry', state: 'Puducherry', slug: 'pondicherry-puducherry' },
];

// City index map for quick lookup
const cityIdx: Record<string, number> = {};
cities.forEach((c, i) => { cityIdx[c.slug] = i; });

const categories = [
  { name: 'Residential Solar Installers', slug: 'residential-installers' },   // 0
  { name: 'Commercial Solar Installers', slug: 'commercial-installers' },     // 1
  { name: 'Solar Panel Dealers', slug: 'solar-dealers' },                     // 2
  { name: 'Solar Inverter Specialists', slug: 'inverter-specialists' },        // 3
  { name: 'Solar AMC & Maintenance', slug: 'maintenance-services' },          // 4
];

const listings = [
  // ═══════════════════════════════════════════════
  // MUMBAI
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Mumbai',
    slug: 'tata-power-solar-mumbai',
    description: "India's most trusted solar brand. Tata Power Solar offers rooftop solar for homes and businesses across Mumbai with 25+ years of experience, MNRE approval, and end-to-end EPC services.",
    phone: '+91 1800 209 4040',
    email: 'solarsales@tatapower.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Tata Power House, 34 Sant Tukaram Road, Carnac Bunder, Mumbai 400009',
    verified: true, featured: true, rating: 4.9, reviews: 342,
    categoryIndex: 1, citySlug: 'mumbai-maharashtra',
  },
  {
    name: 'Adani Solar – Mumbai',
    slug: 'adani-solar-mumbai',
    description: 'Adani Solar, India\'s largest integrated solar manufacturer, offers premium monocrystalline panels and full EPC services in Mumbai. Authorized dealer with subsidy processing assistance.',
    phone: '+91 79 2555 5555',
    email: 'solar@adani.com',
    website: 'https://www.adanisolar.com',
    address: 'Adani House, Near Mithakhali Six Roads, Ellisbridge, Ahmedabad – Mumbai sales office, Mumbai 400070',
    verified: true, featured: true, rating: 4.8, reviews: 215,
    categoryIndex: 2, citySlug: 'mumbai-maharashtra',
  },
  {
    name: 'Amplus Solar (Gentari) – Mumbai',
    slug: 'amplus-solar-mumbai',
    description: 'Amplus Solar (now Gentari) specialises in large commercial and industrial rooftop solar in Mumbai. One of India\'s leading C&I solar developers with 1 GW+ portfolio.',
    phone: '+91 124 488 7000',
    email: 'info@amplussolar.com',
    website: 'https://www.amplussolar.com',
    address: 'Bandra Kurla Complex, Mumbai 400051',
    verified: true, featured: false, rating: 4.7, reviews: 98,
    categoryIndex: 1, citySlug: 'mumbai-maharashtra',
  },
  {
    name: 'Freyr Energy – Mumbai',
    slug: 'freyr-energy-mumbai',
    description: 'Freyr Energy is a fast-growing rooftop solar company offering hassle-free installations, government subsidy assistance, and their proprietary SolarApp for monitoring. Active in Mumbai and MMR.',
    phone: '+91 9000 828 333',
    email: 'connect@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'Lower Parel, Mumbai 400013',
    verified: true, featured: false, rating: 4.6, reviews: 74,
    categoryIndex: 0, citySlug: 'mumbai-maharashtra',
  },
  {
    name: 'CleanMax Solar – Mumbai',
    slug: 'cleanmax-solar-mumbai',
    description: 'CleanMax is one of India\'s largest commercial rooftop solar companies. They serve large corporates and multi-tenant commercial properties across Mumbai with OPEX and CAPEX models.',
    phone: '+91 22 6676 4500',
    email: 'info@cleanmax.com',
    website: 'https://www.cleanmax.com',
    address: 'Raheja Titanium, Western Express Highway, Goregaon East, Mumbai 400063',
    verified: true, featured: false, rating: 4.7, reviews: 63,
    categoryIndex: 1, citySlug: 'mumbai-maharashtra',
  },
  {
    name: 'MYSUN – Mumbai',
    slug: 'mysun-mumbai',
    description: 'MYSUN is India\'s leading digital solar platform offering customised rooftop solar solutions, instant ROI calculations, and end-to-end project execution in Mumbai.',
    phone: '+91 120 450 5100',
    email: 'hello@mysun.in',
    website: 'https://www.mysun.in',
    address: 'Andheri West, Mumbai 400058',
    verified: true, featured: false, rating: 4.5, reviews: 88,
    categoryIndex: 0, citySlug: 'mumbai-maharashtra',
  },

  // ═══════════════════════════════════════════════
  // DELHI / NCR
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Delhi NCR',
    slug: 'tata-power-solar-delhi',
    description: "Tata Power Solar's Delhi NCR office provides residential and commercial rooftop solar with assured 25-year performance warranty and seamless DISCOM net-metering coordination.",
    phone: '+91 1800 209 4040',
    email: 'delhi@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'DLF Cyber City, Gurugram, Delhi NCR 122002',
    verified: true, featured: true, rating: 4.9, reviews: 289,
    categoryIndex: 0, citySlug: 'delhi-delhi',
  },
  {
    name: 'Adani Solar – Delhi',
    slug: 'adani-solar-delhi',
    description: 'Adani Solar dealer network in Delhi NCR offers Adani\'s premium HiKu series monocrystalline panels, complete rooftop installations, and PM Surya Ghar subsidy processing.',
    phone: '+91 79 2555 5555',
    email: 'delhi@adanisolar.com',
    website: 'https://www.adanisolar.com',
    address: 'Connaught Place, New Delhi 110001',
    verified: true, featured: true, rating: 4.8, reviews: 198,
    categoryIndex: 2, citySlug: 'delhi-delhi',
  },
  {
    name: 'ReNew Power – Delhi',
    slug: 'renew-power-delhi',
    description: 'ReNew Power, one of India\'s largest renewable energy companies, provides large commercial and industrial solar projects in Delhi NCR with end-to-end EPC and O&M services.',
    phone: '+91 124 499 0300',
    email: 'info@renewpower.in',
    website: 'https://www.renewpower.in',
    address: 'DLF Cyber City Phase 2, Gurugram 122002',
    verified: true, featured: true, rating: 4.8, reviews: 156,
    categoryIndex: 1, citySlug: 'delhi-delhi',
  },
  {
    name: 'Amplus Solar (Gentari) – Delhi',
    slug: 'amplus-solar-delhi',
    description: 'Amplus Solar (Gentari) headquartered in Gurugram, specialises in rooftop and ground-mounted C&I solar projects across Delhi NCR with flexible OPEX/CAPEX ownership models.',
    phone: '+91 124 488 7000',
    email: 'info@amplussolar.com',
    website: 'https://www.amplussolar.com',
    address: 'Golf Course Road, Gurugram, Haryana 122001',
    verified: true, featured: false, rating: 4.7, reviews: 112,
    categoryIndex: 1, citySlug: 'delhi-delhi',
  },
  {
    name: 'MYSUN – Delhi NCR',
    slug: 'mysun-delhi',
    description: 'MYSUN\'s Noida-based team serves Delhi NCR homeowners and businesses with digitally-managed rooftop solar installations, transparent pricing, and DISCCOM approval support.',
    phone: '+91 120 450 5100',
    email: 'delhi@mysun.in',
    website: 'https://www.mysun.in',
    address: 'A-25 Sector 63, Noida 201301',
    verified: true, featured: false, rating: 4.6, reviews: 134,
    categoryIndex: 0, citySlug: 'delhi-delhi',
  },
  {
    name: 'Waaree Energies – Delhi',
    slug: 'waaree-energies-delhi',
    description: 'Waaree Energies, India\'s largest solar panel manufacturer by capacity, has authorized dealers across Delhi supplying Waaree modules and providing EPC services for all project sizes.',
    phone: '+91 22 6644 4444',
    email: 'info@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Karol Bagh, New Delhi 110005',
    verified: true, featured: false, rating: 4.6, reviews: 89,
    categoryIndex: 2, citySlug: 'delhi-delhi',
  },

  // ═══════════════════════════════════════════════
  // BANGALORE
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Bangalore',
    slug: 'tata-power-solar-bangalore',
    description: "Tata Power Solar's Bangalore EPC team handles residential rooftops from 1 kW to large commercial projects. Approved by BESCOM with smooth net-metering process.",
    phone: '+91 1800 209 4040',
    email: 'bangalore@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Indiranagar, Bangalore 560038',
    verified: true, featured: true, rating: 4.9, reviews: 315,
    categoryIndex: 0, citySlug: 'bangalore-karnataka',
  },
  {
    name: 'SolarSquare Energy – Bangalore',
    slug: 'solarsquare-energy-bangalore',
    description: 'SolarSquare is one of India\'s fastest-growing rooftop solar companies. Founded by IIT/IIM alumni, they offer transparent pricing, premium components, and 5-year service guarantee in Bangalore.',
    phone: '+91 8047 105 105',
    email: 'hello@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'HSR Layout, Bangalore 560102',
    verified: true, featured: true, rating: 4.8, reviews: 276,
    categoryIndex: 0, citySlug: 'bangalore-karnataka',
  },
  {
    name: 'ReNew Power – Bangalore',
    slug: 'renew-power-bangalore',
    description: 'ReNew Power provides turnkey C&I solar projects in Bangalore\'s booming tech corridor. Serving IT parks, manufacturing units, and large commercial establishments.',
    phone: '+91 124 499 0300',
    email: 'bangalore@renewpower.in',
    website: 'https://www.renewpower.in',
    address: 'Whitefield, Bangalore 560066',
    verified: true, featured: true, rating: 4.7, reviews: 134,
    categoryIndex: 1, citySlug: 'bangalore-karnataka',
  },
  {
    name: 'CleanMax Solar – Bangalore',
    slug: 'cleanmax-solar-bangalore',
    description: 'CleanMax Solar has a strong presence in Bangalore\'s corporate sector offering PPA/lease solar models to large enterprises and industrial customers.',
    phone: '+91 22 6676 4500',
    email: 'bangalore@cleanmax.com',
    website: 'https://www.cleanmax.com',
    address: 'Outer Ring Road, Bangalore 560037',
    verified: true, featured: false, rating: 4.6, reviews: 89,
    categoryIndex: 1, citySlug: 'bangalore-karnataka',
  },
  {
    name: 'Amplus Solar (Gentari) – Bangalore',
    slug: 'amplus-solar-bangalore',
    description: 'Amplus Solar (Gentari) develops and operates C&I solar assets in Bangalore under long-term PPA contracts, helping corporates meet their renewable energy targets.',
    phone: '+91 124 488 7000',
    email: 'bangalore@amplussolar.com',
    website: 'https://www.amplussolar.com',
    address: 'Koramangala, Bangalore 560095',
    verified: true, featured: false, rating: 4.7, reviews: 76,
    categoryIndex: 1, citySlug: 'bangalore-karnataka',
  },
  {
    name: 'Orb Energy – Bangalore',
    slug: 'orb-energy-bangalore',
    description: 'Orb Energy is a BNEF Tier-1 solar company headquartered in Bangalore. They specialise in solar for MSMEs with innovative finance options and a pan-India service network.',
    phone: '+91 80 4268 3000',
    email: 'info@orbenergy.com',
    website: 'https://www.orbenergy.com',
    address: '# 20 Industrial Suburb, Yeshwanthpur, Bangalore 560022',
    verified: true, featured: false, rating: 4.7, reviews: 182,
    categoryIndex: 1, citySlug: 'bangalore-karnataka',
  },

  // ═══════════════════════════════════════════════
  // PUNE
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Pune',
    slug: 'tata-power-solar-pune',
    description: "Tata Power Solar's Pune team serves residential and industrial customers across Pune district. MSEDCL-approved installer with hassle-free net-metering and subsidy support.",
    phone: '+91 1800 209 4040',
    email: 'pune@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Baner, Pune 411045',
    verified: true, featured: true, rating: 4.9, reviews: 203,
    categoryIndex: 0, citySlug: 'pune-maharashtra',
  },
  {
    name: 'CleanMax Solar – Pune',
    slug: 'cleanmax-solar-pune',
    description: 'CleanMax Solar provides C&I rooftop solar solutions in Pune with asset-light OPEX models. Trusted by Pune\'s manufacturing and IT sectors.',
    phone: '+91 22 6676 4500',
    email: 'pune@cleanmax.com',
    website: 'https://www.cleanmax.com',
    address: 'Hadapsar, Pune 411028',
    verified: true, featured: false, rating: 4.7, reviews: 67,
    categoryIndex: 1, citySlug: 'pune-maharashtra',
  },
  {
    name: 'Freyr Energy – Pune',
    slug: 'freyr-energy-pune',
    description: 'Freyr Energy offers end-to-end rooftop solar in Pune with their tech-powered SolarApp for real-time monitoring. Competitive pricing with full subsidy assistance under PM Surya Ghar Yojana.',
    phone: '+91 9000 828 333',
    email: 'pune@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'Kharadi, Pune 411014',
    verified: true, featured: false, rating: 4.6, reviews: 91,
    categoryIndex: 0, citySlug: 'pune-maharashtra',
  },
  {
    name: 'SolarSquare Energy – Pune',
    slug: 'solarsquare-energy-pune',
    description: 'SolarSquare Energy brings IIT/IIM-backed solar expertise to Pune homeowners. Known for quality installations, transparent pricing, and a 5-year after-sales guarantee.',
    phone: '+91 8047 105 105',
    email: 'pune@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'Wakad, Pune 411057',
    verified: true, featured: false, rating: 4.8, reviews: 148,
    categoryIndex: 0, citySlug: 'pune-maharashtra',
  },

  // ═══════════════════════════════════════════════
  // HYDERABAD
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Hyderabad',
    slug: 'tata-power-solar-hyderabad',
    description: "Tata Power Solar's Hyderabad EPC team provides residential and commercial solar installations with TSSPDCL/TSNPDCL net-metering approval support across Greater Hyderabad.",
    phone: '+91 1800 209 4040',
    email: 'hyderabad@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Banjara Hills, Hyderabad 500034',
    verified: true, featured: true, rating: 4.9, reviews: 178,
    categoryIndex: 0, citySlug: 'hyderabad-telangana',
  },
  {
    name: 'Freyr Energy – Hyderabad',
    slug: 'freyr-energy-hyderabad',
    description: 'Freyr Energy was founded in Hyderabad and remains the city\'s premier rooftop solar brand. Their proprietary SolarApp and large local EPC team ensure fast, reliable installations.',
    phone: '+91 9000 828 333',
    email: 'connect@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'Plot 127 Phase-II, Kavuri Hills, Madhapur, Hyderabad 500033',
    verified: true, featured: true, rating: 4.8, reviews: 312,
    categoryIndex: 0, citySlug: 'hyderabad-telangana',
  },
  {
    name: 'Greenko Group – Hyderabad',
    slug: 'greenko-group-hyderabad',
    description: 'Greenko is one of India\'s largest renewable energy companies headquartered in Hyderabad. They provide large-scale commercial solar EPC and long-term O&M services.',
    phone: '+91 40 4030 7000',
    email: 'info@greenkogroup.com',
    website: 'https://www.greenkogroup.com',
    address: 'Rajiv Gandhi International Airport Area, Hyderabad 500043',
    verified: true, featured: true, rating: 4.8, reviews: 95,
    categoryIndex: 1, citySlug: 'hyderabad-telangana',
  },
  {
    name: 'SolarSquare Energy – Hyderabad',
    slug: 'solarsquare-energy-hyderabad',
    description: 'SolarSquare Energy serves Hyderabad\'s residential customers with turnkey rooftop installations, premium panels, and a committed 5-year maintenance agreement.',
    phone: '+91 8047 105 105',
    email: 'hyderabad@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'Kondapur, Hyderabad 500084',
    verified: true, featured: false, rating: 4.7, reviews: 156,
    categoryIndex: 0, citySlug: 'hyderabad-telangana',
  },

  // ═══════════════════════════════════════════════
  // CHENNAI
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Chennai',
    slug: 'tata-power-solar-chennai',
    description: "Tata Power Solar's Chennai office covers the full spectrum of rooftop solar — from 2 kW residential to multi-MW commercial. TNEB-approved with smooth net-metering coordination.",
    phone: '+91 1800 209 4040',
    email: 'chennai@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Nungambakkam, Chennai 600034',
    verified: true, featured: true, rating: 4.9, reviews: 224,
    categoryIndex: 0, citySlug: 'chennai-tamil-nadu',
  },
  {
    name: 'Vikram Solar – Chennai',
    slug: 'vikram-solar-chennai',
    description: 'Vikram Solar is a Tier-1 solar module manufacturer with a strong dealer presence in Chennai. Known for high-efficiency ELDORA modules and robust after-sales service.',
    phone: '+91 33 6625 7700',
    email: 'info@vikramsolar.com',
    website: 'https://www.vikramsolar.com',
    address: 'Nandanam, Chennai 600035',
    verified: true, featured: true, rating: 4.8, reviews: 167,
    categoryIndex: 2, citySlug: 'chennai-tamil-nadu',
  },
  {
    name: 'CleanMax Solar – Chennai',
    slug: 'cleanmax-solar-chennai',
    description: 'CleanMax Solar provides C&I rooftop solar across Chennai\'s industrial belt with flexible OPEX/CAPEX models for factories, warehouses, and commercial properties.',
    phone: '+91 22 6676 4500',
    email: 'chennai@cleanmax.com',
    website: 'https://www.cleanmax.com',
    address: 'Perungudi, Chennai 600096',
    verified: true, featured: false, rating: 4.7, reviews: 78,
    categoryIndex: 1, citySlug: 'chennai-tamil-nadu',
  },
  {
    name: 'VC Green Energy – Chennai',
    slug: 'vc-green-energy-chennai',
    description: 'VC Green Energy is a South India-focused solar EPC company with 100+ MW of installations across Tamil Nadu. Comprehensive services from design to O&M with GST-compliant billing.',
    phone: '+91 422 4204 040',
    email: 'info@vcgreen.in',
    website: 'https://www.vcgreen.in',
    address: 'Anna Nagar, Chennai 600040',
    verified: true, featured: false, rating: 4.6, reviews: 134,
    categoryIndex: 0, citySlug: 'chennai-tamil-nadu',
  },

  // ═══════════════════════════════════════════════
  // KOLKATA
  // ═══════════════════════════════════════════════
  {
    name: 'Vikram Solar – Kolkata',
    slug: 'vikram-solar-kolkata',
    description: 'Vikram Solar is headquartered in Kolkata and is one of India\'s largest solar module manufacturers. Their local team handles residential to utility-scale project requirements.',
    phone: '+91 33 6625 7700',
    email: 'kolkata@vikramsolar.com',
    website: 'https://www.vikramsolar.com',
    address: 'Plot Y-1, Block EP, Sector V, Salt Lake City, Kolkata 700091',
    verified: true, featured: true, rating: 4.9, reviews: 289,
    categoryIndex: 2, citySlug: 'kolkata-west-bengal',
  },
  {
    name: 'Tata Power Solar – Kolkata',
    slug: 'tata-power-solar-kolkata',
    description: "Tata Power Solar serves Kolkata's residential and commercial markets with WBSEDCL-approved net-metering installation and government subsidy processing.",
    phone: '+91 1800 209 4040',
    email: 'kolkata@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Park Street, Kolkata 700016',
    verified: true, featured: true, rating: 4.8, reviews: 134,
    categoryIndex: 0, citySlug: 'kolkata-west-bengal',
  },
  {
    name: 'Waaree Energies – Kolkata',
    slug: 'waaree-energies-kolkata',
    description: 'Waaree Energies dealer in Kolkata supplies Waaree monocrystalline and polycrystalline solar panels with fast delivery and comprehensive installation support across West Bengal.',
    phone: '+91 22 6644 4444',
    email: 'kolkata@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Rajarhat New Town, Kolkata 700160',
    verified: true, featured: false, rating: 4.6, reviews: 87,
    categoryIndex: 2, citySlug: 'kolkata-west-bengal',
  },

  // ═══════════════════════════════════════════════
  // AHMEDABAD
  // ═══════════════════════════════════════════════
  {
    name: 'Adani Solar – Ahmedabad',
    slug: 'adani-solar-ahmedabad',
    description: "Adani Solar's home city headquarters in Ahmedabad offers the full range of Adani modules and EPC services. Direct manufacturer pricing with 25-year panel warranty.",
    phone: '+91 79 2555 5555',
    email: 'ahmedabad@adanisolar.com',
    website: 'https://www.adanisolar.com',
    address: 'Shantigram, S.G. Highway, Ahmedabad 382421',
    verified: true, featured: true, rating: 4.9, reviews: 378,
    categoryIndex: 2, citySlug: 'ahmedabad-gujarat',
  },
  {
    name: 'Waaree Energies – Ahmedabad',
    slug: 'waaree-energies-ahmedabad',
    description: 'Waaree Energies, headquartered in Mumbai with a major Gujarat presence, supplies high-efficiency modules to Ahmedabad and provides EPC services across Gujarat.',
    phone: '+91 22 6644 4444',
    email: 'ahmedabad@waaree.com',
    website: 'https://www.waaree.com',
    address: 'GIFT City, Gandhinagar 382355',
    verified: true, featured: true, rating: 4.8, reviews: 243,
    categoryIndex: 2, citySlug: 'ahmedabad-gujarat',
  },
  {
    name: 'Tata Power Solar – Ahmedabad',
    slug: 'tata-power-solar-ahmedabad',
    description: "Tata Power Solar's authorized partner in Ahmedabad delivers residential rooftop installations with DGVCL/UGVCL/PGVCL net-metering compliance and PM Surya Ghar subsidy support.",
    phone: '+91 1800 209 4040',
    email: 'ahmedabad@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'CG Road, Navrangpura, Ahmedabad 380009',
    verified: true, featured: false, rating: 4.8, reviews: 189,
    categoryIndex: 0, citySlug: 'ahmedabad-gujarat',
  },

  // ═══════════════════════════════════════════════
  // JAIPUR
  // ═══════════════════════════════════════════════
  {
    name: 'Solluz Energy – Jaipur',
    slug: 'solluz-energy-jaipur',
    description: 'Solluz Energy is a Rajasthan-based solar EPC company offering residential, commercial, and industrial solar installations across Jaipur. MNRE-approved with strong local installation teams.',
    phone: '+91 141 4000 555',
    email: 'info@solluz.co.in',
    website: 'https://www.solluz.co.in',
    address: 'Malviya Nagar, Jaipur 302017',
    verified: true, featured: true, rating: 4.7, reviews: 143,
    categoryIndex: 0, citySlug: 'jaipur-rajasthan',
  },
  {
    name: 'Electrobeam Solar – Jaipur',
    slug: 'electrobeam-solar-jaipur',
    description: 'Electrobeam Solar is a Rajasthan solar leader offering residential and commercial rooftop installations across Jaipur with JVVNL net-metering support and 25-year warranties.',
    phone: '+91 141 4100 200',
    email: 'info@electrobeamsolar.com',
    website: 'https://www.electrobeamsolar.com',
    address: 'Vaishali Nagar, Jaipur 302021',
    verified: true, featured: false, rating: 4.6, reviews: 112,
    categoryIndex: 0, citySlug: 'jaipur-rajasthan',
  },
  {
    name: 'ReNew Power – Jaipur',
    slug: 'renew-power-jaipur',
    description: 'ReNew Power provides commercial and industrial solar solutions in Rajasthan with a strong local project execution team in Jaipur. Trusted by large industries and commercial complexes.',
    phone: '+91 124 499 0300',
    email: 'rajasthan@renewpower.in',
    website: 'https://www.renewpower.in',
    address: 'Sitapura Industrial Area, Jaipur 302022',
    verified: true, featured: false, rating: 4.7, reviews: 67,
    categoryIndex: 1, citySlug: 'jaipur-rajasthan',
  },
  {
    name: 'Waaree Energies – Jaipur',
    slug: 'waaree-energies-jaipur',
    description: 'Waaree Energies authorized dealer in Jaipur supplies Waaree\'s latest monocrystalline PERC modules. Comprehensive solar solutions with competitive pricing and JVVNL approvals.',
    phone: '+91 22 6644 4444',
    email: 'jaipur@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Tonk Road, Jaipur 302015',
    verified: true, featured: false, rating: 4.5, reviews: 89,
    categoryIndex: 2, citySlug: 'jaipur-rajasthan',
  },

  // ═══════════════════════════════════════════════
  // LUCKNOW
  // ═══════════════════════════════════════════════
  {
    name: 'Loom Solar – Lucknow',
    slug: 'loom-solar-lucknow',
    description: 'Loom Solar is India\'s fastest-growing solar brand. Their Lucknow dealer provides Shark Bi-facial and MONO PERC panels with full installation services and UPPCL subsidy processing.',
    phone: '+91 73400 90909',
    email: 'info@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Hazratganj, Lucknow 226001',
    verified: true, featured: true, rating: 4.8, reviews: 198,
    categoryIndex: 0, citySlug: 'lucknow-uttar-pradesh',
  },
  {
    name: 'MYSUN – Lucknow',
    slug: 'mysun-lucknow',
    description: 'MYSUN serves Lucknow homeowners and businesses with digitally-managed rooftop solar. Transparent quotes, quality-assured installations, and real-time performance monitoring via app.',
    phone: '+91 120 450 5100',
    email: 'lucknow@mysun.in',
    website: 'https://www.mysun.in',
    address: 'Gomti Nagar, Lucknow 226010',
    verified: true, featured: false, rating: 4.5, reviews: 76,
    categoryIndex: 0, citySlug: 'lucknow-uttar-pradesh',
  },
  {
    name: 'Tata Power Solar – Lucknow',
    slug: 'tata-power-solar-lucknow',
    description: "Tata Power Solar's Lucknow partner offers turnkey residential solar installations with UPPCL-approved net-metering and PM Surya Ghar subsidy coordination.",
    phone: '+91 1800 209 4040',
    email: 'lucknow@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Aliganj, Lucknow 226024',
    verified: true, featured: false, rating: 4.8, reviews: 112,
    categoryIndex: 0, citySlug: 'lucknow-uttar-pradesh',
  },

  // ═══════════════════════════════════════════════
  // SURAT
  // ═══════════════════════════════════════════════
  {
    name: 'Adani Solar – Surat',
    slug: 'adani-solar-surat',
    description: 'Adani Solar authorized dealer in Surat supplies premium Adani panels and provides complete installation services for residential and industrial rooftops across South Gujarat.',
    phone: '+91 79 2555 5555',
    email: 'surat@adanisolar.com',
    website: 'https://www.adanisolar.com',
    address: 'Vesu, Surat 395007',
    verified: true, featured: true, rating: 4.8, reviews: 167,
    categoryIndex: 2, citySlug: 'surat-gujarat',
  },
  {
    name: 'Waaree Energies – Surat',
    slug: 'waaree-energies-surat',
    description: 'Waaree Energies dealer in Surat offers India\'s most affordable solar panels with complete EPC services. Free site survey, DGVCL net-metering support, and subsidy assistance.',
    phone: '+91 22 6644 4444',
    email: 'surat@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Athwa Lines, Surat 395001',
    verified: true, featured: false, rating: 4.6, reviews: 134,
    categoryIndex: 0, citySlug: 'surat-gujarat',
  },
  {
    name: 'Loom Solar – Surat',
    slug: 'loom-solar-surat',
    description: 'Loom Solar dealer in Surat provides the latest Shark series bifacial panels, hybrid inverters, and complete rooftop solar systems for homes and textile industry units.',
    phone: '+91 73400 90909',
    email: 'surat@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Katargam, Surat 395004',
    verified: true, featured: false, rating: 4.7, reviews: 98,
    categoryIndex: 0, citySlug: 'surat-gujarat',
  },

  // ═══════════════════════════════════════════════
  // NAGPUR
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Nagpur',
    slug: 'tata-power-solar-nagpur',
    description: "Tata Power Solar's Nagpur partner serves Maharashtra's second largest city with quality rooftop solar installations, MSEDCL compliance, and comprehensive after-sales support.",
    phone: '+91 1800 209 4040',
    email: 'nagpur@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Dharampeth, Nagpur 440010',
    verified: true, featured: false, rating: 4.8, reviews: 97,
    categoryIndex: 0, citySlug: 'nagpur-maharashtra',
  },
  {
    name: 'Freyr Energy – Nagpur',
    slug: 'freyr-energy-nagpur',
    description: 'Freyr Energy brings its award-winning solar platform to Nagpur with local installation teams, real-time monitoring via the SolarApp, and PM Surya Ghar subsidy facilitation.',
    phone: '+91 9000 828 333',
    email: 'nagpur@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'Sitabuldi, Nagpur 440012',
    verified: true, featured: false, rating: 4.6, reviews: 63,
    categoryIndex: 0, citySlug: 'nagpur-maharashtra',
  },

  // ═══════════════════════════════════════════════
  // INDORE
  // ═══════════════════════════════════════════════
  {
    name: 'SolarSquare Energy – Indore',
    slug: 'solarsquare-energy-indore',
    description: 'SolarSquare Energy provides premium rooftop solar installations in Indore with transparent pricing, quality-assured components, and a dedicated 5-year service commitment.',
    phone: '+91 8047 105 105',
    email: 'indore@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'Vijay Nagar, Indore 452010',
    verified: true, featured: false, rating: 4.7, reviews: 89,
    categoryIndex: 0, citySlug: 'indore-madhya-pradesh',
  },
  {
    name: 'Loom Solar – Indore',
    slug: 'loom-solar-indore',
    description: 'Loom Solar dealer in Indore offers India\'s best-selling Shark bifacial panels with complete installation and MPEZ net-metering support for residential and commercial projects.',
    phone: '+91 73400 90909',
    email: 'indore@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Palasia Square, Indore 452001',
    verified: true, featured: false, rating: 4.6, reviews: 67,
    categoryIndex: 2, citySlug: 'indore-madhya-pradesh',
  },

  // ═══════════════════════════════════════════════
  // BHOPAL
  // ═══════════════════════════════════════════════
  {
    name: 'ReNew Power – Bhopal',
    slug: 'renew-power-bhopal',
    description: 'ReNew Power provides commercial and industrial solar solutions in Madhya Pradesh from its Bhopal office. Trusted by state government agencies and large industrial units.',
    phone: '+91 124 499 0300',
    email: 'bhopal@renewpower.in',
    website: 'https://www.renewpower.in',
    address: 'MP Nagar Zone II, Bhopal 462011',
    verified: true, featured: false, rating: 4.7, reviews: 56,
    categoryIndex: 1, citySlug: 'bhopal-madhya-pradesh',
  },
  {
    name: 'Tata Power Solar – Bhopal',
    slug: 'tata-power-solar-bhopal',
    description: "Tata Power Solar's Bhopal partner delivers quality residential and commercial solar with MPPKVVCL approvals and subsidy processing for MP state homeowners.",
    phone: '+91 1800 209 4040',
    email: 'bhopal@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Arera Colony, Bhopal 462016',
    verified: true, featured: false, rating: 4.8, reviews: 71,
    categoryIndex: 0, citySlug: 'bhopal-madhya-pradesh',
  },

  // ═══════════════════════════════════════════════
  // CHANDIGARH
  // ═══════════════════════════════════════════════
  {
    name: 'Ksquare Energy – Chandigarh',
    slug: 'ksquare-energy-chandigarh',
    description: 'Ksquare Energy is a leading Punjab/Chandigarh solar company providing residential and commercial rooftop installations with PSPCL-approved net-metering and subsidy assistance.',
    phone: '+91 172 500 1234',
    email: 'info@ksquareenergy.com',
    website: 'https://www.ksquareenergy.com',
    address: 'Sector 34A, Chandigarh 160022',
    verified: true, featured: false, rating: 4.6, reviews: 89,
    categoryIndex: 0, citySlug: 'chandigarh-punjab',
  },
  {
    name: 'Tata Power Solar – Chandigarh',
    slug: 'tata-power-solar-chandigarh',
    description: "Tata Power Solar's Chandigarh partner serves the tricity (Chandigarh, Panchkula, Mohali) with top-grade rooftop solar installations and PSPCL net-metering compliance.",
    phone: '+91 1800 209 4040',
    email: 'chandigarh@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Sector 17, Chandigarh 160017',
    verified: true, featured: false, rating: 4.8, reviews: 78,
    categoryIndex: 0, citySlug: 'chandigarh-punjab',
  },

  // ═══════════════════════════════════════════════
  // COIMBATORE
  // ═══════════════════════════════════════════════
  {
    name: 'KCP Solar – Coimbatore',
    slug: 'kcp-solar-coimbatore',
    description: 'KCP Solar has 37+ years of experience in solar energy. Headquartered in Coimbatore, they supply solar panels, batteries, and inverters with full EPC services across Tamil Nadu.',
    phone: '+91 422 4350 555',
    email: 'info@kcpsolar.com',
    website: 'https://www.kcpsolar.com',
    address: 'Thottipaliyam, Coimbatore 641062',
    verified: true, featured: true, rating: 4.8, reviews: 234,
    categoryIndex: 2, citySlug: 'coimbatore-tamil-nadu',
  },
  {
    name: 'MAS Solar Systems – Coimbatore',
    slug: 'mas-solar-systems-coimbatore',
    description: 'MAS Solar Systems is a Coimbatore-based solar EPC and dealer with expertise in industrial and commercial rooftop installations. Trusted by Coimbatore\'s textile and manufacturing industry.',
    phone: '+91 9585 556 502',
    email: 'info@massolar.in',
    website: 'https://www.massolar.in',
    address: '153 SIDCO Industrial Estate, Coimbatore 641050',
    verified: true, featured: false, rating: 4.6, reviews: 167,
    categoryIndex: 1, citySlug: 'coimbatore-tamil-nadu',
  },
  {
    name: 'VC Green Energy – Coimbatore',
    slug: 'vc-green-energy-coimbatore',
    description: 'VC Green Energy (HQ: Coimbatore) has installed 100+ MW of solar across Tamil Nadu and Karnataka. Full EPC services with TANGEDCO approvals and long-term O&M contracts.',
    phone: '+91 422 4204 040',
    email: 'info@vcgreen.in',
    website: 'https://www.vcgreen.in',
    address: 'Saibaba Colony, Coimbatore 641011',
    verified: true, featured: true, rating: 4.7, reviews: 312,
    categoryIndex: 1, citySlug: 'coimbatore-tamil-nadu',
  },
  {
    name: 'Jai Sunlight Systems – Coimbatore',
    slug: 'jai-sunlight-systems-coimbatore',
    description: 'Jai Sunlight Systems is a Coimbatore solar dealer and installer specialising in on-grid, off-grid, and hybrid solar solutions. Serving residential and small commercial customers.',
    phone: '+91 422 2543 210',
    email: 'info@jaisunlightsystems.com',
    website: 'https://www.jaisunlightsystems.com',
    address: '46 Mullai Nagar, Coimbatore 641033',
    verified: true, featured: false, rating: 4.5, reviews: 98,
    categoryIndex: 0, citySlug: 'coimbatore-tamil-nadu',
  },

  // ═══════════════════════════════════════════════
  // VISAKHAPATNAM
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Visakhapatnam',
    slug: 'tata-power-solar-visakhapatnam',
    description: "Tata Power Solar's Vizag representative provides rooftop solar for residential and commercial customers with APEPDCL net-metering approval and subsidy facilitation.",
    phone: '+91 1800 209 4040',
    email: 'vizag@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Dwaraka Nagar, Visakhapatnam 530016',
    verified: true, featured: false, rating: 4.8, reviews: 88,
    categoryIndex: 0, citySlug: 'visakhapatnam-andhra-pradesh',
  },
  {
    name: 'Freyr Energy – Visakhapatnam',
    slug: 'freyr-energy-visakhapatnam',
    description: 'Freyr Energy expands into Visakhapatnam with their proven rooftop solar platform — fast installations, government subsidy processing, and real-time monitoring via the SolarApp.',
    phone: '+91 9000 828 333',
    email: 'vizag@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'MVP Colony, Visakhapatnam 530017',
    verified: true, featured: false, rating: 4.6, reviews: 54,
    categoryIndex: 0, citySlug: 'visakhapatnam-andhra-pradesh',
  },

  // ═══════════════════════════════════════════════
  // KOCHI
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Kochi',
    slug: 'tata-power-solar-kochi',
    description: "Tata Power Solar's Kerala partner provides quality rooftop solar installations across Greater Kochi. KSEB-approved with smooth net-metering and comprehensive AMC packages.",
    phone: '+91 1800 209 4040',
    email: 'kochi@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Kakkanad, Kochi 682030',
    verified: true, featured: false, rating: 4.8, reviews: 112,
    categoryIndex: 0, citySlug: 'kochi-kerala',
  },
  {
    name: 'SolarSquare Energy – Kochi',
    slug: 'solarsquare-energy-kochi',
    description: 'SolarSquare Energy brings its IIT/IIM-backed solar expertise to Kerala with transparent pricing, premium components, and 5-year after-sales guarantee for Kochi homeowners.',
    phone: '+91 8047 105 105',
    email: 'kochi@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'Edapally, Kochi 682024',
    verified: true, featured: false, rating: 4.7, reviews: 87,
    categoryIndex: 0, citySlug: 'kochi-kerala',
  },

  // ═══════════════════════════════════════════════
  // VADODARA
  // ═══════════════════════════════════════════════
  {
    name: 'Adani Solar – Vadodara',
    slug: 'adani-solar-vadodara',
    description: 'Adani Solar authorized dealer in Vadodara supplies premium panels and provides EPC services for homes and industries in Baroda region. MGVCL net-metering support included.',
    phone: '+91 79 2555 5555',
    email: 'vadodara@adanisolar.com',
    website: 'https://www.adanisolar.com',
    address: 'Alkapuri, Vadodara 390005',
    verified: true, featured: false, rating: 4.7, reviews: 98,
    categoryIndex: 0, citySlug: 'vadodara-gujarat',
  },
  {
    name: 'Waaree Energies – Vadodara',
    slug: 'waaree-energies-vadodara',
    description: 'Waaree Energies dealer in Vadodara supplies Waaree\'s PERC and HJT series modules with complete installation services across Central Gujarat.',
    phone: '+91 22 6644 4444',
    email: 'vadodara@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Fatehgunj, Vadodara 390002',
    verified: true, featured: false, rating: 4.6, reviews: 74,
    categoryIndex: 2, citySlug: 'vadodara-gujarat',
  },

  // ═══════════════════════════════════════════════
  // PATNA
  // ═══════════════════════════════════════════════
  {
    name: 'Loom Solar – Patna',
    slug: 'loom-solar-patna',
    description: 'Loom Solar dealer in Patna supplies Shark bifacial panels and hybrid inverters for Bihar\'s growing solar market with BSPHCL net-metering support and PM Surya Ghar assistance.',
    phone: '+91 73400 90909',
    email: 'patna@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Boring Canal Road, Patna 800001',
    verified: true, featured: false, rating: 4.6, reviews: 76,
    categoryIndex: 0, citySlug: 'patna-bihar',
  },
  {
    name: 'Tata Power Solar – Patna',
    slug: 'tata-power-solar-patna',
    description: "Tata Power Solar's Bihar partner serves Patna with quality residential solar installations, BSPHCL approvals, and government subsidy processing under PM Surya Ghar Yojana.",
    phone: '+91 1800 209 4040',
    email: 'patna@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Patliputra Colony, Patna 800013',
    verified: true, featured: false, rating: 4.7, reviews: 54,
    categoryIndex: 0, citySlug: 'patna-bihar',
  },

  // ═══════════════════════════════════════════════
  // JODHPUR (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Solluz Energy – Jodhpur',
    slug: 'solluz-energy-jodhpur',
    description: 'Solluz Energy\'s Jodhpur team serves the Blue City\'s residential and commercial rooftop solar needs. JVVNL-approved with expert installers and strong local presence.',
    phone: '+91 291 400 0555',
    email: 'jodhpur@solluz.co.in',
    website: 'https://www.solluz.co.in',
    address: 'Shastri Nagar, Jodhpur 342003',
    verified: true, featured: false, rating: 4.6, reviews: 87,
    categoryIndex: 0, citySlug: 'jodhpur-rajasthan',
  },
  {
    name: 'Electrobeam Solar – Jodhpur',
    slug: 'electrobeam-solar-jodhpur',
    description: 'Electrobeam Solar provides comprehensive rooftop solar in Jodhpur. Specialising in on-grid residential systems with JVVNL approvals and 25-year performance warranty.',
    phone: '+91 291 410 0200',
    email: 'jodhpur@electrobeamsolar.com',
    website: 'https://www.electrobeamsolar.com',
    address: 'Pal Road, Jodhpur 342008',
    verified: true, featured: false, rating: 4.5, reviews: 63,
    categoryIndex: 0, citySlug: 'jodhpur-rajasthan',
  },
  {
    name: 'Krishna Industrial Corporation – Jodhpur',
    slug: 'krishna-industrial-corporation-jodhpur',
    description: 'Krishna Industrial Corporation is an authorised Waaree solar dealer in Jodhpur supplying Waaree modules to solar installers and industrial customers across Rajasthan.',
    phone: '+91 291 265 1234',
    email: 'info@krishnaindustrial.com',
    website: 'https://www.waaree.com/dealer-locator',
    address: 'Industrial Area, Jodhpur 342005',
    verified: true, featured: false, rating: 4.4, reviews: 42,
    categoryIndex: 2, citySlug: 'jodhpur-rajasthan',
  },

  // ═══════════════════════════════════════════════
  // UDAIPUR (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Solluz Energy – Udaipur',
    slug: 'solluz-energy-udaipur',
    description: 'Solluz Energy serves the City of Lakes with residential and commercial rooftop solar. AVVNL-approved installer with a growing footprint across South Rajasthan.',
    phone: '+91 294 400 0555',
    email: 'udaipur@solluz.co.in',
    website: 'https://www.solluz.co.in',
    address: 'Madhuban, Udaipur 313001',
    verified: true, featured: false, rating: 4.6, reviews: 67,
    categoryIndex: 0, citySlug: 'udaipur-rajasthan',
  },
  {
    name: 'Electrobeam Solar – Udaipur',
    slug: 'electrobeam-solar-udaipur',
    description: 'Electrobeam Solar delivers rooftop solar installations to Udaipur homes and businesses. Known for quality components, skilled local teams, and seamless AVVNL net-metering.',
    phone: '+91 294 410 0200',
    email: 'udaipur@electrobeamsolar.com',
    website: 'https://www.electrobeamsolar.com',
    address: 'Sector 11, Udaipur 313002',
    verified: true, featured: false, rating: 4.5, reviews: 54,
    categoryIndex: 0, citySlug: 'udaipur-rajasthan',
  },
  {
    name: 'Rukmani Group – Udaipur',
    slug: 'rukmani-group-udaipur',
    description: 'Rukmani Group is a diversified Udaipur conglomerate with a solar division providing rooftop and ground-mounted installations across South Rajasthan using quality Tier-1 modules.',
    phone: '+91 294 250 1234',
    email: 'solar@rukmani.org',
    website: 'https://www.rukmani.org',
    address: 'NH8, Bhuwana, Udaipur 313001',
    verified: true, featured: false, rating: 4.5, reviews: 48,
    categoryIndex: 0, citySlug: 'udaipur-rajasthan',
  },

  // ═══════════════════════════════════════════════
  // DEHRADUN (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'SNS Energy Systems – Dehradun',
    slug: 'sns-energy-systems-dehradun',
    description: 'SNS Energy Systems is Dehradun\'s leading solar solutions provider. MNRE-certified with 10+ years of installations across Uttarakhand for homes, hotels, and institutions.',
    phone: '+91 9897 085 222',
    email: 'info@snsenergy.in',
    website: 'https://www.snsenergy.in',
    address: 'OM Tower, GMS Road, Dehradun 248001',
    verified: true, featured: true, rating: 4.8, reviews: 156,
    categoryIndex: 0, citySlug: 'dehradun-uttarakhand',
  },
  {
    name: 'Think Solar Energy – Dehradun',
    slug: 'think-solar-energy-dehradun',
    description: 'Think Solar Energy has been serving Uttarakhand since 1993. One of the oldest solar companies in the state with expertise in residential, off-grid, and government solar projects.',
    phone: '+91 135 275 1234',
    email: 'info@thinksolarenergy.org',
    website: 'https://www.thinksolarenergy.org',
    address: 'Rajpur Road, Dehradun 248001',
    verified: true, featured: false, rating: 4.6, reviews: 198,
    categoryIndex: 0, citySlug: 'dehradun-uttarakhand',
  },
  {
    name: 'ASR Solar India – Dehradun',
    slug: 'asr-solar-india-dehradun',
    description: 'ASR Solar India provides complete solar energy solutions in Dehradun including on-grid, off-grid, and hybrid systems for residential and commercial applications.',
    phone: '+91 135 265 5678',
    email: 'info@asrsolar.com',
    website: 'https://www.asrsolar.com',
    address: 'Chakrata Road, Dehradun 248001',
    verified: true, featured: false, rating: 4.5, reviews: 87,
    categoryIndex: 0, citySlug: 'dehradun-uttarakhand',
  },
  {
    name: 'Ornate Solar – Dehradun',
    slug: 'ornate-solar-dehradun',
    description: 'Ornate Solar is a Delhi-NCR solar brand with a Dehradun presence, offering quality monocrystalline solar systems for residential and commercial customers in Uttarakhand.',
    phone: '+91 11 4103 9000',
    email: 'dehradun@ornatesolar.com',
    website: 'https://www.ornatesolar.com',
    address: 'Sahastradhara Road, Dehradun 248001',
    verified: true, featured: false, rating: 4.6, reviews: 64,
    categoryIndex: 0, citySlug: 'dehradun-uttarakhand',
  },
  {
    name: 'Sky Sunrise Energy – Dehradun',
    slug: 'sky-sunrise-energy-dehradun',
    description: 'Sky Sunrise Energy provides solar panels, inverters, and full EPC services in Dehradun. Specialising in off-grid and hybrid systems for hill-area homes and resorts.',
    phone: '+91 135 260 9876',
    email: 'info@skysunriseenergy.com',
    website: 'https://www.skysunriseenergy.com',
    address: 'Vasant Vihar, Dehradun 248006',
    verified: false, featured: false, rating: 4.3, reviews: 43,
    categoryIndex: 0, citySlug: 'dehradun-uttarakhand',
  },

  // ═══════════════════════════════════════════════
  // AMRITSAR (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Solar Panel Expert – Amritsar',
    slug: 'solar-panel-expert-amritsar',
    description: 'Solar Panel Expert is Amritsar\'s top-rated solar installer offering on-grid and off-grid systems for homes and businesses. PSPCL-approved with prompt service across Punjab.',
    phone: '+91 8837 859 995',
    email: 'info@solarpanelexpert.in',
    website: 'https://www.solarpanelexpert.in',
    address: 'Lawrence Road, Amritsar 143001',
    verified: true, featured: true, rating: 4.8, reviews: 178,
    categoryIndex: 0, citySlug: 'amritsar-punjab',
  },
  {
    name: 'Ksquare Energy – Amritsar',
    slug: 'ksquare-energy-amritsar',
    description: 'Ksquare Energy extends its Punjab solar expertise to Amritsar with PSPCL-approved rooftop installations, subsidy coordination, and comprehensive 5-year AMC packages.',
    phone: '+91 172 500 1234',
    email: 'amritsar@ksquareenergy.com',
    website: 'https://www.ksquareenergy.com',
    address: 'Majitha Verka Bypass, Amritsar 143001',
    verified: true, featured: false, rating: 4.6, reviews: 87,
    categoryIndex: 0, citySlug: 'amritsar-punjab',
  },
  {
    name: 'Tata Power Solar – Amritsar',
    slug: 'tata-power-solar-amritsar',
    description: "Tata Power Solar's authorized partner in Amritsar provides reliable rooftop solar for homes and businesses with PSPCL-compliant installation and subsidy assistance.",
    phone: '+91 1800 209 4040',
    email: 'amritsar@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Ranjit Avenue, Amritsar 143001',
    verified: true, featured: false, rating: 4.8, reviews: 98,
    categoryIndex: 0, citySlug: 'amritsar-punjab',
  },

  // ═══════════════════════════════════════════════
  // LUDHIANA (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Tecsa Solar System – Ludhiana',
    slug: 'tecsa-solar-system-ludhiana',
    description: 'Tecsa Solar System is a leading Ludhiana solar company with 10+ years of experience. Authorized installer for top brands with PSPCL net-metering expertise and industrial solar specialisation.',
    phone: '+91 9821 465 584',
    email: 'info@tecsasolar.com',
    website: 'https://www.tecsasolar.com',
    address: 'Madhok Complex, Ferozpur Road, Ludhiana 141001',
    verified: true, featured: true, rating: 4.7, reviews: 167,
    categoryIndex: 1, citySlug: 'ludhiana-punjab',
  },
  {
    name: 'Ksquare Energy – Ludhiana',
    slug: 'ksquare-energy-ludhiana',
    description: 'Ksquare Energy serves Ludhiana\'s residential and commercial solar market with PSPCL-approved net-metering installations, subsidy facilitation, and premium AMC services.',
    phone: '+91 172 500 1234',
    email: 'ludhiana@ksquareenergy.com',
    website: 'https://www.ksquareenergy.com',
    address: 'BRS Nagar, Ludhiana 141012',
    verified: true, featured: false, rating: 4.6, reviews: 134,
    categoryIndex: 0, citySlug: 'ludhiana-punjab',
  },
  {
    name: 'Vedprakash Solar – Ludhiana',
    slug: 'vedprakash-solar-ludhiana',
    description: 'Vedprakash Solar is an authorized Waaree dealer in Ludhiana supplying Waaree modules and providing complete solar installation services for Ludhiana\'s large industrial belt.',
    phone: '+91 161 500 4321',
    email: 'info@vedprakashsolar.com',
    website: 'https://www.waaree.com/dealer-locator',
    address: 'Focal Point, Ludhiana 141010',
    verified: true, featured: false, rating: 4.4, reviews: 56,
    categoryIndex: 2, citySlug: 'ludhiana-punjab',
  },

  // ═══════════════════════════════════════════════
  // NASHIK (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Nashik',
    slug: 'tata-power-solar-nashik',
    description: "Tata Power Solar's Nashik partner serves the Nashik district with quality rooftop solar installations, MSEDCL-approved net-metering, and PM Surya Ghar subsidy support.",
    phone: '+91 1800 209 4040',
    email: 'nashik@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'College Road, Nashik 422005',
    verified: true, featured: false, rating: 4.8, reviews: 89,
    categoryIndex: 0, citySlug: 'nashik-maharashtra',
  },
  {
    name: 'SolarSquare Energy – Nashik',
    slug: 'solarsquare-energy-nashik',
    description: 'SolarSquare Energy expands to Nashik with its premium rooftop solar offering — transparent pricing, quality-assured installations, and a 5-year service commitment for homeowners.',
    phone: '+91 8047 105 105',
    email: 'nashik@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'Gangapur Road, Nashik 422013',
    verified: true, featured: false, rating: 4.7, reviews: 67,
    categoryIndex: 0, citySlug: 'nashik-maharashtra',
  },
  {
    name: 'Freyr Energy – Nashik',
    slug: 'freyr-energy-nashik',
    description: 'Freyr Energy serves Nashik homeowners and businesses with tech-enabled solar installations, government subsidy processing, and real-time SolarApp monitoring.',
    phone: '+91 9000 828 333',
    email: 'nashik@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'Trimbak Road, Nashik 422002',
    verified: true, featured: false, rating: 4.6, reviews: 54,
    categoryIndex: 0, citySlug: 'nashik-maharashtra',
  },
  {
    name: 'Ornate Solar – Nashik',
    slug: 'ornate-solar-nashik',
    description: 'Ornate Solar provides Nashik customers with quality monocrystalline solar systems, free site survey, and full installation services for homes and small commercial units.',
    phone: '+91 11 4103 9000',
    email: 'nashik@ornatesolar.com',
    website: 'https://www.ornatesolar.com',
    address: 'Pathardi Phata, Nashik 422010',
    verified: false, featured: false, rating: 4.4, reviews: 38,
    categoryIndex: 0, citySlug: 'nashik-maharashtra',
  },
  {
    name: 'Vishal Enterprises Solar – Nashik',
    slug: 'vishal-enterprises-solar-nashik',
    description: 'Vishal Enterprises is an authorized Waaree dealer in Nashik supplying high-quality Waaree monocrystalline modules to installers and end customers across North Maharashtra.',
    phone: '+91 253 231 4567',
    email: 'info@vishalenterprisesnashik.com',
    website: 'https://www.waaree.com/dealer-locator',
    address: 'MIDC Satpur, Nashik 422007',
    verified: true, featured: false, rating: 4.4, reviews: 47,
    categoryIndex: 2, citySlug: 'nashik-maharashtra',
  },

  // ═══════════════════════════════════════════════
  // AURANGABAD (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Freyr Energy – Aurangabad',
    slug: 'freyr-energy-aurangabad',
    description: 'Freyr Energy brings its award-winning solar platform to Aurangabad (Chhatrapati Sambhajinagar) with local installation teams, MSEDCL approvals, and full subsidy assistance.',
    phone: '+91 9000 828 333',
    email: 'aurangabad@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'Jalna Road, Aurangabad 431001',
    verified: true, featured: false, rating: 4.6, reviews: 63,
    categoryIndex: 0, citySlug: 'aurangabad-maharashtra',
  },
  {
    name: 'Majestic Solar – Aurangabad',
    slug: 'majestic-solar-aurangabad',
    description: 'Majestic Solar is a local Aurangabad solar company providing residential and small commercial rooftop installations. Known for competitive pricing and prompt after-sales service.',
    phone: '+91 240 233 5678',
    email: 'info@majesticsolar.net',
    website: 'https://www.majesticsolar.net',
    address: 'Shop 104, Apna Bazar, Jalna Road, Aurangabad 431001',
    verified: true, featured: false, rating: 4.4, reviews: 78,
    categoryIndex: 0, citySlug: 'aurangabad-maharashtra',
  },
  {
    name: 'Tata Power Solar – Aurangabad',
    slug: 'tata-power-solar-aurangabad',
    description: "Tata Power Solar's Aurangabad partner serves the Marathwada region with quality solar installations, MSEDCL net-metering compliance, and government subsidy processing.",
    phone: '+91 1800 209 4040',
    email: 'aurangabad@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Cidco Colony, Aurangabad 431003',
    verified: true, featured: false, rating: 4.7, reviews: 54,
    categoryIndex: 0, citySlug: 'aurangabad-maharashtra',
  },

  // ═══════════════════════════════════════════════
  // MADURAI (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'VC Green Energy – Madurai',
    slug: 'vc-green-energy-madurai',
    description: 'VC Green Energy serves Madurai and the greater South Tamil Nadu region. Expert in TANGEDCO-approved rooftop solar with 100+ MW installed across Tamil Nadu.',
    phone: '+91 452 420 4040',
    email: 'madurai@vcgreen.in',
    website: 'https://www.vcgreen.in',
    address: 'Anna Nagar, Madurai 625020',
    verified: true, featured: true, rating: 4.7, reviews: 134,
    categoryIndex: 0, citySlug: 'madurai-tamil-nadu',
  },
  {
    name: 'Tata Power Solar – Madurai',
    slug: 'tata-power-solar-madurai',
    description: "Tata Power Solar's Madurai partner delivers quality residential and commercial solar installations with TANGEDCO-approved net-metering across Southern Tamil Nadu.",
    phone: '+91 1800 209 4040',
    email: 'madurai@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Bypass Road, Madurai 625010',
    verified: true, featured: false, rating: 4.8, reviews: 87,
    categoryIndex: 0, citySlug: 'madurai-tamil-nadu',
  },

  // ═══════════════════════════════════════════════
  // TIRUCHIRAPPALLI (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'VC Green Energy – Tiruchirappalli',
    slug: 'vc-green-energy-trichy',
    description: 'VC Green Energy\'s Trichy team covers Tiruchirappalli and the Cauvery delta region with TANGEDCO-compliant solar installations and strong after-sales service.',
    phone: '+91 431 420 4040',
    email: 'trichy@vcgreen.in',
    website: 'https://www.vcgreen.in',
    address: 'Thillai Nagar, Tiruchirappalli 620018',
    verified: true, featured: false, rating: 4.6, reviews: 89,
    categoryIndex: 0, citySlug: 'tiruchirappalli-tamil-nadu',
  },
  {
    name: 'KCP Solar – Tiruchirappalli',
    slug: 'kcp-solar-trichy',
    description: 'KCP Solar extends its 37+ years of Tamil Nadu solar expertise to Trichy, offering residential panels, commercial installations, and comprehensive AMC services.',
    phone: '+91 422 4350 555',
    email: 'trichy@kcpsolar.com',
    website: 'https://www.kcpsolar.com',
    address: 'Srirangam, Tiruchirappalli 620006',
    verified: true, featured: false, rating: 4.5, reviews: 67,
    categoryIndex: 2, citySlug: 'tiruchirappalli-tamil-nadu',
  },

  // ═══════════════════════════════════════════════
  // MANGALORE (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Powerrays Solar – Mangalore',
    slug: 'powerrays-solar-mangalore',
    description: 'Powerrays is an authorized Tata Power Solar channel partner serving Mangalore, Hubli, and Mysore. Expert in MESCOM-approved installations with quality-assured workmanship.',
    phone: '+91 8970 820 110',
    email: 'info@powerrays.in',
    website: 'https://www.powerrays.in',
    address: 'Hampankatta, Mangalore 575001',
    verified: true, featured: true, rating: 4.7, reviews: 143,
    categoryIndex: 0, citySlug: 'mangalore-karnataka',
  },
  {
    name: 'Das Energie – Mangalore',
    slug: 'das-energie-mangalore',
    description: 'Das Energie is a pan-South-India solar company with a Mangalore service centre. Provides residential, commercial, and industrial solar with Waaree and other Tier-1 module brands.',
    phone: '+91 824 248 9012',
    email: 'mangalore@dasenergie.com',
    website: 'https://www.dasenergie.com',
    address: 'Lalbagh, Mangalore 575003',
    verified: true, featured: false, rating: 4.5, reviews: 87,
    categoryIndex: 0, citySlug: 'mangalore-karnataka',
  },
  {
    name: 'Cadsolar Systems – Mangalore',
    slug: 'cadsolar-systems-mangalore',
    description: 'Cadsolar Systems is a Mangalore-based solar dealer and installer supplying Waaree modules and providing complete EPC services for homes and businesses in Coastal Karnataka.',
    phone: '+91 824 249 3456',
    email: 'info@cadsolarsystems.com',
    website: 'https://www.cadsolarsystems.com',
    address: 'Attavar, Mangalore 575001',
    verified: true, featured: false, rating: 4.5, reviews: 63,
    categoryIndex: 2, citySlug: 'mangalore-karnataka',
  },

  // ═══════════════════════════════════════════════
  // MYSORE (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'SolarSquare Energy – Mysore',
    slug: 'solarsquare-energy-mysore',
    description: 'SolarSquare Energy serves Mysore homeowners with premium rooftop solar at transparent prices. CESC-Mysore approved with 5-year service guarantee and real-time monitoring.',
    phone: '+91 8047 105 105',
    email: 'mysore@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'Gokulam, Mysore 570002',
    verified: true, featured: false, rating: 4.7, reviews: 89,
    categoryIndex: 0, citySlug: 'mysore-karnataka',
  },
  {
    name: 'Powerrays Solar – Mysore',
    slug: 'powerrays-solar-mysore',
    description: 'Powerrays, a Tata Power Solar channel partner, provides residential and commercial solar installations in Mysore with CESC-approved net-metering and quality workmanship.',
    phone: '+91 8970 820 110',
    email: 'mysore@powerrays.in',
    website: 'https://www.powerrays.in',
    address: 'Saraswathipuram, Mysore 570009',
    verified: true, featured: false, rating: 4.6, reviews: 76,
    categoryIndex: 0, citySlug: 'mysore-karnataka',
  },

  // ═══════════════════════════════════════════════
  // GUWAHATI (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Solar Prabha – Guwahati',
    slug: 'solar-prabha-guwahati',
    description: 'Solar Prabha is a leading Northeast India solar company headquartered in Guwahati. MNRE-empanelled EPC with government project experience and installations across 7 sister states.',
    phone: '+91 361 254 5678',
    email: 'info@solarprabha.com',
    website: 'https://www.solarprabha.com',
    address: 'GS Road, Ulubari, Guwahati 781007',
    verified: true, featured: true, rating: 4.7, reviews: 134,
    categoryIndex: 0, citySlug: 'guwahati-assam',
  },
  {
    name: 'Nexgen Energia – Guwahati',
    slug: 'nexgen-energia-guwahati',
    description: 'Nexgen Energia provides solar panel supply and EPC services in Northeast India from its Guwahati base. Specialising in off-grid and hybrid systems suited to the Northeast\'s grid conditions.',
    phone: '+91 8800 599 662',
    email: 'info@nexgenenergia.com',
    website: 'https://www.nexgenenergia.com',
    address: 'Ganeshguri, Guwahati 781005',
    verified: true, featured: false, rating: 4.5, reviews: 87,
    categoryIndex: 0, citySlug: 'guwahati-assam',
  },
  {
    name: 'Tata Power Solar – Guwahati',
    slug: 'tata-power-solar-guwahati',
    description: "Tata Power Solar's Northeast representative in Guwahati provides quality solar installations with APDCL compliance, government project support, and after-sales service across Assam.",
    phone: '+91 1800 209 4040',
    email: 'guwahati@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Zoo Road, Guwahati 781005',
    verified: true, featured: false, rating: 4.7, reviews: 67,
    categoryIndex: 0, citySlug: 'guwahati-assam',
  },
  {
    name: 'Ram Sang Infrastructure – Guwahati',
    slug: 'ram-sang-infrastructure-guwahati',
    description: 'Ram Sang Infrastructure is an authorized Waaree dealer in Guwahati supplying Waaree solar panels and providing installation services across Assam and the Northeast.',
    phone: '+91 361 245 3456',
    email: 'info@ramsanginfra.com',
    website: 'https://www.waaree.com/dealer-locator',
    address: 'Fancy Bazar, Guwahati 781001',
    verified: true, featured: false, rating: 4.3, reviews: 45,
    categoryIndex: 2, citySlug: 'guwahati-assam',
  },

  // ═══════════════════════════════════════════════
  // VARANASI (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Loom Solar – Varanasi',
    slug: 'loom-solar-varanasi',
    description: 'Loom Solar dealer in Varanasi provides Shark bifacial panels, hybrid inverters, and complete on-grid solar solutions. UPPCL-approved installer with PM Surya Ghar subsidy support.',
    phone: '+91 73400 90909',
    email: 'varanasi@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Sigra, Varanasi 221010',
    verified: true, featured: true, rating: 4.7, reviews: 134,
    categoryIndex: 0, citySlug: 'varanasi-uttar-pradesh',
  },
  {
    name: 'Nirmla Solar Power – Varanasi',
    slug: 'nirmla-solar-power-varanasi',
    description: 'Nirmla Solar Power (NSPG) is a Varanasi-based solar company with 8+ years of experience. Specialising in residential and off-grid solar for the holy city and surrounding Purvanchal region.',
    phone: '+91 9415 224 567',
    email: 'info@nspg.in',
    website: 'https://www.nspg.in',
    address: 'N 1/66-R-15K, Ganga Vihar Colony, Varanasi 221005',
    verified: true, featured: false, rating: 4.5, reviews: 98,
    categoryIndex: 0, citySlug: 'varanasi-uttar-pradesh',
  },
  {
    name: 'SolarSquare Energy – Varanasi',
    slug: 'solarsquare-energy-varanasi',
    description: 'SolarSquare Energy serves Varanasi homeowners with premium rooftop solar at transparent prices. UPPCL-compliant net-metering with 5-year service guarantee.',
    phone: '+91 8047 105 105',
    email: 'varanasi@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'Lanka, BHU Area, Varanasi 221005',
    verified: true, featured: false, rating: 4.6, reviews: 76,
    categoryIndex: 0, citySlug: 'varanasi-uttar-pradesh',
  },

  // ═══════════════════════════════════════════════
  // AGRA (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Loom Solar – Agra',
    slug: 'loom-solar-agra',
    description: 'Loom Solar dealer in Agra provides Shark bifacial and MONO PERC panels with full EPC services. UPPCL-approved with PM Surya Ghar subsidy processing for Agra homeowners.',
    phone: '+91 73400 90909',
    email: 'agra@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Sanjay Place, Agra 282002',
    verified: true, featured: false, rating: 4.7, reviews: 112,
    categoryIndex: 0, citySlug: 'agra-uttar-pradesh',
  },
  {
    name: 'Starfield Renewables – Agra',
    slug: 'starfield-renewables-agra',
    description: 'Starfield Renewables is an established Agra solar company with roots dating to the 1980s. Provides residential, commercial, and institutional solar installations across Western UP.',
    phone: '+91 562 400 5678',
    email: 'info@starfieldsolar.in',
    website: 'https://www.starfieldsolar.in',
    address: '10/9B Katra Wazir Khan, Agra 282006',
    verified: true, featured: true, rating: 4.6, reviews: 143,
    categoryIndex: 0, citySlug: 'agra-uttar-pradesh',
  },
  {
    name: 'Grun Power – Agra',
    slug: 'grun-power-agra',
    description: 'Grun Power (HQ: Greater Noida) serves Agra and Western UP with rooftop solar installations, EPC services, and solar product supply for residential and commercial customers.',
    phone: '+91 9643 449 898',
    email: 'info@grunpower.in',
    website: 'https://www.grunpower.in',
    address: 'Sikandra, Agra 282007',
    verified: true, featured: false, rating: 4.5, reviews: 67,
    categoryIndex: 0, citySlug: 'agra-uttar-pradesh',
  },
  {
    name: 'HFM Solar – Agra',
    slug: 'hfm-solar-agra',
    description: 'HFM Solar is an Agra-based solar dealer and installer providing complete solar solutions for residences, commercial buildings, and petrol pumps across the Braj region.',
    phone: '+91 562 245 9876',
    email: 'info@hfmsolar.com',
    website: 'https://www.hfmsolar.com',
    address: 'Bodla Road, Agra 282001',
    verified: false, featured: false, rating: 4.3, reviews: 54,
    categoryIndex: 0, citySlug: 'agra-uttar-pradesh',
  },

  // ═══════════════════════════════════════════════
  // BHUBANESWAR (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Bhubaneswar',
    slug: 'tata-power-solar-bhubaneswar',
    description: "Tata Power Solar's Odisha representative provides rooftop solar in Bhubaneswar with TPCODL/WESCO approvals, government subsidy coordination, and comprehensive AMC.",
    phone: '+91 1800 209 4040',
    email: 'bhubaneswar@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Sahid Nagar, Bhubaneswar 751007',
    verified: true, featured: false, rating: 4.8, reviews: 89,
    categoryIndex: 0, citySlug: 'bhubaneswar-odisha',
  },
  {
    name: 'Kamini Infrastructure – Bhubaneswar',
    slug: 'kamini-infrastructure-bhubaneswar',
    description: 'Kamini Infrastructure is a Bhubaneswar solar EPC company with deep Odisha market knowledge. MNRE-empanelled with government project credentials and residential expertise.',
    phone: '+91 9861 598 382',
    email: 'info@kaminiinfra.com',
    website: 'https://www.kaminiinfra.com',
    address: 'Lane No 11, Jagamara, Bhubaneswar 751030',
    verified: true, featured: false, rating: 4.5, reviews: 78,
    categoryIndex: 0, citySlug: 'bhubaneswar-odisha',
  },
  {
    name: 'Das Energie – Bhubaneswar',
    slug: 'das-energie-bhubaneswar',
    description: 'Das Energie serves Bhubaneswar and Odisha with residential and commercial rooftop solar using quality Tier-1 modules. TPCODL-approved with strong local installation teams.',
    phone: '+91 674 248 9012',
    email: 'bhubaneswar@dasenergie.com',
    website: 'https://www.dasenergie.com',
    address: 'Nayapalli, Bhubaneswar 751015',
    verified: true, featured: false, rating: 4.6, reviews: 63,
    categoryIndex: 0, citySlug: 'bhubaneswar-odisha',
  },
  {
    name: 'Lifeliner Solar – Bhubaneswar',
    slug: 'lifeliner-solar-bhubaneswar',
    description: 'Lifeliner Solar is an authorized Waaree dealer in Bhubaneswar supplying Waaree monocrystalline panels and providing complete solar installations across Coastal Odisha.',
    phone: '+91 674 253 4567',
    email: 'info@liftlinersolar.com',
    website: 'https://www.waaree.com/dealer-locator',
    address: 'Rasulgarh, Bhubaneswar 751010',
    verified: true, featured: false, rating: 4.4, reviews: 45,
    categoryIndex: 2, citySlug: 'bhubaneswar-odisha',
  },
  {
    name: 'OmmSai Power – Bhubaneswar',
    slug: 'ommsai-power-bhubaneswar',
    description: 'OmmSai Power is a Bhubaneswar solar dealer specialising in Waaree modules and hybrid inverter systems. Serving residential and small commercial customers across Bhubaneswar-Cuttack region.',
    phone: '+91 674 265 4321',
    email: 'info@ommsaipower.com',
    website: 'https://www.ommsaipower.com',
    address: 'Chandrasekharpur, Bhubaneswar 751016',
    verified: false, featured: false, rating: 4.3, reviews: 38,
    categoryIndex: 2, citySlug: 'bhubaneswar-odisha',
  },
  {
    name: 'Maharana Brothers – Cuttack',
    slug: 'maharana-brothers-cuttack',
    description: 'Maharana Brothers & Co is a long-established Odisha solar dealer providing Waaree and other Tier-1 modules to solar installers and direct customers across Cuttack and coastal Odisha.',
    phone: '+91 671 230 5678',
    email: 'info@maharanabrothers.com',
    website: 'https://www.odishasolar.com',
    address: 'Badambadi Colony, Cuttack 753012',
    verified: true, featured: false, rating: 4.5, reviews: 67,
    categoryIndex: 2, citySlug: 'bhubaneswar-odisha',
  },

  // ═══════════════════════════════════════════════
  // RAIPUR (New Tier 2)
  // ═══════════════════════════════════════════════
  {
    name: 'Techno Sun Energy – Raipur',
    slug: 'techno-sun-energy-raipur',
    description: 'Techno Sun Energy is Raipur\'s leading solar company offering on-grid rooftop installations for homes and businesses. CSPDCL-approved with strong project management capabilities.',
    phone: '+91 771 400 5678',
    email: 'info@technosunenergy.com',
    website: 'https://www.technosunenergy.com',
    address: '149, Progressive Point, Pachpedi Naka Road, Raipur 492001',
    verified: true, featured: true, rating: 4.7, reviews: 134,
    categoryIndex: 0, citySlug: 'raipur-chhattisgarh',
  },
  {
    name: 'Swastik Solar – Raipur',
    slug: 'swastik-solar-raipur',
    description: 'Swastik Solar provides rooftop solar installations across Chhattisgarh with CSPDCL-approved net-metering. Known for quality workmanship and strong after-sales support.',
    phone: '+91 771 400 9012',
    email: 'info@swastiksolar.co.in',
    website: 'https://www.swastiksolar.co.in',
    address: 'Opp. CSEB Office, Kailash Nagar, Rajnandgaon, Chhattisgarh 491441',
    verified: true, featured: false, rating: 4.5, reviews: 89,
    categoryIndex: 0, citySlug: 'raipur-chhattisgarh',
  },
  {
    name: 'Neat Nature Solar – Raipur',
    slug: 'neat-nature-solar-raipur',
    description: 'Neat Nature Solar is an authorized Waaree dealer in Raipur offering premium monocrystalline panels and complete installation services for Chhattisgarh\'s growing solar market.',
    phone: '+91 771 253 4567',
    email: 'info@neatnature.com',
    website: 'https://www.waaree.com/dealer-locator',
    address: 'Telibandha, Raipur 492001',
    verified: true, featured: false, rating: 4.4, reviews: 54,
    categoryIndex: 2, citySlug: 'raipur-chhattisgarh',
  },
  {
    name: 'Tata Power Solar – Raipur',
    slug: 'tata-power-solar-raipur',
    description: "Tata Power Solar's Chhattisgarh partner serves Raipur with quality residential solar installations, CSPDCL-approved net-metering, and PM Surya Ghar subsidy support.",
    phone: '+91 1800 209 4040',
    email: 'raipur@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Shankar Nagar, Raipur 492007',
    verified: true, featured: false, rating: 4.7, reviews: 67,
    categoryIndex: 0, citySlug: 'raipur-chhattisgarh',
  },

  // ═══════════════════════════════════════════════
  // THIRUVANANTHAPURAM
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Thiruvananthapuram',
    slug: 'tata-power-solar-thiruvananthapuram',
    description: "Tata Power Solar's Kerala capital office provides rooftop solar for homes and institutions. KSEB-approved with net-metering support and PM Surya Ghar subsidy processing.",
    phone: '+91 1800 209 4040',
    email: 'trivandrum@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Kowdiar, Thiruvananthapuram 695003',
    verified: true, featured: false, rating: 4.8, reviews: 123,
    categoryIndex: 0, citySlug: 'thiruvananthapuram-kerala',
  },
  {
    name: 'Vikram Solar – Thiruvananthapuram',
    slug: 'vikram-solar-thiruvananthapuram',
    description: 'Vikram Solar dealer in Thiruvananthapuram supplies ELDORA series high-efficiency panels. EPC services for residential, commercial, and government projects across Kerala.',
    phone: '+91 33 6625 7700',
    email: 'trivandrum@vikramsolar.com',
    website: 'https://www.vikramsolar.com',
    address: 'Technopark Phase I, Thiruvananthapuram 695581',
    verified: true, featured: false, rating: 4.6, reviews: 78,
    categoryIndex: 2, citySlug: 'thiruvananthapuram-kerala',
  },
  {
    name: 'Waaree Energies – Thiruvananthapuram',
    slug: 'waaree-energies-thiruvananthapuram',
    description: "Waaree Energies authorized dealer in Kerala's capital supplies Waaree's premium monocrystalline modules with installation support and KSEB net-metering expertise.",
    phone: '+91 22 6644 4444',
    email: 'trivandrum@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Pattom, Thiruvananthapuram 695004',
    verified: true, featured: false, rating: 4.5, reviews: 65,
    categoryIndex: 2, citySlug: 'thiruvananthapuram-kerala',
  },

  // ═══════════════════════════════════════════════
  // KOZHIKODE (CALICUT)
  // ═══════════════════════════════════════════════
  {
    name: 'SolarSquare Energy – Kozhikode',
    slug: 'solarsquare-energy-kozhikode',
    description: 'SolarSquare Energy serves Kozhikode and North Kerala with premium rooftop solar at transparent prices. KSEB-compliant with 5-year service commitment.',
    phone: '+91 8047 105 105',
    email: 'kozhikode@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'Calicut Beach Road, Kozhikode 673001',
    verified: true, featured: false, rating: 4.7, reviews: 87,
    categoryIndex: 0, citySlug: 'kozhikode-kerala',
  },
  {
    name: 'Loom Solar – Kozhikode',
    slug: 'loom-solar-kozhikode',
    description: "Loom Solar dealer in Kozhikode supplies Shark bifacial panels and hybrid inverters. Full EPC services with KSEB-approved net-metering and Kerala state subsidy support.",
    phone: '+91 73400 90909',
    email: 'kozhikode@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Mavoor Road, Kozhikode 673004',
    verified: true, featured: false, rating: 4.6, reviews: 63,
    categoryIndex: 0, citySlug: 'kozhikode-kerala',
  },

  // ═══════════════════════════════════════════════
  // HUBLI-DHARWAD
  // ═══════════════════════════════════════════════
  {
    name: 'Powerrays Solar – Hubli',
    slug: 'powerrays-solar-hubli',
    description: 'Powerrays, a Tata Power Solar channel partner, serves Hubli-Dharwad with HESCOM-approved rooftop solar installations. Expert team covering residential and industrial customers.',
    phone: '+91 8970 820 110',
    email: 'hubli@powerrays.in',
    website: 'https://www.powerrays.in',
    address: 'Vidyanagar, Hubli 580031',
    verified: true, featured: false, rating: 4.6, reviews: 98,
    categoryIndex: 0, citySlug: 'hubli-karnataka',
  },
  {
    name: 'Tata Power Solar – Hubli',
    slug: 'tata-power-solar-hubli',
    description: "Tata Power Solar's North Karnataka representative serves Hubli with quality solar installations and HESCOM net-metering support for residential and commercial customers.",
    phone: '+91 1800 209 4040',
    email: 'hubli@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Keshwapur, Hubli 580023',
    verified: true, featured: false, rating: 4.7, reviews: 76,
    categoryIndex: 0, citySlug: 'hubli-karnataka',
  },
  {
    name: 'Waaree Energies – Hubli',
    slug: 'waaree-energies-hubli',
    description: 'Waaree Energies dealer in Hubli-Dharwad supplies Waaree premium panels for installers and end customers. HESCOM-approved with full installation support.',
    phone: '+91 22 6644 4444',
    email: 'hubli@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Gokul Road, Hubli 580030',
    verified: true, featured: false, rating: 4.4, reviews: 54,
    categoryIndex: 2, citySlug: 'hubli-karnataka',
  },

  // ═══════════════════════════════════════════════
  // BELGAUM (BELAGAVI)
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Belgaum',
    slug: 'tata-power-solar-belgaum',
    description: "Tata Power Solar's Belgaum partner provides rooftop solar with HESCOM approval. Serving Belgaum's growing residential market and the industrial belt near the Pune-Bangalore highway.",
    phone: '+91 1800 209 4040',
    email: 'belgaum@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Hindwadi, Belgaum 590011',
    verified: true, featured: false, rating: 4.6, reviews: 65,
    categoryIndex: 0, citySlug: 'belgaum-karnataka',
  },
  {
    name: 'SolarSquare Energy – Belgaum',
    slug: 'solarsquare-energy-belgaum',
    description: 'SolarSquare Energy serves Belgaum homeowners with transparent pricing and premium components. HESCOM-compliant solar with 5-year service guarantee.',
    phone: '+91 8047 105 105',
    email: 'belgaum@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'Shahapur, Belgaum 590001',
    verified: true, featured: false, rating: 4.5, reviews: 48,
    categoryIndex: 0, citySlug: 'belgaum-karnataka',
  },

  // ═══════════════════════════════════════════════
  // RAJKOT
  // ═══════════════════════════════════════════════
  {
    name: 'Adani Solar – Rajkot',
    slug: 'adani-solar-rajkot',
    description: 'Adani Solar authorized dealer in Rajkot supplies premium Adani HiKu modules and provides complete EPC for Rajkot and Saurashtra region with PGVCL net-metering support.',
    phone: '+91 79 2555 5555',
    email: 'rajkot@adanisolar.com',
    website: 'https://www.adanisolar.com',
    address: 'Yagnik Road, Rajkot 360001',
    verified: true, featured: false, rating: 4.7, reviews: 112,
    categoryIndex: 2, citySlug: 'rajkot-gujarat',
  },
  {
    name: 'Waaree Energies – Rajkot',
    slug: 'waaree-energies-rajkot',
    description: 'Waaree Energies dealer in Rajkot supplies Waaree modules to installers across Saurashtra. Full EPC services with PGVCL approvals and PM Surya Ghar subsidy processing.',
    phone: '+91 22 6644 4444',
    email: 'rajkot@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Kalawad Road, Rajkot 360005',
    verified: true, featured: false, rating: 4.5, reviews: 89,
    categoryIndex: 0, citySlug: 'rajkot-gujarat',
  },
  {
    name: 'Loom Solar – Rajkot',
    slug: 'loom-solar-rajkot',
    description: 'Loom Solar dealer in Rajkot offers Shark bifacial panels and hybrid inverters. Serving the fast-growing residential solar market in Saurashtra with PGVCL-compliant installations.',
    phone: '+91 73400 90909',
    email: 'rajkot@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Race Course Road, Rajkot 360001',
    verified: true, featured: false, rating: 4.6, reviews: 74,
    categoryIndex: 0, citySlug: 'rajkot-gujarat',
  },

  // ═══════════════════════════════════════════════
  // BHAVNAGAR
  // ═══════════════════════════════════════════════
  {
    name: 'Adani Solar – Bhavnagar',
    slug: 'adani-solar-bhavnagar',
    description: 'Adani Solar authorized dealer in Bhavnagar provides premium solar panels and EPC services for Bhavnagar and the surrounding Saurashtra coastal region with DGVCL approvals.',
    phone: '+91 79 2555 5555',
    email: 'bhavnagar@adanisolar.com',
    website: 'https://www.adanisolar.com',
    address: 'ST Road, Bhavnagar 364001',
    verified: true, featured: false, rating: 4.6, reviews: 65,
    categoryIndex: 2, citySlug: 'bhavnagar-gujarat',
  },
  {
    name: 'Waaree Energies – Bhavnagar',
    slug: 'waaree-energies-bhavnagar',
    description: 'Waaree Energies dealer in Bhavnagar supplies quality modules and installation services. Well-versed with DGVCL net-metering and Gujarat state solar subsidy schemes.',
    phone: '+91 22 6644 4444',
    email: 'bhavnagar@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Waghawadi Road, Bhavnagar 364002',
    verified: false, featured: false, rating: 4.3, reviews: 42,
    categoryIndex: 0, citySlug: 'bhavnagar-gujarat',
  },

  // ═══════════════════════════════════════════════
  // MEERUT
  // ═══════════════════════════════════════════════
  {
    name: 'Loom Solar – Meerut',
    slug: 'loom-solar-meerut',
    description: 'Loom Solar dealer in Meerut provides Shark bifacial panels and on-grid solar systems. PVVNL-approved installer with PM Surya Ghar subsidy support for Meerut and western UP.',
    phone: '+91 73400 90909',
    email: 'meerut@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Hapur Road, Meerut 250002',
    verified: true, featured: false, rating: 4.6, reviews: 89,
    categoryIndex: 0, citySlug: 'meerut-uttar-pradesh',
  },
  {
    name: 'Grun Power – Meerut',
    slug: 'grun-power-meerut',
    description: 'Grun Power (HQ: Greater Noida) provides rooftop solar EPC services in Meerut and the Western UP belt with PVVNL-compliant installations and strong project management.',
    phone: '+91 9643 449 898',
    email: 'meerut@grunpower.in',
    website: 'https://www.grunpower.in',
    address: 'Shastri Nagar, Meerut 250005',
    verified: true, featured: false, rating: 4.5, reviews: 54,
    categoryIndex: 0, citySlug: 'meerut-uttar-pradesh',
  },
  {
    name: 'Tata Power Solar – Meerut',
    slug: 'tata-power-solar-meerut',
    description: "Tata Power Solar's Meerut partner serves residential and commercial customers in western Uttar Pradesh with PVVNL-approved solar and full subsidy assistance.",
    phone: '+91 1800 209 4040',
    email: 'meerut@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Begum Bridge Road, Meerut 250001',
    verified: true, featured: false, rating: 4.7, reviews: 67,
    categoryIndex: 0, citySlug: 'meerut-uttar-pradesh',
  },

  // ═══════════════════════════════════════════════
  // KANPUR
  // ═══════════════════════════════════════════════
  {
    name: 'Loom Solar – Kanpur',
    slug: 'loom-solar-kanpur',
    description: "Loom Solar dealer in Kanpur delivers Shark bifacial panels and hybrid inverters for UP's industrial capital. KESCO/UPPCL-compliant with PM Surya Ghar subsidy facilitation.",
    phone: '+91 73400 90909',
    email: 'kanpur@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Mall Road, Kanpur 208001',
    verified: true, featured: false, rating: 4.7, reviews: 134,
    categoryIndex: 0, citySlug: 'kanpur-uttar-pradesh',
  },
  {
    name: 'Grun Power – Kanpur',
    slug: 'grun-power-kanpur',
    description: 'Grun Power provides rooftop and industrial solar EPC in Kanpur. Trusted by Kanpur\'s large leather and textile industries for commercial solar projects with KESCO approvals.',
    phone: '+91 9643 449 898',
    email: 'kanpur@grunpower.in',
    website: 'https://www.grunpower.in',
    address: 'Swaroop Nagar, Kanpur 208002',
    verified: true, featured: false, rating: 4.6, reviews: 89,
    categoryIndex: 1, citySlug: 'kanpur-uttar-pradesh',
  },
  {
    name: 'MYSUN – Kanpur',
    slug: 'mysun-kanpur',
    description: 'MYSUN\'s digital solar platform comes to Kanpur with transparent pricing, fast installations, and real-time monitoring for residential and commercial rooftops.',
    phone: '+91 120 450 5100',
    email: 'kanpur@mysun.in',
    website: 'https://www.mysun.in',
    address: 'Civil Lines, Kanpur 208001',
    verified: true, featured: false, rating: 4.5, reviews: 67,
    categoryIndex: 0, citySlug: 'kanpur-uttar-pradesh',
  },

  // ═══════════════════════════════════════════════
  // ALLAHABAD (PRAYAGRAJ)
  // ═══════════════════════════════════════════════
  {
    name: 'Loom Solar – Prayagraj',
    slug: 'loom-solar-prayagraj',
    description: 'Loom Solar dealer in Prayagraj (Allahabad) serves the Sangam city with Shark bifacial panels and complete on-grid installations. MPPKVVCL/UPPCL-approved with subsidy support.',
    phone: '+91 73400 90909',
    email: 'prayagraj@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Civil Lines, Prayagraj 211001',
    verified: true, featured: false, rating: 4.6, reviews: 87,
    categoryIndex: 0, citySlug: 'allahabad-uttar-pradesh',
  },
  {
    name: 'Nirmla Solar Power – Prayagraj',
    slug: 'nirmla-solar-power-prayagraj',
    description: 'Nirmla Solar Power (NSPG) expands to Prayagraj serving eastern UP cities. Reliable local installer with UPPCL approvals and 8+ years of solar project experience.',
    phone: '+91 9415 224 567',
    email: 'prayagraj@nspg.in',
    website: 'https://www.nspg.in',
    address: 'Naini, Prayagraj 211008',
    verified: true, featured: false, rating: 4.5, reviews: 54,
    categoryIndex: 0, citySlug: 'allahabad-uttar-pradesh',
  },

  // ═══════════════════════════════════════════════
  // RANCHI
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Ranchi',
    slug: 'tata-power-solar-ranchi',
    description: "Tata Power Solar's Jharkhand representative provides rooftop solar in Ranchi with JBVNL-approved net-metering and PM Surya Ghar subsidy support for residential customers.",
    phone: '+91 1800 209 4040',
    email: 'ranchi@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Harmu Road, Ranchi 834001',
    verified: true, featured: false, rating: 4.7, reviews: 78,
    categoryIndex: 0, citySlug: 'ranchi-jharkhand',
  },
  {
    name: 'Loom Solar – Ranchi',
    slug: 'loom-solar-ranchi',
    description: 'Loom Solar dealer in Ranchi delivers Shark bifacial panels and hybrid inverters for Jharkhand. JBVNL-compliant installations with full PM Surya Ghar subsidy assistance.',
    phone: '+91 73400 90909',
    email: 'ranchi@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Lalpur, Ranchi 834001',
    verified: true, featured: false, rating: 4.5, reviews: 63,
    categoryIndex: 0, citySlug: 'ranchi-jharkhand',
  },
  {
    name: 'Waaree Energies – Ranchi',
    slug: 'waaree-energies-ranchi',
    description: 'Waaree Energies dealer in Ranchi supplies quality Waaree monocrystalline modules for Jharkhand\'s expanding solar sector with JBVNL approval support.',
    phone: '+91 22 6644 4444',
    email: 'ranchi@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Circular Road, Ranchi 834001',
    verified: false, featured: false, rating: 4.3, reviews: 42,
    categoryIndex: 2, citySlug: 'ranchi-jharkhand',
  },

  // ═══════════════════════════════════════════════
  // JABALPUR
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Jabalpur',
    slug: 'tata-power-solar-jabalpur',
    description: "Tata Power Solar's Jabalpur partner delivers residential and commercial solar installations in MP's third largest city with MPEZ net-metering compliance and subsidy support.",
    phone: '+91 1800 209 4040',
    email: 'jabalpur@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Napier Town, Jabalpur 482001',
    verified: true, featured: false, rating: 4.6, reviews: 67,
    categoryIndex: 0, citySlug: 'jabalpur-madhya-pradesh',
  },
  {
    name: 'Loom Solar – Jabalpur',
    slug: 'loom-solar-jabalpur',
    description: 'Loom Solar dealer in Jabalpur supplies Shark bifacial panels with full EPC for Central MP. MPEZ-compliant with PM Surya Ghar subsidy processing for Jabalpur homeowners.',
    phone: '+91 73400 90909',
    email: 'jabalpur@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Wright Town, Jabalpur 482002',
    verified: true, featured: false, rating: 4.5, reviews: 49,
    categoryIndex: 0, citySlug: 'jabalpur-madhya-pradesh',
  },

  // ═══════════════════════════════════════════════
  // VIJAYAWADA
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Vijayawada',
    slug: 'tata-power-solar-vijayawada',
    description: "Tata Power Solar's Andhra Pradesh partner in Vijayawada delivers residential and commercial solar with APEPDCL-approved net-metering and PM Surya Ghar subsidy support.",
    phone: '+91 1800 209 4040',
    email: 'vijayawada@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Benz Circle, Vijayawada 520010',
    verified: true, featured: false, rating: 4.8, reviews: 98,
    categoryIndex: 0, citySlug: 'vijayawada-andhra-pradesh',
  },
  {
    name: 'Freyr Energy – Vijayawada',
    slug: 'freyr-energy-vijayawada',
    description: 'Freyr Energy serves Vijayawada and Krishna district with tech-enabled rooftop solar, APEPDCL approvals, and real-time performance monitoring via the SolarApp.',
    phone: '+91 9000 828 333',
    email: 'vijayawada@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'Governorpet, Vijayawada 520002',
    verified: true, featured: false, rating: 4.6, reviews: 76,
    categoryIndex: 0, citySlug: 'vijayawada-andhra-pradesh',
  },
  {
    name: 'Waaree Energies – Vijayawada',
    slug: 'waaree-energies-vijayawada',
    description: "Waaree Energies dealer in Vijayawada supplies Waaree's PERC and bifacial modules to AP's fast-growing solar market with installation support and APEPDCL compliance.",
    phone: '+91 22 6644 4444',
    email: 'vijayawada@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Autonagar, Vijayawada 520007',
    verified: true, featured: false, rating: 4.4, reviews: 54,
    categoryIndex: 2, citySlug: 'vijayawada-andhra-pradesh',
  },

  // ═══════════════════════════════════════════════
  // NELLORE
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Nellore',
    slug: 'tata-power-solar-nellore',
    description: "Tata Power Solar's Nellore partner covers SPDCL-approved rooftop solar installations for residences, commercial buildings, and aquaculture pump sets in South Andhra Pradesh.",
    phone: '+91 1800 209 4040',
    email: 'nellore@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'GT Road, Nellore 524001',
    verified: true, featured: false, rating: 4.6, reviews: 65,
    categoryIndex: 0, citySlug: 'nellore-andhra-pradesh',
  },
  {
    name: 'Freyr Energy – Nellore',
    slug: 'freyr-energy-nellore',
    description: 'Freyr Energy serves Nellore and SPSR Nellore district with tech-enabled solar installations, SPDCL approvals, and the SolarApp for real-time monitoring.',
    phone: '+91 9000 828 333',
    email: 'nellore@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'Pogathota, Nellore 524001',
    verified: true, featured: false, rating: 4.5, reviews: 47,
    categoryIndex: 0, citySlug: 'nellore-andhra-pradesh',
  },

  // ═══════════════════════════════════════════════
  // SALEM
  // ═══════════════════════════════════════════════
  {
    name: 'VC Green Energy – Salem',
    slug: 'vc-green-energy-salem',
    description: 'VC Green Energy serves Salem and the Kongu belt with TANGEDCO-approved rooftop solar. 100+ MW installed across Tamil Nadu with strong O&M support.',
    phone: '+91 427 420 4040',
    email: 'salem@vcgreen.in',
    website: 'https://www.vcgreen.in',
    address: 'Five Roads, Salem 636004',
    verified: true, featured: false, rating: 4.6, reviews: 89,
    categoryIndex: 0, citySlug: 'salem-tamil-nadu',
  },
  {
    name: 'KCP Solar – Salem',
    slug: 'kcp-solar-salem',
    description: 'KCP Solar extends its 37-year legacy to Salem with residential panels, on-grid systems, and commercial EPC. TANGEDCO-compliant with prompt after-sales service.',
    phone: '+91 427 435 0555',
    email: 'salem@kcpsolar.com',
    website: 'https://www.kcpsolar.com',
    address: 'Shevapet, Salem 636002',
    verified: true, featured: false, rating: 4.5, reviews: 63,
    categoryIndex: 2, citySlug: 'salem-tamil-nadu',
  },
  {
    name: 'Tata Power Solar – Salem',
    slug: 'tata-power-solar-salem',
    description: "Tata Power Solar's Salem partner delivers residential and commercial solar with TANGEDCO-approved net-metering and PM Surya Ghar subsidy facilitation across the Salem district.",
    phone: '+91 1800 209 4040',
    email: 'salem@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Saradha College Road, Salem 636016',
    verified: true, featured: false, rating: 4.7, reviews: 54,
    categoryIndex: 0, citySlug: 'salem-tamil-nadu',
  },

  // ═══════════════════════════════════════════════
  // TIRUNELVELI
  // ═══════════════════════════════════════════════
  {
    name: 'VC Green Energy – Tirunelveli',
    slug: 'vc-green-energy-tirunelveli',
    description: "VC Green Energy serves Tirunelveli and Southern Tamil Nadu's growing solar market with TANGEDCO-compliant installations and 100+ MW track record across the state.",
    phone: '+91 462 420 4040',
    email: 'tirunelveli@vcgreen.in',
    website: 'https://www.vcgreen.in',
    address: 'Palayamkottai Road, Tirunelveli 627002',
    verified: true, featured: false, rating: 4.6, reviews: 78,
    categoryIndex: 0, citySlug: 'tirunelveli-tamil-nadu',
  },
  {
    name: 'KCP Solar – Tirunelveli',
    slug: 'kcp-solar-tirunelveli',
    description: 'KCP Solar serves Southern Tamil Nadu including Tirunelveli with quality solar panel supply and installation services. Expert in TANGEDCO approvals and residential systems.',
    phone: '+91 422 4350 555',
    email: 'tirunelveli@kcpsolar.com',
    website: 'https://www.kcpsolar.com',
    address: 'High Ground Road, Tirunelveli 627001',
    verified: true, featured: false, rating: 4.5, reviews: 55,
    categoryIndex: 2, citySlug: 'tirunelveli-tamil-nadu',
  },

  // ═══════════════════════════════════════════════
  // PONDICHERRY
  // ═══════════════════════════════════════════════
  {
    name: 'Tata Power Solar – Pondicherry',
    slug: 'tata-power-solar-pondicherry',
    description: "Tata Power Solar's Pondicherry partner covers Union Territory and adjacent Tamil Nadu areas with TANGEDCO/Pondicherry Electricity Dept-approved rooftop solar.",
    phone: '+91 1800 209 4040',
    email: 'pondicherry@tatapowersolar.com',
    website: 'https://www.tatapowersolar.com',
    address: 'Anna Salai, Pondicherry 605001',
    verified: true, featured: false, rating: 4.7, reviews: 67,
    categoryIndex: 0, citySlug: 'pondicherry-puducherry',
  },
  {
    name: 'VC Green Energy – Pondicherry',
    slug: 'vc-green-energy-pondicherry',
    description: 'VC Green Energy serves Pondicherry and the Tamil Nadu border districts with full EPC solar services. TANGEDCO and Pondicherry Electricity Dept approvals in place.',
    phone: '+91 413 420 4040',
    email: 'pondicherry@vcgreen.in',
    website: 'https://www.vcgreen.in',
    address: 'Romain Rolland Street, Pondicherry 605001',
    verified: true, featured: false, rating: 4.5, reviews: 54,
    categoryIndex: 0, citySlug: 'pondicherry-puducherry',
  },

  // ═══════════════════════════════════════════════
  // EXTRA LISTINGS FOR MAJOR METROS (more depth)
  // ═══════════════════════════════════════════════

  // Mumbai extras
  {
    name: 'Waaree Energies – Mumbai',
    slug: 'waaree-energies-mumbai',
    description: "Waaree Energies' Mumbai office is India's largest solar panel manufacturer's commercial hub. Supplying Waaree modules pan-India with EPC services for Mumbai's commercial sector.",
    phone: '+91 22 6644 4444',
    email: 'mumbai@waaree.com',
    website: 'https://www.waaree.com',
    address: '602 Western Edge-II, Borivali East, Mumbai 400066',
    verified: true, featured: false, rating: 4.7, reviews: 167,
    categoryIndex: 2, citySlug: 'mumbai-maharashtra',
  },
  {
    name: 'Vikram Solar – Mumbai',
    slug: 'vikram-solar-mumbai',
    description: 'Vikram Solar dealer in Mumbai supplies ELDORA premium modules and provides EPC for large commercial rooftop projects across the Mumbai Metropolitan Region.',
    phone: '+91 33 6625 7700',
    email: 'mumbai@vikramsolar.com',
    website: 'https://www.vikramsolar.com',
    address: 'BKC, Bandra East, Mumbai 400051',
    verified: true, featured: false, rating: 4.6, reviews: 89,
    categoryIndex: 2, citySlug: 'mumbai-maharashtra',
  },
  {
    name: 'SolarSquare Energy – Mumbai',
    slug: 'solarsquare-energy-mumbai',
    description: 'SolarSquare Energy brings its transparent, tech-first approach to Mumbai. Premium residential rooftop solar with 5-year service warranty and real-time app monitoring.',
    phone: '+91 8047 105 105',
    email: 'mumbai@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'Powai, Mumbai 400076',
    verified: true, featured: false, rating: 4.8, reviews: 198,
    categoryIndex: 0, citySlug: 'mumbai-maharashtra',
  },

  // Delhi extras
  {
    name: 'SolarSquare Energy – Delhi',
    slug: 'solarsquare-energy-delhi',
    description: 'SolarSquare Energy serves Delhi NCR homeowners with transparent pricing and premium rooftop solar. BRPL/BYPL/TPDDL-compliant with 5-year service guarantee.',
    phone: '+91 8047 105 105',
    email: 'delhi@solarsquare.in',
    website: 'https://www.solarsquare.in',
    address: 'Lajpat Nagar, New Delhi 110024',
    verified: true, featured: false, rating: 4.8, reviews: 224,
    categoryIndex: 0, citySlug: 'delhi-delhi',
  },
  {
    name: 'Loom Solar – Delhi',
    slug: 'loom-solar-delhi',
    description: 'Loom Solar dealer in Delhi supplies Shark bifacial panels and hybrid inverters with complete installation services. BRPL/BYPL/TPDDL-approved for Delhi NCR homeowners.',
    phone: '+91 73400 90909',
    email: 'delhi@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Rohini, New Delhi 110085',
    verified: true, featured: false, rating: 4.7, reviews: 178,
    categoryIndex: 0, citySlug: 'delhi-delhi',
  },
  {
    name: 'Vikram Solar – Delhi',
    slug: 'vikram-solar-delhi',
    description: 'Vikram Solar dealer in Delhi supplies Tier-1 ELDORA modules to EPC installers and commercial clients across Delhi NCR. Strong O&M network with 25-year panel warranty.',
    phone: '+91 33 6625 7700',
    email: 'delhi@vikramsolar.com',
    website: 'https://www.vikramsolar.com',
    address: 'Nehru Place, New Delhi 110019',
    verified: true, featured: false, rating: 4.6, reviews: 134,
    categoryIndex: 2, citySlug: 'delhi-delhi',
  },

  // Bangalore extras
  {
    name: 'Waaree Energies – Bangalore',
    slug: 'waaree-energies-bangalore',
    description: "Waaree Energies authorized dealer in Bangalore supplies India's most popular Waaree monocrystalline modules to installers and commercial customers with BESCOM compliance.",
    phone: '+91 22 6644 4444',
    email: 'bangalore@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Electronic City, Bangalore 560100',
    verified: true, featured: false, rating: 4.6, reviews: 112,
    categoryIndex: 2, citySlug: 'bangalore-karnataka',
  },
  {
    name: 'Loom Solar – Bangalore',
    slug: 'loom-solar-bangalore',
    description: 'Loom Solar dealer in Bangalore offers Shark bifacial panels and hybrid solar inverters. BESCOM-approved with full installation support and PM Surya Ghar subsidy coordination.',
    phone: '+91 73400 90909',
    email: 'bangalore@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Jayanagar, Bangalore 560011',
    verified: true, featured: false, rating: 4.6, reviews: 145,
    categoryIndex: 0, citySlug: 'bangalore-karnataka',
  },
  {
    name: 'Freyr Energy – Bangalore',
    slug: 'freyr-energy-bangalore',
    description: 'Freyr Energy brings its award-winning rooftop solar platform to Bangalore with local teams, BESCOM-approved installations, and real-time SolarApp monitoring.',
    phone: '+91 9000 828 333',
    email: 'bangalore@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'Marathahalli, Bangalore 560037',
    verified: true, featured: false, rating: 4.7, reviews: 134,
    categoryIndex: 0, citySlug: 'bangalore-karnataka',
  },

  // Hyderabad extras
  {
    name: 'Waaree Energies – Hyderabad',
    slug: 'waaree-energies-hyderabad',
    description: "Waaree Energies dealer in Hyderabad supplies Waaree's PERC and bifacial modules with full EPC services. TSSPDCL/TSNPDCL-compliant for residential and commercial projects.",
    phone: '+91 22 6644 4444',
    email: 'hyderabad@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Madhapur, Hyderabad 500081',
    verified: true, featured: false, rating: 4.6, reviews: 98,
    categoryIndex: 2, citySlug: 'hyderabad-telangana',
  },
  {
    name: 'Vikram Solar – Hyderabad',
    slug: 'vikram-solar-hyderabad',
    description: 'Vikram Solar dealer in Hyderabad provides Tier-1 ELDORA modules and commercial EPC. Serving Hyderabad\'s tech parks and large commercial complexes.',
    phone: '+91 33 6625 7700',
    email: 'hyderabad@vikramsolar.com',
    website: 'https://www.vikramsolar.com',
    address: 'Hitec City, Hyderabad 500081',
    verified: true, featured: false, rating: 4.6, reviews: 87,
    categoryIndex: 2, citySlug: 'hyderabad-telangana',
  },

  // Chennai extras
  {
    name: 'Loom Solar – Chennai',
    slug: 'loom-solar-chennai',
    description: 'Loom Solar dealer in Chennai supplies Shark bifacial and MONO PERC panels with complete on-grid installations. TNEB-compliant with PM Surya Ghar subsidy support.',
    phone: '+91 73400 90909',
    email: 'chennai@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Anna Nagar, Chennai 600040',
    verified: true, featured: false, rating: 4.6, reviews: 112,
    categoryIndex: 0, citySlug: 'chennai-tamil-nadu',
  },
  {
    name: 'Freyr Energy – Chennai',
    slug: 'freyr-energy-chennai',
    description: 'Freyr Energy serves Chennai\'s residential market with tech-driven solar installations, TNEB approvals, and real-time SolarApp monitoring for homeowners.',
    phone: '+91 9000 828 333',
    email: 'chennai@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'OMR, Sholinganallur, Chennai 600119',
    verified: true, featured: false, rating: 4.6, reviews: 98,
    categoryIndex: 0, citySlug: 'chennai-tamil-nadu',
  },

  // Pune extras
  {
    name: 'Waaree Energies – Pune',
    slug: 'waaree-energies-pune',
    description: "Waaree Energies dealer in Pune supplies India's #1 module brand to Pune's residential and commercial solar market. MSEDCL-approved with full subsidy assistance.",
    phone: '+91 22 6644 4444',
    email: 'pune@waaree.com',
    website: 'https://www.waaree.com',
    address: 'Pimpri, Pune 411018',
    verified: true, featured: false, rating: 4.6, reviews: 89,
    categoryIndex: 2, citySlug: 'pune-maharashtra',
  },
  {
    name: 'Vikram Solar – Pune',
    slug: 'vikram-solar-pune',
    description: 'Vikram Solar dealer in Pune supplies premium ELDORA modules to the Pune market. Strong commercial and industrial EPC with 25-year performance warranty.',
    phone: '+91 33 6625 7700',
    email: 'pune@vikramsolar.com',
    website: 'https://www.vikramsolar.com',
    address: 'Hinjewadi IT Park, Pune 411057',
    verified: true, featured: false, rating: 4.6, reviews: 67,
    categoryIndex: 2, citySlug: 'pune-maharashtra',
  },

  // Ahmedabad extras
  {
    name: 'Loom Solar – Ahmedabad',
    slug: 'loom-solar-ahmedabad',
    description: 'Loom Solar dealer in Ahmedabad supplies Shark bifacial panels and hybrid inverters for Gujarat homes. DGVCL/UGVCL/PGVCL-compliant with PM Surya Ghar subsidy facilitation.',
    phone: '+91 73400 90909',
    email: 'ahmedabad@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Satellite, Ahmedabad 380015',
    verified: true, featured: false, rating: 4.7, reviews: 156,
    categoryIndex: 0, citySlug: 'ahmedabad-gujarat',
  },
  {
    name: 'Vikram Solar – Ahmedabad',
    slug: 'vikram-solar-ahmedabad',
    description: 'Vikram Solar dealer in Ahmedabad supplies ELDORA Tier-1 modules to Gujarat\'s large commercial and industrial solar market.',
    phone: '+91 33 6625 7700',
    email: 'ahmedabad@vikramsolar.com',
    website: 'https://www.vikramsolar.com',
    address: 'Prahlad Nagar, Ahmedabad 380015',
    verified: true, featured: false, rating: 4.5, reviews: 87,
    categoryIndex: 2, citySlug: 'ahmedabad-gujarat',
  },

  // Kolkata extras
  {
    name: 'Freyr Energy – Kolkata',
    slug: 'freyr-energy-kolkata',
    description: 'Freyr Energy serves Kolkata\'s residential and commercial rooftop solar market with WBSEDCL-approved installations and the SolarApp for real-time monitoring.',
    phone: '+91 9000 828 333',
    email: 'kolkata@freyrenergy.com',
    website: 'https://www.freyrenergy.com',
    address: 'New Town, Kolkata 700156',
    verified: true, featured: false, rating: 4.6, reviews: 76,
    categoryIndex: 0, citySlug: 'kolkata-west-bengal',
  },
  {
    name: 'Loom Solar – Kolkata',
    slug: 'loom-solar-kolkata',
    description: 'Loom Solar dealer in Kolkata provides Shark bifacial panels and complete rooftop solar systems. WBSEDCL-approved with PM Surya Ghar subsidy support for West Bengal.',
    phone: '+91 73400 90909',
    email: 'kolkata@loomsolar.com',
    website: 'https://www.loomsolar.com',
    address: 'Behala, Kolkata 700060',
    verified: true, featured: false, rating: 4.5, reviews: 89,
    categoryIndex: 0, citySlug: 'kolkata-west-bengal',
  },
];

async function main() {
  console.log('🗑️  Deleting all existing fake listings...');
  const deleted = await prisma.listing.deleteMany({});
  console.log(`   Deleted ${deleted.count} listings.`);

  console.log('\n📍 Upserting all city locations...');
  const locationMap: Record<string, string> = {};
  for (const city of cities) {
    const loc = await prisma.location.upsert({
      where: { slug: city.slug },
      update: { city: city.city, state: city.state },
      create: { city: city.city, state: city.state, slug: city.slug },
    });
    locationMap[city.slug] = loc.id;
    console.log(`   ✓ ${city.city}, ${city.state}`);
  }

  console.log('\n📂 Upserting categories...');
  const categoryMap: Record<number, string> = {};
  for (let i = 0; i < categories.length; i++) {
    const cat = await prisma.category.upsert({
      where: { slug: categories[i].slug },
      update: { name: categories[i].name },
      create: { name: categories[i].name, slug: categories[i].slug },
    });
    categoryMap[i] = cat.id;
    console.log(`   ✓ ${cat.name}`);
  }

  console.log('\n🏢 Seeding real listings...');
  let count = 0;
  for (const listing of listings) {
    const locationId = locationMap[listing.citySlug];
    if (!locationId) {
      console.warn(`   ⚠️  No location found for slug: ${listing.citySlug} — skipping ${listing.name}`);
      continue;
    }
    const categoryId = categoryMap[listing.categoryIndex];
    await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: {
        name: listing.name,
        description: listing.description,
        phone: listing.phone,
        email: listing.email,
        website: listing.website,
        address: listing.address,
        verified: listing.verified,
        featured: listing.featured,
        rating: listing.rating,
        reviews: listing.reviews,
        categoryId,
        locationId,
      },
      create: {
        name: listing.name,
        slug: listing.slug,
        description: listing.description,
        phone: listing.phone,
        email: listing.email,
        website: listing.website,
        address: listing.address,
        verified: listing.verified,
        featured: listing.featured,
        rating: listing.rating,
        reviews: listing.reviews,
        categoryId,
        locationId,
      },
    });
    count++;
    console.log(`   ✓ [${count}] ${listing.name}`);
  }

  console.log(`\n✅ Done! ${count} real listings seeded across ${cities.length} cities.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
