import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import { rituals, FORMAT_LABEL, type Ritual } from "@/lib/products";
import { useCart } from "@/lib/cart";
import scentedVideo from "@/assets/scented.mp4";

export const Route = createFileRoute("/rituals")({
  head: () => ({
    meta: [
      { title: "Rituals — The Scented Space" },
      {
        name: "description",
        content:
          "Complete ritual collections — Nahla, Alina, Velvet Elegance, Whispering Petals, and The Gentleman Collection. Cleanse, hydrate, seal, scent.",
      },
      { property: "og:title", content: "Rituals — The Scented Space" },
      {
        property: "og:description",
        content:
          "Complete ritual collections — cleanse, hydrate, seal, scent.",
      },
    ],
  }),
  component: RitualsPage,
});

function RitualsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ritual Collections"
        title={
          <>
            The <span className="serif-italic text-gold">Ritual.</span>
          </>
        }
        intro="Beautiful scent begins with beautiful skin. Each ritual is the full layering — composed in one of our signature scents, in one box."
        backgroundVideo={scentedVideo}
        isExpanded={true}
        videoPlaybackRate={0.45}
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28 space-y-28 md:space-y-36">
          {rituals.map((r, i) => (
            <RitualBlock key={r.id} r={r} flip={i % 2 === 1} />
          ))}
        </div>
      </section>
    </>
  );
}

function RitualBlock({ r, flip }: { r: Ritual; flip: boolean }) {
  const { add, setOpen } = useCart();
  const [variantIdx, setVariantIdx] = useState(0);
  const variantLabel = r.variants?.[variantIdx]?.label;

  return (
    <motion.div
      id={r.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={`grid md:grid-cols-12 gap-10 md:gap-16 items-center scroll-mt-32 ${
        flip ? "md:[&>:first-child]:order-2" : ""
      }`}
    >
      <Link
        to="/shop/$productId"
        params={{ productId: r.id }}
        className="md:col-span-6 relative aspect-[5/6] overflow-hidden bg-cream group block"
      >
        <img
          src={r.image}
          alt={r.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
        />
        {r.bestseller && (
          <span className="absolute top-5 left-5 eyebrow text-[0.625rem] bg-ivory/90 text-brown px-3 py-1.5">
            Bestseller
          </span>
        )}
      </Link>

      <div className="md:col-span-5 md:col-start-8">
        <span className="eyebrow text-gold">{r.moodLabel}</span>
        <h2 className="display-lg text-brown mt-3">{r.name}</h2>
        <p className="mt-4 text-brown/80 leading-relaxed serif-italic">
          {r.tagline}
        </p>
        <p className="mt-3 text-brown/65 leading-relaxed">{r.story}</p>

        <ol className="mt-8 border-t border-brown/15">
          {r.steps.map((s, i) => (
            <li
              key={s.format + i}
              className="flex items-baseline justify-between gap-6 border-b border-brown/10 py-3.5"
            >
              <span className="eyebrow text-gold text-[0.625rem] w-6">
                0{i + 1}
              </span>
              <span
                className="flex-1 text-brown"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}
              >
                {FORMAT_LABEL[s.format]}
              </span>
            </li>
          ))}
        </ol>

        {r.variants && (
          <div className="mt-6">
            <span className="eyebrow text-brown/60 block mb-3">Available in</span>
            <div className="flex flex-wrap gap-2">
              {r.variants.map((v, i) => (
                <button
                  key={v.scentId}
                  onClick={() => setVariantIdx(i)}
                  className={`eyebrow px-4 py-2.5 border transition-colors ${
                    i === variantIdx
                      ? "bg-brown text-ivory border-brown"
                      : "border-brown/25 text-brown/75 hover:border-terracotta hover:text-terracotta"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-baseline gap-3">
          <span
            className="text-brown text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            KSh {r.price.toLocaleString()}
          </span>
          <span className="eyebrow text-brown/50 text-[0.625rem]">
            Complete Ritual
          </span>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              add(
                {
                  id: r.id + (variantLabel ? `:${variantIdx}` : ""),
                  name: r.name,
                  variant: variantLabel,
                  price: r.price,
                  image: r.image,
                },
                1,
              );
              setOpen(true);
            }}
            className="flex-1 bg-terracotta text-ivory eyebrow py-4 px-8 hover:bg-brown transition-colors"
          >
            Add Entire Ritual
          </button>
          <Link
            to="/shop/$productId"
            params={{ productId: r.id }}
            className="text-center border border-brown/30 text-brown eyebrow py-4 px-8 hover:bg-cream transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
