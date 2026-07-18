"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSales } from "@/context/SalesContext";

export function Cart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { logSale } = useSales();

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return "";

    let message = "🛍️ *Pedido Closet Stilus*\n\n";
    message += "Olá! Gostaria de fazer o seguinte pedido:\n\n";

    items.forEach((item, index) => {
      message += `*${index + 1}. ${item.product.name}*\n`;
      message += `   Tamanho: ${item.size}\n`;
      message += `   Quantidade: ${item.quantity}\n`;
      message += `   Preço unitário: R$ ${item.product.price.toFixed(2).replace(".", ",")}\n`;
      message += `   Subtotal: R$ ${(item.product.price * item.quantity).toFixed(2).replace(".", ",")}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━\n`;
    message += `*Total: R$ ${totalPrice.toFixed(2).replace(".", ",")}*\n`;
    message += `*Itens: ${totalItems}*\n`;
    message += `━━━━━━━━━━━━━━━━━\n\n`;
    message += `Aguardo confirmação! 💜`;

    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    const message = generateWhatsAppMessage();
    if (message) {
      // Log sale for analytics
      logSale(
        items.map((item) => ({
          productName: item.product.name,
          category: item.product.category,
          size: item.size,
          quantity: item.quantity,
          price: item.product.price,
        }))
      );
      clearCart();
      window.open(`https://wa.me/5571991626828?text=${message}`, "_blank");
    }
  };

  return (
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
            onClick={closeCart}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-[-10px_0_40px_rgba(126,88,184,0.15)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-lavanda/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lavanda/20 flex items-center justify-center">
                  <ShoppingBag size={18} className="text-roxo" />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-xl text-cinza-escuro font-semibold">
                    Meu Carrinho
                  </h2>
                  <p className="text-cinza-texto text-xs">
                    {totalItems} {totalItems === 1 ? "item" : "itens"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full bg-cinza-claro flex items-center justify-center text-cinza-texto hover:bg-lavanda/30 transition-colors"
                aria-label="Fechar carrinho"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-6xl mb-4">🛍️</span>
                  <p className="font-[family-name:var(--font-playfair)] text-xl text-cinza-escuro mb-2">
                    Carrinho vazio
                  </p>
                  <p className="text-cinza-texto text-sm">
                    Adicione peças incríveis ao seu carrinho!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 bg-off-white rounded-2xl p-4 border border-lavanda/10"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-xl bg-lavanda/10 overflow-hidden shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-cinza-escuro text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-cinza-texto text-xs">
                          Tamanho: {item.size}
                        </p>
                        <p className="text-roxo font-bold text-sm mt-1">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-lg bg-white border border-lavanda/20 flex items-center justify-center text-cinza-texto hover:border-roxo hover:text-roxo transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-semibold text-cinza-escuro w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-lg bg-white border border-lavanda/20 flex items-center justify-center text-cinza-texto hover:border-roxo hover:text-roxo transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus size={12} />
                          </button>

                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="ml-auto p-1.5 text-cinza-texto/40 hover:text-red-500 transition-colors"
                            aria-label="Remover item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Clear cart */}
                  <button
                    onClick={clearCart}
                    className="text-cinza-texto/50 text-xs hover:text-red-500 transition-colors"
                  >
                    Limpar carrinho
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-lavanda/10 bg-off-white/50">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-cinza-texto font-medium">Total</span>
                  <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-roxo">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  className="w-full h-14 bg-[#25D366] text-white rounded-2xl font-semibold text-base flex items-center justify-center gap-3 hover:bg-[#1DA851] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(37,211,102,0.3)] whatsapp-pulse"
                >
                  <MessageCircle size={20} />
                  Finalizar pelo WhatsApp
                </button>

                <p className="text-cinza-texto/50 text-xs text-center mt-3">
                  Você será redirecionado para o WhatsApp com seu pedido
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
