import Link from 'next/link';
import Header from '@/components/Header';
import { Search, MapPin, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-lg mx-auto">
          <div className="text-8xl font-bold text-orange-500 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h1>
          <p className="text-gray-500 mb-8">
            This listing or page may have been updated, moved, or removed. Try searching for what you need below.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              <Search className="h-4 w-4" />
              Search Solar Companies
            </Link>
            <Link
              href="/locations"
              className="flex items-center justify-center gap-2 border border-gray-300 hover:border-orange-400 text-gray-700 font-semibold px-6 py-3 rounded-xl transition"
            >
              <MapPin className="h-4 w-4" />
              Browse by City
            </Link>
          </div>
          <Link href="/" className="inline-flex items-center gap-1 text-orange-600 hover:underline mt-8 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
