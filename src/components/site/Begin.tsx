import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { WHATSAPP_HREF_BASE } from "@/lib/cart";

const doorways = [
  {
    eyebrow: "Begin gently",
    title: "Discovery Set",
    body: "Five fragrance oils, in miniature. The most quiet way to meet the house.",
    cta: "Explore the set",
    to: "/shop/$productId" as const,
    params: { productId: "discovery-set" },
  },
  {
    eyebrow: "Begin with a feeling",
    title: "Find Your Mood",
    body: "Browse by what you want to feel today — warmth, light, magnetism, composure.",
    cta: "Shop by mood",
    to: "/shop" as const,
  },
  {
    eyebrow: "Begin with the practice",
    title: "Explore The Ritual",
    body: "Four steps for fragrance that actually lingers. Cleanse, hydrate, seal, scent.",
    cta: "Read the ritual",
    to: "/ritual" as const,
  },
  {
    eyebrow: "Begin with a guide",
    title: "Concierge Consultation",
    body: "Tell us your day, your skin, your evenings. We will compose a recommendation.",
    cta: "Open WhatsApp",
    href: `${WHATSAPP_HREF_BASE}?text=${encodeURIComponent(
      "Hello Scented Space — I'd like a fragrance recommendation. Could you guide me?"
    )}`,
  },
];

export function Begin() {
  return (
    <section className="bg-cream border-t border-gold/30">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-16 md:mb-20">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="hairline" />
              <span className="eyebrow">Not sure where to begin?</span>
            </div>
            <h2 className="display-lg text-brown">
              Four quiet <span className="serif-italic text-gold">doorways in.</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-brown/70 leading-relaxed">
            There is no wrong way to enter the house. Choose the door that fits the
            mood you are in today.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {doorways.map((d, i) => {
            const Inner = (
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
                className="group h-full border-t border-brown/20 pt-6 flex flex-col"
              >
                <span className="eyebrow text-gold">{d.eyebrow}</span>
                <h3
                  className="text-brown text-2xl md:text-[1.7rem] mt-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {d.title}
                </h3>
                <p className="text-brown/70 text-sm leading-relaxed mt-3 flex-1">{d.body}</p>
                <span className="mt-6 eyebrow text-terracotta inline-flex items-center gap-2 border-b border-terracotta/30 pb-1 self-start group-hover:border-terracotta transition-colors">
                  {d.cta}
                  <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </motion.div>
            );
            if ("href" in d && d.href) {
              return (
                <a key={d.title} href={d.href} target="_blank" rel="noreferrer" className="block h-full">
                  {Inner}
                </a>
              );
            }
            return (
              <Link key={d.title} to={d.to} params={(d as any).params} className="block h-full">
                {Inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
