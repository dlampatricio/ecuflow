'use client';

import type { Product, ProductCategory } from '@/types';
import { Battery, Cable, Search, Sun, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';

const categories = [
  { key: 'powerbanks' as ProductCategory, label: 'Powerbanks', icon: Battery, color: 'cyan' },
  { key: 'ecoflow' as ProductCategory, label: 'EcoFlow', icon: Zap, color: 'amber' },
  { key: 'solar_panels' as ProductCategory, label: 'Paneles Solares', icon: Sun, color: 'emerald' },
  { key: 'accessories' as ProductCategory, label: 'Accesorios', icon: Cable, color: 'violet' },
];

const categoryKeys = categories.map((c) => c.key);

const colorClasses: Record<string, { active: string; base: string }> = {
  cyan: {
    active: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400',
    base: 'text-slate-600 dark:text-slate-300',
  },
  amber: {
    active: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
    base: 'text-slate-600 dark:text-slate-300',
  },
  emerald: {
    active: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
    base: 'text-slate-600 dark:text-slate-300',
  },
  violet: {
    active: 'bg-violet-500/20 border-violet-500/50 text-violet-400',
    base: 'text-slate-600 dark:text-slate-300',
  },
};

interface ProductFiltersProps {
  products: Product[];
  onFilteredChange: (filtered: Product[], search: string, categories: ProductCategory[]) => void;
}

export function ProductFilters({ products, onFilteredChange }: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategories.length > 0 && selectedCategories.length < categories.length) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [products, searchTerm, selectedCategories]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    let filtered = products;
    if (selectedCategories.length > 0 && selectedCategories.length < categories.length) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }
    if (value.trim()) {
      const term = value.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }
    onFilteredChange(filtered, value, selectedCategories);
  };

  const handleCategoryClick = (key: ProductCategory) => {
    let newCategories: ProductCategory[];
    if (selectedCategories.includes(key)) {
      newCategories = selectedCategories.filter((c) => c !== key);
    } else {
      newCategories = [...selectedCategories, key];
    }
    setSelectedCategories(newCategories);

    let filtered = products;
    if (newCategories.length > 0 && newCategories.length < categories.length) {
      filtered = filtered.filter((p) => newCategories.includes(p.category));
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }
    onFilteredChange(filtered, searchTerm, newCategories);
  };

  const getCategoriesLabel = () => {
    if (selectedCategories.length === 0 || selectedCategories.length === categories.length) {
      return 'Todas las categorías';
    }
    return selectedCategories
      .map((c) => categories.find((cat) => cat.key === c)?.label)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-white/40 pointer-events-none" />
          <input
            type="search"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-2xl 
              bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl 
              border border-white/60 dark:border-white/10
              text-sm placeholder:text-slate-400 dark:placeholder:text-white/40
              focus:outline-none focus:ring-2 focus:ring-cyan-500/30 
              focus:border-cyan-500/50 
              text-slate-800 dark:text-white
              shadow-xl shadow-black/5 dark:shadow-black/20
              transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((category) => {
          const isActive = selectedCategories.includes(category.key);
          const colors = colorClasses[category.color];
          const Icon = category.icon;

          return (
            <button
              key={category.key}
              onClick={() => handleCategoryClick(category.key)}
              className={`
                group relative p-4 rounded-2xl
                bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl
                border transition-all duration-300
                shadow-xl shadow-black/5 dark:shadow-black/20
                text-left
                ${
                  isActive
                    ? colors.active + ' border-current'
                    : 'border-white/60 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 hover:border-cyan-500/30'
                }
              `}
            >
              {Icon && (
                <Icon
                  className={`h-5 w-5 mb-2 transition-colors ${
                    isActive ? 'text-current' : colors.base
                  }`}
                />
              )}
              <span
                className={`text-xs sm:text-sm font-semibold block ${
                  isActive ? 'text-current' : 'text-slate-700 dark:text-white'
                }`}
              >
                {category.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
