import { getProducts } from '@/lib/sanity/queries';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="header-green pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 animate-fade-in">
          Tous Nos Produits
        </h1>
        <div className="w-24 h-1.5 bg-white/30 mx-auto rounded-full"></div>
        <p className="text-white/60 mt-6 font-bold uppercase tracking-widest text-sm">Découvrez l'élégance de Boutique Nina Brand</p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20 pb-32">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Aucun produit trouvé</h2>
            <p className="text-slate-500">Nous reviendrons bientôt avec de nouvelles collections.</p>
          </div>
        )}
      </div>
    </div>
  );
}
