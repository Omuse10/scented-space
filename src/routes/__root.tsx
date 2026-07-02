import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="hairline" />
          <span className="eyebrow">Lost Page</span>
          <span className="hairline" />
        </div>
        <h1 className="display-lg text-brown">A quiet <span className="serif-italic">cul-de-sac.</span></h1>
        <p className="mt-4 text-brown/65">This page has wandered off. Let us walk you back.</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-terracotta text-ivory px-8 py-4 eyebrow hover:bg-brown transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="display-lg text-brown">A small interruption.</h1>
        <p className="mt-4 text-brown/65">Something went quietly wrong. Try again, or return home.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center bg-terracotta text-ivory px-6 py-3 eyebrow hover:bg-brown transition-colors"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center border border-brown/30 text-brown px-6 py-3 eyebrow hover:bg-cream transition-colors">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Scented Space — Luxury Skin, Scent & Ritual House" },
      { name: "description", content: "Small-batch fragrance oils and body rituals composed in Nairobi. A luxury skin, scent and ritual house for the woman who chooses what earns a place in her life." },
      { name: "author", content: "The Scented Space" },
      { property: "og:title", content: "The Scented Space — Luxury Skin, Scent & Ritual House" },
      { property: "og:description", content: "Small-batch fragrance oils and body rituals composed in Nairobi. A luxury skin, scent and ritual house for the woman who chooses what earns a place in her life." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Scented Space — Luxury Skin, Scent & Ritual House" },
      { name: "twitter:description", content: "Small-batch fragrance oils and body rituals composed in Nairobi. A luxury skin, scent and ritual house for the woman who chooses what earns a place in her life." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7bf32f18-cf04-4faf-b1d6-ce04471f5c1f/id-preview-a39a7809--10b885b3-4326-4ad5-b373-293c8235742f.lovable.app-1782052402532.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7bf32f18-cf04-4faf-b1d6-ce04471f5c1f/id-preview-a39a7809--10b885b3-4326-4ad5-b373-293c8235742f.lovable.app-1782052402532.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RouteTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="min-h-screen bg-ivory text-ink flex flex-col">
          <Nav />
          <main className="flex-1">
            <RouteTransition />
          </main>
          <Footer />
          <WhatsAppFab />
          <CartDrawer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
