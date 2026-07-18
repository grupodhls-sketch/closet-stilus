"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const stats = [
  { value: "500+", label: "Clientes Felizes" },
  { value: "100%", label: "Produtos Selecionados" },
  { value: "5★", label: "Avaliação" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-off-white"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Círculos decorativos lavanda */}
        <div className="absolute top-20 right-[15%] w-[500px] h-[500px] bg-lavanda/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-lilas/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dourado/5 rounded-full blur-3xl" />

        {/* Padrão floral sutil */}
        <div className="absolute top-32 left-20 text-dourado/10 text-8xl animate-shimmer select-none">✿</div>
        <div className="absolute bottom-40 right-32 text-lavanda/15 text-6xl animate-float select-none">❀</div>
        <div className="absolute top-1/3 right-[8%] text-dourado/8 text-5xl animate-shimmer select-none" style={{ animationDelay: "1s" }}>✾</div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Texto */}
            <div className="max-w-xl">
              {/* Badge */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="badge-gold mb-8">
                  <Sparkles size={14} />
                  Novidade — Nova Coleção 2026
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl text-cinza-escuro leading-[1.08] mb-6"
              >
                Renove sua{" "}
                <span className="text-roxo italic">autoestima</span>{" "}
                <span className="text-dourado">✨</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-cinza-texto text-lg md:text-xl leading-relaxed max-w-lg mb-10"
              >
                Moda que valoriza você. Peças selecionadas com carinho para
                mulheres que merecem se sentir lindas todos os dias.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 mb-14"
              >
                <a
                  href="#colecao"
                  className="btn-lavanda"
                >
                  Ver Coleção
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#sobre"
                  className="btn-outline-gold"
                >
                  Nossa História
                </a>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-6 md:gap-10"
              >
                {stats.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-roxo">
                      {item.value}
                    </span>
                    <span className="text-cinza-texto text-sm">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Imagem / Visual */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden bg-lavanda/20">
                {/* Placeholder elegante com gradiente */}
                <div className="absolute inset-0 bg-gradient-to-br from-lavanda/40 via-lilas/20 to-dourado/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="text-8xl mb-6 animate-float">👗</div>
                  <p className="font-[family-name:var(--font-playfair)] text-2xl text-roxo font-semibold mb-2">
                    Nova Coleção
                  </p>
                  <p className="text-cinza-texto text-sm">Lavanda & Dourado</p>
                </div>
                {/* Moldura dourada decorativa */}
                <div className="absolute inset-4 border-2 border-dourado/20 rounded-[24px] pointer-events-none" />
              </div>
              {/* Elemento decorativo flutuante */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-dourado/10 rounded-full flex items-center justify-center animate-float">
                <span className="text-3xl">💜</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-lilas/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-lilas rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
