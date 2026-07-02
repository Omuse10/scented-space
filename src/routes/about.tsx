import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import founderImg from "@/assets/founder.jpg";
import ritualImg from "@/assets/ritual.jpg";
import aboutBg from "@/assets/about-bg.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Scented Space" },
      { name: "description", content: "A skin, scent and ritual house, composed slowly in Nairobi. This is our story, and the philosophy that shapes it." },
      { property: "og:title", content: "About — The Scented Space" },
      { property: "og:description", content: "A skin, scent and ritual house composed slowly in Nairobi." },
      { property: "og:image", content: founderImg },
    ],
  }),
  component: AboutPage,
});

const values = [
  { n: "I", title: "Small batches", body: "We make less, more carefully. Some pieces leave the studio in days; others in seasons. The maker decides — not the calendar." },
  { n: "II", title: "Skin-first", body: "Fragrance is held by the skin. So we begin where it begins — with the cleanse, the hydrate, the seal. The scent is the last word, not the only one." },
  { n: "III", title: "African luxury", body: "Composed in Nairobi, of materials chosen from across the continent and the world. Warm, honest, considered. Quietly ours." },
  { n: "IV", title: "Quiet, not loud", body: "We do not chase noise. We do not stack collections. We make what we believe in, and we let it earn its place." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The House"
        title={<>A house, <span className="serif-italic text-gold">not a brand.</span></>}
        intro="The Scented Space began in Nairobi with a small question: what would it look like to bring beauty, presence, and intention into the everyday? The answer started with scent — and grew into a ritual house."
        backgroundImage={aboutBg.url}
      />

      {/* Founder letter */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:col-span-5 relative aspect-[4/5] overflow-hidden bg-cream"
          >
            <img src={founderImg} alt="The Founder" className="absolute inset-0 w-full h-full object-cover" />
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
              <span className="eyebrow">A Letter</span>
            </div>
            <h2 className="display-lg text-brown">
              Fragrance is where the story <span className="serif-italic">began.</span>
            </h2>
            <div className="mt-8 space-y-5 text-brown/80 leading-relaxed max-w-xl">
              <p>I started The Scented Space because I wanted to bring more beauty, presence and intention into the everyday — and scent was the most honest place to begin.</p>
              <p>What you find here is not a fragrance line. It is a ritual house — composed slowly, in small batches, for the woman who already knows what quality feels like and is simply choosing what earns a place in her life.</p>
              <p>We pour everything ourselves. We answer the WhatsApp ourselves. We test every batch on our own skin first. This is the part that does not scale, and it is the part we care about most.</p>
            </div>
            <p className="mt-10 serif-italic text-gold text-2xl">— The Founder, Nairobi</p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy / values */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
          <div className="max-w-2xl mb-16 md:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="hairline" />
              <span className="eyebrow">Philosophy</span>
            </div>
            <h2 className="display-lg text-brown">
              Four things we <span className="serif-italic">refuse to rush.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-14">
            {values.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
                className="border-t border-brown/15 pt-6"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-gold tracking-[0.3em] text-sm">{v.n}</span>
                  <span className="eyebrow text-brown/50">Value</span>
                </div>
                <h3 className="text-brown text-3xl mb-3" style={{ fontFamily: "var(--font-display)" }}>{v.title}</h3>
                <p className="text-brown/75 leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="hairline" />
              <span className="eyebrow">The Atelier</span>
            </div>
            <h2 className="display-lg text-brown">
              Nairobi, <span className="serif-italic">in small batches.</span>
            </h2>
            <p className="mt-6 text-brown/75 leading-relaxed md:text-lg max-w-xl">
              Every oil is hand-poured, hand-capped and hand-checked by the same pair of hands. If a batch does not pass on skin, it does not leave the studio.
            </p>
          </div>
          <div className="md:col-span-6 relative aspect-[5/4] overflow-hidden bg-cream">
            <img src={ritualImg} alt="The Nairobi atelier" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-brown text-ivory">
        <div className="mx-auto max-w-3xl px-5 md:px-10 py-24 md:py-32 text-center">
          <h2 className="display-lg text-ivory">Begin with a <span className="serif-italic text-gold">conversation.</span></h2>
          <p className="mt-6 text-ivory/75 leading-relaxed">Tell us where you are today — we will compose a quiet recommendation, just for you.</p>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-3 bg-ivory text-brown px-10 py-4 eyebrow hover:bg-gold transition-colors">
            Speak to the Concierge <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
