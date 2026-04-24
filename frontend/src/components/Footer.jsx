import { Link } from "react-router-dom";
import { OUTLETS } from "@/data/menu";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-10" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">pj</div>
              <div className="font-display text-2xl font-semibold">PJ Ours</div>
            </div>
            <p className="mt-4 font-sub text-sm text-secondary-foreground/70 max-w-sm">
              Thrissur's favourite spot for juices, shakes, faloodas and mojitos.
              Refreshing everyday, priced for everyone.
            </p>
          </div>

          <div>
            <div className="font-label text-[11px] text-primary mb-4">Explore</div>
            <ul className="space-y-2 font-sub text-sm">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/menu" className="hover:text-primary">Menu</Link></li>
              <li><a href="/#reviews" className="hover:text-primary">Reviews</a></li>
              <li><a href="/#locations" className="hover:text-primary">Locations</a></li>
            </ul>
          </div>

          <div>
            <div className="font-label text-[11px] text-primary mb-4">Our Outlets</div>
            <ul className="space-y-3 font-sub text-sm">
              {OUTLETS.map((o) => (
                <li key={o.id}>
                  <div className="font-semibold">{o.name}</div>
                  <div className="text-secondary-foreground/70">{o.fullAddress}</div>
                  <a href={`https://wa.me/${o.whatsapp}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                    +{o.whatsapp.slice(0,2)} {o.whatsapp.slice(2,7)} {o.whatsapp.slice(7)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sub text-secondary-foreground/60">
          <div>© {new Date().getFullYear()} PJ Ours. All rights reserved.</div>
          <div>Made with freshness in Thrissur.</div>
        </div>
      </div>
    </footer>
  );
}
