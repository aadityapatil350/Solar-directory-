import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import LeadForm from '@/components/LeadForm';
import ServicesSection from '@/components/ServicesSection';
import PhotoGalleryModal from '@/components/PhotoGalleryModal';
import { prisma } from '@/lib/prisma';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import {
  Phone, Mail, Globe, MapPin, Star, ShieldCheck,
  ChevronRight, Zap,
  CheckCircle, Building2,
  MessageCircle, TrendingUp,
} from 'lucide-react';
import Script from 'next/script';
import { whatsappUrl as buildWhatsappUrl, telUrl, normalizeIndianPhone } from '@/lib/phone';

export const revalidate = 3600;    // ISR — revalidate every hour
export const dynamicParams = true; // serve new slugs on-demand

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function toWhatsApp(phone: string | null, companyName: string, categoryName: string): string | null {
  return buildWhatsappUrl(
    phone,
    `Hi ${companyName}, I found your listing on GoSolarIndex and would like to enquire about your ${categoryName} services.`,
  );
}

function toYouTubeEmbed(url: string | null): string | null {
  if (!url) return null;
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  if (url.includes('/embed/')) return url;
  return null;
}

function toGoogleMapsEmbed(address: string | null, name: string, city: string, state: string): string {
  const query = encodeURIComponent(`${address || name} ${city} ${state} India`);
  return `https://maps.google.com/maps?q=${query}&output=embed&z=15`;
}

// Generate category-specific buyer's guide content
function getCategoryGuide(categoryName: string, city: string, state: string): { title: string; intro: string; points: { heading: string; text: string }[]; faqs: { q: string; a: string }[] } {
  const lc = categoryName.toLowerCase();

  if (lc.includes('residential')) {
    return {
      title: `Residential Solar Installation in ${city} — Buyer's Guide`,
      intro: `Installing solar panels on your home in ${city}, ${state} is one of the best financial decisions you can make right now. With rising electricity tariffs and generous subsidies under PM Surya Ghar Yojana, most homeowners see payback in 3–6 years and then enjoy free electricity for 20+ more years.`,
      points: [
        { heading: 'Right System Size', text: `For a typical ${city} home consuming 300–500 units per month, a 3–5 kW system is ideal. Smaller 1–2 kW systems suit apartments. Your installer will calculate the exact size based on your electricity bill and roof space.` },
        { heading: 'PM Surya Ghar Subsidy', text: `Residential buyers in ${state} can claim up to ₹78,000 subsidy under PM Surya Ghar Muft Bijli Yojana — register at pmsuryaghar.gov.in before signing with any installer.` },
        { heading: 'Net Metering', text: `${city} homeowners with on-grid solar systems can export excess power to the ${state} grid and receive credit on their electricity bill, reducing your annual bill to near zero.` },
        { heading: 'Panel & Inverter Quality', text: `Insist on MNRE ALMM-listed panels (Waaree, Adani Solar, Tata Power Solar, Vikram Solar) and reputed inverters (Sungrow, Growatt, SMA). Avoid unknown brands with no Indian service centers.` },
        { heading: 'Workmanship Warranty', text: `Beyond the 25-year panel performance warranty, ensure your installer provides at least 2–5 years workmanship warranty on installation quality. Get this in writing in the contract.` },
      ],
      faqs: [
        { q: `What is the average cost of residential solar in ${city}?`, a: `A 3 kW residential solar system in ${city} typically costs ₹1,50,000–₹1,95,000 before subsidy. After the PM Surya Ghar subsidy of ₹78,000, your net cost is ₹72,000–₹1,17,000. Prices vary based on panel brand and installer.` },
        { q: 'How long does residential solar installation take?', a: 'From signing the contract to final commissioning, the process typically takes 45–90 days. The physical installation takes just 1–3 days; the majority of time is DISCOM application and net meter installation.' },
        { q: `Is ${city} a good location for solar panels?`, a: `Yes. ${city} receives 4.5–6.5 peak sun hours daily depending on the season, making it suitable for rooftop solar. Peak generation occurs in the summer months (March–May), which coincides with highest AC usage — maximizing self-consumption.` },
      ],
    };
  }

  if (lc.includes('commercial')) {
    return {
      title: `Commercial Solar Installation in ${city} — Business Guide`,
      intro: `For businesses in ${city}, commercial rooftop solar delivers compelling returns — typically 3–5 year payback with 40% accelerated depreciation tax benefit in Year 1 and GST input credit recovery. With commercial electricity tariffs at ₹8–₹17/unit in ${state}, every unit of self-generated solar power represents significant savings.`,
      points: [
        { heading: 'System Sizing for Businesses', text: `Commercial systems range from 10 kW for small shops to 500 kW+ for factories. The right size depends on your rooftop area, sanctioned load, and daytime consumption pattern. A detailed energy audit is recommended before sizing.` },
        { heading: 'Tax Benefits', text: `Under Section 32 of the Income Tax Act, solar assets qualify for 40% accelerated depreciation in Year 1. For a ₹50 lakh investment at 30% tax rate, this saves ₹6 lakh in taxes in the first year alone. Combined with GST input credit, effective cost drops significantly.` },
        { heading: 'Financing Options', text: `Commercial solar can be financed via equipment loans (SBI Surya Shakti, PNB, HDFC Green Loans), RESCO/PPA model (zero capex), or operating lease. RESCO is increasingly popular for businesses that want solar without upfront investment.` },
        { heading: 'Net Metering for Commercial', text: `${state} allows commercial net metering up to 500 kW per connection. Excess solar power is exported at rates set by ${state} Electricity Regulatory Commission, credited on your monthly bill.` },
        { heading: 'EPC Quality Matters More', text: `For large commercial installations, choose only experienced EPC contractors with references from similar capacity projects. Poor installation on a 100 kW+ system can cost crores in lost generation and roof damage.` },
      ],
      faqs: [
        { q: `What is the ROI for commercial solar in ${city}?`, a: `Typical commercial solar in ${city} delivers 20–33% IRR with 3–5 year payback. Exact ROI depends on your electricity tariff slab, system size, and financing structure. High-tariff consumers (above ₹10/unit) see the fastest payback.` },
        { q: 'Does my business qualify for PM Surya Ghar subsidy?', a: 'No — PM Surya Ghar is for residential consumers only. However, commercial installations benefit from much larger tax advantages (40% accelerated depreciation, GST ITC) which often exceed the residential subsidy in financial value.' },
        { q: 'How much rooftop area does my business need for solar?', a: 'Approximately 80–100 sq ft (7.5–9 sq meters) of shadow-free rooftop per kW of solar capacity. A 50 kW system needs roughly 4,000–5,000 sq ft. Your installer will do a detailed layout to maximize your rooftop utilization.' },
      ],
    };
  }

  if (lc.includes('dealer') || lc.includes('panel')) {
    return {
      title: `How to Buy Solar Panels in ${city} — Dealer's Guide`,
      intro: `Buying solar panels from the right dealer in ${city} ensures you get genuine, high-quality products with valid warranties. ${state} has numerous authorized dealers for top brands — understanding what to look for helps you avoid counterfeit panels and overpriced installations.`,
      points: [
        { heading: 'MNRE ALMM Certification', text: `Only purchase panels listed on the MNRE Approved List of Models and Manufacturers (ALMM). ALMM-listed panels are mandatory for PM Surya Ghar subsidy claims. Verify your panel model at mnre.gov.in/almm before purchasing.` },
        { heading: 'Top Brands Available in ${city}', text: `Major solar panel brands with dealer networks in ${city} include Waaree, Adani Solar, Tata Power Solar, Vikram Solar, Luminous, and Havells. Each has its own pricing and warranty structure.` },
        { heading: 'Price per Watt', text: `In ${city}, standard mono PERC panels are priced at ₹22–₹32 per watt for Tier 1 brands. TOPCon panels command a premium at ₹28–₹38 per watt. Always compare price per watt, not just system cost.` },
        { heading: 'Warranty Documentation', text: `Ensure you receive official warranty documentation from the manufacturer — not just from the dealer. The product warranty (10 years for defects) and performance warranty (25 years at 80%+ output) should be clearly documented with the manufacturer's letterhead.` },
        { heading: 'Authorized vs Unauthorized', text: `Buy only from authorized dealers. Unauthorized dealers may offer lower prices but often sell refurbished or out-of-spec panels. Check brand websites for official dealer lists in ${city}.` },
      ],
      faqs: [
        { q: `What is the current price of solar panels in ${city}?`, a: `Solar panels in ${city} are priced between ₹22–₹36 per watt for branded Tier 1 panels (Waaree, Adani, Tata). A complete 3 kW panel set (8–10 panels) costs ₹65,000–₹1,05,000. Prices vary by brand, wattage, and technology (mono PERC vs TOPCon).` },
        { q: 'Should I buy panels separately or as a package?', a: 'For most homeowners, buying a complete package from an installer (panels + inverter + installation + subsidy assistance) is more practical than buying panels separately. Individual panel purchase makes sense only if you have your own installer or are replacing specific panels in an existing system.' },
        { q: 'How do I verify a solar panel is genuine?', a: 'Check the serial number on the panel against the manufacturer\'s database (available on most brand websites). Verify the ALMM model number matches exactly. Genuine panels have clear brand markings, specifications printed on the back, and come with manufacturer seal intact.' },
      ],
    };
  }

  if (lc.includes('inverter')) {
    return {
      title: `Solar Inverters in ${city} — Buyer's Guide`,
      intro: `The solar inverter is the most critical component of your solar system — it converts DC power from panels to AC power for your home and manages grid connectivity. Choosing the right inverter brand and type in ${city} determines your system's reliability, efficiency, and after-sales service experience.`,
      points: [
        { heading: 'Types of Inverters', text: `String inverters (most affordable, best for standard rooftops), microinverters (panel-level optimization, best for complex rooftops with shading), and hybrid inverters (integrated battery management, best for homes with power cuts) are the three main types available in ${city}.` },
        { heading: 'Top Brands in ${city}', text: `Sungrow leads the market with the best service network in India. Growatt offers excellent value. SMA (Germany) commands a premium for reliability. Delta and ABB/Fimer serve the commercial segment. Local brands like Luminous have wide service centers.` },
        { heading: 'Warranty and Service', text: `Standard warranty is 5 years for most brands; Sungrow offers 10 years. Crucially, verify the brand has a service center in ${city} or ${state} — a warranty from a company with no local presence is hard to claim.` },
        { heading: 'Monitoring Apps', text: `Good inverters come with free mobile apps: iSolarCloud (Sungrow), ShinePhone (Growatt), mySMA (SMA). These let you track daily generation, detect underperformance, and get alerts for faults. Don't buy an inverter without a monitoring solution.` },
        { heading: 'Grid Compliance', text: `Inverters for Indian grid must comply with IEC 62116 (anti-islanding), IEC 61727, and CEA grid code. All reputed brands comply. Avoid cheap inverters that may not have proper grid protection — they can damage your home wiring or create safety hazards.` },
      ],
      faqs: [
        { q: `What is the price of solar inverters in ${city}?`, a: `Solar inverter prices in ${city}: String inverters range from ₹14,000–₹50,000 for 3–5 kW residential units (depending on brand). Hybrid inverters cost ₹35,000–₹1,10,000 for 3–5 kW. Microinverters cost 3–5x more than string inverters.` },
        { q: 'How long does a solar inverter last?', a: 'Quality string inverters last 10–15 years. Hybrid inverters also last 10–15 years. When budgeting for solar, plan for one inverter replacement during the 25-year panel life. Budget ₹18,000–₹50,000 for replacement around year 12–15.' },
        { q: 'What happens to my solar system if the inverter fails?', a: 'The system stops generating usable power (though panels still produce DC). Contact your installer or the inverter brand\'s service center. Most brands resolve inverter issues within 3–7 days if within warranty.' },
      ],
    };
  }

  // Default: AMC / Maintenance
  return {
    title: `Solar Panel Maintenance in ${city} — What to Know`,
    intro: `Solar systems in ${city} require periodic maintenance to ensure they generate maximum power throughout their 25+ year lifespan. ${state}'s climate — whether dusty, humid, or variable — affects how frequently your panels need attention. A proactive maintenance approach protects your investment.`,
    points: [
      { heading: 'Cleaning Frequency', text: `In ${city}, solar panels should be cleaned every 3–6 weeks during dry season, and after dust storms or monsoon. Dirty panels can lose 10–25% output. Use soft cloth and clean water — never abrasive materials or pressure washers.` },
      { heading: 'Annual Inspection', text: `Schedule one comprehensive annual inspection: check inverter performance, wiring connections, mounting bolts, earthing system, and panel condition. This catches issues before they become expensive problems.` },
      { heading: 'AMC Plans', text: `Annual Maintenance Contracts (AMC) in ${city} cost ₹3,000–₹8,000 per year for a 3–5 kW system, typically including 2–4 cleaning visits and priority fault response. AMC is recommended for systems above 3 kW or owners who can't access the rooftop easily.` },
      { heading: 'Monitoring for Issues', text: `Use your inverter's monitoring app to track daily generation. If generation drops more than 15% without weather explanation, investigate promptly. Common causes: soiling, shading from new construction, inverter fault, or failed panel.` },
      { heading: 'Warranty Claims', text: `Keep all documentation — installation contract, commissioning certificate, inverter and panel warranties. For warranty claims, contact the original installer first, then the brand's service center directly if the installer is unresponsive.` },
    ],
    faqs: [
      { q: `How much does solar panel maintenance cost per year in ${city}?`, a: `Annual maintenance costs for a 3 kW system in ${city} range from ₹2,000–₹6,000 depending on your cleaning frequency and whether you have an AMC. The biggest cost is professional cleaning — ₹300–₹600 per visit for a standard residential system.` },
      { q: 'How often should I service my solar inverter?', a: 'Inverters are largely self-maintaining but should be checked annually: clean the cooling vents, check for error codes, and verify monitoring data. A full service by a technician every 2–3 years is recommended for inverters above 5 kW.' },
      { q: 'What are signs my solar system needs maintenance?', a: 'Key warning signs: generation consistently lower than expected by 10%+, inverter showing error codes or red lights, visible physical damage to panels (cracks, discoloration), loose mounting structure, or any burning smell near the inverter.' },
    ],
  };
}

// Generate auto description for listing
function generateListingDescription(listing: {
  name: string;
  verified: boolean;
  category: { name: string };
  location: { city: string; state: string };
  rating: number | null;
  reviews: number;
  description: string | null;
}): string {
  let description = `${listing.name} is a ${listing.verified ? 'verified ' : ''}${listing.category.name.toLowerCase()} based in ${listing.location.city}, ${listing.location.state}.`;

  // Add rating and review info if available
  if (listing.reviews > 0 && listing.rating) {
    description += ` They have a ${listing.rating}/5 rating based on ${listing.reviews} customer review${listing.reviews > 1 ? 's' : ''} on Google.`;
  }

  // MNRE certified - assume all verified listings are MNRE certified
  if (listing.verified) {
    description += ` They are MNRE certified.`;
  }

  // Add service area info
  description += ` They serve residential and commercial solar customers in ${listing.location.city} and surrounding areas. Contact them directly for a free solar quote.`;

  return description;
}

// ─── Data fetching with caching ────────────────────────────────────────────────

const getListing = unstable_cache(
  async (slug: string) => {
    try {
      const listing = await prisma.listing.findUnique({
        where: { slug },
        include: {
          category: true,
          location: true,
          images: {
            orderBy: { order: 'asc' },
            take: 10,
          },
        },
      });

      // TODO: Uncomment after running database migration (see MIGRATION_REQUIRED.md)
      // Hide test listings from public (they'll only be accessible to admins via direct access)
      // if (listing && listing.isTest) {
      //   return null;
      // }

      if (listing) {
        prisma.listing.update({
          where: { id: listing.id },
          data: { views: { increment: 1 } },
        }).catch(() => {});
      }
      return listing;
    } catch (error) {
      console.error('Error fetching listing:', error);
      return null;
    }
  },
  ['listing-detail'],
  { revalidate: 300, tags: ['listings'] }
);

const getRelated = unstable_cache(
  async (categoryId: string, locationId: string, excludeId: string) => {
    try {
      const listings = await prisma.listing.findMany({
        where: { categoryId, locationId, id: { not: excludeId } },
        orderBy: [{ featured: 'desc' }, { verified: 'desc' }],
        take: 4,
        select: {
          id: true,
          name: true,
          slug: true,
          phone: true,
          rating: true,
          reviews: true,
          featured: true,
        },
      });
      return listings;
    } catch (error) {
      console.error('Error fetching related listings:', error);
      return [];
    }
  },
  ['related-listings'],
  { revalidate: 600, tags: ['listings'] }
);

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) return {};

  // Determine canonical URL
  // If slug ends with -<1-2 digits> (e.g., company-name-2), canonical points to base slug
  // Only match small suffixes so timestamp-based slugs (e.g. -1780146714660) are preserved
  const baseSlug = slug.replace(/-\d{1,2}$/, '');
  const isDuplicate = baseSlug !== slug;
  const canonicalSlug = isDuplicate ? baseSlug : slug;
  const canonicalUrl = `https://gosolarindex.in/listing/${canonicalSlug}`;

  // Generate description using the same helper function (truncated to 155 chars for meta)
  const fullDescription = generateListingDescription(listing);
  const description = fullDescription.length > 155
    ? fullDescription.slice(0, 152) + '...'
    : fullDescription;

  return constructMetadata({
    title: `${listing.name} — ${listing.category.name} in ${listing.location.city}`,
    description,
    path: `/listing/${slug}`,
    canonicalUrl: canonicalUrl,
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = await getListing(slug);

  // If listing not found, check if it's a duplicate pattern (-2, -3, etc.)
  // Only match 1-2 digit suffixes to avoid stripping timestamp-based slugs (e.g. -1780146714660)
  if (!listing) {
    const baseSlug = slug.replace(/-\d{1,2}$/, '');
    const isDuplicate = baseSlug !== slug;

    if (isDuplicate) {
      // Check if primary listing exists - if so, redirect there
      const primaryListing = await prisma.listing.findUnique({
        where: { slug: baseSlug },
        select: { slug: true }
      });

      if (primaryListing) {
        // 308 Permanent Redirect - tells search engines this is permanently moved
        permanentRedirect(`/listing/${baseSlug}`);
      }

      // Primary doesn't exist either - this duplicate was deleted
      // Return 404 (Google will eventually remove from index)
    }

    notFound();
  }

  const related = await getRelated(listing.categoryId, listing.locationId, listing.id);
  const whatsappUrl = toWhatsApp(listing.phone, listing.name, listing.category?.name);
  const phoneNormalized = normalizeIndianPhone(listing.phone);
  const telHref = telUrl(listing.phone);
  const mapSrc = toGoogleMapsEmbed(listing.address, listing.name, listing.location.city, listing.location.state);
  const initials = getInitials(listing.name);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listingImages: { id: string; url: string }[] = (listing as any).images ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const youtubeEmbedUrl = toYouTubeEmbed((listing as any).youtubeUrl ?? null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let serviceTags: string[] = [];
  try {
    const raw = (listing as any).serviceTags;
    if (raw) {
      const parsed = JSON.parse(raw);
      serviceTags = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.tags) ? parsed.tags : []);
    }
  } catch { /* ignore */ }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const installationsCount = (listing as any).installationsCount;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yearsExperience = (listing as any).yearsExperience;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const capacityMw = (listing as any).capacityMw;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const citiesCount = (listing as any).citiesCount;

  const listedYear = new Date(listing.createdAt).getFullYear();

  const siteUrl = 'https://gosolarindex.in';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: listing.name,
    description: listing.description || undefined,
    url: listing.website || `${siteUrl}/listing/${listing.slug}`,
    telephone: phoneNormalized.e164 || undefined,
    email: listing.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address || undefined,
      addressLocality: listing.location.city,
      addressRegion: listing.location.state,
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates' },
    aggregateRating: listing.reviews > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: listing.rating,
      reviewCount: listing.reviews,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Bank Transfer',
    areaServed: listing.location.state,
    serviceType: listing.category.name,
    hasMap: `https://www.google.com/maps/search/${encodeURIComponent(`${listing.name} ${listing.location.city}`)}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: listing.category.name, item: `${siteUrl}/categories/${listing.category.slug ?? ''}` },
      { '@type': 'ListItem', position: 3, name: listing.name, item: `${siteUrl}/listing/${listing.slug}` },
    ],
  };

  // Show only first 12 services initially
  const visibleServices = serviceTags.slice(0, 12);
  const hiddenServices = serviceTags.slice(12);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Script id="lb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="bc-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/categories/${listing.category.slug ?? ''}`} className="hover:text-orange-500 transition">
              {listing.category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate max-w-48">{listing.name}</span>
          </nav>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start gap-5">
            {/* Avatar - 72x72, rounded-2xl */}
            <div className="w-18 h-18 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold text-white shrink-0 border border-white/30">
              {initials}
            </div>

            {/* Center block - flex-1 */}
            <div className="flex-1 min-w-0">
              {/* Business name */}
              <h1 className="text-2xl font-medium text-white mb-2">{listing.name}</h1>

              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {listing.featured && (
                  <span className="flex items-center gap-1 bg-yellow-400/20 border border-yellow-300/40 text-yellow-100 text-xs font-semibold px-2 py-0.5 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-300" /> Featured
                  </span>
                )}
                {listing.verified && (
                  <span className="flex items-center gap-1 bg-green-400/20 border border-green-300/40 text-green-100 text-xs font-semibold px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" /> Verified
                  </span>
                )}
                <span className="flex items-center gap-1 bg-blue-400/20 border border-blue-300/40 text-blue-100 text-xs font-semibold px-2 py-0.5 rounded-full">
                  <ShieldCheck className="h-3 w-3" /> MNRE Certified
                </span>
              </div>

              {/* Subtitle row */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-white/85">
                <span>{listing.category.name}</span>
                <span>·</span>
                <span>{listing.location.city}</span>
                {listing.rating != null && listing.reviews > 0 && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
                      {listing.rating} ({listing.reviews} reviews)
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right block - stacked buttons */}
            <div className="flex flex-col gap-2 shrink-0">
              {telHref && (
                <a
                  href={telHref}
                  className="flex items-center justify-center gap-2 bg-white text-orange-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              )}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/15 text-white font-bold text-sm px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/25 transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-6 pt-3 border-t border-white/12 bg-black/12 -mx-4 px-4 sm:mx-0 sm:px-8 py-2.5 rounded-b-lg">
            <div className="flex flex-wrap items-center gap-6 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Responds within 24 hrs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span>Accepts UPI, Cash, Bank</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                <span>Listed since {listedYear}</span>
              </div>
              {yearsExperience && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span>{yearsExperience} years experience</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── AUTO-GENERATED DESCRIPTION ── */}
      <div className="container mx-auto px-4 pt-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-lg p-4 mb-2">
            <p className="text-sm text-gray-800 leading-relaxed">
              {generateListingDescription(listing)}
            </p>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* ── LEFT COLUMN (Main Content) ── */}
            <div className="flex-1 space-y-6">

              {/* Prominent Google Reviews block — before About */}
              {listing.rating != null && listing.reviews > 0 && (
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(`${listing.name} ${listing.location.city}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-xl p-5 border border-gray-200 hover:border-orange-300 hover:shadow-md transition group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl px-5 py-4 min-w-[100px]">
                      <div className="text-3xl font-bold text-gray-900">{listing.rating.toFixed(1)}</div>
                      <div className="flex items-center gap-0.5 my-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i <= Math.round(listing.rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">{listing.reviews} reviews</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        Rated {listing.rating.toFixed(1)}★ on Google
                      </div>
                      <div className="text-xs text-gray-600 leading-relaxed">
                        Based on {listing.reviews} verified customer review{listing.reviews === 1 ? '' : 's'} of {listing.name} in {listing.location.city}.
                      </div>
                      <div className="mt-2 text-xs font-semibold text-orange-600 group-hover:underline">
                        Read reviews on Google →
                      </div>
                    </div>
                  </div>
                </a>
              )}

              {/* Section 1 — About */}
              {listing.description && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2 text-sm font-medium border-b border-gray-200 pb-2 mb-3">
                    <Building2 className="h-4 w-4 text-orange-500" />
                    <h2>About</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">{listing.description}</p>
                </div>
              )}

              {/* Section 2 — At a Glance */}
              {(installationsCount || yearsExperience || capacityMw || citiesCount) && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2 text-sm font-medium border-b border-gray-200 pb-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <h2>At a Glance</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {installationsCount && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                        <div className="text-lg font-medium text-orange-600">{installationsCount}+</div>
                        <div className="text-xs text-gray-600 mt-0.5">Total Installations</div>
                      </div>
                    )}
                    {yearsExperience && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                        <div className="text-lg font-medium text-orange-600">{yearsExperience}</div>
                        <div className="text-xs text-gray-600 mt-0.5">Years Experience</div>
                      </div>
                    )}
                    {capacityMw && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                        <div className="text-lg font-medium text-orange-600">{capacityMw} MW</div>
                        <div className="text-xs text-gray-600 mt-0.5">Capacity Installed</div>
                      </div>
                    )}
                    {citiesCount && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                        <div className="text-lg font-medium text-orange-600">{citiesCount}+</div>
                        <div className="text-xs text-gray-600 mt-0.5">Cities Serviceable</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Section 3 — Services Offered */}
              {serviceTags.length > 0 && (
                <ServicesSection services={serviceTags} />
              )}

              {/* Section 4 — Contact */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 text-sm font-medium border-b border-gray-200 pb-2 mb-4">
                  <Phone className="h-4 w-4 text-orange-500" />
                  <h2>Contact</h2>
                </div>

                {/* CTA buttons row */}
                <div className="flex gap-2 mb-4">
                  {telHref && (
                    <a
                      href={telHref}
                      className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-3 rounded-lg transition"
                    >
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  )}
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm px-4 py-3 rounded-lg transition"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  )}
                </div>

                {/* Secondary actions */}
                <div className="flex gap-2 mb-4">
                  {listing.email && (
                    <a
                      href={`mailto:${listing.email}`}
                      className="flex items-center justify-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </a>
                  )}
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Website
                    </a>
                  )}
                  <button className="flex items-center justify-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition">
                    <Zap className="h-3.5 w-3.5" />
                    Get Quote
                  </button>
                </div>

                {/* Contact details grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {listing.address && (
                    <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <MapPin className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-gray-500">Address</div>
                        <div className="text-xs font-medium text-gray-900 leading-relaxed">{listing.address}</div>
                      </div>
                    </div>
                  )}
                  {telHref && (
                    <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <Phone className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-gray-500">Phone</div>
                        <a href={telHref} className="text-xs font-medium text-orange-600 hover:underline">{phoneNormalized.e164}</a>
                      </div>
                    </div>
                  )}
                  {listing.email && (
                    <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <Mail className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-gray-500">Email</div>
                        <a href={`mailto:${listing.email}`} className="text-xs font-medium text-gray-900 hover:text-orange-600 break-all">{listing.email}</a>
                      </div>
                    </div>
                  )}
                  {listing.website && (
                    <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <Globe className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-gray-500">Website</div>
                        <a
                          href={listing.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-orange-600 hover:underline break-all"
                        >
                          {listing.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Claim this listing button */}
                {!listing.userId && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/claim/${listing.slug}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition group"
                    >
                      <Building2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-medium">Own this business?</div>
                        <div className="text-xs text-gray-500">Claim your listing and manage it</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Section 5 — Photos */}
              {listingImages.length > 0 && (
                <PhotoGalleryModal photos={listingImages} listingName={listing.name} />
              )}


              {/* Section 6 — Location / Map */}
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                <div className="px-6 pt-5 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <h2>Location</h2>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(`${listing.name} ${listing.location.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Open in Google Maps →
                  </a>
                </div>
                <iframe
                  title={`${listing.name} location map`}
                  src={mapSrc}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="w-full lg:w-[340px] space-y-4 lg:sticky lg:top-4 lg:self-start">

              {/* Sidebar Card 1 — Lead Form */}
              <LeadForm
                prefill={{
                  requirement: listing.category.name,
                  city: listing.location?.city,
                }}
              />

              {/* Sidebar Card 2 — Business Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-[11px] font-medium text-gray-500 tracking-wider mb-3">BUSINESS DETAILS</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium text-gray-900 text-right">{listing.category.name}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500">City</span>
                    <Link href={`/${listing.location.city.toLowerCase()}`} className="font-medium text-orange-600 hover:underline">
                      {listing.location.city}
                    </Link>
                  </div>
                  {listing.reviews > 0 && (
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Rating</span>
                      <span className="font-medium text-gray-900">
                        <Star className="h-3 w-3 inline fill-orange-400 text-orange-400" /> {listing.rating}/5 ({listing.reviews})
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium text-green-600 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      Premium Partner
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar Card 3 — More Installers */}
              {related.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-medium text-gray-500 tracking-wider mb-3">
                    MORE {listing.category.name.toUpperCase()} IN {listing.location.city.toUpperCase()}
                  </h3>
                  <div className="space-y-2">
                    {related.map((r: typeof related[0]) => (
                      <Link
                        key={r.id}
                        href={`/listing/${r.slug}`}
                        className="bg-white border border-gray-200 rounded-xl p-3 flex gap-3 hover:border-orange-300 hover:shadow-sm transition"
                      >
                        <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600 shrink-0">
                          {getInitials(r.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-medium text-gray-900 truncate">{r.name}</div>
                          <div className="text-[11px] text-gray-500">
                            {r.reviews > 0 && (
                              <>
                                <Star className="h-2.5 w-2.5 inline fill-orange-400 text-orange-400" /> {r.rating} ({r.reviews})
                              </>
                            )}
                            {r.phone && <> · {r.phone}</>}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 text-center">
                    <Link
                      href={`/${listing.location.city.toLowerCase()}`}
                      className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                    >
                      View all solar companies in {listing.location.city} →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── BUYER'S GUIDE & FAQ SECTION ── */}
      {(() => {
        const guide = getCategoryGuide(listing.category.name, listing.location.city, listing.location.state);
        return (
          <div className="container mx-auto px-4 pb-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Buyer's Guide */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-3">{guide.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{guide.intro}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {guide.points.map((p, i) => (
                    <div key={i} className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-orange-500 shrink-0" />
                        <h3 className="text-sm font-semibold text-gray-900">{p.heading}</h3>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed ml-6">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-5">
                  Frequently Asked Questions — {listing.category.name} in {listing.location.city}
                </h2>
                <div className="space-y-5">
                  {guide.faqs.map((faq, i) => (
                    <div key={i} className="border-b border-gray-100 last:border-b-0 pb-5 last:pb-0">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internal links */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Helpful Resources</h3>
                <div className="flex flex-wrap gap-3">
                  <Link href="/blog/pm-surya-ghar-yojana-application-guide" className="text-sm text-orange-600 hover:underline">→ PM Surya Ghar Subsidy Guide</Link>
                  <Link href="/blog/solar-system-size-guide-india" className="text-sm text-orange-600 hover:underline">→ How to Size Your Solar System</Link>
                  <Link href="/blog/how-to-choose-solar-installer-india" className="text-sm text-orange-600 hover:underline">→ How to Choose an Installer</Link>
                  <Link href="/blog/solar-energy-savings-india-calculator-guide" className="text-sm text-orange-600 hover:underline">→ Calculate Your Solar Savings</Link>
                  <Link href={`/${listing.location.city.toLowerCase()}`} className="text-sm text-orange-600 hover:underline">→ More Solar Companies in {listing.location.city}</Link>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── MOBILE STICKY BOTTOM BAR ── */}
      {telHref && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-2 z-50 md:hidden">
          <a
            href={telHref}
            className="flex-[2] flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-4 py-3 rounded-lg transition"
          >
            <Phone className="h-4 w-4" />
            Call {listing.name.split(' ')[0]}
          </a>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-4 py-3 rounded-lg transition"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          )}
        </div>
      )}
    </div>
  );
}
