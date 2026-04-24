import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import { useCart } from "@/context/CartContext";
import { FALLBACK_POPULAR_IMAGES, resolveImageUrl } from "@/data/menu";
import { toast } from "sonner";

export default function PopularItems() {
  const { popular, loading } = useData();
  const { addItem } = useCart();

  const items = popular.slice(0, 5);

  const handleAdd = (it) => {
    // For popular card quick-add, use the base price (smallest size if present)
    const size = it.sizes && it.sizes.length > 0 ? it.sizes[0] : null;
    addItem({
      itemId: it.id,
      name: it.name,
      price: size ? size.price : it.base_price,
      category: it.category,
      sizeLabel: size ? size.label : null,
    });
    toast.success(`${it.name} added`, {
      description: size ? `${size.label} · ₹${size.price}` : `₹${it.base_price}`,
    });
  };

  return (
    <section className="py-16 sm:py-24" data-testid="popular-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="font-label text-[11px] text-primary mb-2">Crowd favourites</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              What everyone's ordering
            </h2>
          </div>
          <Link to="/menu" className="hidden sm:block">
            <Button variant="ghost" className="rounded-full font-sub" data-testid="see-full-menu">
              See full menu →
            </Button>
          </Link>
        </div>

        {loading && items.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-3xl border border-border bg-muted/50 aspect-[4/5] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {items.map((it, idx) => {
              const imgUrl = resolveImageUrl(it.image_url) || FALLBACK_POPULAR_IMAGES[idx % FALLBACK_POPULAR_IMAGES.length];
              const smallest = it.sizes && it.sizes.length > 0 ? it.sizes[0].price : it.base_price;
              return (
                <article
                  key={it.id}
                  className="group relative rounded-3xl bg-card border border-border overflow-hidden card-shadow hover:-translate-y-1 transition-transform anim-fade-up"
                  style={{ animationDelay: `${idx * 60}ms` }}
                  data-testid={`popular-card-${idx}`}
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={imgUrl}
                      alt={it.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-sub text-[10px] text-muted-foreground uppercase tracking-wider">{it.category}</div>
                      <div className="font-display text-base font-semibold truncate">{it.name}</div>
                      <div className="text-sm font-semibold mt-0.5">
                        {it.sizes && it.sizes.length > 0 ? `from ₹${smallest}` : `₹${it.base_price}`}
                      </div>
                    </div>
                    <Button
                      size="icon"
                      className="rounded-full h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                      onClick={() => handleAdd(it)}
                      data-testid={`popular-add-${idx}`}
                      aria-label={`Add ${it.name} to cart`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
