"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag, Heart, Eye } from "lucide-react";

const categories = ["Todos", "Lingerie", "Baby Dolls", "Biquínis", "Cosméticos", "Calçados"];

const products = [
  {
    id: 1,
    name: "Conjunto Lavanda Delicado",
    category: "Lingerie",
    price: "R$ 89,90",
    originalPrice: "R$ 129,90",
    badge: "Mais Vendido",
    emoji: "💜",
    color: "from-lavanda/30 to-lilas/20",
  },
  {
    id: 2,
    name: "Baby Doll Romântico",
    category: "Baby Dolls",
    price: "R$ 119,90",
    originalPrice: null,
    badge: "Novidade",
    emoji: "👗",
    color: "from-lilas/20 to-roxo/10",
  },
  {
    id: 3,
    name: "Biquíni Dourado Premium",
    category: "Biquínis",
    price: "R$ 149,90",
    originalPrice: "R$ 199,90",
    badge: "-25%",
    emoji: "✨",
    color: "from-dourado/15 to-lavanda/15",
  },
  {
    id: 4,
    name: "Kit Cosméticos Stilus",
    category: "Cosméticos",
    price: "R$ 69,90",
    originalPrice: null,
    badge: null,
    emoji: "💄",
    color: "from-lavanda/20 to-dourado/10",
  },
  {
    id: 5,
    name: "Sandália Feminina Gold",
    category: "Calçados",
    price: "R$ 179,90",
    originalPrice: "R$ 229,90",
    badge: "Exclusivo",
    emoji: "👠",
    color: "from-dourado/20 to-lilas/15",
  },
  {
    id: 6,
    name: "Conjunto Renda Roxa",
    category: "Lingerie",
    price: "R$ 99,90",
    originalPrice: null,
    badge: null,
    emoji: "🦋",
    color: "from-roxo/15 to-lavanda/20",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Products() {
  const reduce = useReducedMotion();

  return (
    <section id="colecao" className="section-padding bg-white">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-gold mb-4 inline-flex">✿ Coleção</span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-cinza-escuro mb-4">
            Peças que Contam{" "}
            <span className="text-roxo italic">Histórias</span>
          </h2>
          <p className="text-cinza-texto text-lg max-w-2xl mx-auto">
            Cada peça é selecionada com amor para você se sentir única e especial.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                i === 0
                  ? "bg-roxo text-white shadow-[0_4px_15px_rgba(126,88,184,0.3)]"
                  : "bg-cinza-claro text-cinza-texto hover:bg-lavanda/30 hover:text-roxo"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={reduce ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={reduce ? undefined : itemVariants}
              className="card-produto group"
            >
              {/* Image placeholder */}
              <div className={`relative aspect-[3/4] bg-gradient-to-br ${product.color} overflow-hidden`}>
                {/* Emoji central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-500">{product.emoji}</span>
                </div>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-dourado text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {product.badge}
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cinza-escuro/0 group-hover:bg-cinza-escuro/10 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-3">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="Ver detalhes">
                      <Eye size={16} className="text-roxo" />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="Favoritar">
                      <Heart size={16} className="text-roxo" />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="Adicionar à sacola">
                      <ShoppingBag size={16} className="text-roxo" />
                    </button>
                  </div>
                </div>

                {/* Moldura dourada sutil no hover */}
                <div className="absolute inset-3 border-2 border-dourado/0 group-hover:border-dourado/20 rounded-2xl transition-all duration-500 pointer-events-none" />
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-cinza-texto text-xs font-medium uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-cinza-escuro font-semibold mb-3">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-roxo font-bold text-lg">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-cinza-texto/50 text-sm line-through">{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a
            href="https://wa.me/5571991626828?text=Ol%C3%A1!%20Gostaria%20de%20ver%20mais%20produtos"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lavanda"
          >
            Ver Toda Coleção
            <ShoppingBag size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
