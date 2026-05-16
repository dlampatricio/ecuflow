import { ProductCard } from '@/components/product-card';
import { Glow } from '@/components/ui/glow';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

const categoryNames: Record<string, string> = {
  powerbanks: 'Powerbanks',
  ecoflow: 'EcoFlow',
  solar_panels: 'Paneles Solares',
  accessories: 'Accesorios',
};

const categoryDescriptions: Record<string, string> = {
  powerbanks:
    'Baterías portátiles de alta capacidad para cargar tus dispositivos en cualquier lugar.',
  ecoflow: 'Estaciones de energía portátiles para camping, emergencias o uso doméstico.',
  solar_panels: 'Paneles solares plegables para cargar tus dispositivos de forma sostenible.',
  accessories: 'Cables, adaptadores y accesorios para complementar tu equipo.',
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getProductsByCategory(category: string) {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  return data || [];
}

export async function generateStaticParams() {
  return [
    { category: 'powerbanks' },
    { category: 'ecoflow' },
    { category: 'solar_panels' },
    { category: 'accessories' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  return {
    title: `${categoryNames[category] || category} - Ecuflow`,
    description: `Todos los ${categoryNames[category] || category} disponibles`,
  };
}

export default async function CategoryPage({
  params,
}: Readonly<{ params: Promise<{ category: string }> }>) {
  const { category } = await params;
  const products = await getProductsByCategory(category);
  const categoryName = categoryNames[category] || category;
  const categoryDesc =
    categoryDescriptions[category] ||
    `Explora todos los ${categoryNames[category] || category} disponibles.`;

  return (
    <main className="relative flex-1 overflow-hidden dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900">
      {/* Glow backdrop fijo */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-160 h-160 bg-cyan-500/3 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-160 h-160 bg-blue-500/2 dark:bg-blue-500/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero section */}
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-24">
          <Glow position="top-left" color="cyan" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-white/60 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mb-6 animate-fade-up"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a productos
            </Link>

            <div
              className="max-w-4xl space-y-4 sm:space-y-6 animate-fade-up"
              style={{ animationDelay: '50ms' }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter bg-linear-to-br from-slate-900 via-slate-700 to-cyan-600 dark:from-white dark:via-slate-200 dark:to-cyan-400 bg-clip-text text-transparent">
                {categoryName}
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
                {categoryDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Products section */}
        <section className="relative py-12 sm:py-16 md:py-20 pb-20 sm:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {products.length === 0 ? (
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
                  No hay productos en esta categoría
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/90 hover:bg-cyan-500 text-slate-900 font-semibold transition-all shadow-lg shadow-cyan-500/25"
                >
                  Ver todos los productos
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between max-w-full">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                      Productos disponibles
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-white/50 mt-1">
                      {products.length} artículos en esta categoría
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                  {products.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
