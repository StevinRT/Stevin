import { Star } from "lucide-react";

export default function Highlights() {
  return (
    <section className="py-8 bg-primary text-primary-foreground" data-testid="highlights-strip">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-sub">
          <Item>
            <Star className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
            <span><b className="font-semibold">4.2</b> Google rating</span>
          </Item>
          <Divider />
          <Item><b className="font-semibold">203</b>+ reviews</Item>
          <Divider />
          <Item>Affordable <span className="opacity-60">·</span> Fresh <span className="opacity-60">·</span> Quick Service</Item>
          <Divider />
          <Item>Popular near West Fort</Item>
        </div>
      </div>
    </section>
  );
}

const Item = ({ children }) => (
  <div className="flex items-center gap-2 whitespace-nowrap">{children}</div>
);

const Divider = () => <span className="hidden md:inline opacity-30">•</span>;
