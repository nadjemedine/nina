"use client";

import { useState } from 'react';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/client';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = product.images || [];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Link 
      href={`/product/${product.slug?.current}`}
      className="group bg-slate-100 rounded-[32px] md:rounded-[48px] shadow-sm hover:shadow-xl transition-all overflow-hidden block"
    >
      <div className="aspect-[4/5] relative overflow-hidden group/gallery">
        {images.length > 0 ? (
          <>
            <img 
              src={urlFor(images[activeIndex]).url() || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} 
              alt={product.title || 'Produit'}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 p-4"
            />
            
            {/* Gallery Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#4A5D23] shadow-lg flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 transition-all hover:scale-110 active:scale-90 z-20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#4A5D23] shadow-lg flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 transition-all hover:scale-110 active:scale-90 z-20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Aucune image
          </div>
        )}
        
        {product.inStock === false && (
          <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-md text-white text-[10px] md:text-xs font-black px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider z-10">
            Épuisé
          </div>
        )}

        {/* Image dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
            {images.map((_: any, i: number) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === activeIndex ? "bg-[#4A5D23] w-3" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 md:p-8">
        <h3 className="font-bold text-base md:text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {product.title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-lg md:text-2xl font-black text-primary">
            {product.price ? product.price.toLocaleString() : '0'} <span className="text-[10px] md:text-sm">DA</span>
          </span>
          <div className="p-2 md:p-3 rounded-2xl bg-white text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
