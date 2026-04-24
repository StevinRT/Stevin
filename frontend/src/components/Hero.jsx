import { Link } from "react-router-dom";
import { Star, ArrowRight, Zap, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden" data-testid="hero-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-10 sm:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 mb-6 anim-fade-up" data-testid="hero-badge">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="font-sub text-xs font-medium">4.2 · 203 reviews on Google</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] anim-fade-up" style={{ animationDelay: "60ms" }}>
              Refreshing shakes & juices
              <br />
              at the <em className="not-italic text-primary">best prices</em>
              <br />
              in <span className="italic">Thrissur.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg font-sub text-muted-foreground max-w-xl anim-fade-up" style={{ animationDelay: "120ms" }}>
              180+ juices, shakes, faloodas and mojitos — all priced between ₹30 and ₹100.
              Order in seconds and we send it straight to your nearest outlet on WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 anim-fade-up" style={{ animationDelay: "180ms" }}>
              <Link to="/menu" data-testid="hero-order-now">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-sub font-semibold hover:-translate-y-0.5 transition-transform"
                >
                  Order Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/menu" data-testid="hero-view-menu">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-6 border-secondary/20 hover:bg-secondary hover:text-secondary-foreground font-sub font-semibold"
                >
                  View Menu
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg anim-fade-up" style={{ animationDelay: "240ms" }}>
              <Pill icon={<Zap className="h-4 w-4" />} title="Quick Service" sub="Under 6 mins" />
              <Pill icon={<Leaf className="h-4 w-4" />} title="Fresh Daily" sub="No concentrates" />
              <Pill icon={<Star className="h-4 w-4" />} title="Budget Friendly" sub="from ₹30" />
            </div>
          </div>

          {/* Right: image bento */}
          <div className="lg:col-span-5 relative">
            <div className="relative grid grid-cols-6 grid-rows-6 gap-3 h-[420px] sm:h-[520px] anim-fade-up" style={{ animationDelay: "80ms" }}>
              <div className="col-span-4 row-span-4 rounded-3xl overflow-hidden card-shadow bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1748718825814-fa2d2a3f641e"
                  alt="Mango shake splash"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden card-shadow bg-muted">
                <img
                  src="https://images.pexels.com/photos/15141036/pexels-photo-15141036.jpeg"
                  alt="Orange juice splash"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden card-shadow bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1630823185508-53c3c6566660"
                  alt="Falooda glass"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="col-span-4 row-span-2 rounded-3xl overflow-hidden card-shadow bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1712056407284-c1eda76e7bcd"
                  alt="Shake in glass"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground rounded-2xl px-4 py-3 card-shadow rotate-[-3deg] hidden sm:block" data-testid="hero-sticker">
              <div className="font-label text-[9px] opacity-70">most loved</div>
              <div className="font-display text-base font-semibold">Avocado Shake 🥑</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div aria-hidden className="absolute -top-20 -left-32 w-96 h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
    </section>
  );
}

function Pill({ icon, title, sub }) {
  return (
    <div className="rounded-2xl bg-card border border-border px-3 py-2.5 flex items-start gap-2">
      <div className="text-primary mt-0.5">{icon}</div>
      <div className="leading-tight">
        <div className="font-sub text-xs font-semibold">{title}</div>
        <div className="text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
