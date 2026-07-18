"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Truck, ShieldCheck } from "lucide-react";

const stats = [
  { value: "500+", label: "Clientes Felizes", icon: "💜" },
  { value: "100%", label: "Produtos Selecionados", icon: "✨" },
  { value: "5★", label: "Avaliação", icon: "⭐" },
];

const floatingElements = [
  { emoji: "💜", x: "10%", y: "20%", size: "text-4xl", delay: 0, duration: 6 },
  { emoji: "✨", x: "85%", y: "15%", size: "text-3xl", delay: 1, duration: 5 },
  { emoji: "🌸", x: "5%", y: "70%", size: "text-2xl", delay: 2, duration: 7 },
  { emoji: "💫", x: "90%", y: "65%", size: "text-3xl", delay: 0.5, duration: 5.5 },
  { emoji: "✿", x: "75%", y: "80%", size: "text-2xl", delay: 1.5, duration: 6.5 },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-gradient-to-br from-off-white via-lavanda/10 to-dourado/5"
    >
      {/* Background decorativo animado */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Círculos decorativos */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] w-[500px] h-[500px] bg-lavanda/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-lilas/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dourado/8 rounded-full blur-3xl"
        />

        {/* Elementos flutuantes */}
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: el.delay,
            }}
            className={`absolute ${el.size} select-none pointer-events-none`}
            style={{ left: el.x, top: el.y }}
          >
            {el.emoji}
          </motion.div>
        ))}
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
                <span className="relative">
                  <span className="text-roxo italic">autoestima</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-dourado to-lilas rounded-full origin-left"
                  />
                </span>{" "}
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  ✨
                </motion.span>
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
                  className="btn-lavanda group"
                >
                  Ver Coleção
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#sobre"
                  className="btn-outline-gold"
                >
                  Nossa História
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-6"
              >
                {[
                  { icon: Truck, text: "Entrega Brasil" },
                  { icon: ShieldCheck, text: "Qualidade Garantida" },
                  { icon: Star, text: "5★ no Google" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-cinza-texto/60">
                    <item.icon size={14} className="text-dourado" />
                    <span className="text-xs font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden">
                {/* Imagem principal */}
                <img
                  src="/products/baby-doll-romantico.jpg"
                  alt="Closet Stilus Coleção"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-roxo/30 via-transparent to-lavanda/20" />
                {/* Moldura dourada */}
                <div className="absolute inset-4 border-2 border-dourado/30 rounded-[24px] pointer-events-none" />
              </div>

              {/* Card flutuante 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl px-5 py-3 shadow-[0_8px_30px_rgba(126,88,184,0.15)]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">💜</span>
                  <div>
                    <p className="text-cinza-escuro font-semibold text-sm">Nova Coleção</p>
                    <p className="text-cinza-texto text-xs">Lavanda & Dourado</p>
                  </div>
                </div>
              </motion.div>

              {/* Card flutuante 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-[0_8px_30px_rgba(126,88,184,0.15)]"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {["💜", "✨", "🌸"].map((e, i) => (
                      <span key={i} className="text-lg">{e}</span>
                    ))}
                  </div>
                  <div>
                    <p className="text-cinza-escuro font-semibold text-sm">Frete Grátis</p>
                    <p className="text-cinza-texto text-xs">Acima de R$ 199</p>
                  </div>
                </div>
              </motion.div>
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
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-lilas rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
