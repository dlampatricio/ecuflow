import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import { getFeaturedProducts } from '@/lib/data';
import { ArrowRight, MessageCircle, Shield, Truck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative min-h-[85vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 animate-fade-up">
                La energía que necesitas, donde la necesites
              </h1>

              <p className="text-lg sm:text-xl text-muted dark:text-white/70 max-w-xl mx-auto mb-10 animate-fade-up">
                Powerbanks de alta capacidad y estaciones EcoFlow para camping, emergencias o el día a día.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
                style={{ animationDelay: '300ms' }}
              >
                <Link
                  href="/productos"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-primary dark:bg-cyan-500 px-8 py-4 text-sm font-bold text-primary-foreground dark:text-slate-900 hover:bg-primary/90 dark:hover:bg-cyan-400 transition-all hover:gap-3 hover:shadow-lg hover:shadow-primary/25 dark:hover:shadow-cyan-500/25"
                >
                  Ver productos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/chat"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/20 px-8 py-4 text-sm font-bold text-slate-800 dark:text-white hover:bg-white/60 dark:hover:bg-white/20 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Truck, label: 'Envío a toda Cuba' },
              { icon: Shield, label: 'Garantía Oficial' },
              { icon: Zap, label: 'Alta Potencia' },
              { icon: MessageCircle, label: 'Soporte 24/7' },
            ].map((feature, i) => (
              <div
                key={feature.label}
                className="group relative flex flex-col items-center justify-center p-5 sm:p-6 text-center
                         rounded-3xl
                         bg-white/40 dark:bg-slate-900/50 
                         backdrop-blur-xl 
                         border border-white/60 dark:border-slate-700/40
                         shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                         transition-all duration-500 ease-out
                         hover:bg-white/60 dark:hover:bg-slate-800/60 
                         hover:shadow-[0_8px_40px_0_rgba(31,38,135,0.15)] dark:hover:shadow-[0_8px_40px_0_rgba(0,217,255,0.1)]
                         hover:scale-[1.02]
                         animate-fade-up"
                style={{ animationDelay: `${400 + i * 100}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent dark:via-cyan-500/50" />

                <div className="relative mb-4 p-3 rounded-2xl bg-linear-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 dark:group-hover:from-cyan-500/30 dark:group-hover:to-blue-500/30 transition-colors duration-300">
                  <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors" />
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white mb-1 tracking-tight">
                  {feature.label}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-white/50 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"></p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground dark:text-white">
                Destacados
              </h2>
              <p className="text-muted-foreground dark:text-white/50 mt-2">Los más populares esta semana</p>
            </div>
            <Link
              href="/productos"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-cyan-400 hover:gap-3 transition-all"
            >
              Ver todos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground dark:text-white text-center mb-12">
            Categorías
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Powerbanks', slug: 'powerbanks', emoji: '🔋' },
              { name: 'EcoFlow', slug: 'ecoflow', emoji: '⚡' },
              { name: 'Solares', slug: 'solar_panels', emoji: '☀️' },
              { name: 'Accesorios', slug: 'accessories', emoji: '🔌' },
            ].map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="group relative p-8 sm:p-10 rounded-3xl 
                         bg-white/40 dark:bg-white/6 backdrop-blur-xl 
                         border border-white/60 dark:border-white/1
                         hover:bg-white/60 dark:hover:bg-white/1 hover:border-cyan-500/30 dark:hover:border-cyan-500/30
                         transition-all duration-500 ease-out
                         animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent dark:via-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="text-center">
                  <span className="text-4xl mb-4 block">{cat.emoji}</span>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">{cat.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-white/40 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Explorar →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
