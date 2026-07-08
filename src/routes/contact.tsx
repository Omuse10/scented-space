import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import { useCart } from "@/lib/cart";
import contactImage from "@/assets/contact.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Scented Space" },
      {
        name: "description",
        content:
          "Speak to the concierge — WhatsApp, email, or Instagram. Personal recommendations, gifting and private orders, answered slowly and well.",
      },
      { property: "og:title", content: "Contact — The Scented Space" },
      {
        property: "og:description",
        content: "WhatsApp, email, or Instagram — answered slowly and well.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { whatsappHref } = useCart();

  const channels = [
    {
      eyebrow: "Fastest",
      title: "WhatsApp",
      body: "The fastest way to reach a real person. Recommendations, orders, gifting — usually within the day.",
      cta: "Open WhatsApp",
      href: whatsappHref,
    },
    {
      eyebrow: "Studio",
      title: "Email",
      body: "For gifting, press and wholesale enquiries.",
      cta: "hello@thescentedspace.com",
      href: "mailto:hello@thescentedspace.com",
    },
    {
      eyebrow: "From the studio",
      title: "Instagram",
      body: "Behind the pour, new arrivals, slow studio days.",
      cta: "@thescentedspace",
      href: "https://instagram.com",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="The Concierge"
        title={
          <>
            Tell us where{" "}
            <span className="serif-italic text-gold">you are.</span>
          </>
        }
        intro="Every message is read by a person. Whichever door suits you — we'll reply slowly and well."
        backgroundImage={contactImage}
        overlayClassName="absolute inset-0 bg-gradient-to-t from-brown/50 via-brown/20 to-transparent md:bg-gradient-to-r md:from-brown/45 md:via-brown/12 md:to-transparent"
        contentClassName="max-w-2xl bg-brown/34 backdrop-blur-[1.5px] ring-1 ring-ivory/15 rounded-sm px-4 py-5 md:px-6 md:py-6"
        titleClassName="text-[clamp(2.1rem,6vw,4.2rem)] leading-[1.02]"
        introClassName="mt-5 md:mt-6 text-[0.95rem] md:text-base max-w-xl text-ivory/95"
        isExpanded={true}
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {channels.map((c, i) => (
              <motion.a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
                className="group block border-t border-brown/15 pt-6 hover:border-terracotta transition-colors"
              >
                <span className="eyebrow text-gold text-[0.625rem]">
                  {c.eyebrow}
                </span>
                <h2
                  className="text-brown text-3xl md:text-4xl mt-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.title}
                </h2>
                <p className="mt-4 text-brown/70 leading-relaxed">{c.body}</p>
                <span className="mt-6 inline-block eyebrow text-terracotta border-b border-terracotta/30 pb-1 group-hover:border-terracotta transition-colors">
                  {c.cta} →
                </span>
              </motion.a>
            ))}
          </div>

          <div className="mt-20 md:mt-28 border-t border-brown/10 pt-10 grid md:grid-cols-2 gap-10 text-brown/70 text-sm">
            <div>
              <span className="eyebrow text-brown/55">The Atelier</span>
              <p className="mt-3 leading-relaxed">
                Nairobi · Kenya — by appointment only. We'll arrange the address
                with you on WhatsApp.
              </p>
            </div>
            <div>
              <span className="eyebrow text-brown/55">Hours</span>
              <p className="mt-3 leading-relaxed">
                Mon — Sat · 09:00 – 18:00 EAT. WhatsApp answered until 21:00.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
