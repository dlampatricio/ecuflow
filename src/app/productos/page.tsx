import { ProductCard } from '@/components/product-card';
import { createClient } from '@supabase/supabase-js';
import { Search, SlidersHorizontal } from 'lucide-react';
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

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <main className="flex-1 pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 dark:text-white mb-4">
            Productos
          </h1>
          <p className="text-slate-500 dark:text-white/50 text-lg">
            {products.length} productos disponibles para ti
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-white/40" />
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
                  transition-all"
            />
          </div>
          <button
            className="h-12 px-6 rounded-2xl 
              bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl 
              border border-white/60 dark:border-white/10
              text-sm font-medium flex items-center justify-center gap-2 
              text-slate-700 dark:text-white/70
              hover:bg-white/60 dark:hover:bg-white/10 
              transition-all"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </button>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-white/50 text-lg mb-4">
              No hay productos disponibles actualmente
            </p>
            <Link
              href="/"
              className="text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
