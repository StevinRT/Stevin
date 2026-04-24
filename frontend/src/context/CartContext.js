import { createContext, useContext, useMemo, useState, useCallback } from "react";

const CartContext = createContext(null);

export const PARCEL_CHARGE_PER_ITEM = 5;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ id, name, price, category, qty }]
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const decrementItem = useCallback((id) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
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
    decrementItem,
    removeItem,
    clearCart,
    isOpen,
    openCart,
    closeCart,
    setIsOpen,
    ...totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
