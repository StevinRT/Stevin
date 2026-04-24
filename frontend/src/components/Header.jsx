import { Link, NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { itemCount, openCart } = useCart();

  const navLinkClass = ({ isActive }) =>
    `font-sub text-sm transition-colors ${isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"}`;

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border"
      data-testid="site-header"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" data-testid="logo-link">
          <div className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-sm group-hover:rotate-6 transition-transform">
            pj
          </div>
          <div className="leading-none">
            <div className="font-display text-xl font-semibold tracking-tight">PJ Ours</div>
            <div className="font-label text-[10px] text-muted-foreground mt-0.5">Thrissur · est. vibes</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass} data-testid="nav-home">Home</NavLink>
          <NavLink to="/menu" className={navLinkClass} data-testid="nav-menu">Menu</NavLink>
          <a href="/#reviews" className="font-sub text-sm text-foreground/70 hover:text-foreground" data-testid="nav-reviews">Reviews</a>
          <a href="/#locations" className="font-sub text-sm text-foreground/70 hover:text-foreground" data-testid="nav-locations">Locations</a>
        </nav>

        <Button
          onClick={openCart}
          variant="ghost"
          className="relative rounded-full h-11 w-11 p-0 hover:bg-muted"
          data-testid="header-cart-button"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center anim-bounce-in"
              data-testid="header-cart-count"
            >
              {itemCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
