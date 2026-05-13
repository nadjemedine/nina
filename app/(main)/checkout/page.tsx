"use client";

import { useState, useMemo, Suspense } from 'react';
import { WILAYAS, SHIPPING_RATES } from '@/lib/constants';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-32 px-4 flex justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <CheckoutForm />
    </Suspense>
  );
}

function CheckoutForm() {
  const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    commune: '',
    address: '',
    deliveryType: 'home' as 'home' | 'desk'
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = useMemo(() => {
    if (!formData.wilaya) return null;
    const rates = SHIPPING_RATES[formData.wilaya];
    if (!rates) return null;
    return formData.deliveryType === 'home' ? rates.home : rates.desk;
  }, [formData.wilaya, formData.deliveryType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          shippingFee,
          items: items.length > 0 ? [{
            title: items.map(i => i.title).join(' + '),
            price: totalPrice,
            quantity: items.map(i => i.quantity).join(' + '),
            size: items.map(i => i.size).join(' + ')
          }] : []
        })
      });
      if (res.ok) {
        setSubmitted(true);
        clearCart();
      }
      else alert("Erreur lors de la confirmation.");
    } catch (err) {
      alert("Erreur de connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4A5D23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Merci pour votre commande !</h1>
        <p className="text-slate-500 max-w-md mx-auto mb-10">
          Votre commande a été reçue avec succès. Notre équipe vous contactera par téléphone pour confirmer les détails de la livraison.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="header-green px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-all"
        >
          Retour à la boutique
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-32 md:pt-32 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="header-green p-10 md:p-14 text-center">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Finaliser ma commande</h1>
            <p className="text-white/70 font-medium">Veuillez remplir le formulaire ci-dessous pour confirmer votre achat</p>
          </div>

          {/* Editable Cart Area Before Form */}
          {items.length > 0 ? (
            <div className="p-8 md:p-14 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest">Vos Produits</h2>
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border-2 border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                      {item.size && (
                        <div className="text-sm font-bold text-slate-500 mt-1">
                          Taille: <span className="text-[#4A5D23]">{item.size}</span>
                        </div>
                      )}
                      <div className="text-sm font-black text-slate-900 mt-1">
                        {Number(item.price).toLocaleString('fr-DZ')} DA
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* Quantity Control */}
                      <div className="flex items-center bg-slate-50 rounded-full border border-slate-200">
                        <button 
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-[#4A5D23] transition-colors rounded-l-full font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-black text-slate-900 text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-[#4A5D23] transition-colors rounded-r-full font-bold"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        type="button"
                        onClick={() => removeItem(item.productId, item.size)}
                        className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-14 border-b border-transparent bg-orange-50 text-orange-800 text-center font-bold">
              Votre panier est vide. Veuillez ajouter des produits avant de continuer.
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 md:p-16 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Full Name */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Nom Complet</label>
                <input 
                  required
                  type="text"
                  placeholder="Ex: Amine Brahimi"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl h-16 px-6 focus:border-[#4A5D23] outline-none transition-all font-bold text-slate-800"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Numéro de Téléphone</label>
                <input 
                  required
                  type="tel"
                  placeholder="0XXX XX XX XX"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl h-16 px-6 focus:border-[#4A5D23] outline-none transition-all font-bold text-slate-800"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              {/* Wilaya Selection */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Wilaya</label>
                <select 
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl h-16 px-6 focus:border-[#4A5D23] outline-none transition-all font-bold text-slate-800 appearance-none"
                  value={formData.wilaya}
                  onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
                >
                  <option value="">Sélectionner une wilaya</option>
                  {WILAYAS.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              {/* Delivery Type */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Méthode de Livraison</label>
                <div className="flex bg-slate-50 p-1.5 rounded-2xl border-2 border-slate-100 h-16">
                  <button
                    type="button"
                    className={`flex-1 rounded-xl font-bold text-sm transition-all ${formData.deliveryType === 'home' ? 'bg-[#4A5D23] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    onClick={() => setFormData({...formData, deliveryType: 'home'})}
                  >
                    A Domicile
                  </button>
                  <button
                    type="button"
                    disabled={formData.wilaya ? SHIPPING_RATES[formData.wilaya]?.desk === null : false}
                    className={`flex-1 rounded-xl font-bold text-sm transition-all ${formData.deliveryType === 'desk' ? 'bg-[#4A5D23] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed'}`}
                    onClick={() => setFormData({...formData, deliveryType: 'desk'})}
                  >
                    Stop Desk
                  </button>
                </div>
              </div>

              {/* Commune */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Commune</label>
                <input 
                  required
                  type="text"
                  placeholder="Votre commune"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl h-16 px-6 focus:border-[#4A5D23] outline-none transition-all font-bold text-slate-800"
                  value={formData.commune}
                  onChange={(e) => setFormData({...formData, commune: e.target.value})}
                />
              </div>

              {/* Detailed Address */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Adresse Détaillée</label>
                <input 
                  required
                  type="text"
                  placeholder="Rue, Cité, Appt..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl h-16 px-6 focus:border-[#4A5D23] outline-none transition-all font-bold text-slate-800"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="pt-10 border-t border-slate-100">
              {items.length > 0 ? (
                <div className="mb-8 p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 flex flex-col gap-4">
                  <h3 className="font-black text-sm uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-3 mb-2">Produits ({items.length})</h3>
                  {items.map((item, idx) => (
                    <div key={idx} className="w-full flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs font-bold text-slate-500">
                          {item.size && <span>Taille: <span className="text-[#4A5D23]">{item.size}</span></span>}
                          {item.size && <span>•</span>}
                          <span>Qté: <span className="text-[#4A5D23]">{item.quantity}</span></span>
                        </div>
                      </div>
                      <div className="text-sm font-black text-slate-900">
                        {(Number(item.price) * Number(item.quantity)).toLocaleString('fr-DZ')} DA
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200 mt-2">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Sous-total</span>
                    <span className="font-black text-slate-900">{Number(totalPrice).toLocaleString('fr-DZ')} DA</span>
                  </div>
                </div>
              ) : (
                <div className="mb-8 p-6 bg-orange-50 text-orange-800 rounded-2xl border-2 border-orange-200 text-center font-bold">
                  Votre panier est vide. Veuillez ajouter des produits avant de continuer.
                </div>
              )}

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Frais de Livraison</span>
                  <span className="font-black text-slate-900 text-lg">
                    {shippingFee !== null ? `${shippingFee.toLocaleString('fr-DZ')} DA` : 'Choisissez wilaya'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="text-slate-900 font-black uppercase tracking-widest text-sm">Montant Total</span>
                  <span className="font-black text-[#4A5D23] text-2xl">
                    {shippingFee !== null ? `${(totalPrice + shippingFee).toLocaleString('fr-DZ')} DA` : '-'}
                  </span>
                </div>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full header-green h-20 rounded-3xl font-black uppercase tracking-widest text-lg shadow-2xl shadow-green-900/20 hover:scale-[1.02] active:scale-95 transition-all group disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? 'En cours...' : 'Confirmer la commande'}
                {!isSubmitting && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-4 group-hover:translate-x-2 transition-transform">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-center">Paiement à la livraison sécurisé</span>
        </div>
      </div>
    </div>
  );
}
