import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import lotionImg from "@/assets/mood-radiant.jpg";
import butterImg from "@/assets/mood-warm.jpg";

const options = [
  {
    title: "Body Lotion",
    intro: "For lightweight daily moisture.",
    bestFor: [
      "Daytime use",
      "Quick absorption",
      "Warm weather",
      "A soft, smooth finish",
    ],
    cta: "Shop Body Lotion",
    to: "/body-lotion" as const,
    image: lotionImg,
  },
  {
    title: "Body Butter",
    intro: "For richer, deeper moisture.",
    bestFor: [
      "Dry skin",
      "Night-time use",
      "Longer-lasting softness",
      "A velvety finish",
    ],
    cta: "Shop Body Butter",
    to: "/body-butter" as const,
    image: butterImg,
  },
];

export const Route = createFileRoute("/moisture")({
  head: () => ({
    meta: [
      { title: "Choose Your Moisture — The Scented Space" },
      {
        name: "description",
        content:
          "Body lotion for lightweight daily moisture, or body butter for richer, deeper hydration — choose what your skin needs.",
      },
      { property: "og:title", content: "Choose Your Moisture — The Scented Space" },
      {
        property: "og:description",
        content:
          "Find the right hydration — lightweight body lotion or rich, nourishing body butter.",
      },
    ],
  }),
  component: MoisturePage,
});

function MoisturePage() {
  return (
    <section className="bg-ivory min-h-[calc(100svh-80px)] flex flex-col justify-center">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="hairline" />
            <span className="eyebrow text-gold">Hydration</span>
            <span className="hairline" />
          </div>
          <h1 className="display-xl text-brown">
            Choose Your{" "}
            <span className="serif-italic text-gold">Moisture</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
          {options.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
            >
              <Link
                to={opt.to}
                className="group block h-full bg-cream p-6 md:p-10 transition-colors hover:bg-cream/80"
              >
                <div className="relative overflow-hidden aspect-[4/3] mb-8 bg-ivory">
                  <img
                    src={opt.image}
                    alt={opt.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                  />
                </div>
                <h2
                  className="text-brown text-2xl md:text-3xl mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {opt.title}
                </h2>
                <p className="text-brown/75 serif-italic mb-8">{opt.intro}</p>

                <div className="mb-10">
                  <span className="eyebrow text-brown/50 text-[0.625rem] uppercase tracking-widest block mb-4">
                    Best for
                  </span>
                  <ul className="space-y-3">
                    {opt.bestFor.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-brown/80 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="inline-flex items-center justify-center w-full bg-brown text-ivory px-8 py-4 eyebrow hover:bg-terracotta transition-colors">
                  {opt.cta}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
