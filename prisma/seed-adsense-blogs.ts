/**
 * seed-adsense-blogs.ts
 * Adds 12 substantive blog posts to pass Google AdSense "low value content" review
 *
 * Run: npx tsx prisma/seed-adsense-blogs.ts
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('\n🌱 Seeding 12 new blog posts for AdSense approval...\n');

  const posts = [
    {
      title: 'How to Apply for PM Surya Ghar Yojana Subsidy Online — Step-by-Step 2025',
      slug: 'pm-surya-ghar-yojana-application-guide',
      description: 'Complete step-by-step guide to apply for PM Surya Ghar Muft Bijli Yojana subsidy online. Learn eligibility criteria, required documents, portal link, and how to track your application.',
      category: 'Government Schemes',
      readTime: '10 min read',
      date: new Date('2026-01-15'),
      published: true,
      metaTitle: 'PM Surya Ghar Yojana Application 2025 — How to Apply Online Step by Step',
      metaDescription: 'Step-by-step guide to apply for PM Surya Ghar Muft Bijli Yojana subsidy. Eligibility, documents needed, portal link, and how to get up to ₹78,000 subsidy.',
      content: `# How to Apply for PM Surya Ghar Yojana Subsidy Online — Step-by-Step 2025

**Last Updated:** January 15, 2026

The PM Surya Ghar Muft Bijli Yojana is India's most ambitious rooftop solar scheme, offering subsidies of up to ₹78,000 to residential consumers. Since its launch in February 2024, over 1.3 crore households have registered — but many eligible families are still missing out because they don't know how to apply.

This guide walks you through the entire process, from eligibility check to final disbursement.

---

## What is PM Surya Ghar Muft Bijli Yojana?

Launched by Prime Minister Narendra Modi on February 13, 2024, the PM Surya Ghar scheme has a budget of ₹75,021 crore and aims to:

- Install rooftop solar on **1 crore homes** across India
- Provide **300 units of free electricity** per month to beneficiaries
- Offer central financial assistance (subsidy) directly to bank accounts
- Create 17 lakh jobs in the solar sector

---

## Subsidy Amounts Under the Scheme

| System Size | Subsidy Amount |
|-------------|---------------|
| Up to 2 kW | ₹30,000 per kW (max ₹60,000) |
| 2 kW to 3 kW | ₹18,000 per kW for additional capacity |
| Above 3 kW | Capped at ₹78,000 total |

**Example:** For a 3 kW system, you get ₹60,000 (for first 2 kW) + ₹18,000 (for 3rd kW) = ₹78,000 subsidy.

---

## Who is Eligible?

### Must Have:
- Residential electricity connection (not commercial)
- Own the house (tenants must have landlord's consent)
- Valid Aadhaar card linked to mobile number
- Bank account linked to Aadhaar (for DBT transfer)
- Must not have availed solar subsidy earlier

### Eligible Rooftop Types:
- Independent houses with pucca roof (RCC/metal)
- Apartments and housing societies (collective application)
- Rural households with electricity connection

### Not Eligible:
- Commercial properties
- Industrial establishments
- Government buildings (separate scheme applies)

---

## Documents Required

Before starting the online application, keep these documents ready:

1. **Aadhaar Card** (applicant and co-applicant if any)
2. **Electricity Bill** (latest, showing consumer number)
3. **Bank Account Details** (account number, IFSC — must be Aadhaar-linked)
4. **Address Proof** (Aadhaar/Voter ID/Passport)
5. **Photograph** (passport size, recent)
6. **Roof Ownership Proof** (property documents or rental agreement with landlord NOC)
7. **Mobile number** linked to Aadhaar

---

## Step-by-Step Application Process

### Step 1: Register on the National Portal

1. Visit **pmsuryaghar.gov.in**
2. Click **"Apply for Rooftop Solar"**
3. Select your **State** and your **Electricity Distribution Company (DISCOM)**
4. Enter your **electricity consumer number** (from your bill)
5. Enter your **mobile number** and verify with OTP
6. Fill in basic details: name, Aadhaar number, address

### Step 2: Choose an Empanelled Vendor

After registration, you'll see a list of vendors empanelled by your DISCOM.

- Compare multiple vendors — prices and services vary
- Check vendor ratings and experience
- Ask for detailed quotations from at least 3 vendors
- Do NOT pay any advance until formal work order is issued

**Tip:** Prefer vendors with completed installations in your area — they'll be familiar with local DISCOM requirements.

### Step 3: Get Technical Feasibility Study

Your chosen vendor will:
- Visit your site (usually free of charge)
- Assess roof area, shadow, structural strength
- Recommend optimal system size
- Submit a technical proposal to the DISCOM portal

This feasibility approval from DISCOM usually takes **5–15 working days**.

### Step 4: Installation After Approval

Once DISCOM approves the feasibility:
- Sign agreement with vendor
- Pay vendor (after deducting subsidy amount — vendor handles subsidy claim)
- Installation happens within 15–30 days
- Quality inspection by vendor + DISCOM representative

### Step 5: Net Meter Installation

After solar installation:
- DISCOM will replace your existing meter with a **bi-directional net meter**
- This allows excess electricity to be exported to the grid
- Net metering approval takes 15–30 days in most states

### Step 6: Subsidy Disbursement to Your Bank Account

Once net meter is installed and commissioning certificate is issued:
- Upload commissioning certificate on the portal
- Submit bank account details for Direct Benefit Transfer (DBT)
- Subsidy is credited within **30 days** of successful submission

---

## State-Wise Portal vs National Portal

Most states use the national portal (pmsuryaghar.gov.in), but some have their own:

| State | Portal |
|-------|--------|
| Gujarat | geda.gujarat.gov.in |
| Maharashtra | msedcl.in (MSEDCL portal) |
| Delhi | bsesdelhi.com / tatapower-ddl.com |
| Rajasthan | jvvnl.in |
| Tamil Nadu | tangedco.gov.in |

For most states, use the national portal — it integrates with all DISCOMs automatically.

---

## Common Reasons for Application Rejection

1. **Consumer number mismatch** — ensure name on bill matches Aadhaar
2. **Roof not structurally sound** — DISCOM may request reinforcement
3. **High-rise restrictions** — some apartment societies don't permit individual installations
4. **Previous subsidy availed** — one subsidy per connection number
5. **Aadhaar not linked to bank account** — complete Aadhaar-bank seeding first

---

## Frequently Asked Questions

**Q: Can I apply if I live in an apartment?**
A: Yes, but you need Society NOC and usually a collective application is more feasible. Individual balcony installations of 1–2 kW are approved in many cities.

**Q: How long does the entire process take?**
A: Typically 45–90 days from registration to subsidy credit. Varies by state and DISCOM.

**Q: Can I install first and apply later?**
A: No. Installation must happen through an empanelled vendor after DISCOM approval to qualify for the subsidy.

**Q: What if my vendor asks for full payment including subsidy amount?**
A: Be cautious. Most empanelled vendors collect only the net amount (after subsidy) from customers and claim the subsidy separately. Always verify.

---

## Find Verified Solar Installers Near You

To apply successfully, you need a reliable empanelled solar installer. [Browse verified solar companies in your city on GoSolarIndex](https://gosolarindex.in) — filter by your city, compare ratings, and get free quotes.`,
    },
    {
      title: 'Solar Panel Brands in India 2025 — Waaree vs Adani vs Tata vs Vikram',
      slug: 'best-solar-panel-brands-india-2025',
      description: 'Compare the top solar panel brands available in India in 2025. Waaree, Adani Solar, Tata Power Solar, Vikram Solar, and more — prices, efficiency, warranty, and which to buy.',
      category: 'Guides',
      readTime: '11 min read',
      date: new Date('2026-01-20'),
      published: true,
      metaTitle: 'Best Solar Panel Brands in India 2025 — Waaree vs Adani vs Tata Compared',
      metaDescription: 'Compare top solar panel brands in India: Waaree, Adani Solar, Tata Power Solar, Vikram Solar. Prices, efficiency ratings, warranties and which brand to choose.',
      content: `# Solar Panel Brands in India 2025 — Waaree vs Adani vs Tata vs Vikram

**Last Updated:** January 20, 2026

Choosing a solar panel brand is one of the most important decisions when going solar. The right panel will generate electricity reliably for 25+ years. The wrong one might underperform or fail within years, costing you lakhs.

This guide compares the **top solar panel manufacturers in India** — their prices, efficiency ratings, warranty terms, and real-world reliability.

---

## Quick Comparison: Top Solar Panel Brands in India (2025)

| Brand | Price Range (per watt) | Efficiency | Warranty | Made in India |
|-------|----------------------|------------|----------|---------------|
| Waaree | ₹22–₹32 | 19–22% | 30 years output | Yes |
| Adani Solar | ₹24–₹34 | 19–22% | 25 years output | Yes |
| Tata Power Solar | ₹26–₹36 | 19–21% | 25 years output | Yes |
| Vikram Solar | ₹23–₹33 | 20–22% | 30 years output | Yes |
| Luminous | ₹20–₹28 | 17–20% | 25 years output | Yes |
| Havells | ₹22–₹30 | 18–20% | 25 years output | Yes |
| UTL Solar | ₹18–₹26 | 17–19% | 25 years output | Yes |

---

## 1. Waaree Energies — India's Largest Solar Manufacturer

**Founded:** 1989 (solar division 2007)
**Headquarters:** Surat, Gujarat
**Annual Capacity:** 13 GW (largest in India)

### Key Products:
- **Mono PERC Panels:** 330W–400W, efficiency up to 20.7%
- **TOPCon Panels:** 400W–580W, efficiency up to 22.5% (premium)
- **Bifacial Panels:** 400W–500W, extra 5–15% generation from rear side

### Pricing (2025):
- Mono PERC: ₹22–₹28 per watt
- TOPCon: ₹28–₹35 per watt
- Bifacial: ₹25–₹32 per watt

### Pros:
- Largest manufacturing capacity in India — reliable supply
- Aggressive pricing and government project experience
- Good warranty support network across India
- BIS certified and ALMM listed (eligible for subsidies)

### Cons:
- Customer service can be slow in Tier-2/3 cities
- TOPCon panels have premium pricing

**Best for:** Residential and commercial installations where price-performance ratio matters most.

---

## 2. Adani Solar (Mundra Solar)

**Founded:** 2015
**Headquarters:** Ahmedabad, Gujarat
**Annual Capacity:** 4 GW (expanding to 10 GW)

### Key Products:
- **Mono PERC:** 370W–410W, efficiency 19.8–21.2%
- **HJT Panels:** Ultra-premium, efficiency 22–23% (limited availability)
- **Bifacial Mono PERC:** Popular for commercial rooftops

### Pricing (2025):
- Mono PERC: ₹24–₹30 per watt
- HJT: ₹35–₹45 per watt

### Pros:
- Backed by Adani Group — strong financials, long-term reliability
- Excellent performance in high-temperature Indian conditions
- Well-established dealer network in Gujarat, Maharashtra, Rajasthan

### Cons:
- Slightly premium pricing vs competitors
- HJT panels very expensive — ROI takes longer

**Best for:** Buyers who prioritize brand strength and long-term company reliability.

---

## 3. Tata Power Solar

**Founded:** 1989 (as BSES Solar)
**Headquarters:** Bangalore, Karnataka
**Annual Capacity:** 600 MW (expanding)

### Key Products:
- **Mono PERC:** 330W–400W, efficiency 19–21%
- **Frameless Panels:** For aesthetically sensitive installations
- **Solar Roof Tiles:** Premium segment

### Pricing (2025):
- Mono PERC: ₹26–₹36 per watt (premium positioning)

### Pros:
- Tata brand trust — excellent customer confidence
- Strong nationwide service network (critical for warranty claims)
- ISO certified manufacturing with consistent quality control

### Cons:
- Most expensive among Indian brands
- Lower manufacturing capacity than Waaree or Adani
- Fewer high-wattage panel options

**Best for:** Buyers who value Tata brand trust and prioritize after-sales service nationwide.

---

## 4. Vikram Solar

**Founded:** 2006
**Headquarters:** Kolkata, West Bengal
**Annual Capacity:** 3.5 GW

### Key Products:
- **Somera Series:** Mono PERC, 380W–420W, efficiency 20–21.5%
- **Prexos Series:** TOPCon, 400W–580W, efficiency 21–22.5%
- **Hypersol:** Bifacial TOPCon, premium segment

### Pricing (2025):
- Mono PERC: ₹23–₹30 per watt
- TOPCon: ₹28–₹35 per watt

### Pros:
- Tier 1 Bloomberg NEF rated (global quality standard)
- Excellent export track record (supply to EU and USA)
- Strong technical support and engineering team
- Good for Eastern India — strong presence in WB, Odisha, NE states

### Cons:
- Less aggressive pricing than Waaree
- Smaller dealer network in South India

**Best for:** Quality-conscious buyers who want internationally-certified panels.

---

## 5. Luminous Solar

**Founded:** 1988 (solar division 2011)
**Headquarters:** New Delhi
**Annual Capacity:** 1 GW

### Key Products:
- **Mono PERC:** 300W–380W, efficiency 17–20%
- Known more for inverters and batteries than panels

### Pricing (2025):
- ₹20–₹28 per watt

### Pros:
- Trusted inverter brand — good ecosystem if buying complete system
- Wide service network for inverter+panel combos
- Good for off-grid and hybrid systems

### Cons:
- Panel quality not at par with Waaree/Vikram
- Best suited for systems where inverter is the priority

**Best for:** Budget buyers or those buying Luminous inverters who want matched systems.

---

## How to Choose the Right Brand for Your Home

### Step 1: Check ALMM Listing
The **Approved List of Models and Manufacturers (ALMM)** is mandatory for subsidy-eligible installations. All brands above are ALMM-listed, but verify your specific model: mnre.gov.in/almm

### Step 2: Ask for Efficiency vs Price Tradeoff
- Standard efficiency (17–19%): ₹18–₹24/watt — fine for large roofs
- High efficiency (20–22%): ₹24–₹32/watt — essential for small roofs
- Premium (22%+): ₹32–₹45/watt — only if space is very constrained

### Step 3: Verify Warranty Terms
- **Product warranty** (manufacturing defects): Look for 10–12 years
- **Performance warranty**: 30 years at 80%+ output is the industry gold standard
- Ensure the company has a **local service center** — a 25-year warranty from a company you can't reach is worthless

### Step 4: Check the Panel Temperature Coefficient
In India's hot climate, panels lose efficiency at high temperatures. Look for:
- Temperature coefficient below -0.35%/°C (lower is better)
- Mono PERC performs better than polycrystalline in heat

---

## Final Verdict: Which Brand to Choose?

- **Best value:** Waaree — best price-to-performance ratio for most buyers
- **Best brand trust:** Tata Power Solar — if peace of mind is the priority
- **Best quality:** Vikram Solar — internationally certified, great for demanding installations
- **Best for Gujarat buyers:** Adani Solar — strong local network
- **Best budget option:** Luminous or UTL — for tight budgets, not premium performance

[Find local installers who supply these brands in your city →](https://gosolarindex.in)`,
    },
    {
      title: 'Net Metering in India — How It Works and How to Get Approved',
      slug: 'net-metering-india-complete-guide',
      description: 'Complete guide to net metering in India — how it works, state-wise policies, how to apply, bi-directional meter, and how much you can earn by selling solar power back to the grid.',
      category: 'Guides',
      readTime: '9 min read',
      date: new Date('2026-01-25'),
      published: true,
      metaTitle: 'Net Metering in India 2025 — Complete Guide, State Policies & Application Process',
      metaDescription: 'Learn how net metering works in India, state-wise policies, how to apply for bi-directional meter, and how much you earn selling solar power back to the grid.',
      content: `# Net Metering in India — How It Works and How to Get Approved

**Last Updated:** January 25, 2026

Net metering is the mechanism that makes rooftop solar financially viable in India. Without it, excess solar power you generate during the day would simply be wasted. With net metering, it flows into the grid and your DISCOM credits you for it — reducing your electricity bill to near zero or even generating earnings.

Here's everything you need to know.

---

## What is Net Metering?

Net metering is a billing arrangement where:
- Solar panels on your roof generate electricity
- Excess electricity (not consumed by you) flows into the grid
- Your DISCOM measures the net difference between what you consumed and what you exported
- You only pay for the **net electricity consumed** (consumed minus exported)

### Simple Example:
- Your home consumes 300 units/month
- Your solar panels generate 400 units/month
- You export 100 units to the grid
- DISCOM credits you 100 units at a set rate
- **You pay zero bill** (some states even pay you for net export)

---

## How the Bi-Directional Meter Works

After solar installation, your existing single-directional meter is replaced with a **bi-directional (net) meter** that measures:
- **Import:** Electricity drawn from grid (when solar is insufficient)
- **Export:** Electricity sent to grid (when solar produces more than needed)

At billing time: Net Units = Import – Export

If Export > Import, you have a **banking credit** that carries forward to the next billing cycle.

---

## Net Metering Regulations in India

The Central Electricity Regulatory Commission (CERC) and each state's electricity regulatory commission (SERC) set net metering rules. The key regulations:

### CERC Framework (2023):
- Net metering allowed for systems up to **500 kW** for residential, up to 1 MW for commercial
- Smaller systems (up to 10 kW) — net metering by right (DISCOM cannot refuse)
- Systems 10 kW–500 kW — subject to DISCOM technical feasibility

### Settlement Period:
Most states settle net metering credits on:
- **Monthly basis:** Credits expire each month
- **Annual basis:** Credits accumulate for 12 months, then settled (financially)

Annual settlement is better for solar owners — gives you time to export in summer and draw back in monsoon/winter.

---

## State-Wise Net Metering Policies (2025)

| State | Max System Size | Credit Rate | Settlement | Key DISCOM |
|-------|----------------|-------------|------------|------------|
| Maharashtra | 500 kW | Average purchase price | Annual | MSEDCL, Adani, BEST |
| Gujarat | 500 kW | ₹2.25/unit export | Annual | PGVCL, DGVCL, Torrent |
| Delhi | 500 kW | ₹3.00/unit export | Annual | BSES, Tata DDL |
| Rajasthan | 500 kW | ₹3.14/unit export | Annual | JVVNL, AVVNL |
| Karnataka | 500 kW | ₹3.56/unit export | Annual | BESCOM, HESCOM |
| Tamil Nadu | 500 kW | ₹2.00/unit export | Annual | TANGEDCO |
| UP | 500 kW | ₹3.50/unit export | Annual | PVVNL, DVVNL |
| Haryana | 500 kW | ₹3.14/unit export | Annual | UHBVN, DHBVN |

---

## Step-by-Step: How to Get Net Metering Approved

### Step 1: Install Solar Through Empanelled Vendor
Your solar installer (must be empanelled with the DISCOM) applies for net metering on your behalf. This is usually part of their service package.

### Step 2: DISCOM Technical Feasibility Check
DISCOM reviews:
- Transformer capacity in your area
- Feeder loading
- Grid stability considerations

This takes **7–30 days** depending on the state.

### Step 3: Net Meter Installation
If approved, DISCOM sends a team to:
- Remove existing meter
- Install bi-directional net meter
- Commission the solar system officially

### Step 4: Commissioning Certificate
After installation and meter change:
- DISCOM issues a **commissioning certificate**
- This is required to claim PM Surya Ghar subsidy
- Solar system is now legally operational

---

## Why Net Metering Applications Get Rejected

1. **Transformer already overloaded** in your area — DISCOM may ask you to wait or reduce system size
2. **System size too large** relative to your sanctioned load
3. **Vendor not empanelled** — use only DISCOM-approved vendors
4. **Documentation incomplete** — load details, single-line diagram not properly submitted
5. **Apartment conflicts** — society not permitting individual applications

---

## Gross Metering vs Net Metering

Some states offer **gross metering** as an alternative:
- All solar generation is exported to grid (even what you consume)
- You buy all electricity from grid at retail rate
- DISCOM pays you a fixed tariff for every unit generated

Gross metering suits commercial/industrial consumers with high loads. For residential consumers, **net metering almost always gives better financial returns**.

---

## Financial Impact: How Much Can You Save?

### Example: Mumbai homeowner (3 kW system)

**Without solar:**
- Monthly bill: ₹3,000–₹5,000 (300–500 units at Adani rates)

**With 3 kW solar + net metering:**
- Solar generates ~375 units/month
- Net consumption: 300 – 375 = -75 units (net export)
- Monthly bill: ₹0 (plus small fixed charges ~₹200)
- **Annual savings: ₹33,000–₹57,000**
- **Payback period: 4–6 years**

---

## Tips for Maximising Net Metering Benefits

1. **Use heavy appliances during daytime** — washing machine, dishwasher, EV charging — to maximise self-consumption
2. **System size to match daytime loads** — oversizing for export has lower financial returns than self-consumption
3. **Monitor generation daily** — apps like SolarEdge, Sungrow, or DISCOM app help track
4. **Check your bill carefully** — errors in credit calculation do occur; escalate if needed

---

## Find a Solar Installer Who Handles Net Metering

A good installer will manage the entire net metering application, follow-up with DISCOM, and ensure commissioning. [Find experienced solar installers in your city →](https://gosolarindex.in)`,
    },
    {
      title: '3kW vs 5kW vs 10kW Solar System — Which is Right for Your Indian Home?',
      slug: 'solar-system-size-guide-india',
      description: 'How to choose the right solar system size for your home in India. Compare 1kW, 2kW, 3kW, 5kW and 10kW systems — cost, generation, savings and payback period.',
      category: 'Guides',
      readTime: '8 min read',
      date: new Date('2026-02-01'),
      published: true,
      metaTitle: '3kW vs 5kW vs 10kW Solar System India — Which Size Do You Need?',
      metaDescription: 'Choose the right solar system size for your home in India. Compare 1kW to 10kW systems — monthly generation, cost, savings and payback period.',
      content: `# 3kW vs 5kW vs 10kW Solar System — Which is Right for Your Indian Home?

**Last Updated:** February 1, 2026

One of the most common questions from people going solar in India is: **How big a solar system do I need?**

Get this wrong and you'll either overspend (buying more than you need) or undersell (your solar barely makes a dent in your bill). This guide helps you find the perfect size.

---

## The Basic Rule: Match Your Average Monthly Consumption

The easiest way to size your solar system:

**System size (kW) = Monthly units consumed ÷ 120**

*(120 is an approximate multiplier for most Indian cities with 5 peak sun hours)*

### Quick Sizing Table:

| Monthly Bill | Monthly Units | Recommended Size | Expected Generation |
|-------------|---------------|-----------------|-------------------|
| ₹500–₹1,500 | 100–200 units | 1–2 kW | 130–260 units/month |
| ₹1,500–₹3,000 | 200–350 units | 2–3 kW | 260–390 units/month |
| ₹3,000–₹5,000 | 350–500 units | 3–5 kW | 390–650 units/month |
| ₹5,000–₹8,000 | 500–750 units | 5–7 kW | 650–910 units/month |
| ₹8,000–₹15,000 | 750–1,200 units | 7–10 kW | 910–1,300 units/month |

---

## 1 kW Solar System

**Monthly Generation:** 110–140 units (India average)
**Cost (2025):** ₹55,000–₹75,000 (before subsidy)
**After Subsidy:** ₹25,000–₹45,000
**Roof Area Needed:** 80–100 sq ft

**Ideal for:**
- Small 1 BHK apartments
- Homes with bills under ₹1,000/month
- Rural homes with minimal appliances
- Backup for essential loads (lights, fans, small TV)

**Typical Appliances Covered:** 6 LED lights, 3 fans, 1 TV, occasional mobile charging

---

## 2 kW Solar System

**Monthly Generation:** 220–280 units
**Cost (2025):** ₹1,10,000–₹1,50,000 (before subsidy)
**After Subsidy:** ₹62,000–₹1,02,000 (max subsidy ₹48,000)
**Roof Area Needed:** 160–200 sq ft

**Ideal for:**
- 2 BHK apartments
- Homes with bills of ₹1,500–₹2,500/month
- One small air conditioner (if used selectively)

**Typical Appliances Covered:** All lights and fans, refrigerator, TV, 1 AC (2–4 hours/day)

---

## 3 kW Solar System — Most Popular Choice

**Monthly Generation:** 330–420 units
**Cost (2025):** ₹1,50,000–₹2,00,000 (before subsidy)
**After Subsidy:** ₹72,000–₹1,22,000 (max subsidy ₹78,000)
**Roof Area Needed:** 240–300 sq ft

**Ideal for:**
- 3 BHK homes — the most common choice
- Monthly bills of ₹2,500–₹4,000
- 1–2 air conditioners
- Middle-class families

**Typical Appliances Covered:** All standard home appliances + 1–2 ACs (4–6 hours/day)

**Why it's popular:** Gets maximum PM Surya Ghar subsidy (₹78,000), fits most rooftops, and eliminates 80–100% of typical household electricity bills.

---

## 5 kW Solar System

**Monthly Generation:** 550–700 units
**Cost (2025):** ₹2,50,000–₹3,25,000 (before subsidy)
**After Subsidy:** ₹1,72,000–₹2,47,000 (subsidy capped at ₹78,000)
**Roof Area Needed:** 400–500 sq ft

**Ideal for:**
- Large 3–4 BHK homes or villas
- Monthly bills of ₹5,000–₹8,000
- Multiple ACs or heavy appliances
- Small home-based businesses (salon, small shop)

**Typical Appliances Covered:** Full home load including 2–3 ACs, washing machine, water heater (geyser), computers

---

## 10 kW Solar System

**Monthly Generation:** 1,100–1,400 units
**Cost (2025):** ₹5,00,000–₹6,50,000 (before subsidy)
**After Subsidy:** ₹4,22,000–₹5,72,000
**Roof Area Needed:** 800–1,000 sq ft

**Ideal for:**
- Large bungalows or farmhouses
- Monthly bills of ₹8,000–₹15,000
- Home with EV charging or large pool pump
- Small commercial establishments

---

## Roof Space: Do You Have Enough?

Approximate roof area per kW of solar:

| Panel Type | Area per kW |
|------------|-------------|
| Standard Mono PERC | 80–100 sq ft |
| High-efficiency TOPCon | 65–80 sq ft |
| Bifacial panels | 75–90 sq ft |

**Important:** Not all of your roof is usable. Deduct area for water tank, staircase room, shading from walls, and maintain spacing for maintenance access. Typically usable area = 50–70% of total terrace area.

---

## On-Grid vs Off-Grid: Which System Type?

### On-Grid (Most Common, Recommended):
- Connected to DISCOM grid
- Works with net metering
- No battery required (most affordable)
- Eligible for PM Surya Ghar subsidy
- Powers home during day, draws from grid at night

### Off-Grid (With Batteries):
- Works independently from grid
- Needs battery bank (adds ₹60,000–₹2,50,000 to cost)
- Ideal for areas with frequent power cuts
- Not eligible for PM Surya Ghar subsidy
- Higher maintenance

### Hybrid (Best of Both):
- On-grid with battery backup
- Stores excess solar in battery, uses when grid fails
- Most expensive upfront
- Growing in popularity in metros with occasional cuts

---

## How to Calculate Your Payback Period

**Payback Period (years) = Net System Cost ÷ Annual Savings**

**Example for 3 kW in Pune:**
- System cost: ₹1,75,000
- Subsidy: ₹78,000
- Net cost: ₹97,000
- Monthly savings: ~₹3,500 (350 units × ₹10/unit)
- Annual savings: ₹42,000
- **Payback: 97,000 ÷ 42,000 = 2.3 years**

After payback, you generate free electricity for another 22+ years.

---

## Get a Free Quote for the Right System Size

The best way to know what size you need is a site visit from a professional installer who will assess your roof, consumption, and give you an accurate system design. [Find verified solar installers in your city →](https://gosolarindex.in)`,
    },
    {
      title: 'On-Grid vs Off-Grid vs Hybrid Solar Systems — Complete Comparison for India',
      slug: 'on-grid-off-grid-hybrid-solar-comparison',
      description: 'Detailed comparison of on-grid, off-grid, and hybrid solar systems for Indian homes. Learn which type suits your needs based on power cuts, budget, and roof size.',
      category: 'Guides',
      readTime: '9 min read',
      date: new Date('2026-02-05'),
      published: true,
      metaTitle: 'On-Grid vs Off-Grid vs Hybrid Solar System India — Which Should You Choose?',
      metaDescription: 'Compare on-grid, off-grid and hybrid solar systems for Indian homes. Which type suits your needs based on power cuts, budget, and subsidy eligibility.',
      content: `# On-Grid vs Off-Grid vs Hybrid Solar Systems — Complete Comparison for India

**Last Updated:** February 5, 2026

When you decide to go solar in India, the first technical decision is: what type of solar system do you want? The three main types — on-grid, off-grid, and hybrid — work very differently and suit different situations.

Choosing the wrong type is an expensive mistake. This guide helps you decide.

---

## Quick Overview

| Feature | On-Grid | Off-Grid | Hybrid |
|---------|---------|---------|--------|
| Battery Storage | No | Yes | Yes |
| Works During Grid Outage | No | Yes | Yes |
| PM Surya Ghar Subsidy | Yes | No | Limited |
| Net Metering | Yes | No | Yes (usually) |
| Cost | Lowest | Highest | Medium-High |
| Maintenance | Low | High | Medium |
| Best For | Stable grid, metro cities | Remote areas, frequent cuts | Urban areas with outages |

---

## On-Grid Solar Systems (Grid-Tied)

### How It Works:
Your solar panels generate DC electricity → Inverter converts it to AC → Powers your home → Excess goes to grid via net metering.

When solar is insufficient (night, cloudy day), you draw from the grid normally.

**Critical limitation:** If the grid fails, your on-grid system automatically shuts down. This is a safety requirement (anti-islanding protection) — to protect DISCOM linemen working on power lines.

### Components:
1. Solar panels
2. On-grid (string) inverter
3. Mounting structure
4. Bi-directional net meter (installed by DISCOM)
5. AC/DC cables and safety equipment

### Cost (3 kW system in 2025):
- Panels: ₹60,000–₹90,000
- On-grid inverter: ₹18,000–₹35,000
- Mounting + installation: ₹25,000–₹40,000
- **Total: ₹1,00,000–₹1,65,000 (before subsidy)**
- After PM Surya Ghar subsidy: ₹22,000–₹87,000

### Who Should Choose On-Grid:
- Metro cities with stable power supply (Mumbai, Bangalore, Chennai suburbs)
- Areas with less than 2–3 hours of daily power cuts
- Homeowners who want maximum financial return
- Those applying for PM Surya Ghar subsidy (mandatory for subsidy)

---

## Off-Grid Solar Systems

### How It Works:
Solar panels → Charge Controller → Battery Bank → Inverter → Powers your home.

Completely independent of the utility grid. All electricity is stored in batteries and drawn from them.

### Components:
1. Solar panels
2. Charge controller (MPPT or PWM)
3. Battery bank (Lead Acid or Lithium)
4. Off-grid inverter
5. Mounting structure

### Battery Types:
- **Lead Acid (Tubular):** ₹8,000–₹15,000 per unit, 3–5 year life, requires maintenance
- **Lithium Iron Phosphate (LiFePO4):** ₹20,000–₹50,000 per unit, 10+ year life, maintenance-free

### Cost (3 kW system with battery backup for 8 hours):
- Panels + charge controller: ₹90,000–₹1,20,000
- Battery bank (20 kWh): ₹1,20,000–₹4,00,000 (lead acid to lithium)
- Off-grid inverter: ₹25,000–₹50,000
- **Total: ₹2,35,000–₹5,70,000**
- **No PM Surya Ghar subsidy applicable**

### Who Should Choose Off-Grid:
- Remote villages or farms without grid connectivity
- Areas with 8–12 hours of daily power cuts
- Sites where DISCOM refuses net metering connection
- Telecom towers, remote cabins, agricultural pumps

### Hidden Costs to Know:
- Battery replacement every 3–5 years (lead acid) = ₹1,20,000–₹2,50,000
- Maintenance costs are higher
- Overall 25-year ownership cost is usually higher than on-grid

---

## Hybrid Solar Systems

### How It Works:
Solar panels → Hybrid Inverter → Powers home + Charges battery → Excess to grid.

The hybrid inverter manages three sources: solar, battery, and grid — intelligently switching between them.

**During day:** Solar powers home, charges battery, exports excess to grid
**At night:** Battery powers home (up to battery capacity), then grid kicks in
**Grid outage:** Battery powers home from stored solar (true backup)

### Components:
1. Solar panels
2. Hybrid inverter (the most important component)
3. Battery bank (Lithium recommended)
4. Mounting structure
5. Smart monitoring system

### Popular Hybrid Inverters in India (2025):
- **Sungrow SH Series:** ₹45,000–₹1,20,000 — most popular
- **Growatt SPF/MIN TL-X:** ₹35,000–₹85,000 — budget-friendly
- **Sofar Solar:** ₹40,000–₹90,000
- **Deye:** ₹38,000–₹80,000

### Cost (3 kW hybrid system, 5 kWh battery):
- Panels: ₹65,000–₹95,000
- Hybrid inverter: ₹50,000–₹1,00,000
- Lithium battery (5 kWh): ₹1,00,000–₹1,50,000
- Mounting + installation: ₹25,000–₹40,000
- **Total: ₹2,40,000–₹3,85,000**

### Who Should Choose Hybrid:
- Urban homes with 2–6 hours daily power cuts
- Areas where EV charging is a priority
- Homeowners who want energy independence without fully going off-grid
- Those who want battery backup but also want net metering benefits

---

## The Power Cut Test: Which System is Right for You?

| Power Cuts per Day | Recommended System |
|-------------------|--------------------|
| Less than 1 hour | On-grid (cheapest, best ROI) |
| 1–4 hours | Hybrid with small battery (5–10 kWh) |
| 4–8 hours | Hybrid with medium battery (10–20 kWh) |
| 8+ hours or no grid | Off-grid with large battery bank |

---

## Subsidy Eligibility by System Type

| System Type | PM Surya Ghar Subsidy | State Subsidies |
|-------------|----------------------|-----------------|
| On-Grid | Yes — full subsidy | Usually yes |
| Off-Grid | No | Rarely (only for specific programs) |
| Hybrid | Partial (subsidy on panels, not batteries) | State-dependent |

---

## Recommendation for Indian Urban Homeowners (2025)

For the vast majority of urban and semi-urban homeowners in India:

1. **Best financial choice:** On-grid system — lowest cost, maximum subsidy, best ROI
2. **Best practical choice for most:** Hybrid with 5 kWh battery — handles typical power cuts while still being subsidy-eligible
3. **Avoid off-grid unless truly needed** — battery replacement costs make it expensive over time

[Get quotes for the right solar system in your city →](https://gosolarindex.in)`,
    },
    {
      title: 'How to Choose a Solar Installer in India — 10 Questions to Ask Before Signing',
      slug: 'how-to-choose-solar-installer-india',
      description: 'Before hiring a solar installer in India, ask these 10 critical questions. Learn what to check — MNRE certification, past work, warranty terms, and red flags to avoid.',
      category: 'Buying Guide',
      readTime: '8 min read',
      date: new Date('2026-02-10'),
      published: true,
      metaTitle: 'How to Choose a Solar Installer in India — 10 Questions to Ask',
      metaDescription: 'Before hiring a solar installer in India, ask these 10 questions. Check MNRE certification, workmanship warranty, past projects and avoid common scams.',
      content: `# How to Choose a Solar Installer in India — 10 Questions to Ask Before Signing

**Last Updated:** February 10, 2026

India's solar market is booming — and with it, the number of solar installation companies. The good ones have installed thousands of systems with excellent service. The bad ones take your money, install subpar panels, and disappear when you need warranty support.

Before you sign any contract or pay any money, ask every installer these 10 questions.

---

## Why Choosing the Right Installer Matters

Your solar installer is responsible for:
- Designing the right system for your home
- Procuring genuine panels and inverters (not fakes)
- Doing safe, high-quality installation
- Getting net metering approved from your DISCOM
- Providing after-sales service for 5–10 years
- Helping you claim the PM Surya Ghar subsidy

A bad installation can be dangerous (fire risk from poor wiring), underperform (wrong panel orientation), or leave you with no recourse for warranty claims.

---

## 10 Questions to Ask Every Solar Installer

### 1. Are you empanelled with my DISCOM?

**Why it matters:** Only DISCOM-empanelled vendors can submit net metering applications and PM Surya Ghar subsidy claims on your behalf.

**Good answer:** "Yes, we are registered with [Your DISCOM name]. Here is our vendor registration number."

**Red flag:** "We'll handle it, don't worry" without giving specifics.

Ask them to show you their empanelment certificate or look it up on your DISCOM's website.

---

### 2. What brands of panels and inverters do you supply?

**Why it matters:** Your panels will generate electricity for 25+ years. Brand matters for quality and warranty support.

**Good answer:** Names like Waaree, Adani Solar, Tata Power Solar, Vikram Solar (for panels), and Sungrow, Growatt, SMA, ABB/FIMER (for inverters).

**Red flag:** "Our own brand" or unfamiliar Chinese brands with no Indian presence, or vague answers like "good quality panels."

Ask for the make and model number, then look it up on the MNRE ALMM list to confirm it's subsidy-eligible.

---

### 3. How many systems have you installed in my city?

**Why it matters:** Local experience means faster DISCOM approvals, familiarity with local structural requirements, and an existing reference network.

**Good answer:** Specific numbers — "We have done 200+ installations in Pune, here are some references you can call."

**Red flag:** Vague claims like "thousands across India" with no local references. If they can't give you 2–3 local customer references, be suspicious.

---

### 4. Can I see your GSTIN and company registration?

**Why it matters:** Fly-by-night operators often have no formal company registration. If they disappear, you have no legal recourse.

**Good answer:** Shares GSTIN number immediately. Invoice will have GST breakup.

**Red flag:** "We prefer cash transactions" or "we can give you a cheaper rate without GST." This is a scam warning sign — if they hide from GST, they'll hide from warranty obligations too.

---

### 5. What is your workmanship warranty?

**Why it matters:** The panel brand gives a performance warranty (25 years). But installation defects (wrong wiring, loose mounts, water ingress) are the installer's responsibility, not the panel brand's.

**Good answer:** "We provide 5 years workmanship warranty on installation, all our work is insured."

**Industry standard:** 2–5 years workmanship warranty from installer
**Minimum acceptable:** 2 years

**Red flag:** "We don't have workmanship warranty" or "panels have 25-year warranty so you're covered" — installation defects are not covered by the panel brand.

---

### 6. What does your after-sales service include?

**Why it matters:** Solar systems need periodic inspections, cleaning, and occasionally component replacement. You need a responsive service team.

**Good answer:** "We have a dedicated service team in your city. AMC (Annual Maintenance Contract) is available at ₹X/year which includes 2 annual inspections and priority response for faults within 48 hours."

**Red flag:** "Just call us if there's a problem." No structured service commitment is a warning sign.

---

### 7. Will you handle the net metering application end-to-end?

**Why it matters:** Net metering application involves technical documentation, DISCOM submissions, and follow-ups. An experienced installer handles this without you lifting a finger.

**Good answer:** "Yes, we handle the complete net metering application including all documentation, site visits for meter change, and follow-up until the meter is installed. Expected time: 30–60 days."

**Red flag:** "You'll need to go to the DISCOM office yourself." This suggests limited DISCOM experience.

---

### 8. What are the payment terms?

**Why it matters:** Advance payment before work starts is a scam vector. Reliable installers accept payment in milestones.

**Standard payment structure:**
- 20–30% advance on signing
- 40–50% after material delivery at site
- 20–30% after commissioning and meter installation

**Red flag:** 100% advance demanded before any work starts. Or "cash only, no receipt" terms.

---

### 9. What monitoring system will I get?

**Why it matters:** You should be able to monitor your daily solar generation on your phone. Good inverters come with free apps.

**Good answer:** "Your Sungrow inverter comes with the iSolarCloud app, and you'll get real-time generation data. We'll help you set it up."

**Red flag:** No monitoring provided, or only a basic analog display at the inverter.

---

### 10. What is the expected payback period for my system?

**Why it matters:** A reputable installer should calculate your estimated payback period honestly. Beware of unrealistic promises.

**Realistic range (2025 India):** 3–7 years depending on city, consumption, and tariff rate

**Red flag:** Claims of 1–2 year payback, or refuses to discuss financial returns at all.

---

## Red Flags That Should Make You Walk Away

- No physical office address or registered company
- Pressure to sign within 24–48 hours ("offer expiring soon")
- Dramatically cheaper quote than everyone else (panel brand compromise)
- No written contract or very vague contract
- Won't share references of completed projects
- Asks for full payment before installation

---

## Getting Multiple Quotes

Always get quotes from at least **3 installers** before deciding. Compare:
- Panel brand and model
- Inverter brand and model
- Total system cost and cost per watt
- Warranty terms (workmanship + product + performance)
- Payment milestones
- Timeline for completion + net meter installation

[Find verified solar installers in your city and compare quotes →](https://gosolarindex.in)`,
    },
    {
      title: 'Solar Panel Maintenance in India — Annual Guide and Real Costs',
      slug: 'solar-panel-maintenance-guide-india',
      description: 'Complete guide to solar panel maintenance in India — how often to clean, AMC costs, common issues, how to check if your system is underperforming, and DIY vs professional maintenance.',
      category: 'Maintenance',
      readTime: '8 min read',
      date: new Date('2026-02-15'),
      published: true,
      metaTitle: 'Solar Panel Maintenance India — Annual Guide, AMC Costs & Common Problems',
      metaDescription: 'Solar panel maintenance guide for Indian homes — cleaning frequency, AMC costs, common problems, how to detect underperformance and when to call a technician.',
      content: `# Solar Panel Maintenance in India — Annual Guide and Real Costs

**Last Updated:** February 15, 2026

One of the biggest advantages of solar panels is that they require very little maintenance. However, "very little" doesn't mean "zero." In Indian conditions — with dust, bird droppings, monsoon residue, and high temperatures — your solar system needs periodic attention to keep performing at its best.

This guide covers everything you need to know about maintaining your rooftop solar system in India.

---

## How Much Maintenance Do Solar Panels Actually Need?

The honest answer: Not much. Here's the reality:

- **Panels:** Self-contained, no moving parts, rated for 25+ years
- **Inverter:** Electronic device, usually reliable for 10–15 years
- **Mounting structure:** Powder-coated galvanized steel, minimal maintenance
- **Wiring and connectors:** Outdoor-rated MC4 connectors, check annually

The biggest maintenance task in India? **Cleaning.**

---

## Why Cleaning is Critical in India

In most parts of the world, rain cleans panels adequately. In India, several factors make cleaning essential:

### 1. Dust and Haze
Especially in North India (Delhi, UP, Rajasthan) and industrial zones, dust accumulation can reduce output by 15–25% within just 2–4 weeks without cleaning.

### 2. Bird Droppings
A critical issue across India. Bird droppings are opaque and can cause **hot spots** — localized heating that damages cells over time. Unlike dust, rain doesn't clean bird droppings effectively.

### 3. Monsoon Residue
After rain, muddy residue often settles on panels. This is counterintuitively worse than pre-monsoon dust because it adheres better to the surface.

### 4. Industrial Pollution
Near industrial areas, panels accumulate oil and soot particles that don't wash off with rain and require scrubbing.

---

## Recommended Cleaning Frequency by Region

| Region | Conditions | Recommended Frequency |
|--------|-----------|----------------------|
| Delhi, UP, Bihar | High dust, pollution | Every 2 weeks (dry season) |
| Rajasthan, Gujarat | Very high dust | Every 2–3 weeks |
| Mumbai, Pune, Goa | Coastal + monsoon | Monthly (more in pre-monsoon) |
| Bangalore, Hyderabad | Moderate dust | Monthly |
| Chennai, Coimbatore | Dust + humidity | Every 3 weeks |
| Northeast, hills | Low dust, high rain | Every 6–8 weeks |

**General rule:** Clean at minimum once a month. In dusty periods, every 2 weeks.

---

## How to Clean Solar Panels

### DIY Cleaning (Ground Floor / Easy Roof Access):

**What you need:**
- Soft sponge or microfibre cloth (never abrasive materials)
- Long-handled squeegee or soft brush
- Clean water (avoid hard water — leaves mineral deposits)
- Mild soap if needed for stubborn dirt

**Step-by-step:**
1. Clean in the **morning or evening** — never on hot panels (thermal shock can cause micro-cracks)
2. Rinse panels gently with water first to loosen dust
3. Wipe with soft cloth in one direction — don't scrub in circles
4. Rinse off any soap residue completely
5. Let panels air-dry

**Never use:**
- Pressure washers (can damage seals and wiring)
- Metal scrapers or abrasive pads
- Detergents with harsh chemicals
- Alcohol-based cleaners

### Professional Cleaning:
Cost per cleaning: ₹200–₹500 for a 3 kW system (3–6 panels typically)

Many AMC providers include 2–4 cleanings per year in their contract.

---

## Annual Maintenance Checklist

Beyond cleaning, perform these checks once a year (ideally before summer, when solar generation is highest):

### Panels:
- [ ] Visual inspection for cracks, delamination, or yellowing
- [ ] Check for bird droppings, debris, or shading objects
- [ ] Verify no panels have shifted from mounting
- [ ] Look for discoloration (browning indicates potential hot spot issues)

### Inverter:
- [ ] Check display for any error codes
- [ ] Verify fan is working and vents are clean
- [ ] Confirm DC and AC voltage readings look normal
- [ ] Log in to monitoring app — compare current generation to historical data

### Wiring and Connectors:
- [ ] Check that MC4 connectors are firmly seated and dry
- [ ] Inspect cable routing for any exposed wires or rodent damage
- [ ] Verify earthing/grounding connection is intact

### Mounting Structure:
- [ ] Tighten any loose bolts (use torque wrench, not excessive force)
- [ ] Check for rust spots, especially on iron components
- [ ] Verify roof penetrations are sealed properly (no water ingress)

---

## Annual Maintenance Contract (AMC) — Is It Worth It?

An AMC with your solar installer typically costs:
- **3 kW system:** ₹3,000–₹6,000/year
- **5 kW system:** ₹4,500–₹8,000/year
- **10 kW system:** ₹7,000–₹12,000/year

### What a Good AMC Includes:
- 2–4 cleaning visits per year
- Annual technical inspection (inverter check, wiring, mounting)
- Priority response within 48 hours for faults
- Parts discount (typically 10–15% off retail price)
- Free remote monitoring alerts

### When AMC Makes Sense:
- Your system is above 3 kW (more to lose from underperformance)
- You're not comfortable with rooftop access for DIY cleaning
- Your system is under complex shading conditions requiring calibration
- You have a premium system (Sungrow, SMA inverters) where errors need expertise

### When AMC May Not Be Necessary:
- 1–2 kW small system
- Ground-floor accessible panels where you can DIY clean
- You have technically inclined family members to do annual checks

---

## Common Problems and Warning Signs

### Problem: Generation dropped suddenly
**Possible causes:** Dirty panels, inverter fault, shading from new construction, faulty string
**Action:** Check inverter display for errors. Clean panels. If problem persists after cleaning, call service engineer.

### Problem: One panel's output is lower than others
**Possible causes:** Partial shading, defective cell, bird droppings on that specific panel, micro-inverter failure (if applicable)
**Action:** Clean panels. If issue persists, check string voltage and alert your AMC provider.

### Problem: Inverter shows red light or error code
**Action:** Note the error code (photograph it). Check inverter manual. Contact installer or inverter brand's customer care.

### Problem: Generation gradually decreasing year-on-year
**Normal degradation:** Panels degrade 0.4–0.7% per year — this is normal and expected. After 25 years, output should be at least 80% of original.
**Abnormal:** More than 2% drop in a single year indicates a problem to investigate.

---

## When to Replace Components

| Component | Expected Life | Replacement Cost |
|-----------|--------------|-----------------|
| Solar Panels | 25–30 years | ₹1,20,000–₹2,00,000 (3 kW) |
| String Inverter | 10–15 years | ₹18,000–₹50,000 |
| Battery (Lead Acid) | 3–5 years | ₹60,000–₹1,50,000 |
| Battery (Lithium) | 10–15 years | ₹80,000–₹2,00,000 |
| MC4 Connectors | 15–20 years | ₹200–₹500 per pair |

---

## Find a Reliable Solar Maintenance Service

If you don't have an AMC or your original installer has closed down, you can find local solar service and maintenance companies. [Browse solar AMC and maintenance providers in your city →](https://gosolarindex.in)`,
    },
    {
      title: 'Commercial Solar for Businesses in India — ROI, Tax Benefits and Process',
      slug: 'commercial-solar-india-roi-tax-benefits',
      description: 'Complete guide to commercial rooftop solar for Indian businesses. ROI calculation, tax benefits (accelerated depreciation, GST input credit), process, and what system size you need.',
      category: 'Commercial Solar',
      readTime: '11 min read',
      date: new Date('2026-02-20'),
      published: true,
      metaTitle: 'Commercial Solar India — ROI, Tax Benefits & How to Get Started',
      metaDescription: 'Guide to commercial solar for Indian businesses. Calculate ROI, claim accelerated depreciation, GST input credit and net metering benefits. System sizing and process.',
      content: `# Commercial Solar for Businesses in India — ROI, Tax Benefits and Process

**Last Updated:** February 20, 2026

For Indian businesses, commercial rooftop solar isn't just about sustainability — it's a compelling financial decision. With electricity costs eating 5–15% of revenue for many manufacturers and commercial establishments, solar can deliver 25–40% reduction in power costs from day one.

This guide covers everything a business owner or CFO needs to know before investing in commercial solar.

---

## Why Commercial Solar Makes Financial Sense Right Now

### Key Drivers in 2025:
1. **Rising grid electricity costs** — commercial tariffs in most states have increased 8–12% annually
2. **Solar costs at historic lows** — ₹45–₹55 per watt for commercial installations
3. **Generous tax benefits** — 40% accelerated depreciation in year one
4. **Favorable net metering** — sell excess back to grid at good rates
5. **Fast payback** — typically 3–5 years for commercial installations

---

## Commercial Solar System Sizing

Unlike residential, commercial sizing is based on:
- **Sanctioned load** from your electricity connection
- **Available rooftop area** (80–90% utilization possible)
- **Monthly consumption** patterns (day vs night usage)

### Quick Sizing Guide for Commercial Properties:

| Rooftop Area | System Size | Monthly Generation | Monthly Savings (approx) |
|-------------|------------|-------------------|--------------------------|
| 2,000 sq ft | 20 kW | 2,400 units | ₹24,000–₹40,000 |
| 5,000 sq ft | 50 kW | 6,000 units | ₹60,000–₹1,00,000 |
| 10,000 sq ft | 100 kW | 12,000 units | ₹1,20,000–₹2,00,000 |
| 25,000 sq ft | 250 kW | 30,000 units | ₹3,00,000–₹5,00,000 |

*Savings based on commercial tariff of ₹10–₹17/unit depending on state and consumption slab.*

---

## Tax Benefits for Commercial Solar in India

This is where commercial solar becomes extremely attractive:

### 1. Accelerated Depreciation (AD)

Under Section 32 of the Income Tax Act, solar energy systems qualify for **40% accelerated depreciation** in the first year.

**Example:**
- Investment: ₹50 lakh (500 kW system)
- Year 1 depreciation claim: 40% = ₹20 lakh
- Tax saved (30% tax rate): ₹6 lakh
- **Effective net cost after tax benefit: ₹44 lakh (instead of ₹50 lakh)**

In subsequent years, WDV depreciation continues at 40% of remaining value.

### 2. GST Input Tax Credit

When your business is GST registered, you can claim Input Tax Credit (ITC) on the GST paid for solar equipment:

- Solar equipment attracts 12% GST
- ITC can be claimed against output GST liability
- **For a ₹50 lakh system: ₹5.36 lakh ITC recovery**

### 3. Green Energy Tax Benefits
Some states offer additional benefits:
- **Maharashtra:** Special incentive for green energy consumption
- **Gujarat:** Industrial solar policy offers additional capital subsidy for MSMEs
- **Rajasthan:** Wheeling charges concessions for solar consumers

### Combined Financial Impact (₹50 lakh installation):

| Benefit | Amount |
|---------|--------|
| Year 1 Accelerated Depreciation Tax Saving | ₹6,00,000 |
| GST Input Credit | ₹5,36,000 |
| **Effective Net Investment** | **₹38,64,000** |
| Annual Electricity Savings | ₹12,00,000–₹20,00,000 |
| **Payback Period** | **2–3 years** |

---

## Commercial vs Residential Solar: Key Differences

| Factor | Residential | Commercial |
|--------|------------|------------|
| Subsidy | PM Surya Ghar (up to ₹78,000) | No central subsidy (state schemes vary) |
| Tax Benefits | Minimal | Significant (AD + GST ITC) |
| Net Metering Limit | 10 kW per connection | 500 kW per connection |
| Tariff Rate | Lower (₹5–₹10/unit typical) | Higher (₹8–₹17/unit typical) |
| ROI Period | 4–7 years | 3–5 years |
| Financing Options | Limited | Equipment loans, RESCO, lease |

**Net effect:** Commercial buyers get better ROI despite no subsidy because the higher tariff rates and tax benefits more than compensate.

---

## Financing Options for Commercial Solar

### 1. Capex (Own Purchase)
- Pay full cost upfront
- Own the system, get all benefits
- Best for businesses with available capital
- Access to all tax benefits (AD, GST ITC)

### 2. Solar Loans (Equipment Financing)
Several banks offer solar-specific loans:
- **SBI Surya Shakti:** Up to ₹5 crore, 7–10% interest, 10-year tenure
- **PNB Solar:** MSME focused, competitive rates
- **Private banks (HDFC, ICICI):** Green energy loans at 9–12%

### 3. RESCO (Renewable Energy Service Company) Model
- Developer installs solar at no upfront cost to you
- You sign 15–25 year Power Purchase Agreement (PPA)
- Pay per unit of solar consumed (lower than grid rate)
- Developer owns, maintains, and insures the system
- **Ideal for:** Businesses that want zero capital expenditure

### 4. Operating Lease
- Pay monthly lease instead of purchasing
- Asset stays off balance sheet (operating expense, not capex)
- **Ideal for:** Businesses that want opex model for accounting reasons

---

## Step-by-Step Process for Commercial Solar

### Phase 1: Assessment (Week 1–2)
1. Shadow and rooftop analysis by installer
2. Review electricity bills (last 12 months) for consumption pattern
3. Structural assessment of rooftop (load-bearing capacity)
4. Quotations from 3+ vendors

### Phase 2: Technical Design (Week 3–4)
1. Single-line diagram (SLD) preparation
2. System design (panel layout, string configuration)
3. Final commercial proposal with financial projections

### Phase 3: DISCOM Approvals (Week 5–10)
1. Application for net metering/open access
2. DISCOM feasibility study and transformer assessment
3. Approval letter from DISCOM

### Phase 4: Installation (Week 11–16)
1. Equipment procurement and delivery
2. Mounting structure installation
3. Panel and inverter installation
4. Wiring and safety equipment installation
5. Testing and commissioning

### Phase 5: Metering and Go-Live (Week 17–20)
1. DISCOM meter change to net/bidirectional meter
2. Trial operation and monitoring setup
3. Commissioning certificate from DISCOM
4. Connection to monitoring platform (app-based)

---

## What to Check When Shortlisting Commercial Solar Vendors

For commercial installations, the stakes are higher. In addition to the standard questions, ask:

1. **EPC experience above 100 kW** — large systems need different expertise
2. **References from commercial clients** — factories, hotels, hospitals
3. **Insurance coverage** during installation (contractor all risk policy)
4. **Performance monitoring with SLA** — guaranteed uptime commitment
5. **Grid compliance** — IEC 61727, IS 13160, grid code compliance

---

## Which Businesses Benefit Most from Solar?

**High ROI (short payback):**
- Manufacturing plants (high daytime consumption = high self-consumption)
- Cold storage facilities (24/7 high loads, solar reduces day costs)
- Hotels and hospitality (large rooftops, high AC loads)
- Educational institutions (high daytime usage, often large rooftops)
- Hospitals (critical loads, solar + battery for backup)

**Moderate ROI:**
- IT parks and offices (high daytime usage but expensive urban land)
- Retail malls (mixed day/night consumption)
- Warehouses (large rooftop, low consumption — better for open access)

[Find commercial solar installers in your city →](https://gosolarindex.in)`,
    },
    {
      title: 'Best Solar Inverters in India 2025 — Types, Brands and Prices',
      slug: 'best-solar-inverters-india-2025',
      description: 'Guide to best solar inverters in India in 2025 — string inverters, microinverters, and hybrid inverters. Compare Sungrow, Growatt, SMA, Delta, Fimer and more with prices.',
      category: 'Guides',
      readTime: '10 min read',
      date: new Date('2026-02-25'),
      published: true,
      metaTitle: 'Best Solar Inverters in India 2025 — Brands, Types and Prices Compared',
      metaDescription: 'Compare best solar inverters available in India in 2025. String inverters, hybrid inverters, microinverters — Sungrow, Growatt, SMA, Delta, Fimer prices and features.',
      content: `# Best Solar Inverters in India 2025 — Types, Brands and Prices

**Last Updated:** February 25, 2026

The solar inverter is the brain of your solar system. It converts DC power from your panels to AC power your home uses, manages grid connectivity, handles battery charging (in hybrid systems), and provides monitoring data.

While panels last 25+ years, inverters typically last 10–15 years and are the most likely component to need replacement. Choosing the right inverter brand and type matters enormously.

---

## Types of Solar Inverters in India

### 1. String Inverters (Most Common for Residential)

All your solar panels connect in series ("strings") to a single inverter.

**How it works:**
- Panels in series → DC combiner → String inverter → AC output → Distribution board

**Pros:**
- Most affordable (₹15,000–₹50,000 for 3–5 kW)
- Reliable and proven technology
- Easy to diagnose and replace
- Wide service network in India

**Cons:**
- Entire system output affected if one panel underperforms (shading, dirt, fault)
- No panel-level monitoring (only string-level)
- Not ideal for complex roof shapes with partial shading

**Best for:** Standard flat rooftops without shading issues, which is the majority of Indian homes.

### 2. Microinverters

Each panel gets its own small inverter attached to the back.

**Pros:**
- Each panel operates independently — shading one panel doesn't affect others
- Panel-level monitoring and data
- Maximum energy harvest from complex rooftops
- No single point of failure

**Cons:**
- 3–5x more expensive than string inverters
- More components = more potential failure points
- Difficult to service (rooftop mounted on each panel)
- Limited service support in India

**Best for:** Complex rooftops with significant partial shading. Not recommended for standard Indian residential installations.

### 3. Hybrid Inverters (With Battery Integration)

Manages solar, battery, and grid simultaneously.

**Pros:**
- Works with battery backup
- Powers home during grid outages
- Intelligent energy management (self-consume, sell, charge)
- Single device replaces string inverter + battery inverter

**Cons:**
- 2–3x more expensive than basic string inverters
- Requires compatible battery brand (check compatibility)
- More complex to configure

**Best for:** Homes with power cuts who want backup power from solar.

### 4. Off-Grid Inverters

Work independently of the grid, always use batteries.

**Pros:**
- Complete independence from grid
- Works in areas without grid connection

**Cons:**
- No net metering
- No PM Surya Ghar subsidy
- Battery replacement every 3–5 years

**Best for:** Remote locations, farms, telecom towers without reliable grid.

---

## Top Inverter Brands in India — Detailed Comparison

### Sungrow (China/Global)

**Market position:** #1 globally and most popular in India
**Range:** 1 kW – 1 MW residential to commercial

| Model | Type | Power | Price (approx) |
|-------|------|-------|----------------|
| SG5.0RS | String | 5 kW | ₹22,000–₹28,000 |
| SH5.0RS | Hybrid | 5 kW | ₹50,000–₹65,000 |
| SG10RT | String | 10 kW | ₹40,000–₹52,000 |
| SH10RT | Hybrid | 10 kW | ₹85,000–₹1,10,000 |

**Why choose Sungrow:**
- Best after-sales service network in India (offices in 15+ cities)
- Industry-leading 10-year standard warranty (extendable to 20 years)
- Excellent efficiency (98.4% peak) and reliability
- Wide battery compatibility (SBR series lithium batteries)
- MNRE-approved, widely used in government projects

**App:** iSolarCloud (excellent UI, 10-year historical data)

---

### Growatt (China/Global)

**Market position:** #2 globally, very popular in India for budget segment
**Range:** 1 kW – 600 kW

| Model | Type | Power | Price (approx) |
|-------|------|-------|----------------|
| MIN 3000TL-X | String | 3 kW | ₹14,000–₹18,000 |
| MIN 5000TL-X | String | 5 kW | ₹18,000–₹24,000 |
| SPF 5000ES | Hybrid/Off-grid | 5 kW | ₹35,000–₹48,000 |
| MID 10KTL3-X | String | 10 kW | ₹38,000–₹48,000 |

**Why choose Growatt:**
- Best value-for-money option
- Good efficiency (97.6% peak)
- Decent service network in India
- ShinePhone app works well

**Caution:** Warranty support can be slower than Sungrow. Better for buyers with a reliable local installer who can handle issues.

---

### SMA (Germany)

**Market position:** Premium European brand
**Range:** 1.5 kW – multi-MW

| Model | Type | Power | Price (approx) |
|-------|------|-------|----------------|
| Sunny Boy 3.6 | String | 3.6 kW | ₹38,000–₹48,000 |
| Sunny Tripower 5.0 | String | 5 kW | ₹55,000–₹70,000 |
| Sunny Boy Storage 6.0 | Hybrid | 6 kW | ₹1,10,000–₹1,40,000 |

**Why choose SMA:**
- German engineering — extremely reliable, 20+ year track record
- Best-in-class monitoring (Sunny Portal)
- Excellent for harsh environments
- 10-year warranty as standard

**Drawback:** Premium pricing, 30–50% more expensive than Chinese alternatives.

**Best for:** High-end residential, premium villas, corporate installations where reliability is paramount.

---

### Delta Electronics (Taiwan/India)

**Market position:** Strong in commercial segment
**Range:** 2 kW – 1 MW

| Model | Type | Power | Price (approx) |
|-------|------|-------|----------------|
| RPI M5A | String | 5 kW | ₹20,000–₹28,000 |
| RPI H5A | Hybrid | 5 kW | ₹45,000–₹60,000 |
| SOLIVIA 15 | Commercial | 15 kW | ₹75,000–₹95,000 |

**Why choose Delta:**
- Strong manufacturing presence in India (factory in Rudrapur)
- Good for commercial installations
- Solid warranty and service support

---

### Luminous (India) and Havells (India)

**Market position:** Strong brand recognition, popular in Tier-2/3 cities

| Feature | Details |
|---------|---------|
| Price (5 kW) | ₹22,000–₹35,000 |
| Warranty | 5 years |
| Service | Excellent — widest service network in India |
| Efficiency | 96–97% (slightly below Sungrow/SMA) |
| Best for | Buyers who prioritize local service support |

---

## How to Choose the Right Inverter for Your Home

### For a standard 3–5 kW residential system in a metro city:
**Recommendation:** Sungrow string inverter (SG3RS or SG5RS)
Why: Best price-to-quality, excellent service, 10-year warranty

### For a home with daily power cuts (2–6 hours):
**Recommendation:** Sungrow or Growatt hybrid inverter with 5–10 kWh battery
Why: Provides backup power from solar during outages

### For a budget-conscious buyer in a Tier-2 city:
**Recommendation:** Growatt string inverter with local installer AMC
Why: Low cost, acceptable reliability, installer will handle any issues

### For a premium villa or commercial building:
**Recommendation:** SMA or Delta
Why: Long-term reliability, advanced monitoring, international standards

---

## Inverter Warranty: What to Look For

| Warranty Length | What It Means | Red Flag |
|-----------------|---------------|----------|
| 5 years | Industry minimum | Accept only from trusted brands |
| 7 years | Good | Standard for good brands |
| 10 years | Excellent | Sungrow, SMA standard |
| Extendable to 20 years | Best | Premium option, worth considering |

Always check: **Is the brand's Indian subsidiary the warranty provider, or the manufacturer? If it's a trading company, warranty claims can be very difficult.**

[Find solar installers in your city who supply quality inverters →](https://gosolarindex.in)`,
    },
    {
      title: 'Solar Panel Installation Process in India — What to Expect Step by Step',
      slug: 'solar-panel-installation-process-india',
      description: 'Complete guide to the solar panel installation process in India — from site survey to final commissioning. Timeline, what happens on each day, and what you need to arrange.',
      category: 'Guides',
      readTime: '8 min read',
      date: new Date('2026-03-01'),
      published: true,
      metaTitle: 'Solar Panel Installation Process in India — Step by Step Timeline',
      metaDescription: 'Complete guide to solar installation process in India. Site survey to commissioning — what happens each day, timeline, what you need to prepare and what to check.',
      content: `# Solar Panel Installation Process in India — What to Expect Step by Step

**Last Updated:** March 1, 2026

Going solar is a significant decision, and the installation process involves multiple stages spread over weeks to months. Knowing what to expect at each stage helps you plan, ask the right questions, and avoid delays.

Here is a complete walkthrough of the typical solar installation process in India from start to finish.

---

## Overview: Total Timeline

| Phase | Duration | What Happens |
|-------|----------|-------------|
| Site Survey | 1–3 days | Installer assesses rooftop |
| Quotation and Agreement | 1–7 days | You compare and sign |
| DISCOM Application | 7–30 days | Installer gets approval |
| Procurement | 7–14 days | Equipment sourced |
| Installation | 1–3 days | Physical work on roof |
| Inspection | 2–5 days | DISCOM visits |
| Net Meter Installation | 7–30 days | DISCOM changes meter |
| Commissioning | 1 day | System goes live |
| Subsidy Disbursement | 30–60 days | Money hits your account |

**Total: 45–120 days** depending on your state and DISCOM.

---

## Phase 1: Site Survey (Day 1–3)

After you contact a solar installer, the first step is a free site survey.

### What the installer assesses:
- **Rooftop area:** Usable flat space, after deducting water tanks, staircase structures, shading objects
- **Roof orientation:** South-facing roofs give maximum output in India; east-west is acceptable; north-facing is suboptimal
- **Shadow analysis:** Trees, neighboring buildings, water overhead tanks that shade panels during peak hours
- **Structural integrity:** Can the roof support the weight of panels and mounting structure? (Typically 15–25 kg/m²)
- **Electrical infrastructure:** Existing distribution board, main cable size, grounding system
- **Distance to distribution board:** Longer cable runs increase cost

### What you should have ready:
- Last 3–6 electricity bills (to confirm consumption pattern)
- Layout of the house/rooftop if available
- Clear access to rooftop for the surveyor

### What you receive:
- Recommended system size
- Panel layout design (how panels will be placed)
- Preliminary quotation

---

## Phase 2: Quotation Comparison and Contract Signing

After getting quotes from 3+ installers, compare:
- **System design** (panel brand, inverter brand, capacity)
- **Cost per watt** (good indicator of value)
- **Warranty terms** (workmanship + product + performance)
- **Timeline** promised for installation and net meter
- **Payment milestones** (avoid paying 100% upfront)

### Contract must include:
- Exact make and model of all components
- Total capacity (kW)
- Projected annual generation (kWh)
- Payment schedule tied to milestones
- Workmanship warranty duration
- AMC terms (if purchased)
- Timeline commitment

---

## Phase 3: DISCOM Application for Net Metering (Days 7–37)

For grid-connected systems, your installer applies for DISCOM approval before installation can begin.

### Application includes:
- Single Line Diagram (SLD) of proposed system
- Load details and sanctioned load from your connection
- Technical specifications of panels and inverter
- Site photos

### DISCOM review process:
1. Technical team reviews application
2. If any query, they contact installer (common — expect 1–2 rounds)
3. Feasibility letter issued (approves the capacity and site)

**Timeline:** 7–30 days. Faster in Maharashtra (MSEDCL portal is digitized), slower in some states where it's manual.

**Note:** In some states, DISCOM approval comes after installation. The installer knows local practice. Ask them to clarify the exact sequence in your state.

---

## Phase 4: Equipment Procurement (Days 14–28)

After DISCOM approval (or in parallel, depending on state practice), the installer procures equipment.

### For a standard 3 kW system, components ordered:
- 8–10 monocrystalline solar panels (depending on wattage)
- 1 string inverter (3 kW)
- Mounting structure (aluminum rails, L-feet, clamps)
- DC cables (6 mm²), AC cables (4–6 mm²)
- MC4 connectors, junction boxes
- DC/AC isolator switches, MCBs, surge protection devices
- Earthing rods and cables

**Delivery to site:** 7–14 days for branded equipment. Locally sourced structure may come faster.

### What you should check when equipment arrives:
- Ask for invoice/challan showing panel and inverter brand + model number
- Match with what was agreed in the contract
- Report any visible damage before work begins (photograph everything)

---

## Phase 5: Physical Installation (Day 1–3 at your site)

The actual installation work usually takes 1–3 days for a residential system.

### Day 1 — Mounting Structure:
- Marking of panel positions on roof (based on SLD)
- Drilling and fixing of anchor bolts into roof (sealed with waterproof compound)
- Aluminum rail installation (horizontal and vertical)
- **Key check:** Ensure sealant is properly applied at all drill points — poor sealing causes roof leakage later

### Day 2 — Panels and Inverter:
- Panels placed on mounting structure and clamped
- DC cables run from panels to inverter (usually through conduit or clipped along structure)
- Inverter mounted on wall near DB (inverter needs ventilation — should not be in direct sunlight)
- Earthing system connected

### Day 3 — Electrical and Testing:
- AC connection from inverter to distribution board
- Safety devices installed (DC/AC isolators, MCBs, surge protectors)
- Grounding completed and tested
- Pre-commissioning testing: open-circuit voltage, short-circuit current, insulation resistance test
- Inverter powered on — system should show generation

### Electricity supply during installation:
- The AC supply to the inverter is briefly disconnected during installation
- This takes 30–60 minutes maximum
- Rest of house supply remains unaffected

---

## Phase 6: DISCOM Inspection

After installation, the DISCOM sends a team to inspect:
- Verify installed capacity matches approved design
- Check safety compliance (isolators, earthing)
- Verify inverter model matches application

**Timeline:** 3–14 days for inspection appointment. Can be longer in busy states.

---

## Phase 7: Net Meter Installation

After inspection approval:
- DISCOM team visits to replace existing meter with bi-directional net meter
- Takes 1–2 hours on the day of visit
- **Timeline:** 7–30 days after inspection clearance

Once net meter is installed, your system is officially commissioned.

---

## Phase 8: Going Live and Monitoring Setup

On commissioning day:
- Installer helps you set up monitoring app (Sungrow iSolarCloud, Growatt ShinePhone, etc.)
- Verify real-time generation is showing correctly
- Review how to read your new bi-directional meter

**What to monitor:**
- Daily generation (kWh)
- Monthly generation vs expected
- Export vs import units

---

## Phase 9: PM Surya Ghar Subsidy Disbursement

If you registered under the PM Surya Ghar scheme:
1. Upload commissioning certificate on pmsuryaghar.gov.in
2. Submit bank account details
3. Subsidy credited within 30–60 days via DBT

---

## Common Installation Delays and How to Avoid Them

| Delay Cause | Solution |
|-------------|---------|
| DISCOM application rejection | Use experienced installer who knows your DISCOM |
| Equipment supply delay | Confirm procurement timelines before signing |
| Roof access issues | Clear roof before installation day |
| Transformer overload in area | Check with DISCOM before committing to large system |
| Meter replacement takes long | Follow up weekly with DISCOM after inspection |

---

[Find verified solar installers in your city who can manage this entire process for you →](https://gosolarindex.in)`,
    },
    {
      title: 'Solar PM KUSUM Scheme for Farmers — Complete Guide to Apply',
      slug: 'pm-kusum-solar-subsidy-farmers-india',
      description: 'Complete guide to PM KUSUM scheme for Indian farmers — solar pump subsidy, solarising agricultural feeders, and how to apply. Eligibility, cost, and benefits explained.',
      category: 'Government Schemes',
      readTime: '9 min read',
      date: new Date('2026-03-05'),
      published: true,
      metaTitle: 'PM KUSUM Scheme for Farmers India — Solar Pump Subsidy Guide 2025',
      metaDescription: 'Complete guide to PM KUSUM scheme — solar pump subsidy for Indian farmers. Eligibility, component A/B/C explained, costs after subsidy and how to apply.',
      content: `# PM KUSUM Scheme for Farmers — Complete Guide to Apply

**Last Updated:** March 5, 2026

India has over 2 crore agricultural pump sets running on diesel or grid electricity — a major cost burden for farmers and a significant source of pollution. The PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan) scheme aims to solarise these pump sets, providing farmers with free or subsidized solar power while also generating income.

Here is everything a farmer or agriculture officer needs to know about PM KUSUM.

---

## What is PM-KUSUM?

Launched in 2019, PM-KUSUM is a ₹34,422 crore scheme with three components:

### Component A — Small Solar Power Plants (Up to 2 MW)
- Farmers can set up solar plants of 500 kW to 2 MW on barren or fallow land
- Power is sold to DISCOMs at a fixed tariff for 25 years
- Provides stable income: ₹60,000–₹1,20,000 per acre per year
- Government provides 30% central subsidy, 30% state subsidy, farmer arranges 40%

### Component B — Standalone Solar Pumps
- Replaces diesel-powered agricultural pumps with solar pumps
- Individual pumps for individual farmers
- Capacity: 7.5 HP (5.6 kW) pumps most common; up to 10 HP available
- **Subsidy: 60% (30% central + 30% state)**
- **Farmer pays only 10% (remaining 30% is soft loan from bank)**
- Effectively, farmer pays only 10% of the cost

### Component C — Solarisation of Grid-Connected Pumps
- Existing grid-connected electric pumps get solar panels added
- Solar powers the pump during the day; excess electricity sold to grid
- Farmer gets income from selling surplus solar power
- **Subsidy: 30–35% on solar capacity**

---

## Component B Deep Dive: Solar Pump for Individual Farmer

This is the most popular component. Here's how it works:

### Who is Eligible:
- Indian farmer with agricultural land
- Currently using diesel pump or in area with poor grid connectivity
- Must have water source (borewell, open well, canal, pond)
- Land must be free from dispute

### Pump Capacities Available:
| Pump Size | Water Output | Suitable For | Total Cost | After Subsidy (Farmer Pays) |
|-----------|------------|--------------|-----------|------------------------------|
| 3 HP | 30,000–50,000 L/day | Small fields (up to 2.5 acres) | ₹3,00,000 | ₹30,000 |
| 5 HP | 50,000–80,000 L/day | Medium fields (2.5–5 acres) | ₹4,50,000 | ₹45,000 |
| 7.5 HP | 80,000–1,20,000 L/day | Large fields (5–10 acres) | ₹6,00,000 | ₹60,000 |
| 10 HP | 1,20,000–1,80,000 L/day | Very large farms | ₹7,50,000 | ₹75,000 |

*Actual costs vary by state. Bank loan available for remaining 30%.*

### Benefits for Farmer:
1. **Zero electricity cost** for irrigation (free solar energy)
2. **Independence from grid** — pump works even during power cuts
3. **No diesel cost** — currently many farmers spend ₹15,000–₹40,000/year on diesel
4. **Excess power income** (in Component C) — sell to DISCOM at ₹2–₹4/unit

### Payback Calculation (7.5 HP pump, Maharashtra):
- Farmer pays: ₹60,000
- Annual diesel savings: ₹25,000–₹40,000
- **Payback period: 18–30 months**
- **25-year benefit: ₹6–₹10 lakh in savings**

---

## How to Apply for PM-KUSUM Component B (Solar Pump)

### Step 1: Check State Implementation Agency
Each state implements KUSUM through its own agency:

| State | Implementing Agency |
|-------|-------------------|
| Maharashtra | MEDA (Maharashtra Energy Development Agency) |
| Gujarat | GEDA (Gujarat Energy Development Agency) |
| Rajasthan | RREC (Rajasthan Renewable Energy Corporation) |
| UP | UPNEDA (UP New and Renewable Energy Development Agency) |
| Karnataka | KREDL (Karnataka Renewable Energy Development Ltd) |
| Tamil Nadu | TEDA (Tamil Nadu Energy Development Agency) |

Visit your state agency's website or nearest office to get started.

### Step 2: Register Online
Most states now have online portals:
1. Register with Aadhaar and mobile number
2. Submit land details (khasra/khatauni number, area)
3. Submit water source details (borewell depth, open well details)
4. Upload required documents

### Step 3: Documents Required:
- Aadhaar card (farmer)
- Land ownership documents (7/12 extract or equivalent)
- Bank passbook copy
- Photograph of water source
- Consent form if land is jointly owned

### Step 4: Technical Assessment
State agency or their empanelled vendor will:
- Visit your field
- Assess water source and pump requirement
- Recommend pump capacity (HP)
- Issue approval letter

### Step 5: Vendor Selection and Installation
- Agency empanelled vendors will be assigned or you choose from approved list
- Installation takes 2–5 days typically
- Pump comes with 5-year comprehensive warranty

### Step 6: Subsidy Disbursement
- After installation and inspection, subsidy is transferred to vendor
- Farmer pays only their 10% share (plus bank EMI if loan taken)

---

## Component A: Solar Plant on Agricultural Land — Income for Farmers

If you have barren or fallow land not suitable for crops, Component A can generate regular income:

### How It Works:
1. Set up 500 kW to 2 MW solar plant on your land
2. Sign 25-year Power Purchase Agreement with DISCOM
3. Earn ₹3–₹4 per unit generated (fixed rate for 25 years)

### Land Requirement:
- 4–5 acres per MW of solar capacity
- Land must be within 5 km of existing 33 kV or 11 kV substation

### Income Estimate:
- 500 kW plant on 2–3 acres
- Annual generation: ~7,00,000 units
- Income at ₹3.50/unit: ₹24,50,000/year
- After loan repayment: ₹8,00,000–₹12,00,000 net per year

This is transformational for many farmers who have infertile land lying idle.

---

## State-Wise Progress and Availability (2025)

| State | Progress | Status |
|-------|----------|--------|
| Rajasthan | 1.5 lakh pumps installed | Active applications |
| UP | 75,000 pumps | Active |
| Maharashtra | 50,000 pumps | Active |
| Gujarat | 40,000 pumps | Active |
| Karnataka | 30,000 pumps | Active |

---

## Common Problems and How to Avoid Them

1. **Fake vendors claiming KUSUM affiliation** — only deal with state agency-empanelled vendors. Get vendor list from official agency website.
2. **Advance payment scams** — official KUSUM scheme involves farmer paying only after installation. Be suspicious of large advance demands.
3. **Wrong pump sizing** — insist on proper assessment before pump size is decided.

---

[Find solar companies helping farmers with PM KUSUM applications in your state →](https://gosolarindex.in)`,
    },
    {
      title: 'How Much Can Solar Save You in India? Savings Calculator & Real Examples',
      slug: 'solar-energy-savings-india-calculator-guide',
      description: 'Calculate how much you can save with solar panels in India. Real examples from Mumbai, Delhi, Bangalore and Jaipur with payback period, savings and ROI calculations.',
      category: 'Financial Guide',
      readTime: '10 min read',
      date: new Date('2026-03-10'),
      published: true,
      metaTitle: 'Solar Savings Calculator India — How Much Can You Save? (2025 Examples)',
      metaDescription: 'Calculate solar savings for Indian homes. See real examples from Mumbai, Delhi, Bangalore and Jaipur — monthly savings, payback period and 25-year returns.',
      content: `# How Much Can Solar Save You in India? Savings Calculator & Real Examples

**Last Updated:** March 10, 2026

"How much will I actually save?" is the first question every Indian homeowner asks before going solar. The honest answer: it depends on your city, electricity tariff, roof size, and consumption — but for most urban Indian homes, solar pays back in 4–7 years and then generates free electricity for 20+ more years.

Let's run real calculations.

---

## The Key Variables That Determine Your Savings

### 1. Electricity Tariff (Per Unit Cost)
This is the most important variable. Higher tariffs = more savings per unit of solar generated.

| State | Typical Residential Tariff | Solar ROI |
|-------|--------------------------|-----------|
| Mumbai (Adani) | ₹9–₹12/unit | Excellent |
| Delhi | ₹5–₹8/unit | Good |
| Bangalore | ₹5–₹8/unit | Good |
| Chennai | ₹3.5–₹6/unit | Moderate |
| Ahmedabad | ₹4–₹6/unit | Moderate |
| Jaipur | ₹5–₹8/unit | Good |

### 2. Solar Generation (How Much Your System Produces)

Generation depends on peak sun hours in your city:

| City | Peak Sun Hours | 1 kW Monthly Generation |
|------|--------------|------------------------|
| Jaipur | 6.5 hours | 195 units |
| Ahmedabad | 6.0 hours | 180 units |
| Delhi | 5.5 hours | 165 units |
| Hyderabad | 5.5 hours | 165 units |
| Pune | 5.5 hours | 165 units |
| Mumbai | 5.0 hours | 150 units |
| Bangalore | 5.0 hours | 150 units |
| Chennai | 5.0 hours | 150 units |
| Kolkata | 4.5 hours | 135 units |

### 3. System Cost (After Subsidy)

| System | Before Subsidy | PM Surya Ghar Subsidy | Net Cost |
|--------|---------------|----------------------|----------|
| 2 kW | ₹1,10,000–₹1,40,000 | ₹48,000 | ₹62,000–₹92,000 |
| 3 kW | ₹1,50,000–₹1,90,000 | ₹78,000 | ₹72,000–₹1,12,000 |
| 5 kW | ₹2,40,000–₹3,10,000 | ₹78,000 | ₹1,62,000–₹2,32,000 |

---

## Real Example 1: Mumbai Family (3 kW System)

**Family profile:**
- 3 BHK apartment in Andheri
- Monthly consumption: 350 units
- Monthly bill: ₹4,200 (Adani Electricity @ ~₹12/unit all-in)

**Solar system:**
- 3 kW on-grid system (8 panels of 375W each)
- Monthly generation: 450 units (5 peak sun hours × 30 days × 3 kW)
- Export to grid: ~100 units/month (after consuming 350)

**Monthly savings:**
- Self-consumed solar: 350 units × ₹12 = ₹4,200 savings
- Export credit: 100 units × ₹4/unit (grid rate) = ₹400
- **Total monthly savings: ₹4,600**

**Investment:**
- System cost: ₹1,75,000
- PM Surya Ghar subsidy: ₹78,000
- Net investment: ₹97,000

**Payback:** ₹97,000 ÷ ₹55,200/year = **1.75 years (21 months)**

**25-year total savings (adjusted for 5% annual tariff increase):**
- Year 1: ₹55,200
- Year 5: ~₹70,000
- Year 10: ~₹89,000
- **25-year total: ~₹28 lakh** from a ₹97,000 investment

---

## Real Example 2: Delhi NCR Home (5 kW System)

**Family profile:**
- Independent house in Noida
- Monthly consumption: 600 units
- Monthly bill: ₹4,800 (BSES @ ₹8/unit)

**Solar system:**
- 5 kW on-grid system
- Monthly generation: ~825 units (5.5 sun hours × 5 kW × 30 days)
- Self-consumption: 600 units
- Export: ~225 units/month

**Monthly savings:**
- Self-consumed solar: 600 units × ₹8 = ₹4,800
- Export credit: 225 units × ₹3.50/unit = ₹787
- **Total: ₹5,587/month**

**Investment:**
- System cost: ₹2,80,000
- Subsidy: ₹78,000
- Net: ₹2,02,000

**Payback:** ₹2,02,000 ÷ ₹67,044/year = **3 years**

**25-year return:** ~₹35 lakh (with 5% annual tariff increase)

---

## Real Example 3: Jaipur Home (3 kW System)

**Why Jaipur is the best case in India:**
- 6.5 peak sun hours (highest in India)
- Even moderate tariffs give great returns

**Family profile:**
- 3 BHK home
- Monthly consumption: 300 units
- Monthly bill: ₹2,400 (JVVNL @ ₹8/unit)

**Solar generation:**
- 3 kW × 6.5 sun hours × 30 days = **585 units/month**

**Monthly savings:**
- Self-consumed: 300 units × ₹8 = ₹2,400 (zero bill)
- Export: 285 units × ₹3.14/unit = ₹895
- **Total: ₹3,295/month**

**Investment (net): ₹85,000 (after ₹78,000 subsidy from ₹1,63,000 system)**

**Payback: 85,000 ÷ 39,540/year = 2.15 years (26 months)**

**This is one of the best solar ROI cases in the country.**

---

## Real Example 4: Bangalore Tech Professional (5 kW Hybrid)

**Profile:**
- Villa in Whitefield
- Monthly consumption: 500 units
- 3–4 hour power cuts daily (hence hybrid + battery)
- Monthly bill: ₹4,500 (BESCOM @ ₹9/unit)

**System:**
- 5 kW hybrid system + 10 kWh lithium battery
- Monthly generation: ~750 units

**Monthly savings:**
- Self-consumption savings: ₹4,500 (zero bill)
- Export: minimal (most captured in battery)
- **Monthly savings: ₹4,500**

**Investment:**
- System cost: ₹5,50,000 (panels + hybrid inverter + battery)
- Subsidy on panels only: ~₹50,000 (battery not subsidized)
- Net: ₹5,00,000

**Payback:** ₹5,00,000 ÷ ₹54,000/year = **9.3 years**

The payback is longer because of battery cost, but you gain reliable backup power during Bangalore's frequent outages — a significant quality-of-life benefit.

---

## How to Calculate Your Own Savings

### Step 1: Find your electricity tariff
Look at your bill. Note the per-unit rate in the highest slab you pay.

### Step 2: Determine your monthly consumption
From your bill (in kWh or units).

### Step 3: Size your system
Recommended kW = Monthly units ÷ (peak sun hours × 30)

### Step 4: Calculate generation
Monthly generation = System kW × Peak sun hours × 30

### Step 5: Calculate savings
Monthly savings = Min(consumption, generation) × tariff rate + Export × grid purchase rate

### Step 6: Find net cost
Get quotes, subtract PM Surya Ghar subsidy (max ₹78,000 for 3 kW+)

### Step 7: Calculate payback
Payback years = Net cost ÷ Annual savings

---

## Things That Can Reduce Your Actual Savings

1. **Shading:** Even 10% shading can reduce output by 20–30% (use microinverters or optimizers if unavoidable)
2. **Panel degradation:** ~0.5% per year — factor in for 25-year projections
3. **Inverter replacement:** One inverter replacement at year 12–15 costs ₹15,000–₹40,000
4. **Cleaning costs:** ₹2,000–₹4,000/year if using professional cleaning service
5. **Panel soiling:** Dirty panels generate 10–15% less — clean regularly

---

## Bottom Line: Is Solar Worth It in India in 2025?

**For most urban Indian homeowners with bills over ₹2,000/month: Yes, absolutely.**

- Payback in 2–5 years (often faster in high-tariff cities like Mumbai)
- 20+ years of near-free electricity after payback
- Protection against rising grid tariffs
- Increased property value (studies show 3–5% premium)
- Environmental benefit (1 kW solar offsets ~1.5 tonnes of CO₂ per year)

[Get free quotes from verified solar installers in your city →](https://gosolarindex.in)`,
    },
  ];

  let created = 0;
  let skipped = 0;

  for (const post of posts) {
    try {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: {
          title: post.title,
          description: post.description,
          content: post.content,
          category: post.category,
          readTime: post.readTime,
          published: post.published,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
        },
        create: {
          ...post,
          ogImage: null,
        },
      });
      console.log(`✅ Upserted: ${post.title}`);
      created++;
    } catch (err) {
      console.error(`❌ Failed: ${post.title}`, err);
      skipped++;
    }
  }

  console.log(`\n🎉 Done! Created/updated: ${created}, Skipped: ${skipped}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
