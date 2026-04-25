import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { getProductBySlug, products } from "@/lib/data";
import { ArrowLeft, Check } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  
  return {
    title: `${product.name} - Ecuflow`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className="aspect-square overflow-hidden rounded-md bg-muted"
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-sm font-medium text-muted-foreground uppercase">
                {product.category.replace("_", " ")}
              </span>
              <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
            </div>

            <div className="text-3xl font-bold text-green-600">
              ${product.price} {product.currency}
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="space-y-2">
              <h3 className="font-semibold">Especificaciones</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-green-600" />
              <span>{product.stock} unidades disponibles</span>
            </div>

            <AddToCartButton product={product} />
          </div>
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