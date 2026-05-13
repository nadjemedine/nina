"use client";

import { getProductBySlug } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { notFound, useRouter } from "next/navigation";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    params.then(({ slug }) => {
      getProductBySlug(slug).then(data => {
        setProduct(data);
        setLoading(false);
      });
    });
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 animate-fade-in">
        {/* Breadcrumbs */}
        <nav className="mb-10 text-sm font-medium text-slate-400 flex items-center space-x-2">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link href={`/category/${product.category.slug?.current}`} className="hover:text-primary transition-colors">
                {product.category.title}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-slate-900 truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Gallery Section */}
          <div className="space-y-6">
            <div className="aspect-[4/5] relative rounded-[48px] overflow-hidden bg-slate-100 shadow-xl border border-slate-200 group/gallery">
              {product.images && product.images.length > 0 ? (
                <>
                  <img
                    src={urlFor(product.images[activeIndex]).url()}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 md:p-8 transition-all duration-500"
                  />
                  
                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button 
                        onClick={() => setActiveIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                        className="absolute left-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#4A5D23] shadow-lg flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 transition-all hover:scale-110 active:scale-95 z-10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                      </button>
                      <button 
                        onClick={() => setActiveIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#4A5D23] shadow-lg flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 transition-all hover:scale-110 active:scale-95 z-10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">
                  Aucune image disponible
                </div>
              )}
              {product.inStock === false && (
                <div className="absolute top-8 right-8 bg-red-600 text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-sm shadow-xl animate-pulse">
                  Épuisé
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: any, idx: number) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveIndex(idx)}
                    className={`aspect-square rounded-3xl overflow-hidden bg-slate-100 border-2 transition-all cursor-pointer ${
                      activeIndex === idx ? "border-primary scale-95 shadow-inner" : "border-slate-200 hover:border-primary/40"
                    }`}
                  >
                    <img src={urlFor(img).url()} alt={`${product.title} - ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col h-full py-2">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
                {product.title}
              </h1>
              <div className="w-20 h-1.5 bg-primary rounded-full mb-8" />
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-lg md:text-2xl font-black text-primary">
                  {product.price?.toLocaleString('fr-DZ')} <span className="text-sm md:text-base">DA</span>
                </span>
                {product.oldPrice && (
                  <span className="text-2xl text-slate-400 line-through font-bold">
                    {product.oldPrice?.toLocaleString('fr-DZ')} DA
                  </span>
                )}
              </div>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                {product.description ? (
                  <p>{product.description}</p>
                ) : (
                  <p>Aucune description disponible pour ce produit de haute couture Boutique Nina Brand.</p>
                )}
              </div>
            </div>

            {/* Product Options & Size Selection */}
            <div className="space-y-12 mt-auto">
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex flex-col space-y-5">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black uppercase tracking-widest text-slate-400">Choisir la Taille</span>
                    {selectedSize && (
                      <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/20 animate-fade-in">
                        {product.sizes.find((s: any) => s.size === selectedSize)?.quantity} en stock
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((s: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(s.size)}
                        disabled={s.quantity === 0}
                        className={`min-w-[48px] h-10 flex items-center justify-center rounded-xl border-2 text-sm font-bold transition-all ${
                          selectedSize === s.size
                            ? "border-primary bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                            : s.quantity === 0
                            ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
                            : "border-slate-200 bg-white text-slate-700 hover:border-primary/40"
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col space-y-4">
                <span className="text-sm font-black uppercase tracking-widest text-slate-400">Quantité</span>
                <div className="flex items-center space-x-6 bg-slate-100 w-fit p-1.5 rounded-full border border-slate-200">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all font-black text-xl shadow-sm"
                  >
                    −
                  </button>
                  <span className="text-xl font-black text-slate-900 w-10 text-center">{quantity}</span>
                  <button 
                    onClick={() => {
                      const sizeStock = product.sizes?.find((s: any) => s.size === selectedSize);
                      if (selectedSize && sizeStock && quantity < sizeStock.quantity) {
                        setQuantity(quantity + 1);
                      } else if (!selectedSize) {
                        alert("Veuillez d'abord choisir une taille.");
                      }
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center bg-white text-slate-900 border border-slate-200 transition-all font-black text-xl shadow-sm ${
                      !selectedSize || (product.sizes?.find((s: any) => s.size === selectedSize)?.quantity <= quantity)
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="2" y="6" rx="2"/><path d="M18 9h2l3 3v7h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
                  </div>
                  <span className="text-sm font-bold text-slate-700">Livraison Rapide</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
                  </div>
                  <span className="text-sm font-bold text-slate-700">Paiement Cash</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (product.sizes?.length > 0 && !selectedSize) {
                      alert("Veuillez d'abord choisir une taille.");
                      return;
                    }
                    addItem({
                      productId: product._id || '',
                      title: product.title || '',
                      price: product.price || 0,
                      quantity,
                      size: selectedSize || 'Standard'
                    });
                    setTimeout(() => {
                      router.push('/checkout');
                    }, 50);
                  }}
                  className={`flex-1 bg-black text-white py-5 px-8 rounded-full font-black text-lg shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-95 transition-all text-center ${product.inStock === false ? "opacity-50 pointer-events-none" : ""}`}
                >
                  ACHETER MAINTENANT
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (product.sizes?.length > 0 && !selectedSize) {
                      alert("Veuillez d'abord choisir une taille.");
                      return;
                    }
                    addItem({
                      productId: product._id || '',
                      title: product.title || '',
                      price: product.price || 0,
                      quantity,
                      size: selectedSize || 'Standard'
                    });
                    openCart();
                  }}
                  disabled={product.inStock === false}
                  className="flex-1 bg-white text-primary border-2 border-primary py-5 px-8 rounded-full font-black text-lg hover:bg-primary/5 transition-all disabled:opacity-50"
                >
                  AJOUTER AU PANIER
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion / Details Strip (Optional) */}
        <div className="mt-32 pt-20 border-t border-slate-100">
          <h2 className="text-3xl font-black text-center mb-12">Pourquoi choisir Boutique Nina ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Kits Exclusifs", desc: "Des designs uniques que vous ne trouverez nulle part ailleurs." },
              { title: "Matériaux Premium", desc: "Sélection rigoureuse des tissus pour un confort exceptionnel." },
              { title: "Service Dédié", desc: "Une équipe à votre écoute pour une expérience personnalisée." }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[40px] text-center border border-slate-100 hover:border-primary/20 transition-all">
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
