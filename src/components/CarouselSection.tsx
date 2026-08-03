'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getActiveCarousel } from '@/lib/api';
import type { PFAnnouncement } from '@/lib/types';

export default function CarouselSection() {
  const [slides, setSlides] = useState<PFAnnouncement[]>([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getActiveCarousel().then(setSlides);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  // Auto-slide every 4s
  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setInterval(next, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  };

  if (slides.length === 0) return null;

  return (
    <div className="w-full bg-[#f8f8f8] py-4">
      <hr className="border-gray-200 mb-4" />
    <section className="relative mx-auto rounded-xl overflow-hidden bg-[#f8f8f8]" style={{ height: '300px', maxWidth: '900px' }}>
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700 flex items-center justify-center"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title ?? ''}
            className="max-h-full max-w-full object-contain"
          />
          {slide.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
              <p className="text-white text-sm font-medium">{slide.title}</p>
            </div>
          )}
        </div>
      ))}

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => {
              prev();
              resetTimer();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors z-10 cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              next();
              resetTimer();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors z-10 cursor-pointer"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                resetTimer();
              }}
              className="h-1.5 rounded-full transition-all cursor-pointer"
              style={{
                width: i === current ? '1.25rem' : '0.375rem',
                backgroundColor: i === current ? '#FFC800' : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>
      )}
    </section>
    </div>
  );
}
