import type { Product, Intensity } from "@/lib/products";

function Dots({ level }: { level: Intensity }) {
  const filled = level === "Soft" ? 1 : level === "Medium" ? 2 : 3;
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={`Intensity: ${level}`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i < filled ? "bg-gold" : "bg-brown/20"}`}
        />
      ))}
    </span>
  );
}

export function ScentPreviewCompact({ product }: { product: Product }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.7rem] tracking-wider text-brown/65 uppercase">
      <span className="inline-flex items-center gap-1.5">
        <span className="text-brown/45">Intensity</span>
        <Dots level={product.intensity} />
      </span>
      <span className="text-brown/25">·</span>
      <span><span className="text-brown/45">Best for</span> <span className="text-brown/75 normal-case tracking-normal">{product.bestFor}</span></span>
    </div>
  );
}

export function ScentPreview({ product }: { product: Product }) {
  const rows: [string, React.ReactNode][] = [
    ["Mood", <span className="text-brown/85">{product.moodLabel}</span>],
    ["Intensity", <span className="inline-flex items-center gap-3"><Dots level={product.intensity} /><span className="text-brown/65 text-sm normal-case tracking-normal">{product.intensity}</span></span>],
    ["Best for", <span className="text-brown/85 normal-case tracking-normal">{product.bestFor}</span>],
    ["Personality", <span className="text-brown/85 normal-case tracking-normal serif-italic">{product.personality}</span>],
    ["Pairs with", <span className="text-brown/85 normal-case tracking-normal">{product.pairsWith}</span>],
  ];
  return (
    <div className="border-t border-b border-brown/15 divide-y divide-brown/10">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-6 py-3">
          <span className="eyebrow text-brown/55 text-[0.625rem]">{label}</span>
          <span className="text-right text-sm">{value}</span>
        </div>
      ))}
    </div>
  );
}
