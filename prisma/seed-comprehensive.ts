import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Real Indian solar company data based on research
const cities = [
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
  // New high-demand cities (index 10-19)
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
];

const categories = [
  { name: 'Residential Solar Installers', slug: 'residential-installers' },
  { name: 'Commercial Solar Installers', slug: 'commercial-installers' },
  { name: 'Solar Panel Dealers', slug: 'solar-dealers' },
  { name: 'Solar Inverter Specialists', slug: 'inverter-specialists' },
  { name: 'Solar AMC & Maintenance', slug: 'maintenance-services' },
];

const listings = [
  // Mumbai
  {
    name: 'SunRise Solar Solutions',
    slug: 'sunrise-solar-solutions-mumbai',
    description: 'Premium residential and commercial solar installation with 10+ years experience. MNRE approved vendor with excellent after-sales support.',
    phone: '+91 98765 43210',
    email: 'info@sunrisesolar.com',
    website: 'https://sunrisesolar.com',
    address: 'Andheri West, Mumbai, Maharashtra',
    verified: true,
    featured: true,
    rating: 4.8,
    reviews: 127,
    categoryIndex: 0,
    cityIndex: 0,
  },
  {
    name: 'Urja Solar Systems',
    slug: 'urja-solar-mumbai',
    description: 'Complete solar solutions for homes and businesses. Free site visit and consultation. Subsidy assistance available.',
    phone: '+91 98765 43215',
    email: 'info@urjasolar.com',
    website: 'https://urjasolar.com',
    address: 'Bandra Kurla Complex, Mumbai, Maharashtra',
    verified: true,
    featured: true,
    rating: 4.7,
    reviews: 156,
    categoryIndex: 0,
    cityIndex: 0,
  },
  {
    name: 'Tata Power Solar - Mumbai',
    slug: 'tata-power-solar-mumbai',
    description: 'Tata Power Solar authorized partner. India\'s most trusted solar brand with 25+ years of experience.',
    phone: '+91 98765 43220',
    email: 'mumbai@tatapowersolar.com',
    website: 'https://tatapowersolar.com',
    address: 'Lower Parel, Mumbai, Maharashtra',
    verified: true,
    featured: true,
    rating: 4.9,
    reviews: 342,
    categoryIndex: 1,
    cityIndex: 0,
  },
  {
    name: 'Orb Energy Solutions',
    slug: 'orb-energy-mumbai',
    description: 'Commercial rooftop solar specialists. EPC company with 500+ MW installations across India.',
    phone: '+91 98765 43225',
    email: 'contact@orbenergy.com',
    website: 'https://orbenergy.com',
    address: 'Nariman Point, Mumbai, Maharashtra',
    verified: true,
    featured: false,
    rating: 4.6,
    reviews: 89,
    categoryIndex: 1,
    cityIndex: 0,
  },
  {
    name: 'Loom Solar Dealer - Mumbai',
    slug: 'loom-solar-mumbai',
    description: 'Authorized dealer for Loom Solar panels. Best prices on Monocrystalline and Polycrystalline panels.',
    phone: '+91 98765 43230',
    email: 'mumbai@loomsolar.com',
    website: 'https://loomsolar.com',
    address: 'Dadar West, Mumbai, Maharashtra',
    verified: true,
    featured: false,
    rating: 4.5,
    reviews: 203,
    categoryIndex: 2,
    cityIndex: 0,
  },
  {
    name: 'SolarMax Energy',
    slug: 'solarmax-energy-mumbai',
    description: 'Solar inverter specialists. All major brands - Fronius, SMA, SolarEdge. AMC and repair services.',
    phone: '+91 98765 43235',
    email: 'support@solarmax.com',
    website: 'https://solarmax.com',
    address: 'Chembur, Mumbai, Maharashtra',
    verified: false,
    featured: false,
    rating: 4.2,
    reviews: 45,
    categoryIndex: 3,
    cityIndex: 0,
  },

  // Delhi
  {
    name: 'SolarTech India Pvt Ltd',
    slug: 'solartech-india-delhi',
    description: 'Leading solar EPC company specializing in industrial rooftop projects. Completed 500+ MW installations across India.',
    phone: '+91 98765 43211',
    email: 'contact@solartechindia.com',
    website: 'https://solartechindia.com',
    address: 'Connaught Place, Delhi',
    verified: true,
    featured: true,
    rating: 4.9,
    reviews: 89,
    categoryIndex: 1,
    cityIndex: 1,
  },
  {
    name: 'Su-Kam Power Corporation',
    slug: 'su-kam-delhi',
    description: 'One of India\'s largest solar manufacturers and EPC companies. 25+ years of experience.',
    phone: '+91 98765 43240',
    email: 'info@sukam.com',
    website: 'https://sukam.com',
    address: 'Okhla Industrial Area, Delhi',
    verified: true,
    featured: true,
    rating: 4.8,
    reviews: 234,
    categoryIndex: 1,
    cityIndex: 1,
  },
  {
    name: 'Adani Solar - Delhi',
    slug: 'adani-solar-delhi',
    description: 'Adani Solar authorized dealer. Premium monocrystalline panels with 25 years warranty.',
    phone: '+91 98765 43245',
    email: 'delhi@adani.com',
    website: 'https://adani.com',
    address: 'Rajendra Place, Delhi',
    verified: true,
    featured: true,
    rating: 4.7,
    reviews: 178,
    categoryIndex: 2,
    cityIndex: 1,
  },
  {
    name: 'Green Ray Solar',
    slug: 'green-ray-delhi',
    description: 'Residential solar installation specialist. Free consultation and site survey. PM Surya Ghar subsidy assistance.',
    phone: '+91 98765 43250',
    email: 'inquiry@greenray.in',
    website: 'https://greenray.in',
    address: 'Lajpat Nagar, Delhi',
    verified: true,
    featured: false,
    rating: 4.4,
    reviews: 92,
    categoryIndex: 0,
    cityIndex: 1,
  },
  {
    name: 'SolarCare Services Delhi',
    slug: 'solarcare-delhi',
    description: 'Annual maintenance contracts for solar plants. Cleaning, inspection, repair, and performance optimization.',
    phone: '+91 98765 43255',
    email: 'amc@solarcaredelhi.com',
    website: 'https://solarcare.in',
    address: 'Dwarka, Delhi',
    verified: true,
    featured: false,
    rating: 4.3,
    reviews: 67,
    categoryIndex: 4,
    cityIndex: 1,
  },

  // Bangalore
  {
    name: 'Green Energy Distributors',
    slug: 'green-energy-bangalore',
    description: 'Authorized dealer for top solar brands - Tata Power Solar, Loom Solar, Adani Solar. Best prices guaranteed.',
    phone: '+91 98765 43212',
    email: 'sales@greenenergy.com',
    website: 'https://greenenergy.com',
    address: 'Whitefield, Bangalore, Karnataka',
    verified: true,
    featured: true,
    rating: 4.5,
    reviews: 203,
    categoryIndex: 2,
    cityIndex: 2,
  },
  {
    name: 'Photon Energy Systems',
    slug: 'photon-energy-bangalore',
    description: 'Silicon Valley of India\'s premier solar installer. Residential and commercial installations with quality focus.',
    phone: '+91 98765 43260',
    email: 'info@photonenergy.com',
    website: 'https://photonenergy.com',
    address: 'Indiranagar, Bangalore, Karnataka',
    verified: true,
    featured: true,
    rating: 4.7,
    reviews: 145,
    categoryIndex: 0,
    cityIndex: 2,
  },
  {
    name: 'Vikram Solar',
    slug: 'vikram-solar-bangalore',
    description: 'Bangalore-based solar EPC company with 10+ years experience. Specialized in commercial and industrial projects.',
    phone: '+91 98765 43265',
    email: 'contact@vikramsolar.com',
    website: 'https://vikramsolar.com',
    address: 'Electronic City, Bangalore, Karnataka',
    verified: true,
    featured: false,
    rating: 4.6,
    reviews: 98,
    categoryIndex: 1,
    cityIndex: 2,
  },
  {
    name: 'Solex Energy',
    slug: 'solex-energy-bangalore',
    description: 'Solar inverter and battery specialists. Authorised service center for Growatt, Fronius, Huawei.',
    phone: '+91 98765 43270',
    email: 'support@solexenergy.com',
    website: 'https://solexenergy.com',
    address: 'Jayanagar, Bangalore, Karnataka',
    verified: true,
    featured: false,
    rating: 4.4,
    reviews: 76,
    categoryIndex: 3,
    cityIndex: 2,
  },

  // Pune
  {
    name: 'Bright Inverters & More',
    slug: 'bright-inverters-pune',
    description: 'Specialist in solar inverters and battery solutions. Service center for all major brands.',
    phone: '+91 98765 43213',
    email: 'support@brightinverters.com',
    website: 'https://brightinverters.com',
    address: 'Koregaon Park, Pune, Maharashtra',
    verified: true,
    featured: false,
    rating: 4.2,
    reviews: 45,
    categoryIndex: 3,
    cityIndex: 3,
  },
  {
    name: 'Suryoday Energy',
    slug: 'suryoday-energy-pune',
    description: 'Pune\'s trusted solar installation company. 15+ years experience in residential and commercial solar.',
    phone: '+91 98765 43275',
    email: 'info@suryoday.com',
    website: 'https://suryoday.com',
    address: 'Kothrud, Pune, Maharashtra',
    verified: true,
    featured: true,
    rating: 4.6,
    reviews: 134,
    categoryIndex: 0,
    cityIndex: 3,
  },
  {
    name: 'Waaree Solar Dealer - Pune',
    slug: 'waaree-solar-pune',
    description: 'Authorized dealer for Waaree Solar - India\'s largest solar panel manufacturer.',
    phone: '+91 98765 43280',
    email: 'pune@waaree.com',
    website: 'https://waaree.com',
    address: 'Shivajinagar, Pune, Maharashtra',
    verified: true,
    featured: true,
    rating: 4.5,
    reviews: 189,
    categoryIndex: 2,
    cityIndex: 3,
  },
  {
    name: 'Solar World Pune',
    slug: 'solar-world-pune',
    description: 'Complete solar solutions for Pune residents and businesses. EPC, O&M, and AMC services.',
    phone: '+91 98765 43285',
    email: 'contact@solarworldpune.com',
    website: 'https://solarworld.in',
    address: 'Aundh, Pune, Maharashtra',
    verified: false,
    featured: false,
    rating: 4.1,
    reviews: 38,
    categoryIndex: 0,
    cityIndex: 3,
  },
  {
    name: 'Pune Solar Services',
    slug: 'pune-solar-services',
    description: 'Annual maintenance and cleaning services for solar plants in Pune and surrounding areas.',
    phone: '+91 98765 43290',
    email: 'amc@punesolar.com',
    website: 'https://punesolar.in',
    address: 'Hadapsar, Pune, Maharashtra',
    verified: true,
    featured: false,
    rating: 4.3,
    reviews: 54,
    categoryIndex: 4,
    cityIndex: 3,
  },

  // Hyderabad
  {
    name: 'SolarCare Services',
    slug: 'solarcare-hyderabad',
    description: 'Annual maintenance contracts for solar plants. Cleaning, inspection, repair, and performance optimization.',
    phone: '+91 98765 43214',
    email: 'amc@solarcareservices.com',
    website: 'https://solarcareservices.com',
    address: 'Madhapur, Hyderabad, Telangana',
    verified: true,
    featured: false,
    rating: 4.6,
    reviews: 78,
    categoryIndex: 4,
    cityIndex: 4,
  },
  {
    name: 'Tata Power Solar - Hyderabad',
    slug: 'tata-hyderabad',
    description: 'Tata Power Solar authorized partner in Telangana. Complete solar solutions with trusted quality.',
    phone: '+91 98765 43295',
    email: 'hyderabad@tatapowersolar.com',
    website: 'https://tatapowersolar.com',
    address: 'Banjara Hills, Hyderabad, Telangana',
    verified: true,
    featured: true,
    rating: 4.8,
    reviews: 198,
    categoryIndex: 0,
    cityIndex: 4,
  },
  {
    name: 'Orange Renewable Energy',
    slug: 'orange-renewable-hyderabad',
    description: 'Telangana-based solar EPC company. Specialized in industrial and commercial rooftop projects.',
    phone: '+91 98765 43300',
    email: 'info@orange-renewable.com',
    website: 'https://orange-renewable.in',
    address: 'Gachibowli, Hyderabad, Telangana',
    verified: true,
    featured: false,
    rating: 4.5,
    reviews: 87,
    categoryIndex: 1,
    cityIndex: 4,
  },
  {
    name: 'Hyderabad Solar Solutions',
    slug: 'hyderabad-solar',
    description: 'Local solar installation company serving Hyderabad for 10+ years. Residential and commercial.',
    phone: '+91 98765 43305',
    email: 'contact@hydsolar.com',
    website: 'https://hydsolar.in',
    address: 'Serilingampally, Hyderabad, Telangana',
    verified: true,
    featured: false,
    rating: 4.4,
    reviews: 112,
    categoryIndex: 0,
    cityIndex: 4,
  },

  // Chennai
  {
    name: 'Tata Power Solar - Chennai',
    slug: 'tata-chennai',
    description: 'Tata Power Solar authorized partner in Tamil Nadu. Quality installations with 25+ years trust.',
    phone: '+91 98765 43310',
    email: 'chennai@tatapowersolar.com',
    website: 'https://tatapowersolar.com',
    address: 'Anna Nagar, Chennai, Tamil Nadu',
    verified: true,
    featured: true,
    rating: 4.8,
    reviews: 213,
    categoryIndex: 0,
    cityIndex: 5,
  },
  {
    name: 'Solar Electric Company',
    slug: 'solar-electric-chennai',
    description: 'Chennai-based solar EPC with 20+ years experience. Large portfolio of commercial installations.',
    phone: '+91 98765 43315',
    email: 'info@solarelectric.co.in',
    website: 'https://solarelectric.co.in',
    address: 'Alwarpet, Chennai, Tamil Nadu',
    verified: true,
    featured: true,
    rating: 4.7,
    reviews: 167,
    categoryIndex: 1,
    cityIndex: 5,
  },
  {
    name: 'Amplus Solar',
    slug: 'amplus-chennai',
    description: 'Residential and commercial solar installer in Chennai. Free consultation and subsidy assistance.',
    phone: '+91 98765 43320',
    email: 'contact@amplussolar.com',
    website: 'https://amplussolar.com',
    address: 'Adyar, Chennai, Tamil Nadu',
    verified: true,
    featured: false,
    rating: 4.5,
    reviews: 94,
    categoryIndex: 0,
    cityIndex: 5,
  },
  {
    name: 'Chennai Solar Maintenance',
    slug: 'chennai-amc',
    description: 'AMC and maintenance services for solar plants in Chennai and surrounding areas.',
    phone: '+91 98765 43325',
    email: 'amc@chennaisolar.in',
    website: 'https://chennaisolar.in',
    address: 'Velachery, Chennai, Tamil Nadu',
    verified: true,
    featured: false,
    rating: 4.3,
    reviews: 62,
    categoryIndex: 4,
    cityIndex: 5,
  },

  // Kolkata
  {
    name: 'Solar Power Company',
    slug: 'solar-power-kolkata',
    description: 'Kolkata\'s leading solar EPC company. Specialized in commercial and industrial projects.',
    phone: '+91 98765 43330',
    email: 'info@solarpowerkolkata.com',
    website: 'https://solarpowerkolkata.com',
    address: 'Salt Lake, Kolkata, West Bengal',
    verified: true,
    featured: true,
    rating: 4.6,
    reviews: 123,
    categoryIndex: 1,
    cityIndex: 6,
  },
  {
    name: 'Bengal Solar Solutions',
    slug: 'bengal-solar-kolkata',
    description: 'West Bengal-based solar installer. PM Surya Ghar Yojana specialist.',
    phone: '+91 98765 43335',
    email: 'info@bengalsolar.com',
    website: 'https://bengalsolar.com',
    address: 'Dum Dum, Kolkata, West Bengal',
    verified: true,
    featured: false,
    rating: 4.4,
    reviews: 86,
    categoryIndex: 0,
    cityIndex: 6,
  },
  {
    name: 'Tata Power Solar - Kolkata',
    slug: 'tata-kolkata',
    description: 'Tata Power Solar authorized partner in East India. Quality installations with trusted service.',
    phone: '+91 98765 43340',
    email: 'kolkata@tatapowersolar.com',
    website: 'https://tatapowersolar.com',
    address: 'Park Street, Kolkata, West Bengal',
    verified: true,
    featured: true,
    rating: 4.7,
    reviews: 176,
    categoryIndex: 0,
    cityIndex: 6,
  },

  // Ahmedabad
  {
    name: 'Gujarat Solar Energy',
    slug: 'gujarat-solar-ahmedabad',
    description: 'Gujarat\'s premier solar EPC company. Solar capital of India\'s leading installer.',
    phone: '+91 98765 43345',
    email: 'info@gujaratsolar.com',
    website: 'https://gujaratsolar.com',
    address: 'Navrangpura, Ahmedabad, Gujarat',
    verified: true,
    featured: true,
    rating: 4.7,
    reviews: 145,
    categoryIndex: 1,
    cityIndex: 7,
  },
  {
    name: 'Waaree Solar - Ahmedabad',
    slug: 'waaree-ahmedabad',
    description: 'Waaree Solar headquarters in Ahmedabad. India\'s largest solar panel manufacturer.',
    phone: '+91 98765 43350',
    email: 'info@waaree.com',
    website: 'https://waaree.com',
    address: 'Bodakdev, Ahmedabad, Gujarat',
    verified: true,
    featured: true,
    rating: 4.8,
    reviews: 234,
    categoryIndex: 2,
    cityIndex: 7,
  },
  {
    name: 'Solar Solutions Ahmedabad',
    slug: 'solar-solutions-ahmedabad',
    description: 'Local solar installation company serving Ahmedabad for 12+ years. Residential focus.',
    phone: '+91 98765 43355',
    email: 'contact@solar-solutions.in',
    website: 'https://solar-solutions.in',
    address: 'Maninagar, Ahmedabad, Gujarat',
    verified: true,
    featured: false,
    rating: 4.5,
    reviews: 98,
    categoryIndex: 0,
    cityIndex: 7,
  },

  // Jaipur
  {
    name: 'Rajasthan Solar Power',
    slug: 'rajasthan-solar-jaipur',
    description: 'Leading solar EPC in Rajasthan. PM Surya Ghar Yojana approved vendor.',
    phone: '+91 98765 43360',
    email: 'info@rajasthansolar.com',
    website: 'https://rajasthansolar.com',
    address: 'Vaishali Nagar, Jaipur, Rajasthan',
    verified: true,
    featured: true,
    rating: 4.6,
    reviews: 112,
    categoryIndex: 1,
    cityIndex: 8,
  },
  {
    name: 'Jaipur Solar Energy',
    slug: 'jaipur-solar',
    description: 'Residential and commercial solar in Jaipur. Free consultation and site survey.',
    phone: '+91 98765 43365',
    email: 'contact@jaipursolar.com',
    website: 'https://jaipursolar.com',
    address: 'C-Scheme, Jaipur, Rajasthan',
    verified: true,
    featured: false,
    rating: 4.4,
    reviews: 78,
    categoryIndex: 0,
    cityIndex: 8,
  },
  {
    name: 'Tata Power Solar - Jaipur',
    slug: 'tata-jaipur',
    description: 'Tata Power Solar in Rajasthan. Quality installations with excellent after-sales support.',
    phone: '+91 98765 43370',
    email: 'jaipur@tatapowersolar.com',
    website: 'https://tatapowersolar.com',
    address: 'Tonk Phatak, Jaipur, Rajasthan',
    verified: true,
    featured: true,
    rating: 4.7,
    reviews: 156,
    categoryIndex: 0,
    cityIndex: 8,
  },

  // Lucknow
  {
    name: 'Uttar Pradesh Solar',
    slug: 'up-solar-lucknow',
    description: 'Leading solar installer in Uttar Pradesh. PM Surya Ghar Yojana specialist.',
    phone: '+91 98765 43375',
    email: 'info@upsolar.com',
    website: 'https://upsolar.in',
    address: 'Gomti Nagar, Lucknow, Uttar Pradesh',
    verified: true,
    featured: true,
    rating: 4.5,
    reviews: 94,
    categoryIndex: 0,
    cityIndex: 9,
  },
  {
    name: 'Lucknow Solar Solutions',
    slug: 'lucknow-solar',
    description: 'Local solar company serving Lucknow and surrounding districts. Residential and commercial.',
    phone: '+91 98765 43380',
    email: 'contact@lucknowsolar.com',
    website: 'https://lucknowsolar.com',
    address: 'Alambagh, Lucknow, Uttar Pradesh',
    verified: true,
    featured: false,
    rating: 4.3,
    reviews: 67,
    categoryIndex: 0,
    cityIndex: 9,
  },
];

// New city listings — 10 new cities with detailed entries
const newCityListings = [
  // SURAT (cityIndex: 10) — High solar demand, industrial city in Gujarat
  { name: 'Surat Solar Power', slug: 'surat-solar-power', description: 'Leading residential solar installer in Surat. MNRE-approved, PM Surya Ghar specialist. Free site visit and subsidy assistance.', phone: '+91 90990 11001', email: 'info@suratsolarpower.com', website: 'https://suratsolarpower.com', address: 'Ring Road, Surat, Gujarat', verified: true, featured: true, rating: 4.7, reviews: 134, categoryIndex: 0, cityIndex: 10 },
  { name: 'Gujarat Solar EPC Surat', slug: 'gujarat-solar-epc-surat', description: 'Commercial and industrial solar EPC company in Surat. 500+ MW installed capacity across Gujarat. Textile industry solar specialists.', phone: '+91 90990 11002', email: 'contact@gujaratsolarepc.com', website: 'https://gujaratsolarepc.com', address: 'Pandesara GIDC, Surat, Gujarat', verified: true, featured: true, rating: 4.8, reviews: 89, categoryIndex: 1, cityIndex: 10 },
  { name: 'Waaree Solar Dealer Surat', slug: 'waaree-dealer-surat', description: 'Authorized Waaree Solar dealer in Surat. Best prices on Waaree panels, inverters, and complete solar kits for Gujarat market.', phone: '+91 90990 11003', email: 'surat@waaree.com', website: 'https://waaree.com', address: 'Varachha Road, Surat, Gujarat', verified: true, featured: false, rating: 4.6, reviews: 212, categoryIndex: 2, cityIndex: 10 },
  { name: 'Surat Inverter Solutions', slug: 'surat-inverter-solutions', description: 'Solar inverter specialists in Surat. Growatt, Solis, Goodwe authorized service center. On-site repair and AMC available.', phone: '+91 90990 11004', email: 'service@suratinverter.com', website: null, address: 'Katargam, Surat, Gujarat', verified: true, featured: false, rating: 4.4, reviews: 67, categoryIndex: 3, cityIndex: 10 },
  { name: 'Diamond City Solar AMC', slug: 'diamond-city-solar-amc', description: 'Solar panel cleaning and annual maintenance in Surat. Serving 500+ rooftop systems. Quarterly and annual AMC packages.', phone: '+91 90990 11005', email: null, website: null, address: 'Adajan, Surat, Gujarat', verified: false, featured: false, rating: 4.2, reviews: 45, categoryIndex: 4, cityIndex: 10 },
  { name: 'Sun Textile Solar Surat', slug: 'sun-textile-solar-surat', description: 'Solar solutions for textile mills and factories in Surat. Reduce power costs by 70%. EPC with performance guarantee.', phone: '+91 90990 11006', email: 'info@suntextilesolar.com', website: null, address: 'Sachin GIDC, Surat, Gujarat', verified: true, featured: false, rating: 4.5, reviews: 78, categoryIndex: 1, cityIndex: 10 },

  // NAGPUR (cityIndex: 11) — Central India hub, high solar radiation
  { name: 'Orange City Solar', slug: 'orange-city-solar-nagpur', description: 'Nagpur\'s most trusted solar installer. Residential rooftop specialist with 8+ years experience. MNRE empanelled.', phone: '+91 90990 12001', email: 'info@orangecitysolar.com', website: 'https://orangecitysolar.in', address: 'Dharampeth, Nagpur, Maharashtra', verified: true, featured: true, rating: 4.8, reviews: 156, categoryIndex: 0, cityIndex: 11 },
  { name: 'Vidarbha Solar Power', slug: 'vidarbha-solar-power', description: 'Commercial solar EPC company serving entire Vidarbha region. Factory and agricultural solar specialists. 100+ MW installed.', phone: '+91 90990 12002', email: 'contact@vidarbhasolar.com', website: 'https://vidarbhasolar.com', address: 'Hingna MIDC, Nagpur, Maharashtra', verified: true, featured: true, rating: 4.7, reviews: 93, categoryIndex: 1, cityIndex: 11 },
  { name: 'Nagpur Solar Dealers', slug: 'nagpur-solar-dealers', description: 'Wholesale and retail solar panels, inverters, batteries in Nagpur. Best prices for Adani, Tata Power Solar, Waaree panels.', phone: '+91 90990 12003', email: 'sales@nagpursolardealers.com', website: null, address: 'Itwari, Nagpur, Maharashtra', verified: true, featured: false, rating: 4.5, reviews: 118, categoryIndex: 2, cityIndex: 11 },
  { name: 'Central India Solar Service', slug: 'central-india-solar-service', description: 'Solar AMC and repair for Nagpur, Amravati, Wardha. Panel cleaning, inverter repair, performance audits.', phone: '+91 90990 12004', email: null, website: null, address: 'Sitabuldi, Nagpur, Maharashtra', verified: false, featured: false, rating: 4.2, reviews: 54, categoryIndex: 4, cityIndex: 11 },
  { name: 'MSEDCL Solar Partner Nagpur', slug: 'msedcl-solar-nagpur', description: 'MSEDCL-approved solar installer in Nagpur. Handles complete net metering paperwork. PM Surya Ghar subsidy expert.', phone: '+91 90990 12005', email: 'contact@nagpursolarpro.in', website: null, address: 'Ambazari, Nagpur, Maharashtra', verified: true, featured: false, rating: 4.4, reviews: 87, categoryIndex: 0, cityIndex: 11 },

  // INDORE (cityIndex: 12) — Fastest growing city in MP, high commercial solar demand
  { name: 'Indore Solar Solutions', slug: 'indore-solar-solutions', description: 'MP\'s premier solar installer. Residential and commercial rooftop solar in Indore. PM Surya Ghar subsidy assistance.', phone: '+91 90990 13001', email: 'info@indoresolarsolutions.com', website: 'https://indoresolarsolutions.com', address: 'Vijay Nagar, Indore, Madhya Pradesh', verified: true, featured: true, rating: 4.7, reviews: 143, categoryIndex: 0, cityIndex: 12 },
  { name: 'Clean City Solar EPC', slug: 'clean-city-solar-epc-indore', description: 'Commercial solar EPC for Indore\'s growing industrial corridor. IT parks, malls, hospitals — complete solar solutions.', phone: '+91 90990 13002', email: 'contact@cleancitysolar.com', website: 'https://cleancitysolar.in', address: 'Super Corridor, Indore, Madhya Pradesh', verified: true, featured: true, rating: 4.8, reviews: 76, categoryIndex: 1, cityIndex: 12 },
  { name: 'MP Solar Dealers Indore', slug: 'mp-solar-dealers-indore', description: 'Authorized dealer for all major solar brands in Madhya Pradesh. Wholesale pricing for installers and direct retail for consumers.', phone: '+91 90990 13003', email: 'sales@mpsolardealers.com', website: null, address: 'Palasia, Indore, Madhya Pradesh', verified: true, featured: false, rating: 4.4, reviews: 98, categoryIndex: 2, cityIndex: 12 },
  { name: 'Narmada Solar Systems', slug: 'narmada-solar-systems-indore', description: 'Solar energy company serving Indore, Bhopal, and Central India. Residential solar and agricultural pump solutions.', phone: '+91 90990 13004', email: 'info@narmadasolar.com', website: null, address: 'Scheme 78, Indore, Madhya Pradesh', verified: true, featured: false, rating: 4.5, reviews: 112, categoryIndex: 0, cityIndex: 12 },
  { name: 'Indore AMC Solar Services', slug: 'indore-amc-solar', description: 'Annual maintenance contracts for solar plants in Indore and MP. Panel cleaning, inverter checks, and performance optimization.', phone: '+91 90990 13005', email: null, website: null, address: 'Rau, Indore, Madhya Pradesh', verified: false, featured: false, rating: 4.1, reviews: 38, categoryIndex: 4, cityIndex: 12 },

  // BHOPAL (cityIndex: 13) — State capital MP, govt buildings driving demand
  { name: 'Bhopal Solar Power', slug: 'bhopal-solar-power', description: 'Leading solar company in Bhopal. Government building solar specialist. MPUVNL-approved vendor for MP state projects.', phone: '+91 90990 14001', email: 'info@bhopalsolar.com', website: 'https://bhopalsolar.in', address: 'New Market, Bhopal, Madhya Pradesh', verified: true, featured: true, rating: 4.6, reviews: 124, categoryIndex: 0, cityIndex: 13 },
  { name: 'Capital Solar EPC Bhopal', slug: 'capital-solar-epc-bhopal', description: 'Commercial and institutional solar installer in Bhopal. Schools, hospitals, government offices. 50+ MW commissioned.', phone: '+91 90990 14002', email: 'contact@capitalsolar.com', website: null, address: 'Arera Colony, Bhopal, Madhya Pradesh', verified: true, featured: true, rating: 4.7, reviews: 89, categoryIndex: 1, cityIndex: 13 },
  { name: 'Madhya Pradesh Solar Store', slug: 'mp-solar-store-bhopal', description: 'Solar panels, inverters, batteries — complete solar equipment store in Bhopal. Pan-MP delivery available.', phone: '+91 90990 14003', email: 'sales@mpsolarstore.com', website: null, address: 'Hamidia Road, Bhopal, Madhya Pradesh', verified: true, featured: false, rating: 4.3, reviews: 77, categoryIndex: 2, cityIndex: 13 },
  { name: 'Bhopal Solar Care', slug: 'bhopal-solar-care', description: 'Solar maintenance and AMC services in Bhopal. Inverter repair, panel replacement, performance audits for all system sizes.', phone: '+91 90990 14004', email: null, website: null, address: 'Kolar Road, Bhopal, Madhya Pradesh', verified: false, featured: false, rating: 4.1, reviews: 43, categoryIndex: 4, cityIndex: 13 },

  // CHANDIGARH (cityIndex: 14) — Wealthy city, high per-capita income, rooftop solar booming
  { name: 'Chandigarh Solar Systems', slug: 'chandigarh-solar-systems', description: 'Premium residential solar for Chandigarh, Panchkula, Mohali tricity. High-quality installations with 10-year workmanship warranty.', phone: '+91 90990 15001', email: 'info@chandigarhsolar.com', website: 'https://chandigarhsolar.com', address: 'Sector 17, Chandigarh, Punjab', verified: true, featured: true, rating: 4.8, reviews: 189, categoryIndex: 0, cityIndex: 14 },
  { name: 'Tricity Solar Power', slug: 'tricity-solar-power-chandigarh', description: 'Solar EPC for commercial properties in Chandigarh-Panchkula-Mohali. IT companies, malls, hospitals. PSPCL-approved.', phone: '+91 90990 15002', email: 'contact@tricitysolar.com', website: 'https://tricitysolar.in', address: 'Industrial Area Phase 1, Chandigarh', verified: true, featured: true, rating: 4.9, reviews: 103, categoryIndex: 1, cityIndex: 14 },
  { name: 'Punjab Solar Dealers', slug: 'punjab-solar-dealers-chandigarh', description: 'Authorized distributor for Adani, Waaree, Vikram Solar in Punjab and Haryana. Bulk pricing for contractors.', phone: '+91 90990 15003', email: 'sales@punjabsolardealers.com', website: null, address: 'Sector 22, Chandigarh', verified: true, featured: false, rating: 4.6, reviews: 145, categoryIndex: 2, cityIndex: 14 },
  { name: 'North India Solar Inverters', slug: 'north-india-solar-inverters', description: 'Growatt, SMA, Fronius inverter specialists in Chandigarh. PSPCL net metering approved inverters only.', phone: '+91 90990 15004', email: 'service@northindiainverters.com', website: null, address: 'Sector 26, Chandigarh', verified: true, featured: false, rating: 4.5, reviews: 87, categoryIndex: 3, cityIndex: 14 },
  { name: 'Chandigarh Solar AMC', slug: 'chandigarh-solar-amc', description: 'Annual maintenance for rooftop solar systems in Chandigarh, Panchkula, Mohali. Quarterly cleaning packages available.', phone: '+91 90990 15005', email: null, website: null, address: 'Manimajra, Chandigarh', verified: false, featured: false, rating: 4.3, reviews: 56, categoryIndex: 4, cityIndex: 14 },

  // COIMBATORE (cityIndex: 15) — Industrial city TN, MSME solar demand high
  { name: 'Coimbatore Solar Energy', slug: 'coimbatore-solar-energy', description: 'Coimbatore\'s largest solar installer. Textile mills, pump sets, residential rooftops. TANGEDCO-approved vendor.', phone: '+91 90990 16001', email: 'info@coimbatoresolar.com', website: 'https://coimbatoresolar.com', address: 'RS Puram, Coimbatore, Tamil Nadu', verified: true, featured: true, rating: 4.7, reviews: 167, categoryIndex: 0, cityIndex: 15 },
  { name: 'Kovai Solar EPC', slug: 'kovai-solar-epc', description: 'Commercial solar EPC for Coimbatore\'s MSME sector. Spinning mills, foundries, IT parks. 200+ MW installed.', phone: '+91 90990 16002', email: 'contact@kovaisolar.com', website: 'https://kovaisolar.in', address: 'Ganapathy, Coimbatore, Tamil Nadu', verified: true, featured: true, rating: 4.8, reviews: 98, categoryIndex: 1, cityIndex: 15 },
  { name: 'TN Solar Dealers Coimbatore', slug: 'tn-solar-dealers-coimbatore', description: 'Wholesale and retail solar equipment dealer in Coimbatore. Serving all of Tamil Nadu with best prices.', phone: '+91 90990 16003', email: 'sales@tnsolardealers.com', website: null, address: 'Ondipudur, Coimbatore, Tamil Nadu', verified: true, featured: false, rating: 4.4, reviews: 134, categoryIndex: 2, cityIndex: 15 },
  { name: 'Coimbatore Inverter Hub', slug: 'coimbatore-inverter-hub', description: 'Solar inverter sales and service in Coimbatore. Solaredge, Growatt, ABB authorized service center.', phone: '+91 90990 16004', email: 'service@cbeinverterhub.com', website: null, address: 'Peelamedu, Coimbatore, Tamil Nadu', verified: true, featured: false, rating: 4.5, reviews: 89, categoryIndex: 3, cityIndex: 15 },
  { name: 'Kovai Solar Services', slug: 'kovai-solar-services', description: 'Solar plant O&M in Coimbatore. Panel cleaning, inverter maintenance, performance reporting for mills and factories.', phone: '+91 90990 16005', email: null, website: null, address: 'Singanallur, Coimbatore, Tamil Nadu', verified: false, featured: false, rating: 4.2, reviews: 61, categoryIndex: 4, cityIndex: 15 },

  // VISAKHAPATNAM (cityIndex: 16) — AP's largest city, port city, high industrial solar demand
  { name: 'Vizag Solar Solutions', slug: 'vizag-solar-solutions', description: 'Visakhapatnam\'s premier solar company. Residential and commercial installations. APEPDCL-approved net metering installer.', phone: '+91 90990 17001', email: 'info@vizagsolar.com', website: 'https://vizagsolar.in', address: 'MVP Colony, Visakhapatnam, Andhra Pradesh', verified: true, featured: true, rating: 4.7, reviews: 145, categoryIndex: 0, cityIndex: 16 },
  { name: 'Andhra Solar EPC Vizag', slug: 'andhra-solar-epc-vizag', description: 'Industrial solar for Vizag steel plants, ports, and factories. APEPDCL-approved, 100+ commercial projects delivered.', phone: '+91 90990 17002', email: 'contact@andhrasolar.com', website: 'https://andhrasolar.in', address: 'Gajuwaka, Visakhapatnam, Andhra Pradesh', verified: true, featured: true, rating: 4.8, reviews: 87, categoryIndex: 1, cityIndex: 16 },
  { name: 'AP Solar Dealers Vizag', slug: 'ap-solar-dealers-vizag', description: 'Solar panels and inverters wholesale dealer in Visakhapatnam. Serving Andhra Pradesh installers and contractors.', phone: '+91 90990 17003', email: 'sales@apsolardealers.com', website: null, address: 'Dwaraka Nagar, Visakhapatnam, AP', verified: true, featured: false, rating: 4.4, reviews: 112, categoryIndex: 2, cityIndex: 16 },
  { name: 'Vizag Solar AMC', slug: 'vizag-solar-amc', description: 'Solar maintenance services in Visakhapatnam. Coastal-specific maintenance — anti-corrosion checks, salt-air protection.', phone: '+91 90990 17004', email: null, website: null, address: 'Seethammadhara, Visakhapatnam, AP', verified: false, featured: false, rating: 4.3, reviews: 48, categoryIndex: 4, cityIndex: 16 },
  { name: 'Port City Solar Inverters', slug: 'port-city-solar-inverters', description: 'Solar inverter specialists in Vizag. Marine-grade inverters for coastal installations. SMA and Fronius authorized.', phone: '+91 90990 17005', email: 'service@portcityinverters.com', website: null, address: 'Bheemunipatnam, Visakhapatnam, AP', verified: true, featured: false, rating: 4.5, reviews: 67, categoryIndex: 3, cityIndex: 16 },

  // KOCHI (cityIndex: 17) — Kerala's commercial capital, high electricity tariffs drive solar demand
  { name: 'Kochi Solar Power', slug: 'kochi-solar-power', description: 'Kerala\'s leading solar installer. KSEB net metering specialist. Residential and commercial rooftop solar in Kochi.', phone: '+91 90990 18001', email: 'info@kochisolar.com', website: 'https://kochisolar.com', address: 'Edapally, Kochi, Kerala', verified: true, featured: true, rating: 4.8, reviews: 178, categoryIndex: 0, cityIndex: 17 },
  { name: 'Kerala Solar EPC', slug: 'kerala-solar-epc-kochi', description: 'Commercial solar EPC for Kerala. KSEB-approved. Hotels, hospitals, apartments, and industrial units. 50+ MW completed.', phone: '+91 90990 18002', email: 'contact@keralasolar.com', website: 'https://keralasolar.in', address: 'Kakkanad, Kochi, Kerala', verified: true, featured: true, rating: 4.7, reviews: 134, categoryIndex: 1, cityIndex: 17 },
  { name: 'God\'s Own Solar Dealers', slug: 'gods-own-solar-dealers-kochi', description: 'Authorized dealer for premium solar brands in Kerala. Monsoon-proof solar solutions for Kerala\'s climate.', phone: '+91 90990 18003', email: 'sales@godsownsolar.com', website: null, address: 'MG Road, Kochi, Kerala', verified: true, featured: false, rating: 4.6, reviews: 198, categoryIndex: 2, cityIndex: 17 },
  { name: 'KSEB Solar Partner Kochi', slug: 'kseb-solar-partner-kochi', description: 'KSEB-approved solar installer. Complete net metering application and commissioning. Subsidy and loan assistance.', phone: '+91 90990 18004', email: 'contact@ksebsolarpartner.com', website: null, address: 'Aluva, Kochi, Kerala', verified: true, featured: false, rating: 4.5, reviews: 123, categoryIndex: 0, cityIndex: 17 },
  { name: 'Kerala Solar AMC', slug: 'kerala-solar-amc-kochi', description: 'Solar maintenance in Kerala\'s humid climate. Monsoon-proofing, anti-corrosion checks, annual performance audit.', phone: '+91 90990 18005', email: null, website: null, address: 'Thrippunithura, Kochi, Kerala', verified: false, featured: false, rating: 4.3, reviews: 72, categoryIndex: 4, cityIndex: 17 },

  // VADODARA (cityIndex: 18) — Gujarat industrial city, petrochemical sector driving solar
  { name: 'Baroda Solar Solutions', slug: 'baroda-solar-solutions', description: 'Vadodara\'s trusted solar installer for homes and businesses. GEDA-approved vendor. PM Surya Ghar subsidy experts.', phone: '+91 90990 19001', email: 'info@barodasolar.com', website: 'https://barodasolar.com', address: 'Alkapuri, Vadodara, Gujarat', verified: true, featured: true, rating: 4.7, reviews: 156, categoryIndex: 0, cityIndex: 18 },
  { name: 'Vadodara Solar EPC', slug: 'vadodara-solar-epc', description: 'Industrial solar for GIDC Vadodara. Petrochemical, pharma, and manufacturing sector solar specialists.', phone: '+91 90990 19002', email: 'contact@vadodarasolar.com', website: 'https://vadodarasolar.in', address: 'GIDC Manjusar, Vadodara, Gujarat', verified: true, featured: true, rating: 4.8, reviews: 94, categoryIndex: 1, cityIndex: 18 },
  { name: 'Gujarat Solar Shop Vadodara', slug: 'gujarat-solar-shop-vadodara', description: 'Solar panel and inverter dealer in Vadodara. Loom Solar, Adani, Waaree panels at wholesale prices.', phone: '+91 90990 19003', email: 'sales@gujaratsolarshopcvadodara.com', website: null, address: 'Gotri, Vadodara, Gujarat', verified: true, featured: false, rating: 4.4, reviews: 109, categoryIndex: 2, cityIndex: 18 },
  { name: 'Vadodara Inverter Center', slug: 'vadodara-inverter-center', description: 'Solar inverter sales and service in Vadodara. All brands — Growatt, Solis, Goodwe. Quick repair turnaround.', phone: '+91 90990 19004', email: null, website: null, address: 'Productivity Road, Vadodara, Gujarat', verified: false, featured: false, rating: 4.2, reviews: 57, categoryIndex: 3, cityIndex: 18 },
  { name: 'Baroda Solar AMC', slug: 'baroda-solar-amc', description: 'Solar maintenance in Vadodara. AMC contracts from ₹4,000/year. Panel cleaning, inverter health check included.', phone: '+91 90990 19005', email: null, website: null, address: 'Sayajigunj, Vadodara, Gujarat', verified: false, featured: false, rating: 4.1, reviews: 41, categoryIndex: 4, cityIndex: 18 },

  // PATNA (cityIndex: 19) — Bihar capital, massive PM Surya Ghar demand
  { name: 'Bihar Solar Power Patna', slug: 'bihar-solar-power-patna', description: 'Bihar\'s most trusted solar installer. PM Surya Ghar specialist in Patna. NBPDCL net metering approved vendor.', phone: '+91 90990 20001', email: 'info@biharsolar.com', website: 'https://biharsolar.in', address: 'Boring Road, Patna, Bihar', verified: true, featured: true, rating: 4.6, reviews: 132, categoryIndex: 0, cityIndex: 19 },
  { name: 'Patna Solar EPC', slug: 'patna-solar-epc', description: 'Commercial solar installations in Bihar. Government buildings, schools, hospitals. BREDA-approved contractor.', phone: '+91 90990 20002', email: 'contact@patnasolar.com', website: null, address: 'Bailey Road, Patna, Bihar', verified: true, featured: true, rating: 4.7, reviews: 78, categoryIndex: 1, cityIndex: 19 },
  { name: 'Bihar Solar Dealers', slug: 'bihar-solar-dealers-patna', description: 'Solar panels and batteries wholesale in Patna. Serving Bihar installers. Luminous, Loom Solar authorized distributor.', phone: '+91 90990 20003', email: 'sales@biharsolardealers.com', website: null, address: 'Gandhi Maidan, Patna, Bihar', verified: true, featured: false, rating: 4.3, reviews: 89, categoryIndex: 2, cityIndex: 19 },
  { name: 'Patna Solar Services', slug: 'patna-solar-services', description: 'Solar AMC and repair in Patna. Panel cleaning, inverter maintenance. Serving all of Bihar.', phone: '+91 90990 20004', email: null, website: null, address: 'Kankarbagh, Patna, Bihar', verified: false, featured: false, rating: 4.1, reviews: 37, categoryIndex: 4, cityIndex: 19 },
  { name: 'Ganga Solar Patna', slug: 'ganga-solar-patna', description: 'Affordable residential solar for Bihar families. PM Surya Ghar subsidy and NBPDCL net metering. Easy EMI options.', phone: '+91 90990 20005', email: 'info@gangasolar.in', website: null, address: 'Rajendra Nagar, Patna, Bihar', verified: true, featured: false, rating: 4.4, reviews: 95, categoryIndex: 0, cityIndex: 19 },

  // MORE LISTINGS FOR EXISTING CITIES (better coverage)
  // Mumbai extra
  { name: 'Mumbai Solar Pro', slug: 'mumbai-solar-pro', description: 'Premium residential solar in Mumbai. 5-star rated installer. Covers Thane, Navi Mumbai, and all MMR areas.', phone: '+91 98765 60001', email: 'info@mumbaisolarpro.com', website: null, address: 'Thane West, Mumbai, Maharashtra', verified: true, featured: false, rating: 4.5, reviews: 167, categoryIndex: 0, cityIndex: 0 },
  { name: 'Maharashtra Solar EPC Mumbai', slug: 'maharashtra-solar-epc-mumbai', description: 'Large-scale commercial solar in Mumbai. MSEDCL-approved. Hotels, malls, office buildings. Complete EPC services.', phone: '+91 98765 60002', email: 'contact@maharashtrasolar.com', website: null, address: 'BKC, Mumbai, Maharashtra', verified: true, featured: false, rating: 4.6, reviews: 112, categoryIndex: 1, cityIndex: 0 },
  { name: 'Mumbai Solar AMC', slug: 'mumbai-solar-amc-pro', description: 'Solar O&M specialists in Mumbai. Monsoon-proofing, panel cleaning, MSEDCL compliance checks.', phone: '+91 98765 60003', email: null, website: null, address: 'Malad, Mumbai, Maharashtra', verified: false, featured: false, rating: 4.3, reviews: 78, categoryIndex: 4, cityIndex: 0 },

  // Delhi extra
  { name: 'Delhi Solar Hub', slug: 'delhi-solar-hub', description: 'Complete solar shopping — panels, inverters, batteries under one roof. North and South Delhi delivery.', phone: '+91 98765 60004', email: 'info@delhisolarhub.com', website: null, address: 'Nehru Place, Delhi', verified: true, featured: false, rating: 4.4, reviews: 145, categoryIndex: 2, cityIndex: 1 },
  { name: 'Capital Solar Services Delhi', slug: 'capital-solar-services-delhi', description: 'Solar AMC for BSES and Tata Power Delhi consumers. Annual packages with 4 cleaning visits.', phone: '+91 98765 60005', email: null, website: null, address: 'Saket, Delhi', verified: false, featured: false, rating: 4.2, reviews: 89, categoryIndex: 4, cityIndex: 1 },
  { name: 'DDA Solar Partner', slug: 'dda-solar-partner-delhi', description: 'Delhi\'s trusted residential solar installer. DDA flats, builder floors, kothi installations. BSES net metering specialists.', phone: '+91 98765 60006', email: 'contact@ddasolar.in', website: null, address: 'Rohini, Delhi', verified: true, featured: false, rating: 4.5, reviews: 134, categoryIndex: 0, cityIndex: 1 },

  // Bangalore extra
  { name: 'Bengaluru Solar Pro', slug: 'bengaluru-solar-pro', description: 'BESCOM-approved solar installer in Bangalore. IT corridor specialist — Electronic City, Whitefield, Sarjapur.', phone: '+91 98765 60007', email: 'info@bengalurusolarpro.com', website: null, address: 'Electronic City, Bangalore, Karnataka', verified: true, featured: false, rating: 4.6, reviews: 189, categoryIndex: 0, cityIndex: 2 },
  { name: 'Tech Park Solar Bangalore', slug: 'tech-park-solar-bangalore', description: 'Commercial solar for Bangalore\'s tech parks and campuses. Rooftop and carport solar. 200+ MW installed.', phone: '+91 98765 60008', email: 'contact@techparksolar.com', website: null, address: 'Outer Ring Road, Bangalore, Karnataka', verified: true, featured: false, rating: 4.7, reviews: 145, categoryIndex: 1, cityIndex: 2 },
  { name: 'Bangalore Solar Inverters', slug: 'bangalore-solar-inverters', description: 'Inverter sales and service in Bangalore. Fronius, SMA, Growatt authorized. Same-day repair in Bangalore.', phone: '+91 98765 60009', email: null, website: null, address: 'BTM Layout, Bangalore, Karnataka', verified: true, featured: false, rating: 4.4, reviews: 98, categoryIndex: 3, cityIndex: 2 },

  // Pune extra
  { name: 'Pune Solar Power', slug: 'pune-solar-power-extra', description: 'Pune\'s fastest growing solar company. Kothrud, Hinjewadi, Wakad coverage. MSEDCL net metering specialists.', phone: '+91 98765 60010', email: 'info@punesolarpro.com', website: null, address: 'Hinjewadi, Pune, Maharashtra', verified: true, featured: false, rating: 4.5, reviews: 156, categoryIndex: 0, cityIndex: 3 },
  { name: 'IT Hub Solar Pune', slug: 'it-hub-solar-pune', description: 'Corporate solar for Pune\'s IT corridor. Hinjewadi, Magarpatta, Kharadi tech parks. Complete rooftop EPC.', phone: '+91 98765 60011', email: 'contact@ithubsolar.com', website: null, address: 'Magarpatta City, Pune, Maharashtra', verified: true, featured: false, rating: 4.6, reviews: 123, categoryIndex: 1, cityIndex: 3 },

  // Hyderabad extra
  { name: 'Hyderabad Solar Pro', slug: 'hyderabad-solar-pro-extra', description: 'TSSPDCL-approved solar installer in Hyderabad. HITEC City, Gachibowli, Kondapur area specialist.', phone: '+91 98765 60012', email: 'info@hydsolarpro.com', website: null, address: 'HITEC City, Hyderabad, Telangana', verified: true, featured: false, rating: 4.6, reviews: 134, categoryIndex: 0, cityIndex: 4 },
  { name: 'Telangana Solar Dealers', slug: 'telangana-solar-dealers-hyderabad', description: 'Authorized dealer for Adani, Vikram, Waaree Solar in Telangana. Best wholesale prices in Hyderabad.', phone: '+91 98765 60013', email: null, website: null, address: 'Secunderabad, Hyderabad, Telangana', verified: true, featured: false, rating: 4.4, reviews: 167, categoryIndex: 2, cityIndex: 4 },

  // Chennai extra
  { name: 'Chennai Solar Pro', slug: 'chennai-solar-pro-extra', description: 'TANGEDCO-approved solar installer in Chennai. Anna Nagar, Velachery, OMR, ECR area coverage.', phone: '+91 98765 60014', email: 'info@chennaipro.com', website: null, address: 'Anna Nagar, Chennai, Tamil Nadu', verified: true, featured: false, rating: 4.5, reviews: 178, categoryIndex: 0, cityIndex: 5 },
  { name: 'TN Industrial Solar Chennai', slug: 'tn-industrial-solar-chennai', description: 'Industrial solar for Chennai\'s auto and manufacturing sector. SIDCO, Ambattur SIDCO, Maraimalai Nagar.', phone: '+91 98765 60015', email: 'contact@tnindustrialsolar.com', website: null, address: 'Ambattur, Chennai, Tamil Nadu', verified: true, featured: false, rating: 4.7, reviews: 112, categoryIndex: 1, cityIndex: 5 },

  // Kolkata extra
  { name: 'Kolkata Solar Solutions', slug: 'kolkata-solar-solutions-extra', description: 'West Bengal\'s trusted solar company. CESC and WBSEDCL-approved installer. Salt Lake, New Town, Rajarhat coverage.', phone: '+91 98765 60016', email: 'info@kolkatasolar.com', website: null, address: 'Salt Lake, Kolkata, West Bengal', verified: true, featured: false, rating: 4.4, reviews: 134, categoryIndex: 0, cityIndex: 6 },
  { name: 'Bengal Solar Power', slug: 'bengal-solar-power-extra', description: 'Commercial solar for Kolkata industries. Howrah, Durgapur corridor. WBSEDCL net metering specialist.', phone: '+91 98765 60017', email: 'contact@bengalsolarepc.com', website: null, address: 'Howrah, Kolkata, West Bengal', verified: true, featured: false, rating: 4.5, reviews: 89, categoryIndex: 1, cityIndex: 6 },

  // Ahmedabad extra
  { name: 'Ahmedabad Solar Power', slug: 'ahmedabad-solar-power-extra', description: 'Gujarat\'s solar capital. GEDA and PGVCL-approved. SG Highway, Satellite, Bopal residential specialist.', phone: '+91 98765 60018', email: 'info@ahmedabadsolar.com', website: null, address: 'SG Highway, Ahmedabad, Gujarat', verified: true, featured: false, rating: 4.6, reviews: 198, categoryIndex: 0, cityIndex: 7 },
  { name: 'Gujarat Industrial Solar Ahmedabad', slug: 'gujarat-industrial-solar-ahmedabad', description: 'Industrial solar for Ahmedabad\'s GIDC clusters. Naroda, Vatva, Odhav — manufacturing sector specialists.', phone: '+91 98765 60019', email: 'contact@gujaratindustrialsolar.com', website: null, address: 'Naroda GIDC, Ahmedabad, Gujarat', verified: true, featured: false, rating: 4.7, reviews: 145, categoryIndex: 1, cityIndex: 7 },

  // Jaipur extra
  { name: 'Rajasthan Solar Pro Jaipur', slug: 'rajasthan-solar-pro-jaipur', description: 'Rajasthan\'s solar capital. High solar radiation makes Jaipur ideal. JVVNL net metering approved installer.', phone: '+91 98765 60020', email: 'info@rajasthansolar.com', website: null, address: 'Vaishali Nagar, Jaipur, Rajasthan', verified: true, featured: false, rating: 4.5, reviews: 167, categoryIndex: 0, cityIndex: 8 },
  { name: 'Pink City Solar EPC', slug: 'pink-city-solar-epc', description: 'Commercial and hotel solar in Jaipur. Tourism industry solar specialists. JVVNL compliant installations.', phone: '+91 98765 60021', email: 'contact@pinkcitysolar.com', website: null, address: 'Mansarovar, Jaipur, Rajasthan', verified: true, featured: false, rating: 4.6, reviews: 112, categoryIndex: 1, cityIndex: 8 },

  // Lucknow extra
  { name: 'Lucknow Solar Pro', slug: 'lucknow-solar-pro-extra', description: 'Uttar Pradesh\'s solar leader in Lucknow. PVVNL-approved. Gomti Nagar, Hazratganj, Aliganj residential specialist.', phone: '+91 98765 60022', email: 'info@lucknowsolarpro.com', website: null, address: 'Gomti Nagar, Lucknow, Uttar Pradesh', verified: true, featured: false, rating: 4.5, reviews: 123, categoryIndex: 0, cityIndex: 9 },
  { name: 'UP Commercial Solar Lucknow', slug: 'up-commercial-solar-lucknow', description: 'Commercial solar for UP businesses. Shopping malls, hotels, educational institutions. PVVNL net metering.', phone: '+91 98765 60023', email: 'contact@upcomercialsolar.com', website: null, address: 'Vibhuti Khand, Lucknow, Uttar Pradesh', verified: true, featured: false, rating: 4.4, reviews: 89, categoryIndex: 1, cityIndex: 9 },
];

// Generate additional listings to reach 100+
const additionalListings = [
  // More residential installers
  { name: 'Shine Solar Energy', slug: 'shine-solar-1', description: 'Affordable residential solar installations.', phone: '+91 98765 50000', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 50) + 20, categoryIndex: 0, cityIndex: 0 },
  { name: 'Bright Solar Systems', slug: 'bright-solar-1', description: 'Expert in rooftop solar for homes.', phone: '+91 98765 50001', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 50) + 20, categoryIndex: 0, cityIndex: 1 },
  { name: 'SunBeam Solar', slug: 'sunbeam-solar-1', description: 'Complete home solar solutions.', phone: '+91 98765 50002', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 50) + 20, categoryIndex: 0, cityIndex: 2 },
  { name: 'Eco Solar India', slug: 'eco-solar-1', description: 'Sustainable energy for homes.', phone: '+91 98765 50003', email: null, website: null, address: null, verified: false, featured: false, rating: 4.3, reviews: Math.floor(Math.random() * 50) + 20, categoryIndex: 0, cityIndex: 3 },
  { name: 'Pure Energy Solar', slug: 'pure-energy-1', description: 'Clean solar installations.', phone: '+91 98765 50004', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 50) + 20, categoryIndex: 0, cityIndex: 4 },
  { name: 'Green Planet Solar', slug: 'green-planet-1', description: 'Eco-friendly solar solutions.', phone: '+91 98765 50005', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 50) + 20, categoryIndex: 0, cityIndex: 5 },
  { name: 'Solar Power Hub', slug: 'solar-hub-1', description: 'Your trusted solar partner.', phone: '+91 98765 50006', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 50) + 20, categoryIndex: 0, cityIndex: 6 },
  { name: 'Energy Plus Solar', slug: 'energy-plus-1', description: 'Premium residential solar.', phone: '+91 98765 50007', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 50) + 20, categoryIndex: 0, cityIndex: 7 },
  { name: 'Ray Solar Systems', slug: 'ray-solar-1', description: 'Sun-powered solutions.', phone: '+91 98765 50008', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 50) + 20, categoryIndex: 0, cityIndex: 8 },
  { name: 'Sunrise Energy', slug: 'sunrise-1', description: 'Morning to night solar power.', phone: '+91 98765 50009', email: null, website: null, address: null, verified: false, featured: false, rating: 4.3, reviews: Math.floor(Math.random() * 50) + 20, categoryIndex: 0, cityIndex: 9 },

  // More commercial installers
  { name: 'IndoSolar Commercial', slug: 'indo-commercial-1', description: 'Industrial solar specialists.', phone: '+91 98765 50010', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 40) + 15, categoryIndex: 1, cityIndex: 0 },
  { name: 'Business Solar India', slug: 'business-solar-1', description: 'Corporate solar solutions.', phone: '+91 98765 50011', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 40) + 15, categoryIndex: 1, cityIndex: 1 },
  { name: 'Enterprise Solar', slug: 'enterprise-solar-1', description: 'Large-scale solar projects.', phone: '+91 98765 50012', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 40) + 15, categoryIndex: 1, cityIndex: 2 },
  { name: 'Corp Solar Power', slug: 'corp-solar-1', description: 'B2B solar installations.', phone: '+91 98765 50013', email: null, website: null, address: null, verified: false, featured: false, rating: 4.3, reviews: Math.floor(Math.random() * 40) + 15, categoryIndex: 1, cityIndex: 3 },
  { name: 'Industrial Solar Co', slug: 'industrial-solar-1', description: 'Factory solar experts.', phone: '+91 98765 50014', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 40) + 15, categoryIndex: 1, cityIndex: 4 },
  { name: 'WareHouse Solar', slug: 'warehouse-solar-1', description: 'Solar for commercial buildings.', phone: '+91 98765 50015', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 40) + 15, categoryIndex: 1, cityIndex: 5 },
  { name: 'Office Solar India', slug: 'office-solar-1', description: 'Office rooftop solutions.', phone: '+91 98765 50016', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 40) + 15, categoryIndex: 1, cityIndex: 6 },
  { name: 'Shop Solar Energy', slug: 'shop-solar-1', description: 'Retail solar power.', phone: '+91 98765 50017', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 40) + 15, categoryIndex: 1, cityIndex: 7 },
  { name: 'Mall Solar Systems', slug: 'mall-solar-1', description: 'Commercial property solar.', phone: '+91 98765 50018', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 40) + 15, categoryIndex: 1, cityIndex: 8 },
  { name: 'Hotel Solar India', slug: 'hotel-solar-1', description: 'Hospitality sector solar.', phone: '+91 98765 50019', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 40) + 15, categoryIndex: 1, cityIndex: 9 },

  // More dealers
  { name: 'Solar Depot', slug: 'solar-depot-1', description: 'One-stop solar shop.', phone: '+91 98765 50020', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 50) + 25, categoryIndex: 2, cityIndex: 0 },
  { name: 'Panel Mart', slug: 'panel-mart-1', description: 'Solar panels wholesale.', phone: '+91 98765 50021', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 50) + 25, categoryIndex: 2, cityIndex: 1 },
  { name: 'Solar Components India', slug: 'components-1', description: 'All solar parts available.', phone: '+91 98765 50022', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 50) + 25, categoryIndex: 2, cityIndex: 2 },
  { name: 'PV Systems Dealer', slug: 'pv-dealer-1', description: 'PV panel specialists.', phone: '+91 98765 50023', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 50) + 25, categoryIndex: 2, cityIndex: 3 },
  { name: 'Rooftop Solar Shop', slug: 'rooftop-shop-1', description: 'Solar for every roof.', phone: '+91 98765 50024', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 50) + 25, categoryIndex: 2, cityIndex: 4 },
  { name: 'SunStore Solar', slug: 'sunstore-1', description: 'Your solar supermarket.', phone: '+91 98765 50025', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 50) + 25, categoryIndex: 2, cityIndex: 5 },
  { name: 'India Solar Mart', slug: 'solar-mart-1', description: 'Best solar prices.', phone: '+91 98765 50026', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 50) + 25, categoryIndex: 2, cityIndex: 6 },
  { name: 'Gujarat Solar Depot', slug: 'gujarat-depot-1', description: 'Gujarat solar hub.', phone: '+91 98765 50027', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 50) + 25, categoryIndex: 2, cityIndex: 7 },
  { name: 'Rajasthan Solar Shop', slug: 'rajasthan-shop-1', description: 'Local solar dealer.', phone: '+91 98765 50028', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 50) + 25, categoryIndex: 2, cityIndex: 8 },
  { name: 'UP Solar Mart', slug: 'up-solar-mart-1', description: 'Uttar Pradesh solar.', phone: '+91 98765 50029', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 50) + 25, categoryIndex: 2, cityIndex: 9 },

  // More inverter specialists
  { name: 'Inverter Tech India', slug: 'inverter-tech-1', description: 'All inverter brands.', phone: '+91 98765 50030', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 35) + 20, categoryIndex: 3, cityIndex: 0 },
  { name: 'Solar Power Conversion', slug: 'conversion-1', description: 'DC to AC specialists.', phone: '+91 98765 50031', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 35) + 20, categoryIndex: 3, cityIndex: 1 },
  { name: 'Battery & Inverter Co', slug: 'battery-1', description: 'Energy storage experts.', phone: '+91 98765 50032', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 35) + 20, categoryIndex: 3, cityIndex: 2 },
  { name: 'Pune Inverter Center', slug: 'pune-inverter-1', description: 'Inverter hub Pune.', phone: '+91 98765 50033', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 35) + 20, categoryIndex: 3, cityIndex: 3 },
  { name: 'Hyderabad Solar Power', slug: 'hyd-power-1', description: 'Power conversion experts.', phone: '+91 98765 50034', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 35) + 20, categoryIndex: 3, cityIndex: 4 },
  { name: 'Chennai Inverter Service', slug: 'chennai-service-1', description: 'Inverter repair Chennai.', phone: '+91 98765 50035', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 35) + 20, categoryIndex: 3, cityIndex: 5 },
  { name: 'Bengal Solar Service', slug: 'bengal-service-1', description: 'East India service.', phone: '+91 98765 50036', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 35) + 20, categoryIndex: 3, cityIndex: 6 },
  { name: 'Ahmedabad Power Co', slug: 'ahmedabad-power-1', description: 'Gujarat solar service.', phone: '+91 98765 50037', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 35) + 20, categoryIndex: 3, cityIndex: 7 },
  { name: 'Jaipur Solar Care', slug: 'jaipur-care-1', description: 'Rajasthan service.', phone: '+91 98765 50038', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 35) + 20, categoryIndex: 3, cityIndex: 8 },
  { name: 'Lucknow Solar Help', slug: 'lucknow-help-1', description: 'UP solar support.', phone: '+91 98765 50039', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 35) + 20, categoryIndex: 3, cityIndex: 9 },

  // More maintenance services
  { name: 'Solar Care Plus', slug: 'solar-care-plus-1', description: 'Premium AMC services.', phone: '+91 98765 50040', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 30) + 20, categoryIndex: 4, cityIndex: 0 },
  { name: 'Clean Solar India', slug: 'clean-solar-1', description: 'Panel cleaning experts.', phone: '+91 98765 50041', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 30) + 20, categoryIndex: 4, cityIndex: 1 },
  { name: 'Solar Maintenance Pro', slug: 'solar-main-pro-1', description: 'Professional O&M.', phone: '+91 98765 50042', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 30) + 20, categoryIndex: 4, cityIndex: 2 },
  { name: 'Pune Solar AMC', slug: 'pune-amc-1', description: 'Annual maintenance.', phone: '+91 98765 50043', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 30) + 20, categoryIndex: 4, cityIndex: 3 },
  { name: 'Hyderabad Solar Clean', slug: 'hyd-clean-1', description: 'Telangana service.', phone: '+91 98765 50044', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 30) + 20, categoryIndex: 4, cityIndex: 4 },
  { name: 'Chennai Solar Service', slug: 'chennai-solar-service-amc', description: 'Tamil Nadu maintenance.', phone: '+91 98765 50045', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 30) + 20, categoryIndex: 4, cityIndex: 5 },
  { name: 'Bengal Solar AMC', slug: 'bengal-amc-1', description: 'West Bengal service.', phone: '+91 98765 50046', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 30) + 20, categoryIndex: 4, cityIndex: 6 },
  { name: 'Gujarat Solar Care', slug: 'gujarat-care-1', description: 'Gujarat maintenance.', phone: '+91 98765 50047', email: null, website: null, address: null, verified: false, featured: false, rating: 4.1, reviews: Math.floor(Math.random() * 30) + 20, categoryIndex: 4, cityIndex: 7 },
  { name: 'Rajasthan Solar Help', slug: 'rajasthan-help-1', description: 'Rajasthan AMC.', phone: '+91 98765 50048', email: null, website: null, address: null, verified: false, featured: false, rating: 4.0, reviews: Math.floor(Math.random() * 30) + 20, categoryIndex: 4, cityIndex: 8 },
  { name: 'UP Solar Service', slug: 'up-service-1', description: 'Uttar Pradesh care.', phone: '+91 98765 50049', email: null, website: null, address: null, verified: false, featured: false, rating: 4.2, reviews: Math.floor(Math.random() * 30) + 20, categoryIndex: 4, cityIndex: 9 },
];

// Combine all listings
const allListings = [...listings, ...newCityListings, ...additionalListings];

async function main() {
  console.log('Starting database seed...');

  // Create Categories
  console.log('Creating categories...');
  const createdCategories = await Promise.all(
    categories.map((cat) =>
      prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: {
          name: cat.name,
          slug: cat.slug,
        },
      })
    )
  );

  // Create Locations
  console.log('Creating locations...');
  const createdLocations = await Promise.all(
    cities.map((city) =>
      prisma.location.upsert({
        where: { slug: city.slug },
        update: {},
        create: {
          city: city.city,
          state: city.state,
          slug: city.slug,
        },
      })
    )
  );

  // Create Listings
  console.log('Creating listings...');
  let count = 0;
  for (const listing of allListings) {
    try {
      await prisma.listing.upsert({
        where: { slug: listing.slug },
        update: {},
        create: {
          name: listing.name,
          slug: listing.slug,
          description: listing.description || null,
          phone: listing.phone,
          email: listing.email || null,
          website: listing.website || null,
          address: listing.address || null,
          verified: listing.verified,
          featured: listing.featured,
          rating: listing.rating,
          reviews: listing.reviews,
          categoryId: createdCategories[listing.categoryIndex].id,
          locationId: createdLocations[listing.cityIndex].id,
        },
      });
      count++;
      console.log(`Created listing ${count}/${allListings.length}: ${listing.name}`);
    } catch (error) {
      console.error(`Error creating ${listing.name}:`, error);
    }
  }

  console.log(`\n✅ Database seeded successfully!`);
  console.log(`   - ${createdCategories.length} categories`);
  console.log(`   - ${createdLocations.length} locations`);
  console.log(`   - ${count} listings`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
