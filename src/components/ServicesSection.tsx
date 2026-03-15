'use client';

import { useState } from 'react';
import { Wrench, CheckCircle } from 'lucide-react';

export default function ServicesSection({ services }: { services: string[] }) {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? services : services.slice(0, 12);
  const hiddenCount = services.length - 12;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-2 text-sm font-medium border-b border-gray-200 pb-2 mb-4">
        <Wrench className="h-4 w-4 text-orange-500" />
        <h2>Services Offered</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {visibleServices.map((service) => (
          <span
            key={service}
            className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-md"
          >
            <CheckCircle className="h-3 w-3 text-green-500 shrink-0" />
            {service}
          </span>
        ))}
        {!showAll && hiddenCount > 0 && (
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-500 text-orange-600 text-xs font-semibold px-3 py-1 rounded-md hover:bg-orange-100 transition"
          >
            +{hiddenCount} more
          </button>
        )}
      </div>
    </div>
  );
}
