import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="header-green text-white pt-20 pb-32 md:pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="Boutique Nina Brand" width="100" height="100" className="rounded-xl brightness-0 invert" />
            </Link>
            <p className="text-white/70 max-w-xs leading-relaxed">
              Votre destination shopping premium pour les plus belles collections mondiales chez Boutique Nina Brand. Qualité exceptionnelle et service personnalisé.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-white">Suivez-nous</h3>
            <div className="flex space-x-6">
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 active:scale-95 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
            <div className="flex items-center space-x-3 text-white/50 text-sm font-bold uppercase tracking-widest pt-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Jijel, Jijel</span>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Boutique Nina Brand. Tous les droits sont réservés.
          </p>
          
          <div className="text-white/60 text-sm font-medium">
            Développé Par | <a href="https://www.instagram.com/web___builder/" target="_blank" rel="noopener noreferrer" className="font-bold bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#cc2366] text-transparent bg-clip-text hover:opacity-80 transition-opacity">Web Builder</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
