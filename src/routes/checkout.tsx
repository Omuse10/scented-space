import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Cart & Checkout — The Scented Space" },
      { name: "description", content: "Review your ritual and complete your order through our personal WhatsApp concierge." },
    ],
  }),
  component: CheckoutPage,
});

const WHATSAPP_BASE = "https://wa.me/254700000000";

function CheckoutPage() {
  const { items, subtotal, setQty, remove } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", city: "Nairobi", address: "", notes: "", delivery: "nairobi" as "nairobi" | "outside" | "pickup" });

  const deliveryCost = form.delivery === "nairobi" ? 500 : form.delivery === "outside" ? 1200 : 0;
  const total = subtotal + (items.length > 0 ? deliveryCost : 0);

  const lines = items
    .map((i) => `• ${i.name}${i.variant ? ` — ${i.variant}` : ""} × ${i.qty}  (KSh ${(i.price * i.qty).toLocaleString()})`)
    .join("\n");

  const deliveryLabel = form.delivery === "nairobi" ? "Nairobi delivery" : form.delivery === "outside" ? "Outside Nairobi" : "Studio pickup";

  const message = encodeURIComponent(
    `Hello Scented Space concierge — I'd like to place this order:\n\n${lines}\n\nSubtotal: KSh ${subtotal.toLocaleString()}\n${deliveryLabel}: KSh ${deliveryCost.toLocaleString()}\nTotal: KSh ${total.toLocaleString()}\n\nName: ${form.name || "—"}\nPhone: ${form.phone || "—"}\nCity: ${form.city || "—"}\nAddress: ${form.address || "—"}\nNotes: ${form.notes || "—"}`,
  );

  return (
    <>
      <div className="bg-brown h-20 md:h-24" />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-12 md:py-20">
          <nav className="eyebrow text-brown/55 mb-8 flex items-center gap-2">
            <Link to="/" className="hover:text-terracotta">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-terracotta">Shop</Link>
            <span>/</span>
            <span className="text-brown">Cart & Checkout</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span className="hairline" />
            <span className="eyebrow">Your Ritual</span>
          </div>
          <h1 className="display-lg text-brown mb-12 md:mb-16">
            Review &amp; <span className="serif-italic">complete.</span>
          </h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="border border-brown/15 bg-cream/40 py-20 px-6 text-center"
            >
              <p className="text-brown/70 max-w-md mx-auto leading-relaxed">
                Your cart is quiet. Begin with the Discovery Set, or speak to the concierge for a composed recommendation.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/shop" className="inline-flex justify-center bg-terracotta text-ivory px-8 py-4 eyebrow hover:bg-brown transition-colors">Browse Rituals</Link>
                <Link to="/contact" className="inline-flex justify-center border border-brown/30 text-brown px-8 py-4 eyebrow hover:bg-cream transition-colors">Speak to Concierge</Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Items + form */}
              <div className="lg:col-span-7 space-y-16">
                <div>
                  <h2 className="eyebrow text-brown/60 mb-6">In your cart</h2>
                  <ul className="divide-y divide-brown/15 border-t border-b border-brown/15">
                    {items.map((i) => (
                      <li key={i.id} className="py-6 flex gap-5">
                        <img src={i.image} alt="" className="w-24 h-28 object-cover bg-cream shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-3">
                            <h3 className="text-brown text-xl" style={{ fontFamily: "var(--font-display)" }}>{i.name}</h3>
                            <span className="text-brown text-sm whitespace-nowrap tabular-nums">KSh {(i.price * i.qty).toLocaleString()}</span>
                          </div>
                          {i.variant && <p className="text-brown/55 text-xs mt-1">{i.variant}</p>}
                          <div className="mt-4 flex items-center justify-between">
                            <div className="inline-flex items-center border border-brown/20">
                              <button onClick={() => setQty(i.id, i.qty - 1)} className="w-9 h-9 text-brown/70 hover:text-terracotta">−</button>
                              <span className="w-9 text-center text-sm text-brown">{i.qty}</span>
                              <button onClick={() => setQty(i.id, i.qty + 1)} className="w-9 h-9 text-brown/70 hover:text-terracotta">+</button>
                            </div>
                            <button onClick={() => remove(i.id)} className="text-xs text-brown/55 hover:text-terracotta tracking-wider uppercase">Remove</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="eyebrow text-brown/60 mb-6">Your details</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="As on the door bell" />
                    <FormField label="Phone (WhatsApp)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+254 …" />
                    <FormField label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} placeholder="Nairobi" />
                    <FormField label="Address / Building" value={form.address} onChange={(v) => setForm({ ...form, address: v })} placeholder="Estate, building, gate" />
                  </div>
                </div>

                <div>
                  <h2 className="eyebrow text-brown/60 mb-6">Delivery</h2>
                  <div className="space-y-3">
                    {([
                      { key: "nairobi", title: "Nairobi delivery", body: "Hand-delivered, 1–2 days.", cost: 500 },
                      { key: "outside", title: "Outside Nairobi", body: "Courier, 2–4 days.", cost: 1200 },
                      { key: "pickup", title: "Studio pickup", body: "By appointment, in Nairobi.", cost: 0 },
                    ] as const).map((opt) => {
                      const active = form.delivery === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => setForm({ ...form, delivery: opt.key })}
                          type="button"
                          className={`w-full text-left p-5 border flex items-center justify-between gap-4 transition-colors ${
                            active ? "border-terracotta bg-terracotta/5" : "border-brown/20 hover:border-brown/40"
                          }`}
                        >
                          <div>
                            <div className="text-brown text-lg" style={{ fontFamily: "var(--font-display)" }}>{opt.title}</div>
                            <div className="text-brown/60 text-sm mt-1">{opt.body}</div>
                          </div>
                          <div className="text-brown text-sm tabular-nums">{opt.cost === 0 ? "Free" : `KSh ${opt.cost.toLocaleString()}`}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h2 className="eyebrow text-brown/60 mb-4">Anything else</h2>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    placeholder="A gift note, a delivery window, a preference …"
                    className="w-full bg-transparent border border-brown/25 p-4 text-brown placeholder:text-brown/40 focus:outline-none focus:border-terracotta transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <aside className="lg:col-span-5 lg:col-start-8">
                <div className="lg:sticky lg:top-28 bg-cream/50 border border-brown/15 p-6 md:p-8 space-y-6">
                  <h2 className="eyebrow text-brown/60">Order summary</h2>
                  <div className="space-y-3 text-sm">
                    <Row label="Subtotal" value={`KSh ${subtotal.toLocaleString()}`} />
                    <Row label={deliveryLabel} value={deliveryCost === 0 ? "Free" : `KSh ${deliveryCost.toLocaleString()}`} />
                  </div>
                  <div className="border-t border-brown/20 pt-4 flex items-baseline justify-between">
                    <span className="eyebrow text-brown">Total</span>
                    <span className="text-brown text-2xl tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
                      KSh {total.toLocaleString()}
                    </span>
                  </div>

                  <a
                    href={`${WHATSAPP_BASE}?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-terracotta text-ivory eyebrow px-6 py-4 hover:bg-brown transition-colors"
                  >
                    Complete via WhatsApp
                  </a>

                  <p className="text-[0.625rem] text-brown/55 tracking-wider uppercase text-center leading-relaxed">
                    Personal concierge order · No payment taken on site · We confirm everything before dispatch
                  </p>

                  <div className="border-t border-brown/15 pt-5 text-xs text-brown/60 leading-relaxed serif-italic">
                    We pay attention to the small things — the packaging, the handwritten note, the way it arrives. Tell us if it's a gift; we'll dress it.
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FormField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="eyebrow text-brown/60 block mb-2">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-brown/25 py-3 text-brown placeholder:text-brown/40 focus:outline-none focus:border-terracotta transition-colors"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-brown/75">
      <span>{label}</span>
      <span className="text-brown tabular-nums">{value}</span>
    </div>
  );
}
