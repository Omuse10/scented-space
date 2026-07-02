import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  backgroundImage?: string;
};

export function PageHeader({ eyebrow, title, intro, align = "left", backgroundImage }: Props) {
  const center = align === "center";
  return (
    <section
      className="relative text-ivory pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(60, 35, 20, 0.55), rgba(60, 35, 20, 0.72)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : { backgroundColor: "#4a3b32" } // brown
      }
    >
      <div className={`relative mx-auto max-w-7xl px-5 md:px-10 ${center ? "text-center" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`max-w-3xl ${center ? "mx-auto" : ""}`}
        >
          <div className={`flex items-center gap-3 mb-6 ${center ? "justify-center" : ""}`}>
            <span className="hairline" />
            <span className="eyebrow text-ivory/90">{eyebrow}</span>
            {center && <span className="hairline" />}
          </div>
          <h1 className="display-xl text-ivory">{title}</h1>
          {intro && (
            <p className={`mt-8 text-ivory/85 leading-relaxed md:text-lg max-w-2xl ${center ? "mx-auto" : ""}`}>
              {intro}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

