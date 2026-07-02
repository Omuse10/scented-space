import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import { oilsWithFormat, type Product } from "@/lib/products";

export const Route = createFileRoute("/body-wash")({
  head: () => ({
    meta: [
      { title: "Body Wash — The Scented Space" },
      {
        name: "description",
        content:
          "A gentle first step for beautifully scented skin. Shower gels composed in our signature scents — Nahla, Alina, Velvet Elegance, Whispering Petals, Cipher, Tangier Twilight.",
      },
      { property: "og:title", content: "Body Wash — The Scented Space" },
      {
        property: "og:description",
        content:
          "Shower gels composed in our signature scents — a gentle cleanse that never strips.",
      },
    ],
  }),
  component: BodyWashPage,
});

function BodyWashPage() {
  const items = oilsWithFormat("shower-gel");

  return (
    <>
      <PageHeader
        eyebrow="Body Wash"
        title={
          <>
            A gentle first step for{" "}
            <span className="serif-italic text-gold">beautifully scented skin.</span>
          </>
        }
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {items.map((p, i) => (
              <BodyWashCard key={p.id} p={p} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BodyWashCard({ p, delay }: { p: Product; delay: number }) {
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
