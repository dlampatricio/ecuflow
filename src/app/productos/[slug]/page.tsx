import { AddToCartButton } from '@/components/add-to-cart-button';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, Battery, Check, Package, Sun, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

export const revalidate = 60;

const categoryLabels: Record<string, string> = {
  powerbanks: 'Powerbank',
  ecoflow: 'Estación EcoFlow',
  solar_panels: 'Panel Solar',
  accessories: 'Accesorio',
};

const categoryIcons: Record<string, ReactNode> = {
  powerbanks: <Battery className="h-4 w-4" />,
  ecoflow: <Zap className="h-4 w-4" />,
  solar_panels: <Sun className="h-4 w-4" />,
  accessories: <Package className="h-4 w-4" />,
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getProductBySlug(slug: string) {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  return data;
}

async function getAllProducts() {
  const { data } = await supabase.from('products').select('slug');

  return data || [];
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Producto no encontrado' };

  return {
    title: `${product.name} - Ecuflow`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const images = Array.isArray(product.images)
    ? product.images
    : product.images
      ? [product.images]
      : [];
  const specs = Array.isArray(product.specs) ? product.specs : [];

  return (
    <main className="flex-1 pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="sticky top-28 space-y-4">
            <div className="aspect-square rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10 overflow-hidden relative">
              <Image
                src={images[0] || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    className="aspect-square rounded-2xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10 overflow-hidden hover:border-cyan-500/50 hover:ring-2 hover:ring-cyan-500/20 transition-all"
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10 text-sm text-slate-600 dark:text-white/70">
              {categoryIcons[product.category]}
              <span>{categoryLabels[product.category]}</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-800 dark:text-white mb-4">
                {product.name}
              </h1>
              <div className="text-4xl sm:text-5xl font-black text-cyan-500 mb-2">
                ${product.price}
                <span className="text-lg text-slate-400 dark:text-white/40 font-normal ml-2">
                  USD
                </span>
              </div>
            </div>

            <p className="text-slate-500 dark:text-white/50 text-lg leading-relaxed">
              {product.description}
            </p>

            {specs.length > 0 && (
              <div className="space-y-4 p-6 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                  Especificaciones
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specs.map((spec: { label: string; value: string }) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-slate-900/50"
                    >
                      <span className="text-sm text-slate-500 dark:text-white/50">
                        {spec.label}
                      </span>
                      <span className="font-semibold text-sm text-slate-700 dark:text-white">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium">
                <Check className="h-4 w-4" />
                {product.stock} disponibles
              </div>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
