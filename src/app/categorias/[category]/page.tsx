import Link from "next/link";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { getProductsByCategory } from "@/lib/data";
import { Footer } from "@/components/footer";

export async function generateStaticParams() {
  return [
    { category: "powerbanks" },
    { category: "ecoflow" },
    { category: "solar_panels" },
    { category: "accessories" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryNames: Record<string, string> = {
    powerbanks: "Powerbanks",
    ecoflow: "EcoFlow",
    solar_panels: "Paneles Solares",
    accessories: "Accesorios",
  };

  return {
    title: `${categoryNames[category] || category} - Ecuflow`,
    description: `Todos los ${categoryNames[category] || category} disponibles`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryProducts = getProductsByCategory(category);

  const categoryNames: Record<string, string> = {
    powerbanks: "Powerbanks",
    ecoflow: "EcoFlow",
    solar_panels: "Paneles Solares",
    accessories: "Accesorios",
  };

  const categoryDescriptions: Record<string, string> = {
    powerbanks: "Baterías portátiles de alta capacidad para cargar tus dispositivos en cualquier lugar.",
    ecoflow: "Estaciones de energía portátiles para camping, emergencias o uso doméstico.",
    solar_panels: "Paneles solares plegables para cargar tus dispositivos de forma sostenible.",
    accessories: "Cables, adaptadores y accesorios para complementar tu equipo.",
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 dark:text-white mb-4">
              {categoryNames[category] || category}
            </h1>
            <p className="text-slate-500 dark:text-white/50 text-lg">
              {categoryDescriptions[category] || `Explora todos los ${categoryNames[category] || category} disponibles.`}
            </p>
          </div>

          {categoryProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-white/50 text-lg">No hay productos en esta categoría</p>
              <Link href="/productos" className="text-cyan-600 dark:text-cyan-400 hover:underline mt-2 inline-block">
                Ver todos los productos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}