"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
  { value: "powerbanks", label: "Powerbanks" },
  { value: "ecoflow", label: "EcoFlow" },
  { value: "solar_panels", label: "Paneles Solares" },
  { value: "accessories", label: "Accesorios" },
];

const currencies = [
  { value: "USD", label: "USD" },
  { value: "CUP", label: "CUP" },
  { value: "MLC", label: "MLC" },
];

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    currency: "USD",
    category: "powerbanks",
    images: "",
    specs: "",
    stock: "0",
    featured: false,
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const images = formData.images 
        ? formData.images.split("\n").map((url: string) => url.trim()).filter(Boolean)
        : [];

      const specs = formData.specs
        ? formData.specs.split("\n").map((line: string) => {
            const [label, value] = line.split(":").map((s: string) => s.trim());
            return label && value ? { label, value } : null;
          }).filter(Boolean)
        : [];

      const { error: insertError } = await supabase
        .from("products")
        .insert({
          name: formData.name,
          slug: formData.slug,
          description: formData.description || null,
          price: parseFloat(formData.price),
          currency: formData.currency,
          category: formData.category,
          images: images.length > 0 ? images : [],
          specs: specs.length > 0 ? specs : [],
          stock: parseInt(formData.stock) || 0,
          featured: formData.featured,
        });

      if (insertError) throw insertError;

      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a productos
          </Link>

          <div className="p-6 sm:p-8 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1]">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-6">
              Nuevo Producto
            </h1>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-white/40 dark:bg-slate-800 border border-white/60 dark:border-white/[0.1] text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  placeholder="PowerBank 20000mAh Ultra"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full h-12 px-4 rounded-2xl bg-white/40 dark:bg-slate-800 border border-white/60 dark:border-white/[0.1] text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  placeholder="powerbank-20000mah-ultra"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-white/40 dark:bg-slate-800 border border-white/60 dark:border-white/[0.1] text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  placeholder="Descripción del producto..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Precio *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full h-12 px-4 rounded-2xl bg-white/40 dark:bg-slate-800 border border-white/60 dark:border-white/[0.1] text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                    placeholder="45.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Moneda
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full h-12 px-4 rounded-2xl bg-white/40 dark:bg-slate-800 border border-white/60 dark:border-white/[0.1] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  >
                    {currencies.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Categoría *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full h-12 px-4 rounded-2xl bg-white/40 dark:bg-slate-800 border border-white/60 dark:border-white/[0.1] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                    className="w-full h-12 px-4 rounded-2xl bg-white/40 dark:bg-slate-800 border border-white/60 dark:border-white/[0.1] text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                  Imágenes (URLs, una por línea)
                </label>
                <textarea
                  value={formData.images}
                  onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl bg-white/40 dark:bg-slate-800 border border-white/60 dark:border-white/[0.1] text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 font-mono text-sm"
                  placeholder="https://ejemplo.com/imagen1.jpg&#10;https://ejemplo.com/imagen2.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                  Especificaciones (formato: label: valor)
                </label>
                <textarea
                  value={formData.specs}
                  onChange={(e) => setFormData(prev => ({ ...prev, specs: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl bg-white/40 dark:bg-slate-800 border border-white/60 dark:border-white/[0.1] text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 font-mono text-sm"
                  placeholder="Capacidad: 20000mAh&#10;Salida: 65W PD"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-5 h-5 rounded border-white/60 dark:border-white/[0.1] text-cyan-500 focus:ring-cyan-500/30"
                />
                <label htmlFor="featured" className="text-sm font-medium text-slate-700 dark:text-white">
                  Producto destacado
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/admin/products"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-white/60 dark:border-white/[0.1] text-slate-700 dark:text-white hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-cyan-400 transition-all disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {loading ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}