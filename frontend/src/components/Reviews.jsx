import { Star } from "lucide-react";
import { REVIEWS, REVIEW_KEYWORDS } from "@/data/menu";

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-muted/60" data-testid="reviews-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left summary */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <div className="font-label text-[11px] text-primary mb-2">Social proof</div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              Loved by 200+ <span className="italic">regulars</span>.
            </h2>

            <div className="mt-6 flex items-end gap-2">
              <span className="font-display text-6xl font-semibold leading-none">4.2</span>
              <div className="pb-1">
                <div className="flex text-primary">
                  {[1,2,3,4,5].map((n) => (
                    <Star key={n} className={`h-4 w-4 ${n <= 4 ? "fill-primary" : ""}`} />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Google · 203 reviews</div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {[
                { label: "5★", pct: 62 },
                { label: "4★", pct: 22 },
                { label: "3★", pct: 9  },
                { label: "2★", pct: 4  },
                { label: "1★", pct: 3  },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 text-xs">
                  <span className="font-sub w-8 text-muted-foreground">{row.label}</span>
                  <div className="h-2 flex-1 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="font-sub w-8 text-right text-muted-foreground">{row.pct}%</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {REVIEW_KEYWORDS.map((k) => (
                <span
                  key={k}
                  className="rounded-full bg-card border border-border px-3 py-1 text-xs font-sub text-foreground/80"
                >
                  {k}
                </span>
              ))}
            </div>
          </aside>

          {/* Right review cards */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {REVIEWS.map((r, idx) => (
              <article
                key={idx}
                className="rounded-3xl bg-card border border-border p-6 card-shadow anim-fade-up"
                style={{ animationDelay: `${idx * 80}ms` }}
                data-testid={`review-card-${idx}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-display font-semibold">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-sub font-semibold text-sm">{r.name}</div>
                    <div className="text-[11px] text-muted-foreground">{r.tag}</div>
                  </div>
                  <div className="ml-auto flex">
                    {[1,2,3,4,5].map((n) => (
                      <Star key={n} className={`h-3.5 w-3.5 ${n <= r.rating ? "fill-primary text-primary" : "text-border"}`} />
                    ))}
                  </div>
                </div>
                <p className="mt-4 font-sub text-sm leading-relaxed text-foreground/80">
                  "{r.text}"
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
