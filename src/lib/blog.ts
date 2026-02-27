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
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
