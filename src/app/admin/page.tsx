import { Header } from "@/components/header";
import { Package, ShoppingBag, MessageCircle, DollarSign, TrendingUp, Users } from "lucide-react";
import { Footer } from "@/components/footer";
import Link from "next/link";

export const metadata = {
  title: "Admin - Ecuflow",
  description: "Panel de administración de Ecuflow",
};

export default function AdminDashboard() {
  const stats = [
    { label: "Productos", value: "9", icon: Package, change: "+2 este mes" },
    { label: "Pedidos", value: "24", icon: ShoppingBag, change: "+5 este semana" },
    { label: "Mensajes", value: "12", icon: MessageCircle, change: "3 sin leer" },
    { label: "Ingresos", value: "$2,450", icon: DollarSign, change: "+15%" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-800 dark:text-white mb-2">
              Panel de Administración
            </h1>
            <p className="text-slate-500 dark:text-white/50">
             Gestiona tu tienda desde aquí
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-6 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-cyan-500" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-slate-800 dark:text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-white/50">
                    {stat.label}
                  </p>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-2">
                    {stat.change}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1]">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
                Acciones Rápidas
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/admin/products"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-white/[0.06] hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                >
                  <Package className="h-5 w-5 text-cyan-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-white">
                    Ver Productos
                  </span>
                </Link>
                <Link
                  href="/admin/orders"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-white/[0.06] hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                >
                  <ShoppingBag className="h-5 w-5 text-cyan-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-white">
                    Ver Pedidos
                  </span>
                </Link>
                <Link
                  href="/admin/chat"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-white/[0.06] hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-cyan-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-white">
                    Mensajes
                  </span>
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1]">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
                Productos Recientes
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 dark:bg-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-white">
                      PowerBank 20000mAh Ultra
                    </p>
                    <p className="text-xs text-slate-500 dark:text-white/50">$45 USD</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 dark:bg-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-white">
                      EcoFlow River 2 Max
                    </p>
                    <p className="text-xs text-slate-500 dark:text-white/50">$499 USD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}