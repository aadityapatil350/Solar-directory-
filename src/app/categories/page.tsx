import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Link from 'next/link';
import { Zap, Home, Building2, ShoppingBag, Cpu, Wrench } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  title: 'Browse Solar Service Categories',
  description: 'Find solar installers, dealers, and service providers by category. Residential, commercial, inverters, and maintenance services.',
  path: '/categories',
});

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'residential-installers': <Home className="h-7 w-7 text-orange-500" />,
  'commercial-installers': <Building2 className="h-7 w-7 text-orange-500" />,
  'solar-dealers': <ShoppingBag className="h-7 w-7 text-orange-500" />,
  'inverter-specialists': <Cpu className="h-7 w-7 text-orange-500" />,
  'maintenance-services': <Wrench className="h-7 w-7 text-orange-500" />,
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { listings: true } } },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">Browse Categories</h1>
          </div>
          <p className="text-gray-600 mb-8">
            Find solar installers, dealers, and service providers by category
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {categories.map((category: typeof categories[0]) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition border border-gray-200 group flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition">
                  {CATEGORY_ICONS[category.slug] ?? <Zap className="h-7 w-7 text-orange-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500 transition">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">{category._count.listings} companies listed</p>
                </div>
                <span className="text-orange-400 group-hover:text-orange-600 text-xl font-bold shrink-0">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
