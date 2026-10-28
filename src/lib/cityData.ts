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
  },
  'patna': {
    city: 'Patna', state: 'Bihar', discoms: ['SBPDCL', 'NBPDCL'],
    avgCost3kW: '₹42,000 - ₹76,000', avgCost5kW: '₹70,000 - ₹1,25,000',
    topAreas: ['Boring Road', 'Kankarbagh', 'Rajendra Nagar', 'Bailey Road', 'Danapur', 'Patliputra', 'Kadam Kuan', 'Gardanibagh'],
    subsidyInfo: 'PM Surya Ghar Yojana up to ₹78,000 subsidy + Bihar state net metering via SBPDCL',
    highlights: [
      'SBPDCL handles Patna & South Bihar net metering (15-45 day approval)',
      'Average 5-5.5 hours of peak sunlight daily',
      'Bihar Renewable Energy Development Agency (BREDA) assists subsidy applications',
      'Growing residential solar market with competitive pricing'
    ]
  },
  'thane': {
    city: 'Thane', state: 'Maharashtra', discoms: ['MSEDCL', 'Torrent Power (Bhiwandi)'],
    avgCost3kW: '₹45,000 - ₹80,000', avgCost5kW: '₹75,000 - ₹1,30,000',
    topAreas: ['Ghodbunder Road', 'Majiwada', 'Naupada', 'Kolshet', 'Vartak Nagar', 'Kopri', 'Hiranandani Estate', 'Manpada'],
    subsidyInfo: 'Central subsidy ₹78,000 via MSEDCL under PM Surya Ghar Yojana',
    highlights: [
      'MSEDCL net metering approval in 15-30 days',
      'Average 5.5-6 hours peak sunlight',
      'High-rise housing societies driving group solar adoption',
      'Competitive Mumbai MMR pricing'
    ]
  },
  'kalyan': {
    city: 'Kalyan', state: 'Maharashtra', discoms: ['MSEDCL'],
    avgCost3kW: '₹44,000 - ₹78,000', avgCost5kW: '₹72,000 - ₹1,28,000',
    topAreas: ['Kalyan West', 'Kalyan East', 'Dombivli', 'Titwala', 'Ambernath', 'Ulhasnagar', 'Badlapur', 'Shil Phata'],
    subsidyInfo: 'PM Surya Ghar Yojana up to ₹78,000 via MSEDCL',
    highlights: [
      'Kalyan-Dombivli region has fast-growing solar demand',
      'MSEDCL net metering process (15-30 days)',
      'Bungalow-dense areas ideal for 3-5kW rooftop systems',
      'Average 5.5-6 hours peak sunlight'
    ]
  },
  'navi mumbai': {
    city: 'Navi Mumbai', state: 'Maharashtra', discoms: ['MSEDCL'],
    avgCost3kW: '₹45,000 - ₹80,000', avgCost5kW: '₹75,000 - ₹1,30,000',
    topAreas: ['Vashi', 'Nerul', 'Belapur', 'Kharghar', 'Panvel', 'Airoli', 'Kopar Khairane', 'Sanpada'],
    subsidyInfo: 'PM Surya Ghar Yojana up to ₹78,000 via MSEDCL',
    highlights: [
      'Planned city with abundant rooftop space',
      'MSEDCL net metering (15-30 days)',
      'CIDCO housing societies leading adoption',
      'Average 5.5-6 hours peak sunlight'
    ]
  },
  'jabalpur': {
    city: 'Jabalpur', state: 'Madhya Pradesh', discoms: ['MPPKVVCL East'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹66,000 - ₹1,19,000',
    topAreas: ['Vijay Nagar', 'Napier Town', 'Wright Town', 'Cantt Area', 'Gorakhpur', 'Adhartal', 'Ranjhi', 'Madan Mahal'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + MP Solar Policy incentives via MPPKVVCL',
    highlights: [
      'Excellent 5.5-6 hours peak sunlight in Central India',
      'MPPKVVCL East offers streamlined net metering',
      'Waaree, Tata & Adani channel partners active in city',
      'Lower installation costs than metro cities'
    ]
  },
  'bhopal': {
    city: 'Bhopal', state: 'Madhya Pradesh', discoms: ['MPCZ'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹65,000 - ₹1,19,000',
    topAreas: ['Arera Colony', 'Shahpura', 'MP Nagar', 'Kolar Road', 'Bittan Market', 'Hoshangabad Road', 'Bhel', 'New Market'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + MP Solar Policy via MPCZ',
    highlights: [
      'State capital with excellent government solar support',
      'MPCZ net metering approval in 20-30 days',
      'Average 5.5-6 hours peak sunlight',
      'Tata Power Solar and Waaree channel partners active'
    ]
  },
  'indore': {
    city: 'Indore', state: 'Madhya Pradesh', discoms: ['MPCZ'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹65,000 - ₹1,18,000',
    topAreas: ['Vijay Nagar', 'Palasia', 'Rau', 'Bhawarkuan', 'AB Road', 'Nipania', 'Bicholi Mardana', 'Sudama Nagar'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + MP state benefits via MPCZ',
    highlights: [
      'Cleanest city with strong sustainability focus',
      'MPCZ net metering (20-30 days)',
      'Mature installer market keeps prices competitive',
      'Average 5.5-6 hours peak sunlight'
    ]
  },
  'kanpur': {
    city: 'Kanpur', state: 'Uttar Pradesh', discoms: ['KESCO', 'PVVNL'],
    avgCost3kW: '₹42,000 - ₹76,000', avgCost5kW: '₹68,000 - ₹1,24,000',
    topAreas: ['Swaroop Nagar', 'Kakadeo', 'Kalyanpur', 'Panki', 'Kidwai Nagar', 'Govind Nagar', 'Ratanlal Nagar', 'Rawatpur'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via KESCO (city) / PVVNL (surrounding areas)',
    highlights: [
      'Industrial hub with high commercial solar demand',
      'KESCO handles core Kanpur city net metering',
      'Average 5-5.5 hours peak sunlight',
      'Growing residential adoption in western suburbs'
    ]
  },
  'agra': {
    city: 'Agra', state: 'Uttar Pradesh', discoms: ['DVVNL'],
    avgCost3kW: '₹42,000 - ₹75,000', avgCost5kW: '₹68,000 - ₹1,23,000',
    topAreas: ['Dayalbagh', 'Sikandra', 'Kamla Nagar', 'Tajganj', 'Shahganj', 'Khandari', 'Trans Yamuna', 'Fatehabad Road'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via DVVNL net metering',
    highlights: [
      'Excellent 5.5-6 hours peak sunlight',
      'DVVNL streamlined net metering (30-45 days)',
      'Adani, Tata Power channel partners active',
      'Heritage city with growing rooftop adoption'
    ]
  },
  'varanasi': {
    city: 'Varanasi', state: 'Uttar Pradesh', discoms: ['PuVVNL'],
    avgCost3kW: '₹42,000 - ₹75,000', avgCost5kW: '₹68,000 - ₹1,24,000',
    topAreas: ['Sigra', 'Bhelupur', 'Lanka', 'Sarnath', 'Cantt', 'Mahmoorganj', 'BHU', 'Godowlia'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via PuVVNL',
    highlights: [
      'PM constituency with active PM Surya Ghar push',
      'Average 5-5.5 hours peak sunlight',
      'PuVVNL net metering approval in 30-45 days',
      'Growing solar cleaning & AMC service market'
    ]
  },
  'meerut': {
    city: 'Meerut', state: 'Uttar Pradesh', discoms: ['PVVNL'],
    avgCost3kW: '₹42,000 - ₹75,000', avgCost5kW: '₹68,000 - ₹1,23,000',
    topAreas: ['Shastri Nagar', 'Ganga Nagar', 'Mangal Pandey Nagar', 'Pallavpuram', 'Modipuram', 'Cantt', 'Jagriti Vihar', 'Saket'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via PVVNL',
    highlights: [
      'NCR-adjacent city with high electricity tariffs',
      'PVVNL net metering (30-45 days)',
      'Sports goods industry driving commercial solar',
      'Average 5-5.5 hours peak sunlight'
    ]
  },
  'rajkot': {
    city: 'Rajkot', state: 'Gujarat', discoms: ['PGVCL'],
    avgCost3kW: '₹36,000 - ₹66,000', avgCost5kW: '₹60,000 - ₹1,10,000',
    topAreas: ['Kalawad Road', 'University Road', 'Race Course', 'Kotecha Nagar', 'Mavdi', 'Nana Mava', 'Yagnik Road', 'Aji Dam'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + SURYA Gujarat scheme via PGVCL',
    highlights: [
      'Excellent 6-6.5 hours peak sunlight',
      'PGVCL streamlined net metering (15-20 days)',
      'Gujarat state incentives on top of central subsidy',
      'Mature market with lowest costs in region'
    ]
  },
  'vadodara': {
    city: 'Vadodara', state: 'Gujarat', discoms: ['MGVCL'],
    avgCost3kW: '₹36,000 - ₹68,000', avgCost5kW: '₹60,000 - ₹1,12,000',
    topAreas: ['Alkapuri', 'Fatehgunj', 'Gotri', 'Karelibaug', 'Manjalpur', 'Waghodia Road', 'Sama', 'Tarsali'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + Gujarat SURYA scheme via MGVCL',
    highlights: [
      'MGVCL net metering in 15-20 days',
      '6-6.5 hours peak sunlight (highest in India)',
      'Industrial city with strong commercial adoption',
      'Very competitive installation pricing'
    ]
  },
  'bhavnagar': {
    city: 'Bhavnagar', state: 'Gujarat', discoms: ['PGVCL'],
    avgCost3kW: '₹36,000 - ₹66,000', avgCost5kW: '₹60,000 - ₹1,10,000',
    topAreas: ['Waghawadi Road', 'Sardarnagar', 'Kaliyabid', 'Ghogha Circle', 'Rupani Circle', 'Krishnanagar', 'Nilambag', 'Vidyanagar'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + SURYA Gujarat scheme',
    highlights: [
      'Coastal Gujarat with 6+ hours peak sunlight',
      'PGVCL net metering approval in 15-20 days',
      'Lowest solar costs due to mature Gujarat market',
      'Alang shipbreaking industry drives commercial demand'
    ]
  },
  'udaipur': {
    city: 'Udaipur', state: 'Rajasthan', discoms: ['AVVNL'],
    avgCost3kW: '₹38,000 - ₹70,000', avgCost5kW: '₹62,000 - ₹1,16,000',
    topAreas: ['Sukher', 'Sector 14', 'Bhuwana', 'Sardarpura', 'Hiran Magri', 'Fatehpura', 'Ashok Nagar', 'University Road'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + Rajasthan Solar Policy via AVVNL',
    highlights: [
      '6-6.5 hours peak sunlight (Rajasthan among India\'s highest)',
      'AVVNL manages Udaipur net metering',
      'Tata Power Solar & Waaree channel partners active',
      'Hotels/resorts driving commercial solar demand'
    ]
  },
  'jodhpur': {
    city: 'Jodhpur', state: 'Rajasthan', discoms: ['JdVVNL'],
    avgCost3kW: '₹36,000 - ₹68,000', avgCost5kW: '₹60,000 - ₹1,14,000',
    topAreas: ['Ratanada', 'Sardarpura', 'Chopasni Road', 'Shastri Nagar', 'Paota', 'Basni', 'Kudi Bhagtasni', 'Air Force Area'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + Rajasthan state benefits via JdVVNL',
    highlights: [
      '6.5+ hours peak sunlight (near Thar Desert)',
      'JdVVNL streamlined net metering',
      'Waaree channel partners strong in Jodhpur',
      'One of India\'s highest solar irradiance zones'
    ]
  },
  'coimbatore': {
    city: 'Coimbatore', state: 'Tamil Nadu', discoms: ['TANGEDCO'],
    avgCost3kW: '₹42,000 - ₹74,000', avgCost5kW: '₹68,000 - ₹1,22,000',
    topAreas: ['RS Puram', 'Peelamedu', 'Saibaba Colony', 'Race Course', 'Ganapathy', 'Singanallur', 'Vadavalli', 'Kovaipudur'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via TANGEDCO',
    highlights: [
      'Manchester of South India — strong industrial solar demand',
      'TANGEDCO widely-adopted net metering',
      '5.5-6 hours peak sunlight year-round',
      'Textile & manufacturing hub drives commercial installations'
    ]
  },
  'madurai': {
    city: 'Madurai', state: 'Tamil Nadu', discoms: ['TANGEDCO'],
    avgCost3kW: '₹42,000 - ₹74,000', avgCost5kW: '₹68,000 - ₹1,22,000',
    topAreas: ['Anna Nagar', 'KK Nagar', 'Villapuram', 'Tallakulam', 'Bypass Road', 'Vilangudi', 'Alagar Kovil Road', 'Simmakkal'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via TANGEDCO',
    highlights: [
      'Excellent 6+ hours peak sunlight in South Tamil Nadu',
      'TANGEDCO net metering process',
      'Temple city with growing residential adoption',
      'Lower installation costs than Chennai'
    ]
  },
  'salem': {
    city: 'Salem', state: 'Tamil Nadu', discoms: ['TANGEDCO'],
    avgCost3kW: '₹42,000 - ₹74,000', avgCost5kW: '₹68,000 - ₹1,22,000',
    topAreas: ['Fairlands', 'Suramangalam', 'Hasthampatti', 'Alagapuram', 'Ammapet', 'Kondalampatti', 'Shevapet', 'Kitchipalayam'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via TANGEDCO',
    highlights: [
      'Steel city with strong commercial demand',
      'TANGEDCO net metering (Tamil Nadu standard)',
      'Average 5.5-6 hours peak sunlight',
      'Battery & inverter dealer network strong (Luminous, Amaron)'
    ]
  },
  'mysore': {
    city: 'Mysore', state: 'Karnataka', discoms: ['CHESCOM'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹65,000 - ₹1,20,000',
    topAreas: ['Vijayanagar', 'Kuvempunagar', 'Saraswathipuram', 'Jayalakshmipuram', 'Yadavagiri', 'Lakshmipuram', 'Bogadi', 'Hebbal'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + Karnataka Solar Policy via CHESCOM',
    highlights: [
      'CHESCOM handles Mysore net metering',
      '5-6 hours peak sunlight',
      'Heritage city with rising solar adoption',
      'Karnataka\'s second largest solar market'
    ]
  },
  'mysuru': {
    city: 'Mysuru', state: 'Karnataka', discoms: ['CHESCOM'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹65,000 - ₹1,20,000',
    topAreas: ['Vijayanagar', 'Kuvempunagar', 'Saraswathipuram', 'Jayalakshmipuram', 'Yadavagiri', 'Lakshmipuram', 'Bogadi', 'Hebbal'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + Karnataka Solar Policy via CHESCOM',
    highlights: [
      'CHESCOM handles Mysuru net metering',
      '5-6 hours peak sunlight',
      'Heritage city with rising solar adoption',
      'Karnataka\'s second largest solar market'
    ]
  },
  'mangalore': {
    city: 'Mangalore', state: 'Karnataka', discoms: ['MESCOM'],
    avgCost3kW: '₹42,000 - ₹74,000', avgCost5kW: '₹68,000 - ₹1,22,000',
    topAreas: ['Kadri', 'Bejai', 'Balmatta', 'Kankanady', 'Bunder', 'Surathkal', 'Bejai New Road', 'MG Road'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via MESCOM',
    highlights: [
      'MESCOM streamlined net metering',
      'Coastal 5-5.5 hours peak sunlight',
      'Port city with commercial rooftop demand',
      'Waaree, Tata Power channel partners active'
    ]
  },
  'hubli': {
    city: 'Hubli', state: 'Karnataka', discoms: ['HESCOM'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹65,000 - ₹1,20,000',
    topAreas: ['Vidya Nagar', 'Gokul Road', 'Keshwapur', 'Deshpande Nagar', 'Navanagar', 'Unkal', 'Rajnagar', 'Neeligin Road'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via HESCOM',
    highlights: [
      'HESCOM manages Hubli-Dharwad net metering',
      '5.5-6 hours peak sunlight',
      'North Karnataka\'s largest solar market',
      'Lower installation costs than Bangalore'
    ]
  },
  'belgaum': {
    city: 'Belgaum', state: 'Karnataka', discoms: ['HESCOM'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹65,000 - ₹1,20,000',
    topAreas: ['Tilakwadi', 'Camp', 'Shahapur', 'Angol', 'Mahantesh Nagar', 'Vadgaon', 'Nehru Nagar', 'Khanapur Road'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via HESCOM',
    highlights: [
      'HESCOM net metering process',
      '5.5-6 hours peak sunlight in Western Karnataka',
      'Growing installer network',
      'Sugar & foundry industries driving commercial solar'
    ]
  },
  'kochi': {
    city: 'Kochi', state: 'Kerala', discoms: ['KSEB'],
    avgCost3kW: '₹44,000 - ₹76,000', avgCost5kW: '₹72,000 - ₹1,26,000',
    topAreas: ['Kakkanad', 'Edappally', 'Palarivattom', 'Kaloor', 'Vyttila', 'Panampilly Nagar', 'Fort Kochi', 'Aluva'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + KSEB Soura scheme benefits',
    highlights: [
      'KSEB Soura scheme adds state benefits on top of central subsidy',
      'Coastal 5-5.5 hours peak sunlight',
      'High electricity tariffs make solar payback fast (3-4 years)',
      'Kerala Startup Mission promotes solar tech adoption'
    ]
  },
  'kozhikode': {
    city: 'Kozhikode', state: 'Kerala', discoms: ['KSEB'],
    avgCost3kW: '₹44,000 - ₹76,000', avgCost5kW: '₹72,000 - ₹1,26,000',
    topAreas: ['Nadakkavu', 'Chevayur', 'Kunnamangalam', 'Beach Road', 'Mavoor Road', 'Ramanattukara', 'Feroke', 'Vellayil'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + KSEB Soura scheme',
    highlights: [
      'KSEB Soura scheme adds state incentive',
      'Coastal 5-5.5 hours peak sunlight',
      'Growing residential solar market in North Kerala',
      'Battery/inverter dealer network strong (Luminous, Microtek, Amaron)'
    ]
  },
  'bhubaneswar': {
    city: 'Bhubaneswar', state: 'Odisha', discoms: ['TPCODL'],
    avgCost3kW: '₹42,000 - ₹75,000', avgCost5kW: '₹68,000 - ₹1,22,000',
    topAreas: ['Jayadev Vihar', 'Nayapalli', 'Chandrasekharpur', 'Patia', 'Sailashree Vihar', 'Saheed Nagar', 'Old Town', 'Khandagiri'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + Odisha Renewable Energy Policy via TPCODL',
    highlights: [
      'TPCODL (Tata Power subsidiary) handles net metering — 20-30 days',
      '5.5-6 hours peak sunlight',
      'State capital with active PM Surya Ghar drive',
      'Strong Waaree & Tata Power dealer network'
    ]
  },
  'ranchi': {
    city: 'Ranchi', state: 'Jharkhand', discoms: ['JBVNL'],
    avgCost3kW: '₹44,000 - ₹78,000', avgCost5kW: '₹72,000 - ₹1,26,000',
    topAreas: ['Kanke Road', 'Lalpur', 'Doranda', 'Hinoo', 'Bariatu', 'Ratu Road', 'Ashok Nagar', 'Harmu'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via JBVNL',
    highlights: [
      'JBVNL manages Jharkhand net metering (30-45 days)',
      '5-5.5 hours peak sunlight',
      'JREDA (Jharkhand Renewable Energy) coordinates subsidy',
      'Capital city driving state solar adoption'
    ]
  },
  'raipur': {
    city: 'Raipur', state: 'Chhattisgarh', discoms: ['CSPDCL'],
    avgCost3kW: '₹42,000 - ₹75,000', avgCost5kW: '₹68,000 - ₹1,22,000',
    topAreas: ['Shankar Nagar', 'Devendra Nagar', 'Pandri', 'Tatibandh', 'Kachna', 'Amanaka', 'Mowa', 'VIP Road'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + Chhattisgarh solar policy via CSPDCL',
    highlights: [
      'CSPDCL streamlined net metering approval',
      '5.5-6 hours peak sunlight in Central India',
      'CREDA (Chhattisgarh Renewable Energy Dev. Agency) facilitates subsidy',
      'Waaree channel partners strong in state capital'
    ]
  },
  'guwahati': {
    city: 'Guwahati', state: 'Assam', discoms: ['APDCL'],
    avgCost3kW: '₹46,000 - ₹80,000', avgCost5kW: '₹75,000 - ₹1,30,000',
    topAreas: ['Beltola', 'GS Road', 'Zoo Road', 'Ganeshguri', 'Chandmari', 'Uzan Bazar', 'Bharalumukh', 'Six Mile'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via APDCL — Assam Energy Development Agency assists',
    highlights: [
      'APDCL handles Assam net metering (30-45 days)',
      '4.5-5 hours peak sunlight (higher rainfall region)',
      'Northeast gateway with growing solar demand',
      'Strong AEDA support for residential subsidy applications'
    ]
  },
  'dehradun': {
    city: 'Dehradun', state: 'Uttarakhand', discoms: ['UPCL'],
    avgCost3kW: '₹44,000 - ₹78,000', avgCost5kW: '₹72,000 - ₹1,26,000',
    topAreas: ['Rajpur Road', 'Dalanwala', 'Vasant Vihar', 'Jakhan', 'Sahastradhara Road', 'ISBT', 'Ballupur', 'Race Course'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + Uttarakhand solar policy via UPCL',
    highlights: [
      'UPCL net metering (30-45 days)',
      '5-5.5 hours peak sunlight in valley',
      'UREDA (Uttarakhand Renewable Energy) coordinates',
      'Growing capital city solar market'
    ]
  },
  'chandigarh': {
    city: 'Chandigarh', state: 'Punjab', discoms: ['CED Chandigarh'],
    avgCost3kW: '₹42,000 - ₹75,000', avgCost5kW: '₹68,000 - ₹1,22,000',
    topAreas: ['Sector 8', 'Sector 17', 'Sector 22', 'Sector 35', 'Sector 44', 'Manimajra', 'Panchkula', 'Mohali'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + Chandigarh solar mandate for large houses',
    highlights: [
      'Chandigarh has India\'s strongest rooftop solar mandate (mandatory for 500+ sqyd plots)',
      'Excellent 5.5-6 hours peak sunlight',
      'CREST (Chandigarh Renewable Energy) handles applications',
      'Highest per-capita solar adoption in India'
    ]
  },
  'ludhiana': {
    city: 'Ludhiana', state: 'Punjab', discoms: ['PSPCL'],
    avgCost3kW: '₹40,000 - ₹73,000', avgCost5kW: '₹66,000 - ₹1,21,000',
    topAreas: ['Sarabha Nagar', 'Model Town', 'Civil Lines', 'BRS Nagar', 'Dugri', 'Pakhowal Road', 'Kitchlu Nagar', 'Jamalpur'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 + Punjab Renewable Energy Policy via PSPCL',
    highlights: [
      'PSPCL net metering (30-45 days)',
      'Industrial capital of Punjab with strong commercial demand',
      '5.5-6 hours peak sunlight',
      'Punjab\'s highest solar installer density'
    ]
  },
  'amritsar': {
    city: 'Amritsar', state: 'Punjab', discoms: ['PSPCL'],
    avgCost3kW: '₹40,000 - ₹73,000', avgCost5kW: '₹66,000 - ₹1,21,000',
    topAreas: ['Ranjit Avenue', 'Green Avenue', 'Mall Road', 'Court Road', 'Batala Road', 'Majitha Road', 'GT Road', 'Lawrence Road'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via PSPCL',
    highlights: [
      'PSPCL net metering process',
      '5.5-6 hours peak sunlight',
      'Holy city with growing hotel/commercial solar',
      'Battery/inverter market strong (Luminous, Exide, Amaron)'
    ]
  },
  'visakhapatnam': {
    city: 'Visakhapatnam', state: 'Andhra Pradesh', discoms: ['APEPDCL'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹65,000 - ₹1,19,000',
    topAreas: ['MVP Colony', 'Seethammadhara', 'Dwaraka Nagar', 'Madhurawada', 'Gajuwaka', 'Rushikonda', 'Beach Road', 'Asilmetta'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via APEPDCL',
    highlights: [
      'APEPDCL streamlined net metering',
      '5.5-6 hours peak sunlight (coastal AP)',
      'Port city with strong commercial solar demand',
      'NREDCAP coordinates state subsidy'
    ]
  },
  'vijayawada': {
    city: 'Vijayawada', state: 'Andhra Pradesh', discoms: ['APSPDCL'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹65,000 - ₹1,19,000',
    topAreas: ['Benz Circle', 'Mogalrajpuram', 'Governorpet', 'Labbipet', 'Auto Nagar', 'Patamata', 'Ramavarappadu', 'Kanuru'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via APSPDCL',
    highlights: [
      'APSPDCL manages net metering',
      'Excellent 5.5-6 hours peak sunlight',
      'Commercial capital of AP with fast adoption',
      'Growing rooftop solar installer base'
    ]
  },
  'aurangabad': {
    city: 'Aurangabad', state: 'Maharashtra', discoms: ['MSEDCL'],
    avgCost3kW: '₹42,000 - ₹75,000', avgCost5kW: '₹68,000 - ₹1,22,000',
    topAreas: ['Cidco', 'Garkheda', 'Jalna Road', 'Beed Bypass', 'Waluj', 'Aurangpura', 'Jyoti Nagar', 'Kranti Chowk'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via MSEDCL',
    highlights: [
      'MSEDCL net metering (15-30 days)',
      '5.5-6 hours peak sunlight',
      'Waluj industrial area drives commercial demand',
      'Tourism/hotels adding rooftop capacity'
    ]
  },
  'kolhapur': {
    city: 'Kolhapur', state: 'Maharashtra', discoms: ['MSEDCL'],
    avgCost3kW: '₹42,000 - ₹75,000', avgCost5kW: '₹68,000 - ₹1,22,000',
    topAreas: ['Rajarampuri', 'Shahupuri', 'Rankala', 'Nagala Park', 'Tarabai Park', 'Kadamwadi', 'Ruikar Colony', 'Sangaonkar Lane'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 via MSEDCL',
    highlights: [
      'MSEDCL net metering (15-30 days)',
      '5.5-6 hours peak sunlight',
      'Sugar & foundry industries driving commercial adoption',
      'Growing residential solar market'
    ]
  },
  'gwalior': {
    city: 'Gwalior', state: 'Madhya Pradesh', discoms: ['MPMKVVCL'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹65,000 - ₹1,18,000',
    topAreas: ['Patel Nagar', 'City Centre', 'Lashkar', 'Morar', 'Thathipur', 'Govindpuri', 'Jayendraganj', 'Deen Dayal Nagar'],
    subsidyInfo: 'Direct PM Surya Ghar subsidy ₹78,000 credited via MPMKVVCL portal',
    highlights: [
      'Official SolarSquare Experience Centre located in Patel Nagar, City Centre',
      'MPMKVVCL fast-track net metering approval within 15-20 days',
      'High solar irradiation with 5.6-6.0 peak sunshine hours daily',
      'Rapid residential rooftop adoption in City Centre and Lashkar villa clusters'
    ]
  },
  'noida': {
    city: 'Noida', state: 'Uttar Pradesh', discoms: ['PVVNL'],
    avgCost3kW: '₹42,000 - ₹75,000', avgCost5kW: '₹70,000 - ₹1,25,000',
    topAreas: ['Sector 62', 'Sector 137', 'Sector 150', 'Sector 50', 'Sector 44', 'Greater Noida West', 'Sector 18', 'Sector 128'],
    subsidyInfo: 'PM Surya Ghar Yojana central subsidy ₹78,000 + UP State Top-up incentives',
    highlights: [
      'PVVNL net metering streamlined for builder floors and high-rise society rooftops',
      'Dedicated SolarSquare Energy Hub serving Noida & Greater Noida',
      'Substantial electricity cost reduction against high Uttar Pradesh domestic slab rates',
      'Average payback period of 3.2-3.6 years for 3kW-5kW systems'
    ]
  },
  'ghaziabad': {
    city: 'Ghaziabad', state: 'Uttar Pradesh', discoms: ['PVVNL'],
    avgCost3kW: '₹42,000 - ₹75,000', avgCost5kW: '₹70,000 - ₹1,25,000',
    topAreas: ['Indirapuram', 'Vaishali', 'Vasundhara', 'Raj Nagar', 'Raj Nagar Extension', 'Crossings Republik', 'Kaushambi', 'Sanjay Nagar'],
    subsidyInfo: 'PM Surya Ghar ₹78,000 direct subsidy via PVVNL portal',
    highlights: [
      'SolarSquare operational hub covering Indirapuram, Vaishali & RDC',
      'Fast PVVNL bi-directional net meter testing and installation',
      'Heavy domestic power tariffs make solar extremely lucrative for villas and kothis',
      'Elevated wind-proof rooftop structures popular for terrace utilization'
    ]
  },
  'gurgaon': {
    city: 'Gurgaon', state: 'Haryana', discoms: ['DHBVN'],
    avgCost3kW: '₹44,000 - ₹78,000', avgCost5kW: '₹72,000 - ₹1,30,000',
    topAreas: ['Golf Course Extension', 'DLF Phase 1-5', 'Sushant Lok', 'Sohna Road', 'Sector 56', 'Sector 57', 'Nirvana Country', 'South City'],
    subsidyInfo: 'PM Surya Ghar DBT subsidy up to ₹78,000 + Haryana solar incentives',
    highlights: [
      'Prime SolarSquare operational cluster for premium luxury villas and floors',
      'DHBVN digital net-metering portal with swift technical feasibility issuance',
      'High AC power loads during peak summer offset by 5.5+ peak sunlight hours',
      'Top-tier monocrystalline TOPCon panels preferred for compact terrace footprints'
    ]
  },
  'faridabad': {
    city: 'Faridabad', state: 'Haryana', discoms: ['DHBVN'],
    avgCost3kW: '₹42,000 - ₹75,000', avgCost5kW: '₹68,000 - ₹1,22,000',
    topAreas: ['Sector 15', 'Sector 16', 'Sector 21C', 'Neharpar', 'Sector 82', 'Sector 85', 'Greenfield Colony', 'Surajkund'],
    subsidyInfo: 'PM Surya Ghar Yojana ₹78,000 subsidy through DHBVN',
    highlights: [
      'Active SolarSquare turnkey installation and maintenance network',
      'DHBVN bi-directional meter deployment within 20-30 days',
      'Rapidly growing rooftop adoption in Greater Faridabad sectors',
      'Over 300 sunny days annually providing consistent energy output'
    ]
  },
  'bareilly': {
    city: 'Bareilly', state: 'Uttar Pradesh', discoms: ['Madhyanchal MVVNL'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹65,000 - ₹1,18,000',
    topAreas: ['Civil Lines', 'DD Puram', 'Rajendra Nagar', 'Pilibhit Bypass Road', 'Rampur Garden', 'Prem Nagar', 'Subhash Nagar'],
    subsidyInfo: 'Direct Benefit Transfer subsidy up to ₹78,000 under PM Surya Ghar Yojana',
    highlights: [
      'SolarSquare operational territory with certified installation engineers',
      'Madhyanchal Vidyut Vitran Nigam net metering processing',
      'High power tariff protection for independent houses and duplexes',
      'Estimated 3.4 years capital payback with monthly savings over ₹3,200'
    ]
  },
  'prayagraj': {
    city: 'Prayagraj', state: 'Uttar Pradesh', discoms: ['UPPCL'],
    avgCost3kW: '₹40,000 - ₹72,000', avgCost5kW: '₹65,000 - ₹1,18,000',
    topAreas: ['Civil Lines', 'George Town', 'Tagore Town', 'Ashok Nagar', 'Mumfordganj', 'Kareli', 'Naini', 'Jhalwa'],
    subsidyInfo: 'Central subsidy up to ₹78,000 credited within 30 days under PM Surya Ghar',
    highlights: [
      'SolarSquare channel partner presence with end-to-end liaison support',
      'UPPCL net metering liaison and safety earthing inspection',
      'Excellent solar irradiation along the Gangetic plains (5.4-5.8 kWh/m²/day)',
      'Substantial reduction in summer power bills for residential consumers'
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
