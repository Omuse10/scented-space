import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { products, type Product } from "@/lib/products";
import { ScentPreviewCompact } from "@/components/site/ScentPreview";

function ProductCard({ p, large }: { p: Product; large?: boolean }) {
  const { add, setOpen } = useCart();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group flex flex-col"
    >
      <Link
        to="/shop/$productId"
        params={{ productId: p.id }}
        className={`relative overflow-hidden bg-cream ${large ? "aspect-[5/6]" : "aspect-[4/5]"} mb-5 block`}
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105 group-hover:brightness-[1.03]"
        />
        {p.badge && (
          <span className="absolute top-4 left-4 eyebrow bg-ivory/90 backdrop-blur-sm text-brown px-3 py-1.5">
            {p.badge}
          </span>
        )}
        <span className="absolute top-4 right-4 eyebrow text-[0.6rem] bg-brown/80 backdrop-blur-sm text-ivory px-3 py-1.5">
          {p.moodLabel}
        </span>
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            className={`text-brown ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            <Link to="/shop/$productId" params={{ productId: p.id }} className="hover:text-terracotta transition-colors">
              {p.name}
            </Link>
          </h3>
          <p className="text-brown/75 mt-2 text-sm leading-relaxed serif-italic">{p.emotion}</p>
          <p className="text-brown/60 mt-1.5 text-sm leading-relaxed max-w-sm">{p.character}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-brown text-sm tracking-wider">KSh {p.price.toLocaleString()}</div>
        </div>
      </div>

      <ScentPreviewCompact product={p} />

      <div className="mt-5 flex items-center gap-6">
        <Link
          to="/shop/$productId"
          params={{ productId: p.id }}
          className="eyebrow text-terracotta border-b border-terracotta/40 pb-1.5 hover:border-terracotta transition-colors"
        >
          Discover
        </Link>
        <button
          onClick={() => {
            add({ id: p.id, name: p.name, price: p.price, image: p.image });
            setOpen(true);
          }}
          className="eyebrow text-brown/65 hover:text-terracotta transition-colors"
        >
          Add to Ritual
        </button>
      </div>
    </motion.article>
  );
}

export function Featured() {
  const featured = products.filter((p) => ["discovery-set", "nahla-ritual", "velvet-elegance-ritual", "alina-ritual", "gentleman-collection"].includes(p.id));
  const [first, ...rest] = featured;
  return (
    <section id="featured" className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-24 md:py-36">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-16 md:mb-24">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="hairline" />
              <span className="eyebrow">Featured Rituals</span>
            </div>
            <h2 className="display-lg text-brown">
              Where most <span className="serif-italic">begin.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-brown/70 leading-relaxed">
            Five quiet doorways into the house. The Discovery Set is the most
            beloved place to start.
          </p>
        </div>

        <div className="mb-20 md:mb-28">
          <ProductCard p={first} large />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {rest.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
