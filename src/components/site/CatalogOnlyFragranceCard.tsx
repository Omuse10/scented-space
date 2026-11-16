import { motion } from "framer-motion";
import type { CatalogOnlyFragrance } from "@/lib/products";

export function CatalogOnlyFragranceCard({
  fragrance,
  index,
}: {
  fragrance: CatalogOnlyFragrance;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-ivory ring-1 ring-brown/10 shadow-[0_4px_20px_-12px_rgba(60,30,15,0.25)] transition-shadow duration-700 hover:shadow-[0_12px_36px_-16px_rgba(60,30,15,0.45)]"
    >
      <div
        role="img"
        aria-label={`Image coming soon for ${fragrance.name}`}
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-cream"
      >
        <span className="eyebrow text-[0.6rem] tracking-[0.25em] text-brown/40">
          Image coming soon
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <span className="eyebrow text-[0.6rem] tracking-[0.25em] text-gold">Perfume Oil</span>
        <h3
          className="text-brown text-lg leading-tight sm:text-xl md:text-[1.4rem]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {fragrance.name}
        </h3>
        <div className="mt-auto border-t border-brown/10 pt-3">
          <p className="eyebrow mb-1.5 text-[0.6rem] tracking-[0.28em] text-gold">Inspired by</p>
          <p className="text-brown/75 text-[0.8rem] leading-relaxed sm:text-sm">
            {fragrance.inspiredBy}
            <span className="block">{fragrance.inspiredByBrand}</span>
          </p>
        </div>
      </div>
    </motion.article>
  );
}
