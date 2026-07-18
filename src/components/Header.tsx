"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Heart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#colecao", label: "Coleção" },
  { href: "#sobre", label: "Sobre" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { totalFavorites } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_30px_rgba(126,88,184,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-premium">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden ring-2 ring-dourado/30 group-hover:ring-dourado/60 transition-all duration-300">
              <img src="/logo.png" alt="Closet Stilus" className="w-full h-full object-cover" />
            </div>
            <span className="font-[family-name:var(--font-playfair)] text-lg md:text-xl font-semibold text-cinza-escuro hidden sm:block">
              Closet Stilus
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-cinza-texto text-sm font-medium hover:text-roxo transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-dourado to-lilas rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => document.getElementById("colecao")?.scrollIntoView({ behavior: "smooth" })}
              className="w-10 h-10 rounded-xl text-cinza-texto hover:text-roxo hover:bg-lavanda/15 flex items-center justify-center transition-all duration-300"
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("colecao");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-10 h-10 rounded-xl text-cinza-texto hover:text-roxo hover:bg-lavanda/15 flex items-center justify-center transition-all duration-300 relative"
              aria-label="Favoritos"
            >
              <Heart size={18} className={totalFavorites > 0 ? "fill-red-400 text-red-400" : ""} />
              {totalFavorites > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md"
                >
                  {totalFavorites}
                </motion.span>
              )}
            </button>
            <button
              onClick={openCart}
              className="w-10 h-10 rounded-xl text-cinza-texto hover:text-roxo hover:bg-lavanda/15 flex items-center justify-center transition-all duration-300 relative"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-dourado text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={() => {
                const el = document.getElementById("colecao");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-9 h-9 rounded-xl text-cinza-texto hover:text-roxo flex items-center justify-center relative"
              aria-label="Favoritos"
            >
              <Heart size={17} className={totalFavorites > 0 ? "fill-red-400 text-red-400" : ""} />
              {totalFavorites > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalFavorites}
                </span>
              )}
            </button>
            <button
              onClick={openCart}
              className="w-9 h-9 rounded-xl text-cinza-texto hover:text-roxo flex items-center justify-center relative"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={17} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-dourado text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="w-9 h-9 rounded-xl text-cinza-escuro flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-lavanda/20 overflow-hidden"
          >
            <nav className="container-premium py-4 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-cinza-escuro text-base font-medium py-3 px-4 rounded-xl hover:bg-lavanda/10 hover:text-roxo transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
