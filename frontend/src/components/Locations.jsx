import { MapPin, Clock, MessageCircle } from "lucide-react";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";

export default function Locations() {
  const { outlets } = useData();

  return (
    <section id="locations" className="py-16 sm:py-24" data-testid="locations-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="font-label text-[11px] text-primary mb-2">Find us</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Two outlets in <span className="italic">Thrissur</span>.
            <br />
            Pick whichever is closest.
          </h2>
          <p className="mt-3 text-sm sm:text-base font-sub text-muted-foreground">
            We send your order on WhatsApp to the outlet you choose at checkout.
            Dine-in · Takeaway · Delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {outlets.map((o, idx) => (
            <article
              key={o.id}
              className="rounded-3xl bg-card border border-border overflow-hidden card-shadow"
              data-testid={`outlet-card-${o.id}`}
            >
              <div className="aspect-[16/9] bg-muted relative">
                <iframe
                  title={`Map of ${o.name}`}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${o.map_query}&output=embed`}
                />
                <span className="absolute top-3 left-3 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-sub font-semibold">
                  {`Outlet 0${idx + 1}`}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold">{o.name}</h3>
                <div className="mt-3 space-y-2 text-sm font-sub text-foreground/80">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5" />
                    <span>{o.full_address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-primary mt-0.5" />
                    <span>{o.hours}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageCircle className="h-4 w-4 text-whatsapp mt-0.5" />
                    <span>WhatsApp: +{o.whatsapp.slice(0,2)} {o.whatsapp.slice(2,7)} {o.whatsapp.slice(7)}</span>
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <a
                    href={`https://wa.me/${o.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1"
                    data-testid={`outlet-whatsapp-${o.id}`}
                  >
                    <Button className="w-full rounded-full bg-whatsapp text-white hover:bg-whatsapp/90 font-sub font-semibold">
                      <MessageCircle className="h-4 w-4 mr-1" /> Chat on WhatsApp
                    </Button>
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${o.map_query}`}
                    target="_blank"
                    rel="noreferrer"
                    data-testid={`outlet-directions-${o.id}`}
                  >
                    <Button variant="outline" className="rounded-full font-sub">
                      Directions
                    </Button>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
