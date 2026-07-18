"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export interface SaleItem {
  productName: string;
  category: string;
  size: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  date: string;       // ISO string
  items: SaleItem[];
  total: number;
  totalItems: number;
}

interface SalesContextType {
  sales: Sale[];
  logSale: (items: { productName: string; category: string; size: string; quantity: number; price: number }[]) => void;
  clearSales: () => void;

  // Analytics helpers
  totalRevenue: number;
  totalOrders: number;
  totalUnitsSold: number;
  todayRevenue: number;
  todayOrders: number;
  monthRevenue: number;
  monthOrders: number;
  topProducts: { name: string; count: number; revenue: number }[];
  topCategories: { name: string; count: number; revenue: number }[];
  dailySales: { date: string; orders: number; revenue: number }[];
  monthlySales: { month: string; orders: number; revenue: number }[];
  recentSales: Sale[];
  avgOrderValue: number;
}

const SALES_KEY = "closet-stilus-sales";

function loadSales(): Sale[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(SALES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

function formatDate(iso: string) {
  return iso.slice(0, 10); // YYYY-MM-DD
}

function formatMonth(iso: string) {
  return iso.slice(0, 7); // YYYY-MM
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export function SalesProvider({ children }: { children: ReactNode }) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSales(loadSales());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(SALES_KEY, JSON.stringify(sales));
    }
  }, [sales, loaded]);

  const logSale = useCallback((items: { productName: string; category: string; size: string; quantity: number; price: number }[]) => {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const newSale: Sale = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      date: new Date().toISOString(),
      items: items.map((i) => ({
        productName: i.productName,
        category: i.category,
        size: i.size,
        quantity: i.quantity,
        price: i.price,
        subtotal: i.price * i.quantity,
      })),
      total,
      totalItems,
    };
    setSales((prev) => [newSale, ...prev]);
  }, []);

  const clearSales = useCallback(() => setSales([]), []);

  // ── Analytics ──
  const now = new Date();
  const todayStr = formatDate(now.toISOString());
  const thisMonthStr = formatMonth(now.toISOString());

  const totalRevenue = sales.reduce((s, sale) => s + sale.total, 0);
  const totalOrders = sales.length;
  const totalUnitsSold = sales.reduce((s, sale) => s + sale.totalItems, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const todaySales = sales.filter((s) => formatDate(s.date) === todayStr);
  const todayRevenue = todaySales.reduce((s, sale) => s + sale.total, 0);
  const todayOrders = todaySales.length;

  const monthSales = sales.filter((s) => formatMonth(s.date) === thisMonthStr);
  const monthRevenue = monthSales.reduce((s, sale) => s + sale.total, 0);
  const monthOrders = monthSales.length;

  // Top products
  const productMap = new Map<string, { count: number; revenue: number }>();
  sales.forEach((sale) =>
    sale.items.forEach((item) => {
      const prev = productMap.get(item.productName) || { count: 0, revenue: 0 };
      productMap.set(item.productName, {
        count: prev.count + item.quantity,
        revenue: prev.revenue + item.subtotal,
      });
    })
  );
  const topProducts = Array.from(productMap.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  // Top categories
  const catMap = new Map<string, { count: number; revenue: number }>();
  sales.forEach((sale) =>
    sale.items.forEach((item) => {
      const prev = catMap.get(item.category) || { count: 0, revenue: 0 };
      catMap.set(item.category, {
        count: prev.count + item.quantity,
        revenue: prev.revenue + item.subtotal,
      });
    })
  );
  const topCategories = Array.from(catMap.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  // Daily sales (last 30 days)
  const dailyMap = new Map<string, { orders: number; revenue: number }>();
  sales.forEach((sale) => {
    const day = formatDate(sale.date);
    const prev = dailyMap.get(day) || { orders: 0, revenue: 0 };
    dailyMap.set(day, { orders: prev.orders + 1, revenue: prev.revenue + sale.total });
  });
  const dailySales = Array.from(dailyMap.entries())
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 30);

  // Monthly sales
  const monthMap = new Map<string, { orders: number; revenue: number }>();
  sales.forEach((sale) => {
    const month = formatMonth(sale.date);
    const prev = monthMap.get(month) || { orders: 0, revenue: 0 };
    monthMap.set(month, { orders: prev.orders + 1, revenue: prev.revenue + sale.total });
  });
  const monthlySales = Array.from(monthMap.entries())
    .map(([month, data]) => ({ month, ...data }))
    .sort((a, b) => b.month.localeCompare(a.month));

  const recentSales = sales.slice(0, 20);

  return (
    <SalesContext.Provider
      value={{
        sales, logSale, clearSales,
        totalRevenue, totalOrders, totalUnitsSold,
        todayRevenue, todayOrders,
        monthRevenue, monthOrders,
        topProducts, topCategories,
        dailySales, monthlySales,
        recentSales, avgOrderValue,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  const context = useContext(SalesContext);
  if (!context) throw new Error("useSales must be used within SalesProvider");
  return context;
}
