import { Glow } from '@/components/ui/glow';
import { ProductsClient } from '@/components/products-client';
import { createClient } from '@supabase/supabase-js';
import { Zap } from 'lucide-react';
import type { Product } from '@/types';

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
    <main className="relative flex-1 overflow-hidden dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900">
      {/* Glow backdrop fijo */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-160 h-160 bg-cyan-500/3 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-160 h-160 bg-blue-500/2 dark:bg-blue-500/8 rounded-full blur-[120px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero section */}
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-24">
          <Glow position="top-left" color="cyan" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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

        {/* Client component with search and filters */}
        <ProductsClient initialProducts={products as Product[]} />
      </div>
    </main>
  );
}