'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function BlogCTABox() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the article body
    const article = document.querySelector('.article-body');
    if (!article || !ctaRef.current) return;

    // Find all paragraphs in the article
    const paragraphs = article.querySelectorAll('p');

    // Insert CTA after 2nd paragraph if it exists
    if (paragraphs.length >= 2) {
      const secondPara = paragraphs[1];
      const ctaElement = ctaRef.current;

      // Clone the CTA element and insert it after the 2nd paragraph
      const ctaClone = ctaElement.cloneNode(true) as HTMLElement;
      ctaClone.style.display = 'block';
      secondPara.after(ctaClone);

      // Hide the original (it was just a template)
      ctaElement.style.display = 'none';
    }
  }, []);

  return (
    <div ref={ctaRef} style={{ display: 'none' }}>
      <div className="my-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 shadow-lg">
        <div className="text-center text-white">
          <h3 className="text-xl font-bold mb-2">Find Verified Solar Installers Near You</h3>
          <p className="text-orange-50 mb-4 text-sm">
            Compare quotes from trusted installers in your city
          </p>
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition shadow-md"
          >
            Browse Installers →
          </Link>
        </div>
      </div>
    </div>
  );
}
