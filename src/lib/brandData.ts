export interface BrandInfo {
  slug: string;
  name: string;
  shortName: string;
  headquarters: string;
  capacityGw: string;
  almmStatus: string;
  almmEnlistedModels: number;
  cellTechnologies: string[];
  wattageRange: string;
  productWarranty: string;
  performanceWarranty: string;
  overview: string;
  popularSeries: { name: string; type: string; wattage: string; efficiency: string }[];
  comparisons: { label: string; slug: string }[];
  faqs: { q: string; a: string }[];
}

export const BRANDS_DATA: BrandInfo[] = [
  {
    slug: 'waaree',
    name: 'Waaree Energies Limited',
    shortName: 'Waaree',
    headquarters: 'Mumbai, Maharashtra',
    capacityGw: '13.3 GW',
    almmStatus: 'Enlisted on MNRE ALMM List-I (Highest Capacity in India)',
    almmEnlistedModels: 120,
    cellTechnologies: ['N-Type TOPCon', 'Mono PERC Bifacial', 'Polycrystalline'],
    wattageRange: '440W – 715W',
    productWarranty: '12 Years',
    performanceWarranty: '30 Years linear output (minimum 87.4% after 30 years)',
    overview: 'Waaree Energies is India\'s largest solar module manufacturer, operating cutting-edge gigafactories in Surat and Chikhli, Gujarat. Waaree modules are widely used in both utility-scale mega projects and PM Surya Ghar residential rooftops.',
    popularSeries: [
      { name: 'Arka Series (TOPCon Bifacial)', type: 'N-Type TOPCon Dual Glass', wattage: '580W – 715W', efficiency: '22.8%' },
      { name: 'Aditya Series (Mono PERC DCR)', type: 'P-Type Mono PERC', wattage: '540W – 550W', efficiency: '21.3%' },
      { name: 'Elite Series (Flexible Modules)', type: 'Mono Lightweight', wattage: '100W – 330W', efficiency: '19.5%' },
    ],
    comparisons: [
      { label: 'Waaree vs Vikram Solar', slug: 'waaree-vs-vikram' },
      { label: 'Waaree vs Tata Power Solar', slug: 'waaree-vs-tata' },
      { label: 'Waaree vs Adani Solar', slug: 'waaree-vs-adani' },
    ],
    faqs: [
      {
        q: 'Are Waaree solar panels eligible for PM Surya Ghar subsidy?',
        a: 'Yes. Waaree manufactures extensive DCR (Domestic Content Requirement) compliant modules enrolled on MNRE ALMM List-I that fully qualify for PM Surya Ghar rooftop subsidies.',
      },
      {
        q: 'What is the degradation rate of Waaree TOPCon solar panels?',
        a: 'Waaree N-Type TOPCon modules feature ≤1.0% degradation in Year 1, and ≤0.4% annual linear degradation from Years 2 to 30, guaranteeing over 87% initial capacity at year 30.',
      },
    ],
  },
  {
    slug: 'tata-power-solar',
    name: 'Tata Power Solar Systems Limited',
    shortName: 'Tata Power Solar',
    headquarters: 'Bengaluru, Karnataka & Mumbai, Maharashtra',
    capacityGw: '4.9 GW',
    almmStatus: 'Enlisted on MNRE ALMM List-I (Tier-1 Quality Assurance)',
    almmEnlistedModels: 85,
    cellTechnologies: ['Mono PERC', 'N-Type TOPCon DCR', 'Half-Cut Multi-Busbar'],
    wattageRange: '440W – 670W',
    productWarranty: '12 Years (25-year comprehensive service backing)',
    performanceWarranty: '25 Years linear output (minimum 80% at 25 years)',
    overview: 'Tata Power Solar is a pioneer in Indian renewable energy with over three decades of operational history. Renowned for rigorous quality control, Tata panels command premium resale and banking trust across Indian domestic rooftops.',
    popularSeries: [
      { name: 'TPSSL Mono PERC Pro', type: 'Half-Cut Mono PERC', wattage: '540W – 550W', efficiency: '21.2%' },
      { name: 'TPSSL TOPCon Ultra', type: 'N-Type Dual Glass', wattage: '580W – 670W', efficiency: '22.4%' },
    ],
    comparisons: [
      { label: 'Tata Power Solar vs Adani Solar', slug: 'tata-vs-adani' },
      { label: 'Waaree vs Tata Power Solar', slug: 'waaree-vs-tata' },
    ],
    faqs: [
      {
        q: 'Why are Tata Power Solar panels priced slightly higher than peers?',
        a: 'Tata Power Solar invests heavily in domestic ingot, wafer, and cell manufacturing in Tirunelveli (Tamil Nadu), offering direct corporate warranty accountability and an established nationwide dealer-service network.',
      },
      {
        q: 'Can I claim PM Surya Ghar subsidy using Tata panels?',
        a: 'Yes. Tata Power Solar produces dedicated DCR-certified panels designed specifically for residential rooftop installations under PM Surya Ghar Muft Bijli Yojana.',
      },
    ],
  },
  {
    slug: 'adani-solar',
    name: 'Mundra Solar PV Limited (Adani Solar)',
    shortName: 'Adani Solar',
    headquarters: 'Ahmedabad & Mundra, Gujarat',
    capacityGw: '4.0 GW',
    almmStatus: 'Enlisted on MNRE ALMM List-I',
    almmEnlistedModels: 78,
    cellTechnologies: ['N-Type TOPCon (Shine Series)', 'Mono PERC (Eternal Series)'],
    wattageRange: '540W – 690W',
    productWarranty: '12 Years',
    performanceWarranty: '30 Years linear degradation warranty',
    overview: 'Adani Solar operates India\'s first vertically integrated solar manufacturing ecosystem in Mundra, Gujarat. From polysilicon to ingots, wafers, cells, and modules, Adani produces heavy-duty utility and commercial solar modules.',
    popularSeries: [
      { name: 'Shine Plus TOPCon Bifacial', type: 'Glass-to-Glass TOPCon', wattage: '580W – 690W', efficiency: '22.6%' },
      { name: 'Eternal Mono PERC', type: 'Half-Cell Mono PERC', wattage: '540W – 550W', efficiency: '21.4%' },
    ],
    comparisons: [
      { label: 'Tata Power Solar vs Adani Solar', slug: 'tata-vs-adani' },
      { label: 'Waaree vs Adani Solar', slug: 'waaree-vs-adani' },
    ],
    faqs: [
      {
        q: 'Does Adani Solar manufacture its own solar cells in India?',
        a: 'Yes. Adani Solar operates a large-scale solar cell and ingot manufacturing facility at Mundra SEZ, making it one of the few fully integrated domestic cell manufacturers in India.',
      },
      {
        q: 'What is the efficiency of Adani Shine series panels?',
        a: 'Adani Shine TOPCon panels deliver module conversion efficiencies of up to 22.6%, featuring low temperature coefficient (-0.30%/°C) ideal for hot Indian climates.',
      },
    ],
  },
  {
    slug: 'vikram-solar',
    name: 'Vikram Solar Limited',
    shortName: 'Vikram Solar',
    headquarters: 'Kolkata, West Bengal & Chennai, Tamil Nadu',
    capacityGw: '3.5 GW',
    almmStatus: 'Enlisted on MNRE ALMM List-I',
    almmEnlistedModels: 65,
    cellTechnologies: ['Mono PERC', 'TOPCon Somera Series', 'Polycrystalline'],
    wattageRange: '440W – 685W',
    productWarranty: '12 Years',
    performanceWarranty: '25 – 30 Years linear warranty',
    overview: 'Vikram Solar is one of India\'s longest-standing solar module exporters and EPC contractors, with state-of-the-art automated manufacturing facilities in Falta (West Bengal) and Oragadam (Tamil Nadu).',
    popularSeries: [
      { name: 'Suryava TOPCon Bifacial', type: 'N-Type TOPCon', wattage: '580W – 685W', efficiency: '22.5%' },
      { name: 'Somera Mono PERC', type: 'Half-Cut Mono', wattage: '540W – 550W', efficiency: '21.3%' },
    ],
    comparisons: [
      { label: 'Waaree vs Vikram Solar', slug: 'waaree-vs-vikram' },
    ],
    faqs: [
      {
        q: 'Where are Vikram Solar manufacturing plants located?',
        a: 'Vikram Solar manufactures modules at Falta SEZ near Kolkata (West Bengal) and at a high-tech 1.3 GW facility in Oragadam, Chennai (Tamil Nadu).',
      },
      {
        q: 'Does Vikram Solar provide DCR modules for subsidy?',
        a: 'Yes. Vikram Solar Somera and Suryava series offer DCR certified models approved under MNRE ALMM for domestic subsidy compliance.',
      },
    ],
  },
  {
    slug: 'goldi-solar',
    name: 'Goldi Solar Private Limited',
    shortName: 'Goldi Solar',
    headquarters: 'Surat, Gujarat',
    capacityGw: '3.0 GW',
    almmStatus: 'Enlisted on MNRE ALMM List-I',
    almmEnlistedModels: 50,
    cellTechnologies: ['Heloc Plus TOPCon', 'Mono PERC Bifacial'],
    wattageRange: '440W – 710W',
    productWarranty: '12 Years',
    performanceWarranty: '30 Years linear warranty',
    overview: 'Goldi Solar is a quality-focused Gujarat solar manufacturer headquartered in Surat with production facilities in Pipodara and Navsari. Known for micro-crack free automated EL testing, Goldi modules are widely exported.',
    popularSeries: [
      { name: 'Heloc Plus TOPCon', type: 'Bifacial Dual Glass', wattage: '580W – 710W', efficiency: '22.7%' },
      { name: 'Heloc Pro Mono PERC', type: 'Mono PERC Half-Cut', wattage: '535W – 550W', efficiency: '21.2%' },
    ],
    comparisons: [
      { label: 'Waaree vs Goldi Solar', slug: 'waaree-vs-vikram' },
    ],
    faqs: [
      {
        q: 'Is Goldi Solar listed under MNRE ALMM?',
        a: 'Yes, Goldi Solar is prominently listed under MNRE ALMM List-I for residential and commercial rooftop solar projects.',
      },
    ],
  },
  {
    slug: 'premier-energies',
    name: 'Premier Energies Limited',
    shortName: 'Premier Energies',
    headquarters: 'Hyderabad, Telangana',
    capacityGw: '3.4 GW',
    almmStatus: 'Enlisted on MNRE ALMM List-I',
    almmEnlistedModels: 55,
    cellTechnologies: ['N-Type TOPCon', 'Mono PERC Bifacial', 'Domestic Cell DCR'],
    wattageRange: '440W – 685W',
    productWarranty: '12 Years',
    performanceWarranty: '30 Years linear warranty',
    overview: 'Premier Energies is South India\'s largest solar cell and module producer, operating LEED Gold certified automated manufacturing campuses in Hyderabad. It is one of the few domestic manufacturers with internal cell lines.',
    popularSeries: [
      { name: 'Premier TOPCon Bifacial', type: 'N-Type Dual Glass', wattage: '580W – 685W', efficiency: '22.5%' },
      { name: 'Premier Mono PERC DCR', type: 'P-Type Half-Cut', wattage: '540W – 550W', efficiency: '21.3%' },
    ],
    comparisons: [
      { label: 'Tata Power Solar vs Premier Energies', slug: 'tata-vs-adani' },
    ],
    faqs: [
      {
        q: 'Does Premier Energies make solar cells in India?',
        a: 'Yes, Premier Energies operates over 1.4 GW of cell manufacturing capacity in Hyderabad alongside 3.4 GW of module capacity.',
      },
    ],
  },
];

export function getBrandBySlug(slug: string): BrandInfo | undefined {
  const clean = slug.toLowerCase().trim();
  return BRANDS_DATA.find((b) => b.slug === clean);
}

export function getAllBrandSlugs(): string[] {
  return BRANDS_DATA.map((b) => b.slug);
}
