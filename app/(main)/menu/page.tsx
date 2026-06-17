import { getCategories } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import Link from 'next/link';

export default async function MenuPage() {
  const categories = await getCategories();

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="header-green pt-32 pb-14 px-8 text-center ring-1 ring-white/10">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Nos Catégories</h1>
        <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Explorez notre collection</p>
      </div>

      {/* Categories Grid */}
      <div className="p-6 grid grid-cols-1 gap-6">
        {categories.map((cat: any) => (
          <Link 
            key={cat._id}
            href={`/category/${cat.slug?.current}`}
            className="group relative h-40 rounded-[32px] overflow-hidden shadow-xl border border-slate-100"
          >
            {cat.image ? (
              <img 
                src={urlFor(cat.image).url()} 
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400 font-bold uppercase">
                {cat.title}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-10">
              <span className="text-2xl font-black text-white uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                {cat.title}
              </span>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
