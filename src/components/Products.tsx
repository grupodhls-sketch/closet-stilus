"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { useCart, Product } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useAdmin } from "@/context/AdminContext";
import { SizeModal } from "./SizeModal";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Products() {
  const reduce = useReducedMotion();
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { products, categories } = useAdmin();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredProducts = useCallback(() => {
    if (activeCategory === "Todos") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
  };

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleConfirmSize = (size: string) => {
    if (selectedProduct) {
      addItem(selectedProduct, size);
    }
  };

  const displayedProducts = filteredProducts();

  return (
    <section id="colecao" className="section-padding bg-gradient-to-b from-white via-off-white to-white relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-lavanda/8 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-dourado/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="badge-gold mb-4 inline-flex">✿ Coleção</span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl text-cinza-escuro mb-4">
            Peças que Contam{" "}
            <span className="text-roxo italic">Histórias</span>
          </h2>
          <p className="text-cinza-texto text-base sm:text-lg max-w-2xl mx-auto">
            Cada peça é selecionada com amor para você se sentir única e especial.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-roxo text-white shadow-[0_4px_15px_rgba(126,88,184,0.3)] scale-105"
                  : "bg-cinza-claro text-cinza-texto hover:bg-lavanda/30 hover:text-roxo"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
          >
            {displayedProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={reduce ? undefined : itemVariants}
                initial="hidden"
                animate="visible"
                className="card-produto group"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-lavanda/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    style={{ objectPosition: `${product.imagePos?.x ?? 50}% ${product.imagePos?.y ?? 50}%` }}
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cinza-escuro/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-dourado text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
                      {product.badge}
                    </div>
                  )}

                  {/* Hover actions — desktop */}
                  <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 h-11 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center gap-2 text-roxo font-semibold text-sm hover:bg-white transition-all shadow-lg"
                      >
                        <ShoppingBag size={15} />
                        Comprar
                      </button>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`w-11 h-11 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                          isFavorite(product.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/95 text-roxo hover:bg-white"
                        }`}
                        aria-label={isFavorite(product.id) ? "Remover dos favoritos" : "Favoritar"}
                      >
                        <Heart size={15} className={isFavorite(product.id) ? "fill-white" : ""} />
                      </button>
                    </div>
                  </div>

                  {/* Mobile actions — always visible */}
                  <div className="sm:hidden absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 h-10 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center gap-1.5 text-roxo font-semibold text-xs shadow-lg"
                      >
                        <ShoppingBag size={13} />
                        Comprar
                      </button>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`w-10 h-10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                          isFavorite(product.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/95 text-roxo"
                        }`}
                        aria-label={isFavorite(product.id) ? "Remover dos favoritos" : "Favoritar"}
                      >
                        <Heart size={13} className={isFavorite(product.id) ? "fill-white" : ""} />
                      </button>
                    </div>
                  </div>

                  {/* Moldura dourada no hover */}
                  <div className="absolute inset-3 border-2 border-dourado/0 group-hover:border-dourado/30 rounded-2xl transition-all duration-500 pointer-events-none" />
                </div>

                {/* Info */}
                <div className="p-3.5 sm:p-5">
                  <p className="text-lilas text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-[family-name:var(--font-playfair)] text-sm sm:text-lg text-cinza-escuro font-semibold mb-1.5 sm:mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
                    <span className="text-roxo font-bold text-base sm:text-lg">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-cinza-texto/50 text-xs sm:text-sm line-through">
                        R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </div>

                  {/* Sizes */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md bg-lavanda/15 text-roxo font-medium"
                      >
                        {size}
                      </span>
                    ))}
                  </div>

                  {/* Add to cart — desktop only */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="hidden sm:flex w-full h-11 bg-gradient-to-r from-roxo to-lilas text-white rounded-xl text-sm font-semibold items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(126,88,184,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    <ShoppingBag size={15} />
                    Adicionar ao Carrinho
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {displayedProducts.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">💜</span>
            <p className="text-cinza-texto text-lg">Nenhum produto nesta categoria</p>
          </div>
        )}
      </div>

      {/* Size Modal */}
      {selectedProduct && (
        <SizeModal
          product={selectedProduct}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedProduct(null);
          }}
          onAdd={handleConfirmSize}
        />
      )}
    </section>
  );
}
