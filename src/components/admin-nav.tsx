"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ShoppingBag, MessageCircle, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { href: "/admin/products", label: "Productos", icon: Package },
  { href: "/admin/orders", label: "Pedidos", icon: ShoppingBag },
  { href: "/admin/chat", label: "Mensajes", icon: MessageCircle },
  { href: "/admin", label: "Estadísticas", icon: BarChart3 },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2 p-4 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1]">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Admin</h2>
        <p className="text-xs text-slate-500 dark:text-white/50">Panel de control</p>
      </div>

      <div className="space-y-1">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                isActive
                  ? "bg-cyan-500 text-slate-900"
                  : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="pt-4 mt-4 border-t border-white/60 dark:border-white/[0.1]">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10 transition-all"
        >
          <Settings className="h-5 w-5" />
          Configuración
        </Link>
      </div>
    </nav>
  );
}