"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart, Product } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";
import { SizeModal } from "./SizeModal";

export function FavoritesPopup() {
  const { favorites, isOpen, closeFavorites, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  const { products } = useAdmin();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setSizeModalOpen(true);
  };

  const handleConfirmSize = (size: string) => {
    if (selectedProduct) {
      addItem(selectedProduct, size);
    }
  };

  const handleRemove = (id: number) => {
    toggleFavorite(id);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55]"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-cinza-escuro/50 backdrop-blur-sm"
              onClick={closeFavorites}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-[-10px_0_40px_rgba(126,88,184,0.15)] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-lavanda/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <Heart size={18} className="text-red-400 fill-red-400" />
                  </div>
                  <div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-cinza-escuro font-semibold">
                      Meus Favoritos
                    </h2>
                    <p className="text-cinza-texto text-xs">
                      {favoriteProducts.length} {favoriteProducts.length === 1 ? "peça" : "peças"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeFavorites}
                  className="w-8 h-8 rounded-full bg-cinza-claro flex items-center justify-center text-cinza-texto hover:bg-lavanda/30 transition-colors"
                  aria-label="Fechar favoritos"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
                {favoriteProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <span className="text-5xl sm:text-6xl mb-4">💜</span>
                    <p className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-cinza-escuro mb-2">
                      Nenhum favorito ainda
                    </p>
                    <p className="text-cinza-texto text-sm">
                      Toque no ❤️ nas peças que você amar!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {favoriteProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 80 }}
                        className="flex gap-3 sm:gap-4 bg-off-white rounded-2xl p-3 sm:p-4 border border-lavanda/10"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-xl bg-lavanda/10 overflow-hidden shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <p className="text-lilas text-[10px] font-semibold uppercase tracking-wider">
                              {product.category}
                            </p>
                            <h4 className="font-semibold text-cinza-escuro text-sm truncate">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-roxo font-bold text-sm">
                                R$ {product.price.toFixed(2).replace(".", ",")}
                              </span>
                              {product.originalPrice && (
                                <span className="text-cinza-texto/40 text-[10px] line-through">
                                  R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="flex-1 h-9 bg-gradient-to-r from-roxo to-lilas text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:shadow-[0_4px_15px_rgba(126,88,184,0.3)] transition-all"
                            >
                              <ShoppingBag size={13} />
                              Comprar
                            </button>
                            <button
                              onClick={() => handleRemove(product.id)}
                              className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-600 transition-all"
                              aria-label="Remover dos favoritos"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {favoriteProducts.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-lavanda/10 bg-off-white/50 shrink-0">
                  <button
                    onClick={() => {
                      closeFavorites();
                      document.getElementById("colecao")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-roxo to-lilas text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(126,88,184,0.3)] transition-all"
                  >
                    <ShoppingBag size={15} />
                    Ver Coleção
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size Modal */}
      {selectedProduct && (
        <SizeModal
          product={selectedProduct}
          isOpen={sizeModalOpen}
          onClose={() => {
            setSizeModalOpen(false);
            setSelectedProduct(null);
          }}
          onAdd={handleConfirmSize}
        />
      )}
    </>
  );
}
