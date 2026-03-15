export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 h-16 animate-pulse" />

      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-12 bg-white/20 rounded w-3/4 mx-auto mb-6 animate-pulse" />
            <div className="h-6 bg-white/20 rounded w-1/2 mx-auto mb-8 animate-pulse" />
            <div className="h-12 bg-white/30 rounded-lg w-full max-w-2xl mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-20 mx-auto mb-2" />
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Listings Grid Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="p-5 space-y-4">
                  {/* Title */}
                  <div className="h-6 bg-gray-200 rounded w-3/4" />

                  {/* Category badge */}
                  <div className="h-6 bg-gray-200 rounded w-1/3" />

                  {/* Rating */}
                  <div className="h-5 bg-gray-200 rounded w-1/2" />

                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>

                  {/* Location */}
                  <div className="h-4 bg-gray-200 rounded w-2/3" />

                  {/* Buttons */}
                  <div className="grid grid-cols-3 gap-2 pt-4">
                    <div className="h-10 bg-gray-200 rounded-lg" />
                    <div className="h-10 bg-gray-200 rounded-lg" />
                    <div className="h-10 bg-gray-200 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
