"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  size: string;
  image?: any;
}

interface CartContextType {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('boutique_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {}
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('boutique_cart', JSON.stringify(items));
    }
  }, [items, isMounted]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(!isOpen);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.productId === newItem.productId && item.size === newItem.size
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      return [...currentItems, newItem];
    });
  };

  const removeItem = (productId: string, size: string) => {
    setItems(currentItems => currentItems.filter(
      item => !(item.productId === productId && item.size === size)
    ));
  };

  const updateQuantity = (productId: string, size: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.productId === productId && item.size === size
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity = newQuantity;
        return updatedItems;
      }
      return currentItems;
    });
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      isOpen, openCart, closeCart, toggleCart, 
      items: isMounted ? items : [], 
      addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
