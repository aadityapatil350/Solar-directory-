import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Star,
  Info,
  Droplets,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '5 Best Solar Panel Cleaning Kits in India (2026 Review & Buying Guide) | GoSolarIndex',
  description:
    'Detailed review of top water-fed telescopic poles, rotating nylon brushes, and anti-static glass cleaners for rooftop solar in India. Compare prices, reach, and efficiency.',
  keywords: [
    'best solar panel cleaning kit india',
    'telescopic solar panel cleaning brush',
    'solar panel water fed pole india',
    'rooftop solar cleaning equipment',
    'solar panel cleaner liquid',
  ],
  alternates: {
    canonical: 'https://gosolarindex.in/guides/best-solar-panel-cleaning-kits-india',
  },
};

export default function SolarCleaningKitsGuide() {
  const products = [
    {
      id: 1,
      name: 'HydroClean Telescopic Water-Fed Solar Cleaning Pole (6 Meter / 20 Ft)',
      brand: 'HydroClean India',
      rating: 4.6,
      reviews: 320,
      price: '₹4,499',
      features: [
        'Water-fed aluminum lightweight extendable pole (6m / 20ft reach)',
        'Dual-jet nylon soft-bristle head that prevents AR coating scratching',
        'Standard garden hose connector with integrated on/off shutoff brass valve',
        'Rubberised anti-slip ergonomic grip for 2-storey rooftop reach',
      ],
      pros: [
        'Allows cleaning from ground without ladder risks',
        'Built-in brass water jets remove heavy dust and bird droppings',
        'Lightweight aluminium construction (< 2.2 kg)',
      ],
      cons: ['Requires steady household tap water pressure (> 2.5 bar)'],
      amazonLink: 'https://www.amazon.in/s?k=solar+panel+cleaning+telescopic+pole+water+fed&tag=gosolarindex-21',
      badge: 'Best Overall Pick',
    },
    {
      id: 2,
      name: 'SolarGlow 3-in-1 Rotating Hydro-Powered Cleaning Brush Kit',
      brand: 'SolarGlow Pro',
      rating: 4.5,
      reviews: 184,
      price: '₹6,850',
      features: [
        'Water pressure-driven rotating dual brush heads',
        'Telescopic carbon-composite pole with quick-lock clamps (7.2m reach)',
        'Includes 10-meter high-flex kink-free polyurethane water tube',
        'Soap/cleaning liquid dispenser chamber built into the handle',
      ],
      pros: [
        'Auto-rotating bristles cut cleaning time by 60%',
        'Gentle flag-tipped nylon bristles protect anti-reflective glass',
        'Built-in shampoo dosing container',
      ],
      cons: ['Higher investment cost than manual static poles'],
      amazonLink: 'https://www.amazon.in/s?k=solar+panel+rotating+cleaning+brush&tag=gosolarindex-21',
      badge: 'Fastest Cleaning',
    },
    {
      id: 3,
      name: 'EcoShine Concentrated Anti-Static Solar Glass Cleaner (5 Litres)',
      brand: 'EcoShine Chem',
      rating: 4.7,
      reviews: 512,
      price: '₹1,299',
      features: [
        'Bio-degradable, neutral pH formula (100% safe for aluminum frames)',
        'Anti-static nano coating technology repels dust and pollution for 30 days',
        'Leaves zero white water stains or hard-water calcium deposits',
        'Highly concentrated 1:20 dilution ratio (makes 100 litres)',
      ],
      pros: [
        'Increases generation yield by 12–18% on soiling-heavy panels',
        'Dust-repellent nano film extends time between cleaning cycles',
        'Safe for runoff into domestic rainwater harvesting tanks',
      ],
      cons: ['Requires manual spray bottle application or in-line dosing'],
      amazonLink: 'https://www.amazon.in/s?k=solar+panel+cleaning+liquid+concentrate&tag=gosolarindex-21',
      badge: 'Best Chemical Solution',
    },
    {
      id: 4,
      name: 'ProRoofer Microfiber Solar Wiper Squeegee with 12ft Extension Pole',
      brand: 'ProRoofer',
      rating: 4.4,
      reviews: 245,
      price: '₹2,199',
      features: [
        'Dual-sided head: micro-abrasive microfiber scrubber on one side, silicone squeegee on the other',
        'Telescopic twist-lock steel pole extending from 4ft to 12ft',
        'Machine washable reusable microfiber chenille pads (2 bonus replacements included)',
      ],
      pros: [
        'Budget-friendly price point for 1 kW - 3 kW home systems',
        'Silicone squeegee leaves glass 100% streak-free',
        'No water hose attachment required',
      ],
      cons: ['Shorter reach (12ft); not suitable for multi-row high ground mounts'],
      amazonLink: 'https://www.amazon.in/s?k=solar+panel+squeegee+extension+pole&tag=gosolarindex-21',
      badge: 'Best Value for Budget',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between">
      <div>
        <Header />

        {/* Breadcrumb */}
        <div className="bg-white border-b border-zinc-200">
          <div className="container mx-auto px-4 py-2.5">
            <nav className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Link href="/" className="hover:text-zinc-900 transition">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/blog" className="hover:text-zinc-900 transition">
                Guides
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-zinc-900 font-medium truncate">
                Best Solar Panel Cleaning Kits India
              </span>
            </nav>
          </div>
        </div>

        {/* Affiliate Disclosure Notice */}
        <div className="bg-amber-50/70 border-b border-amber-200/50 py-2 px-4 text-center">
          <p className="text-xs text-amber-900 flex items-center justify-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              <strong>Affiliate Disclosure:</strong> GoSolarIndex is reader-supported. When you purchase through links on this page, we may earn an affiliate commission from Amazon.in at zero additional cost to you.
            </span>
          </p>
        </div>

        {/* Main Header */}
        <section className="bg-white border-b border-zinc-200 py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              2026 Buying Guide & Hardware Review
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 mb-3">
              Best Solar Panel Cleaning Kits in India (2026)
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-3xl">
              Accumulated dust, vehicle soot, and bird droppings can decrease solar panel electricity generation by up to <strong>25% to 30%</strong> in Indian urban environments. Discover the most effective water-fed telescopic poles, rotating brushes, and anti-static cleaners to maintain peak 100% output safely.
            </p>
          </div>
        </section>

        {/* Guide Content */}
        <main className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
          {/* Quick Comparison Box */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-emerald-600" />
              Why DIY Cleaning Equipment Beats Local Hired Labor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-zinc-600 mt-4">
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="font-semibold text-zinc-900 mb-1">Protects AR Glass Coating</div>
                Rough household brooms or detergent powders like Surf Excel micro-scratch the anti-reflective glass coating, permanently reducing generation.
              </div>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="font-semibold text-zinc-900 mb-1">Eliminates Rooftop Fall Risks</div>
                Telescopic water-fed poles allow you to safely clean 2-storey elevated arrays with both feet firmly placed on the terrace floor.
              </div>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="font-semibold text-zinc-900 mb-1">1-Year Payback</div>
                Professional cleaning AMC services charge ₹1,500–₹3,000 per visit. A dedicated ₹3,500 cleaning kit pays for itself in less than 3 months.
              </div>
            </div>
          </div>

          {/* Product Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Top Recommended Solar Cleaning Kits in India
            </h2>

            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-white text-xs font-semibold">
                      {product.badge}
                    </span>
                    <span className="text-xs text-zinc-500">{product.brand}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold ml-1 text-zinc-900">{product.rating}</span>
                    </div>
                    <span className="text-zinc-400">({product.reviews} customer reviews)</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 mb-2">
                  {product.name}
                </h3>

                <div className="text-xl font-bold text-emerald-700 mb-4">
                  {product.price}{' '}
                  <span className="text-xs font-normal text-zinc-500">approximate Amazon.in price</span>
                </div>

                {/* Key Features */}
                <div className="space-y-1.5 mb-5 text-sm text-zinc-700">
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Key Specifications:
                  </div>
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 text-xs">
                  <div>
                    <div className="font-semibold text-emerald-800 mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> What We Liked
                    </div>
                    <ul className="space-y-1 text-zinc-600">
                      {product.pros.map((p, i) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-800 mb-1.5 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-amber-600" /> Considerations
                    </div>
                    <ul className="space-y-1 text-zinc-600">
                      {product.cons.map((c, i) => (
                        <li key={i}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Amazon Affiliate Button */}
                <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-zinc-500 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-zinc-400" /> Eligible for Amazon Prime Delivery
                  </div>
                  <a
                    href={product.amazonLink}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-sm px-6 py-2.5 rounded-xl transition shadow-sm"
                  >
                    Check Price on Amazon.in
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Expert Cleaning Protocol */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-zinc-900">
              Indian Solar Panel Cleaning Protocol (Avoid Costly Mistakes)
            </h2>
            <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
              <p>
                <strong>1. Never Clean in Midday Heat:</strong> Glass temperatures on Indian rooftops easily cross 65°C between 11 AM and 3 PM. Spraying cold tap water on boiling solar glass creates extreme thermal shock that can shatter the tempered glass pane instantly. Always clean before 8:00 AM or after 6:00 PM.
              </p>
              <p>
                <strong>2. Avoid Hard Borewell Water:</strong> Borewell water in cities like Bangalore, Pune, and Jaipur frequently contains 400+ TDS with high calcium and magnesium salts. When dry, this leaves a chalky white mineral film that blocks sun photons. Use a dedicated anti-static cleaning fluid or rinse with RO/rainwater.
              </p>
              <p>
                <strong>3. Do Not Walk on the Panels:</strong> Even if the tempered glass does not shatter under your weight, foot pressure causes invisible micro-cracks in the silicon wafer cells that worsen into hot spots and destroy the module warranty.
              </p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
