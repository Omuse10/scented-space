# Client-Approved Architecture Rebuild

Preserves brand identity, typography, color palette, warm African luxury atmosphere, and existing components where they fit. Restructures navigation, catalog, and merchandising to match the approved document.

## 1. Expanded product catalog (`src/lib/products.ts`)

Rewrite the catalog to cover the full approved list, each with `id`, `name`, `inspiredBy?`, `mood` (5 moods), `noteSummary` (3-word scent line: e.g. "Creamy • Vanilla • Caramel"), `notes` (top/heart/base), `feeling` paragraph, `availableIn` (perfume oil / shower gel / body lotion / body butter / dry body oil / nourishing body oil), `intensity`, `bestFor`, `pairsWith`, `image`, `price`.

New moods:
- Warm & Indulgent — Nahla, Alina, Samara, Zafira
- Radiant & Feminine — Whispering Petals, Théa, Riviera Dreams, Lyra
- Bold & Magnetic — Velvet Elegance, Sensual Whispers, Carmine Temptations, Aurielle, Amara
- Refined & Commanding — Cipher, Griselle, Verin, Opulent Odyssey
- Distinguished — Tangier Twilight, Majestic Oud

Add `rituals` data: Nahla, Alina, Velvet Elegance, Whispering Petals, The Gentleman Collection (with the exact product steps from the brief).
Add `discoverySets`: Discovery Set, Women's Discovery Set, Gentleman's Discovery Set.
Add `bodyCollection` groupings (shower gels, body lotions, body butters, dry body oils, nourishing body oils) using `availableIn` filters.

## 2. Navigation restructure (`src/components/site/Nav.tsx`)

New primary nav: **Shop · Perfume Oils · Rituals · Body · The Ritual · About**. Cart + WhatsApp remain. Mobile drawer mirrors this. Keep the transparent-over-hero → solid-on-scroll behaviour already implemented.

## 3. Home page (`src/routes/index.tsx`) — luxury storefront

Reordered to the approved flow:
1. **Hero** — keep current Hero; headline becomes "Beautifully Scented Skin", subhead and two CTAs ("Shop Rituals" → `/rituals`, "Explore Perfume Oils" → `/perfume-oils`).
2. **Featured Rituals** (new `FeaturedRituals.tsx`) — 4 equal editorial blocks: Nahla, Alina, Velvet Elegance, The Gentleman Collection.
3. **The Ritual** — existing `Ritual.tsx`, headline updated to "Beautiful Scent Begins With Beautiful Skin", with a vertical flow Shower Gel → Lotion/Butter → Body Oil → Perfume Oil, CTA "Discover The Ritual".
4. **Shop By Feeling** — updated `Mood.tsx` to 5 mood tiles with scent lists and keywords.
5. **Bestsellers** (new `Bestsellers.tsx`) — Velvet Elegance, Whispering Petals, Nahla, Cipher, Tangier Twilight in a clean horizontal scroll/grid.
6. **Discovery Set** (new `DiscoveryFeature.tsx`) — large feature: "Not Sure Where To Begin? Discover Five Signature Scents." CTA → discovery-set product.
7. **Founder** — existing.
8. **Instagram** (new `InstagramGrid.tsx`) — clean 6-tile grid placeholder.
9. **Footer** — existing.

Remove `Begin.tsx` from home (its function is absorbed by Discovery Set + nav).

## 4. Shop page (`src/routes/shop.tsx`)

Restructured as a directory, not a product wall:
- **Discovery Sets** row (3 cards)
- **Ritual Collections** row (4 cards → link to `/rituals#nahla` etc.)
- **Shop by Feeling** row (5 mood tiles)
- **All Perfume Oils** grid (link to `/perfume-oils`)

## 5. Perfume Oils page (new `src/routes/perfume-oils.tsx`)

Hero (flat-lay aesthetic), Bestsellers strip, then the full collection grouped by the 5 moods with each product showing name, `inspiredBy`, and the 3-word note summary. Cards link to `/shop/$productId`.

## 6. Rituals page (rewrite `src/routes/ritual.tsx` → keep route, expand)

Hero + intro, then anchored sections for each ritual (Nahla, Alina, Velvet Elegance, Whispering Petals, Gentleman Collection). Each section lists its 3–4 steps with product mini-cards and an "Add Entire Ritual" CTA.

Move existing layering education to a `/the-ritual` route (new file `src/routes/the-ritual.tsx`) preserving the editorial chapters content. Nav "The Ritual" → `/the-ritual`; nav "Rituals" → `/rituals`. (Rename current `/ritual` route file to `rituals.tsx` and create `the-ritual.tsx`.)

## 7. Body Collection page (new `src/routes/body.tsx`)

Sections: Shower Gels, Body Lotions, Body Butters, Dry Body Oils, Nourishing Body Oils — each a horizontal product row sourced from `availableIn`.

## 8. Product detail (`src/routes/shop.$productId.tsx`)

Reorganised to brief:
- Hero image + gallery + lifestyle thumb
- Name, "Inspired by …", price, Add To Cart
- **Scent Profile** — three notes shown editorially
- **The Feeling** — short paragraph
- **Available In** — chip selector of available formats
- **Complete The Ritual** — recommended companion products + "Add Entire Ritual" CTA
- **You May Also Like** — 3 cross-sells from same/adjacent mood
Keep existing ScentPreview block as a compact spec strip.

## 9. About + Contact

`about.tsx`: restructure into Our Story / The Philosophy / Why Skin & Scent / The Ritual sections (light copy refresh, keep visuals).
`contact.tsx`: simplify to three calm cards — WhatsApp, Email, Instagram.

## 10. Footer (`src/components/site/Footer.tsx`)

Update link columns: Shop (Discovery Sets, Rituals, Perfume Oils, Body, Bestsellers) · The House (About, The Ritual, Contact) · Concierge (WhatsApp, Email, Instagram).

## Files

**New**
- `src/routes/perfume-oils.tsx`
- `src/routes/body.tsx`
- `src/routes/the-ritual.tsx`
- `src/routes/rituals.tsx` (replaces current `ritual.tsx` semantics)
- `src/components/site/FeaturedRituals.tsx`
- `src/components/site/Bestsellers.tsx`
- `src/components/site/DiscoveryFeature.tsx`
- `src/components/site/InstagramGrid.tsx`

**Edited**
- `src/lib/products.ts` (large rewrite to full catalog + rituals + sets)
- `src/components/site/Nav.tsx` (new nav items)
- `src/components/site/Footer.tsx` (new link map)
- `src/components/site/Mood.tsx` (5 moods, new lists)
- `src/components/site/Ritual.tsx` (headline + ordered flow)
- `src/components/site/Hero.tsx` (headline + CTAs)
- `src/routes/index.tsx` (new home order)
- `src/routes/shop.tsx` (directory layout)
- `src/routes/shop.$productId.tsx` (new sections)
- `src/routes/about.tsx`, `src/routes/contact.tsx` (light restructure)

**Removed/retired**
- `src/routes/ritual.tsx` → split into `rituals.tsx` + `the-ritual.tsx`
- `Begin.tsx` no longer used on home (kept as component or deleted)

## Out of scope

- No brand identity / color / type changes.
- No checkout changes (cart + checkout route remain).
- No backend, no Cloud, no auth.
- Image assets reused; placeholders kept for Instagram + new lifestyle slots.

After implementation I'll walk you through Home → Shop → Perfume Oils → a Ritual → a Product page so we can pick the next refinement target.
