import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
  experimental: {
    cpus: 2,
  },
};

// Redirects for deleted duplicate listings
// These URLs were created as numbered variants (e.g., listing-2, listing-7)
// and have been deleted from the database. Redirect to the main listing.
export async function redirects() {
  return [
    // Google Search Console - Duplicate URLs (March 2026)
    {
      source: '/listing/meet-enterprises-solar-dealer-solar-panel-rooftop-solar-dealer-in-nashik-router-switches-ofc-cable-in-nashik-nashik-2',
      destination: '/listing/meet-enterprises-solar-dealer-solar-panel-rooftop-solar-dealer-in-nashik-router-switches-ofc-cable-in-nashik-nashik',
      permanent: true,
    },
    {
      source: '/listing/savemax-solar-systems-pvt-ltd-pune-7',
      destination: '/listing/savemax-solar-systems-pvt-ltd-pune',
      permanent: true,
    },
    {
      source: '/listing/sunwave-solar-power-cleaning-service-solution-mumbai-2',
      destination: '/listing/sunwave-solar-power-cleaning-service-solution-mumbai',
      permanent: true,
    },
    {
      source: '/listing/synergy-system-nagpur-4',
      destination: '/listing/synergy-system-nagpur',
      permanent: true,
    },
    // Additional duplicates detected
    {
      source: '/listing/clearsky-solar-nagpur-2',
      destination: '/listing/clearsky-solar-nagpur',
      permanent: true,
    },
    {
      source: '/listing/gurukrupa-solar-trading-corporation-nagpur-2',
      destination: '/listing/gurukrupa-solar-trading-corporation-nagpur',
      permanent: true,
    },
    {
      source: '/listing/unique-solar-tata-power-solar-authorise-channel-partner-aurangabad-10',
      destination: '/listing/unique-solar-tata-power-solar-authorise-channel-partner-aurangabad',
      permanent: true,
    },
    {
      source: '/listing/priority-solar-solutions-pvt-ltd-solar-rooftop-for-industrial-and-residential-mumbai-2',
      destination: '/listing/priority-solar-solutions-pvt-ltd-solar-rooftop-for-industrial-and-residential-mumbai',
      permanent: true,
    },
    {
      source: '/listing/powertune-inverterlift-inverter-online-ups-battery-solar-panel-dealer-mumbai-2',
      destination: '/listing/powertune-inverterlift-inverter-online-ups-battery-solar-panel-dealer-mumbai',
      permanent: true,
    },
    {
      source: '/listing/nalanda-inverter-airconditioner-authorised-luminous-distributor-in-raigad-navi-mumbai-mumbai-2',
      destination: '/listing/nalanda-inverter-airconditioner-authorised-luminous-distributor-in-raigad-navi-mumbai-mumbai',
      permanent: true,
    },
    {
      source: '/listing/bg-solar-system-aurangabad-7',
      destination: '/listing/bg-solar-system-aurangabad',
      permanent: true,
    },
    {
      source: '/listing/tech-solar-and-systems-nagpur-9',
      destination: '/listing/tech-solar-and-systems-nagpur',
      permanent: true,
    },
    {
      source: '/listing/tulsi-battery-solar-pune-2',
      destination: '/listing/tulsi-battery-solar-pune',
      permanent: true,
    },
  ];
}

export default nextConfig;
