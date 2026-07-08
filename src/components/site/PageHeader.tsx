import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  backgroundImage?: string;
  backgroundImages?: string[];
  backgroundVideo?: string;
  isExpanded?: boolean;
  videoPlaybackRate?: number;
  overlayClassName?: string;
  imageRotationMs?: number;
  contentClassName?: string;
  heroHeightClassName?: string;
  titleClassName?: string;
  introClassName?: string;
  backgroundPositionClassName?: string;
};

export function PageHeader({ 
  eyebrow, 
  title, 
  intro, 
  align = "left", 
  backgroundImage,
  backgroundImages,
  backgroundVideo,
  isExpanded = false,
  videoPlaybackRate = 1,
  overlayClassName,
  imageRotationMs = 5000,
  contentClassName,
  heroHeightClassName,
  titleClassName,
  introClassName,
  backgroundPositionClassName,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const heroImages = useMemo(() => {
    if (backgroundImages && backgroundImages.length > 0) {
      return backgroundImages;
    }
    if (backgroundImage) {
      return [backgroundImage];
    }
    return [];
  }, [backgroundImage, backgroundImages]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoPlaybackRate;
    }
  }, [videoPlaybackRate]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [heroImages]);

  useEffect(() => {
    if (backgroundVideo || heroImages.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % heroImages.length);
    }, imageRotationMs);

    return () => window.clearInterval(timer);
  }, [backgroundVideo, heroImages, imageRotationMs]);

  const center = align === "center";
  const heightClass = heroHeightClassName ?? (isExpanded ? "min-h-[100svh]" : "");
  const paddingClass = isExpanded ? "pt-28 md:pt-40 pb-12 md:pb-0 flex flex-col justify-end md:justify-center" : "pt-32 md:pt-40 pb-20 md:pb-28";
  
  const overlayClass = overlayClassName ?? (backgroundVideo
    ? "absolute inset-0 bg-black/10"
    : "absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/50 to-brown/30 md:bg-gradient-to-r md:from-brown/80 md:via-brown/40 md:to-brown/20");

  return (
    <section
      className={`relative text-ivory ${paddingClass} overflow-hidden ${heightClass}`}
      style={
        heroImages.length > 0 || backgroundVideo
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
      
      {heroImages.length > 0 && !backgroundVideo && (
        <>
          {heroImages.map((imageUrl, idx) => (
            <div
              key={imageUrl + idx}
              className={`absolute inset-0 bg-cover ${backgroundPositionClassName ?? "bg-center"} bg-no-repeat transition-opacity duration-1000 ${
                idx === activeImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          ))}
        </>
      )}
      
      {/* Gradient Overlay */}
      <div className={overlayClass} />

      <div className={`relative z-10 mx-auto max-w-7xl px-5 md:px-10 ${center ? "text-center" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`max-w-2xl md:max-w-3xl ${center ? "mx-auto" : ""} ${contentClassName ?? ""}`}
        >
          <div className={`flex items-center gap-3 mb-6 ${center ? "justify-center" : ""}`}>
            <span className="hairline" />
            <span className="eyebrow text-ivory/90">{eyebrow}</span>
            {center && <span className="hairline" />}
          </div>
          <h1 className={`display-xl text-ivory ${titleClassName ?? ""}`}>{title}</h1>
          {intro && (
            <p className={`mt-8 text-ivory/85 leading-relaxed md:text-lg max-w-2xl ${center ? "mx-auto" : ""} ${introClassName ?? ""}`}>
              {intro}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

