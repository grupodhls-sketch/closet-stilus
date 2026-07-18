"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

export function CTA() {
  const reduce = useReducedMotion();

  return (
    <section className="section-padding bg-gradient-to-br from-roxo via-lilas to-roxo relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-[10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[10%] w-[300px] h-[300px] bg-dourado/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lavanda/10 rounded-full blur-3xl" />

        {/* Elementos florais */}
        <div className="absolute top-20 right-20 text-white/10 text-7xl select-none">✿</div>
        <div className="absolute bottom-20 left-20 text-dourado/20 text-5xl select-none">❀</div>
      </div>

      <div className="container-premium relative z-10 text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 mb-8 text-sm text-white/90 font-medium">
            ✨ Moda que valoriza você
          </span>

          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white mb-6 leading-tight">
            Pronta para se Sentir{" "}
            <span className="text-dourado italic">Especial?</span>
          </h2>

          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            Entre em contato agora mesmo e descubra peças incríveis que vão
            transformar seu closet. Atendimento personalizado e carinhoso!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5571991626828?text=Ol%C3%A1!%20Gostaria%20de%20ver%20os%20produtos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#1DA851] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(37,211,102,0.3)] active:scale-[0.98] whatsapp-pulse"
            >
              <MessageCircle size={20} />
              Falar no WhatsApp
              <ArrowRight size={16} />
            </a>

            <a
              href="#colecao"
              className="inline-flex items-center justify-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-xl text-base font-medium hover:border-white/60 hover:bg-white/10 transition-all duration-300 active:scale-[0.98]"
            >
              Ver Coleção
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
