"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(true);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-3 max-w-[240px]"
          >
            <p className="text-cinza-escuro text-sm font-medium leading-snug">
              Olá! 💜 Precisa de ajuda?
            </p>
            <button
              onClick={() => setTooltip(false)}
              className="text-cinza-texto hover:text-cinza-escuro transition-colors shrink-0"
              aria-label="Fechar"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/557192893334?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos"
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300 whatsapp-pulse"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={28} className="text-white" />
      </a>
    </div>
  );
}
