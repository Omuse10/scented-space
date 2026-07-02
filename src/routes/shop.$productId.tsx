import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  getProduct,
  products,
  perfumeOils,
  oilsByMood,
  FORMAT_LABEL,
  type Product,
  type Format,
} from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.name} — The Scented Space` : "Product" },
      { name: "description", content: loaderData?.product.feeling ?? "" },
      { property: "og:title", content: loaderData ? `${loaderData.product.name} — The Scented Space` : "" },
      { property: "og:description", content: loaderData?.product.feeling ?? "" },
      { property: "og:image", content: loaderData?.product.image ?? "" },
      { name: "twitter:image", content: loaderData?.product.image ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="display-lg text-brown">This piece is no longer here.</h1>
        <Link
          to="/shop"
          className="mt-6 inline-block eyebrow text-terracotta border-b border-terracotta/40 pb-1"
        >
          Return to the atelier
        </Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { add, setOpen } = useCart();
  const [variantIdx, setVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(
    product.availableIn[0] ?? null,
  );

  const selectedVariant = product.variants?.[variantIdx];
  const price = selectedVariant?.price ?? product.price;
  const variantLabel = selectedVariant?.label;

  // "Complete the Ritual" — for an oil, show its associated body items
  const sameScentVariants = products.filter(
    (p) => p.id !== product.id && p.name.split(" ")[0] === product.name.split(" ")[0],
  );

  // "You may also like" — same mood
  const related = (
    product.mood === "discovery"
      ? perfumeOils
      : oilsByMood(product.mood)
  )
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <div className="bg-brown h-20 md:h-24" />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-10 md:py-16">
          <nav className="eyebrow text-brown/55 mb-8 flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-terracotta">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-terracotta">Shop</Link>
            <span>/</span>
            <span className="text-brown">{product.name}</span>
          </nav>

          <header className="mb-8 md:mb-12">
            <span className="eyebrow text-gold">{product.moodLabel}</span>
            <h1 className="display-lg text-brown mt-3">{product.name}</h1>
            {product.inspiredBy && (
              <p className="mt-2 text-brown/55 serif-italic">
                Inspired by {product.inspiredBy}
              </p>
            )}
          </header>

          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7"
            >
              <div className="relative aspect-[4/5] bg-cream overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-5 left-5 eyebrow bg-ivory/90 backdrop-blur-sm text-brown px-3 py-1.5">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3">
                {[product.image, product.image, product.image].map((src, i) => (
                  <div key={i} className="relative aspect-square bg-cream overflow-hidden">
                    <img
                      src={src}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              className="md:col-span-5"
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="text-brown text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  KSh {price.toLocaleString()}
                </span>
                <span className="eyebrow text-brown/50 text-[0.625rem]">
                  Inclusive · Nairobi delivery extra
                </span>
              </div>

              {product.variants && (
                <div className="mt-8">
                  <span className="eyebrow text-brown/60 block mb-3">Choose</span>
                  <div className="flex flex-col gap-2">
                    {product.variants.map((v, i) => {
                      const active = i === variantIdx;
                      return (
                        <button
                          key={v.label}
                          onClick={() => setVariantIdx(i)}
                          className={`text-left px-4 py-3 border flex items-center justify-between transition-colors ${
                            active
                              ? "border-terracotta bg-terracotta/5 text-brown"
                              : "border-brown/20 text-brown/75 hover:border-brown/50"
                          }`}
                        >
                          <span className="text-sm">{v.label}</span>
                          <span className="text-sm tabular-nums">
                            KSh {v.price.toLocaleString()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-stretch gap-3">
                <div className="inline-flex items-center border border-brown/25">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-12 text-brown/70 hover:text-terracotta"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-brown">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-12 text-brown/70 hover:text-terracotta"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    add(
                      {
                        id:
                          product.id +
                          (variantLabel ? `:${variantIdx}` : "") +
                          (selectedFormat ? `:${selectedFormat}` : ""),
                        name: product.name,
                        variant:
                          variantLabel ??
                          (selectedFormat ? FORMAT_LABEL[selectedFormat] : undefined),
                        price,
                        image: product.image,
                      },
                      qty,
                    );
                    setOpen(true);
                  }}
                  className="flex-1 bg-terracotta text-ivory eyebrow hover:bg-brown transition-colors"
                >
                  Add to Cart · KSh {(price * qty).toLocaleString()}
                </button>
              </div>

              <div className="mt-10">
                <p className="text-brown text-lg serif-italic">
                  {product.noteSummary}
                </p>
                <p className="mt-4 text-brown/80 leading-relaxed">
                  {product.feeling}
                </p>
              </div>

              {product.availableIn.length > 0 && (
                <div className="mt-10 border-t border-brown/15 pt-6">
                  <span className="eyebrow text-brown/60 block mb-3">Available in</span>
                  <div className="flex flex-wrap gap-2">
                    {product.availableIn.map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFormat(f)}
                        className={`eyebrow px-4 py-2.5 border transition-colors ${
                          selectedFormat === f
                            ? "bg-brown text-ivory border-brown"
                            : "border-brown/25 text-brown/75 hover:border-terracotta hover:text-terracotta"
                        }`}
                      >
                        {FORMAT_LABEL[f]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Complete the Ritual */}
      {sameScentVariants.length > 0 && (
        <section className="bg-cream">
          <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-12">
              <div className="md:col-span-7">
                <div className="flex items-center gap-3 mb-5">
                  <span className="hairline" />
                  <span className="eyebrow">The Ritual</span>
                </div>
                <h2 className="display-lg text-brown">
                  Complete Your{" "}
                  <span className="serif-italic">
                    {product.name.split(" ")[0]}
                  </span>{" "}
                  Ritual
                </h2>
              </div>
              <p className="md:col-span-4 md:col-start-9 text-brown/70 leading-relaxed">
                Cleanse, hydrate, seal, scent — the full {product.name.split(" ")[0]} ritual.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {sameScentVariants.slice(0, 4).map((r) => (
                <Link
                  key={r.id}
                  to="/shop/$productId"
                  params={{ productId: r.id }}
                  className="group block"
                >
                  <div className="relative overflow-hidden bg-ivory aspect-[4/5] mb-4">
                    <img
                      src={r.image}
                      alt={r.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3
                    className="text-brown text-lg"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {r.name}
                  </h3>
                  <p className="text-brown/60 text-sm mt-1.5 serif-italic">
                    {r.character}
                  </p>
                  <p className="text-brown/75 text-sm mt-2 tracking-wider">
                    KSh {r.price.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* You may also like */}
      {related.length > 0 && (
        <section className="bg-ivory border-t border-brown/10">
          <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
            <div className="flex items-center gap-3 mb-10">
              <span className="hairline" />
              <span className="eyebrow">You may also like</span>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/shop/$productId"
                  params={{ productId: r.id }}
                  className="group block"
                >
                  <div className="relative overflow-hidden bg-cream aspect-[4/5] mb-4">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3
                    className="text-brown text-xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {r.name}
                  </h3>
                  <p className="text-brown/60 text-sm mt-1 serif-italic">
                    {r.noteSummary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-brown/15 pt-6">
      <h3 className="eyebrow text-brown mb-3">{title}</h3>
      {children}
    </div>
  );
}
