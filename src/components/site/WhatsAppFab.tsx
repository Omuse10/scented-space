import { useCart } from "@/lib/cart";

export function WhatsAppFab() {
  const { whatsappHref } = useCart();
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 bg-brown text-ivory pl-4 pr-5 py-3 rounded-full shadow-lg shadow-brown/25 hover:bg-terracotta transition-colors"
      aria-label="Chat with our concierge on WhatsApp"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.4-.2-.6.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.9-.4-1.8-1-2.6-1.7-.7-.7-1.2-1.5-1.7-2.4-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5 0-.1-.6-1.4-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.2 2.9.1.2 2 3 4.8 4.3 1.7.7 2.3.8 3.1.7.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.1-.6-.3M12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.4 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2"/>
      </svg>
      <span className="text-xs tracking-[0.25em] uppercase font-medium">Concierge</span>
    </a>
  );
}
