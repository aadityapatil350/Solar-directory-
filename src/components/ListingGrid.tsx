'use client';

import Link from 'next/link';
import ListingCard from './ListingCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Listing {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  rating: number | null;
  reviews: number;
  verified: boolean;
  featured: boolean;
  location: { id: string; city: string; state: string };
  category: { id: string; name: string };
  installerId?: string | null;
}

interface ListingGridProps {
  listings: Listing[];
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
}

export function ListingGrid({ listings, totalCount = listings.length, currentPage = 1, totalPages = 1 }: ListingGridProps) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {totalPages > 1 && (
        <>
          <div className="flex items-center justify-center gap-2 mt-10">
            <button className="p-2 rounded-lg border border-gray-200 hover:border-orange-400 disabled:opacity-40 disabled:cursor-not-allowed transition">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((item, idx) =>
                item === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">…</span>
                ) : (
                  <button
                    key={item}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                      currentPage === item
                        ? 'bg-orange-500 text-white'
                        : 'border border-gray-200 text-gray-700 hover:border-orange-400'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            <button className="p-2 rounded-lg border border-gray-200 hover:border-orange-400 disabled:opacity-40 disabled:cursor-not-allowed transition">
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-3">
            Showing {(currentPage - 1) * 12 + 1}–{Math.min(currentPage * 12, totalCount)} of {totalCount} results
          </p>
        </>
      )}
    </>
  );
}
