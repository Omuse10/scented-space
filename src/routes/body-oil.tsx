import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import dryOilImg from "@/assets/product-velvet.jpg";
import nourishingOilImg from "@/assets/mood-warm.jpg";

const options = [
  {
    title: "Dry Body Oil",
    intro: "Lightweight. Silky. Fast absorbing.",
    bestFor: [
      "Daytime use",
      "Non-greasy finish",
      "Layering with perfume oil",
      "Soft glow",
    ],
    cta: "Shop Dry Body Oil",
    to: "/dry-body-oil" as const,
    image: dryOilImg,
  },
  {
    title: "Nourishing Body Oil",
    intro: "Richer. More conditioning. More indulgent.",
    bestFor: [
      "Dry skin",
      "After-shower use",
      "Night-time ritual",
      "Deep nourishment",
    ],
    cta: "Shop Nourishing Body Oil",
    to: "/nourishing-body-oil" as const,
    image: nourishingOilImg,
  },
];

export const Route = createFileRoute("/body-oil")({
  head: () => ({
    meta: [
      { title: "Choose Your Oil — The Scented Space" },
      {
        name: "description",
        content:
          "Dry body oil for lightweight, fast-absorbing moisture, or nourishing body oil for richer, deeper conditioning — choose your finish.",
      },
      { property: "og:title", content: "Choose Your Oil — The Scented Space" },
      {
        property: "og:description",
        content:
          "Find the right body oil — lightweight and silky, or rich and deeply nourishing.",
      },
    ],
  }),
  component: BodyOilPage,
});

function BodyOilPage() {
  return (
    <section className="bg-ivory min-h-[calc(100svh-80px)] flex flex-col justify-center">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="hairline" />
            <span className="eyebrow text-gold">Body Oil</span>
            <span className="hairline" />
          </div>
          <h1 className="display-xl text-brown">
            Choose Your{" "}
            <span className="serif-italic text-gold">Oil</span>
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
