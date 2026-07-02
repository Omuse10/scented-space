import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Ritual } from "@/components/site/Ritual";
import { Bestsellers } from "@/components/site/Bestsellers";
import { ShopByProduct } from "@/components/site/ShopByProduct";
import { ShopByFeelingStage } from "@/components/site/ShopByFeelingStage";
import { AboutTeaser } from "@/components/site/AboutTeaser";
import { CustomerLove } from "@/components/site/CustomerLove";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Scented Space — Beautifully Scented Skin" },
      {
        name: "description",
        content:
          "Luxury perfume oils and body rituals — designed to scent the skin beautifully, from the first cleanse to the last whisper of perfume.",
      },
    ],
  }),
  component: Home,
});

/**
 * Homepage rhythm — alternating cinematic & focused moments.
 *
 *   Hero                  XL cinematic
 *   FeaturedRituals       editorial (1 hero + 3 supporting)
 *   Manifesto             quiet pause — one line, lots of air
 *   Ritual                XL scroll story — alternating steps
 *   Mood                  editorial (1 featured + 4 supporting)
 *   Bestsellers           focused product grid
 *   DiscoveryFeature      XL cinematic — dark, conversion
 *   Founder               editorial — light, breathes after dark
 *   InstagramGrid         focused — gentle outro
 */
function Home() {
  return (
    <>
      <Hero />
      <ShopByProduct />
      <ShopByFeelingStage />
      <Bestsellers variant="carousel" />
      <Ritual />
      <AboutTeaser />
      <CustomerLove />
    </>
  );
}
