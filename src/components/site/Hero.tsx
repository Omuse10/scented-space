import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/arm-perfume.jpg";

export function Hero() {
  return (
    <section id="top" data-tour="hero-section" className="relative min-h-[100svh] w-full overflow-hidden bg-brown">
      <motion.img
        src={heroImg}
        alt="A woman in warm natural light, anointing her skin with fragrance oil"
        width={1280}
        height={1600}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] md:object-[72%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/40 to-brown/30 md:bg-gradient-to-r md:from-brown/80 md:via-brown/30 md:to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 min-h-[100svh] flex flex-col justify-end md:justify-center pb-12 md:pb-0 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="max-w-xl md:max-w-2xl md:bg-brown/18 md:backdrop-blur-[1.5px] md:ring-1 md:ring-ivory/10 md:rounded-sm md:px-6 md:py-7"
        >
          <div className="flex items-center gap-3 text-ivory/80 mb-5 md:mb-8">
            <span className="hairline" />
            <span className="eyebrow text-ivory/80 text-[0.625rem] md:text-xs">Est. 2023 — Nairobi</span>
          </div>
          <h1 className="display-xl text-ivory text-[3.25rem] leading-[0.95] md:text-inherit md:leading-inherit md:max-w-[11ch]">
            Beautifully
            <br />
            <span className="serif-italic text-gold">Scented Skin.</span>
          </h1>
          <p className="mt-5 md:mt-8 text-ivory/88 text-[0.95rem] md:text-lg max-w-md leading-relaxed">
            Luxury perfume oils and body rituals designed to scent the skin beautifully.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/rituals"
              className="group inline-flex justify-center items-center gap-2 bg-ivory text-brown px-7 py-[18px] eyebrow text-[0.7rem] hover:bg-gold hover:text-brown transition-colors"
            >
              Shop The Rituals
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/perfume-oils"
              className="group inline-flex justify-center items-center gap-2 border border-ivory/40 text-ivory px-7 py-[18px] eyebrow text-[0.7rem] hover:bg-ivory/10 hover:border-ivory transition-colors"
            >
              Shop Perfume Oils
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 right-5 md:right-10 hidden md:flex items-center gap-3 text-ivory/60"
      >
        <span className="eyebrow text-ivory/60 text-[0.625rem]">Scroll</span>
        <span className="hairline" style={{ background: "rgba(248,243,234,0.4)" }} />
      </motion.div>
    </section>
  );
}
