import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";

export function Concierge() {
  const { whatsappHref } = useCart();
  return (
    <section id="concierge" className="bg-ivory">
      <div className="mx-auto max-w-4xl px-5 md:px-10 py-24 md:py-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="hairline" />
            <span className="eyebrow">The Concierge</span>
            <span className="hairline" />
          </div>
          <h2 className="display-lg text-brown">
            Not sure where to <span className="serif-italic">begin?</span>
          </h2>
          <p className="mt-6 text-brown/75 leading-relaxed max-w-xl mx-auto md:text-lg">
            Tell us a little about the woman you are scenting — the mood, the
            moment, the season. We will compose a quiet recommendation, just for you.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 bg-terracotta text-ivory px-10 py-4 eyebrow hover:bg-brown transition-colors"
          >
            Start a Conversation
            <span aria-hidden>→</span>
          </a>
          <p className="mt-5 text-xs text-brown/55 tracking-wider">
            Via WhatsApp · Personal · Unhurried
          </p>
        </motion.div>
      </div>
    </section>
  );
}
