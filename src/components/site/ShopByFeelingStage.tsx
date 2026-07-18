import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import warmImg from "@/assets/mood-warm.jpg";
import radiantImg from "@/assets/mood-radiant.jpg";
import boldImg from "@/assets/mood-bold.jpg";
import refinedImg from "@/assets/mood-refined.jpg";

// ---------- Edit mood content here ----------
export type StageMood = {
  key: string;
  numeral: string; // "01"
  eyebrow: string; // "MOOD I"
  title: string;
  tagline: string;
  pills: string[];
  image: string;
  hash: string; // anchor on /perfume-oils
};

const MOODS: StageMood[] = [
  {
    key: "warm",
    numeral: "01",
    eyebrow: "Mood I",
    title: "Warm & Indulgent",
    tagline: "Skin you'll never want to wash off.",
    pills: ["Nahla", "Alina", "Samara", "Zafira"],
    image: warmImg,
    hash: "warm",
  },
  {
    key: "radiant",
    numeral: "02",
    eyebrow: "Mood II",
    title: "Radiant & Feminine",
    tagline: "Sunlight through a linen curtain.",
    pills: ["Whispering Petals", "Théa", "Riviera Dreams", "Lyra"],
    image: radiantImg,
    hash: "radiant",
  },
  {
    key: "bold",
    numeral: "03",
    eyebrow: "Mood III",
    title: "Bold & Magnetic",
    tagline: "A trail rather than a whisper.",
    pills: ["Velvet Elegance", "Sensual Whispers", "Carmine Temptations", "Aurielle"],
    image: boldImg,
    hash: "bold",
  },
  {
    key: "smoked",
    numeral: "04",
    eyebrow: "Mood IV",
    title: "Smoked & Intimate",
    tagline: "The last ember before sleep.",
    pills: ["Emberwood", "Noir Hour", "Ash & Musk", "Toba"],
    image: refinedImg,
    hash: "refined",
  },
  {
    key: "still",
    numeral: "05",
    eyebrow: "Mood V",
    title: "Still & Untouched",
    tagline: "Held in glass, waiting.",
    pills: ["Quiet Gold", "Suspension", "Lumen", "Vesper"],
    image: refinedImg,
    hash: "distinguished",
  },
];

const AUTOPLAY_MS = 5000;

export function ShopByFeelingStage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [order, setOrder] = useState<number[]>(() => MOODS.map((_, i) => i));
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const active = MOODS[activeIdx];
  const thumbnails = order.filter((i) => i !== activeIdx);

  const goTo = useCallback((idx: number) => {
    setActiveIdx((prev) => {
      if (prev === idx) return prev;
      // Move previously-active into the thumbnail slot where the clicked one was.
      setOrder((ord) => {
        const next = [...ord];
        const a = next.indexOf(prev);
        const b = next.indexOf(idx);
        if (a !== -1 && b !== -1) [next[a], next[b]] = [next[b], next[a]];
        return next;
      });
      return idx;
    });
    setProgress(0);
    startRef.current = performance.now();
  }, []);

  const advance = useCallback(() => {
    const nextIdx = (activeIdx + 1) % MOODS.length;
    goTo(nextIdx);
  }, [activeIdx, goTo]);

  const goPrev = useCallback(() => {
    const prevIdx = (activeIdx - 1 + MOODS.length) % MOODS.length;
    goTo(prevIdx);
  }, [activeIdx, goTo]);

  // Swipe gesture state (touch)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) advance();
    else goPrev();
  };

  // Autoplay timer (rAF-driven progress)
  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    startRef.current = performance.now() - progress * AUTOPLAY_MS;
    const tick = (now: number) => {
      const p = Math.min(1, (now - startRef.current) / AUTOPLAY_MS);
      setProgress(p);
      if (p >= 1) {
        advance();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, activeIdx]);

  return (
    <section data-tour="mood-filter" className="bg-[#150E08]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-12 py-11 md:py-15 lg:py-16">
        {/* Header */}
        <div className="text-center mb-7 md:mb-11">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-6 md:w-8 bg-[#C9A36A]/60" />
            <span className="eyebrow text-[0.65rem] md:text-[0.7rem] text-[#C9A36A] tracking-[0.3em]">
              Shop By Feeling
            </span>
            <span className="h-px w-6 md:w-8 bg-[#C9A36A]/60" />
          </div>
          <h2
            className="text-[#F4ECE0] text-[2.25rem] leading-[1.05] md:text-[3rem] lg:text-[3.75rem] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find the fragrance that{" "}
            <span className="italic text-[#F4ECE0]/85">matches your mood.</span>
          </h2>
        </div>

        {/* Stage */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl ring-1 ring-[#C9A36A]/15 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] h-[540px] sm:h-[600px] lg:h-[520px] xl:h-[580px] touch-pan-y select-none"
        >
          {/* Crossfading background images */}
          <AnimatePresence>
            <motion.div
              key={active.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={active.image}
                alt={active.title}
                className="absolute inset-0 w-full h-full object-cover object-[center_24%] lg:object-[center_32%] xl:object-[center_28%]"
              />
              {/* Gradient overlays — full-bleed on all viewports */}
              <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#150E08]/85 via-[#150E08]/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#150E08] via-[#150E08]/55 to-[#150E08]/10 lg:via-[#150E08]/20" />
            </motion.div>
          </AnimatePresence>

          {/* Content overlay */}
          <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-8 md:p-10 lg:p-11 pb-24 sm:pb-26 md:pb-26 lg:pb-18">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xl"
              >
                {/* Eyebrow numbering */}
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <span className="eyebrow text-[0.65rem] md:text-[0.7rem] tabular-nums text-[#C9A36A] tracking-[0.3em]">
                    {active.numeral}
                  </span>
                  <span className="h-px w-6 md:w-8 bg-[#C9A36A]/70" />
                  <span className="eyebrow text-[0.6rem] md:text-[0.65rem] text-[#C9A36A] tracking-[0.3em] uppercase">
                    {active.eyebrow}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="italic text-[#F4ECE0] text-[2.1rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.7rem] leading-[0.98] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {active.title}
                </h3>

                {/* Tagline */}
                <p
                  className="italic text-[#F4ECE0]/65 mt-3 md:mt-4 text-base md:text-lg lg:text-lg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {active.tagline}
                </p>

                {/* Pills — hidden on mobile/tablet */}
                <ul className="hidden lg:grid mt-6 grid-cols-2 gap-x-3 gap-y-2 max-w-md">
                  {active.pills.map((p) => (
                    <li key={p}>
                      <span className="block text-center eyebrow text-[0.65rem] tracking-[0.22em] text-[#F4ECE0]/90 border border-[#F4ECE0]/30 rounded-full px-3 py-1.5 backdrop-blur-[2px]">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to="/perfume-oils"
                  hash={active.hash}
                  className="hidden sm:inline-flex mt-6 md:mt-8 h-11 md:h-12 items-center gap-2.5 px-6 rounded-full border border-[#F4ECE0]/80 text-[#F4ECE0] eyebrow text-[0.65rem] tracking-[0.28em] uppercase transition-all duration-500 hover:bg-[#F4ECE0] hover:text-[#150E08] active:scale-[0.98]"
                >
                  Explore Collection
                  <svg width="18" height="9" viewBox="0 0 22 10" fill="none">
                    <path d="M0 5h20m0 0L16 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile bottom bar: compact CTA + larger thumbnails */}
          <div className="sm:hidden absolute z-20 inset-x-0 bottom-14 px-5 flex items-end justify-between">
            <Link
              to="/perfume-oils"
              hash={active.hash}
              className="inline-flex h-9 items-center gap-2 px-4 rounded-full border border-[#F4ECE0]/80 text-[#F4ECE0] eyebrow text-[0.6rem] tracking-[0.22em] uppercase transition-all duration-500 hover:bg-[#F4ECE0] hover:text-[#150E08] active:scale-[0.98] whitespace-nowrap"
            >
              Explore
              <svg width="14" height="7" viewBox="0 0 22 10" fill="none">
                <path d="M0 5h20m0 0L16 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </Link>
            <div className="flex -space-x-2">
              <AnimatePresence initial={false}>
                {thumbnails.map((idx) => {
                  const m = MOODS[idx];
                  return (
                    <motion.button
                      key={m.key}
                      layout
                      initial={{ opacity: 0, y: 12, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => goTo(idx)}
                      aria-label={`Switch to ${m.title}`}
                      className="group relative overflow-hidden rounded-lg shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] ring-1 ring-[#F4ECE0]/25 hover:ring-[#C9A36A]/60 hover:z-10 transition w-[54px] h-[78px]"
                    >
                      <img
                        src={m.image}
                        alt={m.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#150E08]/85 via-[#150E08]/10 to-transparent" />
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Thumbnail stack — scattered on tablet, spaced on desktop */}
          <div className="hidden sm:flex absolute z-20 right-3 sm:right-5 lg:right-8 bottom-16 sm:bottom-20 lg:bottom-24 lg:gap-3 -space-x-4 sm:-space-x-5 lg:space-x-0">
            <AnimatePresence initial={false}>
              {thumbnails.map((idx) => {
                const m = MOODS[idx];
                return (
                  <motion.button
                    key={m.key}
                    layout
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => goTo(idx)}
                    aria-label={`Switch to ${m.title}`}
                    className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] ring-1 ring-[#F4ECE0]/25 hover:ring-[#C9A36A]/60 hover:z-10 transition w-[46px] h-[66px] sm:w-[54px] sm:h-[78px] lg:w-[84px] lg:h-[118px]"
                  >
                    <img
                      src={m.image}
                      alt={m.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#150E08]/85 via-[#150E08]/10 to-transparent" />
                    <span className="hidden md:block absolute inset-x-0 bottom-1.5 text-center eyebrow text-[0.55rem] tracking-[0.18em] text-[#F4ECE0]/95 uppercase px-1 truncate">
                      {m.title.split(" ")[0]}
                    </span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Progress bar + controls */}
          <div className="absolute z-20 inset-x-0 bottom-0 px-4 sm:px-6 md:px-10 pb-4 md:pb-5">
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="shrink-0 grid place-items-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-[#F4ECE0]/40 text-[#F4ECE0] hover:bg-[#F4ECE0] hover:text-[#150E08] transition"
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <div className="flex-1 h-px bg-[#F4ECE0]/15 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-[#C9A36A]"
                  style={{
                    width: `${progress * 100}%`,
                    transition: playing ? "none" : "width 0.2s linear",
                  }}
                />
              </div>
              <span className="shrink-0 eyebrow text-[0.65rem] tabular-nums text-[#F4ECE0]/80 tracking-[0.25em]">
                {active.numeral} / {String(MOODS.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
