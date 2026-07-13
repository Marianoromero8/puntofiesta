'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getActivePopup } from '@/lib/api';
import type { PFAnnouncement } from '@/lib/types';

const SESSION_KEY = 'pf_popup_seen';

export default function PopupAnnouncement() {
  const [slides, setSlides] = useState<PFAnnouncement[]>([]);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    getActivePopup().then((data) => {
      if (data.length > 0) {
        setSlides(data);
        setVisible(true);
      }
    });
  }, []);

  const close = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, '1');
  };

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  if (!visible || slides.length === 0) return null;

  const slide = slides[current];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 cursor-pointer"
      onClick={close}
    >
      <div
        className="relative bg-white rounded-lg overflow-hidden shadow-2xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-80 bg-[#f8f8f8] flex items-center justify-center">
          <img
            src={slide.imageUrl}
            alt={slide.title ?? 'Anuncio'}
            className="max-h-full max-w-full object-contain"
          />

          {/* Arrows — only when more than 1 slide */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div className="flex justify-center gap-1.5 py-2 bg-white">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-2 rounded-full transition-all cursor-pointer"
                style={{
                  width: i === current ? '1.5rem' : '0.5rem',
                  backgroundColor: i === current ? '#FCFF4B' : '#d1d5db',
                  border: i === current ? '1px solid #044389' : 'none',
                }}
              />
            ))}
          </div>
        )}

        {/* Title — always same height to avoid layout shift */}
        <div className="px-5 py-3 border-t border-gray-100 h-11">
          {slide.title && (
            <p className="font-semibold text-[#044389] text-sm truncate">{slide.title}</p>
          )}
        </div>

        <div className="px-5 pb-5 pt-2">
          <button
            onClick={close}
            className="w-full text-[11px] uppercase tracking-[0.15em] bg-[#044389] text-[#FCFF4B] py-3 hover:bg-[#033070] transition-colors font-semibold rounded cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
