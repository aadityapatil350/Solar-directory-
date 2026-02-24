'use client';

interface FilterProps {
  categories: { id: string; name: string; slug: string }[];
  locations: { id: string; city: string; state: string }[];
  onFilter: (categoryId: string | null, locationId: string | null) => void;
}

export default function Filter({ categories, locations, onFilter }: FilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <select
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => onFilter(e.target.value || null, null)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
        <select
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => onFilter(null, e.target.value || null)}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.city}, {location.state}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Quick Filters</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-orange-500 rounded" />
            <span className="text-sm text-gray-700">Verified Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-orange-500 rounded" />
            <span className="text-sm text-gray-700">Featured Only</span>
          </label>
        </div>
      </div>
    </div>
  );
}
