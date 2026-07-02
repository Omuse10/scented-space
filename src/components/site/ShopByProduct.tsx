import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import bodyWashImg from "@/assets/product-nahla.jpg";
import bodyButterImg from "@/assets/mood-warm.jpg";
import bodyLotionImg from "@/assets/mood-radiant.jpg";
import bodyOilImg from "@/assets/product-velvet.jpg";
import perfumeOilImg from "@/assets/product-discovery.jpg";

const cards = [
  {
    title: "Body Wash",
    subtitle: "Cleanse",
    description: "A grounding daily cleanse — gentle, mineral-soft, scented with restraint.",
    image: bodyWashImg,
    to: "/body-wash" as const,
    discoverTo: "/shop" as const,
  },
  {
    title: "Body Butter",
    subtitle: "Rich hydration",
    description: "Whipped shea and mafura for skin that has earned slow ceremony.",
    image: bodyButterImg,
    to: "/moisture" as const,
    discoverTo: "/shop" as const,
  },
  {
    title: "Body Lotion",
    subtitle: "Light hydration",
    description: "An everyday veil of moisture — quick, weightless, never insistent.",
    image: bodyLotionImg,
    to: "/moisture" as const,
    discoverTo: "/shop" as const,
  },
  {
    title: "Body Oil",
    subtitle: "Seal and soften",
    description: "Marula and baobab pressed into a quiet, golden finish for the skin.",
    image: bodyOilImg,
    to: "/body-oil" as const,
    discoverTo: "/shop" as const,
  },
  {
    title: "Perfume Oil",
    subtitle: "The finishing touch",
    description: "A signature drawn close to the skin — warm, intimate, unmistakably yours.",
    image: perfumeOilImg,
    to: "/perfume-oils" as const,
    discoverTo: "/shop" as const,
  },
];

export function ShopByProduct() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10 lg:px-16 py-14 md:py-24 lg:py-32">
        {/* Section header — mobile-first, generous and quiet */}
        <div className="text-center mb-10 md:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-6 md:w-8 bg-gold/60" />
            <span className="eyebrow text-[0.65rem] md:text-[0.7rem] text-gold tracking-[0.3em]">Shop By Product</span>
            <span className="h-px w-6 md:w-8 bg-gold/60" />
          </div>
          <h2
            className="text-brown text-[2.5rem] leading-[1.02] md:text-[3.25rem] lg:text-[4rem] tracking-[-0.025em] max-w-3xl mx-auto px-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Discover Your <span className="serif-italic text-brown/85">Ritual</span>
          </h2>
          <p className="mt-4 md:mt-5 text-brown/65 text-[0.95rem] md:text-base leading-relaxed max-w-md md:max-w-lg mx-auto px-4">
            Begin your scent ritual with the product that suits your needs.
          </p>
        </div>

        {/* Product cards — large, immersive, mobile-first editorial panels */}
        <ul className="mx-auto max-w-[520px] md:max-w-[680px] lg:max-w-[1280px] flex flex-col gap-0 lg:grid lg:grid-cols-2 lg:gap-6">
          {cards.map((card, i) => (
            <motion.li
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={
                // Hairline separator between cards on mobile/tablet only
                (i > 0
                  ? "relative before:content-[''] before:block before:h-px before:bg-gold/30 before:mx-4 before:mb-1 lg:before:hidden "
                  : "") +
                // Last card spans both columns on desktop (5 cards → 2/2/1 centered)
                (i === cards.length - 1 ? "lg:col-span-2 lg:max-w-[620px] lg:mx-auto lg:w-full" : "")
              }
            >
              <div className="group relative overflow-hidden rounded-2xl ring-1 ring-gold/20 shadow-[0_6px_24px_-16px_rgba(60,30,15,0.35)] transition-all duration-700 hover:ring-gold/40 hover:shadow-[0_12px_36px_-16px_rgba(60,30,15,0.5)]">
                {/* Image */}
                <div className="relative aspect-[21/9] lg:aspect-[4/3] overflow-hidden bg-cocoa">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.02] transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                  />
                  {/* Warm cocoa wash — side-weighted from the left so the product image breathes on the right */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cocoa/90 via-cocoa/55 to-cocoa/10 md:from-cocoa/85 md:via-cocoa/45 md:to-transparent pointer-events-none" />
                  {/* Soft warm vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cocoa/25 via-transparent to-transparent pointer-events-none" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 p-5 lg:p-12 pb-10 lg:pb-14 flex flex-col justify-between pointer-events-none">
                    {/* Top: index */}
                    <div className="flex items-center gap-3 text-ivory/90">
                      <span className="eyebrow text-[0.65rem] md:text-[0.7rem] tabular-nums tracking-[0.3em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-8 md:w-10 bg-gold/70" />
                    </div>

                    {/* Bottom: title, subtitle, CTA */}
                    <div className="max-w-[60%] lg:max-w-md">
                      <h3
                        className="text-ivory text-[2rem] leading-[1] lg:text-[3rem] tracking-[-0.02em]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {card.title}
                      </h3>
                      <p className="mt-1.5 serif-italic text-gold text-[0.95rem] lg:text-[1.1rem]">{card.subtitle}</p>
                      <p className="mt-3 hidden sm:block text-ivory/75 text-[0.95rem] leading-relaxed max-w-sm">
                        {card.description}
                      </p>
                      <Link
                        to={card.to}
                        aria-label={`Shop ${card.title}`}
                        className="pointer-events-auto mt-1 lg:mt-4 inline-flex h-10 lg:h-12 items-center gap-2.5 px-5 lg:px-6 rounded-full border border-ivory/80 bg-cocoa/40 backdrop-blur-[2px] text-ivory eyebrow text-[0.6rem] lg:text-[0.7rem] tracking-[0.28em] transition-all duration-500 hover:bg-ivory hover:text-cocoa hover:border-ivory focus-visible:bg-ivory focus-visible:text-cocoa active:scale-[0.98]"
                      >
                        Shop Now
                        <svg
                          width="16"
                          height="8"
                          viewBox="0 0 22 10"
                          fill="none"
                          className="transition-transform duration-500 group-hover:translate-x-1"
                        >
                          <path d="M0 5h20m0 0L16 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.25" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Floating discover button — separate destination from Shop Now */}
                  <Link
                    to={card.discoverTo}
                    aria-label={`Explore the full ${card.title} collection`}
                    title="Explore the collection"
                    className="absolute bottom-10 right-5 lg:bottom-14 lg:right-12 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-ivory/60 backdrop-blur-[2px] bg-cocoa/20 grid place-items-center text-ivory transition-all duration-500 hover:bg-ivory hover:border-ivory hover:text-cocoa hover:rotate-[-45deg]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.25" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
