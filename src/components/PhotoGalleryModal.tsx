'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
}

interface PhotoGalleryModalProps {
  photos: Photo[];
  listingName: string;
}

export default function PhotoGalleryModal({ photos, listingName }: PhotoGalleryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (photos.length === 0) return null;

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrevious();
  };

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 text-sm font-medium border-b border-gray-200 pb-2 mb-4">
          <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h2>Photos</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {photos.slice(0, 8).map((img, idx) => (
            <div key={img.id} className="relative shrink-0">
              <button
                onClick={() => openGallery(idx)}
                className="relative block w-24 h-18 rounded-lg overflow-hidden border border-gray-200 hover:border-orange-400 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <img
                  src={img.url}
                  alt={`${listingName} photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === 7 && photos.length > 8 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
                    +{photos.length - 8} more
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center"
          onClick={closeGallery}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10 bg-black/50 rounded-full p-2"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Previous Button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition bg-black/50 rounded-full p-3"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[currentIndex].url}
              alt={`${listingName} photo ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          {/* Next Button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition bg-black/50 rounded-full p-3"
              aria-label="Next photo"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Thumbnail Strip at Bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2 bg-black/50 rounded-lg">
            {photos.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-orange-500 scale-110'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={photo.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
