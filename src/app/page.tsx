import { OrbitingFeatures } from '@/components/orbiting-features';

export const revalidate = 60;

export default async function HomePage() {
  return (
    <main className="flex-1 bg-slate-50 dark:bg-[#020617]">
      <section className="relative min-h-screen flex flex-col items-center pt-24 pb-16 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <OrbitingFeatures />
        </div>
      </section>
    </main>
  );
}
