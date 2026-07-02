import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import discoveryImg from "@/assets/product-discovery.jpg";

export function DiscoveryFeature() {
  return (
    <section className="bg-brown text-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-24 md:py-32 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-6 relative aspect-[5/6] overflow-hidden bg-brown/40"
        >
          <img
            src={discoveryImg}
            alt="The Discovery Set"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="md:col-span-5 md:col-start-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="hairline" style={{ background: "rgba(232,193,108,0.5)" }} />
            <span className="eyebrow text-gold">Discovery Set</span>
          </div>
          <h2 className="display-lg text-ivory">
            Not sure where to begin?
            <br />
            <span className="serif-italic text-gold">Discover five signature scents.</span>
          </h2>
          <p className="mt-6 text-ivory/75 leading-relaxed md:text-lg max-w-lg">
            Five 3ml fragrance oils, presented in a linen-lined keepsake — the
            quietest, most considered way to meet the house.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/shop/$productId"
              params={{ productId: "discovery-set" }}
              className="inline-flex justify-center items-center bg-ivory text-brown px-8 py-4 eyebrow hover:bg-gold transition-colors"
            >
              Shop Discovery Set
            </Link>
            <Link
              to="/shop"
              className="inline-flex justify-center items-center border border-ivory/40 text-ivory px-8 py-4 eyebrow hover:bg-ivory/10 transition-colors"
            >
              Explore All
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
