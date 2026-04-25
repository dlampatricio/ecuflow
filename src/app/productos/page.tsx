import Link from "next/link";
import { Header } from "@/components/header";
import { products } from "@/lib/data";

export const metadata = {
  title: "Productos - Ecuflow",
  description: "Todos los productos: powerbanks, EcoFlows y más",
};

export default function ProductosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Todos los productos</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    {product.category.replace("_", " ")}
                  </span>
                  <span className="text-xs text-green-600 font-medium">
                    {product.stock} disponibles
                  </span>
                </div>
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