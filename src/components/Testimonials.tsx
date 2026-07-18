"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Carolina",
    text: "As roupas são lindas! A qualidade é incrível e o atendimento via WhatsApp foi super rápido. Já sou cliente fiel! 💜",
    rating: 5,
    emoji: "👩🏻",
    color: "from-lavanda/20 to-lilas/15",
  },
  {
    name: "Mariana Santos",
    text: "Comprei um conjunto de lingerie e amei! A embalagem é linda e discreta. Recomendo demais o Closet Stilus! ✨",
    rating: 5,
    emoji: "👩🏽",
    color: "from-dourado/15 to-lavanda/15",
  },
  {
    name: "Juliana Costa",
    text: "Peças muito bonitas e com preços justos. Chegou rápido e em perfeito estado. Vou comprar de novo com certeza! 🛍️",
    rating: 5,
    emoji: "👩🏼",
    color: "from-roxo/10 to-lilas/15",
  },
  {
    name: "Patrícia Lima",
    text: "O baby doll que comprei é maravilhoso! Fofo, elegante e muito confortável. Adorei! Entrega super rápida. 📦",
    rating: 5,
    emoji: "👩🏾",
    color: "from-lilas/20 to-lavanda/15",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section id="depoimentos" className="section-padding relative overflow-hidden">
      {/* Background vibrante */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-lavanda/8 to-lilas/5" />

      {/* Círculos decorativos */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-lavanda/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-dourado/10 rounded-full blur-3xl"
      />

      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-gold mb-4 inline-flex">💜 Depoimentos</span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-cinza-escuro mb-4">
            O que nossas{" "}
            <span className="text-roxo italic">Clientes</span>{" "}
            Dizem
          </h2>
          <p className="text-cinza-texto text-lg max-w-2xl mx-auto">
            A satisfação das nossas clientes é o que nos motiva a continuar.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={reduce ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={reduce ? undefined : itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`bg-gradient-to-br ${t.color} backdrop-blur-sm rounded-2xl p-8 border border-lavanda/15 hover:border-lavanda/30 transition-all duration-400 hover:shadow-[0_8px_30px_rgba(126,88,184,0.12)] group`}
            >
              <div className="flex items-start gap-4 mb-5">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center text-2xl shrink-0 shadow-sm"
                >
                  {t.emoji}
                </motion.div>
                <div>
                  <p className="font-semibold text-cinza-escuro">{t.name}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={reduce ? false : { opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <Star size={14} className="text-dourado fill-dourado" />
                      </motion.div>
                    ))}
                  </div>
                </div>
                <Quote size={24} className="text-lavanda/40 ml-auto shrink-0 group-hover:text-lilas/50 transition-colors" />
              </div>
              <p className="text-cinza-texto leading-relaxed">{t.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Google Rating */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-white to-lavanda/10 rounded-full px-6 py-3 border border-lavanda/20 shadow-sm"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-dourado fill-dourado" />
              ))}
            </div>
            <span className="text-cinza-escuro font-semibold">5.0</span>
            <span className="text-cinza-texto text-sm">no Google</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
