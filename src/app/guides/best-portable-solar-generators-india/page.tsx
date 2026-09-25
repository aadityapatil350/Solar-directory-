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
  Zap,
  BatteryCharging,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top 4 Best Portable Solar Generators in India (2026 Power Station Guide) | GoSolarIndex',
  description:
    'Detailed review of best portable solar generators and LiFePO4 power stations in India (EcoFlow, BLUETTI, Jackery). Compare battery capacity, inverter surge, and solar charging.',
  keywords: [
    'best portable solar generator india',
    'ecoflow delta power station india',
    'bluetti solar generator review india',
    'portable solar battery backup home',
    'foldable solar panel kit india',
  ],
  alternates: {
    canonical: 'https://gosolarindex.in/guides/best-portable-solar-generators-india',
  },
};

export default function PortableSolarGeneratorsGuide() {
  const generators = [
    {
      id: 1,
      name: 'EcoFlow DELTA 2 Portable Power Station (1024Wh LiFePO4, 1800W AC Output)',
      brand: 'EcoFlow',
      rating: 4.8,
      reviews: 410,
      price: '₹79,999',
      capacity: '1,024 Wh (Expandable up to 3,048 Wh)',
      acOutput: '1,800W Pure Sine Wave (2,700W X-Boost)',
      batteryLife: '3,000+ cycles to 80% capacity (LFP chemistry)',
      features: [
        '0-80% AC fast-charging in just 50 minutes via wall outlet',
        'Up to 500W MPPT solar input (charges 100% in 3-4 hours with 2x220W portable solar panels)',
        'Runs 90% of home appliances: refrigerators, CPAP, televisions, laptops, induction hobs',
        'Bluetooth and Wi-Fi smart app energy control and real-time wattage monitoring',
      ],
      pros: [
        'World-class ultra-fast 50-minute charging speed',
        'Long-lasting LiFePO4 battery lasts 10+ years of daily use',
        'EPS emergency power supply switchover in under 30ms',
      ],
      cons: ['Premium price point compared to traditional lead-acid inverters'],
      amazonLink: 'https://www.amazon.in/s?k=ecoflow+delta+portable+power+station&tag=gosolarindex-21',
      badge: 'Best High-Capacity Generator',
    },
    {
      id: 2,
      name: 'BLUETTI EB3A Portable Power Station (268Wh LiFePO4, 600W AC Inverter)',
      brand: 'BLUETTI',
      rating: 4.6,
      reviews: 620,
      price: '₹22,990',
      capacity: '268 Wh LiFePO4',
      acOutput: '600W Pure Sine Wave (1,200W Surge)',
      batteryLife: '2,500+ cycles to 80%',
      features: [
        'Ultra-portable weight: only 4.6 kg with integrated rugged carry handle',
        '200W MPPT solar input (charges in 2 hours in direct Indian sunlight)',
        'Wireless phone charging pad (15W) on top cover + 100W USB-C PD fast port',
        'Built-in LED emergency spotlight with SOS strobe mode',
      ],
      pros: [
        'Unbeatable value for camping, remote work, and brownout laptop backup',
        'Premium LiFePO4 cells that do not degrade in Indian summer heat',
        'Whisper-quiet fan operation (< 45 dB)',
      ],
      cons: ['Cannot run heavy inductive heating loads (like geysers or full-size mixers)'],
      amazonLink: 'https://www.amazon.in/s?k=bluetti+portable+power+station&tag=gosolarindex-21',
      badge: 'Best Portable Budget Pick',
    },
    {
      id: 3,
      name: 'BLUETTI AC200MAX Expandable Solar Generator (2,048Wh, 2,200W Inverter)',
      brand: 'BLUETTI',
      rating: 4.7,
      reviews: 195,
      price: '₹1,55,000',
      capacity: '2,048 Wh (Expandable up to 8,192 Wh with B230/B300 batteries)',
      acOutput: '2,200W Pure Sine Wave (4,800W Surge)',
      batteryLife: '3,500+ cycles to 80%',
      features: [
        'Massive 900W solar charging input (dual MPPT solar controller)',
        '16 versatile output ports including 12V/30A RV port and dual wireless charging pads',
        'Can run full home appliances including 1.5 ton inverter AC for 2–3 hours',
        'Touchscreen LCD screen for instant diagnostic and load metering',
      ],
      pros: [
        'True off-grid whole-home or farm power backup solution',
        'Immense 900W solar charging capability',
        'Heavy-duty industrial build quality',
      ],
      cons: ['Heavy unit (28 kg); best suited for stationary or vehicle-assisted use'],
      amazonLink: 'https://www.amazon.in/s?k=bluetti+ac200max+solar+generator&tag=gosolarindex-21',
      badge: 'Best Off-Grid Powerhouse',
    },
    {
      id: 4,
      name: 'EcoFlow 160W Foldable IP68 Waterproof Portable Solar Panel',
      brand: 'EcoFlow',
      rating: 4.5,
      reviews: 230,
      price: '₹28,500',
      capacity: '160W Monocrystalline Silicon',
      acOutput: 'MC4 Universal Output',
      batteryLife: '21.4% Premium Cell Efficiency',
      features: [
        'Foldable briefcase design with built-in adjustable kickstand case (30°–60° angle)',
        'IP68 waterproof and dustproof ETFE protective film coating',
        'Standard MC4 solar connectors compatible with EcoFlow, BLUETTI, and Jackery',
      ],
      pros: [
        'High 21.4% conversion efficiency even under partial haze',
        'Folds flat into a compact carrying bag (7 kg)',
        'Rugged ETFE coating withstands rain and extreme outdoor conditions',
      ],
      cons: ['Best paired with EcoFlow/BLUETTI power stations for optimal charging speeds'],
      amazonLink: 'https://www.amazon.in/s?k=foldable+solar+panel+160w+portable&tag=gosolarindex-21',
      badge: 'Best Solar Panel Add-on',
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
                Best Portable Solar Generators India
              </span>
            </nav>
          </div>
        </div>

        {/* Affiliate Disclosure Notice */}
        <div className="bg-amber-50/70 border-b border-amber-200/50 py-2 px-4 text-center">
          <p className="text-xs text-amber-900 flex items-center justify-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              <strong>Affiliate Disclosure:</strong> GoSolarIndex is reader-supported. Purchases made through our Amazon.in partner links earn an affiliate commission at zero extra charge to you.
            </span>
          </p>
        </div>

        {/* Header */}
        <section className="bg-white border-b border-zinc-200 py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Off-Grid Energy & Backup Tested
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 mb-3">
              Best Portable Solar Generators in India (2026)
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-3xl">
              Unlike noisy, toxic petrol or diesel generator sets, modern portable solar generators combine high-efficiency <strong>LiFePO4 battery storage</strong>, pure sine wave inverters, and fast MPPT solar controllers in a silent, zero-emission package.
            </p>
          </div>
        </section>

        {/* Content */}
        <main className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
          {/* Key Advantages Grid */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-600" />
              Why LiFePO4 Solar Generators Outperform Petrol Gen-Sets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-zinc-600">
              <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="font-semibold text-zinc-900 mb-1">Zero Fuel & Zero Noise</div>
                Charges completely free from sunlight. Operates silently at under 45 dB, making it safe for indoor apartments, bedrooms, and field camping.
              </div>
              <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="font-semibold text-zinc-900 mb-1">3,000+ Battery Lifecycles</div>
                Lithium Iron Phosphate (LiFePO4) chemistry lasts over 10 years of daily charge cycles, compared to 500 cycles for traditional lead-acid batteries.
              </div>
              <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="font-semibold text-zinc-900 mb-1">Pure Sine Wave Inverter</div>
                Safely powers sensitive modern electronics like MacBooks, CPAP machines, DSLR batteries, and routers without harmonic voltage distortion.
              </div>
            </div>
          </div>

          {/* Product Reviews */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Top Rated Portable Solar Generators & Power Stations
            </h2>

            {generators.map((gen) => (
              <div
                key={gen.id}
                className="bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-white text-xs font-semibold">
                      {gen.badge}
                    </span>
                    <span className="text-xs text-zinc-500">{gen.brand}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold ml-1 text-zinc-900">{gen.rating}</span>
                    </div>
                    <span className="text-zinc-400">({gen.reviews} reviews)</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 mb-2">{gen.name}</h3>

                <div className="text-xl font-bold text-emerald-700 mb-3">
                  {gen.price}{' '}
                  <span className="text-xs font-normal text-zinc-500">approximate Amazon.in price</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs mb-4 p-3 bg-zinc-50 rounded-xl border border-zinc-200/80">
                  <div>
                    <span className="text-zinc-400 block">Battery Capacity:</span>
                    <span className="font-semibold text-zinc-900">{gen.capacity}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">AC Continuous Output:</span>
                    <span className="font-semibold text-zinc-900">{gen.acOutput}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-zinc-400 block">Cycle Life:</span>
                    <span className="font-semibold text-zinc-900">{gen.batteryLife}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1.5 mb-4 text-sm text-zinc-700">
                  {gen.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Pros/Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 text-xs">
                  <div>
                    <div className="font-semibold text-emerald-800 mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pros
                    </div>
                    <ul className="space-y-1 text-zinc-600">
                      {gen.pros.map((p, i) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-800 mb-1 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-amber-600" /> Cons
                    </div>
                    <ul className="space-y-1 text-zinc-600">
                      {gen.cons.map((c, i) => (
                        <li key={i}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Amazon CTA Button */}
                <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-zinc-500 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-zinc-400" /> Official Manufacturer Warranty on Amazon India
                  </div>
                  <a
                    href={gen.amazonLink}
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

          {/* Sizing Recommendations */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-zinc-900">
              How to Pick the Right Capacity for Indian Power Outages
            </h2>
            <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
              <p>
                <strong>Under 300 Wh (Compact Backup):</strong> Ideal for freelance professionals, photographers, and apartment residents who need 12+ hours of laptop power, smartphone recharges, and Wi-Fi router operation during local grid maintenance cuts.
              </p>
              <p>
                <strong>1,000 Wh - 2,000 Wh (Family Refrigerator & Fan Backup):</strong> Capable of running a double-door refrigerator (150W), 3 ceiling fans (70W each), television, and LED lighting continuously for 5 to 8 hours during monsoon power outages.
              </p>
              <p>
                <strong>2,000+ Wh (Off-Grid Farmhouse / Medical):</strong> Powers heavy induction cooktops, submersible pressure water pumps, and air conditioning units for complete off-grid independence.
              </p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
