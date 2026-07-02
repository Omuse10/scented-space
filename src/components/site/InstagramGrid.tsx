import { motion } from "framer-motion";
import warm from "@/assets/mood-warm.jpg";
import radiant from "@/assets/mood-radiant.jpg";
import bold from "@/assets/mood-bold.jpg";
import refined from "@/assets/mood-refined.jpg";
import nahla from "@/assets/product-nahla.jpg";
import velvet from "@/assets/product-velvet.jpg";

const tiles = [warm, radiant, bold, refined, nahla, velvet];

export function InstagramGrid() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="hairline" />
              <span className="eyebrow">From the Studio</span>
            </div>
            <h2 className="display-lg text-brown">
              <span className="serif-italic">@thescentedspace</span>
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="eyebrow text-terracotta border-b border-terracotta/40 pb-1 hover:border-terracotta transition-colors self-start md:self-end"
          >
            Follow on Instagram →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {tiles.map((src, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              className="relative aspect-square overflow-hidden bg-cream group"
              aria-label="View on Instagram"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/15 transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
