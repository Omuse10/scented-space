import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import ritualImg from "@/assets/ritual.jpg";
import moistureImg from "@/assets/product-velvet.jpg";
import sealImg from "@/assets/product-discovery.jpg";
import finishImg from "@/assets/arm-perfume.jpg";
import refinedImg from "@/assets/mood-refined.jpg";
import ritualVideo from "@/assets/amara-ritual.mp4.asset.json";
import { Droplets, Milk, Droplet, Sparkles } from "lucide-react";

type StepLink = LinkProps["to"];

const steps: {
  n: string;
  title: string;
  sub: string;
  body: string;
  image: string;
  to: StepLink;
  cta: string;
}[] = [
  {
    n: "01",
    title: "Cleanse",
    sub: "Body Wash",
    body: "A gentle cleanse that readies the skin without stripping it — the first, quietest layer of the fragrance to come.",
    image: ritualImg,
    to: "/body-wash",
    cta: "Shop Body Wash",
  },
  {
    n: "02",
    title: "Moisturise",
    sub: "Body Lotion or Body Butter",
    body: "Soft, lasting hydration — the cushion that allows fragrance to settle and stay close to the skin.",
    image: moistureImg,
    to: "/moisture",
    cta: "Choose Your Moisture",
  },
  {
    n: "03",
    title: "Seal",
    sub: "Body Oil",
    body: "A finishing oil that locks in moisture and warms the skin, preparing it to hold scent for longer.",
    image: sealImg,
    to: "/body-oil",
    cta: "Shop Body Oil",
  },
  {
    n: "04",
    title: "Finish",
    sub: "Perfume Oil",
    body: "The signature — applied last, worn close to the skin. Quiet, lasting, unmistakably yours.",
    image: finishImg,
    to: "/perfume-oils",
    cta: "Shop Perfume Oils",
  },
];

const stepIcons = [Droplets, Milk, Droplet, Sparkles];

export function Ritual() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Play even slower than slow-mo for a meditative, advert-like rhythm.
      videoRef.current.playbackRate = 0.3;
    }
  }, []);

  return (
    <section id="ritual" className="bg-cream">
      {/* Opening manifesto */}
      <div className="mx-auto max-w-7xl px-5 md:px-10 pt-24 md:pt-36 pb-16 md:pb-24">
        <div className="text-center">
          <span className="eyebrow text-gold">THE FOUR RITUALS</span>
          <h2 className="display-lg text-brown mt-3 max-w-3xl mx-auto">
            A ritual for every moment.
          </h2>
          <p className="mt-4 text-brown/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Four simple steps to cleanse, nourish and elevate your everyday.
          </p>
        </div>
      </div>

      {/* Cinematic opening image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative h-[70vh] md:h-[85vh] overflow-hidden"
      >
        <video
          ref={videoRef}
          src={ritualVideo.url}
          poster={refinedImg}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="The four-step ritual, in slow motion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/30 via-transparent to-brown/15" />
        <div className="absolute bottom-10 md:bottom-16 left-5 md:left-16 right-5 md:right-16">
          <p
            className="text-ivory max-w-xl serif-italic"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1.15 }}
          >
            "She does not perfume herself. She prepares the skin to receive it."
          </p>
        </div>
      </motion.div>

      {/* Alternating editorial steps */}
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-36">
        <div className="space-y-6 md:space-y-24">
          {steps.map((s, i) => {
            const reverse = i % 2 === 1;
            const Icon = stepIcons[i];
            return (
              <div
                key={s.n}
                className="bg-ivory rounded-lg overflow-hidden border border-brown/10 md:border-0"
              >
                {/* Mobile: two-column 50/50 side-by-side */}
                <div className="flex md:hidden h-56">
                  <div className={`w-1/2 h-full relative ${reverse ? "order-2" : "order-1"}`}>
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 eyebrow text-[0.65rem] bg-ivory/90 text-brown px-2.5 py-1">
                      Step {s.n}
                    </span>
                  </div>
                  <div className={`w-1/2 h-full flex flex-col justify-center p-4 ${reverse ? "order-1" : "order-2"}`}>
                    <span className="text-gold tracking-[0.25em] text-xs eyebrow">
                      {s.sub}
                    </span>
                    <h3
                      className="text-brown mt-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.25rem, 6vw, 1.75rem)",
                        lineHeight: 1.1,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-2 text-brown/75 text-xs leading-relaxed line-clamp-3">
                      {s.body}
                    </p>
                    <Link
                      to={s.to}
                      className="mt-4 inline-flex items-center gap-1.5 eyebrow text-terracotta text-[0.7rem] hover:underline underline-offset-4"
                    >
                      {s.cta} <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>

                {/* Desktop: alternating 12-column layout */}
                <div className="hidden md:grid md:grid-cols-12 md:gap-16 md:items-center">
                  <motion.div
                    initial={{ opacity: 0, x: reverse ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative overflow-hidden rounded-lg aspect-[5/6] md:col-span-7 ${
                      reverse ? "md:col-start-6" : ""
                    }`}
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <span className="absolute top-5 left-5 eyebrow text-[0.625rem] bg-ivory/90 text-brown px-3 py-1.5">
                      Step {s.n}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
                    className={`flex flex-col justify-center md:col-span-4 ${
                      reverse ? "md:col-start-2 md:row-start-1" : "md:col-start-9"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <span className="text-gold tracking-[0.3em] text-sm eyebrow">
                        {s.n} — {s.sub}
                      </span>
                    </div>
                    <h3
                      className="text-brown mt-4"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 4.5vw, 3.75rem)",
                        lineHeight: 1.05,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-4 text-brown/75 leading-relaxed text-base md:text-lg max-w-md">
                      {s.body}
                    </p>
                    <Link
                      to={s.to}
                      className="mt-8 inline-flex items-center gap-2 eyebrow text-terracotta border-b border-terracotta/40 pb-1 hover:border-terracotta transition-colors text-[0.7rem] w-fit"
                    >
                      {s.cta} <span aria-hidden>→</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 md:mt-36 text-center">
          <Link
            to="/ritual"
            className="inline-flex items-center gap-3 border border-brown text-brown px-10 py-4 eyebrow hover:bg-brown hover:text-ivory transition-colors"
          >
            Discover The Ritual <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
