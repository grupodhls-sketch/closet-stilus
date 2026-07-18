"use client";

import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Cart } from "@/components/Cart";

export default function Home() {
  return (
    <CartProvider>
      <FavoritesProvider>
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <Cart />
      </FavoritesProvider>
    </CartProvider>
  );
}
