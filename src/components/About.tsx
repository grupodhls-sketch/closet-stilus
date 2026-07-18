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
    <section id="sobre" className="section-padding bg-off-white relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lavanda/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dourado/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

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
              {/* Círculo principal */}
              <div className="absolute inset-0 bg-gradient-to-br from-lavanda/30 via-lilas/20 to-dourado/10 rounded-full" />
              {/* Moldura dourada */}
              <div className="absolute inset-4 border-2 border-dourado/30 rounded-full" />
              {/* Conteúdo central */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <span className="text-6xl mb-4">💜</span>
                <p className="font-[family-name:var(--font-playfair)] text-3xl text-roxo font-semibold mb-2">
                  Closet
                </p>
                <p className="font-[family-name:var(--font-playfair)] text-4xl text-dourado font-bold italic">
                  Stilus
                </p>
              </div>
              {/* Elementos flutuantes */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-dourado/15 rounded-full flex items-center justify-center animate-float">
                <span className="text-2xl">✨</span>
              </div>
              <div className="absolute bottom-12 left-4 w-14 h-14 bg-lavanda/20 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                <span className="text-xl">🌸</span>
              </div>
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

            {/* Valores */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div key={v.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-lavanda/30 flex items-center justify-center shrink-0 mt-0.5">
                    <v.icon size={16} className="text-roxo" />
                  </div>
                  <div>
                    <p className="text-cinza-escuro font-semibold text-sm">{v.title}</p>
                    <p className="text-cinza-texto text-xs leading-relaxed mt-0.5">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
