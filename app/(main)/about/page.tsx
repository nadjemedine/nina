export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="header-green pt-32 pb-32 px-4 text-center">
        <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 animate-fade-in">
          À Propos de <br/> Boutique Nina
        </h1>
        <div className="w-32 h-2 bg-white/20 mx-auto rounded-full"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-32">
        <div className="prose prose-slate prose-2xl max-w-none text-center space-y-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Notre Héritage</h2>
            <p className="text-slate-500 leading-relaxed font-medium">
              Boutique Nina Brand incarne l'élégance et le raffinement de la mode algérienne moderne. 
              Fondée avec une passion pour les tissus d'exception, notre maison s'engage à offrir 
              des créations qui célèbrent la féminité et le style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-12">
            <div className="bg-slate-50 p-12 rounded-[48px] border border-slate-100">
              <h3 className="text-2xl font-black mb-4 uppercase">Qualité</h3>
              <p className="text-slate-500 font-bold leading-relaxed">Nous sélectionnons rigoureusement chaque matière pour garantir un confort et une durabilité incomparables.</p>
            </div>
            <div className="bg-slate-50 p-12 rounded-[48px] border border-slate-100">
              <h3 className="text-2xl font-black mb-4 uppercase">Style</h3>
              <p className="text-slate-500 font-bold leading-relaxed">Nos designs fusionnent tradition et modernité pour créer des silhouettes intemporelles et audacieuses.</p>
            </div>
          </div>

          <div className="pt-24">
            <div className="bg-[#4A5D23] text-white p-12 md:p-20 rounded-[64px] shadow-2xl space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Boutique Nina Brand</h2>
              <p className="text-white/80 text-xl font-bold leading-relaxed">
                "L'élégance n'est pas une question de se faire remarquer, c'est une question de se faire mémoriser."
              </p>
              <div className="pt-6">
                <span className="font-black border-b-2 border-white/30 pb-2 uppercase tracking-widest text-sm">Depuis 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
