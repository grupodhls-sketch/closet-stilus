"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ShoppingBag, Heart, Tag } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { useAdmin } from "@/context/AdminContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { Product } from "@/context/CartContext";

function formatBRL(v: number) {
  return `R$ ${v.toFixed(2).replace(".", ",")}`;
}

export function SearchOverlay() {
  const { isOpen, closeSearch } = useSearch();
  const { products, categories } = useAdmin();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedCategory("Todos");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.badge && p.badge.toLowerCase().includes(q))
      );
    });
  }, [query, selectedCategory, products]);

  const handleSelect = (product: Product) => {
    closeSearch();
    setTimeout(() => {
      document.getElementById("colecao")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex flex-col"
          onClick={(e) => e.target === e.currentTarget && closeSearch()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-cinza-escuro/60 backdrop-blur-md" onClick={closeSearch} />

          {/* Search panel */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto w-full max-w-2xl mt-4 sm:mt-8 px-4"
          >
            {/* Search input */}
            <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden">
              <div className="flex items-center gap-3 px-4 sm:px-5 h-14 sm:h-16">
                <Search size={20} className="text-roxo shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="flex-1 text-cinza-escuro text-sm sm:text-base outline-none placeholder:text-cinza-texto/40 bg-transparent"
                />
                <button onClick={closeSearch}
                  className="w-8 h-8 rounded-lg bg-cinza-claro flex items-center justify-center text-cinza-texto hover:bg-lavanda/20 hover:text-roxo transition-all shrink-0">
                  <X size={16} />
                </button>
              </div>

              {/* Category pills */}
              <div className="flex gap-1.5 px-4 sm:px-5 pb-3 overflow-x-auto scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-roxo text-white"
                        : "bg-cinza-claro text-cinza-texto hover:bg-lavanda/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {query.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden max-h-[60dvh] overflow-y-auto"
              >
                {results.length === 0 ? (
                  <div className="py-12 text-center">
                    <span className="text-4xl block mb-3">💜</span>
                    <p className="text-cinza-texto text-sm">Nenhum produto encontrado</p>
                    <p className="text-cinza-texto/50 text-xs mt-1">Tente outro termo</p>
                  </div>
                ) : (
                  <div className="divide-y divide-lavanda/10">
                    {results.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelect(product)}
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-lavanda/5 cursor-pointer transition-colors"
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-lavanda/10 overflow-hidden shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: `${product.imagePos?.x ?? 50}% ${product.imagePos?.y ?? 50}%` }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-semibold text-cinza-escuro text-sm truncate">{product.name}</h4>
                            {product.badge && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-dourado/15 text-dourado-escuro font-medium shrink-0">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Tag size={10} className="text-lilas shrink-0" />
                            <p className="text-cinza-texto text-xs">{product.category}</p>
                            <span className="text-cinza-texto/30 text-xs">·</span>
                            <p className="text-cinza-texto text-xs">{product.sizes.join(", ")}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-roxo font-bold text-sm">{formatBRL(product.price)}</span>
                            {product.originalPrice && (
                              <span className="text-cinza-texto/40 text-xs line-through">{formatBRL(product.originalPrice)}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                              isFavorite(product.id) ? "bg-red-100 text-red-500" : "bg-cinza-claro text-cinza-texto hover:bg-lavanda/20"
                            }`}
                          >
                            <Heart size={14} className={isFavorite(product.id) ? "fill-red-500" : ""} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); addItem(product, product.sizes[0]); closeSearch(); }}
                            className="w-9 h-9 rounded-lg bg-roxo text-white flex items-center justify-center hover:bg-roxo/90 transition-all"
                          >
                            <ShoppingBag size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Quick suggestions when no query */}
            {!query.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-4 sm:p-5"
              >
                <p className="text-cinza-texto text-xs font-medium mb-3">Buscas populares</p>
                <div className="flex flex-wrap gap-2">
                  {["Lingerie", "Baby Doll", "Biquíni", "Cosméticos", "Calçados", "Promoção"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-cinza-claro text-cinza-texto text-xs font-medium hover:bg-lavanda/20 hover:text-roxo transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
