"use client";

import { useState, useMemo } from 'react';
import { WILAYAS, SHIPPING_RATES } from '@/lib/constants';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    commune: '',
    address: '',
    deliveryType: 'home' as 'home' | 'desk'
  });

  const [submitted, setSubmitted] = useState(false);

  const shippingFee = useMemo(() => {
    if (!formData.wilaya) return null;
    const rates = SHIPPING_RATES[formData.wilaya];
    if (!rates) return null;
    return formData.deliveryType === 'home' ? rates.home : rates.desk;
  }, [formData.wilaya, formData.deliveryType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Order Data:", { ...formData, shippingFee });
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
              <div className="flex justify-between items-center mb-10">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Frais de Livraison</span>
                <span className="font-black text-[#4A5D23] text-xl">
                  {shippingFee !== null ? `${shippingFee.toLocaleString()} DA` : 'Choisissez wilaya'}
                </span>
              </div>
              <button 
                type="submit"
                className="w-full header-green h-20 rounded-3xl font-black uppercase tracking-widest text-lg shadow-2xl shadow-green-900/20 hover:scale-[1.02] active:scale-95 transition-all group"
              >
                Confirmer la commande
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-4 group-hover:translate-x-2 transition-transform">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
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
