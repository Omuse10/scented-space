import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import aboutImg from "@/assets/founder.jpg";

export function AboutTeaser() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-32 grid md:grid-cols-12 gap-10 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-6 relative aspect-[4/5] md:aspect-[5/6] overflow-hidden rounded-2xl"
        >
          <img
            src={aboutImg}
            alt="Warm natural light across the skin — a quiet moment from The Scented Space"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/30 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
          className="md:col-span-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-gold/60" />
            <span className="eyebrow text-gold text-[0.65rem] tracking-[0.3em]">Our Story</span>
          </div>
          <h2
            className="text-brown text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.04] tracking-[-0.025em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            About The <span className="serif-italic">Scented Space.</span>
          </h2>
          <p className="mt-7 text-brown/75 leading-[1.85] md:text-lg max-w-xl">
            We believe fragrance lives best on prepared skin. Every product is composed slowly,
            in small batches, to be layered — cleanse, hydrate, seal, scent — so the trail you
            leave is quietly, unmistakably yours.
          </p>
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-3 border border-brown/70 text-brown px-7 py-3.5 eyebrow text-[0.65rem] tracking-[0.3em] hover:bg-brown hover:text-ivory transition-colors"
          >
            Discover Our Story
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
