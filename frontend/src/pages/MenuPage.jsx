import { useMemo, useState, useRef, useEffect } from "react";
import { Search, Plus, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MENU, CATEGORIES, CATEGORY_META } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function MenuPage() {
  const { addItem, openCart, items: cartItems } = useCart();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState(CATEGORIES[0]);
  const sectionRefs = useRef({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MENU;
    return MENU.filter(
      (m) => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const byCat = {};
    CATEGORIES.forEach((c) => (byCat[c] = []));
    filtered.forEach((it) => {
      if (!byCat[it.category]) byCat[it.category] = [];
      byCat[it.category].push(it);
    });
    return byCat;
  }, [filtered]);

  const scrollToCat = (cat) => {
    setActiveCat(cat);
    const el = sectionRefs.current[cat];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const itemsInCart = useMemo(() => new Map(cartItems.map((i) => [i.id, i.qty])), [cartItems]);

  const handleAdd = (it) => {
    addItem({ id: it.id, name: it.name, price: it.price, category: it.category });
    toast.success(`${it.name}`, { description: `Added · ₹${it.price}` });
  };

  return (
    <div className="bg-background" data-testid="menu-page">
      {/* Banner */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="font-label text-[11px] text-primary mb-2">The full menu</div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                {MENU.length}+ drinks,
                <br />
                every mood covered.
              </h1>
              <p className="mt-3 text-sm sm:text-base font-sub text-muted-foreground max-w-xl">
                From ₹30 cucumber lemon to ₹160 Kulfi Faloodas. Tap to add, then checkout via WhatsApp.
              </p>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[320px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Oreo, Mango, Mojito…"
                  className="pl-10 h-12 rounded-full bg-card border-border"
                  data-testid="menu-search"
                />
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      </section>

      {/* Sticky category tabs */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border" data-testid="menu-category-tabs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
            {CATEGORIES.map((cat) => {
              const count = grouped[cat]?.length || 0;
              if (count === 0 && query) return null;
              return (
                <button
                  key={cat}
                  onClick={() => scrollToCat(cat)}
                  className={`shrink-0 rounded-full px-4 h-10 font-sub text-sm transition-all border ${
                    activeCat === cat
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "bg-card text-foreground/70 hover:text-foreground border-border"
                  }`}
                  data-testid={`cat-tab-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <span className="mr-1.5">{CATEGORY_META[cat]?.icon}</span>
                  {cat}
                  <span className="ml-1.5 text-[11px] opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {CATEGORIES.map((cat) => {
          const list = grouped[cat] || [];
          if (list.length === 0) return null;
          return (
            <section
              key={cat}
              ref={(el) => (sectionRefs.current[cat] = el)}
              data-testid={`menu-section-${cat.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="text-3xl">{CATEGORY_META[cat]?.icon}</div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold">{cat}</h2>
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-sub text-muted-foreground">{list.length} items</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map((it) => {
                  const inCart = itemsInCart.get(it.id);
                  return (
                    <article
                      key={it.id}
                      className="rounded-2xl bg-card border border-border p-4 flex items-center justify-between gap-3 hover:border-primary/30 transition-colors"
                      data-testid={`menu-item-${it.id}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-sub text-[10px] uppercase tracking-wider text-muted-foreground">
                          {it.category}
                        </div>
                        <div className="font-display text-base font-medium truncate">{it.name}</div>
                        <div className="text-sm font-semibold mt-0.5">₹{it.price}</div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAdd(it)}
                        className={`rounded-full h-9 px-3 font-sub font-semibold shrink-0 ${
                          inCart
                            ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                        data-testid={`menu-add-${it.id}`}
                      >
                        {inCart ? (
                          <>
                            <Check className="h-3.5 w-3.5 mr-1" /> {inCart}
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5 mr-1" /> Add
                          </>
                        )}
                      </Button>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-20" data-testid="menu-empty">
            <div className="font-display text-2xl">Nothing matched "{query}"</div>
            <p className="text-sm text-muted-foreground mt-2">Try "oreo", "mint", or "falooda".</p>
          </div>
        )}
      </div>
    </div>
  );
}
