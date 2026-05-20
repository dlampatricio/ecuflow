import { Glow } from '@/components/ui/glow';
import { BackButton } from '@/components/back-button';
import { createClient } from '@supabase/supabase-js';
import { Battery, Check, MessageCircle, Package, Sun, Zap, Headphones } from 'lucide-react';
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
    .select(`
      *,
      owner:owner_id(id, name, email)
    `)
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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
    <main className="relative flex-1 overflow-hidden dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900">
      {/* Glow backdrop fijo */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-160 h-160 bg-cyan-500/3 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-160 h-160 bg-blue-500/2 dark:bg-blue-500/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Navigation section */}
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-8 sm:pb-10 md:pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <BackButton />
          </div>
        </section>

        {/* Main content */}
        <div className="pb-20 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Glow position="top-left" color="cyan" className="-top-32 -left-20" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
              {/* Product images - Left column */}
              <div className="space-y-4 sm:space-y-5 animate-fade-up">
                {/* Main image */}
                <div className="aspect-square rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10 overflow-hidden relative shadow-2xl shadow-black/10 dark:shadow-black/30">
                  <Image
                    src={images[0] || '/placeholder-product.jpg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Thumbnail gallery */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {images.map((img: string, i: number) => (
                      <button
                        key={i}
                        className="aspect-square rounded-2xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10 overflow-hidden hover:border-cyan-500/50 hover:ring-2 hover:ring-cyan-500/20 transition-all shadow-lg shadow-black/5 dark:shadow-black/15"
                        aria-label={`Ver imagen ${i + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`Imagen ${i + 1}`}
                          fill
                          sizes="25vw"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product details - Right column */}
              <div
                className="space-y-6 sm:space-y-8 animate-fade-up"
                style={{ animationDelay: '100ms' }}
              >
                {/* Category badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10 text-sm text-slate-600 dark:text-white/70 shadow-lg shadow-black/5 dark:shadow-black/15">
                  {categoryIcons[product.category]}
                  <span className="font-medium">{categoryLabels[product.category]}</span>
                </div>

                {/* Title and price section */}
                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <div className="text-5xl xs:text-5xl sm:text-6xl md:text-7xl font-black bg-linear-to-br from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
                      ${product.price}
                    </div>
                    <span className="text-base sm:text-lg text-slate-400 dark:text-white/40 font-semibold">
                      USD
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-600 dark:text-white/60 leading-relaxed">
                  {product.description}
                </p>

                {/* Specs section */}
                {specs.length > 0 && (
                  <div className="space-y-4 p-6 sm:p-8 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20">
                    <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">
                      Especificaciones
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {specs.map((spec: { label: string; value: string }) => (
                        <div
                          key={spec.label}
                          className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/50 dark:border-white/5 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all"
                        >
                          <span className="block text-xs sm:text-sm font-medium text-slate-500 dark:text-white/50 uppercase tracking-wider mb-2">
                            {spec.label}
                          </span>
                          <span className="block font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact buttons */}
                <div className="pt-4 sm:pt-6 space-y-3">
                  {product.owner_id ? (
                    <Link
                      href={`/chat?type=product_owner&productId=${product.id}&productName=${encodeURIComponent(product.name)}`}
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-cyan-500/90 dark:bg-cyan-500/80 border border-cyan-400/50 dark:border-cyan-400/30 text-white font-semibold text-base shadow-lg shadow-cyan-500/20 hover:bg-cyan-500 hover:shadow-cyan-500/30 transition-all duration-300"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Contactar al vendedor
                    </Link>
                  ) : null}
                  <Link
                    href="/chat?type=sales"
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-white/15 text-slate-700 dark:text-white font-semibold text-base shadow-lg shadow-black/10 dark:shadow-black/30 hover:bg-white/80 dark:hover:bg-slate-900/80 transition-all duration-300"
                  >
                    <Headphones className="h-5 w-5" />
                    Hablar con ventas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
