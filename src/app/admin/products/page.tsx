import { createClient } from "@supabase/supabase-js";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

export const revalidate = 60;

export const metadata = {
  title: "Productos - Admin - Ecuflow",
  description: "Gestión de productos",
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getProducts() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  
  return data || [];
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-800 dark:text-white mb-2">
                Productos
              </h1>
              <p className="text-slate-500 dark:text-white/50">
                {products.length} productos en total
              </p>
            </div>

            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-cyan-400 transition-all"
            >
              <Plus className="h-4 w-4" />
              Añadir Producto
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-white/40" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] text-slate-600 dark:text-white/70">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative p-4 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1]"
                >
                  <ProductCard product={product} />

                  <div className="absolute top-4 right-4 flex gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2 rounded-xl bg-white/60 dark:bg-white/10 text-xs font-medium text-slate-600 dark:text-white/70 hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-500 dark:text-white/50 text-lg mb-4">
                No hay productos. ¡Añade el primero!
              </p>
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-cyan-400 transition-all"
              >
                <Plus className="h-4 w-4" />
                Añadir Producto
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}