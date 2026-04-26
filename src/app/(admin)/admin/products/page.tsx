"use client";

import { useState } from "react";
import { Search, Plus, Pencil, Trash2, Eye, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/lib/data";
import type { Product } from "@/types";

const statusColors: Record<string, string> = {
  in_stock: "bg-green-500/10 text-green-600 border-green-500/20",
  low_stock: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  out_of_stock: "bg-red-500/10 text-red-600 border-red-500/20",
};

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    if (categoryFilter !== "all" && product.category !== categoryFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { status: "out_of_stock", label: "Agotado" };
    if (stock <= 5) return { status: "low_stock", label: "Bajo stock" };
    return { status: "in_stock", label: "Disponible" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona tu catálogo de productos
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          Nuevo producto
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 px-4 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">Todas las categorías</option>
          <option value="powerbanks">Powerbanks</option>
          <option value="ecoflow">EcoFlow</option>
          <option value="solar_panels">Paneles Solares</option>
          <option value="accessories">Accesorios</option>
        </select>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Producto
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Categoría
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Precio
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Stock
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
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <tr
                    key={product.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{product.name}</p>
                            {product.featured && (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm capitalize">
                        {product.category.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold">${product.price}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {product.stock} unidades
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex px-2 py-1 rounded-md text-xs font-medium border",
                          statusColors[stockStatus.status]
                        )}
                      >
                        {stockStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary text-destructive transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No se encontraron productos</p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur">
          <div
            className="w-full max-w-2xl rounded-2xl border bg-card shadow-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-semibold">Detalle del producto</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="aspect-square rounded-xl bg-secondary overflow-hidden">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre</p>
                    <p className="font-medium">{selectedProduct.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Precio</p>
                    <p className="text-xl font-bold text-primary">
                      ${selectedProduct.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Descripción</p>
                    <p className="text-sm">{selectedProduct.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Especificaciones</p>
                    <div className="mt-2 space-y-1">
                      {selectedProduct.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {spec.label}
                          </span>
                          <span>{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}