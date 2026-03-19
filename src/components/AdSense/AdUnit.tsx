'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  adSlot: string;
  adFormat?: string;
  className?: string;
  fullWidthResponsive?: boolean;
}

/**
 * Google AdSense Ad Unit Component
 *
 * Usage:
 * <AdUnit adSlot="1234567890" className="my-4" />
 *
 * Get ad slots from: https://www.google.com/adsense/new/u/0/pub-3540617055322931/myads/saved-adunits
 */
export default function AdUnit({
  adSlot,
  adFormat = 'auto',
  className = '',
  fullWidthResponsive = true,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Only run on client side and after component mounts
    if (typeof window === 'undefined') return;

    try {
      // Push the ad to the googletag array
      (window as any).googletag = (window as any).googletag || { cmd: [] };
      (window as any).googletag.cmd.push(() => {
        const slot = (window as any).googletag.defineSlot(
          `/22758357838/${adSlot}`,
          'fluid',
          adSlot
        );
        if (slot) {
          slot.addService((window as any).googletag.pubads());
          (window as any).googletag.enableServices();
        }
      });
    } catch (error) {
      console.warn('AdSense error:', error);
    }
  }, [adSlot]);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3540617055322931"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
      <style jsx global>{`
        .ad-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1rem 0;
          min-height: 100px;
          background: #f8f8f8;
          border-radius: 8px;
          overflow: hidden;
        }
        .adsbygoogle {
          display: block !important;
        }
      `}</style>
    </div>
  );
}
