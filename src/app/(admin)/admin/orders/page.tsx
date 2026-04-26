"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Eye, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ORD-001",
    customer: { name: "Juan Pérez", email: "juan@email.com" },
    items: [
      { name: "EcoFlow River 2 Max", quantity: 1, price: 499 },
      { name: "Cable USB-C 100W", quantity: 1, price: 15 },
    ],
    total: 514,
    status: "pending",
    paymentMethod: "Transferencia",
    address: "La Habana, Centro Habana",
    createdAt: "2024-04-25 10:30",
    notes: "Solicita envío express",
  },
  {
    id: "ORD-002",
    customer: { name: "María García", email: "maria@email.com" },
    items: [
      { name: "PowerBank 20000mAh Ultra", quantity: 2, price: 45 },
    ],
    total: 90,
    status: "confirmed",
    paymentMethod: "Efectivo",
    address: "Santiago de Cuba",
    createdAt: "2024-04-25 09:15",
    notes: "",
  },
  {
    id: "ORD-003",
    customer: { name: "Carlos López", email: "carlos@email.com" },
    items: [
      { name: "EcoFlow Delta 2", quantity: 1, price: 899 },
      { name: "Panel Solar 160W", quantity: 1, price: 249 },
      { name: "Adaptador Universal", quantity: 1, price: 10 },
    ],
    total: 1158,
    status: "in_delivery",
    paymentMethod: "Transferencia",
    address: "Camagüey",
    createdAt: "2024-04-24 16:45",
    notes: "Contactar al llegar",
  },
  {
    id: "ORD-004",
    customer: { name: "Ana Rodríguez", email: "ana@email.com" },
    items: [
      { name: "PowerBank 10000mAh Mini", quantity: 1, price: 25 },
    ],
    total: 25,
    status: "delivered",
    paymentMethod: "Efectivo",
    address: "Villa Clara",
    createdAt: "2024-04-23 11:20",
    notes: "",
  },
];

const statusOptions = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendientes" },
  { value: "confirmed", label: "Confirmados" },
  { value: "in_delivery", label: "En envío" },
  { value: "delivered", label: "Entregados" },
  { value: "cancelled", label: "Cancelados" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  in_delivery: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-600 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
};

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  in_delivery: "En envío",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona todos los pedidos de tu tienda
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar por ID, cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-4 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Pedido
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cliente
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Fecha
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Estado
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} producto{order.items.length > 1 && "s"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer.email}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {order.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold">${order.total}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex px-2 py-1 rounded-md text-xs font-medium border",
                        statusColors[order.status]
                      )}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No se encontraron pedidos</p>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur">
          <div
            className="w-full max-w-2xl rounded-2xl border bg-card shadow-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-semibold">Detalle del pedido {selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cliente</p>
                  <p className="font-medium">{selectedOrder.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fecha</p>
                  <p className="font-medium">{selectedOrder.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dirección</p>
                  <p className="font-medium">{selectedOrder.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Método de pago</p>
                  <p className="font-medium">{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Productos</p>
                <div className="rounded-lg border divide-y">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Cantidad: {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <p className="font-semibold">${item.price * item.quantity}</p>
                    </div>
                  ))}
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
                    <p className="font-semibold">Total</p>
                    <p className="font-bold text-primary">${selectedOrder.total}</p>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Notas</p>
                  <p className="text-sm">{selectedOrder.notes}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-2">Actualizar estado</p>
                <div className="flex flex-wrap gap-2">
                  {["pending", "confirmed", "in_delivery", "delivered", "cancelled"].map(
                    (status) => (
                      <button
                        key={status}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors",
                          selectedOrder.status === status
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-input hover:bg-secondary"
                        )}
                      >
                        {statusLabels[status]}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}