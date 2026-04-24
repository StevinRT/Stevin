import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const CartContext = createContext(null);

export const PARCEL_CHARGE_PER_ITEM = 5;
const STORAGE_KEY = "pjours_cart_v2";

/**
 * Cart line shape:
 *   { lineId, itemId, name, price, category, sizeLabel?, qty }
 * lineId is derived from itemId + sizeLabel so same item with different sizes become separate lines.
 */
const makeLineId = (itemId, sizeLabel) =>
  sizeLabel ? `${itemId}::${sizeLabel}` : `${itemId}::_base`;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  // addItem: accepts ({ itemId, name, price, category, sizeLabel? })
  const addItem = useCallback((payload) => {
    const lineId = makeLineId(payload.itemId, payload.sizeLabel);
    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === lineId);
      if (existing) {
        return prev.map((i) =>
          i.lineId === lineId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...payload, lineId, qty: 1 }];
    });
  }, []);

  const incrementLine = useCallback((lineId) => {
    setItems((prev) => prev.map((i) => (i.lineId === lineId ? { ...i, qty: i.qty + 1 } : i)));
  }, []);

  const decrementLine = useCallback((lineId) => {
    setItems((prev) =>
      prev
        .map((i) => (i.lineId === lineId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeLine = useCallback((lineId) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totals = useMemo(() => {
    const itemCount = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const parcel = itemCount * PARCEL_CHARGE_PER_ITEM;
    const grandTotal = subtotal + parcel;
    return { itemCount, subtotal, parcel, grandTotal };
  }, [items]);

  const value = {
    items,
    addItem,
    incrementLine,
    decrementLine,
    removeLine,
    clearCart,
    isOpen,
    openCart,
    closeCart,
    setIsOpen,
    makeLineId,
    ...totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
