import Link from "next/link";
import { Header } from "@/components/header";
import { getFeaturedProducts } from "@/lib/data";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-background py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Energía portátil para <span className="text-green-600">Cuba</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Powerbanks y estaciones EcoFlow con envío a toda Cuba. 
                Encuentra la energía que necesitas, cuando la necesitas.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Ver productos
                </Link>
                <Link
                  href="/chat"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Productos destacados</h2>
            <Link
              href="/productos"
              className="text-sm font-medium text-primary hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
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
        </section>

        <section className="container py-16">
          <h2 className="text-2xl font-bold mb-8">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Powerbanks", slug: "powerbanks", emoji: "🔋" },
              { name: "EcoFlow", slug: "ecoflow", emoji: "⚡" },
              { name: "Paneles Solares", slug: "solar_panels", emoji: "☀️" },
              { name: "Accesorios", slug: "accessories", emoji: "🔌" },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center transition-shadow hover:shadow-md"
              >
                <span className="text-4xl">{cat.emoji}</span>
                <span className="font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 Ecuflow. Energía portátil en Cuba.</p>
        </div>
      </footer>
    </div>
  );
}