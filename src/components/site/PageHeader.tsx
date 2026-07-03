import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  backgroundImage?: string;
  backgroundVideo?: string;
  isExpanded?: boolean;
  videoPlaybackRate?: number;
};

export function PageHeader({ 
  eyebrow, 
  title, 
  intro, 
  align = "left", 
  backgroundImage,
  backgroundVideo,
  isExpanded = false,
  videoPlaybackRate = 1
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoPlaybackRate;
    }
  }, [videoPlaybackRate]);

  const center = align === "center";
  const heightClass = isExpanded ? "min-h-[100svh]" : "";
  const paddingClass = isExpanded ? "pt-28 md:pt-40 pb-12 md:pb-0 flex flex-col justify-end md:justify-center" : "pt-32 md:pt-40 pb-20 md:pb-28";
  
  return (
    <section
      className={`relative text-ivory ${paddingClass} overflow-hidden ${heightClass}`}
      style={
        backgroundImage || backgroundVideo
          ? {
              backgroundColor: "#4a3b32",
            }
          : { backgroundColor: "#4a3b32" } // brown
      }
    >
      {/* Background Image or Video */}
      {backgroundVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      
      {backgroundImage && !backgroundVideo && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/50 to-brown/30 md:bg-gradient-to-r md:from-brown/80 md:via-brown/40 md:to-brown/20" />

      <div className={`relative z-10 mx-auto max-w-7xl px-5 md:px-10 ${center ? "text-center" : ""}`}>
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

