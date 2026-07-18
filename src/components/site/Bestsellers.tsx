import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { bestsellers } from "@/lib/products";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export function Bestsellers({ variant = "grid" }: { variant?: "grid" | "carousel" } = {}) {
  const items = bestsellers();
  const isCarousel = variant === "carousel";
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10 py-14 md:py-24">
        {isCarousel ? (
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-4 mb-5 md:mb-6">
              <span className="h-px w-10 md:w-14 bg-terracotta/60" />
              <span className="eyebrow text-terracotta">Best Sellers</span>
              <span className="h-px w-10 md:w-14 bg-terracotta/60" />
            </div>
            <h2 className="display-lg text-brown">Our Most Loved</h2>
            <p className="mt-4 md:mt-5 text-brown/75 text-sm md:text-base max-w-lg mx-auto">
              Discover the fragrances our customers can't stop choosing.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 md:mb-20">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <span className="hairline" />
                <span className="eyebrow">Bestsellers</span>
              </div>
              <h2 className="display-lg text-brown">
                Most <span className="serif-italic">reached for.</span>
              </h2>
            </div>
            <Link
              to="/perfume-oils"
              className="eyebrow text-terracotta border-b border-terracotta/40 pb-1 hover:border-terracotta transition-colors self-start md:self-end"
            >
              View all perfume oils →
            </Link>
          </div>
        )}

        {isCarousel ? (
          <Coverflow items={items} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
            {items.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              >
                <Link
                  to="/shop/$productId"
                  params={{ productId: p.id }}
                  className="group block"
                >
                  <div className="relative overflow-hidden bg-ivory aspect-[4/5] mb-3 md:mb-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3
                    className="text-brown text-base md:text-xl leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-brown/55 text-[0.7rem] md:text-xs mt-1.5 serif-italic line-clamp-1">
                    {p.noteSummary}
                  </p>
                  <p className="text-brown/75 text-[0.8rem] md:text-sm mt-2 tracking-wider">
                    KSh {p.price.toLocaleString()}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

type CoverItem = ReturnType<typeof bestsellers>[number];

function Coverflow({ items }: { items: CoverItem[] }) {
  const loopedItems = [...items, ...items, ...items];
  const initialIndex = items.length + Math.floor(items.length / 2); // center on middle original item

  const [emblaRef, embla] = useEmblaCarousel({
    align: "center",
    loop: true,
    containScroll: false,
    startIndex: initialIndex,
    duration: 60,
    draggable: true,
    dragFree: false,
    dragThreshold: 6,
    skipSnaps: false,
    watchDrag: true,
  });
  const [selected, setSelected] = useState(initialIndex);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  const scrollTo = (i: number) => {
    if (!embla) return;
    const copy = Math.floor(selected / items.length);
    embla.scrollTo(copy * items.length + i);
  };

  const distanceFrom = (i: number) => {
    const d = Math.abs(i - selected);
    return Math.min(d, loopedItems.length - d);
  };

  const activeOriginalIndex = selected % items.length;

  return (
    <div className="relative">
      {/* Prev / Next */}
      <button
        type="button"
        aria-label="Previous"
        onClick={() => embla?.scrollPrev()}
        className="hidden md:grid absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 place-items-center rounded-full bg-ivory/95 text-brown shadow-[0_8px_24px_-12px_rgba(60,30,15,0.4)] hover:bg-ivory transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => embla?.scrollNext()}
        className="hidden md:grid absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 place-items-center rounded-full bg-ivory/95 text-brown shadow-[0_8px_24px_-12px_rgba(60,30,15,0.4)] hover:bg-ivory transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="overflow-hidden -mx-5 md:-mx-10 py-2 md:py-3" ref={emblaRef}>
        <ul className="flex items-center will-change-transform">
          {loopedItems.map((p, i) => {
            const distance = distanceFrom(i);
            const isActive = distance === 0;

            const config =
              distance === 0
                ? {
                    basis: "basis-[36%] sm:basis-[36%] md:basis-[36%] lg:basis-[36%]",
                    margin: "-mr-[8%] sm:-mr-[8%] md:-mr-[8%] lg:-mr-[8%]",
                    opacity: 1,
                    zIndex: 10,
                    blur: 0,
                    brightness: 1,
                    pointerEvents: "auto" as const,
                  }
                : distance === 1
                ? {
                    basis: "basis-[26%] sm:basis-[26%] md:basis-[26%] lg:basis-[26%]",
                    margin: "-mr-[8%] sm:-mr-[8%] md:-mr-[8%] lg:-mr-[8%]",
                    opacity: 1,
                    zIndex: 5,
                    blur: 0.5,
                    brightness: 0.9,
                    pointerEvents: "auto" as const,
                  }
                : distance === 2
                ? {
                    basis: "basis-[18%] sm:basis-[18%] md:basis-[18%] lg:basis-[18%]",
                    margin: "-mr-[8%] sm:-mr-[8%] md:-mr-[8%] lg:-mr-[8%]",
                    opacity: 1,
                    zIndex: 1,
                    blur: 2,
                    brightness: 0.75,
                    pointerEvents: "auto" as const,
                  }
                : {
                    basis: "basis-[18%] sm:basis-[18%] md:basis-[18%] lg:basis-[18%]",
                    margin: "-mr-[8%] sm:-mr-[8%] md:-mr-[8%] lg:-mr-[8%]",
                    opacity: 0,
                    zIndex: 0,
                    blur: 0,
                    brightness: 1,
                    pointerEvents: "none" as const,
                  };

            return (
              <li
                key={`${p.id}-${i}`}
                className={`relative shrink-0 grow-0 ${config.basis} ${config.margin} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]`}
                style={{
                  opacity: config.opacity,
                  zIndex: config.zIndex,
                  filter: config.blur === 0 ? "none" : `blur(${config.blur}px) saturate(0.9) brightness(${config.brightness})`,
                  pointerEvents: config.pointerEvents,
                }}
              >
                <Link
                  to="/shop/$productId"
                  params={{ productId: p.id }}
                  className="group block rounded-2xl overflow-hidden bg-ivory shadow-[0_18px_44px_-20px_rgba(60,30,15,0.5)]"
                >
                  <div className="relative overflow-hidden bg-cocoa aspect-[4/5]">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-103"
                    />
                  </div>
                  <div className="px-4 py-4 md:px-6 md:py-5 flex items-end justify-between gap-4 bg-ivory">
                    <div className="min-w-0">
                      <h3
                        className="text-brown text-xl md:text-[1.7rem] leading-tight truncate"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.name}
                      </h3>
                      <p className="text-terracotta/85 text-[0.7rem] md:text-sm mt-2 tracking-wide truncate">
                        {p.noteSummary}
                      </p>
                      <p className="text-brown/80 text-[0.75rem] md:text-[0.95rem] mt-2.5 tracking-wider">
                        KSh {p.price.toLocaleString()}
                      </p>
                    </div>
                    {isActive && (
                      <span
                        aria-hidden
                        className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-cocoa text-ivory grid place-items-center"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={
              "h-2 rounded-full transition-all duration-300 " +
              (i === activeOriginalIndex ? "w-6 bg-cocoa" : "w-2 bg-brown/25 hover:bg-brown/45")
            }
          />
        ))}
      </div>
    </div>
  );
}
