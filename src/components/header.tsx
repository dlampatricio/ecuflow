"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cart";
import { ShoppingCart, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">Ecuflow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/productos"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Productos
            </Link>
            <Link
              href="/categorias/powerbanks"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Powerbanks
            </Link>
            <Link
              href="/categorias/ecoflow"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              EcoFlow
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/chat"
            className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Chat</span>
          </Link>

          <Link
            href="/carrito"
            className="relative flex items-center justify-center"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              href="/productos"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="/categorias/powerbanks"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Powerbanks
            </Link>
            <Link
              href="/categorias/ecoflow"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              EcoFlow
            </Link>
            <Link
              href="/chat"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Chat
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}