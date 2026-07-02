import { motion } from "framer-motion";

const reviews = [
  {
    quote:
      "Nahla on my skin is the compliment I never used to get. Warm, soft, and somehow always there.",
    name: "Wanjiku",
    place: "Nairobi",
    scent: "Nahla — Body Butter + Perfume Oil",
  },
  {
    quote:
      "I layered the Velvet Elegance ritual for a wedding. Three different people followed me to ask what I was wearing.",
    name: "Amani",
    place: "Mombasa",
    scent: "Velvet Elegance Ritual",
  },
  {
    quote:
      "Cipher has quietly replaced everything else on my shelf. It just feels like me, only better.",
    name: "David",
    place: "Kigali",
    scent: "Cipher — Perfume Oil",
  },
  {
    quote:
      "The body oil alone changed my skin. Adding the perfume oil on top is the most luxurious five seconds of my morning.",
    name: "Lerato",
    place: "Johannesburg",
    scent: "Whispering Petals — Dry Body Oil",
  },
];

export function CustomerLove() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-16 py-20 md:py-32">
        <div className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-6 md:w-8 bg-gold/60" />
            <span className="eyebrow text-[0.65rem] md:text-[0.7rem] text-gold tracking-[0.3em]">
              Customer Love
            </span>
            <span className="h-px w-6 md:w-8 bg-gold/60" />
          </div>
          <h2
            className="text-brown text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.04] tracking-[-0.025em] max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Worn, loved, <span className="serif-italic">remembered.</span>
          </h2>
        </div>

        <ul className="grid gap-5 md:gap-7 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <motion.li
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-ivory rounded-2xl p-7 md:p-8 lg:p-9 ring-1 ring-gold/15 shadow-[0_6px_24px_-18px_rgba(60,30,15,0.3)] flex flex-col"
            >
              <span
                aria-hidden
                className="text-gold/70 leading-none serif-italic"
                style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem" }}
              >
                &ldquo;
              </span>
              <p
                className="-mt-3 text-brown/85 leading-[1.7] text-[0.98rem] md:text-base serif-italic flex-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {r.quote}
              </p>
              <div className="mt-6 pt-5 border-t border-gold/25">
                <p className="text-brown text-sm" style={{ fontFamily: "var(--font-display)" }}>
                  {r.name}
                  <span className="text-brown/55"> — {r.place}</span>
                </p>
                <p className="mt-1.5 eyebrow text-[0.6rem] tracking-[0.28em] text-terracotta">
                  {r.scent}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
