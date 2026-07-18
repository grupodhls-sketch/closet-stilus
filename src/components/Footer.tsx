"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail, ArrowUp } from "lucide-react";
import { InstagramIcon } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="bg-cinza-escuro text-white relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-roxo/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container-premium relative z-10">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-dourado/30">
                <img
                  src="/logo.png"
                  alt="Closet Stilus"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                Closet Stilus
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Moda feminina que valoriza você. Elegância, sofisticação e
              autoestima em cada peça.
            </p>
            <a
              href="https://www.instagram.com/closet_stillus_/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-lilas/20 text-white/60 hover:text-white transition-all duration-300 text-sm"
            >
              <InstagramIcon size={16} />
              @closetstilus
            </a>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-white font-semibold text-lg mb-5">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "#inicio" },
                { label: "Coleção", href: "#colecao" },
                { label: "Sobre", href: "#sobre" },
                { label: "Depoimentos", href: "#depoimentos" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-dourado transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-dourado group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-white font-semibold text-lg mb-5">
              Categorias
            </h4>
            <ul className="space-y-3">
              {["Lingerie", "Baby Dolls", "Biquínis", "Cosméticos", "Calçados"].map((cat) => (
                <li key={cat}>
                  <a
                    href="#colecao"
                    className="text-white/60 hover:text-dourado transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-dourado group-hover:w-3 transition-all duration-300" />
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div id="contato">
            <h4 className="font-[family-name:var(--font-playfair)] text-white font-semibold text-lg mb-5">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-lilas/20 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-dourado" />
                </div>
                <span className="text-white/60 text-sm mt-1">(71) 99162-6828</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-lilas/20 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-dourado" />
                </div>
                <span className="text-white/60 text-sm mt-1">contato@closetstilus.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-lilas/20 flex items-center justify-center shrink-0">
                  <InstagramIcon size={14} className="text-dourado" />
                </div>
                <a
                  href="https://www.instagram.com/closet_stillus_/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 text-sm mt-1 hover:text-dourado transition-colors"
                >
                  @closetstilus
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-lilas/20 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-dourado" />
                </div>
                <span className="text-white/60 text-sm mt-1">Salvador — BA</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-lilas/20 flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-dourado" />
                </div>
                <span className="text-white/60 text-sm mt-1">Seg-Sex: 9h às 18h | Sáb: 9h às 14h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            © 2026 Closet Stilus. Todos os direitos reservados.
          </p>
          <a
            href="https://portfolio-dg-pro.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-dourado text-xs transition-colors"
          >
            (DG) Produtos digitais que vendem
          </a>
        </div>
      </div>

      {/* Back to top */}
      <motion.a
        href="#inicio"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-roxo to-lilas text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(126,88,184,0.3)] hover:scale-110 transition-transform z-40"
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} />
      </motion.a>
    </footer>
  );
}
