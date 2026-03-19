'use client';

import AdUnit from './AdUnit';

/**
 * Banner Ad - For horizontal placements
 * Optimized for top/bottom of pages
 */
export default function BannerAd() {
  return (
    <AdUnit
      adSlot="banner-ad"
      className="w-full max-w-4xl mx-auto my-6"
      fullWidthResponsive
    />
  );
}
