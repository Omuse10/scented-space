import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  variant?: string;
  price: number;
  image: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  whatsappHref: string;
};

const Ctx = createContext<CartCtx | null>(null);

// Concierge number — replace with your real WhatsApp Business number (E.164, no +).
const WHATSAPP_NUMBER = "254700000000";

const STORAGE_KEY = "tss_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);

    const lines = items
      .map((i) => `• ${i.name}${i.variant ? ` — ${i.variant}` : ""} × ${i.qty}  (KSh ${(i.price * i.qty).toLocaleString()})`)
      .join("\n");
    const message =
      items.length === 0
        ? "Hello, I'd like a recommendation from The Scented Space."
        : `Hello Scented Space concierge — I'd like to place this order:\n\n${lines}\n\nSubtotal: KSh ${subtotal.toLocaleString()}`;
    const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    return {
      items,
      count,
      subtotal,
      open,
      setOpen,
      add: (item, qty = 1) =>
        setItems((prev) => {
          const existing = prev.find((p) => p.id === item.id && p.variant === item.variant);
          if (existing) {
            return prev.map((p) => (p === existing ? { ...p, qty: p.qty + qty } : p));
          }
          return [...prev, { ...item, qty }];
        }),
      remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
      setQty: (id, qty) =>
        setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))),
      clear: () => setItems([]),
      whatsappHref,
    };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside CartProvider");
  return v;
}

export const WHATSAPP_HREF_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
