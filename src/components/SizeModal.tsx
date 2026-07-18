"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { Product } from "@/context/CartContext";

interface SizeModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (size: string) => void;
}

export function SizeModal({ product, isOpen, onClose, onAdd }: SizeModalProps) {
  const [selected, setSelected] = useState<string>("");

  const handleAdd = () => {
    if (selected) {
      onAdd(selected);
      setSelected("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-cinza-escuro/50 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-[0_20px_60px_rgba(126,88,184,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cinza-claro flex items-center justify-center text-cinza-texto hover:bg-lavanda/30 transition-colors"
              aria-label="Fechar"
            >
              <X size={16} />
            </button>

            {/* Product info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-lavanda/20 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-cinza-texto text-xs font-medium uppercase tracking-wider">
                  {product.category}
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-cinza-escuro font-semibold">
                  {product.name}
                </h3>
                <p className="text-roxo font-bold">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-6">
              <p className="text-cinza-escuro font-semibold text-sm mb-3">
                Selecione o tamanho:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelected(size)}
                    className={`min-w-[48px] h-11 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      selected === size
                        ? "bg-roxo text-white shadow-[0_4px_15px_rgba(126,88,184,0.3)] scale-105"
                        : "bg-cinza-claro text-cinza-texto hover:bg-lavanda/30 hover:text-roxo"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add button */}
            <button
              onClick={handleAdd}
              disabled={!selected}
              className={`w-full h-12 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                selected
                  ? "bg-roxo text-white hover:bg-roxo/90 shadow-[0_4px_20px_rgba(126,88,184,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-cinza-claro text-cinza-texto/50 cursor-not-allowed"
              }`}
            >
              {selected ? (
                <>
                  <Check size={18} />
                  Adicionar ao Carrinho
                </>
              ) : (
                "Selecione um tamanho"
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
