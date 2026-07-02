
import { createFileRoute, Link } from "@tanstack/react-router";
import shopTheHouseBg from "@/assets/shop-the-house-bg.jpg.asset.json";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { useCart } from "@/lib/cart";
import {
  moods,
  perfumeOils,
  rituals,
  discoverySetProducts,
  FORMAT_LABEL,
  type Product,
  type Mood,
} from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — The Scented Space" },
      {
        name: "description",
        content:
          "Discovery Sets, complete Rituals, perfume oils and the body collection — one cohesive shop, composed in Nairobi.",
      },
      { property: "og:title", content: "Shop — The Scented Space" },
      {
        property: "og:description",
        content:
          "Browse by mood, discovery set, ritual or perfume oil — one cohesive shop.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const visibleMoods = moods.filter((m) => m.key !== "discovery");

  return (
    <>
      <PageHeader
        eyebrow="The Atelier"
        title={
          <>
            Shop the <span className="serif-italic text-gold">house.</span>
          </>
        }
        intro="Begin where it fits — by feeling, with a Discovery Set, a complete Ritual, or a single perfume oil."
        backgroundImage={shopTheHouseBg.url}
      />

      {/* Discovery Sets */}
      <Section
        eyebrow="Begin Here"
        title="Discovery Sets"
        intro="Small bottles. The whole house, sampled."
        tone="cream"
        id="discovery"
      >
        <CardGrid>
          {discoverySetProducts.map((p, i) => (
            <ShopCard key={p.id} product={p} index={i} />
          ))}
        </CardGrid>
      </Section>

      {/* Ritual Collections */}
      <Section
        eyebrow="The Full Ritual"
        title="Ritual Collections"
        intro="Cleanse, hydrate, seal, scent — composed in one box."
        tone="ivory"
        cta={{ to: "/rituals", label: "View all rituals →" }}
        id="rituals"
      >
        <CardGrid>
          {rituals.slice(0, 4).map((r, i) => {
            const product = perfumeOils.find((p) => p.id === r.scentId);
            if (!product) return null;
            const ritualAsProduct: Product = {
              ...product,
              id: r.id,
              name: r.name,
              price: r.price,
              image: r.image,
              noteSummary: product.noteSummary,
              feeling: r.tagline,
              availableIn: r.steps.map((s) => s.format),
              badge: r.bestseller ? "Bestseller" : undefined,
            };
            return <ShopCard key={r.id} product={ritualAsProduct} index={i} />;
          })}
        </CardGrid>
      </Section>

      {/* By Mood */}
      <Section
        eyebrow="Shop By Feeling"
        title="By Mood"
        intro="The mood you are in today. The right fragrance follows."
        tone="cream"
        id="mood"
      >
        <CardGrid>
          {visibleMoods.map((m, i) => (
            <MoodCard key={m.key} mood={m} index={i} />
          ))}
        </CardGrid>
      </Section>

      {/* Full Collection */}
      <Section
        eyebrow="The Full Collection"
        title="All Perfume Oils"
        intro="Twenty signatures, composed in small batches."
        tone="ivory"
        cta={{ to: "/perfume-oils", label: "Explore all perfume oils →" }}
        id="oils"
      >
        <CardGrid>
          {perfumeOils.slice(0, 12).map((p, i) => (
            <ShopCard key={p.id} product={p} index={i} />
          ))}
        </CardGrid>
      </Section>

    </>
  );
}

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

function Section({
  eyebrow,
  title,
  intro,
  id,
  tone = "ivory",
  cta,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  tone?: "ivory" | "cream";
  cta?: { to: "/rituals" | "/perfume-oils"; label: string };
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={tone === "cream" ? "bg-cream" : "bg-ivory"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 py-14 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold/60" />
              <span className="eyebrow text-[0.7rem] text-gold tracking-[0.3em]">
                {eyebrow}
              </span>
            </div>
            <h2
              className="text-brown text-[2rem] md:text-[2.75rem] leading-[1.05] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h2>
            {intro && (
              <p className="mt-3 text-brown/65 leading-relaxed max-w-xl">
                {intro}
              </p>
            )}
          </div>
          {cta && (
            <Link
              to={cta.to}
              className="eyebrow text-[0.7rem] text-terracotta border-b border-terracotta/40 pb-1 hover:border-terracotta transition-colors self-start md:self-end tracking-[0.25em]"
            >
              {cta.label}
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The single cohesive card recipe                                     */
/* photo → title → price/badge → primary CTA → details                 */
/* ------------------------------------------------------------------ */

function CardShell({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-ivory ring-1 ring-brown/10 shadow-[0_4px_20px_-12px_rgba(60,30,15,0.25)] hover:shadow-[0_12px_36px_-16px_rgba(60,30,15,0.45)] transition-shadow duration-700"
    >
      {children}
    </motion.article>
  );
}

function CardImage({
  src,
  alt,
  badge,
  eyebrow,
}: {
  src: string;
  alt: string;
  badge?: string;
  eyebrow?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-cream aspect-[4/5]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
      />
      {badge && (
        <span className="absolute top-3 left-3 eyebrow text-[0.6rem] bg-ivory/90 text-brown px-2.5 py-1 rounded-full tracking-[0.25em]">
          {badge}
        </span>
      )}
      {eyebrow && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-ivory">
          <span className="h-px w-6 bg-gold" />
          <span className="eyebrow text-[0.6rem] text-gold tracking-[0.3em]">
            {eyebrow}
          </span>
        </div>
      )}
    </div>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3 p-4 sm:p-5">{children}</div>;
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-brown text-lg sm:text-xl md:text-[1.4rem] leading-tight"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </h3>
  );
}

function CardPrice({ value }: { value: string }) {
  return (
    <p className="text-brown/85 text-sm tracking-wider tabular-nums">{value}</p>
  );
}

function CardDetails({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="border-t border-brown/10 pt-3">
      <p className="eyebrow text-[0.6rem] text-gold tracking-[0.28em] mb-1.5">
        {label}
      </p>
      <p className="text-brown/75 text-[0.8rem] sm:text-sm leading-relaxed">
        {value}
      </p>
    </div>
  );
}

/* -- Product variant (oils, rituals, discovery sets) -- */
function ShopCard({ product, index }: { product: Product; index: number }) {
  const { add, setOpen } = useCart();
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setOpen(true);
  };

  return (
    <CardShell index={index}>
      <Link
        to="/shop/$productId"
        params={{ productId: product.id }}
        className="contents"
      >
        <CardImage src={product.image} alt={product.name} badge={product.badge} />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardPrice value={`KSh ${product.price.toLocaleString()}`} />

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center gap-2 w-full h-10 sm:h-11 rounded-md bg-brown text-ivory eyebrow text-[0.65rem] tracking-[0.28em] hover:bg-cocoa active:scale-[0.99] transition-all"
          >
            Add to Cart
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>

          <CardDetails label="Notes" value={product.noteSummary} />

          {product.feeling && (
            <p className="text-brown/70 text-[0.8rem] sm:text-sm leading-relaxed line-clamp-3">
              {product.feeling}
            </p>
          )}

          {product.availableIn.length > 0 && (
            <CardDetails
              label="Available In"
              value={product.availableIn
                .map((f) => FORMAT_LABEL[f])
                .join(" · ")}
            />
          )}
        </CardBody>
      </Link>
    </CardShell>
  );
}

/* -- Mood variant -- */
function MoodCard({
  mood,
  index,
}: {
  mood: (typeof moods)[number];
  index: number;
}) {
  return (
    <CardShell index={index}>
      <Link to="/perfume-oils" hash={mood.key as Mood} className="contents">
        <CardImage
          src={mood.image}
          alt={mood.title}
          eyebrow={mood.eyebrow}
        />
        <CardBody>
          <CardTitle>{mood.title}</CardTitle>
          <p className="serif-italic text-brown/70 text-sm">{mood.emotion}</p>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 w-full h-10 sm:h-11 rounded-md bg-brown text-ivory eyebrow text-[0.65rem] tracking-[0.28em] hover:bg-cocoa active:scale-[0.99] transition-all"
          >
            Explore Collection
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <CardDetails
            label="Notes"
            value={mood.keywords.join(" · ")}
          />

          <p className="text-brown/70 text-[0.8rem] sm:text-sm leading-relaxed line-clamp-3">
            {mood.body}
          </p>

          <CardDetails
            label="Available In"
            value={mood.scents.slice(0, 4).join(" · ")}
          />
        </CardBody>
      </Link>
    </CardShell>
  );
}