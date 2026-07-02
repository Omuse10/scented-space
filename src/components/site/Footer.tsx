import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";

export function Footer() {
  return (
    <footer className="bg-brown text-ivory/80">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Logo className="h-16 md:h-20 w-auto -ml-2" />
            <p className="eyebrow text-gold/80 mt-4">Est. 2023 · Nairobi</p>
            <p className="mt-6 text-ivory/65 max-w-sm leading-relaxed text-sm">
              A skin, scent &amp; ritual house composed in Nairobi — small batch,
              slow-made, deeply intentional.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <h4 className="eyebrow text-ivory/60 mb-5">Shop</h4>
            <ul className="space-y-3 text-ivory/85 text-sm">
              <li><Link to="/shop" className="hover:text-gold transition-colors">Discovery Sets</Link></li>
              <li><Link to="/rituals" className="hover:text-gold transition-colors">Rituals</Link></li>
              <li><Link to="/perfume-oils" className="hover:text-gold transition-colors">Perfume Oils</Link></li>
              <li><Link to="/body" className="hover:text-gold transition-colors">Body</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="eyebrow text-ivory/60 mb-5">The House</h4>
            <ul className="space-y-3 text-ivory/85 text-sm">
              <li><Link to="/about" className="hover:text-gold transition-colors">About</Link></li>
              <li><Link to="/ritual" className="hover:text-gold transition-colors">The Ritual</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="eyebrow text-ivory/60 mb-5">Concierge</h4>
            <ul className="space-y-3 text-ivory/85 text-sm">
              <li><a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">WhatsApp</a></li>
              <li><a href="mailto:hello@thescentedspace.com" className="hover:text-gold transition-colors">hello@thescentedspace.com</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/15 flex flex-col md:flex-row justify-between gap-4 eyebrow text-ivory/45 text-[0.625rem]">
          <span>© {new Date().getFullYear()} The Scented Space</span>
          <span>Composed slowly, in Africa.</span>
        </div>
      </div>
    </footer>
  );
}
