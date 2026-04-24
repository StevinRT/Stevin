import { ShoppingBag } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export default function FloatingCart() {
  const { itemCount, grandTotal, openCart } = useCart();
  const { pathname } = useLocation();

  if (itemCount === 0) return null;

  // Avoid overlapping emergent badge on home; always show above it
  return (
    <button
      onClick={openCart}
      className="fixed z-40 left-4 bottom-4 md:bottom-6 rounded-full bg-primary text-primary-foreground shadow-2xl px-5 h-14 flex items-center gap-3 font-sub font-semibold hover:-translate-y-0.5 transition-transform anim-bounce-in"
      data-testid="floating-cart-button"
      aria-label={`Open cart with ${itemCount} items, total ${grandTotal} rupees`}
    >
      <ShoppingBag className="h-5 w-5" />
      <span className="text-sm">
        {itemCount} item{itemCount > 1 ? "s" : ""}
      </span>
      <span className="h-5 w-px bg-primary-foreground/30" />
      <span className="text-sm">₹{grandTotal}</span>
      <span className="ml-1 text-xs bg-primary-foreground/15 rounded-full px-2 py-0.5">
        View cart →
      </span>
    </button>
  );
}
