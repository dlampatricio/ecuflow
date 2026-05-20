"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import type { Product, ProductCategory } from "@/types";

interface ProductsClientProps {
  initialProducts: Product[];
}

const categoryLabels: Record<string, string> = {
  powerbanks: "Powerbanks",
  ecoflow: "EcoFlow",
  solar_panels: "Paneles Solares",
  accessories: "Accesorios",
};

export function ProductsClient({ initialProducts }: ProductsClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);

  const handleFilteredChange = (
    filtered: Product[],
    search: string,
    categories: ProductCategory[]
  ) => {
    setFilteredProducts(filtered);
    setSearchTerm(search);
    setSelectedCategories(categories);
  };

  const getTitle = () => {
    if (selectedCategories.length === 0) {
      return "Todos los productos";
    }
    if (selectedCategories.length === 1) {
      return categoryLabels[selectedCategories[0]] || selectedCategories[0];
    }
    return selectedCategories
      .map((c) => categoryLabels[c] || c)
      .join(" + ");
  };

  return (
    <>
      <section className="relative py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div
            className="max-w-4xl mx-auto animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <ProductFilters
              products={initialProducts}
              onFilteredChange={handleFilteredChange}
            />
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16 md:py-20 pb-20 sm:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {filteredProducts.length === 0 ? (
            <div className="max-w-2xl mx-auto p-12 text-center rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10M4 7h16"
                  />
                </svg>
              </div>
              <p className="text-slate-500 dark:text-white/50 text-lg mb-6">
                No se encontraron productos
              </p>
              <button
                onClick={() => handleFilteredChange(initialProducts, "", [])}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/90 hover:bg-cyan-500 text-slate-900 font-semibold transition-all shadow-lg shadow-cyan-500/25"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between max-w-full">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                    {getTitle()}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-white/50 mt-1">
                    {filteredProducts.length} artículo
                    {filteredProducts.length !== 1 ? "s" : ""} disponible
                    {filteredProducts.length !== 1 ? "s" : ""}
                    {searchTerm && ` para "${searchTerm}"`}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}