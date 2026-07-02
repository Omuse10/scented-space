import { motion } from "framer-motion";

/**
 * A quiet pause between cinematic moments.
 * One sentence. Generous whitespace. No image. No CTA.
 * The reader should slow down here.
 */
export function Manifesto() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-5xl px-5 md:px-10 py-28 md:py-40 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <span className="hairline mx-auto block mb-8" />
          <span className="eyebrow text-brown/60">A House Note</span>
          <p
            className="mt-10 text-brown leading-[1.2] tracking-[-0.015em]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(1.75rem, 4.4vw, 3.25rem)",
            }}
          >
            Fragrance is not what you wear.
            <br />
            <span className="serif-italic text-terracotta">
              It is the room you carry with you.
            </span>
          </p>
          <span className="hairline mx-auto block mt-12" />
        </motion.div>
      </div>
    </section>
  );
}
