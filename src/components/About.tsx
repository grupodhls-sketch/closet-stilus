"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Truck, ShieldCheck, Heart, Headphones } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Feito com Amor",
    description: "Cada peça é cuidadosamente selecionada pensando no seu conforto e autoestima.",
  },
  {
    icon: Truck,
    title: "Entrega para Todo Brasil",
    description: "Enviamos para todo o Brasil com segurança e carinho. Embalagem discreta e elegante.",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade Garantida",
    description: "Trabalhamos apenas com fornecedores que compartilham nosso compromisso com a excelência.",
  },
  {
    icon: Headphones,
    title: "Atendimento Pessoal",
    description: "Tire suas dúvidas pelo WhatsApp. Atendimento humanizado e sem robôs.",
  },
];

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="sobre" className="section-padding relative overflow-hidden">
      {/* Background vibrante com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-lavanda/15 via-white to-lilas/10" />

      {/* Círculos decorativos animados */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-lavanda/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dourado/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-roxo/10 rounded-full blur-3xl"
      />

      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Visual */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Círculo principal com gradiente mais vibrante */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-br from-lavanda/40 via-lilas/30 to-dourado/20 rounded-full"
              />
              {/* Moldura dourada */}
              <div className="absolute inset-4 border-2 border-dourado/40 rounded-full" />
              {/* Conteúdo central — Logo real */}
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <motion.img
                  src="/logo.png"
                  alt="Closet Stilus"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              {/* Elementos flutuantes */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 w-16 h-16 bg-dourado/20 rounded-full flex items-center justify-center"
              >
                <span className="text-2xl">✨</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -10, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 left-4 w-14 h-14 bg-lavanda/25 rounded-full flex items-center justify-center"
              >
                <span className="text-xl">🌸</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="badge-gold mb-6 inline-flex">✿ Nossa História</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-cinza-escuro mb-6 leading-tight">
              Moda que{" "}
              <span className="text-roxo italic">Valoriza</span>{" "}
              Você
            </h2>
            <p className="text-cinza-texto text-lg leading-relaxed mb-6">
              O Closet Stilus nasceu do desejo de oferecer moda feminina com
              elegância, sofisticação e preços acessíveis. Acreditamos que toda
              mulher merece se sentir linda e confiante.
            </p>
            <p className="text-cinza-texto text-lg leading-relaxed mb-8">
              Selecionamos cada peça com carinho, pensando no conforto, na
              qualidade e na beleza que faz a diferença no seu dia a dia. Aqui,
              você não é apenas uma cliente — é uma amiga.
            </p>

            {/* Valores com cards mais vivos */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-lavanda/15 hover:border-lavanda/30 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lavanda/40 to-lilas/30 flex items-center justify-center shrink-0">
                    <v.icon size={16} className="text-roxo" />
                  </div>
                  <div>
                    <p className="text-cinza-escuro font-semibold text-sm">{v.title}</p>
                    <p className="text-cinza-texto text-xs leading-relaxed mt-0.5">{v.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
