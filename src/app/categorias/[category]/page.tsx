import Link from "next/link";
import { Header } from "@/components/header";
import { getProductsByCategory } from "@/lib/data";

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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-2">{categoryNames[category] || category}</h1>
        <p className="text-muted-foreground mb-8">
          {categoryProducts.length} productos disponibles
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <Link
              key={product.id}
              href={`/productos/${product.slug}`}
              className="group overflow-hidden rounded-lg border bg-card text-card-foreground transition-shadow hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                <p className="mt-2 text-lg font-bold text-green-600">
                  ${product.price} {product.currency}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 Ecuflow. Energía portátil en Cuba.</p>
        </div>
      </footer>
    </div>
  );
}