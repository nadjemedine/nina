"use client";

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartSidebar() {
  const { isOpen, closeCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-500 ease-out p-8 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl header-green flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Votre Panier</h2>
          </div>
          <button 
            onClick={closeCart}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto">
          {/* Empty state for now */}
          <div className="flex flex-col items-center justify-center h-full text-center py-20 px-4">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-4">Votre panier est vide</p>
            <button 
              onClick={closeCart}
              className="text-[#4A5D23] font-black underline underline-offset-8"
            >
              Continuer vos achats
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 border-t border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Total</span>
            <span className="text-3xl font-black text-[#4A5D23]">0 DA</span>
          </div>
          <Link 
            href="/checkout"
            onClick={closeCart}
            className="w-full header-green h-20 rounded-3xl flex items-center justify-center space-x-4 text-white font-black uppercase tracking-widest text-lg shadow-2xl shadow-green-900/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Commander Maintenant</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
