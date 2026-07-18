"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, X, Lock, User, LogOut, Plus, Trash2, Pencil, Check, ImagePlus,
  Package, Tag, BarChart3, TrendingUp, ShoppingCart, Calendar, DollarSign,
  RotateCcw, ChevronDown, ChevronUp, Star, Upload, Percent, Shield,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useSales } from "@/context/SalesContext";
import { Product } from "@/context/CartContext";

type Tab = "vendas" | "produtos" | "adicionar" | "categorias";

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  category: "Lingerie",
  price: 0,
  originalPrice: undefined,
  badge: "",
  image: "/products/conjunto-lavanda.jpg",
  sizes: ["P"],
};

function formatBRL(v: number) {
  return `R$ ${v.toFixed(2).replace(".", ",")}`;
}

function formatDateShort(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

// ── Image compression helper ──
function compressImage(file: File, maxW = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        if (w > maxW) { h = (h * maxW) / w; w = maxW; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Falha ao carregar imagem"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Falha ao ler arquivo"));
    reader.readAsDataURL(file);
  });
}

// ── Image Positioner: drag to reposition ──
function ImagePositioner({
  src, pos, onChange,
}: {
  src: string;
  pos: { x: number; y: number };
  onChange: (p: { x: number; y: number }) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    start.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos.x, pos.y]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = ((e.clientX - start.current.x) / rect.width) * 100;
    const dy = ((e.clientY - start.current.y) / rect.height) * 100;
    const nx = Math.max(0, Math.min(100, start.current.px + dx));
    const ny = Math.max(0, Math.min(100, start.current.py + dy));
    onChange({ x: nx, y: ny });
  }, [onChange]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="w-full aspect-[3/4] max-h-48 rounded-xl bg-white border-2 border-dashed border-lavanda/20 overflow-hidden mb-3 relative cursor-grab active:cursor-grabbing select-none touch-none"
    >
      {src ? (
        <img
          src={src}
          alt="Preview"
          className="w-full h-full pointer-events-none"
          style={{ objectPosition: `${pos.x}% ${pos.y}%`, objectFit: "cover" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-cinza-texto/40">
          <div className="text-center">
            <ImagePlus size={28} className="mx-auto mb-1.5" />
            <p className="text-[10px]">Toque para enviar foto</p>
          </div>
        </div>
      )}
      {src && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-cinza-escuro/70 text-white text-[9px] px-2 py-0.5 rounded-full backdrop-blur-sm pointer-events-none">
          Arraste para ajustar posição
        </div>
      )}
    </div>
  );
}

// ── Mini bar chart ──
function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="h-2 bg-cinza-claro rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

// ── Standalone Login Screen (for /admin route) ──
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const { login, isLoggedIn } = useAdmin();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const passRef = useRef<HTMLInputElement>(null);

  if (isLoggedIn) { onLogin(); return null; }

  const handleSubmit = () => {
    setError("");
    const result = login(user, pass);
    if (result.ok) {
      setUser(""); setPass("");
      onLogin();
    } else {
      setError(result.error || "Erro ao fazer login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavanda/20 via-white to-lilas/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-[0_20px_60px_rgba(126,88,184,0.15)] border border-lavanda/10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-dourado/30 shadow-lg mb-4">
            <img src="/logo.png" alt="Closet Stilus" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-xl text-cinza-escuro font-semibold text-center">Painel Administrativo</h1>
          <p className="text-cinza-texto text-sm mt-1">Acesso restrito</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-cinza-escuro text-sm font-medium mb-1.5 block">Usuário</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cinza-texto/40" />
              <input type="text" value={user} onChange={(e) => setUser(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && passRef.current?.focus()}
                placeholder="anneloja20"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-cinza-claro border border-transparent focus:border-roxo/30 focus:bg-white text-cinza-escuro text-sm outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="text-cinza-escuro text-sm font-medium mb-1.5 block">Senha</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cinza-texto/40" />
              <input ref={passRef} type="password" value={pass} onChange={(e) => setPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="••••••••"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-cinza-claro border border-transparent focus:border-roxo/30 focus:bg-white text-cinza-escuro text-sm outline-none transition-all" />
            </div>
          </div>
          {error && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs text-center">{error}</motion.p>
          )}
          <button onClick={handleSubmit}
            className="w-full h-12 bg-gradient-to-r from-roxo to-lilas text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(126,88,184,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            <Shield size={15} />
            Entrar
          </button>
        </div>
        <div className="mt-6 pt-4 border-t border-lavanda/10 text-center">
          <p className="text-cinza-texto/40 text-[11px]">Acesso não autorizado é proibido</p>
        </div>
      </motion.div>
    </div>
  );
}

interface AdminPanelProps {
  embedded?: boolean;
}

export function AdminPanel({ embedded }: AdminPanelProps) {
  const {
    isLoggedIn, login, logout,
    products, categories,
    addProduct, updateProduct, deleteProduct,
    addCategory, deleteCategory, resetProducts,
  } = useAdmin();

  const {
    sales, totalRevenue, totalOrders, totalUnitsSold,
    todayRevenue, todayOrders,
    monthRevenue, monthOrders,
    topProducts, topCategories,
    dailySales, monthlySales,
    recentSales, avgOrderValue, clearSales,
  } = useSales();

  const [panelOpen, setPanelOpen] = useState(!embedded);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("vendas");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({ ...emptyProduct });
  const [newCat, setNewCat] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [expandedSale, setExpandedSale] = useState<string | null>(null);

  const passRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
  const newFileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // ── Embedded mode: show login screen first ──
  if (embedded && !isLoggedIn) {
    return <LoginScreen onLogin={() => setPanelOpen(true)} />;
  }

  const handleGearClick = () => {
    if (isLoggedIn) setPanelOpen(!panelOpen);
    else setLoginOpen(true);
  };

  const handleLogin = () => {
    const result = login(user, pass);
    if (result.ok) {
      setLoginOpen(false);
      setPanelOpen(true);
      setUser(""); setPass(""); setLoginError("");
    } else {
      setLoginError(result.error || "Erro ao fazer login");
    }
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditData({ ...p, imagePos: p.imagePos || { x: 50, y: 50 } });
  };

  const saveEdit = () => {
    if (editingId !== null && editData) {
      updateProduct(editingId, editData);
      setEditingId(null); setEditData({});
      showToast("Produto atualizado!");
    }
  };

  const handleDelete = (id: number) => { deleteProduct(id); setConfirmDelete(null); showToast("Produto excluído!"); };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) { showToast("Preencha nome e preço!"); return; }
    addProduct(newProduct); setNewProduct({ ...emptyProduct }); showToast("Produto adicionado!"); setTab("produtos");
  };

  const handleAddCategory = () => {
    const name = newCat.trim();
    if (!name) return;
    if (categories.includes(name)) { showToast("Categoria já existe!"); return; }
    addCategory(name); setNewCat(""); showToast("Categoria criada!");
  };

  const handleDeleteCategory = (cat: string) => {
    deleteCategory(cat);
    showToast("Categoria excluída!");
  };

  const updateSizes = (field: "edit" | "new", value: string) => {
    const sizes = value.split(",").map((s) => s.trim()).filter(Boolean);
    if (field === "edit") setEditData((d) => ({ ...d, sizes }));
    else setNewProduct((p) => ({ ...p, sizes }));
  };

  // ── Image upload handler ──
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "edit" | "new") => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast("Imagem muito grande (máx 5MB)!"); return; }
    try {
      const dataUrl = await compressImage(file);
      if (field === "edit") setEditData((d) => ({ ...d, image: dataUrl, imagePos: d.imagePos || { x: 50, y: 50 } }));
      else setNewProduct((p) => ({ ...p, image: dataUrl, imagePos: { x: 50, y: 50 } }));
      showToast("Imagem carregada!");
    } catch { showToast("Erro ao carregar imagem"); }
    e.target.value = "";
  };

  // ── Offer toggle ──
  const toggleOffer = (field: "edit" | "new", discount?: number) => {
    const pct = discount || 15;
    const src = field === "edit" ? editData : newProduct;
    const currentPrice = src.price || 0;
    if (src.originalPrice) {
      if (field === "edit") setEditData((d) => ({ ...d, originalPrice: undefined, badge: "" }));
      else setNewProduct((p) => ({ ...p, originalPrice: undefined, badge: "" }));
    } else {
      const origPrice = Math.round((currentPrice / (1 - pct / 100)) * 100) / 100;
      const badge = `-${pct}%`;
      if (field === "edit") setEditData((d) => ({ ...d, originalPrice: origPrice, badge }));
      else setNewProduct((p) => ({ ...p, originalPrice: origPrice, badge }));
    }
  };

  const maxDailyRevenue = Math.max(...dailySales.map((d) => d.revenue), 1);
  const maxMonthlyRevenue = Math.max(...monthlySales.map((d) => d.revenue), 1);
  const maxProductCount = Math.max(...topProducts.map((p) => p.count), 1);

  // ── Embedded: skip gear + login, go straight to panel ──
  if (embedded) {
    return (
      <>
        <AnimatePresence>
          {panelOpen && isLoggedIn && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[75] flex items-end sm:items-start sm:justify-end">
              <div className="absolute inset-0 bg-cinza-escuro/40 backdrop-blur-sm" onClick={() => { setPanelOpen(false); logout(); }} />
              <DashboardContent
                tab={tab} setTab={setTab}
                editingId={editingId} setEditingId={setEditingId} editData={editData} setEditData={setEditData}
                newProduct={newProduct} setNewProduct={setNewProduct}
                newCat={newCat} setNewCat={setNewCat}
                confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete}
                expandedSale={expandedSale} setExpandedSale={setExpandedSale}
                products={products} categories={categories}
                sales={sales} totalRevenue={totalRevenue} totalOrders={totalOrders} totalUnitsSold={totalUnitsSold}
                todayRevenue={todayRevenue} todayOrders={todayOrders}
                monthRevenue={monthRevenue} monthOrders={monthOrders}
                topProducts={topProducts} topCategories={topCategories}
                recentSales={recentSales} avgOrderValue={avgOrderValue}
                maxDailyRevenue={maxDailyRevenue} maxMonthlyRevenue={maxMonthlyRevenue} maxProductCount={maxProductCount}
                startEdit={startEdit} saveEdit={saveEdit} handleDelete={handleDelete}
                handleAddProduct={handleAddProduct} handleAddCategory={handleAddCategory}
                handleDeleteCategory={handleDeleteCategory} updateSizes={updateSizes}
                handleFileUpload={handleFileUpload} toggleOffer={toggleOffer}
                editFileRef={editFileRef} newFileRef={newFileRef}
                logout={() => { logout(); setPanelOpen(false); }}
                resetProducts={() => { resetProducts(); showToast("Produtos resetados!"); }}
                showToast={showToast} clearSales={() => { clearSales(); showToast("Histórico limpo!"); }}
                onClose={() => setPanelOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Toast message={toast} />
      </>
    );
  }

  return (
    <>
      {/* ═══ GEAR BUTTON ═══ */}
      <motion.button
        onClick={handleGearClick}
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-4 md:bottom-auto md:top-5 md:right-5 z-[70] w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/80 backdrop-blur-xl border border-lavanda/30 shadow-[0_4px_20px_rgba(126,88,184,0.15)] flex items-center justify-center text-cinza-texto hover:text-roxo hover:border-roxo/40 transition-colors duration-300"
        aria-label="Painel administrativo"
      >
        <Settings size={17} />
      </motion.button>

      {/* ═══ LOGIN MODAL ═══ */}
      <AnimatePresence>
        {loginOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            onClick={() => setLoginOpen(false)}
          >
            <div className="absolute inset-0 bg-cinza-escuro/60 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-[0_20px_60px_rgba(126,88,184,0.25)]"
            >
              <button onClick={() => setLoginOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cinza-claro flex items-center justify-center text-cinza-texto hover:bg-lavanda/30 transition-colors">
                <X size={14} />
              </button>
              <div className="flex flex-col items-center mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-dourado/30 shadow-lg mb-3 sm:mb-4">
                  <img src="/logo.png" alt="Closet Stilus" className="w-full h-full object-cover" />
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-cinza-escuro font-semibold text-center">Painel Administrativo</h2>
                <p className="text-cinza-texto text-xs sm:text-sm mt-1">Acesse para gerenciar o catálogo</p>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-cinza-escuro text-sm font-medium mb-1.5 block">Usuário</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cinza-texto/40" />
                    <input type="text" value={user} onChange={(e) => setUser(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && passRef.current?.focus()}
                      placeholder="anneloja20"
                      className="w-full h-11 sm:h-12 pl-10 pr-4 rounded-xl bg-cinza-claro border border-transparent focus:border-roxo/30 focus:bg-white text-cinza-escuro text-sm outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-cinza-escuro text-sm font-medium mb-1.5 block">Senha</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cinza-texto/40" />
                    <input ref={passRef} type="password" value={pass} onChange={(e) => setPass(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      placeholder="••••••••"
                      className="w-full h-11 sm:h-12 pl-10 pr-4 rounded-xl bg-cinza-claro border border-transparent focus:border-roxo/30 focus:bg-white text-cinza-escuro text-sm outline-none transition-all" />
                  </div>
                </div>
                {loginError && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs text-center">{loginError}</motion.p>
                )}
                <button onClick={handleLogin}
                  className="w-full h-11 sm:h-12 bg-gradient-to-r from-roxo to-lilas text-white rounded-xl font-semibold text-sm hover:shadow-[0_4px_20px_rgba(126,88,184,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  Entrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ ADMIN DASHBOARD (non-embedded, hidden — no trigger) ═══ */}
      <AnimatePresence>
        {panelOpen && isLoggedIn && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] flex items-end sm:items-start sm:justify-end">
            <div className="absolute inset-0 bg-cinza-escuro/40 backdrop-blur-sm" onClick={() => setPanelOpen(false)} />
            <DashboardContent
              tab={tab} setTab={setTab}
              editingId={editingId} setEditingId={setEditingId} editData={editData} setEditData={setEditData}
              newProduct={newProduct} setNewProduct={setNewProduct}
              newCat={newCat} setNewCat={setNewCat}
              confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete}
              expandedSale={expandedSale} setExpandedSale={setExpandedSale}
              products={products} categories={categories}
              sales={sales} totalRevenue={totalRevenue} totalOrders={totalOrders} totalUnitsSold={totalUnitsSold}
              todayRevenue={todayRevenue} todayOrders={todayOrders}
              monthRevenue={monthRevenue} monthOrders={monthOrders}
              topProducts={topProducts} topCategories={topCategories}
              recentSales={recentSales} avgOrderValue={avgOrderValue}
              maxDailyRevenue={maxDailyRevenue} maxMonthlyRevenue={maxMonthlyRevenue} maxProductCount={maxProductCount}
              startEdit={startEdit} saveEdit={saveEdit} handleDelete={handleDelete}
              handleAddProduct={handleAddProduct} handleAddCategory={handleAddCategory}
              handleDeleteCategory={handleDeleteCategory} updateSizes={updateSizes}
              handleFileUpload={handleFileUpload} toggleOffer={toggleOffer}
              editFileRef={editFileRef} newFileRef={newFileRef}
              logout={() => { logout(); setPanelOpen(false); }}
              resetProducts={() => { resetProducts(); showToast("Produtos resetados!"); }}
              showToast={showToast} clearSales={() => { clearSales(); showToast("Histórico limpo!"); }}
              onClose={() => setPanelOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Toast message={toast} />
    </>
  );
}

// ── Toast component ──
function Toast({ message }: { message: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div initial={{ opacity: 0, y: 20, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-20 sm:bottom-24 left-1/2 z-[90] bg-cinza-escuro text-white px-4 py-2.5 rounded-xl text-xs font-medium shadow-[0_8px_30px_rgba(0,0,0,0.2)] max-w-[90vw] text-center">
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Dashboard Content (extracted for reuse) ──
interface DashProps {
  tab: Tab; setTab: (t: Tab) => void;
  editingId: number | null; setEditingId: (id: number | null) => void; editData: Partial<Product>; setEditData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  newProduct: Omit<Product, "id">; setNewProduct: React.Dispatch<React.SetStateAction<Omit<Product, "id">>>;
  newCat: string; setNewCat: (v: string) => void;
  confirmDelete: number | null; setConfirmDelete: (id: number | null) => void;
  expandedSale: string | null; setExpandedSale: (id: string | null) => void;
  products: Product[]; categories: string[];
  sales: any[]; totalRevenue: number; totalOrders: number; totalUnitsSold: number;
  todayRevenue: number; todayOrders: number;
  monthRevenue: number; monthOrders: number;
  topProducts: any[]; topCategories: any[];
  recentSales: any[]; avgOrderValue: number;
  maxDailyRevenue: number; maxMonthlyRevenue: number; maxProductCount: number;
  startEdit: (p: Product) => void; saveEdit: () => void; handleDelete: (id: number) => void;
  handleAddProduct: () => void; handleAddCategory: () => void;
  handleDeleteCategory: (cat: string) => void; updateSizes: (field: "edit" | "new", value: string) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, field: "edit" | "new") => void;
  toggleOffer: (field: "edit" | "new") => void;
  editFileRef: React.RefObject<HTMLInputElement | null>;
  newFileRef: React.RefObject<HTMLInputElement | null>;
  logout: () => void; resetProducts: () => void;
  showToast: (msg: string) => void; clearSales: () => void;
  onClose: () => void;
}

function DashboardContent({
  tab, setTab,
  editingId, setEditingId, editData, setEditData,
  newProduct, setNewProduct,
  newCat, setNewCat,
  confirmDelete, setConfirmDelete,
  expandedSale, setExpandedSale,
  products, categories,
  sales, totalRevenue, totalOrders, totalUnitsSold,
  todayRevenue, todayOrders,
  monthRevenue, monthOrders,
  topProducts, topCategories,
  recentSales, avgOrderValue,
  maxDailyRevenue, maxMonthlyRevenue, maxProductCount,
  startEdit, saveEdit, handleDelete,
  handleAddProduct, handleAddCategory,
  handleDeleteCategory, updateSizes,
  handleFileUpload, toggleOffer,
  editFileRef, newFileRef,
  logout, resetProducts,
  showToast, clearSales,
  onClose,
}: DashProps) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-0 right-0 left-0 sm:left-auto sm:top-0 h-[92dvh] sm:h-full w-full sm:max-w-[480px] bg-white sm:shadow-[-10px_0_50px_rgba(126,88,184,0.2)] flex flex-col sm:rounded-t-3xl overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="px-4 pt-4 pb-3 border-b border-lavanda/10 bg-gradient-to-r from-white to-lavanda/5 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-dourado/20 shrink-0">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-base text-cinza-escuro font-semibold leading-tight">Admin</h2>
              <p className="text-cinza-texto text-[11px]">{products.length} produtos · {totalOrders} vendas</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => { resetProducts(); showToast("Produtos resetados!"); }}
              className="w-8 h-8 rounded-lg bg-cinza-claro flex items-center justify-center text-cinza-texto hover:bg-lavanda/20 hover:text-roxo transition-all" title="Resetar">
              <RotateCcw size={14} />
            </button>
            <button onClick={logout}
              className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-600 transition-all" title="Sair">
              <LogOut size={14} />
            </button>
            <button onClick={onClose}
              className="w-8 h-8 rounded-lg bg-cinza-claro flex items-center justify-center text-cinza-texto hover:bg-lavanda/20 transition-all">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 bg-cinza-claro/60 rounded-xl p-0.5">
          {([
            { id: "vendas" as Tab, icon: BarChart3, label: "Vendas" },
            { id: "produtos" as Tab, icon: Package, label: "Produtos" },
            { id: "adicionar" as Tab, icon: Plus, label: "Add" },
            { id: "categorias" as Tab, icon: Tag, label: "Categorias" },
          ]).map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[11px] font-medium transition-all duration-300 ${
                tab === t.id ? "bg-white text-roxo shadow-sm" : "text-cinza-texto hover:text-cinza-escuro"
              }`}>
              <t.icon size={12} />
              <span className="hidden xs:inline">{t.label}</span>
              <span className="xs:hidden">{t.label.slice(0, 3)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain p-4">

        {/* ═══ TAB: VENDAS ═══ */}
        {tab === "vendas" && (
          <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: DollarSign, label: "Hoje", value: formatBRL(todayRevenue), sub: `${todayOrders} pedido${todayOrders !== 1 ? "s" : ""}`, color: "text-emerald-600", bg: "bg-emerald-50" },
                { icon: Calendar, label: "Mês", value: formatBRL(monthRevenue), sub: `${monthOrders} pedido${monthOrders !== 1 ? "s" : ""}`, color: "text-blue-600", bg: "bg-blue-50" },
                { icon: TrendingUp, label: "Total", value: formatBRL(totalRevenue), sub: `${totalOrders} pedidos`, color: "text-roxo", bg: "bg-lavanda/15" },
                { icon: ShoppingCart, label: "Ticket Médio", value: formatBRL(avgOrderValue), sub: `${totalUnitsSold} unidades`, color: "text-dourado-escuro", bg: "bg-amber-50" },
              ].map((kpi) => (
                <div key={kpi.label} className={`${kpi.bg} rounded-2xl p-3.5 border border-white/50`}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <kpi.icon size={13} className={kpi.color} />
                    <span className="text-cinza-texto text-[11px] font-medium">{kpi.label}</span>
                  </div>
                  <p className="text-cinza-escuro font-bold text-base sm:text-lg leading-tight">{kpi.value}</p>
                  <p className="text-cinza-texto text-[10px] mt-0.5">{kpi.sub}</p>
                </div>
              ))}
            </div>

            {/* Top Produtos */}
            <div className="bg-off-white rounded-2xl p-4 border border-lavanda/10">
              <div className="flex items-center gap-2 mb-3">
                <Star size={13} className="text-dourado" />
                <h3 className="font-semibold text-cinza-escuro text-xs">Produtos Mais Vendidos</h3>
              </div>
              {topProducts.length === 0 ? (
                <p className="text-cinza-texto/50 text-xs text-center py-4">Nenhuma venda registrada ainda</p>
              ) : (
                <div className="space-y-2.5">
                  {topProducts.slice(0, 5).map((p, i) => (
                    <div key={p.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-cinza-escuro text-xs font-medium truncate max-w-[70%]">
                          {i + 1}. {p.name}
                        </span>
                        <span className="text-cinza-texto text-[10px] shrink-0 ml-2">{p.count}x · {formatBRL(p.revenue)}</span>
                      </div>
                      <MiniBar value={p.count} max={maxProductCount} color="var(--roxo)" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Categorias */}
            <div className="bg-off-white rounded-2xl p-4 border border-lavanda/10">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={13} className="text-roxo" />
                <h3 className="font-semibold text-cinza-escuro text-xs">Categorias Top</h3>
              </div>
              {topCategories.length === 0 ? (
                <p className="text-cinza-texto/50 text-xs text-center py-4">Nenhuma venda ainda</p>
              ) : (
                <div className="space-y-2.5">
                  {topCategories.map((c) => (
                    <div key={c.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-cinza-escuro text-xs font-medium">{c.name}</span>
                        <span className="text-cinza-texto text-[10px]">{c.count}x · {formatBRL(c.revenue)}</span>
                      </div>
                      <MiniBar value={c.count} max={maxProductCount} color="var(--lilas)" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Vendas Recentes */}
            <div className="bg-off-white rounded-2xl p-4 border border-lavanda/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={13} className="text-roxo" />
                  <h3 className="font-semibold text-cinza-escuro text-xs">Últimas Vendas</h3>
                </div>
                {sales.length > 0 && (
                  <button onClick={() => { if (confirm("Limpar histórico de vendas?")) clearSales(); }}
                    className="text-red-400 text-[10px] hover:text-red-600 transition-colors">
                    Limpar
                  </button>
                )}
              </div>
              {recentSales.length === 0 ? (
                <p className="text-cinza-texto/50 text-xs text-center py-4">Nenhuma venda registrada</p>
              ) : (
                <div className="space-y-2">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="bg-white rounded-xl border border-lavanda/10 overflow-hidden">
                      <button
                        onClick={() => setExpandedSale(expandedSale === sale.id ? null : sale.id)}
                        className="w-full flex items-center justify-between p-3 text-left">
                        <div className="min-w-0">
                          <p className="text-cinza-escuro text-xs font-semibold">{formatBRL(sale.total)}</p>
                          <p className="text-cinza-texto text-[10px]">{sale.totalItems} {sale.totalItems === 1 ? "item" : "itens"} · {formatDateShort(sale.date)}</p>
                        </div>
                        {expandedSale === sale.id ? <ChevronUp size={12} className="text-cinza-texto shrink-0" /> : <ChevronDown size={12} className="text-cinza-texto shrink-0" />}
                      </button>
                      <AnimatePresence>
                        {expandedSale === sale.id && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                            className="overflow-hidden border-t border-lavanda/10">
                            <div className="p-3 space-y-1.5">
                              {sale.items.map((item: any, i: number) => (
                                <div key={i} className="flex items-center justify-between text-[11px]">
                                  <span className="text-cinza-texto truncate max-w-[65%]">
                                    {item.productName} ({item.size}) x{item.quantity}
                                  </span>
                                  <span className="text-cinza-escuro font-medium shrink-0 ml-2">{formatBRL(item.subtotal)}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ TAB: PRODUTOS ═══ */}
        {tab === "produtos" && (
          <div className="space-y-2.5">
            {products.map((p) => (
              <div key={p.id} className="bg-off-white rounded-2xl border border-lavanda/10 overflow-hidden">
                {editingId === p.id ? (
                  <div className="p-3.5 space-y-2.5">
                    <div className="flex items-start gap-3">
                      <div onClick={() => editFileRef.current?.click()}
                        className="w-14 h-14 rounded-xl bg-lavanda/10 overflow-hidden shrink-0 cursor-pointer hover:ring-2 hover:ring-roxo/30 transition-all">
                        <img src={editData.image || p.image} alt="" className="w-full h-full object-cover"
                          style={{ objectPosition: `${editData.imagePos?.x ?? 50}% ${editData.imagePos?.y ?? 50}%` }} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <input value={editData.name || ""} onChange={(e) => setEditData((d) => ({ ...d, name: e.target.value }))}
                          placeholder="Nome" className="w-full h-9 px-3 rounded-lg bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40" />
                        <div className="flex gap-2">
                          <input type="number" value={editData.price || 0} onChange={(e) => setEditData((d) => ({ ...d, price: parseFloat(e.target.value) || 0 }))}
                            placeholder="R$" className="flex-1 h-9 px-3 rounded-lg bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40" />
                          <input type="number" value={editData.originalPrice || ""} onChange={(e) => setEditData((d) => ({ ...d, originalPrice: parseFloat(e.target.value) || undefined }))}
                            placeholder="De:" className="flex-1 h-9 px-3 rounded-lg bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select value={editData.category || p.category} onChange={(e) => setEditData((d) => ({ ...d, category: e.target.value }))}
                        className="flex-1 h-9 px-3 rounded-lg bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40">
                        {categories.filter((c) => c !== "Todos").map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input value={editData.badge || ""} onChange={(e) => setEditData((d) => ({ ...d, badge: e.target.value }))}
                        placeholder="Badge" className="w-24 h-9 px-3 rounded-lg bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40" />
                    </div>
                    <input value={editData.image || ""} onChange={(e) => setEditData((d) => ({ ...d, image: e.target.value }))}
                      placeholder="URL imagem" className="w-full h-9 px-3 rounded-lg bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40" />
                    <div className="flex items-center gap-2">
                      <button onClick={() => editFileRef.current?.click()}
                        className="h-9 px-3 rounded-lg bg-lavanda/15 text-roxo text-xs font-medium flex items-center gap-1.5 hover:bg-lavanda/25 transition-all">
                        <Upload size={12} /> Enviar foto
                      </button>
                      <input ref={editFileRef} type="file" accept="image/*" className="hidden"
                        onChange={(e) => handleFileUpload(e, "edit")} />
                      <button onClick={() => toggleOffer("edit")}
                        className={`h-9 px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${editData.originalPrice ? "bg-dourado/20 text-dourado-escuro" : "bg-cinza-claro text-cinza-texto hover:bg-cinza-claro/80"}`}>
                        <Percent size={12} /> {editData.originalPrice ? "Em Oferta" : "Oferta"}
                      </button>
                    </div>
                    {/* Image position slider */}
                    {editData.image && (
                      <div className="space-y-1.5">
                        <p className="text-cinza-texto text-[10px] font-medium">Posição da imagem:</p>
                        <div className="flex gap-3 items-center">
                          <div className="flex-1">
                            <label className="text-cinza-texto text-[9px]">Horizontal</label>
                            <input type="range" min="0" max="100" value={editData.imagePos?.x ?? 50}
                              onChange={(e) => setEditData((d) => ({ ...d, imagePos: { x: parseInt(e.target.value), y: d.imagePos?.y ?? 50 } }))}
                              className="w-full h-1 accent-roxo" />
                          </div>
                          <div className="flex-1">
                            <label className="text-cinza-texto text-[9px]">Vertical</label>
                            <input type="range" min="0" max="100" value={editData.imagePos?.y ?? 50}
                              onChange={(e) => setEditData((d) => ({ ...d, imagePos: { x: d.imagePos?.x ?? 50, y: parseInt(e.target.value) } }))}
                              className="w-full h-1 accent-roxo" />
                          </div>
                          <button onClick={() => setEditData((d) => ({ ...d, imagePos: { x: 50, y: 50 } }))}
                            className="text-cinza-texto text-[9px] hover:text-roxo transition-colors">
                            Resetar
                          </button>
                        </div>
                      </div>
                    )}
                    <input value={(editData.sizes || p.sizes).join(", ")} onChange={(e) => updateSizes("edit", e.target.value)}
                      placeholder="Tamanhos: P, M, G" className="w-full h-9 px-3 rounded-lg bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40" />
                    <div className="flex gap-2 pt-0.5">
                      <button onClick={saveEdit} className="flex-1 h-9 bg-roxo text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 hover:bg-roxo/90 transition-all">
                        <Check size={13} /> Salvar
                      </button>
                      <button onClick={() => { setEditingId(null); setEditData({}); }}
                        className="h-9 px-4 bg-cinza-claro text-cinza-texto rounded-lg text-xs font-medium hover:bg-cinza-claro/80 transition-all">
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-lavanda/10 overflow-hidden shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover"
                        style={{ objectPosition: `${p.imagePos?.x ?? 50}% ${p.imagePos?.y ?? 50}%` }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-semibold text-cinza-escuro text-xs truncate">{p.name}</h4>
                        {p.badge && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-dourado/15 text-dourado-escuro font-medium shrink-0">{p.badge}</span>}
                      </div>
                      <p className="text-cinza-texto text-[11px]">{p.category} · {p.sizes.join(", ")}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-roxo font-bold text-xs">{formatBRL(p.price)}</span>
                        {p.originalPrice && <span className="text-cinza-texto/40 text-[10px] line-through">{formatBRL(p.originalPrice)}</span>}
                      </div>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => startEdit(p)}
                        className="w-8 h-8 rounded-lg bg-lavanda/15 flex items-center justify-center text-roxo hover:bg-lavanda/30 transition-all">
                        <Pencil size={12} />
                      </button>
                      {confirmDelete === p.id ? (
                        <div className="flex gap-0.5">
                          <button onClick={() => handleDelete(p.id)}
                            className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200 transition-all">
                            <Check size={12} />
                          </button>
                          <button onClick={() => setConfirmDelete(null)}
                            className="w-8 h-8 rounded-lg bg-cinza-claro flex items-center justify-center text-cinza-texto transition-all">
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDelete(p.id)}
                          className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-600 transition-all">
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══ TAB: ADICIONAR ═══ */}
        {tab === "adicionar" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-lavanda/10 to-lilas/5 rounded-2xl p-4 border border-lavanda/15">
              <div className="flex items-center gap-2 mb-3">
                <ImagePlus size={14} className="text-roxo" />
                <h3 className="font-semibold text-cinza-escuro text-xs">Novo Produto</h3>
              </div>
              <ImagePositioner
                src={newProduct.image}
                pos={newProduct.imagePos || { x: 50, y: 50 }}
                onChange={(pos) => setNewProduct((p) => ({ ...p, imagePos: pos }))}
              />
              <input ref={newFileRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => handleFileUpload(e, "new")} />
              <div className="space-y-2.5">
                <input value={newProduct.name} onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Nome do produto"
                  className="w-full h-10 px-3.5 rounded-xl bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40 transition-all" />
                <div className="flex gap-2.5">
                  <input type="number" value={newProduct.price || ""} onChange={(e) => setNewProduct((p) => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
                    placeholder="Preço R$" className="flex-1 h-10 px-3.5 rounded-xl bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40 transition-all" />
                  <input type="number" value={newProduct.originalPrice || ""} onChange={(e) => setNewProduct((p) => ({ ...p, originalPrice: parseFloat(e.target.value) || undefined }))}
                    placeholder="De R$" className="flex-1 h-10 px-3.5 rounded-xl bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40 transition-all" />
                </div>
                <div className="flex gap-2.5">
                  <select value={newProduct.category} onChange={(e) => setNewProduct((p) => ({ ...p, category: e.target.value }))}
                    className="flex-1 h-10 px-3.5 rounded-xl bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40 transition-all">
                    {categories.filter((c) => c !== "Todos").map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input value={newProduct.badge || ""} onChange={(e) => setNewProduct((p) => ({ ...p, badge: e.target.value }))}
                    placeholder="Badge" className="w-28 h-10 px-3.5 rounded-xl bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40 transition-all" />
                </div>
                <input value={newProduct.image} onChange={(e) => setNewProduct((p) => ({ ...p, image: e.target.value }))}
                  placeholder="URL da imagem"
                  className="w-full h-10 px-3.5 rounded-xl bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40 transition-all" />
                <div className="flex gap-2.5">
                  <button onClick={() => newFileRef.current?.click()}
                    className="flex-1 h-10 rounded-xl bg-lavanda/15 text-roxo text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-lavanda/25 transition-all border border-lavanda/20">
                    <Upload size={13} /> Enviar foto
                  </button>
                  <button onClick={() => toggleOffer("new")}
                    className={`flex-1 h-10 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all border ${newProduct.originalPrice ? "bg-dourado/20 text-dourado-escuro border-dourado/30" : "bg-cinza-claro text-cinza-texto border-transparent hover:bg-cinza-claro/80"}`}>
                    <Percent size={13} /> {newProduct.originalPrice ? "Em Oferta" : "Oferta"}
                  </button>
                </div>
                <input value={newProduct.sizes.join(", ")} onChange={(e) => updateSizes("new", e.target.value)}
                  placeholder="Tamanhos: P, M, G, GG"
                  className="w-full h-10 px-3.5 rounded-xl bg-white border border-lavanda/20 text-cinza-escuro text-sm outline-none focus:border-roxo/40 transition-all" />
                <button onClick={handleAddProduct}
                  className="w-full h-11 bg-gradient-to-r from-roxo to-lilas text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(126,88,184,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  <Plus size={15} /> Adicionar ao Catálogo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ TAB: CATEGORIAS ═══ */}
        {tab === "categorias" && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input value={newCat} onChange={(e) => setNewCat(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                placeholder="Nova categoria..."
                className="flex-1 h-10 px-3.5 rounded-xl bg-cinza-claro border border-transparent focus:border-roxo/30 focus:bg-white text-cinza-escuro text-sm outline-none transition-all" />
              <button onClick={handleAddCategory}
                className="h-10 px-4 bg-roxo text-white rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-roxo/90 transition-all">
                <Plus size={13} /> Criar
              </button>
            </div>
            <div className="space-y-2">
              {categories.filter((c) => c !== "Todos").map((cat) => {
                const count = products.filter((p) => p.category === cat).length;
                return (
                  <div key={cat} className="flex items-center justify-between bg-off-white rounded-xl px-3.5 py-2.5 border border-lavanda/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-lavanda/20 flex items-center justify-center">
                        <Tag size={11} className="text-roxo" />
                      </div>
                      <div>
                        <p className="text-cinza-escuro font-medium text-xs">{cat}</p>
                        <p className="text-cinza-texto text-[10px]">{count} {count === 1 ? "produto" : "produtos"}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteCategory(cat)}
                      className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-600 transition-all">
                      <Trash2 size={11} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Footer Stats ── */}
      <div className="px-4 py-3 border-t border-lavanda/10 bg-off-white/50 shrink-0">
        <div className="flex items-center justify-around">
          {[
            { icon: Package, label: "Produtos", value: products.length },
            { icon: BarChart3, label: "Vendas", value: totalOrders },
            { icon: DollarSign, label: "Receita", value: formatBRL(totalRevenue) },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <s.icon size={12} className="text-roxo/60" />
              <div>
                <p className="text-cinza-escuro font-bold text-xs leading-tight">{s.value}</p>
                <p className="text-cinza-texto text-[9px]">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
