import type { NextConfig } from "next";

const listingDuplicateRedirects = [
  {
    source: '/listing/meet-enterprises-solar-dealer-solar-panel-rooftop-solar-dealer-in-nashik-router-switches-ofc-cable-in-nashik-nashik-2',
    destination: '/listing/meet-enterprises-solar-dealer-solar-panel-rooftop-solar-dealer-in-nashik-router-switches-ofc-cable-in-nashik-nashik',
    permanent: true,
  },
  { source: '/listing/savemax-solar-systems-pvt-ltd-pune-7', destination: '/listing/savemax-solar-systems-pvt-ltd-pune', permanent: true },
  { source: '/listing/sunwave-solar-power-cleaning-service-solution-mumbai-2', destination: '/listing/sunwave-solar-power-cleaning-service-solution-mumbai', permanent: true },
  { source: '/listing/synergy-system-nagpur-4', destination: '/listing/synergy-system-nagpur', permanent: true },
  { source: '/listing/clearsky-solar-nagpur-2', destination: '/listing/clearsky-solar-nagpur', permanent: true },
  { source: '/listing/gurukrupa-solar-trading-corporation-nagpur-2', destination: '/listing/gurukrupa-solar-trading-corporation-nagpur', permanent: true },
  { source: '/listing/unique-solar-tata-power-solar-authorise-channel-partner-aurangabad-10', destination: '/listing/unique-solar-tata-power-solar-authorise-channel-partner-aurangabad', permanent: true },
  { source: '/listing/priority-solar-solutions-pvt-ltd-solar-rooftop-for-industrial-and-residential-mumbai-2', destination: '/listing/priority-solar-solutions-pvt-ltd-solar-rooftop-for-industrial-and-residential-mumbai', permanent: true },
  { source: '/listing/powertune-inverterlift-inverter-online-ups-battery-solar-panel-dealer-mumbai-2', destination: '/listing/powertune-inverterlift-inverter-online-ups-battery-solar-panel-dealer-mumbai', permanent: true },
  { source: '/listing/nalanda-inverter-airconditioner-authorised-luminous-distributor-in-raigad-navi-mumbai-mumbai-2', destination: '/listing/nalanda-inverter-airconditioner-authorised-luminous-distributor-in-raigad-navi-mumbai-mumbai', permanent: true },
  { source: '/listing/bg-solar-system-aurangabad-7', destination: '/listing/bg-solar-system-aurangabad', permanent: true },
  { source: '/listing/tech-solar-and-systems-nagpur-9', destination: '/listing/tech-solar-and-systems-nagpur', permanent: true },
  { source: '/listing/tulsi-battery-solar-pune-2', destination: '/listing/tulsi-battery-solar-pune', permanent: true },
];

// Legacy category slugs from the audit — hero used to link to soft-404s.
const categorySlugRedirects = [
  { source: '/categories/residential-solar-installers', destination: '/categories/residential-installers', permanent: true },
  { source: '/categories/commercial-solar-installers', destination: '/categories/commercial-installers', permanent: true },
  { source: '/categories/solar-inverter-specialists', destination: '/categories/inverter-specialists', permanent: true },
  { source: '/categories/solar-amc-maintenance', destination: '/categories/maintenance-services', permanent: true },
  { source: '/categories/solar-panel-dealers', destination: '/categories/solar-dealers', permanent: true },
];

// Merged duplicate city routes.
const cityRedirects = [
  { source: '/mysuru', destination: '/mysore', permanent: true },
];

// Old /locations/{city-state} URLs that Google indexed — redirect to canonical /{city} pages.
// Generated from the Location table (all 78 cities in the DB).
const locationPageRedirects = [
  { source: '/locations/agra-uttar-pradesh', destination: '/agra', permanent: true },
  { source: '/locations/ahmedabad-gujarat', destination: '/ahmedabad', permanent: true },
  { source: '/locations/ahmednagar-maharashtra', destination: '/ahmednagar', permanent: true },
  { source: '/locations/akola-maharashtra', destination: '/akola', permanent: true },
  { source: '/locations/allahabad-uttar-pradesh', destination: '/allahabad', permanent: true },
  { source: '/locations/amravati-maharashtra', destination: '/amravati', permanent: true },
  { source: '/locations/amritsar-punjab', destination: '/amritsar', permanent: true },
  { source: '/locations/aurangabad-maharashtra', destination: '/aurangabad', permanent: true },
  { source: '/locations/bangalore-karnataka', destination: '/bangalore', permanent: true },
  { source: '/locations/beed-maharashtra', destination: '/beed', permanent: true },
  { source: '/locations/belgaum-karnataka', destination: '/belgaum', permanent: true },
  { source: '/locations/bhavnagar-gujarat', destination: '/bhavnagar', permanent: true },
  { source: '/locations/bhiwandi-maharashtra', destination: '/bhiwandi', permanent: true },
  { source: '/locations/bhopal-madhya-pradesh', destination: '/bhopal', permanent: true },
  { source: '/locations/bhubaneswar-odisha', destination: '/bhubaneswar', permanent: true },
  { source: '/locations/bikaner-rajasthan', destination: '/bikaner', permanent: true },
  { source: '/locations/buldhana-maharashtra', destination: '/buldhana', permanent: true },
  { source: '/locations/chandigarh-punjab', destination: '/chandigarh', permanent: true },
  { source: '/locations/chandrapur-maharashtra', destination: '/chandrapur', permanent: true },
  { source: '/locations/chennai-tamil-nadu', destination: '/chennai', permanent: true },
  { source: '/locations/coimbatore-tamil-nadu', destination: '/coimbatore', permanent: true },
  { source: '/locations/dehradun-uttarakhand', destination: '/dehradun', permanent: true },
  { source: '/locations/delhi-delhi', destination: '/delhi', permanent: true },
  { source: '/locations/dhule-maharashtra', destination: '/dhule', permanent: true },
  { source: '/locations/guwahati-assam', destination: '/guwahati', permanent: true },
  { source: '/locations/hingoli-maharashtra', destination: '/hingoli', permanent: true },
  { source: '/locations/hubli-karnataka', destination: '/hubli', permanent: true },
  { source: '/locations/hyderabad-telangana', destination: '/hyderabad', permanent: true },
  { source: '/locations/ichalkaranji-maharashtra', destination: '/ichalkaranji', permanent: true },
  { source: '/locations/indore-madhya-pradesh', destination: '/indore', permanent: true },
  { source: '/locations/jabalpur-madhya-pradesh', destination: '/jabalpur', permanent: true },
  { source: '/locations/jaipur-rajasthan', destination: '/jaipur', permanent: true },
  { source: '/locations/jalgaon-maharashtra', destination: '/jalgaon', permanent: true },
  { source: '/locations/jodhpur-rajasthan', destination: '/jodhpur', permanent: true },
  { source: '/locations/kalyan-maharashtra', destination: '/kalyan', permanent: true },
  { source: '/locations/kanpur-uttar-pradesh', destination: '/kanpur', permanent: true },
  { source: '/locations/kochi-kerala', destination: '/kochi', permanent: true },
  { source: '/locations/kolhapur-maharashtra', destination: '/kolhapur', permanent: true },
  { source: '/locations/kolkata-west-bengal', destination: '/kolkata', permanent: true },
  { source: '/locations/kozhikode-kerala', destination: '/kozhikode', permanent: true },
  { source: '/locations/latur-maharashtra', destination: '/latur', permanent: true },
  { source: '/locations/lucknow-uttar-pradesh', destination: '/lucknow', permanent: true },
  { source: '/locations/ludhiana-punjab', destination: '/ludhiana', permanent: true },
  { source: '/locations/madurai-tamil-nadu', destination: '/madurai', permanent: true },
  { source: '/locations/mangalore-karnataka', destination: '/mangalore', permanent: true },
  { source: '/locations/meerut-uttar-pradesh', destination: '/meerut', permanent: true },
  { source: '/locations/mumbai-maharashtra', destination: '/mumbai', permanent: true },
  { source: '/locations/mysore-karnataka', destination: '/mysore', permanent: true },
  { source: '/locations/nagpur-maharashtra', destination: '/nagpur', permanent: true },
  { source: '/locations/nanded-maharashtra', destination: '/nanded', permanent: true },
  { source: '/locations/nashik-maharashtra', destination: '/nashik', permanent: true },
  { source: '/locations/navi-mumbai-maharashtra', destination: '/navi-mumbai', permanent: true },
  { source: '/locations/nellore-andhra-pradesh', destination: '/nellore', permanent: true },
  { source: '/locations/osmanabad-maharashtra', destination: '/osmanabad', permanent: true },
  { source: '/locations/parbhani-maharashtra', destination: '/parbhani', permanent: true },
  { source: '/locations/patna-bihar', destination: '/patna', permanent: true },
  { source: '/locations/pondicherry-puducherry', destination: '/pondicherry', permanent: true },
  { source: '/locations/pune-maharashtra', destination: '/pune', permanent: true },
  { source: '/locations/raipur-chhattisgarh', destination: '/raipur', permanent: true },
  { source: '/locations/rajkot-gujarat', destination: '/rajkot', permanent: true },
  { source: '/locations/ranchi-jharkhand', destination: '/ranchi', permanent: true },
  { source: '/locations/ratnagiri-maharashtra', destination: '/ratnagiri', permanent: true },
  { source: '/locations/salem-tamil-nadu', destination: '/salem', permanent: true },
  { source: '/locations/sangli-maharashtra', destination: '/sangli', permanent: true },
  { source: '/locations/satara-maharashtra', destination: '/satara', permanent: true },
  { source: '/locations/solapur-maharashtra', destination: '/solapur', permanent: true },
  { source: '/locations/surat-gujarat', destination: '/surat', permanent: true },
  { source: '/locations/thane-maharashtra', destination: '/thane', permanent: true },
  { source: '/locations/thiruvananthapuram-kerala', destination: '/thiruvananthapuram', permanent: true },
  { source: '/locations/tiruchirappalli-tamil-nadu', destination: '/tiruchirappalli', permanent: true },
  { source: '/locations/tirunelveli-tamil-nadu', destination: '/tirunelveli', permanent: true },
  { source: '/locations/udaipur-rajasthan', destination: '/udaipur', permanent: true },
  { source: '/locations/vadodara-gujarat', destination: '/vadodara', permanent: true },
  { source: '/locations/varanasi-uttar-pradesh', destination: '/varanasi', permanent: true },
  { source: '/locations/vasai-maharashtra', destination: '/vasai', permanent: true },
  { source: '/locations/vijayawada-andhra-pradesh', destination: '/vijayawada', permanent: true },
  { source: '/locations/visakhapatnam-andhra-pradesh', destination: '/visakhapatnam', permanent: true },
  { source: '/locations/wardha-maharashtra', destination: '/wardha', permanent: true },
];

// Consolidated blog duplicates — loser 301s to the SEO winner in each cluster.
const blogRedirects = [
  // PM Surya Ghar cluster
  { source: '/blog/pm-surya-ghar-yojana-subsidy-guide', destination: '/blog/pm-surya-ghar-yojana-complete-guide', permanent: true },
  { source: '/blog/pm-surya-ghar-muft-bijli-yojana-2026-complete-guide', destination: '/blog/pm-surya-ghar-yojana-complete-guide', permanent: true },
  { source: '/blog/pm-surya-ghar-yojana-application-guide', destination: '/blog/pm-surya-ghar-yojana-complete-guide', permanent: true },
  // Net metering cluster
  { source: '/blog/net-metering-india-complete-guide', destination: '/blog/net-metering-india-2026-state-rules-guide', permanent: true },
  { source: '/blog/how-net-metering-works-india', destination: '/blog/net-metering-india-2026-state-rules-guide', permanent: true },
  { source: '/blog/solar-net-metering-state-rules-india-2026', destination: '/blog/net-metering-india-2026-state-rules-guide', permanent: true },
  // PM-KUSUM cluster
  { source: '/blog/pm-kusum-solar-subsidy-farmers-india', destination: '/blog/pm-kusum-scheme-2026-solar-pump-farmers-guide', permanent: true },
  { source: '/blog/solar-pump-agriculture-india-pm-kusum', destination: '/blog/pm-kusum-scheme-2026-solar-pump-farmers-guide', permanent: true },
  { source: '/blog/pm-kusum-2-0-india-farm-solar-next-phase', destination: '/blog/pm-kusum-scheme-2026-solar-pump-farmers-guide', permanent: true },
  { source: '/blog/solar-energy-agriculture-pm-kusum-2026', destination: '/blog/pm-kusum-scheme-2026-solar-pump-farmers-guide', permanent: true },
  // Panel brands cluster (winner = comparison, the #1 traffic post)
  { source: '/blog/best-solar-panels-india-2025', destination: '/blog/solar-panel-brand-comparison-india-2026', permanent: true },
  { source: '/blog/best-solar-panel-brands-india-2025', destination: '/blog/solar-panel-brand-comparison-india-2026', permanent: true },
  { source: '/blog/top-rated-solar-panels-residential-homes-india-2026', destination: '/blog/solar-panel-brand-comparison-india-2026', permanent: true },
  // Installation cost cluster
  { source: '/blog/solar-panel-installation-cost-india-2025', destination: '/blog/solar-panel-installation-cost-home-india-2026', permanent: true },
  { source: '/blog/solar-panel-cost-india-2025', destination: '/blog/solar-panel-installation-cost-home-india-2026', permanent: true },
  // Choosing an installer cluster
  { source: '/blog/how-to-check-solar-installer-genuine-india', destination: '/blog/how-to-choose-solar-installer-india', permanent: true },
  { source: '/blog/how-to-verify-solar-installer-india-2026', destination: '/blog/how-to-choose-solar-installer-india', permanent: true },
  // Maintenance cluster
  { source: '/blog/solar-maintenance-tips-india', destination: '/blog/solar-amc-maintenance-guide-india-2026', permanent: true },
  { source: '/blog/solar-panel-maintenance-guide-india', destination: '/blog/solar-amc-maintenance-guide-india-2026', permanent: true },
  // On/off-grid cluster
  { source: '/blog/on-grid-off-grid-hybrid-solar-comparison', destination: '/blog/on-grid-off-grid-hybrid-solar-system-india-comparison', permanent: true },
  // Housing society cluster
  { source: '/blog/solar-rooftop-housing-society-india', destination: '/blog/solar-rooftop-housing-society-india-2026', permanent: true },
  // Phase A1: city guides redirect to real city pages (avoids duplicate)
  { source: '/blog/solar-panel-installation-ahmedabad-2026', destination: '/ahmedabad', permanent: true },
  { source: '/blog/rooftop-solar-mumbai-guide', destination: '/mumbai', permanent: true },
  { source: '/blog/solar-panels-delhi-guide', destination: '/delhi', permanent: true },
  { source: '/blog/solar-panel-installation-bangalore', destination: '/bangalore', permanent: true },
  { source: '/blog/solar-panel-installation-chennai-2026', destination: '/chennai', permanent: true },
  { source: '/blog/solar-panel-installation-hyderabad-2026', destination: '/hyderabad', permanent: true },
  { source: '/blog/solar-panel-installation-jaipur-2026', destination: '/jaipur', permanent: true },
  { source: '/blog/solar-panel-installation-kolkata-2026', destination: '/kolkata', permanent: true },
  { source: '/blog/solar-panel-installation-lucknow-2026', destination: '/lucknow', permanent: true },
  { source: '/blog/solar-panel-installation-pune-2026', destination: '/pune', permanent: true },
  { source: '/blog/solar-panel-installation-surat-2026', destination: '/surat', permanent: true },
  // Duplicate topic consolidation
  { source: '/blog/solar-for-commercial-business-india', destination: '/blog/commercial-solar-for-businesses-india-2026', permanent: true },
  { source: '/blog/solar-for-factories-warehouses-india-2026', destination: '/blog/commercial-solar-for-businesses-india-2026', permanent: true },
  { source: '/blog/commercial-solar-india-roi-tax-benefits', destination: '/blog/commercial-solar-for-businesses-india-2026', permanent: true },
  { source: '/blog/solar-rooftop-installation-indian-households-2026', destination: '/blog/solar-panel-installation-cost-home-india-2026', permanent: true },
  { source: '/blog/solar-battery-storage-india-2025', destination: '/blog/solar-battery-buying-guide-india-2026', permanent: true },
  { source: '/blog/gujarat-solar-subsidy-surya-yojana-2026', destination: '/blog/surya-gujarat-yojana-2026-guide', permanent: true },
  { source: '/blog/best-solar-panel-installation-companies-india-2026', destination: '/blog/best-solar-company-india-2026', permanent: true },
  { source: '/blog/solar-system-size-guide-india', destination: '/blog/1kw-2kw-3kw-5kw-solar-system-india-which-size', permanent: true },
  { source: '/blog/residential-solar-installation-government-subsidy-india-2026', destination: '/blog/pm-surya-ghar-yojana-complete-guide', permanent: true },
  { source: '/blog/solar-subsidy-states-india-2025', destination: '/blog/solar-subsidy-india-2026-state-wise-complete-guide', permanent: true },
  { source: '/blog/top-10-solar-companies-india-2026', destination: '/blog/best-solar-company-india-2026', permanent: true },
  { source: '/blog/solar-tax-benefits-business-india-2026', destination: '/blog/commercial-solar-for-businesses-india-2026', permanent: true },
  { source: '/blog/solar-epc-company-vs-dealer-india', destination: '/blog/how-to-choose-solar-installer-india', permanent: true },
  { source: '/blog/solar-installation-checklist-homeowners', destination: '/blog/how-to-choose-solar-installer-india', permanent: true },
  { source: '/blog/best-solar-inverters-india-2025', destination: '/blog/solar-inverter-buying-guide-india', permanent: true },
  { source: '/blog/solar-power-system-with-battery-storage-india-2026', destination: '/blog/solar-battery-buying-guide-india-2026', permanent: true },
  { source: '/blog/solar-panel-installation-process-india', destination: '/blog/how-to-install-solar-panels-at-home-india-guide-2026', permanent: true },
  { source: '/blog/complete-solar-power-system-for-home-india-2026', destination: '/blog/how-to-install-solar-panels-at-home-india-guide-2026', permanent: true },
];

const toolAndMiscRedirects = [
  { source: '/best-solar-companies/:city*', destination: '/:city*', permanent: true },
  { source: '/subsidy-checker', destination: '/tools/solar-subsidy-calculator', permanent: true },
  { source: '/solar-calculator', destination: '/tools/solar-subsidy-calculator', permanent: true },
  { source: '/tools/subsidy-calculator', destination: '/tools/solar-subsidy-calculator', permanent: true },
  { source: '/installers/signup', destination: '/for-installers', permanent: true },
  { source: '/for-installer', destination: '/for-installers', permanent: true },
  { source: '/guides', destination: '/blog', permanent: true },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
  experimental: {
    cpus: 2,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      ...toolAndMiscRedirects,
      ...listingDuplicateRedirects,
      ...categorySlugRedirects,
      ...cityRedirects,
      ...blogRedirects,
      ...locationPageRedirects,
    ];
  },
  async headers() {
    // Hard noindex for transactional / private routes. Sent as a header so it
    // applies even to client-component pages (e.g. /claim/[slug]) that can't
    // export metadata. These stay crawlable in robots.txt so Google sees the tag.
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
    return [
      { source: '/claim/:path*', headers: noindex },
      { source: '/dashboard/:path*', headers: noindex },
      { source: '/admin/:path*', headers: noindex },
      { source: '/installers/dashboard/:path*', headers: noindex },
    ];
  },
};

export default nextConfig;
