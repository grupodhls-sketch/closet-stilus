"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail, ArrowUp } from "lucide-react";
import { InstagramIcon } from "./SocialIcons";

const socialLinks = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-cinza-escuro text-white/80 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-roxo/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container-premium relative z-10">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-lavanda flex items-center justify-center">
                <span className="font-[family-name:var(--font-playfair)] text-roxo font-bold text-lg">CS</span>
              </div>
              <span className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                Closet Stilus
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Moda feminina que valoriza você. Elegância, sofisticação e
              autoestima em cada peça.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-lilas/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={s.label}
                >
                  <s.icon size={18} className="text-white/70" />
                </a>
              ))}
            </div>
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
                    className="text-white/50 hover:text-dourado transition-colors text-sm"
                  >
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
                    className="text-white/50 hover:text-dourado transition-colors text-sm"
                  >
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
                <Phone size={16} className="text-dourado mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">(71) 99162-6828</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-dourado mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">contato@closetstilus.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <InstagramIcon size={16} className="text-dourado mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">@closetstilus</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-dourado mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">Salvador — BA</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-dourado mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">Seg-Sex: 9h às 18h | Sáb: 9h às 14h</span>
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
        className="fixed bottom-6 right-6 w-12 h-12 bg-roxo text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(126,88,184,0.3)] hover:scale-110 transition-transform z-40"
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} />
      </motion.a>
    </footer>
  );
}
