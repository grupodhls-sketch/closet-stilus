"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { Product } from "./CartContext";
import { products as defaultProducts } from "@/data/products";

const ADMIN_USER = "anneloja20";
const ADMIN_PASS = "chloe2026";
const SESSION_TIMEOUT_MS = 4 * 60 * 60 * 1000; // 4 hours

const STORAGE_KEY = "closet-stilus-admin";
const CAT_STORAGE_KEY = "closet-stilus-categories";

const defaultCategories = ["Todos", "Lingerie", "Baby Dolls", "Biquínis", "Cosméticos", "Calçados"];

interface AdminContextType {
  isLoggedIn: boolean;
  login: (user: string, pass: string) => { ok: boolean; error?: string };
  logout: () => void;
  products: Product[];
  categories: string[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, data: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  addCategory: (name: string) => void;
  deleteCategory: (name: string) => void;
  resetProducts: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

function loadProducts(): Product[] {
  if (typeof window === "undefined") return defaultProducts;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultProducts;
}

function loadCategories(): string[] {
  if (typeof window === "undefined") return defaultCategories;
  try {
    const stored = localStorage.getItem(CAT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultCategories;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [loaded, setLoaded] = useState(false);
  const sessionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setProducts(loadProducts());
    setCategories(loadCategories());
    setLoaded(true);
    // Clear any old lockout data
    localStorage.removeItem("closet-stilus-attempts");
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(CAT_STORAGE_KEY, JSON.stringify(categories));
    }
  }, [categories, loaded]);

  // ── Session timeout ──
  const resetSessionTimer = useCallback(() => {
    if (sessionTimer.current) clearTimeout(sessionTimer.current);
    sessionTimer.current = setTimeout(() => {
      setIsLoggedIn(false);
    }, SESSION_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      resetSessionTimer();
      const handler = () => resetSessionTimer();
      const events = ["mousedown", "keydown", "scroll", "touchstart"];
      events.forEach((e) => document.addEventListener(e, handler, { passive: true }));
      return () => {
        events.forEach((e) => document.removeEventListener(e, handler));
        if (sessionTimer.current) clearTimeout(sessionTimer.current);
      };
    }
  }, [isLoggedIn, resetSessionTimer]);

  const login = useCallback((user: string, pass: string) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setIsLoggedIn(true);
      resetSessionTimer();
      return { ok: true as const };
    }
    return { ok: false as const, error: "Usuário ou senha incorretos" };
  }, [resetSessionTimer]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    if (sessionTimer.current) clearTimeout(sessionTimer.current);
  }, []);

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    setProducts((prev) => {
      const maxId = prev.reduce((max, p) => Math.max(max, p.id), 0);
      return [...prev, { ...product, id: maxId + 1 }];
    });
  }, []);

  const updateProduct = useCallback((id: number, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }, []);

  const deleteProduct = useCallback((id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addCategory = useCallback((name: string) => {
    setCategories((prev) => {
      if (prev.includes(name)) return prev;
      return [...prev, name];
    });
  }, []);

  const deleteCategory = useCallback((name: string) => {
    setCategories((prev) => prev.filter((c) => c !== name && c !== "Todos"));
  }, []);

  const resetProducts = useCallback(() => {
    setProducts(defaultProducts);
    setCategories(defaultCategories);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn, login, logout,
        products, categories,
        addProduct, updateProduct, deleteProduct,
        addCategory, deleteCategory, resetProducts,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
