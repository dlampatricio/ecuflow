import { Package, ShoppingCart, MessageCircle, TrendingUp, DollarSign, Users } from "lucide-react";
import { products } from "@/lib/data";

const stats = [
  { name: "Total Productos", value: "9", icon: Package, trend: "+2 este mes" },
  { name: "Pedidos Pendientes", value: "3", icon: ShoppingCart, trend: "+1 hoy" },
  { name: "Conversaciones", value: "5", icon: MessageCircle, trend: "2 sin leer" },
  { name: "Ingresos", value: "$2,450", icon: DollarSign, trend: "+15% esta semana" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Juan Pérez", items: 2, total: 189, status: "pending", date: "Hace 10 min" },
  { id: "ORD-002", customer: "María García", items: 1, total: 45, status: "confirmed", date: "Hace 1 hora" },
  { id: "ORD-003", customer: "Carlos López", items: 3, total: 899, status: "in_delivery", date: "Hace 3 horas" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600",
  confirmed: "bg-blue-500/10 text-blue-600",
  in_delivery: "bg-purple-500/10 text-purple-600",
  delivered: "bg-green-500/10 text-green-600",
  cancelled: "bg-red-500/10 text-red-600",
};

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  in_delivery: "En envío",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Resumen de tu tienda Ecuflow
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-semibold">Pedidos Recientes</h2>
            <a href="/admin/orders" className="text-sm text-primary hover:underline">
              Ver todos
            </a>
          </div>
          <div className="divide-y">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.id} · {order.items} productos
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total}</p>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {statusLabels[order.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-semibold">Productos Más Vendidos</h2>
            <a href="/admin/products" className="text-sm text-primary hover:underline">
              Gestionar
            </a>
          </div>
          <div className="p-6 space-y-4">
            {products.slice(0, 4).map((product, i) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-lg font-bold text-muted-foreground">
                    #{i + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${product.price} · {product.stock} en stock
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">12 ventas</p>
                  <p className="text-xs text-muted-foreground">este mes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold">Actividad Reciente</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: "Nuevo pedido", detail: "Juan Pérez ordenó EcoFlow River 2 Max", time: "Hace 10 min" },
              { action: "Mensaje recibido", detail: "María García pregunta por envío a La Habana", time: "Hace 25 min" },
              { action: "Pedido entregado", detail: "ORD-003 entregado exitosamente", time: "Hace 1 hora" },
              { action: "Producto agotado", detail: "PowerBank 20000mAh Ultra bajo stock", time: "Hace 3 horas" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}