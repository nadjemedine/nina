import { getProductsByCategory } from '@/lib/sanity/queries';
import ProductCard from '@/components/ProductCard';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  const categoryTitle = products.length > 0 ? (products[0].category?.title || slug) : slug;

  return (
    <div className="bg-white min-h-screen">
      {/* Category Header */}
      <div className="header-green pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 animate-fade-in">
          {categoryTitle}
        </h1>
        <div className="w-24 h-1.5 bg-white/30 mx-auto rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-slate-50 inline-flex p-8 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Aucun produit trouvé</h2>
            <p className="text-slate-500">Nous n'avons trouvé aucun produit dans cette catégorie pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
