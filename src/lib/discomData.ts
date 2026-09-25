export interface DiscomTariffSlab {
  range: string;
  ratePerUnit: string;
}

export interface DiscomInfo {
  slug: string;
  name: string;
  shortName: string;
  state: string;
  stateSlug: string;
  coverageArea: string;
  portalUrl: string;
  portalName: string;
  sercOrderRef: string;
  sanctionedLoadLimit: string;
  meteringType: string; // Net metering, Gross metering, Net feed-in
  approvalTimeline: string;
  technicalFeasibilityLimit: string; // e.g. "Up to 100% of sanctioned load / distribution transformer capacity"
  tariffSlabs: DiscomTariffSlab[];
  overview: string;
  netMeteringSteps: string[];
  faqs: { q: string; a: string }[];
}

export const DISCOMS_DATA: DiscomInfo[] = [
  {
    slug: 'msedcl',
    name: 'Maharashtra State Electricity Distribution Company Limited',
    shortName: 'MSEDCL (Mahavitaran)',
    state: 'Maharashtra',
    stateSlug: 'maharashtra',
    coverageArea: 'All of Maharashtra except Mumbai island city and suburban distribution zones',
    portalUrl: 'https://www.mahadiscom.in/solar-rooftop-portal/',
    portalName: 'Mahavitaran Rooftop Solar Portal',
    sercOrderRef: 'MERC (Grid Interactive Rooftop Renewable Energy Generating Systems) Regulations, Order No. 42',
    sanctionedLoadLimit: 'Up to 100% of consumer sanctioned load or contract demand (Max 1 MW)',
    meteringType: 'Net Metering for LT residential consumers up to 500 kW',
    approvalTimeline: '15 to 21 working days from technical feasibility approval to meter installation',
    technicalFeasibilityLimit: 'Up to 70% of local Distribution Transformer (DT) rated capacity',
    tariffSlabs: [
      { range: '0 – 100 units', ratePerUnit: '₹5.88 / kWh' },
      { range: '101 – 300 units', ratePerUnit: '₹11.46 / kWh' },
      { range: '301 – 500 units', ratePerUnit: '₹15.72 / kWh' },
      { range: 'Above 500 units', ratePerUnit: '₹17.81 / kWh' },
    ],
    overview: 'MSEDCL is India\'s largest power distribution utility, serving over 28 million consumers. Under MERC regulations, residential rooftop solar installations receive priority digital net metering through the Mahavitaran web portal and National PM Surya Ghar Portal.',
    netMeteringSteps: [
      'Register on PM Surya Ghar portal (pmsuryaghar.gov.in) selecting Maharashtra and MSEDCL as your DISCOM.',
      'Submit consumer number and sanction load details for online Technical Feasibility Approval (TFA).',
      'Choose an empanelled solar EPC installer to set up ALMM-compliant DCR solar modules.',
      'MSEDCL field junior engineer inspects installation and issues work completion report.',
      'MSEDCL tests and installs the bi-directional net meter; subsidy credited within 30 days of commissioning.',
    ],
    faqs: [
      {
        q: 'What is the maximum rooftop solar capacity allowed under MSEDCL?',
        a: 'Residential LT consumers can install up to 100% of their sanctioned load or contracted demand, subject to a cap of 500 kW under standard net-metering provisions.',
      },
      {
        q: 'How does MSEDCL adjust solar energy units in billing?',
        a: 'Solar units generated are subtracted directly from monthly consumption. Surplus energy is banked and rolled over month-to-month within the financial year (April to March). Unconsumed banked units are settled at MERC average power purchase cost (APPC) at fiscal year-end.',
      },
      {
        q: 'Can I apply for PM Surya Ghar subsidy directly through MSEDCL?',
        a: 'All PM Surya Ghar applications must be initiated via the Central National Portal (pmsuryaghar.gov.in), which connects automatically via API to MSEDCL\'s local division for feasibility and meter commissioning.',
      },
    ],
  },
  {
    slug: 'bescom',
    name: 'Bangalore Electricity Supply Company Limited',
    shortName: 'BESCOM',
    state: 'Karnataka',
    stateSlug: 'karnataka',
    coverageArea: 'Bengaluru Urban, Bengaluru Rural, Chikkaballapura, Kolar, Davanagere, Tumakuru, Chitradurga, and Ramanagara',
    portalUrl: 'https://bescom.karnataka.gov.in/',
    portalName: 'BESCOM Soura Belaku Portal',
    sercOrderRef: 'KERC (Implementation of Rooftop Solar PV Systems) Regulations, 2022 amendment',
    sanctionedLoadLimit: 'Up to 100% of sanctioned load (1 kW to 1 MW)',
    meteringType: 'Net Metering for domestic consumers up to 50 kW; Gross Metering above 50 kW',
    approvalTimeline: '14 to 20 working days',
    technicalFeasibilityLimit: 'Up to 80% of local distribution transformer rated capacity',
    tariffSlabs: [
      { range: '0 – 50 units', ratePerUnit: '₹4.75 / kWh' },
      { range: '51 – 100 units', ratePerUnit: '₹7.00 / kWh' },
      { range: 'Above 100 units', ratePerUnit: '₹7.85 / kWh' },
    ],
    overview: 'BESCOM distributes power across 8 districts of Karnataka including the Bangalore metropolitan region. It operates an automated digital rooftop solar clearance system integrated with the PM Surya Ghar National Portal.',
    netMeteringSteps: [
      'Submit application on the PM Surya Ghar portal with BESCOM consumer ID.',
      'BESCOM sub-divisional office issues digital Feasibility Clearance within 7 working days.',
      'Empanelled vendor executes physical installation using DCR-compliant ALMM panels.',
      'BESCOM metering department tests bi-directional meter and commissions the system.',
      'Online Joint Inspection Report (JIR) submitted for central subsidy disbursal.',
    ],
    faqs: [
      {
        q: 'Does BESCOM support net metering for apartment societies in Bengaluru?',
        a: 'Yes. Group housing societies (GHS) and Resident Welfare Associations (RWAs) can install common rooftop solar systems under virtual or individual net metering for common area lighting and pumps up to 500 kW.',
      },
      {
        q: 'What is the meter testing fee charged by BESCOM?',
        a: 'Meter testing and calibration fees for bi-directional meters range from ₹1,000 to ₹2,500 depending on single-phase or three-phase supply configurations.',
      },
    ],
  },
  {
    slug: 'tangedco',
    name: 'Tamil Nadu Generation and Distribution Corporation',
    shortName: 'TANGEDCO',
    state: 'Tamil Nadu',
    stateSlug: 'tamil-nadu',
    coverageArea: 'Entire state of Tamil Nadu across all 38 districts',
    portalUrl: 'https://www.tangedco.org/',
    portalName: 'TANGEDCO Solar Web Portal',
    sercOrderRef: 'TNERC Grid Interactive Solar PV Energy Regulations, Order No. 8',
    sanctionedLoadLimit: 'Up to 100% of sanctioned load for residential domestic category',
    meteringType: 'Net Feed-in billing mechanism for domestic consumers',
    approvalTimeline: '20 to 25 working days',
    technicalFeasibilityLimit: 'Up to 70% of distribution transformer capacity',
    tariffSlabs: [
      { range: '0 – 100 units', ratePerUnit: 'Free (State Subsidy)' },
      { range: '101 – 200 units', ratePerUnit: '₹2.25 / kWh' },
      { range: '201 – 400 units', ratePerUnit: '₹4.50 / kWh' },
      { range: '401 – 500 units', ratePerUnit: '₹6.00 / kWh' },
      { range: 'Above 500 units', ratePerUnit: '₹8.00–₹11.00 / kWh' },
    ],
    overview: 'TANGEDCO manages power distribution for over 30 million consumers in Tamil Nadu. Domestic solar consumers benefit from bi-monthly net feed-in billing where solar export reduces high-tier consumption slabs.',
    netMeteringSteps: [
      'Apply online via PM Surya Ghar portal selecting TANGEDCO as distribution licensee.',
      'Local Section Officer (AE) conducts field verification for transformer loading.',
      'Installation carried out by empanelled vendor strictly utilizing DCR ALMM solar modules.',
      'Safety inspection completed by Assistant Executive Engineer (AEE).',
      'Bi-directional solar net meter installed and synchronised with TANGEDCO grid.',
    ],
    faqs: [
      {
        q: 'How does TANGEDCO calculate net feed-in savings?',
        a: 'Because Tamil Nadu uses bi-monthly billing with the first 100 units free, solar power generated helps keep consumers out of the punitive ₹8.00–₹11.00 per unit upper slabs, creating exceptionally fast payback.',
      },
      {
        q: 'Can non-DCR panels receive PM Surya Ghar subsidy under TANGEDCO?',
        a: 'No. MNRE rules strictly mandate Domestic Content Requirement (DCR) cells and modules enrolled on ALMM List-I for any PM Surya Ghar subsidy payout.',
      },
    ],
  },
  {
    slug: 'pvvnl',
    name: 'Paschimanchal Vidyut Vitran Nigam Limited',
    shortName: 'PVVNL (Meerut / Western UP)',
    state: 'Uttar Pradesh',
    stateSlug: 'uttar-pradesh',
    coverageArea: 'Noida, Greater Noida, Ghaziabad, Meerut, Bulandshahr, Saharanpur, Muzaffarnagar, Moradabad',
    portalUrl: 'https://pvvnl.up.gov.in/',
    portalName: 'UPPCL Solar Rooftop Portal',
    sercOrderRef: 'UPERC (Rooftop Solar PV Grid Interactive System) Regulations, RSPV-2019',
    sanctionedLoadLimit: 'Up to 100% of consumer sanctioned load (1 kW to 2 MW)',
    meteringType: 'Net Metering for residential; Gross Metering for commercial/industrial',
    approvalTimeline: '20 to 30 working days',
    technicalFeasibilityLimit: 'Up to 75% of DT transformer capacity',
    tariffSlabs: [
      { range: '0 – 100 units', ratePerUnit: '₹5.50 / kWh' },
      { range: '101 – 150 units', ratePerUnit: '₹5.50 / kWh' },
      { range: '151 – 300 units', ratePerUnit: '₹6.00 / kWh' },
      { range: 'Above 300 units', ratePerUnit: '₹7.00 / kWh' },
    ],
    overview: 'PVVNL serves western Uttar Pradesh, including the high-demand NCR satellite cities of Noida and Ghaziabad. Solar consumers in PVVNL benefit from both the Central PM Surya Ghar subsidy (₹78,000) and the UPNEDA state top-up subsidy (up to ₹30,000).',
    netMeteringSteps: [
      'Register on pmsuryaghar.gov.in with 10-digit UPPCL account ID.',
      'PVVNL sub-station reviews transformer capacity and issues online feasibility within 10 days.',
      'Empanelled vendor installs DCR solar panels and inverter.',
      'Sub-divisional officer conducts joint inspection and installs dual-channel net meter.',
      'Central DBT and UPNEDA state subsidy processed to beneficiary account.',
    ],
    faqs: [
      {
        q: 'Does Uttar Pradesh give an extra state subsidy over PM Surya Ghar?',
        a: 'Yes! Uttar Pradesh provides a state top-up through UPNEDA of ₹15,000 for 1 kW and ₹30,000 for systems of 2 kW and above, bringing total subsidy on a 3 kW system to ₹1,08,000.',
      },
      {
        q: 'Who supplies the net meter in PVVNL?',
        a: 'Consumers have the option to procure a DISCOM-approved meter from authorised vendors or pay PVVNL to supply and calibrate the bi-directional meter.',
      },
    ],
  },
  {
    slug: 'dgvcl',
    name: 'Dakshin Gujarat Vij Company Limited',
    shortName: 'DGVCL (South Gujarat)',
    state: 'Gujarat',
    stateSlug: 'gujarat',
    coverageArea: 'Surat, Bharuch, Valsad, Navsari, Tapi, Dang, and Narmada districts',
    portalUrl: 'https://www.dgvcl.com/',
    portalName: 'Surya Gujarat / GUVNL Single Window Portal',
    sercOrderRef: 'GERC (Net Metering Rooftop Solar PV Grid Interactive Systems) Regulations',
    sanctionedLoadLimit: 'Up to 100% of sanctioned load (no restriction for residential)',
    meteringType: 'Net Metering with banking settlement at ₹2.25/unit surplus purchase',
    approvalTimeline: '10 to 14 working days (Fastest in India)',
    technicalFeasibilityLimit: 'Up to 100% of distribution transformer capacity',
    tariffSlabs: [
      { range: '0 – 50 units', ratePerUnit: '₹3.20 / kWh' },
      { range: '51 – 100 units', ratePerUnit: '₹3.90 / kWh' },
      { range: '101 – 250 units', ratePerUnit: '₹4.40 / kWh' },
      { range: 'Above 250 units', ratePerUnit: '₹5.55 / kWh' },
    ],
    overview: 'DGVCL powers industrial and residential hubs across south Gujarat including diamond capital Surat. Gujarat leads India in rooftop solar adoption, with seamless digital DISCOM workflows and fastest net meter synchronization.',
    netMeteringSteps: [
      'Submit application on PM Surya Ghar portal selecting GUVNL / DGVCL.',
      'Instant automated technical feasibility verification via online consumer ledger.',
      'Empanelled vendor completes rooftop mounting and inverter commissioning.',
      'DGVCL team installs bidirectional smart meter within 7–10 days.',
      'Direct Benefit Transfer (DBT) subsidy released to bank account.',
    ],
    faqs: [
      {
        q: 'Why is Gujarat the fastest state for solar net metering?',
        a: 'Through the pioneering Surya Gujarat program, GUVNL and DGVCL integrated consumer accounts with smart metering databases, allowing automated clearances without manual paperwork.',
      },
      {
        q: 'What is the surplus solar purchase tariff in DGVCL?',
        a: 'Excess solar units exported after monthly consumption offset are settled by DGVCL at GERC APPC rate (currently ~₹2.25 per unit) annually.',
      },
    ],
  },
  {
    slug: 'bses-rajdhani',
    name: 'BSES Rajdhani Power Limited',
    shortName: 'BRPL (Delhi)',
    state: 'Delhi',
    stateSlug: 'delhi',
    coverageArea: 'South and West Delhi (over 2.7 million consumers)',
    portalUrl: 'https://www.bsesdelhi.com/',
    portalName: 'BSES Solar City Initiative Portal',
    sercOrderRef: 'DERC (Net Metering for Renewable Energy) Regulations, 2024 Delhi Solar Policy',
    sanctionedLoadLimit: 'Up to 100% of sanctioned load',
    meteringType: 'Net Metering + Delhi Generation Based Incentive (GBI)',
    approvalTimeline: '12 to 15 working days',
    technicalFeasibilityLimit: 'Up to 80% of distribution transformer capacity',
    tariffSlabs: [
      { range: '0 – 200 units', ratePerUnit: 'Free (Delhi State Subsidy)' },
      { range: '201 – 400 units', ratePerUnit: '₹4.50 / kWh (50% state subsidy)' },
      { range: '401 – 800 units', ratePerUnit: '₹6.50 / kWh' },
      { range: '801 – 1200 units', ratePerUnit: '₹7.00 / kWh' },
      { range: 'Above 1200 units', ratePerUnit: '₹8.00 / kWh' },
    ],
    overview: 'BSES Rajdhani distributes electricity across South and West Delhi. Under the ambitious Delhi Solar Policy 2024, residential consumers get a Generation Based Incentive (GBI) of ₹3.00/kWh for 5 years in addition to the PM Surya Ghar subsidy.',
    netMeteringSteps: [
      'Apply through National PM Surya Ghar portal with 9-digit BRPL CA number.',
      'BRPL Technical Feasibility Clearance issued digitally within 3 working days.',
      'Approved EPC partner installs certified DCR ALMM solar panels.',
      'BRPL inspection team validates wiring, isolator, and earthing.',
      'Smart bi-directional net meter installed and synchronised.',
    ],
    faqs: [
      {
        q: 'What is the Delhi Solar Policy GBI payment?',
        a: 'The Delhi Government credits ₹3.00 per unit of solar generated directly to the homeowner\'s bank account for 5 years, over and above the power bill savings and ₹78,000 central subsidy.',
      },
      {
        q: 'Can group housing societies in South Delhi install solar on rooftops?',
        a: 'Yes. BRPL provides community solar and virtual net metering (VNM) for apartments and RWAs, allowing multiple flat owners to share generation from a single rooftop array.',
      },
    ],
  },
  {
    slug: 'tsspdcl',
    name: 'Southern Power Distribution Company of Telangana Limited',
    shortName: 'TSSPDCL (Hyderabad / South Telangana)',
    state: 'Telangana',
    stateSlug: 'telangana',
    coverageArea: 'Hyderabad, Rangareddy, Medchal, Mahabubnagar, Nalgonda, and southern districts',
    portalUrl: 'https://www.tssouthernpower.com/',
    portalName: 'TSSPDCL Solar Rooftop Portal',
    sercOrderRef: 'TSERC (Rooftop Solar PV Grid Interactive System) Regulations',
    sanctionedLoadLimit: 'Up to 100% of sanctioned load (Max 1 MW)',
    meteringType: 'Net Metering for residential; Gross Metering option for commercial',
    approvalTimeline: '15 to 18 working days',
    technicalFeasibilityLimit: 'Up to 80% of local DT capacity',
    tariffSlabs: [
      { range: '0 – 100 units', ratePerUnit: '₹3.30–₹4.30 / kWh' },
      { range: '101 – 200 units', ratePerUnit: '₹5.00–₹7.20 / kWh' },
      { range: 'Above 200 units', ratePerUnit: '₹8.50–₹9.50 / kWh' },
    ],
    overview: 'TSSPDCL supplies power to Greater Hyderabad and adjoining districts. Residential tariffs escalate sharply above 200 units/month, creating rapid payback on 3 kW to 5 kW rooftop systems.',
    netMeteringSteps: [
      'Register on PM Surya Ghar portal with 9-digit TSSPDCL Unique Service Connection (USC) number.',
      'Online technical feasibility approved within 7 days by divisional engineer.',
      'Empanelled vendor installs system conforming to MNRE DCR norms.',
      'TSSPDCL tests bidirectional meter and issues commissioning certificate.',
      'Subsidy credited via DBT within 30 days.',
    ],
    faqs: [
      {
        q: 'What documents are required for TSSPDCL net metering approval?',
        a: 'You need your latest TSSPDCL electricity bill with paid receipt, proof of property ownership (sale deed / municipal tax receipt), Aadhaar card, and rooftop photo.',
      },
      {
        q: 'Can commercial complexes in Hyderabad use net metering?',
        a: 'Commercial consumers can install solar under gross metering or net metering up to 100% of contracted maximum demand (CMD), subject to TSERC wheeling and cross-subsidy guidelines.',
      },
    ],
  },
  {
    slug: 'kseb',
    name: 'Kerala State Electricity Board Limited',
    shortName: 'KSEB (Kerala)',
    state: 'Kerala',
    stateSlug: 'kerala',
    coverageArea: 'Entire state of Kerala across all 14 districts',
    portalUrl: 'https://wss.kseb.in/',
    portalName: 'KSEB Soura Web Portal',
    sercOrderRef: 'KSERC (Renewable Energy and Net Metering) Regulations',
    sanctionedLoadLimit: 'Up to 100% of connected load (1 kW to 1 MW)',
    meteringType: 'Net Metering for LT residential consumers',
    approvalTimeline: '15 to 20 working days',
    technicalFeasibilityLimit: 'Up to 80% of distribution transformer capacity',
    tariffSlabs: [
      { range: '0 – 100 units', ratePerUnit: '₹3.25–₹4.05 / kWh' },
      { range: '101 – 150 units', ratePerUnit: '₹4.80 / kWh' },
      { range: '151 – 250 units', ratePerUnit: '₹6.40–₹7.60 / kWh' },
      { range: 'Above 250 units', ratePerUnit: '₹8.00–₹8.80 / kWh (telescopic ceases)' },
    ],
    overview: 'KSEB manages generation, transmission, and distribution for Kerala. Due to Kerala\'s non-telescopic tariff structure once consumption exceeds 250 units/month, rooftop solar generates dramatic bill reductions.',
    netMeteringSteps: [
      'Register on pmsuryaghar.gov.in selecting KSEB as electricity provider.',
      'KSEB Section Office reviews connected load and issues feasibility approval.',
      'Approved solar vendor completes mounting and invertor grid-tie connections.',
      'KSEB Sub-Engineer inspects safety compliance and earthing pit resistance.',
      'Bi-directional net meter installed and billing code updated.',
    ],
    faqs: [
      {
        q: 'What is KSEB\'s Soura project?',
        a: 'Soura is KSEB\'s flagship initiative to commission 1,000 MW of rooftop solar across Kerala, fully aligned with the central PM Surya Ghar scheme.',
      },
      {
        q: 'Does Kerala monsoon drastically reduce solar generation?',
        a: 'While monsoon months (June-August) see reduced generation, Kerala\'s intense dry season (December-May) yields over 130–140 units per kW monthly, maintaining strong annual performance (~1,380 units/kW/year).',
      },
    ],
  },
];

export function getDiscomBySlug(slug: string): DiscomInfo | undefined {
  const clean = slug.toLowerCase().trim();
  return DISCOMS_DATA.find((d) => d.slug === clean);
}

export function getAllDiscomSlugs(): string[] {
  return DISCOMS_DATA.map((d) => d.slug);
}
