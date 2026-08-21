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
      ...listingDuplicateRedirects,
      ...categorySlugRedirects,
      ...cityRedirects,
      ...blogRedirects,
    ];
  },
};

export default nextConfig;
