export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: string; // HTML string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'solar-panel-installation-cost-india-2025',
    title: 'Solar Panel Installation Cost in India 2025 — Complete Guide',
    description: 'How much does solar installation cost in India in 2025? Complete breakdown of 1kW to 10kW system costs, government subsidies, and ROI calculation.',
    date: '2025-12-10',
    readTime: '8 min read',
    category: 'Cost & Pricing',
    content: `
<h2>Solar Panel Installation Cost in India 2025</h2>
<p>The cost of solar panel installation in India varies based on system size, panel type, location, and installer. Here's a complete cost breakdown for 2025.</p>

<h3>Cost by System Size</h3>
<table>
<thead><tr><th>System Size</th><th>Total Cost (Before Subsidy)</th><th>After PM Surya Ghar Subsidy</th><th>Monthly Generation</th></tr></thead>
<tbody>
<tr><td>1 kW</td><td>₹60,000–₹80,000</td><td>₹30,000–₹50,000</td><td>120–150 units</td></tr>
<tr><td>2 kW</td><td>₹1,20,000–₹1,50,000</td><td>₹60,000–₹90,000</td><td>240–300 units</td></tr>
<tr><td>3 kW</td><td>₹1,60,000–₹2,00,000</td><td>₹82,000–₹1,22,000</td><td>360–450 units</td></tr>
<tr><td>5 kW</td><td>₹2,50,000–₹3,20,000</td><td>₹1,50,000–₹2,20,000</td><td>600–750 units</td></tr>
<tr><td>10 kW</td><td>₹5,00,000–₹6,50,000</td><td>₹3,50,000–₹5,00,000</td><td>1200–1500 units</td></tr>
</tbody>
</table>

<h3>PM Surya Ghar Yojana — Government Subsidy 2025</h3>
<p>The Indian government provides significant subsidies under the PM Surya Ghar Muft Bijli Yojana scheme:</p>
<ul>
<li><strong>Up to 2 kW:</strong> ₹30,000 per kW subsidy</li>
<li><strong>2–3 kW:</strong> ₹18,000 per kW for additional capacity</li>
<li><strong>Above 3 kW:</strong> Maximum subsidy capped at ₹78,000</li>
</ul>
<p>To claim the subsidy, you must install through an MNRE-approved vendor and apply on the national portal (pmsuryaghar.gov.in).</p>

<h3>Cost Breakdown: What You're Paying For</h3>
<ul>
<li><strong>Solar Panels (40–50%):</strong> Monocrystalline panels cost more but give better efficiency</li>
<li><strong>Inverter (15–20%):</strong> String inverters vs micro-inverters</li>
<li><strong>Mounting Structure (10%):</strong> Rooftop mounting hardware</li>
<li><strong>Wiring & Electrical (10%):</strong> AC/DC cables, junction boxes</li>
<li><strong>Installation Labour (10–15%):</strong> Varies by city</li>
<li><strong>Net Meter & Permissions (5%):</strong> DISCOM fees</li>
</ul>

<h3>Return on Investment (ROI)</h3>
<p>A 3 kW system in a city like Mumbai or Delhi typically pays back in <strong>4–6 years</strong> and saves ₹15,000–₹25,000 per year on electricity bills.</p>

<h3>How to Get the Best Price</h3>
<ol>
<li>Get at least 3 quotes from verified installers</li>
<li>Always check if the installer is MNRE-approved</li>
<li>Verify panel brand and warranty (25-year performance guarantee)</li>
<li>Ask about AMC (Annual Maintenance Contract) terms</li>
</ol>
    `,
  },
  {
    slug: 'pm-surya-ghar-yojana-subsidy-guide',
    title: 'PM Surya Ghar Yojana: How to Apply for Solar Subsidy in India',
    description: 'Step-by-step guide to apply for the PM Surya Ghar Muft Bijli Yojana solar subsidy. Get up to ₹78,000 government subsidy for rooftop solar installation.',
    date: '2025-12-15',
    readTime: '6 min read',
    category: 'Government Schemes',
    content: `
<h2>PM Surya Ghar Muft Bijli Yojana — Complete Guide</h2>
<p>The PM Surya Ghar Muft Bijli Yojana is India's flagship rooftop solar scheme launched in February 2024. It aims to provide free electricity to 1 crore households by 2027.</p>

<h3>What Is PM Surya Ghar Yojana?</h3>
<p>Under this scheme, the government provides:</p>
<ul>
<li>Direct subsidy of up to ₹78,000 for rooftop solar installation</li>
<li>300 units of free electricity per month for eligible households</li>
<li>Low-interest loans through nationalized banks</li>
<li>Net metering — sell excess electricity back to the grid</li>
</ul>

<h3>Subsidy Amount by System Size</h3>
<ul>
<li><strong>1 kW system:</strong> ₹30,000 subsidy</li>
<li><strong>2 kW system:</strong> ₹60,000 subsidy</li>
<li><strong>3 kW system:</strong> ₹78,000 subsidy (maximum)</li>
<li><strong>Above 3 kW:</strong> Same ₹78,000 cap applies</li>
</ul>

<h3>Who Is Eligible?</h3>
<ul>
<li>Indian citizens with an own residential property</li>
<li>Must have a valid electricity connection</li>
<li>Property must be suitable for rooftop solar (strong roof)</li>
<li>No previous solar installation on the property</li>
</ul>

<h3>How to Apply — Step by Step</h3>
<ol>
<li>Visit <strong>pmsuryaghar.gov.in</strong> or the national portal</li>
<li>Register with your mobile number and Aadhaar</li>
<li>Select your state and electricity distribution company (DISCOM)</li>
<li>Submit the online application form</li>
<li>Get site inspection from your DISCOM</li>
<li>Choose an empanelled installer from the approved list</li>
<li>Get installation done</li>
<li>Submit completion documents to DISCOM</li>
<li>Net meter installation by DISCOM</li>
<li>Subsidy credited directly to your bank account</li>
</ol>

<h3>Required Documents</h3>
<ul>
<li>Aadhaar card</li>
<li>Latest electricity bill</li>
<li>Bank account details (for subsidy credit)</li>
<li>Property ownership proof</li>
<li>Roof photos</li>
</ul>

<h3>Important: Use an MNRE-Approved Installer</h3>
<p>To claim the subsidy, you <em>must</em> use an installer empanelled with your state's DISCOM or MNRE. Always verify your installer is approved before signing any contract.</p>
    `,
  },
  {
    slug: 'best-solar-panels-india-2025',
    title: 'Best Solar Panels in India 2025 — Top Brands Compared',
    description: 'Compare the best solar panel brands in India for 2025: Adani, Tata Power, Waaree, Vikram Solar, Luminous. Efficiency, price, and warranty compared.',
    date: '2025-12-20',
    readTime: '7 min read',
    category: 'Products & Reviews',
    content: `
<h2>Best Solar Panels in India 2025</h2>
<p>Choosing the right solar panel brand is crucial for long-term performance. Here's our comprehensive comparison of the top solar panel brands available in India.</p>

<h3>Top Solar Panel Brands in India</h3>

<h4>1. Adani Solar</h4>
<ul>
<li><strong>Efficiency:</strong> 20–21.5% (Mono PERC)</li>
<li><strong>Warranty:</strong> 25 years performance, 10 years product</li>
<li><strong>Price range:</strong> ₹28–35 per watt</li>
<li><strong>Best for:</strong> Large residential and commercial installations</li>
</ul>

<h4>2. Waaree Energies</h4>
<ul>
<li><strong>Efficiency:</strong> 19–21%</li>
<li><strong>Warranty:</strong> 30 years performance, 12 years product</li>
<li><strong>Price range:</strong> ₹25–32 per watt</li>
<li><strong>Best for:</strong> Budget-conscious buyers, good reliability</li>
</ul>

<h4>3. Vikram Solar</h4>
<ul>
<li><strong>Efficiency:</strong> 20.5–22% (Topcon technology)</li>
<li><strong>Warranty:</strong> 30 years performance, 15 years product</li>
<li><strong>Price range:</strong> ₹30–40 per watt</li>
<li><strong>Best for:</strong> Premium efficiency requirements</li>
</ul>

<h4>4. Tata Power Solar</h4>
<ul>
<li><strong>Efficiency:</strong> 19–20.5%</li>
<li><strong>Warranty:</strong> 25 years performance, 10 years product</li>
<li><strong>Price range:</strong> ₹27–35 per watt</li>
<li><strong>Best for:</strong> Brand trust, excellent service network</li>
</ul>

<h4>5. Luminous Solar</h4>
<ul>
<li><strong>Efficiency:</strong> 18–20%</li>
<li><strong>Warranty:</strong> 25 years performance, 5 years product</li>
<li><strong>Price range:</strong> ₹22–28 per watt</li>
<li><strong>Best for:</strong> Entry-level residential installations</li>
</ul>

<h3>Monocrystalline vs Polycrystalline vs Bifacial</h3>
<table>
<thead><tr><th>Type</th><th>Efficiency</th><th>Cost</th><th>Best For</th></tr></thead>
<tbody>
<tr><td>Monocrystalline</td><td>19–22%</td><td>Higher</td><td>Limited roof space</td></tr>
<tr><td>Polycrystalline</td><td>15–17%</td><td>Lower</td><td>Large open areas</td></tr>
<tr><td>Bifacial</td><td>21–24%</td><td>Highest</td><td>Ground-mounted, flat roofs</td></tr>
</tbody>
</table>

<h3>What to Check Before Buying</h3>
<ol>
<li>Panel efficiency (higher = more power from same area)</li>
<li>Temperature coefficient (lower is better for hot Indian climate)</li>
<li>Warranty terms — product vs performance warranty</li>
<li>BIS certification (mandatory for subsidy)</li>
<li>Domestic Content Requirement (DCR) compliance for subsidies</li>
</ol>
    `,
  },
  {
    slug: 'solar-installation-checklist-homeowners',
    title: 'Solar Installation Checklist for Indian Homeowners — 15 Things to Verify',
    description: 'Before installing solar panels at home, check these 15 critical factors: roof condition, installer credentials, panel quality, net metering, subsidy eligibility and more.',
    date: '2026-01-05',
    readTime: '5 min read',
    category: 'Guides',
    content: `
<h2>Solar Installation Checklist for Homeowners</h2>
<p>Installing solar is a 25-year investment. Use this checklist to avoid common mistakes and ensure you get the best value.</p>

<h3>Before You Sign Any Contract</h3>
<ol>
<li><strong>Roof Assessment:</strong> Get a structural engineer to certify your roof can bear the panel weight (15–20 kg per panel)</li>
<li><strong>Shadow Analysis:</strong> Ensure no shadows from buildings, trees, or water tanks fall on panels between 9am–3pm</li>
<li><strong>Roof Direction:</strong> South-facing roof is ideal in India. East/West facing loses 15–20% efficiency</li>
<li><strong>Net Metering Feasibility:</strong> Check if your DISCOM allows net metering in your area</li>
<li><strong>Subsidy Eligibility:</strong> Verify your state's DISCOM is participating in PM Surya Ghar scheme</li>
</ol>

<h3>Vetting Your Installer</h3>
<ol start="6">
<li><strong>MNRE Approval:</strong> Check if the installer is on the MNRE empanelled vendor list</li>
<li><strong>Experience:</strong> Minimum 3 years of installation experience in your city</li>
<li><strong>References:</strong> Ask for 3 recent customer references and visit one installation</li>
<li><strong>Warranty Service:</strong> Do they have local AMC support? Who handles panel replacements?</li>
<li><strong>Multiple Quotes:</strong> Get at least 3 quotes — price difference can be 20–40%</li>
</ol>

<h3>Checking the Equipment</h3>
<ol start="11">
<li><strong>Panel Brand:</strong> Stick to Tier-1 manufacturers (Adani, Waaree, Vikram, Tata Power)</li>
<li><strong>BIS Certification:</strong> Mandatory for subsidy — check the certificate</li>
<li><strong>Inverter Brand:</strong> Growatt, Solis, Goodwe, SMA are reliable inverter brands</li>
<li><strong>DC Cable Quality:</strong> UV-resistant cables rated for 30 years — ask for specs</li>
<li><strong>Earthing & Lightning Protection:</strong> Crucial for safety — must be included</li>
</ol>

<h3>Red Flags to Watch Out For</h3>
<ul>
<li>Installer demands 100% advance payment</li>
<li>No written warranty document provided</li>
<li>Promises government subsidy without formal application process</li>
<li>Uses unbranded or imported non-BIS-certified panels</li>
<li>No AMC (Annual Maintenance Contract) offered</li>
</ul>
    `,
  },
  {
    slug: 'solar-for-commercial-business-india',
    title: 'Solar for Businesses in India — Reduce Electricity Bills by 80%',
    description: 'Commercial solar installation guide for businesses in India. How rooftop solar reduces electricity costs, tax benefits (80% accelerated depreciation), and ROI analysis.',
    date: '2026-01-12',
    readTime: '7 min read',
    category: 'Commercial Solar',
    content: `
<h2>Commercial Solar in India — The Complete Business Guide</h2>
<p>Commercial electricity tariffs in India range from ₹7–₹15 per unit. Solar can reduce this to ₹2–₹3 per unit, delivering massive savings for businesses.</p>

<h3>Why Commercial Solar Makes Sense</h3>
<ul>
<li>Commercial electricity rates are 2–3x higher than residential — larger savings</li>
<li>80% accelerated depreciation benefit in Year 1 (reduces tax liability significantly)</li>
<li>Payback period of 3–4 years vs 5–7 years for residential</li>
<li>No subsidy cap — install as much capacity as your roof allows</li>
<li>Sell excess power back to grid via net metering</li>
</ul>

<h3>System Sizing for Businesses</h3>
<table>
<thead><tr><th>Business Type</th><th>Recommended Size</th><th>Monthly Savings</th><th>Investment</th></tr></thead>
<tbody>
<tr><td>Small Office (10 staff)</td><td>10–20 kW</td><td>₹15,000–₹30,000</td><td>₹5–10 Lakhs</td></tr>
<tr><td>Factory / Warehouse</td><td>50–200 kW</td><td>₹75,000–₹3,00,000</td><td>₹25–100 Lakhs</td></tr>
<tr><td>Hotel / Hospital</td><td>100–500 kW</td><td>₹1,50,000–₹7,50,000</td><td>₹50–250 Lakhs</td></tr>
<tr><td>Industrial Plant</td><td>500 kW+</td><td>₹7,50,000+</td><td>₹250 Lakhs+</td></tr>
</tbody>
</table>

<h3>Tax Benefits for Businesses</h3>
<p><strong>Section 32 — 80% Accelerated Depreciation:</strong></p>
<p>Businesses can claim 80% of the solar system cost as depreciation in the first year under the Income Tax Act. For a ₹50 lakh system, this means ₹40 lakh depreciation, saving approximately ₹13–16 lakh in tax (at 30–40% tax bracket).</p>

<h3>OPEX vs CAPEX Model</h3>
<p>Not all businesses want to invest capital. Two models are available:</p>
<ul>
<li><strong>CAPEX:</strong> Own the system, maximum savings, depreciation benefits</li>
<li><strong>OPEX/PPA:</strong> Third party owns the system, you pay per unit generated (₹3–4/unit) — zero investment</li>
</ul>

<h3>ROI Example — 100 kW Factory</h3>
<ul>
<li>System cost: ₹50 lakhs</li>
<li>Annual savings: ₹18 lakhs (at ₹8/unit tariff)</li>
<li>Tax benefit (Year 1): ₹15 lakhs</li>
<li>Effective payback: 2.5 years</li>
<li>25-year lifetime savings: ₹4+ crore</li>
</ul>
    `,
  },
  {
    slug: 'how-net-metering-works-india',
    title: 'Net Metering in India — How to Earn Money from Your Solar Panels',
    description: 'Learn how net metering works in India. How to export solar power to the grid, get credits on your electricity bill, and which states have the best net metering policies.',
    date: '2026-01-20',
    readTime: '5 min read',
    category: 'Guides',
    content: `
<h2>Net Metering in India — Complete Guide</h2>
<p>Net metering allows you to export unused solar electricity to the grid and get credits on your electricity bill. It's available across most Indian states.</p>

<h3>How Net Metering Works</h3>
<ol>
<li>Your solar panels generate electricity during the day</li>
<li>Your home/business uses what it needs</li>
<li>Excess electricity flows back to the DISCOM grid</li>
<li>Your meter runs backwards, crediting units to your account</li>
<li>At month-end, you pay only for the NET units consumed (imports minus exports)</li>
</ol>

<h3>Billing Under Net Metering</h3>
<p><strong>Example:</strong></p>
<ul>
<li>Monthly consumption: 500 units</li>
<li>Solar generation: 400 units</li>
<li>Export to grid: 150 units (surplus after self-consumption)</li>
<li>Net import from grid: 500 - 250 self-consumed - 150 export credit = 100 units</li>
<li>Bill: 100 units × ₹8 = ₹800 instead of ₹4,000 — 80% saving!</li>
</ul>

<h3>Net Metering Limits by State</h3>
<table>
<thead><tr><th>State</th><th>Net Metering Limit</th><th>Rate for Export</th></tr></thead>
<tbody>
<tr><td>Maharashtra</td><td>Up to 1 MW</td><td>At consumption tariff</td></tr>
<tr><td>Karnataka</td><td>Up to 500 kW</td><td>₹3.57/unit</td></tr>
<tr><td>Gujarat</td><td>Up to 1 MW</td><td>At consumption tariff</td></tr>
<tr><td>Delhi</td><td>Up to 500 kW</td><td>At consumption tariff</td></tr>
<tr><td>Tamil Nadu</td><td>Up to 1 MW</td><td>₹2.25/unit</td></tr>
<tr><td>Rajasthan</td><td>Up to 1 MW</td><td>At consumption tariff</td></tr>
</tbody>
</table>

<h3>How to Apply for Net Metering</h3>
<ol>
<li>Complete solar installation through MNRE-approved installer</li>
<li>Submit net metering application to your DISCOM</li>
<li>DISCOM inspection of installation (within 30 days by law)</li>
<li>Bidirectional meter installation by DISCOM</li>
<li>Start exporting! Credits appear on next bill</li>
</ol>

<h3>Gross Metering vs Net Metering</h3>
<p>Some states are moving to <strong>gross metering</strong> where all generation is exported at a fixed rate. Check your state's current policy before applying.</p>
    `,
  },
  {
    slug: 'solar-maintenance-tips-india',
    title: 'Solar Panel Maintenance Guide for India — Keep Output at Peak',
    description: 'Essential solar panel maintenance tips for Indian conditions: cleaning frequency, monsoon care, inverter checks, and annual AMC. Maintain 95%+ efficiency year-round.',
    date: '2026-02-01',
    readTime: '5 min read',
    category: 'Maintenance',
    content: `
<h2>Solar Panel Maintenance in India</h2>
<p>With proper maintenance, solar panels last 25+ years at 80%+ efficiency. Indian conditions — dust, heat, monsoon — require specific care.</p>

<h3>Cleaning Schedule</h3>
<p>Dust is the biggest efficiency killer in India. A dirty panel can lose <strong>15–30% output</strong>.</p>
<ul>
<li><strong>North India (Delhi, Rajasthan):</strong> Clean every 10–15 days during dry season</li>
<li><strong>South India (Bangalore, Chennai):</strong> Clean every 3–4 weeks</li>
<li><strong>After monsoon:</strong> Clean panels immediately as rainwater leaves deposits</li>
<li><strong>Automatic cleaning systems:</strong> Available for larger installations (100+ kW)</li>
</ul>

<h3>How to Clean Solar Panels</h3>
<ol>
<li>Clean early morning or late evening — never midday (thermal shock risk)</li>
<li>Use soft cloth or sponge with plain water</li>
<li>Do NOT use abrasive materials or detergents</li>
<li>For stubborn bird droppings, use a little diluted isopropyl alcohol</li>
<li>Never walk on panels</li>
</ol>

<h3>Monsoon Care</h3>
<ul>
<li>Check all cable connections and junction boxes are sealed before monsoon</li>
<li>Ensure earthing system is intact and functioning</li>
<li>Inspect mounting structure for any loose bolts or corrosion</li>
<li>Clean panels after heavy rain (leaves, debris)</li>
</ul>

<h3>Monthly Checks</h3>
<ul>
<li>Monitor daily generation on inverter app — sudden drops indicate issues</li>
<li>Check inverter display for error codes</li>
<li>Visually inspect panels for cracks or discoloration</li>
<li>Verify net meter readings match inverter output</li>
</ul>

<h3>Annual AMC (Maintenance Contract)</h3>
<p>An Annual Maintenance Contract typically costs ₹3,000–₹8,000 per year and includes:</p>
<ul>
<li>4–6 cleaning visits</li>
<li>Inverter health check</li>
<li>I-V curve testing of panels</li>
<li>Electrical safety audit</li>
<li>Performance report</li>
</ul>
<p>AMC is highly recommended — a single faulty string can reduce output by 30% without being detected.</p>
    `,
  },
  {
    slug: 'solar-subsidy-states-india-2025',
    title: 'State-wise Solar Subsidy in India 2025 — Complete List',
    description: 'Complete list of solar subsidies available in each Indian state in 2025. Central PM Surya Ghar subsidy plus state-specific incentives for Maharashtra, Gujarat, Rajasthan, Karnataka and more.',
    date: '2026-02-10',
    readTime: '6 min read',
    category: 'Government Schemes',
    content: `
<h2>State-wise Solar Subsidies in India 2025</h2>
<p>Besides the central PM Surya Ghar Yojana subsidy, many states offer additional incentives that further reduce your solar installation cost.</p>

<h3>Central Government Subsidy (All States)</h3>
<ul>
<li>Up to 2 kW: ₹30,000 per kW</li>
<li>2–3 kW: ₹18,000 per kW (additional)</li>
<li>Maximum: ₹78,000 per household</li>
<li>Available via pmsuryaghar.gov.in</li>
</ul>

<h3>State-wise Additional Incentives</h3>

<h4>Maharashtra</h4>
<ul>
<li>Additional ₹10,000–₹15,000 for rural households</li>
<li>MSEDCL simplified net metering approval</li>
<li>Solar policy target: 7,000 MW by 2025</li>
</ul>

<h4>Gujarat</h4>
<ul>
<li>One of India's best solar states — strong net metering policy</li>
<li>State subsidy on top of central for BPL households</li>
<li>GEDA (Gujarat Energy Development Agency) manages approvals</li>
</ul>

<h4>Rajasthan</h4>
<ul>
<li>Additional subsidy for farmers: ₹10,000–₹20,000 for agri-solar</li>
<li>Rajasthan Solar Energy Policy 2019 — generous incentives</li>
<li>Ideal solar radiation — highest solar potential in India</li>
</ul>

<h4>Karnataka</h4>
<ul>
<li>KREDL (Karnataka Renewable Energy Development Ltd) manages scheme</li>
<li>Additional incentives for rural electrification</li>
<li>Strong net metering policy with good export rates</li>
</ul>

<h4>Delhi</h4>
<ul>
<li>₹2/unit generation-based incentive for 5 years (DERC)</li>
<li>Free net metering connection</li>
<li>BSES/Tata Power Delhi have strong solar programs</li>
</ul>

<h4>Tamil Nadu</h4>
<ul>
<li>TANGEDCO manages rooftop solar applications</li>
<li>Additional ₹20,000 for SC/ST households</li>
<li>Solar farms integrated with agricultural feeders</li>
</ul>

<h3>How to Claim Both Central + State Subsidies</h3>
<ol>
<li>Apply on pmsuryaghar.gov.in for central subsidy</li>
<li>Simultaneously apply on your state's renewable energy agency website</li>
<li>Use a single MNRE-approved installer who handles both applications</li>
<li>Submit combined documents for faster processing</li>
</ol>

<h3>Documents Required</h3>
<ul>
<li>Aadhaar card + PAN card</li>
<li>Electricity bill (last 3 months)</li>
<li>Bank passbook copy</li>
<li>Property ownership documents</li>
<li>Roof photographs</li>
<li>Installer's empanelment certificate</li>
</ul>
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
