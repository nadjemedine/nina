"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { toggleCart } = useCart();
  return (
    <header className="header-green shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" width="80" height="80" className="rounded-md" />
        </Link>
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/" className="hover:text-primary-foreground/80 transition-colors">
            Accueil
          </Link>
          <Link href="/products" className="hover:text-primary-foreground/80 transition-colors">
            Produits
          </Link>
          <Link href="/categories" className="hover:text-primary-foreground/80 transition-colors">
            Catégories
          </Link>
          <Link href="/about" className="hover:text-primary-foreground/80 transition-colors">
            À propos
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative block w-full max-xs">
            <input
              type="text"
              placeholder="Rechercher..."
              className="pr-10 pl-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 w-full text-slate-800"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-white/10 rounded-full transition-colors transition-transform active:scale-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
