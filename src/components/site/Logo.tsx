import logoMark from "@/assets/logo-mark.png";

type Props = {
  className?: string;
  alt?: string;
};

export function Logo({
  className = "h-full w-auto",
  alt = "The Scented Space — Luxury Craft Studio",
}: Props) {
  return (
    <img
      src={logoMark}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
}
