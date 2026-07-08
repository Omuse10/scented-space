import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { Logo } from "@/components/site/Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/rituals", label: "Body Rituals" },
  { to: "/perfume-oils", label: "Perfume Oils" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lastScrollY = useRef(0);

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

  const isHome = pathname === "/";
  const solid = scrolled || menu || !isHome;

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

          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="eyebrow relative py-2 text-ivory/80 hover:text-gold transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                activeProps={{ className: "eyebrow relative py-2 text-gold after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-gold" }}
              >
                {l.label}
              </Link>
            ))}
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
