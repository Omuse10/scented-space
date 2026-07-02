import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import ritualImg from "@/assets/ritual.jpg";
import nahlaImg from "@/assets/product-nahla.jpg";
import velvetImg from "@/assets/product-velvet.jpg";

export const Route = createFileRoute("/ritual")({
  head: () => ({
    meta: [
      { title: "The Ritual — The Scented Space" },
      { name: "description", content: "Why fragrance fades, and the four-step ritual that holds it on the skin for hours longer." },
      { property: "og:title", content: "The Ritual — The Scented Space" },
      { property: "og:description", content: "Cleanse, hydrate, seal, scent — fragrance that lingers, by design." },
      { property: "og:image", content: ritualImg },
    ],
  }),
  component: RitualPage,
});

const steps = [
  {
    n: "01",
    title: "Cleanse",
    body: "A shower gel composed to ready the skin — not strip it.",
    detail: "Warm water. Slow hands. The skin opens; the ritual begins.",
    adds: "Prepares the canvas",
    img: ritualImg,
  },
  {
    n: "02",
    title: "Hydrate",
    body: "Whipped body butter, deeply nourishing, never heavy.",
    detail: "Apply on still-damp skin. Press, do not rub. Let the butter melt where it lands.",
    adds: "Cushions the scent",
    img: nahlaImg,
  },
  {
    n: "03",
    title: "Seal",
    body: "A silken body oil that locks in moisture and warms the fragrance to come.",
    detail: "A few drops, palm to palm. Glide down the limbs, the back of the neck.",
    adds: "Locks fragrance to the skin",
    img: velvetImg,
  },
  {
    n: "04",
    title: "Scent",
    body: "Long-wear perfume oil — the signature, drawn close to the skin.",
    detail: "Roll along pulse points: inner wrist, behind the ear, the soft inside of the elbow.",
    adds: "Crowns the ritual",
    img: nahlaImg,
  },
];

const pairings = [
  {
    name: "The Quiet Morning",
    body: "Shower Gel · Body Butter · Théa Perfume Oil",
    body2: "For daylight hours and understated grace.",
    to: "alina-ritual",
  },
  {
    name: "The Slow Evening",
    body: "Shower Gel · Body Oil · Nahla Perfume Oil",
    body2: "For low light, slow dinners, and lingering warmth.",
    to: "nahla-ritual",
  },
  {
    name: "The Late Bloom",
    body: "Body Butter · Body Oil · Carmine Perfume Oil",
    body2: "For evenings designed to be remembered.",
    to: "velvet-elegance-ritual",
  },
];

function Chapter({
  eyebrow,
  title,
  children,
  flip,
  img,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  flip?: boolean;
  img?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={`grid md:grid-cols-12 gap-8 md:gap-16 items-center ${flip ? "md:[&>:first-child]:order-2" : ""}`}
    >
      {img && (
        <div className="md:col-span-6 relative aspect-[5/6] overflow-hidden bg-cream">
          <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      )}
      <div className={img ? "md:col-span-5" : "md:col-span-10 md:col-start-2"}>
        <span className="eyebrow text-gold">{eyebrow}</span>
        <h2 className="display-lg text-brown mt-3">{title}</h2>
        <div className="mt-6 space-y-4 text-brown/80 leading-relaxed md:text-lg">{children}</div>
      </div>
    </motion.div>
  );
}

function RitualPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Ritual"
        title={<>The art of <span className="serif-italic text-gold">scented skin.</span></>}
        intro="Fragrance is not a finishing touch. It is built — slowly, layer by layer. This is how scent is meant to live on the skin."
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28 space-y-28 md:space-y-36">

          <Chapter
            eyebrow="Chapter I"
            title={<>Why fragrance <span className="serif-italic">fades.</span></>}
            img={ritualImg}
          >
            <p>
              On unprepared skin, even the most beautiful composition disappears
              within hours. Dry skin cannot hold scent — the molecules lift, drift,
              and vanish into the air.
            </p>
            <p className="serif-italic text-brown/65">
              Most fragrances vanish within 2–3 hours on bare skin.
            </p>
          </Chapter>

          <Chapter
            eyebrow="Chapter II"
            title={<>Why preparation <span className="serif-italic">matters.</span></>}
            img={nahlaImg}
            flip
          >
            <p>
              Hydrated, oiled skin gives fragrance somewhere to live. Oils slow
              evaporation. Butters add a soft, scented cushion. The ritual is not
              decoration — it is what makes the scent last from morning until
              evening.
            </p>
          </Chapter>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="hairline" />
              <span className="eyebrow">Expected longevity</span>
            </div>
            <p className="text-brown/70 max-w-2xl mb-8 leading-relaxed">
              A simple difference, measured on the same skin, with the same scent.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
              {[
                { label: "Unprepared skin", value: "2 – 3 hours", w: "20%" },
                { label: "The full ritual", value: "8 – 12 hours", w: "92%" },
              ].map((row) => (
                <div key={row.label} className="border-t border-brown/15 pt-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="eyebrow text-brown/65">{row.label}</span>
                    <span
                      className="text-brown text-xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {row.value}
                    </span>
                  </div>
                  <div className="h-px bg-brown/15 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: row.w }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                      className="h-px bg-gold absolute left-0 top-0"
                      style={{ height: 2, top: -0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="hairline" />
              <span className="eyebrow">Chapter III · The four steps</span>
            </div>
            <h2 className="display-lg text-brown max-w-3xl">
              How <span className="serif-italic">layering</span> works.
            </h2>
            <p className="text-brown/70 max-w-2xl mt-4 leading-relaxed">
              Each step adds something the next cannot. Together, they hold a
              fragrance close to the skin from morning until evening.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-10 mt-14">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
                  className="border-t border-brown/15 pt-6"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-gold text-sm tracking-[0.3em]">{s.n}</span>
                    <span className="eyebrow text-brown/50">Step</span>
                  </div>
                  <h3 className="text-brown text-2xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {s.title}
                  </h3>
                  <p className="text-brown/75 text-sm leading-relaxed">{s.body}</p>
                  <p className="text-brown/55 text-sm leading-relaxed mt-2 serif-italic">{s.detail}</p>
                  <span className="mt-5 inline-block eyebrow text-[0.625rem] text-gold border-t border-gold/40 pt-2">
                    Adds · {s.adds}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="hairline" />
              <span className="eyebrow">Chapter IV · Recommended pairings</span>
            </div>
            <h2 className="display-lg text-brown max-w-3xl">
              Three rituals, <span className="serif-italic">composed.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-10 mt-12">
              {pairings.map((p) => (
                <Link
                  key={p.name}
                  to="/shop/$productId"
                  params={{ productId: p.to }}
                  className="group block border-t border-brown/15 pt-6 hover:border-terracotta transition-colors"
                >
                  <h3 className="text-brown text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                    {p.name}
                  </h3>
                  <p className="text-brown/70 text-sm mt-3 leading-relaxed">{p.body}</p>
                  <p className="text-brown/55 text-sm mt-2 serif-italic">{p.body2}</p>
                  <span className="mt-5 inline-block eyebrow text-terracotta border-b border-terracotta/30 pb-1">
                    Begin this ritual →
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      <section className="bg-brown text-ivory">
        <div className="mx-auto max-w-3xl px-5 md:px-10 py-24 md:py-32 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="hairline" />
            <span className="eyebrow text-ivory/70">Begin</span>
            <span className="hairline" />
          </div>
          <h2 className="display-lg text-ivory">
            The full ritual, <span className="serif-italic text-gold">composed for you.</span>
          </h2>
          <p className="mt-6 text-ivory/75 leading-relaxed md:text-lg">
            All four pieces, in your chosen scent. The slowest, most beautiful way to wear fragrance.
          </p>
          <Link
            to="/shop"
            className="mt-10 inline-flex items-center gap-3 bg-ivory text-brown px-10 py-4 eyebrow hover:bg-gold transition-colors"
          >
            Shop Rituals <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
