'use client';

import AdUnit from './AdUnit';

/**
 * Sidebar Ad - For placing in sidebars (desktop)
 * Standard rectangular ad format
 */
export default function SidebarAd() {
  return (
    <div className="sticky top-4">
      <AdUnit
        adSlot="sidebar-ad"
        className="rounded-lg shadow-sm"
        fullWidthResponsive
      />
    </div>
  );
}
