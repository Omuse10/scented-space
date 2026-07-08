import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { Logo } from "@/components/site/Logo";
import armPerfumeImg from "@/assets/arm-perfume.jpg";
import perfImg from "@/assets/perf.jpg";
import founderImg from "@/assets/founder.jpg";
import heroImg from "@/assets/hero.jpg";
import ritualImg from "@/assets/ritual.jpg";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/rituals", label: "Body Rituals" },
  { to: "/perfume-oils", label: "Perfume Oils" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

type MegaMenuLink = { label: string; to: string };
type MegaMenuSection = { title: string; links: MegaMenuLink[] };
type MegaMenuFeature = {
  image: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
};
type MegaMenuData = {
  sections: MegaMenuSection[];
  feature: MegaMenuFeature;
};

const megaMenus: Record<string, MegaMenuData> = {
  home: {
    sections: [
      {
        title: "BEGIN HERE",
        links: [
          { label: "Shop the House", to: "/shop" },
          { label: "Body Rituals", to: "/rituals" },
          { label: "Perfume Oils", to: "/perfume-oils" },
          { label: "About", to: "/about" },
          { label: "Contact", to: "/contact" },
        ],
      },
      {
        title: "FEATURED",
        links: [
          { label: "Best Sellers", to: "/shop#oils" },
          { label: "Discovery Sets", to: "/shop#discovery" },
          { label: "Ritual Collections", to: "/shop#rituals" },
          { label: "By Mood", to: "/shop#mood" },
        ],
      },
      {
        title: "THE HOUSE",
        links: [
          { label: "Our Story", to: "/about" },
          { label: "The Ritual", to: "/rituals" },
          { label: "The Atelier", to: "/shop" },
        ],
      },
    ],
    feature: {
      image: armPerfumeImg,
      title: "The Scented Space",
      description:
        "An editorial introduction to the house, where fragrance, ritual, and skin meet in a composed everyday rhythm.",
      ctaLabel: "Discover →",
      ctaTo: "/shop",
    },
  },
  shop: {
    sections: [
      {
        title: "SHOP",
        links: [
          { label: "All Products", to: "/shop" },
          { label: "Body Wash", to: "/body-wash" },
          { label: "Body Butter", to: "/body-butter" },
          { label: "Body Oil", to: "/body-oil" },
          { label: "Perfume Oils", to: "/perfume-oils" },
          { label: "Gift Sets", to: "/shop" },
        ],
      },
      {
        title: "DISCOVER",
        links: [
          { label: "Discovery Sets", to: "/shop#discovery" },
          { label: "Ritual Collections", to: "/shop#rituals" },
          { label: "By Mood", to: "/shop#mood" },
          { label: "All Perfume Oils", to: "/perfume-oils" },
          { label: "Body Collection", to: "/body" },
        ],
      },
      {
        title: "STORIES",
        links: [
          { label: "Our Rituals", to: "/rituals" },
          { label: "About the House", to: "/about" },
          { label: "Contact Concierge", to: "/contact" },
        ],
      },
    ],
    feature: {
      image: heroImg,
      title: "Shop the house",
      description:
        "A considered edit of fragrance and body rituals, composed to move from discovery to daily wear.",
      ctaLabel: "Discover →",
      ctaTo: "/shop",
    },
  },
  rituals: {
    sections: [
      {
        title: "BODY RITUALS",
        links: [
          { label: "Nahla Ritual", to: "/rituals#nahla-ritual" },
          { label: "Zahra Ritual", to: "/rituals#zahara-ritual" },
          { label: "Yara Ritual", to: "/rituals#yara-ritual" },
          { label: "Lina Ritual", to: "/rituals#lina-ritual" },
          { label: "View All Rituals", to: "/rituals" },
        ],
      },
      {
        title: "LAYERING",
        links: [
          { label: "Body Wash", to: "/body-wash" },
          { label: "Body Lotion", to: "/body-lotion" },
          { label: "Body Butter", to: "/body-butter" },
          { label: "Dry Body Oil", to: "/dry-body-oil" },
          { label: "Nourishing Body Oil", to: "/nourishing-body-oil" },
        ],
      },
      {
        title: "EDITORS' PICKS",
        links: [
          { label: "Shop Rituals", to: "/shop#rituals" },
          { label: "Body Collection", to: "/body" },
          { label: "Contact Concierge", to: "/contact" },
        ],
      },
    ],
    feature: {
      image: ritualImg,
      title: "A ritual, in sequence",
      description:
        "Layered care for skin and scent, built to feel slow, tactile, and beautifully composed.",
      ctaLabel: "Discover →",
      ctaTo: "/rituals",
    },
  },
  oils: {
    sections: [
      {
        title: "PERFUME OILS",
        links: [
          { label: "Floral", to: "/perfume-oils#radiant" },
          { label: "Woody", to: "/perfume-oils#refined" },
          { label: "Citrus", to: "/perfume-oils#warm" },
          { label: "Vanilla", to: "/perfume-oils#bold" },
          { label: "Discovery Set", to: "/shop#discovery" },
        ],
      },
      {
        title: "COLLECTIONS",
        links: [
          { label: "All Perfume Oils", to: "/perfume-oils" },
          { label: "By Mood", to: "/shop#mood" },
          { label: "The Full Collection", to: "/perfume-oils" },
          { label: "Shop the House", to: "/shop" },
        ],
      },
      {
        title: "GUIDE",
        links: [
          { label: "Our Story", to: "/about" },
          { label: "Contact Concierge", to: "/contact" },
          { label: "Body Rituals", to: "/rituals" },
        ],
      },
    ],
    feature: {
      image: perfImg,
      title: "Perfume oils, composed",
      description:
        "Long-wear scent profiles for skin, tuned to feel intimate, polished, and deeply wearable.",
      ctaLabel: "Discover →",
      ctaTo: "/perfume-oils",
    },
  },
  about: {
    sections: [
      {
        title: "ABOUT",
        links: [
          { label: "Our Story", to: "/about" },
          { label: "Ingredients", to: "/about" },
          { label: "Sustainability", to: "/about" },
          { label: "Journal", to: "/about" },
          { label: "Contact", to: "/contact" },
        ],
      },
      {
        title: "THE HOUSE",
        links: [
          { label: "Shop the House", to: "/shop" },
          { label: "Ritual Collections", to: "/rituals" },
          { label: "Perfume Oils", to: "/perfume-oils" },
          { label: "Body Rituals", to: "/body" },
        ],
      },
      {
        title: "CONNECT",
        links: [
          { label: "Concierge", to: "/contact" },
          { label: "About The Founder", to: "/about" },
          { label: "Explore", to: "/shop" },
        ],
      },
    ],
    feature: {
      image: founderImg,
      title: "A house, not a brand",
      description:
        "The Scented Space is built slowly, with restraint, intention, and a quiet luxury that stays with you.",
      ctaLabel: "Discover →",
      ctaTo: "/about",
    },
  },
};

const megaMenuKeys = {
  "/": "home",
  "/shop": "shop",
  "/rituals": "rituals",
  "/perfume-oils": "oils",
  "/about": "about",
} as const;

type MegaMenuKey = keyof typeof megaMenuKeys;

export function Nav() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lastScrollY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMega = (key: string) => {
    clearCloseTimer();
    setActiveMega(key);
  };

  const closeMegaSoon = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setActiveMega(null);
    }, 150);
  };

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 100);
      lastScrollY.current = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    setActiveMega(null);
  }, [pathname]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  const isHome = pathname === "/";
  const solid = scrolled || menu || !isHome;
  const activeMegaData = activeMega ? megaMenus[activeMega] : null;

  return (
    <>
      <header
        data-tour="main-nav"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-brown/95 backdrop-blur-md border-b border-gold/20 shadow-[0_2px_24px_-12px_rgba(0,0,0,0.45)]"
            : "bg-transparent"
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
        style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10 h-20 md:h-24 flex items-center justify-between gap-5 md:gap-8">
          <Link
            to="/"
            aria-label="The Scented Space — home"
            className="flex items-center h-full py-2 transition-transform duration-500 hover:scale-[1.04]"
          >
            <Logo className="h-full w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]" />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-8"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={closeMegaSoon}
          >
            {links.map((l) => {
              const menuKey = megaMenuKeys[l.to as MegaMenuKey];
              const hasMega = Boolean(menuKey);
              return (
                <div key={l.to} onMouseEnter={() => (hasMega ? openMega(menuKey) : setActiveMega(null))}>
                  <Link
                    to={l.to}
                    onFocus={() => (hasMega ? openMega(menuKey) : setActiveMega(null))}
                    className="eyebrow relative py-2 text-ivory/80 hover:text-gold transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                    activeProps={{ className: "eyebrow relative py-2 text-gold after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-gold" }}
                  >
                    {l.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setOpen(true)}
              className="eyebrow text-ivory hover:text-gold transition-colors py-2 px-2 rounded-full hover:bg-ivory/5"
              aria-label="Open cart"
              data-tour="cart-icon"
            >
              Cart {count > 0 && <span className="text-gold">({count})</span>}
            </button>
            <button
              onClick={() => setMenu((v) => !v)}
              className="lg:hidden w-10 h-10 -mr-2 flex flex-col items-center justify-center gap-[5px] rounded-full hover:bg-ivory/5 transition-colors"
              aria-label="Menu"
            >
              <span
                className={`block w-5 h-px bg-ivory transition-transform ${menu ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`block w-5 h-px bg-ivory transition-transform ${menu ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {activeMegaData && !menu && (
          <motion.div
            key={activeMega}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="hidden lg:block fixed top-20 md:top-24 inset-x-0 z-[60]"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={closeMegaSoon}
          >
            <div className="mx-auto max-w-7xl px-5 md:px-10">
              <div className="bg-[#F8F4EC] border-t border-[#E8DED2] shadow-[0_24px_60px_-28px_rgba(60,30,15,0.35)] h-[clamp(380px,45vh,450px)] max-h-[50vh]">
                <div className="h-full px-12 xl:px-12 py-9 xl:py-10">
                  <div className="grid grid-cols-4 gap-10 xl:gap-12 items-start h-full">
                    <div className="col-span-3 grid grid-cols-3 gap-10 xl:gap-12">
                      {activeMegaData.sections.map((section) => (
                        <div key={section.title} className="min-w-0">
                          <p className="eyebrow text-brown/55 mb-5 text-[0.625rem]">{section.title}</p>
                          <ul className="space-y-3.5">
                            {section.links.map((item) => (
                              <li key={item.label}>
                                <Link
                                  to={item.to}
                                  onClick={() => setActiveMega(null)}
                                  className="text-brown hover:text-terracotta transition-colors text-[1rem] leading-snug"
                                  style={{ fontFamily: "var(--font-display)" }}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="col-span-1 pl-2 xl:pl-4 flex flex-col h-full">
                      <div className="relative h-[58%] overflow-hidden bg-cream mb-5">
                        <img
                          src={activeMegaData.feature.image}
                          alt={activeMegaData.feature.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="text-brown text-[1.4rem] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                        {activeMegaData.feature.title}
                      </h3>
                      <p className="mt-3 text-brown/70 leading-relaxed text-sm xl:text-[0.95rem] max-w-sm">
                        {activeMegaData.feature.description}
                      </p>
                      <Link
                        to={activeMegaData.feature.ctaTo}
                        onClick={() => setActiveMega(null)}
                        className="mt-5 inline-flex items-center gap-2 eyebrow text-[0.625rem] text-terracotta hover:text-brown transition-colors"
                      >
                        {activeMegaData.feature.ctaLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden fixed inset-0 top-20 bg-brown overflow-y-auto z-40"
          >
            <div className="min-h-full flex flex-col">
              <nav className="flex-1 px-6 pt-10 pb-8 flex flex-col">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: "easeOut" }}
                    className="border-b border-gold/15"
                  >
                    <Link
                      to={l.to}
                      onClick={() => setMenu(false)}
                      className="block py-5 text-ivory hover:text-gold transition-colors text-[2rem] leading-none"
                      activeProps={{ className: "block py-5 text-gold text-[2rem] leading-none" }}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <span className="flex items-center justify-between">
                        {l.label}
                        <span className="text-gold/40 text-sm">→</span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="px-6 pb-10 pt-6 border-t border-gold/15"
              >
                <Link
                  to="/shop"
                  onClick={() => setMenu(false)}
                  className="block text-center bg-gold text-brown eyebrow py-4 mb-6 hover:bg-ivory transition-colors"
                >
                  Shop the House
                </Link>
                <div className="flex items-center justify-between text-ivory/60">
                  <span className="eyebrow text-[0.625rem]">Nairobi, Kenya</span>
                  <a
                    href="https://instagram.com/thescentedspace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow text-[0.625rem] hover:text-gold transition-colors"
                  >
                    @thescentedspace
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
