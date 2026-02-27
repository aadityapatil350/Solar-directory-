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
  {
    slug: 'solar-water-heater-india-guide',
    title: 'Solar Water Heater in India — Types, Cost & Which to Buy in 2025',
    description: 'Complete guide to solar water heaters in India. ETC vs FPC types, cost comparison, brands, installation, and government subsidy available in 2025.',
    date: '2026-02-15',
    readTime: '6 min read',
    category: 'Products & Reviews',
    content: `
<h2>Solar Water Heaters in India — Everything You Need to Know</h2>
<p>Solar water heaters are one of the fastest payback solar products in India — saving ₹5,000–₹15,000 per year on electricity bills with a payback of just 2–4 years.</p>

<h3>Two Main Types</h3>

<h4>1. ETC (Evacuated Tube Collector)</h4>
<ul>
<li>Works better in cloudy weather and cooler climates</li>
<li>Best for North India (Delhi, Punjab, UP, Rajasthan)</li>
<li>Price: ₹15,000–₹35,000 for 100–200 LPD capacity</li>
<li>Efficiency: Higher — vacuum tubes prevent heat loss</li>
</ul>

<h4>2. FPC (Flat Plate Collector)</h4>
<ul>
<li>More durable, lower maintenance</li>
<li>Best for South India (coastal areas, high humidity)</li>
<li>Price: ₹18,000–₹40,000 for 100–200 LPD capacity</li>
<li>Corrosion resistant — ideal for hard water areas</li>
</ul>

<h3>Cost by Capacity</h3>
<table>
<thead><tr><th>Capacity</th><th>Suitable For</th><th>ETC Price</th><th>FPC Price</th></tr></thead>
<tbody>
<tr><td>100 LPD</td><td>2–3 people</td><td>₹15,000–₹20,000</td><td>₹18,000–₹25,000</td></tr>
<tr><td>150 LPD</td><td>4–5 people</td><td>₹20,000–₹28,000</td><td>₹25,000–₹33,000</td></tr>
<tr><td>200 LPD</td><td>6–8 people</td><td>₹25,000–₹35,000</td><td>₹32,000–₹42,000</td></tr>
<tr><td>300 LPD</td><td>Hotel/Hostel</td><td>₹40,000–₹60,000</td><td>₹50,000–₹75,000</td></tr>
</tbody>
</table>

<h3>Top Brands in India</h3>
<ul>
<li><strong>V-Guard:</strong> Best after-sales service network across India</li>
<li><strong>Racold:</strong> Premium brand, excellent quality</li>
<li><strong>Supreme Solar:</strong> Budget-friendly, good performance</li>
<li><strong>Emmvee:</strong> Strong in South India, BIS certified</li>
<li><strong>Tata Power Solar:</strong> Reliable with strong warranty</li>
</ul>

<h3>Government Subsidy on Solar Water Heaters</h3>
<p>MNRE provides subsidy through state nodal agencies:</p>
<ul>
<li>Central subsidy: 30% of cost (varies by state)</li>
<li>Some states like Karnataka and Maharashtra offer additional state subsidies</li>
<li>Apply through your state's Energy Development Agency</li>
</ul>

<h3>Annual Savings Estimate</h3>
<ul>
<li>A 100 LPD system saves approximately 1,500 units of electricity per year</li>
<li>At ₹8/unit, that's ₹12,000 savings annually</li>
<li>Payback period: 2–3 years</li>
<li>System lifespan: 15–20 years</li>
</ul>
    `,
  },
  {
    slug: 'rooftop-solar-mumbai-guide',
    title: 'Rooftop Solar in Mumbai — Cost, MSEDCL Net Metering & Best Installers 2025',
    description: 'Complete guide to installing rooftop solar in Mumbai. MSEDCL net metering process, PM Surya Ghar subsidy, cost for 1kW–10kW systems, and top solar installers in Mumbai.',
    date: '2026-02-17',
    readTime: '7 min read',
    category: 'City Guides',
    content: `
<h2>Rooftop Solar in Mumbai — Complete 2025 Guide</h2>
<p>Mumbai receives excellent solar radiation (~5.5 peak sun hours/day) making it ideal for rooftop solar. With MSEDCL net metering and PM Surya Ghar subsidy, the economics are very strong.</p>

<h3>Solar System Cost in Mumbai</h3>
<table>
<thead><tr><th>System Size</th><th>Before Subsidy</th><th>After PM Surya Ghar</th><th>Monthly Generation</th></tr></thead>
<tbody>
<tr><td>1 kW</td><td>₹65,000–₹80,000</td><td>₹35,000–₹50,000</td><td>130–150 units</td></tr>
<tr><td>2 kW</td><td>₹1,25,000–₹1,55,000</td><td>₹65,000–₹95,000</td><td>260–300 units</td></tr>
<tr><td>3 kW</td><td>₹1,70,000–₹2,10,000</td><td>₹92,000–₹1,32,000</td><td>390–450 units</td></tr>
<tr><td>5 kW</td><td>₹2,70,000–₹3,30,000</td><td>₹1,92,000–₹2,52,000</td><td>650–750 units</td></tr>
</tbody>
</table>

<h3>MSEDCL Net Metering in Mumbai</h3>
<ol>
<li>Apply online at mahadiscom.in after installation</li>
<li>MSEDCL inspection within 30 days</li>
<li>Bidirectional meter installation (at MSEDCL cost)</li>
<li>Export rate: At consumption tariff rate</li>
<li>Annual settlement of excess credits</li>
</ol>

<h3>Mumbai-Specific Considerations</h3>
<ul>
<li><strong>Monsoon (June–September):</strong> Generation drops 40–60% — factor into ROI calculation</li>
<li><strong>High-rise buildings:</strong> Society NOC required before installation</li>
<li><strong>Salt air (coastal areas):</strong> Use marine-grade mounting structures</li>
<li><strong>BEST areas (South Mumbai):</strong> Different process — apply to BEST, not MSEDCL</li>
</ul>

<h3>Documents Required for Mumbai Solar</h3>
<ul>
<li>MSEDCL consumer number</li>
<li>Latest electricity bill</li>
<li>Property documents or society NOC</li>
<li>Aadhaar + PAN card</li>
<li>Bank account details</li>
<li>Roof photos with dimensions</li>
</ul>

<h3>Payback Period in Mumbai</h3>
<p>With electricity tariff at ₹8–₹12/unit for Mumbai residential consumers, a 3 kW system typically pays back in <strong>4–5 years</strong> and saves ₹25,000–₹35,000 per year.</p>
    `,
  },
  {
    slug: 'solar-panels-delhi-guide',
    title: 'Solar Panels in Delhi — Cost, BSES/Tata Power Net Metering & Subsidy 2025',
    description: 'Install solar panels in Delhi with PM Surya Ghar subsidy + Delhi government ₹2/unit incentive. BSES and Tata Power Delhi net metering guide, costs and top installers.',
    date: '2026-02-19',
    readTime: '6 min read',
    category: 'City Guides',
    content: `
<h2>Solar Panels in Delhi — 2025 Complete Guide</h2>
<p>Delhi offers some of India's best solar incentives — the central PM Surya Ghar subsidy PLUS a Delhi government generation-based incentive of ₹2/unit for 5 years. This makes Delhi one of the best cities to go solar.</p>

<h3>Delhi Solar System Costs</h3>
<table>
<thead><tr><th>System Size</th><th>Total Cost</th><th>After Subsidy</th><th>Annual Savings</th></tr></thead>
<tbody>
<tr><td>1 kW</td><td>₹60,000–₹75,000</td><td>₹30,000–₹45,000</td><td>₹12,000–₹15,000</td></tr>
<tr><td>2 kW</td><td>₹1,20,000–₹1,45,000</td><td>₹60,000–₹85,000</td><td>₹22,000–₹28,000</td></tr>
<tr><td>3 kW</td><td>₹1,60,000–₹2,00,000</td><td>₹82,000–₹1,22,000</td><td>₹32,000–₹42,000</td></tr>
<tr><td>5 kW</td><td>₹2,50,000–₹3,10,000</td><td>₹1,72,000–₹2,32,000</td><td>₹50,000–₹65,000</td></tr>
</tbody>
</table>

<h3>Delhi Exclusive: ₹2/Unit Generation Incentive</h3>
<p>Delhi Electricity Regulatory Commission (DERC) provides an additional ₹2 per unit generated for 5 years. For a 3 kW system generating ~4,500 units/year, that's an extra <strong>₹9,000/year</strong> on top of your electricity savings.</p>

<h3>BSES vs Tata Power Delhi — Net Metering</h3>
<ul>
<li><strong>BSES Rajdhani/Yamuna:</strong> South, West, East Delhi — apply at bsesdelhi.com</li>
<li><strong>Tata Power Delhi:</strong> North and Northwest Delhi — apply at tatapower-ddl.com</li>
<li>Both offer net metering at consumption tariff rate</li>
<li>Free net meter installation by DISCOM</li>
</ul>

<h3>Delhi Solar Tips</h3>
<ul>
<li>Delhi has ~300 sunny days/year — excellent generation potential</li>
<li>Winter fog (Dec–Jan) reduces generation by 20–30%</li>
<li>Dust storms in May–June need frequent panel cleaning</li>
<li>Flat RCC rooftops ideal for Delhi installations</li>
<li>Use MNRE-empanelled installers only for subsidy eligibility</li>
</ul>
    `,
  },
  {
    slug: 'solar-inverter-buying-guide-india',
    title: 'Solar Inverter Buying Guide India 2025 — String vs Microinverter vs Hybrid',
    description: 'How to choose the right solar inverter in India. Compare string inverters, microinverters, and hybrid inverters. Top brands: Growatt, Solis, SMA, Goodwe, Fronius compared.',
    date: '2026-02-21',
    readTime: '7 min read',
    category: 'Products & Reviews',
    content: `
<h2>Solar Inverter Buying Guide for India 2025</h2>
<p>The inverter is the brain of your solar system — it converts DC power from panels to AC power for your home. Choosing wrong can cost you 20–30% in efficiency losses.</p>

<h3>Types of Solar Inverters</h3>

<h4>1. String Inverter (Most Common in India)</h4>
<ul>
<li>All panels connected in series to one inverter</li>
<li>Cost: ₹8,000–₹25,000 for 1–5 kW</li>
<li>Best for: Unshaded rooftops, budget-conscious buyers</li>
<li>Drawback: One shaded panel affects entire string output</li>
</ul>

<h4>2. Microinverter</h4>
<ul>
<li>One inverter per panel — maximum energy harvest</li>
<li>Cost: ₹5,000–₹8,000 per panel (expensive)</li>
<li>Best for: Partially shaded rooftops, complex roof shapes</li>
<li>Advantage: Panel-level monitoring, one panel failure doesn't affect others</li>
</ul>

<h4>3. Hybrid Inverter (with Battery)</h4>
<ul>
<li>Manages solar + battery + grid simultaneously</li>
<li>Cost: ₹20,000–₹60,000 for 3–10 kW</li>
<li>Best for: Areas with frequent power cuts</li>
<li>Advantage: Use solar power even during grid failure</li>
</ul>

<h3>Top Inverter Brands in India</h3>
<table>
<thead><tr><th>Brand</th><th>Origin</th><th>Best For</th><th>Price Range (3kW)</th><th>Warranty</th></tr></thead>
<tbody>
<tr><td>Growatt</td><td>China</td><td>Budget, best value</td><td>₹12,000–₹18,000</td><td>5 years</td></tr>
<tr><td>Solis</td><td>China</td><td>Reliability, good app</td><td>₹14,000–₹20,000</td><td>5 years</td></tr>
<tr><td>Goodwe</td><td>China</td><td>Hybrid systems</td><td>₹18,000–₹28,000</td><td>5 years</td></tr>
<tr><td>SMA</td><td>Germany</td><td>Premium, long-term reliability</td><td>₹35,000–₹50,000</td><td>10 years</td></tr>
<tr><td>Fronius</td><td>Austria</td><td>Premium, best monitoring</td><td>₹40,000–₹60,000</td><td>10 years</td></tr>
<tr><td>Luminous</td><td>India</td><td>Good service network</td><td>₹15,000–₹22,000</td><td>5 years</td></tr>
</tbody>
</table>

<h3>Key Specifications to Check</h3>
<ul>
<li><strong>Efficiency:</strong> Look for 97%+ efficiency rating</li>
<li><strong>MPPT inputs:</strong> More MPPTs = better for complex rooftops</li>
<li><strong>IP rating:</strong> IP65 minimum for outdoor installation</li>
<li><strong>Grid compliance:</strong> Must be approved by your DISCOM</li>
<li><strong>Monitoring app:</strong> Real-time generation tracking via mobile</li>
<li><strong>Warranty:</strong> Minimum 5 years (10 years preferred)</li>
</ul>

<h3>For Indian Conditions: What Matters Most</h3>
<ul>
<li>Wide voltage range — handles voltage fluctuations common in India</li>
<li>High temperature tolerance — must work at 45–50°C ambient temperature</li>
<li>Anti-islanding protection — mandatory for grid-tied systems in India</li>
<li>Good local service center — critical for after-sales support</li>
</ul>
    `,
  },
  {
    slug: 'solar-battery-storage-india-2025',
    title: 'Solar Battery Storage in India 2025 — Lithium vs Lead Acid, Cost & Which to Buy',
    description: 'Complete guide to solar batteries in India. Lithium-ion vs lead acid comparison, top brands (Luminous, Livguard, Amaron), cost, capacity sizing and when battery storage makes sense.',
    date: '2026-02-23',
    readTime: '7 min read',
    category: 'Products & Reviews',
    content: `
<h2>Solar Battery Storage in India — 2025 Guide</h2>
<p>With frequent power cuts in many parts of India, solar battery storage is increasingly popular. But does it make financial sense? Here's everything you need to know.</p>

<h3>Do You Need a Solar Battery?</h3>
<ul>
<li><strong>Yes, if:</strong> You have frequent power cuts (2+ hours/day), you want energy independence, or net metering isn't available in your area</li>
<li><strong>Maybe not, if:</strong> Your grid is reliable and net metering is available — grid is essentially your free battery</li>
</ul>

<h3>Lithium-Ion vs Lead Acid Batteries</h3>
<table>
<thead><tr><th>Feature</th><th>Lithium-Ion</th><th>Lead Acid</th></tr></thead>
<tbody>
<tr><td>Lifespan</td><td>10–15 years (3000–6000 cycles)</td><td>3–5 years (500–1200 cycles)</td></tr>
<tr><td>Depth of Discharge</td><td>80–95%</td><td>50%</td></tr>
<tr><td>Efficiency</td><td>95–98%</td><td>70–80%</td></tr>
<tr><td>Maintenance</td><td>Zero maintenance</td><td>Monthly water topping</td></tr>
<tr><td>Weight</td><td>Light</td><td>Very heavy</td></tr>
<tr><td>Cost per kWh</td><td>₹15,000–₹25,000</td><td>₹8,000–₹12,000</td></tr>
<tr><td>Recommendation</td><td>Always preferred</td><td>Only if budget is very tight</td></tr>
</tbody>
</table>

<h3>Top Battery Brands in India</h3>
<ul>
<li><strong>Luminous:</strong> Best service network, wide range of lithium and lead acid</li>
<li><strong>Livguard:</strong> Good warranty terms, competitive pricing</li>
<li><strong>Amaron:</strong> Excellent lead acid quality</li>
<li><strong>Okaya:</strong> Budget-friendly, decent performance</li>
<li><strong>BattX (by Nexcharge):</strong> Premium lithium, JV with Panasonic technology</li>
</ul>

<h3>How Much Battery Capacity Do You Need?</h3>
<ul>
<li>Essential loads (lights, fans, phone charging): 2–3 kWh storage</li>
<li>Essential + 1 AC for 4 hours: 5–7 kWh storage</li>
<li>Whole home backup: 10–15 kWh storage</li>
</ul>

<h3>Battery System Cost in India</h3>
<ul>
<li>2.5 kWh Lithium system: ₹40,000–₹60,000</li>
<li>5 kWh Lithium system: ₹80,000–₹1,20,000</li>
<li>10 kWh Lithium system: ₹1,50,000–₹2,50,000</li>
</ul>

<h3>Subsidy on Solar Batteries</h3>
<p>Currently, standalone battery systems do not qualify for PM Surya Ghar subsidy. However, batteries installed as part of an off-grid solar system may qualify for MNRE off-grid program subsidies in select states.</p>
    `,
  },
  {
    slug: 'solar-panel-installation-bangalore',
    title: 'Solar Panel Installation in Bangalore — Cost, BESCOM Net Metering & Guide 2025',
    description: 'Install solar panels in Bangalore with BESCOM net metering. Complete cost guide for 1kW–10kW systems, PM Surya Ghar subsidy, KREDL process and top solar companies in Bangalore.',
    date: '2026-02-24',
    readTime: '6 min read',
    category: 'City Guides',
    content: `
<h2>Solar Panel Installation in Bangalore — 2025 Guide</h2>
<p>Bangalore (Bengaluru) receives ~5.5 peak sun hours daily and has one of India's most progressive net metering policies via BESCOM. Combined with PM Surya Ghar subsidy, solar is highly economical here.</p>

<h3>Bangalore Solar System Costs 2025</h3>
<table>
<thead><tr><th>System Size</th><th>Cost (Before Subsidy)</th><th>After Subsidy</th><th>Monthly Units</th></tr></thead>
<tbody>
<tr><td>1 kW</td><td>₹62,000–₹78,000</td><td>₹32,000–₹48,000</td><td>130–145 units</td></tr>
<tr><td>2 kW</td><td>₹1,22,000–₹1,48,000</td><td>₹62,000–₹88,000</td><td>260–290 units</td></tr>
<tr><td>3 kW</td><td>₹1,65,000–₹2,05,000</td><td>₹87,000–₹1,27,000</td><td>390–435 units</td></tr>
<tr><td>5 kW</td><td>₹2,55,000–₹3,20,000</td><td>₹1,77,000–₹2,42,000</td><td>650–725 units</td></tr>
</tbody>
</table>

<h3>BESCOM Net Metering Process</h3>
<ol>
<li>Install solar through KREDL-empanelled installer</li>
<li>Apply for net metering on bescom.org portal</li>
<li>BESCOM inspection within 30 working days</li>
<li>Bidirectional meter installation</li>
<li>Export rate: ₹3.57/unit (one of best rates in India)</li>
<li>Credits adjusted in monthly bill</li>
</ol>

<h3>KREDL vs Direct Application</h3>
<p>In Karnataka, solar subsidy applications are managed by KREDL (Karnataka Renewable Energy Development Ltd). You can apply through:</p>
<ul>
<li>KREDL portal: kredlinfo.in</li>
<li>PM Surya Ghar portal: pmsuryaghar.gov.in</li>
<li>Your MNRE-empanelled installer handles paperwork</li>
</ul>

<h3>Bangalore-Specific Tips</h3>
<ul>
<li>Mild climate (20–35°C) — excellent for panel performance (no extreme heat loss)</li>
<li>Monsoon (June–October) — plan for 30–40% reduced generation</li>
<li>Apartments: Get Society/RWA approval and BESCOM sanction before installation</li>
<li>East-West panel orientation works well for apartment buildings with limited south-facing space</li>
</ul>
    `,
  },
  {
    slug: 'off-grid-solar-system-india',
    title: 'Off-Grid Solar System for Home in India — Cost, Setup & When It Makes Sense',
    description: 'Complete guide to off-grid solar systems in India. When to choose off-grid vs grid-tied, system sizing, battery requirements, cost for 1kW–5kW and top brands for rural India.',
    date: '2026-02-25',
    readTime: '6 min read',
    category: 'Guides',
    content: `
<h2>Off-Grid Solar Systems in India — Complete Guide</h2>
<p>Off-grid solar is ideal for rural India, remote locations, or areas with unreliable grid supply. Unlike grid-tied systems, off-grid systems store all energy in batteries and work independently of the electricity grid.</p>

<h3>Off-Grid vs Grid-Tied vs Hybrid</h3>
<table>
<thead><tr><th>Type</th><th>Works Without Grid</th><th>Battery Needed</th><th>Net Metering</th><th>Best For</th></tr></thead>
<tbody>
<tr><td>Off-Grid</td><td>Yes</td><td>Yes (large)</td><td>No</td><td>Remote/rural areas</td></tr>
<tr><td>Grid-Tied</td><td>No</td><td>No</td><td>Yes</td><td>Urban areas, stable grid</td></tr>
<tr><td>Hybrid</td><td>Yes</td><td>Yes (smaller)</td><td>Yes</td><td>Urban with power cuts</td></tr>
</tbody>
</table>

<h3>Off-Grid System Cost in India</h3>
<table>
<thead><tr><th>System Size</th><th>Battery Storage</th><th>Total Cost</th><th>Best For</th></tr></thead>
<tbody>
<tr><td>500W</td><td>100Ah (1.2 kWh)</td><td>₹35,000–₹55,000</td><td>Basic lighting + fans</td></tr>
<tr><td>1 kW</td><td>150Ah (1.8 kWh)</td><td>₹60,000–₹90,000</td><td>Small rural home</td></tr>
<tr><td>2 kW</td><td>200Ah (2.4 kWh)</td><td>₹1,10,000–₹1,60,000</td><td>Medium home</td></tr>
<tr><td>3 kW</td><td>400Ah (4.8 kWh)</td><td>₹1,80,000–₹2,60,000</td><td>Large home with AC</td></tr>
</tbody>
</table>

<h3>Sizing Your Off-Grid System</h3>
<ol>
<li><strong>Calculate daily load:</strong> List all appliances × hours used</li>
<li><strong>Add 20% buffer</strong> for losses and cloudy days</li>
<li><strong>Battery sizing:</strong> Store at least 2 days of consumption</li>
<li><strong>Panel sizing:</strong> Must charge batteries + meet daytime load</li>
</ol>

<h3>Government Support for Off-Grid Solar</h3>
<ul>
<li>MNRE off-grid program: 30–90% subsidy for BPL households</li>
<li>PM-KUSUM for farmers: Solar pumps with 60–70% subsidy</li>
<li>State-specific schemes for rural electrification</li>
</ul>

<h3>Best Off-Grid Solar Brands in India</h3>
<ul>
<li><strong>Luminous:</strong> Most popular for rural India — excellent dealer network</li>
<li><strong>Su-Kam:</strong> Pioneer in off-grid, strong presence in North India</li>
<li><strong>UTL Solar:</strong> Good budget option, pan-India presence</li>
<li><strong>Microtek:</strong> Affordable with good inverter range</li>
</ul>
    `,
  },
  {
    slug: 'solar-rooftop-housing-society-india',
    title: 'Solar for Housing Societies in India — Group Net Metering & How to Get It Done',
    description: 'How to install rooftop solar in a housing society or apartment complex in India. Group net metering, society approval process, cost sharing, and real examples from Mumbai, Bangalore and Delhi.',
    date: '2026-02-26',
    readTime: '6 min read',
    category: 'Guides',
    content: `
<h2>Solar for Housing Societies in India</h2>
<p>Apartment complexes and housing societies can save massively on common area electricity bills (lifts, pumps, lights, clubhouse) with rooftop solar. With group net metering, even individual flat owners can benefit.</p>

<h3>Two Models for Society Solar</h3>

<h4>Model 1: Common Area Solar</h4>
<ul>
<li>Solar installed on terrace powers lifts, pumps, corridor lights</li>
<li>Savings go directly to maintenance account</li>
<li>Typical saving: ₹15,000–₹60,000/month depending on society size</li>
<li>ROI: 3–5 years</li>
<li>Easiest to implement — single connection, no individual billing complexity</li>
</ul>

<h4>Model 2: Group Net Metering (Individual Flat Benefits)</h4>
<ul>
<li>Common solar installation, units distributed to individual flat accounts</li>
<li>Available in Maharashtra, Karnataka, Gujarat, Delhi</li>
<li>Each flat gets proportional solar credit on their electricity bill</li>
<li>More complex but maximum benefit for all residents</li>
</ul>

<h3>How to Get Society Approval</h3>
<ol>
<li>Raise in AGM (Annual General Meeting) — pass resolution with majority</li>
<li>Get rooftop structural assessment</li>
<li>Obtain 3 quotes from MNRE-empanelled installers</li>
<li>Society committee signs agreement with installer</li>
<li>Apply for DISCOM permission (net metering or group net metering)</li>
<li>Installation typically takes 3–7 days</li>
</ol>

<h3>Typical Society Solar Costs</h3>
<table>
<thead><tr><th>Society Size</th><th>Recommended Capacity</th><th>Cost</th><th>Monthly Saving</th></tr></thead>
<tbody>
<tr><td>Small (20–50 flats)</td><td>10–30 kW</td><td>₹5–15 Lakhs</td><td>₹8,000–₹25,000</td></tr>
<tr><td>Medium (50–200 flats)</td><td>30–100 kW</td><td>₹15–50 Lakhs</td><td>₹25,000–₹80,000</td></tr>
<tr><td>Large (200+ flats)</td><td>100–500 kW</td><td>₹50–250 Lakhs</td><td>₹80,000–₹4,00,000</td></tr>
</tbody>
</table>

<h3>Real Examples</h3>
<ul>
<li><strong>Mumbai Housing Society (80 flats):</strong> 50 kW system, saving ₹45,000/month on common area bills. Payback in 4 years.</li>
<li><strong>Bangalore Apartment (150 flats):</strong> 100 kW with group net metering. Each flat saves ₹800–₹1,200/month.</li>
<li><strong>Delhi RWA (40 flats):</strong> 20 kW system. Common area bills reduced from ₹18,000 to ₹4,000/month.</li>
</ul>
    `,
  },
  {
    slug: 'solar-epc-company-vs-dealer-india',
    title: 'Solar EPC Company vs Solar Dealer in India — What Is the Difference?',
    description: 'What is a solar EPC company? How is it different from a solar dealer or installer? Complete explanation for Indian homeowners and businesses choosing the right solar partner.',
    date: '2026-02-27',
    readTime: '5 min read',
    category: 'Guides',
    content: `
<h2>Solar EPC Company vs Dealer vs Installer — Explained</h2>
<p>When looking for solar in India, you'll encounter many terms — EPC company, solar dealer, installer, system integrator. Here's what they all mean and who you should hire for your project.</p>

<h3>What is a Solar EPC Company?</h3>
<p>EPC stands for <strong>Engineering, Procurement, and Construction</strong>. A solar EPC company handles everything:</p>
<ul>
<li><strong>Engineering:</strong> System design, shadow analysis, structural assessment, electrical drawings</li>
<li><strong>Procurement:</strong> Sourcing and purchasing panels, inverters, mounting structures, cables</li>
<li><strong>Construction:</strong> Complete installation, commissioning, and grid connection</li>
</ul>
<p>EPC companies are best for medium to large projects (10 kW and above) and commercial/industrial solar.</p>

<h3>What is a Solar Dealer?</h3>
<ul>
<li>Sells solar equipment (panels, inverters, batteries) — may or may not install</li>
<li>Best for: DIY installations or buying equipment separately</li>
<li>Risk: No guarantee on system performance, you manage coordination</li>
</ul>

<h3>What is a Solar Installer?</h3>
<ul>
<li>Handles site survey, design, and installation</li>
<li>May procure equipment from dealers or manufacturers</li>
<li>Best for: Residential systems (1–10 kW)</li>
<li>Always verify they are MNRE-empanelled for subsidy eligibility</li>
</ul>

<h3>Which Should You Choose?</h3>
<table>
<thead><tr><th>Project Type</th><th>Recommended</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Home (1–5 kW)</td><td>Local MNRE Installer</td><td>Good pricing, handles subsidy</td></tr>
<tr><td>Large Home (5–10 kW)</td><td>Installer or small EPC</td><td>Better design capability</td></tr>
<tr><td>Commercial (10–100 kW)</td><td>EPC Company</td><td>Proper engineering, performance guarantee</td></tr>
<tr><td>Industrial (100 kW+)</td><td>Large EPC Company</td><td>Turnkey, bankable, performance contract</td></tr>
</tbody>
</table>

<h3>Red Flags When Choosing</h3>
<ul>
<li>No physical office or address (check on Google Maps)</li>
<li>Cannot show previous installation photos or references</li>
<li>Not on MNRE empanelled vendor list</li>
<li>Quotes only via WhatsApp — no formal written proposal</li>
<li>Demands 100% advance payment before any work</li>
</ul>

<h3>Questions to Ask Any Solar Company</h3>
<ol>
<li>Are you MNRE-empanelled? (Show the certificate)</li>
<li>What panel brand will you use? Is it BIS certified?</li>
<li>Who handles the net metering application?</li>
<li>What is the system performance guarantee?</li>
<li>What does the AMC cover and cost?</li>
</ol>
    `,
  },
  {
    slug: 'solar-pump-agriculture-india-pm-kusum',
    title: 'Solar Pump for Agriculture in India — PM-KUSUM Scheme, Cost & How to Apply',
    description: 'Complete guide to solar water pumps for Indian farmers under PM-KUSUM scheme. Get 60–70% subsidy on solar pumps, eligibility, application process and top brands in 2025.',
    date: '2026-03-01',
    readTime: '7 min read',
    category: 'Government Schemes',
    content: `
<h2>Solar Pumps for Agriculture — PM-KUSUM Scheme Guide 2025</h2>
<p>The PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan) scheme helps Indian farmers install solar pumps with 60–70% government subsidy. This eliminates diesel pump costs and free electricity for irrigation.</p>

<h3>PM-KUSUM Scheme Components</h3>
<ul>
<li><strong>Component A:</strong> 10,000 MW decentralized ground-mounted solar plants by farmers</li>
<li><strong>Component B:</strong> 20 lakh standalone solar agriculture pumps</li>
<li><strong>Component C:</strong> Solarization of 15 lakh existing grid-connected pumps</li>
</ul>

<h3>Subsidy Structure (Component B — Solar Pumps)</h3>
<table>
<thead><tr><th>Pump Capacity</th><th>Total Cost</th><th>Central Subsidy</th><th>State Subsidy</th><th>Farmer Cost</th></tr></thead>
<tbody>
<tr><td>3 HP</td><td>₹1,50,000–₹2,00,000</td><td>30%</td><td>30%</td><td>₹30,000–₹40,000</td></tr>
<tr><td>5 HP</td><td>₹2,20,000–₹2,80,000</td><td>30%</td><td>30%</td><td>₹44,000–₹56,000</td></tr>
<tr><td>7.5 HP</td><td>₹3,00,000–₹3,80,000</td><td>30%</td><td>30%</td><td>₹60,000–₹76,000</td></tr>
<tr><td>10 HP</td><td>₹4,00,000–₹5,00,000</td><td>30%</td><td>30%</td><td>₹80,000–₹1,00,000</td></tr>
</tbody>
</table>

<h3>Eligibility for PM-KUSUM Solar Pump</h3>
<ul>
<li>Must be a farmer with agricultural land</li>
<li>No existing electric pump connection at the site</li>
<li>Water source available (borewell, open well, canal, pond)</li>
<li>Valid land documents (7/12 extract or equivalent)</li>
</ul>

<h3>How to Apply — Step by Step</h3>
<ol>
<li>Visit your state's agriculture/energy department website</li>
<li>Register with Aadhaar-linked mobile number</li>
<li>Fill online application with land details, water source, pump capacity needed</li>
<li>Submit required documents</li>
<li>Upon approval, get list of empanelled vendors</li>
<li>Choose vendor, pay farmer share</li>
<li>Vendor installs solar pump (typically within 60 days)</li>
<li>Subsidy paid directly to vendor</li>
</ol>

<h3>Benefits of Solar Pumps vs Diesel Pumps</h3>
<ul>
<li>Zero fuel cost — saves ₹50,000–₹2,00,000/year on diesel</li>
<li>No electricity bill — free irrigation power</li>
<li>No grid dependency — works in remote fields</li>
<li>Low maintenance — no engine servicing</li>
<li>25-year panel life</li>
</ul>

<h3>Top Solar Pump Brands in India</h3>
<ul>
<li>Kirloskar Solar</li>
<li>CRI Pumps</li>
<li>Grundfos Solar</li>
<li>Shakti Pumps</li>
<li>Lubi Solar</li>
</ul>
    `,
  },
  {
    slug: 'how-to-check-solar-installer-genuine-india',
    title: 'How to Check if a Solar Installer is Genuine in India — 7 Verification Steps',
    description: 'Avoid solar fraud in India. Learn how to verify if a solar company is MNRE-empanelled, check their credentials, reviews, and protect yourself from fake installers and scams.',
    date: '2026-03-03',
    readTime: '5 min read',
    category: 'Guides',
    content: `
<h2>How to Verify a Solar Installer is Genuine — 7 Steps</h2>
<p>Solar scams are rising in India as the market grows. Fake installers take advance payments, use substandard panels, and disappear. Here's how to protect yourself.</p>

<h3>Step 1: Check MNRE Empanelment</h3>
<p>For PM Surya Ghar subsidy, the installer must be empanelled by MNRE or your state DISCOM. Check at:</p>
<ul>
<li>pmsuryaghar.gov.in — search empanelled vendors by state</li>
<li>Your DISCOM website — approved vendor list</li>
<li>Ask for the empanelment certificate directly</li>
</ul>

<h3>Step 2: Verify GST Registration</h3>
<ul>
<li>Any solar company doing business must have GST registration</li>
<li>Ask for their GSTIN number</li>
<li>Verify at gst.gov.in — check if it's active and matches their business name</li>
</ul>

<h3>Step 3: Check Google Reviews & Ratings</h3>
<ul>
<li>Search "[Company Name] solar reviews" on Google</li>
<li>Check Google Maps listing — real companies have real reviews with photos</li>
<li>Look for recent reviews (last 6 months) and responses from the company</li>
<li>Be suspicious of companies with only 5-star reviews and no negative feedback</li>
</ul>

<h3>Step 4: Visit Their Physical Office</h3>
<ul>
<li>Genuine solar companies have a real office — visit before signing</li>
<li>Check if they have showroom panels, inverters, equipment on display</li>
<li>Verify address matches their GST and MNRE registration</li>
</ul>

<h3>Step 5: Ask for References</h3>
<ul>
<li>Request contact details of 3 recent customers in your city</li>
<li>Call them — ask about installation quality, timeline, and after-service</li>
<li>If possible, visit one installation site</li>
</ul>

<h3>Step 6: Get Everything in Writing</h3>
<ul>
<li>Formal quotation on company letterhead with seal</li>
<li>Detailed bill of materials (panel brand, model, wattage; inverter brand, model)</li>
<li>Payment terms — never pay more than 30% advance</li>
<li>Written warranty document (panel + inverter + installation)</li>
<li>Timeline commitment in writing</li>
</ul>

<h3>Step 7: Watch for These Red Flags</h3>
<ul>
<li>Promises unrealistically high generation figures</li>
<li>Guarantees subsidy without proper application process</li>
<li>Insists on 100% advance payment</li>
<li>No written contract — verbal agreement only</li>
<li>Can't show BIS certificate for panels</li>
<li>Pressure tactics — "offer valid only today"</li>
<li>Uses WhatsApp only — no formal email communication</li>
</ul>

<h3>Where to Report Solar Fraud</h3>
<ul>
<li>National Consumer Helpline: 1800-11-4000</li>
<li>Cyber crime portal: cybercrime.gov.in</li>
<li>MNRE grievance: mnre.gov.in/complaint</li>
<li>Local consumer court</li>
</ul>
    `,
  },
  {
    slug: 'solar-energy-future-india-2030',
    title: 'India Solar Energy Future — 500 GW Target by 2030 & What It Means for You',
    description: "India's ambitious 500 GW renewable energy target by 2030. How government policies, falling solar prices, and PM Surya Ghar will shape India's solar future — and how you can benefit.",
    date: '2026-03-05',
    readTime: '6 min read',
    category: 'Industry News',
    content: `
<h2>India's Solar Energy Future — 500 GW by 2030</h2>
<p>India has set an ambitious target of 500 GW of renewable energy capacity by 2030, with solar being the backbone. The country is already the 4th largest solar market globally and growing fast.</p>

<h3>India's Current Solar Progress</h3>
<ul>
<li>Installed solar capacity: ~90 GW (as of early 2025)</li>
<li>Target: 500 GW total renewables by 2030 (300 GW solar)</li>
<li>Annual addition: 15–20 GW per year</li>
<li>Solar cost reduction: 90% drop in 10 years — now cheapest electricity source</li>
</ul>

<h3>Key Government Policies Driving Solar</h3>

<h4>PM Surya Ghar Muft Bijli Yojana</h4>
<ul>
<li>Target: 1 crore households with rooftop solar by 2027</li>
<li>Budget: ₹75,000 crore</li>
<li>Up to ₹78,000 subsidy per household</li>
</ul>

<h4>PM-KUSUM</h4>
<ul>
<li>35 lakh solar pumps for farmers</li>
<li>10 GW decentralized solar for rural areas</li>
</ul>

<h4>National Solar Mission</h4>
<ul>
<li>100 GW rooftop solar target</li>
<li>Domestic manufacturing incentives (PLI scheme)</li>
</ul>

<h3>Falling Solar Prices — The Trend Continues</h3>
<table>
<thead><tr><th>Year</th><th>Avg Solar Tariff (₹/kWh)</th><th>Module Price ($/W)</th></tr></thead>
<tbody>
<tr><td>2015</td><td>₹7.00</td><td>$0.65</td></tr>
<tr><td>2018</td><td>₹2.44</td><td>$0.35</td></tr>
<tr><td>2021</td><td>₹1.99</td><td>$0.22</td></tr>
<tr><td>2024</td><td>₹2.15</td><td>$0.12</td></tr>
<tr><td>2030 (est.)</td><td>₹1.50</td><td>$0.08</td></tr>
</tbody>
</table>

<h3>What This Means for Homeowners</h3>
<ul>
<li>Solar installation costs will continue falling — but don't wait too long</li>
<li>Electricity tariffs will keep rising — solar savings grow every year</li>
<li>Grid integration improving — net metering becoming more accessible</li>
<li>Battery storage becoming affordable — energy independence closer than ever</li>
</ul>

<h3>What This Means for Solar Businesses</h3>
<ul>
<li>Massive market opportunity — only 2% of rooftops have solar currently</li>
<li>Government push means sustained demand for 10+ years</li>
<li>Skilled installer shortage — trained workforce commands premium</li>
<li>New business models: Solar leasing, PPA, community solar emerging</li>
</ul>

<h3>India's Solar Manufacturing Push</h3>
<p>Under the PLI (Production-Linked Incentive) scheme, India is building 50+ GW of domestic solar manufacturing capacity. Companies like Adani, Reliance, Waaree, and Tata are investing billions. By 2026, India aims to be self-sufficient in solar panels — reducing import dependence from China.</p>
    `,
  },
  // ── 2026 Government & Policy Blog Posts ──────────────────────────────────

  {
    slug: 'pm-surya-ghar-muft-bijli-yojana-2026-complete-guide',
    title: 'PM Surya Ghar Muft Bijli Yojana 2026 — Subsidy Amount, Eligibility & How to Apply',
    description: 'Complete updated guide to PM Surya Ghar Muft Bijli Yojana 2026. Subsidy increased to ₹18,000/kWp, 20.8 lakh households enrolled. Step-by-step application process at pmsuryaghar.gov.in.',
    date: '2026-03-06',
    readTime: '9 min read',
    category: 'Government Schemes',
    content: `
<h2>PM Surya Ghar Muft Bijli Yojana 2026 — Everything Updated</h2>
<p>PM Surya Ghar Muft Bijli Yojana is India's biggest rooftop solar scheme launched on February 13, 2024. As of early 2026, over <strong>20.8 lakh (2.08 million) households</strong> have installed rooftop solar under this scheme — and the government has increased the subsidy rate by 23% in January 2026.</p>

<h3>Key Updates in 2026</h3>
<ul>
<li><strong>CFA rate increased:</strong> From ₹14,588/kWp to ₹18,000/kWp (23% hike effective January 2026)</li>
<li><strong>Budget 2026 allocation:</strong> ₹22,000 crore dedicated to PM Surya Ghar acceleration</li>
<li><strong>Progress:</strong> 20.8 lakh households, 6.38 GW installed as of December 2025</li>
<li><strong>45% of beneficiaries</strong> now have zero electricity bills</li>
<li><strong>Monthly rate:</strong> ~70,000 installations per month (tenfold increase since launch)</li>
</ul>

<h3>Subsidy Amount in 2026</h3>
<table>
<thead><tr><th>System Size</th><th>Subsidy Amount</th><th>Your Cost (Approx)</th></tr></thead>
<tbody>
<tr><td>1 kW</td><td>₹30,000</td><td>₹30,000–₹48,000</td></tr>
<tr><td>2 kW</td><td>₹60,000</td><td>₹60,000–₹90,000</td></tr>
<tr><td>3 kW or above</td><td>₹78,000 (maximum)</td><td>₹90,000–₹1,30,000</td></tr>
</tbody>
</table>
<p><strong>Note:</strong> The ₹78,000 cap applies for systems 3 kW and above. Larger systems get the same maximum subsidy.</p>

<h3>Who Is Eligible?</h3>
<ul>
<li>Indian citizen owning a residential property</li>
<li>Valid electricity connection from a DISCOM</li>
<li>Structurally sound rooftop able to bear solar panels</li>
<li>No previous solar installation at the same address</li>
<li>All income categories eligible (not restricted to BPL)</li>
</ul>

<h3>How to Apply — Step by Step (2026)</h3>
<ol>
<li>Visit <strong>pmsuryaghar.gov.in</strong></li>
<li>Click "Apply for Rooftop Solar" and register with your mobile number</li>
<li>Enter your electricity consumer number and select your DISCOM</li>
<li>Fill the application form — your details, roof area, required system size</li>
<li>Submit application — you'll receive an acknowledgement number</li>
<li>DISCOM will conduct a site inspection (within 30 days)</li>
<li>Select an MNRE-empanelled installer from the portal's approved list</li>
<li>Installer completes the installation</li>
<li>Submit completion certificate and net meter application</li>
<li>DISCOM installs bidirectional meter</li>
<li><strong>Subsidy credited directly to your bank account</strong> within 30 days of commissioning</li>
</ol>

<h3>Documents Required</h3>
<ul>
<li>Aadhaar card (linked to mobile number)</li>
<li>Latest electricity bill (showing consumer number)</li>
<li>Bank account details (for subsidy credit — must be Aadhaar-linked)</li>
<li>Property ownership proof (sale deed, property tax receipt)</li>
<li>Passport-size photograph</li>
<li>Roof photographs</li>
</ul>

<h3>Top Performing States (December 2025)</h3>
<table>
<thead><tr><th>State</th><th>Installations</th><th>Capacity</th></tr></thead>
<tbody>
<tr><td>Gujarat</td><td>11+ lakh</td><td>6,412 MW</td></tr>
<tr><td>Rajasthan</td><td>Strong performer</td><td>Top 3</td></tr>
<tr><td>Maharashtra</td><td>Strong performer</td><td>Top 5</td></tr>
<tr><td>Tamil Nadu</td><td>Strong performer</td><td>Top 5</td></tr>
</tbody>
</table>

<h3>Bank Loans for PM Surya Ghar</h3>
<p>Public Sector Banks have sanctioned over <strong>5.79 lakh loans worth ₹10,907 crore</strong> under PM Surya Ghar. Key features:</p>
<ul>
<li>Collateral-free loans up to ₹2 lakh</li>
<li>Interest rate: ~7% per annum</li>
<li>Loan tenure: up to 10 years</li>
<li>Available at all nationalized banks — SBI, Bank of Baroda, Canara Bank, PNB, etc.</li>
</ul>

<h3>What Happens After Installation?</h3>
<ul>
<li>Your meter runs backward when solar produces more than you use</li>
<li>Excess units credited to your electricity account</li>
<li>Monthly bills reduced dramatically — 45% of beneficiaries now pay zero</li>
<li>25-year panel life means 20+ years of free electricity after break-even</li>
</ul>

<h3>Common Issues & Solutions</h3>
<ul>
<li><strong>DISCOM taking too long:</strong> File a grievance on the PM Surya Ghar portal under "Grievance" section — DISCOM has a 30-day legal deadline</li>
<li><strong>Installer not found:</strong> Use the portal's "Vendor Locator" feature to find MNRE-empanelled vendors in your pincode</li>
<li><strong>Subsidy not credited:</strong> Ensure your bank account is Aadhaar-linked (mandatory for DBT transfer)</li>
</ul>
    `,
  },

  {
    slug: 'pm-kusum-scheme-2026-solar-pump-farmers-guide',
    title: 'PM-KUSUM Scheme 2026 — Free Solar Pump for Farmers: Eligibility, Subsidy & Apply',
    description: 'PM-KUSUM scheme 2026 updated guide for Indian farmers. Get 60% subsidy on solar water pumps (3HP to 10HP). Budget 2026 doubled allocation to ₹5,000 crore. Apply now before deadline.',
    date: '2026-03-08',
    readTime: '8 min read',
    category: 'Government Schemes',
    content: `
<h2>PM-KUSUM Scheme 2026 — Solar Pumps for Indian Farmers</h2>
<p>PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan) is India's flagship solar scheme for farmers. In Budget 2026, the government <strong>nearly doubled the allocation to ₹5,000 crore</strong> from ₹2,600 crore — signalling massive scale-up. Over <strong>10 lakh solar pumps</strong> have been installed/solarized so far.</p>

<h3>Big Changes in 2026</h3>
<ul>
<li><strong>Budget allocation doubled:</strong> ₹2,600 crore → ₹5,000 crore in Budget 2026-27</li>
<li><strong>PM-KUSUM 2.0 coming:</strong> Government finalizing next phase with ₹50,000 crore outlay, agro-PV models, battery integration</li>
<li><strong>FY25 achievement:</strong> 4.4 lakh pumps installed (Component B) — 4.2x jump over previous year</li>
<li><strong>Component C surge:</strong> 2.6 lakh grid-connected pumps solarized — 25x more than FY24</li>
</ul>

<h3>Three Components of PM-KUSUM</h3>

<h4>Component A — Decentralized Solar Power Plants</h4>
<ul>
<li>Farmers can set up 500 kW to 2 MW solar plants on barren or agricultural land</li>
<li>Power sold to DISCOM at fixed tariff for 25 years</li>
<li>Central subsidy: 30% of cost</li>
<li>Target: 10,000 MW across India</li>
</ul>

<h4>Component B — Standalone Solar Pumps (Most Popular)</h4>
<ul>
<li>Replace diesel pumps with solar-powered pumps</li>
<li>Central subsidy: 30% of cost</li>
<li>State subsidy: 30% of cost (varies by state)</li>
<li>Farmer pays: Only 40% (often further subsidized by state)</li>
<li>Target: 14 lakh pumps</li>
</ul>

<h4>Component C — Solarization of Grid-Connected Pumps</h4>
<ul>
<li>Add solar panel to your existing electric pump</li>
<li>Excess solar power sold back to grid — extra income for farmers</li>
<li>Target: 35 lakh pumps</li>
</ul>

<h3>Subsidy Amount for Solar Pumps (Component B)</h3>
<table>
<thead><tr><th>Pump Capacity</th><th>Total Cost</th><th>Farmer's Share (40%)</th><th>Annual Diesel Saving</th></tr></thead>
<tbody>
<tr><td>3 HP</td><td>₹1,50,000–₹2,00,000</td><td>₹30,000–₹40,000</td><td>₹50,000–₹80,000</td></tr>
<tr><td>5 HP</td><td>₹2,20,000–₹2,80,000</td><td>₹44,000–₹56,000</td><td>₹80,000–₹1,20,000</td></tr>
<tr><td>7.5 HP</td><td>₹3,00,000–₹3,80,000</td><td>₹60,000–₹76,000</td><td>₹1,20,000–₹1,80,000</td></tr>
<tr><td>10 HP</td><td>₹4,00,000–₹5,00,000</td><td>₹80,000–₹1,00,000</td><td>₹1,80,000–₹2,50,000</td></tr>
</tbody>
</table>

<h3>State-Wise PM-KUSUM Performance 2025-26</h3>
<table>
<thead><tr><th>State</th><th>Allocation</th><th>Special Features</th></tr></thead>
<tbody>
<tr><td>Maharashtra</td><td>₹1,154 crore</td><td>Top recipient, 250% increase vs FY24</td></tr>
<tr><td>Rajasthan</td><td>₹400 crore</td><td>50,000 pumps, first "green budget"</td></tr>
<tr><td>Karnataka</td><td>₹752 crore</td><td>50% state support, farmer pays only 20%</td></tr>
<tr><td>Uttar Pradesh</td><td>₹509 crore</td><td>Strong Component B push</td></tr>
<tr><td>Madhya Pradesh</td><td>Large allocation</td><td>10 GW decentralized target</td></tr>
</tbody>
</table>

<h3>How to Apply for PM-KUSUM Solar Pump</h3>
<ol>
<li>Visit your state's agriculture department or renewable energy agency website</li>
<li>Register using Aadhaar-linked mobile number</li>
<li>Fill the online application: land details, water source type (borewell/open well/canal), pump capacity needed</li>
<li>Upload required documents</li>
<li>After approval, choose from the list of government-empanelled vendors</li>
<li>Pay your 40% farmer share to the vendor</li>
<li>Vendor installs the solar pump (typically within 60 days of order)</li>
<li>Subsidy (60%) paid directly to vendor by government</li>
</ol>

<h3>Documents Required</h3>
<ul>
<li>Aadhaar card + PAN card</li>
<li>Land documents (7/12 extract, khatauni, or equivalent)</li>
<li>Electricity bill (if existing connection) or no-objection certificate</li>
<li>Bank passbook copy (Aadhaar-linked)</li>
<li>Proof of water source (borewell certificate, etc.)</li>
<li>Passport-size photograph</li>
</ul>

<h3>PM-KUSUM 2.0 — What's Coming</h3>
<p>The government is finalizing PM-KUSUM 2.0 as the successor scheme post-March 2026:</p>
<ul>
<li>Estimated outlay: ~₹50,000 crore (vs ₹34,422 crore current phase)</li>
<li>New: Agro-photovoltaic (agro-PV) models — grow crops under elevated solar panels</li>
<li>New: Battery storage integration for reliability</li>
<li>Expanded feeder-level solarisation across more states</li>
<li>Higher private sector participation</li>
</ul>
    `,
  },

  {
    slug: 'solar-subsidy-india-2026-state-wise-complete-guide',
    title: 'Solar Subsidy India 2026 — State-Wise Complete Guide (Maharashtra, Gujarat, Karnataka, UP)',
    description: 'Complete state-wise solar subsidy guide for India 2026. Central PM Surya Ghar subsidy ₹78,000 + state-specific incentives for Maharashtra, Gujarat, Rajasthan, Karnataka, UP, MP, Delhi.',
    date: '2026-03-10',
    readTime: '10 min read',
    category: 'Government Schemes',
    content: `
<h2>Solar Subsidy in India 2026 — State-Wise Complete Guide</h2>
<p>India offers solar subsidies at two levels — <strong>central government (PM Surya Ghar)</strong> and <strong>state-specific schemes</strong>. In many states, you can stack both subsidies to bring your installation cost down by 50-70%. Here's the definitive 2026 guide.</p>

<h3>Central Government Subsidy (Available in All States)</h3>
<table>
<thead><tr><th>System Size</th><th>Subsidy</th><th>CFA Rate (2026)</th></tr></thead>
<tbody>
<tr><td>Up to 1 kW</td><td>₹30,000</td><td>₹18,000/kWp</td></tr>
<tr><td>2 kW</td><td>₹60,000</td><td>₹18,000/kWp</td></tr>
<tr><td>3 kW and above</td><td>₹78,000 (max)</td><td>Capped at ₹78,000</td></tr>
</tbody>
</table>
<p>The CFA (Central Financial Assistance) rate was increased by <strong>23% in January 2026</strong> from ₹14,588/kWp to ₹18,000/kWp — your subsidy amount increased.</p>

<h3>Maharashtra — Ghar Ghar Solar + SMART Solar</h3>
<ul>
<li><strong>Ghar Ghar Solar Campaign:</strong> Ultra-low upfront cost — households pay only ~1/3 in installments, rest through electricity bill savings</li>
<li><strong>SMART Solar Scheme:</strong> Additional 40% subsidy for low-consumption homes (under 100 units/month), BPL, SC/ST households</li>
<li>MSEDCL group net metering for housing societies — multiple flats share one solar installation</li>
<li>MERC allows net metering capacities up to 5 MW for commercial consumers</li>
<li>PM KUSUM allocation: ₹1,154 crore (250% increase vs previous year)</li>
</ul>
<p><strong>Total subsidy for eligible Maharashtra consumers:</strong> Central ₹78,000 + State up to 40% of system cost</p>

<h3>Gujarat — SURYA Gujarat Yojana</h3>
<ul>
<li><strong>SURYA Gujarat (Surya Urja Rooftop Yojana):</strong> Additional ₹40,000 state subsidy on top of central PM Surya Ghar subsidy</li>
<li>Gujarat is India's #1 state: 11+ lakh installations, 6,412 MW rooftop solar</li>
<li>Gujarat Integrated Renewable Energy Policy-2025 launched</li>
<li><strong>Kisan Suryoday Yojana:</strong> Daytime agricultural power — ₹2,175 crore allocated</li>
<li>Waiver on electricity duty for solar power plants</li>
<li>GEDA manages all applications — geda.gujarat.gov.in</li>
</ul>
<p><strong>Total subsidy (Gujarat):</strong> Central ₹78,000 + SURYA Gujarat ₹40,000 = up to <strong>₹1,18,000</strong></p>

<h3>Rajasthan — India's Solar Powerhouse</h3>
<ul>
<li>Rajasthan has highest solar radiation in India — best ROI for solar investment</li>
<li>Residential subsidy: 40% for systems up to 3 kW; 20% for 3–10 kW</li>
<li>First state to announce a "green budget" — ₹400 crore for PM KUSUM solar pumps</li>
<li>₹559 crore from state fund for solar-powered minor irrigation projects</li>
<li>RVUNL manages state solar applications</li>
</ul>

<h3>Karnataka — DSPV Policy & Virtual Net Metering</h3>
<ul>
<li>Karnataka overhauled rooftop solar as <strong>DSPV (Distributed Solar PV)</strong> effective July 1, 2025</li>
<li><strong>Virtual Net Metering (VNM):</strong> Housing societies can share solar generation across multiple flats from one installation (minimum 5 kW)</li>
<li>BESCOM net metering export rate: ₹3.57/unit — one of India's best rates</li>
<li>Component B solar pump support: 50% state subsidy (farmer pays only 20%); ₹752 crore for 40,000 pumps</li>
<li>Residential subsidy up to 40% via KREDL</li>
</ul>

<h3>Delhi — ₹2/Unit Generation Incentive</h3>
<ul>
<li>PM Surya Ghar central subsidy available (₹78,000 max)</li>
<li><strong>DERC generation incentive:</strong> Additional ₹2 per unit generated for 5 years</li>
<li>For a 3 kW system generating 4,500 units/year — extra ₹9,000/year</li>
<li>Free net meter installation by BSES/Tata Power Delhi</li>
<li>Delhi's solar target: 4.5 GW by 2027</li>
</ul>

<h3>Uttar Pradesh — UPNEDA Additional Subsidy</h3>
<ul>
<li>PM Surya Ghar central subsidy available</li>
<li><strong>UPNEDA additional state subsidy:</strong> ₹15,000/kW, capped at ₹30,000 for residential consumers</li>
<li>Can be combined with central PM Surya Ghar subsidy</li>
<li>₹509 crore for PM KUSUM in FY2025-26</li>
<li>Apply via UPNEDA portal: upneda.org.in</li>
</ul>

<h3>Madhya Pradesh</h3>
<ul>
<li>40% subsidy on solar rooftops via PM Surya Ghar</li>
<li>PM KUSUM Component A & C SOPs launched — 10 GW decentralized solar target</li>
<li>MPUVNL manages applications: mpuvnl.nic.in</li>
<li>Strong push for government building solarization</li>
</ul>

<h3>How to Get Maximum Subsidy — Stacking Strategy</h3>
<ol>
<li>Apply on <strong>pmsuryaghar.gov.in</strong> for central subsidy first</li>
<li>Simultaneously apply on your <strong>state renewable energy agency website</strong> for state subsidy</li>
<li>Use a single MNRE-empanelled installer who handles both applications</li>
<li>Submit combined documents to avoid duplication</li>
<li>Ensure your bank account is Aadhaar-linked (mandatory for DBT)</li>
</ol>

<h3>Important: ALMM Compliance from June 2026</h3>
<p>From June 2026, only solar modules on the <strong>ALMM (Approved List of Models and Manufacturers) List-II</strong> are eligible for government subsidies. Ensure your installer uses ALMM-listed panels — non-compliant panels will not qualify for PM Surya Ghar or state subsidies.</p>
    `,
  },

  {
    slug: 'budget-2026-solar-energy-what-changed',
    title: 'Budget 2026 Solar Energy — ₹22,000 Crore for Rooftop Solar, Customs Duty Cuts & What Changed',
    description: 'Union Budget 2026-27 solar energy announcements decoded. ₹22,000 crore for PM Surya Ghar, ₹5,000 crore for PM-KUSUM, customs duty cuts on solar glass and modules. Impact on solar prices.',
    date: '2026-03-12',
    readTime: '7 min read',
    category: 'Government Schemes',
    content: `
<h2>Union Budget 2026-27 — What Changed for Solar Energy in India</h2>
<p>The Union Budget presented on February 1, 2026 gave a massive push to India's solar sector. Total renewable energy allocation increased 30% to ₹3.29 lakh crore, with solar getting the lion's share. Here's everything that changed and what it means for you.</p>

<h3>Key Budget 2026 Solar Announcements</h3>
<table>
<thead><tr><th>Item</th><th>2025 Allocation</th><th>2026 Allocation</th><th>Change</th></tr></thead>
<tbody>
<tr><td>Total Solar Sector</td><td>₹2,42,240 crore</td><td>₹3,05,390 crore</td><td>+26%</td></tr>
<tr><td>PM Surya Ghar</td><td>Not separately disclosed</td><td>₹22,000 crore</td><td>Major increase</td></tr>
<tr><td>PM-KUSUM</td><td>₹2,600 crore</td><td>₹5,000 crore</td><td>+92%</td></tr>
<tr><td>Total Renewables</td><td>₹2,53,190 crore</td><td>₹3,29,147 crore</td><td>+30%</td></tr>
</tbody>
</table>

<h3>Customs Duty Changes — Impact on Solar Prices</h3>

<h4>Good News — Duties Reduced</h4>
<ul>
<li><strong>Sodium Antimonate</strong> (raw material for solar glass): BCD reduced from 7.5% → Nil</li>
<li><strong>Solar modules:</strong> Effective duty reduced to 20% through rebalancing of BCD and cess</li>
<li><strong>Solar cell duties:</strong> Lowered via duty structure rebalancing</li>
<li><strong>Capital goods for lithium-ion (BESS) manufacturing:</strong> BCD exemptions extended</li>
<li><strong>Critical mineral processing equipment:</strong> BCD exempted</li>
</ul>

<h4>Watch Out — BCD Exemptions Expiring</h4>
<ul>
<li>BCD exemptions for silicon used in un-diffused wafers will <strong>lapse from April 1, 2026</strong></li>
<li>This may slightly increase upstream manufacturing costs but impact on end consumer is minimal</li>
</ul>

<h3>What This Means for Solar Buyers</h3>
<ul>
<li>Solar module prices expected to remain stable or decrease slightly as manufacturing input costs fall</li>
<li>Battery storage (BESS) systems will become more affordable — extended capital goods exemptions reduce manufacturing cost</li>
<li>Domestic manufacturing (PLI) gets stronger support — more Indian-made panels available</li>
<li>PM Surya Ghar funding secured for 2026-27 — subsidy payments will continue without disruption</li>
</ul>

<h3>New Financial Infrastructure — Infrastructure Risk Guarantee Fund</h3>
<p>Budget 2026 introduced a new Infrastructure Risk Guarantee Fund that provides partial credit guarantees to banks lending for large Battery Energy Storage System (BESS) projects. This makes grid-scale battery storage bankable — crucial for managing India's growing solar surplus during peak afternoon hours.</p>

<h3>CCUS Fund — ₹20,000 Crore</h3>
<p>Budget 2026 announced a ₹20,000 crore Carbon Capture, Utilization and Storage (CCUS) fund. While not directly solar-related, this signals India's long-term clean energy commitment and creates new opportunities for solar+storage projects.</p>

<h3>What Budget 2026 Did NOT Do</h3>
<ul>
<li>No new dedicated income tax deduction for individual solar buyers (existing provisions apply)</li>
<li>Subsidy cap of ₹78,000 per household was not increased (CFA rate was increased in January 2026 separately)</li>
<li>No change in GST rate on solar systems (remains at 5%)</li>
</ul>

<h3>Overall Impact on Solar Sector</h3>
<p>Budget 2026 is strongly positive for India's solar sector:</p>
<ul>
<li>Record funding ensures scheme continuity through 2026-27</li>
<li>Nearly doubled PM-KUSUM budget benefits 5 crore+ farmers</li>
<li>Customs duty relief reduces system costs</li>
<li>BESS support ensures grid can absorb more solar — removes a key scaling barrier</li>
<li>India's solar sector grew 43% in 2025 (36.6 GW added) — Budget 2026 sustains this momentum</li>
</ul>
    `,
  },

  {
    slug: 'net-metering-india-2026-state-rules-guide',
    title: 'Net Metering India 2026 — State-by-State Rules, Limits, Application & New Changes',
    description: 'Complete net metering guide India 2026. Karnataka DSPV virtual net metering, Maharashtra 5 MW limit, Delhi free net meter, Kerala restrictions. How to apply and avoid DISCOM delays.',
    date: '2026-03-14',
    readTime: '8 min read',
    category: 'Guides',
    content: `
<h2>Net Metering in India 2026 — Complete State-Wise Guide</h2>
<p>Net metering rules changed significantly across Indian states in 2025-2026. Karnataka introduced Virtual Net Metering, Maharashtra expanded limits to 5 MW, and the draft National Electricity Policy 2026 signals a shift toward storage-integrated solar. Here's the latest guide.</p>

<h3>How Net Metering Works (Quick Recap)</h3>
<ol>
<li>Your solar panels generate electricity</li>
<li>You use what you need — excess flows back to the DISCOM grid</li>
<li>Your meter runs backward — units credited to your account</li>
<li>Monthly bill: You pay only for NET units (imports minus exports)</li>
</ol>
<p><strong>Example:</strong> Monthly consumption 400 units. Solar generates 350 units. You pay for only 50 units instead of 400 — <strong>87.5% bill reduction.</strong></p>

<h3>Big Changes in Net Metering (2025-2026)</h3>

<h4>Karnataka — Most Progressive (July 2025)</h4>
<ul>
<li>Renamed system as <strong>DSPV (Distributed Solar PV)</strong></li>
<li>Introduced <strong>Virtual Net Metering (VNM):</strong> Housing societies, institutions can share one solar plant's output across multiple consumer accounts — minimum 5 kW</li>
<li>Group Net Metering (GNM) also available</li>
<li>Export rate: ₹3.57/unit — one of India's best rates</li>
<li>Apply: BESCOM portal (bescom.org)</li>
</ul>

<h4>Maharashtra — Expanded to 5 MW</h4>
<ul>
<li>MERC enabled net-metered capacities up to <strong>5 MW</strong> for specific C&I and public sector consumers</li>
<li>Group net metering and Virtual Net Metering available for housing societies</li>
<li>Residential: Net metering available for systems up to 10 kW typically</li>
<li>MSEDCL area: Apply at mahadiscom.in</li>
</ul>

<h4>Delhi — Best for Consumers</h4>
<ul>
<li>Free net meter installation by BSES/Tata Power Delhi</li>
<li>Export credited at consumption tariff rate</li>
<li>Additional ₹2/unit generation incentive for 5 years (DERC)</li>
<li>No capacity restriction for residential consumers</li>
</ul>

<h4>Kerala — Becoming Restrictive</h4>
<ul>
<li>Draft proposal to restrict residential net metering to ≤3 kW</li>
<li>KSEB facing financial pressure from net metering losses</li>
<li>Commercial consumers largely unaffected</li>
<li>Apply at KSEB portal before any new restrictions are notified</li>
</ul>

<h4>Gujarat — Strong Policy</h4>
<ul>
<li>Net metering up to 1 MW for residential and commercial</li>
<li>Export at consumption tariff rate</li>
<li>PGVCL/UGVCL/DGVCL — apply at your local DISCOM portal</li>
</ul>

<h4>Odisha — Battery-Friendly Update</h4>
<ul>
<li>OERC formally included <strong>hybrid inverters</strong> in net metering framework</li>
<li>Battery storage can now be integrated with net-metered solar systems</li>
<li>Progressive step for energy independence</li>
</ul>

<h3>Net Metering Limits by State</h3>
<table>
<thead><tr><th>State</th><th>Residential Limit</th><th>Commercial Limit</th><th>Export Rate</th></tr></thead>
<tbody>
<tr><td>Karnataka</td><td>Up to 500 kW</td><td>Up to 500 kW</td><td>₹3.57/unit</td></tr>
<tr><td>Maharashtra</td><td>Up to 10 kW typical</td><td>Up to 5 MW</td><td>Consumption tariff</td></tr>
<tr><td>Gujarat</td><td>Up to 1 MW</td><td>Up to 1 MW</td><td>Consumption tariff</td></tr>
<tr><td>Delhi</td><td>No restriction</td><td>No restriction</td><td>Consumption tariff + ₹2/unit incentive</td></tr>
<tr><td>Tamil Nadu</td><td>Up to 1 MW</td><td>Up to 1 MW</td><td>₹2.25/unit</td></tr>
<tr><td>Rajasthan</td><td>Up to 1 MW</td><td>Up to 1 MW</td><td>Consumption tariff</td></tr>
<tr><td>UP</td><td>Up to 500 kW</td><td>Up to 500 kW</td><td>Consumption tariff</td></tr>
<tr><td>Kerala</td><td>Up to 5 kW (proposed)</td><td>Up to 500 kW</td><td>Consumption tariff</td></tr>
</tbody>
</table>

<h3>How to Apply for Net Metering</h3>
<ol>
<li>Install solar through MNRE-approved installer</li>
<li>Installer submits net metering application to DISCOM on your behalf (or you apply via DISCOM portal)</li>
<li>DISCOM inspection within 30 working days (legal requirement)</li>
<li>Bidirectional meter installed by DISCOM</li>
<li>Net metering activated — check first bill to confirm credits</li>
</ol>

<h3>DISCOM Delays — How to Fight Back</h3>
<ul>
<li>DISCOMs are legally required to connect within 30 days under the Electricity Rights of Consumers Rules</li>
<li>If delayed: File a complaint on the PM Surya Ghar portal → "Grievance" section</li>
<li>Escalate to your State Electricity Regulatory Commission (SERC) if DISCOM is unresponsive</li>
<li>National Consumer Helpline: 1800-11-4000</li>
</ul>

<h3>Virtual Net Metering — Great for Apartments</h3>
<p>Available in Karnataka and Maharashtra, Virtual Net Metering allows a housing society to install one large solar plant on the terrace and distribute the generated units proportionally to individual flats' electricity accounts. This means individual flat owners benefit even without their own dedicated solar panels — a game-changer for urban India.</p>

<h3>Draft National Electricity Policy 2026 — What's Changing</h3>
<p>The draft NEP 2026 signals a future shift: for new consumers with systems above 5 kW, net metering may be replaced by gross metering (sell all generation at a fixed feed-in tariff) or storage-integrated systems. <strong>Existing net metering consumers will be grandfathered</strong> — so install now to lock in net metering benefits before policy changes.</p>
    `,
  },

  {
    slug: 'solar-tax-benefits-business-india-2026',
    title: 'Solar Tax Benefits for Businesses in India 2026 — Accelerated Depreciation, Section 80-IA & GST',
    description: 'Complete tax guide for commercial solar in India 2026. 40% accelerated depreciation benefit, Section 80-IA 100% profit exemption, 5% GST, and state-level electricity duty waivers explained.',
    date: '2026-03-16',
    readTime: '7 min read',
    category: 'Commercial Solar',
    content: `
<h2>Solar Tax Benefits for Indian Businesses in 2026</h2>
<p>For businesses, commercial solar is not just an energy investment — it's a tax planning tool. Between accelerated depreciation, profit tax exemption, and GST benefits, the effective cost of a solar installation can be reduced by 30-50% for a profitable business. Here's the complete 2026 guide.</p>

<h3>1. Accelerated Depreciation — Section 32, Income Tax Act</h3>
<p>This is the single biggest tax benefit for commercial solar in India.</p>
<ul>
<li>Solar power plants fall under the <strong>40% depreciation block</strong></li>
<li>If commissioned and in use for <strong>more than 180 days</strong> in the financial year: <strong>40% depreciation in Year 1</strong></li>
<li>If in use for <strong>less than 180 days</strong>: 20% depreciation in Year 1 (half rate rule)</li>
</ul>

<h4>Real Example — 100 kW Factory Solar (₹50 Lakhs)</h4>
<table>
<thead><tr><th>Item</th><th>Amount</th></tr></thead>
<tbody>
<tr><td>System Cost</td><td>₹50,00,000</td></tr>
<tr><td>Depreciation (40% Year 1)</td><td>₹20,00,000</td></tr>
<tr><td>Tax Saved (30% bracket)</td><td>₹6,00,000</td></tr>
<tr><td>Annual Electricity Saving</td><td>₹15,00,000</td></tr>
<tr><td>Total Year 1 Benefit</td><td>₹21,00,000</td></tr>
<tr><td>Effective Payback Period</td><td>~2.4 years</td></tr>
</tbody>
</table>
<p><strong>Tip:</strong> Commission your solar plant before September 30 (before 180-day cutoff from April 1) to maximize Year 1 depreciation at 40%.</p>

<h3>2. Section 80-IA — 100% Profit Tax Holiday</h3>
<ul>
<li>Solar power generation businesses can claim <strong>100% exemption on profits</strong></li>
<li>For any <strong>10 consecutive years within the first 15 years</strong> of operation</li>
<li>Available to companies/entities generating and distributing solar power</li>
<li>Qualifying condition: Must have begun generation before cut-off date</li>
<li>Most relevant for: IPPs, solar farm developers, large C&I solar with third-party sale</li>
</ul>

<h3>3. GST at 5% on Solar Systems</h3>
<p>Solar power generating systems and components attract only <strong>5% GST</strong> compared to 18% for most goods:</p>
<ul>
<li>Solar photovoltaic cells: 5% GST</li>
<li>Solar modules/panels: 5% GST</li>
<li>Solar inverters: 5% GST (as part of solar system)</li>
<li>Solar batteries (standalone): 12% GST</li>
<li>Installation charges: 5% GST (if bundled with supply)</li>
</ul>
<p>This lower GST reduces your initial investment cost compared to other capital equipment.</p>

<h3>4. State-Level Tax & Duty Benefits</h3>
<table>
<thead><tr><th>State</th><th>Benefit</th></tr></thead>
<tbody>
<tr><td>Gujarat</td><td>Waiver on electricity duty for solar power plants</td></tr>
<tr><td>Karnataka</td><td>Property tax exemptions in select categories</td></tr>
<tr><td>Rajasthan</td><td>Electricity levy waiver for solar rooftop adopters</td></tr>
<tr><td>Maharashtra</td><td>Stamp duty exemption on solar plant agreements</td></tr>
<tr><td>Tamil Nadu</td><td>Assessment fee waiver for TANGEDCO solar connections</td></tr>
</tbody>
</table>

<h3>5. CAPEX vs OPEX Model — Tax Implications</h3>

<h4>CAPEX (Own the system)</h4>
<ul>
<li>Claim depreciation, Section 80-IA benefits</li>
<li>Maximum long-term savings (20+ years)</li>
<li>Best for: Profitable businesses with tax liability</li>
</ul>

<h4>OPEX/PPA (Third party owns, you pay per unit)</h4>
<ul>
<li>Zero capital investment</li>
<li>Monthly PPA payments are fully deductible as operating expenses</li>
<li>No depreciation benefit (third party owner claims it)</li>
<li>Best for: Businesses wanting to conserve capital, startups, loss-making entities</li>
</ul>

<h3>Budget 2026 Impact on Solar Tax Benefits</h3>
<ul>
<li>No new dedicated solar tax deductions introduced in Budget 2026</li>
<li>Customs duty reduction lowers system cost → lower depreciation base (smaller absolute tax saving, but better ROI)</li>
<li>Accelerated depreciation (40%) continues unchanged</li>
<li>Section 80-IA continues for qualifying power generators</li>
</ul>

<h3>How to Claim These Benefits</h3>
<ol>
<li>Ensure solar system is capitalized correctly in your books as a Plant & Machinery asset</li>
<li>Maintain installation and commissioning certificate from installer</li>
<li>File depreciation claim in ITR under Schedule DPM</li>
<li>For Section 80-IA: File Form 10CCB (audit report) for claiming profit deduction</li>
<li>Consult a CA with renewable energy experience for maximum optimization</li>
</ol>
    `,
  },

  {
    slug: 'india-solar-manufacturing-pli-scheme-2026',
    title: 'PLI Scheme Solar Manufacturing India 2026 — Progress, 29 GW Cell Capacity & Impact on Prices',
    description: 'India\'s PLI scheme for high-efficiency solar PV modules 2026 update. 29 GW solar cell capacity, 120 GW module capacity, key manufacturers Adani, Waaree, Vikram. Impact on solar panel prices.',
    date: '2026-03-18',
    readTime: '7 min read',
    category: 'Industry News',
    content: `
<h2>PLI Scheme for Solar Manufacturing in India — 2026 Progress Update</h2>
<p>India's Production Linked Incentive (PLI) scheme for solar PV modules is reshaping the country's solar supply chain. As of mid-2025, India has <strong>29 GW of solar cell capacity</strong> and over <strong>120 GW of module capacity</strong> — a dramatic transformation from near-zero domestic manufacturing just 4 years ago.</p>

<h3>PLI Scheme Overview</h3>
<ul>
<li><strong>Full Name:</strong> PLI — National Programme on High Efficiency Solar PV Modules</li>
<li><strong>Implementing Agency:</strong> MNRE / SECI</li>
<li><strong>Tranche I (2021):</strong> 3 winners, 8,737 MW fully integrated manufacturing</li>
<li><strong>Tranche II (2023):</strong> 11 winners, 39,600 MW manufacturing capacity</li>
<li><strong>Total awarded:</strong> ~48,337 MW</li>
</ul>

<h3>Manufacturing Capacity Progress (June 2025)</h3>
<table>
<thead><tr><th>Component</th><th>Target</th><th>Achieved (June 2025)</th><th>Status</th></tr></thead>
<tbody>
<tr><td>Solar Cells</td><td>42 GW (by June 2026)</td><td>29 GW</td><td>On track</td></tr>
<tr><td>Solar Modules</td><td>65 GW</td><td>120 GW (total, incl. non-PLI)</td><td>Exceeded</td></tr>
<tr><td>Polysilicon</td><td>Large GW target</td><td>3.3 GW</td><td>Lagging</td></tr>
<tr><td>Wafers</td><td>Large GW target</td><td>5.3 GW</td><td>Lagging</td></tr>
</tbody>
</table>

<h3>Key PLI Manufacturers in India</h3>
<ul>
<li><strong>Adani Solar:</strong> Largest integrated solar manufacturer — polysilicon to modules</li>
<li><strong>Waaree Energies:</strong> Largest module manufacturer, 12 GW+ capacity</li>
<li><strong>Vikram Solar:</strong> Premium Topcon and PERC technology</li>
<li><strong>Tata Power Solar:</strong> Growing domestic cell and module capacity</li>
<li><strong>Shirdi Sai Electricals:</strong> Wafer manufacturing under PLI</li>
<li><strong>Premier Energies:</strong> Listed company, cell and module manufacturing</li>
</ul>

<h3>India's Strengths and Gaps in Solar Manufacturing</h3>

<h4>Strengths</h4>
<ul>
<li>Module capacity exceeds domestic demand — India now exports modules</li>
<li>Cell capacity growing rapidly — 29 GW is significant vs zero in 2021</li>
<li>Strong government policy consistency — PLI, BCD protection, ALMM</li>
<li>Competitive labor costs vs China</li>
</ul>

<h4>Gaps</h4>
<ul>
<li>Polysilicon: India produces only 3.3 GW worth — still heavily import-dependent from China</li>
<li>Wafers: 5.3 GW capacity vs much higher demand</li>
<li>Full supply chain independence (polysilicon to module) remains 2-3 years away</li>
</ul>

<h3>ALMM — Why It Matters for You</h3>
<p>The Approved List of Models and Manufacturers (ALMM) is India's quality certification for solar panels:</p>
<ul>
<li>From <strong>June 2026</strong>: Only ALMM List-II compliant modules qualify for government-subsidized installations</li>
<li>PM Surya Ghar, PM-KUSUM and all DISCOM net metering connections require ALMM modules</li>
<li>Always ask your installer for the ALMM certificate of the panels being installed</li>
<li>Check ALMM list at: mnre.gov.in/almm</li>
</ul>

<h3>How PLI Affects Solar Panel Prices</h3>
<ul>
<li>Indian-made modules are now price-competitive with Chinese imports</li>
<li>BCD (Basic Customs Duty) on imported modules: 40% — protects domestic manufacturers</li>
<li>Budget 2026 further reduced raw material import costs for domestic manufacturers</li>
<li>Expected: Solar panel prices to remain stable or decrease 5-10% by end of 2026 as cell capacity scales</li>
</ul>

<h3>What This Means for Solar Buyers</h3>
<ul>
<li>More domestic panel options — wider choice of quality Indian-made panels</li>
<li>Better quality assurance — ALMM compliance mandatory</li>
<li>Potential price reduction as competition increases among Indian manufacturers</li>
<li>Faster delivery — no customs clearance delays for domestic modules</li>
<li>Better after-sales support from domestic manufacturers</li>
</ul>
    `,
  },

  {
    slug: 'india-solar-target-2027-100gw-progress',
    title: 'India Solar Energy 2026-2027 — 135 GW Installed, 500 GW Target & Rooftop Progress Report',
    description: 'India solar energy progress report 2026. 135.8 GW installed, record 36.6 GW added in 2025. PM Surya Ghar 1 crore household target 2027, 500 GW renewable target 2030 — are we on track?',
    date: '2026-03-20',
    readTime: '7 min read',
    category: 'Industry News',
    content: `
<h2>India Solar Energy 2026 — Progress Report & 2027 Targets</h2>
<p>India's solar sector had a record-breaking 2025 — adding <strong>36.6 GW of solar capacity</strong>, a 43% jump over 2024. The country now has <strong>135.8 GW of total installed solar capacity</strong> and crossed the historic 100 GW solar milestone in January 2025. Here's a full progress report and what to expect in 2026-2027.</p>

<h3>India's Solar Milestones in 2025</h3>
<table>
<thead><tr><th>Milestone</th><th>Achievement</th></tr></thead>
<tbody>
<tr><td>Total solar installed capacity</td><td>135.8 GW (December 2025)</td></tr>
<tr><td>New solar added in 2025</td><td>36.6 GW (calendar year record)</td></tr>
<tr><td>Growth vs 2024</td><td>+43% (2024: 25.6 GW)</td></tr>
<tr><td>100 GW solar milestone crossed</td><td>January 2025</td></tr>
<tr><td>Total renewables installed</td><td>253.96 GW (November 2025)</td></tr>
<tr><td>Non-fossil % of total capacity</td><td>51.5% (crossed 50% for first time)</td></tr>
<tr><td>250 GW non-fossil milestone</td><td>August 2025</td></tr>
</tbody>
</table>

<h3>PM Surya Ghar — Rooftop Solar Progress</h3>
<table>
<thead><tr><th>Milestone</th><th>Target Date</th><th>Status</th></tr></thead>
<tbody>
<tr><td>10 lakh households</td><td>March 2025</td><td>✅ Achieved March 10, 2025</td></tr>
<tr><td>20 lakh households</td><td>October 2025</td><td>✅ Achieved (21.5 lakh by Oct 28)</td></tr>
<tr><td>40 lakh households</td><td>March 2026</td><td>⚠️ At risk — 20.8 lakh by Dec 2025</td></tr>
<tr><td>1 crore households</td><td>March 2027</td><td>🔴 Pace needs to double</td></tr>
</tbody>
</table>

<h3>India's Path to 500 GW by 2030</h3>
<p>India pledged 500 GW of non-fossil capacity by 2030 at COP26. Here's where we stand:</p>
<ul>
<li>Current non-fossil installed capacity: <strong>262.74 GW</strong> (52.5% of the 500 GW target achieved)</li>
<li>Required addition in remaining 4 years (2026-2030): ~237 GW</li>
<li>At 2025's record pace of 36.6 GW/year: 146 GW more in 4 years — <strong>will fall short</strong></li>
<li>Pace needs to increase to ~60 GW/year to hit the 2030 target</li>
<li>Government confident: Budget 2026 funding + PLI manufacturing scale-up expected to accelerate additions</li>
</ul>

<h3>State-Wise Solar Leaders (2025)</h3>
<table>
<thead><tr><th>State</th><th>Installed Solar Capacity</th><th>Rank</th></tr></thead>
<tbody>
<tr><td>Rajasthan</td><td>~32 GW</td><td>#1</td></tr>
<tr><td>Gujarat</td><td>~25 GW</td><td>#2</td></tr>
<tr><td>Karnataka</td><td>~20 GW</td><td>#3</td></tr>
<tr><td>Tamil Nadu</td><td>~16 GW</td><td>#4</td></tr>
<tr><td>Andhra Pradesh</td><td>~15 GW</td><td>#5</td></tr>
</tbody>
</table>

<h3>Rooftop Solar Target — 30 GW by 2027</h3>
<ul>
<li>Current rooftop solar: ~6.38 GW (PM Surya Ghar alone) + commercial rooftop</li>
<li>Target: 30 GW rooftop by FY 2027</li>
<li>The 1 crore household target (March 2027) would add ~3 GW alone</li>
<li>Gap: Significant — requires massive acceleration in both residential and commercial rooftop</li>
</ul>

<h3>Key Drivers for 2026-2027 Solar Growth</h3>
<ul>
<li><strong>PM Surya Ghar:</strong> ₹22,000 crore budget ensuring continued subsidies</li>
<li><strong>Falling costs:</strong> Solar now the cheapest electricity source at ₹2-3/unit</li>
<li><strong>Battery storage:</strong> Falling BESS prices enabling 24/7 solar use</li>
<li><strong>PLI manufacturing:</strong> Domestic panel supply scaling rapidly</li>
<li><strong>Green energy demand:</strong> India Inc's RE100 commitments driving corporate solar demand</li>
<li><strong>Agricultural solar:</strong> PM-KUSUM 2.0 bringing millions of farmers to solar</li>
</ul>

<h3>What This Means for You</h3>
<ul>
<li>If you're considering solar — install now while PM Surya Ghar subsidies are fully funded</li>
<li>Solar panel prices will continue to fall but subsidies may evolve — don't wait too long</li>
<li>Net metering policies are most favorable right now — future policies may shift to storage-integrated models</li>
<li>India's grid is becoming more solar-friendly with BESS integration — longer-term, solar-only systems become even more valuable</li>
</ul>
    `,
  },

  {
    slug: 'surya-gujarat-yojana-2026-guide',
    title: 'SURYA Gujarat Yojana 2026 — ₹40,000 Extra Subsidy, How to Apply & Documents',
    description: 'Complete guide to SURYA Gujarat Yojana 2026. Get ₹40,000 additional state subsidy on top of PM Surya Ghar ₹78,000. Total subsidy up to ₹1,18,000 for Gujarat rooftop solar. Apply on GEDA portal.',
    date: '2026-03-22',
    readTime: '6 min read',
    category: 'Government Schemes',
    content: `
<h2>SURYA Gujarat Yojana 2026 — India's Most Generous State Solar Scheme</h2>
<p>Gujarat is India's #1 state for rooftop solar with 11+ lakh installations and 6,412 MW capacity. The SURYA Gujarat Yojana (Surya Urja Rooftop Yojana) provides an additional ₹40,000 state subsidy on top of the central PM Surya Ghar subsidy — making Gujarat one of the most financially attractive states for going solar.</p>

<h3>Total Subsidy Available in Gujarat</h3>
<table>
<thead><tr><th>System Size</th><th>PM Surya Ghar (Central)</th><th>SURYA Gujarat (State)</th><th>Total Subsidy</th></tr></thead>
<tbody>
<tr><td>1 kW</td><td>₹30,000</td><td>Up to ₹40,000</td><td>Up to ₹70,000</td></tr>
<tr><td>2 kW</td><td>₹60,000</td><td>Up to ₹40,000</td><td>Up to ₹1,00,000</td></tr>
<tr><td>3 kW and above</td><td>₹78,000</td><td>Up to ₹40,000</td><td>Up to ₹1,18,000</td></tr>
</tbody>
</table>

<h3>SURYA Gujarat — Key Features</h3>
<ul>
<li>Additional ₹40,000 state subsidy per household</li>
<li>Available for all residential consumers with valid Gujarat DISCOM connection</li>
<li>Must be combined with PM Surya Ghar central subsidy application</li>
<li>Installation must use GEDA-approved and MNRE-empanelled vendors</li>
<li>Panels must be ALMM-compliant (BIS certified)</li>
</ul>

<h3>Kisan Suryoday Yojana — For Gujarat Farmers</h3>
<ul>
<li>₹2,175 crore allocated for providing daytime power to farmers</li>
<li>Solar feeders supplying power during daylight hours to agricultural connections</li>
<li>Reduces farmer dependence on unreliable nighttime power</li>
<li>Combined with PM-KUSUM for solar pump integration</li>
</ul>

<h3>Gujarat Electricity Duty Waiver</h3>
<p>Solar power plants in Gujarat benefit from a waiver on electricity duty — reducing the operating cost of grid-connected solar installations. This applies to:</p>
<ul>
<li>Residential rooftop solar plants</li>
<li>Commercial and industrial solar plants</li>
<li>Effective for the first 10 years of plant operation in most cases</li>
</ul>

<h3>How to Apply for SURYA Gujarat Yojana</h3>
<ol>
<li>Apply on <strong>pmsuryaghar.gov.in</strong> for central subsidy first (mandatory prerequisite)</li>
<li>Simultaneously visit <strong>geda.gujarat.gov.in</strong> for SURYA Gujarat application</li>
<li>Select a GEDA-approved vendor from the portal</li>
<li>Vendor handles installation, DISCOM net metering, and both subsidy applications</li>
<li>Central subsidy credited first (within 30 days of DISCOM commissioning)</li>
<li>State subsidy (SURYA Gujarat) credited subsequently through GEDA</li>
</ol>

<h3>Documents Required</h3>
<ul>
<li>Aadhaar card (linked to bank account)</li>
<li>Latest electricity bill (with consumer number)</li>
<li>Bank passbook (Aadhaar-linked, for DBT)</li>
<li>Property ownership documents</li>
<li>Roof photographs (at least 4 angles)</li>
<li>Passport-size photo</li>
</ul>

<h3>Gujarat Solar Success Story</h3>
<p>Gujarat's success is a blueprint for India:</p>
<ul>
<li>11+ lakh households have solar — highest in India</li>
<li>6,412 MW rooftop solar capacity — 1/3 of India's total rooftop</li>
<li>Total renewable capacity: 42.583 GW</li>
<li>Gujarat's solar target: 100 GW by 2030</li>
<li>Key success factors: Strong GEDA execution, high solar radiation, business-friendly environment</li>
</ul>

<h3>Other Gujarat Solar Schemes</h3>
<ul>
<li><strong>Gujarat Integrated Renewable Energy Policy-2025:</strong> Comprehensive framework for all renewable energy including solar</li>
<li><strong>Off-grid solar for tribal areas:</strong> 100% subsidy for remote tribal village electrification</li>
<li><strong>Solar parks:</strong> Gujarat has multiple large solar parks — Charanka (largest), Dholera SIR Solar</li>
<li><strong>Green hydrogen:</strong> Gujarat emerging as India's green hydrogen hub — solar-powered electrolysis</li>
</ul>
    `,
  },

  {
    slug: 'pm-kusum-2-0-india-farm-solar-next-phase',
    title: 'PM-KUSUM 2.0 — India\'s Next Farm Solar Scheme: What We Know So Far (2026-2027)',
    description: 'PM-KUSUM 2.0 latest news 2026. Expected ₹50,000 crore outlay, agro-photovoltaic models, battery storage for pumps, feeder solarisation. All updates on the successor to PM-KUSUM.',
    date: '2026-03-24',
    readTime: '6 min read',
    category: 'Government Schemes',
    content: `
<h2>PM-KUSUM 2.0 — What's Coming for Indian Farmers</h2>
<p>The current PM-KUSUM scheme ends in March 2026. The government is actively finalizing <strong>PM-KUSUM 2.0</strong> — the next phase with nearly 50% more funding and significant new features. Here's everything we know so far.</p>

<h3>Why PM-KUSUM 2.0?</h3>
<p>The original PM-KUSUM achieved impressive results — 10+ lakh solar pumps installed — but fell short of some targets. PM-KUSUM 2.0 aims to fix gaps and scale faster:</p>
<ul>
<li>Agriculture accounts for 18% of India's electricity consumption — massive solar opportunity</li>
<li>5+ crore farmers still use diesel pumps or unreliable grid power</li>
<li>Feeder-level solarisation reduces DISCOM agricultural subsidy burden — financial incentive for DISCOMs</li>
<li>Budget 2026 doubled PM-KUSUM to ₹5,000 crore — strong signal of PM-KUSUM 2.0 scale-up</li>
</ul>

<h3>Expected Features of PM-KUSUM 2.0</h3>

<h4>1. Much Larger Budget</h4>
<ul>
<li>Expected outlay: ~₹50,000 crore (current phase: ₹34,422 crore)</li>
<li>~45-50% funding increase over current scheme</li>
</ul>

<h4>2. Agro-Photovoltaic (Agro-PV) Models</h4>
<ul>
<li>Solar panels installed 3-4 metres above ground — crops grow underneath</li>
<li>Dual use of land: electricity + agriculture simultaneously</li>
<li>Studies show: Some crops (vegetables, medicinal plants) grow better under partial solar shade</li>
<li>Farmer earns from both crop yield AND solar power sale</li>
<li>This model is hugely popular in Japan, Germany — PM-KUSUM 2.0 brings it to India</li>
</ul>

<h4>3. Battery Storage Integration</h4>
<ul>
<li>Solar pumps can only run during daylight — battery storage extends operation to evenings</li>
<li>Farmers can pump water early morning and evening when crops need it</li>
<li>BESS integration costs partly subsidized under PM-KUSUM 2.0</li>
</ul>

<h4>4. Expanded Feeder-Level Solarisation</h4>
<ul>
<li>Solar installed at agricultural feeder level — all connected farmers benefit</li>
<li>DISCOM's agricultural power supply cost drops dramatically</li>
<li>Reduces DISCOM's annual subsidy burden from state government</li>
<li>Creates a financially sustainable model for agricultural solar</li>
</ul>

<h4>5. Higher Private Sector Participation</h4>
<ul>
<li>More transparent bidding process for Component A solar plants</li>
<li>Better revenue sharing models for farmer-developer partnerships</li>
<li>Private solar companies can help set up agro-PV projects with farmers</li>
</ul>

<h3>State-Wise PM-KUSUM 2.0 Expectations</h3>
<table>
<thead><tr><th>State</th><th>Expected Focus</th><th>Opportunity</th></tr></thead>
<tbody>
<tr><td>Rajasthan</td><td>Agro-PV for desert fringe agriculture</td><td>Highest solar radiation</td></tr>
<tr><td>Maharashtra</td><td>Feeder solarisation for sugarcane belt</td><td>Massive farm power demand</td></tr>
<tr><td>Gujarat</td><td>Integration with Kisan Suryoday Yojana</td><td>Proven infrastructure</td></tr>
<tr><td>UP + MP</td><td>Standalone pump scale-up</td><td>Largest farming populations</td></tr>
<tr><td>Punjab + Haryana</td><td>Feeder solarisation for paddy irrigation</td><td>High electricity subsidy burden</td></tr>
</tbody>
</table>

<h3>What Farmers Should Do Now</h3>
<ul>
<li><strong>Apply under current PM-KUSUM (before March 2026 deadline) if possible</strong> — current scheme's budget is nearly exhausted in some states</li>
<li>Register interest on your state agriculture portal for PM-KUSUM 2.0 updates</li>
<li>Join farmer producer organizations (FPOs) — PM-KUSUM 2.0 expected to have FPO-level group applications</li>
<li>Learn about agro-PV — contact MNRE or SECI for pilot project details in your state</li>
</ul>

<h3>Timeline</h3>
<ul>
<li><strong>March 2026:</strong> Current PM-KUSUM phase ends</li>
<li><strong>Q1 2026:</strong> PM-KUSUM 2.0 framework expected to be announced</li>
<li><strong>Q2 2026:</strong> State-level SOPs and applications expected to open</li>
<li><strong>FY 2026-27:</strong> Full implementation of PM-KUSUM 2.0 begins</li>
</ul>
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
