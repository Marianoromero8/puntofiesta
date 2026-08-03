"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PFProduct } from "@/lib/types";
import ProductCard from "./ProductCard";

interface Props {
  products: PFProduct[];
}

export default function BestSellersSection({ products }: Props) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = products.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % n);
  }, [n]);

  const prev = () => setCurrent((c) => (c - 1 + n) % n);

  useEffect(() => {
    if (n <= 1) return;
    timerRef.current = setInterval(next, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [n, next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (n > 1) timerRef.current = setInterval(next, 3500);
  };

  if (n === 0) return null;

  const at = (offset: number) => products[(current + offset + n) % n];

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-black text-black uppercase tracking-wide">
          Lo más vendido
        </h2>
        <div className="flex-1 h-px bg-black/20" />
      </div>

      <div className="relative flex items-center justify-center gap-4 sm:gap-6 py-6">
        {n > 1 && (
          <button
            onClick={() => {
              prev();
              resetTimer();
            }}
            className="hidden sm:flex absolute left-0 z-20 bg-white shadow-md rounded-full p-1.5 hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5 text-black" />
          </button>
        )}

        {n >= 3 ? (
          <div
            key={current}
            className="flex items-center gap-4 sm:gap-6 [animation:pf-fade-scale_0.6s_ease]"
          >
            <div className="hidden sm:block relative w-44 shrink-0 scale-90 opacity-60 transition-all duration-700 ease-out hover:opacity-80">
              <button
                onClick={() => {
                  prev();
                  resetTimer();
                }}
                aria-label="Ver producto anterior"
                className="absolute inset-0 z-10 cursor-pointer"
              />
              <ProductCard product={at(-1)} />
            </div>
            <div className="w-56 sm:w-64 shrink-0 scale-105 z-10 shadow-xl rounded-2xl transition-all duration-700 ease-out">
              <ProductCard product={at(0)} />
            </div>
            <div className="hidden sm:block relative w-44 shrink-0 scale-90 opacity-60 transition-all duration-700 ease-out hover:opacity-80">
              <button
                onClick={() => {
                  next();
                  resetTimer();
                }}
                aria-label="Ver producto siguiente"
                className="absolute inset-0 z-10 cursor-pointer"
              />
              <ProductCard product={at(1)} />
            </div>
          </div>
        ) : (
          <div
            key={current}
            className="w-56 sm:w-64 shrink-0 [animation:pf-fade-scale_0.6s_ease]"
          >
            <ProductCard product={at(0)} />
          </div>
        )}

        {n > 1 && (
          <button
            onClick={() => {
              next();
              resetTimer();
            }}
            className="hidden sm:flex absolute right-0 z-20 bg-white shadow-md rounded-full p-1.5 hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5 text-black" />
          </button>
        )}
      </div>
    </div>
  );
}
