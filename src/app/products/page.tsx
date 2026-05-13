import { ProductCard } from '@/components/product-card';
import { Glow } from '@/components/ui/glow';
import { createClient } from '@supabase/supabase-js';
import { Battery, Cable, Search, Sun, Zap } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'Productos - Ecuflow',
  description: 'Todos los productos: powerbanks, EcoFlows y más',
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return data || [];
}

const categories = [
  {
    key: 'powerbanks',
    label: 'Powerbanks',
    icon: Battery,
    color: 'cyan',
  },
  {
    key: 'ecoflow',
    label: 'EcoFlow',
    icon: Zap,
    color: 'amber',
  },
  {
    key: 'solar_panels',
    label: 'Paneles Solares',
    icon: Sun,
    color: 'emerald',
  },
  {
    key: 'accessories',
    label: 'Accesorios',
    icon: Cable,
    color: 'violet',
  },
];

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <main className="relative flex-1 overflow-hidden dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900">
      {/* Glow backdrop fijo */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-160 h-160 bg-cyan-500/3 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-160 h-160 bg-blue-500/2 dark:bg-blue-500/8 rounded-full blur-[120px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero section */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
          <Glow position="top-left" color="cyan" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider mx-auto">
                <Zap className="h-3.5 w-3.5" />
                Catálogo Completo
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter bg-linear-to-br from-slate-900 via-slate-700 to-cyan-600 dark:from-white dark:via-slate-200 dark:to-cyan-400 bg-clip-text text-transparent">
                Nuestros Productos
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                Descubre nuestra colección completa de powerbanks, estaciones EcoFlow y accesorios
                para energía portátil.
              </p>
            </div>
          </div>
        </section>

        {/* Search and filters section */}
        <section className="relative py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="max-w-3xl mx-auto space-y-6 animate-fade-up"
              style={{ animationDelay: '100ms' }}
            >
              {/* Search bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-white/40 pointer-events-none" />
                  <input
                    type="search"
                    placeholder="Buscar productos..."
                    className="w-full h-12 pl-12 pr-4 rounded-2xl 
                        bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl 
                        border border-white/60 dark:border-white/10
                        text-sm placeholder:text-slate-400 dark:placeholder:text-white/40
                        focus:outline-none focus:ring-2 focus:ring-cyan-500/30 
                        focus:border-cyan-500/50 
                        text-slate-800 dark:text-white
                        shadow-xl shadow-black/5 dark:shadow-black/20
                        transition-all"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.key}
                      className="group relative p-4 rounded-2xl
                        bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl
                        border border-white/60 dark:border-white/10
                        hover:bg-white/60 dark:hover:bg-white/10
                        hover:border-cyan-500/30 dark:hover:border-cyan-500/30
                        transition-all duration-300
                        shadow-xl shadow-black/5 dark:shadow-black/20
                        text-left"
                    >
                      <Icon className="h-5 w-5 mb-2 text-slate-600 dark:text-slate-300 group-hover:text-cyan-500 transition-colors" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-white block">
                        {category.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Products section */}
        <section className="relative py-12 sm:py-20 pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {products.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between max-w-full">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                      Todos los productos
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-white/50 mt-1">
                      {products.length} artículos disponibles
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto p-12 text-center rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10">
                <div className="mb-6">
                  <svg
                    className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10M4 7h16"
                    />
                  </svg>
                </div>
                <p className="text-slate-500 dark:text-white/50 text-lg mb-6">
                  No hay productos disponibles actualmente
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/90 hover:bg-cyan-500 text-slate-900 font-semibold transition-all shadow-lg shadow-cyan-500/25"
                >
                  Volver al inicio
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
