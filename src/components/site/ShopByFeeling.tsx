import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { moods } from "@/lib/products";

export function ShopByFeeling() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10 lg:px-16 py-16 md:py-24 lg:py-32">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-6 md:w-8 bg-gold/60" />
            <span className="eyebrow text-[0.65rem] md:text-[0.7rem] text-gold tracking-[0.3em]">
              Shop By Feeling
            </span>
            <span className="h-px w-6 md:w-8 bg-gold/60" />
          </div>
          <h2
            className="text-brown text-[2.5rem] leading-[1.02] md:text-[3.25rem] lg:text-[4rem] tracking-[-0.025em] max-w-3xl mx-auto px-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find the fragrance that{" "}
            <span className="serif-italic text-brown/85">matches your mood.</span>
          </h2>
          <p className="mt-4 md:mt-5 text-brown/65 text-[0.95rem] md:text-base leading-relaxed max-w-md md:max-w-lg mx-auto px-4">
            Notes can be studied. A mood, you simply recognise.
          </p>
        </div>

        {/* Mobile / tablet: horizontal snap carousel. Desktop: spacious grid. */}
        <ul
          className="
            flex lg:grid gap-4 md:gap-5 lg:gap-6 lg:grid-cols-3
            overflow-x-auto lg:overflow-visible
            snap-x snap-mandatory lg:snap-none
            -mx-4 md:-mx-10 lg:mx-0
            px-4 md:px-10 lg:px-0
            pb-4 lg:pb-0
            scrollbar-hide
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {moods.map((m, i) => (
            <motion.li
              key={m.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={
                "shrink-0 snap-center w-[82%] sm:w-[60%] md:w-[44%] lg:w-auto lg:shrink " +
                // On desktop, last two items center nicely in a 3-col grid
                (i === 3 ? "lg:col-start-1" : "") +
                (i === 4 ? "lg:col-span-2 lg:max-w-[860px] lg:w-full" : "")
              }
            >
              <article className="group relative overflow-hidden rounded-2xl ring-1 ring-gold/20 shadow-[0_6px_24px_-16px_rgba(60,30,15,0.35)] transition-all duration-700 hover:ring-gold/40 hover:shadow-[0_12px_36px_-16px_rgba(60,30,15,0.5)] bg-cocoa">
                <div className={"relative overflow-hidden " + (i === 4 ? "aspect-[4/5] lg:aspect-[16/10]" : "aspect-[4/5]")}>
                  <img
                    src={m.image}
                    alt={m.title}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.02] transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa/95 via-cocoa/50 to-cocoa/10 pointer-events-none" />

                  {/* Top index */}
                  <div className="absolute top-5 left-5 right-5 flex items-center gap-3 text-ivory/90">
                    <span className="eyebrow text-[0.65rem] tabular-nums tracking-[0.3em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-gold/70" />
                    <span className="eyebrow text-[0.6rem] text-gold tracking-[0.3em]">
                      {m.eyebrow}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 lg:p-8 flex flex-col gap-4">
                    <h3
                      className="text-ivory text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] leading-[1] tracking-[-0.02em]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {m.title}
                    </h3>
                    <p className="serif-italic text-gold text-sm md:text-[0.95rem]">
                      {m.emotion}
                    </p>

                    {/* Featured fragrances */}
                    <ul className="flex flex-wrap gap-x-2.5 gap-y-1.5">
                      {m.scents.slice(0, 4).map((s) => (
                        <li
                          key={s}
                          className="eyebrow text-[0.6rem] md:text-[0.65rem] tracking-[0.22em] text-ivory/85 border border-ivory/35 rounded-full px-2.5 py-1 backdrop-blur-[2px]"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/perfume-oils"
                      hash={m.key}
                      aria-label={`Explore the ${m.title} collection`}
                      className="mt-1 inline-flex h-10 md:h-11 w-fit items-center gap-2.5 px-5 rounded-full border border-ivory/80 bg-cocoa/40 backdrop-blur-[2px] text-ivory eyebrow text-[0.6rem] md:text-[0.65rem] tracking-[0.28em] transition-all duration-500 hover:bg-ivory hover:text-cocoa hover:border-ivory focus-visible:bg-ivory focus-visible:text-cocoa active:scale-[0.98]"
                    >
                      Explore Collection
                      <svg width="16" height="8" viewBox="0 0 22 10" fill="none">
                        <path d="M0 5h20m0 0L16 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.25" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>

        {/* Swipe hint — mobile + tablet only */}
        <p className="lg:hidden mt-5 text-center eyebrow text-[0.6rem] tracking-[0.3em] text-brown/45">
          Swipe to explore →
        </p>
      </div>
    </section>
  );
}
