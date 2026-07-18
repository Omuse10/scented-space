import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bestsellers } from "@/components/site/Bestsellers";
import {
  moods,
  oilsByMood,
  perfumeOils,
  FORMAT_LABEL,
  type Product,
  type Format,
} from "@/lib/products";
import { useCart } from "@/lib/cart";
import {
  ShoppingBag,
  ArrowRight,
  Leaf,
  Flame,
  Droplet,
  Plus,
  Heart,
  BarChart3,
  Moon,
  Flower2,
  Clock,
} from "lucide-react";
import perfumeHeroImage from "@/assets/Experience the magic of our latest scents, now available as-⚜️ Perfume Oils⚜️ Dry Body Oils⚜️ No.jpg";

const ABOUT: Record<string, string> = {
  nahla:
    "Nahla is warm, sensual and effortlessly elegant. It opens with soft vanilla and delicate florals, unfolding into rich amber and smooth woods that linger beautifully on the skin.",
  alina:
    "Alina is graceful and quietly romantic. Juicy lychee meets Turkish rose and peony, settling into a soft cashmere wood and musk that feels refined from morning into evening.",
  samara:
    "Samara is a slow, golden hour on the skin. Amber resin and vanilla bourbon wrap around sandalwood and orris for a soft, sensual warmth you keep returning to.",
  zafira:
    "Zafira is comfort with backbone. Cocoa absolute and tonka layer over sandalwood, patchouli and amber for a gourmand warmth that never tips into sweetness.",
  "whispering-petals":
    "Whispering Petals is luminous and feminine. Lychee and pear lift a delicate bouquet of damask rose and peony, finished with a weightless white musk and soft amber.",
  thea: "Théa is sunlight through linen. Bright bergamot and green tea open onto tuberose and jasmine, settling into a clean white musk and warm vanilla wood.",
  "riviera-dreams":
    "Riviera Dreams is fresh and effortless. Peony and pink pepper bloom over a quiet musk and cedar — easy to wear from a long afternoon into the evening.",
  lyra: "Lyra is soft, sunlit warmth. Ripe apricot and bergamot melt into jasmine and peach blossom, settling on a quiet amber and cashmere wood.",
  "velvet-elegance":
    "Velvet Elegance is sensual and magnetic. Saffron and pink pepper open onto hibiscus and rose damascena, wrapped in warm vanilla, patchouli and black amber.",
  "sensual-whispers":
    "Sensual Whispers is intimate and modern. Juicy pear meets rose and jasmine, settling skin-close into creamy sandalwood and soft musk.",
  "carmine-temptations":
    "Carmine Temptations is rich and unforgettable. Black cherry and bitter almond fold into rose absolute and plum, drying down to a slow, smoky amber and tonka.",
  aurielle:
    "Aurielle is gilded and slow. Saffron-warmed rose and iris dip into vanilla, amber and a whisper of oud for a long, opulent drydown.",
  amara:
    "Amara is bright at the top and warm at the base. Candied orange and bergamot open onto orange blossom and jasmine, settling into creamy vanilla, musk and amber.",
  cipher:
    "Cipher is composed and confident. Bright pineapple and blackcurrant lift over smoked birch and rose, settling into oakmoss, amber and musk for quiet authority.",
  griselle:
    "Griselle is modern and considered. Bergamot and cardamom open onto rose and iris, grounded by earthy patchouli, cedar and vetiver.",
  verin:
    "Verin is tailored and warm. Black pepper and bergamot lead into soft suede and iris, finishing on cedar, musk and amber — the scent of a well-cut coat.",
  "opulent-odyssey":
    "Opulent Odyssey is warmth with structure. Spicy ginger and bergamot thread through tonka and iris, settling into vanilla, sandalwood and cedar.",
  "tangier-twilight":
    "Tangier Twilight is a worn-in evening. Bergamot and cardamom give way to sweet tobacco and hay, drying down on amber, cedar and a quiet vanilla.",
  "majestic-oud":
    "Majestic Oud is ceremonial and deep. Saffron and bergamot lead into smoky oud and rose damascena, resting on a resinous amber, sandalwood and musk.",
};

const FORMAT_ML: Record<string, string> = {
  "perfume-oil": "30ml",
  "shower-gel": "250ml",
  "body-lotion": "200ml",
  "body-butter": "200ml",
  "dry-body-oil": "100ml",
  "nourishing-body-oil": "100ml",
};

const NOTE_ICONS = [Leaf, Flame, Droplet];

const LONGEVITY: Record<string, string> = {
  Soft: "6+ Hours",
  Medium: "8+ Hours",
  Bold: "10+ Hours",
};

const MOOD_LABEL: Record<string, string> = {
  warm: "Warm & Indulgent",
  radiant: "Radiant & Feminine",
  bold: "Bold & Magnetic",
  refined: "Refined & Commanding",
  distinguished: "Distinguished",
  discovery: "Discovery",
};

function fragranceFamily(p: Product) {
  const parts = p.noteSummary
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.slice(-2).join(" ");
}

export const Route = createFileRoute("/perfume-oils")({
  head: () => ({
    meta: [
      { title: "Perfume Oils — The Scented Space" },
      {
        name: "description",
        content:
          "The complete collection of long-wear perfume oils, composed in Nairobi. Browse by feeling — warm, radiant, bold, refined, distinguished.",
      },
      { property: "og:title", content: "Perfume Oils — The Scented Space" },
      {
        property: "og:description",
        content: "Long-wear perfume oils for skin — warm, radiant, bold, refined, distinguished.",
      },
    ],
  }),
  component: PerfumeOilsPage,
});

function PerfumeOilsPage() {
  const visibleMoods = moods.filter((m) => m.key !== "discovery");
  const heroSlides = useMemo<HeroSlide[]>(() => {
    const selected = perfumeOils.slice(0, 9);
    return selected.map((oil, index) => ({
      id: oil.id,
      image: index === 0 ? perfumeHeroImage : oil.image,
      title: index === 0 ? "Luxury in Every Drop." : oil.name,
      description:
        index === 0
          ? "Long-wear perfume oils, poured in small batches in Nairobi. Composed for skin that remembers every note."
          : oil.feeling,
      ctaLabel: "Shop Perfume Oils",
      ctaTo: "/shop/$productId",
      ctaParams: { productId: oil.id },
      number: String(index + 1).padStart(2, "0"),
    }));
  }, []);

  return (
    <>
      <PremiumPerfumeHero slides={heroSlides} autoPlayMs={5000} />

      <Bestsellers variant="carousel" />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-14 md:py-28 space-y-20 md:space-y-32">
          {visibleMoods.map((m) => {
            const items = oilsByMood(m.key);
            if (items.length === 0) return null;
            return (
              <div key={m.key} id={m.key} className="scroll-mt-32">
                <div className="grid md:grid-cols-12 gap-5 md:gap-12 items-end mb-9 md:mb-16">
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-3 mb-4 md:mb-5">
                      <span className="hairline" />
                      <span className="eyebrow text-gold">{m.eyebrow}</span>
                    </div>
                    <h2 className="display-lg text-brown">
                      {m.title.split(" & ")[0]}{" "}
                      {m.title.includes(" & ") && (
                        <span className="serif-italic">&amp; {m.title.split(" & ")[1]}</span>
                      )}
                    </h2>
                    <p className="mt-4 text-brown/75 leading-relaxed serif-italic">{m.emotion}</p>
                  </div>
                  <p className="md:col-span-4 md:col-start-9 text-brown/65 text-sm leading-relaxed">
                    {m.forWhom}
                  </p>
                </div>

                <div className="space-y-12 md:space-y-20">
                  {items.slice(0, 2).map((p, i) => (
                    <EditorialCard
                      key={p.id}
                      p={p}
                      index={i + 1}
                      total={items.length}
                      reverse={i % 2 === 1}
                    />
                  ))}
                </div>

                {items.length > 2 && (
                  <div className="mt-10 md:mt-14 flex justify-center">
                    <Link
                      to="/shop"
                      hash={m.key}
                      className="group inline-flex items-center gap-3 border border-brown/30 text-brown text-xs tracking-[0.22em] uppercase px-7 py-4 hover:bg-brown hover:text-ivory transition-colors"
                    >
                      Explore {m.title}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

type HeroSlide = {
  id: string;
  image: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaTo: "/shop/$productId";
  ctaParams: { productId: string };
  number: string;
};

function PremiumPerfumeHero({
  slides,
  autoPlayMs = 5000,
}: {
  slides: HeroSlide[];
  autoPlayMs?: number;
}) {
  const [order, setOrder] = useState<number[]>(slides.map((_, index) => index));
  const [isInteracting, setIsInteracting] = useState(false);
  const [showDecor, setShowDecor] = useState(false);
  const interactionTimerRef = useRef<number | null>(null);
  const previewStripRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = order[0] ?? 0;
  const activeSlide = slides[activeIndex];
  const previewIndexes = order.slice(1);

  const swapEase: [number, number, number, number] = [0.87, 0, 0.13, 1];

  const markInteraction = useCallback(() => {
    setIsInteracting(true);
    if (interactionTimerRef.current !== null) {
      window.clearTimeout(interactionTimerRef.current);
    }

    interactionTimerRef.current = window.setTimeout(() => {
      setIsInteracting(false);
      interactionTimerRef.current = null;
    }, 5000);
  }, []);

  const goNext = useCallback(() => {
    setOrder((prev) => {
      if (prev.length <= 1) return prev;
      return [...prev.slice(1), prev[0]];
    });
  }, []);

  const goPrev = useCallback(() => {
    setOrder((prev) => {
      if (prev.length <= 1) return prev;
      return [prev[prev.length - 1], ...prev.slice(0, -1)];
    });
  }, []);

  const promoteSlide = useCallback((targetIndex: number) => {
    setOrder((prev) => {
      const targetPos = prev.indexOf(targetIndex);
      if (targetPos <= 0) return prev;
      return [...prev.slice(targetPos), ...prev.slice(0, targetPos)];
    });
  }, []);

  useEffect(() => {
    if (isInteracting || slides.length <= 1) return;

    const timer = window.setInterval(() => {
      goNext();
    }, autoPlayMs);

    return () => window.clearInterval(timer);
  }, [autoPlayMs, goNext, isInteracting, slides.length]);

  useEffect(() => {
    return () => {
      if (interactionTimerRef.current !== null) {
        window.clearTimeout(interactionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowDecor(true), 150);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Warm the active neighborhood first so the hero paints quickly.
    [activeSlide, ...previewIndexes.slice(0, 2).map((index) => slides[index])].forEach((slide) => {
      if (!slide) return;
      const img = new Image();
      img.src = slide.image;
    });
  }, [activeSlide, previewIndexes, slides]);

  useEffect(() => {
    if (!previewStripRef.current) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    previewStripRef.current.scrollTo({ left: 0, behavior: "auto" });
  }, [activeIndex]);

  if (!activeSlide) return null;

  return (
    <section
      className="relative h-[100svh] w-screen overflow-hidden bg-[#1f1915] text-ivory"
      onPointerDown={markInteraction}
      onTouchStart={markInteraction}
    >
      <LayoutGroup>
        <motion.div
          key={`active-wrap-${activeSlide.id}`}
          className="absolute inset-0 z-0"
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: swapEase }}
          style={{ willChange: "opacity, transform" }}
        >
          <motion.div
            layoutId={`hero-image-${activeSlide.id}`}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeSlide.image})` }}
            transition={{ duration: 1.2, ease: swapEase }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/68 via-black/44 to-black/28" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_24%,rgba(255,255,255,0.08),transparent_42%)]" />

        <motion.div
          className="relative z-10 h-full"
          drag="x"
          dragElastic={0.08}
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={markInteraction}
          onDragEnd={(_, info) => {
            const swipe = info.offset.x + info.velocity.x * 120;
            if (swipe < -120) {
              markInteraction();
              goNext();
              return;
            }
            if (swipe > 120) {
              markInteraction();
              goPrev();
            }
          }}
        >
          <div className="flex h-full items-center px-5 md:px-10 lg:px-16 pt-24 md:pt-28 pb-44 md:pb-48">
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={`content-${activeSlide.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                className="max-w-3xl px-5 py-6 md:px-6 md:py-7 md:bg-brown/18 md:backdrop-blur-[1.5px] md:ring-1 md:ring-ivory/10 md:rounded-sm"
              >
                <p className="eyebrow text-[0.68rem] md:text-[0.75rem] tracking-[0.3em] text-gold/95 mb-5">
                  Perfume Oils · {activeSlide.number}
                </p>
                <h1
                  className="text-[clamp(2.2rem,6.5vw,5.4rem)] leading-[1.02] tracking-[-0.02em] text-ivory"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {activeSlide.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="serif-italic text-gold">
                    {activeSlide.title.split(" ").slice(-1).join(" ")}
                  </span>
                </h1>
                <p className="mt-6 text-ivory/90 text-[0.98rem] md:text-lg max-w-xl leading-relaxed">
                  {activeSlide.description}
                </p>
                <div className="mt-8">
                  <Link
                    to={activeSlide.ctaTo}
                    params={activeSlide.ctaParams}
                    className="inline-flex items-center gap-2 bg-terracotta text-ivory px-7 py-4 eyebrow tracking-[0.18em] hover:bg-gold hover:text-brown transition-colors"
                  >
                    {activeSlide.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div
          className={`absolute bottom-6 left-4 right-4 md:left-8 md:right-8 lg:left-10 lg:right-10 z-20 rounded-2xl border border-ivory/20 bg-black/28 backdrop-blur-xl shadow-[0_24px_56px_-35px_rgba(0,0,0,0.85)] px-3 py-3 md:px-5 md:py-4 transition-opacity duration-300 ${showDecor ? "opacity-100" : "opacity-0"}`}
        >
          <div
            ref={previewStripRef}
            className="flex items-center gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {previewIndexes.map((slideIndex) => {
              const slide = slides[slideIndex];
              return (
                <motion.button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    markInteraction();
                    promoteSlide(slideIndex);
                  }}
                  className="relative snap-start h-[92px] w-[140px] md:h-[98px] md:w-[154px] shrink-0 rounded-xl overflow-hidden border border-ivory/20 bg-black/20"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <motion.div
                    layoutId={`hero-image-${slide.id}`}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})`, willChange: "transform, opacity" }}
                    transition={{ duration: 1.2, ease: swapEase }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/34 to-transparent" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </LayoutGroup>
    </section>
  );
}

function EditorialCard({
  p,
  index,
  total,
  reverse,
}: {
  p: Product;
  index: number;
  total: number;
  reverse: boolean;
}) {
  const { add, setOpen } = useCart();
  const idx = String(index).padStart(2, "0");
  const tot = String(Math.max(total, 2)).padStart(2, "0");
  const Header = (
    <div>
      <p className="eyebrow text-gold text-[0.55rem] md:text-[0.7rem] mb-2 md:mb-6">
        {idx} <span className="text-brown/40">/ {tot}</span>
      </p>
      <h3
        className="text-brown text-2xl sm:text-4xl md:text-6xl leading-[1.02] tracking-tight"
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
      <p className="eyebrow text-brown/60 text-[0.55rem] md:text-xs mt-1.5 md:mt-4">Perfume Oil</p>
      <p className="mt-2 md:mt-6 text-brown/75 text-[0.7rem] md:text-lg leading-snug md:leading-relaxed serif-italic max-w-md">
        {p.feeling}
      </p>
    </div>
  );
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="space-y-10 md:space-y-14"
    >
      <div className="grid grid-cols-12 gap-3 md:gap-12 items-stretch">
        {/* Details */}
        <div className={`col-span-5 ${reverse ? "order-2" : "order-1"}`}>
          {Header}

          <p
            className="mt-4 md:mt-8 text-brown text-base md:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            KSh {p.price.toLocaleString()}
          </p>

          <button
            type="button"
            onClick={() => {
              add({ id: p.id, name: p.name, price: p.price, image: p.image });
              setOpen(true);
            }}
            className="mt-3 md:mt-6 w-full inline-flex items-center justify-center gap-2 bg-brown text-ivory text-[0.6rem] md:text-xs tracking-[0.18em] md:tracking-[0.22em] uppercase px-4 md:px-10 py-2.5 md:py-4 hover:bg-terracotta transition-colors"
          >
            Add to Cart <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
          </button>

          <div className="mt-5 md:mt-10">
            <p className="eyebrow text-gold text-[0.55rem] md:text-[0.65rem] mb-3 md:mb-5">
              Scent Notes
            </p>
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {(["top", "heart", "base"] as const).map((tier, i) => {
                const Icon = NOTE_ICONS[i];
                const label = tier.toUpperCase();
                const value = p.notes[tier]?.[0] ?? "";
                return (
                  <div
                    key={tier}
                    className={`flex flex-col items-center text-center px-0.5 md:px-2 ${i < 2 ? "border-r border-brown/10" : ""}`}
                  >
                    <span className="flex items-center justify-center w-8 h-8 md:w-16 md:h-16 rounded-full bg-cream mb-1.5 md:mb-3">
                      <Icon className="w-3.5 h-3.5 md:w-7 md:h-7 text-gold" strokeWidth={1.25} />
                    </span>
                    <span className="eyebrow text-gold text-[0.5rem] md:text-[0.65rem] mb-0.5 md:mb-1.5">
                      {label}
                    </span>
                    <span
                      className="text-brown text-[0.6rem] md:text-base leading-tight md:leading-snug break-words"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-brown/10">
            <p className="eyebrow text-gold text-[0.55rem] md:text-[0.65rem] mb-1.5 md:mb-2">
              About {p.name}
            </p>
            <p className="text-brown/75 text-[0.65rem] md:text-sm leading-relaxed">
              {ABOUT[p.id] ?? p.feeling}
            </p>
          </div>
        </div>

        <Link
          to="/shop/$productId"
          params={{ productId: p.id }}
          className={`col-span-7 ${reverse ? "order-1" : "order-2"} group relative block overflow-hidden bg-cream h-full min-h-[70vw] md:min-h-[560px] rounded-xl md:rounded-3xl`}
        >
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.04]"
          />
          {p.bestseller && (
            <span className="absolute top-2 left-2 md:top-6 md:left-6 eyebrow text-[0.5rem] md:text-[0.625rem] bg-ivory/90 backdrop-blur-sm text-brown px-2 py-1 md:px-3 md:py-1.5">
              Bestseller
            </span>
          )}
        </Link>
      </div>

      {/* Scent attributes — full-width stretch */}
      <ScentAttributes p={p} />

      {/* Available In — full-width row */}
      <div>
        <p className="eyebrow text-gold text-[0.55rem] md:text-[0.65rem] mb-3 md:mb-4">
          Available in
        </p>
        <ul className="grid grid-cols-3 gap-1.5 md:gap-3">
          {p.availableIn.slice(0, 3).map((f) => {
            const price = FORMAT_PRICE[f] ?? p.price;
            const name = f === "perfume-oil" ? p.name : `${p.name} ${FORMAT_LABEL[f]}`;
            return (
              <li key={f}>
                <button
                  type="button"
                  onClick={() => {
                    add({ id: `${p.id}-${f}`, name, price, image: p.image });
                    setOpen(true);
                  }}
                  className="w-full h-full flex items-center gap-1.5 md:gap-3 border border-brown/15 bg-cream/40 rounded-lg p-1.5 md:p-3 text-left hover:border-brown/40 hover:bg-cream transition-colors"
                >
                  <span className="block w-9 h-9 md:w-16 md:h-16 shrink-0 overflow-hidden rounded-md bg-cream">
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span
                      className="block text-brown text-[0.6rem] md:text-base truncate"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {FORMAT_ML[f]}
                    </span>
                    <span className="block text-brown/60 text-[0.55rem] md:text-sm truncate">
                      {FORMAT_LABEL[f]}
                    </span>
                    <span className="block text-brown text-[0.55rem] md:text-sm mt-0.5 truncate">
                      KSh {price.toLocaleString()}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Complete The Ritual */}
      <RitualRow p={p} />

      {/* You may also like */}
      <YouMayAlsoLike currentId={p.id} />
    </motion.article>
  );
}

const RITUAL_FORMATS: Format[] = [
  "shower-gel",
  "body-lotion",
  "body-butter",
  "nourishing-body-oil",
  "dry-body-oil",
  "perfume-oil",
];

const FORMAT_PRICE: Record<Format, number> = {
  "shower-gel": 3600,
  "body-lotion": 4200,
  "body-butter": 4800,
  "nourishing-body-oil": 4800,
  "dry-body-oil": 4800,
  "perfume-oil": 4800,
};

function ScentAttributes({ p }: { p: Product }) {
  const items = [
    { Icon: Heart, label: "Mood", value: MOOD_LABEL[p.mood] },
    { Icon: BarChart3, label: "Intensity", value: p.intensity },
    { Icon: Moon, label: "Best For", value: p.bestFor },
    { Icon: Flower2, label: "Fragrance Family", value: fragranceFamily(p) },
    { Icon: Clock, label: "Longevity", value: LONGEVITY[p.intensity] ?? "8+ Hours" },
  ];
  return (
    <div className="mt-6 pt-6 border-t border-brown/10">
      <div className="-mx-5 md:mx-0 overflow-x-auto md:overflow-visible scrollbar-none">
        <div className="inline-flex md:grid md:grid-cols-5 gap-0 md:gap-3 bg-cream/60 md:rounded-2xl px-3 md:p-4 min-w-full">
          {items.map(({ Icon, label, value }, i) => (
            <div
              key={label}
              className={`shrink-0 w-[38vw] sm:w-44 md:w-auto flex flex-col items-center text-center px-3 py-4 md:py-3 ${
                i < items.length - 1 ? "border-r border-brown/10" : ""
              }`}
            >
              <Icon className="w-6 h-6 text-gold mb-2.5" strokeWidth={1.25} />
              <span className="eyebrow text-gold text-[0.6rem] mb-1.5">{label}</span>
              <span
                className="text-brown text-sm leading-snug whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RitualRow({ p }: { p: Product }) {
  const { add, setOpen } = useCart();
  const items = RITUAL_FORMATS.filter((f) => p.availableIn.includes(f)).slice(0, 4);
  if (items.length === 0) return null;
  return (
    <div className="pt-6 md:pt-14 border-t border-brown/10">
      <p className="eyebrow text-gold text-[0.55rem] md:text-[0.7rem] mb-2 md:mb-3">
        Complete The Ritual
      </p>
      <p className="text-brown text-[0.7rem] md:text-lg leading-snug md:leading-relaxed mb-4 md:mb-8">
        Layer <span className="text-brown font-medium">{p.name}</span>{" "}
        <span className="text-brown/75">
          for a longer lasting, more immersive scent experience.
        </span>
      </p>
      <div className="grid grid-cols-4 gap-1.5 md:gap-5">
        {items.map((f) => {
          const name = `${p.name} ${FORMAT_LABEL[f]}`;
          const price = FORMAT_PRICE[f];
          return (
            <div
              key={f}
              className="bg-cream/40 border border-brown/10 rounded-lg md:rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="aspect-square overflow-hidden bg-cream">
                <img
                  src={p.image}
                  alt={name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 md:p-5 flex items-end justify-between gap-1.5 md:gap-3 flex-1">
                <div className="min-w-0">
                  <p
                    className="text-brown text-[0.6rem] md:text-base leading-snug break-words"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {name}
                  </p>
                  <p className="text-brown/70 text-[0.55rem] md:text-sm mt-1 md:mt-2">
                    KSh {price.toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Add ${name} to cart`}
                  onClick={() => {
                    add({
                      id: `${p.id}-${f}`,
                      name,
                      price,
                      image: p.image,
                      variant: FORMAT_LABEL[f],
                    });
                    setOpen(true);
                  }}
                  className="shrink-0 w-6 h-6 md:w-9 md:h-9 rounded-full bg-brown text-ivory inline-flex items-center justify-center hover:bg-terracotta transition-colors"
                >
                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function YouMayAlsoLike({ currentId }: { currentId: string }) {
  const items = perfumeOils.filter((o) => o.id !== currentId).slice(0, 4);
  if (items.length === 0) return null;
  return (
    <div className="pt-6 md:pt-14 border-t border-brown/10">
      <p className="eyebrow text-gold text-[0.55rem] md:text-[0.7rem] mb-3 md:mb-8">
        You May Also Like
      </p>
      <div className="grid grid-cols-4 gap-1.5 md:gap-5">
        {items.map((o) => (
          <Link
            key={o.id}
            to="/shop/$productId"
            params={{ productId: o.id }}
            className="group relative block aspect-[5/4] overflow-hidden rounded-lg md:rounded-2xl bg-cream"
          >
            <img
              src={o.image}
              alt={`${o.name} Perfume Oil`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-brown/70 via-brown/30 to-transparent" />
            <div className="absolute inset-0 p-1.5 md:p-5 flex flex-col justify-center items-end text-right">
              <p
                className="text-ivory text-[0.6rem] md:text-xl leading-tight max-w-[80%] md:max-w-[60%]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {o.name}
                <br />
                <span className="text-ivory/90">Perfume Oil</span>
              </p>
              <p
                className="text-ivory/90 text-[0.55rem] md:text-base mt-1 md:mt-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                KSh {o.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
