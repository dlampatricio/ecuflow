import { Header } from "@/components/header";
import { Search, Filter, Package, Check, X, Clock, Truck } from "lucide-react";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Pedidos - Admin - Ecuflow",
  description: "Gestión de pedidos",
};

const mockOrders = [
  {
    id: "ORD-001",
    customer: "Juan Pérez",
    email: "juan@email.com",
    items: 2,
    total: 544,
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "María García",
    email: "maria@email.com",
    items: 1,
    total: 45,
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Carlos López",
    email: "carlos@email.com",
    items: 3,
    total: 299,
    status: "processing",
    date: "2024-01-14",
  },
];

const statusConfig = {
  pending: { label: "Pendiente", icon: Clock, color: "text-yellow-500" },
  processing: { label: "Procesando", icon: Package, color: "text-blue-500" },
  completed: { label: "Completado", icon: Check, color: "text-green-500" },
  cancelled: { label: "Cancelado", icon: X, color: "text-red-500" },
};

export default function AdminOrdersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-800 dark:text-white mb-2">
                Pedidos
              </h1>
              <p className="text-slate-500 dark:text-white/50">
                {mockOrders.length} pedidos en total
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-white/40" />
              <input
                type="text"
                placeholder="Buscar pedidos..."
                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] text-slate-600 dark:text-white/70">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </div>

          <div className="space-y-4">
            {mockOrders.map((order) => {
              const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
              const status = statusConfig[order.status as keyof typeof statusConfig];

              return (
                <div
                  key={order.id}
                  className="p-6 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                        <Package className="h-6 w-6 text-cyan-500" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">
                          {order.id}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-white/50">
                          {order.customer} • {order.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-bold text-slate-800 dark:text-white">
                          ${order.total}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-white/50">
                          {order.items} productos
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${status.color}`} />
                        <span className={`text-sm ${status.color}`}>
                          {status.label}
                        </span>
                      </div>

                      <button className="p-2 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors">
                        <Truck className="h-4 w-4 text-slate-400 dark:text-white/40" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {mockOrders.length === 0 && (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-slate-300 dark:text-white/20 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-white/50">No hay pedidos todavía</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}