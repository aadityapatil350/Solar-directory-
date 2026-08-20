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
    return [...listingDuplicateRedirects, ...categorySlugRedirects, ...cityRedirects];
  },
};

export default nextConfig;
