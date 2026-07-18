"use client";

import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { SalesProvider } from "@/context/SalesContext";
import { AdminProvider } from "@/context/AdminContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Cart } from "@/components/Cart";
import { FavoritesPopup } from "@/components/FavoritesPopup";
import { AdminPanel } from "@/components/AdminPanel";

export default function Home() {
  return (
    <CartProvider>
      <FavoritesProvider>
      <SalesProvider>
      <AdminProvider>
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
      <FavoritesPopup />
      <AdminPanel />
      </AdminProvider>
      </SalesProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
