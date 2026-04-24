import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import PopularItems from "@/components/PopularItems";
import Reviews from "@/components/Reviews";
import Locations from "@/components/Locations";

export default function Landing() {
  return (
    <div data-testid="landing-page">
      <Hero />
      <Highlights />
      <PopularItems />
      <Reviews />
      <Locations />
    </div>
  );
}
