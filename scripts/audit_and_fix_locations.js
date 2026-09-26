const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

// Well-defined Indian PIN code ranges for directory cities
const PIN_CITY_MAP = [
  // Mumbai & MMR
  { min: 400001, max: 400099, city: 'Mumbai', state: 'Maharashtra' },
  { min: 400601, max: 400615, city: 'Thane', state: 'Maharashtra' },
  { min: 400701, max: 400710, city: 'Navi Mumbai', state: 'Maharashtra' },
  { min: 401201, max: 401210, city: 'Vasai', state: 'Maharashtra' },
  { min: 421201, max: 421204, city: 'Kalyan', state: 'Maharashtra' }, // Dombivli/Kalyan
  { min: 421301, max: 421306, city: 'Kalyan', state: 'Maharashtra' },
  // Maharashtra Rest
  { min: 411001, max: 411062, city: 'Pune', state: 'Maharashtra' },
  { min: 412001, max: 412412, city: 'Pune', state: 'Maharashtra' }, // Pune district
  { min: 422001, max: 422013, city: 'Nashik', state: 'Maharashtra' },
  { min: 440001, max: 440037, city: 'Nagpur', state: 'Maharashtra' },
  { min: 431001, max: 431010, city: 'Aurangabad', state: 'Maharashtra' },
  { min: 416001, max: 416013, city: 'Kolhapur', state: 'Maharashtra' },
  { min: 416416, max: 416416, city: 'Sangli', state: 'Maharashtra' },
  { min: 414001, max: 414006, city: 'Ahmednagar', state: 'Maharashtra' },
  { min: 415001, max: 415004, city: 'Satara', state: 'Maharashtra' },
  { min: 415601, max: 415639, city: 'Ratnagiri', state: 'Maharashtra' },
  { min: 413001, max: 413008, city: 'Solapur', state: 'Maharashtra' },
  { min: 431601, max: 431606, city: 'Nanded', state: 'Maharashtra' },
  { min: 425001, max: 425003, city: 'Jalgaon', state: 'Maharashtra' },
  { min: 444001, max: 444006, city: 'Akola', state: 'Maharashtra' },
  { min: 444601, max: 444607, city: 'Amravati', state: 'Maharashtra' },
  { min: 424001, max: 424006, city: 'Dhule', state: 'Maharashtra' },
  { min: 413512, max: 413531, city: 'Latur', state: 'Maharashtra' },
  { min: 413501, max: 413501, city: 'Osmanabad', state: 'Maharashtra' },
  // Metros
  { min: 110001, max: 110096, city: 'Delhi', state: 'Delhi' },
  { min: 560001, max: 560110, city: 'Bangalore', state: 'Karnataka' },
  { min: 500001, max: 500100, city: 'Hyderabad', state: 'Telangana' },
  { min: 600001, max: 600130, city: 'Chennai', state: 'Tamil Nadu' },
  { min: 700001, max: 700150, city: 'Kolkata', state: 'West Bengal' },
  { min: 380001, max: 380060, city: 'Ahmedabad', state: 'Gujarat' },
  { min: 302001, max: 302039, city: 'Jaipur', state: 'Rajasthan' },
  { min: 226001, max: 226030, city: 'Lucknow', state: 'Uttar Pradesh' },
  { min: 452001, max: 452020, city: 'Indore', state: 'Madhya Pradesh' },
  { min: 462001, max: 462050, city: 'Bhopal', state: 'Madhya Pradesh' },
  { min: 395001, max: 395010, city: 'Surat', state: 'Gujarat' },
  { min: 390001, max: 390025, city: 'Vadodara', state: 'Gujarat' },
  { min: 530001, max: 530050, city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { min: 641001, max: 641050, city: 'Coimbatore', state: 'Tamil Nadu' },
  { min: 682001, max: 682040, city: 'Kochi', state: 'Kerala' },
  { min: 160001, max: 160071, city: 'Chandigarh', state: 'Punjab' },
  { min: 751001, max: 751030, city: 'Bhubaneswar', state: 'Odisha' },
  { min: 492001, max: 492015, city: 'Raipur', state: 'Chhattisgarh' },
  { min: 248001, max: 248011, city: 'Dehradun', state: 'Uttarakhand' },
  { min: 143001, max: 143006, city: 'Amritsar', state: 'Punjab' },
  { min: 141001, max: 141015, city: 'Ludhiana', state: 'Punjab' },
  { min: 834001, max: 834010, city: 'Ranchi', state: 'Jharkhand' },
  { min: 800001, max: 800028, city: 'Patna', state: 'Bihar' },
  { min: 221001, max: 221011, city: 'Varanasi', state: 'Uttar Pradesh' },
  { min: 282001, max: 282010, city: 'Agra', state: 'Uttar Pradesh' },
  { min: 250001, max: 250005, city: 'Meerut', state: 'Uttar Pradesh' },
  { min: 208001, max: 208027, city: 'Kanpur', state: 'Uttar Pradesh' },
  { min: 211001, max: 211019, city: 'Allahabad', state: 'Uttar Pradesh' },
  { min: 570001, max: 570032, city: 'Mysore', state: 'Karnataka' },
  { min: 575001, max: 575030, city: 'Mangalore', state: 'Karnataka' },
  { min: 580020, max: 580032, city: 'Hubli', state: 'Karnataka' },
  { min: 590001, max: 590020, city: 'Belgaum', state: 'Karnataka' },
  { min: 625001, max: 625020, city: 'Madurai', state: 'Tamil Nadu' },
  { min: 620001, max: 620026, city: 'Tiruchirappalli', state: 'Tamil Nadu' },
  { min: 636001, max: 636016, city: 'Salem', state: 'Tamil Nadu' },
  { min: 627001, max: 627012, city: 'Tirunelveli', state: 'Tamil Nadu' },
  { min: 695001, max: 695043, city: 'Thiruvananthapuram', state: 'Kerala' },
  { min: 673001, max: 673032, city: 'Kozhikode', state: 'Kerala' },
  { min: 342001, max: 342028, city: 'Jodhpur', state: 'Rajasthan' },
  { min: 313001, max: 313004, city: 'Udaipur', state: 'Rajasthan' },
  { min: 334001, max: 334006, city: 'Bikaner', state: 'Rajasthan' },
  { min: 360001, max: 360007, city: 'Rajkot', state: 'Gujarat' },
  { min: 364001, max: 364006, city: 'Bhavnagar', state: 'Gujarat' },
  { min: 520001, max: 520015, city: 'Vijayawada', state: 'Andhra Pradesh' },
  { min: 524001, max: 524005, city: 'Nellore', state: 'Andhra Pradesh' },
  { min: 781001, max: 781039, city: 'Guwahati', state: 'Assam' },
];

const CITY_ALIASES = {
  bengaluru: 'Bangalore',
  mysuru: 'Mysore',
  mangaluru: 'Mangalore',
  prayagraj: 'Allahabad',
  'chhatrapati sambhajinagar': 'Aurangabad',
  sambhajinagar: 'Aurangabad',
  dharashiv: 'Osmanabad',
  belagavi: 'Belgaum',
  vijayapura: 'Bijapur',
  ahilyanagar: 'Ahmednagar',
};

async function auditAndFix(applyUpdates = false) {
  const allLocations = await prisma.location.findMany();
  const locationMap = new Map();
  for (const loc of allLocations) {
    locationMap.set(loc.city.toLowerCase(), loc);
  }

  const listings = await prisma.listing.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      description: true,
      category: { select: { name: true } },
      location: { select: { id: true, city: true, state: true } },
    },
  });

  const reassignments = [];

  for (const l of listings) {
    if (!l.address) continue;
    let addr = l.address;

    // 1. Extract 6-digit PIN code
    const pinMatch = addr.match(/\b([1-8]\d{5})\b/);
    const pin = pinMatch ? parseInt(pinMatch[1], 10) : null;

    // Strip highway names like "Mumbai - Goa Hwy", "Pune - Ahilyanagar Hwy" to prevent highway name false positives
    const sanitizedAddr = addr.replace(
      /([a-zA-Z\s]+)\s*-\s*([a-zA-Z\s]+)\s*(hwy|highway|rd|road|expressway|corridor|bypass)/gi,
      ' '
    );

    // Check if assigned city matches address or PIN
    const assignedCityLower = l.location.city.toLowerCase();
    const assignedRegex = new RegExp(`\\b${assignedCityLower}\\b`, 'i');

    let assignedMatches = assignedRegex.test(sanitizedAddr);
    for (const [alt, standard] of Object.entries(CITY_ALIASES)) {
      if (standard.toLowerCase() === assignedCityLower && new RegExp(`\\b${alt}\\b`, 'i').test(sanitizedAddr)) {
        assignedMatches = true;
        break;
      }
    }

    // Also check if PIN falls within assigned city
    if (!assignedMatches && pin) {
      const pinRule = PIN_CITY_MAP.find((m) => pin >= m.min && pin <= m.max);
      if (pinRule && pinRule.city.toLowerCase() === assignedCityLower) {
        assignedMatches = true;
      }
    }

    if (assignedMatches) continue;

    // If assigned city does NOT match, let's find the true city!
    let targetLocation = null;

    // Priority 1: Match by exact PIN code range
    if (pin) {
      const pinRule = PIN_CITY_MAP.find((m) => pin >= m.min && pin <= m.max);
      if (pinRule) {
        const found = locationMap.get(pinRule.city.toLowerCase());
        if (found) targetLocation = found;
      }
    }

    // Priority 2: Match by trailing address tokens
    if (!targetLocation) {
      const tokens = sanitizedAddr.split(',').map((t) => t.trim());
      for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i];
        if (/^(india|maharashtra|karnataka|gujarat|tamil nadu|rajasthan|\d{6})/i.test(token)) continue;

        for (const [alt, standard] of Object.entries(CITY_ALIASES)) {
          if (new RegExp(`\\b${alt}\\b`, 'i').test(token)) {
            const found = locationMap.get(standard.toLowerCase());
            if (found) {
              targetLocation = found;
              break;
            }
          }
        }
        if (targetLocation) break;

        for (const [cityKey, loc] of locationMap.entries()) {
          if (new RegExp(`\\b${cityKey}\\b`, 'i').test(token)) {
            targetLocation = loc;
            break;
          }
        }
        if (targetLocation) break;
      }
    }

    if (targetLocation && targetLocation.id !== l.location.id) {
      reassignments.push({
        id: l.id,
        name: l.name,
        current: `${l.location.city}, ${l.location.state}`,
        target: `${targetLocation.city}, ${targetLocation.state}`,
        targetId: targetLocation.id,
        targetCity: targetLocation.city,
        targetState: targetLocation.state,
        address: l.address,
        pin: pin,
        oldDescription: l.description,
        category: l.category.name,
      });
    }
  }

  console.log(`\n======================================================`);
  console.log(`AUDIT RESULT: ${reassignments.length} listings have mismatched locations.`);
  console.log(`======================================================\n`);

  for (const r of reassignments) {
    console.log(`- ${r.name}`);
    console.log(`  Current:  ${r.current} -> Target: ${r.target}`);
    console.log(`  Address:  ${r.address.slice(0, 100)}...`);
  }

  if (!applyUpdates) {
    console.log(`\nDRY RUN complete. Pass --apply to execute database updates.`);
    return;
  }

  console.log(`Applying updates to ${reassignments.length} listings in database...`);
  let updatedCount = 0;

  for (const r of reassignments) {
    const updateData = {
      locationId: r.targetId,
    };

    // If description mentions the old wrong city, regenerate it with the correct city!
    if (r.oldDescription && r.oldDescription.includes(r.current.split(',')[0])) {
      const cleanName = r.name.replace(/\|.*$/g, '').replace(/-.*$/g, '').trim();
      updateData.description = `${cleanName} is a verified solar solutions contractor based in ${r.targetCity}, ${r.targetState}. Located at ${r.address}, the company provides end-to-end ${r.category.toLowerCase()} services across ${r.targetCity} and neighboring regions, assisting homeowners and commercial properties with turnkey rooftop solar installations, DISCOM net-metering liaison, and PM Surya Ghar subsidy processing.`;
    }

    await prisma.listing.update({
      where: { id: r.id },
      data: updateData,
    });
    updatedCount++;
    console.log(`[UPDATED] ${r.name}: ${r.current} -> ${r.target}`);
  }

  console.log(`\nFinished updating ${updatedCount} listings successfully.`);
}

const shouldApply = process.argv.includes('--apply');
auditAndFix(shouldApply)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
