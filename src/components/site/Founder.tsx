import { motion } from "framer-motion";
import founderImg from "@/assets/founder.jpg";

export function Founder() {
  return (
    <section id="founder" className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-28 md:py-40 grid md:grid-cols-12 gap-14 md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 relative aspect-[4/5] overflow-hidden order-1 md:order-none"
        >
          <img
            src={founderImg}
            alt="Founder of The Scented Space"
            loading="lazy"
            width={1024}
            height={1280}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute top-5 left-5 eyebrow text-[0.625rem] bg-ivory/90 text-brown px-3 py-1.5">
            The Founder
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="md:col-span-6 md:col-start-7"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="hairline" />
            <span className="eyebrow text-brown/70">A Letter — Nairobi</span>
          </div>
          <h2 className="display-lg text-brown">
            Fragrance is where the story{" "}
            <span className="serif-italic text-terracotta">began.</span>
          </h2>
          <div className="mt-10 space-y-6 text-brown/80 leading-[1.8] max-w-xl">
            <p
              className="serif-italic text-brown/90"
              style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", lineHeight: 1.5 }}
            >
              I started The Scented Space because I wanted to bring more
              beauty, presence and intention into the everyday — and scent
              was the most honest place to begin.
            </p>
            <p>
              What you find here is not a fragrance line. It is a ritual
              house — composed slowly, in small batches, for the woman who
              already knows what quality feels like and is simply choosing
              what earns a place in her life.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <span className="hairline" />
            <p
              className="serif-italic text-terracotta"
              style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}
            >
              — The Founder
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
