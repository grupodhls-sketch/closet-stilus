"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { Product } from "./CartContext";
import { products as defaultProducts } from "@/data/products";

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  totalFavorites: number;
  isOpen: boolean;
  openFavorites: () => void;
  closeFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("closet-stilus-favorites");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setFavorites(parsed);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("closet-stilus-favorites", JSON.stringify(favorites));
    }
  }, [favorites, loaded]);

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isFavorite = useCallback(
    (productId: number) => favorites.includes(productId),
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        totalFavorites: favorites.length,
        isOpen,
        openFavorites: () => setIsOpen(true),
        closeFavorites: () => setIsOpen(false),
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
}
