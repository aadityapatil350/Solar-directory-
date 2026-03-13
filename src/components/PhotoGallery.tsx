'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
}

export default function PhotoGallery({ photos, listingName }: { photos: Photo[]; listingName: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i! > 0 ? i! - 1 : photos.length - 1));
  const next = () => setLightboxIndex((i) => (i! < photos.length - 1 ? i! + 1 : 0));

  return (
    <>
      {/* Grid */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-orange-500" />
          Photos
          <span className="text-sm font-normal text-gray-400">({photos.length})</span>
        </h2>

        {/* First image large, rest in a row */}
        {photos.length === 1 ? (
          <button
            onClick={() => openLightbox(0)}
            className="block w-full aspect-video rounded-xl overflow-hidden bg-gray-100 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[0].url}
              alt={`${listingName} photo`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {/* First photo spans 2 cols if there are multiple */}
            <button
              onClick={() => openLightbox(0)}
              className={`block rounded-xl overflow-hidden bg-gray-100 group ${photos.length >= 2 ? 'col-span-2 row-span-2 aspect-video sm:aspect-square' : 'aspect-square'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[0].url}
                alt={`${listingName} photo 1`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </button>
            {/* Remaining photos */}
            {photos.slice(1).map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => openLightbox(i + 1)}
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 group relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={`${listingName} photo ${i + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* "+N more" overlay on last thumb if there are >4 photos not shown */}
                {i === 2 && photos.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                    <span className="text-white font-bold text-lg">+{photos.length - 4}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/40 rounded-full p-2 transition"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
            {lightboxIndex + 1} / {photos.length}
          </div>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white/80 hover:text-white bg-black/40 rounded-full p-2 transition"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl max-h-[85vh] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[lightboxIndex].url}
              alt={`${listingName} photo ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] mx-auto rounded-xl object-contain shadow-2xl"
            />
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white/80 hover:text-white bg-black/40 rounded-full p-2 transition"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}

          {/* Thumbnail strip */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((p, i) => (
                <button
                  key={p.id}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${
                    i === lightboxIndex ? 'border-orange-400' : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
