'use client';

import AdUnit from './AdUnit';

/**
 * In-Feed Ad - For placing between listings in grids
 * Optimized for mobile and desktop feeds
 */
export default function InFeedAd({ index }: { index: number }) {
  return (
    <div className="w-full">
      <AdUnit
        adSlot="in-feed-ad"
        className="my-4"
        fullWidthResponsive
      />
    </div>
  );
}
