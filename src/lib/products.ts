import discoveryImg from "@/assets/product-discovery.jpg";
import nahlaImg from "@/assets/product-nahla.jpg";
import velvetImg from "@/assets/product-velvet.jpg";
import warmImg from "@/assets/mood-warm.jpg";
import radiantImg from "@/assets/mood-radiant.jpg";
import boldImg from "@/assets/mood-bold.jpg";
import refinedImg from "@/assets/mood-refined.jpg";

export type Mood =
  | "warm"
  | "radiant"
  | "bold"
  | "refined"
  | "distinguished"
  | "discovery";

export type Intensity = "Soft" | "Medium" | "Bold";

export type Format =
  | "perfume-oil"
  | "shower-gel"
  | "body-lotion"
  | "body-butter"
  | "dry-body-oil"
  | "nourishing-body-oil";

export const FORMAT_LABEL: Record<Format, string> = {
  "perfume-oil": "Perfume Oil",
  "shower-gel": "Shower Gel",
  "body-lotion": "Body Lotion",
  "body-butter": "Body Butter",
  "dry-body-oil": "Dry Body Oil",
  "nourishing-body-oil": "Nourishing Body Oil",
};

export type Product = {
  id: string;
  name: string;
  inspiredBy?: string;
  tagline: string;
  price: number;
  image: string;
  mood: Mood;
  moodLabel: string;
  noteSummary: string; // "Creamy • Vanilla • Caramel"
  emotion: string;
  character: string;
  bestFor: string;
  intensity: Intensity;
  personality: string;
  pairsWith: string;
  feeling: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  composition: string;
  ritual: string;
  story: string;
  availableIn: Format[];
  variants?: { label: string; price: number }[];
  feature?: boolean;
  bestseller?: boolean;
  badge?: string;
  category: "ritual" | "oil" | "discovery";
};

export const moods: {
  key: Mood;
  eyebrow: string;
  title: string;
  body: string;
  emotion: string;
  forWhom: string;
  keywords: string[];
  image: string;
  scents: string[];
}[] = [
  {
    key: "warm",
    eyebrow: "Mood I",
    title: "Warm & Indulgent",
    body: "Cashmere, cream, coffee and warm woods.",
    emotion: "Skin you do not want to wash off.",
    forWhom: "For those who enjoy warmth, softness and lingering intimacy.",
    keywords: ["Comforting", "Elegant", "Enveloping"],
    image: warmImg,
    scents: ["Nahla", "Alina", "Samara", "Zafira"],
  },
  {
    key: "radiant",
    eyebrow: "Mood II",
    title: "Radiant & Feminine",
    body: "Soft florals, silk, fresh flowers and natural elegance.",
    emotion: "Sunlight through a linen curtain.",
    forWhom: "For those who appreciate understated sophistication.",
    keywords: ["Fresh", "Graceful", "Luminous"],
    image: radiantImg,
    scents: ["Whispering Petals", "Théa", "Riviera Dreams", "Lyra"],
  },
  {
    key: "bold",
    eyebrow: "Mood III",
    title: "Bold & Magnetic",
    body: "Gold jewellery, evening light, luxury fabrics and rich textures.",
    emotion: "A trail rather than a whisper.",
    forWhom: "For those who enjoy leaving an impression.",
    keywords: ["Confident", "Expressive", "Unforgettable"],
    image: boldImg,
    scents: [
      "Velvet Elegance",
      "Sensual Whispers",
      "Carmine Temptations",
      "Aurielle",
      "Amara",
    ],
  },
  {
    key: "refined",
    eyebrow: "Mood IV",
    title: "Refined & Commanding",
    body: "Architecture, tailoring, clean lines, quiet luxury.",
    emotion: "Composure, bottled.",
    forWhom: "For those who appreciate timeless confidence.",
    keywords: ["Structured", "Polished", "Distinguished"],
    image: refinedImg,
    scents: ["Cipher", "Griselle", "Verin", "Opulent Odyssey"],
  },
  {
    key: "distinguished",
    eyebrow: "Mood V",
    title: "Distinguished",
    body: "Leather, travel, wood, evening lounges.",
    emotion: "A worn-in confidence.",
    forWhom: "For those drawn to depth, smoke and warm wood.",
    keywords: ["Smoky", "Worn-in", "Assured"],
    image: refinedImg,
    scents: ["Tangier Twilight", "Majestic Oud"],
  },
];

// ---------- Perfume Oils ----------

type OilSeed = {
  id: string;
  name: string;
  inspiredBy?: string;
  mood: Mood;
  noteSummary: string;
  emotion: string;
  feeling: string;
  bestFor: string;
  intensity: Intensity;
  personality: string;
  pairsWith: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  image: string;
  bestseller?: boolean;
  availableIn: Format[];
};

const oilSeeds: OilSeed[] = [
  // Warm & Indulgent
  {
    id: "nahla",
    name: "Nahla",
    inspiredBy: "Kayali Vanilla 28",
    mood: "warm",
    noteSummary: "Creamy • Vanilla • Caramel",
    emotion: "The scent of being cared for.",
    feeling:
      "Nahla is honeyed warmth — a soft, creamy embrace that lingers on the skin like cashmere drawn close.",
    bestFor: "Evenings & cool mornings",
    intensity: "Medium",
    personality: "Elegant & Comforting",
    pairsWith: "Body Butter + Nourishing Body Oil",
    notes: {
      top: ["Bergamot", "Cardamom"],
      heart: ["Honeyed Jasmine", "Tonka"],
      base: ["Vanilla Bourbon", "Caramel", "Amber"],
    },
    image: nahlaImg,
    bestseller: true,
    availableIn: [
      "perfume-oil",
      "shower-gel",
      "body-lotion",
      "body-butter",
      "dry-body-oil",
      "nourishing-body-oil",
    ],
  },
  {
    id: "alina",
    name: "Alina",
    inspiredBy: "Delina by PdM",
    mood: "warm",
    noteSummary: "Fruity • Sweet • Elegant",
    emotion: "Being well, quietly.",
    feeling:
      "Alina is the softness of fresh lychee folded into Turkish rose and a warm sweet base — graceful, never loud.",
    bestFor: "Daylight & celebrations",
    intensity: "Medium",
    personality: "Graceful & Refined",
    pairsWith: "Shower Gel + Body Butter",
    notes: {
      top: ["Lychee", "Rhubarb"],
      heart: ["Turkish Rose", "Peony"],
      base: ["Vanilla", "Cashmere Wood", "Musk"],
    },
    image: nahlaImg,
    availableIn: [
      "perfume-oil",
      "shower-gel",
      "body-lotion",
      "body-butter",
      "dry-body-oil",
      "nourishing-body-oil",
    ],
  },
  {
    id: "samara",
    name: "Samara",
    mood: "warm",
    noteSummary: "Vanilla • Amber • Warm",
    emotion: "A slow, golden hour.",
    feeling:
      "Samara is amber resin wrapped in vanilla bourbon and a quiet whisper of woods. Skin you keep returning to.",
    bestFor: "Cool evenings",
    intensity: "Medium",
    personality: "Soft & Sensual",
    pairsWith: "Layer over Nourishing Body Oil",
    notes: {
      top: ["Bergamot", "Pink Pepper"],
      heart: ["Orris", "Heliotrope"],
      base: ["Vanilla", "Amber", "Sandalwood"],
    },
    image: warmImg,
    availableIn: ["perfume-oil"],
  },
  {
    id: "zafira",
    name: "Zafira",
    mood: "warm",
    noteSummary: "Tonka • Cocoa • Woods",
    emotion: "Comfort with backbone.",
    feeling:
      "Zafira is cocoa absolute and tonka over a base of warm woods — gourmand, but never sugary.",
    bestFor: "Cooler months",
    intensity: "Bold",
    personality: "Warm & Confident",
    pairsWith: "Layer over Body Butter",
    notes: {
      top: ["Mandarin", "Saffron"],
      heart: ["Cocoa Absolute", "Tonka"],
      base: ["Sandalwood", "Patchouli", "Amber"],
    },
    image: warmImg,
    availableIn: ["perfume-oil"],
  },
  // Radiant & Feminine
  {
    id: "whispering-petals",
    name: "Whispering Petals",
    inspiredBy: "Mon Paris Couture",
    mood: "radiant",
    noteSummary: "Rose • Lychee • Musk",
    emotion: "Petals at dawn.",
    feeling:
      "Whispering Petals is a luminous bouquet of rose and lychee, lifted by a clean, weightless musk.",
    bestFor: "Daylight hours",
    intensity: "Soft",
    personality: "Romantic & Luminous",
    pairsWith: "Shower Gel + Dry Body Oil",
    notes: {
      top: ["Lychee", "Pear"],
      heart: ["Damask Rose", "Peony"],
      base: ["White Musk", "Soft Amber"],
    },
    image: radiantImg,
    bestseller: true,
    availableIn: [
      "perfume-oil",
      "shower-gel",
      "body-lotion",
      "dry-body-oil",
    ],
  },
  {
    id: "thea",
    name: "Théa",
    mood: "radiant",
    noteSummary: "Floral • Citrus • Musk",
    emotion: "Sunlight through linen.",
    feeling:
      "Théa is bright bergamot meeting white florals and a soft, clean musk — composure with quiet brightness.",
    bestFor: "Warm afternoons",
    intensity: "Soft",
    personality: "Luminous & Graceful",
    pairsWith: "Layer over Body Oil",
    notes: {
      top: ["Bergamot", "Green Tea"],
      heart: ["Tuberose", "Jasmine"],
      base: ["White Musk", "Vanilla Wood"],
    },
    image: radiantImg,
    availableIn: ["perfume-oil"],
  },
  {
    id: "riviera-dreams",
    name: "Riviera Dreams",
    mood: "radiant",
    noteSummary: "Peony • Pink Pepper • Musk",
    emotion: "A long, blue afternoon.",
    feeling:
      "Peony and pink pepper warmed by a soft musk — fresh, feminine, easy to wear from morning into evening.",
    bestFor: "Daytime & travel",
    intensity: "Soft",
    personality: "Fresh & Effortless",
    pairsWith: "Shower Gel + Perfume Oil",
    notes: {
      top: ["Pink Pepper", "Bergamot"],
      heart: ["Peony", "Magnolia"],
      base: ["Musk", "Cedar"],
    },
    image: radiantImg,
    availableIn: ["perfume-oil"],
  },
  {
    id: "lyra",
    name: "Lyra",
    mood: "radiant",
    noteSummary: "Fruity • Floral • Amber",
    emotion: "Soft, sunlit hours.",
    feeling:
      "Lyra is ripe fruit and white florals settled over a quiet amber — radiant without ever raising its voice.",
    bestFor: "Daylight",
    intensity: "Medium",
    personality: "Luminous & Warm",
    pairsWith: "Body Lotion + Perfume Oil",
    notes: {
      top: ["Apricot", "Bergamot"],
      heart: ["Jasmine", "Peach Blossom"],
      base: ["Amber", "Cashmere Wood"],
    },
    image: radiantImg,
    availableIn: ["perfume-oil"],
  },
  // Bold & Magnetic
  {
    id: "velvet-elegance",
    name: "Velvet Elegance",
    inspiredBy: "Hibiscus Mahajad",
    mood: "bold",
    noteSummary: "Hibiscus • Rose • Vanilla",
    emotion: "Arrive slowly. Stay late.",
    feeling:
      "Velvet Elegance is hibiscus and rose wrapped in warm vanilla — sensual, magnetic, unmistakable.",
    bestFor: "Evenings & occasions",
    intensity: "Bold",
    personality: "Confident & Magnetic",
    pairsWith: "Dry Body Oil + Perfume Oil",
    notes: {
      top: ["Saffron", "Pink Pepper"],
      heart: ["Hibiscus", "Rose Damascena"],
      base: ["Vanilla", "Patchouli", "Black Amber"],
    },
    image: velvetImg,
    bestseller: true,
    availableIn: [
      "perfume-oil",
      "shower-gel",
      "body-lotion",
      "dry-body-oil",
    ],
  },
  {
    id: "sensual-whispers",
    name: "Sensual Whispers",
    mood: "bold",
    noteSummary: "Pear • Rose • Sandalwood",
    emotion: "Skin-close, after dark.",
    feeling:
      "Sensual Whispers folds juicy pear into rose absolute and creamy sandalwood — an intimate, modern feminine.",
    bestFor: "Evenings",
    intensity: "Medium",
    personality: "Sensual & Modern",
    pairsWith: "Dry Body Oil + Perfume Oil",
    notes: {
      top: ["Pear", "Bergamot"],
      heart: ["Rose", "Jasmine"],
      base: ["Sandalwood", "Musk"],
    },
    image: boldImg,
    availableIn: ["perfume-oil", "dry-body-oil"],
  },
  {
    id: "carmine-temptations",
    name: "Carmine Temptations",
    mood: "bold",
    noteSummary: "Cherry • Rose • Amber",
    emotion: "Evenings you remember.",
    feeling:
      "Carmine is black cherry and rose absolute settled into a slow, smoky amber — for nights worth remembering.",
    bestFor: "Late nights",
    intensity: "Bold",
    personality: "Sensual & Unforgettable",
    pairsWith: "Layer over Dry Body Oil",
    notes: {
      top: ["Black Cherry", "Bitter Almond"],
      heart: ["Rose Absolute", "Plum"],
      base: ["Amber", "Tonka", "Benzoin"],
    },
    image: boldImg,
    availableIn: ["perfume-oil", "dry-body-oil"],
  },
  {
    id: "aurielle",
    name: "Aurielle",
    mood: "bold",
    noteSummary: "Rose • Vanilla • Amber",
    emotion: "Gilded and slow.",
    feeling:
      "Aurielle is rose petals dipped in warm vanilla, finished with a long, golden amber drydown.",
    bestFor: "Evenings",
    intensity: "Bold",
    personality: "Opulent & Warm",
    pairsWith: "Body Lotion + Perfume Oil",
    notes: {
      top: ["Saffron", "Bergamot"],
      heart: ["Rose", "Iris"],
      base: ["Vanilla", "Amber", "Oud"],
    },
    image: boldImg,
    availableIn: ["perfume-oil"],
  },
  {
    id: "amara",
    name: "Amara",
    mood: "bold",
    noteSummary: "Candied Citrus • Vanilla • Orange Blossom",
    emotion: "Bright, then warm.",
    feeling:
      "Amara opens on candied citrus and orange blossom, settling into a creamy vanilla — bright at the top, lingering at the base.",
    bestFor: "Day into evening",
    intensity: "Medium",
    personality: "Radiant & Bold",
    pairsWith: "Shower Gel + Perfume Oil",
    notes: {
      top: ["Candied Orange", "Bergamot"],
      heart: ["Orange Blossom", "Jasmine"],
      base: ["Vanilla", "Musk", "Amber"],
    },
    image: boldImg,
    availableIn: ["perfume-oil"],
  },
  // Refined & Commanding
  {
    id: "cipher",
    name: "Cipher",
    inspiredBy: "Aventus",
    mood: "refined",
    noteSummary: "Pineapple • Woods • Amber",
    emotion: "Quiet authority.",
    feeling:
      "Cipher is bright pineapple lifted over smoked birch and a warm amber base — composed, confident, unmistakably his.",
    bestFor: "Work & daily wear",
    intensity: "Medium",
    personality: "Composed & Tailored",
    pairsWith: "Shower Gel + Perfume Oil",
    notes: {
      top: ["Pineapple", "Bergamot", "Blackcurrant"],
      heart: ["Birch", "Rose"],
      base: ["Oakmoss", "Amber", "Musk"],
    },
    image: refinedImg,
    bestseller: true,
    availableIn: ["perfume-oil", "shower-gel", "body-lotion"],
  },
  {
    id: "griselle",
    name: "Griselle",
    mood: "refined",
    noteSummary: "Rose • Patchouli • Woods",
    emotion: "Modern, considered.",
    feeling:
      "Griselle balances rose absolute against earthy patchouli and warm woods — quiet sophistication for him or her.",
    bestFor: "Cool evenings",
    intensity: "Medium",
    personality: "Refined & Modern",
    pairsWith: "Layer over Body Lotion",
    notes: {
      top: ["Bergamot", "Cardamom"],
      heart: ["Rose", "Iris"],
      base: ["Patchouli", "Cedar", "Vetiver"],
    },
    image: refinedImg,
    availableIn: ["perfume-oil"],
  },
  {
    id: "verin",
    name: "Verin",
    mood: "refined",
    noteSummary: "Leather • Woods • Musk",
    emotion: "Tailored and warm.",
    feeling:
      "Verin is soft leather over cedar and a clean musk — the scent of a well-cut coat.",
    bestFor: "Daily wear",
    intensity: "Medium",
    personality: "Distinguished & Composed",
    pairsWith: "Shower Gel + Perfume Oil",
    notes: {
      top: ["Black Pepper", "Bergamot"],
      heart: ["Suede", "Iris"],
      base: ["Cedar", "Musk", "Amber"],
    },
    image: refinedImg,
    availableIn: ["perfume-oil"],
  },
  {
    id: "opulent-odyssey",
    name: "Opulent Odyssey",
    mood: "refined",
    noteSummary: "Vanilla • Ginger • Woods",
    emotion: "Warmth with structure.",
    feeling:
      "Opulent Odyssey threads spicy ginger through warm vanilla and dry woods — masculine, refined, slowly unfolding.",
    bestFor: "Evenings",
    intensity: "Bold",
    personality: "Warm & Distinguished",
    pairsWith: "Body Lotion + Perfume Oil",
    notes: {
      top: ["Ginger", "Bergamot"],
      heart: ["Tonka", "Iris"],
      base: ["Vanilla", "Sandalwood", "Cedar"],
    },
    image: refinedImg,
    availableIn: ["perfume-oil"],
  },
  // Distinguished
  {
    id: "tangier-twilight",
    name: "Tangier Twilight",
    mood: "distinguished",
    noteSummary: "Tobacco • Woods • Amber",
    emotion: "A worn-in evening.",
    feeling:
      "Tangier Twilight is sweet tobacco leaf, smoked woods and warm amber — the scent of a leather chair and a long conversation.",
    bestFor: "Cool evenings",
    intensity: "Bold",
    personality: "Smoky & Distinguished",
    pairsWith: "Shower Gel + Perfume Oil",
    notes: {
      top: ["Bergamot", "Cardamom"],
      heart: ["Tobacco", "Hay"],
      base: ["Amber", "Cedar", "Vanilla"],
    },
    image: refinedImg,
    bestseller: true,
    availableIn: ["perfume-oil", "shower-gel", "body-lotion"],
  },
  {
    id: "majestic-oud",
    name: "Majestic Oud",
    mood: "distinguished",
    noteSummary: "Oud • Rose • Amber",
    emotion: "Ceremonial warmth.",
    feeling:
      "Majestic Oud layers smoky oud with rose absolute and a deep, resinous amber — for occasions worth marking.",
    bestFor: "Occasions & evenings",
    intensity: "Bold",
    personality: "Opulent & Ceremonial",
    pairsWith: "Layer over Body Lotion",
    notes: {
      top: ["Saffron", "Bergamot"],
      heart: ["Oud", "Rose Damascena"],
      base: ["Amber", "Sandalwood", "Musk"],
    },
    image: refinedImg,
    availableIn: ["perfume-oil"],
  },
];

function oilToProduct(seed: OilSeed): Product {
  const moodMeta = moods.find((m) => m.key === seed.mood)!;
  return {
    id: seed.id,
    name: seed.name,
    inspiredBy: seed.inspiredBy,
    tagline: seed.feeling,
    price: 6800,
    image: seed.image,
    mood: seed.mood,
    moodLabel: moodMeta.title,
    noteSummary: seed.noteSummary,
    emotion: seed.emotion,
    character: seed.noteSummary,
    bestFor: seed.bestFor,
    intensity: seed.intensity,
    personality: seed.personality,
    pairsWith: seed.pairsWith,
    feeling: seed.feeling,
    notes: seed.notes,
    composition: "30ml roll-on perfume oil in amber glass, hand-poured in Nairobi.",
    ritual:
      "Apply at pulse points after the body oil — let the warmth carry it through the day.",
    story: seed.feeling,
    availableIn: seed.availableIn,
    bestseller: seed.bestseller,
    category: "oil",
  };
}

const oilProducts: Product[] = oilSeeds.map(oilToProduct);

// ---------- Discovery Sets ----------

const discoverySets: Product[] = [
  {
    id: "discovery-set",
    name: "Discovery Set",
    tagline: "Five signature scents, sampled in miniature.",
    price: 3500,
    image: discoveryImg,
    mood: "discovery",
    moodLabel: "Discovery",
    noteSummary: "Five Signature Scents",
    emotion: "The quietest way into the house.",
    character: "A library of moods, in miniature.",
    bestFor: "First-time exploration",
    intensity: "Soft",
    personality: "Curious & Open",
    pairsWith: "A free hour and slow morning light",
    feeling:
      "Five 3ml fragrance oils, presented in a linen-lined keepsake. Wear one each day for a week — notice which one your skin keeps remembering.",
    notes: {
      top: ["Bergamot", "Pink Pepper", "Saffron"],
      heart: ["Rose", "Jasmine", "Orris"],
      base: ["Amber", "Oud", "Musk"],
    },
    composition:
      "Five 3ml fragrance oils — Nahla, Whispering Petals, Velvet Elegance, Cipher, Tangier Twilight.",
    ritual: "Wear one each day for a week.",
    story: "The same way most of our regulars first arrived.",
    availableIn: [],
    feature: true,
    badge: "Begin Here",
    category: "discovery",
  },
  {
    id: "womens-discovery-set",
    name: "Women's Discovery Set",
    tagline: "Five signature women's scents, in miniature.",
    price: 3500,
    image: discoveryImg,
    mood: "discovery",
    moodLabel: "Discovery",
    noteSummary: "For Her",
    emotion: "A quiet introduction.",
    character: "Warm, radiant, bold — composed for her.",
    bestFor: "Finding her signature",
    intensity: "Soft",
    personality: "Curious & Open",
    pairsWith: "Slow mornings",
    feeling:
      "Nahla, Alina, Whispering Petals, Velvet Elegance, Carmine Temptations — five women's signatures, in miniature.",
    notes: {
      top: ["Lychee", "Bergamot"],
      heart: ["Rose", "Jasmine"],
      base: ["Vanilla", "Amber", "Musk"],
    },
    composition: "Five 3ml fragrance oils for her.",
    ritual: "Wear one each day. The one you reach for twice is yours.",
    story: "A quiet way to find her signature.",
    availableIn: [],
    badge: "For Her",
    category: "discovery",
  },
  {
    id: "gentlemans-discovery-set",
    name: "Gentleman's Discovery Set",
    tagline: "Four signature gentleman's scents, in miniature.",
    price: 3200,
    image: discoveryImg,
    mood: "discovery",
    moodLabel: "Discovery",
    noteSummary: "For Him",
    emotion: "A quiet introduction.",
    character: "Composed, tailored, distinguished.",
    bestFor: "Finding his signature",
    intensity: "Medium",
    personality: "Composed & Considered",
    pairsWith: "Morning shower",
    feeling:
      "Cipher, Verin, Tangier Twilight and Majestic Oud — four gentleman's signatures, in miniature.",
    notes: {
      top: ["Pineapple", "Bergamot"],
      heart: ["Iris", "Tobacco"],
      base: ["Cedar", "Oud", "Amber"],
    },
    composition: "Four 3ml fragrance oils for him.",
    ritual: "Wear one each day. Choose the one your skin remembers.",
    story: "Composure, sampled.",
    availableIn: [],
    badge: "For Him",
    category: "discovery",
  },
];

// ---------- Ritual Collections ----------

export type Ritual = {
  id: string;
  name: string;
  scentId: string; // links to perfume oil
  mood: Mood;
  moodLabel: string;
  tagline: string;
  story: string;
  image: string;
  price: number;
  steps: { format: Format; label: string }[];
  bestseller?: boolean;
  forHim?: boolean;
  variants?: { label: string; scentId: string }[];
};

export const rituals: Ritual[] = [
  {
    id: "nahla-ritual",
    name: "Nahla Ritual",
    scentId: "nahla",
    mood: "warm",
    moodLabel: "Warm & Indulgent",
    tagline: "Honeyed vanilla, in four soft layers.",
    story:
      "The complete Nahla ritual — cleansed, hydrated, sealed, scented. The most enveloping way to wear her.",
    image: nahlaImg,
    price: 12800,
    bestseller: true,
    steps: [
      { format: "shower-gel", label: "Shower Gel" },
      { format: "body-butter", label: "Body Butter" },
      { format: "nourishing-body-oil", label: "Nourishing Body Oil" },
      { format: "perfume-oil", label: "Perfume Oil" },
    ],
  },
  {
    id: "alina-ritual",
    name: "Alina Ritual",
    scentId: "alina",
    mood: "warm",
    moodLabel: "Warm & Indulgent",
    tagline: "Soft lychee and rose, layered slowly.",
    story:
      "Alina's complete four-step ritual — graceful, daylight-soft, never loud.",
    image: nahlaImg,
    price: 12800,
    steps: [
      { format: "shower-gel", label: "Shower Gel" },
      { format: "body-butter", label: "Body Butter" },
      { format: "nourishing-body-oil", label: "Nourishing Body Oil" },
      { format: "perfume-oil", label: "Perfume Oil" },
    ],
  },
  {
    id: "velvet-elegance-ritual",
    name: "Velvet Elegance Ritual",
    scentId: "velvet-elegance",
    mood: "bold",
    moodLabel: "Bold & Magnetic",
    tagline: "Hibiscus, rose and vanilla — for the evening.",
    story:
      "The Velvet Elegance ritual is built around our most magnetic perfume oil. A ritual for low light and high intention.",
    image: velvetImg,
    price: 13500,
    bestseller: true,
    steps: [
      { format: "shower-gel", label: "Shower Gel" },
      { format: "body-lotion", label: "Body Lotion" },
      { format: "dry-body-oil", label: "Dry Body Oil" },
      { format: "perfume-oil", label: "Perfume Oil" },
    ],
  },
  {
    id: "whispering-petals-ritual",
    name: "Whispering Petals Ritual",
    scentId: "whispering-petals",
    mood: "radiant",
    moodLabel: "Radiant & Feminine",
    tagline: "Luminous rose and lychee, layered for daylight.",
    story:
      "The Whispering Petals ritual — fresh, weightless, romantic. A bouquet you carry all day.",
    image: radiantImg,
    price: 13200,
    steps: [
      { format: "shower-gel", label: "Shower Gel" },
      { format: "body-lotion", label: "Body Lotion" },
      { format: "dry-body-oil", label: "Dry Body Oil" },
      { format: "perfume-oil", label: "Perfume Oil" },
    ],
  },
  {
    id: "gentleman-collection",
    name: "The Gentleman Collection",
    scentId: "cipher",
    mood: "refined",
    moodLabel: "Refined & Commanding",
    tagline: "Three quiet steps. Composed for him.",
    story:
      "A three-step ritual built for him — cleanse, hydrate, scent. Available in Cipher or Tangier Twilight.",
    image: refinedImg,
    price: 11800,
    forHim: true,
    variants: [
      { label: "Cipher", scentId: "cipher" },
      { label: "Tangier Twilight", scentId: "tangier-twilight" },
    ],
    steps: [
      { format: "shower-gel", label: "Shower Gel" },
      { format: "body-lotion", label: "Body Lotion" },
      { format: "perfume-oil", label: "Perfume Oil" },
    ],
  },
];

// Ritual entries also surface as products (for cart + product detail)
const ritualProducts: Product[] = rituals.map((r) => {
  const scent = oilSeeds.find((o) => o.id === r.scentId)!;
  return {
    id: r.id,
    name: r.name,
    inspiredBy: scent.inspiredBy,
    tagline: r.tagline,
    price: r.price,
    image: r.image,
    mood: r.mood,
    moodLabel: r.moodLabel,
    noteSummary: scent.noteSummary,
    emotion: scent.emotion,
    character: scent.noteSummary,
    bestFor: scent.bestFor,
    intensity: scent.intensity,
    personality: scent.personality,
    pairsWith: r.steps.map((s) => FORMAT_LABEL[s.format]).join(" + "),
    feeling: r.story,
    notes: scent.notes,
    composition: r.steps.map((s) => s.label).join(", "),
    ritual: "Cleanse · Hydrate · Seal · Scent — the full layering, in one box.",
    story: r.story,
    availableIn: r.steps.map((s) => s.format),
    bestseller: r.bestseller,
    badge: r.bestseller ? "Bestseller" : undefined,
    feature: true,
    category: "ritual",
  };
});

export const products: Product[] = [
  ...discoverySets,
  ...ritualProducts,
  ...oilProducts,
];

// ---------- Selectors ----------

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getOil(id: string): Product | undefined {
  return oilProducts.find((p) => p.id === id);
}

export const perfumeOils = oilProducts;

export function oilsByMood(mood: Mood): Product[] {
  return oilProducts.filter((p) => p.mood === mood);
}

export function productsByMood(mood: Mood): Product[] {
  return products.filter((p) => p.mood === mood);
}

export function getMood(key: Mood) {
  return moods.find((m) => m.key === key);
}

export function bestsellers(): Product[] {
  const ids = ["whispering-petals", "velvet-elegance", "nahla", "cipher", "tangier-twilight"];
  return ids.map((id) => oilProducts.find((p) => p.id === id)).filter(Boolean) as Product[];
}

export const discoverySetProducts = discoverySets;

export function oilsWithFormat(format: Format): Product[] {
  return oilProducts.filter((p) => p.availableIn.includes(format));
}

export const FEATURED_RITUAL_IDS = [
  "nahla-ritual",
  "alina-ritual",
  "velvet-elegance-ritual",
  "gentleman-collection",
];

export function featuredRituals(): Ritual[] {
  return FEATURED_RITUAL_IDS.map((id) => rituals.find((r) => r.id === id)).filter(
    Boolean,
  ) as Ritual[];
}
