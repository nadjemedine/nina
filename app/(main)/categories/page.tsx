"use client";

import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import Link from 'next/link';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Page Header */}
      <div className="header-green pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 animate-fade-in">
          Nos Catégories
        </h1>
        <div className="w-24 h-1.5 bg-white/30 mx-auto rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat._id}
              href={`/category/${cat.slug?.current}`}
              className="group relative h-64 md:h-80 rounded-[40px] overflow-hidden shadow-2xl border border-slate-100"
            >
              {cat.image ? (
                <img 
                  src={urlFor(cat.image).url()} 
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400 font-bold uppercase">
                  {cat.title}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                <span className="text-3xl font-black text-white uppercase tracking-tighter group-hover:mb-2 transition-all">
                  {cat.title}
                </span>
                <div className="w-12 h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
