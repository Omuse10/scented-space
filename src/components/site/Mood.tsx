import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { moods } from "@/lib/products";

export function Mood() {
  const [hero, ...rest] = moods;

  return (
    <section id="shop" className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-24 md:py-36">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end mb-16 md:mb-20">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="hairline" />
              <span className="eyebrow">Shop by Feeling</span>
            </div>
            <h2 className="display-lg text-brown">
              Begin with a <span className="serif-italic">feeling.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-brown/75 leading-relaxed md:text-lg">
            Notes can be studied. A mood, you simply recognise. Choose where
            you are today — the right fragrance follows.
          </p>
        </div>

        {/* Featured mood — large editorial */}
        {hero && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20 md:mb-28"
          >
            <Link
              to="/perfume-oils"
              hash={hero.key}
              className="group grid md:grid-cols-12 gap-8 md:gap-12 items-end"
            >
              <div className="md:col-span-8 relative overflow-hidden aspect-[16/11] md:aspect-[16/9] bg-brown/10 editorial-frame corner-ticks image-vignette">
                <img
                  src={hero.image}
                  alt={hero.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/60 via-brown/15 to-transparent z-[2]" />
                <div className="absolute top-5 left-5 z-[3] flex flex-wrap gap-x-3 gap-y-1.5">
                  {hero.keywords.map((k) => (
                    <span
                      key={k}
                      className="eyebrow text-[0.625rem] text-ivory/95 bg-brown/40 backdrop-blur px-2.5 py-1"
                    >
                      {k}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 text-ivory z-[3]">
                  <span className="eyebrow text-gold">{hero.eyebrow} — Featured</span>
                  <h3
                    className="mt-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
                      lineHeight: 1,
                    }}
                  >
                    {hero.title}
                  </h3>
                </div>
              </div>

              <div className="md:col-span-4">
                <p
                  className="serif-italic text-brown leading-snug"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}
                >
                  {hero.emotion}
                </p>
                <p className="mt-6 text-brown/75 leading-relaxed">
                  {hero.forWhom}
                </p>
                <p className="mt-6 text-xs text-brown/55 serif-italic">
                  {hero.scents.join(" · ")}
                </p>
                <span className="mt-8 inline-block eyebrow text-terracotta border-b border-terracotta/40 pb-1 group-hover:border-terracotta transition-colors">
                  Explore {hero.title} →
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Supporting moods — focused grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
          {rest.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.06, ease: "easeOut" }}
            >
              <Link
                to="/perfume-oils"
                hash={m.key}
                className="group block"
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-7 bg-brown/10 editorial-frame corner-ticks image-vignette">
                  <img
                    src={m.image}
                    alt={m.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/65 via-brown/10 to-transparent z-[2]" />
                  <div className="absolute bottom-4 left-4 right-4 z-[3]">
                    <span className="eyebrow text-gold text-[0.625rem]">
                      {m.eyebrow}
                    </span>
                    <h3
                      className="text-ivory mt-2"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.35rem, 2vw, 1.65rem)",
                        lineHeight: 1.1,
                      }}
                    >
                      {m.title}
                    </h3>
                  </div>
                </div>

                <p className="serif-italic text-brown/85 leading-snug">
                  {m.emotion}
                </p>
                <p className="mt-3 text-sm text-brown/60 leading-relaxed line-clamp-2">
                  {m.forWhom}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-2.5 gap-y-1">
                  {m.keywords.map((k) => (
                    <span
                      key={k}
                      className="eyebrow text-[0.625rem] text-brown/55"
                    >
                      · {k}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
