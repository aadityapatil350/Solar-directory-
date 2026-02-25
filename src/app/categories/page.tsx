import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  title: 'Browse Solar Service Categories',
  description: 'Find solar installers, dealers, and service providers by category. Residential, commercial, inverters, and maintenance services.',
  path: '/categories',
});

export default async function CategoriesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
    cache: 'no-store',
  });
  const categories = await res.json();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">Browse Categories</h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            Find solar installers, dealers, and service providers by category
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category: any) => (
              <Link
                key={category.id}
                href={`/?categoryId=${category.id}`}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition border border-gray-200 group"
              >
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-orange-500 transition">
                  {category.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
