import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { featuredRituals, type Ritual } from "@/lib/products";

function RitualCard({ r, large, index }: { r: Ritual; large?: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: "easeOut" }}
      className="group"
    >
      <Link to="/shop/$productId" params={{ productId: r.id }} className="block">
        <div
          className={`relative overflow-hidden bg-cream mb-7 editorial-frame corner-ticks image-vignette ${
            large ? "aspect-[16/10] md:aspect-[21/10]" : "aspect-[4/5]"
          }`}
        >
          <img
            src={r.image}
            alt={r.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/45 via-brown/10 to-transparent z-[2]" />
          <span className="absolute top-4 left-4 z-[3] eyebrow text-[0.625rem] bg-ivory/95 text-brown px-3 py-1.5">
            {r.moodLabel}
          </span>
          {large && (
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-ivory z-[3]">
              <h3
                className="text-4xl md:text-6xl leading-[1.05]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {r.name}
              </h3>
              <p className="mt-3 max-w-md text-ivory/85 serif-italic">{r.tagline}</p>
              <span className="mt-5 inline-block eyebrow text-ivory border-b border-ivory/50 pb-1">
                Discover the Ritual →
              </span>
            </div>
          )}
        </div>
        {!large && (
          <>
            <h3 className="text-brown text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              {r.name}
            </h3>
            <p className="text-brown/65 text-sm mt-2 leading-relaxed serif-italic">{r.tagline}</p>
            <span className="mt-3 inline-block eyebrow text-terracotta border-b border-terracotta/30 pb-1 group-hover:border-terracotta transition-colors">
              Discover →
            </span>
          </>
        )}
      </Link>
    </motion.div>
  );
}

export function FeaturedRituals() {
  const items = featuredRituals();
  const [hero, ...rest] = items;
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-24">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-12 md:mb-14">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="hairline" />
              <span className="eyebrow">Featured Rituals</span>
            </div>
            <h2 className="display-lg text-brown">
              Four complete <span className="serif-italic">rituals.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-brown/70 leading-relaxed">
            Cleanse, hydrate, seal, scent — composed in our most beloved signatures.
          </p>
        </div>

        {hero && (
          <div className="mb-12 md:mb-16">
            <RitualCard r={hero} large index={0} />
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {rest.map((r, i) => (
            <RitualCard key={r.id} r={r} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
