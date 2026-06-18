import { getFeaturedProducts, getHero, getCategories } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const hero = await getHero();
  const categories = await getCategories();
  const products = await getFeaturedProducts();

  return (
    <main>
      {/* Hero Section - Full Width */}
      <div className="w-full">
        {hero ? (
          <section className="relative h-[80vh] w-full overflow-hidden shadow-2xl group">
            {hero.backgroundImage ? (
              <img 
                src={urlFor(hero.backgroundImage).url() || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} 
                alt={hero.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-primary/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end items-center text-center pb-12 px-6">
              <div className="max-w-6xl mx-auto w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl animate-fade-in whitespace-nowrap overflow-hidden text-ellipsis">
                  {hero.title}
                </h1>
                <p className="text-base md:text-lg text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md animate-fade-in delay-200">
                  {hero.subtitle}
                </p>
                {hero.ctaText && (
                  <Link 
                    href={hero.ctaLink || '/'} 
                    className="inline-block bg-white text-primary px-8 py-3.5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-xl hover:shadow-white/20 transform hover:-translate-y-1 active:scale-95 animate-fade-in delay-300"
                  >
                    {hero.ctaText}
                  </Link>
                )}
              </div>
            </div>
          </section>
        ) : (
          /* Default Hero fallback if no hero document exists */
          <section className="text-center py-32 bg-white border-b">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Bienvenue chez Boutique Nina Brand
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Votre destination shopping premium pour les plus belles collections mondiales
            </p>
          </section>
        )}
      </div>

      <div className="w-full py-16">
        {/* Categories Section */}
        {categories && categories.length > 0 && (
          <section className="mb-20 px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black tracking-tight">Categories</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide snap-x">
              {categories.map((cat: any) => (
                <Link 
                  href={`/category/${cat.slug?.current}`} 
                  key={cat._id}
                  className="group relative flex-none w-40 md:w-52 aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all snap-start"
                >
                  {cat.image ? (
                    <img 
                      src={urlFor(cat.image).url() || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} 
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                      {cat.title}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="text-white font-bold text-lg text-center px-2 drop-shadow-md">
                      {cat.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Products Section */}
        <section className="py-12 px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight">Articles</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
            {products?.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {(!products || products.length === 0) && (
            <div className="text-center py-32 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
              <div className="mb-4 inline-flex p-4 rounded-full bg-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
              <p className="text-xl font-medium text-slate-500">Aucun produit trouvé pour le moment.</p>
            </div>
          )}
        </section>

        {/* Info Scrolling Strip */}
        <section className="mt-20 border-y border-slate-200 bg-slate-200 overflow-hidden">
          <div className="flex overflow-x-auto py-8 gap-12 scrollbar-hide snap-x px-4">
            <div className="flex-none flex items-center space-x-4 snap-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="2" y="6" rx="2"/><path d="M18 9h2l3 3v7h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
              </div>
              <span className="text-xl font-bold tracking-tight">La livraison 58 wilayas</span>
            </div>
            
            <div className="flex-none flex items-center space-x-4 snap-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
              </div>
              <span className="text-xl font-bold tracking-tight">Paiement main à main</span>
            </div>

            {/* Repeat for visual scroll effect if needed, but the user asked for these two */}
            <div className="flex-none flex items-center space-x-4 snap-center pr-10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span className="text-xl font-bold tracking-tight">Qualité Garantie</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
