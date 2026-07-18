"use client";

import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { SalesProvider } from "@/context/SalesContext";
import { AdminProvider } from "@/context/AdminContext";
import { AdminPanel } from "@/components/AdminPanel";

export default function AdminPage() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <SalesProvider>
          <AdminProvider>
            <AdminPanel embedded />
          </AdminProvider>
        </SalesProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
