import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import { oilsWithFormat, type Format, type Product } from "@/lib/products";

export const Route = createFileRoute("/body")({
  head: () => ({
    meta: [
      { title: "Body Collection — The Scented Space" },
      {
        name: "description",
        content:
          "Shower gels, body lotions, body butters, dry body oils and nourishing body oils — each composed in our signature scents.",
      },
      { property: "og:title", content: "Body Collection — The Scented Space" },
      {
        property: "og:description",
        content:
          "Shower gels, lotions, butters and body oils — composed in our signature scents.",
      },
    ],
  }),
  component: BodyPage,
});

const sections: { format: Format; title: string; eyebrow: string; body: string }[] = [
  {
    format: "shower-gel",
    title: "Shower Gels",
    eyebrow: "01 · Cleanse",
    body: "A cleanse that readies the skin — never strips it.",
  },
  {
    format: "body-lotion",
    title: "Body Lotions",
    eyebrow: "02 · Hydrate",
    body: "Light, fast-absorbing hydration in our signature scents.",
  },
  {
    format: "body-butter",
    title: "Body Butters",
    eyebrow: "02 · Hydrate",
    body: "Whipped, deeply nourishing, never heavy.",
  },
  {
    format: "dry-body-oil",
    title: "Dry Body Oils",
    eyebrow: "03 · Seal",
    body: "Silken, fast-sinking — locks moisture and lifts the scent.",
  },
  {
    format: "nourishing-body-oil",
    title: "Nourishing Body Oils",
    eyebrow: "03 · Seal",
    body: "Slower, richer — for dry skin and longer wear.",
  },
];

function BodyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Body Collection"
        title={
          <>
            The body, <span className="serif-italic text-gold">prepared.</span>
          </>
        }
        intro="Cleansed, hydrated, sealed — each step composed in our signature scents, so the fragrance lives on the skin from morning until evening."
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28 space-y-24 md:space-y-32">
          {sections.map((s) => {
            const items = oilsWithFormat(s.format);
            if (items.length === 0) return null;
            return (
              <div key={s.format} id={s.format} className="scroll-mt-32">
                <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-10 md:mb-14">
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="hairline" />
                      <span className="eyebrow text-gold">{s.eyebrow}</span>
                    </div>
                    <h2 className="display-lg text-brown">{s.title}</h2>
                  </div>
                  <p className="md:col-span-4 md:col-start-9 text-brown/70 leading-relaxed">
                    {s.body}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-10">
                  {items.map((p, i) => (
                    <BodyCard key={p.id} p={p} format={s.format} delay={(i % 6) * 0.04} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function BodyCard({ p, format, delay }: { p: Product; format: Format; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <Link
        to="/shop/$productId"
        params={{ productId: p.id }}
        className="group block"
        title={`${p.name} · ${format}`}
      >
        <div className="relative overflow-hidden bg-cream aspect-[4/5] mb-3">
          <img
            src={p.image}
            alt={`${p.name} ${format}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
          />
        </div>
        <h3
          className="text-brown text-base md:text-lg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {p.name}
        </h3>
        <p className="text-brown/55 text-xs mt-1 serif-italic">{p.noteSummary}</p>
      </Link>
    </motion.div>
  );
}
