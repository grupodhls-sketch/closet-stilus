"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { products } from "@/data/products";
import { useCart, Product } from "@/context/CartContext";
import { SizeModal } from "./SizeModal";

const categories = ["Todos", "Lingerie", "Baby Dolls", "Biquínis", "Cosméticos", "Calçados"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Products() {
  const reduce = useReducedMotion();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredProducts =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleConfirmSize = (size: string) => {
    if (selectedProduct) {
      addItem(selectedProduct, size);
    }
  };

  return (
    <section id="colecao" className="section-padding bg-white">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-gold mb-4 inline-flex">✿ Coleção</span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-cinza-escuro mb-4">
            Peças que Contam{" "}
            <span className="text-roxo italic">Histórias</span>
          </h2>
          <p className="text-cinza-texto text-lg max-w-2xl mx-auto">
            Cada peça é selecionada com amor para você se sentir única e especial.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-roxo text-white shadow-[0_4px_15px_rgba(126,88,184,0.3)]"
                  : "bg-cinza-claro text-cinza-texto hover:bg-lavanda/30 hover:text-roxo"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={reduce ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={reduce ? undefined : itemVariants}
              className="card-produto group"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-lavanda/20 to-lilas/10 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-dourado text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {product.badge}
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cinza-escuro/0 group-hover:bg-cinza-escuro/10 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      aria-label="Adicionar ao carrinho"
                    >
                      <ShoppingBag size={16} className="text-roxo" />
                    </button>
                    <button
                      className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      aria-label="Favoritar"
                    >
                      <Heart size={16} className="text-roxo" />
                    </button>
                  </div>
                </div>

                {/* Moldura dourada no hover */}
                <div className="absolute inset-3 border-2 border-dourado/0 group-hover:border-dourado/20 rounded-2xl transition-all duration-500 pointer-events-none" />
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-cinza-texto text-xs font-medium uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-cinza-escuro font-semibold mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-roxo font-bold text-lg">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-cinza-texto/50 text-sm line-through">
                      R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>

                {/* Sizes preview */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="text-[10px] px-2 py-0.5 rounded bg-cinza-claro text-cinza-texto font-medium"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                {/* Add to cart button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full h-11 bg-roxo/10 text-roxo rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-roxo hover:text-white transition-all duration-300"
                >
                  <ShoppingBag size={15} />
                  Adicionar ao Carrinho
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Size Modal */}
      <SizeModal
        product={selectedProduct!}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onAdd={handleConfirmSize}
      />
    </section>
  );
}
