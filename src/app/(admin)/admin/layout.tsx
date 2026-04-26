"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageCircle,
  Settings,
  LogOut,
  Zap,
  X,
} from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Pedidos", href: "/admin/orders", icon: ShoppingCart },
  { name: "Productos", href: "/admin/products", icon: Package },
  { name: "Chat", href: "/admin/chat", icon: MessageCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-card transform transition-transform duration-200 lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold">Ecuflow</span>
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center gap-3 mb-4 px-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress?.[0] || "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.firstName || "Admin"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Administrador
              </p>
            </div>
          </div>
          <SignOutButton>
            <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </SignOutButton>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex h-16 items-center gap-4 px-6 border-b bg-card/50 backdrop-blur">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Zap className="h-6 w-6" />
          </button>
          <div className="flex-1" />
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver tienda →
          </Link>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}