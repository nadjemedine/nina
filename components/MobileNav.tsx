"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function MobileNav() {
  const { toggleCart } = useCart();

  return (
    <nav className="fixed bottom-6 left-6 right-6 header-green py-3 px-8 flex justify-between items-center z-50 md:hidden rounded-full border-2 border-white shadow-2xl backdrop-blur-md bg-opacity-90">
      <Link href="/" className="flex flex-col items-center text-white/70 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-[10px] font-bold uppercase mt-1">boutique</span>
      </Link>
      <Link href="/categories" className="flex flex-col items-center text-white/70 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" x2="21" y1="12" y2="12" />
          <line x1="3" x2="21" y1="6" y2="6" />
          <line x1="3" x2="21" y1="18" y2="18" />
        </svg>
        <span className="text-[10px] font-bold uppercase mt-1">menu</span>
      </Link>
      <button 
        onClick={toggleCart}
        className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <span className="text-[10px] font-bold uppercase mt-1">panier</span>
      </button>
    </nav>
  );
}
