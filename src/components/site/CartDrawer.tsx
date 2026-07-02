import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { items, open, setOpen, subtotal, remove, setQty, whatsappHref } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-brown/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[70] h-[100svh] w-full sm:w-[440px] bg-ivory flex flex-col"
          >
            <div className="flex items-center justify-between px-6 md:px-8 h-16 md:h-20 border-b border-border">
              <div>
                <div className="eyebrow text-brown/60 mb-1">Your Ritual</div>
                <div className="text-brown text-xl" style={{ fontFamily: "var(--font-display)" }}>
                  Cart
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="eyebrow text-brown/70 hover:text-terracotta"
                aria-label="Close cart"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center pt-20">
                  <p className="text-brown/60 max-w-xs leading-relaxed">
                    Your cart is quiet. Begin with the Discovery Set, or speak to the concierge.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-8 eyebrow text-terracotta border-b border-terracotta/40 pb-1"
                  >
                    Browse Rituals
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map((i) => (
                    <li key={i.id} className="py-5 flex gap-4">
                      <img
                        src={i.image}
                        alt=""
                        className="w-20 h-24 object-cover bg-cream shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-3">
                          <h4 className="text-brown" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>
                            {i.name}
                          </h4>
                          <span className="text-brown text-sm whitespace-nowrap">
                            KSh {(i.price * i.qty).toLocaleString()}
                          </span>
                        </div>
                        {i.variant && (
                          <p className="text-brown/60 text-xs mt-0.5">{i.variant}</p>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-border">
                            <button
                              onClick={() => setQty(i.id, i.qty - 1)}
                              className="w-8 h-8 text-brown/70 hover:text-terracotta"
                              aria-label="Decrease"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm text-brown">{i.qty}</span>
                            <button
                              onClick={() => setQty(i.id, i.qty + 1)}
                              className="w-8 h-8 text-brown/70 hover:text-terracotta"
                              aria-label="Increase"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => remove(i.id)}
                            className="text-xs text-brown/50 hover:text-terracotta tracking-wider uppercase"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-border px-6 md:px-8 py-6 space-y-4 bg-cream/40">
              <div className="flex justify-between items-baseline">
                <span className="eyebrow text-brown/60">Subtotal</span>
                <span className="text-brown text-xl" style={{ fontFamily: "var(--font-display)" }}>
                  KSh {subtotal.toLocaleString()}
                </span>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => items.length === 0 && setOpen(false)}
                className={`w-full inline-flex justify-center items-center px-6 py-4 eyebrow transition-colors ${
                  items.length === 0
                    ? "bg-brown/20 text-brown/50 cursor-not-allowed pointer-events-none"
                    : "bg-terracotta text-ivory hover:bg-brown"
                }`}
              >
                Checkout via WhatsApp
              </a>
              <p className="text-[0.625rem] text-brown/55 tracking-wider text-center uppercase">
                Personal concierge order · No payment taken on site
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
