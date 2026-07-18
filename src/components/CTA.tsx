"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  const reduce = useReducedMotion();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background vibrante com gradiente mais rico */}
      <div className="absolute inset-0 bg-gradient-to-br from-roxo via-roxo to-lilas" />

      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[10%] w-[400px] h-[400px] bg-white/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 right-[10%] w-[300px] h-[300px] bg-dourado/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lavanda/10 rounded-full blur-3xl"
        />

        {/* Elementos florais flutuantes */}
        {["✿", "❀", "✿", "❀"].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            className="absolute text-white/10 text-5xl select-none pointer-events-none"
            style={{
              top: `${20 + i * 15}%`,
              left: i % 2 === 0 ? `${10 + i * 5}%` : `${75 - i * 3}%`,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      <div className="container-premium relative z-10 text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-6"
          >
            <Sparkles size={32} className="text-dourado" />
          </motion.div>

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
            <motion.a
              href="https://wa.me/557192893334?text=Ol%C3%A1!%20Gostaria%20de%20ver%20os%20produtos"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#1DA851] transition-colors duration-300 hover:shadow-[0_8px_30px_rgba(37,211,102,0.3)] whatsapp-pulse"
            >
              <MessageCircle size={20} />
              Falar no WhatsApp
              <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="#colecao"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-xl text-base font-medium hover:border-white/60 hover:bg-white/10 transition-all duration-300"
            >
              Ver Coleção
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
