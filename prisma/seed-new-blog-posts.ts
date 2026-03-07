/**
 * seed-new-blog-posts.ts
 * Adds the 2 missing blog posts identified by Semrush audit
 *
 * Run: npx tsx prisma/seed-new-blog-posts.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') });

import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('\n🌱 Seeding 2 new blog posts for Semrush fix...\n');

  const posts = [
    {
      title: 'Solar Panel Cost in India 2025 — Complete Pricing Guide',
      slug: 'solar-panel-cost-india-2025',
      description: 'Comprehensive guide to solar panel costs in India for 2025-2026. Learn about cost per watt, system pricing, state-wise variations, subsidy impact, and top brands.',
      category: 'Guides',
      readTime: '12 min read',
      content: `# Solar Panel Cost in India 2025 — Complete Pricing Guide

**Last Updated:** March 7, 2026

Wondering how much solar panels cost in India in 2025? You're in the right place. This comprehensive guide breaks down solar panel pricing, system costs, state-wise variations, and how subsidies affect your final price.

## Quick Summary: Solar Panel Costs in India (2025)

| System Size | Total Cost (Before Subsidy) | After PM Surya Ghar Subsidy | Cost per Watt |
|-------------|----------------------------|------------------------------|---------------|
| 1 kW | ₹50,000 - ₹65,000 | ₹20,000 - ₹35,000 | ₹50 - ₹65 |
| 2 kW | ₹1,00,000 - ₹1,30,000 | ₹52,000 - ₹82,000 | ₹50 - ₹65 |
| 3 kW | ₹1,50,000 - ₹1,95,000 | ₹72,000 - ₹1,17,000 | ₹50 - ₹65 |
| 5 kW | ₹2,50,000 - ₹3,25,000 | ₹1,72,000 - ₹2,47,000 | ₹50 - ₹65 |
| 10 kW | ₹5,00,000 - ₹6,50,000 | ₹4,22,000 - ₹5,72,000 | ₹50 - ₹65 |

*Prices include panels, inverter, mounting structure, wiring, and installation. GST additional.*

---

## Understanding Solar Panel Pricing

### What Affects the Cost?

1. **Panel Quality & Brand**
   - Tier 1 brands (Tata, Adani, Vikram, Waaree): ₹25-₹35 per watt
   - Tier 2 brands (Luminous, Havells): ₹20-₹28 per watt
   - Tier 3 brands (local manufacturers): ₹15-₹22 per watt

2. **System Components**
   - Solar panels: 50-60% of total cost
   - Inverter: 15-20% of total cost
   - Mounting structure: 10-15%
   - Batteries (if off-grid): 25-35% extra
   - Installation labor: 5-10%

3. **Installation Type**
   - Rooftop residential: ₹50-₹65/watt
   - Commercial rooftop: ₹45-₹55/watt
   - Ground-mounted: ₹55-₹70/watt
   - Off-grid (with battery): ₹80-₹120/watt

4. **Location & Accessibility**
   - Easy rooftop access: Standard pricing
   - Difficult access or reinforcement needed: +10-20%
   - Remote locations: +15-25%

---

## Detailed Breakdown: Solar System Costs

### 1 kW Solar System
- **Generates:** 4-5 units per day (120-150 units/month)
- **Ideal for:** Small homes, 1-2 BHK apartments
- **Components:**
  - 3 panels of 330W each
  - 1 kW inverter
  - Mounting structure
  - Cables & accessories
- **Cost:** ₹50,000 - ₹65,000
- **After subsidy:** ₹20,000 - ₹35,000 (₹30,000 subsidy)

### 2 kW Solar System
- **Generates:** 8-10 units per day (240-300 units/month)
- **Ideal for:** 2-3 BHK homes
- **Components:**
  - 6 panels of 330W each
  - 2 kW inverter
  - Mounting structure
  - Cables & accessories
- **Cost:** ₹1,00,000 - ₹1,30,000
- **After subsidy:** ₹52,000 - ₹82,000 (₹48,000 subsidy)

### 3 kW Solar System (Most Popular)
- **Generates:** 12-15 units per day (360-450 units/month)
- **Ideal for:** 3-4 BHK homes
- **Components:**
  - 9 panels of 330W each
  - 3 kW inverter
  - Mounting structure
  - Cables & accessories
- **Cost:** ₹1,50,000 - ₹1,95,000
- **After subsidy:** ₹72,000 - ₹1,17,000 (₹78,000 subsidy)

### 5 kW Solar System
- **Generates:** 20-25 units per day (600-750 units/month)
- **Ideal for:** Large homes, villas, small businesses
- **Components:**
  - 15 panels of 330W each
  - 5 kW inverter
  - Mounting structure
  - Cables & accessories
- **Cost:** ₹2,50,000 - ₹3,25,000
- **After subsidy:** ₹1,72,000 - ₹2,47,000 (₹78,000 subsidy for residential)

### 10 kW Solar System
- **Generates:** 40-50 units per day (1,200-1,500 units/month)
- **Ideal for:** Commercial establishments, factories
- **Components:**
  - 30 panels of 330W each
  - 10 kW inverter
  - Mounting structure
  - Cables & accessories
- **Cost:** ₹5,00,000 - ₹6,50,000
- **After subsidy:** ₹4,22,000 - ₹5,72,000 (₹78,000 subsidy cap)

---

## State-Wise Solar Panel Price Variations

| State | Average Cost/Watt | Notes |
|-------|-------------------|-------|
| **Maharashtra** | ₹52-₹60 | High demand, many installers |
| **Gujarat** | ₹48-₹55 | Manufacturing hub, lower prices |
| **Rajasthan** | ₹50-₹58 | High solar potential |
| **Karnataka** | ₹51-₹60 | Tech hub, premium pricing |
| **Tamil Nadu** | ₹49-₹56 | Strong state policies |
| **Delhi** | ₹55-₹65 | Limited space, higher installation costs |
| **Uttar Pradesh** | ₹51-₹62 | Growing market |
| **Punjab** | ₹50-₹58 | Agricultural solar popular |
| **West Bengal** | ₹52-₹62 | Developing market |
| **Madhya Pradesh** | ₹50-₹60 | Average pricing |

**Why price variations?**
- Transport costs from manufacturing hubs
- Local competition levels
- State-specific subsidies and incentives
- Installation complexity (terrain, rooftop types)

---

## How PM Surya Ghar Subsidy Reduces Your Cost

### Subsidy Structure (2025-2026)

| System Size | Central Subsidy | Your Final Cost (Approx) |
|-------------|-----------------|--------------------------|
| 1-2 kW | ₹30,000 per kW | ₹20,000 - ₹82,000 |
| 2-3 kW | ₹18,000 per kW (above 2 kW) | ₹72,000 - ₹1,17,000 |
| 3-10 kW | ₹18,000 per kW (above 2 kW), max ₹78,000 | ₹1,72,000 - ₹5,72,000 |

**Example Calculation (3 kW system):**
- Total cost: ₹1,80,000
- Subsidy: ₹30,000 (first 2 kW) + ₹18,000 (next 1 kW) = ₹78,000
- **Final cost: ₹1,02,000**

**Additional State Subsidies:**
- Some states offer extra 10-20% subsidy
- Check with your State Nodal Agency (SNA)

---

## Top Solar Panel Brands & Their Pricing (2025)

### Tier 1 — Premium Quality
1. **Tata Solar**
   - Price: ₹32-₹38 per watt
   - Efficiency: 19-21%
   - Warranty: 25 years performance, 10 years product
   - Best for: Long-term reliability

2. **Adani Solar**
   - Price: ₹30-₹36 per watt
   - Efficiency: 18-20%
   - Warranty: 25 years performance, 10 years product
   - Best for: Commercial projects

3. **Vikram Solar**
   - Price: ₹28-₹34 per watt
   - Efficiency: 18-20%
   - Warranty: 25 years performance, 10 years product
   - Best for: All applications

4. **Waaree Solar**
   - Price: ₹27-₹33 per watt
   - Efficiency: 17-19%
   - Warranty: 25 years performance, 10 years product
   - Best for: Budget-conscious buyers

### Tier 2 — Good Value
1. **Luminous Solar**
   - Price: ₹24-₹30 per watt
   - Efficiency: 17-19%
   - Warranty: 25 years performance
   - Best for: Residential installations

2. **Havells Solar**
   - Price: ₹25-₹31 per watt
   - Efficiency: 17-19%
   - Warranty: 25 years performance
   - Best for: Trusted brand, residential

3. **Microtek Solar**
   - Price: ₹22-₹28 per watt
   - Efficiency: 16-18%
   - Warranty: 20-25 years performance
   - Best for: Budget buyers

### Tier 3 — Economy Options
- Price: ₹18-₹24 per watt
- Efficiency: 15-17%
- Warranty: 10-20 years
- **Note:** Lower initial cost but may have shorter lifespan and lower efficiency

---

## Hidden Costs to Consider

1. **Structural Reinforcement**
   - If your roof needs strengthening: ₹10,000 - ₹50,000
   - Shadow-free area requirement

2. **Net Metering Approval**
   - Application fees: ₹2,000 - ₹5,000
   - Bi-directional meter: ₹3,000 - ₹8,000

3. **Maintenance**
   - Annual cleaning: ₹2,000 - ₹5,000
   - AMC (Annual Maintenance Contract): ₹5,000 - ₹15,000/year

4. **GST**
   - 12% GST on solar systems (reduced from 18%)
   - Already included in some quotes, check carefully

5. **Battery Backup (Optional)**
   - Lithium-ion battery (5 kWh): ₹1,50,000 - ₹2,50,000
   - Lead-acid battery (5 kWh): ₹50,000 - ₹1,00,000

---

## Money-Saving Tips

### 1. Compare Multiple Quotes
- Get 3-5 quotes from verified installers
- Use [GoSolarIndex](https://gosolarindex.in) to find trusted installers
- Don't just compare prices — check warranty and after-sales service

### 2. Choose the Right System Size
- Don't over-size or under-size
- Calculate based on your actual electricity consumption
- Use our [Solar Calculator](https://gosolarindex.in/solar-calculator) for accurate sizing

### 3. Timing Your Purchase
- **Best months:** April-June (pre-monsoon)
- Avoid peak summer (higher demand = higher prices)
- End-of-financial-year deals (February-March)

### 4. Claim All Available Subsidies
- PM Surya Ghar Yojana (Central): Up to ₹78,000
- State subsidies (if available)
- Tax benefits under Income Tax Act Section 80C (some states)

### 5. Opt for On-Grid Systems
- Lower cost than off-grid (no battery needed)
- Net metering allows you to sell excess power
- Faster ROI (3-5 years vs 6-8 years for off-grid)

### 6. Negotiate Installation Costs
- If you have easy rooftop access, negotiate installation charges
- Some installers offer discounts for bulk/community installations
- Ask about referral discounts

---

## Return on Investment (ROI) Calculation

### Example: 3 kW System in Mumbai

**Initial Investment:**
- Total cost: ₹1,80,000
- PM Surya Ghar subsidy: -₹78,000
- **Net investment: ₹1,02,000**

**Annual Savings:**
- Generation: 12 units/day × 365 days = 4,380 units/year
- Electricity rate: ₹8/unit (average Mumbai tariff)
- **Annual savings: ₹35,040**

**ROI Calculation:**
- Payback period: ₹1,02,000 ÷ ₹35,040 = **2.9 years**
- 25-year total savings: ₹35,040 × 25 = **₹8,76,000**
- Net profit (after recovering investment): **₹7,74,000**

**Additional Benefits:**
- Protection from electricity rate hikes (typically 5-8% annually)
- Increase in property value
- Environmental impact: 109.5 tons of CO₂ saved over 25 years

---

## Frequently Asked Questions

### 1. Are solar panels cheaper now than before?
Yes! Prices have dropped 60% since 2015 due to improved manufacturing, economies of scale, and government push for renewable energy.

### 2. Should I buy now or wait?
**Buy now.** While prices may continue to drop slightly, the ROI is already excellent. Waiting means losing savings on your electricity bills.

### 3. What's the difference between monocrystalline and polycrystalline panels?
- **Monocrystalline:** 19-22% efficiency, black color, more expensive (₹30-₹40/watt)
- **Polycrystalline:** 15-18% efficiency, blue color, cheaper (₹22-₹32/watt)
- Most installers now recommend mono for better long-term value

### 4. Do I need batteries?
**No, for on-grid systems.** Batteries are only needed for:
- Off-grid homes (no electricity connection)
- Backup during power cuts
- Remote locations

For on-grid systems, net metering is more cost-effective.

### 5. How long do solar panels last?
- **Performance warranty:** 25 years (80-90% efficiency maintained)
- **Actual lifespan:** 30-35 years with proper maintenance
- **Inverter lifespan:** 10-15 years (may need one replacement)

### 6. Can I install solar panels myself to save money?
**Not recommended.** Professional installation ensures:
- Structural safety
- Correct wiring and earthing
- Warranty validity
- Net metering approval
- Insurance coverage

DIY installation may void warranties and create safety hazards.

---

## Next Steps: Get Accurate Quotes

Ready to go solar? Here's how to get started:

1. **Calculate Your System Size**
   - Use our [Solar Calculator](https://gosolarindex.in/solar-calculator)
   - Enter your monthly electricity bill
   - Get recommended system size

2. **Find Verified Installers**
   - Browse [GoSolarIndex directory](https://gosolarindex.in)
   - Filter by your city
   - Check reviews and ratings

3. **Request Multiple Quotes**
   - Get quotes from 3-5 installers
   - Compare pricing, components, and warranties
   - Ask about after-sales service

4. **Check Subsidy Eligibility**
   - Use our [Subsidy Checker](https://gosolarindex.in/subsidy-checker)
   - Verify your eligibility for PM Surya Ghar
   - Check state-specific incentives

5. **Verify Installer Credentials**
   - MNRE empanelment
   - GST registration
   - Previous project references
   - Warranty documentation

---

## Conclusion

Solar panel costs in India have never been more affordable. With prices ranging from ₹50-₹65 per watt and generous subsidies bringing 3 kW systems down to just ₹72,000-₹1,17,000, the ROI is excellent.

**Key Takeaways:**
- Average cost: ₹50-₹65 per watt (2025)
- PM Surya Ghar subsidy: Up to ₹78,000
- Payback period: 3-5 years for on-grid systems
- 25-year savings: ₹8-₹10 lakhs for 3 kW system
- Tier 1 brands worth the premium for longevity

Don't wait — electricity rates are only going up, and the subsidy won't last forever.

**Ready to switch to solar?** [Find verified installers near you](https://gosolarindex.in) and get free quotes today!

---

*Published: March 7, 2026 | Author: GoSolarIndex Team*`,
      published: true,
      createdAt: new Date('2026-03-07'),
      updatedAt: new Date('2026-03-07'),
    },
    {
      title: 'PM Surya Ghar Yojana 2025-26 — Complete Guide (Subsidy, Eligibility, Application)',
      slug: 'pm-surya-ghar-yojana-complete-guide',
      description: 'Complete guide to PM Surya Ghar Yojana (Muft Bijli Yojana). Learn about subsidy amounts, eligibility criteria, step-by-step application process, required documents, and common mistakes to avoid.',
      category: 'Subsidies',
      readTime: '15 min read',
      content: `# PM Surya Ghar Yojana 2025-26 — Complete Guide

**Updated:** March 7, 2026

PM Surya Ghar: Muft Bijli Yojana is the Government of India's flagship rooftop solar program that aims to install solar panels on **1 crore (10 million) households** and provide up to **₹78,000 in direct subsidy** per household.

This comprehensive guide covers everything you need to know about the scheme — from subsidy amounts and eligibility to the complete application process.

---

## Quick Overview: PM Surya Ghar Yojana

| Aspect | Details |
|--------|---------|
| **Launch Date** | February 13, 2024 |
| **Budget** | ₹75,021 crore |
| **Target** | 1 crore households |
| **Subsidy Amount** | Up to ₹78,000 per household |
| **Free Electricity** | Up to 300 units per month |
| **Loan Available** | Yes, at subsidized rates |
| **Application** | Online through National Portal |

---

## What is PM Surya Ghar Yojana?

PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar Scheme) enables households to:

1. **Install rooftop solar panels** at subsidized rates
2. **Generate their own electricity** and reduce/eliminate bills
3. **Sell excess electricity** back to the grid (net metering)
4. **Get up to ₹78,000 direct subsidy** from the Central Government
5. **Access low-interest loans** for remaining costs

The scheme aims to make 1 crore Indian households energy-independent and contribute to India's renewable energy goals.

---

## Subsidy Amount Breakdown (2025-26)

### Central Government Subsidy

| System Capacity | Central Subsidy | Calculation |
|-----------------|-----------------|-------------|
| **1 kW** | ₹30,000 | ₹30,000 × 1 = ₹30,000 |
| **2 kW** | ₹60,000 | ₹30,000 × 2 = ₹60,000 |
| **3 kW** | ₹78,000 | (₹30,000 × 2) + (₹18,000 × 1) = ₹78,000 |
| **4 kW** | ₹78,000 | Capped at ₹78,000 |
| **5 kW** | ₹78,000 | Capped at ₹78,000 |
| **10 kW** | ₹78,000 | Maximum subsidy cap |

**Formula:**
- First 2 kW: ₹30,000 per kW
- Above 2 kW: ₹18,000 per kW
- **Maximum cap:** ₹78,000 (for systems ≥3 kW)

### Additional State Subsidies

Some states offer additional subsidies on top of the Central scheme:

| State | Additional Subsidy | Total Subsidy (3 kW) |
|-------|-------------------|----------------------|
| Gujarat | 40% of balance cost | ₹78,000 + state subsidy |
| Maharashtra | ₹10,000 - ₹25,000 | ₹88,000 - ₹1,03,000 |
| Rajasthan | Up to ₹18,000 | ₹96,000 |
| Tamil Nadu | 30% of project cost | Varies |
| Delhi | Up to ₹10,000 | ₹88,000 |

*Check with your State Nodal Agency (SNA) for exact state-level incentives.*

---

## Eligibility Criteria

### Who Can Apply?

✅ **Eligible:**
- Individual residential house owners
- Group housing societies/RWAs (Resident Welfare Associations)
- Apartments and residential complexes
- Government employees' housing societies

❌ **Not Eligible:**
- Commercial establishments
- Industrial units
- Rental properties (tenant cannot apply; owner must apply)
- Properties without electricity connection

### Technical Eligibility

✅ **Your property must have:**
- Electricity connection (residential category)
- Sufficient shadow-free roof area (minimum 100 sq ft per kW)
- Structurally sound rooftop (can bear 15-20 kg per sq meter)
- Access to rooftop for installation and maintenance

❌ **Not eligible if:**
- No electricity meter (new connection required first)
- Already availed subsidy under previous solar schemes (some exceptions apply)
- Roof is heavily shaded or unsuitable

---

## Step-by-Step Application Process

### Phase 1: Online Registration (National Portal)

**Step 1: Visit the National Portal**
- Go to: [https://pmsuryaghar.gov.in](https://pmsuryaghar.gov.in)
- Click on "Apply for Rooftop Solar"

**Step 2: Register/Login**
- Enter your mobile number
- Verify OTP
- Create account with:
  - Name
  - Email address
  - State
  - District
  - Electricity distribution company (DISCOM)

**Step 3: Fill Application Form**
Provide details:
- Electricity consumer number (from your bill)
- Sanctioned load (kW)
- Roof area available
- Desired solar system capacity (1-10 kW)
- Bank account details (for subsidy transfer)

**Step 4: Upload Documents**
Required documents (scanned copies):
- Electricity bill (latest)
- Aadhaar card
- Bank account details (passbook/cancelled cheque)
- Property ownership proof (if available)
- Roof photograph showing clear area

**Step 5: Submit Application**
- Review all details
- Click "Submit"
- Note down your **Application ID**

**Timeline:** Immediate (online application)

---

### Phase 2: Installer Empanelment & Quotation

**Step 6: Choose Vendor/Installer**
- After application approval, you'll receive a list of **empanelled vendors**
- Options:
  1. **Option A:** Select from empanelled installers on portal
  2. **Option B:** Choose your own installer (must be MNRE-empanelled)
  3. **Option C:** DISCOM will allocate an installer

**Step 7: Get Feasibility Report**
- Selected installer will visit your site
- Technical feasibility assessment:
  - Roof structure
  - Shadow analysis
  - Load capacity
  - Electrical connection point
- Receive **quotation** with cost breakdown

**Step 8: Accept Quote & Pay Advance**
- Review quotation on portal
- Pay advance to installer (typically 20-30%)
- Sign agreement

**Timeline:** 7-15 days

---

### Phase 3: Net Metering Approval

**Step 9: Net Metering Application**
- Installer will apply for net metering on your behalf
- DISCOM (electricity company) will process the application
- Documents required:
  - Solar system design
  - Single line diagram (SLD)
  - Inverter specifications
  - Installer certification

**Step 10: DISCOM Approval**
- DISCOM reviews application
- May conduct site inspection
- Issues **approval letter** with technical specifications

**Timeline:** 15-30 days

---

### Phase 4: Installation & Commissioning

**Step 11: Install Solar System**
- Installer will install the solar system:
  - Solar panels
  - Inverter
  - Mounting structure
  - Wiring and earthing
  - DC Distribution Board (DCDB) and AC Distribution Board (ACDB)

**Step 12: Commissioning**
- DISCOM installs **bi-directional meter** (or replaces existing meter)
- System is connected to the grid
- Installer provides:
  - Commissioning certificate
  - Performance test report
  - Warranty documents
  - User manual

**Step 13: Upload Documents on Portal**
Upload the following on PM Surya Ghar portal:
- Commissioning certificate
- Installation photographs (panels, inverter, meter)
- Bi-directional meter photograph
- Installer invoice/bill

**Timeline:** 7-15 days

---

### Phase 5: Inspection & Subsidy Release

**Step 14: DISCOM Inspection**
- DISCOM engineer will visit your site
- Verify installation quality and compliance
- Check:
  - Panel orientation and tilt
  - Proper earthing
  - Net meter functionality
  - Safety measures

**Step 15: Inspection Report Upload**
- DISCOM uploads inspection report to portal
- If approved, subsidy disbursement is initiated

**Step 16: Subsidy Disbursement**
- Subsidy amount is transferred **directly to your bank account**
- You'll receive SMS/email notification
- Payment mode: Direct Benefit Transfer (DBT)

**Timeline:** 30-60 days after installation

---

## Total Timeline: Application to Subsidy

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Online application | 1 day | 1 day |
| Vendor selection | 7-15 days | 8-16 days |
| Net metering approval | 15-30 days | 23-46 days |
| Installation | 7-15 days | 30-61 days |
| Inspection & subsidy | 30-60 days | 60-121 days |

**Total:** 2-4 months from application to subsidy receipt

---

## Required Documents Checklist

### For Application:
- [ ] Latest electricity bill (JPEG/PDF, max 2 MB)
- [ ] Aadhaar card (both sides)
- [ ] Bank account details (passbook/cancelled cheque)
- [ ] Property ownership proof (optional but recommended)
- [ ] Roof photograph (clear, showing available area)

### For Net Metering:
- [ ] Solar system design and SLD (installer provides)
- [ ] Inverter specification sheet (installer provides)
- [ ] Installer empanelment certificate (installer provides)

### For Subsidy Claim:
- [ ] Commissioning certificate (installer provides)
- [ ] Installation photographs (panels, inverter, meter — take yourself)
- [ ] Bi-directional meter photograph
- [ ] Original invoice/bill from installer

**Pro Tip:** Keep both physical and digital copies of all documents.

---

## Loan Facility Under PM Surya Ghar

The scheme offers **subsidized loans** to cover the balance cost after subsidy:

### Loan Details:
- **Loan Amount:** Up to 100% of balance cost (after subsidy)
- **Interest Rate:** 7-9% (subsidized rates)
- **Tenure:** Up to 10 years
- **Participating Banks:** SBI, PNB, Bank of Baroda, HDFC, ICICI, Axis, and more

### Example Loan Calculation (3 kW system):
- Total cost: ₹1,80,000
- Subsidy: ₹78,000
- Balance: ₹1,02,000
- **Loan available:** Up to ₹1,02,000 at 7-9% interest
- **EMI (7 years @ 8%):** ~₹1,700/month

**Apply for loan through:**
1. Portal's loan section (preferred)
2. Directly through participating banks
3. Via your installer (some tie up with banks)

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Wrong System Size Selection
**Problem:** Choosing 2 kW when 3 kW is better for ROI
**Solution:** Use our [Solar Calculator](https://gosolarindex.in/solar-calculator) to find the right size based on your consumption

### ❌ Mistake 2: Not Verifying Installer Credentials
**Problem:** Hiring non-empanelled installers leads to subsidy rejection
**Solution:** Only choose MNRE-empanelled vendors. Check empanelment on PM Surya Ghar portal or [GoSolarIndex](https://gosolarindex.in)

### ❌ Mistake 3: Incomplete Documentation
**Problem:** Missing documents delay subsidy by months
**Solution:** Follow the checklist above and upload clear, legible documents

### ❌ Mistake 4: Poor Quality Components
**Problem:** Installer uses cheap panels to maximize profit
**Solution:** Insist on Tier 1 panels (Tata, Adani, Vikram, Waaree) and check invoice

### ❌ Mistake 5: Not Following Up
**Problem:** Application stuck at DISCOM approval stage
**Solution:** Track application status on portal and follow up every 7 days

### ❌ Mistake 6: Ignoring Net Metering Agreement
**Problem:** Not understanding your rights and obligations
**Solution:** Read the net metering agreement carefully before signing

### ❌ Mistake 7: No Written Warranty
**Problem:** Installer disappears after installation
**Solution:** Get 25-year panel warranty and 5-year installer warranty in writing

---

## State-Specific Variations & Additional Benefits

### Gujarat
- **Extra subsidy:** 40% of balance cost
- **State nodal agency:** GEDA (Gujarat Energy Development Agency)
- **Special benefit:** Fast-track approvals (15-day net metering)

### Maharashtra
- **Extra subsidy:** ₹10,000-₹25,000 (MSEDCL area)
- **Benefit:** No net metering charges
- **Contact:** MEDA (Maharashtra Energy Development Agency)

### Rajasthan
- **Extra subsidy:** Up to ₹18,000
- **Benefit:** Wheeling and banking facility
- **Contact:** RRECL (Rajasthan Renewable Energy Corporation Ltd)

### Karnataka
- **Benefit:** BESCOM offers simplified net metering
- **Special:** Urban areas get priority approvals
- **Contact:** KREDL (Karnataka Renewable Energy Development Ltd)

### Tamil Nadu
- **Extra subsidy:** 30% of project cost
- **Benefit:** Generation-based incentive (₹2/kWh for 5 years)
- **Contact:** TANGEDCO

### Delhi
- **Extra subsidy:** Up to ₹10,000
- **Benefit:** Exemption from net metering charges
- **Contact:** BSES/TPDDL (your DISCOM)

*Visit your state nodal agency website for exact details.*

---

## Frequently Asked Questions (FAQ)

### 1. Who pays for the bi-directional meter?
**Answer:** The DISCOM (electricity company) installs it free of cost. You don't pay anything.

### 2. Can I apply if I live in a rented house?
**No.** Only the property owner can apply. If you're a tenant, ask your landlord to apply.

### 3. How is the subsidy paid — to me or the installer?
**Answer:** Subsidy is paid **directly to your bank account** via DBT. You pay the full amount to the installer and get reimbursed later.

### 4. What if my roof is partially shaded?
**Answer:** Some shading is okay if you have sufficient shadow-free area (100 sq ft per kW). The installer will design around it.

### 5. Can I install a bigger system and get more subsidy?
**No.** Maximum subsidy is capped at ₹78,000 (for ≥3 kW systems). You can install 10 kW, but subsidy remains ₹78,000.

### 6. Is there a deadline to apply?
**No specific deadline.** The scheme runs until the target of 1 crore installations is met or the budget is exhausted. **Apply early** to avoid missing out.

### 7. What if I already have an inverter? Can I use it?
**Yes**, if it's a grid-tied inverter compatible with net metering. Check with your installer. Off-grid/standalone inverters are NOT eligible.

### 8. Do I need to pay electricity bills after installing solar?
**It depends:**
- If your generation > consumption: You get credit (bill = ₹0 or negative)
- If consumption > generation: You pay only for the difference
- Fixed charges (meter rent, etc.) still apply

### 9. Can group housing societies apply?
**Yes!** RWAs can apply under the scheme. Benefits:
- Bulk installation discount
- Shared common area generation
- Lower cost per unit

### 10. What happens to excess electricity?
With **net metering**, excess electricity goes to the grid. You get:
- Credit for excess units (adjusted in future bills)
- OR payment from DISCOM at predetermined rates

---

## Post-Installation: Maximizing Benefits

### 1. Monitor Your System
- Check inverter display daily for generation data
- Use mobile app (if inverter supports)
- Compare generation with expected output

### 2. Maintenance Tips
- Clean panels every 3 months (or after dust storms)
- Check for bird droppings, leaves, and debris
- Inspect wiring for damage
- Get annual professional maintenance

### 3. Track Your Savings
- Compare electricity bills before/after solar
- Calculate ROI (payback period)
- Monitor net metering credits

### 4. Claim Tax Benefits (If Applicable)
- Some states offer income tax deductions under Section 80C
- Consult a CA for exact benefits in your state

---

## Troubleshooting Common Issues

| Issue | Solution |
|-------|----------|
| **Application rejected** | Check eligibility criteria, re-submit with correct documents |
| **Net metering approval delayed** | Follow up with DISCOM, escalate to nodal officer if >30 days |
| **Subsidy not received after 90 days** | Contact helpline, check portal status, escalate to SNA |
| **Installer not responding post-installation** | File complaint on portal, contact MNRE helpline |
| **Low electricity generation** | Check for shading, panel cleanliness, inverter errors |
| **Inverter showing error** | Contact installer immediately, check warranty |

---

## Contact Information & Helplines

### National Helpline
- **Phone:** 1800-180-3333 (Toll-Free)
- **Email:** pmsuryaghar-mnre@gov.in
- **Portal:** [pmsuryaghar.gov.in](https://pmsuryaghar.gov.in)

### MNRE (Ministry of New and Renewable Energy)
- **Phone:** 011-24360707, 011-24360404
- **Website:** [mnre.gov.in](https://mnre.gov.in)

### State Nodal Agencies (SNA)
- Find your state SNA contact on the PM Surya Ghar portal
- They handle state-level approvals and grievances

---

## Conclusion: Is PM Surya Ghar Worth It?

**Absolutely YES!** Here's why:

✅ **Massive subsidy:** Up to ₹78,000 reduces your cost by 40-50%
✅ **Quick ROI:** 3-5 years payback with subsidy
✅ **Free electricity:** Generate 300+ units/month with 3 kW system
✅ **25-year savings:** ₹8-10 lakhs over system lifetime
✅ **Environmental impact:** Reduce carbon footprint
✅ **Increase property value:** Solar homes sell for 3-5% more

**The numbers speak for themselves:**
- 3 kW system cost: ₹1,80,000
- After subsidy: ₹1,02,000
- Monthly savings: ₹2,500-₹3,000
- **Payback:** 3 years
- **Lifetime savings:** ₹8,76,000

Don't miss this opportunity. The scheme has a target of 1 crore installations — once that's met, the subsidy may end.

---

## Next Steps: Apply Today

**Ready to go solar?**

1. **Calculate your requirements:** [Solar Calculator](https://gosolarindex.in/solar-calculator)
2. **Check eligibility:** [Subsidy Checker](https://gosolarindex.in/subsidy-checker)
3. **Find installers:** [GoSolarIndex Directory](https://gosolarindex.in)
4. **Apply online:** [PM Surya Ghar Portal](https://pmsuryaghar.gov.in)

Need help finding a verified installer? Browse our directory of **MNRE-empanelled, verified solar installers** at [GoSolarIndex.in](https://gosolarindex.in) and get free quotes today!

---

*Published: March 7, 2026 | Author: GoSolarIndex Team | Sources: MNRE, PM Surya Ghar Official Portal*`,
      published: true,
      createdAt: new Date('2026-03-07'),
      updatedAt: new Date('2026-03-07'),
    },
  ];

  for (const post of posts) {
    const created = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`✓ Created blog post: ${created.title}`);
  }

  console.log(`\n✅ Successfully seeded ${posts.length} blog posts!\n`);
}

main()
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
