import type { Product } from "@/types";

export type { Product };

export function getProductBySlug(slug: string): Product | undefined {
  throw new Error("Use Supabase queries instead");
}

export function getFeaturedProducts(): Product[] {
  throw new Error("Use Supabase queries instead");
}

export function getProductsByCategory(category: string): Product[] {
  throw new Error("Use Supabase queries instead");
}

export function getProducts(): Product[] {
  throw new Error("Use Supabase queries instead");
}