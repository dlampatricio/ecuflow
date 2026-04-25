"use client";

import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types";
import { ShoppingCart } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
    >
      <ShoppingCart className="h-5 w-5" />
      Añadir al carrito
    </button>
  );
}