"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Carolina",
    text: "As roupas são lindas! A qualidade é incrível e o atendimento via WhatsApp foi super rápido. Já sou cliente fiel! 💜",
    rating: 5,
    emoji: "👩🏻",
  },
  {
    name: "Mariana Santos",
    text: "Comprei um conjunto de lingerie e amei! A embalagem é linda e discreta. Recomendo demais o Closet Stilus! ✨",
    rating: 5,
    emoji: "👩🏽",
  },
  {
    name: "Juliana Costa",
    text: "Peças muito bonitas e com preços justos. Chegou rápido e em perfeito estado. Vou comprar de novo com certeza! 🛍️",
    rating: 5,
    emoji: "👩🏼",
  },
  {
    name: "Patrícia Lima",
    text: "O baby doll que comprei é maravilhoso! Fofo, elegante e muito confortável. Adorei! Entrega super rápida. 📦",
    rating: 5,
    emoji: "👩🏾",
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
    <section id="depoimentos" className="section-padding bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-lavanda/8 rounded-full blur-3xl" />

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
              className="bg-off-white rounded-2xl p-8 border border-lavanda/15 hover:border-lavanda/30 transition-all duration-400 hover:shadow-[0_8px_30px_rgba(126,88,184,0.08)] group"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-lavanda/30 flex items-center justify-center text-2xl shrink-0">
                  {t.emoji}
                </div>
                <div>
                  <p className="font-semibold text-cinza-escuro">{t.name}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-dourado fill-dourado" />
                    ))}
                  </div>
                </div>
                <Quote size={24} className="text-lavanda/40 ml-auto shrink-0 group-hover:text-lilas/40 transition-colors" />
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
          <div className="inline-flex items-center gap-3 bg-off-white rounded-full px-6 py-3 border border-lavanda/15">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-dourado fill-dourado" />
              ))}
            </div>
            <span className="text-cinza-escuro font-semibold">5.0</span>
            <span className="text-cinza-texto text-sm">no Google</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
