import Link from "next/link";
import { Zap, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/30 dark:border-slate-700/40 bg-white/20 dark:bg-slate-900/30 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Zap className="h-7 w-7 text-cyan-500" />
              <span className="text-xl font-black text-slate-800 dark:text-white">Ecuflow</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-white/50 max-w-sm leading-relaxed">
              Energía portátil para Cuba. Powerbanks y estaciones EcoFlow de alta calidad con envío a toda la isla.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-4">Productos</h4>
            <nav className="space-y-3">
              <Link href="/productos" className="block text-sm text-slate-500 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Todos los productos
              </Link>
              <Link href="/categorias/powerbanks" className="block text-sm text-slate-500 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Powerbanks
              </Link>
              <Link href="/categorias/ecoflow" className="block text-sm text-slate-500 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                EcoFlow
              </Link>
              <Link href="/categorias/solar_panels" className="block text-sm text-slate-500 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Paneles solares
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-4">Contacto</h4>
            <nav className="space-y-3">
              <Link href="/chat" className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                <Mail className="h-4 w-4" />
                Chat con nosotros
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/30 dark:border-slate-700/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-white/50">
            © 2026 Ecuflow. Energía portátil en Cuba.
          </p>
        </div>
      </div>
    </footer>
  );
}