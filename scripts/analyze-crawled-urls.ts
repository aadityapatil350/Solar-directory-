import * as fs from 'fs';

// Parse the URLs list from the input
const urlList = `URL    Last crawled
https://gosolarindex.in/listing/comorin-solar-solar-installation-company-thiruvananthapuram-4
https://gosolarindex.in/listing/rauda-solar-energy-opc-private-limited-patna
https://gosolarindex.in/listing/nrt-solar-new-research-technology-bhavnagar
https://gosolarindex.in/listing/sudarshan-farmson-solar-adani-solar-zula-center-sunpower-solar-equipments-ahmednagar
https://gosolarindex.in/listing/shree-enterprises-solar-system-buldhana-3
https://gosolarindex.in/listing/nature-tek-solar-pvt-ltd-nashik-5
https://gosolarindex.in/listing/supreme-solar-silicon-trade-mysuru
https://gosolarindex.in/listing/afm-solar-system-pvt-ltd-pune-4
https://gosolarindex.in/listing/nextsol-solutions-llp-kozhikode
https://gosolarindex.in/listing/solarmaxo-a-unit-of-urja-group-of-company-bhubaneswar-3
https://gosolarindex.in/listing/stellar-energy-leading-solar-power-company-tata-power-authorized-retailer-osmanabad-4
https://gosolarindex.in/listing/switchsol-solar-panels-solar-energy-products-raipur-solar-power-plants-chhattisgarh-raipur
https://gosolarindex.in/listing/cz-energy-mysuru
https://gosolarindex.in/listing/vidyut-energy-systems-solar-panel-installation-solar-panel-dealer-exide-solar-panel-solar-panel-jodhpur-jodhpur
https://gosolarindex.in/listing/halo-solar-systems-bhopals-best-home-solar-company-dealers-of-adani-waaree-tata-luminous-panels-bhopal
https://gosolarindex.in/listing/konark-solar-bangalore
https://gosolarindex.in/listing/golden-acs-solar-panel-best-solar-company-in-lucknow-solar-panel-dealer-lucknow-lucknow
https://gosolarindex.in/listing/nm-traders-solar-services-akola-3
https://gosolarindex.in/listing/suyog-distributors-luminous-solar-inverter-battery-distributors-kalyan
https://gosolarindex.in/listing/selco-solar-light-pvt-ltd-madurai-madurai
https://gosolarindex.in/listing/helios-solution-solar-bhiwandi
https://gosolarindex.in/listing/shri-sukhmani-enterprises-ludhiana-2
https://gosolarindex.in/listing/balaji-power-solutions-vasai
https://gosolarindex.in/listing/racold-heatpump-and-solar-water-heater-authorised-distributor-resun-technology-satara-satara
https://gosolarindex.in/listing/electrogen-sales-and-services-vijayawada
https://gosolarindex.in/listing/atyadhunik-solar-power-raipur-4
https://gosolarindex.in/listing/kiah-energies-kozhikode
https://gosolarindex.in/listing/sudarshan-solar-distributor-dhule-2
https://gosolarindex.in/listing/susham-distributors-kolhapur
https://gosolarindex.in/listing/supreme-solar-silicon-trade-mysore
https://gosolarindex.in/listing/aanay-urja-pvt-ltd-surat-2
https://gosolarindex.in/listing/sunshine-engineering-akola-3
https://gosolarindex.in/listing/thapas-energy-kozhikode-3
https://gosolarindex.in/listing/sunlimited-solar-satara-4
https://gosolarindex.in/listing/shree-raviraj-enterprises-buldhana-2
https://gosolarindex.in/listing/khandelwal-solar-solutions-akola-5
https://gosolarindex.in/listing/green-energy-enterprises-wardha-3
https://gosolarindex.in/listing/bajaj-power-solution-madurai-4
https://gosolarindex.in/listing/diman-solar-private-limited-ahmedabad
https://gosolarindex.in/listing/jupiter-electrosolar-trading-corporation-utl-solar-shope-aurangabad-2
https://gosolarindex.in/listing/goway-energy-technology-pvt-ltd-patna
https://gosolarindex.in/listing/shree-ram-enterprises-nagpur-3
https://gosolarindex.in/listing/solar-guru-ratnagiri-2
https://gosolarindex.in/listing/harday-energies-pvt-ltd-solar-panel-manufacturer-dealer-services-in-ranchi-ranchi
https://gosolarindex.in/listing/chirayu-power-solutions-vasai
https://gosolarindex.in/listing/sunmitra-resources-tata-power-solar-systems-solapur-3
https://gosolarindex.in/listing/shivam-solar-power-nashik-3
https://gosolarindex.in/listing/soyo-systems-jalgaon
https://gosolarindex.in/listing/mandav-kripa-associates-best-solar-energy-company-in-nanded-4
https://gosolarindex.in/listing/solar-is-my-passion-pune-3
https://gosolarindex.in/listing/solar-engineering-akola
https://gosolarindex.in/listing/green-planet-environment-solutions-waaree-solar-power-centre-tiruchirappalli-2
https://gosolarindex.in/listing/chirayu-power-solutions-vasai
https://gosolarindex.in/listing/trinity-wind-and-solar-best-solution-provider-sangli-home-solar-system-provider-sangli-2
https://gosolarindex.in/listing/shree-raviraj-enterprises-buldhana-2
https://gosolarindex.in/listing/konark-solar-bangalore
https://gosolarindex.in/listing/green-world-solar-solar-rooftop-solar-panels-best-solar-company-in-hubli-hubli
https://gosolarindex.in/listing/supreme-solar-silicon-trade-mysore
https://gosolarindex.in/listing/solar-techno-systems-jalgaon
https://gosolarindex.in/listing/solar-cleaning-maintenance-services-chandigarh
https://gosolarindex.in/listing/sindhuraj-solar-panel-angli-5
https://gosolarindex.in/listing/electrogen-sales-and-services-vijayawada
https://gosolarindex.in/listing/sunshine-engineering-akola-3
https://gosolarindex.in/listing/supreme-solar-silicon-trade-mysuru
https://gosolarindex.in/listing/aanay-urja-pvt-ltd-surat-2
https://gosolarindex.in/listing/sunshine-engineering-akola-3
https://gosolarindex.in/listing/solskin-energy-llp-residential-industrial-commercial-rooftop-ground-mount-solar-panel-installation-services-company-rajkot-2
https://gosolarindex.in/listing/shivam-solar-power-nashik-3
https://gosolarindex.in/listing/soyo-systems-jalgaon
https://gosolarindex.in/listing/vision-solar-systems-solar-water-heater-supplier-bangalore
https://gosolarindex.in/listing/technotium-tech-tata-power-solar-oof-wardha-2
https://gosolarindex.in/listing/indore-sun-light-pvt-ltd-indore-3
https://gosolarindex.in/listing/solarmaxo-a-unit-of-urja-group-of-company-bhubaneswar-3
https://gosolarindex.in/listing/stellar-energy-leading-solar-power-company-tata-power-authorized-retailer-osmanabad-4
https://gosolarindex.in/listing/cz-energy-mysuru
https://gosolarindex.in/listing/vidyut-energy-systems-solar-panel-installation-solar-panel-dealer-exide-solar-panel-solar-panel-jodhpur-jodhpur
https://gosolarindex.in/listing/halo-solar-systems-bhopals-best-home-solar-company-dealers-of-adani-waaree-tata-luminous-panels-bhopal
https://gosolarindex.in/listing/konark-solar-bangalore
https://gosolarindex.in/listing/nm-traders-solar-services-akola-3
https://gosolarindex.in/listing/suyog-distributors-luminous-solar-inverter-battery-distributors-kalyan
https://gosolarindex.in/listing/selco-solar-light-pvt-ltd-madurai-madurai
https://gosolarindex.in/listing/helios-solution-solar-bhiwandi
https://gosolarindex.in/listing/shri-sukhmani-enterprises-ludhiana-2
https://gosolarindex.in/listing/balaji-power-solutions-vasai
https://gosolarindex.in/listing/racold-heatpump-and-solar-water-heater-authorised-distributor-resun-technology-satara-satara
https://gosolarindex.in/listing/electrogen-sales-and-services-vijayawada
https://gosolarindex.in/listing/atyadhunik-solar-power-raipur-4
https://gosolarindex.in/listing/kiah-energies-kozhikode
https://gosolarindex.in/listing/sudarshan-solar-distributor-dhule-2
https://gosolarindex.in/listing/susham-distributors-kolhapur
https://gosolarindex.in/listing/supreme-solar-silicon-trade-mysore
https://gosolarindex.in/listing/aanay-urja-pvt-ltd-surat-2
https://gosolarindex.in/listing/sunshine-engineering-akola-3
https://gosolarindex.in/listing/solar-guru-ratnagiri-2
https://gosolarindex.in/listing/harday-energies-pvt-ltd-solar-panel-manufacturer-dealer-services-in-ranchi-ranchi
https://gosolarindex.in/listing/chirayu-power-solutions-vasai
https://gosolarindex.in/listing/sunmitra-resources-tata-power-solar-systems-solapur-3
https://gosolarindex.in/listing/shivam-solar-power-nashik-3
https://gosolarindex.in/listing/soyo-systems-jalgaon
https://gosolarindex.in/scripts/analyze-crawled-urls.ts
https://gosolarindex.in/listing/halo-solar-systems-bhopals-best-home-solar-company-dealers-of-adani-waaree-tata-luminous-panels-bhopal
https://gosolarindex.in/listing/green-planet-environment-solutions-waaree-solar-power-centre-tiruchirappalli-2
https://gosolarindex.in/listing/chirayu-power-solutions-vasai
https://gosolarindex.in/listing/trinity-wind-and-solar-best-solution-provider-sangli-home-solar-system-provider-sangli-2
https://gosolarindex.in/listing/shree-raviraj-enterprises-buldhana-2
https://gosolarindex.in/listing/konark-solar-bangalore
https://gosolarindex.in/listing/green-world-solar-solar-rooftop-solar-panels-best-solar-company-in-hubli-hubli
https://gosolarmaxo-a-unit-of-urja-group-of-company-bhubaneswar-3
https://gosolarindex.in/listing/stellar-energy-leading-solar-power-company-tata-power-authorized-retailer-osmanabad-4
https://gosolarindex.in/listing/cz-energy-mysuru
https://gosolarindex.in/listing/vidyut-energy-systems-solar-panel-installation-solar-panel-dealer-exide-solar-panel-solar-panel-jodhpur-jodhpur
https://gosolarindex.in/listing/halo-solar-systems-bhopals-best-home-solar-company-dealers-of-adani-waaree-tata-luminous-panels-bhopal
https://gosolarindex.in/listing/konark-solar-bangalore
https://gosolarindex.in/listing/nm-traders-solar-services-akola-3
https://gosolarindex.in/listing/suyog-distributors-luminous-solar-inverter-battery-distributors-kalyan
https://gosolarindex.in/listing/selco-solar-light-pvt-ltd-madurai-madurai
https://gosolarindex.in/listing/helios-solution-solar-bhiwandi
https://gosolarindex.in/listing/shri-sukhmani-enterprises-ludhiana-2
https://gosolarindex.in/listing/balaji-power-solutions-vasai
https://gosolarindex.in/listing/racold-heatpump-and-solar-water-heater-authorised-distributor-resun-technology-satara-satara
https://gosolarindex.in/listing/electrogen-sales-and-services-vijayawada
https://gosolarindex.in/listing/atyadhunik-solar-power-raipur-4
https://gosolarindex.in/listing/kiah-energies-kozhikode
https://gosolarindex.in/listing/sudarshan-solar-distributor-dhule-2
https://gosolarindex.in/listing/susham-distributors-kolhapur
https://gosolarindex.in/listing/supreme-solar-silicon-trade-mysore
https://gosolarindex.in/listing/aanay-urja-pvt-ltd-surat-2
https://gosolarindex.in/listing/sunshine-engineering-akola-3
https://gosolarindex.in/listing/solar-guru-ratnagiri-2
https://gosolarindex.in/listing/harday-energies-pvt-ltd-solar-panel-manufacturer-dealer-services-in-ranchi-ranchi
https://gosolarindex.in/listing/chirayu-power-solutions-vasai
https://gosolarindex.in/listing/sunmitra-resources-tata-power-solar-systems-solapur-3
https://gosolarindex.in/listing/shivam-solar-power-nashik-3
https://gosolarindex.in/listing/soyo-systems-jalgaon
https://gosolarindex.in/listing/vision-solar-systems-solar-water-heater-supplier-bangalore
https://gosolarindex.in/listing/technotium-tech-tata-power-solar-oof-wardha-2
https://gosolarindex.in/listing/indore-sun-light-pvt-ltd-indore-3
https://gosolarindex.in/listing/solarmaxo-a-unit-of-urja-group-of-company-bhubaneswar-3
https://gosolarindex.in/listing/stellar-energy-leading-solar-power-company-tata-power-authorized-retailer-osmanabad-4
https://gosolarindex.in/listing/cz-energy-mysuru
https://gosolarlistings/analyzing-issues-and-fixing-them.html
https://gosolarindex.in/scripts/analyze-crawled-urls.ts
https://gosolarindex.in/scripts/analyze-crawled-urls.ts
https://gosolarindex.in/blog/complete-solar-power-system-for-home-india-2026
https://gosolarindex.in/blog/complete-solar-power-system-for-home-india-2026
https://gosolarindex.in/blog/complete-solar-power-system-for-home-india-2026
`.trim().split('\n');

// Parse URLs to extract company info
const listings = urlList
  .filter((url) => url.startsWith('https://gosolarindex.in/listing/'))
  .map((url) => {
    const slug = url.replace('https://gosolarindex.in/listing/', '');

    // Extract company name from slug
    const parts = slug.split('-');
    const companyName = parts[0] || slug;

    // Extract location/city from slug
    const cityMatch = slug.match(/-(mumbai|delhi|bangalore|pune|hyderabad|chennai|kolkata|ahmedabad|jaipur|nagpur|lucknow|surat|nagpur|bhopal|chandigarh|raipur|kanpur|aurangabad|visakhapatnam|patna|ranchi|jamshedpur|guwahati|bareilly|kota|gwalior|dehradun|firozabad|meerut|aligarh|saharanpur|jodhpur|bhubaneswar|mathura|agra|kanpur|varanasi|amritsar|ludhiana)/);
    const city = cityMatch ? cityMatch[1] : 'unknown';

    return {
      url,
      slug,
      companyName,
      city,
      fullSlug: slug,
    };
  });

console.log(`🔍 Analyzing ${listings.length} crawled listings...\n`);

// Group by city
const byCity: Record<string, typeof listings> = {};
listings.forEach((listing) => {
  if (!byCity[listing.city]) {
    byCity[listing.city] = [];
  }
  byCity[listing.city].push(listing);
});

console.log('\n📊 Listings by city:\n');
Object.entries(byCity).forEach(([city, cityListings]) => {
  console.log(`\n${city}: ${cityListings.length} listings`);
  cityListings.slice(0, 5).forEach((listing, i) => {
    console.log(`  ${i + 1}. ${listing.companyName}`);
    console.log(`     URL: ${listing.url}`);
  });
});

// Check for patterns (potential issues)
console.log('\n⚠️  Potential Issues:\n');

// Check for duplicate company names
const companyNameCounts: Record<string, number> = {};
listings.forEach((listing) => {
  const name = listing.companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
  companyNameCounts[name] = (companyNameCounts[name] || 0) + 1;
});

const duplicates = Object.entries(companyNameCounts)
  .filter(([name, count]) => count > 1)
  .sort(([, count]) => count - count);

if (duplicates.length > 0) {
  console.log(`📋 Duplicate company names:\n`);
  duplicates.forEach(([name, count]) => {
    console.log(`  "${name}" appears ${count} times`);
  });
}

// Check for single-company cities (thin content)
const singleCompanyCities = Object.entries(byCity)
  .filter(([city, listings]) => listings.length === 1);

if (singleCompanyCities.length > 0) {
  console.log(`\n📉 Cities with only 1 listing (thin content):\n`);
  singleCompanyCities.forEach(([city, listings]) => {
    console.log(`  ${city}: ${listings[0].companyName}`);
    console.log(`     Slug: ${listings[0].slug}`);
  });
}

// Export report
const report = {
  total: listings.length,
  byCity,
  duplicates: duplicates.length,
  singleCompanyCities: singleCompanyCities.length,
  listings: listings.slice(0, 10), // First 10 as examples
};

console.log('\n📊 Summary:');
console.log(`   Total listings: ${report.total}`);
console.log(`   Cities with listings: ${Object.keys(byCity).length}`);
console.log(`   Duplicate names: ${duplicates.length}`);
console.log(`   Thin content cities (1 listing): ${singleCompanyCities.length}`);

// Save to file
fs.writeFileSync(
  '/Users/aditya/My Projects/Solar-directory-/crawled-urls-analysis.json',
  JSON.stringify(report, null, 2)
);

console.log('\n✅ Report saved to: crawled-urls-analysis.json');
