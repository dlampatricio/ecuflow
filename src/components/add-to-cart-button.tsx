"use client";

import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className={cn(
        "group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25",
        className
      )}
    >
      <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
      Añadir al carrito
    </button>
  );
}