export const revalidate = 60;

import { GlassCard } from '@/components/glass-card';
import { OrbitingFeatures } from '@/components/orbiting-features';
import { ProductCard } from '@/components/product-card';
import { SectionHeader } from '@/components/section-header';
import { GlassButton } from '@/components/ui/glass-button';
import { Glow } from '@/components/ui/glow';
import { createClient } from '@supabase/supabase-js';
import {
  BatteryCharging,
  BatteryMedium,
  Cable,
  MapPin,
  MessageCircle,
  Shield,
  Sparkles,
  Sun,
  Truck,
  Zap,
} from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getFeaturedProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(4)
    .order('created_at', { ascending: false });

  return data || [];
}

const categories = [
  {
    key: 'powerbanks',
    label: 'Powerbanks',
    icon: BatteryMedium,
    description: 'Energía portátil para tus dispositivos',
    accent: 'cyan',
  },
  {
    key: 'ecoflow',
    label: 'EcoFlow',
    icon: Zap,
    description: 'Estaciones de energía de alta potencia',
    accent: 'amber',
  },
  {
    key: 'solar_panels',
    label: 'Paneles Solares',
    icon: Sun,
    description: 'Carga sostenible con energía solar',
    accent: 'emerald',
  },
  {
    key: 'accessories',
    label: 'Accesorios',
    icon: Cable,
    description: 'Complementos para tu sistema energético',
    accent: 'violet',
  },
];

const benefits = [
  {
    icon: Truck,
    title: 'Envío a toda Cuba',
    description:
      'Llegamos a cualquier provincia del país con rapidez y seguridad.',
  },
  {
    icon: Shield,
    title: 'Garantía Oficial',
    description:
      'Todos los productos cuentan con garantía directa del fabricante.',
  },
  {
    icon: BatteryCharging,
    title: 'Alta Potencia',
    description:
      'Equipos de última generación con capacidades de hasta varios kWh.',
  },
  {
    icon: MessageCircle,
    title: 'Soporte 24/7',
    description:
      'Chat en vivo con nuestro equipo para resolver cualquier duda.',
  },
];

function SectionBadge({
  icon: Icon,
  children,
}: Readonly<{
  icon: React.ElementType;
  children: React.ReactNode;
}>) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="relative flex-1 overflow-hidden dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900">
      {/* Glow backdrop fijo de toda la página */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-160 h-160 bg-cyan-500/3 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-160 h-160 bg-blue-500/2 dark:bg-blue-500/8 rounded-full blur-[120px]" />
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* HERO                                   */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-35 pb-12">
        <Glow position="top-left" color="cyan" />
        <Glow
          position="bottom-right"
          color="blue"
          size="lg"
          className="-bottom-10 -right-10"
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter bg-linear-to-br from-slate-900 via-slate-700 to-cyan-600 dark:from-white dark:via-slate-200 dark:to-cyan-400 bg-clip-text text-transparent animate-fade-up">
            ecuflow
          </h1>

          <p
            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-3 max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: '100ms' }}
          >
            Powerbanks y EcoFlows de alta potencia para Cuba
          </p>

          <p
            className="text-sm md:text-base text-slate-400 dark:text-slate-500 mb-10 max-w-lg mx-auto animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            No te quedes sin energía. Equipos profesionales de carga portátil
            con envío a toda la isla.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            <GlassButton href="/productos" variant="primary">
              <Zap className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Ver Productos
            </GlassButton>
            <GlassButton href="/chat" variant="secondary">
              <MessageCircle className="h-5 w-5" />
              Contactar
            </GlassButton>
          </div>
        </div>

        <div className="w-full mt-8 md:mt-4 relative z-10">
          <OrbitingFeatures />
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* PRODUCTOS DESTACADOS                   */}
      {/* ═══════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className="relative z-10 py-28">
          <Glow
            position="center"
            color="violet"
            size="lg"
            className="blur-[120px]"
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader
              badge={<SectionBadge icon={Sparkles}>Destacados</SectionBadge>}
              title="Productos más populares"
              description="Los favoritos de nuestros clientes. Equipos de alta potencia listos para llevar."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            <div className="text-center mt-14">
              <GlassButton
                href="/productos"
                variant="secondary"
                className="px-6 py-3 text-base font-semibold"
              >
                Ver todos los productos
              </GlassButton>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════ */}
      {/* CATEGORÍAS                             */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative z-10 py-28">
        <Glow position="bottom-left" color="cyan" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge={<SectionBadge icon={MapPin}>Explorar</SectionBadge>}
            title="Categorías"
            description="Encuentra exactamente lo que necesitas para mantenerte conectado."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <GlassCard
                key={cat.key}
                icon={<cat.icon className="h-6 w-6" />}
                title={cat.label}
                description={cat.description}
                accent={cat.accent as 'cyan' | 'amber' | 'emerald' | 'violet'}
                action={{ label: 'Explorar', href: `/categorias/${cat.key}` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* BENEFICIOS                             */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative z-10 py-28">
        <Glow position="top-right" color="blue" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge={<SectionBadge icon={Shield}>Por qué elegirnos</SectionBadge>}
            title="Ventajas ecuflow"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((benefit, i) => (
              <GlassCard
                key={i}
                icon={<benefit.icon className="h-6 w-6" />}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* CTA FINAL                              */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative z-10 py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900/80 dark:bg-slate-900/60 border border-white/10 dark:border-white/6 p-12 md:p-20 text-center">
            <Glow
              position="top-left"
              color="cyan"
              size="sm"
              className="left-1/4"
            />
            <Glow
              position="bottom-right"
              color="blue"
              size="sm"
              className="right-1/4"
            />

            <div className="relative z-10">
              <SectionBadge icon={Zap}>Empieza hoy</SectionBadge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-6 mb-4">
                ¿Listo para no quedarte sin energía?
              </h2>
              <p className="text-slate-300 max-w-xl mx-auto mb-10">
                Explora nuestro catálogo y encuentra la solución energética
                perfecta para ti. Enviamos a toda Cuba.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <GlassButton href="/productos" variant="primary" shadow={false}>
                  <Zap className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Ver Productos
                </GlassButton>
                <GlassButton href="/chat" variant="secondary" shadow={false}>
                  <MessageCircle className="h-5 w-5" />
                  Hablar con ventas
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
