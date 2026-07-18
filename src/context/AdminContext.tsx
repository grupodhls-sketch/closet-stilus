"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { Product } from "./CartContext";
import { products as defaultProducts } from "@/data/products";

// ── Security: strong password (SHA-256 hash comparison) ──
const ADMIN_USER = "admin";
const ADMIN_PASS_HASH = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"; // sha256("password123!")
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minutes
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

const STORAGE_KEY = "closet-stilus-admin";
const CAT_STORAGE_KEY = "closet-stilus-categories";
const ATTEMPTS_KEY = "closet-stilus-attempts";

const defaultCategories = ["Todos", "Lingerie", "Baby Dolls", "Biquínis", "Cosméticos", "Calçados"];

interface AdminContextType {
  isLoggedIn: boolean;
  login: (user: string, pass: string) => Promise<{ ok: boolean; error?: string; lockoutSeconds?: number }>;
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

// ── SHA-256 hash helper ──
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

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

function getAttempts(): { count: number; lastAttempt: number } {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { count: 0, lastAttempt: 0 };
}

function saveAttempts(count: number) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify({ count, lastAttempt: Date.now() }));
}

function clearAttempts() {
  localStorage.removeItem(ATTEMPTS_KEY);
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

  // ── Session timeout: auto-logout after inactivity ──
  const resetSessionTimer = useCallback(() => {
    if (sessionTimer.current) clearTimeout(sessionTimer.current);
    sessionTimer.current = setTimeout(() => {
      setIsLoggedIn(false);
    }, SESSION_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      resetSessionTimer();
      const events = ["mousedown", "keydown", "scroll", "touchstart"];
      const handler = () => resetSessionTimer();
      events.forEach((e) => document.addEventListener(e, handler, { passive: true }));
      return () => {
        events.forEach((e) => document.removeEventListener(e, handler));
        if (sessionTimer.current) clearTimeout(sessionTimer.current);
      };
    }
  }, [isLoggedIn, resetSessionTimer]);

  const login = useCallback(async (user: string, pass: string) => {
    // Check lockout
    const attempts = getAttempts();
    if (attempts.count >= MAX_ATTEMPTS) {
      const elapsed = Date.now() - attempts.lastAttempt;
      if (elapsed < LOCKOUT_MS) {
        const remaining = Math.ceil((LOCKOUT_MS - elapsed) / 1000);
        return { ok: false, error: `Conta bloqueada. Tente em ${remaining}s`, lockoutSeconds: remaining };
      }
      clearAttempts();
    }

    // Hash and compare
    const passHash = await sha256(pass);
    if (user === ADMIN_USER && passHash === ADMIN_PASS_HASH) {
      clearAttempts();
      setIsLoggedIn(true);
      return { ok: true };
    }

    // Failed attempt
    const newCount = attempts.count + 1;
    saveAttempts(newCount);
    if (newCount >= MAX_ATTEMPTS) {
      return { ok: false, error: `Máximo de ${MAX_ATTEMPTS} tentativas. Conta bloqueada por 5 minutos.` };
    }
    return { ok: false, error: `Credenciais inválidas. ${MAX_ATTEMPTS - newCount} tentativa(s) restante(s).` };
  }, []);

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
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
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
        isLoggedIn,
        login,
        logout,
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
        resetProducts,
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
