import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import { oilsWithFormat, type Product } from "@/lib/products";

export const Route = createFileRoute("/nourishing-body-oil")({
  head: () => ({
    meta: [
      { title: "Nourishing Body Oil — The Scented Space" },
      {
        name: "description",
        content:
          "Rich, conditioning nourishing body oil in Nahla and Alina — for dry skin, after-shower use and deep night-time nourishment.",
      },
      { property: "og:title", content: "Nourishing Body Oil — The Scented Space" },
      {
        property: "og:description",
        content:
          "Richer, deeply conditioning body oil for dry skin and night-time ritual — long-lasting softness and indulgence.",
      },
    ],
  }),
  component: NourishingBodyOilPage,
});

const availableScents = [
  { name: "Nahla", notes: "Creamy • Vanilla • Caramel" },
  { name: "Alina", notes: "Fruity • Sweet • Elegant" },
];

function NourishingBodyOilPage() {
  const items = oilsWithFormat("nourishing-body-oil");

  return (
    <>
      <PageHeader
        eyebrow="Nourishing Body Oil"
        title={
          <>
            Richer. More conditioning.{" "}
            <span className="serif-italic text-gold">More indulgent.</span>
          </>
        }
        isExpanded={true}
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
          <div className="mb-12 md:mb-16 max-w-xl">
            <span className="eyebrow text-brown/50 text-[0.625rem] uppercase tracking-widest block mb-4">
              Best for
            </span>
            <ul className="text-brown/80 text-sm space-y-2">
              <li>Dry skin</li>
              <li>After-shower use</li>
              <li>Night-time ritual</li>
              <li>Deep nourishment</li>
            </ul>
          </div>

          <div className="mb-10 md:mb-14">
            <span className="eyebrow text-brown/50 text-[0.625rem] uppercase tracking-widest block mb-4">
              Available scents
            </span>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {availableScents.map((scent) => (
                <li key={scent.name} className="text-brown/80 text-sm">
                  <span className="font-medium text-brown">{scent.name}</span>
                  <span className="block text-brown/55 text-xs serif-italic mt-0.5">
                    {scent.notes}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {items.map((p, i) => (
              <NourishingBodyOilCard key={p.id} p={p} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function NourishingBodyOilCard({ p, delay }: { p: Product; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="group flex flex-col"
    >
      <Link
        to="/shop/$productId"
        params={{ productId: p.id }}
        className="relative overflow-hidden bg-cream aspect-[4/5] mb-5 block"
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
        />
        {p.bestseller && (
          <span className="absolute top-4 left-4 eyebrow text-[0.625rem] bg-ivory/90 backdrop-blur-sm text-brown px-3 py-1.5">
            Bestseller
          </span>
        )}
      </Link>
      <h3
        className="text-brown text-xl md:text-2xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <Link
          to="/shop/$productId"
          params={{ productId: p.id }}
          className="hover:text-terracotta transition-colors"
        >
          {p.name}
        </Link>
      </h3>
      {p.inspiredBy && (
        <p className="text-brown/50 text-xs mt-1 serif-italic">
          Inspired by {p.inspiredBy}
        </p>
      )}
      <p className="text-brown/65 text-sm mt-2 serif-italic">{p.noteSummary}</p>
      <p className="mt-4 text-brown/80 text-sm tracking-wider">
        KSh {p.price.toLocaleString()}
      </p>
    </motion.article>
  );
}
